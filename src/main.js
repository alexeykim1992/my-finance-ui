import { createApp } from 'vue';
import App from '@/App';
import router from '@/pages/router';
import store from "@/store";

const app = createApp(App);

app
    .use(router)
    .use(store)
    .mount('#app');
