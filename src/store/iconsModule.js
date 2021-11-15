import axios from "axios";

export const iconsModule = {
    state: () => ({
        icons: []
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
                const result = await axios.get('http://' + location.hostname + ':8081/icon');
                commit('setIconList', result.data);
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}