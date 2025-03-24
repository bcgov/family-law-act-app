<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size:13pt;"><b>Application for Order </b></div>
                <div style="font-size:13pt;"><b>Prohibiting the Relocation of a Child</b></div>
                <div style="font-size:10pt;"><b>FORM 16</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 80</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding-left:24px"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                        result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding-left:20px"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ?
                        existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding-left:14px;"> Document number:<br /><i style="color:#ababab">For registry use only </i>
                    </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>

        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <p>This Application for Order Prohibiting the Relocation of a Child sets out the details of an order
                    prohibiting the relocation of a child that a person is applying for under section 69 of the <i>Family
                        Law Act.</i> </p>
                <div style="border-style: dashed; border-color: black; padding:0.5rem; background: #909090;">
                    <b>Please read before completing the form:</b>
                    <ul>
                        <li>
                            This application is to be used only if a child’s guardian plans to relocate themselves, the
                            child, or both, and there is a written agreement or order respecting parenting arrangements or
                            contact with the child applies to the child [s. 65 <i>Family Law Act</i>].
                        </li>
                        <li>
                            If there is no written agreement or court order, you may apply for an order under s. 46 of the
                            <i>Family Law Act[changes to child’s residence if no agreement or order]</i> using an
                            Application
                            About a Priority Parenting Matter Form 15 or Application About a Family Law Matter Form 3 to
                            determine the parenting arrangements for the child including the location of the child’s
                            residence.
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
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        An application prohibiting the relocation of a child under s. 69 of the <i>Family Law Act</i> must
                        be filed
                        within 30 days after receiving written notice that the guardian plans to relocate the child [s. 68
                        <i>Family Law Act</i>].
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 1 -->

        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 1 | About the Parties</b>
                </div>

                <div
                    style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; ">
                        <b>1. </b>My <b>full name</b> is:
                    </div>
                    <GreyBoxForm style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="376px"
                        beforetext="" hint="Full name of party"  hintTextColor="hintTextColor" hintindent="150px" :italicHint="false" textBackgroundColor="#dedede"
                        hintMargin="152px" :text="yourInfo.name | getFullName" />

                    <div style="padding-top:15px; padding-left:12px;">
                        <div style="display: inline-block; ">
                            My <b> date of birth</b> is:
                        </div>
                        <GreyBoxForm style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="356px"
                            beforetext="" hint="(dd/mmm/yyyy)"  hintindent="140px" hintTextColor="hintTextColor" :italicHint="false" textBackgroundColor="#dedede"
                            hintMargin="152px" :text="yourInfo.dob | beautify-date-mid" />
                    </div>
                </div>

                <div
                    style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>2. </b>The <b>other party’s full name </b>is:
                    </div>
                    <GreyBoxForm style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="290px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px"
                        :text="firstOtherParty.name | getFullName" />

                    <div style="padding-top:10px; padding-left:12px;">
                        <div style="display: inline-block; ">
                            Their <b>date of birth</b>(dd/mmm/yyyy) is:
                        </div>
                        <GreyBoxForm style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="256px"
                            beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px"
                            :text="firstOtherParty.dob | beautify-date-mid" />
                       
                        <div>
                            
                        </div>
                        <div style="padding-top:5px">
                            <div v-if="additionalOtherParties.length > 0" style="font-size: 9pt;">
                                <div>
                            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                                :check="true ? 'yes' : ''" />
                            <div style="margin-top: -18px;text-indent: 20px;">
                                There is an additional party.
                            </div>
                            </div>

                                <div v-for="(otherParty, inx) in additionalOtherParties" :key="inx"
                                    :style="inx == 0 ? 'display:inline;' : 'text-indent:-5px;margin-top:1rem;'">
                                    <div style="display: inline-block;">
                                        The<b> additional party’s</b> full name is:
                                    </div>
                                    <GreyBoxForm  style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="270px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="80px" :text="otherParty.name | getFullName" />
                                    <div style="display: inline-block; padding-top:10px">
                                        Their<b> date of birth</b>(dd/mmm/yyyy) is:
                                    </div>
                                    <GreyBoxForm  style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="260px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="152px" :text="otherParty.dob | beautify-date-mid" />
                                </div>
                            </div>

                            <div v-else style="font-size: 9pt;">
                            <div>
                            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                                :check="false ? 'yes' : ''" />
                            <div style="margin-top: -18px;text-indent: 20px;">
                                There is an additional party.
                            </div>
                        </div>

                            <div>
                                <div style="display: inline-block;">
                                    The<b> additional party’s</b> full name is:
                                </div>
                                <GreyBoxForm  style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                        textwidth="270px" beforetext="" :italicHint="false" textBackgroundColor="#dedede"
                                        hintMargin="80px" text="" />
                                <div style="display: inline-block; padding-top:10px">
                                    Their<b> date of birth</b>(dd/mmm/yyyy) is:
                                </div>
                                <GreyBoxForm style="text-indent:4px;display:inline-block; font-size: 9pt;"
                                    textwidth="260px" beforetext="" :italicHint="false" 
                                    hintMargin="152px" text="" />
                            </div>
                       </div>

                        </div>
                    </div>

                </div>
            </div>

            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:120px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        The other party is any other parent or guardian of the child(ren).
                    </p>
                </div>
            </div>

        </div>

        <!-- Part 2-->
        <div style="margin-top: .5rem;"></div>
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 |Information about children</b>
                </div>
                <div
                    style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 0.5rem 0.5rem 0.5rem 0.5rem;">
                    <div style="display: inline-block;">
                        <b>3.</b> This application is about the following child(ren) that I am a guardian of:
                    </div>

                    <b-table :items="childrenInfo" :fields="childrenFields" class="mt-2" small>
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000; background-color:#dedede " >{{ data.value }}</div>
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                        </template>
                    </b-table>
                </div>
                <div style="padding-left:12px">
                    <b>4.</b> <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="true ? 'yes' : ''" />
                    <div style="margin-top: -16px;text-indent: 28px;">
                        I understand that I must consider the <b>best interests of the child</b> with respect to
                        each order I am asking the court to make about the child. The “best interests of the
                        child” is a legal test used to decide what would best protect the child’s physical,
                        psychological, and emotional safety, security and well-being <i>[Family Law Act s. 37]</i>.
                    </div>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:150px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about best interests of the child, see the guidebook.
                    </p>
                </div>
            </div>

        </div>

        <!-- Part 3  -->
        <div style="margin-top: 0.5rem;"></div>
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 3 |Notice of the application</b>
                </div>
                <div>
                    <b>5.</b> <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="true ? 'yes' : ''" />
                    <div style="margin-top: -18px;text-indent: 28px;">
                        I understand <b>I must give notice</b> of this application to each other party, including any other
                        person who may be directly affected by the order.
                    </div>
                    <div>
                        <b> To give notice, they must be served</b> with the application and supporting documents <b> at
                            least 7 days before</b> the date of the court appearance <b> unless </b>the court allows the
                        application to be made without notice or with less than 7 days’ notice
                    </div>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:30px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about serving court documents, see the guidebook.
                    </p>
                </div>
            </div>

        </div>

        <!-- Part 4 --> 
        <div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
                <div style="width:80%; margin-right: 10px;">
                    <div style="margin-top: 0.3rem;"></div>
                    <div style="background: #626262; color: white; font-size: 13pt;">
                        <b>Part 4 |About your court appearance</b>
                    </div>
                    <div style="text-indent:4px; font-weight:normal; font-size:9pt;"><i style="color:#ababab">For registry or
                            judicial case manager use only</i></div>
                    <div style="border:1px solid; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                        <b>The application, which requires a court apprearance, will be heard by the court</b>
                        <GreyBoxForm style="text-indent:2px;" textwidth="10rem"
                            beforetext="<b>on</b>" textafter="<b>at</b>" hint="date" hintMargin="25px" hintTextColor="hintTextColor" hintindent="50px" hintmargintop="12px" text="" marginTop="-8px" />
                        <GreyBoxForm style="text-indent:2px;" textwidth="10rem"
                            beforetext="<b>at</b>" hint="time" hintMargin="60px" hintindent="50px" hintmargintop="12px" hintTextColor="hintTextColor" text="" marginTop="-8px"/>
                        <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>

                        <div style="margin:1rem 0 0 0.25rem;">
                            <div>
                                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" />
                                <div style="margin-top: -18px;text-indent: 20px;">
                                    in person at
                                    <GreyBoxForm style="text-indent:2px;display:inline-block;" textwidth="20rem"
                                        beforetext="" hint="court location" hintTextColor="hintTextColor" hintMargin="60px" hintmargintop="12px" text="" marginTop="-8px"/>
                                </div>
                            </div>
                        </div>
                        <div style="margin:1rem 0 0 0.25rem; display:flex; flex-direction:row; gap:10px">
                            <div style="width:20%">
                                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;" />
                                <div style="margin-top: -18px;text-indent: 20px;">
                                    by another method of attendance, as specified
                                </div>
                            </div>
                            <div style="width:80%; padding-top:8px">
                                <div style="border:1px solid; font-size: 9pt; padding:0.5rem;">
                                    <b>Do not attend the courthouse in person.</b> The registry will send within 24 hours
                                    before
                                    the
                                    hearing date noted above the link to connect by MS Teams, including a dial-in
                                    conferencing
                                    number to be used by any party that is unable to use MS Teams or has problems with their
                                    video connection. If you have not provided your email address or telephone number to the
                                    registry on your Notice of Address Change (<a
                                        href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true"
                                        target="_blank">Form 46</a>), you
                                    must contact the
                                    registry to
                                    obtain the MS Teams conference information
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="border-style: dashed; border-color: black; margin-top: 10px;padding:0.5rem; background: #d6d6d6; ">
                        <b>NOTE TO THE OTHER PARTY:</b>
                        <div style="margin:0.2rem; font-size:9pt;">
                            <p>
                                <b> If you do not attend court</b> on the date and time scheduled for the court
                                appearance,the court may make an order in your absence.<br>
                                You may also choose to <b> file a
                                written response </b> in reply to the application in Form19 Written Response to
                                Application.
                            </p>
                        </div>
                        <div style="margin:-0.5rem 0 0 1rem; font-size: 9pt;"> The court must be satisfied that:

                            <ol class='resetcounteralpha' style="padding-left: 12px;">
                                <li>a) the proposed relocation is being made in good faith,</li>
                                <li>b) the relocating guardian has proposed reasonable and workable
                                    arrangements to preserve the relationship between the child and the child’s other guardians,
                                    persons who are entitled to contact with the child, and other persons who have a
                                    significant role in the child’s life, and</li>
                                <li>c) the relocation is in the best interests of the child.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div style="width: 20% ">
                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
                        <p>
                            <b-icon-info-circle-fill />
                            <br />
                            The registry or judicial case manager will work with you to schedule a date for the court
                            appearance
                            and will fill in the actual date and method of attendance on the form. Be prepared to talk about
                            your availability if there are options for dates.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Part 5 -->

            <div style="margin-top: 1rem;"></div>
            <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
                <div style="width:80%; margin-right: 10px;">
                    <div style="margin-top: 0.3rem;"></div>
                    <div style="background: #626262; color: white; font-size: 13pt;">
                        <b>Part 5 |About the order</b>
                    </div>
                    <div>
                        <b style="padding-right:3px">6.</b>
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                            :check="true ? 'yes' : ''" />
                        <div style="margin-top: -18px;text-indent: 30px;">
                            I am applying for an order to prohibit the relocation of a child or children.
                        </div>
                    </div>
                    <div style="padding-top:12px">
                        <b style="padding-right:3px">7.</b>
                        <check-box inline="inline" boxMargin="0"
                            style="display:inline; font-size: 9pt; text-indent: -16px; "
                            :check="relocInfo.existingOrder ? 'yes' : ''" />
                        <div style="margin-top: -18px;text-indent: 30px;">
                            There is a written agreement or order respecting parenting arrangements referred 
                            
                            <GreyBoxForm style="display:inline" textwidth="8rem" beforetext=" to in section 65 of the <i>Family Law Act</i> made on" aftertext=""
                               marginTop="-10px" hint="Date (dd/mmm/yyyy)" hintindent="10px" hintTextColor="hintTextColor" hintmargintop="10px" :italicHint="false" 
                                :text="relocInfo.existingOrderDate | beautify-date-mid " />
                                <div style="padding-top: 12px;;">
                              that applies to the child(ren) that are the subject of this application <br> <i style="color: #ababab; padding-left: 32px;">(see attached copy of agreement or order).</i>
                                </div>
                                
                        </div>
                    </div>

                    <div>
                        <div>
                            <b>8.</b>
                            <div style="margin:0 0 0 0.5rem; display: inline; font-size: 9pt;"><i>Select only one of the
                                    options
                                    below and complete the required information</i></div>
                            <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                                <check-box inline="inline" boxMargin="0"
                                    style="display:inline; font-size: 9pt; text-indent: -16px;"
                                    :check="relocInfo.receivedNotice ? 'yes' : ''" />
                                <div style="margin-top: -18px;text-indent: 22px;">
                                    Notice of relocation was given to me on
                                    <GreyBoxForm style="margin:0 0 0.5rem 0rem;text-indent:2px;display:inline-block"
                                        textwidth="8rem" beforetext="" aftertext="" hint="Date (dd/mmm/yyyy)" hintindent="30px"
                                        :italicHint="false" :text="relocInfo.noticeDate | beautify-date-mid" />
                                        <i style="color:#ababab; padding-left: 3px;">(see attached copy)</i>
                                </div>
                            </div>
                            <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                                <check-box inline="inline" boxMargin="0"
                                    style="display:inline; font-size: 9pt; text-indent: -16px;"
                                    :check="!relocInfo.receivedNotice ? 'yes' : ''" text="" />
                                <div style="margin-top: -18px;text-indent: 22px;">
                                    <span>I did not receive written notice of relocation but became aware of the planned</span>
                                    <GreyBoxForm style="margin-left:1.5rem; text-indent:0px; "
                                        textwidth="5.7rem"
                                        beforetext="relocation on"
                                        aftertext="." hint="Date (dd/mmm/yyyy)" hintindent="10px"  hintTextColor="hintTextColor" :italicHint="false" hintmargintop="12px" marginTop="-8px"
                                        :text="relocInfo.foundOutDate | beautify-date-mid" />
                                </div>
                                <div style="margin:1.5rem 0 0 1rem;  font-size: 9pt;">
                                    <GreyBoxForm style="margin-left:0.35rem; display:inline" textwidth="6rem"
                                        beforetext="I understand the date of the relocation of the child(ren) to be"
                                        hint="Date (dd/mmm/yyyy)" hintindent="10px"  hintTextColor="hintTextColor" :italicHint="false" hintmargintop="12px"  marginTop="-8px"
                                        :text="relocInfo.presumedRelocationDate | beautify-date-mid" />
                                    <GreyBoxForm style="margin:0 0 0 0.35rem; text-indent:5px;display:inline"
                                        :textwidth="relocInfo.presumedLocation.length < 22 ? '9rem' : '22rem'"
                                        beforetext="to" aftertext="." hint="Location"  hintTextColor="hintTextColor" hintindent="10px" :italicHint="false" hintmargintop="12px" marginTop="-8px"
                                        :text="relocInfo.presumedLocation" />
                                </div>
                                <div style="text-indent:10px; margin:1rem 0 0 0.65rem; font-size: 9pt;">
                                    I learned about the planned relocation:
                                </div>
                                <i style="padding-left:12px; display: block; font-size: 9pt; color: #ababab;">Briefly
                                    explain how you found out about the planned relocation if you did not receive written
                                    notice</i>
                                <GreyBoxForm v-if="!relocInfo.receivedNotice && relocInfo.foundOutDescription"
                                    style="margin-top:10px; padding-left:12px; text-indent:0rem" textwidth="35rem"
                                    :text="relocInfo.foundOutDescription">

                                </GreyBoxForm>
                                <GreyBoxForm v-else style="margin-top:10px; padding-left:12px; text-indent:0rem" textwidth="30rem">
                                </GreyBoxForm>

                            </div>
                        </div>
                    </div>
                </div>

                <div style="width: 20% ">
                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:-30px">
                        <p>
                            <b-icon-info-circle-fill />
                            <br />
                            You can make an application under s. 69 of the F<i>Family Law Act</i> only if there is an
                            existing
                            written
                            agreement or court order about parenting arrangements [s. 65 <i>Family Law Act</i>].
                        </p>
                    </div>

                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:20px">
                        <p>
                            <b-icon-paperclip />
                            <br />
                            You must attach a copy of the agreement or order to this application for filing.
                        </p>
                    </div>

                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:20px">
                        <p>
                            <b-icon-paperclip />
                            <br />
                            ou must attach a copy of the notice of relocation, if applicable, to this application for
                            filing.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- INFORMATION ABOUT YOUR APPEARANCE -->
        <div style="page-break-after:always;">&nbsp;</div>
        <div>
            <div style="margin-top: 1rem;"></div>
            <div style="text-align: justify; font-size:11px;">
                <p style="text-align: center; font-size: 14px;"> <b>IMPORTANT INFORMATION ABOUT YOUR APPEARANCE</b></p>
                <div style="padding-top: 12px;">
                    <b>What do parties need to know about attending by another method other than in person? </b>
                    <p style="padding-top:8px">
                        If your notice indicates that you are to attend by another method of attendance, parties, including
                        the
                        judge, will attend
                        using the Microsoft Teams audio- and video-conferencing (video) platform. <b>Do not attend the
                            courthouse in person.</b>
                        Parties will receive remote MS Teams appearance details within 24 hours prior to the appearance,
                        this
                        notification is
                        sent to you by email
                    </p>
                    <p>
                        Microsoft Teams allows participants to join the conference using video or audio from a desktop,
                        laptop,
                        tablet, or
                        smartphone, or to dial-in to a proceeding from a telephone. <b>If you are appearing by video,</b>
                        please
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
                        parties.
                    </p>
                    <div>
                        <p style=" font-size: 13px;"> <b>Preparing for your Family Court Appearance</b></p>
                        <p><b>Legal Aid BC - Family Law Legal Advice</b> </p>
                        <p>
                            If you do not have a lawyer for your family law matter, visit <a
                                href="https://www.familylawinbc.ca/court-notices"
                                target="_blank">https://www.familylawinbc.ca/court-notices</a> to
                            find out about <b>free in person and remote legal advice services </b> that you may be eligible
                            for
                            that can help you prepare for your court date.Contact the advice services at least three weeks
                            before your court date
                            or as soon as you receive
                            this notice.If you are unable to access the internet, contact the Family Law LINE at
                            604-408-2172
                            in
                            Greater Vancouver or 1-866-577-2525 elsewhere in BC.
                        </p>
                    </div>
                    <div>
                        <p><b>Family Justice Services</b></p>
                        <p>Family justice counsellors provide services to British Columbians going through separation and
                            divorce and are specially trained to help families resolve their issues about guardianship,
                            parenting arrangements, contact and support. There is no charge for their services.
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
                            express their views and preferences, and who can instruct a lawyer.
                        </p>
                        <p>For more information: <a href="https://scyofbc.org/child-youth-legal-centre/"
                                target="_blank">https://scyofbc.org/child-youth-legal-centre/</a> </p>
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
                            <b>Before the scheduled hearing date, </b>please visit the Provincial Court website at
                            <a href="https://www.provincialcourt.bc.ca/"
                                target="_blank">https://www.provincialcourt.bc.ca</a>
                            and review:
                        <ul>
                            <li>
                                <i>Policy on Use of Electronic Devices in Courtrooms and Access to Court Proceedings
                                    Policy</i>
                                (there
                                is a general prohibition on the recording or broadcasting of court proceedings unless
                                authorized
                                by the Court and there are penalties for breach)
                            </li>
                            <li><i>NP 21 Remote Attendance in the Provincial Court</i> (for etiquette and directions on
                                connecting
                                by
                                another method of attendance) (counsel attendance requirements when attending Family matters
                                remotely)
                            </li>
                            <li>
                                <i> NP 24 Form of Address for Parties and Lawyers </i>(provide the judge or justice with
                                each
                                person’s
                                name, title (e.g.
                                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
                            </li>
                            <li>
                                <i>Guide for Appearing in the Provincial Court using MS Teams</i>
                            </li>
                            <li>
                                <i>eNews</i> - What to expect at a family management conference?
                            </li>
                        </ul>
                        </p>
                        <p>
                            <b>If you are unable to dial-in or are dropped from the appearance</b> immediately call the
                            court
                            registry.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Part 6 -->
        
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 6 | Best interests of the child</b>
                </div>
                <div>
                    <b style="padding-right:3px">9.</b>
                    <div style="display: inline; font-size: 9pt;">
                    I believe it is in the best interests of the child(ren) to prohibit the proposed relocation because:
                    </div>

                    <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">
                                <span v-if="relocInfo.childBestInterestReason">
                                    {{relocInfo.childBestInterestReason}}
                                </span>
                            </div>

                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:30px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        To determine what is in the best interests of a child, all of the child’s needs and circumstances
                        must be considered including the factors set out in s. 37 of the <i>Family Law Act</i>.<br> 
                        The parties and the court must consider the best interests of a child when making a decision about contact with a child.
                        For more information, see the guidebook.
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 7 -->

        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 7 | Filling location</b>
                </div>

                <div>
                    <b style="padding-right:3px">10.</b>
                    <div style="display:inline; margin:0 0 0 0.25rem">I am filing this application <b>in the court
                            registry:</b></div>
                    <div style="margin-left:1rem;">
                        <i style="color:#ababab">Select only one of the options below</i>
                        <div style="padding-left:20px;">
                            <check-box style="text-indent:-16px"
                                :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed') ? 'yes' : ''"
                                text="" />
                            <div style="margin-top: -18px;text-indent: 3px;">
                                Where my <b>existing case</b> with the same party/parties is located. I already have a court
                                file number.
                            </div>

                            <check-box style="text-indent:-16px"
                                :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue') ? 'yes' : ''" />
                            <div style="margin-top: -18px;text-indent: 3px;">
                                Closest to <b> where the child lives</b> most of the time, because my case involves a
                                child-related issue
                            </div>
                            <check-box style="text-indent:-16px"
                                :check="(filingLocationReason == 'The court made an order that allows me to') ? 'yes' : ''" />
                            <div style="margin-top: -18px;text-indent: px;">
                                Permitted by <b>court order</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Part 8 -->
        <div style="margin-top: 1rem;"></div>
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="width:80%; margin-right: 10px;">
                <div style="margin-top: 0.3rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 8 | Address for service</b>
                </div>
                <b style="padding-right:3px">11.</b>
                <div style="margin:0 0 0 0.4rem; display: inline; font-size: 9pt;">
                    My <b>address for service </b>of court documents and contact information is:
                </div>
                <div style="margin-left:2rem;">
                    <i style="color:#ababab">You must provide an address for service and contact number, but it does not have to be your own if
                        you don’t want to</i>
                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color:#dedede">
                                    {{ yourInfo.address.street }} </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">
                                City: <div class="answer" style="background-color:#dedede">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color:#dedede">{{ yourInfo.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color:#dedede">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                       
                    </table>
                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:2px solid #fff">
                        <td style="border:2px solid #fff">Email: <div class="answer" style="background-color: #d6d6d6;">{{yourInfo.contact.email }}</div>
                        </td>
                        <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                        </td>
                    </tr>
                   </table>
                   <div style="margin-top: 0.5rem;"></div>
            
            <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; font-size: 9pt; background-color: #dedede;">
                <tr style="border:1px solid #fff;">
                    <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer’s name and firm name (if applicable): 
                        <div class="answer" style="background-color: #d6d6d6;">
                            {{ yourInfo.lawyerName | getFullName}}
                        </div>
                    </td>
                    <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable):</td>
                </tr>
            </table>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:50px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about how this information will be used and who will have access to it, see the
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
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { relocationOfChildInformationDataInfoType, relocationOfChildOtherPartyDataInfoType } from '@/types/Application/RelocationOfChild/PDF';
import { relocChildrenInfoDataInfoType, relocQuestionnaireSurveyDataInfoType, relocChildBestInterestSurveyDataInfoType } from '@/types/Application/RelocationOfChild';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";


@Component({
    components: {
        UnderlineForm,
        CheckBox,
        OrderedCheckBox,
        GreyBoxForm

    }
})

export default class Form16Layout extends Vue {

    @Prop({ required: true })
    result!: any;

    @applicationState.State
    public applicantName!: nameInfoType;
    dataReady = false;
    otherPartyInfo: relocationOfChildOtherPartyDataInfoType[] = [];
    additionalOtherParties: relocationOfChildOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as relocationOfChildOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    relocInfo = {} as relocationOfChildInformationDataInfoType;

    hintFontSize = "8pt"
    hintTextColor = "#333"

    existingFileNumber = '';
    filingLocationReason = '';
    childrenInfo = [{ fullName: '', dob: '', currentSituation: '' }];

    childrenFields = [
        { key: "fullName", label: "Child's full name", tdClass: "text-center align-middle", thClass: "text-center align-middle", thStyle: "font-size:10pt; width:25%; font-weight: bold; border: none; border-bottom: 2px solid #333; padding-left: 16px;" },
        { key: "dob", label: "Child's date of birth (dd/mmm/yyyy)", tdClass: "text-center align-middle", thClass: "text-center align-middle", thStyle: "font-size:10pt; width:16%; font-weight: bold; border: none; border-bottom: 2px solid #333; padding-left: 16px;" },
        { key: "currentSituation", label: "Child is currently living with", tdClass: " text-center align-middle", thClass: "text-center align-middle", thStyle: "font-size:10pt; width:18%; font-weight: bold; border: none; border-bottom: 2px solid #333; padding-left: 16px;" },
    ]

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {

        this.otherPartyInfo = this.getOtherPartyInfo()
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0, 1)
            this.additionalOtherParties = this.otherPartyInfo;
        }

        if (this.result.relocChildrenInfoSurvey?.length > 0) {
            this.childrenInfo = this.getChildrenInfo();
        }

        this.yourInfo = this.getYourInfo();
        this.relocInfo = this.getRelocInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);

        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason) {
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
    }

    public getChildrenInfo() {

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: relocChildrenInfoDataInfoType[] = this.result.relocChildrenInfoSurvey;

        for (const child of childData) {
            childInfo = {} as childrenInfoSurveyInfoType;
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date-mid')(child.dob);
            childInfo.currentSituation = child.currentLiving;
            childrenInfo.push(childInfo)
        }

        return childrenInfo;
    }

    public getYourInfo() {

        if (this.result?.yourInformationSurvey) {
            return getYourInformationResults(this.result?.yourInformationSurvey);
        }
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo() {

        let OpInformation: relocationOfChildOtherPartyDataInfoType[] = [];

        if (this.result.otherPartyCommonSurvey?.length > 0) {
            OpInformation = [];

            const otherPartyData: otherPartyInfoType[] = this.result.otherPartyCommonSurvey;

            for (const party of otherPartyData) {
                const otherParty = {} as relocationOfChildOtherPartyDataInfoType;

                if (party.knowDob == 'y' && party.dob)
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

    public getRelocInfo() {

        const relocInformation = {} as relocationOfChildInformationDataInfoType;

        if (this.result.relocQuestionnaireSurvey) {

            const relocationQuestionnaireData: relocQuestionnaireSurveyDataInfoType = this.result.relocQuestionnaireSurvey;

            relocInformation.existingOrder = (relocationQuestionnaireData.ExistingParentingArrangements == 'y');
            relocInformation.existingOrderDate = (relocationQuestionnaireData.ExistingParentingArrangements == 'y' &&
                relocationQuestionnaireData.orderDate) ? relocationQuestionnaireData.orderDate : ']';
            relocInformation.receivedNotice = (relocationQuestionnaireData.receiveNotice == 'y');
            relocInformation.noticeDate = (relocationQuestionnaireData.receiveNotice == 'y' &&
                relocationQuestionnaireData.noticeDate) ? relocationQuestionnaireData.noticeDate : '';
            relocInformation.foundOutDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                relocationQuestionnaireData.foundOutDate) ? relocationQuestionnaireData.foundOutDate : '';
            relocInformation.foundOutDescription = (relocationQuestionnaireData.receiveNotice == 'n' &&
                relocationQuestionnaireData.foundOutAboutRelocationDescription) ? relocationQuestionnaireData.foundOutAboutRelocationDescription : '';
            relocInformation.impactOnChild = (relocationQuestionnaireData.impactOnChild == 'y');
            relocInformation.presumedRelocationDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                relocationQuestionnaireData.relocationDate) ? relocationQuestionnaireData.relocationDate : '';
            relocInformation.presumedLocation = (relocationQuestionnaireData.receiveNotice == 'n' &&
                relocationQuestionnaireData.childProposedLocation) ? relocationQuestionnaireData.childProposedLocation : '';

        }

        if (this.result.relocChildBestInterestInfoSurvey) {

            const relocChildBestInterest: relocChildBestInterestSurveyDataInfoType = this.result.relocChildBestInterestInfoSurvey;
            relocInformation.childBestInterestAcknowledgement = relocChildBestInterest.childBestInterestAcknowledgement.includes('I understand');
            relocInformation.childBestInterestReason = relocChildBestInterest.childBestInterestDescription;
        }

        return relocInformation;
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
    border: 1px solid #000 !important;
    padding: 1rem;
    top: 0;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: #eee;
}
</style>