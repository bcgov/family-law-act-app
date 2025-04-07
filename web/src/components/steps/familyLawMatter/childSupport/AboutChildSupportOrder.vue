<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>        
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/about-child-support-order.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { nameInfoType } from "@/types/Application/CommonInformation";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import moment from 'moment';
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class AboutChildSupportOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public applicantName!: nameInfoType;

    

    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    childData = [];
    currentStep = 0;
    currentPage = 0;
    applicantFullName = '';
    over19Index = [];
    childSupportStartType = '';
    startDate = '';
    startEvent = '';
    numOf19child = 0 ;

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
        this.adjustSurveyForChildren();
        this.adjustSurveyForOtherParties();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));                        
        this.childData = [];
        this.over19Index = [];        

        if (this.step.result?.childrenInfoSurvey) {
            this.childData = this.step.result.childrenInfoSurvey.data;           
            const _19yearsBefore = moment().add(-19,'years')           
            const whysupport19childTemplate = JSON.parse(JSON.stringify(this.surveyJsonCopy.pages[0].elements[0].elements[8]))
            this.surveyJsonCopy.pages[0].elements[0].elements.splice(8,1)
            
            this.numOf19child = 0   
            for (const childInx in this.childData){
                const child = this.childData[childInx];
                const childName = Vue.filter('getFullName')(child.name)
                
                this.surveyJsonCopy.pages[0].elements[0].elements[6]["choices"].push({
                    value: child.id,
                    text: childName
                });

                if ((moment(child.dob).isBefore(_19yearsBefore))){
                    const temp =JSON.parse(JSON.stringify(whysupport19childTemplate))
                    temp.title = "Why does "+childName +" need support?"
                    temp.name  = "whyOlderChildNeedSupport["+childInx+"]"                    
                    temp.visibleIf = "{supportChildOver19}=='y' and {listOfChildren} contains '"+childName+"' "
                    
                    this.surveyJsonCopy.pages[0].elements[0].elements.splice(8+this.numOf19child,0,temp)
                    this.numOf19child++;
                    this.over19Index.push(childInx);
                }
            }
        }
    }

    public adjustSurveyForOtherParties(){        
        
        const stepCOM = this.steps[this.stPgNo.COMMON._StepNo]

        this.surveyJsonCopy.pages[0].elements[0].elements[0]["choices"]=[Vue.filter('getFullName')(this.applicantName)];

        if (stepCOM.result?.otherPartyCommonSurvey?.data) {
            const otherPartyData = stepCOM.result.otherPartyCommonSurvey.data;            
            for (const otherParty of otherPartyData){
               this.surveyJsonCopy.pages[0].elements[0].elements[0]["choices"].push({
                    value: otherParty.id,
                    text: Vue.filter('getFullName')(otherParty.name)
                });
            }
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {           
            Vue.filter('surveyChanged')('familyLawMatter')
           
            if (options.name == 'listOfChildren'){
                this.setSelectedChildNames(options.value);
            }
            if(options.name == 'listOfSupportPayors'){                 
                this.determineNumberOfPayors();               
            }
        })
    }
    
    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.aboutChildSupportOrderSurvey) {
            this.survey.data = this.step.result.aboutChildSupportOrderSurvey.data;

            this.survey.setVariable("listOfSupportPayorsLength",this.survey.data?.listOfSupportPayors? this.survey.data.listOfSupportPayors.length : 0)
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        this.applicantFullName = Vue.filter('getFullName')(this.applicantName);
        this.survey.setVariable("ApplicantName", this.applicantFullName);
        
        this.determineNumberOfPayors();
        
        if(this.childData?.length==1){
            this.survey.setValue('listOfChildren',[Vue.filter('getFullName')(this.childData[0].name)])           
        }
        
        this.survey.setValue('numberOf19yrsChild',this.numOf19child);
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }  

    public determineNumberOfPayors(){
        if(this.survey.data?.listOfSupportPayors){
            if(this.survey.data.listOfSupportPayors.includes(this.applicantFullName))
                this.survey.setVariable("listOfSupportPayorsLength",2)
            else
                this.survey.setVariable("listOfSupportPayorsLength",this.survey.data.listOfSupportPayors.length)
        }
        else
            this.survey.setVariable("listOfSupportPayorsLength",0);
    }

    public setSelectedChildNames(selectedChildren: string[]){
        const selectedChildNames = []
        for (const selectedChildIndex of selectedChildren){            
            const selectedChild = this.childData.find(c => c.id === selectedChildIndex);   
            if(selectedChild)         
                selectedChildNames.push(Vue.filter('getFullName')(selectedChild.name))
        }

        this.survey.setValue("selectedChildrenNames", selectedChildNames);
    }

    public setOver19Info(){
        const over19Details = []
        for (const index of this.over19Index){
            
            const detail = {
                name:Vue.filter('getFullName')(this.childData[index].name), 
                reasonForSupport:{
                    illness:this.survey.data['whyOlderChildNeedSupport['+ index + ']'] == 'Illness', 
                    disability:this.survey.data['whyOlderChildNeedSupport['+ index + ']'] == 'Disability',  
                    student:this.survey.data['whyOlderChildNeedSupport['+ index + ']'] == 'Student'
                }
            }

            over19Details.push(detail); 
        }
        this.survey.setValue("over19Details", over19Details);

    }
    
    beforeDestroy() {
        this.setOver19Info();
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {aboutChildSupportOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>