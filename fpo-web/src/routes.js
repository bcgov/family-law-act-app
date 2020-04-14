import LandingPage from "./components/views/LandingPage.vue";
import LoginPage from "./components/views/LoginPage.vue";
import ServiceLocator from "./components/views/ServiceLocator.vue";
import FlappSurveys from "./components/FlappSurveys.vue";
import ApplicantStatus from "./components/status/ApplicantStatus.vue";
import ChildrenTable from "./components/ChildrenTable.vue";
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
    name: "login-page",
    beforeEnter: userGuard,
    component: LoginPage
  }, //, props: true
  {
    path: "/serviceLocator",
    name: "service-locator",
    component: ServiceLocator
  },
  { path: "/getStarted", name: "flapp-surveys", component: FlappSurveys },
  { path: "/status", name: "applicant-status", component: ApplicantStatus },
  { path: "/kids", name: "children-table", component: ChildrenTable }
];

export default routes;
