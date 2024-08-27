<template>
    <div v-if="dataReady">

<!-- <HEADER> -->
        <FormHeader :headerTableData="headerTableData" formName="Notice of Removal of Lawyer for Party" formNumber="FORM 43" formRuleNumber="Rule 163"></FormHeader>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Notice of Lawyer for Party provides notice to the court and each party that a lawyer has stopped representing a party.
                </div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <p><b>Please read before completing the form:</b></p>
                    <ul>
                        <li>
                            You do not have to complete a Notice of Removal of Lawyer for Party if:
                            <ul>
                                <li>a new lawyer representing a party files and serves a Notice of Lawyer Form 42 identifying the new lawyer, or</li>
                                <li>the limited purpose for which a lawyer was representing a party, as described in a notice of lawyer for party, has ended [Rule 163]</li>
                            </ul>
                        </li>
                        <li>
                            This notice may be filed by a lawyer or a party.
                        </li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%; margin-top: 64px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        This notice must be filed and served on each other party [Rule 163]. 
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Party information"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">1.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">The <b>parties to this case</b> are:</div>
                <GreyBoxForm 
                    textwidth="32rem" 
                    textBackgroundColor="#dedede"
                    beforetext="" 
                    style="padding-left: 18px;"
                    :text="applicantLawyer?'':applicantFullName"/>
                <GreyBoxForm 
                    style="margin: 0.2rem 0 0.5rem 0rem; padding-left: 18px;" 
                    textwidth="32rem"
                    textBackgroundColor="#dedede"
                    beforetext="" 
                    hint="Full name of each party" 
                    hintindent="13rem"
                    :italicHint="false" :text="applicantLawyer?otherParties:''"/>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">2.</b>
                <check-box :shift="10" :shiftmark="17" :boxMargin="0" inline="inline" style="display: inline; text-indent: -17px;margin-top:-20px;"
                    :check="acknowledgeService?'yes':''" text="I understand <b>I need to serve each party</b> with a filed copy of this notice."/>
            </div>
            <div style="width: 20%;margin-top:-42px;">
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Lawyer for the party"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <3> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">3.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><i>Select the option that applies and complete the required information</i></div>
                <div style="margin:0.25rem 0 0 0.5rem; width: 100%;">
                    <check-box 
                        :shift="10" :shiftmark="17" :boxMargin="0" inline="inline" style="display: inline; text-indent: -17px;margin-top:-20px;"
                        :check="applicantLawyer?'yes':''" text="I, "/>
                    <GreyBoxForm 
                        style="text-indent:0;margin-left:.2rem;display:inline-block;" 
                        textwidth="17rem" 
                        textBackgroundColor="#dedede"
                        beforetext="" 
                        hint="Full name of lawyer" 
                        hintindent="6rem"
                        :text="applicantLawyer?applicantFullName:''"/>
                    <div style="display: inline-block; font-size: 11pt; margin-left: 0.2rem;">am no longer representing</div>
                    <GreyBoxForm 
                        style="text-indent:2px;display:inline-block; font-size: 11pt; margin: 0.7rem 0 0 1.5rem;" 
                        textwidth="30.5rem"
                        textBackgroundColor="#dedede"
                        beforetext="" 
                        hint="Full name of party/parties" 
                        hintindent="13rem"
                        :italicHint="false" :text="applicantLawyer?otherParties:''"/>
                    <GreyBoxForm 
                        style="text-indent:0.3rem;display:inline-block; font-size: 11pt; margin: 0.7rem 0 0 1rem;" 
                        textwidth="10rem" 
                        textBackgroundColor="#dedede"
                        beforetext="on this case effective"
                        hint="Date (dd/mmm/yyyy)" 
                        hintindent="3rem"
                        :italicHint="false" :text="applicantLawyer?effectiveDate:''"/>
                </div>
                <div style="margin:1rem 0 0 0.5rem; width: 100%;">
                    <check-box 
                        :shift="10" :shiftmark="17" :boxMargin="0" inline="inline" style="display: inline; text-indent: -17px;margin-top:-20px;"
                        :check="!applicantLawyer?'yes':''" text="I, "/>
                    <GreyBoxForm 
                        style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                        textwidth="16rem" 
                        textBackgroundColor="#dedede"
                        beforetext="" 
                        hint="Full name of party" 
                        hintindent="6rem"
                        :text="!applicantLawyer?applicantFullName:''"/>
                    <div style="display: inline-block; font-size: 11pt; margin-left: 0.2rem;">am no longer represented by</div>
                    <GreyBoxForm 
                        style="text-indent:0.5rem;display:inline-block; font-size: 11pt; margin: 0.7rem 0 0 1rem;" 
                        textwidth="13rem" 
                        textBackgroundColor="#dedede" 
                        beforetext="" 
                        hint="Full name of lawyer" 
                        hintindent="3.5rem"
                        :italicHint="false" :text="!applicantLawyer?lawyerName:''"/>
                    <GreyBoxForm 
                        style="text-indent:0.3rem;display:inline-block; font-size: 11pt; margin-top: 0.7rem;" 
                        textwidth="8rem" 
                        textBackgroundColor="#dedede" 
                        beforetext="on this case effective"
                        hint="Date (dd/mmm/yyyy)" 
                        hintindent="1.2rem" 
                        :italicHint="false" :text="!applicantLawyer?effectiveDate:''"/>
                </div>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">4.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><i>Select the option that applies and complete the required information</i></div>
                <div style="margin:0.25rem 0 0 0.5rem; width: 100%;">
                    <check-box 
                        :shift="10" :shiftmark="17" :boxMargin="0" inline="inline" style="display: inline; text-indent: -17px;margin-top:-20px;"
                        :check="!contactInfoChanged?'yes':''" 
                        text="There are <b>no changes to the contact information or address for service</b> of court documents on file"/>
                </div>
                <div style="margin:0.25rem 0 0 0.5rem; width: 100%;">
                    <check-box 
                        :shift="10" :shiftmark="17" :boxMargin="0" inline="inline" style="display: inline; text-indent: -17px;margin-top:-20px;"
                        :check="contactInfoChanged?'yes':''" 
                        text=" The <b>contact information and address for service</b> of court documents are now changed to:"/>
                </div>
                <div style="width: 95%; margin-left: 1.3rem;">
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ contactInfo.address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ contactInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ contactInfo.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ contactInfo.address.postcode }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="margin-top:-2px !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ contactInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ contactInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <!-- <div style="margin-top: 1rem;"></div> -->
        
                    <table class="compactfullsize" style="margin-top:0px !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="contactInfo.lawyerName" colspan="3" style="border:2px solid #fff; padding: 4px;">Firm name (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    <!-- {{ contactInfo.lawyerName | getFullName}} -->
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Firm name (if applicable): </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="width: 20%;margin-top:-42px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        This notice may be prepared and filed by the lawyer or a party.
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>




    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { addressInfoType, contactInfoType, nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { contactInformationDataInfoType, noticeRemoveLawyerPartyDataInfoType } from '@/types/Application/NoticeRemoveLawyerParty';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';


@Component({
    components:{
        UnderlineForm,
        CheckBox,
        NoteBox,
        GreyBoxForm,
        FormPart,
        CourtStamp,
        FormHeader
    }
})

export default class Form43Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;     

    existingFileNumber = '';
    acknowledgeService = false; 
    applicantLawyer = false;
    applicantFullName = '';
    lawyerName = '';
    effectiveDate = '';
    contactInfoChanged = false; 
    contactInfo = {} as contactInformationDataInfoType;
    otherParties = '';   
   
    headerTableData = [];

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;   
        
        this.headerTableData = [
            {
                name:'REGISTRY LOCATION:', 
                value: this.result.applicationLocation
            },
            {
                name:'COURT FILE NUMBER:', 
                value: this.existingFileNumber
            }
        ];

    }
   
    public extractInfo(){        
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLPRConfirmationSurvey?.confirmation == 'Confirmed';
        this.applicantFullName = this.applicantName?Vue.filter('getFullName')(this.applicantName):'';
        this.getNoticeRemoveLawyerPartyInfo();  
    } 

    public getNoticeRemoveLawyerPartyInfo(){  
        
        this.applicantLawyer = false;
        
        this.lawyerName = '';
        this.effectiveDate = '';
        this.contactInfoChanged = false; 
        this.contactInfo = {} as contactInformationDataInfoType;
        this.otherParties = '';

        if(this.result?.noticeRemoveLawyerPartySurvey){

            let noticeRemoveLawyerParty = {} as noticeRemoveLawyerPartyDataInfoType;
            noticeRemoveLawyerParty = this.result.noticeRemoveLawyerPartySurvey;  

            this.applicantLawyer = noticeRemoveLawyerParty.ApplicantType == 'Lawyer';
            this.effectiveDate = noticeRemoveLawyerParty.EffectiveDate?Vue.filter('beautify-date')(noticeRemoveLawyerParty.EffectiveDate):'';

            if (this.applicantLawyer){

                const otherParties = [];
                for (const otherParty of noticeRemoveLawyerParty.OtherPartyInfoNlpr){
                    otherParties.push(Vue.filter('getFullName')(otherParty.name))
                }
                this.otherParties = otherParties.join(', ');

            } else {
                this.lawyerName = noticeRemoveLawyerParty?.LawyerName?noticeRemoveLawyerParty.LawyerName:'';
            }    

            this.getContactInformationResults(noticeRemoveLawyerParty);
        }             
    }

    public getContactInformationResults(noticeRemoveLawyerParty: noticeRemoveLawyerPartyDataInfoType) {    
        
        
        if (noticeRemoveLawyerParty.AddressChanges && noticeRemoveLawyerParty.AddressChanges.includes('true')){
            this.contactInfoChanged = false;
            this.contactInfo = {
                lawyerName: {} as nameInfoType,
                address: {} as addressInfoType,
                contact: {} as contactInfoType
            } 
        } else {
            this.contactInfoChanged = true;
            this.contactInfo = {
                lawyerName: noticeRemoveLawyerParty.ApplicantName?noticeRemoveLawyerParty.ApplicantName:{} as nameInfoType,
                address: noticeRemoveLawyerParty.LawyerAddressNlpr?noticeRemoveLawyerParty.LawyerAddressNlpr:{} as addressInfoType,
                contact: noticeRemoveLawyerParty.LawyerContactNlpr?noticeRemoveLawyerParty.LawyerContactNlpr:{} as contactInfoType
            } 
        }
               
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>