<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Undue Hardship</h1>
                    <p>
                        Sometimes the amount of child support determined under the child support 
                        guidelines, when combined with other circumstances, may create undue 
                        hardship for a person or their child. 
                    </p>
                    <p>
                        The court can make a child support order for an amount different from 
                        the guidelines on application for undue hardship from either parent [ 
                        <a href="https://laws-lois.justice.gc.ca/eng/regulations/SOR-97-175/page-1.html#docCont"
                            target="_blank">
                            section 10 of the Federal Child Support Guidelines
                        </a>].                        
                    </p>
                    <p>
                        In this section, you will provide details about why there is undue hardship.
                    </p>

                    <div>
                        <h2>Unusual or excessive debt</h2>
                        <b-form-group>
                            <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                                Do you have an unusual or excessive amount of debt that 
                                you incurred to support the family prior to separation, 
                                or to earn a living?
                            </div>
                            <b-form-radio-group
                                v-model="undueHardshipFsExists"
                                class="mt-2 ml-3 survey-yesno-vue"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </div>                   

                    <div v-if="undueHardshipFsExists == 'Yes'" >
                        
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Please provide the details of the unusual or excessive 
                            debts you incurred.
                        </div>
                        <p>
                            To add a debt, click the “Add other debt” button and 
                            provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your debts, click the “Next” button.
                        </p>
                        <div class="childSection" v-if="showTable">
                            <div class="childAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Name of creditor and reason for borrowing</th>
                                        <th scope="col">Balance owing</th>
                                        <th scope="col">Annual debt repayment</th>                                       
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="debt in debtData" :key="debt.id">
                                        <td>{{debt.creditorFullName}}<br>{{debt.debtReason}}</td>
                                        <td>{{debt.debTotal}}</td>
                                        <td>{{debt.debtAnnualPayment}}</td>                                       
                                        <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(debt.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                        <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(debt)"><i class="fa fa-edit"></i></a></td>
                                        </tr>
                                        <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add other debt</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-12" v-if="!showTable" id="undue-hardship-fs-survey">
                    <undue-hardship-fs-survey :step="step" v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>        
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required debt information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import UndueHardshipFsSurvey from "./UndueHardshipFSSurvey.vue";
import PageBase from "../../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
        UndueHardshipFsSurvey,
        PageBase
    }
})
export default class UndueHardshipFS extends Vue {

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

    undueHardshipFsExists = null;  

    debtData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('undue-hardship-fs-survey')
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

        const currentIndexValue = this.debtData?.length > 0 ? this.debtData[this.debtData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.debtData = [...this.debtData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
       
        this.debtData = this.debtData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.debtData = this.debtData.map(data => {
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

        if (this.step.result?.undueHardshipFsExists) {
            this.undueHardshipFsExists = this.step.result.undueHardshipFsExists;
        }

        if (this.step.result?.undueHardshipFSSurvey?.data) {
            this.debtData = this.step.result.undueHardshipFSSurvey.data;
        }
             
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
    }

    public surveyHasError(){
        let progress = this.debtData.length==0? 50 : 100;
        
        if(this.undueHardshipFsExists == 'No') progress =100;

        this.incompleteError =  false;        
        for(const debt of this.debtData){
            if ((this.undueHardshipFsExists=='Yes') && 
                (!debt.creditorFullName || !debt.debtReason || !debt.debTotal || !debt.debtAnnualPayment)){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }    

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (!this.undueHardshipFsExists || 
            (this.undueHardshipFsExists == 'Yes') 
            && this.debtData?.length <= 0 );
    }

    beforeDestroy() {
        this.surveyHasError();  
        
        let debtInfo = this.getDebtResults()        
        
        if(this.undueHardshipFsExists == 'No')
            debtInfo = null
        
        this.UpdateStepResultData(
            {
                step:this.step, 
                data: {
                    undueHardshipFsExists: this.undueHardshipFsExists,
                    undueHardshipFSSurvey: debtInfo
                }
            }
        )       
    }

    public getDebtResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const debt of this.debtData)
        {
            questionResults.push({name:'undueHardshipFSSurvey', value: this.getDebtInfo(debt), title:'Debt '+debt.id +' Information', inputType:''})
        }
        
        return {data: this.debtData, questions:questionResults, pageName:'Debt Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getDebtInfo(debt){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+(debt.creditorFullName));
        resultString.push(Vue.filter('styleTitle')("Borrowing reason: ")+(debt.debtReason));
        resultString.push(Vue.filter('styleTitle')("Debt Total: ")+(debt.debTotal));
        resultString.push(Vue.filter('styleTitle')("Annual Payment: ")+(debt.debtAnnualPayment));

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
