<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Other Party Information</h1>
                    <div>
                        <p>
                            Add each other party from your existing case – be sure to copy the names from any filed court document.
                        </p>
                        <p>
                            It is important that each other party know that you are asking to proceed with your case. Depending 
                            on the last step taken, there are different ways you must give a copy to each other party.
                        </p>
                        <p>
                            If the last step taken was the filing of the Application About a Family Law Matter or any 
                            other step following the filing the Application, you must serve each other party with a 
                            copy of the Notice of Intention to Proceed. If you are wanting to re-start an Application 
                            About a Family Law Matter that you never served on the other party, you must also serve 
                            it to be able to proceed.
                        </p>                        
                    </div>
                    
                    <div>
                        <div class="m-4 text-primary" @click="showServeNoticeInfo= !showServeNoticeInfo" style="border-bottom:1px solid; width:18rem;">
                            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> How do I serve the other party? 
                            <span v-if="showServeNoticeInfo" class='ml-2 fa fa-chevron-up'/>
                            <span v-if="!showServeNoticeInfo" class='ml-2 fa fa-chevron-down'/>
                        </div>
                        <div v-if="showServeNoticeInfo" class="mx-4 mb-5 mt-3">
                            
                            <p>
                                If your case is filed in an 
                                <a target='blank' href="https://www2.gov.bc.ca/gov/content?id=02081A7A8FAA4E0AB95ADD64ACC838F7">
                                    early resolution registry</a> 
                                and the last step taken was the filing of the Notice to Resolve a Family Law Matter, 
                                participation in a needs assessment, completion of a parenting education program or 
                                participation in consensual dispute resolution, you can give each other party a copy 
                                of the Notice of Intention to Proceed, and Notice to Resolve a Family Law Matter if 
                                not already provided, using any way you believe will get it to them, including:
                                <ul>
                                    <li>giving them a copy in person</li>
                                    <li>sending a copy by email, text message, instant message, or mail</li>
                                    <li>getting a friend or someone else to give them a copy</li>
                                </ul>
                            </p>                            
                        </div>
                    </div>

                    <p>Please add the details of the other party in the fields below. </p>
                    <p>If you are done entering all the parties, click the ‘Next’ button.</p>
                   
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
                                    <td>{{op.dob | beautify-date}}</td>
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

                <div class="col-md-12" v-if="!showTable" id="other-party-common-survey" >
                    <other-party-npr-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>

        <b-card v-if="confirmedError && showTable"  class="alert-danger p-3 my-4 " no-body>You need to click the 'Next' button</b-card>

        <b-modal size="xl" v-model="popInfo" header-class="bg-white" no-close-on-backdrop hide-header>

            <div class="m-3"> 
                <p>
                    I understand I must give notice of my intention to proceed to each other party. 
                    To give notice, they must be served or provided with a copy of the filed Notice 
                    of Intention to Proceed. 
                </p>
                
                <b-form-checkbox 
                    class="mt-4"
                    v-model="popInfoUnderstand"               
                    value="understand"
                    unchecked-value="">
                    <h4 style="margin: 0.26rem 0.5rem;">
                        I understand
                    </h4>
                </b-form-checkbox>            
            </div>   

            <template v-slot:modal-footer>
                <b-button :disabled="popInfoUnderstand != 'understand'" variant="success" @click="closePopInfo">Continue</b-button>
            </template>
            
            <!-- <other-party-popup-npr />            

            <template v-slot:modal-footer>
                <b-button variant="primary" @click="popInfo=false">Go back so I can fix something</b-button>
                <b-button variant="success" @click="closePopInfo">I understand</b-button>                
            </template>             -->
        </b-modal>         

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import OtherPartyNprSurvey from "./OtherPartyNprSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import OtherPartyPopupNpr from "./OtherPartyPopupNpr.vue"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
      OtherPartyNprSurvey,
      PageBase,
      Tooltip,
      OtherPartyPopupNpr
    }
})
export default class OtherPartyNpr extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public types!: string[]

    @applicationState.State
    public steps!: stepInfoType[];   
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void


    @Watch('otherPartyData')
    otherPartyDataChange(newVal) 
    {   if(this.dataReady){            
            this.confirmed = false;          
            this.determineConfirmError();
            this.UpdateStepResultData({step:this.step, data: {otherPartyNprSurvey: this.getOtherPartyResults()}})
        }
    }


    currentStep=0;
    currentPage=0;
    showServeNoticeInfo = false;
    showPartyInfo = false;
    showTable = true;
    popInfo = false;
    popInfoUnderstand = '';    
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;

    dataReady = false;

    confirmed = false;
    confirmedError = false;
    tableIsEmpty = false;
 
    created() {
        if (this.step.result?.otherPartyNprSurvey) {
            this.otherPartyData = this.step.result.otherPartyNprSurvey.data;
        }
    }

    mounted(){
        
        this.dataReady = false;
        this.confirmed = false;

        this.tableIsEmpty = this.otherPartyData.length == 0 ;
                
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;  

        if(this.step.result?.otherPartyNprConfirmationSurvey?.data?.confirmation == 'Confirmed'){
            this.confirmed = true
        }
                 
        this.determineConfirmError();

        Vue.nextTick(()=>this.dataReady = true);
    }

    public determineConfirmError(){

        this.confirmedError = !this.tableIsEmpty && !this.confirmed && this.otherPartyData?.length>0;
        
        const progress = (!this.confirmed)||(this.otherPartyData && this.otherPartyData.length==0)? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        
        this.UpdateStepResultData({step:this.step, data:{otherPartyNprConfirmationSurvey: this.getConfirmationResults(this.confirmed?'Confirmed':'')}})
        
    }
    
    public openForm(anyRowToBeEdited?) {

        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('other-party-common-survey')
            
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

        this.otherPartyData = this.otherPartyData?[...this.otherPartyData, newParty]:[newParty];

        this.showTable = true; 
    }

    public deleteRow(rowToBeDeleted) {
        this.otherPartyData = this.otherPartyData.filter(data => {
        return data.id !== rowToBeDeleted;
        });
        this.tableIsEmpty = this.otherPartyData.length == 0 ;
    }

    public editRow(editedRow) {
        this.otherPartyData = this.otherPartyData.map(data => {
            return data.id == this.editId ? editedRow : data;
        });
        this.showTable = true;
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {             
        this.popInfo = true;              
    }

    public closePopInfo() {
        this.popInfo = false; 
        this.confirmed = true;
        Vue.prototype.$UpdateGotoNextStepPage();        
    }

    public isDisableNext() {
        return this.otherPartyData? (this.otherPartyData.length <= 0): true;
    }

    beforeDestroy() {
        
        if(this.otherPartyData && this.otherPartyData.length>0){
            this.$store.commit("Application/setRespondentName", this.otherPartyData[0].name);
            const respondentName = this.otherPartyData.map(otherParty=>otherParty.name)
            this.UpdateCommonStepResults({data:{'respondentsCommon':respondentName}})
        }  
        this.mergeRespondants()    

        this.determineConfirmError();
       
        this.UpdateStepResultData({step:this.step, data:{otherPartyNprSurvey: this.getOtherPartyResults()}})       
    }

    public getConfirmationResults( confirmation){
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        questionResults.push({name:'otherPartyNprSurveyConfirmation', value:confirmation, title:'I understand each other party must be given notice of my application', inputType:''})
        return {data: {confirmation:confirmation}, questions:questionResults, pageName:'Other Party Confirmation', currentStep: this.currentStep, currentPage:this.currentPage}
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
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        if(this.otherPartyData)
            for(const otherParty of this.otherPartyData)
            {
                questionResults.push({name:'otherPartyNprSurvey', value: this.getOtherPartyInfo(otherParty), title:'Other Party '+otherParty.id +' Information', inputType:''})
            }
        
        return {data: this.otherPartyData, questions:questionResults, pageName:'Other Party Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getOtherPartyInfo(otherParty){
        const resultString = [];
        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(otherParty.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(otherParty.dob))
        resultString.push(Vue.filter('styleTitle')("Lawyer: ")+(otherParty.lawyer?otherParty.lawyer:''));
        resultString.push(Vue.filter('styleTitle')("Address: ")+(otherParty.address?Vue.filter('getFullAddress')(otherParty.address):''))
        resultString.push(Vue.filter('styleTitle')("Contact: ")+Vue.filter('getFullContactInfo')(otherParty.contactInfo))
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
