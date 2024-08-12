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
                    <NoteBox fontSize="10pt">
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
                            <check-box boxMargin="0" shiftmark="0" :check="chSupInfo.opType.guardian?'yes':''" text="a parent or guardian of the child(ren)"/>
                            <check-box boxMargin="0" shiftmark="0" :check="chSupInfo.opType.standing?'yes':''" text="a person standing in the place of a parent to the child(ren) <br> <i>(for example, a step-parent)</i>"/>
                            <check-box boxMargin="0" shiftmark="0"  inline="inline" :check="chSupInfo.opType.other?'yes':''" text="other <i>(specify):</i>"/>
                            <div class="answerbox" style="min-height: 12px; padding: 8px; background: #dedede;"> {{chSupInfo.opType.otherCom}} </div>            
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>                
                            A child has the right to be supported by both parents, whether the parents ever lived together, or the parent has ever lived with the child. Other guardians and step parents may also be responsible for paying child support [s. 147 Family Law Act]
                        </p>
                    </NoteBox>
                </div> 
            </div>
           
            <div style="margin-top: 10px;"></div>

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Current circumstances"></FormPart>
                <!-- <2> -->
                    <div style="display:inline; margin-left:0.25rem">
                    <b>2.</b>  The <b>current support arrangements</b> are as follows:
                    </div>
                    <div v-if="chSupInfo.currCond.supArr" 
                        class="answerbox" style="min-height: 80px; padding: 8px;  background: #dedede;">{{chSupInfo.currCond.supArr}}</div>
                    <div v-else class="answerbox" style="min-height: 80px; padding: 8px;  background: #dedede;"></div>

                <!-- <3> -->
            
                    <div style="display:inline; margin-left:0.25rem">
                    <b>3.</b>The child or children <b>currently spend time</b> with each party as follows
                    </div>
                    <div v-if="chSupInfo.currCond.timeDesc" 
                    class="answerbox" style="min-width: 80px; padding: 8px; background: #dedede;">{{chSupInfo.currCond.timeDesc}}</div>
                    <div v-else class="answerbox" style="min-width: 80px; padding: 8px; background: #dedede;"></div> 
                    
                    <div>
                        <i style="display:inline; margin-left:0.35rem"><b>4. </b>Select only one of the options below</i>
                        <div style="margin:0 0 0 1rem;">
                            <check-box boxMargin="0" shiftmark="0" :check="!chSupInfo.desiredSup.over19?'yes':''" text="Each child I am applying for an order for child support for is <b>under 19 years of age</b>"/>
                            <check-box boxMargin="0" shiftmark="0" :check="chSupInfo.desiredSup.over19?'yes':''" text="The following child(ren) is/are <b>19 years of age or older</b> and need(s) child support because of illness, disability or because they are full-time students:"/>                    
                        </div>
                        
                        <b-table
                            :items="over19ChildSupportDetails"
                            :fields="childrenSupportFields"
                            class="mt-2"
                            small
                            bordered>                    
                                <template v-slot:cell()="data">
                                    <div style="font-size:11pt;color:#000; background: #d6d6d6; height: 22px">{{data.value}}</div>                                           
                                </template>
                                <template v-slot:head(reasonForSupport)>
                                    Reason for child support <i style="font-size:6pt; font-weight:normal;">Select the applicable option</i>                            
                                </template>
                                <template v-slot:cell(reasonForSupport)="data">      
                                    <check-box inline="inline" style="display: inline; margin-left: 2px; font-size: 10pt;" boxMargin="0" shiftmark="0" marginLeft="15px" :check="data.value.illness?'yes':''" text="illness"/>
                                    <check-box inline="inline" style="display: inline; margin-left: 2px;  font-size: 10pt;" boxMargin="0" shiftmark="0" marginLeft="15px" :check="data.value.disability?'yes':''" text="disability"/>
                                    <check-box inline="inline" style="display: inline; margin-left: 2px;  font-size: 10pt;" boxMargin="0" shiftmark="0" marginLeft="15px" :check="data.value.student?'yes':''" text="student"/>
                                </template>
                        </b-table>
                    </div>
                </div>
                <div style="width: 20%;">
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
                <NoteBox fontSize="10pt">
                    <p>
                        The amount of a child support order is usually the amount set out in the Federal Child Support Guidelines table according to the number of eligible children and the income of the spouse against whom the order is sought, and the amount, if any, determined for section 7 special or extraordinary expenses [s. 3 Federal Child Support Guidelines]  
                    </p>
                </NoteBox>
            </div>
            <div style="width: 20%;"></div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">    
                <p><b>5.</b><i> Select each applicable option and complete the requested information</i></p>
                <check-box inline="inline" textDisplay="inline" boxMargin="0" shiftmark="0" style="display: inline;" :check="chSupInfo.desiredSup.payor?'yes':''" text="I am applying for an order for ongoing support to be paid by (<i>name of paying party</i>)"/>
                <div class="answerbox" style="display:inline; padding: 2px 16px; background: #dedede;">{{chSupInfo.desiredSup.payor}}</div>
                <div style="display:inline;text-indent:0px;"> in the monthly amount set out in the child support guidelines for <i>(number)</i> 
                    <p class="answerbox" style="display: inline; padding: 2px 16px; background: #dedede;">{{result.calculatingChildSupportSurvey.amountOfChildSupportPerMonth}}</p> child(ren). 
                </div>
                <div style="margin-left:3rem;">
                        <check-box style="display: inline;" textDisplay="inline" boxMargin="0" shiftmark="0" :check="result.calculatingChildSupportSurvey.ableToProvideAmountOfChildSupportPerMonth =='y'?'yes': ''"  text="Based on the information I know about the other party’s income and my application for child supportI expect the amount payable for monthly child support to be approximately $"/> 
                        <p class="answerbox" style="display: inline; padding: 2px 16px; background: #dedede;">{{result.calculatingChildSupportSurvey.amountOfChildSupportPerMonth}}</p>
                    
                        <br>
                    
                        <check-box boxMargin="0" shiftmark="0" :check="result.calculatingChildSupportSurvey.ableToProvideAmountOfChildSupportPerMonth !='y'?'yes': ''" text="I am not able to estimate the amount payable for monthly child support at this time."/>   
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-book></b-icon-book>
                    <p>
                        For more information about how to calculate the amount payable for child support, see the guidebook. 
                    </p>
                </NoteBox>
            </div>
        </div>
            
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">    
                <div>    
                    <div>
                        <check-box style="margin:0 0 0 0rem;" boxMargin="0" shiftmark="0" :check="chSupInfo.specExp.applying?'yes':''" text="I am applying for an order for <b>special or extraordinary expenses </b>under section 7 of the child support guidelines as follows:"/>
                    </div>
                    <div style="padding-left:24px">
                        <p><i>List the expenses you are claiming for each child.</i><br>
                        <i>You must file a Financial Statement Form 4 to itemize the specific amounts</i></p>
                        <div class="answerbox" style="min-height: 40px; background: #dedede;"></div>
                    </div>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox >
                    <b-icon-book></b-icon-book>
                    <p>
                        For more information about what can be included as special or extraordinary expenses, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 10px;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">  
                <div>
                    <div>
                        <div style="margin:0 0 0 1.5rem;">
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.change?'yes':''" text="I am applying for an order to <b>change the guideline amount payable</b> because the guideline amount would cause me <b>undue hardship</b> because i have:"/>                    
                        </div>
                        <div style="margin:0 0 3rem 3.25rem;">
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.reasons.excessive?'yes':''" text="an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living"/>                    
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.reasons.high?'yes':''" text="unusually high expenses to exercise parenting time or contact with the child(ren"/>
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.reasons.another?'yes':''" text="a legal duty to support another person, such as an ill or disabled person or a former spouse"/>
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.reasons.dependent?'yes':''" text="a legal duty to support a dependent child from another relationship"/>
                            <check-box boxShift="0" shiftmark="0" :check="chSupInfo.ndHard.reasons.other?'yes':''" text="other undue hardship circumstances <i>(specify):</i>"/>
                            <div class="answerbox" style="min-height: 40px; padding: 8px; background: #dedede;">
                                <span v-if="chSupInfo.ndHard.reasons.other">
                                    {{ chSupInfo.ndHard.otherCom }}
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%">    
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court may order child support in an amount different from the guidelines if appropriate [s. 10 Child Support Guidelines]
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">  
                <div class="print-block">        
                    <GreyBoxForm textwidth="10rem" hintindent="20px" beforetext="<b>6.</b> Child support payments should <b>start on</b>" hint="Date (dd/mmm/yyyy) or event" :text="chSupInfo.desiredSup.startDate"/>
                    <div style="margin:0 0 0 0.5rem; display:inline;">because:</div>
                    <div v-if="chSupInfo.desiredSup.reason" 
                        class="answerbox" style="padding: 8px; min-height: 40px; background: #dedede;">{{chSupInfo.desiredSup.reason}}</div>
                    <div v-else class="answerbox" style="padding: 8px; min-height: 40px; background: #dedede;"></div>
                </div>
            </div>
            <div style="width: 20%;">   
                <NoteBox  >
                    <b-icon-info-circle-fill />
                    <p>
                        In making an order about child support, the court may provide that support be paid respecting any period of time before the application is made [s. 170 Family Law Act]. 
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 10px;"></div>
                
        <!-- <Part 4> -->           
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="Income information"></FormPart>
                <div>
                    <b>7. </b> One or more of the following <b>applies to my application</b> for child support:
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
                        
                        <check-box boxMargin="0" shiftmark="0" :check="false"  text="<b>Yes</b> - <i>You are required to file a Financial Statement Form 4. Complete <b>Question 8</b>.</i>"/>
                        <check-box boxMargin="0" shiftmark="0" :check="false" text="<b>No</b> - <i>You are not required to file a Financial Statement Form 4 at this time. Skip to <b>Question 9</b>.</i>"/>
                        
                    </div>
                </div>
                <div style="background: #eee; border: 2px dashed #333; padding: 4px;">
                    <p><b>IMPORTANT NOTE:</b></p>
                    <p>You may also provide this financial information before receiving the other party’s reply to avoid delay, if you believe that the income of the other party is over $150,000 per year or that they will claim undue hardship, special or extraordinary expenses,or child support from you.</p>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Child support is based in part on income. If a party’s income information is necessary, they have an obligation to provide information to the court, or the court may impute income [ss. 15to 25 Child Support Guidelines]
                    </p>
                </NoteBox>
            </div>
        </div>
        <div style="margin-top: 10px;"></div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="padding-top: 12px;">  
                    <p><b>8. I am required to file </b>a Financial Statement Form 4 to provide my income information to the court.</p>   
                    <i>Select only one of the options below</i> 
                    
                    <check-box boxMargin="0" shiftmark="0" :check="false" text="<b>I am filing</b> a Financial Statement in Form 4 with this application."/>
                    <check-box boxMargin="0" shiftmark="0" :check="false" text="I am <b>not able to file</b> a Financial Statement in Form 4 with this application."/>
                    <div style="padding-left:28px">
                        <p>I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive or modify the requirement that my income information in Form 4 be provided with this application. I understand I will still be required to file a Financial Statement in Form 4 at a later date.</p>
                    </div>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle />
                    <p>
                        You must file a Financial Statement Form 4 or an Application for Case Management Order Without Notice or Attendance Form 11.
                    </p>
                </NoteBox>
            </div>
        </div>
        <div style="margin-top: 10px;"></div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <i style="display:inline; margin-left:0.35rem"><b>9. </b>Select only one of the options below and provide the requested information</i>
                    <div style="margin:0 0 0 1rem;">
        
                        <check-box boxMargin="0" shiftmark="0" textDisplay="inline-block" style="display:inline-block;" :check="chSupInfo.opInfo.income?'yes':''" text="I believe the <b>payor’s annual income</b> is "/>
                        <GreyBoxForm style="display:inline; margin-left:2px;" textwidth="10rem" beforetext=" $" hint="" :text="chSupInfo.opInfo.incomeAmt"/>  because: 
                        <div class="answerbox" style="min-height: 80px; padding: 8px; background: #dedede;"></div> 
                        <check-box boxMargin="0" shiftmark="0" :check="!chSupInfo.opInfo.income?'yes':''" text="I <b>do not know the income</b> of the payor. I can provide the following facts about the payor’s employment (past or present), training, health and ability to work:"/>   
                        <div v-if="chSupInfo.opInfo.facts" 
                            class="answerbox" style="min-height: 80px; padding: 8px; background: #dedede;">{{chSupInfo.opInfo.factsDesc}}</div>
                        <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background: #dedede;"></div>
                    </div>
                </div>

                <div class="print-block" style="background: #eee; border: 2px dashed #333; padding: 4px;">
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
            <div style="width: 20%;">
                
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
        console.log(this.result, this.chSupInfo)
    } 

    over19ChildSupportDetails =[{name:'', reasonForSupport:{illness:false, disability:false, student:false}}]
    childrenSupportFields = [
        {key:"name",             label:"Full name of child",       tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"reasonForSupport", label:"Reason for child support", tdClass:"border-dark ", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
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