<template>
    <page-base :disableNext="pageHasError" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
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
                            <div style="white-space: pre-line;" :class="beautifyResponse(data.value, data.item)!='REQUIRED'?'':'bg-danger text-white px-2'">{{beautifyResponse(data.value, data.item)}}</div>
                        </template>
                        <template v-slot:cell(edit)="data" > 
                            <b-button style="border:white;" size="sm" variant="transparent" v-b-tooltip.hover.noninteractive title="Edit"  @click="edit(section,data)"><b-icon icon="pencil-square" font-scale="1.25" variant="primary"/></b-button>
                        </template>

                </b-table>
        </b-card>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as _ from 'underscore';

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ReviewYourAnswers extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateRequiredDocuments!: (newRequiredDocuments: string[]) => void

    fields =[
        {key:'title', label:'Question', thClass:'border-right', tdClass:'border-top border-right ', thStyle:''},
        {key:'value', label:'Response', thClass:'', tdClass:'border-top border-right', thStyle:''},
        {key:'edit',  label:'',         thClass:'', tdClass:'border-top ', thStyle:''}
    ]

    questionResults = [];
    currentStep=0;
    currentPage=0;
    pageHasError = false;

    errorQuestionNames = [];

    mounted(){       
        
        this.reloadPageInformation();
        this.determineHiddenErrors();
        //console.log(this.step)
    }

    public beautifyQuestion(question){
        let adjQuestion = question
        while(adjQuestion.includes('{ApplicantName}')||
            adjQuestion.includes('{RespondentName}')||
            adjQuestion.includes('{ProtectedPartyName}')||
            adjQuestion.includes('{anotherAdultName}')||
            adjQuestion.includes('<br/>')||
            adjQuestion.includes('<br>')){
                adjQuestion = adjQuestion.replace('{ApplicantName}', Vue.filter('getFullName')(this.$store.state.Application.applicantName));
                adjQuestion = adjQuestion.replace('{RespondentName}', Vue.filter('getFullName')(this.$store.state.Application.respondentName));
                adjQuestion = adjQuestion.replace('{ProtectedPartyName}', Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
                adjQuestion = adjQuestion.replace('{anotherAdultName}', Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
                adjQuestion = adjQuestion.replace('<br>','');
                adjQuestion = adjQuestion.replace('<br/>','');
        }
        return adjQuestion
    }

    public beautifyResponse(value, dataItem){
        //console.log(value)
        //console.log(dataItem)
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
        else if(Array.isArray(value))
        {
            //console.log(value)
            if(value[0].childName)return this.getChildInfo(value) 
            if(value[0].anotherAdultSharingResiName)return this.getAnotherAdultInfo(value)
            if(typeof value[0] === 'string' || value[0] instanceof String)
                return value.join(", \n ");
            else{
                this.pageHasError = true;
                return "REQUIRED";
            } 
        }
        else if(value=='y')
            return 'Yes';
        else if(value=='n')
            return 'No';
        else if(value.first)
            return Vue.filter('getFullName')(value)
        else if(value.street)
            return Vue.filter('getFullAddress')(value)
        else if(value.phone)
            return Vue.filter('getFullContactInfo')(value)
        else if(inputType=="date")
            return Vue.filter('beautify-date')(value)
        else 
            return value;    
    }

    public getChildInfo(children){
        let resultString = "";
        for(const child of children ){            
                resultString +="Name: " + Vue.filter('getFullName')(child['childName']) +"\n";
                resultString +="Birth Date: " + Vue.filter('beautify-date')(child['childDOB']) +"\n";
                if(child['childRelationshipWithProtected']) resultString +="Relation With Protected: " + child['childRelationshipWithProtected'] +"\n";
                if(child['childRelationshipWithOther']) resultString +="Relation With Other: " + child['childRelationshipWithOther']  +"\n"; 
                if(child['childRelationship']) resultString +="Relation With Other: " + child['childRelationship']  +"\n"; 
                if(child['childLivingWith']) resultString +="Child Living With: " + child['childLivingWith']  +"\n";           
                resultString +="\n"
        }
        return resultString;
    }

    public getAnotherAdultInfo(adults){
        let resultString = "";
        for(const adult of adults ){            
                resultString +="Name: " + Vue.filter('getFullName')(adult['anotherAdultSharingResiName']) +"\n";
                resultString +="Birth Date: " + Vue.filter('beautify-date')(adult['anotheradultSharingResiDOB']) +"\n";
                resultString +="Relation With Protected: " + adult['anotherAdultSharingResiRelation'] +"\n\n";               
        }
        return resultString;
    }

    public edit(section, data){
        console.log(data)
        console.log(section)
        this.$store.commit("Application/setScrollToLocationName",data.item.name);
        this.$store.commit("Application/setCurrentStep", section.currentStep);
        this.$store.commit("Application/setCurrentStepPage", {currentStep: section.currentStep, currentPage: section.currentPage });
        const currPage = document.getElementById(this.getStepPageId(section.currentStep, section.currentPage));
        currPage.className="current";
    }

    public reloadPageInformation() {
        this.pageHasError = false;
        for(let i=0;i<9; i++){
            const step = this.$store.state.Application.steps[i]
            const stepResult = step.result
            //console.log(step)
            //console.log(stepResult);
            if(stepResult)
                for (const [key, value] of Object.entries(stepResult))
                {
                    //  console.error("____________")
                    //  console.log(key)
                    //  console.log(value)
                    if(value && value['data'] && value['data'].length == 0){
                        const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                        value['questions'][0]= {name: "require", value: "", title: value['pageName'], inputType: ""}                 
                        if(isPageActive){
                            this.questionResults.push(value);
                        }
                    }
                    else if(value && (value['currentPage'] || value['currentPage']==0)){ 
                        const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                        //console.log(isPageActive)
                        //value['sortOrder']=  (value['currentStep']*100+value['currentPage']);                   
                        if(value['questions'] && isPageActive){
                            this.questionResults.push(value);
                        }
                    }
                }
        }
        console.log(this.questionResults )

        this.questionResults = _.sortBy(this.questionResults,function(questionResult){ return (Number(questionResult['currentStep'])*100+Number(questionResult['currentPage'])); });
        console.log(this.questionResults)
       
        //let progress = 100;
        // if(Object.keys(this.survey.data).length)
        //     progress = this.survey.isCurrentPageHasErrors? 50 : 100;

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
        //this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        this.togglePages([0,1], true);
    }

    public determineHiddenErrors(){        
        this.errorQuestionNames.push(this.coOccurrence("Protection from whom?","childPO","y",  "Background","PartiesHasOtherChilderen","Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child:", "PartiesHasOtherChilderen"));
        this.errorQuestionNames.push(this.coOccurrence("Protection from whom?","childPO","n",  "Background","PartiesHasOtherChilderen","Are {ProtectedPartyName} and {RespondentName} a parent, step-parent or guardian to a child that is not already identified in the list", "PartiesHasOtherChilderen"));        
    }

    // public getFPOResultData() {  
        
    //     var result = this.$store.state.Application.steps[0].result; 
    //     for(var i=1;i<9; i++){
    //         const stepResults = this.$store.state.Application.steps[i].result
    //         for(const stepResult in stepResults){
    //             console.log(stepResults[stepResult])
    //             console.log(stepResults[stepResult].data)
    //             result[stepResult]=stepResults[stepResult].data;                
    //         }
    //     }            
    //     console.log(result)
    //     return result;
    // }

    public coOccurrence(pageName1,question1,value1,  pageName2,question2,title2:string, response){
        for(const questionResult of this.questionResults)
        {
            if(questionResult.pageName == pageName1)
            {
                for(const question of questionResult.questions)
                {
                    if(question.name == question1 && question.value == value1)
                    {
                        for(const questionResult of this.questionResults)
                        {
                            if(questionResult.pageName == pageName2)
                            {
                                for(const question of questionResult.questions){
                                    if(question.name == question2 && question.title.trim()==title2.trim())
                                    {
                                        console.log(question.title)
                                        console.log(title2)
                                        console.log(question.title.trim()==title2.trim())
                                        return response
                                    }
                                }
                            }
                        }
                        break
                    }
                }
                break;
            }
        }
        return ""
    }

    public togglePages(pageArr, activeIndicator) {
        //this.activateStep(activeIndicator);
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
       //console.log(this.pageHasError)
        this.UpdateGotoNextStepPage()       
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }

    public getStepId(stepIndex) {
        return "step-" + stepIndex;
    }

    public getStepPageId(stepIndex, pageIndex) {
        return this.getStepId(stepIndex) + "-page-" + pageIndex;
    }

    beforeDestroy() {

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, true);
        // this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        // const currPage = document.getElementById("step-" + this.currentStep+"-page-" + this.currentPage);
        // if(currPage) currPage.style.color=this.survey.isCurrentPageHasErrors?"red":"";

        //this.UpdateStepResultData({step:this.step, data: {filingOptions: this.survey.data}})
    }
}
</script>