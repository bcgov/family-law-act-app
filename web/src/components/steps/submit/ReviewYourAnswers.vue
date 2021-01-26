<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
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
                            <div style="white-space: pre-line;" :class="data.value?'':'bg-danger text-white px-2'">{{beautifyResponse(data.value, data.item.inputType)}}</div>
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

    fields =[
        {key:'title', label:'Question', thClass:'border-right', tdClass:'border-top border-right ', thStyle:''},
        {key:'value', label:'Response', thClass:'', tdClass:'border-top border-right', thStyle:''},
        {key:'edit',  label:'',         thClass:'', tdClass:'border-top ', thStyle:''}
    ]

    questionResults = [];

    

    mounted(){       
        
        this.reloadPageInformation()
        //console.log(this.step)
    }

    public beautifyQuestion(question){
        let adjQuestion = question
        while(adjQuestion.includes('{ApplicantName}')||
            adjQuestion.includes('{RespondentName}')||
            adjQuestion.includes('{ProtectedPartyName}')||
            adjQuestion.includes('<br/>')||
            adjQuestion.includes('<br>')){
                adjQuestion = adjQuestion.replace('{ApplicantName}', Vue.filter('getFullName')(this.$store.state.Application.applicantName));
                adjQuestion = adjQuestion.replace('{RespondentName}', Vue.filter('getFullName')(this.$store.state.Application.respondentName));
                adjQuestion = adjQuestion.replace('{ProtectedPartyName}', Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
                adjQuestion = adjQuestion.replace('<br>','');
                adjQuestion = adjQuestion.replace('<br/>','');
        }
        return adjQuestion
    }

    public beautifyResponse(value, inputType){
        //console.log(value)
        if(!value)
            return "REQUIRED"
        else if(Array.isArray(value))
        {
            console.log(value)
            if(value[0].childName)return this.getChildInfo(value) 
            if(value[0].anotherAdultSharingResiName)return this.getAnotherAdultInfo(value)
            return value.join(", \n ");
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
                resultString +="Birth date: " + Vue.filter('beautify-date')(child['childDOB']) +"\n";
                resultString +="Relation With Protected: " + child['childRelationshipWithProtected'] +"\n";
                resultString +="Relation With Other: " + child['childRelationshipWithOther']  +"\n\n";                
        }
        return resultString;
    }

    public getAnotherAdultInfo(adults){
        let resultString = "";
        for(const adult of adults ){            
                resultString +="Name: " + Vue.filter('getFullName')(adult['anotherAdultSharingResiName']) +"\n";
                resultString +="Birth date: " + Vue.filter('beautify-date')(adult['anotheradultSharingResiDOB']) +"\n";
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

        for(let i=0;i<9; i++){
            const stepResult = this.$store.state.Application.steps[i].result
            //console.log(this.$store.state.Application.steps[i])
            //console.log(stepResult);
            if(stepResult)
                for (const [key, value] of Object.entries(stepResult))
                {
                    //console.log(key)  
                    const isPageActive = this.$store.state.Application.steps[i].pages[value['currentPage']]?this.$store.state.Application.steps[i].pages[value['currentPage']].active : false; 
                    //console.log(isPageActive)                     
                    if(value['questions'] && isPageActive){
                        this.questionResults.push(value);
                    }
                }
        }
        console.log(this.questionResults )

        this.questionResults = _.sortBy(this.questionResults,function(questionResult){ return questionResult['currentStep']*100+questionResult['currentPage']; });
        console.log(this.questionResults)
       
        // let progress = 50;
        // if(Object.keys(this.survey.data).length)
        //     progress = this.survey.isCurrentPageHasErrors? 50 : 100;

        // this.currentStep = this.$store.state.Application.currentStep;
        // this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        // this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
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

        
        // this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        // const currPage = document.getElementById("step-" + this.currentStep+"-page-" + this.currentPage);
        // if(currPage) currPage.style.color=this.survey.isCurrentPageHasErrors?"red":"";

        //this.UpdateStepResultData({step:this.step, data: {filingOptions: this.survey.data}})
    }
}
</script>