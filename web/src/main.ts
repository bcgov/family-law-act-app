import Vue from "vue";
import App from "@/App.vue";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueRouter from "vue-router";
import VueCookies from "vue-cookies"
import routes from "@/routes";
import store from "@/store";
import http from "./plugins/http";
import "./filters";
import LoadingSpinner from "./components/utils/LoadingSpinner.vue";

import "@/styles/index.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "font-awesome/css/font-awesome.min.css";
import { SessionManager } from "@/components/utils/utils";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(http)
Vue.component('loading-spinner', LoadingSpinner);

const router = new VueRouter({
    routes: routes, 
    mode: "history", 
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosotion) { 
        return { x: 0, y: 0 }
    }
});

// Redirect to /family-law-act/
if(!location.pathname.includes('/result/'))
    history.pushState({page: "home"}, "", process.env.BASE_URL)

SessionManager.redirectIfQuickExitCookie();

new Vue({
    router: router,
    render: (h) => h(App),
    store: store,
    data: {},
}).$mount("#app");
