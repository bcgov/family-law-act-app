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

Vue.filter('styleTitle',function(title){
	return "<div style='display:inline; color:#29877c'>" + title + "</div>"
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
	const pre = "<div style='display:inline; color:#10669c'>"
	const post = "</div>"
	if (nameObject) {
		return pre+"Phone: "+post+
			nameObject.phone +
			", "+pre+"Email: "+post+
			nameObject.email +
			", "+pre+"Fax: "+post+
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

Vue.filter('setProgressForPages', function(currentStep: number, pageNumbers: number[], progress: number){
	for (const page of pageNumbers)
		if(store.state.Application.steps[currentStep].pages[page].progress)
			store.commit("Application/setPageProgress", { currentStep: currentStep, currentPage:page, progress:progress });
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

	if(optionalArg && optionalArg.name && optionalArg.value && optionalArg.title){
		console.error('_________')
		console.log(optionalArg)
		questionResults.push(optionalArg)
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

Vue.filter('getFullOrderName',function(orderName, specific){
	if (orderName == "protectionOrder" && specific == '') return "Protection Order";
	else if (orderName == "protectionOrder" && specific == 'needPO') return "New Protection Order";
	else if (orderName == "protectionOrder" && specific == 'changePO') return "Change Protection Order";
	else if (orderName == "protectionOrder" && specific == 'terminatePO') return "Terminate Protection Order";
	else if (orderName == "familyLawMatter") return "Family Law Matter";
	else if (orderName == "caseMgmt") return "Case Management";
	else if (orderName == "priotityParenting") return "Priotity Parenting Matter";
	else if (orderName == "childReloc") return "Relocation of a Child";
	else if (orderName == "agreementEnfrc") return "Enforcement of Agreements and Court Orders";
	else return "";
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

Vue.filter('extractRequiredDocuments', function(questions, type){
	//console.log(questions)
	const requiredDocuments: string[] = [];
	const reminderDocuments: string[] = [];

	if(type == 'protectionOrder'){		
	
		if(questions.selectedPOOrder && questions.selectedPOOrder.orderType == "changePO"){
			requiredDocuments.push("Copy of your existing written agreement(s) or court order(s)")
		}else if(questions.selectedPOOrder && questions.selectedPOOrder.orderType == "terminatePO"){
			requiredDocuments.push("Copy of your existing written agreement(s) or court order(s)")
		}else if(questions.selectedPOOrder && questions.selectedPOOrder.orderType == "needPO"){
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
	}

	if(type == 'familyLawMatter'){	

		//if(questions.filingLocationSurvey && questions.filingLocationSurvey.ExistingFamilyCase == "y")
		
		if(questions.flmBackgroundSurvey && questions.flmBackgroundSurvey.existingPOOrders == "y"|| questions.flmBackgroundSurvey && questions.flmBackgroundSurvey.ExistingOrdersFLM == "y")
		  	requiredDocuments.push("Copy of your existing written agreement(s) or court order(s)");
	
		//questions.flmBackgroundSurvey.existingOrdersListFLM.includes('Parenting Arrangements including `parental responsibilities` and `parenting time`') && questions.flmSelectedForm.includes("parentingArrangements")
		//	||  'Child Support'||'Contact with a Child'||'Guardianship of a Child'||'Spousal Support')  &&
		//	"childSupport" "contactWithChild" "guardianOfChild" "spousalSupport"  
		
		// if(questions.flmBackgroundSurvey && questions.flmBackgroundSurvey.existingPOOrders == "y")
		// 	requiredDocuments.push("Copy of the existing court orders protecting one of the parties or restraining contact between the parties");
		
		if(store.state.Application.supportingDocumentForm4.length>0)	
			requiredDocuments.push("Completed <a href='https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178' target='_blank' > Financial Statement Form 4 </a>");
		
		if((questions.calculatingChildSupportSurvey && 
			questions.calculatingChildSupportSurvey.attachingCalculations == 'y' &&
			questions.flmSelectedForm &&
			questions.flmSelectedForm.includes("childSupport"))
		|| (questions.calculatingSpousalSupportSurvey && 
			questions.calculatingSpousalSupportSurvey.attachingCalculations== 'y' &&
			questions.flmSelectedForm &&
			questions.flmSelectedForm.includes("spousalSupport")))
				requiredDocuments.push("Support calculation");

		if(questions.GuardianOfChildSurvey && questions.GuardianOfChildSurvey.applicantionType && questions.GuardianOfChildSurvey.applicantionType.includes('becomeGuardian') ){
			requiredDocuments.push("Completed  <a class='mr-1' href='https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/supreme-family/s-51-consent-child-protection-record-check.pdf?forcedownload=true' target='_blank' > Consent for Child Protection Record Check Form 5 </a> <i> Family Law Act Regulation </i>");
			requiredDocuments.push("Completed  <a class='mr-1' href='https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa914.pdf?forcedownload=true' target='_blank' > Request for protection order registry search </a> form");
		
		}

		// if( questions.calculatingChildSupportSurvey && 
		// 	questions.calculatingChildSupportSurvey.attachingCalculations == 'y' &&
		// 	questions.flmSelectedForm &&
		// 	questions.flmSelectedForm.includes("childSupport"))
		// 	requiredDocuments.push("Support calculation for child support");
	
		// if( questions.calculatingSpousalSupportSurvey && 
		// 	questions.calculatingSpousalSupportSurvey.attachingCalculations== 'y' &&
		// 	questions.flmSelectedForm &&
		// 	questions.flmSelectedForm.includes("spousalSupport"))
		// 	requiredDocuments.push("Support calculation for spousal support");
	
		//REMINDERS 
	
		if( (questions.flmSelectedForm && ( questions.flmSelectedForm.includes("childSupport")||questions.flmSelectedForm.includes("spousalSupport") )) &&
			(questions.aboutExistingChildSupportSurvey && questions.aboutExistingChildSupportSurvey.filedWithDirector == "y")||(questions.existingSpousalSupportOrderAgreementSurvey && questions.existingSpousalSupportOrderAgreementSurvey.filedWithDirector == "y"))
			reminderDocuments.push("You must serve a copy of the application on the director of Maintenance Enforcement.")
		
		if( (questions.flmSelectedForm && questions.flmSelectedForm.includes("guardianOfChild")) &&
			(questions.indigenousAncestryOfChildSurvey && questions.indigenousAncestryOfChildSurvey.indigenousAncestry && (questions.indigenousAncestryOfChildSurvey.indigenousAncestry.includes("Nisga’a") || questions.indigenousAncestryOfChildSurvey.indigenousAncestry.includes("Treaty First Nation"))) )
			reminderDocuments.push("You must serve the Nisga’a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the Family Law Act.")

		// if(questions.existingSpousalSupportOrderAgreementSurvey && questions.existingSpousalSupportOrderAgreementSurvey.filedWithDirector == "y") 
		// 	reminderDocuments.push("You must serve a copy of the application on the director of Maintenance Enforcement.")
	}
	
	
	store.commit("Application/setRequiredDocumentsByType", {typeOfRequiredDocuments:type, requiredDocuments:{required:requiredDocuments ,reminder:reminderDocuments} });	
	store.commit("Application/setCommonStepResults",{data:{'requiredDocuments':store.state.Application.requiredDocuments}});
	
	
	console.log('required documents')
	console.log(requiredDocuments)
	console.log(reminderDocuments)

	return requiredDocuments;
})

Vue.filter('surveyChanged', function(type: string) {
	let step = 1
	let reviewPage = 12
	let previewPage = 13
	
	if(type == 'protectionOrder'){step = 1; reviewPage = 12; previewPage = 13;}
	else if(type == 'familyLawMatter'){step = 3; reviewPage = 39; previewPage = 40;	}

	const steps = store.state.Application.steps

	store.dispatch("Application/UpdatePathwayCompleted", {pathway: type, isCompleted: false})
	
	if(steps[step].pages[reviewPage].progress ==100 ){//if changes, make review page incompelete
		store.commit("Application/setPageProgress", { currentStep: step, currentPage:reviewPage, progress:50 });
		store.commit("Application/setPageActive", { currentStep: step, currentPage: previewPage, active: false });
	
		if(steps[step].pages[previewPage].progress ==100)store.commit("Application/setPageProgress", { currentStep: step, currentPage:previewPage, progress:50 });
	}  	
	
	store.commit("Application/resetStep", 8);
	for (let i=1; i<5; i++) {
		store.commit("Application/setPageActive", { currentStep: 8, currentPage: i, active: false });
		store.commit("Application/setPageProgress", { currentStep: 8, currentPage:i, progress:0 });
	}	
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
			`.answerbox{color: #000; font-size:11pt; display:block; text-indent:0px; margin:0.5rem 0 0.5rem 0 !important;}`+
    		`.uline{text-decoration: underline; display: inline;}`+
			`.form-header{display:block; margin:0 0 5rem 0;}`+
			`.form-one-header{display:block; margin:0 0 6.25rem 0;}`+
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