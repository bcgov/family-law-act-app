<template>
    <div v-if="dataReady"> 
       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div class="new-page" ></div>            
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <ScheduleHeader scheduleNumber="Schedule 5" scheduleTitle="Spousal Support" scheduleDescription="Disagree with order requested by other party"/>
                <div style="margin-bottom: 1rem;"></div>
                <div style="flex: 1; background: #ededed; margin-right: 4px">
                    Complete this schedule only if you disagree with all or part of the order about spousal support applied for by the other party on Schedule 8 or Schedule 9 of their Application About a Family Law Matter.
                </div>
            </div>
            <div style="width: 20%;">
            </div>  
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Relationship between the parties"></FormPart>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>1. </b><i>Select only one of the options below</i><br/>
                <check-box shift="10" shiftmark="0" :check="spsSupInfo.spouse?'yes':''" text="<b>I am</b> (or was) the other party’s spouse"/>
                <check-box shift="10" shiftmark="0" :check="!spsSupInfo.spouse?'yes':''" text="I <b>have never been</b> the other party’s spouse"/><br/>
                <i>Please describe your relationship to the other party:</i>
                <div class="answerbox" style="width:98%"> {{'&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px; margin-top: -62px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        A spouse has a duty to provide support, if after considering the objectives set out in section 161 of the Family Law Act, a spouse is entitled to support [s. 160 <i>Family Law Act</i>].
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Reason you disagree"></FormPart>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

<!-- <2> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>2. </b>I <b>do not agree</b> with the order requested by the other party about spousal support because:<br/>
                <i>Select each option that applies and complete the required information, as applicable</i><br/>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="spsSupInfo.disagreeDetails.noEntitlement?'yes':''" 
                    text="I do not believe the other party is <b>entitled</b> to spousal support <i>(please explain):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.noEntitlementDesc ? spsSupInfo.disagreeDetails.noEntitlementDesc : '&nbsp;'}}</div>
                <check-box shift="10" shiftmark="0" class="marginleft" inline="inline" boxMargin="0" style="display:inline; padding: 10px;":check="spsSupInfo.disagreeDetails.incorrectIncomeClaim?'yes':''" text="<b>My income</b> is not what the other party claims it is"/><br/>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="spsSupInfo.disagreeDetails.incorrectEmploymentClaim?'yes':''" 
                    text="<b>My employment</b>, training, health and ability to work is not what the other<br/> party claims it is <i>(please explain):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.incorrectEmploymentClaimDesc ? spsSupInfo.disagreeDetails.incorrectEmploymentClaimDesc : '&nbsp;'}}</div>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="spsSupInfo.disagreeDetails.incorrectOpFinancialClaim?'yes':''" 
                    text="the <b>other party’s financial situation</b> is not what they claim it is <i>(please explain):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpFinancialClaimDesc ? spsSupInfo.disagreeDetails.incorrectOpFinancialClaimDesc : '&nbsp;'}}</div>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="spsSupInfo.disagreeDetails.incorrectOpEmploymentClaim?'yes':''" 
                    text="The <b>other party’s employment</b>, training, health and ability to work is not<br/> what the other party claims it is <i>(please explain):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpEmploymentClaimDesc ? spsSupInfo.disagreeDetails.incorrectOpEmploymentClaimDesc : '&nbsp;'}}</div>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="!spsSupInfo.disagreeDetails.incorrectOpExpenseClaim?'yes':''" 
                    text="the <b>other party’s expenses</b> are not what they claim them to be <i>(please explain):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.incorrectOpExpenseClaimDesc ? spsSupInfo.disagreeDetails.incorrectOpExpenseClaimDesc : '&nbsp;'}}</div>
                <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; padding: 10px;" :check="spsSupInfo.disagreeDetails.other?'yes':''" 
                    text="<b>Other</b> reason <i>(specify):</i>"/>
                <div class="answerbox">{{spsSupInfo.disagreeDetails.otherDesc ? spsSupInfo.disagreeDetails.otherDesc : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px; margin-top: -62px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court must take into consideration the conditions, means, needs and other circumstances of each spouse when determining spousal support [s. 162 <i>Family Law Act</i>].<br/>
                        See the other party’s financial statement for their financial information.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Existing final order or agreement" subtitle="Complete this part only if there is an existing final order or agreement about spousal support."></FormPart>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

<!-- <3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>3. </b><i>Select only one of the options below</i><br/>
                <check-box shift="10" shiftmark="0" :check="''" text="I would like the final order or agreement to <b>continue to be in place</b>"/>
                <check-box shift="10" shiftmark="0" :check="''" text="I am applying for the final order or agreement to be <b>changed, suspended or replaced</b> as set out in Part 4"/>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>4. </b><i>Select only one of the options below</i><br/>
                <check-box shift="10" shiftmark="0" :check="''" text="I agree that the <b>amount of unpaid spousal support</b> (arrears) in the application <b>is correct</b>"/>
                <check-box shift="10" shiftmark="0" inline="inline" style="display: inline;" :check="''" text="The amount of unpaid spousal support (arrears) in the application is <b>not correct</b>."/>
                <grey-box-form textwidth="100px" inline="inline" beforetext="As of (<i>date</i>)" style="display: inline; padding-left: 28px;"></grey-box-form>
                <div inline="inline" style="display: inline;">, the amount of unpaid spousal support (arrears)</div>
                <grey-box-form textwidth="100px" beforetext="was $" style="padding-left: 28px;"></grey-box-form>.
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="Order about spousal support" subtitle="You do not need to complete this part if have indicated you would like the existing order or agreement to continue to be in place."></FormPart>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

<!-- <5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>5. </b>I am applying for an <b>order for spousal support</b> to be paid by <i>(name of paying party)</i>
                <grey-box-form textwidth="150px"></grey-box-form> as follows:<br/>
                <check-box shift="10" shiftmark="0" style="display: inline;":check="spsSupInfo.payDetails.monthly?'yes':''" text="<b>Monthly payments</b> to commence on <i>(date)</i>"/>
                <grey-box-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="" hint="" :text="spsSupInfo.payDetails.start"/>
                <check-box shift="10" shiftmark="0" :check="spsSupInfo.payDetails.lumpSum?'yes':''" text="<b>Lump sum</b> payment"/>
                <check-box shift="10" shiftmark="0" :check="spsSupInfo.payDetails.other?'yes':''" text="<b>Other</b> <i>(specify)</i>"/>
                <div class="answerbox" style="width:98%">{{spsSupInfo.payDetails.otherComm ? spsSupInfo.payDetails.otherComm : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px; margin-top: -70px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court may order a spouse to pay an amount the court considers appropriate as spousal support after 
                        taking into consideration section 160 [duty to provide support for entitled spouse] [s. 165 <i>Family Law Act</i>].<br/>
                        The order may include when and how payments are to be made [s. 170 <i>Family Law Act</i>].
                    </p>
                </NoteBox>
            </div>
        </div>

<!-- <6> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>6. </b>Based on the information I know about each party’s means, needs, and other circumstances:<br/>
                <i>Select only one of the options below</i>
                <check-box shift="10" shiftmark="0" style="display: inline;" :check="''" text="I expect the range for the <b>monthly amount payable</b> for spousal support to be"/>
                <grey-box-form style="display: inline; text-indent: 28px;" beforetext="approximately $" textwidth="150px" :text="spsSupInfo.payDetails.rate"></grey-box-form> to $<grey-box-form style="display: inline;" textwidth="150px"></grey-box-form><br/>
                <check-box shift="10" shiftmark="0" style="display: inline;" :check="''" text="I expect a <b>lump sum amount payable</b> for spousal support to be approximately"/>
                <grey-box-form style="display: inline; text-indent: 28px;" beforetext="$" textwidth="150px" :text="spsSupInfo.payDetails.lumpSumAmount"></grey-box-form><br/>
                <check-box shift="10" shiftmark="0" :check="''" text="I am not able to estimate the amount payable for spousal support at this time"/>
            </div>
            <div style="width: 20%; padding: 6px;">
                <NoteBox>
                    <b-icon-book />
                    <p>
                        For more information about how to calculate the amount for spousal support, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="5" title="Income information"></FormPart>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

<!-- <7> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">  
                <b>7. </b><b>I am required to file</b> a Financial Statement Form 4 to provide my income information to the court.<br/>
                <i>Select only one of the options below</i>
                <check-box shift="10" shiftmark="0" :check="spsSupInfo.calc.attaching?'yes':''" text="I <b>am filing</b> a Financial Statement in Form 4 with this application."/>
                <check-box shift="10" shiftmark="0" :check="!spsSupInfo.calc.attaching?'yes':''" text="I am <b>not able to file</b> a Financial Statement in Form 4 with this application.
                    I am filing an Application for Case Management Order Without Notice orAttendance in Form 11 requesting 
                    to waive or modify the requirement that myincome information in Form 4 be provided with this application. 
                    I understand I will still be required to file a Financial Statement in Form 4 at a later date."/>
                <div style="margin-top: 0.4rem;"></div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <p><b>IMPORTANT NOTE:</b></p>
                    <p><b>This family law case includes an application about spousal support. You must provide your financial 
                        information with your reply by completing and filing a Financial Statement in Form 4.</b></p>
                    <p>If you do not give your complete, true, and up-to-date financial information when needed, the court can:</p>
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an orderbased on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to$5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%; padding: 6px; margin-top: -50px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Spousal support is based in part on income. If a party’s income information is necessary, they have an 
                        obligation to provide information to the court, or the court may attribute income in an amount the court 
                        considers appropriate [ss. 212 and 213 <i>Family Law Act</i>].
                    </p>
                </NoteBox>
                <div style="margin-top: 0.1rem;"></div>
                <NoteBox>
                    <b-icon-file />
                    <p>
                        You must file a Financial Statement Form 4 or an Application for Case Management Order Without Notice or 
                        Attendance Form 11.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
    </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule9DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeSpouseSupportDataInfoType, rflmCalculatingSpouseSupportDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/SpousalSupport';
import { howToPaySpousalSupportInfoType } from '@/types/Application/FamilyLawMatter/SpousalSupport';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        GreyBoxForm,
        ScheduleHeader,
        FormPart,
        NoteBox
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

        if (this.result.flmAdditionalDocumentsSurvey){
            newSpousalSupportInfo.filingForm4 = this.result.flmAdditionalDocumentsSurvey.isFilingAdditionalDocs == 'y';
        } else {
            newSpousalSupportInfo.filingForm4 = false;
        }        

        return newSpousalSupportInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
