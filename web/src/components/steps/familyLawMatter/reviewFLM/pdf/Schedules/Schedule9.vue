<template>
    <div v-if="dataReady"> 
       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 8" scheduleTitle="Spousal Support" scheduleDescription="No existing final order or written agreement"></ScheduleHeader>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox fontSize="10pt">
                        <p>
                            Complete this schedule only if you need a court order about spousal support and you do not have an existing final court order or written agreement about spousal support.
                        </p>
                    </NoteBox>

                </div>
                <div style="width: 20%;">
                </div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Entitlement to spousal support"></FormPart>

                   
                    <section class="resetquestion">
                        <div style="display:inline; margin:0 0 0 0.5rem;">I believe that I am, or the other party is, <b>entitled to spousal support</b> for the following reason(s):</div>
                        <div style="margin:0 0 0 1.5rem;">
                            <i style="margin:0 0 0 0rem;" >Select all options that apply</i>
                            <check-box  :check="spsSupInfo.current.adv?'yes':''" text="To recognize <b>economic advantages or disadvantages</b> to the spouses arising from the relationship or breakdown of the relationship"/>
                            <check-box  :check="spsSupInfo.current.share?'yes':''" text="To share the <b>financial consequences</b> arising from caring for the children during the relationship, beyond the duty to provide support for the child"/>
                            <check-box  :check="spsSupInfo.current.hardship?'yes':''" text="To <b>relieve economic hardship</b> of the spouses arising from the breakdown of the relationship"/>
                            <check-box  :check="spsSupInfo.current.bcmIndpndnt?'yes':''" text="To help each spouse <b>become financially independent</b> within a reasonable period"/>                    
                        </div>            
                    </section>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            If after considering the objectives set out in section 161 of the <i>Family Law Act</i>, a spouse is entitled to support, the other spouse has a duty to provide support [s. 160 <i>Family Law Act</i>].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <2> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Current support"></FormPart>

                    <div class="print-block">
                        <div>
                            <b>2. </b>  The <b>current support</b> arrangements are as follows:
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background: #d6d6d6;">
                                {{spsSupInfo.current.crntArrngmnt ? spsSupInfo.current.crntArrngmnt : '&nbsp;'}}
                            </div>
                        </div>

                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court must take into consideration the conditions, means, needs and other circumstances of each spouse when determining spousal support [s. 162 <i>Family Law Act</i>].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <3> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Order about spousal support"></FormPart>
                    
                    <div>
                        <b>3. </b>
                        <div style="display:inline; margin:0 0 0 0.25rem;"> I am applying for an <b>order for spousal support</b> to be paid by <i>(name of paying party)</i></div>                   
                        <grey-box-form v-for="payor,inx in spsSupInfo.current.payors" :key="inx" style="text-indent:0px;display:inline; margin:0 0 0 0.5rem;" textwidth="11.5rem" :beforetext="inx>0?', ':''" hint="" :text="payor"/>          
                        <div style="display:inline; margin:0 0 0 0.5rem;">as follows:</div>
                        
                        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.monthly?'yes':''" text=""/>
                                        
                            <GreyBoxForm style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="<b>Monthly payments</b> to commence on (date)" hint="" :text="spsSupInfo.payDetails.start"/>            
                            <br>
                            <GreyBoxForm style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="5rem" beforetext="(number)" hint="" :text="spsSupInfo.payDetails.rate"/>

                            <GreyBoxForm style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="until" hint="" :text="spsSupInfo.payDetails.end"/>            
                        </div>
                        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.lumpSum?'yes':''" text="<b>Lump sum</b> payment"/>
                            <GreyBoxForm style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="8rem" beforetext="$" hint="" :text="spsSupInfo.payDetails.lumpSumAmount"/>            
                        </div>
                        <div class="marginleft2p5vue" style="margin:0.25rem 0 0rem 1.5rem;">
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" :check="spsSupInfo.payDetails.other?'yes':''" text="<b>Other</b> <i>(specify):</i>"/>
                                
                            <GreyBoxForm style="text-indent:1px;" textwidth="29rem" beforetext="" hint="" :text="spsSupInfo.payDetails.otherComm"/>            
                        
                        </div>
                    </div>
                
                    <div>
                        <b>4. </b> Based on the information I know about each party’s means, needs, and other circumstances:
                        <div>
                            <i>Select only one of the options below</i>
                        </div>
                        <div>
                            <check-box shift="10" shiftmark="0" textDisplay="inline" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.other?'yes':''" text="I expect the range for the <b>monthly amount payable</b> for spousal support to be approximately $"/>
                            <GreyBoxForm style="text-indent:1px;display:inline;" textwidth="10rem" beforetext="" hint="" text=""/>  
                            <GreyBoxForm style="text-indent:1px;display:inline;" textwidth="10rem" beforetext="to $" hint="" text=""/>  
                                <br>
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.other?'yes':''" text="I expect a <b>lump sum amount payable</b> for spousal support to be approximately $"/>
                                <br>
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.other?'yes':''" text="I am <b>not able to estimate</b> the amount payable for spousal support at this time"/>

                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court may order a spouse to pay an amount the court considers appropriate as spousal support after taking into consideration section 160 [duty to provide support for entitled spouse] [s. 165 <i>Family Law Act</i>].
                            <br>
                            The order may include when and how payments are to be made [s. 170 <i>Family Law Act</i>].
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox>
                        <b-icon-book />
                        For more information about how to calculate the amount for spousal support, see the guidebook.
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <4> -->
            <div style="display: flex; flex-direction: row;">
             <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="4" title="Income and earning potential information"></FormPart>

                    <div>
                        <b>5. </b>My current employment situation, training, health and ability to work are as follows:
                        <div class="answerbox" style="min-height: 80px; padding: 4px; background: #d6d6d6;">{{spsSupInfo.incomeInfo.myIncome ? spsSupInfo.incomeInfo.myIncome : '&nbsp;'}}</div>
                    </div>

                    <div class="print-block">
                        <div>
                            <b>6.</b> <b>I am required to file</b> a Financial Statement Form 4 to provide my income information to the court.

                            <br>

                            <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                            <div style="margin:0 0 1rem 1.25rem;">
                                <check-box shift="10" shiftmark="0" :check="!spsSupInfo.applyForCaseManagement?'yes':''" text="<b>I am filing</b> a Financial Statement in Form 4 with this application."/>
                                <check-box shift="10" shiftmark="0" :check="spsSupInfo.applyForCaseManagement?'yes':''" text="I am <b>not able to file</b> a Financial Statement in Form 4 with this application. <br> I am filing an Application for Case Management Order Without Notice orAttendance in Form 11 requesting to waive or modify the requirement that my income information in Form 4 be provided with this application. I understand I will still be required to file a Financial Statement in Form 4 at a later date."/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <b>7. </b> <i>Select only one of the options below and provide the requested information</i>
                        <div>
                            <check-box shift="10" shiftmark="0" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.incomeInfo.knowOpIncome?'yes':''" text="I believe the <b>payor’s annual income</b> is $"/>
                            <GreyBoxForm style="display:inline;margin:0 0 0 0.5rem;" textwidth="8rem" beforetext="" aftertext="because:" hint="" :text="spsSupInfo.incomeInfo.opIncome"/>
                            <GreyBoxForm style="margin:0 0 0 0.5rem;" textwidth="18rem" beforetext="" hint="" text=""/> 
                        </div>
                        <div>
                            <check-box shift="10" shiftmark="0" :check="!spsSupInfo.incomeInfo.knowOpIncome?'yes':''" text="I <b>do not know the income</b> of the payor.I can provide the following facts about the payor’s employment (past or present), training, health and ability to work:"/>
                            <br>
                            <div v-if="spsSupInfo.incomeInfo.knowFacts" 
                                class="answerbox" style="min-height: 80px; padding: 4px; background: #d6d6d6;">{{spsSupInfo.incomeInfo.facts}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 4px; background: #d6d6d6;"></div>
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Spousal support is based in part on income. If a party’s income information is necessary, they have an obligation to provide information to the court, or the court may attribute income in an amount the court considers appropriate [ss.   212 and 213 <i>Family Law Act</i>].
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox>
                        <b-icon-book />
                        <p>You must file a Financial Statement Form 4 or an Application for Case Management Order Without Notice or Attendance Form 11.</p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <div class="print-block" style="border: 2px dashed #333; background-color: #ccc; padding: 8px;">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
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
import { schedule9DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
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
        this.spsSupInfo = this.getNewSpousalSupportInfo();
    }

    public getNewSpousalSupportInfo(){

        let newSpousalSupportInfo = {} as schedule9DataInfoType;
       
        if (this.result.spousalSupportSurvey){
            const entitlementReasons = this.result.spousalSupportSurvey.listOfReasons? this.result.spousalSupportSurvey.listOfReasons:[]
            if(entitlementReasons){
                newSpousalSupportInfo.current = {
                    adv: entitlementReasons.includes('There are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship'),
                    share: entitlementReasons.includes('To share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child'),
                    hardship: entitlementReasons.includes('To relieve economic hardship of the spouses arising from the breakdown of the relationship'),
                    bcmIndpndnt: entitlementReasons.includes('To help each spouse become financially independent within a reasonable period'),
                    crntArrngmnt: (this.result.spousalSupportSurvey.currentSupport)? this.result.spousalSupportSurvey.currentSupport:'',
                    payors: (this.result.spousalSupportSurvey.listOfSupportPayors 
                            && this.result.spousalSupportSurvey.listOfSupportPayors.length > 0)? this.result.spousalSupportSurvey.listOfSupportPayors:''
                }
            } else{
                newSpousalSupportInfo.current = {
                    adv: false,
                    share: false,
                    hardship: false,
                    bcmIndpndnt: false,
                    crntArrngmnt: (this.result.spousalSupportSurvey.currentSupport)? this.result.spousalSupportSurvey.currentSupport:'',
                    payors: (this.result.spousalSupportSurvey?.listOfSupportPayors?.length > 0)? this.result.spousalSupportSurvey.listOfSupportPayors:''
                }
            }

        }

        if (this.result.spousalSupportIncomeAndEarningPotentialSurvey){
            const incomeEarning = this.result.spousalSupportIncomeAndEarningPotentialSurvey
            newSpousalSupportInfo.incomeInfo = {
                myIncome: incomeEarning.incomeInfo?incomeEarning.incomeInfo:'',
                knowOpIncome: (incomeEarning.knowIncome
                        && incomeEarning.knowIncome == 'y'),
                opIncome: (incomeEarning.knowIncome
                        && incomeEarning.knowIncome == 'y'
                        && incomeEarning.incomeAmount)? incomeEarning.incomeAmount:'',
                knowFacts: (incomeEarning.knowFacts
                        && incomeEarning.knowFacts == 'y'),
                facts: (incomeEarning.knowFacts
                        && incomeEarning.knowFacts == 'y'
                        && incomeEarning.factsExplanation)? incomeEarning.factsExplanation:''                
            }
        }

        if (this.result.aboutSpousalSupportOrderSurvey?.howToPaySpousalSupport){ 
            const aboutSpousalSupport = this.result.aboutSpousalSupportOrderSurvey.howToPaySpousalSupport;           
            newSpousalSupportInfo.payDetails = {
                monthly: aboutSpousalSupport.selected == 'monthly',
                start: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyStartDate)?Vue.filter('beautify-date')(aboutSpousalSupport.monthlyStartDate):'',
                end: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyEndDate)?Vue.filter('beautify-date')(aboutSpousalSupport.monthlyEndDate):'',
                rate: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyAmount)?aboutSpousalSupport.monthlyAmount:'',
                lumpSum: aboutSpousalSupport.selected == 'Lump Sum',
                lumpSumAmount: (aboutSpousalSupport.selected == 'Lump Sum'
                        && aboutSpousalSupport.lumpsumAmount)? aboutSpousalSupport.lumpsumAmount:'',
                other: aboutSpousalSupport.selected == 'other',
                otherComm: (aboutSpousalSupport.selected == 'other' 
                        && aboutSpousalSupport.otherComment)? aboutSpousalSupport.otherComment:''
            }
        }

        if (this.result.calculatingSpousalSupportSurvey){
            newSpousalSupportInfo.calc = {
                attaching: (this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'n'
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

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs =='n' && form4unable){
            newSpousalSupportInfo.applyForCaseManagement = true           
        }

        return newSpousalSupportInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
