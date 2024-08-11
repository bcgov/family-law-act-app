<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" ></div>            
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px; text-align: center;">
                    <ScheduleHeader scheduleNumber="Schedule 2" scheduleTitle="Child Support" scheduleDescription="Disagree with order requested by other party"/>
                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox>
                        <p>
                            Complete this schedule only if you disagree with all or part of the order about child support applied for by the other party on Schedule 3 or Schedule 4 of their Application About a Family Law Matter.
                        </p>
                    </NoteBox>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Child support is the amount of money a parent or guardian pays to another parent or guardian to help care for a child.
                        </p>
                    </NoteBox>
                </div>  
            </div>

            <div style="margin-top: 1rem;"></div>
        <!-- <Part 1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="About You"></FormPart>
            <div class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem"><b>1. I am:</b></div>
                <div style="margin-left:1rem;">
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                            style="text-indent: 5px;" :check="chSupInfo.appType.parent?'yes':''" text="a parent or guardian of the child(ren)"  />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                            style="text-indent: 5px;"  :check="chSupInfo.appType.standing?'yes':''" text="a person standing in the place of a parent to the child(ren) <br><i>(for example, a step-parent)</i>"  />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                            style="text-indent: 5px;" :check="chSupInfo.appType.notParent?'yes':''"   text="not a parent or guardian of the child(ren)" />
                      
                    </div>
                    <div style="display: block;">       
                        <check-box 
                        style="margin-left:3rem;" 
                        :check="chSupInfo.appType.parentageTestReq?'yes':''" 
                        text="<i>(Select only if applicable)</i> <b>I request a parentage test</b> "/>
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                        style="text-indent: 5px;" :check="chSupInfo.appType.notStanding?'yes':''" 
                        text="not a person standing in the place of a parent to the child(ren) <br> <i>(for example, a step-parent</i>"/> 
                      
                    </div>                        
                </div>   
            </div>
            
        </div>
        <div style="width: 20%;">
        <NoteBox>
            <b-icon-info-circle-fill />
            <p>
                If there is more than one child the application is about, and your relationship is different, you may select more than one option and list the name(s) of the child at the end of the statement to which it applies.
            </p>
        </NoteBox>
        </div>  
    </div>

        <div style="margin-top:1rem;"></div>
        <!-- <Part 2> -->
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Reason you disagre"></FormPart>
            <div class="resetquestion" > 
                <div style="display:inline; margin-left:0.25rem"><b>2. I do not agree:</b> e with the order requested by the other party about child support because: <br>
                <i>Select each option that applies and complete the required information, as applicable</i>
                </div>         
                <div style="margin-left: 1rem;"> 
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.appIncome?'yes':''" 
                        text="<b>My income</b> is not what the other party claims it is" />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.opIncome?'yes':''" 
                        text="the other party’s income is not what they claim it is" />
                    </div>
                     <GreyBoxForm v-if="chSupInfo.disagreeReason.opIncome && chSupInfo.disagreeReason.opIncomeDesc"  style="margin-top:10px; text-indent:0rem"
                            textwidth="30rem" :text="chSupInfo.disagreeReason.opIncomeDesc">
 
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>

                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.specialExpense?'yes':''" 
                        text="I believe the <b>special and extraordinary expenses</b> are not what the other party claims they are <i>(please explain)</i>" />
                    </div>
                     <GreyBoxForm  v-if="chSupInfo.disagreeReason.specialExpense && chSupInfo.disagreeReason.specialExpenseDesc"  style="margin-top:10px; text-indent:0rem"
                            textwidth="30rem" :text="chSupInfo.disagreeReason.specialExpenseDesc">
 
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>

                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.livingArrangements?'yes':''" 
                        text="The <b>living arrangements</b> for the child(ren) are not as described <br> <i>Please describe the child(ren)’s living arrangements:</i>"/>
                    </div>
                     <GreyBoxForm  v-if="chSupInfo.disagreeReason.livingArrangements && chSupInfo.disagreeReason.livingArrangementsDesc"  style="margin-top:10px; text-indent:0rem"
                            textwidth="30rem" :text="chSupInfo.disagreeReason.livingArrangementsDesc">
 
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>
                </div>
                  
                <div style="margin-left:1rem;">  
                    
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship?'yes':''" 
                         text="The amount would cause me <b>undue hardship</b> because:" />
                    </div>
                    <div style="margin-left:1.5rem;">   
                        
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.debt?'yes':''" 
                            text="I have an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living" />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.highExpense?'yes':''" 
                            text="I have unusually high expenses to exercise parenting time or contact with the child(ren)" />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.legalDutyOtherPerson?'yes':''"
                            text="I have a legal duty to support another person, such as an ill or disabled person or a former spouse" />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.legalDutyOtherChild?'yes':''"
                            text="I have a legal duty to support a dependent child from another relationship"
                         />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardship?'yes':''"
                            text="other undue hardship circumstances <i>(specify)</i>:" />
                    </div>
                    <GreyBoxForm   v-if="chSupInfo.disagreeReason.undueHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardship && chSupInfo.disagreeReason.undueHardshipDetails.otherHardshipDesc" style="margin-top:10px; text-indent:0rem"
                            textwidth="25rem" :text="chSupInfo.disagreeReason.undueHardshipDetails.otherHardshipDesc">
 
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="25rem"></GreyBoxForm>
                    </div>
                </div>

                <div style="margin-left:1rem;">  
                    
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.disagreeReason.other?'yes':''" 
                        text="other reason <i>(specify)</i>:" />
                    </div>
                    <GreyBoxForm  v-if="chSupInfo.disagreeReason.other &&
                        chSupInfo.disagreeReason.otherDesc"  style="margin-top:10px; text-indent:0rem"
                            textwidth="25rem" :text="chSupInfo.disagreeReason.otherDesc">
 
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="25rem"></GreyBoxForm>
                    </div>
                </div>                    
            </div> 
            <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The amount of child support is usually based on the Federal Child Support Guidelines using each party’s income and the living arrangements for a child. It is meant to cover regular expenses like clothes, food and housing. 
                        </p>
                       
                    </NoteBox>
                    <div style="padding-top: 45px;">
                        <NoteBox>
                        <b-icon-book />
                        <p>
                            For more information about how the amount payable for child support is calculated, see the guidebook. 
                        </p>
                       
                    </NoteBox>
                    </div>
                    <div style="padding-top: 230px; padding-bottom: 20px;">
                        <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            If you disagree with details of the order such as when payments should start, you can include that under other reasons and give suggested options. 

                        </p>
                       
                    </NoteBox>
                    </div>
                </div> 
          </div>    
      </div>  
      
      <div style="margin-top:1rem;"></div>
       <!-- <Part 3> -->
      <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="3" title="Existing final order or agreement – Complete this part only if there is an existing order or agreement about child support"></FormPart> 
            <div style="display:inline; margin-left:0.25rem"><b>3.</b><i> Select only one of the options below</i></div>
            <div style="margin-left: 1rem;"> 
                   <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="exChSupInfo.continue?'yes':''" 
                            text="I would like the final order or agreement to <b>continue to be in place</b>" />
                    </div>
                    <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                                :check="exChSupInfo.change?'yes':''" 
                                text="I am applying for the final order or agreement to be <b>changed, suspended or replaced </b> as set out in Part 4" />
                    </div>
            </div>
            
            <div style="display:inline; margin-left:0.25rem"><b>4.</b><i> Select only one of the options below</i></div>
            <div style="margin-left: 1rem;"> 
                   <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="exChSupInfo.unpaidDetails.agreeAmount?'yes':''" 
                        text="I agree that the <b>amount of unpaid child support</b> (arrears) in the application <b>is correct</b>" />
                    </div>
                    <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                                :check="!exChSupInfo.unpaidDetails.agreeAmount?'yes':''" 
                            text="The amount of unpaid child support (arrears) in the application is <b>not correct.</b>"/>
        
                    </div>
                    <GreyBoxForm
                            style="margin-left:2rem; text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="9rem" 
                            beforetext="As of " 
                            aftertext=", the amount of unpaid child support(apprears)"
                            hint="date" hintindent = "40px"   :text="exChSupInfo.unpaidDetails.crntDate"/>
                        <GreyBoxForm
                            style="margin-left:2rem; text-indent:0px;" 
                            textwidth="8rem" 
                            beforetext="was $" 
                            hint="" 
                            marginTop="-12px"
                            :text="exChSupInfo.unpaidDetails.unpaidAmnt"/>
            </div>


        </div>
        <div style="width: 20%;">
        </div>
        </div>

        <div style="margin-top:1rem;"></div>
     <!-- <Part 4> -->
      <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="4" title=" Order about child support – You do not need to complete this part if have indicated you would like the existing order or agreement to continue to be in place"></FormPart>
            <NoteBox>
                <p>
                    The amount of a child support order is usually the amount set out in the Federal Child Support Guidelines table according to the number of children under 19 years of age and the income of the spouse against whom the order is sought, and the amount, if any, determined for section 7 special or extraordinary expenses [s. 3 Federal Child Support Guidelines]. 
                </p>
            </NoteBox>
            <div class="resetquestion">
                <div style="display:inline; margin-left:0.25rem"><b>5.</b><i> Select each applicable option and complete the requested information. If you are only
                disagreeing with when support payments start, you may leave this question blank.</i></div> 
                <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="I am applying for an order for ongoing support to be paid by " />
                    <GreyBoxForm
                            style="margin-left:2rem; text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="12rem" 
                            beforetext="<i>(name of paying party)</i>" 
                            aftertext="in the monthly "
                            hint="" text=""/>
                        <GreyBoxForm
                            style="margin-left:2rem; text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="5rem" 
                            beforetext="set out in the child support guidelines for <i>(number)</i> " 
                            aftertext="child(ren)."
                            hint="date" hintindent = "40px" text=""/>
                </div>

                <div style="padding-left:2rem">
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="Based on the information I know about the other party’s income and my application for child support I expect the amount payable for monthly child"/>
                    </div>
                    <GreyBoxForm
                            style="margin-left:2rem; text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="5rem" 
                            beforetext="support to be approximately $" 
                            aftertext="."
                            hint="" hintindent = "40px" text=""/>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1" 
                    text="I am not able to estimate the amount payable for monthly child support at this time."/>
        
                    </div>

                </div>
                <div>
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="I am applying for an order for <b>special or extraordinary expenses </b> under section
                    7 of the child support guidelines as follows:"/>
                    </div>
                    <div style="padding-left: 2rem;">
                    <i>
                        List the expenses you are claiming for each child. <br> You must file a Financial Statement Form 4 to itemize the specific amount
                    </i>
                    <GreyBoxForm
                            style="text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="30rem" 
                            beforetext=" " 
                            aftertext=""
                            hint="" hintindent = "40px" text=""/>
                    </div>
                    
                </div>

                <div>
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="I am applying for an order to <b>change the guideline amount payable</b> because the guideline amount would cause me <b>undue hardship</b> because I have:"/>
                    </div>
                    <div style="padding-left:2rem">
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="unusually high expenses to exercise parenting time or contact with the child(ren)"/>
                    </div> 
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="a legal duty to support another person, such as an ill or disabled person or a former spouse"/>
                    </div> 
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="a legal duty to support a dependent child from another relationship"/>
                    </div> 
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living"/>
                    </div> 
                    <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                    text="other undue hardship circumstances (specify):"/>
                    </div> 
                    <GreyBoxForm
                            style="text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="30rem" 
                            beforetext=" " 
                            aftertext=""
                            hint="" hintindent = "40px" text=""/>
                    </div>

                </div>

                <div>
                    <div style="display:inline; margin-left:0.25rem"><b>6.</b>Child support payments should </div>
                    <GreyBoxForm
                            style="text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="10rem" 
                            beforetext="<b>start on</b>" 
                            aftertext=" because:"
                            hint="" hintindent = "40px" text=""/>
                    <GreyBoxForm
                            style="text-indent:0px; margin-top: 0.5rem;" 
                            textwidth="30rem" 
                            beforetext=" " 
                            aftertext=""
                            hint="" hintindent = "40px" text=""/>
                    
                </div>
                

            </div>

        </div>
        <div style="width: 20%;">
            <div style="padding-top:220px">
                <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            For more information about how to calculate the amount payable for child support, see the guidebook.
                        </p>
                </NoteBox>
            </div>
                    
            <div style="margin-bottom: 1rem;"></div>
            <NoteBox>
                <b-icon-info-circle-fill />
                <p>For more information about what can be included as special or extraordinary expenses, see the guidebook.</p>
            </NoteBox>
            <div style="padding-top: 20px;">
                <NoteBox>
                <b-icon-info-circle-fill />
                <p>The court may order child support in an amount different from the guidelines if appropriate [s. 10 Child Support Guidelines].</p>
            </NoteBox>
            </div>
            <div style="padding-top: 100px; padding-bottom: 12px;">
                <NoteBox>
                <b-icon-info-circle-fill />
                <p>In making an order about child support, the court may provide that support be paid respecting any period of time before the application is made [s. 170 Family Law Act]</p>
            </NoteBox>
            </div>
        </div> 
        </div>

      <div style="margin-top:1rem;"></div>
      <!-- <Part 5> -->
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="5" title="Income information"></FormPart>     
            <div class="print-block">  
                <div>
                    <div style="display:inline; margin-left:0.25rem"><b>7.I am required to file a</b> Financial Statement Form 4 to provide my income information to the court.<br>
                    <i>Select only one of the options below </i>
                    </div>  
                    <div style="margin:0 0 0 1rem;">
                        <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="chSupInfo.filing?'yes':''" 
                        text="I <b>am filing</b> a Financial Statement in Form 4 with this application"/>   
                        </div>

                        <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-1"
                        :check="!chSupInfo.filing?'yes':''" 
                        text="I am <b>not able to file</b> a Financial Statement in Form 4 with this application. <br> I am filing an Application for Case Management Order Without Notice or
                            Attendance in Form 11 requesting to waive or modify the requirement that my
                            income information in Form 4 be provided with this application. I understand I
                            will still be required to file a Financial Statement in Form 4 at a later date."/>   
                        </div>
                    </div>               
                </div>  
            </div>  
            
            <div style="margin-top: 1rem;"></div>

            <div class="print-block" style="border: 2px dashed #333; background-color: #ccc; padding: 8px;">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about child support. You must provide your financial information with your reply by completing and filing a Financial Statement in Form 4.</b></div>
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
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Child support is based in part on income. If a party’s income information is necessary, they have an obligation to provide information to the court, or the court may impute income [ss. 21 to 25 Child Support Guidelines]. 
                        </p>
                       
                    </NoteBox>
                    <div style="padding-top: 45px;">
                        <NoteBox>
                        <b-icon-file-earmark-text-fill/>
                        <p>
                            You must file a Financial Statement Form 4 or an Application for Case Management Order Without Notice or Attendance Form 11
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

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule3DataInfoType, undueHardshipDetailsInfoType, schedule4DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeChildSupportDataInfoType, relationshipToChildDataInfoType, rflmCalculatingChildSupportDataInfoType, replyExistingChildSupportDataInfoType,rflmUnpaidChildSupportDataInfoType,disagreeExistingChildSupportDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ChildSupport';
import { undueHardshipDataInfoType } from '@/types/Application/FamilyLawMatter/ChildSupport';
import { rflmAdditionalDocsDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';
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
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;   
    chSupInfo = {} as schedule3DataInfoType;
    exChSupInfo = {} as schedule4DataInfoType;
    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.chSupInfo = this.getNewChildSupportInfo();
        this.exChSupInfo = this.getExistingChildSupportInfo();
        
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


public getExistingChildSupportInfo(){

let existingChildSupportInfo = {} as schedule4DataInfoType;       


if (this.result.replyExistingChildSupportSurvey && this.result.rflmUnpaidChildSupportSurvey 
        && this.result.rflmCalculatingChildSupportSurvey && this.result.disagreeExistingChildSupportSurvey){

    const replyExistingChildSupportInfo: replyExistingChildSupportDataInfoType = this.result.replyExistingChildSupportSurvey;
    if (replyExistingChildSupportInfo.existingType == 'finalOrder'){
        existingChildSupportInfo.agreeCircumstanceChanges = replyExistingChildSupportInfo.agreeFinalOrder == 'y';
        existingChildSupportInfo.disAgreeCircumstanceChanges = replyExistingChildSupportInfo.agreeFinalOrder == 'n';
        existingChildSupportInfo.section150 = false;
        existingChildSupportInfo.agreeSetAside = false;

    } else if (replyExistingChildSupportInfo.existingType == 'agreement'){
        existingChildSupportInfo.section150 = replyExistingChildSupportInfo.agreeAgreement == 'y';
        existingChildSupportInfo.agreeSetAside = replyExistingChildSupportInfo.agreeAgreement == 'n';
        existingChildSupportInfo.agreeCircumstanceChanges = false;
        existingChildSupportInfo.disAgreeCircumstanceChanges = false;
    }

    const rflmUnpaidChildSupportInfo: rflmUnpaidChildSupportDataInfoType = this.result.rflmUnpaidChildSupportSurvey;

    existingChildSupportInfo.unpaidDetails = {
        agreeAmount: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'y',
        crntDate: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'n'? Vue.filter('beautify-date')(rflmUnpaidChildSupportInfo.calculationDate):'',
        unpaidAmnt: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'n'?rflmUnpaidChildSupportInfo.unPaidAmount:''

    }           
    const calculationInfo: rflmCalculatingChildSupportDataInfoType = this.result.rflmCalculatingChildSupportSurvey;
            
    existingChildSupportInfo.calc = {                
        attaching: calculationInfo.attachingCalculations == 'y',
        reason: calculationInfo.attachingCalculations == 'n'?calculationInfo.notAttachingCalculationsReason:''
    } 

    const disagreeExistingChildSupportInfo: disagreeExistingChildSupportDataInfoType = this.result.disagreeExistingChildSupportSurvey;

    existingChildSupportInfo.disagreeReason = disagreeExistingChildSupportInfo.disagreeReason;
    existingChildSupportInfo.continue = disagreeExistingChildSupportInfo.requestedOrder == 'noChange';
    existingChildSupportInfo.change = disagreeExistingChildSupportInfo.requestedOrder == 'diffChange';
    existingChildSupportInfo.changeExpl = disagreeExistingChildSupportInfo.requestedOrder == 'diffChange'?disagreeExistingChildSupportInfo.requestedChangeDescription:'';  
    
  
} else {
    const calculationsInfo = {
        attaching: false,
        reason: ''
    }
    const childSupportUnpaid = {
        agreeAmount: false,
        crntDate: '',
        unpaidAmnt: ''
    }
    existingChildSupportInfo = {
    
        agreeCircumstanceChanges: false,
        disAgreeCircumstanceChanges: false,
        agreeSetAside: false,
        section150: false,
        disagreeReason: '',
        continue: false,  
        change: false,
        changeExpl: '',     
        calc: calculationsInfo,
        unpaidDetails: childSupportUnpaid
    }    

}

        

return existingChildSupportInfo;
} 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>