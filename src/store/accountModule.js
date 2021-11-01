import axios from "axios";

export const accountModule = {
    state: () => ({
        accounts: [],
        accountTypes: [{
            name: "Доходы",
            type: "account-revenue"
        }, {
            name: "Счета",
            type: "account-asset"
        }, {
            name: "Расходы",
            type: "account-expense"
        }]
    }),
    getters: {
        getAccounts: state => accountType => {
            return state.accounts.filter(account => account.type === accountType);
        },
        getTypes(state) {
            return state.accountTypes;
        },
        getAccount: state => id => {
            return state.accounts.find(account => account.id === id);
        },
        getBalance: (state, getters, rootState) => (accountId, date) => {
            if (date === undefined) date = rootState.date.date;
            let search = state.accounts.find(account => account.id === accountId);
            if (search === undefined) {
                return '-';
            } else if (search.type === 'account-revenue') {
                return getters.getCredit(accountId, date);
            } else if (search.type === 'account-asset') {
                return getters.getDebit(accountId, date)
                    - getters.getCredit(accountId, date)
            } else if (search.type === 'account-expense') {
                return getters.getDebit(accountId, date);
            }
        },
        getTotalBalance: (state, getters, rootState) => (accountType, date) => {
            if (date === undefined) date = rootState.date.date;
            return getters.getAccounts(accountType)
                .map(account => getters.getBalance(account.id, date))
                .reduce((a, b) => a + b, 0);
        },
        getDebit: (state, getters, rootState, rootGetters) => (accountId, date) => {
            return rootGetters["transaction/getMonthByDate"](date)
                .filter(transaction => transaction.to === accountId)
                .map(transaction => transaction.value)
                .reduce((a, b) => a + b, 0);
        },
        getCredit: (state, getters, rootState, rootGetters) => (accountId, date) => {
            return rootGetters["transaction/getMonthByDate"](date)
                .filter(transaction => transaction.from === accountId)
                .map(transaction => transaction.value)
                .reduce((a, b) => a + b, 0);
        }
    },
    mutations: {
        setAccount(state, input) {
            state.accounts.push(input);
        },
        editAccount(state, input) {
            let search = state.accounts.find(account => account.id === input.id);
            if (search !== undefined) {
                search.name = input.name;
                search.icon = input.icon;
            } else {
                console.log('Счет не найден');
            }
        },
        setAccountList(state, accounts) {
            state.accounts = accounts;
        }
    },
    actions: {
        async fetchAccounts({state, commit, rootState}) {
            try {
                const response = await axios.get('http://localhost:8081/account');
                commit('setAccountList', response.data)
            } catch (e) {
                console.error(e);
            }
        },
        async addAccount({dispatch, commit}, account) {
            try {
                const response = await axios.post('http://localhost:8081/account', {...account});
                if (response.data !== -1) {
                    account.id = response.data;
                    commit('setAccount', account);
                } else console.log('Ошибка при записи счета')
            } catch (e) {
                console.error(e);
            }
        },
        async editAccount({dispatch, commit}, account) {
            try {
                const response = await axios.put('http://localhost:8081/account', {...account});
                if (response.data !== -1) {
                    commit('editAccount', account);
                } else console.log('Счет не найден')
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}