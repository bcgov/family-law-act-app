<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Caring for the child</h1>
                    
                    <p style="font-size: 1.25rem;">
                        A guardian is responsible for their child’s care and upbringing. 
                        A guardian spends time with and cares for a child and is responsible 
                        for making decisions that affect them.
                    </p>

                    <div class="ml-3">
                        <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">
                            How will you care for the {{childWording}}?
                        </h2>      
                        <p>
                            Set out the detailed plans for how they are to be 
                            cared for by you. Describe your plans in your own 
                            words. You do not need to use any special wording. 
                            The key is to be clear about how they will be cared for.
                        </p>  
                        <div>
                            <b-form-group>
                                <b-textarea                  
                                    v-model="careDetails"
                                    name="careDetails"> 
                                </b-textarea>
                            </b-form-group>
                        </div>                
                    </div>

                    <div class="ml-3">
                        <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">
                            Are you the parent, stepparent or guardian of another child?
                        </h2>      
                        <p>
                            You may have another child that is not the subject of your 
                            application about guardianship. If you do, the court needs 
                            some information about them too.
                        </p>  
                        <div>
                            <b-form-group>                                
                                <b-form-radio-group  
                                    style="color: #556077; font-size: 1.5em; line-height: 1.2; display: inline-block;"
                                    class="ml-3 survey-yesno-vue"                          
                                    v-model="parentOtherChild"
                                    name="otherChild"
                                    @change="situationChanged">
                                    <b-form-radio class="mr-5" value="y">
                                        <div style="transform:translate(5px,-5px);">Yes</div>                                   
                                    </b-form-radio>                                    
                                    <b-form-radio value="n">
                                        <div style="transform:translate(5px,-5px);">No</div>                                      
                                    </b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </div>                
                    </div>

                    <div v-if="parentOtherChild == 'y'" :key="updated">
                        <p>
                            Please enter the details of the child in the fields below. Add each 
                            additional child who is not the subject of your application about guardianship 
                            of a child. To add a child, click the “Add Child” button. If you are done entering 
                            all the children, click the “Next” button.
                        </p>
                        <div class="childSection" v-if="showTable">
                            <div class="childAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Child's name</th>
                                        <th scope="col">Child's date of birth</th>
                                        <th scope="col">Your relationship to the child</th>                                    
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="child in childData" :key="child.id">
                                        <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                                        <td>{{child.dob | beautify-date}}</td>
                                        <td>{{child.relation}}</td>                                   
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
                    
                </div>

                <div class="col-md-12" v-if="!showTable" id="caring-child-info-survey">
                    <caring-children-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
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
import CaringChildrenSurvey from "./CaringChildrenSurvey.vue";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
      CaringChildrenSurvey,
      PageBase
    }
})
export default class caringForChildGa extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;  

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    dataReady = false;
    currentStep =0;
    currentPage =0;
    showTable = true;  
    childData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;   

    careDetails = "";
    parentOtherChild = 'n';

    childWording = 'child';
    updated = 0;

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());        
        this.reloadPageInformation();        
    }  

    public reloadPageInformation() {

        this.updated = 0;

        this.dataReady = false;  

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage; 
        
        if (this.step.result?.caringForChildGaSurvey?.data) {

            const caringInfo = this.step.result.caringForChildGaSurvey.data;
            this.childData = caringInfo.childInfo?caringInfo.childInfo:[];
            this.careDetails = caringInfo.caringForChildGa?.careDetails?caringInfo.caringForChildGa.careDetails:'';
            this.parentOtherChild = caringInfo.caringForChildGa?.parentOtherChild?caringInfo.caringForChildGa.parentOtherChild:'n';
            
        }

        if (this.step.result?.childrenDetailsGaSurvey) {
            const childData = this.step.result.childrenDetailsGaSurvey.data;            
            if (childData?.length>1){
                this.childWording = "children";                    
            } else {
                this.childWording = "child";
            }
        }

        this.dataReady = true;
        
    }

    public situationChanged(){
        this.updated++;        
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('caring-child-info-survey')
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
       //TODO: check completion
       Vue.prototype.$UpdateGotoNextStepPage()
       
    }

    public getChildrenResults(){
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        questionResults.push({name:'careDetails', value: this.careDetails, title:'How will you care for the cild(ren)?', inputType:''})
        questionResults.push({name:'parentOtherChild', value: this.parentOtherChild == 'y'?'Yes':'No', title:'Are you the parent, stepparent or guardian of another child?', inputType:''})
        
        if(this.parentOtherChild == 'y'){
            for(const child of this.childData)
            {
                questionResults.push({name:'childInfoSurvey', value: this.getChildInfo(child), title:'Child '+child.id +' Information', inputType:''})
            }
        }        
        
        return {
            data: {
                childInfo: this.childData, 
                caringForChildGa: 
                {
                    careDetails: this.careDetails,
                    parentOtherChild: this.parentOtherChild
                }
            },
            questions:questionResults, pageName:'Children Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildInfo(child){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(child.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(child.dob))        
        resultString.push(Vue.filter('styleTitle')("Your relationship: ")+child.relation)             
        
        return resultString
    }

    public resetChildrenRelatedPages(childData?) {
    
        const p = this.stPgNo.GA;

        const pages = [
            p.ReviewYourAnswersGA
        ]
        Vue.filter('setProgressForPages')(p._StepNo, pages,50);    

    }

    public surveyHasError(){
        let progress = (this.careDetails.length == 0 ||(this.parentOtherChild == 'y' && this.childData?.length == 0))? 50 : 100;
        this.incompleteError =  false;        
        for(const child of this.childData){
            if (!child.name || 
                !child.dob || !child.relation){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (this.careDetails.length == 0 || (this.parentOtherChild == 'y' && this.childData?.length == 0));
    }


    beforeDestroy() {
        this.surveyHasError();        
        this.UpdateStepResultData({step:this.step, data: {caringForChildGaSurvey: this.getChildrenResults()}})       
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

.radio-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.form-group .radio-choices{
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: normal;
  font-size: 17px;
}
</style>
