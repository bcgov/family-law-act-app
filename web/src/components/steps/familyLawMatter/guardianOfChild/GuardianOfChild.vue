<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
        <div v-if="showTable" :key="tableKey" class="my-5">
            <b-card v-if="tableError" style="background-color:#f6e4e6; color: #961c1c">Please enter all the values.</b-card>
            <b-table
                :items="guardianOfChildItem"
                :fields="guardianOfChildFields"
                class="mt-2"
                small                    
                bordereless>
                <template v-slot:cell(name)="data">
                    <b-form-select
                    id="input-2"
                    @change="tableChanged()"
                    v-model="data.item.name"
                    :options="childrenNames"
                    required
                    ></b-form-select>
                </template>
                <template v-slot:cell(nameOther)="data">
                    <b-form-select
                    id="input-3"
                    @change="tableChanged()"
                    v-model="data.item.nameOther"
                    :options="otherPartyNames"
                    required
                    ></b-form-select>
                </template>
                <template v-slot:cell(date)="data">
                    <b-form-input @change="tableChanged()" type="date" v-model="data.item.date" />
                </template> 
                <template v-slot:cell(relationship)="data">
                    <b-form-select
                    id="input-4"
                    @change="tableChanged()"
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



        <b-modal size="xl" v-model="showPopup" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3">
               
                <p>There is another form that you must complete when you are applying for guardianship of a child.
                    It is called <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa733.pdf?forcedownload=true"
                                    target='blank'>Guardianship Affidavit Form 5</a>. Before you can complete the affidavit, 
                    you must complete the following background checks referenced in the form:</p>
                <ul>
                    <li>
                        a Ministry of Children and Family Development record check
                    </li>
                    <li>
                        a protection order record check from the Protection Order Registry, and
                    </li>
                    <li>
                        a criminal record check                       
                    </li>                    
                </ul>
                <p>To get a criminal record check, ask at the police station or RCMP detachment in your community.</p>
                <p>To get the Ministry of Children and Family Development and Protection Order Registry record checks, you must fill out:</p>
                 <ul>
                    <li>
                        a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/supreme-family/s-51-consent-child-protection-record-check.pdf?forcedownload=true"
                        target='blank'>Consent for Child Protection Record Check</a>, and
                    </li>
                    <li>
                        a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa914.pdf?forcedownload=true"
                        target='blank'>Request for Protection Order Registry Search</a>.
                    </li>                                      
                </ul>
                <p>
                    I understand that I am required to file a Guardianship Affidavit in Form 5 as described in 
                    <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#section26" target='blank'>Rule 26</a> before 
                    the court can make a final order about guardianship.
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="success" @click="closePopup">I understand</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/guardian-of-child.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class GuardianOfChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 
    currentStep =0;
    currentPage =0;

    tableKey = 0;
    showTable = false;
    showPopup = false;
    showGuardianAssistance = false;
    tableError = false;

    applicationType=[]

    childrenNames = [];
    otherPartyNames = [];
    pageProgress = 0;

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

        if (this.step.result?.childrenInfoSurvey) {
            const childData = this.step.result.childrenInfoSurvey.data; 
            this.childrenNames = [];       
            for (const child of childData){
                const childName = Vue.filter('getFullName')(child.name);
                this.childrenNames.push(childName)
                this.surveyJsonCopy.pages[0].elements[2].elements[0]["choices"].push(childName);                
            }
        }
    }

    public adjustSurveyForOtherParties(){
        const stepCOM = this.steps[this.stPgNo.COMMON._StepNo]

        if (stepCOM.result?.otherPartyCommonSurvey?.data) {
            const otherPartyData = stepCOM.result.otherPartyCommonSurvey.data;
            this.otherPartyNames = [];            
            for (const otherParty of otherPartyData){
                this.otherPartyNames.push(Vue.filter('getFullName')(otherParty.name))                
            }
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            this.setPages();
            this.determineShowingTable();
           
            if((!this.applicationType || !this.applicationType?.includes("becomeGuardian")) && options.name == "applicationType" && options.value?.includes("becomeGuardian")){                
                this.showPopup = true; 

                this.togglePages([this.stPgNo.FLM.FlmAdditionalDocuments], true);
                if(this.$store.state.Application.steps[this.currentStep].pages[this.stPgNo.FLM.FlmAdditionalDocuments].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.FLM.FlmAdditionalDocuments, 50, false);
            } 
            Vue.nextTick(()=> this.applicationType = this.survey.data.applicationType)
        })
    }

    public determineShowingTable(){
        if(this.survey.data?.applicationType?.includes('cancelGuardian'))
            this.showTable=true;
        else
            this.showTable=false;
    }

    public determineShowPopup(){
        if(this.survey.data?.applicationType?.includes('becomeGuardian'))
            return true;
        else
            return false;
    }
    
    public setPages(){ 
        if (this.survey.data?.applicationType?.includes("cancelGuardian")) {                
            this.togglePages([this.stPgNo.FLM.GuardianOfChildBestInterestsOfChild], true);                
        } else {
            this.togglePages([this.stPgNo.FLM.GuardianOfChildBestInterestsOfChild], false);
        }

        if(!this.survey.data?.applicationType?.includes("becomeGuardian") && Vue.filter('FLMform4Required')()==false){
            this.togglePages([this.stPgNo.FLM.FlmAdditionalDocuments], false);
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

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.guardianOfChildSurvey) {

            this.survey.data = this.step.result.guardianOfChildSurvey.data;
            this.applicationType = this.survey.data.applicationType
            if(this.survey.data?.cancelGuardianDetails) 
                this.guardianOfChildItem = this.survey.data.cancelGuardianDetails;

            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        
        this.setPages();
        this.determineShowingTable();

        this.pageProgress = this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress

        if(this.checkTableError())
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);        
        else
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
    }

    public AddRow(){
        this.guardianOfChildItem.push({name:'', nameOther:'', date:'', relationship:''},)
    }

    public RemoveRow(){        
        if(this.guardianOfChildItem?.length>1)
            this.guardianOfChildItem.pop()
    }

    public checkTableError(){
        
        if(this.showTable)
            for(const itemIndex in this.guardianOfChildItem){
                const childItem = this.guardianOfChildItem[itemIndex]
                if(!childItem?.name || !childItem?.nameOther || !childItem?.date || !childItem?.relationship){
                    this.tableError = true;
                    return true
                }
            }
        this.tableError=false;
        return false
    }

    public tableChanged(){
        Vue.filter('surveyChanged')('familyLawMatter')
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors && !this.checkTableError()) {
            this.UpdateGotoNextStepPage();
        }
    }  

    public closePopup(){
        this.showPopup = false;
    }
    
    beforeDestroy() {
        this.survey.setValue('cancelGuardianDetails', this.guardianOfChildItem)
        if(this.checkTableError())
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);        
        else
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        

        const tableQuestion = this.showTable? {name:'cancelChildGuardianship', value: this.guardianOfChildItem, title:'Please complete the following information for each child you are applying for a person to no longer be a guardian of', inputType:''}: ''
        this.UpdateStepResultData({step:this.step, data: {guardianOfChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage, tableQuestion)}})
    }
}
</script>
