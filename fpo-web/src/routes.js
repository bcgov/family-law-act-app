import LandingPage from "./components/views/LandingPage.vue";
import LoginPage from "./components/views/LoginPage.vue";
import ServiceLocator from "./components/views/ServiceLocator.vue";
import FlappSurveys from "./components/FlappSurveys.vue";
import ApplicationStatus from "./components/status/ApplicationStatus.vue";
import { store } from "./store/store";

function userGuard(to, from, next) {
  if (store.getters.userType) {
    next();
  } else {
    next({ path: "/" });
  }
}

const routes = [
  { path: "/", component: LandingPage },
  {
    path: "/login",
    name: "login",
    beforeEnter: userGuard,
    component: LoginPage,
  },
  { path: "/serviceLocator", name: "serviceLocator", component: ServiceLocator },
  { path: "/getStarted", name: "FlappSurveys", component: FlappSurveys },
  { path: "/status", name: "status", component: ApplicationStatus },
];

export default routes;
