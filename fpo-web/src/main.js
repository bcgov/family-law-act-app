import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "./styles/index.scss";
import VueRouter from "vue-router";
import routes from "./routes";
import "bootstrap-vue/dist/bootstrap-vue.css";

// https://www.npmjs.com/package/vue-fontawesome-icon
// import material-icon scss
import "font-awesome/css/font-awesome.min.css";
import { store } from "./store/store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({routes, mode: 'history'});

new Vue({
  router: router,
  render: h => h(App),
  store,
  data: {
    survey: window.survey
  }
}).$mount("#app");
