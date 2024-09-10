<template>
    <div v-if="dataReady">

        <!-- <Page 5> -->
        <!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 4" scheduleTitle="Child Support"
                        scheduleDescription="Exisiting final order or written agreement"></ScheduleHeader>
                    
                    <div style="margin-bottom: 1rem;"></div>
                    
                    <NoteBox>
                        <p> 
                            Complete this schedule only if you have an existing final order or written agreement about child
                            support and you need a new court order made to change, suspend or cancel the final order, or to
                            set aside or replace the written agreement.
                        </p>
                    </NoteBox>
                </div>

                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Final order or agreement"></FormPart>
                    <div style="margin-left:1rem;">
                        <p style="color: #999;"><b>1. </b><i> Select only one of the options below and complete the requested information</i></p>
                        <div style="padding-left:24px">
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.payor ? 'yes' : ''"
                                    text="I have a <b>final court order</b> about child support made on <i>(date)</i>" />
                                <GreyBoxForm style="margin-top:10px; text-indent:0rem" textwidth="10rem" beforetext="" text="" hint="">
                                </GreyBoxForm>
                                <span> that I want to change or cancel <b style="color: #999">(see attached copy of order)</b>.🠆 <i style="color: #999;">Complete <b>Part 2</b></i></span>
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="true ? 'yes' : ''"
                                    text="I have a <b>written agreement</b> about child support made on <i>(date)</i>" />
                                <GreyBoxForm style="margin-top:10px; text-indent:0rem" textwidth="10rem" beforetext="" text="" hint="">
                                </GreyBoxForm>
                                <span> that I want to repeal or replace <b style="color: #999;">(see attached copy of agreement)</b>. 🠆 <i style="color: #999;">Complete <b>Part 3</b></i></span>
                            </div>

                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <div style="padding-top: 20px;">
                        <NoteBox>
                            <b-icon-paperclip />
                            <p>
                                You must attach a copy of the
                                order or agreement to this
                                application for filing.
                            </p>
                        </NoteBox>
                    </div>

                </div>
            </div>

            <div style="margin-top:1rem;"></div>
            <!-- <Part 2 top half> -->
            <div style="display: flex; flex-direction: row;">
                    <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Final order" subtitle="Complete this part only if you have a final order">
                    </FormPart>
                    <div class="print-block">
                        <div><b>2. Since the final order was made, the following circumstances occurred:</b><br>
                            <i style="display: inline-block; margin-left: 15px; color: #999;">Select all options that apply and complete the required information</i>
                        </div>
                        <div style="padding-left: 24px;">
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.myfin ? 'yes' : ''"
                                    text="My financial situation has changed" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.opfin ? 'yes' : ''"
                                    text="I believe the other party’s financial situation has changed" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.spcl ? 'yes' : ''"
                                    text="The special or extraordinary expenses for the child(ren) have changed as follows:" />
                            </div>
                            
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="exChSupInfo.abtEx.changes.lvng">
                                    {{exChSupInfo.abtEx.lvngChangeInfo}}
                                </span>
                            </div>

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.lvng ? 'yes' : ''"
                                    text="The child(ren)’s living arrangements have changed as follows:" />
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="exChSupInfo.abtEx.changes.lvng">
                                    {{exChSupInfo.abtEx.lvngChangeInfo}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <div style="padding-top: 20px;">
                        <NoteBox>
                            <b-icon-info-circle-fill />
                            <p>
                                The court can only change, suspend or cancel a final order if certain circumstances exist
                                [s. 152 Family Law Act and s. 14 Child Support Guidelines].
                            </p>
                        </NoteBox>
                    </div>

                </div>
            </div>

            <!-- <Part 2 bottom half> -->
                <div style="display: flex; flex-direction: row;">
                    <div style="width: 80%; padding-right: 4px;">
                    <div class="print-block">
                        
                        <div style="padding-left: 24px;">
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.newInfo ? 'yes' : ''"
                                    text="Information has become available that was not available when the order was made <i style='color: #999;'>(specify)</i>:" />
                            </div>
                            
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="exChSupInfo.abtEx.changes.newInfo">
                                    {{exChSupInfo.abtEx.newInfo}}
                                </span>
                            </div>
                            
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changes.other ? 'yes' : ''"
                                    text="Other changes or circumstances <i style='color: #999;'>(specify)</i>:" />
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="exChSupInfo.abtEx.changes.other">
                                    {{ exChSupInfo.abtEx.otherInfo }}
                                </span>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <div>
                            <p><b>3.</b> I am applying for the final order to be:</p>
                        </div>
                        <div style="margin:0 0 0 1rem;">
                            <i style="color: #999;">Select only one option</i>

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.changeOrdr ? 'yes' : ''"
                                    text="<b>changed</b> -> <i style='color: #999;'>Complete <b>Part 4</b></i>" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.suspendOrdr ? 'yes' : ''"
                                    text="<b>suspended</b> -> <i style='color: #999;'>Skip ahead to <b>Part 5</b></i>" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.cancelOrdr ? 'yes' : ''"
                                    text="<b>cancelled</b> -> <i style='color: #999;'>Skip ahead to <b>Part 5</b></i>" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        <!-- Part 3 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Agreement" subtitle="Complete this part only if you have an existing agreement">
                </FormPart>
                <div class="print-block">
                    <div>
                        <div style="margin:0 0 -0.25rem 0;"><b>4.</b> I believe the agreement about child support <b>should be set aside or replaced</b> because:
                        </div>
                        <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                            <span v-if="exChSupInfo.abtEx.exstngAgrmnt">
                                {{ exChSupInfo.abtEx.changesSinceAgrmnt }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p><b>5.</b> I am applying for the existing agreement to be</p>
                        </div>

                        <div style="margin:0 0 0 1rem;">
                            <i  style="color: #999;">Select only one option</i>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.setAsideAgrmnt ? 'yes' : ''"
                                    text="<b>set aside</b> - <i>Skip ahead to <b>Part 5</b></i>" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.abtEx.replaceAgrmnt ? 'yes' : ''"
                                    text="<b> replaced with an order</b> - <i>Complete <b>Part 4</b></i>" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court must set aside or replace with an order, all or part of an agreement about child support
                        if the court would make a different order on consideration of the matters set out in s. 150
                        [determining child support] [s. 148 Family Law Act].
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-bottom: 1rem;"></div>

        <!-- <Part 4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="About the new order" subtitle="Complete this part only if you are asking to change or replace the existing order or agreement">
                </FormPart>
                <div class="print-block">
                    <div>
                        <div style="margin:0 0 -.25rem 0;">
                            <b>6.</b> I am applying for the final order or agreement  about child support, including section 7 special or extraordinary expenses, to be <b>changed or replaced as follows:</b>
                            <br>
                            <i style="color: #999;">List the details of the order you are asking for</i>
                        </div>

                        <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                            <span v-if="exChSupInfo.abtOrg.newOrderDesc">
                                {{ exChSupInfo.abtOrg.newOrderDesc }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div style="margin:0 0 -.25rem 0;"><b>7.</b>
                            <i style="color: #999;"> Select only one of the options below</i>
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;" check="" text="Based on the information I know about the other party’s income and my application for child support I expect <b>the amount payable</b> for monthly child " /> 
                            <GreyBoxForm style="text-indent:17px; margin-top: 10px;" textwidth="9rem" beforetext="support to be approximately $"
                                hint="" text=""
                                hintindent="30px" />
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                                check="" text="I am <b> not able to estimate the amount payable</b> for monthly child support at this time" />
                        </div>
                    </div>
                    <div>
                        <div style="margin:1rem 0 -.25rem 0;">
                            <GreyBoxForm style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem"
                                beforetext="<b>8. </b>Child support payments should <b>start on</b>"
                                hint="Date (dd/mmm/yyyy) or event" :text="exChSupInfo.unpdChSup.crntDate | beautify-date-mid"
                                hintindent="30px" />
                            because: 
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div style="width: 20%;">
                <div style="padding-top: 40px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The amount of a child support
                            order is usually the amount
                            set out in the Federal Child
                            Support Guidelines table.
                        </p>
                    </NoteBox>
                </div>
                <div style="padding-top: 10px;">
                    <NoteBox>
                        <b-icon-book />
                        <p>
                            For more information about how to calculate the amount payable for child support, see the
                            guidebook.
                        </p>
                    </NoteBox>
                </div>
                <div style="padding-top: 10px; padding-bottom: 10px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            In making an order about child support, the court may provide that support be paid respecting
                            any period of time before the application is made [s. 170 Family Law Act].
                        </p>
                    </NoteBox>
                </div>
            </div>
        </div>

        <!-- <Part 5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="5" title=" Unpaid child support">
                </FormPart>

                <div class="print-block">
                    <GreyBoxForm style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="<b>9. </b>As of " aftertext=", the amount of <b>unpaid child support</b>" hint="mmm/dd/yyyy" :text="exChSupInfo.unpdChSup.crntDate" />
                    <GreyBoxForm style="margin-left:0.1rem; margin-top: 10px; text-indent:10px;" textwidth="8rem"
                        beforetext=" (arrears) was $" hint=""
                        :text="exChSupInfo.unpdChSup.amnt" />
                </div>

                <div style="margin-top:1rem;"></div>
                <div>
                    <i style="display:inline; margin-left:0.35rem; color: #999;"><b>10. </b>Complete only if there is unpaid child
                        support. You may leave this question blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <i style="color: #999;">Select only one of the options below.</i>

                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                                :check="(exChSupInfo.unpdChSup.amnt != 0 && !exChSupInfo.unpdChSup.reduce) ? 'yes' : ''"
                                text="I am <b>not applying to reduce</b> the amount of unpaid child support (arrears)" />
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                                :check="exChSupInfo.unpdChSup.reduce ? 'yes' : ''"
                                text="I am <b>applying to reduce</b> the amount of unpaid child support (arrears) to" />
                            <div style="margin-top:0.25rem;"/>
                            <GreyBoxForm style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" aftertext="because:" hint=""
                                :text="exChSupInfo.unpdChSup.reduceAmount" />
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="exChSupInfo.unpdChSup.reduce">
                                    {{ exChSupInfo.unpdChSup.whyReduceAmount }}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div style="margin-top:1rem;"></div>
                    <div>
                        <i style="display:inline; margin-left:0.35rem; color: #999;"><b>11.</b> Complete only if there is unpaid child support. You may leave this question blank.</i>
                        <div style="margin:0 0 0 1.5rem;">I am applying for an order that the remaining <b>unpaid child
                                support
                                (arrears) be paid</b> as follows:</div>
                        <div style="margin:0 0 0 1.5rem;">
                            <i style="color: #999;">Select all options that apply and complete the required information</i>
                        </div>
                        <div style="margin:0.25rem 0 0 1.5rem;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px; display:inline;"
                                :check="exChSupInfo.unpdChSup.paySchd == 'monthly' ? 'yes' : ''" text="At a rate of " />
                            <GreyBoxForm style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint=""
                                aftertext="per month" :text="exChSupInfo.unpdChSup.monthlyAmount" />
                        </div>
                        <div style="margin:0 0 0 1.5rem;">

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;"
                                    :check="exChSupInfo.unpdChSup.paySchd == 'Lump Sum' ? 'yes' : ''" text="In a lump sum" />
                            </div>

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.unpdChSup.paySchd == 'other' ? 'yes' : ''"
                                    text="Other <i style='color: #999;'>(specify):</i>" />

                            </div>

                            <GreyBoxForm v-if="exChSupInfo.unpdChSup.paySchd == 'other' && exChSupInfo.unpdChSup.otherComm"
                                style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" hint=""
                                :text="exChSupInfo.unpdChSup.otherComm">

                            </GreyBoxForm>
                            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" text="" hint=""></GreyBoxForm>

                        </div>
                    </div>

                </div>
            </div>
            <div style="width: 20%;">
                <div style="padding-top: 40px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            On application, a court may reduce or cancel unpaid child support that is owing (arrears) under
                            an agreement or order about support if satisfied that it would be grossly unfair not to reduce
                            or cancel the arrears [s. 174 Family Law Act].
                        </p>
                    </NoteBox>
                </div>
                <div style="padding-top: 5px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court may order that support be paid in different ways [s. 170 Family Law Act].
                        </p>
                    </NoteBox>
                </div>

            </div>
        </div>


        <!-- <Part 6> -->

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="6" title=" Income Information">
                </FormPart>
                <!-- <12> -->
                <div class="print-block">
                    <p><b>12.</b> One or more of the following <b>applies to my application</b> for child support: </p>
                    <ul>
                        <li>
                            I am the payor
                        </li>
                        <li>
                            there is split or shared parenting time for one or more of the children
                        </li>
                        <li>
                            there is child 19 years or older for whom support is being applied for
                        </li>
                        <li>
                            a party has been acting as a parent to a child of the other party
                        </li>
                        <li>
                            the payor earns more than $150,000 per year
                        </li>
                        <li>
                            there is an application for section 7 special or extraordinary expenses
                        </li>
                        <li>
                            I am claiming undue hardship
                        </li>
                    </ul>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                            :check="exChSupInfo.applyForCaseManagement ? 'yes' : ''"
                            text="<b>Yes</b> -> <i>You <b>are required</b> to file a Financial Statement Form 4. Complete <b>Question 8</b>.</i>" />
                    </div>
                    <div style="display:block;">
                        <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                            :check="!exChSupInfo.applyForCaseManagement && exChSupInfo.abtOrg.situation.none ? 'yes' : ''"
                            text="<b>No</b> -> <i>You <b>are not required</b> to file a Financial Statement Form 4 at this time. <br>Skip to <b>Question 9</b>.</i>" />
                    </div>
                </div>
                <div style="margin-top:1rem;"></div>
                <!-- <13> -->

                <div class="print-block">
                    <p><b>13. I am required to file</b> a Financial Statement Form 4 to provide my income information
                        to the court.
                    </p>
                    <div>
                        <i style="display:inline; margin-left:0.35rem; color: #999;">Select only one of the options below</i>
                        <div style="margin:0 0 0 1.5rem;">

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exChSupInfo.calc.attaching ? 'yes' : ''"
                                    text="I <b>am filing</b> a Financial Statement in Form 4 with this application." />
                            </div>

                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="!exChSupInfo.calc.attaching ? 'yes' : ''"
                                    text="I <b>am  not able to file</b>  a Financial Statement in Form 4 with this application. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive or modify the requirement that my income information in Form 4 be provided with this application. I understand I will still be required to file a Financial Statement in Form 4 at a later date." />
                            </div>

                        </div>
                    </div>
                </div>

                <div style="background: #eee; border: 2px dashed #333; padding: 4px;">
                    <p><b>IMPORTANT NOTE TO THE OTHER PARTY:</b></p>
                    <p><b>This family law case includes an application about child support. You must provide your financial
                            information with your reply to this application by completing and filing a Financial Statement
                            in Form 4.
                        </b></p>
                    <p>
                        If you do not give your complete, true, and up-to-date financial information when needed, the
                        court can:
                    <ul>
                        <li>
                            order that the income information be provided
                        </li>
                        <li>
                            assume a party’s income is a certain amount for support purposes and make an order
                            based on it
                        </li>
                        <li>
                            require a party to give security
                        </li>
                        <li>
                            require a party to pay the other party’s expenses, an amount to the other party up to
                            $5,000, or a fine up to $5,000
                        </li>
                        <li>
                            make any other order the court considers appropriate
                        </li>
                    </ul>
                    </p>

                </div>

            </div>
            <div style="width: 20%;">
                <div style="padding-top: 40px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Child support is based in part on income. If a party’s income information is necessary, they
                            have an obligation to provide information to the court, or the court may impute income [ss.15 to
                            25 Child Support Guidelines].
                        </p>
                    </NoteBox>
                </div>
                <div style="padding-top: 5px;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p> You must file a Financial Statement Form 4 or an Application for Case Management Order Without
                            Notice or Attendance Form 11.
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
import moment from 'moment';
import { schedule4DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        ScheduleHeader,
        NoteBox,
        FormPart,
        GreyBoxForm
    }
})

export default class Schedule4 extends Vue {

    @Prop({ required: true })
    result!: any;

    dataReady = false;
    exChSupInfo = {} as schedule4DataInfoType;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {
        this.exChSupInfo = this.getExistingChildSupportInfo();
    }

    public getExistingChildSupportInfo() {
        let existingChildSupportInfo = {} as schedule4DataInfoType;

        if (this.result.aboutExistingChildSupportSurvey && this.result.childSupportOrderAgreementSurvey) {
            const orderChangeList = (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked.length > 0) ? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked : [];
            const existingType = this.result.childSupportOrderAgreementSurvey.existingType;
            let date = '';
            if (existingType == 'ExistingOrder') {
                date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate);
            } else if (existingType == 'ExistingAgreement') {
                date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.agreementDate);
            }
            existingChildSupportInfo.abtEx = {
                payor: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payor'),
                payee: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payee'),
                other: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other'),
                otherComm: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other' && this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment) ? this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment : '',
                orderDate: date,
                exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
                fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
                cancelOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
                suspendOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'suspendedOrder'),
                changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
                changeList: orderChangeList,
                changes: {
                    myfin: orderChangeList.includes('myFinancialChanged'),
                    opfin: orderChangeList.includes('partyFinancialChanged'),
                    spcl: orderChangeList.includes('expensesChanged'),
                    lvng: orderChangeList.includes('arrangementsChanged'),
                    newInfo: orderChangeList.includes('newInformation'),
                    other: orderChangeList.includes('other')
                },
                newInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && orderChangeList?.includes('newInformation') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.newInformationComment) ? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.newInformationComment : '',
                expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && orderChangeList?.includes('expensesChanged') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.expensesChangedComment) ? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.expensesChangedComment : '',
                lvngChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && orderChangeList?.includes('arrangementsChanged') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.arrangementsChangedComment) ? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.arrangementsChangedComment : '',
                otherInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && orderChangeList?.includes('other') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.otherComment) ? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.otherComment : '',
                exstngAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
                setAsideAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
                replaceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
                changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement) ? this.result.aboutExistingChildSupportSurvey.changesSinceAgreement : ''
            }
        }

        if (this.result.aboutChildSupportChangesSurvey) {
            const aboutChildSupportChanges = this.result.aboutChildSupportChangesSurvey;
            const changeCondition = (existingChildSupportInfo?.abtEx?.['replaceAgrmnt'] || existingChildSupportInfo?.abtEx?.['changeOrdr'])
            const orgSituationList = (changeCondition && aboutChildSupportChanges.listOfSituations) ? aboutChildSupportChanges.listOfSituations : []
            const orderStartCondition = aboutChildSupportChanges.orderStartingDate.selected == 'startingDate' ? Vue.filter('beautify-date')(aboutChildSupportChanges.orderStartingDate.startingDate) : aboutChildSupportChanges.orderStartingDate.otherComment;
            existingChildSupportInfo.abtOrg = {
                newOrderDesc: changeCondition ? aboutChildSupportChanges.orderDescription : '',
                startDate: (changeCondition && aboutChildSupportChanges.orderStartingDate) ? orderStartCondition : '',
                startReason: (changeCondition && aboutChildSupportChanges.orderStartDateReason) ? aboutChildSupportChanges.orderStartDateReason : '',
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
        } else {
            existingChildSupportInfo.abtOrg = {
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
                    none: false
                }
            }
        }

        if (this.result.unpaidChildSupportSurvey) {
            const unpaidChildSupport = this.result.unpaidChildSupportSurvey;
            existingChildSupportInfo.unpdChSup = unpaidChildSupport.unpaid == 'y' ?
                {
                    crntDate: moment().format("MMM DD, yyyy"),
                    unpaid: unpaidChildSupport.unpaid == 'y',
                    reduce: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y'),
                    reduceAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y') ? unpaidChildSupport.reduceAmount : '',
                    whyReduceAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y') ? unpaidChildSupport.whyReduceAmount : '',
                    paySchd: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule) ? unpaidChildSupport.paymentSchedule.selected : '',
                    monthlyAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule?.selected == 'monthly') ? unpaidChildSupport.paymentSchedule.monthlyAmount : '',
                    amnt: (unpaidChildSupport.unpaid == 'y') ? unpaidChildSupport.unPaidAmount : 0,
                    otherComm: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule?.selected == 'other') ? unpaidChildSupport.paymentSchedule.otherComment : ''
                } : {
                    crntDate: moment().format("MMM DD, yyyy"),
                    unpaid: false,
                    reduce: false,
                    reduceAmount: '',
                    whyReduceAmount: '',
                    paySchd: '',
                    monthlyAmount: '',
                    amnt: 0,
                    otherComm: ''
                }
        } else {
            existingChildSupportInfo.unpdChSup = {
                crntDate: moment().format("MMM DD, yyyy"),
                unpaid: false,
                reduce: false,
                reduceAmount: '',
                whyReduceAmount: '',
                paySchd: '',
                monthlyAmount: '',
                amnt: 0,
                otherComm: ''
            }
        }

        if (this.result.calculatingChildSupportSurvey) {
            existingChildSupportInfo.calc = {
                attaching: this.result.calculatingChildSupportSurvey.attachingCalculations == 'y',
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations) ? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations : ''
            }
        } else {
            existingChildSupportInfo.calc = {
                attaching: false,
                reason: ''
            }
        }

        existingChildSupportInfo.finStmnt = {
            required: (existingChildSupportInfo.abtOrg?.situation?.payor ||
                existingChildSupportInfo.abtOrg?.situation?.over19 ||
                existingChildSupportInfo.abtOrg?.situation?.split ||
                existingChildSupportInfo.abtOrg?.situation?.partyParentOfOther ||
                existingChildSupportInfo.abtOrg?.situation?.payorEarnsHigh ||
                existingChildSupportInfo.abtOrg?.situation?.specialClaim ||
                existingChildSupportInfo.abtOrg?.situation?.undueHardship)
        }

        let form4unable = false;

        if (this.result.flmAdditionalDocumentsSurvey?.unableFileForms) {
            for (const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms) {
                if (form.includes("Financial Statement Form 4")) {
                    form4unable = true;
                }
            }
        }

        if (this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs == 'n' && form4unable) {
            existingChildSupportInfo.applyForCaseManagement = true
            existingChildSupportInfo.finStmnt = {
                required: false
            }
        }

        return existingChildSupportInfo;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss"></style>