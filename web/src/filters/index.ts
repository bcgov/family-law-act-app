import Vue from 'vue'
import moment from 'moment-timezone';
import store from '@/store';


Vue.filter('beautify-date', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return date.substr(8,2) + ' ' + MonthList[Number(date.substr(5,2))] + ' ' + date.substr(0,4);
	else
		return ''
})

Vue.filter('beautify-date-weekday', function(date){
	if(date)
		return	moment(date).format('ddd MMM DD, YYYY HH:mm');
	else
		return ''
})

Vue.filter('scrollToLocation', function(locationName){
	if(locationName){
		Vue.nextTick(()=>{
			const el = document.getElementsByName(locationName)
			console.log(el)
			if(el[0]) el[0].scrollIntoView();
		})
	}
})

Vue.filter('getFullName',function(nameObject){
	if (nameObject) {
		return nameObject.first +
			" " +
			nameObject.middle +
			" " +
			nameObject.last;
	} else{
		return " "
	}
})

Vue.filter('getFullAddress',function(nameObject){
	if (nameObject) {
		return nameObject.street +
			", " +
			nameObject.city +
			", " +
			nameObject.state+
			", " +
			nameObject.country+
			", " +
			nameObject.postcode;
	} else{
		return " "
	}
})

Vue.filter('getFullContactInfo',function(nameObject){
	if (nameObject) {
		return "Phone: " +
			nameObject.phone +
			", Email: " +
			nameObject.email +
			", Fax: " +
			nameObject.fax;
	} else{
		return " "
	}
})

Vue.filter('setSurveyProgress', function(survey, currentStep: number, currentPage: number, defaultProgress: number, beforeDestroy: boolean){

	let progress =  defaultProgress;
	//if(survey && Object.keys(survey.data).length)
	if(survey && store.state.Application.steps[currentStep].pages[currentPage].progress)
		progress = survey.isCurrentPageHasErrors? 50 : 100;
	//console.log(store.state.Application.steps[currentStep].pages[currentPage].progress)
	store.commit("Application/setPageProgress", { currentStep: currentStep, currentPage:currentPage, progress:progress });
	//const currPage = document.getElementById("step-" + currentStep+"-page-" + currentPage);
	// if(currPage){
	// 	if(progress != 100){
	// 		currPage.style.color = beforeDestroy? "red":"";
	// 		currPage.className =  beforeDestroy? "":"current";
	// 	}
	// 	else
	// 	{
	// 		currPage.style.color = "";
	// 		currPage.className = beforeDestroy? "":"current";
	// 	}  
	// }  
	const reviewProgress = store.state.Application.steps[8].pages[0].progress
	if(currentStep < 8 && reviewProgress){
		console.log('review required')
		console.log(currentStep)
		store.commit("Application/setPageProgress", { currentStep: 8, currentPage:0, progress:50 });
	}
})


Vue.filter('getSurveyResults', function(survey, currentStep: number, currentPage: number){
	//____________________________________________________________________
	//console.log(survey)if(question.titleLocation!="hidden" && question.title != " " && question.title != "" && question.isVisible)
	// console.log(survey.currentPage.title)
	 console.log(survey.currentPage.questions)
	// console.log(survey.data)
	const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
	for(const question of survey.currentPage.questions){
		if(question.isVisible)
			if(survey.data[question.name]){
				// console.log("____________")
				// console.log(question)
				// console.log(question.name)
				// console.log(question.inputType)
				// console.log(question.questionValue);
				// if(Array.isArray(question.questionValue))
				//     console.log(question.questionValue.join());
				// else
				//     console.log(question.questionValue);
				// console.log(question.title)

				questionResults.push({name:question.name, value: question.questionValue, title:question.title, inputType:question.inputType})
			} else if(question.isRequired ){
				// console.error("____________")
				// console.log(question)
				// console.log(question.name)
				// console.log(question.inputType)
				// console.log(question.questionValue);
				questionResults.push({name:question.name, value: "", title:question.title, inputType:question.inputType})
				
			}
		//__specialities
		else if(question.name=='PartiesHasOtherChilderen' && question.isVisible)
			questionResults.push({name:question.name, value: question.questionValue, title:question.title, inputType:question.inputType})

	}
	// console.log(result)
	// console.log(document.getElementsByName("inCourtForPO"))
	return {data: survey.data, questions:questionResults, pageName:survey.currentPage.title, currentStep: currentStep, currentPage:currentPage}
})


Vue.filter('extractRequiredDocuments', function(questions){
	//console.log(questions)
	const requiredDocuments = [];
	if(questions.questionnaireSurvey && questions.questionnaireSurvey.orderType == "changePO"){
		requiredDocuments.push("Copy of the existing protection order")
	}else if(questions.questionnaireSurvey && questions.questionnaireSurvey.orderType == "terminatePO"){
		requiredDocuments.push("Copy of the existing protection order")
	}else if(questions.questionnaireSurvey && questions.questionnaireSurvey.orderType == "needPO"){
		if(questions.protectionWhomSurvey && questions.protectionWhomSurvey.ExistingFamilyCase =="y"){
			if(questions.protectionWhomSurvey.ExistingFileNumber && questions.protectionWhomSurvey.ExistingCourt) requiredDocuments.push("Copy of the Family Law file number:" + questions.protectionWhomSurvey.ExistingFileNumber + " submitted to the court at " + questions.protectionWhomSurvey.ExistingCourt);
			else requiredDocuments.push("Copy of the Family Law file open between you and the other parties");
		}
		if(questions.backgroundSurvey && questions.backgroundSurvey.existingPOOrders=="y"){
			requiredDocuments.push("Copy of the existing court orders protecting one of the parties or restraining contact between the parties");
		}
		if(questions.backgroundSurvey && questions.backgroundSurvey.ExistingOrders=="y"){
			requiredDocuments.push("Copy of the existing written agreements or court order(s) about the child(ren) concerning parenting arrangements, child support, contact with a child or guardianship of a child");
		}
	}
	//this.UpdateRequiredDocuments(requiredDocuments)
	//console.log('required documents')
	//console.log(requiredDocuments)

	return requiredDocuments;
})