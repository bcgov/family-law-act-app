<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Cars, boats or vehicles</h1>
                    <p>
                        This may include any cars, boats, motorcycles, RVs, snowmobiles, ATVs 
                        or other vehicles you own, or jointly own.
                    </p>

                    <div>                        
                        
                        <p>
                            To add a car, boat or other vehicle, click the “Add asset” 
                            button and provide the information requested.
                        </p>
                        <p>
                            If you are done entering all your cars, boats, or vehicles 
                            assets, click the “Next” button.
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
                                    <tr v-for="carsBoatsVehicles in carsBoatsVehiclesData" :key="carsBoatsVehicles.id">
                                    <td>{{carsBoatsVehicles.carsBoatsVehiclesDescription}}</td>
                                    <td>{{carsBoatsVehicles.carsBoatsVehiclesValue}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(carsBoatsVehicles.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(carsBoatsVehicles)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="cars-boats-vehicles-fs-survey">
                    <cars-boats-vehicles-fs-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import CarsBoatsVehiclesFsSurvey from "./CarsBoatsVehiclesFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      CarsBoatsVehiclesFsSurvey,
      PageBase
    }
})
export default class CarsBoatsVehiclesFS extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
    

    @Watch('carsBoatsVehiclesData')
    carsBoatsVehiclesDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {carsBoatsVehiclesFSSurvey: this.getCarsBoatsVehiclesResults()}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    carsBoatsVehiclesData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.carsBoatsVehiclesFSSurvey?.data) {
            this.carsBoatsVehiclesData = this.step.result.carsBoatsVehiclesFSSurvey.data;
        }
    }

    mounted(){        
        const progress = this.carsBoatsVehiclesData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('cars-boats-vehicles-fs-survey')
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

    public populateSurveyData(carsBoatsVehiclesValue) {
        const currentIndexValue = this.carsBoatsVehiclesData?.length > 0 ? this.carsBoatsVehiclesData[this.carsBoatsVehiclesData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newCarsBoatsVehicles = { ...carsBoatsVehiclesValue, id };

        this.carsBoatsVehiclesData = this.carsBoatsVehiclesData? [...this.carsBoatsVehiclesData, newCarsBoatsVehicles]:[newCarsBoatsVehicles];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.carsBoatsVehiclesData = this.carsBoatsVehiclesData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.carsBoatsVehiclesData = this.carsBoatsVehiclesData.map(data => {
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
        if(this.carsBoatsVehiclesData?.length > 0) return false;
        else return true;
    }    

    beforeDestroy() {
        const progress = this.carsBoatsVehiclesData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data:{carsBoatsVehiclesFSSurvey: this.getCarsBoatsVehiclesResults()}})       
    }
   
    public getCarsBoatsVehiclesResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.carsBoatsVehiclesData)
            for(const carsBoatsVehicles of this.carsBoatsVehiclesData)
            {
                questionResults.push({name:'carsBoatsVehiclesFSSurvey', value: this.getCarsBoatsVehiclesInfo(carsBoatsVehicles), title:'Cars, boats or vehicles '+carsBoatsVehicles.id +' Information', inputType:''})
            }

        return {data: this.carsBoatsVehiclesData, questions:questionResults, pageName:'Cars, boats or vehicles', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getCarsBoatsVehiclesInfo(carsBoatsVehicles){        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Description: ")+carsBoatsVehicles.carsBoatsVehiclesDescription);
        resultString.push(Vue.filter('styleTitle')("Value: ")+carsBoatsVehicles.carsBoatsVehiclesValue);
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
