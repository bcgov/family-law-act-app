<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :tableItems="tableItems" formName="Application About a Family Law Matter" formNumber="FORM 3" formRuleNumer="Rule 24"></FormHeader>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <p>This Application About a Family Law Matter provides notice to each party, and the court, of the family law matters to be resolved with the help of the court and may include:</p>
                    <ul>
                        <li>an application for a court order about a family law matter when no order or agreement about the issue has been made before,</li>
                        <li>an application to change or cancel all or part of an existing final order about a family law matter, or</li>
                        <li>an application to set aside or replace all or part of an existing agreement about a family law matter</li>
                    </ul>
                </div>
                <div style="border: 2px dotted #000; background: #bbb;">
                    <p><b>Please read before completing the form:</b></p>
                    <ul>
                        <li>You  must complete the main application and any applicable schedule(s) for your family law matter(s) identified in Part 7 of the main application.</li>
                        <li></li>For guidance filling in this form, please read the guidebook. The guide is available online at  <a href="http://www.gov.bc.ca/court-forms" target="_blank">www.gov.bc.ca/court-forms</a> or from your local court registry.</li>
                    </ul>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>A family law matter is a defined term under Rule 2 that means a case about one or more of the following:</p>
                    <ul style="margin-left:-25px;margin-top:-15px;">
                        <li>Parenting arrangements</li>
                        <li>Child Support</li>
                        <li>Contact with a child</li>
                        <li>Guardianship of a child</li>
                        <li>Spousal Support</li>
                        <li>Property division in respect of a companion animal</li>
                    </ul>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                <b>IMPORTANT NOTE TO THE OTHER PARTY:</b>
                
                <p>A party who is served with this application may file a reply. To file a reply, the party or their lawyer, must file a Reply to an Application About a Family Law Matter Form 6 and, if applicable, a Financial Statement Form 4, within 30 days after the date the party was served with the application.</p>
                
                <p>If you do not file a reply within the 30-day period, you will not be entitled to receive notice of any part of the case, including any conference, hearing or trial, and orders may be made in your absence.</p>
            </div>
            <div style="width: 20%;">
                <NoteBox style="margin-top:-85px;">
                    <b-icon-info-circle-fill />
                    <br />
                    <p >As set out in Rule 28, to reply, a party must:</p>
                    <ul style="margin-left:-25px;margin-top:-15px;">
                        <li>file a reply in Form 6</li>
                        <li>if the application is about child support or spousal support, file a financial statement</li>
                        <li>if the application is in a nearly resolution registry,have already met the early resolution requirements</li>
                    </ul>
                    
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Notice of the application"></FormPart>
                <section class="resetquestion">
                    <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I understand the following people <b>must be given notice</b> of my application:"/>
                    <ul style="margin:0 0 0 1.5rem;">
                        <li style="text-indent:0.25rem;">all parents and current guardians of each child who is the subject of the family law matter</li>
                        <li style="text-indent:0.25rem;">my spouse, if I am applying for spousal support or property division in respect of a companion animal</li>
                        <li style="text-indent:0.25rem;">each other adult who the family law matter is about</li>
                    </ul>
                    <p style="margin:0.5rem 0 0 2.35rem; text-indent:0;">They are the other party/parties in this case. To give notice, <b>they must each be served</b> with a copy of this document and any supporting documents.</p>                
                </section>
                <div style="background-color: #d6d6d6;">
                    <p><b>Additional notice requirements, as applicable:</b></p> 
                    
                    <p>If your application is about a support order or agreement that is <b>filed with the Director of Maintenance Enforcement</b>, you must give notice to the director.</p>
                    
                    <p>If your application is about guardianship of a <b>Nisga’a</b> or <b>Treaty First Nation child</b>, you must give notice to the Nisga'a Lisims Government or the Treaty First Nation to which the child belongs.</p>
                </div>
            </div>
            <div style="width: 20%;margin-top:30px;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        For more information about serving the other party, see the guidebook
                    </p>
                </NoteBox>
                <NoteBox style="margin-top:80px;">
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
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="About the parties"></FormPart>
                <div>
                    <b>2. </b> 
                    <GreyBoxForm style="text-indent:2px;display:inline-block;" textwidth="25rem" beforetext="My <b>full name</b> is:" hint="full name of party" hintindent="10rem" :italicHint="false" :text="yourInfo.name | getFullName"/>
                    <br>
                    <br>
                    <GreyBoxForm style="display:inline;text-indent:2px;" textwidth="24.7rem" beforetext="My <b>date of birth</b> is:" hint="(dd/mmm/yyyy)" hintindent="10rem" :italicHint="false" :text="yourInfo.dob | beautify-date-mid"/>
                    
                </div>

                <br>
                
                <!-- <3> -->
                <div> 
                    <b>3. </b>
                    <div style="display:inline;">
                        <GreyBoxForm  style="text-indent:2px;display:inline-block;" textwidth="19rem" beforetext="The <b>other party’s full name</b> is:" hint="" :italicHint="false" :text="otherPartyInfo[0].name | getFullName" />
                        <!-- <GreyBoxForm v-else style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>other party’s full name</b> is:" hint="full name of the other party" :italicHint="false" text="" /> -->
                        <br>
                        <br>
                        <GreyBoxForm style="display:inline;text-indent:2px;margin-left:45px;" textwidth="14.7rem" hintMargin="10px" hintindent="4rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="" :italicHint="false" :text="otherPartyInfo[0].dob | beautify-date-mid" />
                        <!-- <GreyBoxForm v-else style="display:inline;text-indent:2px;" textwidth="16rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" text=" " /> -->
                    </div>
                    <div style="padding: 20px">
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;" :check="otherPartyInfo.length > 1?'yes':''" text="There is an additional party"/>
                        <div>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].name" style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>additional party’s</b> full name is:" hint="full name of the other party" :italicHint="false" :text="otherPartyInfo[1].name | getFullName"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <span style="display: inline">The <b>additional party’s</b> full name is:</span>
                                <div style="background-color:#d6d6d6;height: 22px; width: 250px; margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                            <br/>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].dob" style="display:inline;text-indent:2px;" textwidth="6rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" :text="otherPartyInfo[1].dob | beautify-date-mid"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <p style="display: inline">Their <b>date of birth</b>(dd/mmm/yyyy) is:</p>
                                <div style="background-color:#d6d6d6; min-height: 22px; width: 250px;  margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox style="margin-top:30px;">
                    <b-icon-info-circle-fill />
                    <p>If you need to add another party or need more space for any field on this form, you can attach a separate piece of paper to this application that includes the information.</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 3 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Relationship between the parties"></FormPart>

                <div class="print-block">
                    <div>
                        <b>4. </b>
                        <i>Select only one of the options below unless there is more than one party and both apply</i>

                        <div>
                            <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;" :check="relationshipBetweenParties.spouses?'yes':''" text=""/>
                            
                            <div style="margin-top:-20px;">
                            <div style="margin-left:30px;">I am (or was) the other party’s <b>spouse</b>. We are (or were) <b>married</b> or <b>have lived</b></div>
                            <div style="margin-left:30px;"><b>together</b> in a marriage-like relationship.</div>
                            </div>
                            <p>
                                <i><span style="color:#626262; margin-left:30px;">Complete the information below about your relationship, as applicable.</span></i>
                                <i><div style="color:#626262; margin-left:30px;">You may leave a field blank if it does not apply</div></i>

                            </p>

                            <span style="margin-left:78px;">Date on which the parties began to live together in a </span>
                            <span style="margin-left:140px;margin-top:-10px;">marriage-like relationship (dd/mmm/yyyy):</span>

                            <div style="margin-left:412px;margin-top:-43px;">
                                <div style="background-color: #dedede;padding:10px;font-size: 11pt;min-height:40px;width:8rem;display:block">{{ relationshipBetweenParties.startDate }}</div> 
                            </div>

                            <br>
                            <div style="text-align: right; ">
                               <GreyBoxForm style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of marriage(dd/mmm/yyyy):" hint="" :text="relationshipBetweenParties.marriageDate"/>
                                <br>
                                <GreyBoxForm style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of separation(dd/mmm/yyyy):" hint="" :text="relationshipBetweenParties.separationDate"/>    
                                
                            </div>
                        </div>
                        <br>
                        <div>
                            
                            <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;" :check="!relationshipBetweenParties.spouses?'yes':''" text=""/>
                            <div style="margin-top:-20px;">
                            <div style="margin-left:30px;">I have never been the other party’s spouse.</div>
                            </div>
                            <i><div style="color:#626262; margin-left:30px;">Please <b>describe your relationship</b> to the other party</div></i>

                           
                        </div> 
                        <div style="margin-left:30px;background-color: #dedede;padding:10px;font-size: 11pt;min-height:100px;display:block">         
                            <span style="display:block;margin-left:1rem" >{{relationshipBetweenParties.description}}</span>
                        </div>
                        <!-- <div>
                            <i style="display:inline;margin-left:1rem" >Specify which other party if there is more than one: </i>
                            <underline-form style="text-indent:2px;display:inline;" textwidth="21.5rem" beforetext="" hint="name of other party" :text="relationshipBetweenParties.nameOfSpouse"/>
                        </div> -->
                    </div>
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox style="margin-top:165px;">
                    <b-icon-info-circle-fill />
                    <p>Spouses may be separated even if they continue to live in the same residence [s. 3(4) <i>Family Law Act</i>].</p>
                </NoteBox>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        
        <!-- Part 4 A-->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="4" title="Identification of children"></FormPart>
                <div>
                    <div>
                        <b>5. </b>
                        <i style="display:inline; margin-left:0.25rem">Select the correct option below and provide the additional information if applicable</i>          
                        <div>
                            <check-box  :check="!aboutChildren?'yes':''" boxMargin="0" shiftmark="0" text="My family law matter is <b>not about a child</b> or children (skip to Question 8)</i>"/>
                            <check-box  :check="aboutChildren?'yes':''" boxMargin="0" shiftmark="0" text="My family law matter is about <b>the following child</b> or children:"/>
                            <i>Provide the requested information below for each child</i>
                        </div>
                        <b-table
                             :items="childrenInfo"
                            :fields="childrenFields"
                            class="mt-2"
                            small
                            bordered
                            style="width:525px;margin-left:10px;">                    
                                <template  v-slot:cell()="data" style="background-color:#dedede;">
                                    <div style="height:1rem; font-size:8pt;color:#000;background-color:#dedede;">{{data.value}}</div>                                           
                                </template>
                                <template v-slot:head(dob)>
                                    Child's date of birth <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                                </template>
                        </b-table> 
                    </div>

                    
                </div>
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>A child’s residence is usually where they live at least 40% of the time. If a child currently splits their time between two residences, include both.</p>
                </NoteBox>
               
            </div>
        </div>
    <!-- Part 4 B-->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
              
                <div>
                        <b>6. </b>
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:5px;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                            <div style="margin-top:-20px;">
                            <div style="margin-left:45px;">I understand that I must consider the <b>best interests of the child</b> with respect</div>
                            <div style="margin-left:45px;">to each order I am asking the court to make about the child. The “best interests</div>
                            <div style="margin-left:45px;"> of the child” is a legal test used to decide what would best protect the child’s </div>
                            <div style="margin-left:45px;">psychological, and emotional safety, security and well-being [s. 37 <i>Family Law Act</i>].</div>
                            </div>
                        </div>
            </div>
            <div style="width: 20%">
                
                <NoteBox style="margin-top:5px">
                    <b-icon-book />
                    <p>For more information about best interests of the child, see the guidebook.</p>
                </NoteBox>
            </div>
        </div>
        <div style="margin-top: 1rem;"></div>
        <!-- Part 5 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="5" title="About us"></FormPart>
                
                <div class="print-block">    
                    <div>
                        <b>7.</b>
                    <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-20px;margin-left:10px;">
                    <div style="display: inline-block;">
                        <span style="margin-left:12px;">I would like to share the following information with the court about the</span>
                    </div>     
                    <div>
                    <div style="text-indent: 20px;">
                        <div style="margin-left:-10px;"><b>cultural, linguistic, religious and spiritual upbringing and heritage </b></div>              
                        <div style="margin-left:-10px;"><b>of my family</b>, including, if the child is an Indigenous child, the</div>              
                        <div style="margin-left:-10px;">child’s Indigenous identity:</div>              
                    </div>
                </div>                                 
            </div>  
                        <i style="display:inline; margin-left:0.25rem">You may choose to leave this question blank</i>

                        <div style="margin-left:.5rem; text-indent:0rem;"></div>
                        
                       <div v-if="culturalInfo" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:150px;">
                            {{culturalInfo}}
                        </div>
                        <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:5px;min-height:100px;margin-bottom:1rem;"></div> 
                
                    </div>  
                </div> 
            </div>
            <div style="width: 20%"></div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 6 A -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="6" title="Existing orders and agreements"></FormPart>

                <div class="print-block">
                    <div>
                        <b>8. </b>
                        <!-- <div style="display:inline; margin-left:0.25rem">There is an <b>existing court order or written agreement</b> about parenting arrangements, child support, contact with a child, guardianship of a child, spousal support, and/or property division in respect of a companion animal.</div>           -->
                        <div style="display: inline-block; font-size: 11pt;">
                        <span style="margin-left:5px;font-size: 10pt;">There is an <b>existing court order or written agreement</b> about parenting</span>
                        </div>  
                        <div style="text-indent: 20px;font-size: 10pt;">
                        <div style="margin-left:0px;">arrangements, child support, contact with a child, guardianship of a child,</div>              
                        <div style="margin-left:0px;"> spousal support, and/or property division in respect of a companion animal.</div>              
                        </div>
                        <div style="margin-left:1rem;margin-top:3px;">
                            <!-- <check-box inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="<b>Yes</b> - (see attached copy)"/>
                            <check-box inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="<b>No</b>"/>
                         -->
                            <check-box inline="inline" boxMargin="0" shift="10" style="display: inline; text-indent: -17px;margin-left:26px;" :check="existingOrders.existingFlm?'yes':''" text='Yes <span style="color:#626262"><b>(see attached copy)</b></span>'/>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display: inline; text-indent: -17px;margin-left:26px;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                        </div>
                    </div>
                </div>
        
            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>Include any order(interim or final), agreement or plan from any level of court and any location.</p>
                </NoteBox>
                
            </div>
        </div>
    <!-- Part 6 B -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
            
        
                <div> 
                    <b>9. </b>
                    <div style="display:inline; margin-left:0.25rem">
                        <!--   -->
                        <div style="display: inline-block; font-size: 11pt;">
                        <span style="margin-left:5px;font-size: 10pt;">There is an <b>existing court order, agreement or plan protecting one of the</b></span>
                        </div>
                        <div style="text-indent: 20px;font-size: 10pt;">
                        <div style="margin-left:0px;">parties or the child(ren), or restraining contact between the parties, including:</div>              
                        <ul>
                            <li>a protection order,</li>
                            <li>an order, agreement or plan involving child protection services, or</li>
                            <li>a peace bond, restraining order, bail condition or other criminal order.</li>
                        </ul> 
                        <div style="margin-left:0rem;margin-top:-15px;">
                        <!-- <check-box inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="<b>Yes</b> - (see attached copy)"/>
                        <check-box inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="<b>No</b>"/>
                         -->
                        <check-box inline="inline" boxMargin="0" shift="10" style="display: inline; text-indent: -17px;margin-left:26px;" :check="existingOrders.existingPO?'yes':''" text='Yes <span style="color:#626262"><b>(see attached copy)</b></span>'/>
                        <check-box inline="inline" boxMargin="0" shift="10" style="display: inline; text-indent: -17px;margin-left:26px;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                        </div>   
                        </div>                        
                    </div>            
                    
                </div>  
        
            </div>
            <div style="width: 20%">
               <NoteBox style="margin-top:10px;">
                    <b-icon-paperclip />
                    <p>If yes, you must attach a copy of any order, agreement or plan to this application for filing.</p>
                </NoteBox>
            </div>
        </div>
        <div style="margin-top:1rem;"></div>

         <!-- Part 7 -->
         <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="7" title="What you are asking for in this application"></FormPart>

                <NoteBox fontSize="9pt">
                    <p>You may apply for a court order about one or more family law matters. If you have an existing final order or written agreement about the family law matter, the information you must provide the court is a little different than if you have never had a final order or agreement.</p>
                    
                    <p><b>Select each family law matter you want an order about and select the appropriate answer to the question below to identify which schedule you must complete.</b></p>
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
        <div style="page-break-after:always;">&nbsp;</div> 
        <div style="display: flex; flex-direction: row;">
            <div style="width: 100%;">
                <div class="print-block">
                    <div>
                        <b>10. </b>
                        <b style="margin-left:0.25rem">I am applying for a court order about the following family law matter(s):</b>
                        <div style="margin-left:1rem;">
                            <i>Select all options that apply, complete and attach the required schedule(s)</i>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <!-- Part 7B -->
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;">
                                <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule1') || selectedSchedules.includes('schedule2')?'yes':''" text="<b>Parenting arrangements</b>, including parental responsibilities and parenting time"/>
                                    
                                <NoteBox borderRadius="8px" border="1px solid #333" style="padding: 20px;margin-left:30px;">
                                    <b>Parenting arrangements</b> include how each guardian will parent their child(ren), including each guardian’s responsibilities for decision making about a child and the time each guardian spends with a child. Parental responsibilities can be shared by one or more guardians exclusively, separately, or jointly
                                </NoteBox>
                                <p style="margin-left:30px;">Do you have a final order or written agreement about parenting arrangements, including parental responsibilities and parenting time?</p>
                                <div>
                                    <div style="display: inline-block; margin-right: 32px;margin-left:30px;">
                                        <check-box inline="inline" boxMargin="0" shiftmark="0"  :check="selectedSchedules.includes('schedule1')?'yes':''" text='<b>No</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 1</b></span> '/>
                                    </div>
                                    <div style="display: inline-block;">
                                        <check-box inline="inline" boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule2')?'yes':''" text='<b>Yes</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 2</b></span> '/>
                                    </div>
                                </div>
                            </div>
                        
        <!-- Part 7C -->
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;"> 
                                <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule3') || selectedSchedules.includes('schedule4')?'yes':''" text="<b>Child support</b>"/>
                                
                                <NoteBox borderRadius="8px" border="1px solid #333"  style="padding: 20px;margin-left:30px;">
                                    <b>Child support</b> is the amount of money a parent or guardian pays to another parent or guardian to help care for the child.
                                </NoteBox>
                                <p style="margin-left:30px;">Do you have a final order or written agreement about child support?</p>
                                <div>
                                    <div style="display: inline-block; margin-right: 32px;margin-left:30px;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule3')?'yes':''" text='<b>No</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 3</b></span> '/>
                                    </div>
                                    <div style="display: inline-block;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule4')?'yes':''" text='<b>Yes</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 4</b></span> '/>
                                    </div>
                                </div>
                            </div>
        <!-- Part 7D -->
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;">
                                <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule5') || selectedSchedules.includes('schedule6')?'yes':''" text="<b>Contact with a child</b>"/>
                                    
                                <NoteBox borderRadius="8px" border="1px solid #333"  style="padding: 20px;margin-left:30px;">
                                    <b>Contact with a child</b> is the time a child spends with someone who is not their guardian.
                                </NoteBox>
                                <p style="margin-left:30px;">Do you have a final order or written agreement about contact with the child?</p>

                                <div>
                                    <div style="display: inline-block; margin-right: 32px;margin-left:30px;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule5')?'yes':''" text='<b>No</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 5</b></span> '/>
                                    </div>
                                    <div style="display: inline-block;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule6')?'yes':''" text='<b>Yes</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 6</b></span>'/>
                                    </div>
                                </div>
                            </div>
        <!-- Part 7E -->
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;">
                                <check-box boxMargin="0" shiftmark="0" :check="result.guardianOfChildSurvey && result.guardianOfChildSurvey.applicationType && (result.guardianOfChildSurvey.applicationType.includes('cancelGuardian') || result.guardianOfChildSurvey.applicationType.includes('becomeGuardian'))  ?'yes':''" text="<b>Guardianship of a child</b> - Appointing a new guardian or cancelling guardianship of a child"/>

                                
                                <NoteBox borderRadius="8px" border="1px solid #333" style="padding: 20px;margin-left:30px;">
                                    <b>Guardianship</b> is who is responsible for a child. Only guardians have parental responsibilities and parenting time with a child.
                                </NoteBox>
                                <p style="margin-left:30px;"> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 7</b></span></p>
                            </div>
        <!-- Part 7E -->
        <div style="page-break-after:always;">&nbsp;</div> 
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;">
                                <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule9') || selectedSchedules.includes('schedule10')?'yes':''" text="<b>Spousal support</b>"/>
                                    
                                <NoteBox borderRadius="8px" border="1px solid #333"  style="padding: 20px;margin-left:30px;">
                                    <b>Spousal support</b> is money that one spouse pays to another spouse for their financial support after separation.
                                </NoteBox>
                                <p style="margin-left:30px;">Do you have a final order or written agreement about spousal support?</p>

                                <div>
                                    <div style="display: inline-block; margin-right: 32px;margin-left:30px;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule9')?'yes':''" text='<b>No</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 8</b></span> '/>
                                    </div>
                                    <div style="display: inline-block;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule10')?'yes':''" text='<b>Yes</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 9</b></span>'/>
                                    </div>
                                </div>

                            </div>
        <!-- Part 7G -->
        <div style="border: 1px solid #333; margin-bottom: 8px; padding: 20px;">
                                <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule11') || selectedSchedules.includes('schedule12')?'yes':''" text="<b>Property division in respect of a companion animal</b>"/>
                                    
                                <div style="margin-top:0.25rem;"></div>

                                <NoteBox borderRadius="8px" border="1px solid #333"  style="padding: 20px;margin-left:30px;">
                                    <b>Property division in respect of a companion animal</b> is who will have ownership and possession of a companion animalwhen spouses separate.The court may only make an order for ownership and possession by one spouse.
                                </NoteBox>
                                <p style="margin-left:30px;">Do you have a written agreement about property division in respect of the companion animal?</p>

                                <div>
                                    <div style="display: inline-block; margin-right: 32px;margin-left:30px;">
                                        <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule11')?'yes':''" text='<b>No</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 10</b></span> '/>
                                        </div>
                                        <div style="display: inline-block;">
                                            <check-box boxMargin="0" shiftmark="0" :check="selectedSchedules.includes('schedule12')?'yes':''" text='<b>Yes</b> - <span style="color:#626262;font-style:italic">Complete <b>Schedule 11</b></span>'/>
                                        </div>
                                </div>
                            </div>
        <!-- Part 8 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
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

        <!-- Part 8A -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="8" title="Filing location and initial requirements"></FormPart>

                <div>
                    <div>
                        <b>11. </b>
                        <div style="display:inline; margin:0 0 0 0.25rem">I am filing this application in the court registry:</div>
                        <div style="margin-left:1rem;margin-left:25px;">
                            <i>Select only one of the options below</i>
                            <check-box  
                            
                                boxMargin="0"
                                shiftmark="0"
                                :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                                text="Where my <b>existing case</b> with the same party/parties is located. I already have a court file number."/> 
                            <check-box  
                                boxMargin="0"
                                shiftmark="0"
                                :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                                text="Closest to <b>where the child lives</b> most of the time, because my case involves a child-related issue"/>          
                            <check-box
                                boxMargin="0"
                                shiftmark="0"  
                                :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" 
                                text="Closest to <b>where I live</b> because my case does not involve a child-related issue"/>
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" 
                                text="Permitted by <b>court order</b>"/>                    
                        </div>
                    </div>
                </div>

            </div>
            <div style="width: 20%">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>Rule 7 sets out these requirements for which registry to use. Talk to the court registry to see if there is already an existing case at a court location</p>
                </NoteBox>

                <div style="margin-top: 1rem;"></div>

                
            </div>
        </div>
        <!-- Part 8B -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div class="print-block">       
                    <div> 
                        <b>12. </b>
                        <!-- <check-box inline="inline"  boxMargin="0" shiftmark="0" :check="''" text="    or "/> -->
                        
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:2px;" :check="locationInfo.earlyResolutionRegistry || locationInfo.familyJusticeRegistry || locationInfo.educationRegistry?'yes':''" text=""/>
                            <div style="margin-top:-20px;">
                            <div style="margin-left:45px;">I understand that I may be required to complete additional requirements </div>
                            <div style="margin-left:45px;">before filing my application or scheduling a family management conference</div>
                            <div style="margin-left:45px;">depending on the court registry where my case is filed, including one or</div>
                            <div style="margin-left:45px;">more of the following:</div>
                            </div>

                        <div style="margin-left:30px;">
                            <ul>
                                <li>an online parenting education program (Parenting After Separation)</li>
                                <li>an individual needs assessment with a family justice counsellor</li>
                                <li>at least one consensual dispute resolution session, if applicable Part</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%">
               
                <NoteBox>
                    <b-icon-book />
                    <p>For more information about the different registry types and how to meet the requirements, see the guidebook.</p>
                </NoteBox>
            </div>
        </div>
        <div style="margin-top:1rem;"></div>
        
        <!-- Part 9 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="9" title="Lawyer’s statement" subtitle="Complete this part only if you are a lawyer for the party."></FormPart>

                <div class="print-block">
                
                    <div>
                        <b>13. </b>
                        <div style="display:inline; margin-left:0.25rem"><i>If you are not a lawyer, you may leave this question blank</i></div>
                        <div style="padding-top:1rem">
                            <check-box  inline="inline" boxMargin="0" shiftmark="0" style="margin:0 0 0 1rem;display:inline" :check="yourInfo.lawyerFiling?'yes':''" text=""/>
                            <GreyBoxForm style="text-indent:0px;display:inline;" textwidth="12rem" beforetext="I, " aftertext=", the"  hint="Full name of lawyer" hintindent="3rem" :text="yourInfo.lawyerStatement.lawyerName"/>
                            <GreyBoxForm style="text-indent:2px;display:inline;" textwidth="12rem" beforetext="lawyer for" hintindent="4rem" hint="Full name of party" hintmargintop="2px" :text="yourInfo.lawyerStatement.clientName"/>
                        </div>           
                    </div>
                    <div style="padding-left:3rem; margin-top:10px;;">acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act.</i></div>

                </div>
            </div>
            <div style="width: 20%;"></div>
        </div>
  
        <div style="margin-top:1rem;"></div>
            
        <!-- Part 10 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                
                <FormPart :part="10" title="Address for service"></FormPart>
                
                <div>
                    <b>14. </b>
                    <p style="display: inline;margin-left:5px;">My address for service of court documents and contact information is:</p> 
                    <p style="margin-left:28px;"><i>You must provide an address for service and contact number, but it does not have to be our own if you don’t want to</i></p>
                </div>

                <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
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

                <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:2px solid #fff">
                        <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                        </td>
                        <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                        </td>
                    </tr>
                </table>

                <div style="margin-top: 1rem;"></div>
            
                <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:1px solid #fff;">
                        <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer (if applicable): 
                            <div class="answer" style="background-color: #d6d6d6;">
                                {{ yourInfo.lawyerName | getFullName}}
                            </div>
                        </td>
                        <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable):</td>
                    </tr>
                </table>
            </div>
            <div style="width: 20%">
                <NoteBox style="margin-top:50px;">
                    <b-icon-book />
                    <p>
                        For more information about how this information will be used and who will have access to it, see the guidebook.
                    </p>
                </NoteBox>
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
        {key:"fullName",               label:"Child's full legal name",                tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",           tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"Other party's relationship to the child",tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle table-answerbox", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
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