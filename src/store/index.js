import {createStore} from "vuex";
import {accountModule} from "@/store/accountModule"

export default createStore({
    modules: {
        account: accountModule
    }
})