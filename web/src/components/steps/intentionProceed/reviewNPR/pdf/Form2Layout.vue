<template>
    <div v-if="dataReady" style="font-size: 11pt;">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :headerTableData="[{value:result.applicationLocation}, {value: existingFileNumber}, null, {}]" formName="Notice of Intention to Proceed" formNumber="Form 2" formRuleNumber="Rules 15 and 42"></FormHeader>

    <div class="print-block">
        <div style="margin-top: 0.5rem;"></div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="text-align: justify;">
                    This Notice of Intention to Proceed provides notice that a party is seeking to proceed with a family law matter that has already been initiated but no step in the case has been taken for over one year and no final order has been made.
                </div>
        
                <NoteBox style="border: 2px dashed #333;" fontSize="11pt">
                    <b>Please read before completing the form:</b>
                    <ul>
                        <li>
                            This form is only to be used to proceed with a family law matter when the last step completed in the case by any party was more than one year ago and no final order has been made.
                        </li>
                        <li>
                            For guidance filling in this form, please read the guidebook. The guide is available online at <a href="www.gov.bc.ca/court-forms" target="_blank">www.gov.bc.ca/court-forms</a> or from your local court registry.
                        </li>
                    </ul>            
                </NoteBox>
            </div>
            <div style="width: 20%;">
                <NoteBox style="margin-top: 80px;">
                    <b-icon-book />
                    <p>
                        For more information about how to proceed with your family law matter if less than a year has passed since your last step or a final order was made, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 0.5rem;"></div>    

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="About the parties"></FormPart>

                <div>
                    <b>1. </b>
                    <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="21rem" beforetext="My <b>full name</b> is:" hint="Full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>

                    <grey-box-form style="text-indent:2px;display:inline-block;margin-left:-0.25rem; margin-top: 15px; padding-left: 20px;" textwidth="20rem" beforetext="My <b>date of birth</b> is:" hint="(dd/mmm/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date-mid"/>
                </div>

                <div>
                    <b>2. </b>
                    <div style="display:inline;">
                        <grey-box-form 
                            style="text-indent:2px;display:inline-block; margin-top: 1rem; margin-bottom:0.5rem" 
                            textwidth="16rem" 
                            beforetext="The <b>other party’s full name</b> is:" 
                            hint=""
                            aftertext="" 
                            :italicHint="false" 
                            :text="firstOtherParty.name | getFullName"/> 
                                                                  
                        <grey-box-form 
                            style="display:inline;text-indent:2px;padding-left: 20px;" 
                            textwidth="13rem" 
                            beforetext="Their <b>date of birth</b> (dd/mmm/yyyy) is:" 
                            hint="" 
                            :italicHint="false"
                            aftertext="" 
                            :text="firstOtherParty.dob | beautify-date-mid"/>
                    </div>
                </div>

                <div style="margin-top: 0.5rem;"></div>       

            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Copy the party information from a filed document in your case. It should match.
                    </p>
                </NoteBox>
            </div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Intention to proceed"></FormPart>

                <div>
                    <b>3. </b>
                    <check-box 
                        inline="inline" 
                        textDisplay="inline"
                        boxMargin="0" 
                        shiftmark="0"
                        style="display:inline; margin-left: 10px;" 
                        :check="lastStepInfo.resolveFlmDate || lastStepInfo.flmDate || lastStepInfo.otherDate ? 'yes' : ''" 
                        text="More than one year has passed since the parties have taken any step <br> in my case and <b>I want to proceed with the family law matter(s) as set out in the following document</b> filed with the court:" />           
                </div>

                <div style="margin-left: 24px;">
                    <check-box 
                        inline="inline" 
                        textDisplay="inline"
                        boxMargin="0" 
                        shiftmark="0"
                        style="display: inline; margin:0 0 0 1rem;" 
                        :check="lastStepInfo.resolveFlmDate?'yes':''" 
                        text="Notice to Resolve a Family Law Matter" /> 

                    <br>

                    <check-box 
                        inline="inline" 
                        textDisplay="inline"
                        boxMargin="0" 
                        shiftmark="0"
                        style="display: inline; margin:0 0 0 1rem;" 
                        :check="lastStepInfo.flmDate?'yes':''" 
                        text="Application About a Family Law Matter" /> 
                    
                    <br>

                    <check-box 
                        inline="inline" 
                        textDisplay="inline"
                        boxMargin="0" 
                        shiftmark="0"
                        style="display: inline; margin:0 0 0 1rem;" 
                        :check="lastStepInfo.otherDate ?'yes':''" 
                        text="Other" /> 

                        <grey-box-form 
                        style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                        textwidth="18rem" 
                        beforetext="<i style='color:#ababab'>(specify):</i>" 
                        hint="" 
                        marginTop="-15px"
                        :text="lastStepInfo.otherDescription"/>
                </div>
        
                <div style="margin-bottom: 1rem;"></div>

                <NoteBox style="border: 2px dashed #333;" fontSize="10pt">
                    <b>
                        IMPORTANT NOTE:
                    </b>
                    <br>
                    <b>Before proceeding any further</b> with your case, you must participate in a needs assessment or attend a family management conference depending on the last step taken in your case, as described in the rules and <b>set out in Part 6 of this Notice</b>.
                </NoteBox>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill /><br>
                    <span>
                        If you have already filed an Application About a Family Law Matter, you do not need to also select the Notice to Resolve.
                    </span>
                </NoteBox>
            </div>
        </div>
    </div>

    <div style="margin-bottom: 0.5rem;"></div>

    <div class="print-block">
        <div style="margin-bottom: 0.5rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Notice "></FormPart>

                <div>
                    <b>4. </b>
                    <check-box 
                        inline="inline" 
                        textDisplay="inline"
                        boxMargin="0" 
                        shiftmark="0"
                        style="display:inline; margin-left: 10px" 
                        :check="acknowledgeService?'yes':''" 
                        text="I understand <b>I must give notice</b> of my intention to proceed to <br> each other party. To give notice, each other party must be:"/>   
                    
                    <ul style="margin-left: 24px;">
                        <li>
                            <b>provided with a copy of this document</b>, if I am proceeding on a filed Notice to Resolve a Family Law Matter (an Application About a Family Law Matter has not been filed)
                        </li>
                        <li>
                            <b>served with a copy of this document</b>, if I am proceeding on a filed Application About a Family Law Matter
                        </li>
                    </ul>             
                </div>

            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book /><br>
                    <span>
                        For more information about how to give notice to the other party, see the guidebook.
                    </span>
                </NoteBox>
            </div>
        </div>
        <div style="margin-bottom: 0.5rem;"></div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="Latest step taken in case"></FormPart>

                <div>
                    <b>5. </b>
                    The last step completed in my case, by any party, 
                    <grey-box-form 
                        style="text-indent:1px;display:inline-block;" 
                        textwidth="6rem" 
                        beforetext="on" 
                        aftertext="was:"
                        hint="Date (dd/mmm/yyyy)" 
                        hintindent="0"
                        marginTop="-15px"
                        hintmargintop="6px"
                        :text="lastStepInfo.selectedDate | beautify-date-mid"/> 

                    <div style="margin-left:1rem;margin-top:6px">
                        <i style="color: #999;">Select only one of the options below and complete the required information</i>
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.resolveFlmDate?'yes':''" 
                            text="Filing of the <b>Notice to Resolve a Family Law</b> Matter"/>                
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.flmDate?'yes':''" 
                            text="Filing of the <b>Application About a Family Law Matter</b>"/>                
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.needsAssessmentDate?'yes':''" 
                            text="Participation in a <b>needs assessment</b>"/>                
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.parentingEducationProgramDate?'yes':''" 
                            text="Completion of a <b>parenting education program</b>"/>                
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.consensualDisputeResolutionDate?'yes':''" 
                            text="Participation in <b>consensual dispute resolution</b>"/>                
                    </div>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0"
                            shiftmark="0"
                            style="display:inline;" 
                            :check="lastStepInfo.otherDate?'yes':''" 
                            text="other  "/>
                        
                            <grey-box-form 
                                style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                                textwidth="18rem" 
                                beforetext="<i style='color:#ababab'>(specify):</i>" 
                                hint="" 
                                 marginTop="-15px"
                                :text="lastStepInfo.otherDescription"/>
                    </div>                                      
                </div> 
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Different registry types have different steps that may be required for a family law matter. A step listed here may not apply to you.
                        <br>
                        The timing when a step is required is also different for different registry types.
                    </p>
                </NoteBox>
            </div>
        </div>

    </div>

        <div style="margin-bottom: 0.5rem;"></div>
        <div class="print-block">
            <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="5" title="Current address for service"></FormPart>

                <div>
                    <b>6. </b> 
                    <span>My current <b>address for service</b> of court documents and contact information is:</span>
                    <br>
                    <i style="color: #999;">
                        You must provide an address for service and contact number, but it does not have to be your own if you don’t want to
                    </i>
                
                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                    </table>
    
                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>
    
                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede; margin-top: -12px;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable):</td>
                        </tr>
                    </table>
                </div>
                
                <NoteBox fontSize="10pt" style="border: 2px dashed #333;">
                    <b>NOTE TO THE OTHER PARTY:</b>
                    <br>
                    <span>
                        If your address for service and/or contact information filed with the court is not current, you must file a Notice of Address Change in Form 46 and serve a copy of the notice on each other party.Your address must be current to receive notice of any court appearance.
                    </span>
                </NoteBox>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book />
                    <p>
                        For more information about how this information will be used and who will have access to it, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>
        </div>
        <div style="margin-bottom: 0.5rem;"></div>

    <div class="print-block">
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="6" title="What you must do to proceed with your family law matter" subtitle="">
                    <span 
                        style="display: inline-block; font-size: 9pt; border-top: 1px solid #fff; font-weight: normal; margin-top: -12px;"
                    >
                        You <b>do not</b> need to <b>complete this Part</b> to file the form. It provides you with a checklist of the next steps you must take to proceed with your family law matter.
                    </span>
                </FormPart>

                <div style="background-color: #ddd; margin-top: 10px;"><b>Step 1:</b> </div>
                
                <div style="margin-left: 16px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="Give <b>notice</b> of the Notice of Intention to Proceed <b>to each other party</b>"/>
                </div>
                <div style="margin-left: 20px;">
                    <b>Note:</b> If the Notice to Resolve or Application About a Family Law Matter has not been given to the other party, you must includ ea copy of it along with the Notice of Intention to Proceed.
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book /> <br>
                    <span>
                        For more information about how to serve or provide notice to  the other party, including proof of service,  see the guidebook.
                    </span>
                </NoteBox>
            </div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">

                <div style="background-color: #ddd; margin-top: 10px;"><b>Step 2:</b> </div>
                <span>
                    <b>If</b> your case is in an <b>early resolution registry and no Application</b> About a Family Law Matter <b>has been filed</b>, you must participate in a <b>needs assessment</b>.
                </span>

                <div style="margin-left: 44px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="<b>Contact</b> Family Justice Services Division to <b>schedule</b> your individual <b>needs assessment</b>"/>
                </div>
                <div style="height:120px; margin-left:100px; margin-right: 80px;  display: flex; justify-content: space-around; align-items: center; border: 2px solid #dedede;">
                    <div style="text-align: center; color: #dedede;">FJSD <br> contact information</div>
                </div>

                <div style="margin-left: 44px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="<b>Participate in a needs assessment</b>"/>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill /> <br>
                    <span>
                        At the needs assessment, you will receive to help identify the next steps for you. You may be required to meet the other early resolution requirements, if applicable, including:
                    </span>
                    <span>
                        <ul>
                        <li>Completion of a parenting education program</li>
                        <li>Participation in a consensual dispute resolution session</li>
                    </ul>
                    </span>  
                </NoteBox>
            </div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b>If</b> your case is in an <b>early resolution registry and</b> an <b>Application</b> About a Family Law Matter has been <b>filed or</b> your case is in <b>any other registry</b>, you must attend a <b>family management conference</b>.
                </div>

                <div style="margin-left: 44px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="<b>File</b> proof of service of the Notice of Intention to Proceed on each other party"/>
                </div>

                <div style="margin-left: 44px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="<b>Schedule</b> a family management conference"/>

                    <p>
                        The court registry will provide you with information about how to schedule the family management conference after you have filed a Certificate of Service to prove service of the Notice of Intention to Proceed on each other party. 
                    </p>
                    <p>
                        To schedule a family management conference, you must also have met any other requirements for scheduling including any of the following as applicable:
                    </p>
                    <ul>
                        <li>
                            filing proof of service of the Application About a Family Law Matter, or a reply was filed by the other party
                        </li>
                        <li>
                            participating in a needs assessment and filing a Referral Request Form 21
                        </li>
                        <li>
                            completing a parenting education program and filing a certificate of completion
                        </li>
                    </ul>
                </div>

                <div style="margin-left: 44px;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0"
                        shiftmark="0"
                        style="display:inline;" 
                        check="" 
                        text="<b>Attend</b> the family management conference"/>
                </div>

            </div>
            <div style="width: 20%;">
                <div style="padding-top: 10px;">
                    <NoteBox>
                    <b-icon-info-circle-fill /> <br>
                    <span>
                        The requirements for scheduling a family management conference a reset out in Rules 37 to 40, as applicable.
                    </span>
                </NoteBox>
                </div>
              
                 <div style="padding-top: 10px;">
                    <NoteBox>
                    <b-icon-info-circle-fill /> <br>
                    <span>
                        At the family management conference, the judge will help to determine the next steps that are right for your case.
                    </span>
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
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { lastStepDataInfoType, nprOtherPartyDataInfoType } from '@/types/Application/IntentionProceed';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        GreyBoxForm,
        FormHeader,
        FormPart,
        NoteBox       
    }
})

export default class Form2Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;   
    otherPartyInfo: nprOtherPartyDataInfoType[] = [];
    additionalOtherParties: nprOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as nprOtherPartyDataInfoType;
    lastStepInfo = {} as lastStepDataInfoType;

    existingFileNumber = '';  
    overOneYear = false;
    acknowledgeService = false;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){    

        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }         
        
        this.yourInfo = this.getYourInfo();        
        this.lastStepInfo = this.getLastStepInfo();
         this.result.noticeIntentionProceedSurvey?.lastStep;
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNprConfirmationSurvey?.confirmation == 'Confirmed';
        this.overOneYear = !this.result.noticeIntentionProceedSurvey?.unresolvedLessThanYear;
    } 

    public getYourInfo(){          

        if(this.result?.yourInformationNprSurvey){            
            return getYourInformationResults(this.result?.yourInformationNprSurvey); 
        } else {
            return {} as yourInformationInfoDataInfoType;
        }
            
    }

    public getOtherPartyInfo(){

        let OpInformation: nprOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyNprSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyNprSurvey;
        
            for(const party of otherPartyData){ 
                const otherParty = {} as nprOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;
                
                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    } 

    public getLastStepInfo(){     
        
        const lastStepInfo = {
            resolveFlmDate: "",
            needsAssessmentDate: "",
            parentingEducationProgramDate: "",
            consensualDisputeResolutionDate: "",
            flmDate: "",
            selected: "",
            otherDate: "",
            otherDescription: "",

            selectedDate: ""
        }

        if(this.result?.noticeIntentionProceedSurvey?.lastStep && this.result?.noticeIntentionProceedSurvey?.unresolvedFlm == 'y'){  
            
            const lastStepData = this.result?.noticeIntentionProceedSurvey?.lastStep;
            lastStepInfo.selected = lastStepData.selected;
            if (lastStepInfo.selected == 'resolveFlm'){
                lastStepInfo.selectedDate = lastStepData.resolveFlmDate;
                lastStepInfo.resolveFlmDate = lastStepData.resolveFlmDate;

            } else if (lastStepInfo.selected == 'parentingEducationProgram'){
                lastStepInfo.selectedDate = lastStepData.parentingEducationProgramDate;
                lastStepInfo.parentingEducationProgramDate = lastStepData.parentingEducationProgramDate;

            } else if (lastStepInfo.selected == 'needsAssessment'){
                lastStepInfo.selectedDate = lastStepData.needsAssessmentDate;
                lastStepInfo.needsAssessmentDate = lastStepData.needsAssessmentDate;

            } else if (lastStepInfo.selected == 'flm'){
                lastStepInfo.selectedDate = lastStepData.flmDate;
                lastStepInfo.flmDate = lastStepData.flmDate;

            } else if (lastStepInfo.selected == 'consensualDisputeResolution'){
                lastStepInfo.selectedDate = lastStepData.consensualDisputeResolutionDate;
                lastStepInfo.consensualDisputeResolutionDate = lastStepData.consensualDisputeResolutionDate;

            } else if (lastStepInfo.selected == 'other'){
                lastStepInfo.selectedDate = lastStepData.otherDate;
                lastStepInfo.otherDate = lastStepData.otherDate;
                lastStepInfo.otherDescription = lastStepData.otherDescription
            }
            
        }

        return lastStepInfo;
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">
    .container {
        display: inline;
        position: relative;
        padding: 0px;
        margin: 0px;    
    
    }

    /* Create a custom checkbox */
    .container .checkmark {
        display: inline;
        position: absolute;
        border: 1px solid #000!important;
        padding: 1rem;
        top: 0;
        left: 0;
        height: 1em;
        width: 1em;
        background-color: #eee;
    }
</style>