<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Other Party Information</h1>
                    <div v-if="!replyPathwayOnly">
                        <p >In a family case, there are specific people who must be served with notice of your application.
                            They are the other party or parties.  It is important that each other party know that you are
                            making this application to the court and are given a chance to talk to the court. To give notice, 
                            they will need to be served with a copy of the application. 
                        </p>
                            
                        <ul>
                            <li>Add each party from your existing case if you already have a case with the same parties – be sure to copy the names from any filed court document</li>
                            <li>Add each parent and/or current guardian as a party if your case involves a child</li>
                            <li>Add only your <tooltip title="spouse" size="md" :index="0"/> as a party if your case does not involve children</li>
                            <li>Add any other adult as a party if your case is about them. For example a grandparent, elder, other family member or friend of the family.</li>
                            
                        </ul>
                    </div>

                    <p v-else>Add each party from your existing case – be sure to copy the names from any filed court document</p>
                    
                    <div v-if="includesReplyPathway">
                        <p v-if="wrIncluded">
                            If you are filing a Written Response to Application, you will need to serve each other party with a filed copy of the reply.
                        </p>
                        <p>
                            If you are filing a Reply to a Family Law Matter Application, the registry will provide a copy of the filed reply to 
                            each other party.
                        </p>
                    </div>
                        
                    
                    <div>
                        <div class="m-4 text-primary" @click="showServeNoticeInfo= !showServeNoticeInfo" style="border-bottom:1px solid; width:19rem;">
                            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> How do I serve the other party? 
                            <span v-if="showServeNoticeInfo" class='ml-2 fa fa-chevron-up'/>
                            <span v-if="!showServeNoticeInfo" class='ml-2 fa fa-chevron-down'/>
                        </div>
                        <div v-if="showServeNoticeInfo" class="mx-4 mb-5 mt-3">
                            <p>
                                There are two types of service – personal service and ordinary service.
                            </p>
                            <p>
                                Personal service means an adult person who is at least 19, other than you, must hand-deliver the documents directly 
                                to the person being served. A party cannot personally serve a document on the other party.
                            </p>
                            <p>
                                Some documents must be personally served, like the Application About a Family Law Matter and the Application About 
                                a Protection Order.
                            </p>
                            <p>
                                Ordinary service means that a party must be served to their address for service in one of the following ways:
                                <ul>
                                    <li>by leaving the documents at the party’s address for service</li>
                                    <li>by mailing the documents by ordinary mail to the party’s address for service</li>
                                    <li>by mailing the documents by registered mail to the party’s address for service</li>
                                    <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
                                    <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>
                                </ul>
                            </p>
                            <p>
                                A party’s address for service is the address they have provided to the court. A party who does not have an address 
                                for service must be served by personal service.
                            </p>
                            <p>
                                The rules about service are found in <a target='blank' href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#division_d1e12125">Part 12 Division 4</a> of the Provincial Court Family Rules.
                            </p>
                            <p>Depending on how the documents are served, what day of the week they are served on, and even what time of day they 
                                are served, it might change how you count the notice period. Be sure to review the rules about service before 
                                serving the other party to make sure you give them proper notice.
                  
                            </p>
                        </div>
                    </div>


                    <div>
                        <div class="m-4 text-primary" @click="showPartyInfo= !showPartyInfo" style="border-bottom:1px solid; width:31rem;">
                            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> What if I want to add a party that wasn’t on the application? 
                            <span v-if="showPartyInfo" class='ml-2 fa fa-chevron-up'/>
                            <span v-if="!showPartyInfo" class='ml-2 fa fa-chevron-down'/>
                        </div>
                        <div v-if="showPartyInfo" class="mx-4 mb-5 mt-3">
                            <p>
                                The other party may not have included everyone that you believe should be involved in the case. 
                                Usually if a case involves a child, each of the child’s parents or current guardians are part 
                                of the case. If the application is about contact with a child or guardianship of a child, 
                                you may see other adults included if the application is about them and their relationship 
                                with the child. A lawyer can help you figure out who should be a party for your case if 
                                you aren’t sure. 
                            </p>
                            <p>
                                After an application has been filed, you need permission from the court to add a new party. 
                                To apply, you must complete an Application About a Case Management Order. This service can 
                                help you complete and file the form. Select “Make an Application” in the first step and 
                                “Case Management” in the orders you need.
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
                                    <th v-if="!onlyFullNameRequired" scope="col">Birthdate</th>
                                    <th v-if="!onlyFullNameRequired" scope="col">Address Information</th>
                                    <th v-if="!onlyFullNameRequired" scope="col">Contact Information</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="op in otherPartyData" :key="op.id">
                                    <td>{{op.name.first}} {{op.name.middle}} {{op.name.last}}</td>
                                    <td v-if="!onlyFullNameRequired">{{op.dob | beautify-date}}</td>
                                    <td v-if="!onlyFullNameRequired">{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                                    <td v-if="!onlyFullNameRequired">{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
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
                    <other-party-common-survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>

            </div>
        </div>

        <b-card v-if="confirmedError && showTable"  class="alert-danger p-3 my-4 " no-body>You need to click the 'Next' button</b-card>

        

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import OtherPartyCommonSurvey from "./LoansCreditsFSSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
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
            this.UpdateStepResultData({step:this.step, data: {otherPartyCommonSurvey: this.getOtherPartyResults()}})
        }
    }


    currentStep=0;
    currentPage=0;
    showServeNoticeInfo = false;
    showPartyInfo = false;
    showTable = true;
    popInfo = false;
    selectedForms = [];
    selectedReplyForms = [];
    cmOnly = false;
    wrIncluded = false;
    rflmIncluded = false;
    onlyFullNameRequired = false;
    replyPathwayOnly = false;
    includesReplyPathway = false;
    includesApplyPathway = false;
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;

    dataReady = false;

    confirmed = false;
    confirmedError = false;
    tableIsEmpty = false;
 
    created() {
        if (this.step.result?.otherPartyCommonSurvey) {
            this.otherPartyData = this.step.result.otherPartyCommonSurvey.data;
        }
    }

    mounted(){
        
        this.dataReady = false;
        this.confirmed = false;
        this.cmOnly = false;
        this.wrIncluded = false;
        this.rflmIncluded = false;

        this.tableIsEmpty = this.otherPartyData.length == 0 ;
                
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('replyToApplication');

        this.selectedForms = (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms:[];
        this.selectedReplyForms = (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms:[];

        this.cmOnly = (this.selectedForms.length == 1 && this.selectedForms.includes("caseMgmt")); 

        this.wrIncluded = this.selectedReplyForms.includes("writtenResponse");
        this.rflmIncluded = this.selectedReplyForms.includes("replyFlm");
        
        
        this.includesReplyPathway = this.selectedReplyForms.length > 0;
        this.includesApplyPathway = this.selectedForms.length > 0;
        
        this.replyPathwayOnly = this.includesReplyPathway && this.selectedForms.length == 0;
        
        if (this.includesApplyPathway){
            if (this.includesReplyPathway ){
                this.onlyFullNameRequired = this.cmOnly && (this.wrIncluded || this.rflmIncluded)
            } else {
                this.onlyFullNameRequired = this.cmOnly;
            }
        } else {
            this.onlyFullNameRequired = this.wrIncluded || this.rflmIncluded;
        }
        

        if(this.step.result?.otherPartyCommonConfirmationSurvey?.data?.confirmation == 'Confirmed'){
            this.confirmed = true
        }
                 
        this.determineConfirmError();

        Vue.nextTick(()=>this.dataReady = true);
    }

    public determineConfirmError(){

        this.confirmedError = this.needConfirmation() && !this.tableIsEmpty && !this.confirmed && this.otherPartyData?.length>0;
        
        const progress = (this.needConfirmation()&& !this.confirmed)||(this.otherPartyData && this.otherPartyData.length==0)? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

        if(this.needConfirmation())
            this.UpdateStepResultData({step:this.step, data:{otherPartyCommonConfirmationSurvey: this.getConfirmationResults(this.confirmed?'Confirmed':'')}})
        else
            this.UpdateStepResultData({step:this.step, data:{otherPartyCommonConfirmationSurvey: null}})
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
    
    public needConfirmation(){

        if (this.types.includes("Family Law Matter") || 
            this.types.includes("Priority Parenting Matter") || 
            this.types.includes("Relocation of a Child") || 
            this.types.includes("Enforcement")){          
            
            return true
        }
        else
            return false
    }

    public onNext() {
        if(this.needConfirmation()){      
            this.popInfo = true;
        } else {
            this.popInfo = false;
            Vue.prototype.$UpdateGotoNextStepPage();
        }        
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
       
        this.UpdateStepResultData({step:this.step, data:{otherPartyCommonSurvey: this.getOtherPartyResults()}})       
    }

    public getConfirmationResults( confirmation){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        questionResults.push({name:'otherPartyCommonSurveyConfirmation', value:confirmation, title:'I understand each other party must be given notice of my application', inputType:''})
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
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.otherPartyData)
            for(const otherParty of this.otherPartyData)
            {
                questionResults.push({name:'otherPartyCommonSurvey', value: this.getOtherPartyInfo(otherParty), title:'Other Party '+otherParty.id +' Information', inputType:''})
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
