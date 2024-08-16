<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Application About Enforcement</b></div>
                <div style="font-size:12pt;"><b>FORM 29</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 135 and 136</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Document number:<br/><span style="color:#626262;font-style:italic;">For registry use only </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height: 35px;"> {{ fmepNumber ? fmepNumber : '&nbsp;' }} </div>
                </div>
            </div>
        </div>
        <div style="width: 79%;">
            This Application About Enforcement sets out the details of an application to enforce an order 
            in Provincial Court under the <i>Family Law Act</i> or to set aside the registration of a foreign 
support order under the <i>Interjurisdictional Support Orders</i> Act that a person is applying for.
        </div>
        <div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; padding:0.3rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">This application is to be used to help enforce an order, filed written agreement or filed 
                determination of parenting coordinator, that a person is not following. The court may
                impose consequences under the <i>Family Law Act</i> on the person who isn’t following the
                order. It may also be used to apply to set aside the registration of an order from another
                jurisdiction within 30 days after receiving notice of the registration.</div>
            </li>
            <li><div style="margin-left:9px;">For guidance filling in this form, please read the guidebook. The guide is available
                online at <a style="color:#1C35F4;" href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
            </div>
            </li>
            
        </ul>
    </div>
    <div style="float: right;width: 18%; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    A written agreement, court order from another jurisdiction or determination that is filed in Provincial Court under the <i>Family Law Act </i> is enforceable under the Act as if it were an order of the Provincial Court.
                </p>
    </div>
    </div>
<!-- <1> -->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 1 | About the Parties</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>1.</b><span style="margin-left:12px;"><b>My full name</b> is:</span>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="372px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>2.</b><span style="margin-left:12px;">The <b>other party’s full name is:</b></span>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="270px"
                        beforetext="" hint="Full name of party/parties" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="firstOtherParty.name | getFullName" />
            </div>
            
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Copy the party information from a filed document in your case. It should match.
                </p>
        </div>
    </div>
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 | Notice of the application</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;"> 
                <span style="text-indent: 5px;font-size: 11pt;"><b>3. </b></span><span style="margin-left:12px;"><span style="color:#626262;font-style:italic;">Select whichever option is correct</span></span>
                <div style="margin-top: 0.3rem;"></div>

                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left: 25px;" :check="form29Info.otherPartyNotice?'yes':''"
                    />
                    <div style="margin-top: -22px;text-indent: 16px;margin-left: 30px;text-align: justify;">
                        This <b>application is about enforcement under Rule 135</b>. I understand</div>
                    <div style="margin-left: 47px; text-align: justify;">
                         <b>I must give notice</b> of this application to each other party. <b>To give notice, they must be served</b> with the application and supporting documents <b>at least 7 days
                        before</b> the date of the court appearance <b>unless</b> the court allows the application 
                        to be made without notice or with less than 7 days’ notice.
                    </div>
                    <div style="margin-top: 0.5rem;"></div>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left: 25px;" :check="form29Info.foreignNotice?'yes':''"
                    />
                    <div style="margin-top: -22px;text-indent: 16px;margin-left: 30px;text-align: justify;">
                        This <b>application is to set aside the registration of a foreign support </b></div>
                    <div style="margin-left: 47px;text-align: justify;">                        
                        <b>order </b>under the <i>Interjurisdictional Support Orders Act</i>. I understand <b>I must give
                        notice of this application to the designated authority.</b> To give notice, the
                        designated authority must be served with the application and supporting
                        documents by registered mail <b>at least 30 days</b> before the application is to be
                        heard by the court.
                    </div>
                </div>

            
        </div>
            <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about serving court documents, see the guidebook.
                </p>
            </div>
            <div style="float: right;width: 18%; margin-top: 8px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    The Interjurisdictional Support Services is the designated authority in B.C. Further information can be found at isoforms.bc.ca.
                </p>
            </div>
    </div>    
     <!-- <For registery> -->
        <div style="page-break-after:always;">&nbsp;</div>
    <div class="print-block">
        <div style="width: 80%; float: left; margin-right: 10px;margin-top:-5px;" >
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 3 | About your court appearance</b>
            </div>
            <div style="text-indent: -8px;" value="3"> 
            <div style="text-indent: 22px;margin-top:3px;margin-left:-20px;"><span style="color:#626262;font-style:italic;">
                For registry or judicial case manager use only</span></div>
            </div>
        </div>
            <div  style="border-style: solid; border-color: black; width: 80%;float: left;margin-top:2px; ">
        <div style="margin-top:10px;margin-left:-35px;">
            <ul>
            <b>The application, which requires a court appearance, will be heard by the court</b>
            <span style="margin-left:0px;"><b> on</b></span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">________________</span>
            <span style="margin-left:20px;"><b> at</b></span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">________________</span>
            <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>  
            <div style="margin-top:-3px;width:80%">                
            <div style="margin-left:70px !important;font-size:6pt;"><i> date</i></div>
            <div style="margin-left:230px !important;font-size:6pt;margin-top:-12px;"><i> time</i></div>
            </div>
              
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: 17px;margin-left:10px;" :check="''"
                    />
                    <ul style="margin-top: -20px;margin-left:-25px;">
                        <span style="margin-left:20px;">in person at</span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">______________________________________________</span>
            <div style="margin-top:-3px;">
            <div style="margin-left:220px;font-size:6pt;"><i> court location</i></div>
            </div>
                    </ul>
                    <div style="margin-top: 0.6rem;"></div>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: 17px;margin-left:10px;" :check="''"
                    />                    
                    <ul style="margin-top: -20px;margin-left:-16px;">
                        <div>
                            <div style="width: 20%; margin-right: 10px;margin-top:-5px;margin-left:10px;">
                                by another method of attendance, <br/>
                                as specified 
                            </div>
                            <div style="width: 80%; margin-top:-90px;margin-bottom:10px;margin-left:90px;padding: 4px;line-height: 14px;border:1px solid;">
                            <div style="text-align: justify;font-size: 9pt;padding:2px;">
                            <b>Do not attend the courthouse in person.</b> The registry will send within 24 hours before the hearing date noted above the link to 
                            connect by MS Teams, including a dial-in conferencing number to be used by any party that is unable to use MS Teams 
                            or has problems with their video connection. If you have not provided your email address or telephone number to the registry on 
                            your Notice of Address Change (<a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true">Form 46</a>), you must contact the registry to obtain the MS Teams conference information.</div>
                            </div>

                        </div>
                        
                    </ul>
        </ul>
    </div>
    </div>
     <div style="float: right;width: 18%; margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    The registry or judicial case manager will work with you to schedule a date for the court appearance and will fill in the actual date and method of attendance on the form. Be prepared to talk about your availability if there are options for dates.
                </p>
            </div>
            
    </div>
    <div style="margin-bottom: 850px;"></div>
    <div style="page-break-after:always;">&nbsp;</div>
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
        <div style="margin-top:15px;font-size:11pt;">
            For more information: <a href="https://scyofbc.org/child-youth-legal-centre/">https://scyofbc.org/child-youth-legal-centre/</a>
            <br/>Contact the Child and Youth Legal Centre <a href="cylc@scyofbc.org">cylc@scyofbc.org</a> - (778)-657-5544.
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
    <div style="page-break-after:always;">&nbsp;</div> 
    
    <div class="print-block">
        
        <div style="margin-top: 1rem;"></div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; margin-top: 10px;width: 80%;padding:0.5rem; background: #d6d6d6; ">
        <b>NOTE TO THE OTHER PARTY:</b>
        <p>
            <b>If you do not attend court</b> on the date and time scheduled for the court appearance, the court 
                may make an order in your absence. 
        </p>    
            <p>You may also <b>choose to file a written response</b> in reply to the application in Form 19 Written Response to Application.
        </p>
    </div>
    </div>
    <div>
        
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>


            
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 4 | Order about enforcement</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>4. </b></span> <span style="margin-left:12px;">I am <b>applying for</b> an order to:</span>
            </div>
               
        <div>
    
        <div style="text-indent: 20px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:22px"  :check="form29Info.orderList.includes('writtenAgreementOrder')?'yes':''" text="enforce the order or filed written agreement made on"/>               
        <underline-form class="marginleft0p25vue" style="text-indent:0px; display:inline-block;" textBackgroundColor="#dedede"  textwidth="7rem" beforetext="" hintMargin="15px" hint="Date (dd/mmm/yyyy)" :text="form29Info.writtenAgreementOrderDate"/>
        </div>

        <div  style="text-indent: 20px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:22px"  :check="form29Info.orderList.includes('determination')?'yes':''" text=""/>
        <div style="margin-top:-20px;text-indent:47px;margin-left:22px">
        enforce, change or set aside the filed determination of a parenting </div> 
        <div style="text-indent:47px;margin-left:22px;margin-top:5px;">coordinator dated &nbsp;        
         <underline-form v-if="form29Info.determinationDate" class="marginleft0p25vue" style="text-indent:0px;margin-left:-0.5rem;margin-top:-200px;" textBackgroundColor="#dedede"  textwidth="9rem" beforetext="" hintMargin="40px" hint="(dd/mmm/yyyy)" :text="form29Info.determinationDate"/> 
         <div v-else style="margin-left:165px;margin-top:-25px;">
            <div style="background: #d6d6d6;width:100px;height:22px;">&nbsp;</div>
            <div style="width:200px;font-size:6pt;margin-left:-30px;margin-top:-2px;">(dd/mmm/yyyy)</div>
         </div>
        </div>       
        </div>
    
    

         <div style="text-indent: 20px;">
        <check-box  inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:22px" :check="form29Info.orderList.includes('expenses')?'yes':''" text="to have reasonable and necessarily incurred expenses set under the"/>
        <div style="margin-left:50px;"> following sections of the <i>Family Law Act</i>:</div>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section61')?'yes':''" text="section 61 <i>[denial of parenting time or contact]</i>"/>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section63')?'yes':''" text="section 63 <i>[failure to exercise parenting time or contact]</i>"/>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section212')?'yes':''" text="section 212 <i>[orders respecting disclosure]</i>"/>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section213')?'yes':''" text="section 213 <i>[enforcing orders respecting disclosure]</i>"/>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section228')?'yes':''" text="section 228 <i>[enforcing orders respecting conduct]</i>"/>
        <check-box style="margin-left:65px;text-indent: -17px;margin-left:87px" :check="form29Info.expenseList.includes('section230')?'yes':''" text="section 230 <i>[enforcing orders generally]</i>"/>                
        </div>

        <div style="text-indent: 20px;">
        <check-box inline="inline" boxMargin="0" style="display: inline;text-indent: -17px;margin-left:22px" :check="form29Info.orderList.includes('arrears')?'yes':''" text=""/>  
        <div style="margin-top:-20px;text-indent:47px;margin-left:22px">
        to determine whether arrears are owing under the support order or </div>
        <div style="text-indent:0px;margin-left:70px;">agreement dated &nbsp;</div> 
        <div style="display:flex;margin-left:185px;margin-top:-20px;"> 
        <underline-form v-if="form29Info.arrearsDate" class="marginleft0p25vue" style="text-indent:0px;margin-left:-0.5rem;text-align:center;" textBackgroundColor="#dedede"  textwidth="9rem" beforetext="" hintMargin="45px" hint="(dd/mmm/yyyy)" :text="form29Info.arrearsDate"/>
        <div v-else style="margin-left:0px;margin-top:-2px;">
            <div style="background: #d6d6d6;width:100px;height:22px;">&nbsp;</div>
            <div style="width:80px;font-size:6pt;margin-left:0px;margin-top:-2px;">(dd/mmm/yyyy)</div> 
        </div>
        <div style="margin-left:-15px"> under the <i>Family Law Act</i>, and if</div>
        </div> 
        <div style="text-indent:47px;margin-left:22px"> so, the amount of arrears (unpaid support)</div>
        </div>

        <div style="text-indent: 20px;">
        <check-box  inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:22px" :check="form29Info.orderList.includes('foreignSupport')?'yes':''" text=""/>
        <div style="margin-top:-20px;text-indent:47px;margin-left:22px">to set aside the registration of a foreign order under section 19(3) of the</div> 
        <div style="text-indent:47px;margin-left:22px"><i>Interjurisdictional Support Orders Act</i> from a reciprocating jurisdiction under </div>
        <div style="text-indent:47px;margin-left:22px"><i>the Interjurisdictional Support Orders Act</i> including from a contracting state </div>
        <div style="text-indent:47px;margin-left:22px">under the 2007 Hague Child Support Convention</div>
        </div> 
    
        </div>  
            
            <!-- <div style="text-indent: 20px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;" :check="form29Info.attachRequiredDocuments?'yes':''" text=""/> 
                <div style="margin-top:-20px;text-indent:47px;"><b>A copy of the order, written agreement or determination</b> I want to </div>  
                    <div style="text-indent:47px;">enforce is attached to this application <b>(see attached copy).</b></div> 
            </div> -->
        </div>
            
                  
            <div style="float: right;width: 18%; margin-top: 100px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    A party to a foreign order may apply to the BC court to set aside the registration within 
                    30 days after receiving notice of the registration [s. 19 <i>Interjurisdictional Support Orders Act</i>].
                </p>
            </div>
            <div style="float: right;width: 18%; margin-top: 100px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-paperclip />
                    <br />
                    You must attach a copy of the order, written agreement or determination to this application for filing.
                </p>
            </div>
    </div>  

    <div class="print-block">
        <div style="width: 80%; float: left;">
            <div style="margin-top: 1rem;"></div>
        <div>
        <span style="font-size: 11pt;margin-left:20px"><b>5. </b></span>
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="form29Info.attachRequiredDocuments?'yes':''" text=""/> 
                <div style="margin-top:-25px;text-indent:47px;margin-left:20px"><b>A copy of the order, written agreement or determination</b> I want to </div>  
                    <div style="text-indent:47px;margin-left:22px">enforce is attached to this application <span style="color:#626262"><b>(see attached copy).</b></span></div> 
            </div>
        </div>
        
    </div>  


    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 5 | Details of the order</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>6. </b></span><span style="margin-left:12px;">The <b>details of the order</b> I am applying for are as follows:</span>
                <br/>
                <span style="margin-left:25px;font-size: 11pt;text-indent:47px;">
                    <span style="color:#626262;font-style:italic;">List the specific details of the order(s) you are asking for</span>
                </span>
                <div v-if="form29Info.orderdesc" style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:100px;">{{form29Info.orderdesc}}</div>
                    <div v-else style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;margin-bottom:3rem;min-height:100px;"></div> 
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about the different enforcement options, see the guidebook.
                </p>
        </div>
    </div>

    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 6 |The facts</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>7. </b></span><span style="margin-left:12px;">The <b>facts</b> on which this application is based <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#626262;font-style:italic;">Explain why you are making the application and why the order you are</span>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#626262;font-style:italic;">requesting should be made</span>
                </div>
                
               <div v-if="form29Info.facts" style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:100px;">{{form29Info.facts}}</div>
               <div v-else style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;margin-bottom:3rem;min-height:100px;"></div> 
                
            </div>
        </div>
        
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If you choose to, you can prepare an Affidavit – General in Form 45 to provide evidence in writing to support your application. You can also give spoken evidence in court.
                </p>
        </div>
        
    </div>
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;margin-top:25px;">           
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">                
                <div style="margin-left:15px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#626262;font-style:italic;">To add more, select the box below and attach a page with the additional information</span>
                </div>
                <div style="text-indent: 20px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;" :check="''" text=""/> 
                <div style="margin-top:-25px;text-indent:47px;"><b>Additional Page(s)</b>&nbsp; <span style="color:#626262"><b>(see attached)</b></span></div>  
            </div>
            </div>
        </div>
        
        
        <div style="float: right;width: 18%; margin-top: 10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-paperclip />
                    <br />
                    If you need more space, select the box, and remember to include your additional page(s).
                </p>
        </div>
    </div>
    <div>
        <div style="width: 80%; float: left; margin-right: 10px; margin-top:10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 7 |Address for service</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>8. </b></span><span style="margin-left:12px">My <b>address for service</b> of court documents and contact information is:</span>
                <br/>
                <div style="margin-left:22px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#626262;font-style:italic;">You must provide an address for service and contact number, but it does </span>
                </div>
                <div style="margin-left:22px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#626262;font-style:italic;">not have to be your own if you don’t want to</span>
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
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer’s name and firm name (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable): </td>
                        </tr>
                    </table>
                
                
            </div>
        </div>
        
        <div style="float: right;width: 18%; margin-top: 45px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about how this information will be used and who will have access to it, see the guidebook.
                </p>
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
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { form29InformationDataInfoType, enfrcOtherPartyDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { requiredDocumentsInfoType } from '@/types/Common';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox        
    }
})

export default class Form29Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.State
    public requiredDocuments!: requiredDocumentsInfoType;    

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form29Info = {} as form29InformationDataInfoType;
    
    existingFileNumber = ''; 
    fmepNumber = '';

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
        this.form29Info = this.getForm29Info();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
        this.fmepNumber = this.getFmepInfo(this.result.filingLocationSurvey);
    } 


    public getFmepInfo(locationData){
        return locationData?.ExistingFMEPCase  && locationData?.ExistingFMEPCase =='y' && locationData.ExistingFMEPNumber? locationData.ExistingFMEPNumber:'';        
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
    
    public getForm29Info() {

        const form29Information = {} as form29InformationDataInfoType;
        form29Information.orderList = [];
        form29Information.expenseList = [];
        form29Information.arrearsDate = '';
        form29Information.foreignNotice = false;
        form29Information.otherPartyNotice = false;
        form29Information.attachRequiredDocuments = false;

        if (this.result?.enfrcQuestionnaireSurvey) {
            const enfrcQuest = this.result.enfrcQuestionnaireSurvey;
            if (enfrcQuest.includes('parentingCoordinatorDetermination')){

                form29Information.orderList.push('determination')
                if (this.result.enforceChangeSetAsideDeterminationSurvey){
                    form29Information.determinationDate = Vue.filter('beautify-date')(this.result.enforceChangeSetAsideDeterminationSurvey.existingDate);
                }    

            }

            if (enfrcQuest.includes('writtenAgreementOrder') && this.result.enforceAgreementOrOrderSurvey) {
                form29Information.orderList.push('writtenAgreementOrder');
                form29Information.writtenAgreementOrderDate = Vue.filter('beautify-date')(this.result.enforceAgreementOrOrderSurvey.existingDate);
            }

            if (enfrcQuest.includes('arrears') && this.result.detrermineArrearsSurvey){                
                form29Information.orderList.push('arrears');
                form29Information.arrearsDate = Vue.filter('beautify-date')(this.result.detrermineArrearsSurvey.existingDate);
            }

            if (enfrcQuest.includes('expenses') && this.result?.determineAnAmountOwingForExpensesSurvey?.amountOwingActionType){
                form29Information.orderList.push('expenses');                
                form29Information.expenseList = this.result.determineAnAmountOwingForExpensesSurvey.amountOwingActionType;
            }

            if (enfrcQuest.includes('foreignSupport') || this.requiredDocuments?.agreementEnfrc?.required?.length>0){
                form29Information.attachRequiredDocuments = true;
            }
            
            if (enfrcQuest.includes('foreignSupport')){
                form29Information.orderList.push('foreignSupport');              
            }

            if(enfrcQuest.includes('foreignSupport') && enfrcQuest.length==1){
                form29Information.otherPartyNotice = false;
                form29Information.foreignNotice = true;
            }else if(this.result?.otherPartyCommonConfirmationSurvey?.confirmation == "Confirmed")
            {
                form29Information.otherPartyNotice = true;
            }         
        }

        if (this.result.aboutTheOrderEnforcementSurvey) {

            const abtOrdrEnfrc = this.result.aboutTheOrderEnforcementSurvey;
            
            form29Information.facts = abtOrdrEnfrc.applicationFacts;            
            form29Information.orderdesc = abtOrdrEnfrc.orderDescription;
        } 
       
        return form29Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>