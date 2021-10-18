export const accountModule = {
    state: () => ({
        accounts: [{
            id: 1,
            name: "Кошелек",
            type: "account-asset",
            icon: "far fa-wallet"
        }, {
            id: 2,
            name: "Покупки",
            type: "account-expense",
            icon: "far fa-shopping-cart"
        }, {
            id: 3,
            name: "Карта",
            type: "account-asset",
            icon: "far fa-credit-card-front"
        }, {
            id: 4,
            name: "Транспорт",
            type: "account-expense",
            icon: "far fa-bus"
        }, {
            id: 5,
            name: "Сервисы",
            type: "account-expense",
            icon: "far fa-globe"
        }, {
            id: 6,
            name: "Образование",
            type: "account-expense",
            icon: "far fa-graduation-cap"
        }, {
            id: 7,
            name: "Основной",
            type: "account-revenue",
            icon: "far fa-briefcase"
        }],
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
    actions: {
        fetchAccounts() {

        }
    },
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
        addAccount(state, input) {
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
        }
    },
    namespaced: true
}