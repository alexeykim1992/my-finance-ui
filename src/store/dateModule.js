export const dateModule = {
    getters: {
        getDate: () => date => {
            return date.getFullYear().toString() + '-'
                + (date.getMonth() + 1).toString().padStart(2, 0) + '-'
                + date.getDate().toString().padStart(2, 0);
        },
        getToday: (state, getters) =>
            getters.getDate(new Date())
    },
    namespaced: true
}