<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size:13pt;"><b>Application About </b></div>
                <div style="font-size:13pt;"><b>Priority Parenting Matter</b></div>
                <div style="font-size:12pt;"><b>Form 15</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 2, 76, 77 and 78</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; text-align: right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                        result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ?
                        existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number: <div
                            style="font-size: 6pt; padding-left:16px;">For registry use only</div>
                    </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ fmepNumber ? fmepNumber : '&nbsp;' }} </div>
                </div>
            </div>
        </div>

        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <p>This Application About Priority Parenting Matter sets out the details of an order about a priority 
                    parenting matter that a person is applying for. </p>
                <div style="border-style: dashed; border-color: black; padding:0.5rem; background: #909090;">
                    <b>Please read before completing the form:</b>
                    <ul>
                        <li>
                            You must complete the main part of this application and any applicable schedule for your application identified in Part 5 of the main application.
                        </li>
                        <li>
                            For guidance filling in this form, please read the guidebook. The guide is available online at
                            <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms"
                                target="_blank">www.gov.bc.ca/court-forms</a>
                            or from your local court registry.
                        </li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:55px; font-size:7pt">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        If you also need an order about long-term parenting arrangements, including 
                        parental responsibilities and parenting time, you must also complete an Application About a Family Law Matter Form 3
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Part 1 -->
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 1 | About the parties</b>
                </div>

                <div
                    style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; ">
                        <b>1. </b>My <b>full name</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="376px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede"
                        hintMargin="152px" :text="yourInfo.name | getFullName" />

                    <div style="padding-top:15px; padding-left:12px;">
                        <div style="display: inline-block; ">
                            <b>My date of birth</b> is:
                        </div>
                        <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="356px"
                            beforetext="" hint="(dd/mmm/yyyy)" :italicHint="false"
                            textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.dob | beautify-date-mid" />
                    </div>
                </div>

                <div
                    style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>2. </b>The <b>other party’s full name is:</b>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="290px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px"
                        :text="firstOtherParty.name | getFullName" />

                    <div style="padding-top:10px; padding-left:12px;">
                        <div style="display: inline-block; ">
                            Their <b>date of birth</b>(dd/mmm/yyyy) is:
                        </div>
                        <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="256px"
                            beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px"
                            :text="firstOtherParty.dob | beautify - date" />
                        <div>
                            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                                :check="additionalOtherParties.length > 0 ? 'yes' : ''" />
                            <div style="margin-top: -18px;text-indent: 20px;">
                                There is an additional party.
                            </div>
                        </div>
                        <div/>
                        <div style="padding-top:5px">
                            <div v-if="additionalOtherParties.length > 0" style="font-size: 9pt;">
                                <div v-for="(otherParty, inx) in additionalOtherParties" :key="inx"
                                    :style="inx == 0 ? 'display:inline;' : 'text-indent:-5px;margin-top:1rem;'">
                                    <div style="display: inline-block; margin-left:2rem;">
                                        The<b> additional party’s</b> full name is:
                                    </div>
                                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="235px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="80px" :text="otherParty.name | getFullName" />
                                    <div style="display: inline-block; padding-top:10px; margin-left:2rem;">
                                        Their<b> date of birth</b>(dd/mmm/yyyy) is:
                                    </div>
                                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="225px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="152px" :text="otherParty.dob | beautify - date" />
                                </div>
                            </div>
                            <div v-else style="display:inline;">
                                <div style="display: inline-block; margin-left:2rem;">
                                        The<b> additional party’s</b> full name is:
                                    </div>
                                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="235px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="80px" text="" />
                                    <div style="display: inline-block; padding-top:10px; margin-left:2rem;">
                                        Their<b> date of birth</b>(dd/mmm/yyyy) is:
                                    </div>
                                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="225px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="152px" text="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:10px; font-size:7pt">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        The other party is any other parent or guardian of the child(ren).
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:10px; font-size:7pt">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        If you need to add another 
                        party or need more space for 
                        any field on this form, you can 
                        attach a separate piece of 
                        paper to this application that 
                        includes the information.
                    </p>
                </div>
            </div>
            <br />
        </div>

        <!-- Part 2-->
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="margin-top: 0.3rem;" />
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 | Information about children</b>
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>3.</b> This application is about the following child(ren):
                    </div>

                    <b-table :items="childrenInfo" :fields="childrenFields" class="mt-2" small bordered>
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{ data.value }}</div>
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(dd/mm/yyyy)</i>
                        </template>
                    </b-table>
                </div>
            </div>
            <div style="width: 20% "/>
        </div>

        <!-- Part 3  -->
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width:75%">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 3 | Notice of the application</b>
                </div>
                <br/>
                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                    <b>4. &nbsp;</b>
                    
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="true ? 'yes' : ''" />
                    <div style="margin-top: -16px; padding-left:35px">
                        I understand <b>I must give notice</b> of this application to all parents and guardians of
                        the child(ren) this application is about. They are the other party/parties.
                        <br/>
                        <b>To give notice, the other party must be served</b> with the application at least 7 
                        days before the date set for the court appearance <b>unless</b> the court allows the 
                        application to be made without notice or with less than 7 days’ notice
                    </div>
                </div>
                <div>
                    <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                        <b>5. &nbsp;</b>
                        <div style="margin:0 0 0 0.5rem; display: inline; font-size: 9pt;"><i>Select only one of the options below</i></div>

                        <div style="margin:0 0 0 3rem;font-size: 9pt;" >
                            <check-box inline="inline" :check="ppmInfo.noticeType == 'givingOver 7 DaysNotice'?'yes':''" text="I am applying with <b>at least 7 days’ notice</b> to the other party" style="text-indent: -16px;"/>
                            <check-box  :check="ppmInfo.noticeType == 'askingForWithoutNotice'?'yes':''" text=" I would like to apply <b>without notice</b> to the other party. I am also filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement for notice of this application." style="text-indent: -16px;"/>
                            <check-box  :check="ppmInfo.noticeType == 'askingForUnder 7 DaysNotice'?'yes':''" text="I would like to apply <b>with less than 7 days notice</b> to the other party. I am also filing an Application for Case Management Order Without Notice or
                                Attendance in Form 11 requesting to modify the requirement for at least 7 days’ notice to the other party." style="text-indent: -16px;"/>
                            <check-box  :check="ppmInfo.noticeType == 'haveOrderForWithoutOrUnder 7 DaysNotice'?'yes':''" text="I have a <b>court order that allows</b> the application to be made <b>without notice or with less than 7 days’ notice</b>" style="text-indent: -16px;"/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about 
                        serving court documents and 
                        making an application without 
                        notice or with short notice, 
                        see the guidebook.
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:10px">
                    <p>
                        <b-icon-file-earmark-text />
                        <br />
                        If applicable, you must file an 
                        Application for Case 
                        Management Order Without 
                        Notice or Attendance Form 
                        11.
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:10px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        If requested, the judge will 
                        decide if an application may 
                        be made without notice, if 
                        notice must be given, or if the 
                        notice period should be 
                        shortened.
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 4  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 4 | About your court appearance</b>
                </div>

                <div style="margin:0.25rem 0 0 0rem;font-size: 9pt;" >
                    <i>For registry or judicial case manager use only</i>
                </div>

                <div style="border:1px solid; font-size: 9pt; padding:1rem;font-family:BCSans">
                        <b>This application, which requires a court apprearance, will be heard by the court</b>
                        <grey-box-form entryFontSize="9pt" marginTop="-16px" style="text-indent:2px;display:inline-block;" textwidth="10rem"
                            hintindent="65px" beforetext="<b>on</b>" hint="date" text="" textBackgroundColor="#dedede" />
                        <grey-box-form entryFontSize="9pt" marginTop="-16px" style="text-indent:2px;display:inline-block;" textwidth="10rem"
                            hintindent="75px" beforetext="<b>at</b>" hint="time" text="" />
                        <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
                        <div style="margin:0.5rem 0 0 0.25rem;">
                            <div>
                                <check-box inline="inline" boxMargin="0" style="text-indent: 4px; width:20px" />
                                <div style="margin-top: -18px;text-indent: 20px;">
                                    &nbsp; in person at
                                    <grey-box-form entryFontSize="9pt" marginTop="-16px" style="text-indent:2px;display:inline-block;" textwidth="22rem"
                                        hintindent="165px" beforetext="" hint="court location" text="" />
                                </div>
                            </div>
                        </div>
                        <div style="margin:0.5rem 0 0 0.25rem; display:flex; flex-direction:row;">
                            <div style="width:20%">
                                <check-box inline="inline" boxMargin="0" style="text-indent: 4px; width:20px" />
                                <div style="margin-top: -18px; padding-left:25px">
                                    by another method of attendance, as specified
                                </div>
                            </div>
                            <div style="flex:1; padding-top:8px">
                                <div style="border:1px solid; font-size: 8pt; padding:0.5rem;">
                                    <b>Do not attend the courthouse in person</b>. The registry will send within 24 hours before
                                    the
                                    hearing date noted above the link to connect by MS Teams, including a dial-in
                                    conferencing
                                    number to be used by any party that is unable to use MS Teams or has problems with their
                                    video connection. If you have not provided your email address or telephone number to the
                                    registry on your Notice of Address Change (<a href="#" target="_blank">Form 46</a>), you
                                    must contact the
                                    registry to
                                    obtain the MS Teams conference information
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="border-style: dashed; border-color: black; margin-top: 10px;padding:0.5rem; background: #d6d6d6; ">
                        <b>NOTE TO THE OTHER PARTY:</b>
                        <div style="margin:0.5rem; font-size:9pt;">
                            <p>
                                <b> If you do not attend court</b> on the date and time scheduled for the court
                                    appearance,the court may make an order in your absence.
                                    <p>You may also choose to <b> file a
                                    written response </b> in reply to the application in Form19 Written Response to Application</p>
                            </p>
                        </div>
                    </div>
            </div>
            
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        The registry or judicial case 
                        manager will work with you to 
                        schedule a date for the court 
                        appearance and will fill in the 
                        actual date and method of 
                        attendance on the form. Be prepared to talk about your 
                        availability if there are options 
                        for dates. 
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 5  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width:75%">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 5 | About the priority parenting matter</b>
                </div>

                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                    <b>6. &nbsp;</b>
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt; text-indent: -16px;" 
                    :check="true?'yes':''" 
                    text="I am <b>applying for an order about</b> the following priority parenting matter(s):"/>

                <div style="margin:0.25rem 0 0 3rem;font-size: 9pt; text-indent: -16px;" >
                    <i>Select all options that apply</i>
                    <check-box  :check="ppmInfo.ppmList.includes('medical')?'yes':''" text="giving, refusing or withdrawing consent, by a guardian, to medical, dental, or other health-related treatments for a child, because delay will result in risk to the child’s health"/>
                    <check-box  :check="ppmInfo.ppmList.includes('passport')?'yes':''" text="applying, by a guardian, for a passport, licence, permit, benefit, privilege or other thing for a child, because delay will result in risk of harm to the child’s physical, psychological or emotional safety, security or well-being"/>
                    <check-box  :check="ppmInfo.ppmList.includes('travel')?'yes':''" text="applying, by a guardian, for travel with a child or participation by a child in an activity because consent to the travel or activity is required and is alleged to have been wrongfully denied"/>
                    <check-box  :check="ppmInfo.ppmList.includes('locationChange')?'yes':''" text="relating to change in location of a child’s residence, or a guardian’s plan to change the location of a child’s residence because no written agreement or order respecting parenting arrangements applies in respect of the child, and the change of residence can reasonably be expected to have a significant impact on the child’s relationship with another guardian"/>
                    <check-box  :check="ppmInfo.ppmList.includes('preventRemoval')?'yes':''" text="relating to the removal of a child under section 64 of the Family Law Act"/>
                    <check-box  :check="ppmInfo.ppmList.includes('interjurisdictional')?'yes':''" text="determining matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act"/>
                    <check-box  :check="ppmInfo.ppmList.includes('wrongfulRemoval')?'yes':''" text="relating to the alleged wrongful removal of a child under section 77(2) of the Family Law Act"/>
                    <check-box  :check="ppmInfo.ppmList.includes('returnOfChild')?'yes':''" text="relating to the return of a child alleged to have been wrongfully removed or retained under the Convention on the Civil Aspects of International Child Abduction signed at the Hague on October 25, 1980"/>
                    <check-box  
                        :check="ppmInfo.ppmList.includes('childServices')?'yes':''" 
                        text="applying for an order under section 45 [orders respecting parenting arrangements] or 51 [order respecting guardianship]
                            of the Family Law Act in one of the following circumstances:<ol style='list-style-type: lower-roman'><li>the child to whom the order relates has been removed 
                            under section 30 [removal of child], 36 [interim supervision order no longer protects the child] or 42 
                            [enforcement of supervision order after the protection hearing] of the Child, Family and Community 
                            Service Act and a director under that Act has advised that the order will allow for a child to be 
                            returned to the applicant;</li><li>a director under the Child, Family and Community Service Act has 
                            advised that the child to whom the order relates will be removed under section 30, 36 or 42 of that 
                            Act unless the order is made;</li></ol><i><span>&#10132;</span> Complete <b>Schedule 1</b> and, if you are applying for guardianship, <b>Schedule 2</i></b>"/>
                </div>
            </div>
            </div>

            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-book />
                        <br />
                        A priority parenting matter is 
                        not the same as a family law 
                        matter that needs to go to 
                        court on an urgent basis [Rule 
                        2].
                        <br/>
                        For more information about 
                        priority parenting matters and 
                        how to apply for a family law 
                        matter on an urgent basis, 
                        see the guidebook.
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:300px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        If you are applying for a 
                        priority parenting matter order 
                        about: 
                        <ul style="padding-inline-start: 10px;">
                            <li>
                                parenting arrangements or
                                guardianship of a child
                                because the child has been
                                removed or is at risk of
                                removal, you must get the
                                Director to complete
                                Schedule 1 before filing the
                                application
                            </li>
                        <li>
                            guardianship of a child, you
                            must complete Schedule 2
                        </li>
                    </ul> 
                    </p>
                </div>
            </div>
        </div>

        <!--Appearance Notice: Begin -->
        <div class="print-block">
            <div style="margin-top: 1rem;"></div>
            <div style="text-align: justify; font-size:11px;">
                <p style="text-align: center; font-size: 14px;"> <b>IMPORTANT INFORMATION ABOUT YOUR APPEARANCE</b></p>
                <div style="padding-top: 12px;">
                    <b>What do parties need to know about attending by another method other than in person? </b>
                    <p>
                        If your notice indicates that you are to attend by another method of attendance, parties, including
                        the
                        judge, will attend
                        using the Microsoft Teams audio- and video-conferencing (video) platform. Do not attend the
                        courthouse
                        in person.
                        Parties will receive remote MS Teams appearance details within 24 hours prior to the appearance,
                        this
                        notification is
                        sent to you by email
                    </p>
                    <p>
                        Microsoft Teams allows participants to join the conference using video or audio from a desktop,
                        laptop,
                        tablet, or
                        smartphone, or to dial-in to a proceeding from a telephone. If you are appearing by video, please
                        ensure
                        that you
                        have downloaded Microsoft Teams or have the latest version of Google Chrome or Microsoft Edge.
                    </p>
                    <p>
                        <b>If you received this Notice by mail</b> and intend to appear using video or audio from a desktop,
                        laptop,
                        tablet, or
                        smartphone, and you did not provide an email address for service, please file an Notice of Address
                        Change (PCFR
                        Form 46), with the court registry that includes your email address and the court registry will send
                        you
                        the MS Teams
                        meeting invite within 24 hours prior to your appearance.
                    </p>
                    <p>
                        The link and dial up information may be shared with your lawyer if you have retained counsel; and
                        with
                        your client if you are counsel.
                    </p>
                    <p>
                        <b> Please do not forward or share</b> the MS Teams link or dial up information to any unauthorized
                        parties
                    </p>
                    <div>
                        <p style=" font-size: 13px;"> <b>Preparing for your Family Management Conference</b></p>
                        <p><b>Legal Aid BC - Family Law Legal Advice</b> </p>
                        <p>
                            If you do not have a lawyer for your family law matter, visit <a
                                href="https://family.legalaid.bc.ca/court-notices"
                                target="_blank">legalaid.bc.ca/family-court-notices</a> to
                            find out about <b>free in person and remote legal advice services </b> that you may be eligible
                            for
                            that can help you prepare for your court date.Contact the advice services at least three weeks
                            before your court date
                            or as soon as you receive
                            this notice.If you are unable to access the internet, contact the Family LawLINE at 604-408-2172
                            in
                            Greater Vancouver or 1-866-577-2525 elsewhere in BC.
                        </p>
                    </div>
                    <div>
                        <p><b>Family Justice Services</b></p>
                        <p>Family justice counsellors provide services to British Columbians going through separation and
                            divorce and are specially trained to help families resolve their issues about guardianship,
                            parenting arrangements,contact and support. There is no charge for their services.
                        </p>
                        <p>
                            At this time all services are available in-person as well as virtually (through telephone and
                            videoconference) across
                            the province. For more information, parties can call [1-844-747-3963] or contact their closest
                            <a href="https://www.clicklaw.bc.ca/services/family-justice-centres" target="_blank"> Family
                                Justice Centre.</a>
                        </p>
                    </div>
                    <div>
                        <p><b> Society for Children and Youth of BC Child and Youth Legal Centre </b></p>
                        <p>
                            Free legal assistance directly for children and youth. Services may include legal advice and
                            information, referral, or full representation, depending on circumstances. Availability and wait
                            times may vary. Services are for children and youth who want legal assistance, are able to
                            express
                            their views and preferences,and who caninstruct a lawyer.
                        </p>
                        <p>For more information: <a href="https://www.scyofbc.org/child-youth-legal-centre/"
                                target="_blank">https://www.scyofbc.org/child-youth-legal-centre/</a> </p>
                        <p> Contact the Child and Youth Legal Centre <a href="" target="_blank">cylc@scyofbc.org</a>-
                            (778)-657-5544</p>
                    </div>
                    <div>
                        <p><b>Interpreter</b></p>
                        <p>The court provides interpreters for family proceedings in provincial court. If you require an
                            interpreter, please advise the registry as soon as possible. This link includes all court
                            locations
                            (address and phone numbers):
                            <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations"
                                target="_blank"> www.gov.bc.ca/courthouselocations
                            </a>
                        </p>
                        <p>
                            <b>Before the scheduled hearing date,</b>please visit the Provincial Court website at
                            https://www.provincialcourt.bc.ca and review:
                        <ul>
                            <li>
                                Policy on Use of Electronic Devices in Courtrooms and Access to Court Proceedings Policy
                                (there
                                is a general prohibition on the recording or broadcasting of court proceedings unless
                                authorized
                                by the Court and there are penalties for breach)
                            </li>
                            <li>NP 21 Remote Attendance in the Provincial Court (for etiquette and directions on connecting
                                by
                                another method of attendance) (counsel attendance requirements when attending Family matters
                                remotely)
                            </li>
                            <li>
                                NP 24 Form of Address for Parties and Lawyers (provide the judge or justice with each
                                person’s
                                name, title (e.g.
                                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
                            </li>
                            <li>
                                Guide for Appearing in the Provincial Court using MS Teams
                            </li>
                            <li>
                                eNews - What to expect at a family management conference?
                            </li>
                        </ul>
                        </p>
                        <p>
                            <b>If you are unable to dial-in or are dropped from the appearance</b>immediately call the court
                            registry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--Appearance Notice: End -->

        <!-- Part 6  -->
        <div class="new-page" />
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 6 | Details of the order</b>
                </div>
                <div style=" text-indent: 0px; display:inline; margin: 0rem 0.5rem 0.5rem 1rem; font-size: 9pt;">
                    7. <b> The details of the order</b> I am applying for are as follows:
                    <i style="margin:0 0 0 2rem; display: block;font-size: 9pt;">List the specific details of the order(s) you are asking for</i>
                    <div v-if="ppmInfo.orderdesc" style="margin: 0rem 0.5rem 0.5rem 2rem;" class="answerbox">{{ppmInfo.orderdesc}}</div>
                    <div v-else style="margin-bottom:3rem;"/>
                </div>
            </div>

            <div style="width: 20%" />
        </div>

        <!-- Part 7  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 7 | The facts</b>
                </div>

                <div style=" text-indent: 0px; display:inline; margin: 0rem 0.5rem 0.5rem 1rem; font-size: 9pt;">
                    8. The <b>facts</b> on which this application is based <b>are as follows:</b>
                    <i style="margin:0 0 0 2rem; display: block;font-size: 9pt;">
                        Provide a summary of the facts you want the court to consider. Include why you are
                        making the application and why the order you are requesting should be made.
                    </i>             
                    
                    <div v-if="ppmInfo.facts" style="margin: 0rem 0.5rem 0.5rem 2rem;"
                        class="answerbox">{{ppmInfo.facts}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                    <i style="margin: 0rem 0.5rem 0.5rem 2rem;">To add more, select the box below and attach a page with the additional information</i>
                    
                    <i style="margin: 0rem 0.5rem 0.5rem 2rem; display:inline-block">
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;" :check="''" text=""/> 
                        <b>Additional page(s) (see attached)</b>
                    </i>
                </div>
            </div>

            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        If you choose to, you can 
                        prepare an Affidavit – General 
                        in Form 45 to provide 
                        evidence in writing to support 
                        your application. 
                        You can also give spoken 
                        evidence in court. 
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:50px">
                    <p>
                        <b-icon-paperclip />
                        <br />
                        If you need more space, 
                        select the box, and remember 
                        to include your additional 
                        page(s).  
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 8  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width: 75%">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 8 | Existing orders and agreements</b>
                </div>
                <div style="display:flex; margin: 0rem 0.5rem 0.5rem 1rem; font-size: 9pt;">
                    9.
                    <div style="padding-left: 0.5rem; display: inline;">
                        There is an existing written agreement or court order about the child(ren) concerning
                        parenting arrangements, child support, contact with a child, or guardianship
                    </div>
                </div>
                <div style="margin:0.25rem 0 0 3rem;font-size: 9pt; text-indent: -16px;" >
                    <check-box boxMargin="0" style="display:inline-block; width:200px" :check="ppmInfo.ExistingCase?'yes':''"  text="<b>Yes</b> (see attached copy)"/>                        
                    <check-box boxMargin="0" style="display:inline-block;" :check="!ppmInfo.ExistingCase?'yes':''" text="<b>No</b>"/> 
                </div>
                <div style="display:flex; margin: 1rem 0.5rem 0.5rem 0.75rem; font-size: 9pt;">
                    10.
                    <div style="padding-left: 0.5rem; display: inline;">
                        I know the following <b>information about any court proceeding</b> that is pending or that
                        has been initiated about parenting arrangements, contact with a child, guardianship of
                        a child, or protection of a child who is the subject of this application:
                    </div>
                </div>
                <div style="padding-left: 2.25rem;">
                    <i style="display:inline-block; ">
                        If there is no pending or ongoing court proceeding, that you know of, in this court or
                        another court or jurisdiction, you may leave this section blank
                    </i>
                    <div v-if="ppmInfo.existingProceeding && ppmInfo.proceedingInfo" class="answerbox">{{ppmInfo.proceedingInfo}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </div>
            </div>

            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-paperclip />
                        <br />
                        If yes, you must attach a copy 
                        of any order, agreement or 
                        plan to this application for 
                        filing.  
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:10px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        Include any order (interim or 
                        final), agreement or plan from 
                        any level of court and any 
                        location.  
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 9  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width:75%">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 9 | Filing location</b>
                </div>
                <div style=" text-indent: 0px; display:inline; margin: 0rem 0.5rem 0.5rem 1rem; font-size: 9pt;">
                    11. I am filing this application <b>in the court registry:</b>
                    <i style="margin:0 0 0 2rem; display: block;font-size: 9pt;">Select only one of the options below</i>

                    <div style="margin-left:3rem; text-indent: -16px;">
                    <check-box  
                        :check="(filingLocationReason == 'Where my existing case with the same party/parties is located. I already have a court file number')?'yes':''" 
                        text="Where my <b>existing case</b> with the same party/parties is located. I already have a court file number."/> 
                    <check-box  
                        :check="(filingLocationReason == 'Closest to where the child lives most of the time, because my case involves a child-related issue')?'yes':''" 
                        text="Closest to <b>where the child lives</b> most of the time, because my case involves a child-related issue"/>          
                    <check-box  
                        :check="(filingLocationReason == 'Permitted by court order')?'yes':''" 
                        text="Permitted by <b>court order</b>"/>                    
                </div>
                </div>
            </div>
            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:10px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        A child protection case 
                        involving the director is 
                        different than a family law 
                        case.
                        <br/>
                        If you have an existing child 
                        protection case, a different 
                        court file number will be 
                        assigned for this family law 
                        case.  
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 10  -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 10 | Address for service</b>
                </div>
                <div style=" text-indent: 0px; display:inline; margin: 0rem 0.5rem 0.5rem 1rem; font-size: 9pt;">
                    12. My <b>address for service</b> of court documents and contact information is:
                    <i style="margin:0 0 0 2rem; display: block;font-size: 9pt;">
                        You must provide an address for service and contact number, but it does not have to be your own if you don’t want to
                    </i>
                    <table class="compactfullsize" style="margin: 0.5rem 0.5rem 0.5rem 1rem; font-size: 9pt; width:95%">
                        <tr style="border:1px solid #414142">
                            <td colspan="3">Address: <div class="answer">{{ yourInfo.address.street }} </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td>City: <div class="answer">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px">Province: <div class="answer">{{ yourInfo.address.state }}</div>
                            </td>
                            <td>Postal Code: <div class="answer">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td>Email: <div class="answer">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td colspan="2" style="padding-left:50px">Telephone: <div class="answer">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #414142">
                            <td v-if="yourInfo.lawyer" colspan="3">Lawyer’s name and firm name (if applicable): 
                                <div class="answer"> {{ yourInfo.lawyerName | getFullName }}</div>
                            </td>
                            <td v-else colspan="3">Lawyer’s name and firm name (if applicable): </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div style="width: 20%">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:10px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about 
                        how this information will be 
                        used and who will have 
                        access to it, see the 
                        guidebook.
                    </p>
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
import GreyBoxForm  from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType, otherPartyInfoType, noticeSurveyDataInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { priorityParentingInformationDataInfoType, priorityParentingOtherPartyDataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';
import { priorityParentingMatterOrderSurveyDataInfoType, ppmBackgroundDataSurveyDataInfoType, aboutPriorityParentingMatterOrderSurveyDataInfoType } from '@/types/Application/PriorityParentingMatter';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';

@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox        
    }
})

export default class Form15Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    
    
    dataReady = false;   
    
    otherPartyInfo: priorityParentingOtherPartyDataInfoType[] = [];
    additionalOtherParties: priorityParentingOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as priorityParentingOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    ppmInfo = {} as priorityParentingInformationDataInfoType;
    
    existingFileNumber = '';
    filingLocationReason = '';
    fmepNumber = '';
    
    childrenInfo: childrenInfoSurveyInfoType[] = [];

    childrenFields = [
        {key:"fullName",               label:"Child's full name",                          tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",        tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",               tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"The other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ]   

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

        if (this.result.ppmChildrenInfoSurvey?.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.yourInfo = this.getYourInfo();
        this.ppmInfo = this.getPpmInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
        this.fmepNumber = this.getFmepInfo(this.result.filingLocationSurvey);      

        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
    }     
    
    public getFmepInfo(locationData){
        return locationData?.ExistingFMEPCase  && locationData?.ExistingFMEPCase =='y' && locationData.ExistingFMEPNumber? locationData.ExistingFMEPNumber:'';        
    }
    
    public getChildrenInfo() {

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.ppmChildrenInfoSurvey;
       
        for (const child of childData) {            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date-mid')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: priorityParentingOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as priorityParentingOtherPartyDataInfoType;               

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
    
    public getPpmInfo() {

        const ppmInformation = {} as priorityParentingInformationDataInfoType;

        if (this.result.ppmBackgroundSurvey) {
            const ppmBackgroundData: ppmBackgroundDataSurveyDataInfoType = this.result.ppmBackgroundSurvey;
            ppmInformation.ExistingCase = (ppmBackgroundData.ExistingOrdersFLM == 'y');
            ppmInformation.existingProceeding = (ppmBackgroundData.existingCourtProceeding == 'y');
            ppmInformation.proceedingInfo = (ppmBackgroundData.existingCourtProceeding == 'y' && 
                                             ppmBackgroundData.existingCourtProceedingDetails)? ppmBackgroundData.existingCourtProceedingDetails:'';
        }

        if (this.result.aboutPriorityParentingMatterOrderSurvey) {
            const aboutPpmOrderData: aboutPriorityParentingMatterOrderSurveyDataInfoType = this.result.aboutPriorityParentingMatterOrderSurvey;
            ppmInformation.facts = aboutPpmOrderData.applicationFacts;
            ppmInformation.orderdesc = aboutPpmOrderData.orderDescription;
        }

        if (this.result.noticeSurvey) {
            const noticeData: noticeSurveyDataInfoType = this.result.noticeSurvey;
            ppmInformation.noticeType = noticeData.noticeType;
        }

        if(this.result.ppmQuestionnaireSurvey && this.result.priorityParentingMatterOrderSurvey) {
            const ppmType: string[] = this.result.ppmQuestionnaireSurvey;
            const ppmOrderData: priorityParentingMatterOrderSurveyDataInfoType = this.result.priorityParentingMatterOrderSurvey;
            ppmInformation.ppmList = [];
                 
            if ((ppmType.includes('medical')) && (ppmOrderData.delayMedicalRisk == 'y') && 
                (ppmOrderData.confirmMedicalRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('medical');
                }
            if ((ppmType.includes('passport')) && (ppmOrderData.delayPassportRisk == 'y') && 
                (ppmOrderData.confirmDelayPassportRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('passport');
                }
            if ((ppmType.includes('travel')) && (ppmOrderData.delayTravelRisk == 'y') && 
                (ppmOrderData.travelWrongfullyDenied == 'y') && 
                (ppmOrderData.confirmTravelWrongfullyDenied?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('travel');
                }
            if ((ppmType.includes('locationChange')) && (ppmOrderData.existingParentingArrangements == 'n') &&
                (ppmOrderData.impactOnRelationship == 'y') && 
                (ppmOrderData.confirmImpactOnRelationship?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('locationChange');   
                }
            if ((ppmType.includes('preventRemoval')) && (ppmOrderData.noReturnRisk == 'y') && 
                (ppmOrderData.confirmNoReturnRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('preventRemoval');   
                }
            if ((ppmType.includes('interjurisdictional')) && (ppmOrderData.childInBC == 'y') && 
                (ppmOrderData.harm == 'y') && (ppmOrderData.confirmHarm?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('interjurisdictional');      
                }
            if ((ppmType.includes('wrongfulRemoval')) && (ppmOrderData.wrongfulInBC == 'y') && 
                (ppmOrderData.confirmWrongfulInBC?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('wrongfulRemoval');   
                }
            if ((ppmType.includes('returnOfChild')) && (ppmOrderData.wrongfulReturn == 'y') && 
                (ppmOrderData.confirmWrongfulReturn?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('returnOfChild');
                }
            if ((ppmType.includes('childServices')) && (ppmOrderData.childRemoved == 'y') && 
                (ppmOrderData.confirmChildServices?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('childServices');
                }
        }
        return ppmInformation;
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

.container .checkmark {
    display: inline;
    position: absolute;
    border: 1px solid #000 !important;
    padding: 1rem;
    top: 0;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: #eee;
}
</style>