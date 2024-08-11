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
                Look at the other party’s application. On page 3, Question 10, they will have 
                selected each family law matter they applied for. They will also have completed 
                an additional schedule with the details of the order.
            </p>
            <p>In reply to the other party’s application about a family law matter: Select only one option for each family law matter and complete the required schedule(s), as applicable. If you are making a counter application, select the appropriate answer to the question below to identify which schedule you must complete. </p>
        </div>     


        <div>
            <b-form-group>
                <b-form-checkbox-group
                    :disabled="rejectedPathway"
                    v-model="selectedParentingArrangementsForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div><span class="checkbox-choices-header text-primary">Parenting Arrangements </span> including parental responsibilities and parenting time</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('parentingArrangements', 'agreeParentingArrangements', $event)" 
                            value="agreeParentingArrangements">
                            <div class="checkbox-choices">I agree with the request of the other party</div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('parentingArrangements', 'disagreeParentingArrangements', $event)" 
                            value="disagreeParentingArrangements">
                            <div class="checkbox-choices">I disagree with the request of the other party. A different order about parenting arrangements should be made. 🠆 Complete Schedule 1</div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('parentingArrangements', 'counterParentingArrangements', $event)" 
                            value="counterParentingArrangements">
                            <div class="checkbox-choices">I am making a counter application for an order. No application about this family law matter was made by the other party. </div>
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    :disabled="rejectedPathway"
                    v-model="selectedChildSupportForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Child Support</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('childSupport', 'agreeChildSupport', $event)" 
                            value="agreeChildSupport">
                            <div class="checkbox-choices">I agree with the request of the other party </div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('childSupport', 'disagreeChildSupport', $event)" 
                            value="disagreeChildSupport">
                            <div class="checkbox-choices">I disagree with the request of the other party. A different order about child support should be made. 🠆 Complete Schedule 2 </div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('childSupport', 'counterChildSupport', $event)" 
                            value="counterChildSupport">
                            <div class="checkbox-choices">I am making a counter application for an order about child support. No application about this family law matter was made by the other party. </div>
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    :disabled="rejectedPathway"
                    v-model="selectedContactWithChildForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Contact with a child</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('contact', 'agreeContact', $event)" 
                            value="agreeContact">
                            <div class="checkbox-choices">I agree with the request of the other party</div>
                       </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('contact', 'disagreeContact', $event)" 
                            value="disagreeContact">
                            <div class="checkbox-choices">I disagree with the request of the other party. A different order about contact with a  child should be made. 🠆 Complete Schedule 3 </div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('contact', 'counterContact', $event)" 
                            value="counterContact">
                            <div class="checkbox-choices"> I am making a counter application for an order about contact with a child. No application about this family law matter was made by the other party. </div>
                        </b-form-checkbox>
                        
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    :disabled="rejectedPathway"
                    v-model="selectedGuardianshipForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Guardianship of a child</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('guardianship', 'appointing', $event)" 
                            value="appointing">
                            <div class="checkbox-choices">Appointing a guardian of a child</div>
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('guardianship', 'cancelling', $event)" 
                            value="cancelling">
                            <div class="checkbox-choices">Cancelling guardianship of a child </div>
                        </b-form-checkbox>
                    </div>
                    
                </b-form-checkbox-group>

                <b-form-checkbox-group
                    :disabled="rejectedPathway"
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

                <b-form-checkbox-group
                    :disabled="rejectedPathway"
                    v-model="selectedCompanionAnimalForm" 
                    stacked
                    >                                
                    <div class="checkbox-border">
                        <div class="checkbox-choices-header text-primary">Property Division</div>
                        <b-form-checkbox 
                            class="mt-3"
                            v-on:change="changeSelection('companionAnimal', 'newCompanionAnimal', $event)" 
                            value="newCompanionAnimal">
                            <div class="checkbox-choices">In respect of a companion animal - new</div>
                            <p>
                                Schedule 11 of the application was completed by the other party. 
                                They are asking for an order about property division in respect of 
                                a companion animal because there wasn’t already one in place.
                            </p>                    
                        </b-form-checkbox>
                        <b-form-checkbox 
                            v-on:change="changeSelection('companionAnimal', 'existingCompanionAnimal', $event)" 
                            value="existingCompanionAnimal">
                            <div class="checkbox-choices">Companion animal agreement – existing </div>
                            <p>
                                Schedule 12 of the application was completed by the other party. 
                                They are asking for an order about a property division agreement 
                                in respect of a companion animal that already exists.
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
    
    @applicationState.State
    public rejectedPathway!: boolean;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void    
   
    selectedParentingArrangementsForm = [];
    selectedChildSupportForm = [];
    selectedContactWithChildForm = [];
    selectedGuardianshipForm = [];
    selectedSpousalSupportForm = [];
    selectedCompanionAnimalForm = [];   

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
        this.forceAddExistingLocation()
        
        if (this.step.result?.rflmQuestionnaireSurvey) {
            const rflmData = this.step.result.rflmQuestionnaireSurvey.data;
            this.selectedParentingArrangementsForm = rflmData.selectedParentingArrangementsForm?rflmData.selectedParentingArrangementsForm:[];
            this.selectedChildSupportForm = rflmData.selectedChildSupportForm?rflmData.selectedChildSupportForm:[];
            this.selectedContactWithChildForm = rflmData.selectedContactWithChildForm?rflmData.selectedContactWithChildForm:[];
            this.selectedGuardianshipForm = rflmData.selectedGuardianshipForm?rflmData.selectedGuardianshipForm:[];
            this.selectedSpousalSupportForm = rflmData.selectedSpousalSupportForm?rflmData.selectedSpousalSupportForm:[];
            this.selectedCompanionAnimalForm = rflmData.selectedCompanionAnimalForm?rflmData.selectedCompanionAnimalForm:[];
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
                        this.selectedSpousalSupportForm.length>0 ||
                        this.selectedCompanionAnimalForm.length>0

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
        } else if (category == 'companionAnimal'){
            if (list.length>0){
                this.selectedCompanionAnimalForm = [selection];            
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
            this.selectedCompanionAnimalForm = [];
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
        
        if (this.selectedCompanionAnimalForm.includes('newCompanionAnimal')) result+='New Companion Animal'+'\n';
        else if (this.selectedCompanionAnimalForm.includes('existingCompanionAnimal')) result+='Existing Companion Animal'+'\n';

        return result;
    }

    public getData(){
        let result = {} as rflmQuestionnaireDataInfoType;
        result.selectedParentingArrangementsForm = this.selectedParentingArrangementsForm;
        result.selectedChildSupportForm = this.selectedChildSupportForm;
        result.selectedContactWithChildForm = this.selectedContactWithChildForm;
        result.selectedGuardianshipForm = this.selectedGuardianshipForm;
        result.selectedSpousalSupportForm = this.selectedSpousalSupportForm;
        result.selectedCompanionAnimalForm = this.selectedCompanionAnimalForm;        
        return result;
    }

    public forceAddExistingLocation(){
        const locationStep = this.stPgNo.COMMON._StepNo
        const locationPage = this.stPgNo.COMMON.FilingLocation
        
        const existingOrders = this.$store.state.Application.steps[0]['result']['existingOrders']
        const replyExistingOrder = existingOrders.filter(order => order.type=='RPL');
        if(replyExistingOrder[0] && !replyExistingOrder[0].fileNumber)
            this.NavigateToPage(locationStep,locationPage)
    }

    public NavigateToPage(stepNo, pageNo){
        this.$store.commit("Application/setCurrentStep", stepNo);
        this.$store.commit("Application/setCurrentStepPage", {currentStep: stepNo, currentPage: pageNo });        
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
