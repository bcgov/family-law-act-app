<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
    <FormHeader 
            :headerTableData="headerItems" 
            formName="Trial Readiness Statement" 
            formNumber=22 
            subtitle="Provincial Court Family Rules"
            formRuleNumber="Rule 110" />
        
    <!-- <DISCLAIMER> -->
    <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
        <div style="flex:1; margin-right: 10px;">
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
    <div style="display:flex; flex-direction:row; gap:6px; font-size:11pt">
        <div style="width: 80%; margin-right: 10px;">
            <FormPart :part="1" title="Parties and lawyers at trial" />
            <!-- 1 -->
            <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                <b>1. </b>
                <grey-box-form style="text-indent:2px;display:inline-block;" textwidth="23.5rem"
                    hintindent="160px" beforetext="<b>My full name</b> is " hint="Full name of party" :text="yourInfo.name | getFullName" />
            </div>
            <!-- 2 -->
            <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>2. </b>
                <div style="text-indent:5px;display:inline; font-style: italic;"> 
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
                        style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                        textwidth="25rem" 
                        beforetext=""
                        hintindent="165px"
                        hint="Full name of lawyer" 
                        :text="lawyerName"/>                    
                </div>
            </div>
            <!-- 3 -->
            <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>3. </b>
                <grey-box-form 
                    style="text-indent:2px;display:inline;" 
                    textwidth="17rem" 
                    beforetext="The <b>other party's full name</b> is: " 
                    hint="Full name of other party/parties" 
                    :italicHint="false" :text="otherParties"/>
            </div>
             <!-- 4 -->
             <div style="margin: 0.5rem 0 0 1rem; text-indent: -10px; padding-left: 10px;">
                <b>4. </b>
                <div style="font-style: italic; display: inline;"> 
                    Complete only if applicable. You may leave this section blank.
                </div> 
                <div style="margin-left:1rem;">
                    <grey-box-form 
                        style="text-indent:2px;display:inline-block; margin-top:0.33rem" 
                        textwidth="16rem" 
                        beforetext="The <b>lawyer for the child</b>(ren) is:" 
                        hint="Full name of lawyer" 
                        :italicHint="false" :text="childCaseLawyer"/>                                         
                </div>
            </div>
        </div>
        <div style="width: 20%; margin-top:100px">
            <NoteBox>
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
    <div style="display:flex; flex-direction:row; gap:6px; font-size:11pt">
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
                            :check="issuesList.includes('Ppm')?'yes':''" text="Priority parenting matter <i>(specify)</i>:"/>
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
                            :check="issuesList.includes('Other')?'yes':''" text="Other <i>(specify)</i>:"/>
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
    <div style="display:flex; flex-direction:row; gap:6px; font-size:11pt">
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
                    <i><b>⤷ If yes</b></i>, is there likelihood of resolution before the trial?
                </div>
                <div style="display:inline-block; margin: 0.5rem 0 0 0">
                    <check-box inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                    shift="10"  marginLeft="1.75rem" :check="resolvable == 'y'?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline; text-indent:-16px; font-weight: bold;" 
                    shift="-8" marginLeft="0.5rem" :check="resolvable == 'n'?'yes':''" text="No"/> 
                </div>
            </div>
        </div>
        <div style="width:20%">
            <NoteBox>
                <b-icon-info-circle-fill />
                <p>
                    A family settlement 
                    conference is a type of court 
                    appearance [Part 8 -
                    Provincial Court Family 
                    Rules].
                </p>
            </NoteBox>
        </div>
    </div>
<!-- 
        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block;" 
                textwidth="17rem" 
                beforetext="The trial has been scheduled for the following date(s):" 
                hint="(mmm/dd/yyyy)" 
                :italicHint="false" :text="trialDate"/>

            <div style="margin-top: 0.25rem;text-indent:1px">
                <i>Note: If no trial date has been scheduled please indicate ‘Not Applicable’ or ‘N/A’</i>
            </div>        

        </section>
           
        <div style="margin-top: 1rem;"></div>   -->

    <!-- <7> -->
        <section>
            <div style="text-indent:5px;display:inline; font-style: italic;"> 
                Select whichever statement is correct
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="feelReady?'yes':''" text="I am ready to start on the scheduled trial date"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="!feelReady?'yes':''" 
                    text="I will not be ready to start on the scheduled trial date because:"/>
                <div class="marginleft-0p5vue" style="margin-left:0.5rem; text-indent:0px;font-size: 9pt; font-style: italic;"> 
                    Explain why you will not be ready on the trial date
                </div>
                <div v-if="!feelReady && feelReadyExplanation.length>0" 
                    class="answerbox">{{ feelReadyExplanation }}</div>
                <div v-else style="margin-bottom:3rem;"></div>                    
            </div>
        </section>

    <!-- <8> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                I have attended a family settlement conference
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="attendedFamilyConf?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!attendedFamilyConf?'yes':''" text="No"/> 
            </div>
        </section>

    <!-- <9> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                Are there ongoing settlement discussions?
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="ongoingDis?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!ongoingDis?'yes':''" text="No"/> 
            </div>
            <div>
                <div style="display:inline; text-indent:0; margin:0 0rem 0 0.85rem; font-size: 9.5pt;">
                    <i>If yes</i>, is there likelihood of resolution before the trial?
                </div>
                <div style="display:inline">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10"  marginLeft="1.75rem" :check="resolvable == 'y'?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" marginLeft="0.5rem" :check="resolvable == 'n'?'yes':''" text="No"/> 
                </div>
            </div>            
        </section>

    <!-- <10> -->
        <section>
            <div style="text-indent:5px;display:inline;"> 
                Please select the correct statement
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="finInfoOnFile == ''?'yes':''" 
                    text="The issue(s) to be determined at trial do not include a support issue"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="finInfoOnFile=='y'?'yes':''" 
                    text="My financial information on file with the court is current"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="finInfoOnFile=='n'?'yes':''" 
                    text="There have been changes to my financial information since I filed the Financial Statement"/>
            </div>
        </section>

    <!-- <11> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                I have provided each other party with a copy of the information I plan to 
                rely on during the trial, including financial information, documents, 
                and a list of witnesses
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="copyForParty?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!copyForParty?'yes':''" text="No"/> 
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-left: 1rem;" 
                    textwidth="17rem" 
                    beforetext="<i>If no</i>, when can these be provided to the parties?" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="copyForPartyDate"/>
            </div>            
        </section>

    <!-- <12> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                Is there any information you still need from the other party, including 
                financial information, documents, or a list of witnesses?
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="needInfo?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!needInfo?'yes':''" text="No"/> 
            </div>
            <div>                
                <div style="text-indent:0.25px;font-size: 9pt; font-style: italic;"> 
                    If yes, please explain what information you need
                </div>
                <div v-if="needInfo" 
                    class="answerbox">{{ neededInfoDesc }}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>            
        </section>

    <!-- <13> -->
        <section>
            <div style="text-indent:5px;display:inline;"> 
                I plan to have the following people attend as witnesses in this trial:
            </div>
            <div style="text-indent:5px;font-size: 9pt;font-style: italic;"> 
                Include your own name on the list if you plan to provide evidence
            </div>          
            <div style="margin:0.5rem 0 0 1.25rem;">
                <div style="text-indent:1px;display:inline; font-size: 9pt;"> 
                    Names:
                </div> 
                <div style="display: inline;">
                
                <underline-form
                    style="text-indent:0;display:inline;margin-left:1rem;" 
                    textwidth="16.5rem" 
                    beforetext="(1)" 
                    hint="" 
                    :text="firstTwoWitnesses[0]"/>
                <underline-form
                    style="text-indent:0;margin-left:1rem;display:inline;" 
                    textwidth="16.5rem" 
                    beforetext="(2)" 
                    hint="" 
                    :text="firstTwoWitnesses[1]"/>    
                    </div>                               
            </div>
            <div v-if="additionalWitnesses.length>0">
                <div  v-for="witness, inx in witnessLineArray" :key="inx" style="margin:0.5rem 0 0 4.15rem;">   
                
                <underline-form
                    style="text-indent:0;display:inline;margin-left:1rem;" 
                    textwidth="16.5rem" 
                    :beforetext="'('+ (2*inx + 3) + ')'" 
                    hint="" 
                    :text="additionalWitnesses[2*inx]"/>
                <underline-form
                    style="text-indent:0;margin-left:1rem;display:inline;" 
                    textwidth="16.5rem" 
                    :beforetext="'('+ (2*inx + 4) + ')'"
                    hint="" 
                    :text="additionalWitnesses[2*inx+1]"/>                    
            </div>
            

            </div>
            
        </section>

    <!-- <14> -->
        <section>
            <div style="font-size:9.75pt; display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                Are there expert reports? Expert reports provide information to help the court. 
                <i>
                    They are written by an expert who has special knowledge about a certain area 
                    because of their training, education and work experience.
                </i>
            </div>
            <div style="display:inline-block;margin-left: 0.5rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'Yes'?'yes':''"  text="Yes"/>                        
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'No'?'yes':''" text="No"/> 
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertReports == 'Unknown'?'yes':''" text="Unknown"/>                 
            </div>
            <div style="margin-left: 1rem;">
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; font-size: 9.45pt;">
                    If yes, (a) has the report been provided to the other party?
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10"  marginLeft="1.75rem" :check="reportProvided == 'y'?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" marginLeft="0.5rem" :check="reportProvided == 'n'?'yes':''" text="No"/> 
                </div> 
            </div>
            <div style="margin-left: 2rem;">
                <div style="text-indent:0; margin:0 0 0 0rem; font-size: 9.25pt;">
                    (b) will the expert be called as a witness at the trial to provide opinion evidence or to be asked questions?
                </div>
                <div style="margin-left: 0.5rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'Yes'?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'No'?'yes':''" text="No"/> 
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="expertCalled == 'Unknown'?'yes':''" text="Unknown"/>                 
                </div>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-left: 3rem;" 
                    textwidth="10rem" 
                    beforetext="<i>If yes</i>, please estimate how much time will be needed at the trial for them:" 
                    hint="" 
                    :italicHint="false" :text="timeRequired"/>
            </div>                   
        </section>

    <!-- <15> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;font-size: 9.5pt;">
                Has a report been ordered for views of the child or needs of the child under section 211?
            </div>
            <div style="display:inline-block;margin-left: 0.5rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="reportOrdered?'yes':''"  text="Yes"/>                        
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="!reportOrdered?'yes':''" text="No"/>                
            </div>
            <div style="margin-left: 1.35rem;">
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; font-size: 9.45pt;">
                    If yes, (a) has the report been completed?
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10"  marginLeft="1.75rem" :check="reportCompleted=='y'?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" marginLeft="0.5rem" :check="reportCompleted=='n'?'yes':''" text="No"/> 
                </div> 
            </div>
            <div style="margin-left: 3rem;">
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; font-size: 9.25pt;">
                    (b) is there a court order requiring the person who prepared the report to attend the trial?
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" marginLeft="1.75rem" :check="orderAttendTrial=='y'?'yes':''"  text="Yes"/>                        
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="orderAttendTrial=='n'?'yes':''" text="No"/>                
                </div>
            </div>                  
        </section>

    <!-- <16> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                I have confirmed all my witnesses are available for the trial date(s) OR 
                I have served them with a Subpoena to Witness in Form 23:
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="witnessesConfirmed?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!witnessesConfirmed?'yes':''" text="No"/> 
            </div>
        </section>   

    <!-- <17> -->
        <section>
            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                Is there any witness or party travelling from another community to attend the trial?
            </div>
            <div style="display:inline-block;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" 
                shift="10"  marginLeft="1.75rem" :check="true?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                shift="-8" marginLeft="0.5rem" :check="!true?'yes':''" text="No"/> 
            </div>
        </section>  

    <!-- <18> -->
        <section>
            <div style="text-indent:5px;display:inline;"> 
                I have the following special requirements/considerations:
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="specialReqList.includes('technology')?'yes':''" text="technology needs"/>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 1.25rem;" 
                    textwidth="36rem" 
                    beforetext="<i>Specify:</i>" 
                    hint="" 
                    :italicHint="false" :text="techSpecs"/>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0.5rem 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="specialReqList.includes('interpreter')?'yes':''" 
                    text="interpreter for"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="31.35rem" 
                    beforetext="" 
                    hint="(name of party or witness)" 
                    :text="interpreterInfo.name"/>                    
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 3rem;" 
                    textwidth="30rem" 
                    beforetext="language<i>(Specify):</i>" 
                    hint="" 
                    :italicHint="false" :text="interpreterInfo.language"/>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="specialReqList.includes('safety')?'yes':''" 
                    text="safety planning"/>
                <div style="font-style: italic;"> 
                    Please explain your concerns or why you need a safety plan in place
                </div>
                <div v-if="specialReqList.includes('safety')" 
                    class="answerbox">{{ safetySpecs }}</div>
                <div v-else style="margin-bottom:3rem;"></div>                    
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="specialReqList.includes('accommodations')?'yes':''" 
                    text=""/>
                <div style="display:inline;font-size:9.6pt;"> 
                    trial accommodations such as allowing evidence by affidavit, video or telephone attendance or other:
                </div>
                <div style="font-style: italic;"> 
                    Please specify
                </div>
                <div v-if="specialReqList.includes('accommodations')" 
                    class="answerbox">{{ trialSpecs }}</div>
                <div v-else style="margin-bottom:3rem;"></div>                    
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="specialReqList.includes('disability')?'yes':''" 
                    text="accommodations for disability such as an accessible court room, audio aids, or other:"/>                
                <div v-if="true" 
                    class="answerbox">{{ disabilitySpecs }}</div>
                <div v-else style="margin-bottom:3rem;"></div>                    
            </div>
        </section>

    <!-- <19> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size:9.25pt;"> 
                There is an existing court order involving one or more of the parties, and/or the child(ren) about the following:
            </div> 
            <div style="text-indent:5px; font-style: italic; font-size:9.25pt;"> 
                Select all options that apply
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('interimOrder')?'yes':''" text="interim order about the issue to be determined at trial"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('childProtectionOrder')?'yes':''" text="order under the <i>Child, Family and Community Service Act</i>"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('supremeOrder')?'yes':''" text="Supreme Court order under the <i>Family Law Act or Divorce Act</i>"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('protectionOrder')?'yes':''" text="section 183 <i>Family Law Act</i> protection order"/>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 3rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="sec183ExpiryDate"/>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('peaceBond')?'yes':''" text="section 810 <i>Criminal Code</i> peacebond"/>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 3rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="sec810ExpiryDate"/>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('bailOrder')?'yes':''" text="section 515 <i>Criminal Code</i> bail order"/>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 3rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="sec515ExpiryDate"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="existingOrder.includes('probationOrder')?'yes':''" text="<i>Criminal Code</i> probation order"/>
            </div>
            <div>                
                <underline-form 
                    style="text-indent:2px;display:inline-block; margin-left: 3rem;" 
                    textwidth="10rem" 
                    beforetext="Expiry date:" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="probationExpiryDate"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="existingOrder.includes('otherOrder')?'yes':''" 
                    text="other order that would affect the conduct of the trial <i>(specify)</i>:"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="13rem" 
                    beforetext="" 
                    hint="" 
                    :text="existingOrderOther"/>                    
            </div>
           
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="existingOrder.includes('none')?'yes':''" 
                    text="none of the above"/>                        
            </div>
        </section>
    <!-- <20> -->
        <section>
            <underline-form style="text-indent:3px; display:inline-block;" textwidth="3rem" beforetext="I believe this trial will take" hint="" :italicHint="false" :text="trialTimeOne"/>
            <underline-form style="display:inline;margin-left:0.5rem; text-indent:1px;" textwidth="3rem" beforetext=" hours or " hint="" :italicHint="false" :text="trialTimeTwo"/>
            <div style="line-height:2rem; text-indent:5px; display:inline;">
                 days. <i style="font-size:9pt;" >(Note: A day of court time = approximately 5 hours)</i>
            </div>   
            <div style="margin:0 0 0 0.75rem;text-indent:0px;">
                <div style="display:inline; margin:0;text-indent:0px;">
                    I have reviewed the witnesses I plan to call and the information I plan 
                    to rely on during trial when I calculated the amount of time needed for trial
                </div>
                <div style="display:inline;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" 
                    shift="10" shiftmark="0"  marginLeft="1.75rem" :check="reviewedWitnesses?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" 
                    shift="-8" shiftmark="0" marginLeft="0.5rem" :check="!reviewedWitnesses?'yes':''" text="No"/> 
                </div>
            </div>               
        </section>
    <!-- <21> -->
        <section>
            <div style="display: inline; margin:0.25rem 0 0 0.25rem;">
                <i>Complete only if applicable. You may leave this section blank.</i>
            </div>
            <div style="margin:0 0 0 0.75rem;text-indent:0px;"> 
                I will be asking for the following order(s) at the trial preparation conference:
            </div>
            <div v-if="orders && orderDetails.length>0" 
                class="answerbox">{{ orderDetails }}</div>
            <div v-else style="margin-bottom:3rem;"></div> 
        </section>        
    <!-- <For registery> -->
        <div class="print-block">
            <i style="margin-left: 1rem;">To be completed by the Judge if required</i>
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <div style="text-indent:4px; margin:0 0 0.5rem 0; font-weight:bold; font-size: 11pt;">To the Judicial Case Manager:</div>
                <div style="margin:0rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="false?'yes':''" 
                        text="trial date(s) confirmed as scheduled"/>                        
                </div>
                <div style="margin:0rem 0 0 1.5rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="false?'yes':''" 
                        text="trial to be set for"/>
                    <underline-form style="text-indent:2px;display:inline-block;" textwidth="3rem" beforetext="" hint="" text=""/>
                    <underline-form style="text-indent:2px;display:inline-block;" textwidth="3rem" beforetext="hours or" hint="" text=""/>
                    <div style="display:inline-block;">days</div>                        
                </div>                               
                <div style="margin: 1rem 0 4rem 0;">Additional comments:</div>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="Date:" hint="" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="18.5rem" beforetext="Signature of Judge:" hint="" text=""/>
                
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
            {},
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
                this.trialDate = Vue.filter('beautify-date')(trialInfo.TrialDate);
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