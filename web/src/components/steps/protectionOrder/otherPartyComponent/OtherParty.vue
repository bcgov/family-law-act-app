<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-bind:disableNextText="getDisableNextText()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Other Party Information</h1>
                    <p>Please add the details of the other party in the fields below. </p>

                    <div class="outerSection" v-if="showTable">
                        <div class="innerSection">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Other Party Name</th>
                                    <th scope="col">Birthdate</th>
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
                                    <td>{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                                    <td>{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
                                    <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(op.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(op)"><i class="fa fa-edit"></i></a></td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                    <td colspan = "7">
                                        <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                        >+Add Other Party</a>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable" id="other-party-survey">
                    <OtherParty-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import OtherPartySurvey from "./OtherPartySurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

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

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    @Watch('otherPartyData')
    otherPartyDataChange(newVal) 
    {
        this.UpdateStepResultData({step:this.step, data: {otherPartySurvey: {otherPartyCommonData: this.getOtherPartyResults()}}})  
    }

    currentStep =0;
    currentPage =0;
    showTable = true;
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.otherPartySurvey?.data?.otherPartyCommonData) {
            this.otherPartyData = this.step.result.otherPartySurvey.data.otherPartyCommonData;
        }
    }

    mounted(){        
        const progress = this.otherPartyData?.length>0? 100 : 50;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('other-party-survey')
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

    public populateSurveyData(opValue) {
        const currentIndexValue = this.otherPartyData?.length > 0 ? this.otherPartyData[this.otherPartyData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newParty = { ...opValue, id };

        this.otherPartyData = this.otherPartyData? [...this.otherPartyData, newParty]:[newParty];

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

    public isDisableNext() {    
        if(this.otherPartyData?.length > 0) return false;
        else return true;
    }

    public getDisableNextText() {
        return "You will need to add at least one other party to continue";
    }

    beforeDestroy() {

        if(this.otherPartyData?.length>0){
            this.$store.commit("Application/setRespondentName", this.otherPartyData[0].name);
            const respondentName = this.otherPartyData.map(otherParty=>otherParty.name)
            this.UpdateCommonStepResults({data:{'respondentsPO':respondentName}})
        } 
        this.mergeRespondants();

        const progress = this.otherPartyData?.length>0? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

        this.UpdateStepResultData({step:this.step, data:{otherPartySurvey: {otherPartyCommonData: this.getOtherPartyResults()}}})       
    }

    public mergeRespondants(){

        const respondentName =[]
        if(this.$store.state.Application.steps[0].result?.respondentsPO){
            const respondentPO = this.$store.state.Application.steps[0].result.respondentsPO        
            respondentName.push(...respondentPO)
        }
        if(this.$store.state.Application.steps[0].result?.respondentsCommon){
            const respondentCommon = this.$store.state.Application.steps[0].result.respondentsCommon
            respondentName.push(...respondentCommon)
        }

        const fullNamesArray =[];
        for(const name of respondentName ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentName.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })

        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
    }

    public getOtherPartyResults(){
        const questionResults: {name:string; value: string[]; title:string; inputType:string}[] =[];
        if(this.otherPartyData)
            for(const otherParty of this.otherPartyData)
            {
                questionResults.push({name:'otherPartySurvey', value: this.getOtherPartyInfo(otherParty), title:'Other Party '+otherParty.id +' Information', inputType:''})
            }

        return {data: {otherPartyCommonData: this.otherPartyData}, questions:questionResults, pageName:'Other Party Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getOtherPartyInfo(otherParty){
        
        const resultString: string[] = [];
        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(otherParty.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(otherParty.dob))
        resultString.push(Vue.filter('styleTitle')("Address: ")+Vue.filter('getFullAddress')(otherParty.address))
        resultString.push(Vue.filter('styleTitle')("Contact: ")+Vue.filter('getFullContactInfo')(otherParty.contactInfo)) 

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
