<template>
    <div v-if="dataReady"> 
<!-- <Page 11> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
             <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 9" scheduleTitle="Spousal Support" scheduleDescription="Existing final order or written agreement"></ScheduleHeader>
                    <div style="margin-bottom: 1rem;"></div>
                    <NoteBox fontSize="10pt">
                        <p>
                            Complete this schedule only if you have an existing final order or written agreement about spousal support and you need a new court order made to change, suspend or cancel the final order, or to set aside or replace the written agreement.
                        </p>
                    </NoteBox>
                    </div>    
                </div>

            <div style="margin-top:1rem;"></div>
<!-- < Part 1> -->
<div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
    <div style="flex: 1">
        <FormPart :part="1" title="Final order or agreement"></FormPart>
        <div style="margin:0 0 0 1.5rem;">
            <b>1. </b> <i>Select only one of the options below and complete the requested information.</i>

            <div style="display:block; width: 98%;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                :check="true?'yes':''" text="I have <b>a final court order</b> about spousal support made on <i>(date)</i>"/>
                <GreyBoxForm style="margin:0.25rem 1.45rem; text-indent:0px;" textwidth="10rem" beforetext="" aftertext="that I want to change or cancel <b style='color: #999;'>(see attached copy of order)</b>. ➜ <i style='color:  #999;'>Complete <b>Part 2</b></i>" hint=""  hintindent="40px" :text="exSpsSupInfo.current.date"/>
            </div>
            <div style="display:block; width: 98%;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                :check="true?'yes':''" text="I have a <b>written agreement about</b> spousal support made on <i>(date)</i>"/>
                <GreyBoxForm style="margin:0.25rem 1.45rem; text-indent:0px;" textwidth="10rem" beforetext=" " aftertext="that I want to repeal or replace <b style='color: #999;'>(see attached copy of agreement)</b>. ➜ <i style='color: #999;'>Complete <b>Part 3</b></i>" hint=""  hintindent="40px" :text="exSpsSupInfo.current.date"/>
            </div>
        </div>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-paperclip />
                    <p>
                        You must attach a copy of the order or agreement to this application for filing.
                    </p>
                </NoteBox>
            </div>      
        </div>
    </div>
    <div style="margin-top:1rem;"></div>

    <!-- <Part 2> -->
    <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="flex: 1">
            <FormPart :part="2" title="Final order" subtitle="Complete this part only if you have a final order"></FormPart>
            <div class="print-block">
                <div>
                <div><b>2. Since the final order</b> was made, the following circumstances occurred:<br>
                
                </div>
                       <div style="padding-left: 24px;">
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.changes.myfin?'yes':''"
                                text="My financial situation has changed" />
                        </div>
                         <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;"  :check="exSpsSupInfo.orderInfo.changes.opfin?'yes':''" text="I believe the other party’s financial situation has changed" />
                          </div>
                          <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.changes.myEmp?'yes':''" text="My employment, training, health and/or ability to work has changed as follows:" />
                           </div>
                            <GreyBoxForm v-if="exSpsSupInfo.orderInfo.changes.myEmp" style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" hint="" :text="exSpsSupInfo.orderInfo.myEmp">

                            </GreyBoxForm>
                            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem" beforetext="" hint="" text=""></GreyBoxForm>
                        
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.changes.houseHold?'yes':''" text="My household expenses have changed as follows:"/>
                            </div>
                            <GreyBoxForm v-if="exSpsSupInfo.orderInfo.changes.houseHold" style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" hint="" :text="exSpsSupInfo.orderInfo.houseHold">

                            </GreyBoxForm>
                            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem" beforetext="" hint="" text=""></GreyBoxForm>
                            <div style="display:block; width: 98%;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.changes.newInfo?'yes':''" text="Information has become available that was not available when the order was made <i>(specify):</i>"/>
                            </div>
                            <GreyBoxForm  v-if="exSpsSupInfo.orderInfo.changes.newInfo" style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" hint="" :text="exSpsSupInfo.orderInfo.newInfo">

                            </GreyBoxForm>
                            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" beforetext="" hint="" textwidth="30rem" text=""></GreyBoxForm>
                        
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.changes.other?'yes':''" text="Other changes or circumstances <i>(specify)</i>:"/>
                            </div>
                            <GreyBoxForm v-if="exSpsSupInfo.orderInfo.changes.other" style="margin-top:10px; text-indent:0rem" textwidth="35rem" beforetext="" hint="" :text="exSpsSupInfo.orderInfo.otherChange">

                            </GreyBoxForm>
                            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" beforetext="" hint="" textwidth="30rem" text=""></GreyBoxForm>  
                    </div>
                </div>
                <div>
                    <div>
                        <p><b>3.</b> I am applying for the final order to be:</p>
                        
                    </div>
                    <div style="margin:-1rem 0 0 1rem;">
                        <i style="color:#ababab">Select only one option</i>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.change ? 'yes' : ''"
                                text="<b>changed</b>  ➜ <i style='color:#ababab'>Complete <b>Part 4 </b> and <b>5</b></i>" />
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.suspend?'yes':''" text="<b>suspended</b> ➜ <i style='color:#ababab'>Complete <b>Part 5</b></i>"/>
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exSpsSupInfo.orderInfo.cancel?'yes':''" text="<b>cancelled</b> ➜ <i style='color:#ababab'>Complete <b>Part 5</b></i>"  />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court can only change, suspend or cancel a final order if certain circumstances exist <i>[s. 16  7 Family Law Act].</i>
                    </p>
                </NoteBox>
            </div>      
        </div>
    </div>

    <div style="margin-top:1rem;"></div>
    <!-- Part 3 -->
    <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="flex: 1">
            <FormPart :part="3" title="Agreement" subtitle="Complete this part only if you have an existing agreement">
            </FormPart>
            <div class="print-block">
                
<!-- <3> -->
    <div>
    <div style="margin:0 0 -0.25rem 0;"><b>4. </b>I believe the agreement about spousal support <b> should be set aside or replaced </b> because:
    </div>

    <div  v-if="exSpsSupInfo.agreementInfo.reason" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:100px;">{{ exSpsSupInfo.agreementInfo.reason}}</div>
    <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:100px;margin-bottom:1rem;"></div>
    </div>
    <div>
        <div>
            <p><b>5.</b> I am applying for the existing agreement to be</p>
        </div>

        <div style="margin:-1rem 0 0 1rem;">
            <i style="color:#ababab">Select only one option</i>
            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                    style="text-indent: 5px;" :check="exSpsSupInfo.agreementInfo.setAside?'yes':''" 
                    text="<b>set aside </b>➜ <i style='color:#ababab'>Skip ahead to <b>Part 5</b></i>" />
            </div>
            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                    style="text-indent: 5px;" :check="exSpsSupInfo.agreementInfo.replace?'yes':''"
                    text="<b> replaced with an order</b> ➜ <i style='color:#ababab'>Complete <b>Part 4</b> </i>" />
            </div>

        </div>
    </div>
                
    </div> 
    </div>
    <div style="width: 20%;">
        <div style="padding-top:30px; padding-bottom:20px">
            <NoteBox>
                <b-icon-info-circle-fill />
                <p>
                    The court must set aside or replace with an order, all or part of an agreement about spousal support if the court is satisfied one or more circumstances set out in s. 164 (3) of the <i>Family Law Act</i> existed when the parties entered into the agreement, or the agreement is significantly unfair.
                </p>
            </NoteBox>
        </div>      
    </div>
</div>

<div style="margin-top:1rem;"></div>
<div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
    <div style="flex: 1">
        <FormPart :part="4"
            title="About the new order"
            subtitle="Complete this part only if you are asking to change or replace the existing order or agreement">
        </FormPart>
        <div class="print-block">
            <div>
                <div style="margin:0 0 -.25rem 0;"><b>6.</b> I am applying for the final order or agreement about spousal support to be <b>changed or replaced </b> as follows:
                </div>  
                <i style="color:#ababab; margin-left:5px;"> List the details of the order you are asking for</i> 
                <div  v-if="exSpsSupInfo.about.chSinceOrder" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:100px;">{{ exSpsSupInfo.about.chSinceOrder}}</div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:100px;margin-bottom:1rem;"></div>
            </div>
            <div>
                <div style="margin:0 0 -.25rem 0; line-height: 25px;"><b>7.</b>Based on the information I know about each party’s means, needs, and other circumstances <br>
                    <i> Select only one of the options below </i>
                </div>
                <div style="display:block; line-height: 25px;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                        text="I expect the range for the<b> monthly amount payable</b> for spousal support to be"  check=""  />
                       
                </div>
                <GreyBoxForm style="display:inline; text-indent:0px; margin-left: 30px;" textwidth="6rem" beforetext=" approximately $"  marginTop="-15px" hint="" :text="exSpsSupInfo.payDetails.rate"/>
                <GreyBoxForm style="display:inline; text-indent:0px; margin-left: 30px; line-height: 25px; " textwidth="6rem" beforetext="to $" marginTop="-15px" hint="" :text="exSpsSupInfo.payDetails.rate"/>
                <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px; line-height: 25px;"
                        text="I expect a <b>lump sum amount payable</b> for spousal support to be approximately" check="" />
                </div>
                <GreyBoxForm style="display:inline; text-indent:0px; line-height: 25px; margin-left: 30px;" textwidth="9rem" marginTop="-15px" beforetext=" $" hint="" :text="exSpsSupInfo.payDetails.rate"/>
                
                <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                        text="I am <b>not able to estimate </b>the amount payable for spousal support at this time" check="" />
                </div>
            </div>
        </div>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px; padding-bottom:20px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        The court may order a spouse to pay an amount the court considers appropriate as spousal support after taking into consideration section 160 [duty to provide support for entitled spouse] <i>[s. 165 Family Law Act]</i>. <br> 
                        The order may include when and how payments are to be made <i>[s. 170 Family Law Act].</i> 

                    </p>
                </NoteBox>
                <div style="padding-top: 15px;">
                    <NoteBox>
                    <b-icon-book />
                    <p>
                        For more information about how to calculate the amount for spousal support, see the guidebook.
                    </p>
                </NoteBox>
                </div>
               
            </div>      
        </div>
    </div>
    <div style="margin-top:1rem;"></div>
             <!-- <Part 5> -->  
    <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="width:80%">
            <FormPart :part="5"
                title="Unpaid spousal support">
            </FormPart>
            <div class="print-block">
                <div>
                    <GreyBoxForm style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="<b>8. </b> As of " aftertext=", the amount of <b>unpaid spousal support</b> (arrears)" hint="Date(dd/mmm/yyyy)" hintindent="30px" :text="exSpsSupInfo.payDetails.currentDate | beautify-date-mid"/>
                    <GreyBoxForm style="margin-left:24px; text-indent:0px; " textwidth="7rem" beforetext="was $" hint="" marginTop="-8px" hintindent="30px" :text="exSpsSupInfo.payDetails.unPaidAmount"/>          
                </div>
            </div>

            <div style="margin-top:1rem;"></div>
                <div>
                    <span style="display:inline; margin-left:0.35rem;"><b>9. </b> <i style="color: #ababab;">Complete only if there is unpaid spousal support. You may leave this question blank.</i> </span>
                    <div style="margin:0 0 0 1.5rem;">
                        <i style="color:#ababab">Select only one of the options below.</i>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                            :check="exSpsSupInfo.payDetails.unpaid && !exSpsSupInfo.payDetails.reduce?'yes':''" text="I am <b>not applying</b> to reduce the amount of unpaid spousal support (arrears)" />
                        </div>
                    </div>
                    <div style="margin:0 0 0 1.5rem;"> 
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px; line-height: 25px;"
                            :check="exSpsSupInfo.payDetails.reduce?'yes':''" text="I am <b>applying to reduce</b> the amount of unpaid spousal support (arrears) to" />
                        </div>   
                        <GreyBoxForm style="display:inline; text-indent:0px; margin-left: 30px;" textwidth="8rem" beforetext=" $"  marginTop="-15px" aftertext="because:" hint="" :text="exSpsSupInfo.payDetails.reduceAmount"/>
                        <div v-if="exSpsSupInfo.payDetails.reduce" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:32px;min-height:100px; margin-top: 10px;">{{exSpsSupInfo.payDetails.reduceReason}}</div>
                       <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:32px;min-height:100px;margin-bottom:1rem; margin-top: 10px;"></div>
                    </div>
                </div>

                <div>
                    <span style="display:inline; margin-left:0.35rem"><b>10.</b> <i style="color:#ababab">Complete only if there is unpaid spousal support. You may leave this question blank.</i></span>
                    <div style="margin:0 0 0 1.7rem;">I am applying for an <b>order that the remaining unpaid spousal support</b> be paid as follows:</div>
                    <div style="margin:0.25rem 0 0 1.5rem;"> 
                        <div style="display:flex;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                            :check="exSpsSupInfo.payDetails.monthly?'yes':''" text="At a rate of &nbsp; " />
                            <GreyBoxForm style="display:inline; text-indent:0px;" textwidth="8rem" marginTop="-12px" beforetext=" $" aftertext="<b> per month</b>" hint="" :text="exSpsSupInfo.payDetails.rate"/>                     
                        </div> 
                    </div>
                    
                    <div style="margin:0.25rem 0 0 1.45rem;">
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                            :check="exSpsSupInfo.payDetails.lumpSum?'yes':''" text="In a <b>lump sum</b> payment" />     
                        </div> 
                       
                    </div>
                    <div style="margin:0.25rem 0 0 1.45rem;">
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px; line-height: 25px;"
                            :check="exSpsSupInfo.payDetails.other?'yes':''" text="<b>other</b> <i style='color:#ababab'>(specify):</i>" />     
                        </div>
                        <GreyBoxForm style="text-indent:1px;display:inline-block; padding-top: 10px;" textwidth="32rem" beforetext="" hint="" :text="exSpsSupInfo.payDetails.otherComm"/>
                     </div>
                    </div>
        </div>
     </div>
        
     
<!-- <9> -->
    <div style="margin-top:1rem;"></div>
     <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="flex:1">
            <FormPart :part="6"
                title="Income Information">
            </FormPart>
            <div class="print-block">
                <div style="margin:0 0 -.25rem 0;"><b>11. I am required to file </b>a Financial Statement Form 4 to provide my income information to the court <br>      
                </div>
                <div>               
                    <i style="margin:0 0 0 0.5rem; color: #ababab;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 0.5rem;">
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;"  :check="!exSpsSupInfo.applyForCaseManagement?'yes':''" text=" I <b> am filing </b> a Financial Statement in Form 4 with this application." />

                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exSpsSupInfo.applyForCaseManagement?'yes':''" text="I am <b>not able</b> to file a Financial Statement in Form 4 with this application." />
                                <span >I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive or modify the requirement that my income information in Form 4 be provided with this application. I understand I will still be required to file a Financial Statement in Form 4 at a later date.</span>

                        </div>
                       
                    </div>
                </div>
                <div style="background: #eee; border: 2px dashed #333; padding: 10px;">   
                        <div class="print-block">
                            <span><b>IMPORTANT NOTE TO THE OTHER PARTIES:</b></span>
                            <span><b>This family law case includes an application about spousal support. You must provide your financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.
                                </b></span>
                            <div style="text-align:justify;">
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
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px; padding-bottom:20px">
                <NoteBox>
                    <b-icon-file-earmark-medical-fill />
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
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import moment from 'moment';
import { schedule10DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
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
export default class Schedule10 extends Vue {

    @Prop({required:true})
    result!: any; 
  
    dataReady = false;    
    exSpsSupInfo = {} as schedule10DataInfoType;
   
    mounted(){
        this.dataReady = false;       
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){        
        this.exSpsSupInfo = this.getExistingSpousalSupportInfo();
    }

    public getExistingSpousalSupportInfo(){        

        let existingSpousalSupportInfo = {} as schedule10DataInfoType

        if (this.result.existingSpousalSupportOrderAgreementSurvey){
            existingSpousalSupportInfo.current = {
                date: '',
                order: this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder',
                agreement: this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingAgreement',
                directors: this.result.existingSpousalSupportOrderAgreementSurvey.filedWithDirector == 'y',
                reviewable: this.result.existingSpousalSupportOrderAgreementSurvey.reviewableTerm == 'y',
                fillForm: this.result.existingSpousalSupportOrderAgreementSurvey.fillOutForm == 'completeNow',
                description: ''
            }

            if (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder'                
                && this.result.existingSpousalSupportFinalOrderSurvey?.orderDate){
                    existingSpousalSupportInfo.current.date = Vue.filter('beautify-date')(this.result.existingSpousalSupportFinalOrderSurvey.orderDate);
            }

            if (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'               
                && this.result.existingSpousalSupportAgreementSurvey?.agreementDate){                    
                    existingSpousalSupportInfo.current.date = Vue.filter('beautify-date')(this.result.existingSpousalSupportAgreementSurvey.agreementDate);
            }

        }

        if ( this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingAgreement' && this.result.existingSpousalSupportAgreementSurvey){
            existingSpousalSupportInfo.agreementInfo = {                
                replace: this.result.existingSpousalSupportAgreementSurvey.agreementDifferenceType == 'replacedAgreement',
                setAside: this.result.existingSpousalSupportAgreementSurvey.agreementDifferenceType == 'setAsideAgreement',
                reason: this.result.existingSpousalSupportAgreementSurvey.changesReasoning
            }
        } else {
            existingSpousalSupportInfo.agreementInfo = {                
                replace: false,
                setAside: false,
                reason: ''
            }
        }

        if (this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingOrder' && this.result.existingSpousalSupportFinalOrderSurvey){
            const changesSinceOrderList = this.result.existingSpousalSupportFinalOrderSurvey.changesSinceOrderList
            const orderChangeList = (changesSinceOrderList?.checked?.length>0)? changesSinceOrderList.checked:[];
            
            existingSpousalSupportInfo.orderInfo = {

                changes: {
                    myfin: orderChangeList.includes('myFinancialChanged'),
                    opfin: orderChangeList.includes('partyFinancialChanged'),
                    myEmp: orderChangeList.includes('myEmploymentChanged'),
                    opEmp: orderChangeList.includes('partyEmploymentChanged'),
                    houseHold: orderChangeList.includes('myHouseholdChanged'),
                    newInfo: orderChangeList.includes('newInformation'),                    
                    other: orderChangeList.includes('other')
                },

                newInfo:     (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('newInformation')         && changesSinceOrderList && changesSinceOrderList.newInformationComment)?         changesSinceOrderList.newInformationComment:'',
                houseHold:   (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('myHouseholdChanged')     && changesSinceOrderList && changesSinceOrderList.myHouseholdChangedComment)?     changesSinceOrderList.myHouseholdChangedComment:'',
                myEmp:       (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('myEmploymentChanged')    && changesSinceOrderList && changesSinceOrderList.myEmploymentChangedComment)?    changesSinceOrderList.myEmploymentChangedComment:'',
                opEmp:       (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('partyEmploymentChanged') && changesSinceOrderList && changesSinceOrderList.partyEmploymentChangedComment)? changesSinceOrderList.partyEmploymentChangedComment:'',
                otherChange: (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('other')                  && changesSinceOrderList && changesSinceOrderList.otherComment)?                  changesSinceOrderList.otherComment:'',
                
                change: this.result.existingSpousalSupportFinalOrderSurvey.orderDifferenceType == 'changeOrder',
                cancel: this.result.existingSpousalSupportFinalOrderSurvey.orderDifferenceType != 'cancelOrder' ,
                suspend: this.result.existingSpousalSupportFinalOrderSurvey.orderDifferenceType != 'suspendedOrder'
                
            }
        } else {
            existingSpousalSupportInfo.orderInfo = {

                changes: {
                    myfin: false,
                    opfin: false,
                    myEmp: false,
                    opEmp: false,
                    houseHold: false,
                    newInfo: false,                   
                    other: false
                },

                newInfo:     '',
                houseHold:   '',
                myEmp:       '',
                opEmp:       '',
                otherChange: '',
                change: false,
                cancel: false,
                suspend: false
            }
        }

        if (this.result.aboutExistingSpousalSupportOrderSurvey){
            const changeOrReplaceCondition = ((this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingOrder'     && this.result.existingSpousalSupportFinalOrderSurvey?.orderDifferenceType == 'changeOrder') ||
                                              (this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingAgreement' && this.result.existingSpousalSupportAgreementSurvey?.agreementDifferenceType == 'replacedAgreement'));
               
            existingSpousalSupportInfo.about = {
                chSinceOrder: changeOrReplaceCondition? this.result.aboutExistingSpousalSupportOrderSurvey.changesSinceOrder:''
            }
        } else {
            existingSpousalSupportInfo.about = {
                chSinceOrder: ''
            }
        }       

        if (this.result.unpaidSpousalSupportSurvey){  
            
            const paymentSchedule = this.result.unpaidSpousalSupportSurvey.paymentSchedule
            existingSpousalSupportInfo.payDetails = this.result.unpaidSpousalSupportSurvey.unpaid == "y"?
            {
                currentDate: moment().format("MMM DD, yyyy"),
                unpaid:true ,
                unPaidAmount: this.result.unpaidSpousalSupportSurvey.unPaidAmount,
                reduce:       this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? true : false,
                reduceAmount: this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? this.result.unpaidSpousalSupportSurvey.reduceAmount:'',
                reduceReason: this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? this.result.unpaidSpousalSupportSurvey.whyReduceAmount:'',
                monthly:   paymentSchedule? paymentSchedule.selected == 'monthly':false,                
                rate:      paymentSchedule?.selected == 'monthly'? paymentSchedule.monthlyAmount:'',
                lumpSum:   paymentSchedule? paymentSchedule.selected == 'Lump Sum':false,                
                other:     paymentSchedule? paymentSchedule.selected == 'other':false,
                otherComm: paymentSchedule? paymentSchedule.otherComment: ''
            }:{
                currentDate:moment().format("MMM DD, yyyy"),
                unpaid: false,
                unPaidAmount: '0',
                reduce: false,
                reduceAmount: '',
                reduceReason: '',
                monthly: false,                
                rate: '',
                lumpSum: false,                
                other: false,
                otherComm: ''
            }
        }

        if (this.result.calculatingSpousalSupportSurvey){
            existingSpousalSupportInfo.calc = {
                attaching: this.result.calculatingSpousalSupportSurvey?.attachingCalculations == 'y',
                reason: ( this.result.calculatingSpousalSupportSurvey?.attachingCalculations == 'n'
                        && this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations:''
            }
        }

        let form4unable = false;

        if(this.result.flmAdditionalDocumentsSurvey?.unableFileForms){
            for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
                if(form.includes("Financial Statement Form 4")){
                    form4unable = true;
                }
            }   
        }

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && form4unable){
            existingSpousalSupportInfo.applyForCaseManagement = true           
        }       

        return existingSpousalSupportInfo;
    }   
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>