<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 3" scheduleTitle="Child Support" scheduleDescription="No existing final order or written agreement"></ScheduleHeader>
                </div>
                <div style="width: 20%;"></div>
            </div>
            <div style="margin-bottom: 1rem;"></div>

             <div style="display: flex; flex-direction: row; flex-wrap: no-wrap;">
                <div style="flex: 1">
                    <NoteBox>
                        <p>Complete this schedule only if you need a court order about child support and you do not have an existing final court order or written agreement about child support.</p>
                    </NoteBox>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>
        <!-- <Part - 1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="About the payor"></FormPart>
                    <div> 
                        
                        <b>1.</b>The <b>payor</b> is:
                        <div style="margin-left:1rem;">
                            <check-box  :check="chSupInfo.opType.guardian?'yes':''" text="a parent or guardian of the child(ren)"/>
                            <check-box style="width:120%;" :check="chSupInfo.opType.standing?'yes':''" text="a person standing in the place of a parent to the child(ren) <i>(for example, a step-parent)</i>"/>
                            <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.opType.other?'yes':''" text="other <i>(specify):</i>"/>
                            <GreyBoxForm style="text-indent:1px;" textwidth="33rem" beforetext="" hint="" :text="chSupInfo.opType.otherCom"/>            
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>                
                            A child has the right to be supported by both parents, whether the parents ever lived together, or the parent has ever lived with the child.Other guardians and stepparents may also be responsible for paying child support [s. 147 Family Law Act]
                        </p>
                    </NoteBox>
                </div> 
            </div>
          
            <div style="margin-top:1rem;"></div>
        <!-- Part - 2 -->
                
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Current circumstances"></FormPart>
                <!-- <2> -->
                    <div style="display:inline; margin-left:0.25rem">
                    <b>2.</b>  The <b>current support arrangements</b> are as follows:
                    </div>
                    <div v-if="chSupInfo.currCond.supArr" 
                        class="answerbox">{{chSupInfo.currCond.supArr}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                <!-- <3> -->
            
                    <div style="display:inline; margin-left:0.25rem">
                    <b>3.</b>The child or children <b>currently spend time</b> with each party as follows
                    </div>
                    <div v-if="chSupInfo.currCond.timeDesc" 
                        class="answerbox">{{chSupInfo.currCond.timeDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                    
                    <div>
                        <i style="display:inline; margin-left:0.35rem"><b>4. </b>Select only one of the options below</i>
                        <div style="margin:0 0 0 1rem;">
                            <check-box style="margin:0 0 0 1rem;" :check="!chSupInfo.desiredSup.over19?'yes':''" text="Each child I am applying for an order for child support for is under 19 years of age"/>
                            <check-box style="margin:0 0 0 1rem;" :check="chSupInfo.desiredSup.over19?'yes':''" text="The following child(ren) is/are 19 years of age or older and need(s) child support because of illness, disability or because they are full-time students:"/>                    
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
                    </div>
                </div>
                <div style="width: 20%; padding-top:180px">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                        
                            A child, for the purposes of child support, includes a person who is over 19 years of age, and is unable because of illness, disability or another reason to obtain the necessities of life or withdraw from the charge of their parents [s. 146 Family Law Act]
                        </p>
                    </NoteBox>
                </div>    
            </div>

<!-- Part - 3 -->
           
<div style="display: flex; flex-direction: row;">
    <div style="width: 80%; padding-right: 4px;">
        <FormPart :part="3" title="Order about child support"></FormPart>   
    <div style="    background-color: rgb(214, 214, 214);
    padding: 8px;
    font-size: 7pt;
    border-radius: 0px;
    border: 0px;">
        <p>
            The amount of a child support order is usually the amount set out in the Federal Child Support Guidelines table according to the number of eligible children and the income of the spouse against whom the order is sought, and the amount, if any, determined for section 7 special or extraordinary expenses [s. 3 Federal Child Support Guidelines]  
        </p>
    </div>
    <div style="margin-top:1rem;"></div>
    <div>
        <p><b>5.</b><i> Select each applicable option and complete the requested information</i></p>
        <check-box class="marginleft1p5vue" inline="inline" boxMargin="0" style="display:inline-block;margin-left:0.5rem" :check="chSupInfo.desiredSup.payor?'yes':''" text=""/>
        <GreyBoxForm style="text-indent:0px;display:inline-block;" textwidth="15rem" beforetext="I am applying for an order for ongoing support to be paid by" hint="name of paying party" :text="chSupInfo.desiredSup.payor"/>
        <div style="display:block;text-indent:0px; margin-left:1.8rem;"> in the monthly amount set out in the child support guidelines for child(ren). </div>
        <div style="margin-left:3rem;">
            <!-- TODO: check -->
                <check-box style="margin:0 0 0 1rem;" :check="false"  text="Based on the information I know about the other party’s income and my application for child support I expect the amount payable for monthly child support to be approximately"/>
                <check-box style="margin:0 0 0 1rem;" :check="false" text="I am not able to estimate the amount payable for monthly child support at this time."/>   
        </div>
    </div>
    <div class="print-block">
            <div style="margin:0 0 0 2.5rem;">
                <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.specExp.applying?'yes':''" text="I am applying for an order for <b>special or extraordinary expenses </b>under section7 of the child support guidelines as follows:"/>
            </div>
            <div style="padding-left:24px">
            <p><i>List the expenses you are claiming for each child.</i><br>
            <i>You must file a Financial Statement Form 4 to itemize the specific amounts</i></p>
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
        </div>
    </div>

    <div class="print-block">
       
        <div>
            <div style="margin:0 0 0 1.5rem;">
                <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.ndHard.change?'yes':''" text="I am applying for an order to <b>change the guideline amount payable</b> because the guideline amount would cause me <b>undue hardship</b> because i have:"/>                    
            </div>
            <div style="margin:0 0 3rem 3.25rem;">
                <check-box  :check="chSupInfo.ndHard.reasons.excessive?'yes':''" text="an unusual or excessive amount of debt I incurred to support the familyprior to separation or to earn a living"/>                    
                <check-box  :check="chSupInfo.ndHard.reasons.high?'yes':''" text="unusually high expenses to exercise parenting time or contact with thechild(ren"/>
                <check-box  :check="chSupInfo.ndHard.reasons.another?'yes':''" text="a legal duty to support another person, such as an ill or disabled person ora former spouse"/>
                <check-box  :check="chSupInfo.ndHard.reasons.dependent?'yes':''" text="a legal duty to support a dependent child from another relationship"/>
                <check-box  :check="chSupInfo.ndHard.reasons.other?'yes':''" text="other undue hardship circumstances <i>(specify):</i>"/>
                <div v-if="chSupInfo.ndHard.reasons.other" 
                    class="answerbox">{{chSupInfo.ndHard.otherCom}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>
        </div>
    </div>

    <div class="print-block">
        <div>
           
            <div>
                <GreyBoxForm style="margin:0 0 0 1rem;text-indent:0px;display:inline-block" textwidth="20rem" beforetext="<b>6.</b> Child support payments should <b>start on</b>" hint="mmm/dd/yyyy or event" :text="chSupInfo.desiredSup.startDate"/>
                <div style="margin:0 0 0 0.5rem; display:inline;">because:</div>
                <div v-if="chSupInfo.desiredSup.reason" 
                    class="answerbox">{{chSupInfo.desiredSup.reason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>
        </div>
    </div>
   

</div>
<div style="width: 20%; padding-top:180px">
    <NoteBox>
        <b-icon-book></b-icon-book>
        <p>
            For more information about how to calculate the amount payable for child support, see the guidebook. 
        </p>
    </NoteBox>
    <div style="padding-top:10px">
        <NoteBox  >
            <b-icon-book></b-icon-book>
            <p>
                For more information about what can be included as special or extraordinary expenses, see the guidebook.
            </p>
        </NoteBox>
    </div>
    <div style="padding-top:320px">
        <NoteBox  >
            <b-icon-info-circle-fill />
            <p>
                The court may order child support in an amount different from the guidelines if appropriate [s. 10 Child Support Guidelines]
            </p>
        </NoteBox>
    </div>
    <div style="padding-top:10px">
        <NoteBox  >
            <b-icon-info-circle-fill />
            <p>
                In making an order about child support, the court may provide that support be paid respecting any period of time before the application is made [s. 170 Family Law Act]. 
            </p>
        </NoteBox>
    </div>
   
</div>

</div>
           
 <!-- <Part 4> -->           
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
        <FormPart :part="4" title="Income information"></FormPart>
        <div>
            One or more of the following applies to my applicationfor child support:
            <ul>
                <li>
                    I am the payor 
                </li>
                <li>
                    there is split or shared parenting time for one or more of the children
                </li>
                <li>there is child 19 years or older for whom support is being applied for</li>
                <li>a party has been acting as a parent to a child of the other party</li>
                <li>the payor earns more than $150,000 per year</li>
                <li>there is an application for section 7 special or extraordinary expenses</li>
                <li>I am claiming undue hardship</li>
            </ul>
            <div>        
                <!-- TODO: check -->
                <check-box style="margin:0 0 0 1rem;" :check="false"  text="Yes --> You are required to file a Financial Statement Form 4. Complete Question 8."/>
                <check-box style="margin:0 0 0 1rem;" :check="false" text="No --> You are not requiredto file a Financial Statement Form 4 at this time.Skip to Question 9."/>
                
            </div>
        </div>
        <div style="background: #eee; border: 2px dashed #333; padding: 4px;">
            <p><b>IMPORTANT NOTE:</b></p>
            <p>You may also provide this financial information before receiving the other party’s replyto avoid delay, if you believe that the income of the other party is over $150,000 per year or that they will claim undue hardship, special or extraordinary expenses,or child support from you.</p>
        </div>

        <div style="padding-top: 12px;">  
            <p><b>8. I am required to file </b>a Financial Statement Form 4 to provide my income information to the court.</p>   
            <i>Select only one of the options below</i> 
              <!-- TODO: check -->
            <check-box style="margin:0 0 0 1rem;" :check="false" text="I am filing a Financial Statement in Form 4 with this application."/>
  3          <check-box style="margin:0 0 0 1rem;" :check="false" text="I am not able to file a Financial Statement in Form 4 with this application."/>
            <div style="padding-left:24px">
                <p>I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive or modify the requirement that myincome information in Form 4 be provided with this application. I understand Iwill still be required to file a Financial Statement in Form 4 at a later date</p>
            </div>
        </div>
        <div>
            <i style="display:inline; margin-left:0.35rem"><b>9. </b>Select only one of the options below and provide the requested information</i>
            <div style="margin:0 0 0 1rem;">
 
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.opInfo.income?'yes':''" text="I believe the <b>payor’s annual income</b> is "/>
                <GreyBoxForm style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext=" $" hint="" :text="chSupInfo.opInfo.incomeAmt"/>   
                <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.opInfo.income?'yes':''" text="I <b>do not know the income</b> of the payor.I can provide the following facts about the payor’s employment (past or present), training, health and ability to work:"/>   
                 <div v-if="chSupInfo.opInfo.facts" 
                    class="answerbox">{{chSupInfo.opInfo.factsDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>
        </div>

        <div style="background: #eee; border: 2px dashed #333; padding: 4px;">
            <p><b>IMPORTANT NOTE TO THE OTHER PARTY:</b></p>
            <p>You may also provide this financial information before receiving the other party’s replyto avoid delay, if you believe that the income of the other party is over $150,000 per year or that they will claim undue hardship, special or extraordinary expenses,or child support from you.</p>
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
    <div style="width: 20%; padding-top:60px">
        <NoteBox>
            <b-icon-info-circle-fill />
            <p>
                Child support is based in part on income. If a party’s income information is necessary, they have an obligation to provide information to the court, or the court may impute income [ss. 15to 25 Child Support Guidelines]
            </p>
        </NoteBox>
        <div style="padding-top:120px">
        <NoteBox>
            <b-icon-info-circle-fill />
            <p>
                You must file a Financial Statement Form 4 or an Application for Case Management Order Without Notice or Attendance Form 11.
            </p>
        </NoteBox>
        </div>
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
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        ScheduleHeader,
        NoteBox,
        FormPart,
        GreyBoxForm
    }
})
export default class Schedule3 extends Vue {

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