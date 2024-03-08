<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Income of Other Persons in Household</h1>
                    <p>
                        To determine if an amount for child support other than the guideline 
                        amount should be paid, the court must look at each household’s 
                        standard of living. In comparing standards of living, the court may 
                        use the comparison of household standards of living test set out in 
                        <a href="https://laws-lois.justice.gc.ca/eng/regulations/SOR-97-175/page-18.html#docCont"
                            target="_blank">
                            Schedule II of the Federal Child Support Guidelines
                        </a>.                        
                    </p>

                    <div>
                        <b-form-group>
                            <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                                Do you live alone?
                            </div>
                            <p>
                                If a child or other adult lives with you at least part of the 
                                time, you do not live alone.
                            </p>
                            <b-form-radio-group
                                v-model="incomeOtherPersonHouseholdLiveAlone"
                                class="mt-2 ml-3 survey-yesno-vue"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </div>

                    <div v-if="(incomeOtherPersonHouseholdLiveAlone == 'No')">
                        <b-form-group>
                            <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                                How many children live in your home?
                            </div>
                            <p>
                                Include all children living in the home, even if they are not your own.
                            </p>
                            <b-form-input
                                v-model="incomeOtherPersonHouseholdNumberOfChildren"
                                type="number"
                                class="mt-2"
                                style="font-size:1.40em; display: inline-block;">
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div v-if="(incomeOtherPersonHouseholdLiveAlone == 'No')">
                        <b-form-group>
                            <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                                Do you live with another adult?
                            </div>
                            <p>
                                This includes a partner or roommate.
                            </p>
                            <b-form-radio-group
                                v-model="incomeOtherPersonHouseholdLiveWithAdult"
                                class="mt-2 ml-3 survey-yesno-vue"
                                @change="liveWithAdultChanged()"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </div>

                    <div v-if="(incomeOtherPersonHouseholdLiveAlone == 'No') && (incomeOtherPersonHouseholdLiveWithAdult == 'Yes')" >
                        
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Please provide the following details about each other adult 
                            living in your household.
                        </div>
                        <p>
                            To add an adult, click the “Add other adult” button and 
                            provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your other adults, click the “Next” button.
                        </p>
                        <div class="childSection" v-if="showTable">
                            <div class="childAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Full name of adult</th>
                                        <th scope="col">Annual income of adult</th>
                                        <th scope="col">Relationship to you</th>                                       
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="adult in adultData" :key="adult.id">
                                        <td>{{adult.adultFullName}}</td>
                                        <td>{{adult.adultAnnualIncome}}</td>
                                        <td v-if="adult.married=='y'">Married/Cohabitating</td>
                                        <td v-else>Not Married/Cohabitating</td>
                                        <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(adult.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                        <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(adult)"><i class="fa fa-edit"></i></a></td>
                                        </tr>
                                        <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add other adult</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-12" v-if="!showTable" id="income-other-person-household-fs-survey">
                    <income-other-person-household-fs-survey :step="step" v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>        
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required Adult information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import IncomeOtherPersonHouseholdFsSurvey from "./IncomeOtherPersonHouseholdFSSurvey.vue";
import PageBase from "../../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        IncomeOtherPersonHouseholdFsSurvey,
        PageBase
    }
})
export default class IncomeOtherPersonHouseholdFS extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = true;

    incomeOtherPersonHouseholdLiveAlone = null;
    incomeOtherPersonHouseholdNumberOfChildren = 0;
    incomeOtherPersonHouseholdLiveWithAdult = null;

    adultData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('income-other-person-household-fs-survey')
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

        const currentIndexValue = this.adultData?.length > 0 ? this.adultData[this.adultData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.adultData = [...this.adultData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
       
        this.adultData = this.adultData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.adultData = this.adultData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
        this.surveyHasError();
    }

    public onPrev() {
       Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    created() {

        if (this.step.result?.incomeOtherPersonHouseholdLiveAlone) {
            this.incomeOtherPersonHouseholdLiveAlone = this.step.result.incomeOtherPersonHouseholdLiveAlone;
        }

        if (this.step.result?.incomeOtherPersonHouseholdNumberOfChildren) {
            this.incomeOtherPersonHouseholdNumberOfChildren = this.step.result.incomeOtherPersonHouseholdNumberOfChildren;
        }

        if (this.step.result?.incomeOtherPersonHouseholdLiveWithAdult) {
            this.incomeOtherPersonHouseholdLiveWithAdult = this.step.result.incomeOtherPersonHouseholdLiveWithAdult;
        }

        if (this.step.result?.incomeOtherPersonHouseholdFSSurvey?.data) {
            this.adultData = this.step.result.incomeOtherPersonHouseholdFSSurvey.data;
        }
             
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;   
        this.liveWithAdultChanged();     
    }

    public surveyHasError(){
        let progress = this.adultData.length==0? 50 : 100;
        
        if(this.incomeOtherPersonHouseholdLiveAlone == 'Yes') progress =100;

        this.incompleteError =  false;        
        for(const adult of this.adultData){
            if ((this.incomeOtherPersonHouseholdLiveAlone=='No' && this.incomeOtherPersonHouseholdLiveWithAdult == 'Yes') && 
                (!adult.adultFullName || !adult.adultAnnualIncome || !adult.married )){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }    

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (!this.incomeOtherPersonHouseholdLiveAlone || 
            (this.incomeOtherPersonHouseholdLiveAlone == 'No' && 
            (!this.incomeOtherPersonHouseholdLiveWithAdult || this.incomeOtherPersonHouseholdLiveWithAdult == 'Yes') 
            && this.adultData?.length <= 0 ));
    }

    beforeDestroy() {
        this.surveyHasError();  
        
        let adultInfo = this.getAdultResults()        
        
        if(this.incomeOtherPersonHouseholdLiveAlone == 'Yes' ||
                (this.incomeOtherPersonHouseholdLiveAlone == 'No' && this.incomeOtherPersonHouseholdLiveWithAdult == 'No'))
            adultInfo = null
        
        this.UpdateStepResultData(
                {
                    step:this.step, 
                    data: {
                        incomeOtherPersonHouseholdLiveAlone: this.incomeOtherPersonHouseholdLiveAlone, 
                        incomeOtherPersonHouseholdNumberOfChildren: this.incomeOtherPersonHouseholdNumberOfChildren,
                        incomeOtherPersonHouseholdLiveWithAdult: this.incomeOtherPersonHouseholdLiveWithAdult,
                        incomeOtherPersonHouseholdFSSurvey: adultInfo
                    }
                }
            )       
    }

    public getAdultResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const adult of this.adultData)
        {
            questionResults.push({name:'incomeOtherPersonHouseholdFSSurvey', value: this.getAdultInfo(adult), title:'Adult '+adult.id +' Information', inputType:''})
        }
        
        return {data: this.adultData, questions:questionResults, pageName:'Children Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getAdultInfo(adult){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+(adult.adultFullName));
        resultString.push(Vue.filter('styleTitle')("Annual Income: ")+(adult.adultAnnualIncome))
        resultString.push(Vue.filter('styleTitle')("Relationship to you: ")+(adult.married == 'y'?'Married/Cohabitating': 'Not Married/Cohabitating'))           
        
        return resultString
    } 

    public liveWithAdultChanged(){
        
        if(this.incomeOtherPersonHouseholdLiveWithAdult){
            togglePages([this.stPgNo.FS.ContributionTowardExpensesFS], this.incomeOtherPersonHouseholdLiveWithAdult == 'Yes', this.currentStep);
        }
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
