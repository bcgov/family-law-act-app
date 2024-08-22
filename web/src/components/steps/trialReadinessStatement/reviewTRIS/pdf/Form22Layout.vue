<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
    <FormHeader 
            :headerTableData="headerItems" 
            formName="Trial Readiness Statement" 
            formNumber=22 
            ruleFontSize="10pt"
            formRuleNumber="Rule 110" />
        
    <!-- <DISCLAIMER> -->
    <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
        <div style="flex:1; margin: 1rem 0.5rem 0 0;">
            <p>This Trial Readiness Statement helps the parties and the court to plan for a trial.
            </p>
            <div style="border-style: dashed; border-color: black; padding:0.5rem; background: #909090;">
                <b>Please read before completing the form:</b>
                <ul>
                    <li>
                        You must complete this form only if you are scheduled for a trial preparation conference
                        or you were directed or ordered by the court to complete a Trial Readiness Statement.
                    </li>
                    <li>
                        For guidance filling in this form, please read the guidebook. The guide is available online at
                        <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms" target="_blank">www.gov.bc.ca/court-forms</a>
                        or from your local court registry.
                    </li>
                </ul>
            </div>
        </div>
        <div style="width: 20%"/>
    </div>
    <!-- Part 1 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="1" title="Parties and lawyers at trial" />
            <!-- 1 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>1. </b>
                <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="23.5rem"
                    hintindent="160px" 
                    beforetext="<b>My full name</b> is " 
                    hint="Full name of party" 
                    hintTextColor = "black"
                    :text="yourInfo.name | getFullName" />
            </div>
            <!-- 2 -->
            <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>2. </b>
                <div style="text-indent:5px;display:inline; font-style: italic; color: #626262"> 
                    Select whichever option is correct and provide the additional information, as applicable
                </div> 
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline; text-indent: -16px;"
                        :check="!hasLawyer?'yes':''" text="I <b>do not have a lawyer</b> for the trial"/>
                </div>            
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline; text-indent: -16px;" 
                        :check="hasLawyer?'yes':''" 
                        text="I will have the following <b>lawyer representing me</b> at the trial:"/>
                    <grey-box-form 
                        style="text-indent:0;margin:0.5rem 0 0 .25rem;display:inline-block;" 
                        textwidth="25rem" 
                        beforetext=""
                        hintindent="165px"
                        hint="Full name of lawyer"
                        hintTextColor = "black"
                        :text="lawyerName"/>                    
                </div>
            </div>
            <!-- 3 -->
            <div style="margin: 1rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>3. </b>
                <grey-box-form 
                    style="text-indent:2px;display:inline;" 
                    textwidth="17rem" 
                    beforetext="The <b>other party's full name</b> is: " 
                    hint="Full name of party/parties"
                    hintTextColor = "black"
                    :italicHint="false" :text="otherParties"/>
            </div>
             <!-- 4 -->
             <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>4. </b>
                <div style="font-style: italic; display: inline; color: #626262"> 
                    Complete only if applicable. You may leave this section blank.
                </div> 
                <div style="margin-left:1rem;">
                    <grey-box-form 
                        style="text-indent:2px;display:inline-block; margin-top:0.33rem" 
                        textwidth="16rem" 
                        beforetext="The <b>lawyer for the child</b>(ren) is:" 
                        hint="Full name of lawyer"
                        hintTextColor = "black" 
                        :italicHint="false" :text="childCaseLawyer"/>                                         
                </div>
            </div>
        </div>
        <div style="width: 20%; margin-top:100px">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    You must serve each other 
                    party with a copy of the trial 
                    readiness statement at least 7 
                    days before the date of the 
                    trial preparation conference or 
                    as ordered by the court
                </p>
            </NoteBox>
        </div>
    </div>
    <!-- Part 2 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="2" title="Issues for trial" />
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px; text-indent: -16px">
                <b>5. </b>
                The following issues are <b> to be decided at trial</b>:
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox=""
                            style="display:inline;" 
                            inline="inline" 
                            boxMargin="0"
                            :check="issuesList.includes('ParentingResponsibilities')?'yes':''" text="Parental responsibilities"/>
                    </div>
                    <div style="width:50%;">
                        <check-box
                            checkbox=""
                            style="display:inline;" 
                            inline="inline" 
                            boxMargin="0"
                            :check="issuesList.includes('PO')?'yes':''" text="Protection order"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('ParentingTime')?'yes':''" text="Parenting time"/>
                    </div>
                    <div style="width:50%;">
                        <check-box
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('Ppm')?'yes':''" text="Priority parenting matter <i style='color: #626262'>(specify)</i>:"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            :check="issuesList.includes('ChildSupport')?'yes':''" 
                            text="Child support"/>
                    </div>
                    <div style="width:50%;">
                        <grey-box-form
                            style="text-indent:0;display:inline-block;" 
                            textwidth="15rem" 
                            beforetext="" 
                            hint="" 
                            :text="ppmIssue"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('ContactChild')?'yes':''" text="Contact with a child"/>
                    </div>
                    <div style="width:50%;">
                        <check-box
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('Relocation')?'yes':''" text="Relocation"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('GuardianshipChild')?'yes':''" text="Guardianship of a child"/>
                    </div>
                    <div style="width:50%;">    
                        <check-box
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="issuesList.includes('Other')?'yes':''" text="Other <i style='color: #626262'>(specify)</i>:"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            :check="issuesList.includes('SpousalSupport')?'yes':''" 
                            text="Spousal support"/>
                    </div>
                    <div style="width:50%;">
                        <grey-box-form 
                            style="text-indent:0;display:inline-block;" 
                            textwidth="15rem" 
                            beforetext="" 
                            hint="" 
                            :text="otherIssue"/>
                    </div>
                </div>
                <div class="marginleft2p5vue row" style="margin:0.25rem 0 0 1.5rem;">
                    <div style="width:50%;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            :check="issuesList.includes('DivisionCompanionAnimal')?'yes':''" 
                            text="Property division in respect of a companion animal"/>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 20%;"/>
    </div>
    <!-- Part 3 -->
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="3" title="Background information" />
            <!-- 6 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>6. </b>
                <div style="display:inline-block; text-indent:0; margin:0 0.5rem 0 0rem;">
                    Have you attended a family settlement conference?
                </div>
            </div>
            <div style="margin-left: 2rem; text-indent: -10px;">
                <check-box inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                    shift="10"  marginLeft="1.75rem" :check="attendedFamilyConf?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                    shift="-8" marginLeft="0.5rem" :check="!attendedFamilyConf?'yes':''" text="No"/> 
            </div>
            <!-- 7 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>7. </b>
                <div style="display:inline-block; text-indent:0; margin:0 0.5rem 0 0rem;">
                    Are there ongoing settlement discussions?
                </div>
            </div>
            <div style="margin-left: 2rem; text-indent: -10px;">
                <check-box inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                shift="10"  marginLeft="1.75rem" :check="ongoingDis?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                shift="-8" marginLeft="0.5rem" :check="!ongoingDis?'yes':''" text="No"/> 
            </div>
            <div style="margin-left: 2rem; text-indent: -10px;">
                <div style="display:inline; text-indent:0; margin:0 0rem 0 0.85rem;">
                    <span style="color: #626262"><i><b>⤷ If yes</b></i>, is there likelihood of resolution before the trial?</span>
                </div>
                <div style="display:block; margin: 0rem 0 0 3rem">
                    <check-box inline="inline" boxMargin="0" style="display:inline-block; text-indent:-16px; font-weight: bold;" 
                        shift="10"  marginLeft="1.75rem" :check="resolvable == 'y'?'yes':''"  text="Yes"/>    
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                        shift="-8" marginLeft="0.5rem" :check="resolvable == 'n'?'yes':''" text="No"/> 
                </div>
            </div>
            <!-- 8 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b style="display:inline;">8. </b>
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    There is an existing court order involving one or more of the parties, and/or the child(ren) about the following:
                </div>
            </div>
            <div style="display:inline-block; text-indent:0; margin:0 0.5rem 0 2rem;">
                <i style="color: #626262">Select all options that apply</i>
            </div>
            <div style="text-indent:-16px">
                <div style="margin:0.25rem 0 0 5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;"
                        :check="existingOrder.includes('interimOrder')?'yes':''" text="Interim order about the issue to be determined at trial"/>
                </div>
                <div style="margin:0.25rem 0 0 5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;"
                        :check="existingOrder.includes('childProtectionOrder')?'yes':''" text="Order under the <i>Child, Family and Community Service Act</i>"/>
            </div>
                
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('supremeOrder')?'yes':''" text="Supreme Court order under the <i>Family Law Act or Divorce Act</i>"/>
            </div>
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('protectionOrder')?'yes':''" text="Section 183 <i>Family Law Act</i> protection order"/>
            </div>
            <div>                
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; margin: 0.5rem 0 0 5.5rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    hintTextColor = "black"
                    hintindent="50px"
                    :italicHint="false" :text="sec183ExpiryDate"/>
            </div> 
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('peaceBond')?'yes':''" text="Section 810 <i>Criminal Code</i> peacebond"/>
            </div>
            <div>                
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; margin: 0.5rem 0 0 5.5rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    hintTextColor = "black"
                    hintindent="50px"
                    :italicHint="false" :text="sec810ExpiryDate"/>
            </div> 
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('bailOrder')?'yes':''" text="Section 515 <i>Criminal Code</i> bail order"/>
            </div>
            <div>                
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; margin: 0.5rem 0 0 5.5rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    hintTextColor = "black"
                    hintindent="50px"
                    :italicHint="false" :text="sec515ExpiryDate"/>
            </div>
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('probationOrder')?'yes':''" text="<i>Criminal Code</i> probation order"/>
            </div>
            <div>                
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; margin: 0.5rem 0 0 5.5rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    hintTextColor = "black"
                    hintindent="50px"
                    :italicHint="false" :text="probationExpiryDate"/>
            </div>
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="existingOrder.includes('otherOrder')?'yes':''" 
                    text="Other order that would affect the conduct of the trial <i style='color: #626262'>(specify)</i>:"/>
                <grey-box-form 
                    style="text-indent:0;margin:0.5rem 0 0 .25rem;display:inline-block;" 
                    textwidth="13rem" 
                    beforetext="" 
                    hint="" 
                    :text="existingOrderOther"/>                    
            </div>
           
            <div style="margin:0.25rem 0 0 5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="existingOrder.includes('none')?'yes':''" 
                    text="None of the above"/>                        
            </div>
        </div>
    </div>
        <div style="width:20%">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    A family settlement 
                    conference is a type of court 
                    appearance [Part 8 -
                    Provincial Court Family 
                    Rules].
                </p>
            </NoteBox>
            <NoteBox textColor="#626262" style="margin-top:90px">
                <b-icon-book />
                <p>
                    For more information about 
                    these types of orders, see the 
                    guidebook. 
                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 4 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="4" title="Disclosure of information" />
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>9. </b>
                <i style="color: #626262">Please select the correct statement</i>
            </div>
            <div style="text-indent:-16px; margin:0.25rem 0 0 1.5rem;">
                <div class="marginleft2p5vue">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;"
                        :check="finInfoOnFile == ''?'yes':''" 
                        text="The issue(s) to be determined at trial <b>do not include a support issue</b>"/>
                </div>
                <div class="marginleft2p5vue">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="finInfoOnFile=='y'?'yes':''" 
                        text="My <b>financial information</b> on file with the court <b>is current</b>"/>
                </div>
                <div class="marginleft2p5vue">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="finInfoOnFile=='n'?'yes':''" 
                        text="There have been <b>changes to my financial information</b> since I filed the Financial Statement"/>
                </div>
            </div>
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>10. </b>
                <div style="text-indent:10px;display:inline;"> 
                    I have <b>provided each other party with a copy of the information I plan to 
                    rely on</b> during the trial, including financial information, documents, 
                    and a list of witnesses
                </div> 
            </div>
            <div style="display:inline-block; text-indent:-16px; margin-left: 2rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10"  marginLeft="1.75rem" :check="copyForParty?'yes':''"  text="<b>Yes</b>"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" marginLeft="0.5rem" :check="!copyForParty?'yes':''" text="<b>No</b>"/> 
            </div>
            <div>  
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin: 0rem 0 0 5rem;" 
                    textwidth="23rem" 
                    beforetext="<span style='color: #626262'><b><i>⤷ If no</i></b>, when can these be provided to the parties?</span>"
                    marginTop="-12px"
                    :italicHint="false" :text="copyForPartyDate"/>
            </div>
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>11. </b>
                <div style="text-indent:10px;display:inline;"> 
                    Is there any information you still need from the other party, including 
                    financial information, documents, or a list of witnesses?
                </div> 
            </div>
            <div style="display:inline-block; text-indent:-16px; margin-left:2rem">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10"  marginLeft="1.75rem" :check="needInfo?'yes':''"  text="<b>Yes</b>"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" marginLeft="0.5rem" :check="!needInfo?'yes':''" text="<b>No</b>"/> 
            </div>
            <div>                
                <div style="text-indent:0.25px;font-size: 9pt; margin: 0rem 0 0 2rem;"> 
                    <span style="color: #626262"><b><i>⤷ If yes</i></b>, please explain what information you need</span>
                    <div v-if="needInfo" class="answerbox">{{ neededInfoDesc }}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
            </div>
            </div>      
        </div>
        <div style="width: 20%;">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    This part will help the court to 
                    understand what information 
                    needs to be shared between 
                    the parties to help get ready 
                    for the trial.

                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 5 section 1-->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="5" title="Witnesses" />
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>12. </b>
                I plan to have the following people <b>attend as witnesses</b> in this trial:
            </div>
            <div style="text-indent:5px;font-size: 9pt;font-style: italic; margin:0rem 0 0 2rem; color: #626262"> 
                Include your own name on the list if you plan to provide evidence
            </div>          
            <div style="margin:0.5rem 0 0 2rem;">
                <div style="text-indent:1px;display:inline; font-size: 9pt;"> 
                    <b>Witness Names:</b>
                </div> 
                <div style="display: inline;">
                    <grey-box-form
                        style="text-indent:0;display:inline-block;margin-left:1rem;" 
                        textwidth="16.5rem" 
                        beforetext="(1)" 
                        hint="" 
                        :text="firstTwoWitnesses[0]"/>
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 7rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="(2)" 
                        hint="" 
                        :text="firstTwoWitnesses[1]"/>
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 7rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="(3)" 
                        hint="" 
                        :text="firstTwoWitnesses[2]"/>  
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 7rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="(4)" 
                        hint="" 
                        :text="firstTwoWitnesses[3]"/>  
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 7rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="(5)" 
                        hint="" 
                        :text="firstTwoWitnesses[4]"/>  
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 7rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="(6)" 
                        hint="" 
                        :text="firstTwoWitnesses[5]"/>  
                </div>                               
            </div>
            <div v-if="additionalWitnesses.length>0">
                <div  v-for="witness, inx in witnessLineArray" :key="inx" style="margin:0.5rem 0 0 4.15rem;">
                    <grey-box-form
                        style="text-indent:0;display:inline-block;margin-left:1rem;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 3) + ')'" 
                        hint="" 
                        :text="additionalWitnesses[2*inx]"/>
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 4) + ')'"
                        hint="" 
                        :text="additionalWitnesses[2*inx+1]"/>
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 5) + ')'"
                        hint="" 
                        :text="additionalWitnesses[2*inx+2]"/> 
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 6) + ')'"
                        hint="" 
                        :text="additionalWitnesses[2*inx+3]"/> 
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 7) + ')'"
                        hint="" 
                        :text="additionalWitnesses[2*inx+4]"/> 
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline-block;" 
                        textwidth="16.5rem" 
                        :beforetext="'('+ (2*inx + 8) + ')'"
                        hint="" 
                        :text="additionalWitnesses[2*inx+5]"/>                   
                </div>
            </div>
        </div>
        <div style="width: 20%">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    A witness must have direct 
                    knowledge of the things you 
                    want them to give evidence 
                    about. The evidence must 
                    also be relevant to the issues 
                    to be decided at trial.

                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 5 section 2-->
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>13. </b>
                <div style="text-indent:10px;display:inline;"> 
                    Is there any witness or party travelling from another community to attend the trial?
                </div>
                <div style="display:block; margin: 0.5rem 0 0 1rem; text-indent: -16px; font-weight: bold;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                        shift="10"  marginLeft="1.75rem" :check="travellingForTrial?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                        shift="-8" marginLeft="0.5rem" :check="!travellingForTrial?'yes':''" text="No"/> 
                </div>
            </div>
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <div style="font-size:9.75pt; display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    <b>14. </b>
                    Are there <b>expert reports</b>?
                </div>
                <div style="display:block;margin-left: 1rem; text-indent:-16px; font-weight: bold;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'Yes'?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'No'?'yes':''" text="No"/> 
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'Unknown'?'yes':''" text="Unknown"/>                 
                </div>
                <div style="margin-left: 1rem;">
                    <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                        <i style="color: #626262">⤷ If yes, please answer the following questions:</i>
                    </div>
                    <div style="display:block; text-indent:0; margin:0 0.5rem 0 1rem;">
                        (a) Has the report been provided to the other party?
                    </div>
                    <div style="display:block; margin:0 0.5rem 0 2rem; text-indent: -16px; font-weight: bold;">
                        <check-box inline="inline" boxMargin="0" style="display:inline;" 
                        shift="10"  marginLeft="1.75rem" :check="reportProvided == 'y'?'yes':''"  text="Yes"/>                                  
                        <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                        shift="-8" marginLeft="0.5rem" :check="reportProvided == 'n'?'yes':''" text="No"/> 
                    </div> 
                </div>
                <div style="margin-left: 2rem;">
                    <div style="text-indent:0; margin:0 0 0 0rem;">
                        (b) will the expert be called as a witness at the trial to provide opinion evidence or to be asked questions?
                    </div>
                    <div style="margin-left: 1rem; text-indent:-16px; font-weight: bold;">
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'Yes'?'yes':''"  text="Yes"/>                        
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'No'?'yes':''" text="No"/> 
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'Unknown'?'yes':''" text="Unknown"/>                 
                    </div>
                </div>
            </div>
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    <b>15. </b>
                    Has a report been ordered for <b>views of the child</b> or <b>under section 211</b> of the <i>Family
                    Law Act</i> including for the assessment of the needs of a child, the views of a child, and/or
                    the ability and willingness of a party to satisfy the needs of a child?
                </div>
                <div style="display:block;margin-left: 1rem; font-weight: bold; text-indent: -16px">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="reportOrdered?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="!reportOrdered?'yes':''" text="No"/>                
                </div>
                <div style="margin-left: 1.35rem;">
                    <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                        <i style="color: #626262">⤷ If yes, please answer the following questions</i>
                    </div>
                    <div style="display:block; text-indent:0; margin:0 0.5rem 0 1rem;">
                        (a) Has the report been completed?
                    </div>
                    <div style="display:block; margin:0 0.5rem 0 2rem; text-indent: -16px; font-weight: bold;">
                        <check-box inline="inline" boxMargin="0" style="display:inline;" 
                            shift="10"  marginLeft="1.75rem" :check="reportCompleted=='y'?'yes':''"  text="Yes"/>                                  
                        <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                            shift="-8" marginLeft="0.5rem" :check="reportCompleted=='n'?'yes':''" text="No"/> 
                    </div> 
                </div>
                <div style="margin-left: 3rem;">
                    <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                        (b) Is there a court order requiring the person who prepared the report to attend the trial?
                    </div>
                    <div style="display:block; margin:0 0.5rem 0 0.5rem; text-indent: -16px; font-weight: bold;">
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" marginLeft="1.75rem" :check="orderAttendTrial=='y'?'yes':''"  text="Yes"/>                        
                        <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="orderAttendTrial=='n'?'yes':''" text="No"/>                
                    </div>
                </div>
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    <b>16. </b>
                    I have <b>confirmed all my witnesses are available</b> for the trial date(s) <b>OR I have
                    served them</b> with a Subpoena to Witness in Form 23:
                </div>
                <div style="display:block; text-indent: -16px; margin:0 0.5rem 0 1.5rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                        shift="10"  marginLeft="1.75rem" :check="witnessesConfirmed?'yes':''"  text="<b>Yes</b>"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                        shift="-8" marginLeft="0.5rem" :check="!witnessesConfirmed?'yes':''" text="<b>No</b>"/> 
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                        shift="-8" marginLeft="0.5rem" :check="false" text="<b>Not applicable</b>, a trial date has not been scheduled"/> 
                </div> 
            </div>
        </div>
        <div style="width: 20%;">
            <NoteBox textColor="#626262" style="margin-top:50px">
                <b-icon-info-circle-fill />
                <p>
                    Expert reports provide 
                    information to help the court. 
                    They are written by an expert 
                    who has special knowledge 
                    about a certain area because 
                    of their training, education and 
                    work experience.
                </p>
            </NoteBox>
            <NoteBox textColor="#626262" style="margin-top:50px">
                <b-icon-book />
                <p>
                    For more information about 
                    witnesses, expert reports and 
                    section 211 reports, see the 
                    guidebook. 
                </p>
            </NoteBox>
            <NoteBox textColor="#626262" style="margin-top:70px">
                <b-icon-info-circle-fill />
                <p>
                    If you want a witness to give 
                    evidence at your trial, you 
                    must make sure they can 
                    come to your trial and are 
                    ready to give evidence.

                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 6 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="6" title="Requirements and considerations" />
            <!-- 17 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <div style="font-size:9.75pt; display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    <b>17. </b>
                    I have the following special requirements/considerations for the trial: <br/>
                    <i style="color: #626262">Select each option that applies and provide the additional information as required</i>
                </div>
                <!-- Technology -->
                 <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="specialReqList.includes('technology')?'yes':''" text="<b>Technology needs</b><i style='color: #626262'> (specify):</i>"/>
                    </div>
                    <div>                
                        <div v-if="specialReqList.includes('technology')" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;" class="answerbox">
                            {{techSpecs}}
                        </div>
                        <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                    </div>
                </div>
                
                <!-- Interpreter -->
                <div style="margin-top: 0.25rem;" />
                <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="specialReqList.includes('interpreter')?'yes':''" text="<b>Interpreter</b> for <i style='color: #626262'> (name of party or witness):</i>"/>
                    </div>
                    <div>                
                        <div v-if="specialReqList.includes('interpreter')" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;" class="answerbox">
                            {{interpreterInfo.name}}
                        </div>
                        <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        Language <i style="color: #626262"> (specify):</i>
                    </div>
                    <div v-if="specialReqList.includes('interpreter')" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;" class="answerbox">
                        {{interpreterInfo.language}}
                    </div>
                    <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                </div>

                <!-- Safety Planning -->
                <div style="margin-top: 0.25rem;" />
                <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="specialReqList.includes('safety')?'yes':''" text="<b>Safety planning</b>"/>
                            <br/>
                        <i style="color: #626262">Please explain your concerns or why you need a safety plan in place for the courtroom:</i>
                    </div>
                    <div>                
                        <div v-if="specialReqList.includes('safety')" class="answerbox" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;">{{ safetySpecs }}</div>
                        <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                    </div>
                </div>

                <!-- Trial Accomodations -->
                <div style="margin-top: 0.25rem;" />
                <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="specialReqList.includes('accommodations')?'yes':''" text="<b>Trial Accomodations,</b>"/>
                            such as allowing evidence by affidavit, video or telephone attendance, or other requested accommodations <i>(specify)</i>:

                    </div>
                    <div>                
                        <div v-if="specialReqList.includes('accommodations')" class="answerbox" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;">{{ trialSpecs }}</div>
                        <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                    </div>
                </div>

                <!-- Disability Accomodations -->
                <div style="margin-top: 0.25rem;" />
                <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="specialReqList.includes('disability')?'yes':''" text="<b>Accommodations for disability,</b>"/>
                            such as court room access and set up, audio aids, or other accommodations <i style="color: #626262">(specify)</i>:
                    </div>
                    <div>                
                        <div v-if="specialReqList.includes('disability')" class="answerbox" style="margin: 0rem 0.5rem 0.5rem 2rem; background-color: #dedede; word-wrap: break-word;">{{ disabilitySpecs }}</div>
                        <div v-else style="margin-bottom:3rem; margin-left: 1rem; min-height:35px; background-color: #dedede"/>
                    </div>
                </div>

                <!-- No Requirements -->
                <div style="margin-top: 0.25rem;" />
                <div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem; text-indent: -16px;">
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;"
                            :check="false"/>
                            I have no <b>special requirements or considerations</b> for the trial
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 20%; margin-top:10px">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    There are resources available 
                    to support individuals at trial
                    at no cost to the person. 
                    Resource availability may be 
                    limited in some court locations 
                    so early identification and 
                    booking may be required. 
                </p>
            </NoteBox>
            <NoteBox textColor="#626262" style="margin-top: 10px">
                <b-icon-book />
                <p>
                    For more information about 
                    bringing a support person with 
                    you to trial to provide 
                    emotional support, take notes, 
                    and help organize documents, 
                    see the guidebook
                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 7 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="7" title="About the trial" />
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>18. </b>
                Has the trial been scheduled?
            </div>
            <div style="text-indent:-16px;">
                <div style="margin:0.25rem 0 0 5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" shift="10"
                        :check="trialScheduled?'yes':''" text="<b>Yes</b>"/>
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" shift="30" marginLeft="3rem"
                        :check="!trialScheduled?'no':''" text="<b>No</b>"/>
                </div>
                <div style="display:inline; text-indent:0; margin:0 0rem 0 3.50rem;">
                    <span style="color: #626262"><i><b>⤷ If yes</b></i>, the trial is scheduled for the following date(s):</span>
                    <grey-box-form
                        style="text-indent:0;margin:0.25rem 0 0 4rem;display:inline-block;" 
                        textwidth="10rem"
                        hint="(Month Day(s), Year)" 
                        hintTextColor = "black"
                        hintindent="50px"
                        :text="trialDate"/>
                </div>
            </div>
            <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>19. </b>
                <i style="color: #626262">Select whichever statement is correct</i>
            </div>
            <div style="text-indent:-16px;">
                <div style="margin:0.25rem 0 0 5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;"
                        :check="feelReady?'yes':''" text="I am ready to start on the scheduled trial date"/>
                </div>
                <div style="margin:0.25rem 0 0 5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!feelReady?'yes':''" 
                        text="I will not be ready to start on the scheduled trial date because:"/>
                    <div class="marginleft-0p5vue" style="margin-left:0.5rem; text-indent:0px;font-size: 9pt; font-style: italic; color: #626262"> 
                        Explain why you will not be ready on the trial date
                    </div>
                    <div v-if="!feelReady && feelReadyExplanation.length>0" style="background-color: #dedede; word-wrap: break-word;"
                        class="answerbox">{{ feelReadyExplanation }}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </div>
            </div>
            <div style="margin: 1rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>20. </b>
                I believe this trial will take
                <grey-box-form
                    style="text-indent:0;display:inline;" 
                    textwidth="5rem"
                    :text="trialTimeOne"/> 
                hours or
                <grey-box-form
                    style="text-indent:0;display:inline;" 
                    textwidth="5rem"
                    aftertext="days."
                    :text="trialTimeTwo"/> 
            </div>
            <div style="margin: 0.5rem 0 0 0.5rem; padding-left: 10px;">
                <b>21. </b>
                I have reviewed the witnesses I plan to call and the information I plan to rely on during 
                trial when I calculated the amount of time needed for Trial
                <div style="display:inline-block; margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                        shift="10" shiftmark="0"  marginLeft="1.75rem" :check="reviewedWitnesses?'yes':''"  text="<b>Yes<b/>"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                        shift="-8" shiftmark="0" marginLeft="0.5rem" :check="!reviewedWitnesses?'yes':''" text="<b>No</b>"/> 
                </div>
            </div>
        </div>
        <div style="width: 20%; margin-top:100px">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    Even if your trial has been 
                    scheduled, it is helpful if you 
                    give the court an estimate of 
                    how long you think the trial 
                    will take, especially now that 
                    you have done some 
                    planning. Consider the 
                    evidence you plan to present.
                    Note: A day of court time is 
                    approximately 5 hours
                </p>
            </NoteBox>
        </div>
    </div>

    <!-- Part 8 -->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row; gap:6px; font-size:10pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="8" title=" Orders at the Trial Preparation Conference" />
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>22. </b>
                <i style="color: #626262">Complete only if applicable. You may leave this question blank.</i>
                <p style="margin-left:1rem">I will be asking for the following order(s) at the trial preparation conference:</p>
                <div v-if="orders && orderDetails.length>0" style="background-color: #dedede; word-wrap: break-word;" class="answerbox">{{ orderDetails }}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </div>
        <!-- <For registery> -->
        <div class="print-block">
            <div style="background: #828282; color: white; font-size: 11pt;">
                Instructions for judicial case manager
            </div>
            <i>To be completed by the Judge if required</i>
            <div style="width:96.37%; border:1px solid; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <div style="text-indent:4px; margin:0 0 0.5rem 0; font-weight:bold; font-size: 11pt;">To the Judicial Case Manager:</div>
                <div style="margin:0rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="false?'yes':''" 
                        text="Trial date(s) confirmed as scheduled"/>                        
                </div>
                <div style="margin:0.5rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="false?'yes':''" 
                        text="Trial to be set for"/>
                    <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="3rem" beforetext="" hint="" text=""/>
                    <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="3rem" beforetext="hours or" hint="" text=""/>
                    <div style="display:inline-block;">days</div>                        
                </div>                               
                <div style="margin: 1rem 0 1rem 0; ">Additional comments:
                    <div style="background-color: #d6d6d6; height:100px"/>
                </div>
                <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="Date:" hint="" text=""/>
                <div style="text-indent:2px;display:inline; margin-left:1rem;">
                    Signature of Judge:
                </div>
            </div>
        </div>
        </div>
        <div style="width: 20%; margin-top:10px">
            <NoteBox textColor="#626262">
                <b-icon-info-circle-fill />
                <p>
                    At a trial preparation 
                    conference, a judge may 
                    make orders or directions 
                    [Rule 112]. The orders or 
                    directions are usually about 
                    how the trial will proceed or 
                    things that need to be done 
                    before the trial to get ready for 
                    it. The judge will be prepared 
                    to make some of these orders 
                    or directions without you 
                    asking, but if there is 
                    something specific you need, 
                    you can ask here.
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

import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { aboutTheTrialSurveyDataInfoType, backgroundTrisSurveyDataInfoType, disclosureOfInformationSurveyDataInfoType, interpreterDetailsDataInfoType, issuesForTrialInfoType, ordersAtTpcSurveyDataInfoType, peopleAtTrialSurveyDataInfoType, requirementsAndConsiderationsSurveyDataInfoType, witnessesSurveyDataInfoType } from '@/types/Application/TrialReadinessStatement';
import _ from 'underscore';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        FormHeader,
        FormPart,
        GreyBoxForm,
        NoteBox
    }
})
export default class Form22Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;   
    otherParties = '';
    existingFileNumber = '';
    hasLawyer = false;
    lawyerName = '';
    childCaseLawyer = '';
    issuesList = [];
    otherIssue = '';
    ppmIssue = '';

    attendedFamilyConf = false;
    ongoingDis = false;
    resolvable = '';
    existingOrder = [];
    sec183ExpiryDate = '';
    sec810ExpiryDate = '';
    sec515ExpiryDate = '';
    probationExpiryDate = '';
    existingOrderOther = '';

    finInfoOnFile = '';
    copyForParty = false;
    copyForPartyDate = '';
    needInfo = false;
    neededInfoDesc = '';

    listOfWitnesses = [];
    numberOfWitnessLines = 0;
    firstTwoWitnesses = [];
    additionalWitnesses = [];
    witnessLineArray = [];
    expertReports = '';
    reportProvided = ''; 
    expertCalled = '';
    timeRequired = '';
    reportOrdered = false;
    reportCompleted = '';
    orderAttendTrial = '';
    witnessesConfirmed = false;
    travellingForTrial = false;

    disabilitySpecs = '';
    interpreterInfo = {} as interpreterDetailsDataInfoType;
    safetySpecs = '';
    specialReqList = [];
    techSpecs = ''
    trialSpecs = '';

    trialScheduled = false;
    trialDate = '';
    feelReady = false;
    feelReadyExplanation = '';
    trialTimeOne = '';
    trialTimeTwo = '';
    reviewedWitnesses = false;

    orders = false;
    orderDetails = '';

    headerItems = [];
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.headerItems = [
            {
                name:'REGISTRY LOCATION:', 
                value: this.result.applicationLocation
            },
            {
                name:'COURT FILE NUMBER:',
                value: this.existingFileNumber ? this.existingFileNumber : null
            },
            null,
            {
                name: "Document number:",
                subtitle: 'For registry use only',
                value: ""
            }
        ];            
        this.dataReady = true;        
    }
   
    public extractInfo(){ 
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.getPeopleInfo();
        this.getIssuesInfo();
        this.getBackgroundInfo();
        this.getDisclosureInfo();  
        this.getWitnessesInfo();      
        this.getReqInfo();
        this.getTrialInfo();
        this.getOrdersInfo();
    } 

    public getPeopleInfo(){  
        
        this.yourInfo = {} as yourInformationInfoDataInfoType;
        this.otherParties = '';
        this.hasLawyer = false;
        this.lawyerName = '';
        this.childCaseLawyer = '';

        if(this.result?.peopleAtTrialSurvey){

            let peopleInfo = {} as peopleAtTrialSurveyDataInfoType;

            peopleInfo = this.result.peopleAtTrialSurvey;
            this.yourInfo = getYourInformationResults(peopleInfo);

            const otherPartiesList = [];
            for (const otherParty of peopleInfo.otherPartyInfoTris){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }

            this.otherParties = otherPartiesList.join(', ');   
            this.hasLawyer = peopleInfo.Lawyer == 'y';

            if (this.hasLawyer){
                this.lawyerName = Vue.filter('getFullName')(peopleInfo.LawyerName);
            } 
            if (peopleInfo.CaseType == 'other'){
                this.childCaseLawyer = peopleInfo.CaseTypeComment;
            }
        }    
    }

    public getIssuesInfo(){  
        
        this.issuesList = [];
        this.otherIssue = '';
        this.ppmIssue = '';

        if(this.result?.issuesForTrialSurvey?.IssuesForTrial){

            let issuesInfo = {} as issuesForTrialInfoType;
            issuesInfo = this.result.issuesForTrialSurvey.IssuesForTrial;
            this.issuesList = issuesInfo.checked?issuesInfo.checked:[]
            
            if (this.issuesList.includes('Ppm')){
                this.ppmIssue = issuesInfo.PpmComment?issuesInfo.PpmComment:'';
            }
            if (this.issuesList.includes('Other')){
                this.otherIssue = issuesInfo.OtherComment?issuesInfo.OtherComment:'';
            }           
        }    
    }

    public getBackgroundInfo(){  
        
        this.attendedFamilyConf = false;
        this.ongoingDis = false;
        this.resolvable = '';
        this.existingOrder = [];
        this.sec183ExpiryDate = '';
        this.sec810ExpiryDate = '';
        this.sec515ExpiryDate = '';
        this.probationExpiryDate = '';
        this.existingOrderOther = '';

        if(this.result?.backgroundTrisSurvey){

            let backgroundInfo = {} as backgroundTrisSurveyDataInfoType;

            backgroundInfo = this.result.backgroundTrisSurvey;

            this.attendedFamilyConf = backgroundInfo.AttendedConference == 'y';
            this.ongoingDis = backgroundInfo.OngoingDiscussions == 'y';
            if (this.ongoingDis){
                this.resolvable = backgroundInfo.Resolvable;
            }
            
            if (backgroundInfo.ExistingCourtOrder){

                const existingCourtOrder = backgroundInfo.ExistingCourtOrder;
                this.existingOrder = existingCourtOrder.checked;

                if (this.existingOrder.includes('otherOrder')){
                    this.existingOrderOther = existingCourtOrder.otherOrderComment?existingCourtOrder.otherOrderComment:'';
                }
                if (this.existingOrder.includes('peaceBond')){
                    this.sec810ExpiryDate = existingCourtOrder.peaceBondInput?Vue.filter('beautify-date')(existingCourtOrder.peaceBondInput):'';
                }
                if (this.existingOrder.includes('probationOrder')){
                    this.probationExpiryDate = existingCourtOrder.probationOrderInput?Vue.filter('beautify-date')(existingCourtOrder.probationOrderInput):'';
                }
                if (this.existingOrder.includes('protectionOrder')){
                    this.sec183ExpiryDate = existingCourtOrder.protectionOrderInput?Vue.filter('beautify-date')(existingCourtOrder.protectionOrderInput):'';
                }
                if (this.existingOrder.includes('bailOrder')){
                    this.sec515ExpiryDate = existingCourtOrder.bailOrderInput?Vue.filter('beautify-date')(existingCourtOrder.bailOrderInput):'';
                }
            } 
        }
    }

    public getDisclosureInfo(){  
        
        this.finInfoOnFile = '';
        this.copyForParty = false;
        this.copyForPartyDate = '';
        this.needInfo = false;
        this.neededInfoDesc = '';

        if(this.result?.disclosureOfInformationSurvey){

            let disclosureInfo = {} as disclosureOfInformationSurveyDataInfoType;
            disclosureInfo = this.result.disclosureOfInformationSurvey;

            if (this.issuesList.includes('ChildSupport') || this.issuesList.includes('SpousalSupport')){
                this.finInfoOnFile = disclosureInfo.FinancialOnFile;
            }
            
            this.copyForParty = disclosureInfo.InfoProvided == 'y';
            if (!this.copyForParty){
                this.copyForPartyDate = disclosureInfo.DateProvided?Vue.filter('beautify-date')(disclosureInfo.DateProvided):'';
            }
            this.needInfo = disclosureInfo.InfoRequired == 'y';
            if (this.needInfo){
                this.neededInfoDesc = disclosureInfo.DescriptionInfoRequired?disclosureInfo.DescriptionInfoRequired:'';
            }
        }
    }

    public getWitnessesInfo(){ 

        this.listOfWitnesses = [];
        this.expertReports = '';
        this.reportProvided = ''; 
        this.expertCalled = '';
        this.timeRequired = '';
        this.reportOrdered = false;
        this.reportCompleted = '';
        this.orderAttendTrial = '';
        this.witnessesConfirmed = false;
        this.numberOfWitnessLines = 0;
        this.firstTwoWitnesses = [];
        this.additionalWitnesses = [];
        this.witnessLineArray = [];

        if(this.result?.witnessesSurvey){

            let witnessesInfo = {} as witnessesSurveyDataInfoType;
            witnessesInfo = this.result.witnessesSurvey;

            this.listOfWitnesses = [];
            for (const witness of witnessesInfo.Witnesses){
                this.listOfWitnesses.push(Vue.filter('getFullName')(witness.name))
            }

            this.firstTwoWitnesses = this.listOfWitnesses.slice(0,2);
            if (this.listOfWitnesses?.length > 2) {
                this.listOfWitnesses.splice(0,2)
                this.additionalWitnesses = this.listOfWitnesses;
            } 

            this.numberOfWitnessLines = Math.ceil((this.listOfWitnesses.length)/2);
            this.witnessLineArray = Array.from(Array(this.numberOfWitnessLines).keys())
            this.expertReports = witnessesInfo.ExpertReportsExist;

            if (this.expertReports == 'Yes'){
                this.reportProvided = witnessesInfo.ExpertReportProvided;
                this.expertCalled = witnessesInfo.ExpertCalled;
                if (this.expertCalled == 'Yes'){
                    this.timeRequired = witnessesInfo.ExpertTimeRequired;
                }
            }
            this.reportOrdered = witnessesInfo.ReportOrdered == 'y';
            if (this.reportOrdered){
                this.reportCompleted = witnessesInfo.ReportCompleted;
                this.orderAttendTrial = witnessesInfo.OrderAttendTrial;
            }
            this.witnessesConfirmed = witnessesInfo.WitnessesConfirmed == 'y';
            this.travellingForTrial = witnessesInfo.TravellingForTrial == 'y';
        }
    }

    public getReqInfo(){

        this.disabilitySpecs = '';
        this.interpreterInfo = {
            language: '',
            name: ''
        };
        this.safetySpecs = '';
        this.specialReqList = [];
        this.techSpecs = ''
        this.trialSpecs = '';

        if(this.result?.requirementsAndConsiderationsSurvey){

            let reqInfo = {} as requirementsAndConsiderationsSurveyDataInfoType;
            reqInfo = this.result.requirementsAndConsiderationsSurvey;

            this.specialReqList = reqInfo.specialReqList?reqInfo.specialReqList:[];

            if (this.specialReqList.includes('technology')){
                this.techSpecs = reqInfo.techSpecs?reqInfo.techSpecs:'';
            }
            if (this.specialReqList.includes('interpreter')){
                this.interpreterInfo.language = reqInfo.interpreterInfo?.language?reqInfo.interpreterInfo.language:'';
                this.interpreterInfo.name = reqInfo.interpreterInfo?.name?reqInfo.interpreterInfo.name:'';
            }
            if (this.specialReqList.includes('safety')){
                this.safetySpecs = reqInfo.safetySpecs?reqInfo.safetySpecs:'';
            }
            if (this.specialReqList.includes('accommodations')){
                this.trialSpecs = reqInfo.trialSpecs?reqInfo.trialSpecs:'';
            }
            if (this.specialReqList.includes('disability')){
                this.disabilitySpecs = reqInfo.disabilitySpecs?reqInfo.disabilitySpecs:'';
            }
        }
    }

    public getTrialInfo(){  
        
        this.trialScheduled = false;
        this.trialDate = '';
        this.feelReady = false;
        this.feelReadyExplanation = '';
        this.trialTimeOne = '';
        this.trialTimeTwo = '';
        this.reviewedWitnesses = false;

        if(this.result?.aboutTheTrialSurvey){

            let trialInfo = {} as aboutTheTrialSurveyDataInfoType;
            trialInfo = this.result.aboutTheTrialSurvey;
            this.trialScheduled = trialInfo.TrialScheduled == 'y';

            if (this.trialScheduled){
                this.trialDate = Vue.filter('beautify-date-full-no-weekday')(trialInfo.TrialDate);
            } else {
                this.trialDate = 'N/A'
            }

            this.feelReady = trialInfo.FeelReady == 'y';

            if (!this.feelReady){
                this.feelReadyExplanation = trialInfo.FeelReadyExplanation;
            }
            this.trialTimeOne = trialInfo.TrialTimeStatement?.hourCount?trialInfo.TrialTimeStatement.hourCount:'';
            this.trialTimeTwo = trialInfo.TrialTimeStatement?.dayCount?trialInfo.TrialTimeStatement.dayCount:'';
            this.reviewedWitnesses = trialInfo.Reviewed == 'y';            
        }
    }

    public getOrdersInfo(){  
        
        this.orders = false;
        this.orderDetails = '';       

        if(this.result?.ordersAtTpcSurvey){
            let orderInfo = {} as ordersAtTpcSurveyDataInfoType;
            orderInfo = this.result.ordersAtTpcSurvey;
            this.orders = orderInfo.ordersToAsk == 'y';
            if (this.orders){
                this.orderDetails = orderInfo.orders;
            }            
        }
    }      
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>