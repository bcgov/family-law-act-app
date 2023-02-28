<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 3 – REPLY TO AN APPLICATION ABOUT CHILD SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 3 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with a new application by the other party about
                    child support. The order they applied for about child support can be found in Schedule 3 of their Application
                    About a Family Law Matter.
                </i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">I am:</div>
                <div style="margin-left:1rem;">
                    <check-box  :check="chSupInfo.appType.parent?'yes':''" text="a parent to the child(ren)"/>
                    <check-box                         
                        :check="chSupInfo.appType.standing?'yes':''" 
                        text="a person standing in the place of a parent to the child(ren) <i>(for example, a step-parent)</i>"/>
                    <check-box  
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="chSupInfo.appType.notParent?'yes':''" 
                        text="not a parent of the child(ren)"/>
                    <check-box 
                        style="margin-left:1.75rem;" 
                        :check="chSupInfo.appType.parentageTestReq?'yes':''" 
                        text="I request a parentage test <i>(Select only if applicable)</i>"/>
                     <check-box  
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="chSupInfo.appType.notStanding?'yes':''" 
                        text="not a person standing in the place of a parent to the child(ren)"/>                             
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section> 
                I do not agree with the order about child support requested by the other party because:
                <i>Select all options that apply and complete the required information</i>
                <div style="margin-left:1rem;">
                    <check-box 
                        :check="chSupInfo.disagreeReason.appIncome?'yes':''" 
                        text="my income is not what the other party claims it is"/>
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.disagreeReason.opIncome?'yes':''" 
                        text="the other party’s income is not what they claim it is"/>
                </div>
                <i style="margin-left:1.75rem;">Explain below</i>
                <div v-if="chSupInfo.disagreeReason.opIncome && chSupInfo.disagreeReason.opIncomeDesc" 
                    class="answerbox">{{chSupInfo.disagreeReason.opIncomeDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <div style="margin-left:1rem;">                    
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.disagreeReason.specialExpense?'yes':''" 
                        text="I believe the special and extraordinary expenses are not what the other party claims they are"/>
                </div>
                <i style="margin-left:1.75rem;">Explain below</i>
                <div v-if="chSupInfo.disagreeReason.specialExpense && chSupInfo.disagreeReason.specialExpenseDesc" 
                    class="answerbox">{{chSupInfo.disagreeReason.specialExpenseDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <div style="margin-left:1rem;">                    
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.disagreeReason.livingArrangements?'yes':''" 
                        text="the living arrangements for the child(ren) are not as described"/>
                </div>
                <i  style="margin-left:1.75rem;">Explain below</i>
                <div v-if="chSupInfo.disagreeReason.livingArrangements && chSupInfo.disagreeReason.livingArrangementsDesc" 
                    class="answerbox">{{chSupInfo.disagreeReason.livingArrangementsDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <div style="margin-left:1rem;">                    
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.disagreeReason.undueHardship?'yes':''" 
                        text="the amount would cause me undue hardship because:"/>                
                    <i  style="margin-left:1.75rem;">
                        Note: If this option applies to your situation, you will need to complete the undue hardship portion of the
                        Financial Statement, Part 4 and Part 5, in addition to any other required parts
                    </i>
                    <div style="margin-left:1rem;">                    
                        <check-box 
                            style="width:100%;" 
                            :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.debt?'yes':''" 
                            text="I have an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living"/>
                        <check-box 
                            style="width:120%;" 
                            :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.highExpense?'yes':''" 
                            text="I have unusually high expenses to exercise parenting time or contact with the child(ren)"/>
                        <check-box 
                            style="width:120%;" 
                            :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.legalDutyOtherPerson?'yes':''"
                            text="I have a legal duty to support another person, such as an ill or disabled person or a former spouse"/>
                        <check-box 
                            style="width:120%;" 
                            :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.legalDutyOtherChild?'yes':''"
                            text="I have a legal duty to support a dependent child from another relationship"/>
                        <check-box 
                            style="width:120%;" 
                            :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardship?'yes':''"
                            text="other undue hardship circumstances <i>(specify)</i>:"/>
                        <div 
                            v-if="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardshipDesc" 
                            class="answerbox">{{chSupInfo.disagreeReason.undueHardshipDetails.otherHardshipDesc}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </div>

                <div style="margin-left:1rem;">                    
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.disagreeReason.other?'yes':''" 
                        text="other reason <i>(specify)</i>:"/>
                </div>               
                <div 
                    v-if="chSupInfo.disagreeReason.other &&
                        chSupInfo.disagreeReason.otherDesc" 
                    class="answerbox">{{chSupInfo.disagreeReason.otherDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

            </section>           

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Financial statement</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1rem;">
                        <check-box 
                            style="margin:0 0 0 0rem;" 
                            :check="chSupInfo.filing?'yes':''" 
                            text="I am filing a Financial Statement in Form 4 with this reply"/>
                        <check-box  
                            :check="!chSupInfo.filing?'yes':''" 
                            text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case
                                Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that
                                this reply be filed with a completed Financial Statement."/>                    
                    </div>               
                </section>  
            </div>          

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Calculations</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box 
                            style="margin:0 0 0 0rem;" 
                            :check="chSupInfo.calculate.attaching?'yes':''" 
                            text="I am attaching calculations showing how much I believe should be paid for child support according to the 
                                child support guidelines"/>
                        <check-box 
                            style="margin:0 0 0 0rem;" 
                            :check="!chSupInfo.calculate.attaching?'yes':''" 
                            text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="!chSupInfo.calculate.attaching && chSupInfo.calculate.reason" 
                        class="answerbox">{{chSupInfo.calculate.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>          

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div 
                    style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                    <b>
                        This family law case includes an application about child support. You must provide your financial 
                        information with your reply to this application by completing and filing a Financial Statement in Form 4. 
                    </b>
                </div>
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
import { schedule3DataInfoType, undueHardshipDetailsInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeChildSupportDataInfoType, relationshipToChildDataInfoType, rflmCalculatingChildSupportDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ChildSupport';
import { undueHardshipDataInfoType } from '@/types/Application/FamilyLawMatter/ChildSupport';
import { rflmAdditionalDocsDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;   
    chSupInfo = {} as schedule3DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.chSupInfo = this.getNewChildSupportInfo();
    }

    public getNewChildSupportInfo(){       
       
        let newChildSupportInfo = {} as schedule3DataInfoType;

        if (this.result.relationshipToChildSurvey){
            const relationshipInfo: relationshipToChildDataInfoType = this.result.relationshipToChildSurvey
            newChildSupportInfo.appType = {
                parent: relationshipInfo.listOfRelationshipTypes.includes('parent'),
                notParent: relationshipInfo.listOfRelationshipTypes.includes('notParent'),
                standing: relationshipInfo.listOfRelationshipTypes.includes('stepParent'),
                parentageTestReq: relationshipInfo.listOfRelationshipTypes.includes('notParent') && relationshipInfo.parentageTest == 'y',
                notStanding: relationshipInfo.listOfRelationshipTypes.includes('notStepParent')
            }
           
        } else {
            newChildSupportInfo.appType = {
                parent: false,
                notParent: false,
                standing: false,
                parentageTestReq: false,
                notStanding: false
            } 
        }

        if (this.result.disagreeChildSupportSurvey){
            const disagreeInfo: disagreeChildSupportDataInfoType = this.result.disagreeChildSupportSurvey;

            let undueHardshipDetailsInfo = {} as undueHardshipDetailsInfoType

            if (disagreeInfo.causeUndueHardship == "true"){
                undueHardshipDetailsInfo = {
                    debt: disagreeInfo.undueHardshipReason.includes('debt'),
                    highExpense: disagreeInfo.undueHardshipReason.includes('expenses'),
                    legalDutyOtherPerson: disagreeInfo.undueHardshipReason.includes('legalDutyOtherPerson'),
                    legalDutyOtherChild: disagreeInfo.undueHardshipReason.includes('legalDutyOtherChild'),
                    otherHardship: disagreeInfo.undueHardshipReason.includes('other'),
                    otherHardshipDesc: disagreeInfo.undueHardshipReason.includes('other')?disagreeInfo.undueHardshipReasonComment:''   
                }

            } else {

                undueHardshipDetailsInfo = {
                    debt: false,
                    highExpense: false,
                    legalDutyOtherPerson: false,
                    legalDutyOtherChild: false,
                    otherHardship: false,
                    otherHardshipDesc: ''   
                }

            }

            newChildSupportInfo.disagreeReason = {
                appIncome: disagreeInfo.incorrectIncome == "true",                
                opIncome: disagreeInfo.incorrectOpIncome == "true",
                opIncomeDesc: disagreeInfo.incorrectOpIncome == "true"?disagreeInfo.incorrectDescription:'',
                specialExpense: disagreeInfo.incorrectSpecialAndExtraordinaryExpenses == "true",
                specialExpenseDesc: disagreeInfo.incorrectSpecialAndExtraordinaryExpenses == "true"?disagreeInfo.incorrectSpecialAndExtraordinaryDescription:'',
                livingArrangements: disagreeInfo.incorrectTimeWithChild == "true",
                livingArrangementsDesc: disagreeInfo.incorrectTimeWithChild == "true"?disagreeInfo.incorrectTimeWithChildDescription:'',   
                undueHardship: disagreeInfo.causeUndueHardship == "true",
                undueHardshipDetails: undueHardshipDetailsInfo,
                other: disagreeInfo.disagreeOtherReason == 'y',
                otherDesc: disagreeInfo.disagreeOtherReason == 'y'? disagreeInfo.OtherReasonDescription:''
            }

        } else {

            const undueHardshipDetailsInfo = {
                debt: false,
                highExpense: false,
                legalDutyOtherPerson: false,
                legalDutyOtherChild: false,
                otherHardship: false,
                otherHardshipDesc: ''   
            }

            newChildSupportInfo.disagreeReason = {
                appIncome: false,                
                opIncome: false,
                opIncomeDesc: '',
                specialExpense: false,
                specialExpenseDesc: '',
                livingArrangements: false,
                livingArrangementsDesc: '',   
                undueHardship: false,
                undueHardshipDetails: undueHardshipDetailsInfo,
                other: false,
                otherDesc: ''
            }
        }

        if (this.result.flmAdditionalDocumentsSurvey){
            const additionalDocsInfo: rflmAdditionalDocsDataInfoType = this.result.flmAdditionalDocumentsSurvey;
        
            newChildSupportInfo.filing = additionalDocsInfo.isFilingAdditionalDocs == 'y';
        
        } else {
            newChildSupportInfo.filing = false;
        }

        if (this.result.rflmCalculatingChildSupportSurvey){
            const calculationInfo: rflmCalculatingChildSupportDataInfoType = this.result.rflmCalculatingChildSupportSurvey;
                    
            newChildSupportInfo.calculate = {                
                attaching: calculationInfo.attachingCalculations == 'y',
                reason: calculationInfo.attachingCalculations == 'n'?calculationInfo.notAttachingCalculationsReason:''
            } 
        
        } else {

            newChildSupportInfo.calculate = {                
                attaching: false,
                reason: ''
            } 

        } 
        
        return newChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>