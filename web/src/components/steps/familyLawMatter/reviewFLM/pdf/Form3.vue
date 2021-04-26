<template>
<div v-if="dataReady">    
    <b-button id="app-print" @click="onPrintSave()">Print</b-button> 
    <!-- <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>   -->    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Application About a Family Law Matter</b></div>
                <div style="font-size:10pt;"><b>FORM 3</b></div>
                <div>Provincial Court Family Rules (Rule 24)</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:''}]"
                    :fields="[{key:'name',tdClass:'border-dark'},{key:'value',tdClass:'border-dark'}]"
                    small
                    bordered
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="font-size:6pt; margin:.1rem 0;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:cell(value)="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div>

        <div class="text-justify">
            <p class="mb-0">This Application About a Family Law Matter has been filed in Provincial Court. It provides notice to each party, and the court, of the family law matters to be resolved with the help of the court and may include</p>
            <ul style="margin-left:-1rem;">
                <li>an application for a new order about a family law matter to be made by the court,</li>
                <li>an application to change or cancel all or part of an existing final order about a family law matter, or</li>
                <li>an application to set aside or replace all or part of an existing agreement about a family law matter.</li>
            </ul>
            <p>If you choose to reply, you or your lawyer must file a completed Reply to an Application About a Family Law Matter in Form 6 within 30 days after the date you were served with the application.</p>
            <p>To file your reply, you may be required to file a Financial Statement if this application is about child support and/or spousal support. In an early resolution registry, you must also have met the early resolution requirements, as applicable.</p>
            <b>If you do not file a Reply to an Application About a Family Law Matter within the 30 day period referred to above, you will not be entitled to receive notice of any part of the case, including any conference, hearing or trial, and orders may be made in your absence.</b>
        </div>


        <div style="margin-top:1rem;"><b>Information about the parties</b></div>
<!-- <1> -->
        <section>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInformationSurvey.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInformationSurvey.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents are:</div>
            <table class="fullsize">
                <tr style="border:1px solid #414142" >
                    <td v-if="yourInformationSurvey.Lawyer=='y'" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInformationSurvey.Lawyer | getFullName}}</div></td>
                    <td v-else  colspan="3">Lawyer (if applicable): </td>
                </tr>
                <tr style="border:1px solid #414142">          
                    <td colspan="3">Address: <div class="answer">{{yourInformationSurvey.address.street}} </div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td  >City: <div class="answer">{{yourInformationSurvey.address.city}}</div> </td>
                <td style="padding-left:50px">Province: <div class="answer">{{yourInformationSurvey.address.state}}</div> </td>
                    <td>Postal Code: <div class="answer">{{yourInformationSurvey.address.postcode}}</div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td>Email: <div class="answer">{{yourInformationSurvey.contact.email}}</div> </td>
                    <td style="padding-left:50px"></td>
                    <td>Telephone: <div class="answer">{{yourInformationSurvey.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>
<!-- <2> -->
        <section>
            <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I understand the following people must be given notice of my application:"/>
            <ul style="margin:0 0 0 1.5rem;">
                <li style="text-indent:0.25rem;">all parents and current guardians of each child who is the subject of the family law matter</li>
                <li style="text-indent:0.25rem;">my spouse, if I am applying for spousal support</li>
                <li style="text-indent:0.25rem;">each other adult who the application about a family law matter is about</li>
            </ul>
            <p style="margin:0.5rem 0 0 2.35rem; text-indent:0;">They are the other party/parties in this case. To give notice, they must each be served with a copy of this document and any supporting documents.</p>                
        </section>

<!-- <3> -->
        <section> 
            <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party is" hint="full name of the other party" :italicHint="false" :text="otherParty.name | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". Their date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                <table class="fullsize">
                    <tr style="border:1px solid #313132" >                        
                        <td colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr style="border:1px solid #313132">          
                        <td colspan="3">Address: <div class="answer"> {{otherParty.address?otherParty.address.street:''}} </div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td  >City: <div class="answer">{{otherParty.address?otherParty.address.city:''}}</div> </td>
                    <td style="padding-left:50px">Province: <div class="answer">{{otherParty.address?otherParty.address.state:''}}</div> </td>
                        <td>Postal Code: <div class="answer">{{otherParty.address?otherParty.address.postcode:''}}</div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td>Email: <div class="answer">{{otherParty.contact?otherParty.contact.email:''}}</div> </td>
                        <td style="padding-left:50px"></td>
                        <td>Telephone: <div class="answer">{{otherParty.contact?otherParty.contact.phone:''}}</div> </td>
                    </tr>
                </table>
            </div>
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Lawyer’s statement</b></div>
<!-- <4> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">Complete this section only if you are a lawyer for the party. You may leave this section blank.</div>
                <div>
                    <check-box  inline="inline" boxMargin="0" style="margin:0 0 0 1rem;display:inline" :check="true?'yes':''" text=""/>
                    <underline-form style="text-indent:0px;display:inline;" textwidth="15.5rem" beforetext="I, " hint="full name of lawyer" text=""/>
                    <underline-form style="text-indent:2px;display:inline;" textwidth="16.25rem" beforetext=", the lawyer for" hint="full name of party" text=""/>
                    <div style="display:inline;">, acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>. </div>
                </div>           
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Initial requirements</b></div>
<!-- <5> -->
            <section> 
                I am filing my application in:
                <check-box style="margin:0 0 0 1rem;" :check="true?'yes':''" text="an early resolution registry and I have met the following requirements:<br/><i>The requirements have been met if you completed or participated in, or if you were granted an exemption from completing or participating in, the following: Select all options that apply.</i>"/>
                <div style="margin:0 0 0 2.75rem;">
                    <check-box style="" :check="true?'yes':''" text="needs assessment"/>
                    <check-box style="" :check="true?'yes':''" text="parenting education program"/>
                    <check-box style="" :check="true?'yes':''" text="consensual dispute resolution"/>
                </div>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="a family justice registry and I understand I will be required to participate in a needs assessment and complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="a parenting education program registry and I understand I will be required to complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="none of the above "/>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Make an application</b></div>
<!-- <6> -->
            <section>
                <b style="margin-left:0.25rem">I am applying for a court order about the following family law matter(s):</b>
                <div style="margin-left:1rem;">
                    <i>Select all options that apply, complete and attach the required schedule(s)</i>
                    <div style="margin-top:0.25rem;"><b>Parenting arrangements</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule1')?'yes':''" text="parenting arrangements – new <i>[complete and attach Schedule 1]</i> <br/>	including parental responsibilities and parenting time"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule2')?'yes':''" text="parenting arrangements order/agreement – existing <i>[complete and attach Schedule 2]</i><br/> including parental responsibilities and parenting time"/>
                
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule3')?'yes':''" text="child support – new <i>[complete and attach Schedule 3]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule4')?'yes':''" text="child support order/agreement – existing <i>[complete and attach Schedule 4]</i>"/>
                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule5')?'yes':''" text="contact with a child – new <i>[complete and attach Schedule 5]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule6')?'yes':''" text="contact order/agreement – existing <i>[complete and attach Schedule 6]</i>"/>

                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule7')?'yes':''" text="appointing a guardian of a child <i>[complete and attach Schedule 7]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule8')?'yes':''" text="cancelling guardianship of a child <i>[complete and attach Schedule 8]</i>"/>

                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule9')?'yes':''" text="spousal support – new <i>[complete and attach Schedule 9]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule10')?'yes':''" text="spousal support order/agreement – existing <i>[complete and attach Schedule 10]</i>"/>

                </div>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Existing written agreements or court orders</b></div>
<!-- <7> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">There is an existing written agreement or court order about parenting arrangements, child support, contact with a child, guardianship of a child, and/or spousal support </div>          
                <div style="margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                    <i style="display:block">If yes, attach a copy of the order(s) to your application</i>
                </div>
            </section>
        </div>

 <!-- <8> -->
        <section> 
            <div style="display:inline; margin-left:0.25rem">There is an existing court order protecting one of the parties, the child(ren), or restraining contact between the parties, including a protection order, child protection or supervision order, peace bond, restraining order, bail condition and other criminal order</div>            
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                <i style="display:block">If yes, attach a copy of the order(s) to your application</i>
            </div>
        </section>  

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Relationship between the parties</b></div>
<!-- <9> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">The parties are: </div>          
                <i style="display:block;margin-left:1rem" >{{relationshipBetweenParties.description}}</i>
            </section>
        </div>

<!-- <10> -->
        <section>
            <div style="display:inline; margin-left:0.25rem">I am or have been spouses, or live or have lived together in a marriage-like relationship, with the other party </div>          
            <div>
                <i style="display:inline;margin-left:1rem" >Specify which other party if there is more than one: </i>
                <underline-form style="text-indent:2px;display:inline;" textwidth="21.9rem" beforetext="" hint="name of other party" text=""/>
            </div>
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="relationshipBetweenParties.spouses?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!relationshipBetweenParties.spouses?'yes':''" text="No"/>
                <i style="display:block">If yes, please complete all options below that apply to the parties</i>
                
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="8rem" beforetext="Date on which the parties began to live together in a marriage-like relationship:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.startDate"/>
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of marriage:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.marriageDate"/>
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of separation:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.separationDate"/>    
                <i style="margin-left:1.5rem;display:block">Note:  Spouses may be separated despite continuing to live in the same residence [Family Law Act s.3(4)]</i>
            </div>
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
<!-- <11> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Select only one of the options below and complete the required information</i>          
                <div style="margin-left:1.5rem">
                    <check-box style="" :check="!aboutChildren?'yes':''" text="My application does not ask for any order(s) about a child or children <i>(skip section 12)</i>"/>
                    <check-box style="" :check="aboutChildren?'yes':''" text="My application is asking for an order(s) about the following child or children:"/>
                </div>
                <b-table
                    :items="childrenInfo"
                    :fields="childrenFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                </b-table> 
            </section>
        </div>

<!-- <12> -->
        <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section>
       
        <div class="print-block">
            <div style="margin-top:1rem;"><b>About us</b></div>
<!-- <13> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">You may choose to complete this section or leave this section blank</i>
                <div style="margin-left:.5rem; text-indent:0rem;">I would like to share the following information with the court about the cultural, linguistic, religious and spiritual upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
                <div style="margin-left:.5rem; text-indent:0rem;"></div>
                <div v-if="result.flmBackgroundSurvey.likeToAddCulturalExplanation == 'y'" class="answerbox">{{culturalInfo}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>  
        </div>


        
<!-- <Page 2> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule1')" >
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 1 – PARENTING ARRANGEMENTS – NEW</b></div>
            <div style="text-align:center;"><b> This is Schedule 1 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are a guardian of a child or, are applying to be appointed as a guardian of a child, making a new application about parenting arrangements for a child or children identified in section 11 of this application. 
                Parenting arrangements include how each guardian of a child will parent their child(ren) together, including each guardian’s responsibilities for decision making about a child, and the time each guardian spends with a child.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                I am:
                <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey.guardianApplicant == 'y'?'yes':''" text="a guardian of the child(ren) <br/> <i>A child’s parents are most often the child’s guardians, but other people can be guardians too. A parent who has never lived with their child is a guardian if they have regularly taken care of the child, there is an agreement or court order that says they are a guardian of a child, or under a will if the other parent dies. A person who is not a parent can become a guardian of a child by a court order or under a will.</i>"/>
                <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey.applyingGuardianApplicant == 'y'?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Parental responsibilities</b></div>
                <div><i>Parental responsibilities can be set up so that they can be exercised by <div class="uline">one or more guardians</div> only, or by <div class="uline">each guardian</div> acting separately, or by <div class="uline">all guardians</div> acting together.</i></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Select all options that apply and complete the required information. You may leave a section blank.</i>
                    <div style="margin-left:1rem">
                        <check-box style="" :check="(parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp)?'yes':''" text="I am applying for an order that gives me all parental responsibilities for the following child(ren):<br/><i>List the name of each child you are requesting all parental responsibilities for</i>"/>
                        <ul v-if="parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp">
                            <li v-for="(child,inx) of parentArrInfo.parentResp.children" :key="inx">child</li>
                        </ul>                    
                        <check-box style="margin-top:1rem;" :check="(parentArrInfo.parentResp.applying && !parentArrInfo.parentResp.allResp) 
                            || (parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp && !parentArrInfo.parentResp.allKids)?'yes':''" text="I am applying for an order for the parental responsibilities to be exercised by the guardians as follows:"/>                    
                        <div v-if="(parentArrInfo.parentResp.applying && !parentArrInfo.parentResp.allResp) 
                            || (parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp && !parentArrInfo.parentResp.allKids)" class="answerbox">{{parentArrInfo.parentResp.expl}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>            
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Parenting time</b></div>
                <div><i>During parenting time, a guardian has the parental responsibility of making day-to-day decisions affecting the child and having day-to-day care, control, and supervision of the child. Complete section 3 below only if you are applying for an order about parenting time. You may leave this section blank.</i></div>
<!-- <3> -->
                <section>
                    I am applying for an order about the allocation of parenting time as follows:
                    <i style="display:block; margin-left:1rem">Select all options that apply and complete the required information. You may leave a section blank.</i>
                    <check-box style="margin:0 0 2rem 1rem;" 
                            :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.desired?'yes':''" 
                            text="I am asking for the child(ren) to spend time with me as follows:"/> 
                    <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.desired)" 
                        class="answerbox">{{parentArrInfo.parentTime.desired}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>


                    <check-box 
                        style="margin:0 0 2rem 1rem;" 
                        :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionMe?'yes':''" 
                        text="I am willing to have the following conditions placed on my time with the child(ren):"/>
                    
                    <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionMe)" 
                        class="answerbox">{{parentArrInfo.parentTime.myConditions}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>                    
                    
                    
                    <check-box 
                        style="margin:0 0 2rem 1rem;" 
                        :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.opDesired?'yes':''" 
                        text="I am asking for the child(ren) to spend time with the other guardian(s) as follows:"/>
                    <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.opDesired)" 
                        class="answerbox">{{parentArrInfo.parentTime.opDesired}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                    
                    
                    <check-box 
                        style="margin:0 0 2rem 1rem;" 
                        :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionOp?'yes':''" 
                        text="I am asking to have the following conditions placed on the other guardian’s time with the child(ren):"/>
                    <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionOp)" 
                        class="answerbox">{{parentArrInfo.parentTime.opConditions}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>       
               
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Parenting arrangements</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if there are additional order terms you want. You may leave this section blank.</i>
                    <div>
                        <check-box  
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline; margin:0 0 0 1rem;" 
                            :check="parentArrInfo.parentalArr.applying?'yes':''" text=""/>
                        <div style="display:inline;">I am applying for the following other order term(s) about parenting arrangements:</div>
                        <div v-if="(parentArrInfo.parentalArr.applying && parentArrInfo.parentalArr.desc)" 
                        class="answerbox">{{parentArrInfo.parentalArr.desc}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>  
                    
                    
                    </div>                
                </section> 
            </div>

            <div class="print-block">
                <div style="margin-top:3rem; display:block;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the child(ren)’s best interests because:
                    <div v-if="parentArrInfo.childBestInterest" 
                        class="answerbox">{{parentArrInfo.childBestInterest}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>  
                </section>
            </div>
        </div>

        
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule2')">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 2 – PARENTING ORDER/ AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b> This is Schedule 2 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel all or part of an existing final order about parenting arrangements, or to set aside or replace all or part of an agreement about parenting arrangements, of the child or children identified in section 11 of this application.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                I am:
                <div style="margin-left:1rem;">
                    <check-box style="" :check="result.parentingOrderAgreementSurvey.guardianApplicant == 'y'?'yes':''" text="a guardian of the child(ren)"/>
                    <check-box style="width:120%;" :check="result.parentingOrderAgreementSurvey.applyingGuardianApplicant == 'y'?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about parenting arrangements"/>
                <underline-form v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="result.aboutParentingArrangementsSurvey.orderDate | beautify-date"/>
                <underline-form v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="result.aboutParentingArrangementsSurvey.agreementDate | beautify-date"/>
            
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder'?'yes':''" text="I am applying for the existing final order to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.orderDifferenceType == 'changeOrder')?'yes':''" text="changed"/>
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.orderDifferenceType == 'cancelOrder')?'yes':''" text="cancelled"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">Since the final order was made, needs or circumstances have changed as follows:</div>
                    
                        <div v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' && result.aboutParentingArrangementsSurvey.changesSinceOrder" 
                        class="answerbox">{{result.aboutParentingArrangementsSurvey.changesSinceOrder}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    
                    
                    </div>                
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement'?'yes':''" text="I am applying for all or part of the existing agreement to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'setAsideAgreement')?'yes':''" text="set aside"/>
                            <check-box style="" :check="(result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'replacedAgreement')?'yes':''" text="replaced"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">I believe the agreement is not in the best interests of the child(ren) because:</div>
                        <div v-if="result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' && result.aboutParentingArrangementsSurvey.changesSinceAgreement" 
                        class="answerbox">{{result.aboutParentingArrangementsSurvey.changesSinceAgreement}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    </div>                
                </section>
            </div>
        
            <div class="print-block">        
                <div style="margin-top:3rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parental responsibilities. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentResp.applying?'yes':''" text="I am applying for the parental responsibilities (who makes certain decisions about a child) to be changed or replaced as follows:"/>
                    </div>
                    <div v-if="exParentArrInfo.parentResp.applying && exParentArrInfo.parentResp.desc" 
                        class="answerbox">{{exParentArrInfo.parentResp.desc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </section>
            </div>

            <div style="margin-top:3rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentTime.applying?'yes':''" text="I am applying for the parenting time schedule to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentTime.applying && exParentArrInfo.parentTime.desc" 
                        class="answerbox">{{exParentArrInfo.parentTime.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to conditions on parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentCond.applying?'yes':''" text="I am applying for the conditions on my parenting time or the other guardian’s parenting time to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentCond.applying && exParentArrInfo.parentCond.desc" 
                        class="answerbox">{{exParentArrInfo.parentCond.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to other parenting arrangements. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentalArr.applying?'yes':''" text="I am applying for the other order term(s) about parenting arrangements to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentalArr.applying && exParentArrInfo.parentalArr.desc" 
                        class="answerbox">{{exParentArrInfo.parentalArr.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Best interests of child</b></div>
<!-- <9> -->
                <section>
                    <div style="display:inline; margin-left:0.25rem">
                        I believe the order I am applying for is in the child(ren)’s best interests because:
                    </div>
                    <div v-if="exParentArrInfo.childBestInterest" 
                        class="answerbox">{{exParentArrInfo.childBestInterest}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

        </div>

        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule3')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 3 – CHILD SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 3 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making a new application for child support and/or special and extraordinary expenses for the child or children identified in section 11 of this application.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">I am:</div>
                <div style="margin-left:1rem;">
                    <check-box style="" :check="chSupInfo.appType.guardian?'yes':''" text="a parent or guardian of the child(ren)"/>
                    <check-box style="width:120%;" :check="chSupInfo.appType.standing?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
                    <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.appType.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="chSupInfo.appType.otherCom"/>            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section> 
                The other party is:
                <div style="margin-left:1rem;">
                    <check-box style="" :check="chSupInfo.opType.guardian?'yes':''" text="a parent or guardian of the child(ren)"/>
                    <check-box style="width:120%;" :check="chSupInfo.opType.standing?'yes':''" text="a person standing in the place of a parent to the child(ren) <i>(for example, a step-parent)</i>"/>
                    <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.opType.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="chSupInfo.opType.otherCom"/>            
                </div>
            </section>


            <div style="margin-top:1rem;"></div>
<!-- <3> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    The child or children spend time with me and the other party as follows:                    
                </div>
                <div v-if="chSupInfo.currCond.timeDesc" 
                    class="answerbox">{{chSupInfo.currCond.timeDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <4> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    The current support arrangements are as follows:
                </div>
                <div v-if="chSupInfo.currCond.supArr" 
                    class="answerbox">{{chSupInfo.currCond.supArr}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <5> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.opInfo.income?'yes':''" text="I do not know the income of the other party"/>
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chSupInfo.opInfo.income?'yes':''" text="I believe the other party’s annual income is "/>
                    <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext=" $" hint="" :text="chSupInfo.opInfo.incomeAmt"/>                            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I know the following facts about the other party’s employment, training, health and ability to work:</div>
                <i style="display:block; margin-left:1rem">If you do not have any information, please leave this section blank</i>
                <div v-if="chSupInfo.opInfo.facts" 
                    class="answerbox">{{chSupInfo.opInfo.factsDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>                 

            <div style="margin-top:3rem;"></div>
<!-- <7> -->
            <section>
                <check-box class="marginleft1p5vue" inline="inline" boxMargin="0" style="display:inline-block;margin-left:0.5rem" :check="chSupInfo.desiredSup.payor?'yes':''" text=""/>
                <underline-form style="text-indent:0px;display:inline-block;" textwidth="15rem" beforetext="I am applying for an order for ongoing support to be paid by" hint="name of paying party" :text="chSupInfo.desiredSup.payor"/>
                <div style="display:block;text-indent:0px; margin-left:1.8rem;"> in the monthly amount set out in the child support guidelines table for the following child(ren) identified in section 11 of this application: </div>
                <i class="marginleft1p5vue" style="margin-left:2.8rem; display:inline" >List the name of each child you are applying for support for</i>
                <underline-form style="text-indent:3px;display:inline-block;" textwidth="16.85rem" beforetext="" hint="" :text="chSupInfo.desiredSup.payees"/>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.desiredSup.over19?'yes':''" text="Each child I am applying for an order for child support for is under 19 years of age"/>
                    <check-box style="" :check="chSupInfo.desiredSup.over19?'yes':''" text="The following child(ren) is/are 19 years of age or older and need(s) child support because of illness, disability or because they are full-time students:"/>                    
                </div>
                <b-table
                    :items="over19ChildSupportDetails"
                    :fields="childrenSupportFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(reasonForSupport)>
                            Reason for child support <i style="font-size:6pt; font-weight:normal;">Select the applicable option</i>                            
                        </template>
                        <template v-slot:cell(reasonForSupport)="data">      
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0rem;" :check="data.value.illness?'yes':''" text="illness"/>
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0.25rem;" :check="data.value.disability?'yes':''" text="disability"/>
                            <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" shift="10" shiftmark="0" style="display:inline;margin-left:0.25rem;" :check="data.value.student?'yes':''" text="student"/>
                        </template>
                </b-table>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Start of payment(s)</b></div>
<!-- <9> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Child support payments may start on a past (retroactive), present or future date or event, such as the date of separation, the date this application is made or the start date of a new job </i>
                    <div>
                        <underline-form style="margin:0 0 0 1rem;text-indent:0px;display:inline-block" textwidth="16.5rem" beforetext="Child support payments should start on" hint="mmm/dd/yyyy or event" :text="chSupInfo.desiredSup.startDate"/>
                        <div style="margin:0 0 0 0.5rem; display:inline;">because:</div>
                        <div v-if="chSupInfo.desiredSup.reason" 
                            class="answerbox">{{chSupInfo.desiredSup.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Calculations</b></div>
<!-- <10> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 3rem 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.calc.attch?'yes':''" text="I am attaching calculations showing how much child support I believe should be paid according to the child support guidelines"/>
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.calc.attch?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="chSupInfo.calc.reason" 
                        class="answerbox">{{chSupInfo.calc.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>  

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Undue hardship</b></div>
<!-- <11> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if applicable. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.ndHard.change?'yes':''" text="I am applying for an order to change the guideline amount payable because the guideline amount would cause me undue hardship for the following reason(s):<br/><i> Note:  If this option applies to your situation, you will need to complete the undue hardship portion of the Financial Statement, Part 4 and Part 5, in addition to any other required parts</i>"/>                    
                    </div>
                    <div style="margin:0 0 3rem 3.25rem;">
                        <check-box style="" :check="chSupInfo.ndHard.reasons.excessive?'yes':''" text="I have an unusual or excessive amount of debt I incurred to support the family prior to separation or to earn a living"/>                    
                        <check-box style="" :check="chSupInfo.ndHard.reasons.high?'yes':''" text="I have unusually high expenses to exercise parenting time or contact with the child(ren)"/>
                        <check-box style="" :check="chSupInfo.ndHard.reasons.another?'yes':''" text="I have a legal duty to support another person, such as an ill or disabled person or a former spouse"/>
                        <check-box style="" :check="chSupInfo.ndHard.reasons.dependent?'yes':''" text="I have a legal duty to support a dependent child from another relationship"/>
                        <check-box style="" :check="chSupInfo.ndHard.reasons.other?'yes':''" text="other undue hardship circumstances <i>(specify):</i>"/>
                        <div v-if="chSupInfo.ndHard.reasons.other" 
                            class="answerbox">{{chSupInfo.ndHard.otherCom}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Special and extraordinary expenses</b></div>
<!-- <12> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.specExp.applying?'yes':''" text="I am not applying for an order for special and extraordinary expenses for the child(ren)"/>                    
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.specExp.applying?'yes':''" text="I am applying for an order for special and extraordinary expenses under section 7 of the child support guidelines. The following special or extraordinary expenses (net of tax credits, subsidies, deductions, credits and contributions from the child(ren)) are included in my application for child support:"/>
                    </div>
                    <b-table
                        :items="childrenSupportExpenseItem"
                        :fields="childrenSupportExpenseFields"
                        class="mt-2"
                        small                    
                        bordered>
                            <template v-slot:cell()="data">                            
                                <div v-if="data.index==0" style="text-align:center;font-size:7.43pt" ><b>{{data.value}}</b></div>
                                <div v-else style="text-align:left;font-size:8pt;color:#000">{{data.value}}</div>                                           
                            </template>
                            <template v-slot:cell(name)="data">                            
                                <div v-if="data.index==0" style="text-align:right;font-size:7.43pt;" ><b>{{data.value}}</b></div>
                                <div v-else-if="data.index==7" style="text-align:right;font-size:7.43pt;" ><b>{{data.value}}</b></div>                            
                                <div v-else style="text-align:left;font-size:8pt;">{{data.value}}</div>                                           
                            </template>
                    </b-table>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <13> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="chSupInfo.finStmnt.required?'yes':''" text="I am filing a Financial Statement in Form 4 with this application because the following applies to my situation:	<br/><i>Select all options that apply</i>"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="chSupInfo.desiredSup.applicantPayor?'yes':''" text="I am the payor"/>
                        <check-box style="" :check="chSupInfo.currCond.splitShared?'yes':''" text="there is split or shared parenting time"/>
                        <check-box style="" :check="chSupInfo.desiredSup.over19?'yes':''" text="there is a child 19 years old or over for whom support is being applied for"/>
                        <check-box style="" :check="true?'yes':''" text="a party has been acting as a parent to a child of the other party"/>
                        <check-box style="" :check="chSupInfo.desiredSup.payorErnsHigh?'yes':''" text="the paying parent earns more than $150,000 per year"/>
                        <check-box style="" :check="chSupInfo.specExp.applying?'yes':''" text="there is an application for special or extraordinary expenses for a child"/>
                        <check-box style="" :check="chSupInfo.ndHard.change?'yes':''" text="I am claiming undue hardship"/>
                    </div>

                    <div style="margin:0.5rem 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="!chSupInfo.finStmnt.required?'yes':''" text="I am not required to file a Financial Statement at this time as none of these situations apply to me"/>
                        <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am required to file a Financial Statement but I am not able to complete it at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE OTHER PARTY:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about child support. You must provide your financial information with your reply to this application by completing and filing a Financial Statement in Form 4. </b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>

        </div>

<!-- <Page 5> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule4')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 4 – CHILD SUPPORT ORDER OR WRITTEN AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 4 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel all or part of an existing final order about child support, or to set aside or replace all or part of an existing agreement about child support, for the child or children identified in section 11 of this application.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">The existing final order or agreement requires me to:</div>
                
                <div style="margin-left:1rem;">
                    <i>Select only one of the options below</i>
                    <check-box style="" :check="exChSupInfo.abtEx.payor?'yes':''" text="make payments for support of a child or children"/>
                    <check-box style="width:120%;" :check="exChSupInfo.abtEx.payee?'yes':''" text="receive payments for support of a child or children"/>
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChSupInfo.abtEx.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="exChSupInfo.abtEx.otherComm"/>            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about child support made on"/>
                <underline-form style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" hint="mmm/dd/yyyy" :text="exChSupInfo.abtEx.orderDate"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtEx.exstngOrdr?'yes':''" text="I am applying for the existing final order about child support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="exChSupInfo.abtEx.changeOrdr?'yes':''" text="changed"/>
                        <check-box style="" :check="exChSupInfo.abtEx.cancelOrdr?'yes':''" text="cancelled"/>
                        <div>Since the final order about child support was made, circumstances have changed as follows:</div>
                        <i class="marginleft-1vue">Select all options that apply and complete the required information</i>
                        <check-box style="" :check="exChSupInfo.abtEx.changeList.includes('My financial situation has changed')?'yes':''" text="my financial situation has changed"/>
                        <check-box style="" :check="exChSupInfo.abtEx.changeList.includes('I believe the other party’s financial situation has changed')?'yes':''" text="I believe the other party’s financial situation has changed"/>
                        <check-box style="margin:0 0 2rem 0;" :check="exChSupInfo.abtEx.changeList.includes('The `special and extraordinary expenses` have changed')?'yes':''" text="the special and extraordinary expenses for the child(ren) have changed as follows:"/>
                        <div v-if="exChSupInfo.abtEx.changeList.includes('The `special and extraordinary expenses` have changed')" 
                            class="answerbox">{{exChSupInfo.abtEx.expChangeInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>

                        <check-box style="margin:0 0 2rem 0;" :check="exChSupInfo.abtEx.changeList.includes('The living arrangements for a child have changed')?'yes':''" text="the child(ren)’s living arrangement(s) have changed as follows:"/>
                        <div v-if="exChSupInfo.abtEx.changeList.includes('The living arrangements for a child have changed')" 
                            class="answerbox">{{exChSupInfo.abtEx.lvngChangeInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>

                        <check-box style="margin:0 0 2rem 0;" :check="exChSupInfo.abtEx.changeList.includes('Information has become available that was not available when the order was made')?'yes':''" text="information has become available that was not available when the order was made (specify):"/>
                        <div v-if="exChSupInfo.abtEx.changeList.includes('Information has become available that was not available when the order was made')" 
                            class="answerbox">{{exChSupInfo.abtEx.newInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                        
                        <check-box style="margin:0 0 3rem 0;" :check="exChSupInfo.abtEx.changeList.includes('Other changes or circumstances')?'yes':''" text="other changes or circumstances (specify):"/>
                        <div v-if="exChSupInfo.abtEx.changeList.includes('Other changes or circumstances')" 
                            class="answerbox">{{exChSupInfo.abtEx.otherInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtEx.exstngAgrmnt?'yes':''" text="I am applying for the existing agreement about child support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="exChSupInfo.abtEx.setAsideAgrmnt?'yes':''" text="set aside"/>
                        <check-box style="" :check="exChSupInfo.abtEx.replaceAgrmnt?'yes':''" text="replaced"/>
                        <div style="margin:0 0 3rem 0;">I believe the agreement should be set aside or replaced because:</div>                    
                        <div v-if="exChSupInfo.abtEx.exstngAgrmnt" 
                            class="answerbox">{{exChSupInfo.abtEx.changesSinceAgrmnt}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you are applying to change or replace an existing final order or agreement about child support. You may leave this section blank.</i>
                    
                    <div style="margin:0 0 0 1rem;">
                        <div style="margin:0 0 3rem 0;">I am applying for the final order or agreement about child support to be changed or replaced as follows:</div>                    
                        <div v-if="exChSupInfo.abtOrg.newOrderDesc.length>0" 
                            class="answerbox">{{exChSupInfo.abtOrg.newOrderDesc}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Unpaid child support</b></div>
<!-- <6> -->
                <section>
                    <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="As of " hint="mmm/dd/yyyy" :text="exChSupInfo.unpdChSup.crntDate"/>
                    <underline-form style="margin-left:0.1rem; text-indent:0px;" textwidth="8rem" beforetext=", the amount of unpaid child support (arrears) was $" hint="" :text="exChSupInfo.unpdChSup.amnt"/>          
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid child support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select only one of the options below.</i>
                    <check-box style="margin:0 0 0 0rem;" :check="(exChSupInfo.unpdChSup.amnt != 0 && !exChSupInfo.unpdChSup.reduce)?'yes':''" text="I am not applying to reduce the amount of unpaid child support (arrears)"/>                    
                </div>
                <div style="margin:0 0 0 1.5rem;">    
                    <check-box  inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0.05rem;" :check="exChSupInfo.unpdChSup.reduce?'yes':''" text="I am applying to reduce the amount of unpaid child support (arrears) to"/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" :text="exChSupInfo.unpdChSup.reduceAmount"/>
                    <div style="margin:0 0 3rem 0;">because:</div>
                    <div v-if="exChSupInfo.unpdChSup.reduce" 
                            class="answerbox">{{exChSupInfo.unpdChSup.whyReduceAmount}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </div>
                
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid child support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">I am applying for an order that the remaining unpaid child support (arrears) be paid as follows:</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select all options that apply and complete the required information</i>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">                        
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0rem;" :check="exChSupInfo.unpdChSup.paySchd =='monthly'?'yes':''" text="at a rate of "/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" :text="exChSupInfo.unpdChSup.monthlyAmount"/>
                </div>
                <div style="margin:0 0 0 1.5rem;">
                    <check-box style="margin:0 0.25rem 0 0rem;" :check="exChSupInfo.unpdChSup.paySchd =='lumpSum'?'yes':''" text="in a lump sum"/>
                    <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChSupInfo.unpdChSup.paySchd =='other'?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="32rem" beforetext="" hint="" :text="exChSupInfo.unpdChSup.otherComm"/>
                 </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <9> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0.25rem 0 0rem;" :check="exChSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much child support I believe should be paid according to the child support guidelines"/>
                        <check-box style="margin:0 0rem 3rem 0rem;" :check="!exChSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                        <div v-if="!exChSupInfo.calc.attaching" 
                            class="answerbox">{{exChSupInfo.calc.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">    
                <div style="margin-top:1rem;"><b>Start of payment(s)</b></div>
<!-- <10> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Child support payments may start or end on a past (retroactive), present or future date or event, such as the date of separation, the date this application is made or the start date of a new job</i>
                    <div style="margin:0 0 3rem 1.1rem;">
                        <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext="The order about child support should start on" hint="mmm/dd/yyyy" :text="exChSupInfo.abtOrg.startDate"/>
                        <div style="display:inline; margin:0 0 0 0.5rem;">because:</div>
                        <div v-if="exChSupInfo.abtOrg.startReason.length>0" 
                            class="answerbox">{{exChSupInfo.abtOrg.startReason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <11> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtOrg.situationList.length>0 && !exChSupInfo.abtOrg.situationList.includes('None of the above apply to my situation')?'yes':''" text="I am filing a Financial Statement in Form 4 with this application because the following applies to my situation:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <i>Select all options that apply</i>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('I am required to pay child support')?'yes':''" text="I am the payor"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('There is `split` or `shared` parenting time')?'yes':''" text="there is split or shared parenting time"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('There is a child 19 years or older for who support is for')?'yes':''" text="there is a child 19 years old or over for whom support is being applied for"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('A party has been acting as a parent to a child of the other party, for example a step-parent')?'yes':''" text="a party has been acting as a parent to a child of the other party"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('The paying parent earns more than $150,000 per year')?'yes':''" text="the paying parent earns more than $150,000 per year"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('There is a claim for `special and extraordinary expenses` for a child')?'yes':''" text="there is an application for special or extraordinary expenses for a child"/>
                        <check-box style="" :check="exChSupInfo.abtOrg.situationList.includes('I am claiming `undue hardship`')?'yes':''" text="I am claiming undue hardship"/>
                    </div>
                    <div style="margin:0.5rem 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtOrg.situationList.includes('None of the above apply to my situation')?'yes':''" text="I am not required to file a Financial Statement at this time as none of these situations apply to me"/> 
                        <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am required to file a Financial Statement but I am not able to complete it at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>                   
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>If this family law case includes an application to change or replace an order or agreement for child support, you must provide financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>                    
                    </ul>
                </div>
            </div>
        </div>

<!-- <Page 6> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule5')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 5 – CONTACT WITH A CHILD – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 5 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are <div class="uline">not a guardian</div> of the child or children and you are making a new application about contact with the child or children identified in section 11 of this application.</i>
                <i style="display:block">Contact with a child is the time a child spends with a person who is not their guardian. </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">                
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :check="true?'yes':''" text="I am not a guardian of the child(ren)"/>                
            </section>

           <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I am applying for an order for contact with the following child(ren) identified in section 11 of this application:</div>
                
                <div style="margin:0 0 3rem 1rem;">
                    <i>List the name of each child you want to have contact with</i>
                </div>
            </section>
 
            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">I am applying for contact with the child(ren) as follows:</div>
                    
                    <div style="margin:0 3rem 1rem 1rem;">
                        <i>Select all options that apply and complete the required information</i>
                        <check-box style="" :check="true?'yes':''" text="in person:"/>
                        <i class='marginleft1vue' style="margin:0 0 0 1.75rem;">Provide specific dates or events requested, or dates and times that would be most suitable</i>
                        <check-box style="margin:3rem 0 0 0" :check="true?'yes':''" text="telephone communication"/>
                        <check-box style="" :check="true?'yes':''" text="video communication"/>
                        <check-box style="" :check="true?'yes':''" text="written communication"/>
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other method of communication <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" text=""/>            
                    </div>
                    <div style="margin:0 3rem 3rem 1rem;">
                        <i>Complete only if applicable. You may leave this section blank.</i>
                        <div>I am willing to have the following conditions placed on my contact with the child(ren):</div>
                    </div>
                </section> 
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <4> -->
            <section>
                <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="I last had contact with the child(ren) on or around " hint="mmm/dd/yyyy" text="APR 20 2020"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact I am applying for is in the child(ren)’s best interests because:</div>
                </section>
            </div>
        </div>


<!-- <Page 7> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule6')">
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 6 – CONTACT ORDER OR WRITTEN AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 6 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making a new application for child support and/or special and extraordinary expenses for the child or children identified in section 11 of this application.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">I am:</div>
                <div style="margin-left:1rem;">
                    <check-box style="" :check="true?'yes':''" text="a person allowed to have contact with the child(ren) according to a court order or written agreement"/>
                    <check-box style="width:120%;" :check="true?'yes':''" text="a guardian of the child(ren)"/>                    
                </div>                
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about contact made on"/>
                <underline-form style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" hint="mmm/dd/yyyy" text="APR 20 2020"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am applying for the existing final order about contact with a child or children to be:"/>                    
                    </div>
                    <div style="margin:0 0 3rem 3.25rem;">
                        <check-box style="" :check="true?'yes':''" text="changed"/>
                        <check-box style="" :check="true?'yes':''" text="cancelled"/>
                        <div>Since the order was made, needs or circumstances have changed as follows:</div>                    
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am applying for all or part of the existing agreement about contact with a child or children to be:"/>                    
                    </div>
                    <div style="margin:0 0 3rem 3.25rem;">
                        <check-box style="" :check="true?'yes':''" text="set aside"/>
                        <check-box style="" :check="true?'yes':''" text="replaced"/>
                        <div>I believe the agreement is not in the best interests of the child(ren) because:</div>                    
                    </div>
                </section>
            </div>


            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you are applying to change or replace an existing final order or agreement about contact with a child or children. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">I am applying to change or replace the existing final order or agreement about contact as follows:</div>
                    <i class="marginleftplus" >Select all options that apply</i>
                    <div style="margin:0 3rem 1rem 1rem;">
                        
                        <check-box style="" :check="true?'yes':''" text="no contact of any type"/>
                        <check-box style="" :check="true?'yes':''" text="in person: "/>
                        <i class="marginleft1vue" style="margin:0 0 0 1.75rem;">Provide specific dates or events requested, or dates and times that would be most suitable</i>
                        <check-box style="margin:3rem 0 0 0" :check="true?'yes':''" text="telephone communication"/>
                        <check-box style="" :check="true?'yes':''" text="video communication"/>
                        <check-box style="" :check="true?'yes':''" text="written communication"/>
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other method of communication <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" text=""/>            
                    </div>
                    <div style="margin:0 3rem 3rem 1rem;">
                        <i>Complete only if applicable. You may leave this section blank.</i>
                        <div>I am applying to have the following conditions placed on the contact with the child(ren):</div>
                    </div>
                </section> 
            </div> 

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <6> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact I am applying for is in the child(ren)’s best interests because:</div>
                </section>
            </div>
        </div>           

        
<!-- <Page 8> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule7')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 7 – APPOINTING A GUARDIAN OF A CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 7 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to be appointed as a guardian of a child or children identified in section 11 of this application. </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">                
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I am applying to be appointed as a guardian of the following child(ren) identified in section 11 of"/>
                <div style="margin:0 0 0 2.5rem; display:inline;">this application:</div>
                <div style="margin: 0 0 3rem 3.5rem;">
                    <i>List the name of each child you want to be appointed as a guardian of</i> 
                </div>                
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Indigenous ancestry of child(ren)</b></div>
                <i>These questions will help the court make a decision about guardianship of a child.</i>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">Is the child or children Indigenous? </div>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="No"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="Unknown"/>
                    <div style="margin:0 0 0 1.35rem;">
                        <i style="margin:0 0 0 -0.25rem;" >If yes, please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</i>
                        <check-box style="" :check="true?'yes':''" text="First Nation"/>
                        <check-box style="" :check="true?'yes':''" text="Nisga’a"/>
                        <check-box style="" :check="true?'yes':''" text="Treaty First Nation"/>
                        <check-box style="" :check="true?'yes':''" text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                        <check-box style="" :check="true?'yes':''" text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                    </div>
                </section>
            </div>
    
            <div style="margin-top:1rem;"></div>
<!-- <3> -->
            <section>
                <i style="display:inline; margin:0 0 0 0.5rem;">Complete the following statement only if the child is a Nisga’a child or a Treaty First Nation child</i>
                <div style="margin:0 0 0 1.35rem;">
                    <check-box style="" :check="true?'yes':''" text="I acknowledge that I must serve the Nisga'a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Guardianship affidavit and supporting documents</b></div>
<!-- <4> -->
                <section>
                    <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I understand that I am required to file a Guardianship Affidavit in Form 5 as described in Rule 26"/>
                    <div style="margin:0 0 0 2rem; display:inline;">before the court can make a final order about guardianship</div>
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <5> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I have initiated or completed a criminal record check as required for the Guardianship Affidavit in"/>
                <div style="margin:0 0 0 2rem; display:inline;">Form 5</div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>                
                <div style="margin:0 0 0 1rem;">                     
                    <check-box style="" :check="true?'yes':''" text="I am filing the following required documents along with this application"/>
                </div>
                <div style="margin:0 0 0 3rem;">
                   <check-box style="" :check="true?'yes':''" text="a Consent for Child Protection Record Check in Form 5 under the <i>Family Law Act Regulation</i>"/>
                   <check-box style="" :check="true?'yes':''" text="a request, in the form provided by the registry, to search the protection order registry"/>
                </div>
                <div style="margin:0.5rem 0 0 1rem;">                     
                    <check-box style="" :check="true?'yes':''" text="I am not able to complete the required documents at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with the additional documents."/>
                </div>
            </section>
        </div>

        
<!-- <Page 9> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule8')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 8 – CANCELLING GUARDIANSHIP OF A CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 8 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to cancel the guardianship of a child or children identified in section 11 of this application.</i>
            </div>

            
            <div style="margin-top:1rem;"><b>Order about guardianship</b></div>
<!-- <1> -->
            <section class="resetquestion">                
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem; display:inline;" :check="true?'yes':''" text="I am applying for the following person(s) to no longer be the guardian(s) of the child or children:"/>
                <b-table
                    :items="childrenGuardianshipItem"
                    :fields="childrenGuardianshipFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>                         
            </section> 
           

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I am: </div>
                <div style="margin:0 0 0 1.35rem;">                    
                    <check-box style="" :check="true?'yes':''" text="a guardian of the child(ren)"/>
                    <check-box style="" :check="true?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Indigenous ancestry of child</b></div>
                <i>These questions will help the court make a decision about guardianship of a child.</i>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">Is the child or children Indigenous? </div>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="No"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="true?'yes':''" text="Unknown"/>
                    <div style="margin:0 0 0 1.35rem;">
                        <i style="margin:0 0 0 -0.25rem;" >If yes, please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</i>
                        <check-box style="" :check="true?'yes':''" text="First Nation"/>
                        <check-box style="" :check="true?'yes':''" text="Nisga’a"/>
                        <check-box style="" :check="true?'yes':''" text="Treaty First Nation"/>
                        <check-box style="" :check="true?'yes':''" text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                        <check-box style="" :check="true?'yes':''" text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                    </div>
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <4> -->
            <section>
                <i style="display:inline; margin:0 0 0 0.5rem;">Complete the following statement only if the child is a Nisga’a child or a Treaty First Nation child</i>
                <div style="margin:0 0 0 1.35rem;">
                    <check-box style="" :check="true?'yes':''" text="I acknowledge that I must serve the Nisga'a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe it is in the child(ren)’s best interests to cancel the guardianship of the person(s) listed in paragraph 1 because:</div>
                </section>        
            </div>
        </div>

       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule9')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 9 – SPOUSAL SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 9 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making a new application about spousal support.</i>
            </div>

            <div style="margin-top:1rem;"><b>Entitlement to spousal support</b></div>
<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 0 0.5rem;">I believe that I am, or the other party is, entitled to spousal support for the following reason(s):</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i style="margin:0 0 0 0rem;" >Select all options that apply</i>
                    <check-box style="" :check="true?'yes':''" text="there are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship"/>
                    <check-box style="" :check="true?'yes':''" text="to share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child"/>
                    <check-box style="" :check="true?'yes':''" text="to relieve economic hardship of the spouses arising from the breakdown of the relationship"/>
                    <check-box style="" :check="true?'yes':''" text="to help each spouse become financially independent within a reasonable period"/>                    
                </div>            
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Current arrangements</b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin:0 0 0rem 0.35rem;">The current support arrangements are as follows:</div>
                </section>        
            </div>
        
            <div class="print-block">
                <div style="margin-top:4rem;"><b>Income and earning potential</b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin:0 0 0rem 0.35rem;">My current employment situation, training, health and ability to work are as follows:</div>
                </section>
            </div>

            <div style="margin-top:4rem;"></div>
<!-- <4> -->
            <section>               
                <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                <div style="margin:0 0 0 1.25rem;">
                    <check-box style="" :check="true?'yes':''" text="I do not know the income of the other party"/>
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="I believe the other party’s annual income is $"/>
                    <underline-form style="display:inline;margin:0 0 0 0.5rem;" textwidth="8rem" beforetext="" hint="" text="123,456.78"/>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <5> -->
            <section>
                <div style="display:inline; margin:0 0 0 0.5rem;">I know the following facts about the other party’s employment, training, health and ability to work:</div>
                <div style="margin:0 0 3rem 1.5rem;">
                    <i style="margin:0 0 0 0rem;" >If you do not have any information, please leave this section blank</i>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <6> -->
                <section>
                    <underline-form style="text-indent:0px;display:inline; margin:0 0 0 0.5rem;" textwidth="11.5rem" beforetext="I am applying for an order for spousal support to be paid by" hint="name of paying party" text=""/>                
                    <div style="display:inline; margin:0 0 0 0.5rem;">as follows:</div>
                    <div>
                        <i style="margin:0 0 0 1.5rem;" >Select all options that apply and complete the required information</i>
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="in the amount of "/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="5rem" beforetext="$" hint="" text="123,456.00"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="per month to commence on" hint="mmm/dd/yyyy" text="APR 20, 2020"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="until" hint="mmm/dd/yyyy" text="APR 20, 2020"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="in a lump sum of"/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="8rem" beforetext="$" hint="" text="123,456.00"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0rem 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="32.35rem" beforetext="" hint="" text=""/>            
                    
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <7> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 3rem 1.25rem;">
                        <check-box style="" :check="true?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box style="" :check="true?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <8> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box style="" :check="true?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box style="" :check="true?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about spousal support. You must provide your financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>
        </div>     


<!-- <Page 11> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule10')">
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 10 – SPOUSAL SUPPORT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 10 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel an existing final order about spousal support or to set aside or replace all or part of an existing written agreement about spousal support.</i>
            </div>


            <div style="margin-top:1rem;"></div>
<!-- <1> -->
            <section class="resetquestion">
                <check-box inline="inline" boxMargin="0" shift="5" style="display:inline; margin-left:0.0rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or written agreement about spousal support made"/>
                <underline-form style="margin:0.25rem 1.45rem; text-indent:0px;" textwidth="10rem" beforetext="on" hint="mmm/dd/yyyy" text="APR 20 2020"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am applying for the existing final order about spousal support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="true?'yes':''" text="changed"/>
                        <check-box style="" :check="true?'yes':''" text="cancelled"/>
                        <div>Since the final order about spousal support was made, circumstances have changed as follows:</div>
                        <i class='marginleft-1vue' style="margin-left:0rem;">Select all options that apply and complete the required information</i>
                        <check-box style="" :check="true?'yes':''" text="my financial situation has changed"/>
                        <check-box style="" :check="true?'yes':''" text="I believe the other party’s financial situation has changed"/>
                        
                        <check-box style="margin:0 0 2rem 0;" :check="true?'yes':''" text="my employment, training, health and/or ability to work has changed as follows:"/>
                        <check-box style="margin:0 0 2rem 0;" :check="true?'yes':''" text="I believe the other party’s employment, training, health and/or ability to work has changed as follows:"/>
                        <check-box style="margin:0 0 2rem 0;" :check="true?'yes':''" text="my household expenses have changed as follows:"/>

                        <check-box style="margin:0 0 2rem 0;" :check="true?'yes':''" text="information has become available that was not available when the order was made <i>(specify):</i>"/>
                        <check-box style="margin:0 0 3rem 0;" :check="true?'yes':''" text="other changes or circumstances <i>(specify)</i>:"/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Existing agreement</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="true?'yes':''" text="I am applying for the existing written agreement about spousal support to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box style="" :check="true?'yes':''" text="set aside"/>
                            <check-box style="" :check="true?'yes':''" text="replaced"/>
                        </div>
                        <div style="margin:0 0 0 3rem;">I believe the agreement should be set aside or replaced because:</div>
                    </div>                
                </section> 
            </div>       
        
            <div class="print-block">
                <div style="margin-top:3rem;"><b>About the order</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you are applying to change or replace an existing final order or written agreement about spousal support. You may leave this section blank.</i>
                    <div style="margin:0 0 0 0rem; text-indent:0rem;">
                        I am applying for the final order or agreement about spousal support to be changed or replaced as follows:
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Unpaid spousal support</b></div>
<!-- <5> -->
                <section>
                    <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="As of " hint="mmm/dd/yyyy" text="APR 20 2020"/>
                    <underline-form style="margin-left:0.1rem; text-indent:0px;" textwidth="7rem" beforetext=", the amount of unpaid spousal support (arrears) was $" hint="" text="125000.00"/>          
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid spousal support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select only one of the options below.</i>
                    <check-box style="margin:0 0 0 0rem;" :check="true?'yes':''" text="I am not applying to reduce the amount of unpaid spousal support (arrears)"/>                    
                </div>
                <div style="margin:0 0 0 1.5rem;">    
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0.07rem;" :check="true?'yes':''" text="I am applying to reduce the amount of unpaid spousal support (arrears) to"/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="8rem" beforetext=" $" hint="" text="200,000.00"/>
                    <div style="margin:0 0 3rem 0;">because:</div>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid spousal support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">I am applying for an order that the remaining unpaid spousal support (arrears) be paid as follows:</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select all options that apply and complete the required information</i>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">                        
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0rem;" :check="true?'yes':''" text="at a rate of "/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" text="200,000.00"/>
                    <div style="display:inline;margin:0 0 0 0.25rem;">per month</div>
                </div>
                <div style="margin:0.25rem 0 0 1.45rem;">
                    <check-box style="margin:0 0.25rem 0 0rem;" :check="true?'yes':''" text="in a lump sum"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.45rem;">
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="32rem" beforetext="" hint="" text=""/>
                 </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <8> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.25rem;">
                        <check-box style="margin:0 0.25rem 0 0rem;" :check="true?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box style="margin:0 0rem 3rem 0rem;" :check="true?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <9> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box style="" :check="true?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box style="" :check="true?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about spousal support. You must provide your financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>
        </div>

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';
import ChildrenInfo from '../../childInfo/ChildrenInfo.vue';
import ParentingTime from '../../parentingArrangements/ParentingTime.vue';
import { nameInfoType } from '@/types/Application';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Form3 extends Vue {

    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false;
    aboutChildren = false;

    otherPartyInfo=[];
    yourInformationSurvey;

    applicantList = []

    selectedSchedules = []
    existingOrders = {}
    relationshipBetweenParties = {}
    childrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    culturalInfo = '';
    parentArrInfo = {}
    exParentArrInfo = {}
    chSupInfo = {}
    exChSupInfo = {}
   
    mounted(){
        this.dataReady = false;
        this.result = this.getFLMResultData();
        this.extractInfo();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }
   
    childrenFields=[
        {key:"fullName",       label:"Child's full legal name",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",        label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship", label:"My relationship to the child",           tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship",   label:"Other party's relationship to the child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",     label:"Child is currently living with",         tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]

    sharingAdultItem = [{name:'', dob:'', relation:''}]
    sharingAdultFields = [
        {key:"name",     label:"Full name",                                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Date of birth (mmm/dd/yyyy)",              tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Relationship to other protected person(s)",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:20%;"},
    ]

    over19ChildSupportDetails =[{name:'', reasonForSupport:{illness:false, disability:false, student:false}}]
    childrenSupportFields = [
        {key:"name",             label:"Full name of child",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"reasonForSupport", label:"Reason for child support", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ]

    childrenSupportExpenseItem =[
        {name:'Special and Extraordinary Expense', amount1:"Annual Amount", amount2:"Annual Amount", amount3:"Annual Amount", amount4:"Annual Amount"},
        {name:'Child care expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Portion of medical/dental premiums attributable to child', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Health related expenses that exceed insurance reimbursement by at least $100', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Extraordinary expenses for primary or secondary school', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Post-secondary school expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Extraordinary extracurricular activities expenses', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
        {name:'Total', amount1:"$", amount2:"$", amount3:"$", amount4:"$"},
    ]
    childrenSupportExpenseFields = [
        {key:"name",    label:"Name of Child:", tdClass:"border-top-0 align-middle", thClass:"text-right border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"},
        {key:"amount1", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount2", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount3", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        {key:"amount4", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        
    ]

    childrenGuardianshipItem = [
        {gaurdianName:'', childName:'', gaurdianSince:''}
    ]
    childrenGuardianshipFields = [
        {key:"gaurdianName",  label:"Full name of guardian",                                tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"childName",     label:"Name of child(ren)",                                   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"gaurdianSince", label:"They have been a guardian of the child(ren) since:",   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:25%;"},
    ]

    public extractInfo(){
        if(this.result.protectionWhomSurvey && this.result.protectionWhomSurvey.ApplicantNeedsProtection== "y"){            
            if(this.result.protectionWhomSurvey.anotherAdultSharingResi=='y'){
                this.sharingAdultItem = [];
                for(const sharingAdult of this.result.protectionWhomSurvey.allAnotherAdultsSharingResi){
                    this.sharingAdultItem.push({
                        name:Vue.filter('getFullName')(sharingAdult.anotherAdultSharingResiName), 
                        dob:Vue.filter('beautify-date')(sharingAdult.anotheradultSharingResiDOB), 
                        relation:sharingAdult.anotherAdultSharingResiRelation
                    })
                }
            }
        }

        this.selectedSchedules = this.getSchedulesInfo();
        this.existingOrders = this.getExistingOrdersInfo();
        this.relationshipBetweenParties = this.getRelationshipBetweenPartiesInfo();
        if (this.result.childData && this.result.childData.length > 0){
            this.aboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.childBestInterestAcknowledgement;            
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [];
            this.childBestInterestAcknowledmentCheck = false;
        }

        if (this.result.flmBackgroundSurvey.culturalExplain) {
            this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        }

        if (this.selectedSchedules.includes('schedule1')){
            this.parentArrInfo = this.getParentingArrangementsInfo();
        }

        if (this.selectedSchedules.includes('schedule2')){
            this.exParentArrInfo = this.getExistingParentingArrangementsInfo();
        }

        if (this.selectedSchedules.includes('schedule3')){
            this.chSupInfo = this.getNewChildSupportInfo();
        }

        if (this.selectedSchedules.includes('schedule4')){
            this.exChSupInfo = this.getExistingChildSupportInfo();
        }
        
        this.otherPartyInfo=this.getOtherPartyInfo()
        this.yourInformationSurvey = this.getYourInfo()
        //console.log(this.yourInformationSurvey)

    }

    public getRelationshipBetweenPartiesInfo(){

        let relationshipInfo = {description: '', spouses:false, startDate: '', marriageDate: '', separationDate: ''};
        relationshipInfo.description = this.result.flmBackgroundSurvey.howPartiesRelated;
        relationshipInfo.spouses = this.result.flmBackgroundSurvey.werePOPartiesMarried == 'y';
        if (relationshipInfo.spouses){
            relationshipInfo.startDate = this.result.flmBackgroundSurvey.liveTogetherPODate;
            relationshipInfo.marriageDate = this.result.flmBackgroundSurvey.dateOfMarriagePO;
            relationshipInfo.separationDate = this.result.flmBackgroundSurvey.separationDate;
        }
        return relationshipInfo;
    }

    public getParentingArrangementsInfo(){
        let parentingArrangements = {parentResp: {}, parentTime: {}, parentalArr: {}, childBestInterest: ''};

        if (this.result.parentalResponsibilitiesSurvey.parentalResponsibilitiesOrder == 'y'){
            parentingArrangements.parentResp = {
                applying: true,
                allResp: this.result.parentalResponsibilitiesSurvey.allResponsibilitiesOrder == 'y',
                children: this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities,
                allKids: this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities.length == this.childrenInfo.length,
                expl: this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities? this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities:''
            }

        } else {
            parentingArrangements.parentResp = {
                applying: false
            }
        }

        if (this.result.parentingTimeSurvey.parentingTimeOrder == 'y'){
            const parentingTime = this.result.parentingTimeSurvey
            parentingArrangements.parentTime = {
                applying: true,
                desired: parentingTime.applicantDesiredParentingTime,
                conditionMe: parentingTime.conditionedApplicantParentingTime == 'y',
                myConditions: (parentingTime.conditionedApplicantParentingTime == 'y')? parentingTime.ApplicantParentingTimeConditions:'',
                conditionOp: parentingTime.conditionedRespondentParentingTime == 'y',
                opConditions: (parentingTime.conditionedRespondentParentingTime == 'y')?parentingTime.RespondentParentingTimeConditions:'',
                opDesired: parentingTime.respondentDesiredParentingTime
            }

        } else {
            parentingArrangements.parentTime = {
                applying: false
            }
        }

        if (this.result.parentalArrangementsSurvey.parentalArrangements == 'y'){
            const parentalArrangements = this.result.parentalArrangementsSurvey
            parentingArrangements.parentalArr = {
                applying: true,
                desc: parentalArrangements.parentalArrangementsDescription                
            }
        } else {
            parentingArrangements.parentalArr = {
                applying: false
            }
        }
        
        if (this.result.bestInterestOfChildSurvey 
            && this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription){
                parentingArrangements.childBestInterest = this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription

        } else {
            console.log('here')
            parentingArrangements.childBestInterest = '';
        }

        //console.log(parentingArrangements)

        return parentingArrangements;
    }

    public getExistingParentingArrangementsInfo(){
        let existingParentingArrangements = {parentResp: {}, parentTime: {}, parentCond:{}, parentalArr: {}, childBestInterest: ''};

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentalResponsibilities")){
            existingParentingArrangements.parentResp = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription:''
            }

        } else {
            existingParentingArrangements.parentResp = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentingTime")){
            existingParentingArrangements.parentTime = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
            }

        } else {
            existingParentingArrangements.parentTime = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("conditionsOnParentingTime")){
            existingParentingArrangements.parentCond = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
            }

        } else {
            existingParentingArrangements.parentCond = {
                applying: false
            }
        }

        if (this.result.parentingArrangementChangesSurvey.orderChangeList &&  this.result.parentingArrangementChangesSurvey.orderChangeList.includes("otherTermsAboutParentingArrangements")){
            existingParentingArrangements.parentalArr = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription:''
            }

        } else {
            existingParentingArrangements.parentalArr = {
                applying: false
            }
        }         
        
        if (this.result.bestInterestOfChildSurvey 
            && this.result.bestInterestOfChildSurvey.existingParentingArrangementsChildBestInterestDescription){
                existingParentingArrangements.childBestInterest = this.result.bestInterestOfChildSurvey.existingParentingArrangementsChildBestInterestDescription;
        } else {            
            existingParentingArrangements.childBestInterest = '';
        }
        //console.log(parentingArrangements)
        return existingParentingArrangements;
    }

    public getNewChildSupportInfo(){
        console.log(this.result)
        let newChildSupportInfo = {appType: {}, opType: {}, currCond:{}, opInfo: {}, desiredSup: {}, calc:{}, ndHard:{}, specExp: {}, finStmnt:{}};

        if (this.result.childSupportSurvey.applicantGuardianType){
            newChildSupportInfo.appType = {
                guardian: this.result.childSupportSurvey.applicantGuardianType == 'parentGuardian',
                standing: this.result.childSupportSurvey.applicantGuardianType == 'appointedGuardian',
                other: this.result.childSupportSurvey.applicantGuardianType == 'other',
                otherCom: (this.result.childSupportSurvey.applicantGuardianType == 'other' && this.result.childSupportSurvey.applicantGuardianTypeComment)? this.result.childSupportSurvey.applicantGuardianTypeComment: ''
            }
        }

        if (this.result.childSupportSurvey['otherParty[0]GuardianType']){
            newChildSupportInfo.opType = {
                guardian: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'parentGuardian',
                standing: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'appointedGuardian',
                other: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other',
                otherCom: (this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other' && this.result.childSupportSurvey['otherParty[0]GuardianTypeComment'])? this.result.childSupportSurvey['otherParty[0]GuardianTypeComment']: ''
            }
        }

        if (this.result.childSupportCurrentArrangementSurvey){
            newChildSupportInfo.currCond = {
                splitShared: (this.result.childSupportCurrentArrangementSurvey.applicantTimeType == 'y'),                
                timeDesc: (this.result.childSupportCurrentArrangementSurvey.applicantTimeWithChildExplanation)? this.result.childSupportCurrentArrangementSurvey.applicantTimeWithChildExplanation: '',
                supArr: (this.result.childSupportCurrentArrangementSurvey.currentArrangmentExplanation)? this.result.childSupportCurrentArrangementSurvey.currentArrangmentExplanation: ''
            }
        }

        if (this.result.childSupportIncomeEarningSurvey){
            newChildSupportInfo.opInfo = {  
                facts: this.result.childSupportIncomeEarningSurvey.knowFacts == 'y',
                income: this.result.childSupportIncomeEarningSurvey.knowIncome == 'y',              
                factsDesc: (this.result.childSupportIncomeEarningSurvey.knowFacts == 'y' && this.result.childSupportIncomeEarningSurvey.factsExplanation)? this.result.childSupportIncomeEarningSurvey.factsExplanation: '',
                incomeAmt: (this.result.childSupportIncomeEarningSurvey.knowIncome == 'y' && this.result.childSupportIncomeEarningSurvey.incomeAmount)? this.result.childSupportIncomeEarningSurvey.incomeAmount: ''
            }
        }

        if (this.result.aboutChildSupportOrderSurvey){
            newChildSupportInfo.desiredSup = {  
                payor: this.result.aboutChildSupportOrderSurvey.listOfSupportPayors.toString(),
                applicantPayor: this.result.aboutChildSupportOrderSurvey.listOfSupportPayors.includes(Vue.filter('getFullName')(this.applicantName)),
                payees: this.result.aboutChildSupportOrderSurvey.selectedChildrenNames.toString(),              
                over19: (this.result.aboutChildSupportOrderSurvey.supportChildOver19 == 'y'),
                payorErnsHigh:( this.result.aboutChildSupportOrderSurvey.payorEarnsHigh == 'yes'),
                startDate: this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDate,
                reason: (this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDateWhy)? this.result.aboutChildSupportOrderSurvey.paymentRequestStartingDateWhy: ''
            }
            this.over19ChildSupportDetails = (this.result.aboutChildSupportOrderSurvey.supportChildOver19 == 'y')?this.result.aboutChildSupportOrderSurvey.over19Details:[]            
        }        

        if (this.result.calculatingChildSupportSurvey){
            newChildSupportInfo.calc = {                
                attch: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
            }
        }

        if (this.result.undueHardshipSurvey){
            newChildSupportInfo.ndHard = {                
                change: (this.result.undueHardshipSurvey.changeAmount == 'y'),
                reasons: (this.result.undueHardshipSurvey.changeAmount == 'y' && this.result.undueHardshipSurvey.hardshipReasons)? {
                    excessive: this.result.undueHardshipSurvey.hardshipReasons.includes("excessive amount of debt"), 
                    high: this.result.undueHardshipSurvey.hardshipReasons.includes("high expenses"), 
                    another: this.result.undueHardshipSurvey.hardshipReasons.includes("support another person"), 
                    dependent:this.result.undueHardshipSurvey.hardshipReasons.includes("support a dependent child"), 
                    other: this.result.undueHardshipSurvey.hardshipReasons.includes("other")
                }: {excessive: false, high: false, another: false, dependent:false, other: false},
                otherCom: (this.result.undueHardshipSurvey.hardshipReasons.includes("other") && this.result.undueHardshipSurvey.hardshipReasonsComment)? this.result.undueHardshipSurvey.hardshipReasonsComment:'',
            }
        }

        if (this.result.specialAndExtraordinaryExpensesSurvey){
            newChildSupportInfo.specExp = {                
                applying: (this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y'),
                expenseItems: (this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y' && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem)? {}: {}
            }
        }

        //TODO: add field for 'party has been acting ...', not able to complete it at this time
        newChildSupportInfo.finStmnt = {
            required: (newChildSupportInfo.desiredSup['applicantPayor'] ||
                    newChildSupportInfo.desiredSup['over19'] ||
                    newChildSupportInfo.desiredSup['payorErnsHigh'] ||
                    newChildSupportInfo.currCond['splitShared'] ||
                    newChildSupportInfo.specExp['applying'] ||
                    newChildSupportInfo.ndHard['change'])

        }

        return newChildSupportInfo;
    }

    public getExistingChildSupportInfo(){
        let existingChildSupportInfo = {abtEx: {}, abtOrg: {}, unpdChSup: {}, calc:{}, strtPy:{}, finStmnt:{}};

        console.log(this.result)

        if (this.result.aboutExistingChildSupportSurvey){
            existingChildSupportInfo.abtEx = {                
                payor: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payor'),
                payee: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payee'),
                other: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other'),
                otherComm: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other' && this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment)? this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment:'',
                orderDate: Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate),
                exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
                fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
                cancelOrdr:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
                changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
                changeList: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.length>0)? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList:[],
                newInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Information has become available that was not available when the order was made') && this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder)?this.result.aboutExistingChildSupportSurvey.newInfoSinceOrder:'',
                expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The `special and extraordinary expenses` have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
                lvngChangeInfo:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('The living arrangements for a child have changed') && this.result.aboutExistingChildSupportSurvey.changesSinceOrder)?this.result.aboutExistingChildSupportSurvey.changesSinceOrder:'',
                otherInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.includes('Other changes or circumstances') && this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder)?this.result.aboutExistingChildSupportSurvey.otherChangesSinceOrder:'',
                exstngAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
                setAsideAgrmnt:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
                replaceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
                changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement)?this.result.aboutExistingChildSupportSurvey.changesSinceAgreement:''
            }
        }

        if (this.result.aboutChildSupportChangesSurvey){
            existingChildSupportInfo.abtOrg = {                
                newOrderDesc: (existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr'])?this.result.aboutChildSupportChangesSurvey.orderDescription:'',
                startDate: ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.orderStartingDate)?this.result.aboutChildSupportChangesSurvey.orderStartingDate:'',
                startReason: ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.orderStartDateReason)?this.result.aboutChildSupportChangesSurvey.orderStartDateReason:'',
                situationList: ((existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr']) && this.result.aboutChildSupportChangesSurvey.listOfSituations)?this.result.aboutChildSupportChangesSurvey.listOfSituations:[]                    
            }
        }

        if (this.result.unpaidChildSupportSurvey){
            existingChildSupportInfo.unpdChSup = {
                crntDate: moment().format("MMM DD, yyyy"),   
                unpaid: this.result.unpaidChildSupportSurvey.unpaid == 'y',
                reduce: this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y',
                reduceAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y')?this.result.unpaidChildSupportSurvey.reduceAmount:'',
                whyReduceAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.applyToReduce == 'y')?this.result.unpaidChildSupportSurvey.whyReduceAmount:'',
                paySchd: (this.result.unpaidChildSupportSurvey.unpaid == 'y')?this.result.unpaidChildSupportSurvey.paymentSchedule:'',
                monthlyAmount: (this.result.unpaidChildSupportSurvey.unpaid == 'y' && this.result.unpaidChildSupportSurvey.paymentSchedule == 'monthly')? this.result.unpaidChildSupportSurvey.monthlyAmount:'',
                amnt: (this.result.unpaidChildSupportSurvey.unpaid == 'y')?this.result.unpaidChildSupportSurvey.unPaidAmount:0, 
                otherComm: (this.result.unpaidChildSupportSurvey.unpaid == 'y') && (this.result.unpaidChildSupportSurvey.paymentSchedule == 'other')? this.result.unpaidChildSupportSurvey.paymentScheduleComment:''       
            }
        }

        if (this.result.calculatingChildSupportSurvey){
            existingChildSupportInfo.calc = {   
                attaching: this.result.calculatingChildSupportSurvey.attachingCalculations == 'y',
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
            }
        }

        return existingChildSupportInfo;
    }

    public getChildrenInfo(){

        const childrenInfo = [];
        let childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        const childData = this.result.childData;
       
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
        let existing = {existingFlm: false, existingPO: false}

        existing.existingFlm = this.result.flmBackgroundSurvey.ExistingOrders == 'y';
        existing.existingPO = this.result.flmBackgroundSurvey.existingPOOrders == 'y';

        return existing;
    }

    public getSchedulesInfo(){
        //console.log(this.result)

        let schedules = [];
        const selectedFLMs = this.result.flmSelectedForm;
        const flmBackgroundInfo = this.result.flmBackgroundSurvey;

        if (flmBackgroundInfo.ExistingOrdersFLM == 'n') {
            
            if (selectedFLMs.includes("parentingArrangements")){
                schedules.push("schedule1")
            }
            if (selectedFLMs.includes("childSupport")){
                schedules.push("schedule3")
            }
            if (selectedFLMs.includes("contactWithChild")){
                schedules.push("schedule5")
            }
            if (selectedFLMs.includes("guardianOfChild")){
                schedules.push("schedule7")
            }
            if (selectedFLMs.includes("spousalSupport")){
                schedules.push("schedule9")
            }

        } else if (flmBackgroundInfo.ExistingOrdersFLM == 'y' && flmBackgroundInfo.existingOrdersListFLM && flmBackgroundInfo.existingOrdersListFLM.length > 0){

            if (selectedFLMs.includes("parentingArrangements") && flmBackgroundInfo.existingOrdersListFLM.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                schedules.push("schedule2")
            }
            if (selectedFLMs.includes("childSupport") && flmBackgroundInfo.existingOrdersListFLM.includes("Child Support")){
                schedules.push("schedule4")
            }
            if (selectedFLMs.includes("contactWithChild") && flmBackgroundInfo.existingOrdersListFLM.includes("Contact with a child")){
                schedules.push("schedule6")
            }
            if (selectedFLMs.includes("guardianOfChild") && flmBackgroundInfo.existingOrdersListFLM.includes("Guardianship of a child")){
                schedules.push("schedule8")
            }
            if (selectedFLMs.includes("spousalSupport") && flmBackgroundInfo.existingOrdersListFLM.includes("Spousal Support")){
                schedules.push("schedule10")
            }
        }

        return schedules;
    }

    public getYourInfo(){
        let dob = ''
        let name = ''
        let address = {street:'', city: '', country: '', postcode: '', state: ''}
        let contact = {email:'',fax:'',phone:''}
        let Lawyer = 'n'

        if(this.result.yourInformationSurvey){
            if(this.result.yourInformationSurvey.ApplicantName)
                name=this.result.yourInformationSurvey.ApplicantName
            
            if(this.result.yourInformationSurvey.ApplicantDOB)
                dob=this.result.yourInformationSurvey.ApplicantDOB

            if(this.result.yourInformationSurvey.ApplicantAddress)
                address=this.result.yourInformationSurvey.ApplicantAddress
            
            if(this.result.yourInformationSurvey.ApplicantContact)
                contact=this.result.yourInformationSurvey.ApplicantContact

            if(this.result.yourInformationSurvey.Lawyer)
                Lawyer=this.result.yourInformationSurvey.Lawyer            
        }
        return {'name':name, 'dob':dob, 'address': address ,'contact': contact, 'Lawyer':Lawyer}
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = 'unknown'
        let name = ''
        let address = ''
        let contactInfo = ''

        if(this.result.selectedPOOrder && this.result.selectedPOOrder.orderType == 'needPO' && this.result.protectionWhomSurvey){            

            if(this.result.protectionWhomSurvey['RespondentDOBExact'] == 'y' &&   this.result.protectionWhomSurvey['RespondentDOB'])
                dob = this.result.protectionWhomSurvey['RespondentDOB']
            
            if(this.result.protectionWhomSurvey['RespondentName'])
                name = this.result.protectionWhomSurvey['RespondentName']
            
            if(this.result.protectionWhomSurvey['RespondentAddress'])
                address = this.result.protectionWhomSurvey['RespondentAddress']
            
            if(this.result.protectionWhomSurvey['RespondentContact'])
                contactInfo = this.result.protectionWhomSurvey['RespondentContact']
                
            info = [{'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo}]
        }
        else if(this.result.selectedPOOrder && (this.result.selectedPOOrder.orderType == 'changePO' || this.result.selectedPOOrder.orderType == 'terminatePO')){    
            for(const party of this.result.otherPartySurvey){
                dob = 'unknown'
                name = ''
                address = ''
                contactInfo = ''

                if (party['knowDob'] == 'y' &&  party['dob'])
                    dob = party['dob']

                if (party['name'])
                    name = party['name']
                
                if (party['address'])
                    address = party['address']
                
                if (party['contactInfo'])
                    contactInfo = party['contactInfo']
                
                info.push({'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo})
            }
        }
        else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

        return info
    }
        
    public onPrint() { 
               
        const el= document.getElementById("print");
        //console.log(el)
        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 712   `+moment().format("MMMM D, YYYY")+` \\a           Form 3";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order&pdf_type=FLC&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

        // const body = new FormData();
        // body.append('html',pdfhtml)
        // body.append('json_data',null)

        const body = {
            'html':pdfhtml,
            'json_data':this.getFLMResultData()
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  
        //console.log(body)
        this.$http.post(url,body, options)
        .then(res => {
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate); 
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){        
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?pdf_type=FLC'
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "Form3.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }

 
    public getFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(let i=2;i<4; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                //console.log(stepResults[stepResult])
                //console.log(stepResults[stepResult].data)
                if(stepResults[stepResult])
                    result[stepResult]=stepResults[stepResult].data; 
            }
        }

        //console.log(this.$store.state.Application.steps[0].result)
    //     const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
    //     Object.assign(result, result, protectedPartyName);

        const childBestInterestAck = {childBestInterestAcknowledgement:this.$store.state.Application.steps[3].result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        //console.log(result)

        return result;
    }

}
</script>
<style scoped>

    .table >>> th{border:1px solid #000;}
    .table >>> td{border:1px solid #000;}
    .table >>> tr{height:1.5rem;}

    table.fullsize {table-layout: fixed; width: 100%; margin-top:1rem;}
    table.fullsize >>> tr{border:1px solid #313132;}
    table.fullsize >>> td{padding:0 0 0 .5rem; color: #313132;}

    .new-page{margin-top:7rem;}
    .marginleft{margin-left:-1rem;}
    .marginleft1vue{margin-left:1rem !important;}
    .marginleft1p5vue{margin-left:1.5rem !important;}
    .marginleft2p5vue{margin-left:2.5rem !important;}
    .marginleft-1vue{margin-left:-1rem !important;}

    .answer{color: #000; display:inline; font-size:11pt;}
    .answerbox{color: #000; font-size:11pt; display:block;text-indent:0px; margin:0.5rem 0 0 0.1rem;}
    .uline{text-decoration: underline; display: inline;}
    .form-header{display:block; margin:0 0 2rem 0;}

    section{
        counter-increment: question-counter;         
        text-indent: -17px;
        text-align: justify;
        text-justify: inter-word;
        margin: 0.5rem 0.5rem 0.5rem 1rem;
    }
 
    section:before {
        font-weight: bolder;        
        content:counter(question-counter) ".";
    }

    section:after{
        float:none; white-space: pre;
    }
    
    section.resetquestion{counter-reset: question-counter;}

    
    ol.resetcounter{
        list-style: none;
        counter-reset: bracket-counter;
    }
    ol li.bracketnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: bracket-counter;
    }
    ol li.bracketnumber:before {
        content:"(" counter(bracket-counter) ") ";
        font-weight: bold;
    }

    ol.resetlist {
        list-style: none;
        counter-reset: list-counter;
    }
    ol li.listnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: list-counter;
    }
    ol li.listnumber:before {
        content:counter(list-counter) ". ";
        font-weight: bold;
    }

    .container {
        padding: 40px !important; 
        margin-right: auto !important;
        margin-left: auto !important;
        width: 100% !important;
        max-width: 760px !important;
        min-width: 760px !important;   
        font-size: 10pt !important;
        font-family: BCSans;
        color: #313132 !important;
    }
        
    #app-prints {
    padding: 8px 15px;
    position: absolute;
    position: fixed;
    right: 55rem;
    top: 1rem;
    z-index: 100; 
    }
    

</style>