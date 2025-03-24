<template>
    <div v-if="dataReady">
<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :headerTableData="headerTableData" formName="Application About a Protection Order" formNumber="FORM 12" formRuleNumber="Rules 67, 68 and 172"></FormHeader>

<!-- <NOTICE SECTION> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Application About a Protection Order sets out the details of an order about a protection
                    order that a person is applying for.<br/>
                    A protection order made under the <i>Family Law Act</i> is a court order to protect a family
                    member from another family member if there is a risk of family violence.
                </div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <b>Please read before completing this form:</b>
                    <ul>
                        <li>You must complete the main application and any applicable schedule for your
                            application identified in Part 2 of the main application.</li>
                        <li>For guidance filling in this form, please read the guidebook. The guide is available
                            online at <a href="https://www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.</li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about what family violence includes or who is a family member, see the guidebook. 
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="About the parties"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <1> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">1.</b>
                    <div style="text-indent: 2px; display:inline-block;"><b>My full name</b> is (full name of party):</div>
                    <grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="" :italicHint="false" :text="yourInfo.name | getFullName"/>
                    <div style="margin-top: 0.3rem;"></div>
                    <div style="text-indent: 17px; display:inline-block;">My <b>date of birth</b> is (dd/mmm/yyyy):</div>
                    <grey-box-form marginTop="-22px" style="display:inline; text-indent:18px; padding-left: 3px;" textwidth="256px" beforetext="" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
                </div>
                <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    <b style="padding-right:3px">2.</b>
                    The person <b>I want protection from</b>, or <b>who made an application for protection</b><br> 
                    <div style="text-indent:18px;"><b>from me</b>, is the other party.</div>
                    <div style="margin-top: 0.3rem;"></div>
                    <div style="text-indent: 17px; display:inline-block;">The <b>other party's full name</b> is:</div>
                    <grey-box-form marginTop="-22px" style="text-indent:20px;display:inline-block; padding-left:13px;" textwidth="16rem" beforetext="" :italicHint="false" :text="otherParty.name | getFullName"/>
                    <div style="margin-top: 0.3rem;"></div>
                    <div style="text-indent: 17px; display:inline-block;">Their <b>date of birth</b> is:</div>
                    <grey-box-form marginTop="-22px" style="display:inline; text-indent:18px; padding-left:94px;" textwidth="256px" beforetext="" hintindent="65px" hint="(dd/mmm/yyyy) or (unknown)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                </div>
            </div>
            <div style="width: 20%;margin-top: -10px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        A protection order may be made on application by a family member claiming to be an at-risk family member or by
                        a person on behalf of an atrisk family member [s. 183 <i>Family Law Act</i>].
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 1rem;"></div>

<!-- <2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="What are you asking for in this application"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">3.</b>
                    I am <b>applying for the following order</b>:<br/>
                    <div style="padding-left:18px;"><i>Select only one of the options below and complete the required schedule</i></div>
                    <check-box style="padding-left: 10px;" shift="25" shiftmark="0" :check="orderType == 'needPO'?'yes':''" text="<b>Protection order</b> ➜ <i>Complete <b>Schedule 1</b></i>"/>
                    <check-box style="padding-left: 10px;" shift="25" shiftmark="0" :check="orderType == 'changePO'?'yes':''" text="<b>Order to change an existing protection order</b> ➜ <i>Complete <b>Schedule 2</b></i>"/>
                    <check-box style="padding-left: 10px;" shift="25" shiftmark="0" :check="orderType == 'terminatePO'?'yes':''" text="<b>Order to terminate an existing protection order</b> ➜ <i>Complete <b>Schedule 3</b></i>"/>
                </div>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <PART 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Notice of the application"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 99%; background-color: #dedede;">
                        An application is usually made with notice to the other party. To give notice, the other party must
                        be served with the application and supporting documents at least 7 days before the date set for
                        the court appearance.<br/>
                        An application about a protection order can also be made without notice to the other party [s. 186
                        <i>Family Law Act</i>].
                    </div>
                    <b style="padding-right:3px">4.</b>
                    <i>Select only one of the options below</i><br/>
                    <check-box style="padding-left: 10px;" shift="25" shiftmark="0" :check="urgency.PORNoNotice == 'n'?'yes':''" text="I am applying <b>with notice</b> to the other party"/>
                    <check-box style="padding-left: 10px;" shift="25" shiftmark="0" :check="urgency.PORNoNotice == 'y'?'yes':''" text="I want to apply <b>without notice</b> to the other party because:"/>
                    <i style="font-size:11.5px;" > Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i>
                    <div class="answerbox" style="background: #C0C0C0;">{{ urgency.PORWhyNoNotice ? urgency.PORWhyNoNotice : '&nbsp;' }}</div>

                    <div class="fla-col-left-80 fla-light-grey" style="border: 1px dashed black; width: 98%; background-color: #dedede">
                        <b>NOTE TO PARTY:</b><br/>
                        You may make your application without notice to the other party, but the judge will decide if it
                        will be heard without notice, if notice must be given, or if the notice period should be shortened.
                    </div>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about serving court documents, see the guidebook.
                    </p>
                </NoteBox>
                <div style="margin-top: 0.2rem;"></div>
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        To apply without notice, you must satisfy the court that there is a real risk of danger or serious consequence if
                        notice were required.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

    <!-- <PART 4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="About your court appearance"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <i>For registry or judicial case manager use only</i>
                <div style="border:1px solid black; padding: 5px;">
                    <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><b>The application, which requires
                        a court appearance, will be heard by the court</b></div>
                    <underline-form 
                        style="text-indent:2px;display:inline-block; line-height: 30px;" 
                        textwidth="110px" 
                        beforetext="<b>on</b>" 
                        hint="date"
                        hintindent="45px"
                        :italicHint="false" text=""/>
                    <underline-form 
                        style="text-indent:2px;display:inline-block; line-height: 30px;" 
                        textwidth="110px" 
                        beforetext="<b>at</b>" 
                        hint="time"
                        hintindent="45px"
                        :italicHint="false" text=""/>
                    <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><b>a.m./p.m.</b></div>
                    <div style="margin-top: 0.8rem;"></div>
                    <check-box 
                        inline="inline" 
                        boxMargin="0" 
                        style="margin:0 0 0 0.5rem; display:inline;" 
                        :check="''" 
                        shift="5"
                        shiftmark="0"
                        text="in person at"/>                
                    <underline-form 
                        style="text-indent:2px;display:inline-block; line-height: 30px;" 
                        textwidth="310px" 
                        beforetext="" 
                        hint="court location"
                        hintMargin="125px"
                        :italicHint="false" text=""/>
                    <div style="display: flex; flex-direction: row;">
                        <div style="width: 25%; margin-top: 30px;">
                            <check-box 
                                inline="inline" 
                                boxMargin="0" 
                                style="margin:0 0 0 0.5rem; display:inline;" 
                                :check="''" 
                                shift="5"
                                shiftmark="0"
                                text="by another"/>                
                            <div style="margin-left: 35px;">method of attendance, as specified</div>
                        </div>
                        <div style="width: 74%; margin-top: 30px; border:1px solid black; padding: 5px; font-size: 11px;">
                            <b>Do not attend the courthouse in person</b>. The registry will send within 24 hours before 
                            the hearing date noted above the link to connect by MS Teams, including a dial-in conferencing 
                            number to be used by any party that is unable to use MS Teams or has problems with their video 
                            connection. If you have not provided your email address or telephone number to the registry on 
                            your Notice of Address Change (<a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true">Form 46</a>), you must contact the registry to obtain the MS Teams 
                            conference information.
                        </div>
                    </div>
                </div>
                <div style="margin-top: 0.3rem;"></div>
                <div class="fla-col-left-80 fla-light-grey" style="border: 1px dashed black; width: 99%; background-color: #dedede;">
                    <b>NOTE TO THE OTHER PARTY:</b><br/>
                    <b>If you do not attend</b> court on the date and time scheduled for the court appearance, the court
                    may make an order in your absence.<br/>
                    You may also choose to <b>file a written response</b> in reply to the application in Form 19 Written
                    Response to Application.
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        The registry or judicial case manager will work with you to schedule a date for the court
                        appearance and will fill in the actual date and method of attendance on the form. Be prepared to talk about your
                        availability if there are options for dates.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

   <!-- <5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="5" title="Address for service"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">5.</b>
                    My <b>address for service</b> of court documents and contact information is:<br/>
                    <i>You must provide an address for service and contact number, but it does not have to be<br/>
                    your own if you don’t want</i>
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 42px; width:90%; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ serviceAddress.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ serviceAddress.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ serviceAddress.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ serviceAddress.postcode }}</div>
                            </td>
                        </tr>
                    </table>    
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 42px; width:90%; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ serviceContact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ serviceContact.phone }}</div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td v-if="yourInfo.lawyer" colspan="2" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName }} 
                                </div>
                            </td>
                            <td v-else colspan="2" style="border: 2px solid #fff; padding: 4px;">Lawyer (if applicable): </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        For more information about how this information will be used and who will have
                        access to it, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

    <!--Appearance Notice: Begin -->
<div style="page-break-after:always;">&nbsp;</div> 
<div >
    <div style="width: 100%; ">                    
        <div style="width: 100%;float: left; margin-top: 0px;padding:0.5rem;font-size:12pt;">
            <div style="text-align: center;font-size:13pt;">
            <div style="margin-top: 1rem;"></div>
            <b>IMPORTANT INFORMATION ABOUT YOUR APPEARANCE</b>
            <div style="margin-top: 1rem;"></div>
        </div> 
        <b>What do parties need to know about attending by another method other than in person?</b>
        <div style="margin-top:5px;font-size:11pt;">
            If your notice indicates that you are to attend by another method of attendance, parties, including the judge, will attend 
            using the Microsoft Teams audio- and video-conferencing (video) platform. Do not attend the courthouse in person. 
            Parties will receive remote MS Teams appearance details within 24 hours prior to the appearance, this notification is
            sent to you by email.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            Microsoft Teams allows participants to join the conference using video or audio from a desktop, laptop, tablet, or
            smartphone, or to dial-in to a proceeding from a telephone. If you are appearing by video, please ensure that you 
            have downloaded Microsoft Teams or have the latest version of Google Chrome or Microsoft Edge.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            <b>If you received this Notice by mail</b> and intend to appear using video or audio from a desktop, laptop, tablet, or
            smartphone, and you did not provide an email address for service, please file an Notice of Address Change (PCFR
            Form 46), with the court registry that includes your email address and the court registry will send you the MS Teams
            meeting invite within 24 hours prior to your appearance.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            The link and dial up information may be shared with your lawyer if you have retained counsel; and with your client if
            you are counsel.
        </div>
        <div style="margin-top:15px;font-size:11pt;">
            <b>Please do not forward or share</b> the MS Teams link or dial up information to any unauthorized parties.
        </div>
        <div style="justify-content: left;font-size:12pt;margin-top:10px;">
            <b>Preparing for your Family Court Appearance</b>
        </div>
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Legal Aid BC - Family Law Legal Advice</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            If you do not have a lawyer for your family law matter, visit <a href="https://www.familylawinbc.ca/court-notices">https://www.familylawinbc.ca/court-notices</a> to find out about 
            <b>free in person and remote legal advice services</b> that you may be eligible for that can help you prepare for your court date.
            Contact the advice services at least three weeks before your court date or as soon as you receive this notice.
            If you are unable to access the internet, contact the Family LawLINE at 604-408-2172 in Greater Vancouver or
            1-866-577-2525 elsewhere in BC.
        </div>  
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Family Justice Services</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            Family justice counsellors provide services to British Columbians going through separation and divorce and are 
            specially trained to help families resolve their issues about guardianship, parenting arrangements, contact and 
            support. There is no charge for their services.
        </div> 
        <div style="margin-top:5px;font-size:11pt;">
            At this time all services are available in-person as well as virtually (through telephone and videoconference) across 
            the province. For more information, parties can call [1-844-747-3963] or contact their closest <a href="https://www.clicklaw.bc.ca/helpmap/service/1019">Family Justice Centre</a>.
        </div>  
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Society for Children and Youth of BC Child and Youth Legal Centre</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            Free legal assistance directly for children and youth. Services may include legal advice and information, referral, or 
            full representation, depending on circumstances. Availability and wait times may vary. Services are for children and 
            youth who want legal assistance, are able to express their views and preferences, and who can instruct a lawyer.
        </div>   
        <div style="margin-top:5px;font-size:11pt;">
            For more information: <a href="https://scyofbc.org/child-youth-legal-centre/">https://scyofbc.org/child-youth-legal-centre/</a>
            Contact the Child and Youth Legal Centre <a href="cylc@scyofbc.org">cylc@scyofbc.org</a> - (778)-657-5544.
        </div>   
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Interpreter</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            The court provides interpreters for family proceedings in provincial court. If you require an interpreter, please advise 
            the registry as soon as possible. This link includes all court locations (address and phone numbers): <a href="www.gov.bc.ca/
            courthouselocations">www.gov.bc.ca/courthouselocations</a>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            <b>Before the scheduled hearing date</b>, please visit the Provincial Court website at <a href="https://www.provincialcourt.bc.ca">https://www.provincialcourt.bc.ca</a>
            and review:
            <ul>
            <li><i>Policy on Use of Electronic Devices in Courtrooms and Access to Court Proceedings Policy</i> (there is a general
                prohibition on the recording or broadcasting of court proceedings unless authorized by the Court and there are
                penalties for breach)
            </li>
            <li><i>NP 21 Remote Attendance in the Provincial Court</i> (for etiquette and directions on connecting by another method
                of attendance) (counsel attendance requirements when attending Family matters remotely)
            </li>
            <li><i>NP 24 Form of Address for Parties and Lawyers</i> (provide the judge or justice with each person’s name, title (e.g.
                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
            </li>
            <li><i>NP 24 Form of Address for Parties and Lawyers</i> (provide the judge or justice with each person’s name, title (e.g.
                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
            </li>
            <li><i>Guide for Appearing in the Provincial Court using MS Teams</i>
            </li>
            <li><i>eNews</i> - What to expect at a family management conference?
            </li>
            </ul>
        </div>   
        <div style="justify-content: left;font-size:11pt;margin-top:25px;">
            <b>If you are unable to dial-in or are dropped from the appearance</b> immediately call the court registry.
        </div>  
    </div>
    </div>
</div>
    <!--Appearance Notice: End -->
    <div style="page-break-after:always;">&nbsp;</div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm  from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import {getYourInformationResults} from "@/components/utils/PopulateForms/PopulateCommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { addressInfoType, contactInfoType } from '@/types/Application/CommonInformation';
import { urgencyInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components:{
       UnderlineForm,
       GreyBoxForm,
       CheckBox,
       FormHeader,
       FormPart,
       NoteBox
    }
})
export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;    

    otherPartyInfo=[]; 
    yourInfo = {} as yourInformationInfoDataInfoType;
    urgency = {} as urgencyInfoType;

    serviceAddress = {} as addressInfoType;
    serviceContact = {} as contactInfoType;

    existingFileNumber = '';
    orderType = '';   
    dataReady = false; 

    headerTableData = [];

    mounted(){
        this.dataReady = false;
        this.getServiceInfo();
        this.getOtherPartyInfo();
        this.getExistingFileNumber(this.result);
        this.yourInfo = this.getYourInfo() 
        this.orderType = this.getOrderType(); 
        this.urgency = this.getUrgencyInfo();
        this.dataReady = true;

        this.headerTableData = [
            {
                name:'REGISTRY LOCATION:', 
                value: this.result.applicationLocation
            },
            {
                name:'COURT FILE NUMBER:', 
                value: this.existingFileNumber
            },
            null,
            {
                name: 'Document number',
                value: ''
            }
        ];
    }

    public getOrderType(){
        let orderType = ''
        if(this.result?.poQuestionnaireSurvey?.orderType) 
            orderType =this.result?.poQuestionnaireSurvey?.orderType
        
        return orderType
    }
    
    public getUrgencyInfo(){
        
        let urgencyInfo = {PORNoNotice:'', PORWhyNoNotice:''}
        
        if(this.result?.urgencySurvey){
            urgencyInfo.PORNoNotice = this.result.urgencySurvey.PORNoNotice
            urgencyInfo.PORWhyNoNotice = this.result.urgencySurvey.PORWhyNoNotice
        }
           
        return urgencyInfo;
    }

    public getServiceInfo(){
        if(this.result?.yourinformationPOSurvey?.Lawyer == 'y'){
            this.serviceAddress = this.result.yourinformationPOSurvey.LawyerAddress
            this.serviceContact = this.result.yourinformationPOSurvey.LawyerContact
        }else if(this.result?.yourinformationPOSurvey){
            this.serviceAddress = this.result.yourinformationPOSurvey.ApplicantAddress
            this.serviceContact = this.result.yourinformationPOSurvey.ApplicantContact
        }
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = ''
        let name = ''
        let address = ''
        let contactInfo = ''
        let lawyer = ''

        if(this.result?.poQuestionnaireSurvey?.orderType == 'needPO'){            

            if(this.result.protectionFromWhomSurvey?.RespondentDOBExact == 'y' &&   this.result.protectionFromWhomSurvey?.RespondentDOB)
                dob = this.result.protectionFromWhomSurvey.RespondentDOB
            
            if(this.result.protectionFromWhomSurvey?.RespondentName)
                name = this.result.protectionFromWhomSurvey.RespondentName
            
            if(this.result.protectionFromWhomSurvey?.RespondentAddress)
                address = this.result.protectionFromWhomSurvey.RespondentAddress
            
            if(this.result.protectionFromWhomSurvey?.RespondentContact)
                contactInfo = this.result.protectionFromWhomSurvey.RespondentContact
                
            info = [{'name':name, 'dob': dob , 'address': address ,'contact': contactInfo, 'lawyer':''}]
        }
        else if(this.result.poQuestionnaireSurvey?.orderType == 'changePO' || this.result.poQuestionnaireSurvey?.orderType == 'terminatePO'){    
            for(const party of this.result.otherPartySurvey){
                dob = ''
                name = ''
                address = ''
                contactInfo = ''
                lawyer = ''

                if (party['knowDob'] == 'y' &&  party['dob'])
                    dob = party['dob']

                if (party['name'])
                    name = party['name']
                
                if (party['address'])
                    address = party['address']
                
                if (party['contactInfo'])
                    contactInfo = party['contactInfo']

                if (party['lawyer'])
                    lawyer = party['lawyer']
                
                info.push({'name':name, 'dob': dob , 'address': address ,'contact': contactInfo, 'lawyer':lawyer})
            }
        }
        else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': '', 'lawyer':''}]

        this.otherPartyInfo = info
    }

    public getExistingFileNumber(result){
        if (result.poQuestionnaireSurvey?.orderType){
            const orderType = result.poQuestionnaireSurvey.orderType;
            if (orderType == 'needPO'){
                if(result.poFilingLocationSurvey?.ExistingFamilyCase == 'y' && result.poFilingLocationSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.poFilingLocationSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            } else if (orderType == 'changePO' || orderType == 'terminatePO'){
                if(result.aboutSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.aboutSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            }
        }      
    }
    
    public getYourInfo(){

        if(this.result?.yourinformationPOSurvey){
            return getYourInformationResults(this.result.yourinformationPOSurvey);
        }
        else
            return {} as yourInformationInfoDataInfoType;
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 