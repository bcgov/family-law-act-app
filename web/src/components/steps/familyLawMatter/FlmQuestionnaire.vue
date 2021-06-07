<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1 >I need help with the following family law matter:</h1>
            <p>Select all that apply.</p>
        </div>        
        <div>
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525.</p><br/><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
            </div>
        </div>
        <div>
            <b-form-group>
                <b-form-checkbox-group
                v-model="selectedForm"
                v-on:change="onChange($event)"
                name="orders"
                stacked
                >                
                <div class="checkbox-border">
                    <b-form-checkbox value="parentingArrangements"><div class="checkbox-choices">Parenting Arrangements</div>
                    <p>
                        Parenting arrangements are how each guardian will parent their child, including each guardian’s <tooltip title="parental responsibilities" :index="0"/> 
                        for decision making about a child and the <tooltip title="parenting time" :index="0"/> each guardian spends with a child. 
                        Parental responsibilities may be shared or exercised separately. The only thing you can consider in making your parenting
                         arrangements is what is in the best interests of the child.
                    </p>                    
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="childSupport"><div class="checkbox-choices">Child Support</div>
                        <p>
                        Child support is the amount of money a parent or guardian pays to another parent or guardian to help care for the child. A child 
                        has the right to be supported by both parents, whether the parents ever lived together, or the parent has ever 
                        lived with the child.
                        </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="contactWithChild"><div class="checkbox-choices">Contact With a Child</div>
                        <p>
                            Contact with a child is the time a child spends with someone who is not their guardian. This person could include a parent who is not a 
                            guardian to a child, or other people, like grandparents, elders, aunts and uncles, or a family friend.  
                        </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="guardianOfChild"><div class="checkbox-choices">Guardianship of a child</div>
                    <p>
                        Guardianship is who is responsible for a child. Only guardians have parental responsibilities and parenting time with a child. 
                        An agreement or order about parenting arrangements can say a child’s guardians share parental responsibilities 
                        or parenting time. Or it can say one guardian is responsible for more of the parenting decisions and has more 
                        of the parenting time with the child.
                    </p>
                    </b-form-checkbox>
                </div>

                <div class="checkbox-border">
                    <b-form-checkbox value="spousalSupport"><div class="checkbox-choices">Spousal Support</div>
                        <p>
                            Spousal support is the money that one spouse pays to another spouse for their financial support after separation. A person is not 
                            entitled to spousal support in every case. 
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
export default class FlmQuestionnaire extends Vue {
    
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
    
    selectedForm = [];
    //returningUser = false
    showLegalAssistance = false
    // preparationInfo = false
    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.allPages = _.range(this.stPgNo.FLM.FlmBackground, Object.keys(this.stPgNo.FLM).length-1) 
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result && this.step.result.flmSelectedForm) {
            this.selectedForm = this.step.result.flmSelectedForm.data;
            this.determineSteps();
        }
        
        const progress = this.selectedForm.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
  
    public onChange(selectedForm) {
        this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
        if(this.checkErrorOnPages())        
            this.setSteps(selectedForm);
        else{ 
            this.selectedForm = [];            
            //this.togglePages(this.allPages, false); 
        }
        Vue.filter('surveyChanged')('familyLawMatter')        
       // console.log(selectedForm)
    }

    public setSteps(selectedForm) {
        // console.log(selectedForm)
        const p = this.stPgNo.FLM
        if (selectedForm) {
            this.togglePages(this.allPages, false); 
            const progress = this.selectedForm.length==0? 50 : 100;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);


            if (selectedForm.length > 0){

                this.determineSteps();                            

                if(this.$store.state.Application.steps[this.currentStep].pages[p.FlmBackground].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.FlmBackground, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.ParentingOrderAgreement].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ParentingOrderAgreement, 50, false);
            
                if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutParentingArrangements].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutParentingArrangements, 50, false);
            
                //if(this.$store.state.Application.steps[this.currentStep].pages[this.reviewYourAnswersPage].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersFLM, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.FlmAdditionalDocuments, 0, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.ParentingArrangements].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ParentingArrangements, 50, false);    
            
                if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutExistingChildSupport].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutExistingChildSupport, 50, false);
            
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ContactWithChild].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ContactWithChild, 50, false);
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ContactWithChildOrder].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ContactWithChildOrder, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.GuardianOfChild].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.GuardianOfChild, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportOrderAgreement].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportOrderAgreement, 50, false);
              
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportFinalOrder].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportFinalOrder, 50, false);
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportAgreement].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportAgreement, 50, false);
   
            }   

        }
    }

    public determineSteps(){
        let formOneRequired = false;
        const p = this.stPgNo.FLM
        const stepCOM = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo]

        if( stepCOM.result &&
            stepCOM.result.filingLocationSurvey &&
            stepCOM.result.filingLocationSurvey.data){
                const filingLocationData = stepCOM.result.filingLocationSurvey.data;
                formOneRequired = this.determineRequiredForm(filingLocationData);
        }

        if (!formOneRequired){
            this.togglePages([p.FlmBackground], true);
            // this.togglePages(this.commonPages, false);
            this.togglePages([p.PreviewFormsFLM], false);
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
            if(this.$store.state.Application.steps[this.currentStep].pages[p.ReviewYourAnswersFLM].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersFLM, 50, false);

        } else {
            this.togglePages([p.FlmBackground], false);
            this.togglePages([p.ReviewYourAnswersFLM], true);
        }   
    }

    public determineRequiredForm(filingLocationData){

        const courtsC = ["Victoria Law Courts", "Surrey Provincial Court"];
        let location = ''

        location = filingLocationData.ExistingCourt;                
        
        if(courtsC.includes(location) && 
            filingLocationData.MetEarlyResolutionRequirements == 'n'){
            return true;
        } else {
            return false;
        }

    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            //console.log('in step = '+this.currentStep+ ' and '+ i + ' page = '+pageArr[i])
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public toggleSteps(stepId, activeIndicator) {       
        this.$store.commit("Application/setStepActive", {
            currentStep: stepId,
            active: activeIndicator
        });
    }

    public checkErrorOnPages(){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
        for(const stepIndex of [this.stPgNo.COMMON._StepNo]){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.togglePages(this.allPages, false); 
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

    public getSelectedFormsNames(){
        let result = ''
        // console.log(this.selectedForm)
        for(const form of this.selectedForm){
            if(form=='parentingArrangements')   result+='Parenting Arrangements'+'\n';
            if(form=='childSupport')            result+='Child Support'+'\n';
            if(form=='contactWithChild')        result+='Contact With a Child'+'\n';
            if(form=='guardianOfChild')         result+='Guardian Of a Child'+'\n';
            if(form=='spousalSupport')          result+='Spousal Support'+'\n';
        }
        return result;
    }
  
    beforeDestroy() {
        const progress = this.selectedForm.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'FlmQuestionnaire',title:'I need help with the following family law matter:',value:this.getSelectedFormsNames()}]        
        this.UpdateStepResultData({step:this.step, data: {flmSelectedForm: {data: this.selectedForm, questions: questions, pageName:"Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
};
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

input {
  padding-left: 20px;
}
</style>
