<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :tableItems="tableItems"></FormHeader>

        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1;">
                <div>
                    <p>This Application About a Family Law Matter provides notice to each party, and the court, of the family law matters to be resolved with the help of the court and may include:</p>
                    <ul>
                        <li>an application for a court order about a family law matter when no order or agreementabout the issue has been made before,</li>
                        <li>an application to change or cancel all or part of an existing final order about a familylaw matter, or</li>
                        <li>an application to set aside or replace all or part of an existing agreement about afamily law matter</li>
                    </ul>
                </div>
                <div style="border: 2px dotted #000">
                    <p><b>Please read before completing the form:</b></p>
                    <ul>
                        <li>You  must complete the main application and any applicable schedule(s) for your familylaw matter(s) identified in Part 3 of the main application.</li>
                        <li></li>For guidance filling in this form, please read the guidebook. The guide is availableonline at  <a href="http://www.gov.bc.ca/court-forms" target="_blank">www.gov.bc.ca/court-forms</a> or from your local court registry.</li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>A family law matter is a defined term under Rule 2 that means a case about one or more of the following:</p>
                    <ul>
                        <li>Parenting arrangements</li>
                        <li>Child Support</li>
                        <li>Contact with a child</li>
                        <li>Guardianship of a child</li>
                        <li>Spousal Support</li>
                        <li>Property division in respectof a companion animal</li>
                    </ul>
                </NoteBox>
            </div>
        </div>

        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1; border: 2px dotted #000;">
                <b>IMPORTANT NOTE TO THE OTHER PARTY:</b>
                
                <p>A party who is served with this application may file a reply. To file a reply, the party or their lawyer, must file a Reply to an Application About a Family Law Matter Form 6 and, if applicable, a Financial Statement Form 4, within 30 daysafter the date the party was served with the application.</p>
                
                <p>If you do not file a reply within the 30-day period, you will not be entitled to receive notice of any part of the case, including any conference, hearing or trial, and orders may be made in your absence.</p>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>As set out in Rule 28, to reply, a party must:</p>
                    <ul>
                        <li>file a reply in Form 6</li>
                        <li>if the application is aboutchild support or spousalsupport, file a financialstatement</li>
                        <li>if the application is in anearly resolution registry,have already met the earlyresolution requirements</li>
                    </ul>
                    
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- <1> -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="1" title="Notice of the application"></FormPart>
                <section class="resetquestion">
                    <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I understand the following people must be given noticeof my application:"/>
                    <ul style="margin:0 0 0 1.5rem;">
                        <li style="text-indent:0.25rem;">all parents and current guardians of each child who is the subject of the familylaw matter</li>
                        <li style="text-indent:0.25rem;">my spouse, if I am applying for spousal support or property division in respectof a companion animal</li>
                        <li style="text-indent:0.25rem;">each other adult who the family law matter is about</li>
                    </ul>
                    <p style="margin:0.5rem 0 0 2.35rem; text-indent:0;">They are the other party/parties in this case. To give notice, they must each beservedwith a copy of this document and any supporting documents.</p>                
                </section>
                <div style="background-color: #d6d6d6;">
                    <p><b>Additional notice requirements, as applicable:</b></p> 
                    
                    <p>If your application is about a support order or agreement that is <b>filed with the Director of Maintenance Enforcement</b>, you must give notice to the director.</p>
                    
                    <p>If your application is about guardianship of a <b>Nisga’a</b> or <b>Treaty First Nation child</b>, you must give notice to the Nisga'a Lisims Government or the Treaty First Nation to which the child belongs.</p>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about serving the other party, see the guidebook
                    </p>
                </NoteBox>
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about the additional notice requirements, see the guidebook.
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 2 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="2" title="About the parties"></FormPart>
                
                <section>
                    <GreyBoxForm style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My full name is:" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
                    <br>
                    <GreyBoxForm style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="My date of birth is:" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
                    <!-- address -->
                    <!-- <table class="fullsize">
                        <tr style="border:1px solid #414142" >
                            <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
                            <td v-else  colspan="3">Lawyer (if applicable): </td>
                        </tr>
                        <tr style="border:1px solid #414142">          
                            <td colspan="3">Address: <div class="answer">{{yourInfo.address.street}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{yourInfo.address.city}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{yourInfo.address.state}}</div> </td>
                            <td>Postal Code: <div class="answer">{{yourInfo.address.postcode}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                            <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                        </tr>
                    </table> -->
                </section>
                
                <!-- <3> -->
                <section> 
                    <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                        <GreyBoxForm style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party’s full name is:" hint="full name of the other party" :italicHint="false" :text="otherParty.name | getFullName"/>
                        <br>
                        <GreyBoxForm style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="Their date of birth(dd/mmm/yyyy) is:" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                        
                    </div>
                </section>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>If you need to add another party or need more space for any field on this form, you can attach a separate piece of paper to this application that includes the information.</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 3 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1;">
                <FormPart :part="3" title="Relationship between the parties"></FormPart>

                <div class="print-block">
                    <section>
                        <i>Select only one of the options below unless there is more than one party and both apply</i>

                        <div>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="relationshipBetweenParties.spouses?'yes':''" text="Yes"/>
                            I am (or was) the other party’s <b>spouse</b>.We are (or were) <b>married</b> or have lived together in a marriage-like relationship.

                            <p>
                                Complete the information below about your relationship, as applicable. You mayleave a field blank if it does not apply
                            </p>

                            <div>
                                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="8rem" beforetext="Date on which the parties began to live together in a marriage-like relationship(dd/mmm/yyyy):" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.startDate"/>
                                
                                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of marriage(dd/mmm/yyyy):" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.marriageDate"/>
                                
                                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of separation(dd/mmm/yyyy):" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.separationDate"/>    
                                
                            </div>
                        </div>

                        <div>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!relationshipBetweenParties.spouses?'yes':''" text="No"/>
                            I have never been the other party’s spouse.

                            <p>Please <b>describe your relationship</b> to the other party</p>
                        </div> 
                        <div class="answer">         
                            <span style="display:block;margin-left:1rem" >{{relationshipBetweenParties.description}}</span>
                        </div>
                        <!-- <div>
                            <i style="display:inline;margin-left:1rem" >Specify which other party if there is more than one: </i>
                            <underline-form style="text-indent:2px;display:inline;" textwidth="21.5rem" beforetext="" hint="name of other party" :text="relationshipBetweenParties.nameOfSpouse"/>
                        </div> -->
                    </section>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>Spouses may be separated even if they continue to live in the same residence [s. 3(4) Family Law Act].</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        
        <!-- Part 4 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="4" title="Identification of children"></FormPart>
                <div class="print-block">
                    <section>
                        <i style="display:inline; margin-left:0.25rem">Select the correct option below and provide the additional information if applicable</i>          
                        <div style="margin-left:1.5rem">
                            <check-box  :check="!aboutChildren?'yes':''" text="My family law matter is not about a childor children(skip to Question 8)</i>"/>
                            <check-box  :check="aboutChildren?'yes':''" text="My family law matter is about the following childor children:"/>
                            <i>Provide the requested information below for each child</i>
                        </div>
                        <b-table
                            :items="childrenInfo"
                            :fields="childrenFields"
                            class="mt-2"
                            small
                            bordered>                    
                                <template v-slot:cell()="data">
                                    <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                                </template>
                                <template v-slot:head(dob)>
                                    Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                                </template>
                        </b-table> 
                    </section>

                    <section>
                        <div>
                            <check-box inline="inline" boxMargin="0" style="display:inline;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                            <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the <b>best interestsof the child</b> with respect to each order I am asking the court to make about the child. The “best interests of the child” is a legal test used to decide what would best protect the child’s physical, psychological, and emotional safety, security and well-being [s. 37 Family Law Act].</div>
                        </div>
                    </section>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>A child’s residence is usually where they live at least 40% of the time. If a child currently splits their time between two residences, include both.</p>
                </NoteBox>
                
                <NoteBox>
                    <b-icon-book />
                    <p>For more information about best interests of the child, see the guidebook.</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 5 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="5" title="About us"></FormPart>
                
                <div class="print-block">    
                    <section>
                        
                        <div style="margin-left:.5rem; text-indent:0rem;">I would like to share the following information with the court about the <b>cultural,linguistic, religious and spiritual upbringing and heritage of my family</b>, including,if the child is an Indigenous child, the child’s Indigenous identity:</div>
                        
                        <i style="display:inline; margin-left:0.25rem">You may choose to leave this question blank</i>

                        <div style="margin-left:.5rem; text-indent:0rem;"></div>
                        
                        <div v-if="result.flmBackgroundSurvey.likeToAddCulturalExplanation == 'y'" class="answerbox">{{culturalInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </section>  
                </div> 
            </div>
            <div style="width: 20%"></div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 6 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="6" title="Existing orders and agreements"></FormPart>

                <div class="print-block">
                    
                    <section>
                        <div style="display:inline; margin-left:0.25rem">There is an <b>existing court order or written agreement</b> about parenting arrangements, child support, contact with a child, guardianship of a child, spousal support, and/or property division in respect of a companion animal.</div>          
                        <div style="margin-left:1rem">
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes (see attachedcopy)"/>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                        </div>
                    </section>
                </div>
        
                <section> 
                    <div style="display:inline; margin-left:0.25rem">
                        There is an <b>existing court order, agreement or plan protecting</b> one of the parties orthe child(ren), or restraining contact between the parties, including:
                        <ul>
                            <li>a protection order,</li>
                            <li>an order, agreement or plan involving child protection services, or</li>
                            <li>a peace bond, restraining order, bail condition or other criminal order.</li>
                        </ul>
                    </div>            
                    <div style="margin-left:1rem">
                        <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes (see attachedcopy)"/>
                        <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                    </div>
                </section>  
        
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>Include any order(interim or final), agreement or plan from any level of court and any location.</p>
                </NoteBox>
                <NoteBox>
                    <b-icon-book />
                    <p>If yes, you must attach a copy of any order, agreement or plan to this application for filing.</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

         <!-- Part 7 -->
         <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="7" title="What you are asking for in this application"></FormPart>

                <NoteBox fontSize="9pt">
                    <p>You may apply for a court order about one or more family law matters. If you have an existing final order or written agreement about the family law matter, the information you must provide the court is a little different than if you have never had a final order or agreement.</p>
                    
                    <p><b>Select each family law matter you want an order aboutand select the appropriate answer to the question below to identify which schedule you must complete.</b></p>
                </NoteBox>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>This part will help you identify which family law matter you need a court order about and the additional schedule you must complete to provide more information to the court and the other party.</p>
                </NoteBox>
            </div>
        </div>

        <!-- Part 7 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <div class="print-block">
                    <section>
                        <b style="margin-left:0.25rem">I am applying for a court orderabout the following family law matter(s):</b>
                        <div style="margin-left:1rem;">
                            <i>Select all options that apply, complete and attach the required schedule(s)</i>
                            
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;">
                                <div style="margin-top:0.25rem;"><b>Parenting arrangements</b>, including parental responsibilities and parenting time</div>
                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Parenting arrangements</b> include how each guardian will parent their child(ren), including each guardian’s responsibilities fordecision making about a child and the time each guardian spends with a child. Parental responsibilities can be shared by one or more guardians exclusively, separately, or jointly
                                </NoteBox>
                                <p>Do you have a final order or written agreement about parenting arrangements, including parental responsibilities and parenting time?</p>
                                <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="No - Complete Schedule 1"/>
                                <check-box  :check="selectedSchedules.includes('schedule2')?'yes':''" text="Yes - Complete Schedule 2"/>
                            </div>
                        
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;"> 
                                <div style="margin-top:0.25rem;"><b>Child support</b></div>
                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Child support</b> is the amount of money a parent or guardian pays to another parent or guardian to help care for the child.
                                </NoteBox>
                                <p>Do you have a final order or written agreement about child support?</p>
                                <check-box  :check="selectedSchedules.includes('schedule3')?'yes':''" text="No Complete Schedule 3"/>
                                <check-box  :check="selectedSchedules.includes('schedule4')?'yes':''" text="Yes Complete Schedule 4"/>
                            </div>
                            
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;">
                                <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>

                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Contact with a child</b> is the time a child spends with someone who is not their guardian.
                                </NoteBox>
                                <p>Do you have a final order or written agreement about contact with the child?</p>

                                <check-box  :check="selectedSchedules.includes('schedule5')?'yes':''" text="No - Complete Schedule 5"/>
                                <check-box  :check="selectedSchedules.includes('schedule6')?'yes':''" text="Yes - Complete Schedule 6"/>
                            </div>
        
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;">
                                <div style="margin-top:0.25rem;"><b>Guardianship of a child</b> - Appointing a new guardianor cancelling guardianshipof a child</div>

                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Guardianship</b> is who is responsible for a child. Only guardians have parental responsibilities and parenting time with a child.
                                </NoteBox>
                                <p>Do you have a final order or written agreement about child support?</p>

                                <check-box  :check="selectedSchedules.includes('schedule7')?'yes':''" text="appointing a guardian of a child <i>[complete and attach Schedule 7]</i>"/>
                                <check-box  :check="selectedSchedules.includes('schedule8')?'yes':''" text="cancelling guardianship of a child <i>[complete and attach Schedule 8]</i>"/>
                            </div>
        
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;">
                                <div style="margin-top:0.25rem;"><b>Spousal support</b></div>

                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Spousal support</b> is money that one spouse pays to another spouse for their financial support after separation.
                                </NoteBox>
                                <p>Do you have a final order or written agreement about spousal support?</p>

                                <check-box  :check="selectedSchedules.includes('schedule9')?'yes':''" text="spousal support – new <i>[complete and attach Schedule 9]</i>"/>
                                <check-box  :check="selectedSchedules.includes('schedule10')?'yes':''" text="spousal support order/agreement – existing <i>[complete and attach Schedule 10]</i>"/>
                            </div>
        
                            <div style="border: 1px solid #333; margin-bottom: 8px; padding: 8px;">
                                <div style="margin-top:0.25rem;"><b>Property division</b></div>

                                <NoteBox borderRadius="8px" border="1px solid #333">
                                    <b>Property division</b> in respect of a companion animalis who will have ownership and possession of a companion animalwhen spouses separate.The court may only make an order for ownership and possession by one spouse.
                                </NoteBox>
                                <p>Do you have a final order or written agreement about child support?</p>

                                <check-box  :check="selectedSchedules.includes('schedule11')?'yes':''" text="in respect a companion animal - new <i>[complete and attach Schedule 11]</i>"/>
                                <check-box  :check="selectedSchedules.includes('schedule12')?'yes':''" text="companion animal agreement – existing <i>[complete and attach Schedule 12]</i>"/>
            
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 8 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <div style="background: #eee; border: 2px dashed #333; padding: 4px;">
                    <p><b>IMPORTANT NOTE:</b></p>
                    
                    <p>If you have an <b>interim order</b> about a family law matter that you want to change or cancel, you must file a Request for Scheduling Form 39.</p>
                    
                    <p>If you already filed an application or counter application about a family law matter, and you need an interim order, speak to the judge at your next scheduled appearance or file a Request for Scheduling Form 39 to request a court appearance.</p>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-book></b-icon-book>
                    <p>
                        For more information about whether you have an interim or final order, see the guidebook. 
                    </p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 8 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="8" title="Filing location and initial requirements"></FormPart>

                <div class="print-block">
                    <section>
                        <div style="display:inline; margin:0 0 0 0.25rem">I am filing this application in the court registry:</div>
                        <div style="margin-left:1rem;">
                            <i>Select only one of the options below</i>
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                                text="Where my <b>existing case</b> with the same party/parties is located. I already have a court file number."/> 
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                                text="Closest to <b>where the child lives</b> most of the time, because my case involves achild-related issue"/>          
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" 
                                text="Closest to <b>where I live</b> because my case does not involve a child-related issue"/>
                            <check-box  
                                :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" 
                                text="Permitted by <b>court order</b>"/>                    
                        </div>
                    </section>
                </div>

                <div class="print-block">
                    
                    <section> 
                        I am filing my application in:
                        <check-box style="margin:0 0 0 1rem;" :check="locationInfo.earlyResolutionRegistry?'yes':''" text="an early resolution registry and I have met the following requirements:<br/><i>The requirements have been met if you <span style='text-decoration: underline;'>completed or participated in</span>, or if <span style='text-decoration: underline;'>you were granted an exemption</span> from completing or participating in, the following: <br/>Select all options that apply.</i>"/>
                        <div style="margin:0 0 0 2.75rem;">
                            <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="needs assessment"/>
                            <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="parenting education program"/>
                            <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="consensual dispute resolution"/>
                        </div>
                        <check-box style="margin:0.25rem 0 0 1rem;" :check="locationInfo.familyJusticeRegistry?'yes':''" text="a family justice registry and I understand I will be required to participate in a needs assessment and complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                        <check-box style="margin:0.25rem 0 0 1rem;" :check="locationInfo.educationRegistry?'yes':''" text="a parenting education program registry and I understand I will be required to complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                    </section>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <p>Rule 7 sets out these requirements for which registry to use.Talk to the court registry to see if there is already an existing case at a court location</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
  
        <!-- Part 9 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="9" title="Lawyer’s statement" subtitle="Complete this part only if you are a lawyer for the party."></FormPart>

                <div class="print-block">
                
                    <section>
                        <div style="display:inline; margin-left:0.25rem">Complete this section only if you are a lawyer for the party. You may leave this section blank.</div>
                        <div>
                            <check-box  inline="inline" boxMargin="0" style="margin:0 0 0 1rem;display:inline" :check="yourInfo.lawyerFiling?'yes':''" text=""/>
                            <underline-form style="text-indent:0px;display:inline;" textwidth="15.5rem" beforetext="I, " hint="full name of lawyer" :text="yourInfo.lawyerStatement.lawyerName"/>
                            <underline-form style="text-indent:2px;display:inline;" textwidth="16.25rem" beforetext=", the lawyer for" hint="full name of party" :text="yourInfo.lawyerStatement.clientName"/>
                            <div style="display:inline;">, acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>. </div>
                        </div>           
                    </section>
                </div>
            </div>
        </div>
  
        <div style="margin-top:1rem;"></div>
            
        <!-- Part 10 -->
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                
                <FormPart :part="10" title="Address for service"></FormPart>
                <div>
                    <p>My address for service of court documents and contact information is:You must provide an address for service and contact number, but it does not have to beyour own if you don’t want to</p>
                </div>
            </div>
        </div>
  
        <div style="margin-top:1rem;"></div>
   
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {getYourInformationResults} from "@/components/utils/PopulateForms/PopulateCommonInformation";
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { locationInfoDataInfoType, relationshipBetweenPartiesInfoType, existingOrdersInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';


@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        CourtStamp,
        FormHeader,
        FormPart,
        NoteBox,
    }
})
export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedSchedules!: string[];
    
    @applicationState.State
    public applicantName!: nameInfoType;    
    
    dataReady = false;
    aboutChildren = false;

    locationInfo = {} as locationInfoDataInfoType;

    otherPartyInfo=[];
    yourInfo = {} as yourInformationInfoDataInfoType;

    applicantList = []
    
    existingOrders = {} as existingOrdersInfoType;
    
    relationshipBetweenParties = {} as relationshipBetweenPartiesInfoType;
    childrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    culturalInfo = '';  
    filingLocationReason = '';
    
    tableItems = [];
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();   
        
        this.tableItems = [
            {
                name:'REGISTRY LOCATION:', 
                value: this.result.applicationLocation
            },
            {
                name:'COURT FILE NUMBER:', 
                value:this.locationInfo.existingFileNumber
            },
            {
                name: 'Last namesof parties:',
                subtitle: 'Party 1/ Party 2',
                value: ''
            },
            {
                name: "Document number:",
                subtitle: 'For registry use only',
                value: ""

            }
        ];

        this.dataReady = true;
    }
   
    childrenFields=[
        {key:"fullName",               label:"Child's full legal name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"Other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]   

    public extractInfo(){ 

        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
        
        this.existingOrders = this.getExistingOrdersInfo();
        this.relationshipBetweenParties = this.getRelationshipBetweenPartiesInfo();
        const childRelatedApplication = ( 
            this.selectedSchedules?.includes('schedule1') ||
            this.selectedSchedules?.includes('schedule2') || 
            this.selectedSchedules?.includes('schedule3') ||
            this.selectedSchedules?.includes('schedule4') ||
            this.selectedSchedules?.includes('schedule5') || 
            this.selectedSchedules?.includes('schedule6') ||
            this.selectedSchedules?.includes('schedule7') || 
            this.selectedSchedules?.includes('schedule8')
        )
        if (childRelatedApplication && this.result.childrenInfoSurvey?.length > 0){
            this.aboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.childBestInterestAcknowledgement;            
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            this.childBestInterestAcknowledmentCheck = false;
        }

        if (this.result.flmBackgroundSurvey?.culturalExplain) {
            this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        }       
        
        this.otherPartyInfo = this.getOtherPartyInfo()
        this.yourInfo = this.getYourInfo()     
        this.locationInfo = this.getLocationInfo();  
    }

    public getLocationInfo(){

        const locationInformation = {} as locationInfoDataInfoType;
        if (this.result.filingLocationSurvey){
            const locationData = this.result.filingLocationSurvey;
           
            locationInformation.existingFileNumber = locationData?.ExistingFileNumber && locationData?.ExistingFamilyCase =='y'? locationData.ExistingFileNumber:'';
            locationInformation.courtLocation = locationData?.ExistingCourt? locationData.ExistingCourt:'';

            locationInformation.earlyResolutionRegistry = locationData.earlyResolutionRegistry;
            locationInformation.familyJusticeRegistry = locationData.familyJusticeRegistry;
            locationInformation.educationRegistry = locationData.familyEducationProgram;  
            locationInformation.none = !(locationInformation.educationRegistry
                                        || locationInformation.familyJusticeRegistry
                                        || locationInformation.earlyResolutionRegistry);
        }
        
        return locationInformation;
    }

    public getRelationshipBetweenPartiesInfo(){

        const relationshipInfo = {} as relationshipBetweenPartiesInfoType;
        relationshipInfo.description = this.result.flmBackgroundSurvey.howPartiesRelated;
        relationshipInfo.spouses = this.result.flmBackgroundSurvey.werePOPartiesMarried == 'y';
        if (relationshipInfo.spouses){
            relationshipInfo.startDate = Vue.filter('beautify-date')(this.result.flmBackgroundSurvey.liveTogetherPODate);
            relationshipInfo.marriageDate =this.result.flmBackgroundSurvey.dateOfMarriagePO? Vue.filter('beautify-date')(this.result.flmBackgroundSurvey.dateOfMarriagePO):'';
            relationshipInfo.separationDate = (this.result.flmBackgroundSurvey.isSeperated == 'y')?Vue.filter('beautify-date')(this.result.flmBackgroundSurvey.separationDate):'';
            relationshipInfo.nameOfSpouse = this.result.flmBackgroundSurvey.listOfSpouses;
        }
        return relationshipInfo;
    }

    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.childrenInfoSurvey;
       
        for (const child of childData){            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childInfo.currentSituation = child.currentLiving;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getExistingOrdersInfo(){
        const existing = {existingFlm: false, existingPO: false}

        existing.existingFlm = this.result.flmBackgroundSurvey?.ExistingOrdersFLM == 'y';
        existing.existingPO =  this.result.flmBackgroundSurvey?.existingPOOrders == 'y';

        return existing;
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation = [
            {            
                dob: 'unknown',
                name: {'first': '','middle': '', 'last': ''},
                address: '',
                contactInfo: ''
            }               
        ];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];    
            for(const party of this.result.otherPartyCommonSurvey){
                const otherParty = {            
                    dob: '',
                    name: {'first': '','middle': '', 'last': ''},
                    address: '',
                    contactInfo: '',
                    lawyer: ''
                }                

                if (party['knowDob'] == 'y' &&  party['dob'])
                    otherParty.dob = party['dob']

                if (party['name'])
                    otherParty.name = party['name']
                
                if (party['address'])
                    otherParty.address = party['address']
                
                if (party['contactInfo'])
                    otherParty.contactInfo = party['contactInfo']
                
                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>