import axios from "axios";

export const iconsModule = {
    state: () => ({
        icons:[],
        iconsMock: [
            "far fa-wallet",
            "far fa-credit-card-front",
            "far fa-money-bill-wave",
            "far fa-coins",
            "far fa-receipt",
            "far fa-money-check-alt",
            "far fa-badge-dollar",
            "far fa-badge-percent",
            "far fa-bus",
            "far fa-globe",
            "far fa-graduation-cap",
            "far fa-briefcase",
            "far fa-university",
            "far fa-balance-scale",
            "far fa-shopping-cart",
            "far fa-shopping-basket",
            "far fa-running",
            "far fa-cloud-music",
            "far fa-film",
            "far fa-popcorn",
            "far fa-gift",
            "far fa-theater-masks",
            "far fa-book-alt",
            "far fa-burger-soda",
            "far fa-utensils-alt",
            "far fa-cheeseburger",
            "far fa-coffee-togo",
            "far fa-wine-bottle",
            "far fa-dog",
            "far fa-cat",
            "far fa-desktop",
            "far fa-mobile-alt",
            "far fa-headphones"
        ]
    }),
    getters: {
        getIcons(state) {
            return state.icons;
        }
    },
    mutations: {
        setIconList(state, icons) {
            state.icons = icons;
        }
    },
    actions: {
        async getIcons({commit}) {
            try {
                const result = await axios.get('http://localhost:8081/icon');
                commit('setIconList', result.data);
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}