// account-asset
// account-revenue
// account-expense

export const accountModule = {
    state: () => ({
        accounts: [{
            id: 1,
            name: "Кошелек",
            type: "account-asset",
            icon: "far fa-wallet"
        }, {
            id: 2,
            name: "Покупки",
            type: "account-expense",
            icon: "far fa-shopping-cart"
        }, {
            id: 3,
            name: "Карта",
            type: "account-asset",
            icon: "far fa-credit-card-front"
        }, {
            id: 4,
            name: "Транспорт",
            type: "account-expense",
            icon: "far fa-bus"
        }, {
            id: 5,
            name: "Сервисы",
            type: "account-expense",
            icon: "far fa-globe"
        }, {
            id: 6,
            name: "Образование",
            type: "account-expense",
            icon: "far fa-graduation-cap"
        }, {
            id: 7,
            name: "Основной",
            type: "account-revenue",
            icon: "far fa-briefcase"
        }]
    }),
    actions: {
        fetchAccounts() {

        }
    },
    getters: {

    },
    mutations: {

    },
    namespaced: true
}