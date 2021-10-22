export const reportModule = {
    state: () => ({
        fields: ['Месяц', 'Доход', 'Расход', 'Итого'],
        report: [{
            month: 'Сентябрь 2021',
            revenue: 2000,
            expense: 500,
            total: 1500
        }, {
            month: 'Октябрь 2021',
            revenue: 2000,
            expense: 340,
            total: 1660
        }]
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
                    expense: expense + ' (' + (expense / revenue) * 100 + '%)',
                    total: total + ' (' + (total / revenue) * 100 + '%)',
                }
                result.push(row);
                date = new Date(date.setMonth(date.getMonth() + 1));
            } while (date < finish)
            return result;
        }
    },
    namespaced: true
}