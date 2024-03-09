<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Legal duty – another person</h1>

                    <div>                        
                        <b-form-group>
                            <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                                Do you have a legal duty to support another person?
                            </div>
                            <p>
                                You may have a legal duty from a judgment or agreement 
                                requiring you to support another individual including 
                                due to illness or disability or a former spouse.
                            </p>
                            <b-form-radio-group
                                v-model="legalDutyAnotherPersonFsExists"
                                class="mt-2 ml-3 survey-yesno-vue"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </div>                   

                    <div v-if="legalDutyAnotherPersonFsExists == 'Yes'" >
                        
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Please provide the details about your legal duty to 
                            support another person.
                        </div>
                        <p>
                            To add another person, click the “Add person” button and 
                            provide the information requested.
                        </p>
                        <p>
                            If you are done entering each other person, 
                            click the “Next” button.
                        </p>
                        <div class="childSection" v-if="showTable">
                            <div class="childAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Full name of person you support</th>
                                        <th scope="col">Monthly amount paid for support</th>
                                        <th scope="col">Annual amount paid for support</th>                                       
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="anotherPersonExpense in anotherPersonExpenseData" :key="anotherPersonExpense.id">
                                        <td>{{anotherPersonExpense.antherPersonFullName}}</td>
                                        <td>{{anotherPersonExpense.monthlyPayment}}</td>
                                        <td>{{anotherPersonExpense.yearlyPayment}}</td>                                       
                                        <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(anotherPersonExpense.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                        <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(anotherPersonExpense)"><i class="fa fa-edit"></i></a></td>
                                        </tr>
                                        <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add person</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-12" v-if="!showTable" id="legal-duty-another-person-fs-survey">
                    <legal-duty-another-person-fs-survey :step="step" v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>        
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required expense information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import LegalDutyAnotherPersonFsSurvey from "./LegalDutyAnotherPersonFSSurvey.vue";
import PageBase from "../../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
        LegalDutyAnotherPersonFsSurvey,
        PageBase
    }
})
export default class LegalDutyAnotherPersonFS extends Vue {

    @Prop({required: true})
    step!: stepInfoType;    

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = true;

    legalDutyAnotherPersonFsExists = null;  

    anotherPersonExpenseData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('legal-duty-another-person-fs-survey')
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

    public populateSurveyData(anotherPersonValue) {

        const currentIndexValue = this.anotherPersonExpenseData?.length > 0 ? this.anotherPersonExpenseData[this.anotherPersonExpenseData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...anotherPersonValue, id };
        this.anotherPersonExpenseData = [...this.anotherPersonExpenseData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
       
        this.anotherPersonExpenseData = this.anotherPersonExpenseData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.anotherPersonExpenseData = this.anotherPersonExpenseData.map(data => {
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

        if (this.step.result?.legalDutyAnotherPersonFsExists) {
            this.legalDutyAnotherPersonFsExists = this.step.result.legalDutyAnotherPersonFsExists;
        }

        if (this.step.result?.legalDutyAnotherPersonFSSurvey?.data) {
            this.anotherPersonExpenseData = this.step.result.legalDutyAnotherPersonFSSurvey.data;
        }
             
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
    }

    public surveyHasError(){
        let progress = this.anotherPersonExpenseData.length==0? 50 : 100;
        
        if(this.legalDutyAnotherPersonFsExists == 'No') progress =100;

        this.incompleteError =  false;        
        for(const anotherPersonExpense of this.anotherPersonExpenseData){
            if ((this.legalDutyAnotherPersonFsExists=='Yes') && 
                (!anotherPersonExpense.antherPersonFullName || !anotherPersonExpense.monthlyPayment || !anotherPersonExpense.yearlyPayment)){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }    

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (!this.legalDutyAnotherPersonFsExists || 
            (this.legalDutyAnotherPersonFsExists == 'Yes') 
            && this.anotherPersonExpenseData?.length <= 0 );
    }

    beforeDestroy() {
        this.surveyHasError();  
        
        let anotherPersonExpenseInfo = this.getAntherPersonExpenseResults()        
        
        if(this.legalDutyAnotherPersonFsExists == 'No')
            anotherPersonExpenseInfo = null
        
        this.UpdateStepResultData(
            {
                step:this.step, 
                data: {
                    legalDutyAnotherPersonFsExists: this.legalDutyAnotherPersonFsExists,
                    legalDutyAnotherPersonFSSurvey: anotherPersonExpenseInfo
                }
            }
        )       
    }

    public getAntherPersonExpenseResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const anotherPersonExpense of this.anotherPersonExpenseData)
        {
            questionResults.push({name:'legalDutyAnotherPersonFSSurvey', value: this.getAntherPersonExpenseInfo(anotherPersonExpense), title:'Another Person Expense '+anotherPersonExpense.id +' Information', inputType:''})
        }
        
        return {data: this.anotherPersonExpenseData, questions:questionResults, pageName:'Another Person Expense Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getAntherPersonExpenseInfo(anotherPersonExpense){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+(anotherPersonExpense.antherPersonFullName));
        resultString.push(Vue.filter('styleTitle')("Monthly Payment: ")+(anotherPersonExpense.monthlyPayment));
        resultString.push(Vue.filter('styleTitle')("Yearly Payment: ")+(anotherPersonExpense.yearlyPayment));

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
</style>
