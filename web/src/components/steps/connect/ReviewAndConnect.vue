<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        
        <h2 class="mt-4">Review and Connect</h2>
        <b-card style="border-radius:10px;" bg-variant="white" class="mt-4 mb-3"> 
            
            <h3 class="mt-1">To prepare the application for filing:</h3>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary mb-2" style="display:block; font-size:1.4rem;">Review your application:</span> 
                          
            
                <form-list type="Print" currentPage="-1" ppmOnly="true"/>

                <b-card style="margin:1rem 0;border-radius:10px; border:2px solid #DDEEFF;">
                    <div style="float:left; margin: 0.5rem 1rem;color:#5050AA; font-size:16px; font-weight:bold;"> 
                        Schedule 1 - Application For Order respecting Parenting Arrangements or Guardianship  
                    </div>
                    <b-button 
                        style="float:right; margin: 0.25rem 1rem; padding: 0.375rem 0.45rem;"                  
                        v-on:click.prevent="downloadSchedule1()"
                        :variant="isSch1Downloaded? 'success':'danger'">
                            <span class="fa fa-print btn-icon-left"/>
                            Download to Print
                    </b-button>
                </b-card>

                <div name="pdf-guide" class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: 
                    <ul>
                        <li>If you need to edit any of your answers, go back to the “Review Your Answers” page in the previous step, edit the answer and return to this page.</li>
                        <li>Schedule 1 is to be completed by a director under the Child, Family and Community Service Act. This blank copy of the Schedule can be provided to them for completion.</li>
                    </ul>
                </div>
            </b-card>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Connect with the Director to complete Schedule 1:</span>                

                <div class="mt-3">    
                    Schedule 1 of the application must be completed by a <tooltip title="director" size="md" :index="0"/>
                    under the Child, Family and Community Service Act before the application is filed with the court.
                    <ul class="mt-2">
                        <li>
                            Contact the <tooltip title="child welfare worker" size="md" :index="0"/> who is working with the child<br><br>
                            If you don’t know how to reach the child welfare worker, contact the Provincial Centralized 
                            Screening team at any time for assistance at 1-800-663-9122 or 604-660-4927 (Lower Mainland 
                            and outside BC). 
                        </li>
                        <li class="mt-3">
                            Provide the child welfare worker with a copy of your application so they can understand 
                            what you are applying for
                        </li>
                        <li class="mt-3">
                            Get Schedule 1 completed and returned to you for filing
                        </li>                        
                    </ul>
                </div>
            </b-card>

            <b-card  style="border:1px solid #ddebed;border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Submit your application for filing:</span>
                <p class="mt-3">
                    Once you have received the completed Schedule 1 from the Director, you can file your 
                    Application About a Priority Parenting Matter.
                </p>
                <p>
                    Click Next to choose your filing options and prepare your documents for filing.
                </p>

            </b-card>

        </b-card>

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="primary" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>
        
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";
import GetHelpForPdf from "@/components/steps/submit/helpPages/GetHelpForPDF.vue";
import FormList from "@/components/steps/submit/components/FormList.vue";
import Tooltip from "@/components/survey/Tooltip.vue";


@Component({
    components:{
        PageBase,
        GetHelpForPdf,
        FormList,
        Tooltip
    }
})
export default class ReviewAndConnect extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    currentStep =0;
    currentPage =0;   
    showGetHelpForPDF = false;
    isSch1Downloaded = false;

    mounted(){
        this.isSch1Downloaded = false;
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        let progress = this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress
        
        if(progress==0) progress=50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);       

    } 

    public downloadSchedule1(){
        const pdf_name='pfa722-schedule1'
        const url = '/print-fillable-pdf?name='+pdf_name
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
            link.download = pdf_name+".pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000); 
            this.isSch1Downloaded = true;

        },err => {
            console.error(err);
        });
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()     
    }

    beforeDestroy() {
        const progress = 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }

}
</script>

<style scoped lang="scss">
@import "src/styles/common";

.closeButton {
	background-color: transparent !important;
	color: white;
	border: white;
	font-weight: 700;
	font-size: 2rem;
	padding-top: 0;
	margin-top: 0;
}

</style>


