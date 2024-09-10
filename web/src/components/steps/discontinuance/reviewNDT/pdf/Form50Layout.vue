<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Notice of Discontinuance</b></div>
                <div style="font-size:12pt;"><b>Form 50</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 191</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; margin-top: -10px;padding: 2px; opacity: 0.3;"> For registry use only </div>
                </div>
            </div>
        </div>

<!-- <Page 1> -->
<!-- <NOTICE SECTION> -->
        <div style="font-size: 10pt; width: 80%;">
            This Notice of Discontinuance sets out the details of an application about a family law matter, 
            reply or counter application that a party is discontinuing. An application, reply or counter 
            application that is discontinued has been abandoned. The parties cannot take any further action 
            on the application, reply or counter application.
        </div>

        <div class="fla-col-left-80 fla-medium-grey" style="border-style: dashed; padding: 6px; background: #909090; border-color: black; width: 80%">
            <b>Please read before completing this form:</b>
            <ul>
                <li>This form can be filed at any time, but sometimes you need the consent of the other parties 
                    or permission of the court first [Rule 191]. See Part 4 of this form for details.</li>
                <li>Subject to the limitation periods set out in sections 147 (4)(b) <i>[duty to provide support 
                    for child]</i> and 198 (2) <i>[time limits]</i> of the <i>Family Law Act</i>, if you 
                    discontinue an application, you are not prevented from filing a new application about the 
                    same family law matter at a later date, unless the judge orders otherwise [Rule 191 (6)].</li>
            </ul>
        </div>

        <br/>

        <!-- <Part 1> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 1 | Party information</b>
        </div>

        <!-- 1 -->
        <section style="text-indent: 8px;">
            <div style="display: inline-block; font-size: 11pt;">
                <b>My full name</b> is:
            </div>
            <grey-box-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="290px"
                beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
        </section>

        <div style="float: right;width: 18%; margin-top: -40px;background: #d6d6d6;color: #747474;padding: 3px;line-height: 11px;">
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">Copy the party information from a filed document in your case. It should match.</div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <2> -->
        <section style="text-indent: 8px;">
            <div style="display: inline-block;">
                The <b>other party's full name</b> is:
            </div>
            <grey-box-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="290px"
                beforetext="" hint="Full name of party/parties" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="otherParties" />
        </section>

        <div style="margin-top: 1rem;"></div>

        <!-- <Part 2> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 2 | Notice to other party</b>
        </div>

        <!-- 3 -->
        <section style="text-indent: 8px; width: 80%;" resetquestion="3">
            <check-box inline="inline" boxMargin="0" style="margin-left: 4px; margin-top: -20px; display: inline; text-indent: -16px;" :check="acknowledge ? 'yes' : ''"
            text="I understand <b>I must give notice</b> of this notice of discontinuance to each" />
            <div style="margin-left: 42px;">other 
            party. To give notice, they <b>must be served</b> with a copy of the 
            notice</div><div style="margin-left: 42px;"> of discontinuance <b>before the earlier of the following</b> dates:</div>

            <div style="text-indent: 50px;">
                (i) <b>14 days after you filed</b> the notice of discontinuance
            </div>
            <div style="text-indent: 50px;">
                (ii) the <b>date of the next scheduled court appearance</b>
            </div>
        </section>

        <div style="page-break-after:always;">&nbsp;</div> 

        <!-- <Part 3> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 3 | Details of Discontinuance</b>
        </div>

        <!-- <4> -->
        <section style="text-indent: 8px; width: 80%;">
            <div style="display: inline-block;">
                I am <b>discontinuing</b>
            </div>
            <div style="display: inline-block; margin-left: 10px; color: grey;">
                <i>Select the correct option(s) and complete any required information</i>
            </div>
            <div style="display: inline-block;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline; font-weight: bold;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="the whole of my:"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disWholeApp.includes('form3')?'yes':''" 
                    text="Application About a Family Law Matter on"/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="12rem" 
                    hintindent="4rem"
                    beforetext="" 
                    hint="Date (dd/mmm/yyyy)" 
                    :italicHint="false" :text="disWholeApp.includes('form3')?application.date:''"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disWholeApp.includes('form6') || disWholeApp.includes('form8')?'yes':''" 
                    text="Reply to an Application About a Family Law Matter on "/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 5px;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="Date (dd/mmm/yyyy)" 
                    :italicHint="false" :text="(disWholeApp.includes('form6') || disWholeApp.includes('form8'))?reply.date:''"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disWholeApp.includes('form6Counter')?'yes':''" 
                    text="Counter Application filed on "/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="Date (dd/mmm/yyyy)" 
                    :italicHint="false" :text="disWholeApp.includes('form6Counter')?counterDate:''"/>
            </div>
            <div style="margin-top: 0.5rem; border-bottom: 1px solid black; width: 91%; margin-left: 32px;"></div>
            <div style="display: inline-block">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline; font-weight: bold;" 
                    :check="disPartialApp.length>0?'yes':''" 
                    text="the following schedule(s)/part(s) of my:"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disPartialApp.includes('form3')?'yes':''" 
                    text="Application About a Family Law Matter on "/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 5px;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="Date (dd/mmm/yyyy)" 
                    :italicHint="false" :text="disPartialApp.includes('form3')?application.date:''"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disPartialApp.includes('form6') || disWholeApp.includes('form8')?'yes':''" 
                    text="Reply to an Application About a Family Law Matter on "/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 5px;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="Date (dd/mmm/yyyy)" 
                    :italicHint="false" :text="(disPartialApp.includes('form6') || disWholeApp.includes('form8'))?reply.date:''"/>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; margin-left: 30px;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;" 
                    :check="disPartialApp.includes('form6Counter')?'yes':''" 
                    text="Counter Application filed on "/>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="Date (dd/mm/yyyy)" 
                    :italicHint="false" :text="disPartialApp.includes('form6Counter')?counterDate:''"/>
            </div>
            <div style="display: inline-block; color: grey;">
                <i>List the schedule(s) or part(s) you are discontinuing</i>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display: inline-block; width: 97%;">
                <div class="answerbox" style="background: #C0C0C0;">{{ partialInfo ? partialInfo : '&nbsp;' }}</div>
            </div>
        </section>

        <div style="float: right;width: 18%; margin-top: -420px;background: #d6d6d6;color: #747474;padding: 3px;line-height: 11px;">
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">You can only discontinue your own 
            Application About a Family Law Matter, Reply to an Application About a Family Law Matter or Counter Application [Rule 
            191(4)].The discontinuance of your application or reply does not affect any application or reply made by another party 
            [Rule 191(5)].</div>
        </div>

        <!-- <Part 4> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 4 | Information about steps taken in the case</b>
        </div>

        <!-- <5> -->
        <section style="text-indent: 8px; width: 80%;">
            <div style="display: inline-block; color: grey;">
                <i>Please select the correct option and complete any required information</i>
            </div>
            <div style="display: inline-block; text-indent: 10px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0"                
                    style="display:inline;margin-left:0.35rem"
                    :shift="10"
                    shiftmark="-10"
                    :check="courtAppearanceScheduled == 'n'?'yes':''" 
                    text="The application has no date scheduled for a court appearance"/>
            </div>
            <div style="display: inline-block; text-indent: 10px;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    shift="10"
                    shiftmark="-10"
                    style="display:inline;margin-left:0.35rem;" 
                    :check="courtAppearanceScheduled == 'y'?'yes':''" 
                    text="The application is scheduled for a court appearance on "/>
                <grey-box-form 
                    style="text-indent:5px;display:inline-block;" 
                    textwidth="6rem" 
                    marginTop="-19px"
                    hintindent="1rem"
                    beforetext="" 
                    hint="dd/mmm/yyyy" 
                    :text="courtAppearanceScheduled == 'y'?courtDate:''"/>            
            </div>
            <div style="display: inline-block; text-indent: 10px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0"                
                    style="display:inline;margin-left:0.35rem"
                    shift="10"
                    shiftmark="-10"
                    :check="courtAppearanceScheduled == 'n'?'yes':''" 
                    text="I am discontinuing only a reply"/>
            </div>
        </section>
        <!-- <6> -->
        <section style="text-indent: 8px; width: 80%;">
            <div style="display: inline-block;">
                Has a trial preparation conference already happened?
            </div>
            <div style="display: inline-block; text-indent: 10px;">
                <check-box inline="inline" boxMargin="0" shift="10" shiftmark="-10" style="display:inline;margin-left:0.35rem;" :check="trialPrepHappened == 'y'?'yes':''" text="Yes➜<b><i>Complete Part 5</b> Consent</i>"/>
                <check-box inline="inline" boxMargin="0" shift="10" shiftmark="-10" style="display:inline;margin-left:0.35rem;" :check="trialPrepHappened == 'n'?'yes':''" text="No"/>
            </div>
        </section>
        <!-- <7> -->
        <section style="text-indent: 8px; width: 80%;">
            <div style="display: inline-block;">
                Is a trial date scheduled within 30 days of the date this notice is being filed?
            </div>
            <div style="display: inline-block; text-indent: 10px;">
                <check-box inline="inline" boxMargin="0" shift="10" shiftmark="-10" style="display:inline;margin-left:0.35rem;" :check="trialDateWithin30Days == 'y'?'yes':''" text="Yes➜<i><b>Complete Part 5</b> Consent</i>"/>
                <check-box inline="inline" boxMargin="0" shift="10" shiftmark="-10" style="display:inline;margin-left:0.35rem;" :check="trialDateWithin30Days == 'n'?'yes':''" text="No"/>
            </div>
        </section>  

        <div style="float: right;width: 18%; margin-top: -230px;background: #d6d6d6;color: #747474;padding: 3px;line-height: 11px;">
            <b-icon-info-circle-fill />
            <br />
            <div style="font-size: 9px">When you file this 
            notice, the appearance for your document, if applicable, will be cancelled.Remember you must serve the other 
            party with a copy of this filed notice before the scheduled date.</div>
            <div style="background: #FFF; line-height: 11px; margin-left: -3px; margin-right: -6px;">&nbsp;</div>
            <b-icon-info-circle-fill />
            <br />
            <div style="font-size: 9px">If yes, each other 
            party is required to provide their consent to discontinue your application, reply or counter application or 
            you require the permission of the court to discontinue it [Rule 191 (2)(b) & (3)(b)].</div>
        </div>

        <div style="page-break-after:always;">&nbsp;</div> 

        <!-- <Part 5> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 5 | Consent of the parties–Complete this part only if consent is required based on your responses in Part 4.</b>
        </div>

        <div style="height: 9px;">&nbsp;</div>

        <div style="display: inline-block; width: 80%;">
            <grey-box-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="17rem" 
                beforetext="<b>The parties' consent</b> to" 
                hint="Full name of party"
                :italicHint="false" 
                :text="''"/>
                <div style="display: inline;">discontinuing their application, reply or counter application as described in Part 3 of this form.</div>           
        </div>
        <div style="height: 30px;">&nbsp;</div>
        <div style="margin-top: 0.5rem; border-top: 1px solid black; width: 78%;"></div>
        <div style="margin-top: 1rem;"></div>
        <div style="display: inline-block;">
            <underline-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="17rem" 
                beforetext="Signature of" 
                hint="type or print name"
                hintMargin="100px"
                :italicHint="false" 
                :text="''"/>
                <div style="display: inline;"></div>           
        </div>  
        <div style="height: 9px;">&nbsp;</div>
        <div style="display: inline-block;">
            <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="false?'yes':''" text="party"/>
            <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="false?'yes':''" text="lawyer for"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="16rem" beforetext="" hint="name of party/parties" :text="''"/>            
        </div>  
        <div style="height: 30px;">&nbsp;</div>
        <div style="margin-top: 0.5rem; border-top: 1px solid black; width: 78%;"></div>
        <div style="margin-top: 1rem;"></div>
        <div style="display: inline-block;">
            <underline-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="17rem" 
                beforetext="Signature of" 
                hint="type or print name"
                hintMargin="100px"
                :italicHint="false" 
                :text="''"/>
                <div style="display: inline;"></div>           
        </div>  
        <div style="height: 9px;">&nbsp;</div>
        <div style="display: inline-block;">
            <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="false?'yes':''" text="party"/>
            <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="false?'yes':''" text="lawyer for"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="16rem" beforetext="" hint="name of party/parties" hintMargin="100px" :text="''"/>            
        </div>  

        <div style="float: right;width: 18%; margin-top: -250px;background: #d6d6d6;color: #747474;padding: 3px;line-height: 11px;">
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">If you cannot obtain the consent of each 
            party, you can apply to the court for permission using the Application for Case Management Order Form 10.</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { discontinuanceInformationSurveyDataInfoType, moreInformationSurveyDataInfoType, noticeDiscontinuanceDataInfoType } from '@/types/Application/Discontinuance';

@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox       
    }
})

export default class Form50Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;   

    existingFileNumber = '';
    dateOfAddressChange = '';   
    acknowledge = false;

    listOfDiscontinuanceDocs = [];
    otherParties = '';
    disWholeApp = [];
    disPartialApp = [];
    application = {type: 'a Family Law Matter', date: ''};
    reply = {type: '', date: ''};
    counterDate = '';
    partialInfo = '';
    courtAppearanceScheduled = '';
    courtDate = '';
    trialPrepHappened = '';
    trialDateWithin30Days = '';
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getNoticeDiscontinuanceInfo();    
        this.getDiscontinuanceInfo();    
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
    } 

    public getNoticeDiscontinuanceInfo(){          

        if(this.result?.noticeDiscontinuanceSurvey){

            let noticeDiscontinuance = {} as noticeDiscontinuanceDataInfoType;

            noticeDiscontinuance = this.result.noticeDiscontinuanceSurvey;    
            this.acknowledge = noticeDiscontinuance.ExplanationServe == 'confirm';        
            this.listOfDiscontinuanceDocs = noticeDiscontinuance.discontinuanceDocs?noticeDiscontinuance.discontinuanceDocs:[];

            this.yourInfo = getYourInformationResults(noticeDiscontinuance);

            const otherPartiesList = [];
            for (const otherParty of noticeDiscontinuance.otherPartyInfoDis){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ')
           
        } else {
            this.yourInfo = {} as yourInformationInfoDataInfoType;
        }
            
    }

    public getDiscontinuanceInfo(){       
        
        this.disWholeApp = [];
        this.disPartialApp = [];
        this.application = {type: 'a Family Law Matter', date: ''};
        this.reply = {type: '', date: ''};
        this.counterDate = '';
        this.partialInfo = '';
        this.courtAppearanceScheduled = '';
        this.courtDate = '';
        this.trialPrepHappened = '';
        this.trialDateWithin30Days = '';

        if(this.result?.discontinuanceInformationSurvey && this.result?.moreInformationSurvey){

            let discontinuance = {} as discontinuanceInformationSurveyDataInfoType;
            discontinuance = this.result.discontinuanceInformationSurvey;  
            
            let moreInfo = {} as moreInformationSurveyDataInfoType;
            moreInfo = this.result.moreInformationSurvey;  

            const partialInfoList = [];
            
            if (this.listOfDiscontinuanceDocs.includes('form3')){

                this.application.date = Vue.filter('beautify-date')(moreInfo.Form3FiledDate);

                if(discontinuance.discontinueAllForm3 == 'y'){
                    this.disWholeApp.push('form3')
                } else {
                    this.disPartialApp.push('form3');
                    if (discontinuance.discontinuePartForm3){
                        partialInfoList.push(discontinuance.discontinuePartForm3)
                    }                    
                    
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form6')){

                this.reply.date = Vue.filter('beautify-date')(moreInfo.ReplyFiledDate);
                
                if (moreInfo.ReplyType == 'form6'){
                    this.reply.type = 'a Family Law Matter';                    
                }

                if(discontinuance.discontinueAllForm6 == 'y'){
                    this.disWholeApp.push('form6')
                } else {
                    this.disPartialApp.push('form6');
                    if (discontinuance.discontinuePartForm6){
                        partialInfoList.push(discontinuance.discontinuePartForm6)
                    }  
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form6Counter')){

                this.counterDate = Vue.filter('beautify-date')(moreInfo.CounterFiledDate);

                if(discontinuance.discontinueAllForm6Counter == 'y'){
                    this.disWholeApp.push('form6Counter')
                } else {
                    this.disPartialApp.push('form6Counter')
                    if (discontinuance.discontinuePartForm6Counter){
                        partialInfoList.push(discontinuance.discontinuePartForm6Counter)
                    }  
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form8')){

                this.reply.date = Vue.filter('beautify-date')(moreInfo.ReplyFiledDate);
                
                if (moreInfo.ReplyType == 'form8'){
                    this.reply.type = 'a Counter Application';                    
                }

                if(discontinuance.discontinueAllForm8 == 'y'){
                    this.disWholeApp.push('form8')
                } else {
                    this.disPartialApp.push('form8');
                    if (discontinuance.discontinuePartForm8){
                        partialInfoList.push(discontinuance.discontinuePartForm8)
                    }  
                }
            }

            this.partialInfo = partialInfoList.join(', ');

            this.courtAppearanceScheduled = moreInfo.CourtAppearanceScheduled;
            this.courtDate = moreInfo.CourtAppearanceScheduled == 'y'?Vue.filter('beautify-date')(moreInfo.CourtAppearanceDate):'';
            this.trialPrepHappened = moreInfo.TrialPrep;
            this.trialDateWithin30Days = moreInfo.TrialDateScheduled;
        
        }        
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>