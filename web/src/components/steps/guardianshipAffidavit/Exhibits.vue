<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card border-variant="white">
            
            <b-row>
                <h1>Exhibits</h1>                   
            </b-row>   
            
            <b-row>                    
                <p>The following exhibits identified through this pathway must be filed with your guardianship affidavit:</p>
            </b-row>

            <b-card border-variant="white">
                <ul style="padding-inline-start: 20px; margin:0">
                    <li>Exhibit A: Ministry of Children and Family Development Record Check</li>
                    <li>Exhibit B: Protection Order Record Check from the Protection Order Registry</li>
                    <li>Exhibit C: Criminal Record Check</li>
                    
                    <!-- <li  v-for="(appType,inx) in row.item.app_type" :key="inx">{{appType}}</li> -->
                </ul>
            </b-card>

            <b-card border-variant="white" class="margin-top: 1rem;">   
                <p>
                    Collect all your exhibits so you’re ready to finalize your affidavit.
                </p>
                <p>
                    Each exhibit will be marked by the commissioner for taking affidavits 
                    using a certificate (usually a stamp) with wording like this: 
                    “This is Exhibit [A, B, C…] referred to in the affidavit of [name] sworn 
                    (or affirmed) before me on [date] at [location]” and is signed by the 
                    commissioner for taking affidavits.
                </p>
                <p>
                    If you are filing an unsworn affidavit, make sure you write which 
                    exhibit it is at the top of each one and file them along with 
                    your affidavit.

                </p>
            </b-card>
           
        </b-card>
  
    </page-base>
</template>
  
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import PageBase from "../PageBase.vue";
  import { stepInfoType, stepResultInfoType } from "@/types/Application";
  import * as _ from 'underscore';
  import { namespace } from "vuex-class";   
  import "@/store/modules/application";
  const applicationState = namespace("Application");
  
  import Tooltip from "@/components/survey/Tooltip.vue";
  import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
  
  @Component({
      components:{
          PageBase,
          Tooltip
      }
  })
  export default class Exhibits extends Vue {
      
      @Prop({required: true})
      step!: stepInfoType;
  
      @applicationState.State
      public stPgNo!: stepsAndPagesNumberInfoType;
     
  
      @applicationState.Action
      public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
  
      @applicationState.Action
      public UpdatePathwayCompleted!: (changedpathway) => void      
  
      currentStep = 0;
      currentPage = 0;
      exhibits = [];
       
      mounted(){
          this.exhibits = [];
          this.reloadPageInformation();
      }
  
    public reloadPageInformation() {   
          this.currentStep = this.$store.state.Application.currentStep;
          this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
          
          if (this.step.result?.flmQuestionnaireSurvey) {
              this.exhibits = this.step.result.flmQuestionnaireSurvey.data;              
          }
                
          Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
    }  
  
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }
  
    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    } 

    beforeDestroy() {
        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);
        
    }
}
</script>
  
  <style lang="scss">
  @import "../../../styles/survey";

  </style>
  