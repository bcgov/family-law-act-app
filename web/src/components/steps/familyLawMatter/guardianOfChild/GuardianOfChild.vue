<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
        <div v-if="showTable" :key="tableKey" class="my-5">
            <b-table
                :items="guardianOfChildItem"
                :fields="guardianOfChildFields"
                class="mt-2"
                small                    
                bordereless>
                <template v-slot:cell(name)="data">
                    <b-form-select
                    id="input-3"
                    v-model="data.item.name"
                    :options="childrenNames"
                    required
                    ></b-form-select>
                </template>
                <template v-slot:cell(nameOther)="data">
                    <b-form-select
                    id="input-3"
                    v-model="data.item.nameOther"
                    :options="otherPartyNames"
                    required
                    ></b-form-select>
                </template>
                <template v-slot:cell(date)="data">
                    <b-form-input type="date" v-model="data.item.date" />
                </template> 
                <template v-slot:cell(relationship)="data">
                    <b-form-select
                    id="input-3"
                    v-model="data.item.relationship"
                    :options="['Guardian','Applying to be appointed as a guardian']"
                    required
                    ></b-form-select>
                </template>
                <template v-slot:cell(control)="data">
                    <div v-if="data.index==(guardianOfChildItem.length-1)">
                        <b-badge v-b-tooltip title="Add Child" variant="success" class="mr-2" style="width:1rem; cursor:pointer" @click="AddRow" >+</b-badge>
                        <b-badge v-b-tooltip title="Remove Child" variant="danger"  style="width:1rem; cursor:pointer" @click="RemoveRow">-</b-badge>
                    </div>
                </template>

            </b-table>

            <div style="margin:5rem 0 4rem 0;">
                <div class="m-4 text-primary" @click="showGuardianAssistance= !showGuardianAssistance" style="border-bottom:1px solid; width:31rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> I am the child’s parent, does that mean I’m their guardian?
                    <span v-if="showGuardianAssistance" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showGuardianAssistance" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div v-if="showGuardianAssistance" class="mx-4 mb-5 mt-3">
                    A child’s parents are most often the child’s guardians, but other people can be guardians too. A parent who has never lived with a child is a guardian if they have regularly taken care of the child, there is an agreement or court order that says they are a guardian of the child, or under a will if the other parent dies.<br><br>A person who is not a parent can become a guardian of a child by court order or under a will.<br><br>If you are not sure if you are a guardian of the child, you may want to get some legal advice to confirm.
                </div>
            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/guardian-of-child.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class GuardianOfChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 
    currentStep=0;
    currentPage=0;

    tableKey = 0;
    showTable = false;
    showGuardianAssistance = false

    childrenNames = [];
    otherPartyNames = [];

    guardianOfChildItem =[
        {name:'', nameOther:'', date:'', relationship:''},
    ]
    guardianOfChildFields = [
        {key:"name",         label:"Name of Child",                                                                               tdClass:"align-middle", thClass:"text-primary align-middle text-center border-top-0", thStyle:"font-size:10pt; width:20%;"},
        {key:"nameOther",    label:"Name of Other Party (Guardian who you are applying to cancel their guardianship of a child)", tdClass:"align-middle", thClass:"text-primary align-middle text-center border-top-0", thStyle:"font-size:10pt; width:25%;"},
        {key:"date",         label:"When did the other party become a guardian of the child?",                                    tdClass:"align-middle", thClass:"text-primary align-middle text-center border-top-0", thStyle:"font-size:10pt; width:12%;"},
        {key:"relationship", label:"What is your guardianship relationship to the child?",                                        tdClass:"align-middle", thClass:"text-primary align-middle text-center border-top-0", thStyle:"font-size:10pt; width:18%;"},
        {key:"control",      label:"",                                                                                            tdClass:"align-middle", thClass:"text-primary align-middle text-center border-top-0", thStyle:"font-size:10pt; width:4%;"},
    ]

   
    @Watch('pageIndex')
    pageIndexChange(newVal) 
    {
        this.survey.currentPageNo = newVal;        
    }

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
        this.surveyJsonCopy.pages[0].elements[2].elements[0]["choices"]=[];        

        if (this.step.result && this.step.result['childData']) {
            const childData = this.step.result['childData'].data; 
            this.childrenNames = [];       
            for (const child of childData){
                const childName = Vue.filter('getFullName')(child.name);
                this.childrenNames.push(childName)
                this.surveyJsonCopy.pages[0].elements[2].elements[0]["choices"].push(childName);                
            }
        }
    }

    public adjustSurveyForOtherParties(){
        
        if (this.steps[2].result && this.steps[2].result['otherPartyCommonSurvey'] && this.steps[2].result['otherPartyCommonSurvey'].data) {
            const otherPartyData = this.steps[2].result['otherPartyCommonSurvey'].data;
            this.otherPartyNames = [];            
            for (const otherParty of otherPartyData){
                this.otherPartyNames.push(Vue.filter('getFullName')(otherParty.name))                
            }
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            this.setPages();
            this.determineShowingTable();
        })
    }

    public determineShowingTable(){
        if(this.survey.data && this.survey.data.applicantionType && this.survey.data.applicantionType.includes('cancelGuardian'))
            this.showTable=true;
        else
            this.showTable=false;
    }
    
    public setPages(){ 
        if (this.survey.data.applicantionType && this.survey.data.applicantionType.includes("cancelGuardian")) {                
            this.togglePages([27], true);                
        } else {
            this.togglePages([27], false);
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
    
    public reloadPageInformation() {
        // console.log(this.step.result)
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['GuardianOfChildSurvey']) {
            this.survey.data = this.step.result['GuardianOfChildSurvey'].data;

            if(this.survey.data.cancelGuardianDetails) this.guardianOfChildItem = this.survey.data.cancelGuardianDetails;

            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }       
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.setPages();
        this.determineShowingTable();
    }

    public AddRow(){
        //console.log('add')
        if(this.childrenNames.length>this.guardianOfChildItem.length)
            this.guardianOfChildItem.push({name:'', nameOther:'', date:'', relationship:''},)
    }

    public RemoveRow(){
        //console.log('remove')
        if(this.guardianOfChildItem.length>1)
            this.guardianOfChildItem.pop()
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }  
    
    beforeDestroy() {
        this.survey.setValue('cancelGuardianDetails', this.guardianOfChildItem)
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {GuardianOfChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
