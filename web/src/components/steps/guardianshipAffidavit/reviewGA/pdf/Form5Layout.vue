<template>
    <div v-if="dataReady">
        
        <!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size:13pt;"><b>Guardianship Affidavit</b></div>
                <div style="font-size:12pt;"><b>Form 5</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 26, 51, 172</div>
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
                    <div style="float: left; width: 50%; padding: 2px;"> Last name of parties: <div
                            style="font-size: 6pt; padding-left:16px;">Party 1/ Party 2</div>
                    </div>
                    <!-- todo: add party question to workflow -->
                    <!-- <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ fmepNumber ? fmepNumber : '&nbsp;' }} </div> -->
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number: <div
                            style="font-size: 6pt; padding-left:16px;">For registry use only</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <p>This Guardianship Affidavit provides evidence to the court respecting the best interests of the 
                    child in support of an application for guardianship of a child as required under section 51 of 
                    the <i>Family Law Act</i> and Rule 26.
                </p>
                <div style="border-style: dashed; border-color: black; padding:0.5rem; background: #909090;">
                    <b>Please read before completing the form:</b>
                    <ul>
                        <li>
                            You must complete the main part of this application and any applicable schedule for your application identified in Part 5 of the main application.
                        </li>
                        <li>
                            For guidance filling in this form, including how to complete the record checks, please
                            read the guidebook. The guide is available from your local court registry or online at
                            <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms" target="_blank">www.gov.bc.ca/court-forms</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox style="margin-top:75px;">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        The record checks must be 
                        dated within 60 days of the 
                        date you will file the affidavit. 
                        If you are past 60 days, you 
                        will need to request a new 
                        record check [Rule 26].
                    </p>
                </NoteBox>
            </div>
        </div>

        <!-- Part 1 -->
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
            <div style="width: 80%; margin-right: 10px;">
                <grey-box-form entryFontSize="9pt" marginTop="-12px" style="text-indent:2px;display:inline-block;" textwidth="10rem"
                    hintindent="45px" hintmargintop="4px" beforetext="<b>I,</b>" hint="Full name" :text="yourInfo.name | getFullName" />
                
                <grey-box-form entryFontSize="9pt" marginTop="-12px" style="text-indent:2px;display:inline-block;" textwidth="10rem"
                    hintindent="25px" beforetext="," hintmargintop="4px" hint="Occupation" :text="yourInfo.occupation" />

                    <div style="margin-top: 1.25rem;"/>
                <div style="text-indent:5px;display:inline; font-size: 10pt;"> 
                    of
                </div>

                <grey-box-form entryFontSize="9pt" marginTop="-12px" style="text-indent:2px;display:inline-block;" textwidth="25rem"
                    hintindent="60px" beforetext="" hintmargintop="4px" hint="Address of party, City, Province" :text="address" />
                <div style="text-indent:5px;display:inline; font-size: 10pt;"> 
                    ,
                </div>
                <div style="text-indent:5px;display:block; font-size: 10pt; margin-top: 2rem;"> 
                    <b>SWEAR OR AFFIRM THAT:</b>
                </div> 
                <div style="display:block; font-size: 10pt; margin: 0rem 0 0 5px; font-weight: 700;"> 
                    I know or believe the following facts to be true. If these facts are based on information 
                    from others, I believe that information to be true.
                </div>
            </div>
            <div style="width: 20% ">
                <NoteBox style="margin-top: 40px;">
                    <b-icon-book />
                    <p>
                        For more information about 
                        swearing or affirming an 
                        affidavit, see the guidebook. 
                    </p>
                </NoteBox>
            </div>
        </div>

    <!-- <1> -->        
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        About the child(ren)
                    </p>
                </div>
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>1. </b> 
                    I am applying under the <i>Family Law Act</i> <b>to become a guardian of the following child(ren)</b>:
                    <br />
                </div>
                
                <b-table
                    :items="childrenInfo"
                    :fields="childFields"
                    class="mt-2"
                    style="margin-left: 1rem; width:97%;"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="min-height:1rem; font-size:8pt; color:#000;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                        </template>
                </b-table> 
            </div>
            <div style="width: 20% ">
                <NoteBox style="margin-top: 40px;">
                    <b-icon-book />
                    <p>
                        For more information about 
                        who is a child’s guardian, 
                        including when a parent is not 
                        a guardian, see the 
                        guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div class="print-block">
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>2. </b> 
                <grey-box-form style="display:inline;text-indent:2px;" textwidth="15rem" beforetext="My date of birth is" hintindent="90px" hint="(dd/mmm/yyyy)" :italicHint="false" :text="yourInfo.dob"/>
                <br />
            </div>
        </div>

        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>3. </b> 
                    The nature and length of <b>my relationship with the child(ren)</b> referred to in paragraph 1 of this affidavit is as follows:
                    <br />
                </div>
                
                <b-table
                    :items="childrenInfo"
                    :fields="childRelationshipFields"
                    class="mt-2"
                    style="margin-left: 1rem; width:97%;"
                    small
                    bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(relationWithchild)>
                        Nature of relationship with child <i style="font-size:7pt; font-weight:normal;"><br/>(Specify whether parent, step-parent, grandparent, aunt, uncle, family friend, etc.)</i>
                    </template>
            </b-table>  
            </div>
            <div style="width: 20% ">
                <NoteBox style="margin-top:-20px">
                    <b-icon-info-circle-fill />
                    <p>
                        You may provide only the first 
                        name of the child for the rest 
                        of the questions that ask for 
                        the name of a child referred to 
                        in paragraph 1. <br/>
                        You may state “since birth” in 
                        the last column instead of 
                        putting the specific length, if 
                        applicable.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>4. </b> 
                    The current living arrangements of the child(ren) referred to in paragraph 1 of this affidavit are as follows:
                    <br />
                </div>
                <b-table
                    :items="childrenInfo"
                    :fields="childLivingArrangementFields"
                    class="mt-2"
                    small
                    style="margin-left: 1rem; width:97%;"
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>
            </div>
            <div style="width: 20% ">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Briefly explain where and with whom the child is living right now.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>5. </b> 
                    I plan to care for the child(ren) referred to in paragraph 1 of this affidavit as follows:
                    <br />
                    <i>Set out detailed plans for how the child(ren) is/are to be cared for</i>
                </div>
                <div style="margin-left: 1rem;">
                    <div v-if="careDetails.length>0" class="answerbox" style="margin-left: 1rem; background-color: #dedede">{{careDetails}}</div>
                    <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"></div> 
                </div> 
            </div>
            <div style="width: 20% ">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        A guardian must exercise 
                        parental responsibilities in the 
                        best interests of the child [s. 
                        43 <i>Family Law Act</i>]. S. 41 of 
                        the <i>Family Law Act</i> lists the 
                        parental responsibilities with 
                        respect to a child which a 
                        guardian may exercise in their 
                        care for the child.

                    </p>
                </NoteBox>
            </div>
        </div>

        <!-- <2> -->
        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        Incidents of family violence
                    </p>
                </div>
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>6. </b>
                    <i>Select whichever option is correct</i>
                </div>
                <div style="margin:0 0 0 3rem;">
                    <check-box style="text-indent: -16px" 
                        :check="!familyViolenceExists?'yes':''" 
                        text="<b>I am not aware</b> of any <b>incidents of family violence</b>, as that term is defined in section 1 of the <i>Family Law Act</i>, that affect the
                            child(ren) referred to in paragraph 1 of this affidavit."/> 
                    <check-box 
                        style="text-indent: -16px" 
                        :check="familyViolenceExists?'yes':''" 
                        text="<b>I am aware</b> of the <b>following incidents of family violence</b>, as that term is defined in section 1 of the <i>Family Law Act</i>, that affect
                            the child(ren) referred to in paragraph 1 of this affidavit:<br><i>Describe the incidents of family violence of which you are aware</i>"/>
                    <div v-if="familyViolenceExists" class="answerbox">{{ familyViolenceDesc }}</div>
                    <div v-else style="margin-bottom:3rem; min-height:35px; background-color: #dedede"></div> 
                </div>
                </div>
            <div style="width: 20% ">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Family violence is defined in 
                        s. 1 of the <i>Family Law Act</i>. In
                        the case of a child, family
                        violence includes, with or
                        without an intent to harm a
                        family member, direct or
                        indirect exposure to family
                        violence. <br/>
                        To determine what is in the 
                        best interests of a child, s. 37 
                        (2) (g) requires you to
                        consider the impact of any
                        family violence on the child’s
                        safety, security or well-being,
                        whether the family violence is
                        directed toward the child or
                        another family member.
                    </p>
                </NoteBox>
            </div>
        </div>

        <!-- <3> -->
        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        Other children
                    </p>
                </div>
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>7. </b>
                    <i>Select whichever option is correct</i>
                </div>
                <div style="margin:0 0 0 3rem;">
                    <check-box style="text-indent: -16px;" 
                        :check="!otherChildrenExist?'yes':''" 
                        text="I am <b>not a parent, step-parent or guardian of any children except</b> that child/those children referred to in paragraph 1 of this
                            affidavit."/> 
                    <check-box  style="text-indent: -16px;" 
                        :check="otherChildrenExist?'yes':''" 
                        text="I am <b>the parent, step-parent or guardian of the following child(ren)</b> who is/are not referred to in paragraph 1 of this affidavit."/>
                </div>
                <b-table
                    :items="otherChildrenInfo"
                    :fields="otherChildrenFields"
                    class="mt-2"
                    style="margin-left: 3rem; width:90%;"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>
                        </template>
                        
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(dd/mm/yyyy)</i>
                        </template>
                        <template v-slot:head(relation)>
                            Nature of relationship with child <i style="font-size:7pt; font-weight:normal;"><br/>(Specify whether parent, step-parent, grandparent, aunt, uncle, family friend, etc.)</i>
                        </template>
                </b-table>  
                </div>
            <div style="width: 20% "/>
        </div>

        <!-- <4> -->
        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        Involvement in court proceedings
                    </p>
                </div>
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>8. </b>
                    <i>Select whichever option is correct</i>
                </div>
                <div style="margin:0 0 0 3rem;">
                    <check-box style="text-indent: -16px;" 
                        :check="!courtProceedingsExist?'yes':''" 
                        text="I have <b>not been involved in court proceedings</b> in British Columbia under the
                            <i>Child, Family and Community Service Act</i>, the <i>Family Relations Act</i>, the <i>Family
                            Law Act</i>, or the <i>Divorce Act (Canada)</i>, or in any court proceedings under
                            comparable legislation in any other jurisdiction, concerning children under my
                            care"/> 
                    <check-box  style="text-indent: -16px;" 
                        :check="courtProceedingsExist?'yes':''" 
                        text="I have <b>been involved in the following court proceedings</b> in British Columbia
                            under the <i>Child, Family and Community Service Act</i>, the <i>Family Relations Act</i>,
                            the <i>Family Law Act</i>, or the <i>Divorce Act (Canada)</i>, and/or in the following court
                            proceedings under comparable legislation in any other jurisdiction, concerning
                            children under my care:"/>
                </div>
                <div v-if="courtProceedingsExist">
                    <b-table
                        :items="civilProceedingInfo"
                        :fields="proceedingFields"
                        class="mt-2"
                        style="margin-left: 3rem; width:90%;"
                        small
                        bordered>  
                            <template v-slot:cell(courtOrderDates)="data">
                                <div v-for="(orderDate,inx) in data.value" :key="inx" style="list-style-type: none;">
                                    {{ orderDate }}
                                </div>
                            </template>                  
                            <template v-slot:cell()="data">
                                <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                            </template>
                    </b-table>
                </div>
                <div v-else>
                    <b-table
                        :items="[{ itemNo: 1 },{ itemNo: 2 },{ itemNo: 3 }]"
                        :fields="proceedingFields"
                        class="mt-2"
                        style="margin-left: 3rem; width:90%;"
                        small
                        bordered>
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                    </b-table>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Court proceedings may be in 
                        Provincial Court or Supreme 
                        Court, including divorce or 
                        family law proceedings, or 
                        child protection.<br/>
                        Include any family proceeding 
                        (including divorce) where 
                        there were children of the 
                        marriage even if the children 
                        weren’t the subject of any 
                        contested proceeding.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="margin-left: 2rem; padding-left: 10px;">
                    <p>The orders referred to in the table above are attached as Exhibits to this affidavit as follows:</p>
                    <div v-if="courtProceedingsExist">
                        <div v-for="(exhibit, index) in orderList" :key="exhibit.exhibitIndex" style="margin:1rem 0 0 0;">
                            <!-- Use character codes to help convert the index to a,b,c etc... -->
                            ({{ String.fromCharCode(97 + index) }})                   
                            <grey-box-form
                                style="text-indent:0;margin-left:.75rem;display:inline-block;" 
                                textwidth="6rem" 
                                beforetext="The order dated" 
                                entryFontSize="9pt"
                                marginTop="-17px"
                                hint="(dd/mm/yyyy)" 
                                hintindent="20px"
                                :text="exhibit.fileDate | beautify-date-mid"/>
                            <grey-box-form
                                style="text-indent:1px;display:inline-block;" 
                                textwidth="3rem" 
                                beforetext="referred to in Item" 
                                entryFontSize="9pt"
                                marginTop="-17px"
                                hint="(1, 2, etc.)" 
                                hintindent="5px"
                                :text="exhibit.itemNo"/> 
                                <div style="margin-top: 0.5rem;"/>
                            <grey-box-form
                                style="text-indent:7px;display:inline-block;" 
                                textwidth="3rem" 
                                beforetext="above is attached as Exhibit" 
                                entryFontSize="9pt"
                                marginTop="-15px"
                                hint="(A, B, etc.)" 
                                hintindent="0px"
                                :text="exhibit.exhibitName.replace('Exhibit ', '')"/>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="n in 3" style="margin:1rem 0 0 0;">
                            <!-- Use character codes to help convert the index to a,b,c etc... -->
                            ({{ String.fromCharCode(96 + n) }})                   
                            <grey-box-form
                                style="text-indent:0;margin-left:.75rem;display:inline-block;" 
                                textwidth="6rem" 
                                beforetext="The order dated" 
                                entryFontSize="9pt"
                                marginTop="-17px"
                                hint="(dd/mm/yyyy)" 
                                hintindent="20px"
                                text=''/>
                            <grey-box-form
                                style="text-indent:1px;display:inline-block;" 
                                textwidth="3rem" 
                                beforetext="referred to in Item" 
                                entryFontSize="9pt"
                                marginTop="-17px"
                                hint="(1, 2, etc.)" 
                                hintindent="5px"
                                text=''/> 
                                <div style="margin-top: 0.5rem;"/>
                            <grey-box-form
                                style="text-indent:15px;display:inline-block;" 
                                textwidth="3rem" 
                                beforetext="above is attached as Exhibit" 
                                entryFontSize="9pt"
                                marginTop="-17px"
                                hint="(A, B, etc.)" 
                                hintindent="-8px"
                                text=''/>
                        </div>
                    </div>
                </div>   
            </div>
            <div style="width: 20% ">
                <NoteBox>
                    <b-icon-paperclip />
                    <p>
                        You must attach a copy of 
                        each order as an exhibit to 
                        this affidavit for filing. 
                    </p>
                </NoteBox>
                <NoteBox style="margin-top:10px">
                    <b-icon-book />
                    <p>
                        For more information about 
                        how to reference and attach 
                        exhibits, see the guidebook
                    </p>
                </NoteBox>
            </div>
        </div>

        <!-- <5> -->
        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        Record checks
                    </p>
                </div>
                <div style="margin-left: 1rem; margin-bottom:1rem; text-indent: -10px; padding-left: 10px;">
                    <b>9. </b>
                    <grey-box-form
                        style="text-indent:0;margin-left:.25rem;display:inline;" 
                        textwidth="4rem" 
                        beforetext="Attached to this affidavit and marked as Exhibit" 
                        entryFontSize="9pt"
                        marginTop="-17px"
                        :text="mcfdRecord.exhibitName?mcfdRecord.exhibitName.replace('Exhibit ',''):''"/>

                    <div style="text-indent:5px;display:inline;"> 
                        is a copy of a <b>British Columbia Ministry of Children and Family Development</b> records check dated
                    </div>
                    <grey-box-form
                        style="text-indent:0;display: inline; margin: 0.25rem 0;" 
                        textwidth="10rem" 
                        beforetext="" 
                        hint="(mmm/dd/yyyy)"
                        entryFontSize="9pt"
                        marginTop="-17px"
                        hintindent="15px"
                        :text="mcfdRecord.fileDate?mcfdRecord.fileDate:''"/>
                </div>
                <div style="margin-left: 1rem; margin-bottom:1rem; text-indent: -10px; padding-left: 10px;">
                    <b>10. </b>
                    <grey-box-form
                        style="text-indent:0;margin-left:.25rem;display:inline;" 
                        textwidth="4rem" 
                        beforetext="Attached to this affidavit and marked as Exhibit" 
                        entryFontSize="9pt"
                        marginTop="-17px"
                        :text="porsRecord.exhibitName?porsRecord.exhibitName.replace('Exhibit ',''):''"/>

                    <div style="text-indent:5px;display:inline;"> 
                        is a copy of a <b>Protection Order Registry protection order records check</b> dated
                    </div>
                    <grey-box-form
                        style="text-indent:0;display: inline; margin: 0.25rem 0;" 
                        textwidth="10rem" 
                        beforetext="" 
                        hint="(dd/mmm/yyyy)"
                        entryFontSize="9pt"
                        marginTop="-17px"
                        hintindent="15px"
                        :text="porsRecord.fileDate?porsRecord.fileDate:''"/>
                </div>
                <div style="margin-left: 1rem; margin-bottom:1rem; text-indent: -10px; padding-left: 10px;">
                    <b>11. </b>
                    <grey-box-form
                        style="text-indent:0;margin-left:.25rem;display:inline;" 
                        textwidth="4rem" 
                        beforetext="Attached to this affidavit and marked as Exhibit" 
                        entryFontSize="9pt"
                        marginTop="-17px"
                        :text="crcRecord.exhibitName?crcRecord.exhibitName.replace('Exhibit ',''):''"/>

                    <div style="text-indent:5px;display:inline;"> 
                        is a copy of a <b>criminal records check</b> dated
                    </div>
                    <grey-box-form
                        style="text-indent:0;display: inline; margin: 0.25rem 0;" 
                        textwidth="10rem" 
                        beforetext="" 
                        hint="(dd/mmm/yyyy)"
                        entryFontSize="9pt"
                        marginTop="-17px"
                        hintindent="15px"
                        :text="crcRecord.fileDate?crcRecord.fileDate:''"/>
                    <div style="text-indent:5px;display:inline;"> 
                        obtained from the
                    </div>
                    <grey-box-form 
                        style="text-indent:0;display: inline-block; margin: 0.45rem 0;" 
                        textwidth="25rem" 
                        beforetext="" 
                        hint="(name and location of police force or department from which the criminal records check was obtained)"
                        marginTop="-17px"
                        hintindent="15px"
                        hintmargintop="3px"
                        :text="policeDept"/>
                </div>
            </div>
            <div style="width: 20% ">
                <NoteBox style="margin-top:40px">
                    <b-icon-paperclip />
                    <p>
                        You must attach a copy of 
                        each order as an exhibit to 
                        this affidavit for filing. 
                    </p>
                </NoteBox>
                <NoteBox style="margin-top:10px">
                    <b-icon-book />
                    <p>
                        For more information about 
                        how to reference and attach 
                        exhibits, see the guidebook
                    </p>
                </NoteBox>
            </div>
        </div>

        <!-- <6> -->
        <div style="margin-top: 1rem;"/>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="background-color: #333; color: white; font-size: 12pt; font-weight: bold; padding: 0 4px;">
                    <p>
                        Criminal offences
                    </p>
                </div>
                <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>12. </b>
                    <i>Select whichever option is correct</i>
                <check-box style="margin:0 0 0 1rem; text-indent: -16px;" 
                        :check="!pastConviction?'yes':''" 
                        text="There are <b>no criminal offences, other than those, if any, specified in the criminal records check</b> referred to in paragraph 11 of
                        this affidavit, of which I have been convicted and not pardoned."/> 

                <check-box 
                    style="margin:1rem 0 0 1rem; text-indent: -16px;" 
                    :check="pastConviction?'yes':''" 
                    text="<b>In addition to the convictions</b>, if any, specified in the criminal records check referred to in paragraph 11 of this affidavit, <b>I have
                    been convicted of</b>, and not pardoned for, <b>the following criminal offences</b>:
                    <br><i>Provide details of any criminal convictions, not referred to in the criminal records check, for which you have not received a pardon</i>"/>
                
                <div style="margin:0rem 0 0 1rem;" v-if="pastConviction" 
                    class="answerbox">{{ convictionDetails }}</div>
                <div v-else style="margin:0 0 3rem 1.5rem; min-height:75px; background-color: #dedede"></div>
                </div>
                <div style="margin: 1rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                    <b>13. </b>
                    <i>Select whichever option is correct</i>
                    <check-box style="margin:0 0 0 1rem; text-indent: -16px;" 
                        :check="!currentlyConvicted?'yes':''" 
                        text="I am <b>not currently charged with any criminal offences</b>"/> 
                    <check-box 
                        style="margin:1rem 0 0 1rem; text-indent: -16px;" 
                        :check="currentlyConvicted?'yes':''" 
                        text="I am <b>currently charged with criminal offences</b>. The particulars of each charge are set out below:"/>
                    
                    <b-table
                        :items="currentCharges"
                        :fields="chargeFields"
                        class="mt-2"
                        small
                        bordered>          
                            <template v-slot:cell()="data">
                                <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>
                            </template>
                            <template v-slot:head(chargeDate)>
                                Date of alleged offence <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                            </template>
                    </b-table> 
                </div> 
            </div>
            <div style="width: 20%"/>
        </div>

        <!-- <SWEAR > -->
        <div style="display: flex; flex-direction: row;">   
            <div style="width: 40%; padding-right: 4px;">
                <div style="text-indent:5px;display:block; font-size: 9pt;margin:1rem 0 0 0"> 
                    Sworn or affirmed before me 
                </div>
                <div style="margin:0.5rem 0 0 0">
                    <grey-box-form marginTop="-20px" style="margin-top:0.2rem; text-indent:3px;display:inline; font-size:9pt;" textwidth="8.25rem" hintFontSize="8pt" hintindent="90px" beforetext="at" aftertext=", British Columbia" hint="City" text="" />
                </div>
                <div style="margin-top: 1.25rem;"/>
                <div style="margin:.5rem 0 0 0">
                    <grey-box-form marginTop="-20px" style="margin-top:0.2rem; text-indent:3px;display:inline; font-size:9pt;" textwidth="8.25rem" hintFontSize="8pt" hintindent="85px" beforetext="on" hint="Date" text="" />
                </div>
                <div style="margin:2rem 0 0 0; display:inline-block;">
                    <div style="height:2rem; width:15rem; border:1px solid #313132; display:inline-block;"></div>
                    <br/>
                    <div style="width:10rem; display:inline-block; font-size:8pt" >
                        A Commissioner for taking Affidavits in British Columbia
                        [print name or affix stamp of commissioner]
                    </div>
                </div>
            </div>
            <div style="width: 40%; margin:8.65rem 1rem 0 0">
                <div style="height:2rem; width:15rem; border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
                <div style="width:10rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
            </div>
            <div style="width: 20%">
                <NoteBox style="margin-top:-20px">
                    <b-icon-info-circle-fill />
                    <p>
                        This document must be 
                        signed only with a 
                        commissioner for taking 
                        affidavits. <b>Do not sign</b> the 
                        document until they tell you 
                        to. You will sign it with them.
                    </p>
                </NoteBox>
                <NoteBox style="margin-top:10px">
                    <b-icon-info-circle-fill />
                    <p>
                        Once the affidavit is signed 
                        with a commissioner, it must 
                        be filed within 7 days [Rule 
                        26].
                    </p>
                </NoteBox>
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
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getLocationInfo, getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { aboutAffiantGaDataInfoType, backgroundCivilCourtProceedingsDataInfoType, backgroundCriminalHistoryDataInfoType, backgroundFamilyViolenceDataInfoType, caringForChildGaChildInfoDataInfoType, caringForChildGaDataInfoType, chargesDataInfoType, childGaInfoType, exhibitsDataInfoType, guardianshipAffidavitDataInfoType } from '@/types/Application/GuardianshipAffidavit';

@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        NoteBox,
        FormPart
    }
})

export default class Form5Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType; 
    address = '';

    childrenInfo = [];
    careDetails = '';
    otherChildrenExist = false;
    otherChildrenInfo = [];

    familyViolenceExists = false;
    familyViolenceDesc = '';

    courtProceedingsExist = false;
    civilProceedingInfo = [];
    exhibitList = [];
    orderList = [];
    porsRecord = {} as exhibitsDataInfoType;
    mcfdRecord = {} as exhibitsDataInfoType;
    crcRecord = {} as exhibitsDataInfoType;
    policeDept = '';

    pastConviction = false;
    convictionDetails = '';
    currentlyConvicted = false; 
    currentCharges = [];

    childFields = [
        {key:"fullName",               label:"Child's full name",                                           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth",                                       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"currentGuardiansToChild",label:"Name(s) of child's current guardian(s)",                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"parentsNotGuardians",    label:"Name(s) of child's parent(s) who are not current guardian(s)",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];

    childRelationshipFields = [
        {key:"fullName",               label:"Name of child",                     tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:20%;"},
        {key:"relationWithchild",      label:"Nature of relationship to child",   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
        {key:"lengthOfRelationship",   label:"Length of relationship",            tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ];  

    childLivingArrangementFields = [
        {key:"fullName",               label:"Name of child",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
        {key:"currentLiving",          label:"Current living arrangements",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"}
    ]; 

    otherChildrenFields = [
        {key:"fullName",               label:"Child's full name",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth",             tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"relation",               label:"Nature of relationship to child",   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ];

    proceedingFields = [
        {key:"itemNo",                 label:"Item",                                                                        tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:10%;"},
        {key:"partyNames",             label:"Names of the parties to the proceeding",                                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
        {key:"courtLocation",          label:"Name and location of court in which the proceeding was conducted",            tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},        
        {key:"courtOrderDates",        label:"Date of any orders concerning children under my care made in the proceeding", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];

    chargeFields = [
        {key:"chargeNature",             label:"Nature of alleged offence",                                       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"chargeDate",               label:"Date of alleged offence",                                         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"chargeCourtLocation",      label:"Name and location of court in which proceedings are outstanding", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){
        this.getGaAffiantInfo();  
        this.getExhibitInfo();        
        this.childrenInfo = this.getChildrenDetails();
        this.getCareDetails();
        this.getFamilyViolenceInfo();
        this.getChargeDetails();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);        
    } 

    public getGaAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantGaSurvey){

            let aboutAffiant = {} as aboutAffiantGaDataInfoType;
            aboutAffiant = this.result.aboutAffiantGaSurvey;

            this.yourInfo = getYourInformationResults(aboutAffiant);    
            this.yourInfo.dob = Vue.filter("beautify-date-mid")(aboutAffiant.Dob);       
            const addressInfo = aboutAffiant.ApplicantAddress;

            const addressText = addressInfo.street + ', ' 
                                + addressInfo.city + ', ' 
                                + addressInfo.state + ', ' 
                                + addressInfo.country + ', ' 
                                + addressInfo.postcode;

            this.address = aboutAffiant.inCareOf?.length>0?('Care of '+ addressText ):addressText;
        }
            
    }

    public getFamilyViolenceInfo(){ 

        this.familyViolenceExists = false;
        this.familyViolenceDesc = '';

        if(this.result?.backgroundFamilyViolenceSurvey){

            let familyViolenceData = {} as backgroundFamilyViolenceDataInfoType;
            familyViolenceData = this.result.backgroundFamilyViolenceSurvey;

            this.familyViolenceExists = familyViolenceData.familyViolenceExists == 'y'; 
            
            if(this.familyViolenceExists){
                this.familyViolenceDesc = familyViolenceData.familyViolenceDesc;
            }
        }
    
    }

    public getChildrenDetails(){

        const childrenInfo = [];
        
        const childData: childGaInfoType[] =  this.result.childrenDetailsGaSurvey;

        for (const child of childData){            
            const childInfo = {fullName: '', dob:'', currentGuardiansToChild: '', parentsNotGuardians: '', relationWithchild: '', lengthOfRelationship: '', currentLiving:''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date-mid')(child.dob);
            childInfo.currentGuardiansToChild = child.currentGuardiansToChild.map(function (guardian) { return guardian.name; }).join(', ');
            if (child.parentsNotGuardiansExist == 'y'){
                for (const parent of child.parentsNotGuardians)
                childInfo.parentsNotGuardians = child.parentsNotGuardians.map(function (parent) { return parent.name; }).join(', ');
            }
            childInfo.relationWithchild = child.relationWithchild;

            if (child.lengthOfRelationship.selected == 'sinceBirth'){
                childInfo.lengthOfRelationship = "Since Birth";
            } else {
                childInfo.lengthOfRelationship = "Since "+ child.lengthOfRelationship?.relationStartDate?Vue.filter('beautify-date-mid')(child.lengthOfRelationship.relationStartDate):'';
            }

            childInfo.currentLiving = child.currentLiving;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getCareDetails(){

        this.careDetails = '';
        this.otherChildrenExist = false;
        this.otherChildrenInfo = [];

        const careData: caringForChildGaDataInfoType = this.result.caringForChildGaSurvey;

        if (careData){

            this.careDetails = careData.caringForChildGa?.careDetails?careData.caringForChildGa.careDetails:'';
            this.otherChildrenExist = careData.caringForChildGa?.parentOtherChild == 'y';        

            if (this.otherChildrenExist){
                const childData: caringForChildGaChildInfoDataInfoType[] = careData.childInfo;
                for (const child of childData){            
                    const childInfo = {fullName: '', dob:'', relation: ''};
                    childInfo.fullName = Vue.filter('getFullName')(child.name);
                    childInfo.dob = Vue.filter('beautify-date-mid')(child.dob);            
                    childInfo.relation = child.relation;           
                    this.otherChildrenInfo.push(childInfo);
                } 
                
            } else {
                this.otherChildrenInfo = [{fullName: '', dob:'', relation: ''}];
            }
        } 
    }

    public getExhibitInfo(){  

        this.courtProceedingsExist = false;
        this.civilProceedingInfo = [{itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []}];
        this.exhibitList = this.result.gaExhibitList;
        this.orderList = [];

        this.porsRecord = {} as exhibitsDataInfoType;
        this.mcfdRecord = {} as exhibitsDataInfoType;
        this.crcRecord = {} as exhibitsDataInfoType;
        this.policeDept = '';

        const proceedingData: backgroundCivilCourtProceedingsDataInfoType = this.result.backgroundCivilCourtProceedingsSurvey;

        if (proceedingData && this.result.gaExhibitList){

            this.courtProceedingsExist = proceedingData.courtProceedingsExist == 'y';
            if(this.courtProceedingsExist){
                this.orderList = this.exhibitList.filter(exhibit => exhibit.itemNo != 0); 
                const civilProceedingsData = this.orderList;
                
                this.civilProceedingInfo = [];  
                
                let maxItemNo = '';
                
                for (const proceeding of civilProceedingsData){

                    const proceedingInfo = {itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []};
                    const index = this.civilProceedingInfo.findIndex(proc=>{return(proc.itemNo == proceeding.itemNo)})
                    if(index >= 0 ){                
                        this.civilProceedingInfo[index].courtOrderDates.push(Vue.filter('beautify-date-mid')(proceeding.fileDate)); 
                    } else {
                        proceedingInfo.itemNo = proceeding.itemNo;
                        proceedingInfo.partyNames = proceeding.partyNames;
                        proceedingInfo.courtLocation = proceeding.courtLocation;
                        proceedingInfo.courtOrderDates.push(Vue.filter('beautify-date-mid')(proceeding.fileDate));
                        this.civilProceedingInfo.push(proceedingInfo);
                    }  
                    
                    maxItemNo = proceeding.itemNo;
                }
                
                let noOrderBaseIndex = Number(maxItemNo) + 1;

                for (const proceeding of proceedingData.courtProceedings){

                    if(proceeding.courtOrdersExist == 'n'){
                        const proceedingInfo = {itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []};                        
                        proceedingInfo.itemNo = String(noOrderBaseIndex);
                        proceedingInfo.partyNames = proceeding.partyNames;
                        proceedingInfo.courtLocation = proceeding.courtLocation;
                        proceedingInfo.courtOrderDates = [];
                        this.civilProceedingInfo.push(proceedingInfo); 
                        noOrderBaseIndex++;
                    }
                                 
                } 


            }
        }

        if(this.result?.guardianshipAffidavitSurvey){

            const ga: guardianshipAffidavitDataInfoType = this.result.guardianshipAffidavitSurvey

            if (ga.haveBrcResults == 'y'){
                const mcfdRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Ministry of Children and Family Development Record Check dated ")[0];                
                this.mcfdRecord.exhibitName = mcfdRecordData.exhibitName;
                this.mcfdRecord.fileDate = Vue.filter('beautify-date-mid')(mcfdRecordData.fileDate);

                const crcRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Criminal Record Check dated ")[0];
                this.crcRecord.exhibitName = crcRecordData.exhibitName;
                this.crcRecord.fileDate = Vue.filter('beautify-date-mid')(crcRecordData.fileDate);

                const porsRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Protection Order Record Check from the Protection Order Registry dated ")[0];
                this.porsRecord.exhibitName = porsRecordData.exhibitName;
                this.porsRecord.fileDate = Vue.filter('beautify-date-mid')(porsRecordData.fileDate)
                this.policeDept = ga.policeDept?ga.policeDept:'';
            }
        }    
    }  

    public getChargeDetails(){

        this.convictionDetails = '';
        this.pastConviction = false;
        this.currentlyConvicted = false;
        this.currentCharges = [];

        const criminalData: backgroundCriminalHistoryDataInfoType = this.result.backgroundCriminalHistorySurvey;

        if (criminalData){

            this.pastConviction = criminalData.pastConviction == 'y';
            if (this.pastConviction){
                this.convictionDetails = criminalData.convictionDetails?criminalData.convictionDetails:'';
            }
            
            this.currentlyConvicted = criminalData.currentlyConvicted == 'y';       

            if (this.currentlyConvicted){
                const chargeData: chargesDataInfoType[] = criminalData.currentCharges;
                for (const charge of chargeData){            
                    const chargeInfo = {chargeNature: '', chargeDate:'', chargeCourtLocation: ''};
                    chargeInfo.chargeNature = charge.chargeNature;
                    chargeInfo.chargeDate = Vue.filter('beautify-date-mid')(charge.chargeDate);            
                    chargeInfo.chargeCourtLocation = charge.chargeCourtLocation;           
                    this.currentCharges.push(chargeInfo);
                } 
                
            } else {
                this.currentCharges = [{chargeNature: '', chargeDate:'', chargeCourtLocation: ''}];
            }
        } 
    }
 
}
</script>
<style>
tbody{
    background-color: #dedede;
}
</style>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>