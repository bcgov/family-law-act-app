<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Investments</h1>
                    <p>
                        Investments can include:
                        <ul>
                            <li>Tax Free Savings Accounts (TFSA)</li>
                            <li>Registered Retirement Savings Plans (RRSP)</li>
                            <li>Guaranteed Investment Certificate (GIC)</li>
                            <li>Stocks and bonds</li>
                            <li>Pensions</li>
                            <li>Cryptocurrency</li>
                        </ul>   
                    </p>

                    <div>
                        <p>
                            To add an investment asset, click the “Add asset” button 
                            and provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your investment assets, click 
                            the “Next” button.
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
                                    <tr v-for="investments in investmentsData" :key="investments.id">
                                    <td>{{investments.investmentsDescription}}</td>
                                    <td>{{investments.investmentsValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(investments.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(investments)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="investments-fs-survey">
                    <investments-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import InvestmentsFsSurvey from "./InvestmentsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      InvestmentsFsSurvey,
      PageBase
    }
})
export default class InvestmentsFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('investmentsData')
    investmentsDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {investmentsFSSurvey: this.getInvestmentsResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    investmentsData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.investmentsFSSurvey?.data) {
            this.investmentsData = this.step.result.investmentsFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.investmentsData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('investments-fs-survey')
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

    public populateSurveyData(investmentsValue) {
        const currentIndexValue = this.investmentsData?.length > 0 ? this.investmentsData[this.investmentsData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newInvestments = { ...investmentsValue, id };

        this.investmentsData = this.investmentsData? [...this.investmentsData, newInvestments]:[newInvestments];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.investmentsData = this.investmentsData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.investmentsData = this.investmentsData.map(data => {
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
        if(this.investmentsData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.investmentsData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{investmentsFSSurvey: this.getInvestmentsResults()}})       
    }
   
    public getInvestmentsResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.investmentsData)
            for(const investments of this.investmentsData)
            {
                questionResults.push({name:'investmentsFSSurvey', value: this.getInvestmentsInfo(investments), title:'Investments '+investments.id +' Information', inputType:''})
            }

        return {data: this.investmentsData, questions:questionResults, pageName:'Investments', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getInvestmentsInfo(investments){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+investments.investmentsDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+investments.investmentsValue);
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
