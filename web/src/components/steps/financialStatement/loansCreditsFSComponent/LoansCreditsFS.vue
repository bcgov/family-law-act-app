<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Loans and credits</h1>
                    <p>
                        Loans and credits are money owing to you.
                    </p>

                    <div>
                        <p>
                            To add a loan or credit, click the “Add asset” button and 
                            provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your loans and credits assets, 
                            click the “Next” button.
                        </p>
                            
                    </div>

                    <div class="outerSection" v-if="showTable">
                        <div class="innerSection">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Description of asset</th>
                                    <th scope="col">Current value of asset</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="loansCredits in loansCreditsData" :key="loansCredits.id">
                                    <td>{{loansCredits.loansCreditsDescription}}</td>
                                    <td>{{loansCredits.loansCreditsValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(loansCredits.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(loansCredits)"><i class="fa fa-edit"></i></a></td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                    <td colspan = "7">
                                        <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                        >+Add asset</a>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable" id="loans-credits-fs-survey">
                    <loans-credits-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import LoansCreditsFsSurvey from "./LoansCreditsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      LoansCreditsFsSurvey,
      PageBase
    }
})
export default class LoansCreditsFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('loansCreditsData')
    loansCreditsDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {loansCreditsFSSurvey: this.getLoansCreditsResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    loansCreditsData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.loansCreditsFSSurvey?.data) {
            this.loansCreditsData = this.step.result.loansCreditsFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.loansCreditsData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('loans-credits-fs-survey')
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

    public populateSurveyData(loansCreditsValue) {
        const currentIndexValue = this.loansCreditsData?.length > 0 ? this.loansCreditsData[this.loansCreditsData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newLoansCredits = { ...loansCreditsValue, id };

        this.loansCreditsData = this.loansCreditsData? [...this.loansCreditsData, newLoansCredits]:[newLoansCredits];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.loansCreditsData = this.loansCreditsData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.loansCreditsData = this.loansCreditsData.map(data => {
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
        if(this.loansCreditsData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.loansCreditsData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{loansCreditsFSSurvey: this.getLoansCreditsResults()}})       
    }
   
    public getLoansCreditsResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.loansCreditsData)
            for(const loansCredits of this.loansCreditsData)
            {
                questionResults.push({name:'loansCreditsFSSurvey', value: this.getLoansCreditsInfo(loansCredits), title:'Loans and credits '+loansCredits.id +' Information', inputType:''})
            }

        return {data: this.loansCreditsData, questions:questionResults, pageName:'Loans and credits', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getLoansCreditsInfo(loansCredits){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+loansCredits.loansCreditsDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+loansCredits.loansCreditsValue);
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
