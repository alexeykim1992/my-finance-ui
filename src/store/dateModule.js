export const dateModule = {
    state: () => ({
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
        getMonthYearString: state => {
            return state.month[state.date.getMonth()] + ' ' + state.date.getFullYear();
        }
    },
    mutations: {
        nextMonth(state) {
            state.date = new Date(state.date.setMonth(state.date.getMonth() + 1));
        },
        prevMonth(state) {
            state.date = new Date(state.date.setMonth(state.date.getMonth() - 1));
        }
    },
    namespaced: true
}