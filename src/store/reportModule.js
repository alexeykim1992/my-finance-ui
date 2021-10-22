export const reportModule = {
    state: () => ({
        generalReportFields: ['Месяц', 'Доход', 'Расход', 'Итого'],
        revenueReportFields: ['Доход', 'Сумма', '%']
    }),
    getters: {
        getGeneralReport: (state, getters, rootState, rootGetters) => {
            let date = rootState.date.accountStart;
            let finish = new Date();
            let result = [];
            do {
                let revenue = rootGetters["account/getTotalBalance"]('account-revenue', date);
                let expense = rootGetters["account/getTotalBalance"]('account-expense', date);
                let total = rootGetters["account/getTotalBalance"]('account-asset', date);
                let row = {
                    month: rootGetters["date/getMonthYearString"](date),
                    revenue: revenue,
                    expense: expense + ' (' + ((expense / revenue) * 100).toFixed(2) + '%)',
                    total: total + ' (' + ((total / revenue) * 100).toFixed(2) + '%)',
                }
                result.push(row);
                date = new Date(date.setMonth(date.getMonth() + 1));
            } while (date < finish)
            return result;
        },
        getRevenueReport: (state, getters, rootState, rootGetters) => {
            let date = new Date('2021-09-01');
            let revenue = rootGetters["account/getTotalBalance"]('account-revenue', date);
            let revenues = rootGetters["account/getAccounts"]('account-revenue');
            return revenues.map(account => {
                let value = rootGetters["account/getBalance"](account.id, date);
                return {
                    name: account.name,
                    value: value,
                    percent: ((value / revenue) * 100).toFixed(2) + '%'
                };
            });
        }
    },
    namespaced: true
}