<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-bind:disableNextText="getDisableNextText()" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
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
                        <li>Add each party from your existing case if you already have a case with the same parties – be sure to copy the names from any filed court document</li>
                        <li>Add each parent and/or current guardian as a party if your case involves a child</li>
                        <li>Add only your <tooltip title="spouse" :index="0"/> as a party if your case does not involve children</li>
                        <li>Add any other adult as a party if your case is about them. For example a grandparent, elder, other family member or friend of the family.</li>
                    </ul>
                    
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
                    <p>Please add the details of the other party in the fields below. </p>
                    <p>If you are done entering all the parties, click the ‘Next’ button.</p>
                   
                    <div class="outerSection" v-if="showTable">
                        <div class="innerSection">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Other Party Name</th>
                                    <th v-if="!cmOnly" scope="col">Birthdate</th>
                                    <th v-if="!cmOnly" scope="col">Address Information</th>
                                    <th v-if="!cmOnly" scope="col">Contact Information</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div></div>
                                    <tr v-for="op in otherPartyData" :key="op.id">
                                    <td>{{op.name.first}} {{op.name.middle}} {{op.name.last}}</td>
                                    <td v-if="!cmOnly">{{op.dob | beautify-date}}</td>
                                    <td v-if="!cmOnly">{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                                    <td v-if="!cmOnly">{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
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

        <b-modal size="xl" v-model="popInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3" v-if="flmInfo">
               
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

            <div class="m-3" v-if="ppmInfo">
               
                <p>I understand all parents and guardians of the child(ren) this application is about must be given notice of my application about a priority parenting matter.</p>
              
                <p>To give notice, they must each be served with a copy of the application and any supporting documents at least 7 days before the date set for the court appearance unless the court allows the application to be made without notice or with less than 7 days’ notice.</p>
                <p>They are the other party/parties I added in this case.</p>

            </div>

            <div class="m-3" v-if="relocInfo">
               
                <p>I understand the relocating guardian(s) must be given notice of my application to prohibit the relocation of a child.</p>
              
                <p>To give notice, they must each be served with a copy of the application and any supporting documents at least 7 days before the date set for the court appearance unless the court allows the application be made without notice or with less than 7 days’ notice.</p>
                <p>They are the other party/parties I added in this case.</p>
            </div>

            <div class="m-3" v-if="enfrcInfo">
               
                <p>I understand each other party must be given notice of my application about enforcement.</p>

                <p>To give notice, they must each be served with a copy of the application and any supporting documents at least 7 days before the date set for the court appearance unless the court allows the application the court allows the application to be made without notice or with less than 7 days’ notice.</p>
              
                <p>They are the other party/parties I added in this case.</p>
            </div>            

            <div class="m-3" v-if="relocPpmInfo">
               
                <p>
                    You have selected that you are applying for an order about a priority parenting matter and an order to 
                    prohibit the relocation of a child.
                </p>

                <b>Please acknowledge that you understand the following:</b>

                <p>
                    I understand all parents and guardians of the child(ren) this application is about must be given notice 
                    of my application about a priority parenting matter.
                </p>

                <p>
                    I also understand the relocating guardian(s) must be given notice of my application to prohibit the 
                    relocation of a child.
                </p>

                <p>
                    To give notice, they must each be served with a copy of the application and any supporting documents 
                    at least 7 days before the date set for the court appearance unless the court allows the application 
                    to be made without notice or with less than 7 days’ notice.    
                </p>

                <p>
                    They are the other party/parties I added in this case.    
                </p>

            </div>

            <div class="m-3" v-if="relocFlmInfo">
               
                <p>
                   You have selected that you are applying for an 
                   order about a family law matter and an order to prohibit the relocation of a child. 
                </p>

                <b>Please acknowledge that you understand the following:</b>

                <p>
                    I understand the following people must be given notice of my application about a family law matter:                
                </p>
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

                <p>
                    I also understand the relocating guardian(s) must be given notice of my application to prohibit 
                    the relocation of a child.            
                </p>

                <p>
                    To give notice, they must each be served with a copy of the application and any supporting documents 
                    at least 7 days before the date set for the court appearance unless the court allows the application 
                    to be made without notice or with less than 7 days’ notice.
                </p>

                <p>They are the other party/parties I added in this case.</p>

            </div>

            <template v-slot:modal-footer>
                <b-button variant="primary" @click="popInfo=false">Go back so I can fix something</b-button>
                <b-button v-if="enfrcInfo" variant="success" @click="closePopInfo">I understand</b-button>
                <b-button v-else variant="success" @click="closePopInfo">I agree</b-button>
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
        this.UpdateStepResultData({step:this.step, data: {otherPartyCommonSurvey: {otherPartyCommonData: this.getOtherPartyResults(), acknowledgement: this.acknowledgeNotice}}})
    }

    currentStep=0;
    currentPage=0;
    showServeNoticeInfo = false;
    acknowledgeNotice = false;
    showTable = true;
    popInfo = false;
    flmInfo = false;
    ppmInfo = false;
    enfrcInfo = false;
    relocPpmInfo = false;
    relocFlmInfo = false;
    relocInfo = false;
    cmOnly = false;
    otherPartyData = [];
    anyRowToBeEdited = null;
    editId = null;
 
    created() {
        if (this.step.result?.otherPartyCommonSurvey?.data?.otherPartyCommonData) {
            this.otherPartyData = this.step.result.otherPartyCommonSurvey.data.otherPartyCommonData;
        }
    }

    mounted(){
        this.acknowledgeNotice = false;
        this.popInfo = false;    
        this.flmInfo = false;  
        this.ppmInfo = false; 
        this.enfrcInfo = false;
        this.relocPpmInfo = false;
        this.relocFlmInfo = false;
        this.relocInfo = false; 
        const progress = this.otherPartyData && this.otherPartyData.length==0? 50 : 100;            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.cmOnly = (this.types?.length == 1 && this.types.includes("Case Management"));
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
    
    public openForm(anyRowToBeEdited?) {

        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('other-party-common-survey')
            // console.log(el)
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

        this.flmInfo = false;
        this.ppmInfo = false;
        this.enfrcInfo = false;
        this.relocPpmInfo = false;
        this.relocFlmInfo = false;
        this.relocInfo = false;

        if (this.types.includes("Family Law Matter") || 
            this.types.includes("Priority Parenting Matter") || 
            this.types.includes("Relocation of a Child") || 
            this.types.includes("Enforcement of Agreements and Court Orders")){
            
            if (this.types.includes("Family Law Matter")){

                // flm and ppm
                if (!this.types.includes("Relocation of a Child")){
                    this.flmInfo = true;
                } 
                // flm and reloc
                else {
                    this.relocFlmInfo = true;
                }

            } else {

                // reloc only
                if (this.types.includes("Relocation of a Child") && !this.types.includes("Priority Parenting Matter")){
                    this.relocInfo = true;
                }
                // ppm and reloc
                else if (this.types.includes("Priority Parenting Matter") && this.types.includes("Relocation of a Child")){
                    this.relocPpmInfo = true;                    
                }
                // ppm only
                else if (this.types.includes("Priority Parenting Matter") && !this.types.includes("Relocation of a Child")){
                    this.ppmInfo = true;
                }
                // enfrc only
                else if (this.types.includes("Enforcement of Agreements and Court Orders") && !this.types.includes("Relocation of a Child") && !this.types.includes("Priority Parenting Matter")){
                    this.enfrcInfo = true;
                }

            }
            this.popInfo = true;
            
        } else {
            this.popInfo = false;
            this.UpdateGotoNextStepPage();
        }        
    }

    public closePopInfo(){
        this.acknowledgeNotice = true;
        this.popInfo = false;       
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

        this.UpdateStepResultData({step:this.step, data:{otherPartyCommonSurvey: {otherPartyCommonData:this.getOtherPartyResults(), acknowledgement: this.acknowledgeNotice}}})       
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
        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(otherParty.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(otherParty.dob))
        resultString.push(Vue.filter('styleTitle')("Lawyer: ")+(otherParty.lawyer?otherParty.lawyer:''));
        resultString.push(Vue.filter('styleTitle')("Address: ")+(otherParty.address?Vue.filter('getFullAddress')(otherParty.address):''))
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
