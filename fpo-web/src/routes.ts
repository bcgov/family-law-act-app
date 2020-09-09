import LandingPage from "@/components/views/LandingPage.vue";
import ServiceLocator from "@/components/views/ServiceLocator.vue";
import FlappSurveys from "@/components/FlappSurveys.vue";
import ApplicationStatus from "@/components/status/ApplicationStatus.vue";
import GlobalStore from "@/store";
import TermsConditions from "@/components/status/TermsConditions.vue"
import axios from "axios";

function userGuard(to: any, from: any, next: any) {
  const store = GlobalStore.getInstance();

  if (store.getters["application/getUserType"]) {
    next();
  } else {
    next({ path: "/" });
  }
}

function authGuard(to: any, from: any, next: any) { 

  axios.get('api/v1/user-info/')
  .then((response) => {
    const userId = response.data.user_id;
    const loginUrl = response.data.login_uri;
    
    if (userId) {
      const userName = response.data.first_name + " " + response.data.last_name;
      this.$store.dispatch("application/setUserName", userName);
      this.$store.dispatch("common/setUserId", userId);
      next();
    } else {
      location.replace(loginUrl);
    }
  }).catch((error) => {
    //TODO: determine workflow
    console.log(error)   
    
  });
}

const routes = [
  { path: "/", component: LandingPage },  
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
