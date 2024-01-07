<template>
    <div>  
        <b-card no-body border-variant="white" v-for="(form,inx) in formsList" :key="inx">

            <b-card style="margin:1rem 0;border-radius:10px; border:2px solid #DDEEFF;">
                <div style="float:left; margin: 0.5rem 1rem;color:#5050AA; font-size:16px; font-weight:bold;" v-html="form.title" >
                </div>
                <b-button 
                    style="float:right; margin: 0.25rem 1rem;"                  
                    v-on:click.prevent="onDownload(form.name, inx)"
                    :variant="form.color">
                        <span class="fa fa-print btn-icon-left"/>
                        <span v-if="form.requiresSignature">
                            Review and Sign
                        </span>
                        <span v-else-if="form.requiresSwear">
                            Review and Swear
                        </span>
                        <span v-else>
                            Review and {{type}}
                        </span>                    
                </b-button>                
            </b-card>
            <b-row class="ml-2" v-if="form.requiresSignature">
                <p>You will need the consent of the other party on the form as you indicated you have 
                    <span v-if="trialPrep">already had a trial preparation conference</span>
                    <span v-if="trialPrep && trialDateScheduled"> and </span>
                    <span v-if="trialDateScheduled">a trial is scheduled within 30 days</span>.
                </p>                
                <p>Print the form, have the form signed and return to this screen to upload the signed form for submission.</p>
            </b-row>
        </b-card>  
    </div> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { pathwayCompletedInfoType } from '@/types/Application';

@Component
export default class OtherFormList extends Vue {
    
    @Prop({required: true})
    type!: string;

    @Prop({required: true})
    currentPage!: number;    

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public generatedForms!: string[];

    @applicationState.State
    public pathwayCompleted!: pathwayCompletedInfoType;    

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    selected="";
    currentStep = 0;

    showPDFformName = '';
    showPDFpreview = false;

    formsListTemplate = [];

    formsList=[];

    trialPrep = false;
    trialDateScheduled = false;

    requiresEfsp = false;
    requiresGaEfsp = false;
    requiresApsEfsp = false;
    requiresApspEfsp = false;


    mounted(){

        this.requiresEfsp = false;
        this.requiresGaEfsp = false;
        this.requiresApsEfsp = false;
        this.requiresApspEfsp = false;
        let ndtRequiresSignature = false;
        let affRequiresSignature = false;
        let gaRequiresSignature = false;
        let apsRequiresSignature = false;
        let apspRequiresSignature = false;

        const existingOrdersInfo = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result?.existingOrders;
        const index = existingOrdersInfo.findIndex(order=>{return(order.type == 'NDT')})
        if (index >=0){
            ndtRequiresSignature = existingOrdersInfo[index].doNotIncludePdf; 
            if (ndtRequiresSignature){
                const moreInfo = this.$store.state.Application.steps[this.stPgNo.NDT._StepNo].result?.moreInformationSurvey?.data;                
                this.trialPrep = moreInfo?.TrialPrep == 'y';
                this.trialDateScheduled = moreInfo?.TrialDateScheduled == 'y';
            }
        } 

        const affIndex = existingOrdersInfo.findIndex(order=>{return(order.type == 'AFF')})
        if (affIndex >=0 && this.type == 'Submit'){            
            const affFilingInfo = this.$store.state.Application.steps[this.stPgNo.AFF._StepNo].result?.filingAffSurvey?.data;              
            affRequiresSignature = affFilingInfo?.sworn == 'n';
            this.requiresEfsp = affFilingInfo?.sworn == 'y';   
            existingOrdersInfo[affIndex].doNotIncludePdf = true;  
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrdersInfo}});
            Vue.nextTick(() => Vue.prototype.$saveChanges() );

        } 

        const gaIndex = existingOrdersInfo.findIndex(order=>{return(order.type == 'GA')})
        if (gaIndex >=0 && this.type == 'Submit'){            
            const gaFilingInfo = this.$store.state.Application.steps[this.stPgNo.GA._StepNo].result?.filingGaSurvey?.data;              
            gaRequiresSignature = gaFilingInfo?.sworn == 'n';
            this.requiresGaEfsp = gaFilingInfo?.sworn == 'y';   
            existingOrdersInfo[gaIndex].doNotIncludePdf = true;  
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrdersInfo}});
            Vue.nextTick(() => Vue.prototype.$saveChanges() );

        } 

        const apsIndex = existingOrdersInfo.findIndex(order=>{return(order.type == 'APS')})
        if (apsIndex >=0 && this.type == 'Submit'){            
            const apsFilingInfo = this.$store.state.Application.steps[this.stPgNo.APS._StepNo].result?.filingApsSurvey?.data;              
            apsRequiresSignature = apsFilingInfo?.sworn == 'n';
            this.requiresApsEfsp = apsFilingInfo?.sworn == 'y';   
            existingOrdersInfo[apsIndex].doNotIncludePdf = true;  
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrdersInfo}});
            Vue.nextTick(() => Vue.prototype.$saveChanges() );

        } 

        const apspIndex = existingOrdersInfo.findIndex(order=>{return(order.type == 'APSP')})
        if (apspIndex >=0 && this.type == 'Submit'){            
            const apspFilingInfo = this.$store.state.Application.steps[this.stPgNo.APSP._StepNo].result?.filingApspSurvey?.data;              
            apspRequiresSignature = apspFilingInfo?.sworn == 'n';
            this.requiresApsEfsp = apspFilingInfo?.sworn == 'y';   
            existingOrdersInfo[apspIndex].doNotIncludePdf = true;  
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrdersInfo}});
            Vue.nextTick(() => Vue.prototype.$saveChanges() );

        } 
        
        this.formsListTemplate = [ 
            { name:'P2',   appName:'noticeIntentionProceed',       pdfType: Vue.filter('getPathwayPdfType')("noticeIntentionProceed"),      chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NPR._StepNo],                                                     color:"danger", title:"Notice of Intention to Proceed (Form 2)",                              requiresSignature: false, requiresSwear: false},                              
            { name:'P5',   appName:'guardianshipAffidavit',        pdfType: Vue.filter('getPathwayPdfType')("guardianshipAffidavit"),       chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.GA._StepNo],                                                      color:"danger",  title:"Guardianship Affidavit (Form 5)",                                     requiresSignature: gaRequiresSignature, requiresSwear: this.requiresGaEfsp},            
            { name:'P22',  appName:'trialReadinessStatement',      pdfType: Vue.filter('getPathwayPdfType')("trialReadinessStatement"),     chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.TRIS._StepNo],                                                    color:"danger", title:"Trial Readiness Statement (Form 22)",                                  requiresSignature: false, requiresSwear: false},                              
            { name:'P39',  appName:'requestScheduling',            pdfType: Vue.filter('getPathwayPdfType')("requestScheduling"),           chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.RQS._StepNo],                                                     color:"danger", title:"Request for Scheduling (Form 39)",                                     requiresSignature: false, requiresSwear: false},                              
            { name:'P40',  appName:'noticeLawyerChild',            pdfType: Vue.filter('getPathwayPdfType')("noticeLawyerChild"),           chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NLC._StepNo],                                                     color:"danger", title:"Notice of Lawyer for Child (Form 40)",                                 requiresSignature: false, requiresSwear: false},            
            { name:'P41',  appName:'noticeRemoveLawyerChild',      pdfType: Vue.filter('getPathwayPdfType')("noticeRemoveLawyerChild"),     chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NLCR._StepNo],                                                    color:"danger", title:"Notice of Removal of Lawyer for Child (Form 41)",                      requiresSignature: false, requiresSwear: false},            
            { name:'P42',  appName:'noticeLawyerParty',            pdfType: Vue.filter('getPathwayPdfType')("noticeLawyerParty"),           chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NLP._StepNo],                                                     color:"danger", title:"Notice of Lawyer for Party (Form 42)",                                 requiresSignature: false, requiresSwear: false},
            { name:'P43',  appName:'noticeRemoveLawyerParty',      pdfType: Vue.filter('getPathwayPdfType')("noticeRemoveLawyerParty"),     chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NLPR._StepNo],                                                    color:"danger", title:"Notice of Removal of Lawyer for Party (Form 43)",                      requiresSignature: false, requiresSwear: false},            
            { name:'P45',  appName:'affidavit',                    pdfType: Vue.filter('getPathwayPdfType')("affidavit"),                   chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.AFF._StepNo],                                                     color:"danger", title:"Affidavit – General (Form 45)",                                        requiresSignature: affRequiresSignature, requiresSwear: this.requiresEfsp},            
            { name:'P46',  appName:'noticeOfAddressChange',        pdfType: Vue.filter('getPathwayPdfType')("noticeOfAddressChange"),       chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NCD._StepNo],                                                     color:"danger", title:"Notice of Address Change (Form 46)",                                   requiresSignature: false, requiresSwear: false},            
            { name:'P48',  appName:'affidavitPersonalService',     pdfType: Vue.filter('getPathwayPdfType')("affidavitPersonalService"),    chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.APS._StepNo],                                                     color:"danger", title:"Affidavit of Personal Service (Form 48)",                              requiresSignature: apsRequiresSignature, requiresSwear: this.requiresApsEfsp},            
            { name:'P49',  appName:'affidavitPersonalServicePO',   pdfType: Vue.filter('getPathwayPdfType')("affidavitPersonalServicePO"),  chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.APSP._StepNo],                                                     color:"danger", title:"Affidavit of Personal Service of Protection Order (Form 49)",         requiresSignature: apspRequiresSignature, requiresSwear: this.requiresApspEfsp},            
            { name:'P50',  appName:'noticeDiscontinuance',         pdfType: Vue.filter('getPathwayPdfType')("noticeDiscontinuance"),        chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NDT._StepNo],                                                     color:"danger", title:"Notice of Discontinuance (Form 50)",                                   requiresSignature: ndtRequiresSignature, requiresSwear: false},
            { name:'P51',  appName:'electronicFilingStatement',    pdfType: Vue.filter('getPathwayPdfType')("electronicFilingStatement"),   chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.AFF._StepNo,this.stPgNo.GA._StepNo,this.stPgNo.APS._StepNo,this.stPgNo.APSP._StepNo],      color:"danger", title:"Electronic Filing Statement (Form 51)",       requiresSignature: true, requiresSwear: false}
        ];

        this.currentStep = this.$store.state.Application.currentStep;
        this.initFormsTitle();
        Vue.nextTick(()=> this.setProgress());        
    } 
    
    public initFormsTitle(){

        const completeOtherFormsPageResults = this.$store.state.Application.steps[this.stPgNo.OTHER._StepNo].result?.completeOtherFormsSurvey?.data;
        const selectedFormInfoList = completeOtherFormsPageResults?.selectedFormInfoList?completeOtherFormsPageResults.selectedFormInfoList:[];
        
        for(const form of this.formsListTemplate) {
            const pathwayInfo = selectedFormInfoList.filter(selectedForm => {if(selectedForm.pathwayName == form.appName) return form;})[0]

            if((pathwayInfo?.pathwayState && this.pathwayCompleted[form.appName]) || (form.appName == 'electronicFilingStatement' && (this.requiresEfsp || this.requiresGaEfsp || this.requiresApsEfsp || this.requiresApspEfsp) && this.pathwayCompleted[form.appName])){

                if(this.generatedForms?.includes(form.name))
                    form.color = "success"

                this.formsList.push(form);              
                
            }                           
        }

        Vue.nextTick().then(()=>{Vue.prototype.$saveChanges();});
    }
    
    public onDownload(formName, inx) {

        if(this.checkErrorOnPages(this.formsList[inx].chkSteps)){             
            this.savePdf(this.formsList[inx].pdfType, inx);            
        }
    }
     
    public checkErrorOnPages(checkingSteps){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit", "File"]
        for(const stepIndex of checkingSteps){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
    }

    public setProgress(){
        if(this.currentPage <0) return
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.isFormReviewed()? 100 : 50, false);
    }

    public isFormReviewed(){
        for(const form of this.formsList)
            if(!this.generatedForms?.includes(form.name)){
                return false
            }
        return true
    }

    public savePdf(pdfType: string, formsListIndex){        
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?pdf_type='+pdfType
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = pdfType+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            this.formsList[formsListIndex].color = "success";
            this.$emit('downloaded')

        },err => {
            console.error(err);
        });
    }
}
</script>