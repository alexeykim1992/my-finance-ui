import axios from "axios";

export const userModule = {
    state: () => ({
        current: {
            id: -1,
            login: '',
            name: 'noname',
            creationDate: new Date()
        }
    }),
    mutations: {
        setUser(state, user) {
            state.current = user;
        }
    },
    actions: {
        async getCurrentUser({commit}) {
            try {
                const result = await axios.get('http://localhost:8081/user');
                commit('setUser', result.data);
            } catch (e) {
                console.error(e);
            }
        }
    },
    namespaced: true
}