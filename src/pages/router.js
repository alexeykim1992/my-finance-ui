import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage";
import WelcomePage from "@/pages/WelcomePage";
import AboutPage from "@/pages/AboutPage";
import UserPage from "@/pages/UserPage";

const routes = [{
    path: '/',
    component: MainPage
}, {
    path: '/welcome',
    component: WelcomePage
}, {
    path: '/about',
    component: AboutPage
}, {
    path: '/user',
    component: UserPage
}]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;