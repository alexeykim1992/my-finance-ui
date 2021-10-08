import {accountModule} from "@/store/accountModule";

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
                id: 1,
                from: 1,
                to: 2,
                value: 75,
                description: "покупки в магазине"
            }, {
                id: 2,
                from: 1,
                to: 4,
                value: 30,
                description: "на работу"
            }]
        }, {
            date: new Date('2021-09-23'),
            transactions: [{
                id: 1,
                from: 1,
                to: 2,
                value: 55,
                description: "покупки в магазине"
            }, {
                id: 2,
                from: 3,
                to: 5,
                value: 15,
                description: "Интернет"
            }, {
                id: 3,
                from: 1,
                to: 6,
                value: 300,
                description: "Курсы"
            }]
        }]
    }),
    getters: {
        getTransactionDays(state) {
            return state.transactionDays;
        },
        getTransactionType: (state, getters, rootState, rootGetters) => transaction => {
            let source = rootGetters["account/getAccount"](transaction.from);
            let destination = rootGetters["account/getAccount"](transaction.to);
            if (source.type === 'account-revenue' && destination.type === 'account-asset') return 'value-revenue';
            if (source.type === 'account-asset' && destination.type === 'account-expense') return 'value-expense';
            return 'value-asset'
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
        }
    },
    namespaced: true
}