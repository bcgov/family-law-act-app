<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Cash assets</h4>
                    <p>
                        Cash assets include cash you have and any bank accounts with a 
                        balance (even if it is small).
                    </p>

                    <div>                        
                        
                        <p>
                            To add a cash asset, click the “Add asset” button and 
                            provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your cash assets, click the “Next” button.
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
                                    <tr v-for="cashAssets in cashAssetsData" :key="cashAssets.id">
                                    <td>{{cashAssets.cashAssetsDescription}}</td>
                                    <td>{{cashAssets.cashAssetsValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(cashAssets.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(cashAssets)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="cash-assets-fs-survey">
                    <cash-assets-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import CashAssetsFsSurvey from "./CashAssetsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      CashAssetsFsSurvey,
      PageBase
    }
})
export default class CashAssetsFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('cashAssetsData')
    cashAssetsDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {cashAssetsFSSurvey: this.getCashAssetsResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    cashAssetsData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.cashAssetsFSSurvey?.data) {
            this.cashAssetsData = this.step.result.cashAssetsFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.cashAssetsData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('cash-assets-fs-survey')
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

    public populateSurveyData(cashAssetsValue) {
        const currentIndexValue = this.cashAssetsData?.length > 0 ? this.cashAssetsData[this.cashAssetsData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newCashAssets = { ...cashAssetsValue, id };

        this.cashAssetsData = this.cashAssetsData? [...this.cashAssetsData, newCashAssets]:[newCashAssets];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.cashAssetsData = this.cashAssetsData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.cashAssetsData = this.cashAssetsData.map(data => {
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
        if(this.cashAssetsData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.cashAssetsData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{cashAssetsFSSurvey: this.getCashAssetsResults()}})       
    }
   
    public getCashAssetsResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.cashAssetsData)
            for(const cashAssets of this.cashAssetsData)
            {
                questionResults.push({name:'cashAssetsFSSurvey', value: this.getCashAssetsInfo(cashAssets), title:'Cash assets '+cashAssets.id +' Information', inputType:''})
            }

        return {data: this.cashAssetsData, questions:questionResults, pageName:'Cash assets', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getCashAssetsInfo(cashAssets){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+cashAssets.cashAssetsDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+cashAssets.cashAssetsValue);
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
.page-title {
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: #494949;
    text-align: left; 
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
