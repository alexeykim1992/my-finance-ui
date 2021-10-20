export const reportModule = {
    state: () => ({
        fields:['Месяц', 'Доход', 'Расход', 'Итого'],
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
                let row = {
                    month: rootGetters["date/getMonthYearString"](date),
                    revenue: rootGetters["account/getTotalBalance"]('account-revenue', date),
                    expense: rootGetters["account/getTotalBalance"]('account-expense', date),
                    total: rootGetters["account/getTotalBalance"]('account-asset', date)
                }
                result.push(row);
                date = new Date(date.setMonth(date.getMonth() + 1));
            } while (date < finish)
            return result;
        }
    },
    namespaced: true
}