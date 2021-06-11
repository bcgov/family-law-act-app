<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1>Questionnaire</h1>
            <p>
                <tooltip title="Priority parenting matters" :index="0"/> are decisions about a child that require the agreement of each of the child's 
                guardians or an order from the court and it is priority to get the order before or separately from any 
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
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525.</p><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
            </div>
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
    //returningUser = false
    showLegalAssistance = false
    // preparationInfo = false
    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.allPages = _.range(this.stPgNo.PPM.PpmBackground, Object.keys(this.stPgNo.PPM).length-1) 
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result && this.step.result.ppmQuestionnaireSurvey) {
            this.selectedPriorityParentingMatter = this.step.result.ppmQuestionnaireSurvey.data;
            this.determineSteps();
        }
        
        const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
  
    public onChange(selectedPriorityParentingMatter) {
        this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
        if(this.checkErrorOnPages())        
            this.setSteps(selectedPriorityParentingMatter);
        else{ 
            this.selectedPriorityParentingMatter = [];            
            //this.togglePages(this.allPages, false); 
        }
        Vue.filter('surveyChanged')('familyLawMatter')        
       // console.log(selectedPriorityParentingMatter)
    }

    public setSteps(selectedPriorityParentingMatter) {
        // console.log(selectedPriorityParentingMatter)
        const p = this.stPgNo.PPM
        if (selectedPriorityParentingMatter) {
            this.togglePages(this.allPages, false); 
            const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);


            if (selectedPriorityParentingMatter.length > 0){

                this.determineSteps();                            

                if(this.$store.state.Application.steps[this.currentStep].pages[p.PpmBackground].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.PpmBackground, 50, false);

                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ParentingOrderAgreement].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ParentingOrderAgreement, 50, false);
            
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutParentingArrangements].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutParentingArrangements, 50, false);
            
                //if(this.$store.state.Application.steps[this.currentStep].pages[this.reviewYourAnswersPage].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersPPM, 0, false);
                // Vue.filter('setSurveyProgress')(null, this.currentStep, p.FlmAdditionalDocuments, 0, false);

                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ParentingArrangements].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ParentingArrangements, 50, false);    
            
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutExistingChildSupport].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutExistingChildSupport, 50, false);
            
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ContactWithChild].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ContactWithChild, 50, false);
                
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ContactWithChildOrder].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ContactWithChildOrder, 50, false);

                // if(this.$store.state.Application.steps[this.currentStep].pages[p.GuardianOfChild].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.GuardianOfChild, 50, false);

                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportOrderAgreement].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportOrderAgreement, 50, false);
              
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportFinalOrder].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportFinalOrder, 50, false);
                
                // if(this.$store.state.Application.steps[this.currentStep].pages[p.ExistingSpousalSupportAgreement].progress==100)
                //     Vue.filter('setSurveyProgress')(null, this.currentStep, p.ExistingSpousalSupportAgreement, 50, false);
   
            }   

        }
    }

    public determineSteps(){
        let formOneRequired = false;
        const p = this.stPgNo.PPM
        const stepCOM = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo]

        if( stepCOM.result &&
            stepCOM.result.filingLocationSurvey &&
            stepCOM.result.filingLocationSurvey.data){
                const filingLocationData = stepCOM.result.filingLocationSurvey.data;
                formOneRequired = this.determineRequiredForm(filingLocationData);
        }

        if (!formOneRequired){
            this.togglePages([p.PpmBackground], true);
            // this.togglePages(this.commonPages, false);
            this.togglePages([p.PreviewFormsPPM], false);
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
            if(this.$store.state.Application.steps[this.currentStep].pages[p.ReviewYourAnswersPPM].progress==100)
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersPPM, 50, false);

        } else {
            this.togglePages([p.PpmBackground], false);
            this.togglePages([p.ReviewYourAnswersPPM], true);
        }   
    }

    public determineRequiredForm(filingLocationData){

        // const courtsC = ["Victoria Law Courts", "Surrey Provincial Court"];
        // let location = ''

        // location = filingLocationData.ExistingCourt;                
        
        // if(courtsC.includes(location) && 
        //     filingLocationData.MetEarlyResolutionRequirements == 'n'){
        //     return true;
        // } else {
            return false;
        // }

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

    public getSelectedPriorityParentingMatterNames(){
        let result = ''
        // console.log(this.selectedPriorityParentingMatter)
        for(const form of this.selectedPriorityParentingMatter){
            if(form=='parentingArrangements')   result+='Parenting Arrangements'+'\n';
            if(form=='childSupport')            result+='Child Support'+'\n';
            if(form=='contactWithChild')        result+='Contact With a Child'+'\n';
            if(form=='guardianOfChild')         result+='Guardian Of a Child'+'\n';
            if(form=='spousalSupport')          result+='Spousal Support'+'\n';
        }
        return result;
    }
  
    beforeDestroy() {
        const progress = this.selectedPriorityParentingMatter.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'FlmQuestionnaire',title:'I need help with the following family law matter:',value:this.getSelectedPriorityParentingMatterNames()}]        
        this.UpdateStepResultData({step:this.step, data: {ppmQuestionnaireSurvey: {data: this.selectedPriorityParentingMatter, questions: questions, pageName:"Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
};
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
