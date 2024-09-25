<template>
    <div v-if="dataReady">

<!-- <HEADER> -->
        <FormHeader :headerTableData="headerTableData" formName="Request for Scheduling" formNumber="FORM 39" formRuleNumber="Rule 156"></FormHeader>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Request for Scheduling provides notice of a court appearance that has been scheduled for 
                    an application previously before the court and where any of the circumstances set out in Rule 
                    156 apply.
                </div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <p><b>Please read before completing the form:</b></p>
                    <ul>
                        <li>This form is only to be used to proceed with an application that has previously beenscheduled for a court appearance.</li>
                        <li>For guidance filling in this form, please read the guidebook. The guide is availableonline at <a 
                            href="http://www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.</li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%; margin-top: 64px;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about scheduling a court appearance if no appearance has ever been 
                        scheduled, see the guidebook. 
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

        <div style="margin-top: 0.1rem;"></div>

<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">1.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><b>My full name </b>is</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="55%" 
                    beforetext="" 
                    hint="Full name of party"
                    hintindent="23%"
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">2.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">The <b>other party's full name</b> is</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="42.8%" 
                    beforetext="" 
                    hint="Full name of party/parties" 
                    hintindent="15%"
                    :italicHint="false" :text="otherParties"/>
            </div>
            <div style="width: 20%;margin-top:-42px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        Copy the party information from a filed document in your case. It should match. 
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

<!-- <Part 2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Request for scheduling and notice"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="margin-top: 0.1rem;"></div>

<!-- <3/4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">3.</b>
                <grey-box-form 
                    style="text-indent:4px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="I request that the application filed on (date)" 
                    :italicHint="false" :text="filedDate | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> 
                    , document number
                <div style="margin-top: 0.2rem;"></div>
                <grey-box-form 
                    style="text-indent:12px;display:inline-block; margin-left: 10px;" 
                    textwidth="6rem" 
                    beforetext="" 
                    :italicHint="false" :text="documentNumber"/>
                <div style="text-indent:5px;display:inline;"> 
                    , <b>be scheduled for a court appearance</b>. The court appearance is
                </div>
                <div style="text-indent:5px;display:inline; margin-left: 22px;"> 
                    being requested for the reason set out in Part 4.
                </div>
            </div>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">4.</b>
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0 0 0.5rem; display:inline;" 
                    :check="acknowledgeService?'yes':''" 
                    shift="5"
                    shiftmark="0"
                    text="I understand I must give notice of this request for scheduling to each "/>                
                    <div style="text-indent:30px;">
                        other party. To give notice, they must be served with the document at least 7 </div>
                    <div style="text-indent:30px;">days before the date set for the court appearance.</div>
            </div>
            <div style="width: 20%;margin-top:11px;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about how to give notice to the other party, see the guidebook. 
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

<!-- <Part 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="About your court appearance"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <About> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <i>For registry or judicial case manager use only</i>
                <div style="border:1px solid black; padding: 5px;">
                    <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><b>The application, which requires
                        a court appearance, will be heard by the court at a</b></div>
                    <underline-form 
                        style="text-indent:2px;display:inline-block; line-height: 30px;" 
                        textwidth="110px" 
                        beforetext="" 
                        hint="appearance type"
                        hintindent="45px"
                        :italicHint="false" text=""/>
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
                        <div style="width: 74%; margin-top: 30px; border:1px solid black; padding: 5px;">
                            <b>Do not attend the courthouse in person</b>. The registry will send within 24 hours before 
                            the hearing date noted above the link to connect by MS Teams, including a dial-in conferencing 
                            number to be used by any party that is unable to use MS Teams or has problems with their video 
                            connection. If you have not provided your email address or telephone number to the registry on 
                            your Notice of Address Change (<a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true">Form 46</a>), you must contact the registry to obtain the MS Teams 
                            conference information.
                        </div>
                    </div>
                </div>
                <div style="margin-top: 0.8rem;"></div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <p><b>NOTE TO THE OTHER PARTY:</b></p>
                    <p><b>If you do not attend</b> court on the date and time scheduled for the court appearance, the court 
                        may make an order in your absence.</p>
                </div>
            </div>
            <div style="width: 20%;margin-top:22px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        The registry or judicial case manager will work with you to schedule a date for the court 
                        appearance and will fill in the actual date and method of attendance on the form. Be prepared 
                        to talk about your availability if there are options for dates.
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

        <div class="new-page"></div>
<!--Appearance Notice: Begin -->
        <div class="print-block" style="width: 100%;float: left;text-align: justify;text-justify: inter-word;">
        
        <div style="width: 100%;float: left;text-align: justify;text-justify: inter-word; ">   
            <div style="text-align:center;font-size:13pt;">
                <div style="margin-top: 1rem;"></div>
                <b>IMPORTANT INFORMATION ABOUT YOUR APPEARANCE</b>
            </div>       
            <div style="width: 100%;float: left; margin-top: 0px;padding:0.5rem;font-size:12pt;">
            <b>What do parties need to know about attending by another method other than in person?</b>
            <div style="margin-top:5px;font-size:11pt;">
                If your notice indicates that you are to attend by another method of attendance, parties, including the judge, will attend 
                using the Microsoft Teams audio- and video-conferencing (video) platform. <b>Do not attend the courthouse in person</b>. 
                Parties will receive remote MS Teams appearance details within 24 hours prior to the appearance, this notification is
                sent to you by email.
            </div>
            <div style="margin-top:5px;font-size:11pt;">
                Microsoft Teams allows participants to join the conference using video or audio from a desktop, laptop, tablet, or
                smartphone, or to dial-in to a proceeding from a telephone. <b>If you are appearing by video</b>, please ensure that you 
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
                <b>Preparing for your Family Management Conference</b>
            </div>
            <div style="justify-content: left;font-size:11pt;margin-top:10px;">
                <b>Legal Aid BC - Family Law Legal Advice</b>
            </div>    
            <div style="margin-top:10px;font-size:11pt;">
                If you do not have a lawyer for your family law matter, visit <a href="https://family.legalaid.bc.ca/court-notices">legalaid.bc.ca/family-court-notices</a> to find out about 
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
                For more information: <a href="https://www.scyofbc.org/child-youth-legal-centre/">https://www.scyofbc.org/child-youth-legal-centre/</a>
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
            <div style="margin-top: 5rem;"></div>
            <div style="justify-content: left;font-size:11pt;margin-top:25px;">
                <b>If you are unable to dial-in or are dropped from the appearance</b> immediately call the court registry.
            </div>  

        </div>
        </div>
        </div>
    <!--Appearance Notice: End -->
    <div class="new-page"></div>
    <div class="new-page"></div>

    &nbsp;
<!-- <Part 4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="Reason for requesting a court appearance"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">5.</b>
                <grey-box-form 
                    style="text-indent:4px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="<b>On</b> (<i>date of court appearance or consent adjournment</i>)" 
                    hint="(dd/mmm/yyyy)"
                    hintindent="1rem"
                    :italicHint="false" :text="lastAppearanceDate | beautify-date"/>
                <div style="display:inline-block;">:</div>
                <div style="margin-top: 0.8rem;"></div>
                <check-box 
                    inline="inline" 
                    :boxMargin="0"
                    style="display:inline;"
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('adjourned')?'yes':''" 
                    text="This matter was <b>adjourned by the court</b> without setting a new date (adjourned generally)"/>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    style="display:inline;"
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('struck')?'yes':''" 
                    text="This matter was <b>struck off the court list</b> by the court without setting a new date"/>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    style="display:inline" 
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('party')?'yes':''" 
                    text="An order or direction was made by the court referring or <b>requiring the party/parties to attend, participate or complete</b> a
                    requirement before returning to court"/>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0"
                    style="display:inline;" 
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('deficiency')?'yes':''" 
                    text="An order or direction was made by the court <b>requiring that a deficiency under these rules be addressed</b> by a party before
                    returning to court"/>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0"                    
                    style="display:inline;" 
                    shift="5"
                    shiftmark="0"
                    :check="reviewOrderMade?'yes':''" 
                    text="An order was made by the court providing for <b>the review of the order</b>"/>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    style="display:inline;" 
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('orderChanged')?'yes':''" 
                    text="An <b>interim order on a family law matter was made</b> by the court and I am <b>applying for the interim order to be changed, suspended or cancelled</b>
                    under section 216(3) of the <i>Family Law Act</i> because:"/>
                <div style="margin-left: 28px;"><i>Please describe why the interim order can’t remain in place until a final decision can be made</i></div>
                <div style="margin-left: 28px;background-color: #dedede;" class="answerbox">{{reasonForChange ? reasonForChange : '&nbsp;'}}</div>
                <div style="margin-left: 28px;">I would like the interim order about a family law matter <b>changed, suspended or cancelled as follows</b>:</div>
                <div style="margin-left: 28px;"><i>Please describe the order you want the court to make instead of the current interim order</i></div>
                <div style="margin-left: 28px;background-color: #dedede;" class="answerbox">{{descriptionOnChange ? descriptionOnChange : '&nbsp;'}}</div>
                <hr>
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    style="display:inline;" 
                    shift="5"
                    shiftmark="0"
                    :check="reasons.includes('family')?'yes':''" 
                    text="I <b>attended a family management conference</b> regarding this family law matter. I am <b>applying for an interim order</b> under section 216 or 217 of the <i>Family Law Act</i> for the following family law matter order(s) applied for in my application, reply or counter application:"/>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Parenting arrangements including parental responsibilities and parenting time')?'yes':''" 
                        text="Parenting arrangements, including parental responsibilities and parenting time"/>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Child support')?'yes':''" 
                        text="Child support"/>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Contact with a child')?'yes':''" 
                        text="Contact with a child"/>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Guardianship of a child')?'yes':''" 
                        text="Guardianship of a child"/>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Spousal support')?'yes':''" 
                        text="Spousal support"/>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        inline="inline" 
                        :boxMargin="0" 
                        style="display:inline;" 
                        shift="5"
                        shiftmark="0"
                        :check="flmTypes.includes('Property division in respect of a companion animal')?'yes':''" 
                        text="Property division in respect of a companion animal"/>
                </div>
                <hr style="margin-top: 5px; margin-bottom: 5px;">
            </div>
            <div style="width: 20%;margin-top:450px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        If you are applying for an interim order, select the family law matter(s) you need an interim 
                        order for. The Application for a Family Law Matter, Reply to an Application About a Family Law 
                        Matter, and/or Counter Application must already include the details of the final order you are 
                        asking for an interim order about.
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
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { interimOrderSurveyDataInfoType, nextAppearanceSurveyDataInfoType, partyInformationRQSSurveyDataInfoType, requestForSchedulingDataInfoType } from '@/types/Application/RequestScheduling';
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        CourtStamp,
        FormHeader,
        FormPart,
        NoteBox,
        GreyBoxForm
    }
})

export default class Form39Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  

    existingFileNumber = '';
   
    yourInfo = {} as yourInformationInfoDataInfoType;  
    otherParties = ''; 
    acknowledgeService = false;

    filedDate = '';
    documentNumber = '';
    lastAppearanceDate = '';
    reviewOrderMade = false;

    reasons = [];
    flmTypes = [];
    descriptionOnChange = '';
    reasonForChange = '';

    appearanceType = '';
    otherAppearanceDesc = '';
   
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
            },
            null,
            {
                name:'Document number:',
                value: ''
            }
        ];

    }
   
    public extractInfo(){ 
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);       
        this.getRequestSchedulingInfo();    
        this.getReasonForSchedulingInfo(); 
        this.getNextAppearanceInfo(); 
        this.getPartyInfo();        
    } 

    public getRequestSchedulingInfo(){      
        
        this.filedDate = '';
        this.documentNumber = '';
        this.lastAppearanceDate = '';
        this.reviewOrderMade = false;

        if(this.result?.requestForSchedulingSurvey){

            let requestForScheduling = {} as requestForSchedulingDataInfoType;

            requestForScheduling = this.result.requestForSchedulingSurvey;

            if (requestForScheduling.Unresolved == 'n' && requestForScheduling.ReviewOrdered == 'y'){
                this.reviewOrderMade = true;
            }

            this.filedDate = requestForScheduling.FiledDate?requestForScheduling.FiledDate:'';
            this.documentNumber = requestForScheduling.DocumentNumber?requestForScheduling.DocumentNumber:'';
            this.lastAppearanceDate = requestForScheduling.LastAppearanceDate?requestForScheduling.LastAppearanceDate:'';           
        }             
    }

    public getPartyInfo(){  
        
        this.yourInfo = {} as yourInformationInfoDataInfoType;
        this.otherParties = '';

        if(this.result?.partyInformationRQSSurvey){

            let partyInfo = {} as partyInformationRQSSurveyDataInfoType;

            partyInfo = this.result.partyInformationRQSSurvey;
            this.yourInfo = getYourInformationResults(partyInfo);

            const otherPartiesList = [];
            for (const otherParty of partyInfo.otherPartyInfoRqs){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ');   
            
            this.acknowledgeService = this.result.otherPartyRQSConfirmationSurvey?.confirmation == 'Confirmed';
        
        }
    
    }

    public getNextAppearanceInfo(){

        this.appearanceType = '';
        this.otherAppearanceDesc = '';

        if(this.result?.nextAppearanceSurvey){

            let appearanceInfo = {} as nextAppearanceSurveyDataInfoType;
            appearanceInfo = this.result.nextAppearanceSurvey;
            this.appearanceType = appearanceInfo.AppearanceType?appearanceInfo.AppearanceType:'';

            if (this.appearanceType == 'other'){
                this.otherAppearanceDesc = appearanceInfo.AppearanceTypeComment?appearanceInfo.AppearanceTypeComment:'';
            }
        }
    }    

    public getReasonForSchedulingInfo(){       

        this.reasons = [];
        this.flmTypes = [];
        this.descriptionOnChange = '';
        this.reasonForChange = '';        
        
        if(this.result?.reasonForSchedulingSurvey){

            this.reasons = this.result.reasonForSchedulingSurvey;  

            if (this.reasons.includes('family') || this.reasons.includes('orderChanged')){

                if(this.result?.interimOrderSurvey){

                    let interimInfo = {} as interimOrderSurveyDataInfoType;
                    interimInfo = this.result.interimOrderSurvey;

                    if (interimInfo.family){
                        this.flmTypes = interimInfo.FlmType?interimInfo.FlmType:[];
                    }

                    if (interimInfo.orderChanged){
                        this.descriptionOnChange = interimInfo.DescriptionOnChange?interimInfo.DescriptionOnChange:'';
                        this.reasonForChange = interimInfo.ReasonForChange?interimInfo.ReasonForChange:'';
                    }
                }
            }
        
        }        
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>