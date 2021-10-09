<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Children Details</h1>
                   
                    <p>Add each child who is the subject of your priority parenting matter application. 
                        To add a child, click the "Add Child" button. If you are done entering all the 
                        children, click the "Next" button.
                    </p>
                    <div class="childSection" v-if="showTable">
                        <div class="childAlign">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Child's name</th>
                                    <th scope="col">Child's date of birth</th>
                                    <th scope="col">Your relationship to the child</th>
                                    <th scope="col">Other party's relationship to the child</th>                                   
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="child in childData" :key="child.id">
                                    <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                                    <td>{{child.dob | beautify-date}}</td>
                                    <td>{{child.relation}}</td>
                                    <td>{{child.opRelation}}</td>                                   
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(child.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(child)"><i class="fa fa-edit"></i></a></td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                    <td colspan = "7">
                                        <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                        >+Add Child</a>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable" id="child-info-survey">
                    <Children-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required Child information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>       
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import ChildrenSurvey from "./ChildrenSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";

import {SearchForChildrenData} from "@/components/utils/ChildrenData/SearchForChildrenData"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      ChildrenSurvey,
      PageBase
    }
})
export default class PpmChildrenInfo extends Vue {

    @Prop({required: true})
    step!: stepInfoType
    
    @applicationState.State
    public steps!: stepInfoType[];

    

    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = true;
    childData = [];
    anyRowToBeEdited = null;
    editId = null;    
    incompleteError =  false; 

    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('child-info-survey')
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
        const currentIndexValue =
            this.childData?.length > 0 ? this.childData[this.childData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.childData = [...this.childData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.childData = this.childData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
        this.surveyHasError(); 
    }

    public editRow(editedRow) {
        this.childData = this.childData.map(data => {
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
        if (this.step.result?.ppmChildrenInfoSurvey) {
            this.childData = this.step.result.ppmChildrenInfoSurvey.data;
        }  
        
        if(this.childData?.length == 0){
            this.childData= SearchForChildrenData('PPM');            
        }      
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;       
    }
    
    public surveyHasError(){
        let progress = this.childData.length==0? 50 : 100;
        this.incompleteError =  false;        
        for(const child of this.childData){            
            if(child.dob == '' || child.relation == ''|| child.opRelation == ''){
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (this.childData?.length <= 0);
    }

    beforeDestroy() {
        this.surveyHasError(); 
        this.UpdateStepResultData({step:this.step, data: {ppmChildrenInfoSurvey: this.getChildrenResults()}})       
    }

    public getChildrenResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const child of this.childData)
        {
            questionResults.push({name:'childInfoSurvey', value: this.getChildInfo(child), title:'Child '+child.id +' Information', inputType:''})
        }

        return {data: this.childData, questions:questionResults, pageName:'Children Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildInfo(child){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(child.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(child.dob))
        resultString.push(Vue.filter('styleTitle')("Your relationship: ")+child.relation)
        resultString.push(Vue.filter('styleTitle')("Other party’s relationship: ")+child.opRelation)       
        
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
