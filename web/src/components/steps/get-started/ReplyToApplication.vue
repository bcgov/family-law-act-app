<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div v-if="dataReady" class="row">
            <div class="col-md-12 order-heading">               
                <div>          
                    <h1>What application are you replying to?</h1>
                    <p>
                        Please select each application you have been <tooltip title="served" size="lg" index="0" /> with and want to file 
                        a reply to. You can find the name of the form and form number on the top 
                        left corner of the first page.
                    </p>
                </div>                
                <div>
                    <b-form-group>
                        <b-form-checkbox-group
                        :disabled="rejectedPathway"
                        v-model="selected"
                        @change="onChange"
                        name="orders"
                        stacked
                        >
                        <div class="checkbox-border">
                            <b-form-checkbox value="replyFlm">
                                <div class="checkbox-choices">Application About a Family Law Matter Form 3</div>
                                <p>
                                    Family law matters include: parenting arrangements (<tooltip title="parental responsibilities" size="xl" :index="0"/>
                                    and <tooltip title="parenting time" :index="0"/>), <tooltip title="child support" :index="0"/>, 
                                    <tooltip title="contact with a child" size="md" :index="0"/>, <tooltip title="guardianship of a child" size="md" index="0"/> 
                                    and <tooltip title="spousal support" size="md" index="0" />. As part of the Reply to an Application About a Family 
                                    Law Matter, you can apply for an order about any family law matter that is not included in the other 
                                    party’s application.
                                </p>                            
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyCaseMgmt">
                                <div class="checkbox-choices">Application for Case Management Order Form 10</div>
                                <p>
                                    Case management includes administrative or procedural things that need to be 
                                    done in a court case (usually by a specific time or in a specific way).
                                </p>                            
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyProtectionOrder">
                                <div class="checkbox-choices">Application About a Protection Order Form 12</div>
                                <p>
                                    When a family member makes another family member feel unsafe, this is called 
                                    <tooltip title="family violence" size="lg" index="0" />. A protection order is the order 
                                    made by a court to help protect one family member from another family member.
                                </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyPriorityParenting">
                                <div class="checkbox-choices">Application About a Priority Parenting Matter Form 15</div>
                                <p>
                                    <tooltip title="Priority parenting matters" size="xl" :index="0"/> are decisions about 
                                    a child or children that require the agreement of each of the child's guardians 
                                    or an order from the court and it is priority to get the order before, or 
                                    separate from, any family law matter order(s).
                                </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyChildReloc">
                                <div class="checkbox-choices">Application for Order Prohibiting the Relocation of a Child Form 16</div>
                                <p>
                                    If you have a written agreement or order about parenting arrangements for a 
                                    child and you are relocating with a child, the other party can apply to the 
                                    court to prohibit the relocation.
                                </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyAgreementEnfrc">
                                <div class="checkbox-choices">Application About Enforcement Form 29</div>
                                <p>
                                    The Provincial Court Family Rules include a range of enforcement options. 
                                    If you have a written agreement, <tooltip title="determination of a parenting coordinator"  size="md" :index="0"/>, 
                                    or court order that is not being followed, a party can ask the court to help enforce it. Orders about 
                                    enforcement also include setting <tooltip title="expenses" size="md" :index="0"/>, determining 
                                    <tooltip title="arrears" size="md" :index="0"/> and applying to set aside the registration of a foreign support order.
                                </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyFamilyMaintenanceEnfrc">
                                <div class="checkbox-choices">Application for Order Under the <i>Family Maintenance Enforcement Act</i> Form 35</div>
                                <p>
                                    The Family Maintenance Enforcement Act applies to the enforcement of child and spousal 
                                    support orders. If enforcement action has been taken under the Act, a party may have 
                                    challenged it.
                                </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="replyCounterApplication">
                                <div class="checkbox-choices">Reply to an Application About a Family Law Matter with Counter Application Form 6</div>
                                <p>
                                    As part of the Reply to an Application About a Family Law Matter, the other party may 
                                    have made a counter application for an order about any family law matter that was not 
                                    included in your application.
                                </p>
                            </b-form-checkbox>
                        </div>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
        </div>  

        <b-modal size="xl" v-model="preparationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">What you need to get started:</h1>
            </template>
            <div class="m-3">
                <p>Try to collect as much information as possible before you start to complete the pathway.</p>
                <p>The type of information and documents you need will depend on what you and the other party are asking the court for.</p>

                 <p>You will need:</p>
                <ul>
                    <li>
                        a copy of the other party’s Application about a Family Law Matter that you have been served with
                    </li>
                </ul>

                <p>You might need:</p>
                <ul>
                    <li>
                        birth dates, names, and other related information about the other party and your children
                    </li>
                    <li>
                        any agreements or court orders you already have about a family law matter
                    </li>                    
                    <li>
                        if you or the other party are asking for child or spousal support, information about 
                        your income and, if you have it, the other party’s income                       
                    </li>
                    <li>
                        if you or the other party are asking for orders about children, information about 
                        your children’s living arrangements, schedules and expenses                       
                    </li>
                </ul>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="closePreparationInfo">Continue</b-button>
            </template>            
        </b-modal>  

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import {resetProgressOfAllPages} from '@/components/utils/StepsAndPages/StepAndPageFunctions'
import { togglePages, toggleStep, toggleSteps} from '@/components/utils/TogglePages';
import {resetAllPathwaysCompeleted} from '@/components/utils/Pathways/PathwayFunctions'

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import Tooltip from "@/components/survey/Tooltip.vue";

@Component({
    components:{
        PageBase,
        Tooltip,
        LegalAssistanceFaq
    }
})
export default class ReplyToApplication extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.State
    public rejectedPathway!: boolean;

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void
  
    selected = []; 
    selectedReplyForms = [];  
    showLegalAssistance = false;   
    preparationInfo = false; 
  
    currentStep =0;
    currentPage =0;
    dataReady = false;

    mounted(){ 
        this.dataReady = false;   
        this.preparationInfo = false;     
        this.reloadPageInformation();
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.steps[0].result?.selectedReplyApplications) {
            this.selected = this.steps[0].result.selectedReplyApplications;
        }
        
        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);

        this.onChange(this.selected)

        this.dataReady = true;
    }
  
    public onChange(selectedReplyApplications) {
        
        const applicationTypes = []; 

        if (this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity?.includes('applyForOrder') && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms) {
            for (const form of this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms){                    
                applicationTypes.push(this.getApplicationType(form));
            }
        }

        for (const replyForm of selectedReplyApplications){                    
            applicationTypes.push(Vue.filter('getFullOrderName')(replyForm, ''));
        }
      
        this.UpdateApplicationType(Array.from(new Set(applicationTypes)));        
        this.setSteps(selectedReplyApplications);        

        resetAllPathwaysCompeleted();
        resetProgressOfAllPages([], [this.stPgNo.GETSTART._StepNo]);

    }

    public getApplicationType(selectedOrder){
        const step = this.steps[this.stPgNo.PO._StepNo]
        let orgFPOType = ''
        if (selectedOrder == 'protectionOrder' && step.result?.poQuestionnaireSurvey?.data?.orderType){
            orgFPOType = step.result.poQuestionnaireSurvey.data.orderType;
        } 

        return Vue.filter('getFullOrderName')(selectedOrder, orgFPOType);
    }

    public setSteps(selectedReplyApplications) {

        if (selectedReplyApplications !== undefined) {       
        
            const replyFlm = selectedReplyApplications.includes("replyFlm");
            const writtenResponse = selectedReplyApplications.includes("replyCaseMgmt") || 
                                    selectedReplyApplications.includes("replyProtectionOrder") || 
                                    selectedReplyApplications.includes("replyPriorityParenting") ||
                                    selectedReplyApplications.includes("replyChildReloc") || 
                                    selectedReplyApplications.includes("replyAgreementEnfrc") || 
                                    selectedReplyApplications.includes("replyFamilyMaintenanceEnfrc");
            const replyCounterApplication = selectedReplyApplications.includes("replyCounterApplication");
                       
            toggleStep(this.stPgNo.RFLM._StepNo, replyFlm);
            toggleStep(this.stPgNo.WR._StepNo, writtenResponse);
            toggleSteps([this.stPgNo.COMMON._StepNo, this.stPgNo.SUBMIT._StepNo], writtenResponse || replyFlm);
            toggleStep(this.stPgNo.CA._StepNo, replyCounterApplication);

            togglePages([this.stPgNo.COMMON.SafetyCheck, this.stPgNo.COMMON.YourInformation, this.stPgNo.COMMON.OtherPartyCommon, this.stPgNo.COMMON.FilingLocation], writtenResponse || replyFlm, this.stPgNo.COMMON._StepNo)

            this.selectedReplyForms =[];
            if(replyFlm) this.selectedReplyForms.push("replyFlm")
            if(writtenResponse) this.selectedReplyForms.push("writtenResponse")
            if(replyCounterApplication) this.selectedReplyForms.push("replyCounterApplication")
            this.UpdateCommonStepResults({data:{'selectedReplyForms':this.selectedReplyForms}})
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        if (this.selected.includes("replyFlm")){
            this.preparationInfo = true;
        } else {
            Vue.prototype.$UpdateGotoNextStepPage();
        }                     
    }

    public closePreparationInfo(){
        this.preparationInfo = false;
        Vue.prototype.$UpdateGotoNextStepPage();
    }
  
    beforeDestroy() {
        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedReplyApplications: this.selected}})
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
