import LandingPage from './components/landingNavigation/LandingPage.vue';
import Login from './components/landingNavigation/Login.vue';
import ServiceLocator from './components/landingNavigation/ServiceLocator.vue';
import FlappSurveys from './components/FlappSurveys.vue';
import Status from './components/status/Status.vue';
import { store } from "./store/store";

function userGuard(to, from, next) {
    if (store.getters.userType) {
        next();
    } else {
        next({ path: '/' });
    }
}

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', name: 'login', beforeEnter: userGuard, component: Login }, //, props: true
    { path: '/serviceLocator', name: 'serviceLocator', component: ServiceLocator },
    { path: '/getStarted', name: 'FlappSurveys', component: FlappSurveys },
    { path: '/status', name: 'status', component: Status }
];

export default routes;