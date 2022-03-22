<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1>Other Party’s Application</h1>
            <p>
                For each family law matter the other party applied for, you will be able to do the following:
                <ul>
                    <li>agree to the order the other party is asking the court to make or</li>
                    <li>
                        disagree to all or part of the order the other party is asking the court 
                        to make and ask for a different order about that family law matter
                    </li>
                </ul>
            </p>
            <p>
                This service will take you through step-by-step.
            </p>
            <p>
                To get started, we need you to tell us what the other party applied for.                
            </p>
            <h2>The other party has applied for an order about the following family law matter:</h2>
            <p>
                Look at the other party’s application. On page 2, Question 7, they will have 
                selected each family law matter they applied for. They will also have completed 
                an additional schedule with the details of the order.
            </p>
            <p>Select each option that applies.</p>
        </div>     


        <div>
            <b-form-group>
                <b-form-checkbox-group
                    v-model="selectedParentingArrangementsForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div><span class="checkbox-choices-header text-primary">Parenting Arrangements </span> including parental responsibilities and parenting time</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('parentingArrangements', 'newParentingArrangements', $event)" 
                            value="newParentingArrangements">
                            <div class="checkbox-choices">Parenting Arrangements - new</div>
                            <p>
                                Schedule 1 of the application was completed by the other party. 
                                They are asking for an order about parenting arrangements because 
                                there wasn’t already one in place.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('parentingArrangements', 'existingParentingArrangements', $event)" 
                            value="existingParentingArrangements">
                            <div class="checkbox-choices">Parenting Arrangements order/agreement – existing </div>
                            <p>
                                Schedule 2 of the application was completed by the other party. 
                                They are asking for an order about a parenting order or agreement 
                                that already exists.
                            </p>                    
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    v-model="selectedChildSupportForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Child Support</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('childSupport', 'newChildSupport', $event)" 
                            value="newChildSupport">
                            <div class="checkbox-choices">Child Support - new</div>
                            <p>
                                Schedule 3 of the application was completed by the other party. 
                                They are asking for an order about child support because there 
                                wasn’t already one in place.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('childSupport', 'existingChildSupport', $event)" 
                            value="existingChildSupport">
                            <div class="checkbox-choices">Child Support order/agreement – existing </div>
                            <p>
                                Schedule 4 of the application was completed by the other party. 
                                They are asking for an order about a child support order or 
                                agreement that already exists.
                            </p>                    
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    v-model="selectedContactWithChildForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Contact with a child</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('contact', 'newContact', $event)" 
                            value="newContact">
                            <div class="checkbox-choices">Contact with a child - new</div>
                            <p>
                                Schedule 5 of the application was completed by the other party. 
                                They are asking for an order about contact with a child because 
                                there wasn’t already one in place.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('contact', 'existingContact', $event)" 
                            value="existingContact">
                            <div class="checkbox-choices">Contact order/agreement – existing </div>
                            <p>
                                Schedule 6 of the application was completed by the other party. 
                                They are asking for an order about a contact order or agreement 
                                that already exists.
                            </p>                    
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    v-model="selectedGuardianshipForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Guardianship of a child</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('guardianship', 'appointing', $event)" 
                            value="appointing">
                            <div class="checkbox-choices">appointing a guardian of a child</div>
                            <p>
                                Schedule 7 of the application was completed by the other party. 
                                They are asking for an order to appoint a new guardian for a child.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('guardianship', 'cancelling', $event)" 
                            value="cancelling">
                            <div class="checkbox-choices">cancelling guardianship of a child </div>
                            <p>
                                Schedule 8 of the application was completed by the other party. 
                                They are asking for an order to cancel someone’s guardianship 
                                of a child. 
                            </p>                    
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    v-model="selectedSpousalSupportForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Spousal Support</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('spouseSupport', 'newSpouseSupport', $event)" 
                            value="newSpouseSupport">
                            <div class="checkbox-choices">Spousal Support - new</div>
                            <p>
                                Schedule 9 of the application was completed by the other party. 
                                They are asking for an order about spousal support because 
                                there wasn’t already one in place.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('spouseSupport', 'existingSpouseSupport', $event)" 
                            value="existingSpouseSupport">
                            <div class="checkbox-choices">Spousal Support order/agreement – existing </div>
                            <p>
                                Schedule 10 of the application was completed by the other party. 
                                They are asking for an order about a spousal support order or 
                                agreement that already exists.
                            </p>                    
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

            </b-form-group>
        </div>
      </div>
    </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as _ from 'underscore';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import PageBase from "../PageBase.vue";
import { togglePages } from '@/components/utils/TogglePages';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { rflmQuestionnaireDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';

@Component({
    components:{
        PageBase
    }
})
export default class RflmQuestionnaire extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void    
   
    selectedParentingArrangementsForm = [];
    selectedChildSupportForm = [];
    selectedContactWithChildForm = [];
    selectedGuardianshipForm = [];
    selectedSpousalSupportForm = [];   

    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.allPages = _.range(this.stPgNo.RFLM.RflmCounterApp, Object.keys(this.stPgNo.RFLM).length-1) 
        this.reloadPageInformation();        
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.rflmQuestionnaireSurvey) {
            const rflmData = this.step.result.rflmQuestionnaireSurvey.data;
            this.selectedParentingArrangementsForm = rflmData.selectedParentingArrangementsForm?rflmData.selectedParentingArrangementsForm:[];
            this.selectedChildSupportForm = rflmData.selectedChildSupportForm?rflmData.selectedChildSupportForm:[];
            this.selectedContactWithChildForm = rflmData.selectedContactWithChildForm?rflmData.selectedContactWithChildForm:[];
            this.selectedGuardianshipForm = rflmData.selectedGuardianshipForm?rflmData.selectedGuardianshipForm:[];
            this.selectedSpousalSupportForm = rflmData.selectedSpousalSupportForm?rflmData.selectedSpousalSupportForm:[];
            if(this.getSelected())
                this.determineSteps();
        }

        const selected = this.getSelected();
        
        const progress = !selected? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        this.checkErrorOnPages()
    }

    public getSelected(){

        const selected = this.selectedParentingArrangementsForm.length>0 || 
                        this.selectedChildSupportForm.length>0 ||
                        this.selectedContactWithChildForm.length>0 ||
                        this.selectedGuardianshipForm.length>0 ||
                        this.selectedSpousalSupportForm.length>0

        return selected;

    }

    public changeSelection(category, selection, list){

        if (category == 'parentingArrangements'){
            if (list.length>0){
                this.selectedParentingArrangementsForm = [selection];            
            }
        } else if (category == 'childSupport'){
            if (list.length>0){
                this.selectedChildSupportForm = [selection];            
            }
        } else if (category == 'contact'){
            if (list.length>0){
                this.selectedContactWithChildForm = [selection];            
            }
        } else if (category == 'guardianship'){
            this.selectedGuardianshipForm = list;
        } else if (category == 'spouseSupport'){
            if (list.length>0){
                this.selectedSpousalSupportForm = [selection];            
            }
        }

        this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:false})        

        if(this.checkErrorOnPages()){
            this.setSteps();
        } else { 
            this.selectedParentingArrangementsForm = [];
            this.selectedChildSupportForm = [];
            this.selectedContactWithChildForm = [];
            this.selectedGuardianshipForm = [];
            this.selectedSpousalSupportForm = [];                                    
        }
        Vue.filter('surveyChanged')('replyFlm'); 
    }    

    public setSteps() {
       
        togglePages(this.allPages, false, this.currentStep); 
        const progress = !this.getSelected()? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

        if (this.getSelected()) {  
            
            this.determineSteps();
            const p = this.stPgNo.RFLM;
            
            if(this.$store.state.Application.steps[this.currentStep].pages[p.RflmCounterApp].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.RflmCounterApp, 50, false);

            if(this.$store.state.Application.steps[this.currentStep].pages[p.RflmBackground].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.RflmBackground, 50, false); 

        }
    } 

    public determineSteps(){

        const p = this.stPgNo.RFLM;
       
        togglePages([p.RflmCounterApp], true, this.currentStep);
        togglePages([p.RflmBackground], true, this.currentStep);
        togglePages([p.PreviewFormsRFLM], false, this.currentStep);
        this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:false});       
        
        if(this.$store.state.Application.steps[this.currentStep].pages[p.ReviewYourAnswersRFLM].progress==100)
            Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersRFLM, 50, false);

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
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }   

    public getSelectedFormsNames(){
        let result = '';
        if (this.selectedParentingArrangementsForm.includes('newParentingArrangements')) result+='New Parenting Arrangements'+'\n';
        else if (this.selectedParentingArrangementsForm.includes('existingParentingArrangements')) result+='Existing Parenting Arrangements'+'\n';

        if (this.selectedChildSupportForm.includes('newChildSupport')) result+='New Child Support'+'\n';
        else if (this.selectedChildSupportForm.includes('existingChildSupport')) result+='Existing Child Support'+'\n';

        if (this.selectedContactWithChildForm.includes('newContact')) result+='New Contact With a Child'+'\n';
        else if (this.selectedContactWithChildForm.includes('existingContact')) result+='Existing Contact With a Child'+'\n';

        if (this.selectedGuardianshipForm.includes('appointing')) result+='Appointing a Guardian of a Child'+'\n';
        if (this.selectedGuardianshipForm.includes('cancelling')) result+='Cancelling Guardianship of a Child'+'\n';

        if (this.selectedSpousalSupportForm.includes('newSpouseSupport')) result+='New Spousal Support'+'\n';
        else if (this.selectedSpousalSupportForm.includes('existingSpouseSupport')) result+='Existing Spousal Support'+'\n';
        
        return result;
    }

    public getData(){
        let result = {} as rflmQuestionnaireDataInfoType;
        result.selectedParentingArrangementsForm = this.selectedParentingArrangementsForm;
        result.selectedChildSupportForm = this.selectedChildSupportForm;
        result.selectedContactWithChildForm = this.selectedContactWithChildForm;
        result.selectedGuardianshipForm = this.selectedGuardianshipForm;
        result.selectedSpousalSupportForm = this.selectedSpousalSupportForm;        
        return result;
    }
  
    beforeDestroy() {
        const progress = !this.getSelected()? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'RflmQuestionnaire',title:"Other Party's application:",value:this.getSelectedFormsNames()}]        
        this.UpdateStepResultData({step:this.step, data: {rflmQuestionnaireSurvey: {data: this.getData(), questions: questions, pageName:"Reply to Family Law Matter Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.checkbox-choices{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
}
.checkbox-choices-header{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
}


input {
  padding-left: 20px;
}
</style>
