<template>
    <div>

        <b-card v-for="(form,inx) in formsList" :key="inx" style="margin:1rem 0;border-radius:10px; border:2px solid #DDEEFF;">
            <div style="float:left; margin: 0.5rem 1rem;color:#5050AA; font-size:16px; font-weight:bold;" > 
                {{form.title}}
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

import moment from 'moment-timezone';

@Component({
    components:{
       
    }
})
export default class FormList extends Vue {
    
    @Prop({required: true})
    type!: string;

    @Prop({required: true})
    currentPage!: number;

    @applicationState.State
    public generatedForms!: string[];

    @applicationState.State
    public pathwayCompleted!: any

    @applicationState.Action
    public UpdateGeneratedForms!: (newGeneratedForms) => void

    selected=""
    currentStep = 0;

    showPDFformName = '';
    showPDFpreview = false;

    formsListTemplate =[                
        { name:'PK', appName:'protectionOrder', pdfType:'POR', chkSteps:[1],   color:"danger", title:"Application About a Protection Order (FORM K)"},
        { name:'P3', appName:'familyLawMatter', pdfType:'FLC', chkSteps:[2,3], color:"danger", title:"Application About a Family Law Matter (FORM 3)"},        
    ]

    formsList=[];

    mounted(){
        this.currentStep = this.$store.state.Application.currentStep;
        this.initFormsTitle();
        Vue.nextTick(()=> this.setProgress());
        //this.$emit('formsList',this.formsList)
    } 
    
    public initFormsTitle(){
        console.log(this.pathwayCompleted)
        for(const form of this.formsListTemplate)
        {
            if(this.pathwayCompleted[form.appName]){

                if(this.generatedForms.includes(form.name))
                    form.color = "success"

                this.formsList.push(form);
            }                           
        }
    }
    
    public onDownload(formName, inx) {
        console.log("downloading"+inx)
        console.log(this.formsList[inx])
        console.log(formName)

        
        // this.showPDFformName = formName;
        // this.showPDFpreview = true;

        // if(!this.generatedForms.includes(formName))
        // {
        //     const forms= this.generatedForms;
        //     forms.push(formName)
        //     this.UpdateGeneratedForms(forms);
        // }

        // this.setProgress()

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
        // console.warn('Set Progress')
        // console.log(this.currentStep)
        // console.log(this.currentPage)
        if(this.currentPage <0) return
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.isFormReviewed()?100:50, false);
    }

    public isFormReviewed(){
        for(const form of this.formsList)
            if(!this.generatedForms.includes(form.name)){
                console.log(form)
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
        },err => {
            console.error(err);
        });
    }

}
</script>