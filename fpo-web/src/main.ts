import Vue from "vue";
import App from "@/App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import routes from "@/routes";
import GlobalStore from "@/store";
import http from "./plugins/http.js";

import "@/styles/index.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";

// https://www.npmjs.com/package/vue-fontawesome-icon
// import material-icon scss
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(http)

const router = new VueRouter({
  routes: routes, mode: "history", base: "/family-law-act/",
  scrollBehavior(to, from, savedPosotion) { 
    return { x: 0, y: 0 }
   }
});

new Vue({
  router: router,
  render: (h) => h(App),
  store: GlobalStore.getInstance(),
  data: {},
}).$mount("#app");
