import { createApp } from 'vue';
import App from '@/App';
import components from '@/components/UI'
import router from '@/pages/router';
import store from "@/store";
import '@/assets/style.scss';

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
})

app
    .use(router)
    .use(store)
    .mount('#app');
