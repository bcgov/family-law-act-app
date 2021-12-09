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
                                When a family member makes another family member feel unsafe, this is called <tooltip title="family violence" index="0" />.
                                A protection order is the order made by a court to help protect one family member from another family member.
                            </p>
                            </b-form-checkbox>
                        </div>

                        <div class="checkbox-border">
                            <b-form-checkbox value="familyLawMatter">  
                            <span v-if="returningUser"><div class="checkbox-choices">Family Law Matters including parenting arrangements, child support, contact with a 
                                child, guardianship of a child and spousal support under the <i>Family Law Act.</i></div>
                                <p>
                                Applying for an application for a new order, to change an order, or to cancel an order about
                                a Family Law Matter.
                                </p>
                            </span>
                            <span v-else><div class="checkbox-choices">Family law matter</div>
                                <p>
                                Family law matters include: parenting arrangements (<tooltip title="parental responsibilities" :index="0"/> and <tooltip title="parenting time" :index="0"/>), <tooltip title="child support" :index="0"/>, <tooltip title="contact with a child" :index="0"/>, 
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
                                <tooltip title="Priority parenting matters" :index="0"/> are decisions about a child or children that require the agreement of each of the child's guardians or an order from the court and it is
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

        <b-modal size="xl" v-model="preparationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">What you need to get started:</h1>
            </template>
            <div class="m-3">
                <p>Try to collect as much information as possible before you start to complete the pathway.</p>
                <p>The type of information and documents you need will depend on what you are asking the court for.</p>
                <p>You might need:</p>
                <ul>
                    <li>
                        birth dates, names, and other related information about the other party and your children
                    </li>
                    <li>
                        any agreements or court orders you already have about a family law matter
                    </li>
                    <li>
                        information about the date you got married, started living together, separated and got divorced, if applicable                       
                    </li>
                    <li>
                        if you are asking for child or spousal support, information about your income and, if you have it, the other party’s income                       
                    </li>
                    <li>
                        if you are asking for orders about children, information about your children’s living arrangements, schedules and expenses                       
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
  
    selected = []
    returningUser = false
    showLegalAssistance = false
    preparationInfo = false

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

        if (this.steps[0].result?.selectedForms) {
            this.selected = this.steps[0].result.selectedForms;
        }
        
        this.returningUser = (this.$store.state.Application.userType == 'returning');        

        const progress = this.selected.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        
        this.onChange(this.selected)
        
        this.dataReady = true;
    }
  
    public onChange(selectedForms) {
        
        const applicationTypes = [];       
        
        if (this.steps[0].result?.selectedActivity?.includes('replyToApplication') && this.steps[0].result?.selectedReplyApplications){
            for (const replyForm of this.steps[0].result?.selectedReplyApplications){                    
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
        
       if (selectedForms !== undefined) {            
    
            const poOnly = (selectedForms.length == 1 && selectedForms.includes("protectionOrder"));
            const poIncluded = selectedForms.includes("protectionOrder");           

            toggleStep(this.stPgNo.PO._StepNo,    selectedForms.includes("protectionOrder"));
            toggleStep(this.stPgNo.FLM._StepNo,   selectedForms.includes("familyLawMatter"));
            toggleStep(this.stPgNo.CM._StepNo,    selectedForms.includes("caseMgmt"));
            toggleStep(this.stPgNo.PPM._StepNo,   selectedForms.includes("priorityParenting"));
            toggleStep(this.stPgNo.CONNECT._StepNo, false);
            toggleStep(this.stPgNo.RELOC._StepNo, selectedForms.includes("childReloc"));
            toggleStep(this.stPgNo.ENFRC._StepNo, selectedForms.includes("agreementEnfrc"));

            toggleStep(this.stPgNo.SUBMIT._StepNo, selectedForms.length>0);//Review And Submit
            
            toggleStep(this.stPgNo.COMMON._StepNo, selectedForms.includes("familyLawMatter") || selectedForms.includes("priorityParenting") || selectedForms.includes("childReloc") || selectedForms.includes("caseMgmt") || selectedForms.includes("agreementEnfrc"));//Common Your Information
            togglePages([this.stPgNo.COMMON.SafetyCheck], !poIncluded, this.stPgNo.COMMON._StepNo);//Safety Check
            togglePages([this.stPgNo.COMMON.Notice], selectedForms.includes("priorityParenting"), this.stPgNo.COMMON._StepNo);//Notice
            
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.COMMON._StepNo, currentPage: (poIncluded? this.stPgNo.COMMON.YourInformation:this.stPgNo.COMMON.SafetyCheck) });//correct Safety Check page in sidebar
            togglePages([this.stPgNo.COMMON.YourInformation, this.stPgNo.COMMON.OtherPartyCommon, this.stPgNo.COMMON.FilingLocation], selectedForms.length>0 && !poOnly, this.stPgNo.COMMON._StepNo);//Your Information, Other Party, Filing Location    
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 

        if (this.selected.includes("familyLawMatter")){
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
