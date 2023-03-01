<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="row">
            <div class="col-md-12 order-heading">
                <div >
                    <h1>What administrative form(s) do you want to complete?</h1>          
                    <p>Please select the administrative form(s) that you wish to complete.</p>
                    <p>
                        Note:  This service does not currently support the completion 
                        of the forms listed.  You can complete the fillable PDFs and 
                        upload them during the Review and File step of this process.
                    </p>
                </div>

                <div>
                    <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                        <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                        <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                        <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                    </div>
                    <legal-assistance-faq v-if="showLegalAssistance"/>
                </div>

                <div>
                    <b-form-group>
                        <b-form-checkbox-group
                            v-model="selectedForm"
                            v-on:change="onChange($event)"
                            name="orders"
                            stacked
                            >
                            <div class="checkbox-border">
                                <b-form-checkbox value="summons">
                                    <div class="checkbox-choices">
                                        <a  
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa750.pdf?forcedownload=true">
                                            Summons – General</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="summonsCommintal">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa753.pdf?forcedownload=true">
                                            Summons to a Committal Hearing</a>
                                    </div>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="summonsDefault">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa752.pdf?forcedownload=true">
                                            Summons to a Default Hearing</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="requestScheduling">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa732.pdf?forcedownload=true">
                                            Request for Scheduling</a>
                                    </div>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="noticeLawyerChild">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa758.pdf?forcedownload=true">
                                            Notice of Lawyer for Child</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="noticeRemoveLawyerChild">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa761.pdf?forcedownload=true">
                                            Notice of Removal of Lawyer for Child</a>
                                    </div>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="noticeLawyerParty">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa761.pdf?forcedownload=true">
                                            Notice of Lawyer for Party</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="noticeRemoveLawyerParty">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa759.pdf?forcedownload=true">
                                            Notice of Removal of Lawyer for Party</a>
                                    </div>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="noticeOfAddressChange">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true">
                                            Notice of Address Change</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="electronicFilingStatement">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa768.pdf?forcedownload=true">
                                            Electronic Filing Statement</a>
                                    </div>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="affidavit">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa762.pdf?forcedownload=true">
                                            Affidavit</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="requisition">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa907.pdf?forcedownload=true">
                                            Requisition</a>
                                    </div>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="requestTeleconference">
                                    <div class="checkbox-choices">
                                        <a 
                                            target="_blank" 
                                            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa893.pdf?forcedownload=true">
                                            Request to be heard by teleconference or videoconference</a>
                                    </div>
                                </b-form-checkbox>
                            </div>


                        </b-form-checkbox-group>
                    </b-form-group>
                </div>                
            </div>
        </div>       

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import PageBase from "../PageBase.vue";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import {stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
        PageBase,
        Tooltip,
        LegalAssistanceFaq
    }
})
export default class AdministrativeForms extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
      
    selectedForm = [];
    showLegalAssistance = false;    
    disableNextButton = false;

    currentStep =0;
    currentPage =0;

    created() {
        this.disableNextButton = true;       
    }   

    mounted(){            
        this.reloadPageInformation();
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.adminFormsSurvey) {
            this.selectedForm = this.step.result.adminFormsSurvey.data;
            // this.determineSteps();
        }
        this.onChange(this.selectedForm)
        this.disableNextButton = this.selectedForm.length == 0;

        const progress = this.selectedForm.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public onChange(selectedForm) {
        // this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
        this.disableNextButton = selectedForm.length == 0;

        const applicationTypes = []; 

        for (const form of selectedForm){                    
            applicationTypes.push(Vue.filter('getFullOrderName')(form, ''));
        }
      
        this.UpdateApplicationType(Array.from(new Set(applicationTypes)));        
        

        // Vue.filter('surveyChanged')('familyLawMatter')               
    } 
    
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 
        Vue.prototype.$UpdateGotoNextStepPage();
    }    
  
    beforeDestroy() {
        const progress = this.selectedForm.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);         
        this.UpdateStepResultData({step:this.step, data: {adminFormsSurvey: {data: this.selectedForm, currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.checkbox-choices{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
}

input {
  padding-left: 20px;
}
</style>
