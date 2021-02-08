<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-bind:disableNextText="getDisableNextText()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Other Party Information</h1>
                    <p>Please add the details of the other party in the fields below. </p>
                    <!-- <p>
                    <b><u>Who do I name as the other party?</u></b>
                    <ul>
                        <li>If your application is about a child, the other party must include each of their parents and guardians</li>
                        <li>If your application is about spousal support, the other party is your spouse</li>
                        <li>If another adult is the subject of your application, such as a step-parent, grandparent or other important person in a child's life, this person is the other party</li>
                        <li>If there is already an existing case, you cannot add more parties, the other party is the person or persons that are already involved in that case</li>
                        </ul>
                    </p> -->
                    <div class="outerSection" v-if="showTable">
                        <div class="innerSection">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Other Party Name</th>
                                    <th scope="col">Birthdate</th>
                                    <th scope="col">Your relationship to the other party</th>
                                    <th scope="col">Address Information</th>
                                    <th scope="col">Contact Information</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="op in otherPartyData" :key="op.id">
                                    <td>{{op.name.first}} {{op.name.middle}} {{op.name.last}}</td>
                                    <td>{{op.dob}}</td>
                                    <td>{{op.opRelation}}</td>
                                    <td>{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                                    <td>{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
                                    <td><a class="btn btn-light" @click="deleteRow(op.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" @click="openForm(op)"><i class="fa fa-edit"></i></a></td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                    <td colspan = "7">
                                        <a
                                        >+Add Other Party</a>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable">
                    <OtherParty-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import { Question } from "survey-vue";
import OtherPartySurvey from "./OtherPartySurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../forms/survey-information.json";
import PageBase from "../../PageBase.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      OtherPartySurvey,
      PageBase
    }
})
export default class OtherParty extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @Watch('otherPartyData')
    otherPartyDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {otherPartySurvey: this.otherPartyData}})

    }

    currentStep=0;
    currentPage=0;
    showTable = true;
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result && this.step.result["otherPartySurvey"]) {
            this.otherPartyData = this.step.result["otherPartySurvey"].data;
        }
    }

    mounted(){        
        const progress = this.otherPartyData.length==0? 50 : 100;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited) {
        this.showTable = false;
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

    public populateSurveyData(opValue) {
        const currentIndexValue =
            this.otherPartyData.length > 0 ? this.otherPartyData[this.otherPartyData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newParty = { ...opValue, id };
        this.otherPartyData = [...this.otherPartyData, newParty];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.otherPartyData = this.otherPartyData.filter(data => {
        return data.id !== rowToBeDeleted;
        });
    }

    public editRow(editedRow) {
        this.otherPartyData = this.otherPartyData.map(data => {
            return data.id == this.editId ? editedRow : data;
        });
        this.showTable = true;
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage();
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }

    public isDisableNext() {
        // demo
        return this.otherPartyData.length <= 0;
    }

    public getDisableNextText() {
        // demo
        return "You will need to add at least one other party to continue";
    }

    beforeDestroy() {

        const progress = this.otherPartyData.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

        this.UpdateStepResultData({step:this.step, data:{otherPartySurvey: this.getOtherPartyResults()}})       
    }

    public getOtherPartyResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const otherParty of this.otherPartyData)
        {
            questionResults.push({name:'otherPartySurvey', value: this.getOtherPartyInfo(otherParty), title:'Other Party '+otherParty.id +' Information', inputType:''})
        }
        console.log(questionResults)
        return {data: this.otherPartyData, questions:questionResults, pageName:'Other Party Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getOtherPartyInfo(otherParty){
        const resultString = [];
        resultString.push("Name: "+Vue.filter('getFullName')(otherParty.name));
        resultString.push("Birthdate: "+Vue.filter('beautify-date')(otherParty.dob))
        resultString.push("Address: "+Vue.filter('getFullAddress')(otherParty.address))
        resultString.push("Contact: "+Vue.filter('getFullContactInfo')(otherParty.contactInfo)) 

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
