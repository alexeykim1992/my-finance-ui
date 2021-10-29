import axios from "axios";

export const transactionModule = {

    state: () => ({
        transactions: [],
        transactionsMock: [{
            id: 1,
            date: new Date('2021-09-27'),
            from: 1,
            to: 2,
            value: 100,
            description: "покупки в магазине"
        }, {
            id: 2,
            date: new Date('2021-09-25'),
            from: 3,
            to: 4,
            value: 10,
            description: "на работу"
        }, {
            id: 3,
            date: new Date('2021-09-27'),
            from: 7,
            to: 1,
            value: 1000,
            description: "Зарплата"
        }, {
            id: 4,
            date: new Date('2021-09-27'),
            from: 3,
            to: 1,
            value: 1000,
            description: "Зарплата"
        }, {
            id: 5,
            date: new Date('2021-09-23'),
            from: 1,
            to: 2,
            value: 75,
            description: "покупки в магазине"
        }, {
            id: 6,
            date: new Date('2021-09-23'),
            from: 1,
            to: 4,
            value: 30,
            description: "на работу"
        }, {
            id: 7,
            date: new Date('2021-09-23'),
            from: 1,
            to: 2,
            value: 55,
            description: "покупки в магазине"
        }, {
            id: 8,
            date: new Date('2021-09-25'),
            from: 3,
            to: 5,
            value: 15,
            description: "Интернет"
        }, {
            id: 9,
            date: new Date('2021-09-25'),
            from: 1,
            to: 6,
            value: 300,
            description: "Курсы"
        }, {
            id: 10,
            date: new Date('2021-09-25'),
            from: 8,
            to: 3,
            value: 700,
            description: "Подработка"
        }]
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
        setTransactions(state, transactions) {
            state.transactions = transactions;
        }
    },
    actions: {
        async fetchTransactions({state, commit, rootState}) {
            try {
                const response = await axios.get('http://localhost:8081/transaction', {
                    params: { userId: rootState.user.id }
                });
                commit('setTransactions', response.data);
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}