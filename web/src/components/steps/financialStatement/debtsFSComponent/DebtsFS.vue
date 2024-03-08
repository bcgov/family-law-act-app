<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Debts</h1>
                    <p>A debt is an amount of money you owe someone that you have a duty to pay.</p>

                    <div>
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Identify your outstanding debts.
                        </div>
                        <p>
                            Do <b>not</b> record the monthly payment for mortgage, car 
                            loans, credit card payments or other debts included in the 
                            expenses section you already completed, just the total balance 
                            owing.
                        </p>
                        <p>
                            <b>Note:</b> You may be required to provide the court with 
                            proof of the debt. Proof of a debt may include:
                            <ul>
                                <li>mortgage statements</li>
                                <li>credit card statements</li>
                                <li>car payment or other loan statements</li>
                                <li>student loan or line of credit</li>
                                <li>court orders requiring you to pay</li>

                            </ul>
                        </p>
                        <p>
                            To add an outstanding debt, click the “Add other debt” button 
                            and provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your debts, click the “Next” button.
                        </p>
                            
                    </div>

                    <div class="outerSection" v-if="showTable">
                        <div class="innerSection">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Name of creditor</th>
                                    <th scope="col">Reason for borrowing</th>
                                    <th scope="col">Balance owing</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="creditor in creditorData" :key="creditor.id">
                                    <td>{{creditor.creditorName}}</td>
                                    <td>{{creditor.reasonForBorrowing}}</td>                                   
                                    <td>{{creditor.balanceOwing}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(creditor.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(creditor)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="debts-fs-survey">
                    <debts-fs-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import DebtsFsSurvey from "./DebtsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        DebtsFsSurvey,
      PageBase
    }
})
export default class DebtsFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('creditorData')
    creditorDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {debtsFSSurvey: this.getCreditorResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    creditorData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.debtsFSSurvey) {
            this.creditorData = this.step.result.debtsFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.creditorData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('debts-fs-survey')
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

    public populateSurveyData(creditorValue) {
        const currentIndexValue = this.creditorData?.length > 0 ? this.creditorData[this.creditorData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newCreditor = { ...creditorValue, id };

        this.creditorData = this.creditorData? [...this.creditorData, newCreditor]:[newCreditor];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.creditorData = this.creditorData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.creditorData = this.creditorData.map(data => {
            return data.id == this.editId ? editedRow : data;
        });
        this.showTable = true;
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    public isDisableNext() {    
        if(this.creditorData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.creditorData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{debtsFSSurvey: this.getCreditorResults()}})       
    }
   
    public getCreditorResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.creditorData)
            for(const creditor of this.creditorData)
            {
                questionResults.push({name:'debtsFSSurvey', value: this.getCreditorInfo(creditor), title:'Creditor '+creditor.id +' Information', inputType:''})
            }

        return {data: this.creditorData, questions:questionResults, pageName:'Debts', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getCreditorInfo(creditor){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Name: ")+creditor.creditorName);
        resultString.push(Vue.filter('styleTitle')("Reason For Borrowing: ")+creditor.reasonForBorrowing);
        resultString.push(Vue.filter('styleTitle')("Balance Owing: ")+creditor.balanceOwing);
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
.outerSection {
    border: 2px solid rgba($gov-pale-grey, 0.7);
    border-radius: 18px;
    width: 100%
}
.innerSection {
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
