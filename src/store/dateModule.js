export const dateModule = {
    state: () => ({
        accountStart: new Date('2021-09-01'),
        date: new Date(),
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    }),
    getters: {
        getToday: (state, getters) =>
            getters.getDate(new Date()),
        getDate: () => date => {
            return date.getFullYear().toString() + '-'
                + (date.getMonth() + 1).toString().padStart(2, 0) + '-'
                + date.getDate().toString().padStart(2, 0);
        },
        getMonthYearString: state => date => {
            if (date === undefined) date = state.date;
            return state.month[date.getMonth()] + ' ' + date.getFullYear();
        },
        hasNextMonth(state) {
            let next = new Date(state.date);
            next = new Date(next.setMonth(next.getMonth() + 1));
            return next < new Date();
        },
        hasPrevMonth(state) {
            let prev = new Date(state.date);
            prev = new Date(prev.setMonth(prev.getMonth() - 1));
            return prev > state.accountStart;
        }
    },
    mutations: {
        setDate(state, date) {
            state.date = date
        },
        nextMonth(state) {
            let next = new Date(state.date);
            next = new Date(next.setMonth(next.getMonth() + 1));
            state.date = next < new Date() ? next : state.date;
        },
        prevMonth(state) {
            let prev = new Date(state.date);
            prev = new Date(prev.setMonth(prev.getMonth() - 1));
            state.date = prev > state.accountStart ? prev : state.date;
        }
    },
    namespaced: true
}