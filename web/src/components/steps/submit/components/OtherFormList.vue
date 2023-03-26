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

    selected=""
    currentStep = 0;

    showPDFformName = '';
    showPDFpreview = false;

    formsListTemplate =[]

    formsList=[];

    mounted(){

        this.formsListTemplate =[                
            { name:'P46',  appName:'noticeOfAddressChange',   pdfType: Vue.filter('getPathwayPdfType')("noticeOfAddressChange"),  chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NCD._StepNo],        color:"danger", title:"Notice of Address Change (Form 46)"},            
            { name:'P50',  appName:'noticeDiscontinuance',    pdfType: Vue.filter('getPathwayPdfType')("noticeDiscontinuance"),   chkSteps:[this.stPgNo.OTHER._StepNo,this.stPgNo.NDT._StepNo],        color:"danger", title:"Notice of Discontinuance (Form 50)"}
        ]

        this.currentStep = this.$store.state.Application.currentStep;
        this.initFormsTitle();
        Vue.nextTick(()=> this.setProgress());        
    } 
    
    public initFormsTitle(){

        const completeOtherFormsPageResults = this.$store.state.Application.steps[this.stPgNo.OTHER._StepNo].result?.completeOtherFormsSurvey?.data;
        const selectedFormInfoList = completeOtherFormsPageResults?.selectedFormInfoList?completeOtherFormsPageResults.selectedFormInfoList:[];
        
        for(const form of this.formsListTemplate)        
        {
            const pathwayInfo = selectedFormInfoList.filter(selectedForm => {if(selectedForm.pathwayName == form.appName) return form;})[0]
                     
            if(pathwayInfo?.pathwayState &&  this.pathwayCompleted[form.appName]){

                if(this.generatedForms?.includes(form.name))
                    form.color = "success"

                this.formsList.push(form);              
                
            }                           
        }
        this.UpdateCommonStepResults({data:{'submittedPdfList':this.formsList.map(form => form.pdfType)}});
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