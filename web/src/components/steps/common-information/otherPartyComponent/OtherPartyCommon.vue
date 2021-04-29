<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-bind:disableNextText="getDisableNextText()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Other Party Information</h1>
                    <p>In a family case, there are specific people who must be served with notice of your application.
                         They are the other party or parties.  It is important that each other party know that you are
                          making this application to the court and are given a chance to talk to the court. To give notice, 
                          they will need to be served with a copy of the application. 
                    </p>
                    <ul>
                        <li>Add each parent and/or current guardian as a party if your case involves a child</li>
                        <li>Add only your <tooltip title="spouse" :index="0"/> as a party if your case does not involve children</li>
                        <li>Add any other adult as a party if your case is about them. For example a grandparent, elder, other family member or friend of the family.</li>
                    </ul>
                    <p>Please add the details of the other party in the fields below. </p>
                    <p>If you are done entering all the parties, click the ‘Next’ button.</p>
                   
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
                                    <td>{{op.dob | beautify-date}}</td>
                                    <td>{{op.opRelation}}</td>
                                    <td>{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                                    <td>{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
                                    <td><a class="btn btn-light" @click="deleteRow(op.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                    <a class="btn btn-light" @click="openForm(op)"><i class="fa fa-edit"></i></a></td>
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

                <div class="col-md-12" v-if="!showTable" id="other-party-common-survey" >
                    <other-party-common-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>

        <b-modal size="xl" v-model="flmInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3">
               
                <p>I understand the following people must be given notice of my application about a family law matter:</p>
                <ul>
                    <li>
                        all parents and current guardians of each child who is the subject of the family law matter
                    </li>
                    <li>
                        my spouse, if I am applying for spousal support
                    </li>
                    <li>
                        each other adult who the application about a family law matter is about                       
                    </li>                    
                </ul>
                <p>To give notice, they must each be served with a copy of this document and any supporting documents.</p>
                <p>They are the other party/parties I added in this case.</p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="flmInfo=false">Go back so I can fix something</b-button>
                <b-button variant="success" @click="closeFlmInfo">I agree</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import OtherPartyCommonSurvey from "./OtherPartyCommonSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      OtherPartyCommonSurvey,
      PageBase,
      Tooltip
    }
})
export default class OtherPartyCommon extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public types!: string[]

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
        this.UpdateStepResultData({step:this.step, data: {otherPartyCommonSurvey: this.otherPartyData}})

    }

    currentStep=0;
    currentPage=0;
    showTable = true;
    flmInfo = false;
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result && this.step.result["otherPartyCommonSurvey"]) {
            this.otherPartyData = this.step.result["otherPartyCommonSurvey"].data;
        }
    }

    mounted(){    
        this.flmInfo = false;    
        const progress = this.otherPartyData && this.otherPartyData.length==0? 50 : 100;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited) {

        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('other-party-common-survey')
            console.log(el)
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
        const currentIndexValue =
            this.otherPartyData && this.otherPartyData.length > 0 ? this.otherPartyData[this.otherPartyData.length - 1].id : 0;
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
        if (this.types.includes("Family Law Matter")){
            this.flmInfo = true;
        } else {
            this.UpdateGotoNextStepPage();
        }        
    }

    public closeFlmInfo(){
        this.flmInfo = false;
        this.UpdateGotoNextStepPage();
    }

    public isDisableNext() {
        // demo
        return this.otherPartyData? (this.otherPartyData.length <= 0): true;
    }

    public getDisableNextText() {
        // demo
        return "You will need to add at least one other party to continue";
    }

    beforeDestroy() {

        if(this.otherPartyData && this.otherPartyData.length>0){
            this.$store.commit("Application/setRespondentName", this.otherPartyData[0].name);
            const respondentName = this.otherPartyData.map(otherParty=>otherParty.name)
            this.UpdateCommonStepResults({data:{'respondentsCommon':respondentName}})
        }  
        this.mergeRespondants()     
        
        const progress = this.otherPartyData && this.otherPartyData.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

        this.UpdateStepResultData({step:this.step, data:{otherPartyCommonSurvey: this.getOtherPartyResults()}})       
    }

    public mergeRespondants(){
        const respondentName =[]
        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondentsPO){
            const respondentPO = this.$store.state.Application.steps[0].result.respondentsPO        
            respondentName.push(...respondentPO)
        }
        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondentsCommon){
            const respondentCommon = this.$store.state.Application.steps[0].result.respondentsCommon
            respondentName.push(...respondentCommon)
        }
        
        //console.log(respondentName)
        const fullNamesArray =[];
        for(const name of respondentName ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentName.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })
        //console.log(uniqueArray);
        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
    }


    public getOtherPartyResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.otherPartyData)
            for(const otherParty of this.otherPartyData)
            {
                questionResults.push({name:'otherPartyCommonSurvey', value: this.getOtherPartyInfo(otherParty), title:'Other Party '+otherParty.id +' Information', inputType:''})
            }
        //console.log(questionResults)
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
