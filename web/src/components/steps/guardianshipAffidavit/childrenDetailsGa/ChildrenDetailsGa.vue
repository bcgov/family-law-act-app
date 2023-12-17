<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Children Details</h1>
                    <p>
                        This section will collect information about each child 
                        you are applying to become a guardian of, including 
                        information about the child and your relationship with them.
                    </p>
                    <p>
                        Please enter the details of the child in the fields below. 
                        Add each child who is the subject of your application about 
                        guardianship of a child. To add a child, click the “Add Child” 
                        button. If you are done entering all the children, click the 
                        “Next” button.
                    </p>
                    <div class="childSection" v-if="showTable">
                        <div class="childAlign">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Child's name</th>
                                    <th scope="col">Child's date of birth</th>
                                    <th scope="col">Current guardians to the child</th>
                                    <th scope="col">Parents not guardians to the child</th>
                                    <th scope="col">Your relationship to the child</th>
                                    <th scope="col">Length of your relationship to the child</th>
                                    <th scope="col">Child's current Living Arrangements</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="child in childData" :key="child.id">

                                    <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                                    <td>{{child.dob | beautify-date}}</td>
                                    <td >{{child.currentGuardiansToChild.map(party=>party.name).join(', ')}}</td>
                                    <td v-if="child.parentsNotGuardiansExist == 'y'">{{child.parentsNotGuardians.map(party=>party.name).join(', ')}}</td>
                                    <td v-else></td>
                                    <td >{{child.relationWithchild}}</td>
                                    <td v-if="child.lengthOfRelationship.selected == 'sinceBirth'">Since Birth</td>
                                    <td v-else>Since {{child.lengthOfRelationship.relationStartDate}}</td>
                                    <td >{{child.currentLiving}}</td>
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
                    <children-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
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

import { namespace } from "vuex-class";   
import "@/store/modules/application";

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
      ChildrenSurvey,
      PageBase
    }
})
export default class ChildrenDetailsGa extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

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

        const currentIndexValue = this.childData?.length > 0 ? this.childData[this.childData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.childData = [...this.childData, newChild];

        this.showTable = true; 
        this.resetChildrenRelatedPages(this.childData);
    }

    public deleteRow(rowToBeDeleted) {
       
        this.childData = this.childData.filter(data => {
            return data.id !== rowToBeDeleted;
        }); 
        this.resetChildrenRelatedPages(this.childData);
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.childData = this.childData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
        this.surveyHasError();
        this.resetChildrenRelatedPages(this.childData);
    }

    public onPrev() {
       Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    created() {

        if (this.step.result?.childrenDetailsGaSurvey) {
            this.childData = this.step.result.childrenDetailsGaSurvey.data;
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
            if (!child.dob || !child.currentGuardiansToChild || !child.parentsNotGuardiansExist || (child.parentsNotGuardiansExist == 'y' && (!child.parentsNotGuardians || child.parentsNotGuardians?.length == 0)) || !child.relationWithchild){            
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
        this.UpdateStepResultData({step:this.step, data: {childrenDetailsGaSurvey: this.getChildrenResults()}})       
    }

    public getChildrenResults(){
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        for(const child of this.childData)
        {
            questionResults.push({name:'childInfoSurvey', value: this.getChildInfo(child), title:'Child '+child.id +' Information', inputType:''})
        }
        
        return {data: this.childData, questions:questionResults, pageName:'Children Details', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildInfo(child){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(child.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(child.dob))
        const currentGuardians = child.currentGuardiansToChild.map(party=>party.name)
        resultString.push(Vue.filter('styleTitle')("Current guardians to the child: ")+currentGuardians)//TODO
        
        if (child.parentsNotGuardiansExist == 'y'){
            const currentParentsNotGuardians = child.parentsNotGuardians.map(party=>party.name)
            resultString.push(Vue.filter('styleTitle')("Parents who are not current guardians: ")+currentParentsNotGuardians)
        } else {
            resultString.push(Vue.filter('styleTitle')("Parents who are not current guardians: "))
        }

        resultString.push(Vue.filter('styleTitle')("Relationship with the child: ")+child.relationWithchild)
        
        return resultString
    }

    public resetChildrenRelatedPages(childData?) {
    
        const p = this.stPgNo.GA;

        const pages = [            
            p.CaringForChildGa,
            p.ReviewYourAnswersGA
        ]
        Vue.filter('setProgressForPages')(p._StepNo, pages,50);    

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