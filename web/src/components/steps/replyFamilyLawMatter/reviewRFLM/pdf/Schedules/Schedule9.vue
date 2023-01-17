<template>
    <div v-if="dataReady"> 
       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 9 – REPLY TO AN APPLICATION ABOUT SPOUSAL SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 9 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with a new application by the other party about
                    spousal support. The order they applied for about spousal support can be found in Schedule 9 of their Application
                    About a Family Law Matter.
                </i>
            </div>
           
<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 0 0.5rem;">
                    <i style="margin:0 0 0 0rem;" >Select only one of the options below</i>
                </div>
                <div style="margin:0 0 0 1.5rem;">                    
                    <check-box 
                        :check="spsSupInfo.spouse?'yes':''" 
                        text="I am (or was) the other party’s spouse"/>
                    <check-box 
                        :check="!spsSupInfo.spouse?'yes':''" 
                        text="I have never been the other party’s spouse"/>                    
                </div>            
            </section> 

            <div style="margin-top:1.5rem;"></div>
<!-- <2> -->
            <section> 
                <div style="display:inline; margin:0 0 0 0.25rem;">I do not agree with the order about spousal support requested by the other party because:</div>              
                <div>
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                </div>
                <div style="margin:0 0 0 1.25rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.noEntitlement?'yes':''" 
                        text="I do not believe the other party is entitled to spousal support<br><i>Explain below</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.noEntitlement && spsSupInfo.disagreeDetails.noEntitlementDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.noEntitlementDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box :check="spsSupInfo.disagreeDetails.incorrectIncomeClaim?'yes':''" text="my income is not what the other party claims it is"/>
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.incorrectEmploymentClaim?'yes':''" 
                        text="my employment, training, health and ability to work is not what the other party claims it is<br><i>Explain below</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.incorrectEmploymentClaim && spsSupInfo.disagreeDetails.incorrectEmploymentClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.incorrectEmploymentClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.incorrectOpFinancialClaim?'yes':''" 
                        text="the other party’s financial situation is not what they claim it is<br><i>Explain below</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.incorrectOpFinancialClaim && spsSupInfo.disagreeDetails.incorrectOpFinancialClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpFinancialClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.incorrectOpEmploymentClaim?'yes':''" 
                        text="I believe the other party’s employment, training, health and ability to work is not what the other party claims it is<br><i>Explain below</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.incorrectOpEmploymentClaim && spsSupInfo.disagreeDetails.incorrectOpEmploymentClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpEmploymentClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.incorrectOpExpenseClaim?'yes':''" 
                        text="the other party’s expenses are not what they claim them to be<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.incorrectOpExpenseClaim && spsSupInfo.disagreeDetails.incorrectOpExpenseClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpExpenseClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.other?'yes':''" 
                        text="other reason <i>(specify)</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.other && spsSupInfo.disagreeDetails.otherDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.otherDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                </div>
            </section>           

            <div class="print-block">                
<!-- <3> -->
                <section>
                    <div style="display:inline; margin:0 0 0 0.25rem;"> The order for spousal support that I believe should be made is as follows:</div>                   
                    <div>
                        <i style="margin:0 0 0 1.5rem;" >Select all options that apply and complete the required information</i>
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.monthly?'yes':''" text="in the amount of "/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="5rem" beforetext="$" hint="" :text="spsSupInfo.payDetails.rate"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="per month to commence on" hint="mmm/dd/yyyy" :text="spsSupInfo.payDetails.start"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="until" hint="mmm/dd/yyyy" :text="spsSupInfo.payDetails.end"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.lumpSum?'yes':''" text="in a lump sum of"/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="8rem" beforetext="$" hint="" :text="spsSupInfo.payDetails.lumpSumAmount"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0rem 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.other?'yes':''" text="other <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="32.35rem" beforetext="" hint="" :text="spsSupInfo.payDetails.otherComm"/>            
                    
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <4> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 0rem 1.25rem;">
                        <check-box  :check="spsSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box  :check="!spsSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="!spsSupInfo.calc.attaching" 
                        class="answerbox">{{spsSupInfo.calc.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <5> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box  :check="spsSupInfo.filingForm4?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box  :check="!spsSupInfo.filingForm4?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about spousal support. You must provide your financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>
        </div> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule9DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeSpouseSupportDataInfoType, rflmCalculatingSpouseSupportDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/SpousalSupport';
import { howToPaySpousalSupportInfoType } from '@/types/Application/FamilyLawMatter/SpousalSupport';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule9 extends Vue {

    @Prop({required:true})
    result!: any;
  
    dataReady = false;
    spsSupInfo = {} as schedule9DataInfoType;    
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    } 

    public extractInfo(){
        console.log(this.result)
        this.spsSupInfo = this.getNewSpousalSupportInfo();
    }

    public getNewSpousalSupportInfo(){

        let newSpousalSupportInfo = {} as schedule9DataInfoType;

        if (this.result.relationshipToOtherPartySurvey){
            newSpousalSupportInfo.spouse = this.result.relationshipToOtherPartySurvey.spouse == 'y';
        } else {
            newSpousalSupportInfo.spouse = false;
        }

        newSpousalSupportInfo.disagreeDetails = {                
            noEntitlement: false,
            noEntitlementDesc: '',
            incorrectIncomeClaim: false,
            incorrectEmploymentClaim: false,
            incorrectEmploymentClaimDesc: '',
            incorrectOpFinancialClaim: false,
            incorrectOpFinancialClaimDesc: '',
            incorrectOpEmploymentClaim: false,
            incorrectOpEmploymentClaimDesc: '',
            incorrectOpExpenseClaim: false,
            incorrectOpExpenseClaimDesc: '',
            other: false,
            otherDesc: ''
        }

        if (this.result.disagreeSpouseSupportSurvey){
            const disagreeInfo: disagreeSpouseSupportDataInfoType = this.result.disagreeSpouseSupportSurvey;
            if (disagreeInfo.noEntitlement == "true"){
                newSpousalSupportInfo.disagreeDetails.noEntitlement = true;
                newSpousalSupportInfo.disagreeDetails.noEntitlementDesc = disagreeInfo.noEntitlementDescription;
            } else {
                newSpousalSupportInfo.disagreeDetails.noEntitlement = false;
                newSpousalSupportInfo.disagreeDetails.noEntitlementDesc = "";
            }

            newSpousalSupportInfo.disagreeDetails.incorrectIncomeClaim = disagreeInfo.incorrectIncomeAndAbilityToWork == "true";
            
            if (disagreeInfo.incorrectEmployment == "true"){
                newSpousalSupportInfo.disagreeDetails.incorrectEmploymentClaim = true;
                newSpousalSupportInfo.disagreeDetails.incorrectEmploymentClaimDesc = disagreeInfo.incorrectEmploymentDescription;
            } else {
                newSpousalSupportInfo.disagreeDetails.incorrectEmploymentClaim = false;
                newSpousalSupportInfo.disagreeDetails.incorrectEmploymentClaimDesc = "";
            }

            if (disagreeInfo.opIncorrectFinances == "true"){
                newSpousalSupportInfo.disagreeDetails.incorrectOpFinancialClaim = true;
                newSpousalSupportInfo.disagreeDetails.incorrectOpFinancialClaimDesc = disagreeInfo.opIncorrectFinancesDescription;

            } else {
                newSpousalSupportInfo.disagreeDetails.incorrectOpFinancialClaim = false;
                newSpousalSupportInfo.disagreeDetails.incorrectOpFinancialClaimDesc = "";
            }

            if (disagreeInfo.opIncorrectEmployment == "true"){
                newSpousalSupportInfo.disagreeDetails.incorrectOpEmploymentClaim = true;
                newSpousalSupportInfo.disagreeDetails.incorrectOpEmploymentClaimDesc = disagreeInfo.opIncorrectEmploymentDescription;
            } else {
                newSpousalSupportInfo.disagreeDetails.incorrectOpEmploymentClaim = false;
                newSpousalSupportInfo.disagreeDetails.incorrectOpEmploymentClaimDesc = "";
            }

            if (disagreeInfo.opIncorrectExpenses == "true"){
                newSpousalSupportInfo.disagreeDetails.incorrectOpExpenseClaim = true;
                newSpousalSupportInfo.disagreeDetails.incorrectOpExpenseClaimDesc = disagreeInfo.opIncorrectExpensesDescription;
            } else {
                newSpousalSupportInfo.disagreeDetails.incorrectOpExpenseClaim = false;
                newSpousalSupportInfo.disagreeDetails.incorrectOpExpenseClaimDesc = "";
            }

            if (disagreeInfo.disagreeOtherReason == 'y'){
                newSpousalSupportInfo.disagreeDetails.other = true;
                newSpousalSupportInfo.disagreeDetails.otherDesc = disagreeInfo.otherReasonDescription;
            } else {
                newSpousalSupportInfo.disagreeDetails.other = false;
                newSpousalSupportInfo.disagreeDetails.otherDesc = "";
            }
            
        }

        newSpousalSupportInfo.payDetails = {
            monthly: false,
            start: '',
            end: '',
            rate: '',
            lumpSum: false,
            lumpSumAmount: '',
            other: false,
            otherComm: ''
        }

        if (this.result.rflmSpouseSupportOrderSurvey?.howToPaySpousalSupport){
            const supportOrder: howToPaySpousalSupportInfoType = this.result.rflmSpouseSupportOrderSurvey.howToPaySpousalSupport;
            newSpousalSupportInfo.payDetails = {
                monthly: supportOrder.selected == 'monthly',
                start: (supportOrder.selected == 'monthly'
                        && supportOrder.monthlyStartDate)?Vue.filter('beautify-date')(supportOrder.monthlyStartDate):'',
                end: (supportOrder.selected == 'monthly'
                        && supportOrder.monthlyEndDate)?Vue.filter('beautify-date')(supportOrder.monthlyEndDate):'',
                rate: (supportOrder.selected == 'monthly'
                        && supportOrder.monthlyAmount)?supportOrder.monthlyAmount:'',
                lumpSum: supportOrder.selected == 'Lump Sum',
                lumpSumAmount: (supportOrder.selected == 'Lump Sum'
                        && supportOrder.lumpsumAmount)? supportOrder.lumpsumAmount:'',
                other: supportOrder.selected == 'other',
                otherComm: (supportOrder.selected == 'other' 
                        && supportOrder.otherComment)? supportOrder.otherComment:''
            }
        }

        newSpousalSupportInfo.calc = {                
            attaching: false,
            reason: ''
        }

        if (this.result.rflmCalculatingSpouseSupportSurvey){
            const calculationInfo: rflmCalculatingSpouseSupportDataInfoType = this.result.rflmCalculatingSpouseSupportSurvey;
                    
            newSpousalSupportInfo.calc = {                
                attaching: calculationInfo.attachingCalculations == 'y',
                reason: calculationInfo.attachingCalculations == 'n'?calculationInfo.notAttachingCalculationsReason:''
            } 
        
        } 

        if (this.result.rflmAdditionalDocumentsSurvey){
            newSpousalSupportInfo.filingForm4 = this.result.rflmAdditionalDocumentsSurvey.isFilingAdditionalDocs == 'y';
        } else {
            newSpousalSupportInfo.filingForm4 = false;
        }        

        return newSpousalSupportInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
