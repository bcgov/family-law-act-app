	import LandingPage from "@/components/home/LandingPage.vue";
	import ResultPage from "@/components/steps/submit/ResultPage.vue";
	import AvailableServices from "@/components/home/AvailableServices.vue";
	import FlappSurveys from "@/components/FlappSurveys.vue";
	import ApplicationStatus from "@/components/status/ApplicationStatus.vue";
	import TermsConditions from "@/components/status/TermsConditions.vue";
	import Statistics from "@/components/statistics/Statistics.vue";
	import { SessionManager } from "@/components/utils/utils";
	import VueResource from 'vue-resource';
	import store from "@/store";


	async function authGuard(to: any, from: any, next: any) {
		const result = await SessionManager.getUserInfo(store);
		if (result.userId)
			next();
		else if (result.loginUrl)
			location.replace(result.loginUrl);
	}

	async function statsAuthGuard(to: any, from: any, next: any) {
		console.log('here')
		// const result = await SessionManager.getUserInfo(store);
		// if (result.userId){
		// 	if (result.userHasStatisticsAccess){
				next();
		// 	} else {
		// 		location.replace('/dashboard');
		// 	}
		// }
		// else if (result.loginUrl)
		// 	location.replace(result.loginUrl);
	}

	const routes = [
	{
		path: "/",
		component: LandingPage
	},
	{
		path: "/apply-for-family-order",
		component: LandingPage
	},  
	{
		path: "/availableServices",
		name: "available-services",
		beforeEnter: authGuard,
		component: AvailableServices
	},
	{
		path: "/result/:id/:result",
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
	},
	{
		path: "/statistics",
		name: "statistics",
		beforeEnter: statsAuthGuard,
		component: Statistics
	}
	];

	export default routes;
