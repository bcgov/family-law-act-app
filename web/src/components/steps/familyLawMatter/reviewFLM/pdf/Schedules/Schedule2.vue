<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 2 – PARENTING ORDER/ AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b> This is Schedule 2 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel all or part of an existing final order about parenting arrangements, or to set aside or replace all or part of an agreement about parenting arrangements, of the child or children identified in section 11 of this application.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                I am:
                <div style="margin-left:1rem;">
                    <check-box style="" :check="result.parentingOrderAgreementSurvey.guardianApplicant == 'y'?'yes':''" text="a guardian of the child(ren)"/>
                    <check-box style="width:120%;" :check="result.parentingOrderAgreementSurvey.applyingGuardianApplicant == 'y'?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about parenting arrangements"/>
                <underline-form v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="result.aboutParentingArrangementsSurvey.orderDate | beautify-date"/>
                <underline-form v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="result.aboutParentingArrangementsSurvey.agreementDate | beautify-date"/>
            
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder'?'yes':''" text="I am applying for the existing final order to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.orderDifferenceType == 'changeOrder')?'yes':''" text="changed"/>
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.orderDifferenceType == 'cancelOrder')?'yes':''" text="cancelled"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">Since the final order was made, needs or circumstances have changed as follows:</div>
                    
                        <div v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.changesSinceOrder" 
                        class="answerbox">{{result.aboutParentingArrangementsSurvey.changesSinceOrder}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    
                    
                    </div>                
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement'?'yes':''" text="I am applying for all or part of the existing agreement to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'setAsideAgreement')?'yes':''" text="set aside"/>
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'replacedAgreement')?'yes':''" text="replaced"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">I believe the agreement is not in the best interests of the child(ren) because:</div>
                        <div v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.changesSinceAgreement" 
                        class="answerbox">{{result.aboutParentingArrangementsSurvey.changesSinceAgreement}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    </div>                
                </section>
            </div>
        
            <div class="print-block">        
                <div style="margin-top:3rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parental responsibilities. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentResp.applying?'yes':''" text="I am applying for the parental responsibilities (who makes certain decisions about a child) to be changed or replaced as follows:"/>
                    </div>
                    <div v-if="exParentArrInfo.parentResp.applying && exParentArrInfo.parentResp.desc" 
                        class="answerbox">{{exParentArrInfo.parentResp.desc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </section>
            </div>

            <div style="margin-top:3rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentTime.applying?'yes':''" text="I am applying for the parenting time schedule to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentTime.applying && exParentArrInfo.parentTime.desc" 
                        class="answerbox">{{exParentArrInfo.parentTime.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to conditions on parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentCond.applying?'yes':''" text="I am applying for the conditions on my parenting time or the other guardian’s parenting time to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentCond.applying && exParentArrInfo.parentCond.desc" 
                        class="answerbox">{{exParentArrInfo.parentCond.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to other parenting arrangements. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentalArr.applying?'yes':''" text="I am applying for the other order term(s) about parenting arrangements to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentalArr.applying && exParentArrInfo.parentalArr.desc" 
                        class="answerbox">{{exParentArrInfo.parentalArr.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Best interests of child</b></div>
<!-- <9> -->
                <section>
                    <div style="display:inline; margin-left:0.25rem">
                        I believe the order I am applying for is in the child(ren)’s best interests because:
                    </div>
                    <div v-if="exParentArrInfo.childBestInterest" 
                        class="answerbox">{{exParentArrInfo.childBestInterest}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';
import { nameInfoType } from '@/types/Application';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Form3 extends Vue {

    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false;
    aboutChildren = false;

    otherPartyInfo=[];
    yourInformationSurvey;

    applicantList = []

    selectedSchedules = []
    existingOrders = {}
    relationshipBetweenParties = {}
    childrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    culturalInfo = '';
    parentArrInfo = {}
    exParentArrInfo = {}
    chSupInfo = {}
    exChSupInfo = {}
    chContInfo = {}
    exChContInfo = {}
    guardInfo = {}
    spsSupInfo = {}
   
    mounted(){
        this.dataReady = false;
        this.result = this.getFLMResultData();
        this.extractInfo();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }
   
    childrenFields=[
        {key:"fullName",       label:"Child's full legal name",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",        label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship", label:"My relationship to the child",           tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship",   label:"Other party's relationship to the child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",     label:"Child is currently living with",         tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]

    sharingAdultItem = [{name:'', dob:'', relation:''}]
    sharingAdultFields = [
        {key:"name",     label:"Full name",                                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Date of birth (mmm/dd/yyyy)",              tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Relationship to other protected person(s)",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:20%;"},
    ]

    over19ChildSupportDetails =[{name:'', reasonForSupport:{illness:false, disability:false, student:false}}]
    childrenSupportFields = [
        {key:"name",             label:"Full name of child",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"reasonForSupport", label:"Reason for child support", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ]

    childrenSupportExpenseItem =[
        {name:'Special and Extraordinary Expense', amount1:"Annual Amount", amount2:"Annual Amount", amount3:"Annual Amount", amount4:"Annual Amount"},
        {name:'Child care expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Portion of medical/dental premiums attributable to child', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Health related expenses that exceed insurance reimbursement by at least $100', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Extraordinary expenses for primary or secondary school', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Post-secondary school expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Extraordinary extracurricular activities expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Total', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
    ]
    childrenSupportExpenseFields = [
        {key:"name",    label:"Name of Child:", tdClass:"border-top-0 align-middle", thClass:"text-right border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"},
        {key:"amount1", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount2", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount3", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount4", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        
    ]

    // childrenGuardianshipItem = [
    //     {gaurdianName:'', childName:'', gaurdianSince:''}
    // ]
    childrenGuardianshipFields = [
        {key:"guardianName",  label:"Full name of guardian",                                tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"childName",     label:"Name of child(ren)",                                   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"guardianSince", label:"They have been a guardian of the child(ren) since:",   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:25%;"},
    ]

    public extractInfo(){
        if(this.result.protectionWhomSurvey && this.result.protectionWhomSurvey.ApplicantNeedsProtection== "y"){            
            if(this.result.protectionWhomSurvey.anotherAdultSharingResi=='y'){
                this.sharingAdultItem = [];
                for(const sharingAdult of this.result.protectionWhomSurvey.allAnotherAdultsSharingResi){
                    this.sharingAdultItem.push({
                        name:Vue.filter('getFullName')(sharingAdult.anotherAdultSharingResiName), 
                        dob:Vue.filter('beautify-date')(sharingAdult.anotheradultSharingResiDOB), 
                        relation:sharingAdult.anotherAdultSharingResiRelation
                    })
                }
            }
        }

        this.selectedSchedules = this.getSchedulesInfo();
        this.existingOrders = this.getExistingOrdersInfo();
        this.relationshipBetweenParties = this.getRelationshipBetweenPartiesInfo();
        if (this.result.childData && this.result.childData.length > 0){
            this.aboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.childBestInterestAcknowledgement;            
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [];
            this.childBestInterestAcknowledmentCheck = false;
        }

        if (this.result.flmBackgroundSurvey.culturalExplain) {
            this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        }

        if (this.selectedSchedules.includes('schedule1')){
            this.parentArrInfo = this.getParentingArrangementsInfo();
        }

        if (this.selectedSchedules.includes('schedule2')){
            this.exParentArrInfo = this.getExistingParentingArrangementsInfo();
        }

        if (this.selectedSchedules.includes('schedule3')){
            this.chSupInfo = this.getNewChildSupportInfo();
        }

        if (this.selectedSchedules.includes('schedule4')){
            this.exChSupInfo = this.getExistingChildSupportInfo();
        }

        if (this.selectedSchedules.includes('schedule5')){
            this.chContInfo = this.getNewChildContactInfo();
        }

        if (this.selectedSchedules.includes('schedule6')){
            this.exChContInfo = this.getExistingChildContactInfo();
        }

        if (this.selectedSchedules.includes('schedule7') || this.selectedSchedules.includes('schedule8')){
            this.guardInfo = this.getGuardianshipOfChildInfo(this.selectedSchedules.includes('schedule7'), this.selectedSchedules.includes('schedule8'));
        } 
        
        if (this.selectedSchedules.includes('schedule9')){
            this.spsSupInfo = this.getNewSpousalSupportInfo();
        }

        if (this.selectedSchedules.includes('schedule10')){
            this.spsSupInfo = this.getExistingSpousalSupportInfo();
        }
        
        this.otherPartyInfo=this.getOtherPartyInfo()
        this.yourInformationSurvey = this.getYourInfo()
        //console.log(this.yourInformationSurvey)

    }

    public getRelationshipBetweenPartiesInfo(){

        let relationshipInfo = {description: '', spouses:false, startDate: '', marriageDate: '', separationDate: ''};
        relationshipInfo.description = this.result.flmBackgroundSurvey.howPartiesRelated;
        relationshipInfo.spouses = this.result.flmBackgroundSurvey.werePOPartiesMarried == 'y';
        if (relationshipInfo.spouses){
            relationshipInfo.startDate = this.result.flmBackgroundSurvey.liveTogetherPODate;
            relationshipInfo.marriageDate = this.result.flmBackgroundSurvey.dateOfMarriagePO;
            relationshipInfo.separationDate = this.result.flmBackgroundSurvey.separationDate;
        }
        return relationshipInfo;
    }

    public getParentingArrangementsInfo(){
        let parentingArrangements = {parentResp: {}, parentTime: {}, parentalArr: {}, childBestInterest: ''};

        if (this.result.parentalResponsibilitiesSurvey.parentalResponsibilitiesOrder == 'y'){
            parentingArrangements.parentResp = {
                applying: true,
                allResp: this.result.parentalResponsibilitiesSurvey.allResponsibilitiesOrder == 'y',
                children: this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities,
                allKids: this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities.length == this.childrenInfo.length,
                expl: this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities? this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities:''
            }

        } else {
            parentingArrangements.parentResp = {
                applying: false
            }
        }

        if (this.result.parentingTimeSurvey.parentingTimeOrder == 'y'){
            const parentingTime = this.result.parentingTimeSurvey
            parentingArrangements.parentTime = {
                applying: true,
                desired: parentingTime.applicantDesiredParentingTime,
                conditionMe: parentingTime.conditionedApplicantParentingTime == 'y',
                myConditions: (parentingTime.conditionedApplicantParentingTime == 'y')? parentingTime.ApplicantParentingTimeConditions:'',
                conditionOp: parentingTime.conditionedRespondentParentingTime == 'y',
                opConditions: (parentingTime.conditionedRespondentParentingTime == 'y')?parentingTime.RespondentParentingTimeConditions:'',
                opDesired: parentingTime.respondentDesiredParentingTime
            }

        } else {
            parentingArrangements.parentTime = {
                applying: false
            }
        }

        if (this.result.parentalArrangementsSurvey.parentalArrangements == 'y'){
            const parentalArrangements = this.result.parentalArrangementsSurvey
            parentingArrangements.parentalArr = {
                applying: true,
                desc: parentalArrangements.parentalArrangementsDescription                
            }
        } else {
            parentingArrangements.parentalArr = {
                applying: false
            }
        }
        
        if (this.result.bestInterestOfChildSurvey 
            && this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription){
                parentingArrangements.childBestInterest = this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription

        } else {
            console.log('here')
            parentingArrangements.childBestInterest = '';
        }

        //console.log(parentingArrangements)

        return parentingArrangements;
    }

    public getExistingParentingArrangementsInfo(){
        let existingParentingArrangements = {parentResp: {}, parentTime: {}, parentCond:{}, parentalArr: {}, childBestInterest: ''};

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentalResponsibilities")){
            existingParentingArrangements.parentResp = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription:''
            }

        } else {
            existingParentingArrangements.parentResp = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentingTime")){
            existingParentingArrangements.parentTime = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
            }

        } else {
            existingParentingArrangements.parentTime = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("conditionsOnParentingTime")){
            existingParentingArrangements.parentCond = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
            }

        } else {
            existingParentingArrangements.parentCond = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("otherTermsAboutParentingArrangements")){
            existingParentingArrangements.parentalArr = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription:''
            }

        } else {
            existingParentingArrangements.parentalArr = {
                applying: false
            }
        }         
        
        if (this.result.bestInterestOfChildSurvey 
            && this.result.bestInterestOfChildSurvey.existingParentingArrangementsChildBestInterestDescription){
                existingParentingArrangements.childBestInterest = this.result.bestInterestOfChildSurvey.existingParentingArrangementsChildBestInterestDescription;
        } else {            
            existingParentingArrangements.childBestInterest = '';
        }
        //console.log(parentingArrangements)
        return existingParentingArrangements;
    }

    public getNewChildSupportInfo(){
        console.log(this.result)
        let newChildSupportInfo = {appType: {}, opType: {}, currCond:{}, opInfo: {}, desiredSup: {}, calc:{}, ndHard:{}, specExp: {}, finStmnt:{}};

        if (this.result.childSupportSurvey.applicantGuardianType){
            newChildSupportInfo.appType = {
                guardian: this.result.childSupportSurvey.applicantGuardianType == 'parentGuardian',
                standing: this.result.childSupportSurvey.applicantGuardianType == 'appointedGuardian',
                other: this.result.childSupportSurvey.applicantGuardianType == 'other',
                otherCom: (this.result.childSupportSurvey.applicantGuardianType == 'other' && this.result.childSupportSurvey.applicantGuardianTypeComment)? this.result.childSupportSurvey.applicantGuardianTypeComment: ''
            }
        }

        if (this.result.childSupportSurvey['otherParty[0]GuardianType']){
            newChildSupportInfo.opType = {
                guardian: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'parentGuardian',
                standing: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'appointedGuardian',
                other: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other',
                otherCom: (this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other' && this.result.childSupportSurvey['otherParty[0]GuardianTypeComment'])? this.result.childSupportSurvey['otherParty[0]GuardianTypeComment']: ''
            }
        }

        if (this.result.childSupportCurrentArrangementSurvey){
            newChildSupportInfo.currCond = {
                splitShared: (this.result.childSupportCurrentArrangementSurvey.applicantTimeType == 'y'),                
                timeDesc: (this.result.childSupportCurrentArrangementSurvey.applicantTimeWithChildExplanation)? this.result.childSupportCurrentArrangementSurvey.applicantTimeWithChildExplanation: '',
                supArr: (this.result.childSupportCurrentArrangementSurvey.currentArrangmentExplanation)? this.result.childSupportCurrentArrangementSurvey.currentArrangmentExplanation: ''
            }
        }

        if (this.result.childSupportIncomeEarningSurvey){
            newChildSupportInfo.opInfo = {  
                facts: this.result.childSupportIncomeEarningSurvey.knowFacts == 'y',
                income: this.result.childSupportIncomeEarningSurvey.knowIncome == 'y',              
                factsDesc: (this.result.childSupportIncomeEarningSurvey.knowFacts == 'y' && this.result.childSupportIncomeEarningSurvey.factsExplanation)? this.result.childSupportIncomeEarningSurvey.factsExplanation: '',
                incomeAmt: (this.result.childSupportIncomeEarningSurvey.knowIncome == 'y' && this.result.childSupportIncomeEarningSurvey.incomeAmount)? this.result.childSupportIncomeEarningSurvey.incomeAmount: ''
            }
        }

        if (this.result.aboutChildSupportOrderSurvey){
            newChildSupportInfo.desiredSup = {  
                payor: this.result.aboutChildSupportOrderSurvey.listOfSupportPayors.toString(),
                applicantPayor: (this.result.aboutChildSupportOrderSurvey.listOfSupportPayors)?this.result.aboutChildSupportOrderSurvey.listOfSupportPayors.includes(Vue.filter('getFullName')(this.applicantName)):'',
                payees: this.result.aboutChildSupportOrderSurvey.selectedChildrenNames.toString(),              
                over19: (this.result.aboutChildSupportOrderSurvey.supportChildOver19 == 'y'),
                payorErnsHigh:( this.result.aboutChildSupportOrderSurvey.payorEarnsHigh == 'yes'),
                startDate: this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDate,
                reason: (this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDateWhy)? this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDateWhy: ''
            }
            this.over19ChildSupportDetails = (this.result.aboutChildSupportOrderSurvey.supportChildOver19 == 'y')?this.result.aboutChildSupportOrderSurvey.over19Details:[]            
        }        

        if (this.result.calculatingChildSupportSurvey){
            newChildSupportInfo.calc = {                
                attch: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
            }
        }

        if (this.result.undueHardshipSurvey){
            newChildSupportInfo.ndHard = {                
                change: (this.result.undueHardshipSurvey.changeAmount == 'y'),
                reasons: (this.result.undueHardshipSurvey.changeAmount == 'y' && this.result.undueHardshipSurvey.hardshipReasons)? {
                    excessive: this.result.undueHardshipSurvey.hardshipReasons.includes("excessive amount of debt"), 
                    high: this.result.undueHardshipSurvey.hardshipReasons.includes("high expenses"), 
                    another: this.result.undueHardshipSurvey.hardshipReasons.includes("support another person"), 
                    dependent:this.result.undueHardshipSurvey.hardshipReasons.includes("support a dependent child"), 
                    other: this.result.undueHardshipSurvey.hardshipReasons.includes("other")
                }: {excessive: false, high: false, another: false, dependent:false, other: false},
                otherCom: (this.result.undueHardshipSurvey.changeAmount == 'y' 
                    && this.result.undueHardshipSurvey.hardshipReasons
                    && this.result.undueHardshipSurvey.hardshipReasons.includes("other") 
                    && this.result.undueHardshipSurvey.hardshipReasonsComment)? this.result.undueHardshipSurvey.hardshipReasonsComment:'',
            }
        }

        if (this.result.specialAndExtraordinaryExpensesSurvey){
            newChildSupportInfo.specExp = {                
                applying: (this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y'),
                expenseItems: (this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y' && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem)? {}: {}
            }
        }

        //TODO: add field for 'party has been acting ...', not able to complete it at this time
        newChildSupportInfo.finStmnt = {
            required: (newChildSupportInfo.desiredSup['applicantPayor'] ||
                    newChildSupportInfo.desiredSup['over19'] ||
                    newChildSupportInfo.desiredSup['payorErnsHigh'] ||
                    newChildSupportInfo.currCond['splitShared'] ||
                    newChildSupportInfo.specExp['applying'] ||
                    newChildSupportInfo.ndHard['change'])

        }

        return newChildSupportInfo;
    }

    public getExistingChildSupportInfo(){
        let existingChildSupportInfo = {
            abtEx: {
                payor: false,
                payee: false,
                other: false,
                otherComm: '',
                orderDate: '',
                exstngOrdr: false,
                fldDrctr: false,
                cancelOrdr: false,
                changeOrdr: false,
                changeList: [],
                changes:{
                    myfin: false,
                    opfin: false,
                    spcl: false,
                    lvng: false,
                    newInfo: false,
                    other: false
                },
                newInfo: '',
                expChangeInfo: '',
                lvngChangeInfo:'',
                otherInfo: '',
                exstngAgrmnt: false,
                setAsideAgrmnt: false,
                replaceAgrmnt: false,
                changesSinceAgrmnt: ''  
            }, 
            abtOrg: {
                newOrderDesc: '',
                startDate: '',
                startReason: '',
                situationList: [],
                situation: {
                    payor: false,
                    split: false,
                    over19: false,
                    partyParentOfOther: false,
                    payorEarnsHigh: false,
                    specialClaim: false,
                    undueHardship: false,
                    none:false
                }
            }, 
            unpdChSup: {}, 
            calc:{}, 
            strtPy:{}, 
            finStmnt:{}
        };

        console.log(this.result)

        if (this.result.aboutExistingChildSupportSurvey){
            const orderChangeList = (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.length>0)? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList:[];
                
            existingChildSupportInfo.abtEx = {                
                payor: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payor'),
                payee: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payee'),
                other: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other'),
                otherComm: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other' && this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment)? this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment:'',
                orderDate: Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate),
                exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
                fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
                cancelOrdr:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
                changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
                changeList: orderChangeList,
                changes:{
                    myfin: orderChangeList.includes('My financial situation has changed'),
                    opfin: orderChangeList.includes('I believe the other party’s financial situation has changed'),
                    spcl: orderChangeList.includes('The `special and extraordinary expenses` have changed'),
                    lvng: orderChangeList.includes('The living arrangements for a child have changed'),
                    newInfo: orderChangeList.includes('Information has become available that was not available when the order was made'),
                    other: orderChangeList.includes('Other changes or circumstances')
                },
                newInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Information has become available that was not available when the order was made') && this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder)?this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder:'',
                expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The `special and extraordinary expenses` have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
                lvngChangeInfo:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The living arrangements for a child have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
                otherInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Other changes or circumstances') && this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder)?this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder:'',
                exstngAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
                setAsideAgrmnt:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
                replaceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
                changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement)?this.result.aboutExistingChildSupportSurvey.changesSinceAgreement:''
            }
        }

        if (this.result.aboutChildSupportChangesSurvey){
            const orgSituationList = ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.listOfSituations)?this.result.aboutChildSupportChangesSurvey.listOfSituations:[]
            existingChildSupportInfo.abtOrg = {                
                newOrderDesc: (existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr'])?this.result.aboutChildSupportChangesSurvey.orderDescription:'',
                startDate: ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.orderStartingDate)?this.result.aboutChildSupportChangesSurvey.orderStartingDate:'',
                startReason: ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.orderStartDateReason)?this.result.aboutChildSupportChangesSurvey.orderStartDateReason:'',
                situationList: orgSituationList,                    
                situation: {
                    payor: orgSituationList.includes('I am required to pay child support'),
                    split: orgSituationList.includes('There is `split` or `shared` parenting time'),
                    over19: orgSituationList.includes('There is a child 19 years or older for who support is for'),
                    partyParentOfOther: orgSituationList.includes('A party has been acting as a parent to a child of the other party, for example a step-parent'),
                    payorEarnsHigh: orgSituationList.includes('The paying parent earns more than $150,000 per year'),
                    specialClaim: orgSituationList.includes('There is a claim for `special and extraordinary expenses` for a child'),
                    undueHardship: orgSituationList.includes('I am claiming `undue hardship`'),
                    none: orgSituationList.includes('None of the above apply to my situation')
                }
            }
        }

        if (this.result.unpaidChildSupportSurvey){
            existingChildSupportInfo.unpdChSup = {
                crntDate: moment().format("MMM DD, yyyy"),   
                unpaid: this.result.unpaidChildSupportSurvey.unpaid == 'y',
                reduce: this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y',
                reduceAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y')?this.result.unpaidChildSupportSurvey.reduceAmount:'',
                whyReduceAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y')?this.result.unpaidChildSupportSurvey.whyReduceAmount:'',
                paySchd: (this.result.unpaidChildSupportSurvey.unpaid == 'y')?this.result.unpaidChildSupportSurvey.paymentSchedule:'',
                monthlyAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.paymentSchedule == 'monthly')? this.result.unpaidChildSupportSurvey.monthlyAmount:'',
                amnt: (this.result.unpaidChildSupportSurvey.unpaid == 'y')?this.result.unpaidChildSupportSurvey.unPaidAmount:0, 
                otherComm: (this.result.unpaidChildSupportSurvey.unpaid == 'y') && (this.result.unpaidChildSupportSurvey.paymentSchedule == 'other')? this.result.unpaidChildSupportSurvey.paymentScheduleComment:''       
            }
        }

        if (this.result.calculatingChildSupportSurvey){
            existingChildSupportInfo.calc = {   
                attaching: this.result.calculatingChildSupportSurvey.attachingCalculations == 'y',
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
            }
        }

        return existingChildSupportInfo;
    }

    public getNewChildContactInfo(){

        let newChildContactInfo = {
            guardian: true, 
            abt: {
                conChList: [],
                conType: {
                    inPerson: false,
                    tel: false,
                    video: false,
                    written:false,
                    other: false
                },
                inPrsn: '',
                otherComm: '',
                cond: '',
                lastCont: ''

            }, 
            bstIntrst:''
        };

        console.log(this.result)

        if (this.result.contactWithChildSurvey){
            newChildContactInfo.guardian = this.result.contactWithChildSurvey.parentGuardianApplicant == 'y';
        }

        if (this.result.aboutContactWithChildSurvey){
            const contactChoices = this.result.aboutContactWithChildSurvey.contactTypeChoices?this.result.aboutContactWithChildSurvey.contactTypeChoices:[];
            newChildContactInfo.abt = {
                conChList: this.result.aboutContactWithChildSurvey.childrenRequireContactChoices,
                conType: {
                    inPerson: contactChoices.includes('In person'),
                    tel: contactChoices.includes('Telephone communication'),
                    video: contactChoices.includes('Video communication'),
                    written:contactChoices.includes('Written communication'),
                    other: contactChoices.includes('other')
                },
                inPrsn: (this.result.aboutContactWithChildSurvey.contactTypeChoices.includes('In person'))? this.result.aboutContactWithChildSurvey.inPersonDetails:'',
                otherComm: (this.result.aboutContactWithChildSurvey.contactTypeChoices.includes('other'))? this.result.aboutContactWithChildSurvey.contactTypeChoicesComment:'',
                cond: (this.result.aboutContactWithChildSurvey.placeConditions == 'y')? this.result.aboutContactWithChildSurvey.conditionsDescription:'',
                lastCont: (this.result.aboutContactWithChildSurvey.lastContactDate)?Vue.filter('beautify-date')(this.result.aboutContactWithChildSurvey.lastContactDate):''
            }
        }

        if (this.result.contactWithChildBestInterestOfChildSurvey){
            newChildContactInfo.bstIntrst = this.result.contactWithChildBestInterestOfChildSurvey.newChildBestInterestDescription;
        }

        return newChildContactInfo;
    }

    public getExistingChildContactInfo(){

        let existingChildContactInfo = {
            guardian: true, 
            date: '', 
            order: true, 
            abtExOrdr: {
                change: '',
                ordrdiff: ''
            }, 
            abtExAgrmnt: {
                change: '',
                agrmntdiff: ''
            }, 
            abt:{
                
                conChList: [],
                conType: {
                    inPerson: false,
                    tel: false,
                    video: false,
                    written:false,
                    other: false
                },
                inPrsn: '',
                otherComm: '',
                cond: ''
            
            }, 
            bstIntrst:''
        };
        console.log(this.result)

        if (this.result.contactOrderSurvey){
            existingChildContactInfo.guardian = this.result.contactOrderSurvey.roleType != 'allowedContact';
            if (this.result.contactOrderSurvey.existingType == "ExistingOrder"){
                existingChildContactInfo.date = Vue.filter('beautify-date')(this.result.contactOrderSurvey.orderDate);
                existingChildContactInfo.order = true;
                existingChildContactInfo.abtExOrdr = {
                    change: this.result.contactOrderSurvey.changesSinceOrder,
                    ordrdiff: this.result.contactOrderSurvey.orderDifferenceType                    
                }
                existingChildContactInfo.abtExAgrmnt = {
                    change: '',
                    agrmntdiff: ''
                }
            } else if (this.result.contactOrderSurvey.existingType == "ExistingAgreement") {
                existingChildContactInfo.order = false;
                existingChildContactInfo.date = Vue.filter('beautify-date')(this.result.contactOrderSurvey.agreementDate);                
                existingChildContactInfo.abtExAgrmnt = {                    
                    change: this.result.contactOrderSurvey.changesSinceAgreement,
                    agrmntdiff: this.result.contactOrderSurvey.agreementDifferenceType                   
                }
                existingChildContactInfo.abtExOrdr = {
                    change: '',
                    ordrdiff: ''
                }
            }            
        }

        if (this.result.aboutContactWithChildSurvey){
            const contactChoices = this.result.aboutContactWithChildSurvey.contactTypeChoices?this.result.aboutContactWithChildSurvey.contactTypeChoices:[];
            existingChildContactInfo.abt = {
                conChList: this.result.aboutContactWithChildSurvey.childrenRequireContactChoices,
                conType: {
                    inPerson: contactChoices.includes('In person'),
                    tel: contactChoices.includes('Telephone communication'),
                    video: contactChoices.includes('Video communication'),
                    written:contactChoices.includes('Written communication'),
                    other: contactChoices.includes('other')
                },
                inPrsn: (this.result.aboutContactWithChildSurvey.contactTypeChoices.includes('In person'))? this.result.aboutContactWithChildSurvey.inPersonDetails:'',
                otherComm: (this.result.aboutContactWithChildSurvey.contactTypeChoices.includes('other'))? this.result.aboutContactWithChildSurvey.contactTypeChoicesComment:'',
                cond: (this.result.aboutContactWithChildSurvey.placeConditions == 'y')? this.result.aboutContactWithChildSurvey.conditionsDescription:''
            }
        }

        if (this.result.contactWithChildBestInterestOfChildSurvey){
            existingChildContactInfo.bstIntrst = this.result.contactWithChildBestInterestOfChildSurvey.existingChildBestInterestDescription;
        }

        return existingChildContactInfo;

    }

    public getGuardianshipOfChildInfo(guardian:boolean, cancel: boolean){
        let guardianshipInfo = {
            guardian: guardian,
            cancel: cancel, 
            abtGuardian: {}, 
            abtCancel: {}, 
            indigenous: false, 
            unKnownAncestry: false, 
            ancestry: {
                firstNation: false,
                nisga: false,
                treatyFirstNation: false,
                under12: false,
                over12: false,
                acknowledge: false                    
            }
        };
        console.log(this.result)

        if (guardian){
            guardianshipInfo.abtGuardian = {
                children: []
            }
            if (this.result.GuardianOfChildSurvey){
                guardianshipInfo.abtGuardian['children'] = this.result.GuardianOfChildSurvey.childrenList?this.result.GuardianOfChildSurvey.childrenList:[];               
            }
        }

        if (cancel) {
            guardianshipInfo.abtCancel = {
                bestInterest: '',
                cancelDetails: [
                    {
                        guardianName: '', 
                        childName: '',
                        guardianSince: ''
                    }
                ]
            }

            if (this.result.GuardianOfChildBestInterestOfChildSurvey){
                const bestInterestInfo = this.result.GuardianOfChildBestInterestOfChildSurvey;
                guardianshipInfo.abtCancel['bestInterest'] = bestInterestInfo.cancelGuradianChildBestInterest?bestInterestInfo.cancelGuradianChildBestInterest:''
            }
            if (this.result.GuardianOfChildSurvey && this.result.GuardianOfChildSurvey.cancelGuardianDetails){
                if (this.result.GuardianOfChildSurvey.cancelGuardianDetails.length > 0){
                    guardianshipInfo.abtCancel['cancelDetails'] = [];
                }
                for (const detail of this.result.GuardianOfChildSurvey.cancelGuardianDetails){
                    guardianshipInfo.abtCancel['cancelDetails'].push({
                        guardianName: detail.nameOther, 
                        childName: detail.name,
                        guardianSince: Vue.filter('beautify-date')(detail.date)
                    })
                }                
            }
        }

        if (this.result.indigenousAncestryOfChildSurvey){
            const ancestryInfo = this.result.indigenousAncestryOfChildSurvey;
            if (ancestryInfo.indigenousChild == 'yes'){
                guardianshipInfo.indigenous = true;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry = {
                    firstNation: ancestryInfo.indigenousAncestry.includes('First Nation'),
                    nisga: ancestryInfo.indigenousAncestry.includes('Nisga’a'),
                    treatyFirstNation: ancestryInfo.indigenousAncestry.includes('Treaty First Nation'),
                    under12: ancestryInfo.indigenousAncestry.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    over12: ancestryInfo.indigenousAncestry.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    acknowledge: (ancestryInfo.indigenousAncestry.includes('Nisga’a') || ancestryInfo.indigenousAncestry.includes('Treaty First Nation'))? (ancestryInfo.ServeAcknowledgement == 'I acknowledge'):false
                }
            } else if (ancestryInfo.indigenousChild == 'n'){
                guardianshipInfo.indigenous = false;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } else {
                guardianshipInfo.indigenous = false;
                guardianshipInfo.unKnownAncestry = true;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } 
        }
        return guardianshipInfo;
    }

    public getNewSpousalSupportInfo(){
        let newSpousalSupportInfo = {
            current: {
                adv: false,
                share: false,
                hardship: false,
                bcmIndpndnt: false,
                crntArrngmnt: '',
                payors: ''
            },
            incomeInfo: {
                myIncome: '',
                knowOpIncome: false,
                opIncome: '',
                knowFacts: false,
                facts: ''
            },
            payDetails:{
                monthly: false,
                start: '',
                end: '',
                rate: '',
                lumpSum: false,
                lumpSumAmount: '',
                other: false,
                otherComm: ''
            },
            calc: {
                attaching: false,
                reason: ''
            }
        }

        console.log(this.result)

        if (this.result.spousalSupportSurvey){
            const entitlementReasons = this.result.spousalSupportSurvey.listOfReasons?this.result.spousalSupportSurvey.listOfReasons:[]
            newSpousalSupportInfo.current = {
                adv: entitlementReasons.includes('There are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship'),
                share: entitlementReasons.includes('To share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child'),
                hardship: entitlementReasons.includes('To relieve economic hardship of the spouses arising from the breakdown of the relationship'),
                bcmIndpndnt: entitlementReasons.includes('To help each spouse become financially independent within a reasonable period'),
                crntArrngmnt: (this.result.spousalSupportSurvey.currentSupport)? this.result.spousalSupportSurvey.currentSupport:'',
                payors: (this.result.spousalSupportSurvey.listOfSupportPayors 
                        && this.result.spousalSupportSurvey.listOfSupportPayors.length > 0)? this.result.spousalSupportSurvey.listOfSupportPayors.toString():''
            }

        }

        if (this.result.spousalSupportIncomeAndEarningPotentialSurvey){
            newSpousalSupportInfo.incomeInfo = {
                myIncome: this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeInfo?this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeInfo:'',
                knowOpIncome: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome == 'y'),
                opIncome: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome == 'y'
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeAmount)?this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeAmount:'',
                knowFacts: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts == 'y'),
                facts: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts == 'y'
                        && this.result.spousalSupportIncomeAndEarningPotentialSurvey.factsExplanation)?this.result.spousalSupportIncomeAndEarningPotentialSurvey.factsExplanation:''                
            }
        }

        if (this.result.aboutSpousalSupportOrderSurvey){            
            newSpousalSupportInfo.payDetails = {
                monthly: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly'): false,
                start: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
                        && this.result.aboutSpousalSupportOrderSurvey.startDate)?this.result.aboutSpousalSupportOrderSurvey.startDate:'',
                end: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
                        && this.result.aboutSpousalSupportOrderSurvey.endDate)?this.result.aboutSpousalSupportOrderSurvey.endDate:'',
                rate: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
                        && this.result.aboutSpousalSupportOrderSurvey.monthlyAmount)?this.result.aboutSpousalSupportOrderSurvey.monthlyAmount:'',
                lumpSum: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('lumpsum'): false,
                lumpSumAmount: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('lumpsum')
                        && this.result.aboutSpousalSupportOrderSurvey.lumpSumAmount)? this.result.aboutSpousalSupportOrderSurvey.lumpSumAmount:'',
                other: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('other'): false,
                otherComm: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('other') 
                        && this.result.aboutSpousalSupportOrderSurvey.howToPayComment)? this.result.aboutSpousalSupportOrderSurvey.howToPayComment:''
            }
        }

        if (this.result.calculatingSpousalSupportSurvey){
            newSpousalSupportInfo.calc = {
                attaching: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'n'
                        && this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations)?this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations:''
            }
        }

        return newSpousalSupportInfo;
    }

    public getExistingSpousalSupportInfo(){


        // orderDate: Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate),
        //         exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
        //         fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
        //         cancelOrdr:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
        //         changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
        //         changeList: orderChangeList,
        //         changes:{
        //             myfin: orderChangeList.includes('My financial situation has changed'),
        //             opfin: orderChangeList.includes('I believe the other party’s financial situation has changed'),
        //             spcl: orderChangeList.includes('The `special and extraordinary expenses` have changed'),
        //             lvng: orderChangeList.includes('The living arrangements for a child have changed'),
        //             newInfo: orderChangeList.includes('Information has become available that was not available when the order was made'),
        //             other: orderChangeList.includes('Other changes or circumstances')
        //         },
        //         newInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Information has become available that was not available when the order was made') && this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder)?this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder:'',
        //         expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The `special and extraordinary expenses` have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
        //         lvngChangeInfo:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The living arrangements for a child have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
        //         otherInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Other changes or circumstances') && this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder)?this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder:'',
        //         exstngAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
        //         setAsideAgrmnt:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
        //         replaceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
        //         changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement)?this.result.aboutExistingChildSupportSurvey.changesSinceAgreement:''
            

        let existingSpousalSupportInfo = {
            current: {
                date: '',
                order: false,
                agreement: false,
                directors: false,
                reviewable: false,
                fillForm: '',
                description: ''
            },
            orderInfo: {
                changes: {
                    myfin: false,
                    opfin: false,
                    myEmp: false,
                    opEmp: false,
                    houseHold: false,
                    newInfo: false,
                    other: false
                },
                changesSinceOrder: '',
                newInfo: '',
                otherChange: '',
                change: false,
                cancel: false,
                date: ''
            },
            agreementInfo: {
                changes: {
                    myfin: false,
                    opfin: false,
                    myEmp: false,
                    opEmp: false,
                    houseHold: false,
                    newInfo: false,
                    other: false
                },
                changesSinceOrder: '',
                newInfo: '',
                otherChange: '',
                change: false,
                cancel: false,
                date: ''
            },
            payDetails:{
                unpaid: false,
                unPaidAmount: '',
                reduce: false,
                reduceAmmount: '',
                reduceReason: '',
                monthly: false,                
                rate: '',
                lumpSum: false,                
                other: false,
                otherComm: ''
            },
            calc: {
                attaching: false,
                reason: ''
            }
        }

        console.log(this.result)

        // if (this.result.spousalSupportSurvey){
        //     const entitlementReasons = this.result.spousalSupportSurvey.listOfReasons?this.result.spousalSupportSurvey.listOfReasons:[]
        //     newSpousalSupportInfo.current = {
        //         adv: entitlementReasons.includes('There are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship'),
        //         share: entitlementReasons.includes('To share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child'),
        //         hardship: entitlementReasons.includes('To relieve economic hardship of the spouses arising from the breakdown of the relationship'),
        //         bcmIndpndnt: entitlementReasons.includes('To help each spouse become financially independent within a reasonable period'),
        //         crntArrngmnt: (this.result.spousalSupportSurvey.currentSupport)? this.result.spousalSupportSurvey.currentSupport:'',
        //         payors: (this.result.spousalSupportSurvey.listOfSupportPayors 
        //                 && this.result.spousalSupportSurvey.listOfSupportPayors.length > 0)? this.result.spousalSupportSurvey.listOfSupportPayors.toString():''
        //     }

        // }

        // if (this.result.spousalSupportIncomeAndEarningPotentialSurvey){
        //     newSpousalSupportInfo.incomeInfo = {
        //         myIncome: this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeInfo?this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeInfo:'',
        //         knowOpIncome: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome == 'y'),
        //         opIncome: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowIncome == 'y'
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeAmount)?this.result.spousalSupportIncomeAndEarningPotentialSurvey.incomeAmount:'',
        //         knowFacts: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts == 'y'),
        //         facts: (this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.knowFacts == 'y'
        //                 && this.result.spousalSupportIncomeAndEarningPotentialSurvey.factsExplanation)?this.result.spousalSupportIncomeAndEarningPotentialSurvey.factsExplanation:''                
        //     }
        // }

        // if (this.result.aboutSpousalSupportOrderSurvey){            
        //     newSpousalSupportInfo.payDetails = {
        //         monthly: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly'): false,
        //         start: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
        //                 && this.result.aboutSpousalSupportOrderSurvey.startDate)?this.result.aboutSpousalSupportOrderSurvey.startDate:'',
        //         end: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
        //                 && this.result.aboutSpousalSupportOrderSurvey.endDate)?this.result.aboutSpousalSupportOrderSurvey.endDate:'',
        //         rate: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('monthly')
        //                 && this.result.aboutSpousalSupportOrderSurvey.monthlyAmount)?this.result.aboutSpousalSupportOrderSurvey.monthlyAmount:'',
        //         lumpSum: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('lumpsum'): false,
        //         lumpSumAmount: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('lumpsum')
        //                 && this.result.aboutSpousalSupportOrderSurvey.lumpSumAmount)? this.result.aboutSpousalSupportOrderSurvey.lumpSumAmount:'',
        //         other: (this.result.aboutSpousalSupportOrderSurvey.howToPay)? this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('other'): false,
        //         otherComm: (this.result.aboutSpousalSupportOrderSurvey.howToPay 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPay.includes('other') 
        //                 && this.result.aboutSpousalSupportOrderSurvey.howToPayComment)? this.result.aboutSpousalSupportOrderSurvey.howToPayComment:''
        //     }
        // }

        if (this.result.calculatingSpousalSupportSurvey){
            existingSpousalSupportInfo.calc = {
                attaching: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'n'
                        && this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations)?this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations:''
            }
        }

        return existingSpousalSupportInfo;

    }

    public getChildrenInfo(){

        const childrenInfo = [];
        let childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        const childData = this.result.childData;
       
        for (const child of childData){            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childInfo.currentSituation = child.currentLiving;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getExistingOrdersInfo(){
        let existing = {existingFlm: false, existingPO: false}

        existing.existingFlm = this.result.flmBackgroundSurvey.ExistingOrders == 'y';
        existing.existingPO = this.result.flmBackgroundSurvey.existingPOOrders == 'y';

        return existing;
    }

    public getSchedulesInfo(){
        // console.log(this.result)

        let schedules = [];
        const selectedFLMs = this.result.flmSelectedForm;
        const flmBackgroundInfo = this.result.flmBackgroundSurvey;

        if (flmBackgroundInfo.ExistingOrdersFLM == 'n') {
            
            if (selectedFLMs.includes("parentingArrangements")){
                schedules.push("schedule1")
            }
            if (selectedFLMs.includes("childSupport")){
                schedules.push("schedule3")
            }
            if (selectedFLMs.includes("contactWithChild")){
                schedules.push("schedule5")
            }            
            if (selectedFLMs.includes("spousalSupport")){
                schedules.push("schedule9")
            }

        } else if (flmBackgroundInfo.ExistingOrdersFLM == 'y' && flmBackgroundInfo.existingOrdersListFLM && flmBackgroundInfo.existingOrdersListFLM.length > 0){

            if (selectedFLMs.includes("parentingArrangements") && flmBackgroundInfo.existingOrdersListFLM.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                schedules.push("schedule2")
            }
            if (selectedFLMs.includes("childSupport") && flmBackgroundInfo.existingOrdersListFLM.includes("Child Support")){
                schedules.push("schedule4")
            }
            if (selectedFLMs.includes("contactWithChild") && flmBackgroundInfo.existingOrdersListFLM.includes("Contact with a Child")){
                schedules.push("schedule6")
            }           
            if (selectedFLMs.includes("spousalSupport") && flmBackgroundInfo.existingOrdersListFLM.includes("Spousal Support")){
                schedules.push("schedule10")
            }
        }

        if (selectedFLMs.includes("guardianOfChild")){
            if (this.result.GuardianOfChildSurvey){
                if (this.result.GuardianOfChildSurvey && 
                    this.result.GuardianOfChildSurvey.applicantionType && 
                    this.result.GuardianOfChildSurvey.applicantionType.includes('becomeGuardian')){
                    schedules.push("schedule7")
                }
                if (this.result.GuardianOfChildSurvey && 
                    this.result.GuardianOfChildSurvey.applicantionType && 
                    this.result.GuardianOfChildSurvey.applicantionType.includes('cancelGuardian')){
                    schedules.push("schedule8")
                }
            }            
        }        
        // console.log(schedules)
        return schedules;
    }

    public getYourInfo(){
        let dob = ''
        let name = ''
        let address = {street:'', city: '', country: '', postcode: '', state: ''}
        let contact = {email:'',fax:'',phone:''}
        let Lawyer = 'n'

        if(this.result.yourInformationSurvey){
            if(this.result.yourInformationSurvey.ApplicantName)
                name=this.result.yourInformationSurvey.ApplicantName
            
            if(this.result.yourInformationSurvey.ApplicantDOB)
                dob=this.result.yourInformationSurvey.ApplicantDOB

            if(this.result.yourInformationSurvey.ApplicantAddress)
                address=this.result.yourInformationSurvey.ApplicantAddress
            
            if(this.result.yourInformationSurvey.ApplicantContact)
                contact=this.result.yourInformationSurvey.ApplicantContact

            if(this.result.yourInformationSurvey.Lawyer)
                Lawyer=this.result.yourInformationSurvey.Lawyer            
        }
        return {'name':name, 'dob':dob, 'address': address ,'contact': contact, 'Lawyer':Lawyer}
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = 'unknown'
        let name = ''
        let address = ''
        let contactInfo = ''

        if (this.result.otherPartyCommonSurvey){
            console.log()    
            for(const party of this.result.otherPartyCommonSurvey){
                dob = 'unknown'
                name = ''
                address = ''
                contactInfo = ''

                if (party['knowDob'] == 'y' &&  party['dob'])
                    dob = party['dob']

                if (party['name'])
                    name = party['name']
                
                if (party['address'])
                    address = party['address']
                
                if (party['contactInfo'])
                    contactInfo = party['contactInfo']
                
                info.push({'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo})
            }
        } else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

        return info
    }
        
    public onPrint() { 
               
        const el= document.getElementById("print");
        //console.log(el)
        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 712   `+moment().format("MMMM D, YYYY")+` \\a           Form 3";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order&pdf_type=FLC&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

        // const body = new FormData();
        // body.append('html',pdfhtml)
        // body.append('json_data',null)

        const body = {
            'html':pdfhtml,
            'json_data':this.result
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  
        //console.log(body)
        this.$http.post(url,body, options)
        .then(res => {
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate); 
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){        
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?pdf_type=FLC'
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "Form3.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }

 
    public getFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(let i=2;i<4; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                //console.log(stepResults[stepResult])
                //console.log(stepResults[stepResult].data)
                if(stepResults[stepResult])
                    result[stepResult]=stepResults[stepResult].data; 
            }
        }

        //console.log(this.$store.state.Application.steps[0].result)
    //     const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
    //     Object.assign(result, result, protectedPartyName);

        const childBestInterestAck = {childBestInterestAcknowledgement:this.$store.state.Application.steps[3].result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        
        
        //console.log(result)

        Vue.filter('extractRequiredDocuments')(result, 'familyLawMatter')

        return result;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>