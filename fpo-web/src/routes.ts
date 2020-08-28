import LandingPage from "@/components/views/LandingPage.vue";
import LoginPage from "@/components/views/LoginPage.vue";
import ServiceLocator from "@/components/views/ServiceLocator.vue";
import FlappSurveys from "@/components/FlappSurveys.vue";
import ApplicationStatus from "@/components/status/ApplicationStatus.vue";
import GlobalStore from "@/store";
import TermsConditions from "@/components/status/TermsConditions.vue"

function userGuard(to: any, from: any, next: any) {
  const store = GlobalStore.getInstance();

  if (store.getters["application/getUserType"]) {
    next();
  } else {
    next({ path: "/" });
  }
}

function authGuard(to: any, from: any, next: any) {  
  const userInfo = this.$store.dispatch("application/setUserInfo")

  if (userInfo.user_id) {
    next();
  } else {
    next({ path: userInfo.login_url });
  }
}

const routes = [
  { path: "/", component: LandingPage },
  {
    path: "/login",
    name: "login-page",
    beforeEnter: userGuard,
    component: LoginPage,
  },
  {
    path: "/serviceLocator",
    name: "service-locator",
    component: ServiceLocator,
  },
  { 
    path: "/getStarted",
    name: "flapp-surveys",
    beforeEnter: authGuard,
    component: FlappSurveys
  },
  { path: "/status", name: "applicant-status", component: ApplicationStatus },
  { path: "/terms", name: "terms", component: TermsConditions}
];

export default routes;
