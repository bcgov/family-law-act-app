<template>
    <div>    
        <b-card v-if="dataReady" no-body bg-variant="white" border-variant="white">

            <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
               
            <p v-if="noInstructions">
                There is no instruction.
            </p>
            <p v-else>
                If your document was accepted and stamped by the registry you will need to 
                complete the following steps as outlined in your checklist:
            </p>        

            
            <affidavit-of-personal-service-of-protection
                v-if="affidavitPersonalServiceApp.exist"                
                :instructionsStep="affidavitPersonalServiceApp.step"  
            />

            <consent-adjournment
                v-if="consentAdjournmentApp.exist"                
                :instructionsStep="consentAdjournmentApp.step"  
            />

            <consent-to-informal-trial-kamloops
                v-if="consentInformalTrialKamloopsApp.exist"                
                :instructionsStep="consentInformalTrialKamloopsApp.step"  
            />

            <notice-of-exemption-from-parenting-education-program
                v-if="noticeExemptionParentingEducationApp.exist"                
                :instructionsStep="noticeExemptionParentingEducationApp.step"  
            />


            <!-- {{otherApplications}} -->
            <div v-for="serveApp,inx in serveApps" :key="'serve-copy-'+inx">
                <serve-copy-of-order-on-other-party-other
                    :sevenDays="serveApp.sevenDays"
                    :applicationName="getFullName(serveApp.type)"
                    :instructionsStep="serveApp.step"
                    :includesEfsp="efspFiled"  
                />
            </div>
            
            <serve-financial-statement-on-other-party
                v-if="financialStatementApp.exist"                
                :instructionsStep="financialStatementApp.step"  
            />

            <serve-notice-of-intention-to-proceed-on-other-party
                v-if="noticeOfIntentionApp.exist"
                :instructionsStep="noticeOfIntentionApp.step"  
            />
            <what-must-do-section
                v-if="whatMustDo.exist"
                :instructionsStep="whatMustDo.step"  
            />            

            <proof-of-service-instructions-other
                v-if="proofOfServiceApp.exist"              
                :instructionsStep="proofOfServiceApp.step"
                :mustProvide="proofOfServiceApp.must"  
                :applicationId="applicationId"/>           
            
            <schedule-trial-with-judicial-case-manager
                v-if="scheduleTrial.exist"
                :instructionsStep="scheduleTrial.step"  
            />

            <attend-court-appearance-instructions-other 
                v-if="attendCourt.exist"    
                :instructionsStep="attendCourt.step"                 
            />
        
        </b-card>
        <loading-spinner v-else waitingText="Waiting for submitted information"/>  
    </div>   
</template>

<script lang="ts">    
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");
import ProofOfServiceInstructionsOther from "./postFilingStepsOther/ProofOfServiceInstructionsOther.vue";
import ServeCopyOfOrderOnOtherPartyOther from "./postFilingStepsOther/ServeCopyOfOrderOnOtherPartyOther.vue"
import AttendCourtAppearanceInstructionsOther from "./postFilingStepsOther/AttendCourtAppearanceInstructionsOther.vue"
import ServeFinancialStatementOnOtherParty from "./postFilingStepsOther/ServeFinancialStatementOnOtherParty.vue"
import ServeNoticeOfIntentionToProceedOnOtherParty from "./postFilingStepsOther/ServeNoticeOfIntentionToProceedOnOtherParty.vue"
import WhatMustDoSection from "./postFilingStepsOther/WhatMustDoSection.vue"
import ScheduleTrialWithJudicialCaseManager from "./postFilingStepsOther/ScheduleTrialWithJudicialCaseManager.vue"
import AffidavitOfPersonalServiceOfProtection from "./postFilingStepsOther/AffidavitOfPersonalServiceOfProtection.vue"
import ConsentAdjournment from "./postFilingStepsOther/ConsentAdjournment.vue"
import ConsentToInformalTrialKamloops from "./postFilingStepsOther/ConsentToInformalTrialKamloops.vue"
import NoticeOfExemptionFromParentingEducationProgram from "./postFilingStepsOther/NoticeOfExemptionFromParentingEducationProgram.vue"

@Component({
    components:{  
        ProofOfServiceInstructionsOther,
        ServeCopyOfOrderOnOtherPartyOther,
        AttendCourtAppearanceInstructionsOther,
        ServeFinancialStatementOnOtherParty,
        ServeNoticeOfIntentionToProceedOnOtherParty,
        WhatMustDoSection,
        ScheduleTrialWithJudicialCaseManager,
        AffidavitOfPersonalServiceOfProtection,
        ConsentAdjournment,
        ConsentToInformalTrialKamloops,
        NoticeOfExemptionFromParentingEducationProgram
    }
})
export default class InstructionsOtherForms extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;


    conditionArray: boolean[] = [];
    instructionsStepArray: number[] = [];

    dataReady = false;

    otherApplications = [];

    serveApps: {sevenDays:boolean, type: string; step: number}[] = [];
    financialStatementApp = {exist:false, step: 0}
    noticeOfIntentionApp = {exist:false, step: 0}
    affidavitPersonalServiceApp = {exist:false, step: 0}
    consentAdjournmentApp = {exist:false, step: 0}
    consentInformalTrialKamloopsApp = {exist:false, step: 0}
    noticeExemptionParentingEducationApp = {exist:false, step: 0}
    proofOfServiceApp = {exist:false, step: 0, must: false}
    whatMustDo = {exist:false, step: 0}
    scheduleTrial = {exist:false, step: 0} 
    attendCourt = {exist:false, step: 0}

    serveGroup = ['NCD', 'NDT', 'NLC', 'NLP', 'NP', 'NLCR', 'NLPR', 'ORD', 'REF', 'RFS', 'RPS',
        'RQS', 'TRIS', 'AFF', 'EFSP', 'GA'
    ];
    serve7DaysGroup = ['RQS']

    certificateGroup = ['NCD', 'NDT', 'NLC', 'NLP', 'NP', 'NLCR', 'NLPR', 'ORD', 'REF', 'RFS', 'RPS',
        'FS', 'NPR', 'RQS', 'TRIS', 'AFF', 'EFSP', 'GA' 
    ];
    certificateMustGroup = ['NPR', 'RQS'];

    schJudgeGroup = ['CIFT']
    attendCourtGroup = ['RQS']
    
    // swornGroup = ['AFF', 'APS','APSP', 'GA']
    noShowGroup = ['APS', 'APSP', 'CSV', 'CONA', 'PASE', 'FF', 'COR']
    noInstructions = false
  
    error = '';
    efspFiled = false;

    mounted(){
        this.dataReady = false;
        this.getApplicationInfo(this.applicationId);        
    } 

    public getApplicationInfo(applicationId) { 

        this.efspFiled = false;

        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;
            // console.log(applicationData)  
           
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            const apps = stepGETSTART.submittedPdfList

            this.efspFiled = apps.includes('EFSP');
            
            this.noInstructions = false
            let noShowCounter = 0;
            for(const app of apps){
                if(this.noShowGroup.includes(app)) noShowCounter++; 
            }
            if(noShowCounter == apps.length) this.noInstructions =true
            
            for(const serveForm of this.serveGroup){
                if(apps.includes(serveForm))
                    this.otherApplications.push(serveForm)
            }
            if(apps.includes('FS'))
                this.otherApplications.push('FS')
            if(apps.includes('NPR'))
                this.otherApplications.push('NPR')

            let step = 1;

            if(apps.includes('APSP')){ 
                this.noInstructions = false
                this.affidavitPersonalServiceApp = {exist:true, step: step++}
            }
            if(apps.includes('CONA')){ 
                this.noInstructions = false
                this.consentAdjournmentApp = {exist:true, step: step++}
            }
            if(apps.includes('CIFT')){
                this.noInstructions = false
                this.consentInformalTrialKamloopsApp = {exist:true, step: step++}
            }
            if(apps.includes('PASE')){ 
                this.noInstructions = false
                this.noticeExemptionParentingEducationApp = {exist:true, step: step++}
            }
            
            let proofOfServiceApp = false
            let mustProvide = false
            let scheduleTrial = false
            let attendCourt = false

            for(const apptype of this.otherApplications){

                if(this.serveGroup.includes(apptype)){
                    this.serveApps.push({
                        sevenDays: this.serve7DaysGroup.includes(apptype),
                        type: apptype,
                        step: step++
                    })
                }

                if(apptype=='FS') this.financialStatementApp = {exist:true, step: step++}
                if(apptype=='NPR'){ 
                    this.noticeOfIntentionApp = {exist:true, step: step++}
                    this.whatMustDo = {exist:true, step: step++}
                }

                if(this.certificateGroup.includes(apptype))  proofOfServiceApp =true
                if(this.certificateMustGroup.includes(apptype))  mustProvide =true
                                                 
                if(this.schJudgeGroup.includes(apptype)) scheduleTrial = true
                if(this.attendCourtGroup.includes(apptype)) attendCourt = true
            }
                
            if(proofOfServiceApp) this.proofOfServiceApp = {exist:true, step: step++, must: mustProvide} 
            if(scheduleTrial) this.scheduleTrial = {exist:true, step: step++}
            if(attendCourt) this.attendCourt = {exist:true, step: step++}                      
            
            Vue.nextTick(()=> this.dataReady = true);

        }, err => {
            this.error = err;        
        });
    }
    
    public getStepResultByName(applicationData, stepName){
        if(applicationData?.steps){
            const steps = applicationData.steps.filter(step => step.name == stepName);
            if(steps.length == 1) return steps[0].result
        }
        return {}
    }
       
    public getFullName(formType){
        return Vue.filter('pdfTypeToFullName')(formType)
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">
   
</style>