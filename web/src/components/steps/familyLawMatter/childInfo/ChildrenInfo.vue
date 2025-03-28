<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Children Details</h1>
                    <p>You have indicated you are asking for orders about a child.</p>
                    <p>Please enter the details of the child in the fields below.  
                        Add each child who is the subject of your family law matter application.  
                        To add a child, click the "Add Child" button.  If you are done entering 
                        all the children, click the "Next" button.
                    </p>
                    <div class="childSection" v-if="showTable">
                        <div class="childAlign">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Child's name</th>
                                    <th scope="col">Child's date of birth</th>
                                    <th v-if="!formOneRequired" scope="col">Your relationship to the child</th>
                                    <th v-if="!formOneRequired" scope="col">Other party's relationship to the child</th>
                                    <th v-if="!formOneRequired" scope="col">Child is currently living with</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="child in childData" :key="child.id">
                                    <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                                    <td>{{child.dob | beautify-date}}</td>
                                    <td v-if="!formOneRequired">{{child.relation}}</td>
                                    <td v-if="!formOneRequired">{{child.opRelation}}</td>
                                    <td v-if="!formOneRequired && child.currentLiving != 'other'">{{child.currentLiving}}</td>
                                    <td v-else-if="!formOneRequired && child.currentLiving == 'other'">{{child.currentLivingComment}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(child.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(child)"><i class="fa fa-edit"></i></a></td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                    <td colspan = "7">
                                        <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                        >+Add Child</a>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable" id="child-info-survey">
                    <children-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" :formOneRequired="formOneRequired" />
                </div>
               
            </div>
        </div>
        <b-card v-if="showTable && childData && childData.length > 0" class="mb-5" style="max-width: 950px; border-radius: 20px; border:2px solid #ccc;">
            <p>
                The <a href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/parenting-apart/best-interests" target="_blank"
            >best interests of the child</a> is a test that the court uses to make decisions about children.  
                Before making a decision, both parents and courts must consider the child's physical, psychological 
                and emotional safety, security and well-being.  You must always think about the best interests of 
                the child when you are asking the court for decisions about them.
            </p>
            
            <b-form-checkbox 
                size="lg" 
                v-model="childBestInterestUnderstanding" 
                style="display:inline-block;color:#556077; font-size:1.40em; font-weight:bold; transform:translate(0px,3px);">
            </b-form-checkbox>
            <div style="display:inline;color:#556077; font-size:1.5em; font-weight:bold;">
                I understand that I must consider the child(ren)'s best interests with respect to each order about the child I am asking the court to make.
            </div>
            
        </b-card>
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required Child information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import ChildrenSurvey from "./ChildrenSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";

import {SearchForChildrenData} from "@/components/utils/ChildrenData/SearchForChildrenData"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
      ChildrenSurvey,
      PageBase
    }
})
export default class ChildrenInfo extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = true;
    childBestInterestUnderstanding = false;
    childData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;  
    formOneRequired = false;     
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('child-info-survey')
            if(el) el.scrollIntoView();
        })
        if(anyRowToBeEdited) {
            this.editId = anyRowToBeEdited.id;
            this.anyRowToBeEdited = anyRowToBeEdited;
        } else {
            this.anyRowToBeEdited = null;
        }
    }

    public childComponentData(value) {       
        this.showTable = value;
    }

    public populateSurveyData(childValue) {

        const currentIndexValue = this.childData?.length > 0 ? this.childData[this.childData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.childData = [...this.childData, newChild];

        this.showTable = true; 
        this.resetChildrenRelatedPages(this.childData);
    }

    public deleteRow(rowToBeDeleted) {
       
        this.childData = this.childData.filter(data => {
            return data.id !== rowToBeDeleted;
        }); 
        this.resetChildrenRelatedPages(this.childData);
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.childData = this.childData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
        this.surveyHasError();
        this.resetChildrenRelatedPages(this.childData);
    }

    public onPrev() {
       Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    created() {

        if (this.step.result?.childrenInfoSurvey) {
            this.childData = this.step.result.childrenInfoSurvey.data;
        }
        if (this.step.result?.childBestInterestAcknowledgement) {
            this.childBestInterestUnderstanding = this.step.result.childBestInterestAcknowledgement;
        }

        if(this.childData?.length == 0){
            this.childData= SearchForChildrenData('FLM');            
        }

        this.formOneRequired = false;

        const stepCOM = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo]

        if( stepCOM.result?.filingLocationSurvey?.data){
            const filingLocationData = stepCOM.result.filingLocationSurvey.data;
            this.formOneRequired = this.determineFormOneRequired(filingLocationData);            
        }
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        
    }

    public determineFormOneRequired(filingLocationData){
        
        let location = ''
        location = filingLocationData?.ExistingCourt;                
        
        if(Vue.filter('includedInRegistries')(location, 'early-resolutions') && (filingLocationData?.MetEarlyResolutionRequirements == 'n' || filingLocationData?.courtLocationVictoriaSurrey)){
            return true;
        } else {
            return false;
        }
    }   

    public surveyHasError(){
        let progress = this.childData.length==0? 50 : 100;
        this.incompleteError =  false;        
        for(const child of this.childData){
            if ((this.formOneRequired && !child.dob) || 
                (!this.formOneRequired && (!child.dob || !child.relation || !child.opRelation || !child.currentLiving))){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (this.childData?.length <= 0 || !this.childBestInterestUnderstanding);
    }

    beforeDestroy() {
        this.surveyHasError();        
        this.UpdateStepResultData({step:this.step, data: {childrenInfoSurvey: this.getChildrenResults(), childBestInterestAcknowledgement:this.childBestInterestUnderstanding}})       
    }

    public getChildrenResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const child of this.childData)
        {
            questionResults.push({name:'childInfoSurvey', value: this.getChildInfo(child), title:'Child '+child.id +' Information', inputType:''})
        }
        
        return {data: this.childData, questions:questionResults, pageName:'Children Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildInfo(child){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(child.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(child.dob))
        if (!this.formOneRequired){
            resultString.push(Vue.filter('styleTitle')("Your relationship: ")+child.relation)
            resultString.push(Vue.filter('styleTitle')("Other party’s relationship: ")+child.opRelation)
            if (child.currentLiving == 'other'){
                resultString.push(Vue.filter('styleTitle')("Living with: ")+child.currentLivingComment)
            } else {
                resultString.push(Vue.filter('styleTitle')("Living with: ")+child.currentLiving)
            }
        }        
        
        return resultString
    }

    public resetChildrenRelatedPages(childData?) {
    
        const stPgNo: stepsAndPagesNumberInfoType = this.$store.state.Application.stPgNo;   
        const p = stPgNo.FLM;

        const pages = [
            p.ParentingArrangements,
            p.ParentalResponsibilities,
            p.ParentingTime,
            p.ParentingOrderAgreement,
            p.BestInterestsOfChild,
            p.ChildSupportCurrentArrangements,
            p.AboutChildSupportOrder,
            p.SpecialAndExtraordinaryExpenses,
            p.ContactWithChild,
            p.ContactWithChildOrder,
            p.AboutContactWithChildOrder,
            p.ContactWithChildBestInterestsOfChild,
            p.GuardianOfChild,
            p.ReviewYourAnswersFLM
        ]
        Vue.filter('setProgressForPages')(p._StepNo, pages,50);    

    }
}
</script>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
    padding-bottom: 20px;
    padding-top: 2rem;
    max-width: 950px;
    color: black;
}
.childSection {
    border: 2px solid rgba($gov-pale-grey, 0.7);
    border-radius: 18px;
    width: 100%
}
.childAlign {
    padding: 20px;
}
.table, td, th{
    border: 1px solid rgba($gov-pale-grey, 0.9);
  
}
.clickableRow {
    background-color: rgba($gov-pale-grey, 0.5);
    td a {
        display: block;
    }
}
</style>
