<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

import surveyJson from "./forms/protectionFromWhom.json";
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
const commonState = namespace("Common");

@Component({
    components:{
        PageBase
    }
})

export default class ProtectionFromWhom extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @commonState.State
    public locationsInfo!: any[];
    
    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    applicantName = ""

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep=0;
    currentPage=0;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);        
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }
    
    public initializeSurvey(){
        this.adjustSurveyForLocations();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    } 

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            // console.log(this.survey.data);
            //  console.log(options)

            this.UpdateSurveyChangedPO(true);

            if(options.name == "RespondentName") {        
                this.$store.commit("Application/setRespondentName", this.survey.data["RespondentName"]);
                this.UpdateCommonStepResults({data:{'respondentName':[this.survey.data["RespondentName"]]}});
            }

            // if(options.name == "childPO" && options.value == "y" && this.$store.state.Application.steps[2].pages[5].progress) { 
            //     console.log('progress')       
            //     console.log(this.$store.state.Application.steps[2].result['backgroundSurvey'].data['ExistingOrders'])
            // }   
            this.determineNoContactPage()
            this.checkAnswersforContinue()

        })
    }

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[2].elements[2]["choices"] = [];        
        
        for(const location of this.locationsInfo){
            this.surveyJsonCopy.pages[0].elements[2].elements[2]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['protectionWhomSurvey']){
            this.survey.data = this.step.result['protectionWhomSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
            this.checkAnswersforContinue()
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.$store.state.Application.applicantName));
        
    }

    public determineNoContactPage(){       
        const noContantPage = 5;

        if (this.survey.data.ApplicantNeedsProtection == "y") {// Enable No Contact
            this.$store.commit("Application/setPageActive", {currentStep: this.currentStep, currentPage: noContantPage, active: true});
            
            if(!this.$store.state.Application.steps[this.currentStep].result.noContactSurvey){
                //console.log("NoContact")
                //console.log(this.step)
                const noContactSurvey = {data:{}, questions:[{inputType:'',name:'no', title:'Some Information missing', value:''}], pageName:'No Contact', currentStep: this.currentStep, currentPage:noContantPage}
                this.UpdateStepResultData({step:this.step, data: {noContactSurvey: noContactSurvey}})
            }

        } else {// Disable No Contact
            this.$store.commit("Application/setPageActive", {currentStep: this.currentStep, currentPage: noContantPage, active: false});
        }            
    }

    public checkAnswersforContinue(){
        if(this.survey.data.ApplicantNeedsProtection == 'n' && this.survey.data.anotherAdultPO == 'n' && this.survey.data.childPO == 'n'){
            this.togglePages([3,4,5,6,7,8,10,11,12,13], false);
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);
            return false
        }else{
            this.togglePages([3,4,6,7,8,11,12], true);
            this.determineNoContactPage()
            return true
        }
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
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public setRelatedNames(){
        if(this.survey.data &&  this.survey.data["RespondentName"]) {        
            this.$store.commit("Application/setRespondentName", this.survey.data["RespondentName"]);
            this.UpdateCommonStepResults({data:{'respondentName':[this.survey.data["RespondentName"]]}});
        }

        if (this.survey.data && this.survey.data.ApplicantNeedsProtection == "n" && this.survey.data.anotherAdultPO == "y") {
            this.$store.commit("Application/setProtectedPartyName", this.survey.data.anotherAdultName);
            this.UpdateCommonStepResults({data:{'protectedPartyName':this.survey.data.anotherAdultName}})
        }else{
            const applicantname = this.$store.state.Application.applicantName
            this.$store.commit("Application/setProtectedPartyName",applicantname);
            this.UpdateCommonStepResults({data:{'protectedPartyName':applicantname}})
        }        
        
        if(this.survey.data && this.survey.data.childPO== "y" && (this.survey.data.ApplicantNeedsProtection == 'y' || this.survey.data.anotherAdultPO == 'n')) {
            this.$store.commit("Application/setProtectedChildName",this.survey.data.allchildren);
            this.UpdateCommonStepResults({data:{'protectedChildName':this.survey.data.allchildren}});           
        }else{ 
            this.$store.commit("Application/setProtectedChildName",[]);
            this.UpdateCommonStepResults({data:{'protectedChildName':[]}});
        }
    }

    public setExistingFileNumber(){
        
        const existingOrders = this.$store.state.Application.steps[0]['result']['existingOrders']

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == 'FPO')})
            if(index >= 0 ){
                if(this.survey.data && this.survey.data.ExistingFamilyCase == "y")
                    existingOrders[index]={type: 'FPO', filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}                   
                else
                    existingOrders.splice(index, 1);                                 
            }else{
                if(this.survey.data && this.survey.data.ExistingFamilyCase == "y")
                    existingOrders.push({type: 'FPO', filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber});
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{
            if(this.survey.data && this.survey.data.ExistingFamilyCase == "y")
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: 'FPO', filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}]}});
        }
    }
  
    beforeDestroy() {
        
        //console.log(this.survey.data)

        this.setRelatedNames();
        this.setExistingFileNumber();

        if(this.checkAnswersforContinue())
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        else
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);

        this.UpdateStepResultData({step:this.step, data: {protectionWhomSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
