<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="row">
            <div class="col-md-12 order-heading">
                <div>
                    <h1>What other family court form(s) do you want to complete?</h1>          
                    <p>
                        If you already have a family law case before the Provincial 
                        Court, there may be more forms you need to file.
                    </p>
                    <p>You can select one or more options below.</p>
                    <p>
                        When you’re finished, you can save or print your forms and 
                        file them electronically using this service or in person.
                    </p>
                </div>

                <div class="mt-3">
                    <h3 class="primary">Please select the form(s) that you wish to complete.</h3>

                    <p>
                        To select a form or multiple forms click on either the Form Name or 
                        Form Number and the column will be hi-lighted. To de-select a form, 
                        simply click on the Form Name or Form Number again.  
                    </p>
                    <p>
                        After selecting the form(s) to complete, click the next button.
                    </p>

                    <div>
                        <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                            <span style="font-size:1.2rem;" class="fa fa-question-circle" /> Where can I get legal assistance? 
                            <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                            <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                        </div>
                        <legal-assistance-faq v-if="showLegalAssistance"/>
                    </div>

                    <b-table            
                        :items="formList"
                        :fields="fields"
                        bordered   
                        responsive="sm"
                        small
                        selectable
                        select-mode="multi"  
                        @row-selected="onFormSelected"    
                        ref="formsTable">                        
                    </b-table>
                   
                </div>  

                <div>
                    <h2>Filing Options</h2>
                    <b-card class="bg-info border-primary">
                        You can file your application in different ways.
                        <ol class='mt-3' >
                            <li class='mb-2'>You can print your application and bring it (or mail it) to the court registry to file.</li>                            
                            <li>You can submit your application to the court registry through E-Filing online system.</li>
                        </ol>
                        To file your documents <b>in person</b>, you will need:
                        <ul>
                            <li>a printer (or print service)</li>                            
                            <li>a copy of your exhibits (if applicable)</li>
                            <li>Photo ID (to have your affidavit sworn/affirmed)</li>
                        </ul>
                        To file your documents <b>by electronic filing</b>, you will need:
                        <ul>                            
                            <li>scanned or electronic copy of your exhibits (if applicable)</li>
                            <li>scanner or phone with a camera (to scan the documents above)</li>
                        </ul>                
                    </b-card>
                </div>

                <div class="mt-3 mb-4">
                    <h3 class="primary">I want to file my application</h3>
                    <b-form-radio-group
                    stacked
                        v-model="filingMethod"
                        class="mt-2 ml-3"
                        style="font-size:1.40em; display: inline-block;"
                        v-on:change="onChangeFilingMethod($event)">
                        <b-form-radio class="mr-5" value="inPerson"><div style="transform:translate(5px,-5px);">In Person</div></b-form-radio>
                        <b-form-radio value="eFile"><div style="transform:translate(5px,-5px);">By Electronic Filing</div></b-form-radio>               
                    </b-form-radio-group>

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

import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import {stepInfoType, stepResultInfoType } from "@/types/Application";
import { otherFormInfoType } from '@/types/Application/OtherFamilyForm';
import { togglePages ,toggleSteps } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase,
        LegalAssistanceFaq
    }
})
export default class OtherForms extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public rejectedPathway!: boolean;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void      
    
    selectedForms: otherFormInfoType[] = [];
    filingMethod = null;
    showLegalAssistance = false;    
    disableNextButton = false;
    reloadPageInProgress = false;

    currentStep =0;
    currentPage =0;

    formList: otherFormInfoType[] = [
        {formName: 'Affidavit – General',                                   formNumber: 'Form 45'},
        {formName: 'Affidavit of Personal service',                         formNumber: 'Form 48'},
        {formName: 'Affidavit of Personal Service of Protection Order',     formNumber: 'Form 49'},
        {formName: 'Certificate of Service',                                formNumber: 'Form 7'},
        {formName: 'Consent adjournment',                                   formNumber: 'PFA920'},
        {formName: 'Consent Order',                                         formNumber: 'Form 18'},
        {formName: 'Consent to an Informal Trial (Kamloops only)',          formNumber: 'PFA709'},
        {formName: 'Electronic Filing Statement',                           formNumber: 'Form 51'},
        {formName: 'Fax Filing Cover Page',                                 formNumber: 'Form 52'},
        {formName: 'Financial Statement',                                   formNumber: 'Form 4'},
        {formName: 'Guardianship Affidavit',                                formNumber: 'Form 5'},
        {formName: 'Notice of Address Change',                              formNumber: 'Form 46'},
        {formName: 'Notice of Discontinuance',                              formNumber: 'Form 50'},
        {formName: 'Notice of Exemption from Parenting Education Program',  formNumber: 'Form 20'},
        {formName: 'Notice of Intention to Proceed',                        formNumber: 'Form 2'},
        {formName: 'Notice of Lawyer for Child',                            formNumber: 'Form 40'},
        {formName: 'Notice of Lawyer for Party',                            formNumber: 'Form 42'},
        {formName: 'Notice of Participation',                               formNumber: 'PFA747'},
        {formName: 'Notice of Removal of Lawyer for Child',                 formNumber: 'Form 41'},
        {formName: 'Notice of Removal of Lawyer for Party',                 formNumber: 'Form 43'},
        {formName: 'Order – General',                                       formNumber: 'Form 44'},
        {formName: 'Referral Request',                                      formNumber: 'Form 21'},
        {formName: 'Request for Scheduling',                                formNumber: 'Form 39'},
        {formName: 'Request for Service of Documents',                      formNumber: 'PFA110'},
        {formName: 'Request for Service of Family Protection Order',        formNumber: 'PFA916'},
        {formName: 'Trial Readiness Statement',                             formNumber: 'Form 22'}
    ];

    fields = [        
        {
            key:"formName",    
            label:"Form Name",    
            sortable: true,    
            thClass: 'border-bottom align-middle text-center text-primary bg-info', 
            thStyle:{width: "40%"},
            tdClass:'align-middle text-left'},
        {
            key:"formNumber",  
            label:"Form Number",  
            sortable: true,    
            thClass: 'border-bottom align-middle text-center text-primary bg-info', 
            thStyle:{width: "60%"},
            tdClass:'align-middle text-left'}
                
    ]; 

    created() {
        this.disableNextButton = true;       
    }   

    mounted(){          
        console.log("OtherForms:Mounted", this.selectedForms);  
        this.reloadPageInformation();
        
    }

    public reloadPageInformation(){ 
        this.reloadPageInProgress = true;              
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.otherFormsSurvey?.data) {
            this.selectedForms = this.step.result.otherFormsSurvey.data.selectedOtherForms;
            this.filingMethod = this.step.result.otherFormsSurvey.data.filingMethod;
            this.determineSteps();
        }
        Vue.nextTick().then(()=>{this.selectForms(this.selectedForms)});
        
        this.disableNextButton = !this.allRequiredInfoExists();

        const progress = (this.filingMethod == null || this.selectedForms.length == 0)? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        setTimeout(()=>{this.reloadPageInProgress = false},5);
    }

    public selectForms(forms: otherFormInfoType[]){        

        const tableRef: any = this.$refs.formsTable;
        tableRef.clearSelected()

        for (const form of forms){
            const index = this.formList.findIndex((otherForm) => {if(otherForm.formName == form.formName)return true});
            tableRef.selectRow(index);            
        }

    }

    public onChangeFilingMethod(method){
        this.resetSteps();
        this.resetPages();
        this.determineSteps();
        this.disableNextButton = !this.allRequiredInfoExists();
        this.UpdatePathwayCompleted({pathway:"other", isCompleted:false})        
        // Vue.filter('surveyChanged')('other')        

    }

    public resetPages() { 

        const p = this.stPgNo.OTHER                              
        togglePages([p.CompleteOtherForms, p.OtherFormsFilingLocation], false, this.currentStep); 

        if(this.$store.state.Application.steps[this.currentStep].pages[p.CompleteOtherForms].progress>0)               
            Vue.filter('setSurveyProgress')(null, this.currentStep, p.CompleteOtherForms, 50, false);       

        if(this.$store.state.Application.steps[this.currentStep].pages[p.OtherFormsFilingLocation].progress>0) 
            Vue.filter('setSurveyProgress')(null, this.currentStep, p.OtherFormsFilingLocation, 50, false);
    }

    public resetSteps(){ //TODO add all new steps here    
        toggleSteps([this.stPgNo.SUBMIT._StepNo, this.stPgNo.NCD._StepNo, this.stPgNo.NDT._StepNo, this.stPgNo.NPR._StepNo, this.stPgNo.RQS._StepNo, this.stPgNo.TRIS._StepNo, this.stPgNo.NLC._StepNo, this.stPgNo.NLCR._StepNo, this.stPgNo.NLP._StepNo, this.stPgNo.NLPR._StepNo, this.stPgNo.AFF._StepNo, this.stPgNo.GA._StepNo, this.stPgNo.APS._StepNo, this.stPgNo.APSP._StepNo, this.stPgNo.CSV._StepNo, this.stPgNo.FS._StepNo], false);
    }

    public determineSteps(){
        const p = this.stPgNo.OTHER;
       
        togglePages([p.CompleteOtherForms], this.allRequiredInfoExists(), this.currentStep);
       
        // LastNamesOfParties
        const IncludeLastNamesOfPartiesFor = ['Form 45', 'Form 5']
        togglePages([p.LastNamesOfParties], this.selectedForms.length > 0 && this.selectedForms.every((s) => IncludeLastNamesOfPartiesFor.includes(s.formNumber)), this.currentStep);
    }

    public onFormSelected(forms: otherFormInfoType[]){
        console.log('onFormSelected:', forms);

        if(this.rejectedPathway){
            Vue.nextTick().then(()=>{this.selectForms(this.selectedForms)});
            return
        }

        this.selectedForms = forms;

        this.disableNextButton = !this.allRequiredInfoExists();

        const applicationTypes = []; 

        for (const form of forms){
            applicationTypes.push(form.formName);            
        }

        if (applicationTypes.includes('Fax Filing Cover Page')){
            this.filingMethod = 'inPerson';
        }
      
        this.UpdateApplicationType(Array.from(new Set(applicationTypes)));
        if(this.reloadPageInProgress)
            this.determineSteps();
        else
            this.onChangeFilingMethod(null)
    }
    
    public allRequiredInfoExists(){                
        return this.filingMethod != null && this.selectedForms.length > 0
    }    
    
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 
        Vue.prototype.$UpdateGotoNextStepPage();
    }    
  
    beforeDestroy() {
        const progress = this.allRequiredInfoExists()?100:50;
        const pageData = {selectedOtherForms: this.selectedForms, filingMethod: this.filingMethod};
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);         
        this.UpdateStepResultData({step:this.step, data: {otherFormsSurvey: {data: pageData, currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";

</style>
