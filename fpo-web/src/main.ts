import Vue from "vue";
import App from "@/App.vue";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueRouter from "vue-router";
import routes from "@/routes";
import GlobalStore from "@/store";
import http from "./plugins/http.js";
import "./filters";

import "@/styles/index.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";

// https://www.npmjs.com/package/vue-fontawesome-icon
// import material-icon scss
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(http)

const router = new VueRouter({
  routes: routes, mode: "history", base: "/apply-for-family-order/",
  scrollBehavior(to, from, savedPosotion) { 
    return { x: 0, y: 0 }
   }
});
// Redirect to /apply-for-family-order/
history.pushState({page: "home"}, "", "/apply-for-family-order/")

new Vue({
  router: router,
  render: (h) => h(App),
  store: GlobalStore.getInstance(),
  data: {},
}).$mount("#app");
