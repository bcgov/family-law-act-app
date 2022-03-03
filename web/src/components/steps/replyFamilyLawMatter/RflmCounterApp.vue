<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div class="row">
        <div class="col-md-12 order-heading">
            <div>
                <h1>Counter Application</h1>
                <p>
                    Remember, for each family law matter the other party applied for, you will 
                    be able to do the following:
                    <ul>
                        <li>
                            agree to the order the other party is asking the court to make or
                        </li>
                        <li>
                            disagree to all or part of the order the other party is asking 
                            the court to make and ask for a different order about that family law matter
                        </li>
                    </ul>
                    There might also be another family law matter you need an order about. 
                    If so, you can make your own application, called a counter application, 
                    to add it to the court case.
                </p>
            </div>

            <div>
                <b-form-group>
                    <div style="color:#556077; font-size:1.40em; font-weight:bold;">Do you want to make a counter application?</div>
                    <b-form-radio-group
                        v-model="counter"
                        class="mt-2 ml-3"
                        style="font-size:1.40em; display: inline-block;"
                        v-on:change="onChangeCounter($event)">
                        <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                        <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                    </b-form-radio-group>
                </b-form-group>
            </div>

            <div class="mt-5" v-if="counter == 'Yes'" >
                <div style="color:#556077; font-size:1.40em; font-weight:bold;">I need help with the following family law matter:</div>
                <p>Select all that apply.</p>
            
                <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                    <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                </div>
                <legal-assistance-faq v-if="showLegalAssistance"/>
            
                <b-form-group>
                    <b-form-checkbox-group
                        v-model="selectedCounters"
                        v-on:change="onChange($event)"
                        name="orders"
                        stacked
                    >                
                    <div v-if="allowParentingArrangements" class="checkbox-border">
                        <b-form-checkbox value="parentingArrangements"><div class="checkbox-choices">Parenting Arrangements</div>
                        <p>
                            Parenting arrangements are how each guardian will parent their child, including each guardian’s <tooltip title="parental responsibilities" :index="0"/> 
                            for decision making about a child and the <tooltip title="parenting time" :index="0"/> each guardian spends with a child. 
                            Parental responsibilities may be shared or exercised separately. The only thing you can consider in making your parenting
                            arrangements is what is in the best interests of the child.
                        </p>                    
                        </b-form-checkbox>
                    </div>

                    <div v-if="allowChildSupport" class="checkbox-border">
                        <b-form-checkbox value="childSupport"><div class="checkbox-choices">Child Support</div>
                            <p>
                            Child support is the amount of money a parent or guardian pays to another parent or guardian to help care for the child. A child 
                            has the right to be supported by both parents, whether the parents ever lived together, or the parent has ever 
                            lived with the child.
                            </p>
                        </b-form-checkbox>
                    </div>

                    <div v-if="allowContact" class="checkbox-border">
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

                    <div v-if="allowSpousalSupport" class="checkbox-border">
                        <b-form-checkbox value="spousalSupport"><div class="checkbox-choices">Spousal Support</div>
                            <p>
                                Spousal support is the money that one spouse pays to another spouse for their financial support after separation. A person is not 
                                entitled to spousal support in every case. 
                            </p>
                        </b-form-checkbox>
                    </div>
                    </b-form-checkbox-group>
                </b-form-group>

                <div class="m-4 text-primary" @click="showHelpText= !showHelpText" style="border-bottom:1px solid; width:25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Why aren’t all the family law matters listed? 
                    <span v-if="showHelpText" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showHelpText" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div class="m-4" v-if="showHelpText">
                    Your counter application is used to raise an issue that isn’t already before the court. If a 
                    family law matter isn’t showing in the list above, it is because the other party has already 
                    raised that issue. You can still ask for something different if you don’t agree with the order 
                    they want made, including asking for something more. This service will take you through the 
                    family law matters each of you have raised and you will be able to tell the court what order 
                    you want made for each one if you want something different (including something more). 
                    Select No to ‘Do you want to make a counter application’ if none of the listed options 
                    are what you are looking for.
                </div>
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
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { rflmQuestionnaireDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase,
        Tooltip,
        LegalAssistanceFaq
    }
})
export default class RflmCounterApp extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void
    
    selectedRepliesData = {} as rflmQuestionnaireDataInfoType;
    selectedCounters = [];
    counter = null;

    allowParentingArrangements = false;
    allowChildSupport = false;
    allowContact = false;
    allowSpousalSupport = false;

    showLegalAssistance = false
    showHelpText = false

    currentStep = 0;
    currentPage = 0;

    allPages = []; 
    commonPages = [];
    childRelatedPages = [];
    parentingArrangementsNewPages = []; 
    parentingArrangementsExistingPages = [];
    childSupportNewPages = [];
    childSupportExistingPages = [];
    contactWithChildNewPages = []
    contactWithChildExistingPages = []

    guardianOfChildNewPages = []
    guardianOfChildExistingPages = []

    spousalSupportNewPages = []
    spousalSupportExistingPages = []

    mounted(){      
        this.reloadPageInformation();
        this.initPageNumbers();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;       
        
        if (this.step.result?.rflmCounterAppSurvey?.data) {
            const counterAppData = this.step.result.rflmCounterAppSurvey.data;
            this.selectedCounters = counterAppData.counterList?counterAppData.counterList:[];
            this.counter = counterAppData.counter;           
        }

        this.enableSelection();

        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress == 100){
            this.setPages()
        }

        const progress = this.determineProgress();        
             
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public determineProgress(){

         let progress = 50;

        if (this.counter == null){
            progress = 50;
        } else {
            if (this.counter == 'yes'){
                progress = this.selectedCounters.length==0? 50 : 100;
            } else {
                progress = 100;
            }
        }      

        return progress;
    }

    public enableSelection(){

        if (this.step.result?.rflmQuestionnaireSurvey?.data) {
            this.selectedRepliesData = this.step.result.rflmQuestionnaireSurvey.data;

            if (this.selectedRepliesData.selectedParentingArrangementsForm.length == 0){
                this.allowParentingArrangements = true; 
            } else {

                const index = this.selectedCounters.indexOf('parentingArrangements');
                if (index != -1){
                    this.selectedCounters.splice(index, 1);
                }

            }

            if (this.selectedRepliesData.selectedChildSupportForm.length == 0){
                this.allowChildSupport = true; 
            } else {

                const index = this.selectedCounters.indexOf('childSupport');
                if (index != -1){
                    this.selectedCounters.splice(index, 1);
                }
            }

            if (this.selectedRepliesData.selectedContactWithChildForm.length == 0){
                this.allowContact = true; 
            } else {

                const index = this.selectedCounters.indexOf('contactWithChild');
                if (index != -1){
                    this.selectedCounters.splice(index, 1);
                }
            }

            if (this.selectedRepliesData.selectedSpousalSupportForm.length == 0){
                this.allowSpousalSupport = true; 
            } else {

                const index = this.selectedCounters.indexOf('spousalSupport');
                if (index != -1){
                    this.selectedCounters.splice(index, 1);
                }
            }
        }
    }

    public childRelatedCounter(){

        const childRelated = (this.counter == 'Yes' && 
                (this.selectedCounters.includes('parentingArrangements') ||
                this.selectedCounters.includes('childSupport') ||
                this.selectedCounters.includes('contactWithChild') ||
                this.selectedCounters.includes('guardianOfChild')));

        return childRelated;
    }

    public setPages() {

        if (this.getSelectedReplies) {
                        
            togglePages(this.allPages, false, this.currentStep);
            
            togglePages(this.commonPages, true, this.currentStep);

            togglePages(this.childRelatedPages, this.childRelatedCounter, this.currentStep);

            if (this.selectedRepliesData.selectedParentingArrangementsForm.length > 0){                
                if(this.selectedRepliesData.selectedParentingArrangementsForm.includes("existingParentingArrangements"))
                    togglePages(this.parentingArrangementsExistingPages, true, this.currentStep);
                else    
                    togglePages(this.parentingArrangementsNewPages, true, this.currentStep);               
            }
            
            if (this.selectedRepliesData.selectedChildSupportForm.length > 0){                
                if(this.selectedRepliesData.selectedChildSupportForm.includes("existingChildSupport"))
                    togglePages(this.childSupportExistingPages, true, this.currentStep);
                else    
                    togglePages(this.childSupportNewPages, true, this.currentStep);               
            } 

            if (this.selectedRepliesData.selectedContactWithChildForm.length > 0){                
                if(this.selectedRepliesData.selectedContactWithChildForm.includes("existingContact"))
                    togglePages(this.contactWithChildExistingPages, true, this.currentStep);
                else    
                    togglePages(this.contactWithChildNewPages, true, this.currentStep);               
            } 

            if (this.selectedRepliesData.selectedGuardianshipForm.length > 0){                
                if(this.selectedRepliesData.selectedGuardianshipForm.includes("appointing"))
                    togglePages(this.guardianOfChildNewPages, true, this.currentStep);
                else    
                    togglePages(this.guardianOfChildExistingPages, true, this.currentStep);               
            } 

            // if (this.selectedRepliesData.selectedSpousalSupportForm.length > 0){                
            //     if(this.selectedRepliesData.selectedSpousalSupportForm.includes("existingSpouseSupport"))
            //         togglePages(this.spousalSupportExistingPages, true, this.currentStep);
            //     else    
            //         togglePages(this.spousalSupportNewPages, true, this.currentStep);               
            // }            
        }
    }

    public getSelectedReplies(){

        const selected = this.selectedRepliesData.selectedParentingArrangementsForm.length>0 || 
                        this.selectedRepliesData.selectedChildSupportForm.length>0 ||
                        this.selectedRepliesData.selectedContactWithChildForm.length>0 ||
                        this.selectedRepliesData.selectedGuardianshipForm.length>0 ||
                        this.selectedRepliesData.selectedSpousalSupportForm.length>0

        return selected;
    }


    public onChangeCounter(countering){

        this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:false})

        if (countering == 'No'){
            this.selectedCounters = [];
        } 

        Vue.filter('surveyChanged')('replyFlm')
    }
   
    public onChange(selectedCounters) {
        this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:false})
        
        Vue.filter('surveyChanged')('replyFlm')               
    }

    public initPageNumbers(){
        const p = this.stPgNo.RFLM        
        this.allPages = _.range(p.RflmChildrenInfo, Object.keys(this.stPgNo.RFLM).length-1) 

        this.commonPages = [p.ReviewYourAnswersRFLM];

        this.childRelatedPages = [p.RflmChildrenInfo];

        this.parentingArrangementsNewPages = [p.RflmChildrenInfo, p.ReplyNewParentingArrangements, p.ReplyNewParentalResponsibilities, p.ReplyNewParentingTime, p.ReplyNewConditionsParentingTime]
        this.parentingArrangementsExistingPages = [p.RflmChildrenInfo, p.ReplyExistingParentingArrangements]   

        this.childSupportNewPages = [p.RflmChildrenInfo, p.ReplyNewChildSupport, p.RelationshipToChild, p.DisagreeChildSupport, p.RflmCalculatingChildSupport, p.RflmAdditionalDocuments]
        this.childSupportExistingPages = [p.RflmChildrenInfo, p.ReplyExistingChildSupport, p.RflmUnpaidChildSupport, p.DisagreeExistingChildSupport, p.RflmCalculatingChildSupport]

        this.contactWithChildNewPages = [p.RflmChildrenInfo, p.ReplyNewContactWithChild, p.DisagreeContactWithChild]
        this.contactWithChildExistingPages = [p.RflmChildrenInfo, p.ReplyExistingContactWithChild]

        this.guardianOfChildNewPages = [p.RflmChildrenInfo]
        this.guardianOfChildExistingPages = [p.RflmChildrenInfo]

        // this.spousalSupportNewPages = [p.SpousalSupport, p.SpousalSupportIncomeAndEarningPotential, p.AboutSpousalSupportOrder, p.CalculatingSpousalSupport]
        // this.spousalSupportExistingPages = [p.ExistingSpousalSupportOrderAgreement, p.CalculatingSpousalSupport, p.UnpaidSpousalSupport]
    }
   

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }   

    public getSelectedFormsNames(){
        
        let result = ''
        if (this.counter == 'Yes'){
            for(const form of this.selectedCounters){
                if(form=='parentingArrangements')   result+='Parenting Arrangements'+'\n';
                if(form=='childSupport')            result+='Child Support'+'\n';
                if(form=='contactWithChild')        result+='Contact With a Child'+'\n';
                if(form=='guardianOfChild')         result+='Guardian Of a Child'+'\n';
                if(form=='spousalSupport')          result+='Spousal Support'+'\n';
            }
        } else {
            result = 'None';
        }
        
        return result;
    }
  
    beforeDestroy() {

        this.setPages();
        const progress = this.determineProgress(); 
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);        

        const questions = [
            {name:'RflmCounterApp',title:'Do you want to make a counter application?',value:this.counter},
            {name:'RflmCounterApp',title:'I need help with the following family law matter:',value:this.getSelectedFormsNames()}
        ]        
        this.UpdateStepResultData({step:this.step, data: {rflmCounterAppSurvey: {data: {counter: this.counter,  counterList: this.selectedCounters}, questions: questions, pageName:"Counter Application", currentStep:this.currentStep, currentPage:this.currentPage}}});
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

input {
  padding-left: 20px;
}
</style>
