import LandingPage from "@/components/views/LandingPage.vue";
import ServiceLocator from "@/components/views/ServiceLocator.vue";
import ResultPage from "@/components/views/ResultPage.vue";
import FlappSurveys from "@/components/FlappSurveys.vue";
import ApplicationStatus from "@/components/status/ApplicationStatus.vue";
import GlobalStore from "@/store";
import TermsConditions from "@/components/status/TermsConditions.vue"
import { SessionManager } from "@/components/utils/utils";


const store = GlobalStore.getInstance();

// function userGuard(to: any, from: any, next: any) {
//   const store = GlobalStore.getInstance();

//   if (store.getters["application/getUserType"]) {
//     next();
//   } else {
//     next({ path: "/" });
//   }
// }

async function authGuard(to: any, from: any, next: any) { 
  var result = await SessionManager.getUserInfo(store);
  if (result.userId)
    next();
  else if (result.loginUrl)
    location.replace(result.loginUrl);
}

const routes = [
  { path: "/", component: LandingPage },  
  {
    path: "/serviceLocator",
    name: "service-locator",
    beforeEnter: authGuard,
    component: ServiceLocator,
  },
  {
    path: "/results/:result",
    name: "result-page",
    component: ResultPage,
  },
  { 
    path: "/getStarted",
    name: "flapp-surveys",
    beforeEnter: authGuard,
    component: FlappSurveys
  },
  { 
    path: "/status",
    name: "applicant-status",
    beforeEnter: authGuard,
    component: ApplicationStatus 
  },
  { 
    path: "/terms", 
    name: "terms", 
    component: TermsConditions
  }
];

export default routes;
