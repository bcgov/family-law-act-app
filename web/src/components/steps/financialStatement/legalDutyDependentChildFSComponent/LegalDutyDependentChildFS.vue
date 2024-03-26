<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Legal duty – dependent child</h4>

                    <div>                        
                        <b-form-group>
                            <div class="question">
                                Do you have a legal duty to support a dependent child 
                                from another relationship?
                            </div>
                            <p>A dependent child may include a biological child, adoptive child, or stepchild.</p>
                            <b-form-radio-group
                                v-model="legalDutyDependentChildFsExists"
                                class="mt-2 ml-3 survey-yesno-vue"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </div>                   

                    <div v-if="legalDutyDependentChildFsExists == 'Yes'" >
                        
                        <div class="question">
                            Please provide the details about your legal duty to 
                            support a dependent child.
                        </div>
                        <p>
                            To add a dependent child, click the “Add child” button 
                            and provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your other dependent 
                            children, click the “Next” button.
                        </p>
                        <div class="childSection" v-if="showTable">
                            <div class="childAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Full name of dependent you support</th>
                                        <th scope="col">Monthly amount paid for support</th>
                                        <th scope="col">Annual amount paid for support</th>                                       
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="childExpense in childExpenseData" :key="childExpense.id">
                                        <td>{{childExpense.childFullName}}</td>
                                        <td>{{childExpense.monthlyPayment}}</td>
                                        <td>{{childExpense.yearlyPayment}}</td>                                       
                                        <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(childExpense.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                        <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(childExpense)"><i class="fa fa-edit"></i></a></td>
                                        </tr>
                                        <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add child</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-12" v-if="!showTable" id="legal-duty-dependent-child-fs-survey">
                    <legal-duty-dependent-child-fs-survey :step="step" v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>        
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required child expense information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LegalDutyDependentChildFsSurvey from "./LegalDutyDependentChildFSSurvey.vue";
import PageBase from "../../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
        LegalDutyDependentChildFsSurvey,
        PageBase
    }
})
export default class LegalDutyDependentChildFS extends Vue {

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

    legalDutyDependentChildFsExists = null;  

    childExpenseData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('legal-duty-dependent-child-fs-survey')
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

        const currentIndexValue = this.childExpenseData?.length > 0 ? this.childExpenseData[this.childExpenseData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.childExpenseData = [...this.childExpenseData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
       
        this.childExpenseData = this.childExpenseData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.childExpenseData = this.childExpenseData.map(data => {
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

        if (this.step.result?.legalDutyDependentChildFsExists) {
            this.legalDutyDependentChildFsExists = this.step.result.legalDutyDependentChildFsExists;
        }

        if (this.step.result?.legalDutyDependentChildFSSurvey?.data) {
            this.childExpenseData = this.step.result.legalDutyDependentChildFSSurvey.data;
        }
             
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
    }

    public surveyHasError(){
        let progress = this.childExpenseData.length==0? 50 : 100;
        
        if(this.legalDutyDependentChildFsExists == 'No') progress =100;

        this.incompleteError =  false;        
        for(const childExpense of this.childExpenseData){
            if ((this.legalDutyDependentChildFsExists=='Yes') && 
                (!childExpense.childFullName || !childExpense.monthlyPayment || !childExpense.yearlyPayment)){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }    

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (!this.legalDutyDependentChildFsExists || 
            (this.legalDutyDependentChildFsExists == 'Yes') 
            && this.childExpenseData?.length <= 0 );
    }

    beforeDestroy() {
        this.surveyHasError();  
        
        let childExpenseInfo = this.getChildExpenseResults()        
        
        if(this.legalDutyDependentChildFsExists == 'No')
            childExpenseInfo = null
        
        this.UpdateStepResultData(
            {
                step:this.step, 
                data: {
                    legalDutyDependentChildFsExists: this.legalDutyDependentChildFsExists,
                    legalDutyDependentChildFSSurvey: childExpenseInfo
                }
            }
        )       
    }

    public getChildExpenseResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const childExpense of this.childExpenseData)
        {
            questionResults.push({name:'legalDutyDependentChildFSSurvey', value: this.getChildExpenseInfo(childExpense), title:'Child Expense '+childExpense.id +' Information', inputType:''})
        }
        
        return {data: this.childExpenseData, questions:questionResults, pageName:'Child Expense Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildExpenseInfo(childExpense){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+(childExpense.childFullName));
        resultString.push(Vue.filter('styleTitle')("Monthly Payment: ")+(childExpense.monthlyPayment));
        resultString.push(Vue.filter('styleTitle')("Yearly Payment: ")+(childExpense.yearlyPayment));

        return resultString
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

.page-title {
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: #494949;
    text-align: left; 
}

.question {
    color:#556077; 
    font-size:1.40em; 
    font-weight:bold;
}
</style>
