<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Other assets</h4>
                    <p>
                        Other assets may include:
                        <ul>
                            <li>precious metals, for example gold</li>
                            <li>art</li>
                            <li>jewellery, or</li>
                            <li>any other items of high value</li>
                        </ul>  
                    </p>

                    <div>
                        <p>
                            To add an asset, click the “Add asset” button and provide 
                            the information requested.
                        </p>
                        <p>
                            If you are done entering all your other assets, click the “Next” button.
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
                                    <tr v-for="otherAssets in otherAssetsData" :key="otherAssets.id">
                                    <td>{{otherAssets.otherAssetsDescription}}</td>
                                    <td>{{otherAssets.otherAssetsValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(otherAssets.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(otherAssets)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="other-assets-fs-survey">
                    <other-assets-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import OtherAssetsFsSurvey from "./OtherAssetsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";

@Component({
    components:{
      OtherAssetsFsSurvey,
      PageBase
    }
})
export default class OtherAssetsFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('otherAssetsData')
    otherAssetsDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {otherAssetsFSSurvey: this.getOtherAssetsResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    otherAssetsData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.otherAssetsFSSurvey?.data) {
            this.otherAssetsData = this.step.result.otherAssetsFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.otherAssetsData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('other-assets-fs-survey')
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

    public populateSurveyData(otherAssetsValue) {
        const currentIndexValue = this.otherAssetsData?.length > 0 ? this.otherAssetsData[this.otherAssetsData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newOtherAssets = { ...otherAssetsValue, id };

        this.otherAssetsData = this.otherAssetsData? [...this.otherAssetsData, newOtherAssets]:[newOtherAssets];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.otherAssetsData = this.otherAssetsData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.otherAssetsData = this.otherAssetsData.map(data => {
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
        if(this.otherAssetsData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.otherAssetsData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{otherAssetsFSSurvey: this.getOtherAssetsResults()}})       
    }
   
    public getOtherAssetsResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.otherAssetsData)
            for(const otherAssets of this.otherAssetsData)
            {
                questionResults.push({name:'otherAssetsFSSurvey', value: this.getOtherAssetsInfo(otherAssets), title:'Other assets '+otherAssets.id +' Information', inputType:''})
            }

        return {data: this.otherAssetsData, questions:questionResults, pageName:'Other assets', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getOtherAssetsInfo(otherAssets){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+otherAssets.otherAssetsDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+otherAssets.otherAssetsValue);
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
