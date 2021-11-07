<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card class="border-white bg-white">
            <h1>Written Response to Application</h1>
            <p style="font-weight: 700;">
                Complete the 
                <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa715.pdf?forcedownload=true"
                target="_blank">Written Response to Application Form 19</a> 
                if you want to file a written response in reply to any of the following applications 
                that have been <tooltip title="served" :index="0"/> to you:
                <ul>
                    <li>Application for Case Management Order</li>
                    <li>Application About a Protection Order</li>
                    <li>Application About Priority Parenting Matter</li>
                    <li>Application for Order Prohibiting Relocation of a Child</li>
                    <li>Application About Enforcement</li>
                </ul>                
            </p>
            <p>
                To reply to an application listed above <b>you must attend court</b> on the date and 
                time referred to in the application for the court appearance and <b>you may also file</b>
                 a written response using this form. A written response is used in addition to, not in 
                 place of, attending court.
            </p>
            <p>
                The written response must be filed and served on each other party before the date 
                referred to in the application for the court appearance.
            </p>

            <div class="my-4">
                <div 
                    class="mb-2 text-primary" 
                    @click="showDifferentAttendanceMethod = !showDifferentAttendanceMethod" 
                    style="border-bottom:1px solid; width:45rem;">
                    <span 
                        style='font-size:1.2rem;' 
                        class="fa fa-question-circle" /> How do I apply to attend my court appearance using a different method of attendance? 
                    <span v-if="showDifferentAttendanceMethod" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showDifferentAttendanceMethod" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div v-if="showDifferentAttendanceMethod">
                    You can apply to attend your court appearance using a different method of attendance by filing an 
                    <a 
                        href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa718.pdf?forcedownload=true"
                        target="_blank">Application for Case Management Order without Notice or Attendance Form 11
                    </a>. You can complete this form by selecting “Apply for an Order” at the beginning of this service.
                </div>
            </div>

            <p>
                This service does not currently support the completion of the Written Response 
                to Application Form 19. Please click on the link above to access a fillable PDF 
                document which can then be printed and filed at the court registry.
            </p>

        </b-card>     

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class"; 
import * as _ from 'underscore';  
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import PageBase from "../PageBase.vue";
import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class WrittenResponseApplication extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;     
    
    currentStep = 0;
    currentPage = 0;
    showDifferentAttendanceMethod = false;

    mounted(){        
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        const progress = 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        this.UpdatePathwayCompleted({pathway:"writtenResponse", isCompleted:true})
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }
  
    beforeDestroy() {
        const progress = 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }
}
</script>