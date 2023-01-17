<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
         <b-card class="border-white bg-white">
            <h1>Reply New Parenting Arrangements</h1>
            <p>
                Parenting arrangements are how each guardian will parent their child, including each 
                guardian’s parental responsibilities for decision making about a child and the 
                parenting time each guardian spends with a child. Parental responsibilities may 
                be shared or exercised separately. The only thing you can consider in making 
                your parenting arrangements is what is in the 
                <a 
                    href="https://www2.gov.bc.ca/gov/content?id=40EED319854B4AC5A6896DD1BBAB1034" 
                    target="_blank">best interests of the child
                </a>.
            </p>
            <p>Only a guardian can have parental responsibilities and parenting time.</p>
            <p>
                The other party has made an application for an order about parenting arrangements. 
                An order can include details about:
                <ul>
                    <li>who has parental responsibilities and how those responsibilities are shared or divided</li>
                    <li>
                        how parenting time is scheduled, including when and how parenting time takes place, 
                        how a child may be exchanged between parents and holiday time
                    </li> 
                    <li>
                        what happens during parenting time or conditions on parenting time such as 
                        participation in extra-curricular, religious or cultural events during parenting 
                        time, visits by extended family or friends during parenting time, or where the 
                        parenting time will take place
                    </li>                   
                </ul>                
            </p>
            <p>
                The details of the order the other party is asking for can be found in Schedule 1 
                of their Application About a Family Law Matter. You will need to refer to their 
                application for these next questions.
            </p>           

            <p>
                If you don’t understand what the other party is asking for or if you should agree 
                to what they are asking, you may want to talk to someone before you complete your reply.
            </p>

            <p>
                Click on Get Help on the top banner of this service for information about 
                different services that are available to help you.
            </p>

        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import PageBase from "../../PageBase.vue";

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})

export default class replyNewParentingArrangements extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
   
    currentStep =0;
    currentPage =0;
  
    mounted(){       
        this.reloadPageInformation();
    }    
    
    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);

    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {       
        Vue.prototype.$UpdateGotoNextStepPage()        
    }  
    
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
    }
}
</script>


