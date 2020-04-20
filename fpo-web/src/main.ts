import Vue from "vue";
import App from "@/App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import routes from "@/routes.ts";
import { store } from "@/store";

import "@/styles/index.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";

// https://www.npmjs.com/package/vue-fontawesome-icon
// import material-icon scss
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({ routes: routes, mode: "history" });

new Vue({
  router: router,
  render: (h) => h(App),
  store,
  data: {},
}).$mount("#app");
