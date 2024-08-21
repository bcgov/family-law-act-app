<template>
    <div v-if="dataReady">

<!-- Page 1 -->
        <div style="width: 120px; background: #666; color: #fff; padding: 16px; font-weight: bold;">
            <span style="font-size: 24pt;">Form</span> 
            <br>
            <span style="font-size: 40pt;">39</span>
        </div>

        <div style="width: 400px; margin-top: 200px; margin-bottom: 200px;">
            <h1>Request for Scheduling <br> Form 39</h1>

            <p style="font-size: 12pt;">Provincial Court Family Rules</p>
        </div>

        <div class="new-page"></div>

<!-- <Page 2> -->
        <div style="display: flex; border: 2px solid #333;padding: 8px;">
            <div style="width: 80%;">
                <b>You can complete and file most family forms online using the Family Law Act Online Forms Service.</b>
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

            The <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020" target="_blank">Provincial Court Family Rules</a> set out the steps that you must take and the forms you must complete in a family law case. These rules apply to cases in Provincial Court about matters under the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_00" target="_blank">Family Law Act</a> and the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96127_01" target="_blank">Family Maintanance Enforcement Act</a>.

            <br>

            You can find the Rules and Acts on the BC Laws website at <a href="www.bclaws.gov.bc.ca" target="_blank">www.bclaws.gov.bc.ca</a>.
            
            <br>

            <div style="background-color: #666; color: #fff; font-size: 14pt; font-weight: bold; padding: 20px; text-align: center;">
                Preparing a Request for Scheduling Form 39
            </div>

            Complete this form if you need a court appearance to be scheduled because any of the circumstances set out in <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#section156">Rule 156</a> apply and, with the exception of a review, less than a year has passed from the date the parties took any step under the Rules.
            
            <br>
            
            This form is used <b>to proceed with a filed application</b> that has previously been scheduled for a court appearance.

            <br>

            The Request for Scheduling can be used <b>to ask for an interim order about a family law matter</b> if you have already attended a family management conference. To apply for an interim order about a family law matter, a filed Application About a Family Law Matter, Reply to an Application About a Family Law Matter, and/or Counter Application must already include the details of the final order you are asking for an interim order about.

            <br>

            It can also be used <b>to apply to change, cancel, or suspend an interim order</b> about a family law matter that can’t remain in place until a final decision can be made.

            <br>

            <b>If more than one year has passed since you last took a step in your case</b>, except in the case of a review, you must instead file a <a href="https://www2.gov.bc.ca/assets/download/2FB6FE365CF84688B1BE60BDD960B5EF?forcedownload=true">Notice of Intention to Proceed Form 2</a>. Your next step will be either to schedule a needs assessment or a family management conference to determine the next step in your case.

            <br>

            <div style="border: 2px dashed #333; background: #d6d6d6; padding: 8px; ">
                <b><span style="font-size: 18px">NOTE:</span> If you were directed by the court to schedule your next appearance with a judicial case manager or together with the other party</b>, you probably don’t need to use this form. Check in with the judicial case manager or registry staff if you are not sure.
            </div>

            <div class="new-page"></div>

            <div style="display: flex;">
                <div style="width: 50%; padding: 8px; font-size: 12px;">
                    <div style="background-color: #666; color: #fff;">
                        <b>Need legal help?</b>
                    </div>
                    It’s  important  to  understand  the  law  and  make  sure  you  have the right information. If   you don’t, it can make solving your problem harder. Getting  advice  from  a  lawyer  can  help. You can find a lawyer through:
                    <br>
                    <b>Lawyer Referral Service</b>
                    Visit <a href="www.accessprobono.ca/our-programs/lawyer-referral-service" target="_blank">www.accessprobono.ca/our-programs/lawyer-referral-service</a> or call at 604-687-3221 
                    <br>
                    <b>Legal Aid, Duty Counsel and Family Advice Lawyers</b>
                    Visit <a href="https://legalaid.bc.ca/" target="_blank">https://legalaid.bc.ca/</a> or call 1-866-577-2525
                    <br>
                    <b>Legal Services and Resources </b>
                    <br>
                    Visit the ClickLaw HelpMap at <a href="http://www.clicklaw.bc.ca/helpmap" target="_blank">http://www.clicklaw.bc.ca/helpmap</a> 

                    <div style="background-color: #666; color: #fff;">
                        <b>
                            Filling out the form and preparing to file it
                        </b>
                    </div>

                    <br>

                    Make sure you follow the instructions in the form and include all  the  required  information.  You  don’t  need  to  use  any  special wording. Try to be clear and concise.
                    <br>
                    <p>If you complete the form by hand, be sure it’s readable.</p>
                    <br>
                    <b>How do I prepare the form for filing? </b>
                    <ul>
                        <li>print or make copies of the completed form: one set foryou,  one  set  for  the  court,  and  one  set  for  each  otherparty</li>
                        <li>staple  or  secure  each  package  of  documents  together</li>
                    </ul>
                    <div style="background-color: #666; color: #fff;">
                        <b>Filing the form at the registry</b>
                    </div>
                    After  you’ve  filled  out  the  form,  you  must  file  it at  the  <a href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96" target="_blank">Provincial Court Registry</a> where your existing Provincial Court case is filed.

                    <br>
                    File the form:
                    <ul>
                        <li>electronically  using the <a href="https://justice.gov.bc.ca/apply-for-family-order/">FLA Online Forms Service</a></li>
                        <li>in person at the court registry</li>
                        <li>by mail</li>
                        <li>by email, as referenced in Notice to the Profession and Public <a href="https://www.provincialcourt.bc.ca/downloads/Practice%20Directions/NP28.pdf">NP 28 Current Court Operations</a>, or</li>
                        <li>by fax filing using the <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa734.pdf?forcedownload=true">Fax Filing Cover Page Form 52</a></li>
                    </ul>

                    <p>There  are  no  fees  for  filing  Provincial  Court  family  documents.</p>

                    <b>Be sure to bring all copies of the documents to the registry if you are filing in person. </b>
                    <p>The registry clerk will review your form to make sure it’s complete before filing it. You’ll be given a copy for your records along with a copy for the other party.</p>
                </div>
                <div style="width: 50%; padding: 8px; font-size: 12px;">
                    <div style="background-color: #666; color: #fff;">
                        <b>Serving the document</b>
                    </div>
                    <b>Serve</b> a copy of the document to each other party at least 7 days’ before the date and time of the appearance unless the court  has  ordered  something  different.  This  means  there  must be at least 7 days between the date the document is served and the date and time of the court appearance.

                    <br>
                    The document can be served by <b>ordinary service to the address of service</b> for each party. Their address for service is the address they have provided to the court.
                    <br>
                    A party who does not have an address for service must be served by <b>personal service</b>. An adult (at least 19 years old) who is not a party must hand-deliver the documents to the party to be served.
                    <br>
                    See the guidebook if you need more information about serving the document.
                    <br>
                    You may need to prove service of the documents took place. The person serving the document must complete a <a href="https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178">Certificate of Service Form 7</a> to prove  service.  You  must  attach a copy of the document to the Certificate of Service. Remember to make a copy before the documents are served.
                    <br>
                    <b>What if I can’t find the other party or they are avoiding service?</b>
                    <br>
                    If you’re in this situation, you can apply to the court to allow you  to  use  an  alternative  method  of  service.  You  must  complete and file an <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa718.pdf?forcedownload=true">Application About a Case Management Order Without Notice or Attendance Form 11</a>. 
                    <div style="background-color: #666; color: #fff;">
                        <b>Attending the court appearance</b>
                    </div>
                    Depending on the application you are requesting to schedule, your court appearance may be a family management conference or another type of court appearance. The registry will provide you with this information on your document when you file it.
                    <br>
                    The document will also tell you the method of attendance for the appearance.
                    <br>
                    Family  management  conferences  are  being  conducted  by  telephone,  audioconference  or  videoconference.  Do  not  attend  the  courthouse  in  person  for  a  family  management  conference unless a court order tells you to.
                    <br>
                    If you can’t attend court using the method of attendance set out in your request for scheduling for the court appearance, you  can  request  the  court’s  permission  to  attend  using  a  different  method  of  attendance  by  filing  an  <a href="https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178">Application for Case Management Order without Notice or Attendance Form 11</a>. 
                    <br>
                    <b>Can I get help in another language?</b>
                    <br>
                    <b>Free</b> spoken-language  interpreters  for  people  who  do  not  speak  English  and  visual  language  interpreters  for  people  who are deaf or hard of hearing are available <b>for all family law court appearances</b>.
                    <br>
                    It’s important to let <b>court registry staff know as soon as possible</b> that you need an interpreter. If they can’t arrange an  interpreter  in  time,  the  judge  may  have  to  re-schedule your case.
                    <br>
                    For most things that go on outside the courtroom, you’ll need to   find  your  own  interpreter.  Some  people  ask  a  friend  or  family member. Others hire a professional interpreter.
                </div>
            </div>
        </div>

<!-- <HEADER> -->
        <div class="new-page"></div>
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
                    :italicHint="false" :text="hello"/>
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
        this.lastAppearanceDate = '';
        this.reviewOrderMade = false;

        if(this.result?.requestForSchedulingSurvey){

            let requestForScheduling = {} as requestForSchedulingDataInfoType;

            requestForScheduling = this.result.requestForSchedulingSurvey;

            if (requestForScheduling.Unresolved == 'n' && requestForScheduling.ReviewOrdered == 'y'){
                this.reviewOrderMade = true;
            }

            this.filedDate = requestForScheduling.FiledDate?requestForScheduling.FiledDate:'';
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