import {createStore} from "vuex";
import {accountModule} from "@/store/accountModule"
import {iconsModule} from "@/store/iconsModule";
import {transactionModule} from "@/store/transactionModule";

export default createStore({
    modules: {
        account: accountModule,
        icon: iconsModule,
        transaction: transactionModule
    }
})