<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        
        <div v-if="dataReady" class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Children</h1>
                    <p style="font-size: 1.25rem;">It is helpful for the court when they are considering making a case management 
                        order to know if the case involves a child-related issue and, if so, some information about the children.
                    </p>
                    <div>
                        <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">Select the option that applies to your situation.</h2>                        
                    </div>

                    <div v class="radio-border">
                        <b-form-group>
                            <b-form-radio-group
                            v-model="selectedChildrenRelated"
                            name="childrenRelated"
                            stacked>                
                                <div>
                                    <b-form-radio class="radio-choices" value="Not a party to the case">
                                        <div>
                                            I am not a party to the case
                                        </div>                                      
                                    </b-form-radio>
                                </div>

                                <div>
                                    <b-form-radio class="radio-choices" value="A party to the case and the case does not involve a child-related issue">
                                        <div>
                                            I am a party to the case and the case does not involve a child-related issue
                                        </div>                                      
                                    </b-form-radio>
                                </div>

                                <div>
                                    <b-form-radio class="radio-choices" value="A party to the case and the case involves a child-related issue">
                                        <div>
                                            I am a party to the case and the case involves a child-related issue
                                        </div>                                      
                                    </b-form-radio>
                                </div>

                            </b-form-radio-group>
                        </b-form-group>
                    </div>
                   
                    <p class="my-4 ml-4" v-if="selectedChildrenRelated == 'A party to the case and the case involves a child-related issue'">
                        Add each child who is involved in your case. To add a child, click the "Add Child" button. 
                        If you are done entering all the children, click the "Next" button.
                    </p>
                    <div class="childSection" v-if="(selectedChildrenRelated == 'A party to the case and the case involves a child-related issue') && showTable">
                        
                        <div class="childAlign">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Child's name</th>
                                    <th scope="col">Child's date of birth</th>                                                                  
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="child in childData" :key="child.id">
                                    <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                                    <td>{{child.dob | beautify-date}}</td>                                                                  
                                    <td><a class="btn btn-light" @click="deleteRow(child.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" @click="openForm(child)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="(selectedChildrenRelated == 'A party to the case and the case involves a child-related issue') && !showTable" id="child-info-survey">
                    <Children-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div> 
              
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import ChildrenSurvey from "./ChildrenSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      ChildrenSurvey,
      PageBase
    }
})
export default class CmChildrenInfo extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep=0;
    currentPage=0;
    showTable = true;
    childData = [];
    anyRowToBeEdited = null;
    editId = null; 
    dataReady = false; 
    
    selectedChildrenRelated = '';
    
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
            this.childData.length > 0 ? this.childData[this.childData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newChild = { ...childValue, id };
        this.childData = [...this.childData, newChild];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.childData = this.childData.filter(data => {
            return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.childData = this.childData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
    }

    public onPrev() {
       this.UpdateGotoPrevStepPage();
    }

    public onNext() {
        this.UpdateGotoNextStepPage();
    }

    mounted(){
        this.dataReady = false;            
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.cmChildrenInfoSurvey?.data){
            this.childData = this.step.result.cmChildrenInfoSurvey.data.childData;
            this.selectedChildrenRelated = this.step.result.cmChildrenInfoSurvey.data.childRelatedType
        }

        this.dataReady = true;
    }

    public isDisableNext() {
        const disableNext = (!this.selectedChildrenRelated) || (this.selectedChildrenRelated=='A party to the case and the case involves a child-related issue' && this.childData.length <= 0);
        const progress = disableNext? 50: 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);  
        return disableNext
    }

    beforeDestroy() {       
        this.UpdateStepResultData({step:this.step, data: {cmChildrenInfoSurvey: this.getChildrenResults()}})       
    }

    public getChildrenResults(){
        
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        
        questionResults.push({name:'childRelatedType', value: this.selectedChildrenRelated, title:'Select the option that applies to your situation', inputType:''})
        
        if(this.selectedChildrenRelated=='A party to the case and the case involves a child-related issue'){
            for(const child of this.childData)
            {
                questionResults.push({name:'childInfoSurvey', value: this.getChildInfo(child), title:'Child '+child.id +' Information', inputType:''})
            }
        }

        return {data: {childData:this.childData, childRelatedType: this.selectedChildrenRelated}, questions:questionResults, pageName:'Children Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getChildInfo(child){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(child.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(child.dob))          
        
        return resultString
    }
};
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
