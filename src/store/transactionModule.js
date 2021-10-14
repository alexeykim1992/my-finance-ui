export const transactionModule = {
    state: () => ({
        transactionDays: [{
            date: new Date('2021-09-27'),
            transactions: [
                {
                    id: 1,
                    from: 1,
                    to: 2,
                    value: 100,
                    description: "покупки в магазине"
                }, {
                    id: 2,
                    from: 3,
                    to: 4,
                    value: 10,
                    description: "на работу"
                }, {
                    id: 3,
                    from: 7,
                    to: 1,
                    value: 1000,
                    description: "Зарплата"
                }, {
                    id: 4,
                    from: 3,
                    to: 1,
                    value: 1000,
                    description: "Зарплата"
                }]
        }, {
            date: new Date('2021-09-25'),
            transactions: [{
                id: 5,
                from: 1,
                to: 2,
                value: 75,
                description: "покупки в магазине"
            }, {
                id: 6,
                from: 1,
                to: 4,
                value: 30,
                description: "на работу"
            }]
        }, {
            date: new Date('2021-09-23'),
            transactions: [{
                id: 7,
                from: 1,
                to: 2,
                value: 55,
                description: "покупки в магазине"
            }, {
                id: 8,
                from: 3,
                to: 5,
                value: 15,
                description: "Интернет"
            }, {
                id: 9,
                from: 1,
                to: 6,
                value: 300,
                description: "Курсы"
            }]
        }]
    }),
    getters: {
        getTransactionDays(state) {
            return state.transactionDays.sort((aDay, bDay) => {
                return aDay.date === bDay.date ? 0
                    : aDay.date < bDay.date ? 1 : -1;
            });
        },
        getMonthByDate: state => date => {
            return state.transactionDays
                .filter(day => day.date.getFullYear() === date.getFullYear()
                    && day.date.getMonth() === date.getMonth())
                .map(day => day.transactions)
                .reduce((a, b) => [...a, ...b]);
        },
        getAllTransactions: state => {
            return state.transactionDays
                .map(day => day.transactions)
                .reduce((a, b) => [...a, ...b]);
        },
        getTransactionType: (state, getters, rootState, rootGetters) => transaction => {
            let source = rootGetters["account/getAccount"](transaction.from);
            let destination = rootGetters["account/getAccount"](transaction.to);
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
            let search = state.transactionDays.find(day =>
                day.date.toLocaleString() === input.toLocaleString());
            if (search === undefined) return '-';
            return search.transactions
                .map(item => item.value * getters.getTransactionType(item))
                .reduce((a, b) => a + b);
        }
    },
    mutations: {
        addTransaction(state, input) {
            let day = state.transactionDays.find(transactionDay =>
                transactionDay.date.toLocaleString() === input.date.toLocaleString());
            if (day === undefined) {
                state.transactionDays.push({
                    date: input.date,
                    transactions: [input.transaction]
                });
            } else {
                day.transactions.push(input.transaction);
            }
        },
        editTransaction(state, input) {
            let result = this.getters["transaction/getAllTransactions"]
                .find(item => item.id === input.transaction.id);
            if (result !== undefined) {
                result.from = input.transaction.from;
                result.to = input.transaction.to;
                result.value = input.transaction.value;
                result.description = input.transaction.description;
            } else {
                console.log('Транзакция не найдена');
            }
        }
    },
    namespaced: true
}