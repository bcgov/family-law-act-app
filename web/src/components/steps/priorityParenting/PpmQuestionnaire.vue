<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()"  :disableNext="selectedPriorityParentingMatter.length==0">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1>Priority Parenting Matters Questionnaire</h1>
            <p>
                <tooltip title="Priority parenting matters" :index="0"/> are decisions about a child that require the agreement of each of the child's 
                guardians or an order from the court and it is a priority to get the order before or separately from any 
                family law matter order.
            </p>
            <p>
                The Family Law Act s. 39 sets out that unless an agreement or order allocates <tooltip title="parental responsibilities" :index="0"/>
                differently, each child’s guardian may exercise all parental responsibilities with respect to a child in consultation with the child’s 
                other guardians, unless consultation would be unreasonable or inappropriate in the circumstances.  A child’s guardian must exercise 
                their parental responsibilities in the best interests of the child.
            </p>  
        </div>
        <div>
            <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">I need help with the following priority parenting matter:</h2>
            <p style="font-size: 1.25rem;">Select all that apply.</p>
        </div>
        <div v class="checkbox-border">
            <b-form-group>
                <b-form-checkbox-group
                v-model="selectedPriorityParentingMatter"
                v-on:change="onChange($event)"
                name="orders"
                stacked
                >                
                    <div>
                        <b-form-checkbox class="checkbox-choices" value="medical">
                            <div>
                            Medical, dental or other health-related treatments for a child
                            </div>                                      
                        </b-form-checkbox>
                    </div>

                    <div >
                        <b-form-checkbox class="checkbox-choices" value="passport">
                            <div>
                                Application for a passport, license or other thing for a child
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="travel">
                            <div>
                                Travel or participation in an activity for the child
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="locationChange">
                            <div>
                                Change in location of a child’s residence
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="preventRemoval">
                            <div>
                                Preventing the removal of a child
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="interjurisdictional">
                            <div>
                                Determining matters relating to <tooltip title="interjurisdictional issues" :index="0"/> under <tooltip title="section 74(2)(c)" :index="0"/> of the Family Law Act                            
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="wrongfulRemoval">
                            <div>
                                Wrongful removal of a child in BC
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="returnOfChild">
                            <div>
                                Return of a child under the <tooltip title="1980 Hague Convention" :index="0"/>                    
                            </div>                        
                        </b-form-checkbox>
                    </div>
               
                </b-form-checkbox-group>
            </b-form-group>
        </div>

        <div class="mb-5">
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <legal-assistance-faq v-if="showLegalAssistance"/>
        </div>
      </div>
    </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import * as _ from 'underscore';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import Tooltip from "@/components/survey/Tooltip.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase,
        Tooltip,
        LegalAssistanceFaq
    }
})
export default class PpmQuestionnaire extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void
    
    selectedPriorityParentingMatter = [];

    showLegalAssistance = false

    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.allPages = _.range(this.stPgNo.PPM.PriorityParentingMatterOrder, Object.keys(this.stPgNo.PPM).length-1) 
        this.reloadPageInformation();
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.ppmQuestionnaireSurvey) {
            this.selectedPriorityParentingMatter = this.step.result.ppmQuestionnaireSurvey.data;
        }
        
        const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }


    public onChange(selectedPriorityParentingMatter) {

        this.UpdatePathwayCompleted({pathway:"priorityParenting", isCompleted:false});
        togglePages([this.stPgNo.PPM.PreviewFormsPPM], false, this.currentStep);
        
        if(this.checkErrorOnPages())        
            this.setSteps(selectedPriorityParentingMatter);
        else{ 
            this.selectedPriorityParentingMatter = [];             
        }
        Vue.filter('surveyChanged')('priorityParenting')        
    }

    public setSteps(selectedPriorityParentingMatter) {

        const p = this.stPgNo.PPM
        if (selectedPriorityParentingMatter) {

            togglePages(this.allPages, false, this.currentStep); 
            const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

            if (selectedPriorityParentingMatter.length > 0){

                togglePages([p.PriorityParentingMatterOrder], true, this.currentStep);                
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.PriorityParentingMatterOrder].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.PriorityParentingMatterOrder, 50, false);
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.PpmChildrenInfo].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.PpmChildrenInfo, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.PpmBackground].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.PpmBackground, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutPriorityParentingMatterOrder].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutPriorityParentingMatterOrder, 50, false);

            
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersPPM, 0, false);
                
            }   

        }
    } 

    public checkErrorOnPages(){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
        for(const stepIndex of [this.stPgNo.COMMON._StepNo]){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        togglePages(this.allPages, false, this.currentStep); 
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage();
    }

    public onNext() {
        this.UpdateGotoNextStepPage();       
    }   

    public getSelectedPriorityParentingMatterNames(){
        let result = ''       
        for(const form of this.selectedPriorityParentingMatter){
            if(form=='medical')   result+='-Medical, dental or other health-related treatments for a child'+'\n';
            if(form=='passport')  result+='-Application for a passport, license or other thing for a child'+'\n';
            if(form=='travel')    result+='-Travel or participation in an activity for the child'+'\n';
            if(form=='locationChange')         result+='-Change in location of a child’s residence'+'\n';
            if(form=='preventRemoval')          result+='-Preventing the removal of a child'+'\n';
            if(form=='interjurisdictional')    result+='-Determining matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act'+'\n';
            if(form=='wrongfulRemoval')         result+='-Wrongful removal of a child in BC'+'\n';
            if(form=='returnOfChild')          result+='-Preventing the removal of a child'+'\n';
        }
        return result;
    }
  
    beforeDestroy() {
        const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'PpmQuestionnaire',title:'I need help with the following priority parenting matter:',value:this.getSelectedPriorityParentingMatterNames()}]        
        this.UpdateStepResultData({step:this.step, data: {ppmQuestionnaireSurvey: {data: this.selectedPriorityParentingMatter, questions: questions, pageName:"Priority Parenting Matters Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.form-group .checkbox-choices{
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: normal;
  font-size: 17px;
}

input {
  padding-left: 20px;
}
</style>
