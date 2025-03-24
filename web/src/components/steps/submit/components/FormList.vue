<template>
    <div>

        <b-card v-for="(form,inx) in formsList" :key="inx" style="margin:1rem 0;border-radius:10px; border:2px solid #DDEEFF;">
            <div style="float:left; margin: 0.5rem 1rem;color:#5050AA; font-size:16px; font-weight:bold;" v-html="form.title" > 
                
            </div>
            <b-button 
                style="float:right; margin: 0.25rem 1rem;"                  
                v-on:click.prevent="onDownload(form.name, inx)"
                :variant="form.color">
                    <span class="fa fa-print btn-icon-left"/>
                    Review and {{type}}
            </b-button>
        </b-card>

    </div> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {whichCaseMgmtForm} from "../../caseMgmt/reviewCM/RequiredForm"
import {whichAgreementEnfrcForm} from '../../agreementEnfrc/reviewAE/RequiredFormEnfrc'

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { pathwayCompletedInfoType } from '@/types/Application';

@Component({
    components:{
       
    }
})
export default class FormList extends Vue {
    
    @Prop({required: true})
    type!: string;

    @Prop({required: true})
    currentPage!: number;

    @Prop({default: false})
    ppmOnly!: boolean;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public generatedForms!: string[];

    @applicationState.State
    public pathwayCompleted!: pathwayCompletedInfoType;    

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    selected=""
    currentStep = 0;

    showPDFformName = '';
    showPDFpreview = false;

    formsListTemplate =[]

    formsList=[];

    mounted(){

        this.formsListTemplate =[                
            { name:'PK',  appName:'protectionOrder',   pdfType: Vue.filter('getPathwayPdfType')("protectionOrder"),      chkSteps:[this.stPgNo.PO._StepNo],                                     color:"danger", title:"Application About a Protection Order (FORM 12)"},
            { name:'P3',  appName:'familyLawMatter',   pdfType: Vue.filter('getPathwayPdfType')("familyLawMatter"),      chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.FLM._StepNo],         color:"danger", title:"Application About a Family Law Matter (FORM 3)"},        
            { name:'P1',  appName:'familyLawMatter',   pdfType: Vue.filter('getPathwayPdfType')("familyLawMatterForm1"), chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.FLM._StepNo],         color:"danger", title:"Notice to Resolve a Family Law Matter (FORM 1)"},        
            { name:'P15', appName:'priorityParenting', pdfType: Vue.filter('getPathwayPdfType')("priorityParenting"),    chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.PPM._StepNo],         color:"danger", title:"Application About Priority Parenting Matter (Form 15)"},        
            { name:'P16', appName:'childReloc',        pdfType: Vue.filter('getPathwayPdfType')("childReloc"),           chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.RELOC._StepNo],       color:"danger", title:"Application for Order Prohibiting the Relocation of a Child (Form 16)"},
            { name:'P10', appName:'caseMgmt',          pdfType: Vue.filter('getPathwayPdfType')("caseMgmt"),             chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.CM._StepNo],          color:"danger", title:"Application for Case Management Order (Form 10)"},
            { name:'P11', appName:'caseMgmt',          pdfType: Vue.filter('getPathwayPdfType')("caseMgmtForm11"),       chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.CM._StepNo],          color:"danger", title:"Application for Case Management Order  Without Notice or Attendance (Form 11)"},
            { name:'P26', appName:'agreementEnfrc',    pdfType: Vue.filter('getPathwayPdfType')("agreementEnfrc26"),     chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.ENFRC._StepNo],       color:"danger", title:"Request to File an Agreement (Form 26)"}, 
            { name:'P27', appName:'agreementEnfrc',    pdfType: Vue.filter('getPathwayPdfType')("agreementEnfrc27"),     chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.ENFRC._StepNo],       color:"danger", title:"Request to File a Determination of Parenting Coordinator (Form 27)"},        
            { name:'P28', appName:'agreementEnfrc',    pdfType: Vue.filter('getPathwayPdfType')("agreementEnfrc28"),     chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.ENFRC._StepNo],       color:"danger", title:"Request to File an Order (Form 28)"},        
            { name:'P29', appName:'agreementEnfrc',    pdfType: Vue.filter('getPathwayPdfType')("agreementEnfrc"),       chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.ENFRC._StepNo],       color:"danger", title:"Application About Enforcement (Form 29)"}, 
            { name:'P19', appName:'writtenResponse',   pdfType: Vue.filter('getPathwayPdfType')("writtenResponse"),      chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.WR._StepNo],          color:"danger", title:"Written Response to Application (Form 19)"},              
            { name:'P6',  appName:'replyFlm',          pdfType: Vue.filter('getPathwayPdfType')("replyFlm"),             chkSteps:[this.stPgNo.COMMON._StepNo,this.stPgNo.RFLM._StepNo],        color:"danger", title:"Reply to an Application About a Family Law Matter (Form 6)"}            
        
        ]

        this.currentStep = this.$store.state.Application.currentStep;
        this.initFormsTitle();
        Vue.nextTick(()=> this.setProgress());        
    } 
    
    public initFormsTitle(){

        for(const form of this.formsListTemplate)        
        {            
            if(this.pathwayCompleted[form.appName]){

                if (this.ppmOnly && form.name=='P15'){                    

                    this.formsList.push(form);

                } else if (!this.ppmOnly) {

                    if(form.name=='P1' && !this.isForm1()) continue

                    if(form.name=='P3' && this.isForm1()) continue

                    if(form.name=='P10' && !whichCaseMgmtForm().includes("P10")) continue
                    if(form.name=='P11' && !whichCaseMgmtForm().includes("P11")) continue

                    if(form.name=='P26' && !whichAgreementEnfrcForm().includes("P26")) continue
                    if(form.name=='P27' && !whichAgreementEnfrcForm().includes("P27")) continue
                    if(form.name=='P28' && !whichAgreementEnfrcForm().includes("P28")) continue
                    if(form.name=='P29' && !whichAgreementEnfrcForm().includes("P29")) continue


                    if(this.generatedForms?.includes(form.name))
                        form.color = "success"

                    this.formsList.push(form);
                }
                
            }                           
        }
        this.UpdateCommonStepResults({data:{'submittedPdfList':this.formsList.map(form => form.pdfType)}});
        Vue.nextTick().then(()=>{Vue.prototype.$saveChanges();});
    }

    public isForm1(){
        const locationSurvey = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo].result
       
        if(locationSurvey?.filingLocationSurvey?.data){
            
            const location = locationSurvey.filingLocationSurvey.data.ExistingCourt;
            if( Vue.filter('includedInRegistries')(location, 'early-resolutions') && (locationSurvey?.MetEarlyResolutionRequirements == 'n' || locationSurvey?.courtLocationVictoriaSurrey))                    
                return true
            else 
                return false
        }
        return false        
    }
    
    public onDownload(formName, inx) {

        if(this.checkErrorOnPages(this.formsList[inx].chkSteps)){             
            this.savePdf(this.formsList[inx].pdfType, inx);            
        }
    }
     
    public checkErrorOnPages(checkingSteps){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
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