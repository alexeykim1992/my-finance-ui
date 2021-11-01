import axios from "axios";

export const transactionModule = {
    state: () => ({
        transactions: []
    }),
    getters: {
        getTransactionDays(state) {
            let days = [];
            state.transactions
                .sort((aTr, bTr) =>
                    aTr.date < bTr.date ? 1 : aTr.date > bTr.date ? -1
                        : aTr.id > bTr.id ? 1 : aTr.id < bTr.id ? -1 : 0)
                .forEach(transaction => {
                    let search = days.find(day =>
                        day.date.toLocaleString() === transaction.date.toLocaleString());
                    if (search === undefined) {
                        days.push({date: transaction.date, transactions: [transaction]})
                    } else {
                        search.transactions.push(transaction);
                    }
                });
            return days;
        },
        getMonthByDate: (state, getters, rootState) => date => {
            return state.transactions
                .filter(transaction => {
                    let transactionDate = new Date(transaction.date);
                    return transactionDate.getFullYear() === date.getFullYear() &&
                        transactionDate.getMonth() === date.getMonth()
                });
        },
        getTransactionType: (state, getters, rootState, rootGetters) => transaction => {
            let source = rootGetters["account/getAccount"](transaction.from);
            let destination = rootGetters["account/getAccount"](transaction.to);
            if (source === undefined || destination === undefined) return 0;
            if (source.type === 'account-revenue' && destination.type === 'account-asset') return 1;
            if (source.type === 'account-asset' && destination.type === 'account-expense') return -1;
            return 0;
        },
        getTransactionStyle: (state, getters) => transaction => {
            let type = getters.getTransactionType(transaction);
            return type === 0 ? 'value-asset'
                : type > 0 ? 'value-revenue' : 'value-expense';
        },
        getDayBalance: (state, getters) => input => {
            return state.transactions
                .filter(transaction => transaction.date.toLocaleString() === input.toLocaleString())
                .map(item => item.value * getters.getTransactionType(item))
                .reduce((a, b) => a + b, 0);
        }
    },
    mutations: {
        addTransaction(state, input) {
            input.date = new Date(input.date);
            state.transactions.push(input);
        },
        editTransaction(state, input) {
            let result = state.transactions
                .find(transaction => transaction.id === input.id);
            if (result !== undefined) {
                result.date = new Date(input.date);
                result.from = input.from;
                result.to = input.to;
                result.value = input.value;
                result.description = input.description;
            } else {
                console.log('Транзакция не найдена');
            }
        },
        setTransactionList(state, transactions) {
            state.transactions = transactions;
        }
    },
    actions: {
        async fetchTransactions({dispatch, commit, rootState}) {
            try {
                const response = await axios.get('http://localhost:8081/transaction');
                response.data.forEach(transaction => transaction.date = new Date(transaction.date))
                commit('setTransactionList', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async addTransaction({dispatch, commit}, transaction) {
            try {
                const response = await axios.post('http://localhost:8081/transaction', {...transaction});
                if (response.data !== -1) {
                    transaction.id = response.data;
                    commit('addTransaction', transaction);
                } else console.log('Ошибка при записи транзакции');
            } catch (e) {
                console.error(e);
            }
        },
        async editTransaction({dispatch, commit}, transaction) {
            try {
                const response = await axios.put('http://localhost:8081/transaction', {...transaction});
                if (response.data !== -1) {
                    commit('editTransaction', transaction);
                } else console.log('Транзакция не найдена');
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}