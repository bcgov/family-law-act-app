<template>
    <div>
        <h2 class="mt-4">Review Your Answers</h2>
        <b-card bg-variant="primary" border-variant="primary" text-variant="white">
            <b-icon-exclamation-circle-fill variant="info" scale="1.5" class="mr-2"></b-icon-exclamation-circle-fill>
            Please review your answers to ensure all your information is correct.  
            To make changes, select the edit icon to the right of the section you wish to make changes to.  
            You will be taken back to that step in the service to make your edits.  
            Depending on the type of edits you make, you may be required to navigate through other steps again to 
            confirm your answers are still correct or to make other edits to related answers.

        </b-card>
        <b-card
            v-for="section in questionResults"
            v-bind:key="section.name"
            :header="section.pageName"
            header-class="h2"
            header-bg-variant="info"
            class="my-5">
                <b-table                    
                    :items="section.questions" 
                    :fields="fields"
                    small
                    head-variant="dark" 
                    striped
                    bordered
                    fixed>
                    
                        <template v-slot:table-colgroup>
                            <col style="width:35rem"> 
                            <col style="width:25rem"> 
                            <col style="width:2.5rem">                       
                        </template>
                        <template v-slot:cell(title)="data" > 
                            <b v-html="beautifyQuestion(data.value)" >{{beautifyQuestion(data.value)}}</b>
                        </template>
                        <template v-slot:cell(value)="data" >
                            <div style="white-space: pre-line;" :class="typeof beautifyResponse(data.value, data.item, section.data) == 'string' && beautifyResponse(data.value, data.item, section.data).includes('REQUIRED')?'bg-danger text-white px-2':''" v-html="beautifyResponse(data.value, data.item, section.data)">{{beautifyResponse(data.value, data.item, section.data)}}</div>
                        </template>
                        <template v-slot:cell(edit)="data" > 
                            <b-button style="border:white;" size="sm" variant="transparent" v-b-tooltip.hover.noninteractive title="Edit"  @click="edit(section,data)"><b-icon icon="pencil-square" font-scale="1.25" variant="primary"/></b-button>
                        </template>

                </b-table>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment-timezone';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { stepInfoType} from "@/types/Application";

@Component
export default class ReviewYourAnswersPage extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @Prop({required: true})
    questionResults!: any[];
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    fields =[
        {key:'title', label:'Question', thClass:'border-right', tdClass:'border-top border-right ', thStyle:''},
        {key:'value', label:'Response', thClass:'', tdClass:'border-top border-right', thStyle:''},
        {key:'edit',  label:'',         thClass:'', tdClass:'border-top ', thStyle:''}
    ]

    pageHasError = false; 

    errorQuestionNames = [];
    currentDate = ''

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        this.$emit('pageHasError', this.pageHasError)
    }

    mounted(){
        this.pageHasError = false;
        this.currentDate = moment().format('MMM DD YYYY');
        this.determineHiddenErrors();
        window.scrollTo(0, 0);
    }

    public beautifyQuestion(question){
        
        let adjQuestion = question
        adjQuestion = adjQuestion.replace(/{ApplicantName}/g, Vue.filter('getFullName')(this.$store.state.Application.applicantName));
        adjQuestion = adjQuestion.replace(/{RespondentName}/g, Vue.filter('getFullName')(this.$store.state.Application.respondentName));
        adjQuestion = adjQuestion.replace(/{ProtectedPartyName}/g, Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        adjQuestion = adjQuestion.replace(/{anotherAdultName}/g, Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        adjQuestion = adjQuestion.replace(/{Payee}/g, 'Payee(s)');
        adjQuestion = adjQuestion.replace(/{currentDate}/g, this.currentDate);
        adjQuestion = adjQuestion.replace(/<br>/g,'');
        adjQuestion = adjQuestion.replace(/<br\/>/g,'');
        adjQuestion = adjQuestion.replace(/`/g,'');
        adjQuestion = adjQuestion.replace(/{childWording}/g,'child(ren)');
        adjQuestion = adjQuestion.replace(/{childWordingSpend}/g,'child(ren) spend(s)');
        adjQuestion = adjQuestion.replace(/{selectedChildWording}/g,'child(ren)');
        adjQuestion = adjQuestion.replace(/{firstQuestionText}/g,'');
        return adjQuestion
    }

    public beautifyResponse(value, dataItem, sectionData){
        
        const inputType = dataItem?dataItem['inputType']:""
        const inputName = dataItem?dataItem['name']:""

        if(!value || this.errorQuestionNames.includes(inputName)){
            this.pageHasError = true;
            return "REQUIRED";
        }        
        else if(value?.['selected']){
            return this.getAdvancedRadioGroupResults(value)
        }
        else if(value?.['checked']){
           return this.getMultipleCommentCheckboxResults(value)
        }    
        else if(Array.isArray(value))
        {        
            if(value[0]?.date && value[0]?.name && value[0]?.nameOther && value[0]?.relationship) return this.getGuardianOfChildTable(value)    
            if(value[0] && value[0] instanceof String && value[0]?.substring(0,5)=='child') return this.getChildrenNames(value)  
            if(value[0]?.childName)return this.getChildInfo(value) 
            if(value[0]?.anotherAdultSharingResiName)return this.getAnotherAdultInfo(value)
            if(typeof value[0] === 'string' || value[0] instanceof String){
                if(value[0].includes('Name:'))
                    return value.join(" \n ")
                else
                    return value.join(" \n ").replace(/([a-z0-9])([A-Z])/g, '$1 $2');                
            }
            else{
                this.pageHasError = true;
                return "REQUIRED";
            } 
        }
        else if(value == 'y')
            return 'Yes';
        else if(value == 'n')
            return 'No';
        else if(value.first){
            if(!value.last){
                this.pageHasError = true;
                return "Last Name REQUIRED";
            }
            return Vue.filter('getFullName')(value)
        }
        else if(value.last){
            if(!value.first){
                this.pageHasError = true;
                return "First Name REQUIRED";
            }
            return Vue.filter('getFullName')(value)
        }
        else if(value.street)
            return Vue.filter('getFullAddress')(value)
        else if(value.phone)
            return Vue.filter('getFullContactInfo')(value)
        else if(inputType == "date")
            return Vue.filter('beautify-date')(value) 
        else if(typeof value ==='object' && value !== null){
            return this.getMultipleTextInputResults(value)
        }         
        else if(typeof value ==='string' && value !== ''){

            if(value == 'other' && sectionData[dataItem.name+'Comment']){                
                return Vue.filter('styleTitle')("Selected: ")+value+"\n"+Vue.filter('styleTitle')("Comment: ")+sectionData[dataItem.name+'Comment']
            }

            const m = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{2}):(\d{2}):(\d{2})$/);
            if(m) {                
                return ""+Vue.filter('convert-time24to12')(m[4]+":"+m[5])+"<b> on </b>"+ Vue.filter('beautify-date')(value) 
            }

            let keyBeauty = value.charAt(0).toUpperCase() + value.slice(1);
            keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2')  
            return keyBeauty;    
        }
        else {
            return value
        }
    }

    public getChildInfo(children){
        let resultString = "";
        for(const child of children ){            
            resultString += Vue.filter('styleTitle')("Name: ")       + Vue.filter('getFullName')(child['childName'])  +"\n";
            resultString += Vue.filter('styleTitle')("Birth Date: " )+ Vue.filter('beautify-date')(child['childDOB']) +"\n";
            
            if(child['childRelationshipWithProtected']) resultString +=Vue.filter('styleTitle')("Relation With Protected: ") + child['childRelationshipWithProtected'] +"\n";
            if(child['childRelationshipWithOther'])     resultString +=Vue.filter('styleTitle')("Relation With Other: ")     + child['childRelationshipWithOther']     +"\n"; 
            if(child['childRelationship'])              resultString +=Vue.filter('styleTitle')("Relation With Other: ")     + child['childRelationship']              +"\n";            
            if(child['childLivingWith'])                resultString +=Vue.filter('styleTitle')("Child Living With: ")       + child['childLivingWith']                +"\n";           
                
            resultString +="\n"
        }
        return resultString;
    }

    public getChildrenNames(selectedChildren){
    
    
        let result = ''
        let childData = [];

        if (Number(this.step.id) == this.stPgNo.PPM._StepNo && this.step.result?.ppmChildrenInfoSurvey)
            childData = this.step.result.ppmChildrenInfoSurvey.data;//PPM

        else if(Number(this.step.id) == this.stPgNo.FLM._StepNo && this.step.result?.childrenInfoSurvey)
            childData = this.step.result.childrenInfoSurvey.data; //FLM

        else if(Number(this.step.id) == this.stPgNo.CM._StepNo && this.step.result?.childrenInfoSurvey)
            childData = this.step.result.childrenInfoSurvey.data; //CM
        
        else if(Number(this.step.id) == this.stPgNo.RELOC._StepNo && this.step.result?.relocChildrenInfoSurvey)
            childData = this.step.result.relocChildrenInfoSurvey.data; //RELOC


        if(childData.length>0){
            for(const selectedChild of selectedChildren ){
                if(!isNaN(Number(selectedChild.substring(6,7)))){
                    const child = childData[Number(selectedChild.substring(6,7))]
                    result += Vue.filter('getFullName')(child.name)+'\n'
                }
            }
        }
        return result
    }

    public getAnotherAdultInfo(adults){
        let resultString = "";
        for(const adult of adults ){            
            resultString +=Vue.filter('styleTitle')("Name:")                    + Vue.filter('getFullName')(adult['anotherAdultSharingResiName'])  +"\n";
            resultString +=Vue.filter('styleTitle')("Birth Date:")              + Vue.filter('beautify-date')(adult['anotheradultSharingResiDOB']) +"\n";
            resultString +=Vue.filter('styleTitle')("Relation With Protected:") + adult['anotherAdultSharingResiRelation']                         +"\n\n";               
        }
        return resultString;
    }

    public getMultipleCommentCheckboxResults(questionValue){
        let resultString =Vue.filter('styleTitle')("Selected: ")
        for(const checked of questionValue['checked']){
            let keyBeauty = checked.charAt(0).toUpperCase() + checked.slice(1);
            keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2') 
            resultString += "<div class='ml-3'> - "+keyBeauty+"</div>";
        }
        
        for (const [key, value] of Object.entries(questionValue))
        {          
            if(questionValue['checked']?.includes(key.slice(0,-7))){
                if(value && key){ 
                    let keyBeauty = ''

                    if(key=='lawyerComment') //Specific Case
                        keyBeauty = 'Lawyer Name'
                    else
                        keyBeauty =  key.charAt(0).toUpperCase() + key.slice(1);

                    keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2')   
                    resultString += Vue.filter('styleTitle')(keyBeauty+': ')+value +'\n'
                }else{
                    this.pageHasError = true;
                    return "REQUIRED";
                }
            }
        }
        return resultString;
    }

    public getAdvancedRadioGroupResults(questionValue){        
        const selected = questionValue['selected']        
        let keyBeauty = selected.charAt(0).toUpperCase() + selected.slice(1);
        keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2') 
        let resultString = Vue.filter('styleTitle')("Selected: ")+keyBeauty+"\n";

        for (const [key, value] of Object.entries(questionValue))
        {   
            if(key?.startsWith(selected)){
                if(value){                
                    keyBeauty =  key.charAt(0).toUpperCase() + key.slice(1);
                    keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2')   
                    if(key.includes('Date'))
                        resultString += Vue.filter('styleTitle')(keyBeauty+': ')+Vue.filter('beautify-date')(value) +'\n'
                    else
                        resultString += Vue.filter('styleTitle')(keyBeauty+': ')+value +'\n'
                }else{
                    this.pageHasError = true;
                    return "REQUIRED";
                }
            }
        }
        return resultString;
    }

    public getMultipleTextInputResults(argValue){
        let resultString = "";
        for (const [key, value] of Object.entries(argValue))
        {
            if(value && key){                
                let keyBeauty =  key.charAt(0).toUpperCase() + key.slice(1);
                keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2')   
                resultString += Vue.filter('styleTitle')(keyBeauty+': ')+value +'\n'
            }else{
                this.pageHasError = true;
                return "REQUIRED";
            }            
        }
        return resultString;
    }

    public getGuardianOfChildTable(tableValue){

        let resultString = "";
        for(const item of tableValue){
            resultString +=Vue.filter('styleTitle')("Child Name: ")                 + item['name']                              +"\n";
            resultString +=Vue.filter('styleTitle')("Other Party Name: ")           + item['nameOther']                         +"\n";
            resultString +=Vue.filter('styleTitle')("Guardian Start Date: ")        + Vue.filter('beautify-date')(item['date']) +"\n";
            resultString +=Vue.filter('styleTitle')("Your Relationship to Child: ") + item['relationship']                      +"\n\n";               
        }
        return resultString
    }

    public edit(section, data){

        this.$store.commit("Application/setScrollToLocationName",data.item.name);
        this.$store.commit("Application/setCurrentStep", section.currentStep);
        this.$store.commit("Application/setCurrentStepPage", {currentStep: section.currentStep, currentPage: section.currentPage });
        const currPage = document.getElementById(this.getStepPageId(section.currentStep, section.currentPage));
        currPage.className="current";
    }    

    public getStepId(stepIndex) {
        return "step-" + stepIndex;
    }

    public getStepPageId(stepIndex, pageIndex) {
        return this.getStepId(stepIndex) + "-page-" + pageIndex;
    }

    public determineHiddenErrors(){

        //___Hidden Errors for PO___
        if(this.$store.state.Application.currentStep == this.stPgNo.PO._StepNo)
        {        
            this.errorQuestionNames.push(this.childPOchangedError("y",  "Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child:"));
            this.errorQuestionNames.push(this.childPOchangedError("n",  "Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child that is not already identified in the list"));        
        }
    }

    public childPOchangedError(value ,title){
        const poStep = this.stPgNo.PO._StepNo
        if( this.$store.state.Application.steps[poStep].result?.protectionFromWhomSurvey?.data?.childPO == value &&
            this.$store.state.Application.steps[poStep].result?.backgroundSurvey?.questions){
                const backgroundQuestions = this.$store.state.Application.steps[poStep].result.backgroundSurvey.questions                
                if(backgroundQuestions.findIndex(question=>{return question.title.trim() == title})>=0)
                    return "PartiesHasOtherChilderen"
        }
        return ""
    }

}
</script>