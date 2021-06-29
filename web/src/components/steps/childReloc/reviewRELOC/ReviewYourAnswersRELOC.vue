<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <h2 class="mt-4">Review Your Answers</h2>
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
                            <div style="white-space: pre-line;" :class="typeof beautifyResponse(data.value, data.item) == 'string' && beautifyResponse(data.value, data.item).includes('REQUIRED')?'bg-danger text-white px-2':''" v-html="beautifyResponse(data.value, data.item)">{{beautifyResponse(data.value, data.item)}}</div>
                        </template>
                        <template v-slot:cell(edit)="data" > 
                            <b-button style="border:white;" size="sm" variant="transparent" v-b-tooltip.hover.noninteractive title="Edit"  @click="edit(section,data)"><b-icon icon="pencil-square" font-scale="1.25" variant="primary"/></b-button>
                        </template>

                </b-table>
        </b-card>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment-timezone';
import * as _ from 'underscore';

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class ReviewYourAnswersReloc extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateRequiredDocuments!: (newRequiredDocuments: string[]) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    fields =[
        {key:'title', label:'Question', thClass:'border-right', tdClass:'border-top border-right ', thStyle:''},
        {key:'value', label:'Response', thClass:'', tdClass:'border-top border-right', thStyle:''},
        {key:'edit',  label:'',         thClass:'', tdClass:'border-top ', thStyle:''}
    ]

    questionResults = [];
    currentStep =0;
    currentPage =0;
    pageHasError = false;

    errorQuestionNames = [];
    currentDate = ''

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        this.togglePages([this.stPgNo.RELOC.PreviewFormsRELOC], !this.pageHasError);
        if(this.pageHasError) this.UpdatePathwayCompleted({pathway:"childReloc", isCompleted:false})
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.RELOC.PreviewFormsRELOC,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
    }

    mounted(){
        this.currentDate = moment().format('MMM DD YYYY');
        this.reloadPageInformation();
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
        return adjQuestion
    }

    public beautifyResponse(value, dataItem){
        
        const inputType = dataItem?dataItem['inputType']:""
        const inputName = dataItem?dataItem['name']:""

        if(!value){
            this.pageHasError = true;
            return "REQUIRED";
        }
        else if(this.errorQuestionNames.includes(inputName))
        {
            this.pageHasError = true;
            return "REQUIRED";
        }
        else if(value['selected']){
            return this.getAdvancedRadioGroupResults(value)
        }
        else if(value['checked']){
           return this.getMultipleCommentCheckboxResults(value)
        }    
        else if(Array.isArray(value))
        {            
            if(value[0] && value[0] instanceof String && value[0].substring(0,5)=='child') return this.getChildrenNames(value)  
            if(value[0]?.childName)return this.getChildInfo(value) 
            if(value[0]?.anotherAdultSharingResiName)return this.getAnotherAdultInfo(value)
            if(typeof value[0] === 'string' || value[0] instanceof String)
                return value.join(" \n ").replace(/([a-z0-9])([A-Z])/g, '$1 $2');
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
                resultString +=Vue.filter('styleTitle')("Name: ") + Vue.filter('getFullName')(child['childName']) +"\n";
                resultString +=Vue.filter('styleTitle')("Birth Date: " )+ Vue.filter('beautify-date')(child['childDOB']) +"\n";
                if(child['childRelationshipWithOther']) resultString +=Vue.filter('styleTitle')("Relation With Other: ") + child['childRelationshipWithOther']  +"\n"; 
                if(child['childRelationship']) resultString +=Vue.filter('styleTitle')("Relation With Other: ") + child['childRelationship']  +"\n";
                resultString +="\n"
        }
        return resultString;
    }

    public getChildrenNames(selectedChildren){

        let result = ''
        if (this.step.result?.relocChildrenInfoSurvey) {
            const childData = this.step.result.relocChildrenInfoSurvey.data;
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
            resultString +=Vue.filter('styleTitle')("Name:") + Vue.filter('getFullName')(adult['anotherAdultSharingResiName']) +"\n";
            resultString +=Vue.filter('styleTitle')("Birth Date:") + Vue.filter('beautify-date')(adult['anotheradultSharingResiDOB']) +"\n";
            resultString +=Vue.filter('styleTitle')("Relation With Protected:") + adult['anotherAdultSharingResiRelation'] +"\n\n";               
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
                if(value){ 
                    let keyBeauty = ''
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
        const selected = questionValue['selected']? questionValue['selected']: ' '        
        let keyBeauty = selected.charAt(0).toUpperCase() + selected.slice(1);
        keyBeauty =  keyBeauty.replace(/([a-z0-9])([A-Z])/g, '$1 $2') 
        let resultString = Vue.filter('styleTitle')("Selected: ")+keyBeauty+"\n";

        for (const [key, value] of Object.entries(questionValue))
        {            
            if(key?.startsWith(selected)){
                if(value){                
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

    public edit(section, data){

        this.$store.commit("Application/setScrollToLocationName",data.item.name);
        this.$store.commit("Application/setCurrentStep", section.currentStep);
        this.$store.commit("Application/setCurrentStepPage", {currentStep: section.currentStep, currentPage: section.currentPage });
        const currPage = document.getElementById(this.getStepPageId(section.currentStep, section.currentPage));
        currPage.className="current";
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress<100){            
           Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.RELOC.PreviewFormsRELOC,  50, false);
        }

        this.pageHasError = false;
        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.RELOC._StepNo]){
            const step = this.$store.state.Application.steps[stepIndex]
            const stepResult = step.result
           
            if(stepResult)
                for (const [key, value] of Object.entries(stepResult))
                {                   
                    if(value?.['data']?.length == 0){
                        const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                        value['questions'][0]= {name: "require", value: "", title: value['pageName'], inputType: ""}                 
                        if(isPageActive){
                            this.questionResults.push(value);
                        }
                    }
                    else if(value?.['currentPage'] || value?.['currentPage']==0){ 
                        const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                                        
                        if(value['questions'] && isPageActive){
                            this.questionResults.push(value);
                        }
                    }
                }
        }

        this.questionResults = _.sortBy(this.questionResults,function(questionResult){ return (Number(questionResult['currentStep'])*100+Number(questionResult['currentPage'])); });
        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
        this.togglePages([this.stPgNo.RELOC.PreviewFormsRELOC], !this.pageHasError); 
        
    }

    public togglePages(pageArr, activeIndicator) {
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.step.id,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }
    
    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()       
    }

    public getStepId(stepIndex) {
        return "step-" + stepIndex;
    }

    public getStepPageId(stepIndex, pageIndex) {
        return this.getStepId(stepIndex) + "-page-" + pageIndex;
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, true);       
    }
}
</script>