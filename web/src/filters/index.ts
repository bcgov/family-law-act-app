import Vue from 'vue'
import moment from 'moment-timezone';
import store from '@/store';

import {customCss} from './bootstrapCSS'


Vue.filter('beautify-date-', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return date.substr(8,2) + ' ' + MonthList[Number(date.substr(5,2))] + ' ' + date.substr(0,4);
	else
		return ''
})

Vue.filter('beautify-date', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return MonthList[Number(date.substr(5,2))] + ' ' +date.substr(8,2) + ' ' +  date.substr(0,4);
	else
		return 'unknown'
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
		return 	(nameObject.street?(nameObject.street +", "):'') +
				(nameObject.city?(nameObject.city +", "):'') +
				(nameObject.state?(nameObject.state +", "):'') +
				(nameObject.country?(nameObject.country +", "):'') +
				(nameObject.postcode);
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

	if(survey && store.state.Application.steps[currentStep].pages[currentPage].progress)
		progress = survey.isCurrentPageHasErrors? 50 : 100;

	store.commit("Application/setPageProgress", { currentStep: currentStep, currentPage:currentPage, progress:progress });
	
	// const reviewProgress = store.state.Application.steps[8].pages[0].progress
	// if(currentStep < 8 && reviewProgress){
	// 	console.log('review required')
	// 	console.log(currentStep)
	// 	store.commit("Application/setPageProgress", { currentStep: 8, currentPage:0, progress:50 });
	// }
})


Vue.filter('getSurveyResults', function(survey, currentStep: number, currentPage: number, optionalArg?){
	//____________________________________________________________________
	//console.log(survey)if(question.titleLocation!="hidden" && question.title != " " && question.title != "" && question.isVisible)
	// console.log(survey.currentPage.title)
	// console.log(survey.currentPage.questions)
	// console.log(survey.data)

	const supportingDocumentForm4 = store.state.Application.supportingDocumentForm4
	// console.log(supportingDocumentForm4)
	// console.log(currentPage)
	// console.log(supportingDocumentForm4.indexOf(currentPage))

	const index = supportingDocumentForm4.indexOf(currentPage)
	if(index>=0) supportingDocumentForm4.splice(index,1);
	let flagForm4 = false;

	const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
	for(const question of survey.currentPage.questions){
		//console.log(question.title)
		//console.log(question.isVisible)
		//console.log(question.questionValue)
		if(question.isVisible && question.name.startsWith("parentFileForm4Info")){
			console.log(question.name)
			flagForm4 = true
		}
			
		if(question.isVisible && question.questionValue!=true){			
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
				
			}else if(question.name=='extraordinaryExpensesTable' && question.isVisible){
				console.log(question)//
				questionResults.push({name:question.name, value: optionalArg?optionalArg:'$0', title:question.title, inputType:question.inputType})
			}	
		}
		//__specialities
		else if(question.name=='PartiesHasOtherChilderen' && question.isVisible)
			questionResults.push({name:question.name, value: question.questionValue, title:question.title, inputType:question.inputType})
		
	}
	// console.log(result)
	if(flagForm4){
		supportingDocumentForm4.push(currentPage)
		store.commit("Application/setSupportingDocumentForm4", supportingDocumentForm4);
	}
	// console.log(document.getElementsByName("inCourtForPO"))
	return {data: survey.data, questions:questionResults, pageName:survey.currentPage.title, currentStep: currentStep, currentPage:currentPage}
})

Vue.filter('getPathwayABRV',function(name){	
	//protectionOrder:false, familyLawMatter:false, caseMgmt:false, priotityParenting:false, childReloc:false, agreementEnfrc:false

	if (name == 'protectionOrder') return "AAP";
	if (name == 'familyLawMatter') return "FLC";
	if (name == 'caseMgmt') return "ACMO";
	if (name == 'priotityParenting') return "AXP";
	if (name == 'childReloc') return "APRC";
	if (name == 'agreementEnfrc') return "AFET";
	
})

Vue.filter('translateTypes',function(applicationTypes: string[]) {

	let types = [];

	for (const applicationType of applicationTypes){
		if (applicationType.includes("Protection Order")){
			types.push(applicationType.replace("Protection Order", "FPO"));
		}
		if (applicationType.includes("Family Law Matter")){
			types.push("FLC");
		}
		if (applicationType.includes("Case Management")){
			types.push("ACMO");
		}
		if (applicationType.includes("Priotity Parenting Matter")){
			types.push("AXP");
		}
		if (applicationType.includes("Relocation of a Child")){
			types.push("APRC");
		}
		if (applicationType.includes("Enforcement of Agreements and Court Orders")){
			types.push("AFET");
		}
	}

	return types.toString();
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

	//filingLocationSurvey.ExistingFamilyCase: "y"  requiredDocuments.push("Copy of the Family Law file open between you and the other parties");
	
	//flmBackgroundSurvey.ExistingOrdersFLM: "y" existingOrdersListFLM.includes(Parenting Arrangements including `parental responsibilities` and `parenting time` ||  Child Support||Contact with a Child||Guardianship of a Child||Spousal Support)  && flmSelectedForm.selectedForm "parentingArrangements" "childSupport" "contactWithChild" "guardianOfChild" "spousalSupport"  requiredDocuments.push("Copy of the existing written agreement(s) or court order(s) about Family-Law-Matter");
	
	//flmBackgroundSurvey.existingPOOrders=="y" 	requiredDocuments.push("Copy of the existing court orders protecting one of the parties or restraining contact between the parties");
		
	//parentFileForm4Info in STORE  requiredDocuments.push("Copy of the Financial Statement in Form 4")
	
	//calculatingChildSupportSurvey.attachingCalculations=='y' requiredDocuments.push("Copy of the calculations showing how much child support you believe should be paid according to the child support guidelines")"
	


	//REMINDERS 
	//aboutExistingChildSupportSurvey.filedWithDirector: "y" reminders.push("You must serve a copy of the application on the director of Maintenance Enforcement.")
	//indigenousAncestryOfChildSurvey.indigenousAncestry.includes("Nisga’a") ||indigenousAncestryOfChildSurvey.indigenousAncestry.includes("Treaty First Nation")  reminders.push("You must serve the Nisga’a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the Family Law Act.")
	return requiredDocuments;
})


Vue.filter('printPdf', function(html, pageFooterLeft, pageFooterRight){

	//console.log(customCss)
	const body = 
		`<!DOCTYPE html>
		<html lang="en">
		<head>		
		<meta charset="UTF-8">
		<title>Family Law Act</title>`+
		`<style>`+
			`@page {
				size: 8.5in 11in !important;
				margin: .7in 0.7in 0.9in 0.7in !important;
				font-size: 10pt !important;			
				@bottom-left {
					content:`+ pageFooterLeft +
					`white-space: pre;
					font-size: 7pt;
					color: #606060;
				}
				@bottom-right {
					content:`+pageFooterRight+` "  Page " counter(page) " of " counter(pages);
					font-size: 7pt;
					color: #606060;
				}
			}`+
			`@media print{
				.new-page{
					page-break-before: always;
					position: relative; top: 8em;
				}
				section{
					page-break-inside: avoid;
				}
				.print-block{
					page-break-inside: avoid;
				}
			}`+ customCss+
			`@page label{font-size: 9pt;}
			.container {				
				padding: 0 !important; 
				margin: 0 !important;				
				width: 100% !important;
				max-width: 680px !important;
				min-width: 680px !important;			
				font-size: 10pt !important;
				font-family: BCSans !important;
				color: #313132 !important;
			}
			`+
			`td.border-dark {border: 1px solid #313132 !important;}`+
			`th.border-dark {border: 1px solid #313132 !important;}`+
			`td.border-top-0{border-top: 0px solid #FFF !important;border-bottom: 1px solid #313132 !important;border-left: 1px solid #313132 !important; border-right: 1px solid #313132 !important;}`+
			`th.border-bottom-0{border-top: 1px solid #313132 !important;border-bottom: 0px solid #FFF !important;border-left: 1px solid #313132 !important; border-right: 1px solid #313132 !important;}`+
			`tr{height: 1.5rem;}`+
			`table.fullsize {table-layout: fixed; width: 100%; margin-top:1rem;}`+
			`table.fullsize tr{border:1px solid #313132;}`+
			`table.fullsize td{padding:0 0 0 .5rem; color: #313132;}`+

			`.answer{color: #000; display:inline; font-size:11pt;}`+
			`.answerbox{color: #000; font-size:11pt; display:block; text-indent:0px; margin:0.5rem 0 0 0rem;}`+
    		`.uline{text-decoration: underline; display: inline;}`+
			`.form-header{display:block; margin:0 0 5rem 0;}`+
			`.checkbox{margin:0 1rem 0 0;}`+
			`.marginleft{margin:0 0 0 0.07rem;}`+
			`.marginleftminus{margin:0 0 0 -1rem;}`+
			`.marginleftplus{margin:0 0 0 1rem !important;}`+			

			`section{ counter-increment: question-counter; text-indent: -17px; text-align: justify; text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;}`+ 
			`section:before {font-weight: bolder; content:counter(question-counter) ".";}`+
			`section.resetquestion{counter-reset: question-counter;}`+
			
			`ol.resetcounter{list-style: none;counter-reset: bracket-counter;}`+
			`ol li.bracketnumber{text-indent: -25px;text-align: justify;text-justify: inter-word;margin:1rem 0;counter-increment: bracket-counter;}`+
			`ol li.bracketnumber:before {content:"(" counter(bracket-counter) ") ";font-weight: bold;}`+
			`ol.resetlist {list-style: none;counter-reset: list-counter;}`+
			`ol li.listnumber{text-indent: -25px;text-align: justify;text-justify: inter-word;margin:1rem 0;counter-increment: list-counter;}`+
			`ol li.listnumber:before {content:counter(list-counter) ". ";font-weight: bold;}`+
			`ol li.bracketalpha{text-indent: -20px;margin:0.75rem 0;counter-increment: alpha;}`+
			`ol li.bracketalpha:before {content:"(" counter(alpha, lower-alpha)") ";}`+			
			
			`
			body{				
				font-family: BCSans;
			}
			`+
			// div.ch
			// {
			// 	text-align:justify; 
			// 	text-indent:1.8rem;
			// 	text-align-last: justify;
			// }
			// .ch::after{
			// 	text-align:justify;
			// }
			// .checkbox::before{
			// 	transform:translate(0px,2px);        
			// 	height:16px;
			// 	width:16px;
			// 	content:url("data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJjaGVjay1zcXVhcmUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jaGVjay1zcXVhcmUgZmEtdy0xNCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MDAgMzJINDhDMjEuNDkgMzIgMCA1My40OSAwIDgwdjM1MmMwIDI2LjUxIDIxLjQ5IDQ4IDQ4IDQ4aDM1MmMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4VjgwYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6bTAgNDAwSDQ4VjgwaDM1MnYzNTJ6bS0zNS44NjQtMjQxLjcyNEwxOTEuNTQ3IDM2MS40OGMtNC43MDUgNC42NjctMTIuMzAzIDQuNjM3LTE2Ljk3LS4wNjhsLTkwLjc4MS05MS41MTZjLTQuNjY3LTQuNzA1LTQuNjM3LTEyLjMwMy4wNjktMTYuOTcxbDIyLjcxOS0yMi41MzZjNC43MDUtNC42NjcgMTIuMzAzLTQuNjM3IDE2Ljk3LjA2OWw1OS43OTIgNjAuMjc3IDE0MS4zNTItMTQwLjIxNmM0LjcwNS00LjY2NyAxMi4zMDMtNC42MzcgMTYuOTcuMDY4bDIyLjUzNiAyMi43MThjNC42NjcgNC43MDYgNC42MzcgMTIuMzA0LS4wNjggMTYuOTcxeiI+PC9wYXRoPjwvc3ZnPg==");		
			// }
			// div.checkbox {
			// 	display:inline-block;
				
			// 	content:url("data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJjaGVjay1zcXVhcmUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jaGVjay1zcXVhcmUgZmEtdy0xNCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MDAgMzJINDhDMjEuNDkgMzIgMCA1My40OSAwIDgwdjM1MmMwIDI2LjUxIDIxLjQ5IDQ4IDQ4IDQ4aDM1MmMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4VjgwYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6bTAgNDAwSDQ4VjgwaDM1MnYzNTJ6bS0zNS44NjQtMjQxLjcyNEwxOTEuNTQ3IDM2MS40OGMtNC43MDUgNC42NjctMTIuMzAzIDQuNjM3LTE2Ljk3LS4wNjhsLTkwLjc4MS05MS41MTZjLTQuNjY3LTQuNzA1LTQuNjM3LTEyLjMwMy4wNjktMTYuOTcxbDIyLjcxOS0yMi41MzZjNC43MDUtNC42NjcgMTIuMzAzLTQuNjM3IDE2Ljk3LjA2OWw1OS43OTIgNjAuMjc3IDE0MS4zNTItMTQwLjIxNmM0LjcwNS00LjY2NyAxMi4zMDMtNC42MzcgMTYuOTcuMDY4bDIyLjUzNiAyMi43MThjNC42NjcgNC43MDYgNC42MzcgMTIuMzA0LS4wNjggMTYuOTcxeiI+PC9wYXRoPjwvc3ZnPg==");
			// }
			
			
		`</style>
		</head>
		<body>
			
				<div class="container">
					`+html+
		`</div></body></html>`	 
	
	return body
})