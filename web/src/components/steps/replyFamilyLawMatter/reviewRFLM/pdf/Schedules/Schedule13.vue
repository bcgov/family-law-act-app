<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 13 – COUNTER APPLICATION CHILD SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 13 to the Reply to an Application About a Family Law Matter with Counter Application</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    Complete this schedule only if you are making a new counter application for child support and/or special and
                    extraordinary expenses for the child or children identified in section 13 of the reply with counter application.
                </i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">I am:</div>
                <div style="margin-left:1rem;">
                    <check-box 
                        :check="chSupInfo.appType.guardian?'yes':''" 
                        text="a parent or guardian of the child(ren)"/>
                    <check-box 
                        style="width:120%;" 
                        :check="chSupInfo.appType.standing?'yes':''" 
                        text="applying to be appointed as a guardian of the child(ren)"/>
                    <check-box  
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="chSupInfo.appType.other?'yes':''" 
                        text="other <i>(specify):</i>"/>
                    <underline-form 
                        style="text-indent:1px;display:inline-block;" 
                        textwidth="33rem" 
                        beforetext="" 
                        hint="" 
                        :text="chSupInfo.appType.otherCom"/>            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section> 
                The other party is:
                <div style="margin-left:1rem;">
                    <check-box  :check="chSupInfo.opType.guardian?'yes':''" text="a parent or guardian of the child(ren)"/>
                    <check-box style="width:120%;" :check="chSupInfo.opType.standing?'yes':''" text="a person standing in the place of a parent to the child(ren) <i>(for example, a step-parent)</i>"/>
                    <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.opType.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="chSupInfo.opType.otherCom"/>            
                </div>
            </section>


            <div style="margin-top:1rem;"></div>
<!-- <3> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    The child or children spend time with me and the other party as follows:                    
                </div>
                <div v-if="chSupInfo.currCond.timeDesc" 
                    class="answerbox">{{chSupInfo.currCond.timeDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <4> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    The current support arrangements are as follows:
                </div>
                <div v-if="chSupInfo.currCond.supArr" 
                    class="answerbox">{{chSupInfo.currCond.supArr}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <5> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box 
                        style="margin:0 0 0 0rem;" 
                        :check="!chSupInfo.opInfo.income?'yes':''" 
                        text="I do not know the income of the other party"/>
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="chSupInfo.opInfo.income?'yes':''" 
                        text="I believe the other party’s annual income is "/>
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="10rem" 
                        beforetext=" $" 
                        hint="" 
                        :text="chSupInfo.opInfo.incomeAmt"/>                            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I know the following facts about the other party’s employment, training, health and ability to work:</div>
                <i style="display:block; margin-left:1rem">If you do not have any information, please leave this section blank</i>
                <div v-if="chSupInfo.opInfo.facts" 
                    class="answerbox">{{chSupInfo.opInfo.factsDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>                 

            <div style="margin-top:3rem; font-weight: 700;">About the order</div>
<!-- <7> -->
            <section>
                <check-box class="marginleft1p5vue" inline="inline" boxMargin="0" style="display:inline-block;margin-left:0.5rem" :check="chSupInfo.desiredSup.payor?'yes':''" text=""/>
                <underline-form style="text-indent:0px;display:inline-block;" textwidth="15rem" beforetext="I am applying for an order for ongoing support to be paid by" hint="name of paying party" :text="chSupInfo.desiredSup.payor"/>
                <div style="display:block;text-indent:0px; margin-left:1.8rem;"> in the monthly amount set out in the child support guidelines table for the following child(ren) identified in section 12 of this application: </div>
                <div style="margin-left:1.25rem;">
                    <i class="marginleft1p5vue" style="display:inline" >List the name of each child you are applying for support for</i>
                    <underline-form v-for="(payee,inx) in chSupInfo.desiredSup.payees" :key="inx" style="text-indent:3px;display:inline-block;" textwidth="16.85rem" beforetext="" hint="" :text="payee"/>                   
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.desiredSup.over19?'yes':''" text="Each child I am applying for an order for child support for is under 19 years of age"/>
                    <check-box  :check="chSupInfo.desiredSup.over19?'yes':''" text="The following child(ren) is/are 19 years of age or older and need(s) child support because of illness, disability or because they are full-time students:"/>                    
                </div>
                <b-table
                    :items="over19ChildSupportDetails"
                    :fields="childrenSupportFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:11pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(reasonForSupport)>
                            Reason for child support <i style="font-size:6pt; font-weight:normal;">Select the applicable option</i>                            
                        </template>
                        <template v-slot:cell(reasonForSupport)="data">      
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0rem;" :check="data.value.illness?'yes':''" text="illness"/>
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0.25rem;" :check="data.value.disability?'yes':''" text="disability"/>
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0.25rem;" :check="data.value.student?'yes':''" text="student"/>
                        </template>
                </b-table>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Start of payment(s)</b></div>
<!-- <9> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Child support payments may start on a past (retroactive), present or future date or event, such as the date of separation, the date this application is made or the start date of a new job </i>
                    <div>
                        <underline-form style="margin:0 0 0 1rem;text-indent:0px;display:inline-block" textwidth="20rem" beforetext="Child support payments should start on" hint="mmm/dd/yyyy or event" :text="chSupInfo.desiredSup.startDate"/>
                        <div style="margin:0 0 0 0.5rem; display:inline;">because:</div>
                        <div v-if="chSupInfo.desiredSup.reason" 
                            class="answerbox">{{chSupInfo.desiredSup.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Calculations</b></div>
<!-- <10> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much child support I believe should be paid according to the child support guidelines"/>
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="chSupInfo.calc.reason" 
                        class="answerbox">{{chSupInfo.calc.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>  

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Undue hardship</b></div>
<!-- <11> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if applicable. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.ndHard.change?'yes':''" text="I am applying for an order to change the guideline amount payable because the guideline amount would cause me undue hardship for the following reason(s):<br/><i> Note:  If this option applies to your situation, you will need to complete the undue hardship portion of the Financial Statement, Part 4 and Part 5, in addition to any other required parts</i>"/>                    
                    </div>
                    <div style="margin:0 0 3rem 3.25rem;">
                        <check-box  :check="chSupInfo.ndHard.reasons.excessive?'yes':''" text="I have an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living"/>                    
                        <check-box  :check="chSupInfo.ndHard.reasons.high?'yes':''" text="I have unusually high expenses to exercise parenting time or contact with the child(ren)"/>
                        <check-box  :check="chSupInfo.ndHard.reasons.another?'yes':''" text="I have a legal duty to support another person, such as an ill or disabled person or a former spouse"/>
                        <check-box  :check="chSupInfo.ndHard.reasons.dependent?'yes':''" text="I have a legal duty to support a dependent child from another relationship"/>
                        <check-box  :check="chSupInfo.ndHard.reasons.other?'yes':''" text="other undue hardship circumstances <i>(specify):</i>"/>
                        <div v-if="chSupInfo.ndHard.reasons.other" 
                            class="answerbox">{{chSupInfo.ndHard.otherCom}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Special and extraordinary expenses</b></div>
<!-- <12> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.specExp.applying?'yes':''" text="I am not applying for an order for special and extraordinary expenses for the child(ren)"/>                    
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.specExp.applying?'yes':''" text="I am applying for an order for special and extraordinary expenses under section 7 of the child support guidelines. The following special or extraordinary expenses (net of tax credits, subsidies, deductions, credits and contributions from the child(ren)) are included in my application for child support:"/>
                    </div>
                    <b-table
                        :items="childrenSupportExpenseItem"
                        :fields="childrenSupportExpenseFields"
                        class="mt-2"
                        small                    
                        bordered>
                            <template v-slot:cell()="data">                            
                                <div v-if="data.index==0" style="text-align:center;font-size:7.43pt" ><b>{{data.value}}</b></div>
                                <div v-else style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                            </template>
                            <template v-slot:cell(name)="data">                            
                                <div v-if="data.index==0" style="text-align:right;font-size:7.43pt;" ><b>{{data.value}}</b></div>
                                <div v-else-if="data.index==7" style="text-align:right;font-size:7.43pt;" ><b>{{data.value}}</b></div>                            
                                <div v-else style="text-align:left;font-size:8pt;">{{data.value}}</div>                                           
                            </template>
                    </b-table>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <13> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.finStmnt.required?'yes':''" text="I am filing a Financial Statement in Form 4 with this application because the following applies to my situation:	<br/><i>Select all options that apply</i>"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.desiredSup.applicantPayor?'yes':''" text="I am the payor"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.currCond.splitShared?'yes':''" text="there is split or shared parenting time"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.desiredSup.over19?'yes':''" text="there is a child 19 years old or over for whom support is being applied for"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.opType.standing?'yes':''" text="a party has been acting as a parent to a child of the other party"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.desiredSup.payorErnsHigh?'yes':''" text="the paying parent earns more than $150,000 per year"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.specExp.applying?'yes':''" text="there is an application for special or extraordinary expenses for a child"/>
                        <check-box  :check="chSupInfo.finStmnt.required && chSupInfo.ndHard.change?'yes':''" text="I am claiming undue hardship"/>
                    </div>

                    <div style="margin:0.5rem 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.applyForCaseManagement && !chSupInfo.finStmnt.required?'yes':''" text="I am not required to file a Financial Statement at this time as none of these situations apply to me"/>
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.applyForCaseManagement?'yes':''" text="I am required to file a Financial Statement but I am not able to complete it at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE OTHER PARTY:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>
                    This family law case includes a counter application about child support. You must provide your financial
                    information with your reply to this application by completing and filing a Financial Statement in Form 4. 
                </b></div>
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
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { schedule3DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule13 extends Vue {

    @Prop({required:true})
    result!: any;
    
    @applicationState.State
    public applicantName!: nameInfoType;
   
    dataReady = false;   
    chSupInfo = {} as schedule3DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    over19ChildSupportDetails =[{name:'', reasonForSupport:{illness:false, disability:false, student:false}}]
    childrenSupportFields = [
        {key:"name",             label:"Full name of child",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"reasonForSupport", label:"Reason for child support", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ]

    childrenSupportExpenseItem =[
        {name:'Special and Extraordinary Expense', child0:"Annual Amount", child1:"Annual Amount", child2:"Annual Amount", child3:"Annual Amount"},
        {name:'Child care expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Portion of medical/dental premiums attributable to child', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Health related expenses that exceed insurance reimbursement by at least $100', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Extraordinary expenses for primary or secondary school', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Post-secondary school expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Extraordinary extracurricular activities expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Total', child0:"$", child1:"$", child2:"$", child3:"$"},
    ]
    childrenSupportExpenseFields = [
        {key:"name",   label:"Name of Child:", tdClass:"border-top-0 border-dark align-middle", thClass:"text-right border-dark border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"},
        {key:"child0", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child1", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child2", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child3", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        
    ]   

    public extractInfo(){
        this.chSupInfo = this.getNewChildSupportInfo();
    }

    public getNewChildSupportInfo(){
       
        let newChildSupportInfo = {} as schedule3DataInfoType;

        if (this.result.childSupportSurvey?.applicantGuardianType){
            newChildSupportInfo.appType = {
                guardian: this.result.childSupportSurvey.applicantGuardianType.includes('parentGuardian'),
                standing: this.result.childSupportSurvey.applicantGuardianType.includes('appointedGuardian'),
                other: this.result.childSupportSurvey.applicantGuardianType.includes('other'),
                otherCom: (this.result.childSupportSurvey.applicantGuardianType.includes('other') && this.result.childSupportSurvey.applicantGuardianTypeComment)? this.result.childSupportSurvey.applicantGuardianTypeComment: ''
            }
        }

        if (this.result.childSupportSurvey?.['otherParty[0]GuardianType']){
            newChildSupportInfo.opType = {
                guardian: this.result.childSupportSurvey['otherParty[0]GuardianType'].includes('parentGuardian'),
                standing: this.result.childSupportSurvey['otherParty[0]GuardianType'].includes('appointedGuardian'),
                other: this.result.childSupportSurvey['otherParty[0]GuardianType'].includes('other'),
                otherCom: (this.result.childSupportSurvey['otherParty[0]GuardianType'].includes('other') && this.result.childSupportSurvey['otherParty[0]GuardianTypeComment'])? this.result.childSupportSurvey['otherParty[0]GuardianTypeComment']: ''
            }
        }

        if (this.result.childSupportCurrentArrangementsSurvey){
            newChildSupportInfo.currCond = {
                splitShared: (this.result.childSupportCurrentArrangementsSurvey.applicantTimeType == 'y'),                
                timeDesc: (this.result.childSupportCurrentArrangementsSurvey.applicantTimeWithChildExplanation)? this.result.childSupportCurrentArrangementsSurvey.applicantTimeWithChildExplanation: '',
                supArr: (this.result.childSupportCurrentArrangementsSurvey.currentArrangmentExplanation)? this.result.childSupportCurrentArrangementsSurvey.currentArrangmentExplanation: ''
            }
        }

        if (this.result.incomeAndEarningPotentialSurvey){
            newChildSupportInfo.opInfo = {  
                facts: this.result.incomeAndEarningPotentialSurvey.knowFacts == 'y',
                income: this.result.incomeAndEarningPotentialSurvey.knowIncome == 'y',              
                factsDesc: (this.result.incomeAndEarningPotentialSurvey.knowFacts == 'y' && this.result.incomeAndEarningPotentialSurvey.factsExplanation)? this.result.incomeAndEarningPotentialSurvey.factsExplanation: '',
                incomeAmt: (this.result.incomeAndEarningPotentialSurvey.knowIncome == 'y' && this.result.incomeAndEarningPotentialSurvey.otherPartyIncome)? this.result.incomeAndEarningPotentialSurvey.otherPartyIncome: ''
            }
        }

        if (this.result.aboutChildSupportOrderSurvey){
            const aboutChildSupport = this.result.aboutChildSupportOrderSurvey;
            newChildSupportInfo.desiredSup = {  
                payor: aboutChildSupport.listOfSupportPayors.toString(),
                applicantPayor: (aboutChildSupport.listOfSupportPayors)?aboutChildSupport.listOfSupportPayors.includes(Vue.filter('getFullName')(this.applicantName)):false,
                payees: aboutChildSupport.listOfChildren,              
                over19: (aboutChildSupport.numberOf19yrsChild>0 && aboutChildSupport.supportChildOver19 == 'y'),
                payorErnsHigh:(aboutChildSupport.payorEarnsHigh == 'yes'),
                startDate: (aboutChildSupport.paymentRequestStartingDate.selected == 'startingDate')?Vue.filter('beautify-date')(aboutChildSupport.paymentRequestStartingDate.startingDate):aboutChildSupport.paymentRequestStartingDate.otherComment,
                reason: (aboutChildSupport.paymentRequestStartingDateWhy)? aboutChildSupport.paymentRequestStartingDateWhy: ''
            }
            if(aboutChildSupport.numberOf19yrsChild>0 && aboutChildSupport.supportChildOver19 == 'y')this.over19ChildSupportDetails = aboutChildSupport.over19Details;
        }        

        if (this.result.calculatingChildSupportSurvey){
            newChildSupportInfo.calc = {                
                attaching: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'y'),
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
            const extraordinaryExpensesCondition = this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y'
            newChildSupportInfo.specExp = {                
                applying: (extraordinaryExpensesCondition)
            }
            if(extraordinaryExpensesCondition && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseFields){
                this.childrenSupportExpenseItem = this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem
                this.childrenSupportExpenseFields = [{key:"name",    label:"Name of Child:", tdClass:"border-top-0 border-dark align-middle", thClass:"text-right border-dark border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"}]
                const tableFields = this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseFields
                if(tableFields)
                    for(let i=1; i<tableFields.length; i++)
                        this.childrenSupportExpenseFields.push({key:tableFields[i].key, label:tableFields[i].label,  tdClass:"border-dark align-middle text-center",  thClass:"border-dark align-middle text-center",   thStyle:"width:17%;"},)

            }            
        }

        newChildSupportInfo.finStmnt = {
            required: (newChildSupportInfo.desiredSup.applicantPayor ||
                    newChildSupportInfo.desiredSup.over19 ||
                    newChildSupportInfo.desiredSup.payorErnsHigh ||
                    newChildSupportInfo.currCond.splitShared ||
                    newChildSupportInfo.specExp.applying ||
                    newChildSupportInfo.opType.standing ||
                    newChildSupportInfo.ndHard.change)
        };

        let form4unable = false;

        if(this.result.flmAdditionalDocumentsSurvey?.unableFileForms){
            for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
                if(form.includes("Financial Statement Form 4")){
                    form4unable = true;
                }
            }   
        }

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && form4unable ){
           newChildSupportInfo.applyForCaseManagement = true
            newChildSupportInfo.finStmnt = {
                required: false
            }
        }

        return newChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>