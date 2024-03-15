<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Real Estate</h4>
                    <p>Real estate is real property including land and/or buildings.</p>

                    <div>                        
                        
                        <p>
                            To add an asset, click the “Add asset” button and provide 
                            the information requested.
                        </p>
                        <p>
                            If you are done entering all your real estate assets, 
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
                                    <tr v-for="realEstate in realEstateData" :key="realEstate.id">
                                    <td>{{realEstate.realEstateDescription}}</td>
                                    <td>{{realEstate.realEstateValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(realEstate.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(realEstate)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="real-estate-fs-survey">
                    <real-estate-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
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

import PageBase from "../../PageBase.vue";
import RealEstateFsSurvey from "./RealEstateFSSurvey.vue";

import { stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
      RealEstateFsSurvey,
      PageBase
    }
})
export default class RealEstateFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('realEstateData')
    realEstateDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {realEstateFSSurvey: this.getRealEstateResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    realEstateData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.realEstateFSSurvey?.data) {
            this.realEstateData = this.step.result.realEstateFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.realEstateData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('real-estate-fs-survey')
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

    public populateSurveyData(realEstateValue) {
        const currentIndexValue = this.realEstateData?.length > 0 ? this.realEstateData[this.realEstateData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newRealEstate = { ...realEstateValue, id };

        this.realEstateData = this.realEstateData? [...this.realEstateData, newRealEstate]:[newRealEstate];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.realEstateData = this.realEstateData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.realEstateData = this.realEstateData.map(data => {
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
        if(this.realEstateData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.realEstateData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{realEstateFSSurvey: this.getRealEstateResults()}})       
    }
   
    public getRealEstateResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.realEstateData)
            for(const realEstate of this.realEstateData)
            {
                questionResults.push({name:'realEstateFSSurvey', value: this.getRealEstateInfo(realEstate), title:'Real Estate '+realEstate.id +' Information', inputType:''})
            }

        return {data: this.realEstateData, questions:questionResults, pageName:'Real Estate', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getRealEstateInfo(realEstate){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+realEstate.realEstateDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+realEstate.realEstateValue);
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
