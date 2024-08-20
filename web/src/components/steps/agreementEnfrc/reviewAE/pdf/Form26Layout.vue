<template>
    <div v-if="dataReady" style="font-size: 10pt;">
<!-- Page 1 -->
        <div style="width: 120px; background: #666; color: #fff; padding: 16px; font-weight: bold;">
            <span style="font-size: 24pt;">Form</span> 
            <br>
            <span style="font-size: 40pt;">26</span>
        </div>

        <div style="width: 400px; margin-top: 200px; margin-bottom: 200px;">
            <h1>Request to File an Agreement <br> Form 26</h1>

            <p style="font-size: 12pt;">Provincial Court Family Rules</p>
        </div>


<!-- Page 2 -->
        <div class="new-page"></div>
        <div style="display: flex; border: 2px solid #333;padding: 8px;">
            <div style="width: 80%;">
                <b>You can complete and file most family forms online using the <i>Family Law Act</i> Online Forms Service.</b>
                <br>
                Access the service at <a href="http://justice.gov.bc.ca/apply-for-family-order" target="_blank">justice.gov.bc.ca/apply-for-family-order</a>. 
                <br>
                The free service includes guided pathways that ask you questions and put your answers into the required court forms. When you’re finished, you can save and file your forms electronically or print them to file in person.
            </div>
            <div style="width: 20%;">
                <img style="max-width: 120px; max-height: 120px;" width="120" height="120" alt="" src="data:img/png;base64,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" />
                
            </div>
        </div>

        <div>
            A PDF version of this form is available online for download at <a href="www.gov.bc.ca/court-forms" target="_blank">www.gov.bc.ca/court-forms</a>.

            <br>

            <b>For courthouse locations, addresses, and contact information visit:</b>

            <br>
            <a href="http://www.gov.bc.ca/courthouselocations" target="_blank">http://www.gov.bc.ca/courthouselocations</a>

            <br>

            <b>Family law:</b>

            <br>

            The <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020" target="_blank">Provincial Court Family Rules</a> set out the steps that you must take and the forms you must complete in a family law case. These rules apply t  o cases in Provincial Court about matters under the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_00" target="_blank">Family Law Act</a> and the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96127_01" target="_blank">Family Maintanance Enforcement Act</a>.

            <br>

            You can find the Rules and Acts on the BC Laws website at <a href="www.bclaws.gov.bc.ca" target="_blank">www.bclaws.gov.bc.ca</a>.
            
            <br>

            <div style="background-color: #666; color: #fff; font-size: 14pt; font-weight: bold; padding: 20px; text-align: center;">
                Preparing a Request to File an Agreement Form 26
            </div>

            Complete this form if you need to file a written agreement in Provincial Court. 
            
            <br>
            
            A written agreement that is filed in Provincial Court under the <i>Family Law Act</i> is enforceable under the Act as if it were an order of the Provincial Court.  

            <br>

            <b>
                How do I enforce a written agreement?
            </b>

            <br>

            There  are  different  enforcement  options  available  under  the  Family  Law  Act  or  the  Family  Maintenance  Enforcement Act depending on what issues your written agreement is about. 

            <br>

            Enforcement actions under the Provincial Court Family Rules are set out in <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#part10" target="_blank">Part – 10 Enforcement</a>. 

            <br>

            <div style="border: 2px dashed #333; background: #d6d6d6; padding: 8px; ">
                <b>NOTE:</b> If you need help with paying or receiving child support or spousal support under an agreement,you may want to contact the BC Family Maintenance Agency first to see if they can help. 
                <br>
                Visit their website at <a href="www.bcfma.ca" target="_blank">www.bcfma.ca</a> or contact them by phone at 1-800-663-3455.
            </div>

            <div style="display: flex;">
                <div style="width: 50%; padding: 8px;">
                    <span style="display: inline-block; background: #d6d6d6; padding: 10px; border-radius: 22px; margin-right: 4px; width: 44px; height: 44px; ">
                        <b-icon-chat-left-fill font-scale="1.5" /> 
                        <b-icon-chat-right-fill style="
                            border-left: 1px solid #fff;
                            border-top: 1px solid #fff;
                            display: inline-block;
                            margin-left: -10px;
                            " />
                    </span>
                    <div style="display: inline; background-color: #333; color: #fff;">
                        <b>Need legal help?</b>
                    </div>

                    <br>
                    <br>

                    It’s  important  to  understand  the  law  and  make  sure  you  have the right information. If   you don’t, it can make solving your problem harder. Getting  advice  from  a  lawyer  can  help. You can find a lawyer through:
                    <br>
                    <b>Lawyer Referral Service</b>
                    <br>
                    Visit <a href="www.accessprobono.ca/our-programs/lawyer-referral-service" target="_blank">www.accessprobono.ca/our-programs/lawyer-referral-service</a> or call at 604-687-3221 
                    <br>
                    <b>Legal Aid, Duty Counsel and Family Advice Lawyers</b>
                    <br>
                    Visit <a href="https://legalaid.bc.ca/" target="_blank">https://legalaid.bc.ca/</a> or call 1-866-577-2525
                    <br>
                    <b>Legal Services and Resources </b>
                    <br>
                    Visit the ClickLaw HelpMap at <a href="http://www.clicklaw.bc.ca/helpmap" target="_blank">http://www.clicklaw.bc.ca/helpmap</a> 

                    <br>

                    <span style="display: inline-block; background: #d6d6d6; padding: 8px; border-radius: 16px; margin-right: 4px; width: 32px; height: 32px; ">
                        <b-icon-pencil-fill />
                    </span>
                    <div style="display: inline; background-color: #333; color: #fff;">
                        <b>
                            Filling out the form and preparing to file it
                        </b>
                    </div>

                    <br>

                    Follow  the  instructions  in  the  form  and  include  all  the  information that is asked for.
                    <br>
                    <p>If you complete the form by hand, be sure it’s readable.</p>
                    <br>
                    <b>How do I prepare the form for filing? </b>
                    <ul>
                        <li>print or make copies of the completed form and determination: one set for you, one set for the court, and one set for each other party</li>
                    </ul>
                </div>
                <div style="width: 50%; padding: 8px;">
                    <span style="display: inline-block; background: #d6d6d6; padding: 8px; border-radius: 18px; margin-right: 4px; width: 36px; height: 36px; ">
                        <b-icon-download font-scale="1.5" /> 
                    </span>
                    <div style="display: inline; background-color: #333; color: #fff;">
                        <b>Filing the form at the registry</b>
                    </div>

                    <br>
                    <br>

                    After  you’ve  filled  out  the  form,  you  must  file  it at  the  <a href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96" target="_blank">Provincial Court Registry:</a>

                    <br>

                    <ul>
                        <li>where  the  existing  Provincial  Court  case  with  the same  parties  is  filed  (you  already  have  a  court  file number)</li>
                        <li>nearest to where the child lives most of the time, if the case involves a child-related issue, or</li>
                        <li>nearest to where you live if the case does not involve a child-related issue</li>
                    </ul>

                    File the form:

                    <br>

                    <ul>
                        <li>electronically using the <a href="https://justice.gov.bc.ca/apply-for-family-order/" target="_blank">FLA Online Forms Service</a></li>
                        <li>in person at the court registry</li>
                        <li>by mail</li>
                        <li>by  email, as referenced in Notice to the Profession and Public <a href="https://www.provincialcourt.bc.ca/downloads/Practice%20Directions/NP28.pdf" target="_blank">NP 28 Current Court Operations</a>, or</li>
                        <li>
                            by fax filing using the <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa734.pdf?forcedownload=true" target="_blank">Fax Filing Cover Page Form 52</a>
                        </li>
                    </ul>
                    <p>There are no fees for filing Provincial Court family documents.</p>

                    <b>Be sure to bring all copies of the documents to the registry if you are filing in person. </b>
                    <p>The registry clerk will review your form to make sure it’s complete before filing it. You’ll be given a copy for your records.</p>
                </div>
            </div>
        </div>

        <div class="new-page"></div>
<!-- <Page 3> -->
<!-- <HEADER> -->
        <FormHeader formName="Request to File an Agreement" formNumber="Form 26" formRuleNumber="Rule 132" :headerTableData="
            [{value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            null, 
            {value: ''}]"></FormHeader>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Request to File an Agreement provides information about a written agreement that a person is filing under the <i>Family Law Act</i> in the Provincial Court. A written agreement that is filed in Provincial Court under the <i>Family Law Act</i> is enforceable under the Act as if it were an order of the Provincial Court.
                </div>
            </div>
            <div style="width: 20%;">

            </div>        
        </div>
        
<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="About the parties"></FormPart>

                <div style="margin-bottom: 1rem;">
                    <b>1. </b> 
                    <grey-box-form 
                        style="text-indent:2px;display:inline;" 
                        textwidth="25.6rem" 
                        beforetext="<b>My full name</b> is: " 
                        hint="Full name of party"
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor" 
                        :italicHint="false" 
                        :text="yourInfo.name | getFullName"
                    />
                </div>

                <div>
                    <grey-box-form 
                        style="display:inline;text-indent:2px;" 
                        textwidth="25.6rem" 
                        beforetext="My <b>date of birth</b> is: " 
                        hint="(dd/mmm/yyyy)" 
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor" 
                        :italicHint="false" 
                        :text="yourInfo.dob | beautify-date-mid"
                    />
                </div>
    
                <div style="margin-bottom: 1rem;"></div>

                <div> 
                    <b>3. </b>
                    <div style="display:inline;">
                        <GreyBoxForm  style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="The full name of <b>other party to this agreement</b> is:" hint="" :italicHint="false" :text="otherPartyInfo[0].name | getFullName" />
                        <!-- <GreyBoxForm v-else style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>other party’s full name</b> is:" hint="full name of the other party" :italicHint="false" text="" /> -->
                        <br>
                        <br>
                        <GreyBoxForm style="display:inline;text-indent:2px;margin-left:45px;" textwidth="14.7rem" hintMargin="10px" hintindent="4rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="" :italicHint="false" :text="otherPartyInfo[0].dob | beautify-date-mid" />
                        <!-- <GreyBoxForm v-else style="display:inline;text-indent:2px;" textwidth="16rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" text=" " /> -->
                    </div>
                    <div style="padding: 20px">
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;" :check="otherPartyInfo.length > 1?'yes':''" text="There is an additional party."/>
                        <div>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].name" style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>additional party’s</b> full name is:" hint="full name of the other party" :italicHint="false" :text="otherPartyInfo[1].name | getFullName"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <span style="display: inline">The <b>additional party’s</b> full name is:</span>
                                <div style="background-color:#d6d6d6;height: 22px; width: 250px; margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                            <br/>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].dob" style="display:inline;text-indent:2px;" textwidth="6rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" :text="otherPartyInfo[1].dob | beautify-date-mid"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <p style="display: inline">Their <b>date of birth</b>(dd/mmm/yyyy) is:</p>
                                <div style="background-color:#d6d6d6; min-height: 22px; width: 250px;  margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%;"></div>        
        </div>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Request to file agreement"></FormPart>
   
                <div class="print-block" style="margin-top: 1rem;">
                    <div> 
                        <b>3. </b> <div style="margin:0rem 0 0 0.5rem; display:inline; font-size: 10">
                            <check-box 
                                boxMargin="0"
                                shiftmark="0"
                                inline="inline"
                                style="display:inline; margin:0 0.5rem 0 0;" 
                                :check="form26Info.filed?'yes':''" 
                                text="I <b>request to file a copy of the written agreement</b> dated,"/>               
                            <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(dd/mmm/yyyy)" :text="form26Info.agreementDate | beautify-date-mid"/>
                            <div style="text-indent:0px;display:inline;"> between the above parties, in the Provincial Court.</div>
                        </div>              
                    </div>
                </div> 

            <!-- <4> -->
                <div class="print-block">
                    <div>
                        <b>4. </b>
                        <div style="margin:0 0 0 0.25rem;display:inline;  ">I am filing the written agreement <b>under the following provision(s)</b> of the <i>Family Law Act</i>:</div>
        
                        <div style="margin:0.25rem 0 0 1rem; " >
                            <i style="color: #999;">Select all options that apply</i>                                   
                            <check-box                                                                                     boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section15')?'yes':''" 
                                text="section 15 <i>[when parenting coordinators may assist]</i>"/>               
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section44')?'yes':''" 
                                text="section 44 (3) <i>[agreements respecting parenting arrangements]</i>"/>   
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section58')?'yes':''" 
                                text="section 58 (3) <i>[agreements respecting contact]</i>"/>   
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section92')?'yes':''" 
                                text="section 92(e), (f) and (g) <i>[agreements respecting property division]</i>"/>
                            <check-box 
                                boxMargin="0"
                                shiftmark="0"                           
                                :check="form26Info.agreementList.includes('section148')?'yes':''" 
                                text="section 148 (2) <i>[agreements respecting child support]</i>"/>   
                            <check-box    
                                boxMargin="0"
                                shiftmark="0"                        
                                :check="form26Info.agreementList.includes('section163')?'yes':''" 
                                text="section 163 (3) <i>[agreements respecting spousal support]</i>"/>
                        </div>                        
                    </div>
                </div>

            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-file-earmark-text />
                    <p>
                        You must file a copy of the written agreement along with this form.
                    </p>
                </NoteBox>

                <div style="margin-bottom: 1rem;"></div>
                
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>                
                        To determine what section applies, look at the terms in written agreement to see what the agreement is about. It may be filed under more than one section of the <i>Family Law Act</i> if your agreement is about different issues.
                        <br>
                        Section 92 applies to agreements respecting companion animals
                    </p>
                </NoteBox>
            </div>        
        </div>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Address for service"></FormPart>

                <div>
                    <b>5. </b>
                    <div style="display: inline; margin:0.25rem 0; text-indent:0px;">
                        My <b>address for service</b> of court documents and contact information is:
                        <br>
                        <i style="color: #999;">You must provide an address for service and contact number, but it does not have to be your own if you don’t want to:</i>
                    </div>

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
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

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable): </td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>                
                        This information will be available to the other party and the court.
                    </p>
                </NoteBox>
            </div>        
        </div>

        <div class="print-block mt-5"></div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { enfrcOtherPartyDataInfoType, form26InformationDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { enforceAgreementOrOrderSurveyDataInfoType } from '@/types/Application/AgreementEnforcement';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox,
        FormHeader,
        FormPart,
        NoteBox,
        GreyBoxForm     
    }
})

export default class Form26Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form26Info = {} as form26InformationDataInfoType;
    
    existingFileNumber = ''   
    
    hintFontSize = '8pt';
    hintTextColor = '#333';

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
        this.form26Info = this.getForm26Info();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);        
    } 
    

    
    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: enfrcOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as enfrcOtherPartyDataInfoType;               

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
    
    public getForm26Info() {        

        const form26Information = {} as form26InformationDataInfoType;
        form26Information.agreementList = [];
        form26Information.agreementDate = '';        
        
        if (this.result?.enfrcQuestionnaireSurvey?.includes('writtenAgreementOrder') && this.result?.enforceAgreementOrOrderSurvey) { 

            const enfrcAgrmntOrdr: enforceAgreementOrOrderSurveyDataInfoType = JSON.parse(JSON.stringify(this.result.enforceAgreementOrOrderSurvey));

            const form26Conditions = (enfrcAgrmntOrdr.enforceOrder == "n") && (enfrcAgrmntOrdr.filedOrder == 'n') && (enfrcAgrmntOrdr.existingType == "writtenAgreement")

            form26Information.agreementDate = (form26Conditions)?Vue.filter('beautify-date')(enfrcAgrmntOrdr.existingDate):'';
            form26Information.agreementList = (form26Conditions)?enfrcAgrmntOrdr.agreementType:[];
            form26Information.filed = form26Conditions;
        }
        //console.log(form26Information)
        if(this.result?.enfrcQuestionnaireSurvey?.includes('parentingCoordinatorDetermination')){
            const detData  = this.result?.enforceChangeSetAsideDeterminationSurvey
            if(detData?.filedOrder == "n" && detData?.appointedDetermination?.selected == "writtenAgreement" && detData?.filedAgreement == "n"){
                form26Information.agreementList.push("section15");
                if(form26Information.agreementDate == ''){
                    form26Information.filed = true;
                    form26Information.agreementDate = Vue.filter('beautify-date-blank')(detData?.appointedDetermination?.writtenAgreementDate);
                }            
            }
       
        }

        return form26Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>