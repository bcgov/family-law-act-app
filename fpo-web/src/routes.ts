import LandingPage from "@/components/views/LandingPage.vue";
import LoginPage from "@/components/views/LoginPage.vue";
import ServiceLocator from "@/components/views/ServiceLocator.vue";
import FlappSurveys from "@/components/FlappSurveys.vue";
import ApplicantStatus from "@/components/status/ApplicantStatus.vue";
import GlobalStore from "@/store";

function userGuard(to: any, from: any, next: any) {
  var store = GlobalStore.getInstance();

  if (store.getters["application/getUserType"]) {
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
    component: LoginPage,
  }, //, props: true
  {
    path: "/serviceLocator",
    name: "service-locator",
    component: ServiceLocator,
  },
  { path: "/getStarted", name: "flapp-surveys", component: FlappSurveys },
  { path: "/status", name: "applicant-status", component: ApplicantStatus },
];

export default routes;
