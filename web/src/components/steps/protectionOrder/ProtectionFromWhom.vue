<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary"

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
    disableNextButton = false;
    currentStep=0;
    currentPage=0;

    beforeCreate() {        
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);        
    }

    mounted(){
        this.disableNextButton = false; 
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }
    
    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    } 

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            // console.log(this.survey.data);
            //  console.log(options)

            Vue.filter('surveyChanged')('protectionOrder')

            if(options.name == "RespondentName") {        
                this.$store.commit("Application/setRespondentName", this.survey.data["RespondentName"]);
                this.UpdateCommonStepResults({data:{'respondentsPO':[this.survey.data["RespondentName"]]}});
            }

            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt)
            }
              
            //this.determineNoContactPage()
            this.checkAnswersforContinue()
        })
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);        
       
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

    // public determineNoContactPage(){       
    //     const noContantPage = 6;

    //     if (this.survey.data.ApplicantNeedsProtection == "y") {// Enable No Contact
    //         this.$store.commit("Application/setPageActive", {currentStep: this.currentStep, currentPage: noContantPage, active: true});
            
    //         if(!this.$store.state.Application.steps[this.currentStep].result.noContactSurvey){
    //             //console.log("NoContact")
    //             //console.log(this.step)
    //             const noContactSurvey = {data:{}, questions:[{inputType:'',name:'no', title:'Some Information missing', value:''}], pageName:'No Contact', currentStep: this.currentStep, currentPage:noContantPage}
    //             this.UpdateStepResultData({step:this.step, data: {noContactSurvey: noContactSurvey}})
    //         }

    //     } else {// Disable No Contact
    //         this.$store.commit("Application/setPageActive", {currentStep: this.currentStep, currentPage: noContantPage, active: false});
    //     }            
    // }

    public checkAnswersforContinue(){
        if(this.survey.data.ApplicantNeedsProtection == 'n' && this.survey.data.anotherAdultPO == 'n' && this.survey.data.childPO == 'n'){
            this.togglePages([3,4,5,6,7,8,9,11,12,13, 14], false);
            this.disableNextButton = true;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);
            return false
        } else {
            this.togglePages([3,4,5,6,7,8,9,12,13], true);   
            this.disableNextButton = false;         
            //this.determineNoContactPage()
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
            this.UpdateCommonStepResults({data:{'respondentsPO':[this.survey.data["RespondentName"]]}});
        }
        this.mergeRespondants();

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

    public mergeRespondants(){
        const respondentName =[]
        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondentsPO){
            const respondentPO = this.$store.state.Application.steps[0].result.respondentsPO        
            respondentName.push(...respondentPO)
        }
        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondentsCommon){
            const respondentCommon = this.$store.state.Application.steps[0].result.respondentsCommon
            respondentName.push(...respondentCommon)
        }

        //console.log(respondentName)
        const fullNamesArray =[];
        for(const name of respondentName ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentName.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })
        //console.log(uniqueArray);
        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
    }

    public setExistingFileNumber(){
        const fileType = 'AAP'
        const existingOrders = this.$store.state.Application.steps[0]['result']['existingOrders']
        const currentLocation = this.$store.state.Application.applicationLocation
        const existingOrdersCondition = this.survey.data && this.survey.data.ExistingFamilyCase == "y" && (this.survey.data.ApplicantNeedsProtection == 'y' || (this.survey.data.anotherAdultPO == 'n' && this.survey.data.childPO == 'y'))

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == fileType)})
            if(index >= 0 ){
                if(existingOrdersCondition)
                    existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}                   
                else
                    existingOrders[index]={type: fileType, filingLocation: currentLocation, fileNumber: ''}                                 
            }else{
                if(existingOrdersCondition)
                    existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber});
                else
                    existingOrders.push({type: fileType, filingLocation: currentLocation, fileNumber: ''});                     
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{
            if(existingOrdersCondition)
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}]}});
            else
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: currentLocation, fileNumber: '' }]}});    
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
