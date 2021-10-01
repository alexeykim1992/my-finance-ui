import {createStore} from "vuex";
import {accountModule} from "@/store/accountModule"
import {iconsModule} from "@/store/iconsModule";

export default createStore({
    modules: {
        account: accountModule,
        icon: iconsModule
    }
})