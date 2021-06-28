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
                            <b>{{beautifyQuestion(data.value)}}</b>
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

import * as _ from 'underscore';

import { stepInfoType} from "@/types/Application";
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

export default class ReviewYourAnswers extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void
    
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

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        this.togglePages([this.stPgNo.PO.PreviewForms], !this.pageHasError);
        if(this.pageHasError) this.UpdatePathwayCompleted({pathway:"protectionOrder", isCompleted:false})
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.PO.PreviewForms,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
    }

    mounted(){
        this.reloadPageInformation();
        this.determineHiddenErrors();
    }

    public beautifyQuestion(question){
        
        let adjQuestion = question
        adjQuestion = adjQuestion.replace(/{ApplicantName}/g, Vue.filter('getFullName')(this.$store.state.Application.applicantName));
        adjQuestion = adjQuestion.replace(/{RespondentName}/g, Vue.filter('getFullName')(this.$store.state.Application.respondentName));
        adjQuestion = adjQuestion.replace(/{ProtectedPartyName}/g, Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        adjQuestion = adjQuestion.replace(/{anotherAdultName}/g, Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        adjQuestion = adjQuestion.replace(/<br>/g,'');
        adjQuestion = adjQuestion.replace(/`/g,'');
        adjQuestion = adjQuestion.replace(/<br\/>/g,''); 
        return adjQuestion
    }

    public beautifyResponse(value, dataItem){

        const inputType = dataItem?dataItem['inputType']:""
        const inputName = dataItem?dataItem['name']:""

        if(!value){
            this.pageHasError = true;
            return "REQUIRED";
        }
        else if(this.errorQuestionNames?.includes(inputName))
        {
            this.pageHasError = true;
            return "REQUIRED";
        }
        else if(Array.isArray(value))
        {
            if(value[0]?.childName)return this.getChildInfo(value) 
            if(value[0]?.anotherAdultSharingResiName)return this.getAnotherAdultInfo(value)
            if(typeof value[0] === 'string' || value[0] instanceof String)
                return value.join(" \n ");
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
        else 
            return value;    
    }

    public getChildInfo(children){
        let resultString = "";
        for(const child of children ){            
                resultString +=Vue.filter('styleTitle')("Name: ") + Vue.filter('getFullName')(child['childName']) +"\n";
                resultString +=Vue.filter('styleTitle')("Birth Date: ") + Vue.filter('beautify-date')(child['childDOB']) +"\n";
                if(child['childRelationshipWithProtected']) resultString +=Vue.filter('styleTitle')("Relation With Protected: ") + child['childRelationshipWithProtected'] +"\n";
                if(child['childRelationshipWithOther']) resultString +=Vue.filter('styleTitle')("Relation With Other: ") + child['childRelationshipWithOther']  +"\n"; 
                if(child['childRelationship']) resultString +=Vue.filter('styleTitle')("Relation With Other: ") + child['childRelationship']  +"\n"; 
                if(child['childLivingWith']) resultString +=Vue.filter('styleTitle')("Child Living With: ") + child['childLivingWith']  +"\n";           
                resultString +="\n"
        }
        return resultString;
    }

    public getAnotherAdultInfo(adults){
        let resultString = "";
        for(const adult of adults ){            
                resultString +=Vue.filter('styleTitle')("Name: ") + Vue.filter('getFullName')(adult['anotherAdultSharingResiName']) +"\n";
                resultString +=Vue.filter('styleTitle')("Birth Date: ") + Vue.filter('beautify-date')(adult['anotheradultSharingResiDOB']) +"\n";
                resultString +=Vue.filter('styleTitle')("Relation With Protected: ") + adult['anotherAdultSharingResiRelation'] +"\n\n";               
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

        this.pageHasError = false;
        for(const stepIndex of [this.stPgNo.PO._StepNo]){ //search answers through these step numbers
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
       
        this.togglePages([this.stPgNo.PO.PreviewForms], !this.pageHasError); 
    }

    public determineHiddenErrors(){        
        this.errorQuestionNames.push(this.childPOchangedError("y",  "Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child:"));
        this.errorQuestionNames.push(this.childPOchangedError("n",  "Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child that is not already identified in the list"));        
    }

    public childPOchangedError(value ,title){
                
        if( this.$store.state.Application.steps[this.currentStep].result?.protectionFromWhomSurvey?.data?.childPO == value &&
            this.$store.state.Application.steps[this.currentStep].result?.backgroundSurvey?.questions){
                const backgroundQuestions = this.$store.state.Application.steps[this.currentStep].result.backgroundSurvey.questions                
                if(backgroundQuestions.findIndex(question=>{return question.title.trim() == title})>=0)
                    return "PartiesHasOtherChilderen"
        }
        return ""
    }

    public togglePages(pageArr, activeIndicator) {
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
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