import {createStore} from "vuex";
import {accountModule} from "@/store/accountModule"
import {iconsModule} from "@/store/iconsModule";
import {transactionModule} from "@/store/transactionModule";
import {dateModule} from "@/store/dateModule";

export default createStore({
    modules: {
        account: accountModule,
        icon: iconsModule,
        transaction: transactionModule,
        date: dateModule
    }
})