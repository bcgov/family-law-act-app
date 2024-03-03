<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveParty()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { otherPartyInfoType, addressInfoType, contactInfoType, nameInfoType} from "@/types/Application/CommonInformation";
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/cash-assets-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepInfoType } from '@/types/Application';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component
export default class OtherPartyCommonSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    @applicationState.State
    public steps!: stepInfoType[];  

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    op = {} as otherPartyInfoType;

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    selectedForms = [];
    selectedReplyForms = [];

    cmOnly = false;
    wrIncluded = false;
    rflmIncluded = false;
    includesReplyPathway = false;
    includesApplyPathway = false;
    onlyFullNameRequired = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){
        this.survey.onComplete.add((sender, options) => {
            Vue.filter('surveyChanged')('allExPO')

            this.populateOpModel(sender.data);
            let id = sender.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.op);
            } else {
                this.$emit("editedData", { ...this.op, id });
                id = null;
            }
        });
    }
    
    public reloadPageInformation() {

        this.cmOnly = false;        
        this.wrIncluded = false;
        this.rflmIncluded = false;
       
        if (this.editRowProp != null) {
            this.populateFormWithPreExistingValues(this.editRowProp, this.survey);
        }

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));

        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('replyToApplication');

        this.selectedForms = (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms:[];
        this.selectedReplyForms = (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms:[];

        this.cmOnly = (this.selectedForms.length == 1 && this.selectedForms.includes("caseMgmt")); 

        this.wrIncluded = this.selectedReplyForms.includes("writtenResponse");
        this.rflmIncluded = this.selectedReplyForms.includes("replyFlm");
        
        
        this.includesReplyPathway = this.selectedReplyForms.length > 0;
        this.includesApplyPathway = this.selectedForms.length > 0;       
        
        if (this.includesApplyPathway){
            if (this.includesReplyPathway ){
                this.onlyFullNameRequired = this.cmOnly && (this.wrIncluded || this.rflmIncluded)
            } else {
                this.onlyFullNameRequired = this.cmOnly;
            }
        } else {
            this.onlyFullNameRequired = this.wrIncluded || this.rflmIncluded;
        }
        
        this.survey.setVariable("onlyFullNameRequired", this.onlyFullNameRequired);
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;     
    }
 
    public goBack() {
        this.$emit("showTable", true);
    }

    public saveParty() {
        this.survey.completeLastPage();
    }

    public populateOpModel(opData) {
        this.op.name = opData.OtherPartyName;       
        this.op.lawyer = opData.otherPartyLawyer;
        this.op.knowDob = opData.doYouKnowDOB;
        this.op.dob = opData.otherPartyDOB;
        this.op.opRelation = opData.relationWithOtherParty;
        this.op.livedTogether = opData.isMarriedWithOtherParty;
        this.op.dateOfLivedTogether = opData.dateOfMarriageLikeWithOtherParty;
        this.op.married = opData.isLegallyMarried;
        this.op.dateOfMarriage = opData.dateOfMarriage;
        this.op.separated = opData.isSeperatedOtherParty;
        this.op.dateSeparated = opData.dateOfSeparation;

        if(opData?.otherPartyAddress)
        {
            this.op.address = opData.otherPartyAddress;          
        }
        else
            this.op.address = {} as addressInfoType

        if(opData?.otherPartyContact)
        {
            this.op.contactInfo = opData.otherPartyContact;
        }
        else
            this.op.contactInfo = {} as contactInfoType
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        survey.data = {
            OtherPartyName: { first: editRowProp.name.first, middle: editRowProp.name.middle, last: editRowProp.name.last },
            otherPartyAddress: {
                street: editRowProp.address.street,
                city: editRowProp.address.city,
                state: editRowProp.address.state,
                country: editRowProp.address.country,
                postcode: editRowProp.address.postcode 
            },
            otherPartyContact: {
                phone: editRowProp.contactInfo.phone,
                fax: editRowProp.contactInfo.fax,
                email: editRowProp.contactInfo.email
            }
        };
        survey.setValue("otherPartyLawyer", editRowProp.lawyer);
        
        survey.setValue("doYouKnowDOB", editRowProp.knowDob);
        survey.setValue("otherPartyDOB", editRowProp.dob);
        survey.setValue("relationWithOtherParty", editRowProp.opRelation);
        survey.setValue("isMarriedWithOtherParty", editRowProp.livedTogether);
        survey.setValue("dateOfMarriageLikeWithOtherParty", editRowProp.dateOfLivedTogether);
        survey.setValue("isLegallyMarried", editRowProp.married);
        survey.setValue("dateOfMarriage", editRowProp.dateOfMarriage);
        survey.setValue("isSeperatedOtherParty", editRowProp.isSeperatedOtherParty);
        survey.setValue("dateOfSeparation", editRowProp.dateOfSeparation);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
