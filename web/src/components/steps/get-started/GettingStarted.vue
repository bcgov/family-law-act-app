<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div v-if="dataReady" class="row">
            <div class="col-md-12 order-heading">
                <div v-if="returningUser">
                    <h1 >I need help with the following family law issues:</h1>          
                    <p>Select all that apply.</p>
                </div>
                <div v-else>          
                    <h1 >What are you asking for (Orders)?</h1>
                    <p>Please select each option you want to ask the court for an order about. You will be asked to give more details later.</p>
                </div>
                <div>
                    <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                        <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                        <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                        <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                    </div>
                    <legal-assistance-faq v-if="showLegalAssistance"/>
                </div>
                <div>
                    <b-form-group>
                        <b-form-checkbox-group
                        v-model="selected"
                        @change="onChange"
                        name="orders"
                        stacked
                        >
                        <div class="checkbox-border">
                            <b-form-checkbox value="protectionOrder"><div class="checkbox-choices">Protection from family violence</div>
                            <p v-if="returningUser">
                                Applying for a protection order, to change an existing protection order or to terminate
                                an existing protection made under Part 9 of the Family Law Act.
                            </p>
                            <p v-else>
                                When a family member makes another family member feel unsafe, this is called <tooltip title="family violence" size="xl" index="0" />.
                                A protection order is the order made by a court to help protect one family member from another family member.
                            </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox :disabled="selectedReplyForms.includes('replyFlm')" value="familyLawMatter">  
                            <span v-if="returningUser"><div class="checkbox-choices">Family Law Matters including parenting arrangements, child support, contact with a 
                                child, guardianship of a child and spousal support under the <i>Family Law Act.</i></div>
                                <p>
                                Applying for an application for a new order, to change an order, or to cancel an order about
                                a Family Law Matter.
                                </p>
                            </span>
                            <span v-else><div class="checkbox-choices">Family law matter</div>
                                <p>
                                Family law matters include: parenting arrangements (<tooltip title="parental responsibilities" size="xl" :index="0"/> and <tooltip title="parenting time" :index="0"/>), <tooltip title="child support" :index="0"/>, <tooltip title="contact with a child" :index="0"/>, 
                                <tooltip title="guardianship of a child" index="0"/> and <tooltip title="spousal support" index="0" />.
                                </p>
                            </span>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="caseMgmt">
                            <div class="checkbox-choices">Case management</div>
                            <p>
                                Case management includes administrative or procedural things that need to be done in a court case (usually by a specific time or in a specific way).
                                Sometimes you need to get a case management order from the court to allow you to do something, or to make someone else do something so that you can continue the court case.
                            </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="priorityParenting">
                            <div class="checkbox-choices">Priority parenting matter</div>
                            <p>
                                <tooltip title="Priority parenting matters" size="xl" :index="0"/> are decisions about a child or children that require the agreement of each of the child's guardians or an order from the court and it is
                                priority to get the order before, or separate from, any family law matter order(s). There is a limited list of priority parenting matters. You can ask for other parenting matter orders you may need
                                under family law matters.
                            </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="childReloc">
                            <div class="checkbox-choices">Relocation of a child</div>
                            <p>
                                If you have a written agreement or order about parenting arrangements for a child and the other guardian is relocating with a child, you can apply to the court
                                to prohibit the relocation. If you do not have a written agreement or order about parenting arrangements you may need an order about a family law matter or priority
                                parenting matter depending on your circumstances to prevent changes to a child's residence.
                            </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="agreementEnfrc">
                            <div class="checkbox-choices">Enforcement</div>
                            <p>
                                The Provincial Court Family Rules include a range of enforcement options. 
                                If you have a written agreement, <tooltip title="determination of a parenting coordinator" :index="0"/>, 
                                or court order that the other party is not following, you can ask the court to help enforce it. 
                                Orders about enforcement also include setting <tooltip title="expenses" :index="0"/>, determining 
                                <tooltip title="arrears" :index="0"/> and applying to set aside the registration of a foreign support order.
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
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";

import {resetProgressOfAllPages} from '@/components/utils/StepsAndPages/StepAndPageFunctions'
import {stepInfoType, stepResultInfoType } from "@/types/Application";
import { toggleStep, togglePages } from '@/components/utils/TogglePages';
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
export default class GettingStarted extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
  
    selected = [];
    selectedReplyForms = [];
    returningUser = false
    showLegalAssistance = false;    

    currentStep =0;
    currentPage =0;
    dataReady = false;

    mounted(){ 
        this.dataReady = false;        
        this.reloadPageInformation();
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('replyToApplication');       

        if (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms) {
            this.selectedReplyForms = this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms;
        }

        if (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms) {
            this.selected = this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms;
            if (this.selectedReplyForms.includes("replyFlm")){
                const index = this.selected.indexOf('familyLawMatter');
                if (index != -1){
                    this.selected.splice(index, 1);
                }
            }
        }
        
        this.returningUser = (this.$store.state.Application.userType == 'returning');        

        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        
        this.onChange(this.selected)
        
        this.dataReady = true;
    }
  
    public onChange(selectedForms) {
        
        const applicationTypes = [];       
        
        if (this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity?.includes('replyToApplication') 
                && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyApplications){
            for (const replyForm of this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyApplications){                    
                applicationTypes.push(Vue.filter('getFullOrderName')(replyForm, ''));
            }
        } 

        for (const form of selectedForms){                    
            applicationTypes.push(this.getApplicationType(form));
        }
      
        this.UpdateApplicationType(Array.from(new Set(applicationTypes)));        
        this.setSteps(selectedForms);
        resetAllPathwaysCompeleted();
        resetProgressOfAllPages(selectedForms, [this.stPgNo.GETSTART._StepNo]);
    }

    public getApplicationType(selectedOrder){
        const step = this.steps[this.stPgNo.PO._StepNo]
        let orgFPOType = ''
        if (selectedOrder == 'protectionOrder' && step.result?.poQuestionnaireSurvey?.data?.orderType){
            orgFPOType = step.result.poQuestionnaireSurvey.data.orderType;
        } 

        return Vue.filter('getFullOrderName')(selectedOrder, orgFPOType);
    }

    public setSteps(selectedForms) {
        
       if (selectedForms !== undefined && this.selectedReplyForms !== undefined) {            
    
            const poOnly = (selectedForms.length == 1 && selectedForms.includes("protectionOrder"));
            const poIncluded = selectedForms.includes("protectionOrder"); 

            const wrIncluded = this.selectedReplyForms.includes("writtenResponse");
            const rflmIncluded = this.selectedReplyForms.includes("replyFlm");

            const flmIncluded = !rflmIncluded && selectedForms.includes("familyLawMatter");
            const cmIncluded = selectedForms.includes("caseMgmt");
            const ppmIncluded = selectedForms.includes("priorityParenting");
            const crIncluded = selectedForms.includes("childReloc");
            const aeIncluded = selectedForms.includes("agreementEnfrc");

            toggleStep(this.stPgNo.PO._StepNo,    poIncluded);
            toggleStep(this.stPgNo.FLM._StepNo,   flmIncluded);
            toggleStep(this.stPgNo.CM._StepNo,    cmIncluded);
            toggleStep(this.stPgNo.PPM._StepNo,   ppmIncluded);
            toggleStep(this.stPgNo.CONNECT._StepNo, false);
            toggleStep(this.stPgNo.RELOC._StepNo, crIncluded);
            toggleStep(this.stPgNo.ENFRC._StepNo, aeIncluded);

            toggleStep(this.stPgNo.SUBMIT._StepNo, (selectedForms.length>0 || wrIncluded || rflmIncluded));//Review And Submit
            
            toggleStep(this.stPgNo.COMMON._StepNo, wrIncluded || rflmIncluded || flmIncluded || ppmIncluded || crIncluded || cmIncluded || aeIncluded);//Common Your Information
            togglePages([this.stPgNo.COMMON.SafetyCheck], !poIncluded, this.stPgNo.COMMON._StepNo);//Safety Check
            togglePages([this.stPgNo.COMMON.Notice], ppmIncluded, this.stPgNo.COMMON._StepNo);//Notice
            togglePages([this.stPgNo.GETSTART.FlmInfo], flmIncluded, this.stPgNo.GETSTART._StepNo);//Flm Info
            
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.COMMON._StepNo, currentPage: (poIncluded? this.stPgNo.COMMON.YourInformation:this.stPgNo.COMMON.SafetyCheck) });//correct Safety Check page in sidebar
            togglePages([this.stPgNo.COMMON.YourInformation, this.stPgNo.COMMON.OtherPartyCommon, this.stPgNo.COMMON.FilingLocation], (selectedForms.length>0 && !poOnly) || wrIncluded || rflmIncluded, this.stPgNo.COMMON._StepNo);//Your Information, Other Party, Filing Location    
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 
        Vue.prototype.$UpdateGotoNextStepPage();
    }    
  
    beforeDestroy() {
        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedForms: this.selected}})
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
