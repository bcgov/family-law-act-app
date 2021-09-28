<template>
<!----------------------------------------------------------------  <NEED PO>   -------------------------------------------------------->
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />

        <div style="text-align:center;font-family:BCSans"><b> SCHEDULE 1 – AFFIDAVIT FOR PROTECTION ORDER</b></div>
        <div style="text-align:center;font-family:BCSans"><b> This is Schedule 1 to the Application about a Protection Order</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>This schedule must be completed if you are applying for a protection order. A judge can make decisions based only on the
            information presented by the parties as evidence. Evidence must be relevant to the issue. Please complete the following
            affidavit to help you explain to the court why you need a protection order and what it should include. In some cases, if you have
            provided evidence in this affidavit, a judge may not need you to provide additional information in court. 
            </i>
        </div>

        <div>
            <underline-form style="display:inline-block;" textwidth="13rem" beforetext="I," hint="full name of party" :text="yourInfo.name | getFullName"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="," hint="occupation" :text="yourInfo.occupation"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="20rem" beforetext="of" hint="address of party, city, province" :text="serviceAddress | getFullAddress"/>
            <div style="text-indent:1px;display:inline;"> ,</div>
        </div>

        <div class="mt-3">
            SWEAR OR AFFIRM THAT:
        </div>
<!-- <1> -->
        <section class="resetquestion">  
            I am making this affidavit in support of an application for a protection order.
        </section>

<!-- <2> -->
        <section>  
            I am applying for a protection order for the following person(s) to be protected:           
            <div style="margin:0.25rem 0 0 2rem;" >
                <i>Select and complete only those options that apply to your situation. You may select more than one.</i>
                <check-box  :check="applicantNeedsProtection == 'y'?'yes':''" text="me"/>
                <check-box  :check="hasChildren?'yes':''" text=" the following child(ren) I am parent or guardian to:<br><i>Complete only if applicable. You may leave this section blank</i>"/>                
            </div>

            <b-table
                :items="childrenItem"
                :fields="childrenFields"
                class="mt-2"
                style="font-family:BCSans;"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table> 

            <div style="margin:0.25rem 0 0 2rem;" >
                <check-box  :check="hasSharingAdult?'yes':''" text="The following adult(s) sharing the residence with the other protected person(s):<br><i>Complete only if the adult family member sharing the residence with another protected person needs to also be protected. You may leave this section blank.</i>"/>               
            </div>

            <b-table
                :items="sharingAdultItem"
                :fields="sharingAdultFields"
                class="mt-2"
                style="font-family:BCSans;"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        <b >Date of birth</b> <br/> <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table>

            <div  style="margin:0.25rem 0 0 2rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="hasAnotherAdult?'yes':''" text=" Other <i>(specify):</i>"/>               
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext=""  hint="full name of other person to be protected"   :text="applicantNeedsProtection == 'n'? (anotherAdult.nameFull ): ''"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="11rem" beforetext="," hint="date of birth of other person (mmm/dd/yyyy)" :text="applicantNeedsProtection == 'n'?(anotherAdult.dobBeauty ): '' "/>
                <div style="text-indent:-18px;display:block;margin-top:0.5rem;"> Explain why you are applying for the other person:</div>
                <div v-if="applicantNeedsProtection == 'n'" class="answerbox"> {{anotherAdult.reason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>

            <div style="text-indent:0px;margin:1rem 0 0 0;font-family:BCSans;">
                <b>
                    The person(s) identified in the section above is/are referred to as the protected party/parties. The other party is the
                    person they need protection from.
                </b>
            </div>
        </section>

    




        <div class="new-page" />
<!-- <Page 3> --> 
<!-- <Header> -->
        <div ><b> ABOUT THE PROTECTION ORDER</b></div>
<!-- <3> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> I do not want the other party to be able to attend at, enter or be found at the following places:</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>
                <check-box  :check="noGo.places.includes('Home')?'yes':''" text="Residence"/>
                <check-box  :check="noGo.places.includes('School')?'yes':''" text="School"/>
                <check-box  :check="noGo.places.includes('Workplace')?'yes':''" text="Place of Employment"/>
                <check-box  :check="noGo.places.includes('ChildCareFacility')?'yes':''" text="Child care facility"/>
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="noGo.places.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="noGo.otherComment"/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <4> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> The protected party may need to communicate with the other party for the following reason(s):</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box  :check="noContact.reasonForComm.includes('Consensual dispute resolution')?'yes':''" text="Consensual dispute resolution"/>
                <check-box  :check="noContact.reasonForComm.includes('Parenting arrangements')?'yes':''" text="Parenting arrangements"/>
                <check-box  :check="noContact.reasonForComm.includes('Ongoing court action')?'yes':''" text="Ongoing court action"/>
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="noContact.reasonForComm.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="noContact.otherComment"/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <5> -->
        <section>
            I have concerns the other party would cause harm with or threaten to use guns, explosives or another kind of firearm
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.firearms == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.firearms == 'n'?'yes':''" text="No"/>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your concerns</i>
            <div class="answerbox" v-if="weaponsFirearms.firearmsReason">{{weaponsFirearms.firearmsReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <6> -->
        <section>
            I believe the other party owns or has access to guns, explosives or another kind of firearm
            <div style="display:block; margin-left:0.5rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.firearmsYes == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.firearmsYes == 'n'?'yes':''" text="No"/>
            </div>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your belief</i>
            <div class="answerbox" v-if="weaponsFirearms.firearmsYesReason">{{weaponsFirearms.firearmsYesReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <7> -->
        <section>
            I have concerns the other party would cause harm with or threaten to use a weapon that is not a gun or explosive            
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.weapons == 'y'? 'yes' : ''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.weapons == 'n'? 'yes' : ''" text="No"/>        
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your concerns</i>
            <div class="answerbox" v-if="weaponsFirearms.weaponsReasons">{{weaponsFirearms.weaponsReasons}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>       
       
        <div style="margin-top:1rem;"></div>
<!-- <8> -->
        <section>
            I believe the other party owns a weapon that is not a gun or explosive            
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.weaponsYes == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="weaponsFirearms.weaponsYes == 'n'?'yes':''" text="No"/>            
            <i style="display:block; margin-left:1rem;">Examples of weapons someone may own include swords, hunting knives, and nunchucks.</i>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your belief</i>
            <div class="answerbox" v-if="weaponsFirearms.weaponsYesReason">{{weaponsFirearms.weaponsYesReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <9> -->
        <section>
            The protected party currently shares a residence with the other party
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="removePerson.liveTogether == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="removePerson.liveTogether == 'n'?'yes':''" text="No"/>                       
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <10> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> I believe police assistance may be required for the following purpose(s):</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box  :check="removePerson.needPolice.includes('To remove the other party from the shared residence')?'yes':''" text="To remove the other party from the shared residence"/>
                <check-box style="margin-top:0rem;" :check="removePerson.needPolice.includes('To supervise the removal of the protected party\'s personal belongings from the shared residence')?'yes':''" text="To supervise the removal of the protected party's personal belongings from the shared residence"/>
                <check-box style="margin-top:0rem;" :check="removePerson.needPolice.includes('To supervise the removal of the other party\'s personal belongings from the shared residence')?'yes':''" text="To supervise the removal of the other party's personal belongings from the shared residence"/>
                <check-box style="margin-top:0rem;" :check="removePerson.needPolice.includes('To supervise the removal of the child(ren)\'s personal belongings from a residence')?'yes':''" text="To supervise the removal of the child(ren)'s personal belongings from a residence"/>
                
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="removePerson.needPolice.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="removePerson.needPoliceComment"/>
                
            </div>
        </section>

        <div style="margin-top:3rem;"><b> YOUR STORY</b></div>
        <div style="margin-top:0rem;font-family:BCSans;"><b>Relationship between parties</b></div>
<!-- <11> -->
        <section>
            The protection party and the other party are:
            <i style="display:block;margin-left:1rem;">Explain how the protected party/parties and the other party are related for the purposes of the application</i>
            <div v-if="backgroundSurvey.howPartiesRelated" class="answerbox"> {{backgroundSurvey.howPartiesRelated}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;font-family:BCSans;"><b><i> * If the protection order is only for the protection of a child(ren), please answer the following question for the parents or guardians of the child(ren).</i></b></div>
<!-- <12> -->
        <section> 
            The protected party is or has been spouses, or lives or has lived together in a marriage-like relationship, with the other party
            <div style="margin:0 0 0 1rem;">
                <i>Specify which protected adult if there is more than one:</i>
                <underline-form style="text-indent:3px;display:inline-block;" textwidth="20.25rem" beforetext="" hint="name of protected party" :text="backgroundSurvey.protectedSpouse" />
            </div>
            <div style="margin:0 0 0 0.35rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.married == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.married == 'n'?'yes':''" text="No"/>                                    
            </div>
            <div style="margin:0 0 0 1rem;">
                <i>If yes, please complete all options below that apply to the parties</i>
                <div style="margin:0 0 0 0;">
                    <underline-form style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="7.75rem" beforetext="Date on which the parties began to live together in a marriage-like relationship:" hint="date (mmm/dd/yyyy)" :text="backgroundSurvey.liveTogetherDate" />
                    <underline-form style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="10rem" beforetext="Date of marriage:" hint="date of marriage (mmm/dd/yyyy)" :text="backgroundSurvey.marriageDate" />
                
                    <div style="margin:0.2rem 0 0 2.15rem;">
                        <div style="display:inline-block;">The protected party currently shares a residence with the other party</div>
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.seperated == 'Yes'?'yes':''" text="Yes"/>
                        <check-box class="marginleftminus" inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.seperated == 'No'?'yes':''" text="No"/>                       
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.seperated == 'Unknown'?'yes':''" text="Unknown"/>                                           
                    </div> 
                    <i style="margin:0.2rem 0 0 1.15rem;display:block;">Spouses may be separated while continuing to live in the same residence</i>
                    <underline-form style="margin-top:0.2rem; text-indent:1px;display:block;" textwidth="10rem" beforetext="If yes, the parties separated on" hint="date of separation (mmm/dd/yyyy)" :text="backgroundSurvey.separationDate" />
                </div>
            </div>
        </section> 

        <div style="margin-top:2rem;font-family:BCSans;"><b>Children</b></div>
<!-- <13> -->
        <section>
            <i style="display:inline;margin-left:0.5rem;">Select whichever option is correct and complete the required information</i>
            <div style="margin:0 0 0 1rem;" >                    
                <check-box  :check="backgroundSurvey.hasOtherChilderen=='n'?'yes':''" text="The protected party and the other party are a parent, or guardian only to the child(ren), if any, identified in paragraph 2 of this affidavit"/>
                <check-box  :check="backgroundSurvey.hasOtherChilderen=='y'?'yes':''" text="The protected party and the other party are a parent, step-parent or guardian to the following child(ren) who is/are not identified in paragraph 2 of this affidavit:"/>
            </div>

            <b-table
                :items="otherChildrenItem"
                :fields="otherChildrenFields"
                class="mt-2"
                style="font-family:BCSans;"
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

        <div style="margin-top:1rem;"></div>
<!-- <14> -->
        <section>
            <i style="display:inline;margin-left:0.5rem;">Complete only if the protected party and the other party are a parent, step-parent or guardian</i>
            <div style="margin:0 0 0 0.75rem; display:block">
                <div style="display:block;margin:0 0 0 0;text-indent:0px;"> 
                    There are existing written agreements or court orders about the children concerning parenting arrangements, child support, contact with a child, or guardianship               
                </div>
                <div  style="margin:0 0 0 0.5rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline" :shift="10" :check="backgroundSurvey.existingOrders=='y'?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :shift="10" :check="backgroundSurvey.existingOrders=='n'?'yes':''" text="No"/>
                </div>
                <i style="display:block;margin-left:1rem">If yes, attach a copy of the agreement(s) or order(s) to this affidavit</i>
            </div>  
        </section> 

        <div style="margin-top:2rem;font-family:BCSans;"><b>About my family</b></div>
<!-- <15> -->
        <section>
            <i style="display:inline;margin-left:0.5rem;">You may choose to complete this section or leave this section blank</i>
            <div style="margin-left:0.27rem;text-indent:0rem;" >I would like to share the following information with the court about the cultural, linguistic, religious and spiritual upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
            
            <div v-if="backgroundSurvey.culturalExplain" class="answerbox"> {{backgroundSurvey.culturalExplain}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:2rem;font-family:BCSans;"><b>Other information</b></div>
<!-- <16> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have concerns about the mental health of the protected party and/or the other party</div>
            <div style="margin-left:1.0rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.mentalHealthConcern == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.mentalHealthConcern == 'n'?'yes':''" text="No"/>                       
            </div>
            <i style="display:block;margin-left:1.5rem;">If yes, explain the reason(s) for your concerns</i>
            <div v-if="backgroundSurvey.mentalHealthConcernReasons" class="answerbox"> {{backgroundSurvey.mentalHealthConcernReasons}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:1rem;"></div>
<!-- <17> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">Are there circumstances that may increase the risk of family violence</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.riskOfViolence == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.riskOfViolence == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe the circumstances such as: substance abuse, employment or financial difficulties, relationship status, criminal history, pregnancy, threats to you/another person/child/animal, stalking, forced sex, controlling behaviour, release from prison, strangling/choking/biting, threats or attempts to commit suicide, cultural religious beliefs or any other circumstances</i>
            <div v-if="backgroundSurvey.violenceCirumstances" class="answerbox"> {{backgroundSurvey.violenceCirumstances}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <18> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">There is an existing court order protecting one of the parties, the children, or restraining contact between the parties, including a protection order, child protection or supervision order, peace bond, restraining order, bail condition or other criminal orders</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.existingPOOrders == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.existingPOOrders == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.02rem;">If yes, attach a copy of the order(s) to your application</i>            
        </section>


        <div style="margin-top:1rem;"></div>
<!-- <19> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">Has the other party ever failed to obey a court order</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.disobeyOrder == 'Yes'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.disobeyOrder == 'No'?'yes':''" text="No"/>                       
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.disobeyOrder == 'Unknown'?'yes':''" text="Unknown"/> 
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe the circumstances:</i>
            <div v-if="backgroundSurvey.describeDisobeyOrder" class="answerbox"> {{backgroundSurvey.describeDisobeyOrder}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <20> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have concerns the other party may not obey a court order</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.concernForNotObeying == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.concernForNotObeying == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, explain the reason for your concerns:</i>
            <div v-if="backgroundSurvey.explainNotObeyingConcern" class="answerbox"> {{backgroundSurvey.explainNotObeyingConcern}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:1rem;"></div>
<!-- <21> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have reported my safety concerns to the police</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.reportedToPolice == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.reportedToPolice == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe what action they have taken. You will be asked to describe specific incidents that police attended in a later section.</i>
            <div v-if="backgroundSurvey.policeActions" class="answerbox"> {{backgroundSurvey.policeActions}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <22> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have reported my safety concerns to a social worker (Ministry of Children and Family Development)</div>
            <div style="display:block;margin-left:.75rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.reportedToSW == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="backgroundSurvey.reportedToSW == 'n'?'yes':''" text="No"/>                       
            </div>
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe what action they have taken</i>
            <div v-if="backgroundSurvey.swAction" class="answerbox"> {{backgroundSurvey.swAction}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <23> -->
        <section>            
            <div style="display:inline; margin-left:.5rem;">
                <div style="display:inline;">Is there any family violence you fear is likely to happen that you have not already described in this affidavit?</div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="yourStory.isViolence == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="yourStory.isViolence == 'n'?'yes':''" text="No"/>                       
            </div>

            <i style="text-indent:0rem;display:block;margin-left:0rem;">If yes, explain what type of family violence and the reason for your fear</i>
            <div v-if="yourStory.whatViolence" class="answerbox"> {{yourStory.whatViolence}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <24> -->
        <section>            
            <div style="display:inline; margin-left:.5rem;">
                <div style="display:inline;">Do you have any concerns for the safety of the protected party/parties that you have not already described in this affidavit?</div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="yourStory.isConcerns == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="yourStory.isConcerns == 'n'?'yes':''" text="No"/>                       
            </div>

            <i style="text-indent:0rem;display:block;margin-left:0rem;">If yes, explain the concerns and the reason for your concerns</i>
            <div v-if="yourStory.whatConcerns" class="answerbox"> {{yourStory.whatConcerns}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <25> -->
        <section>            
            <div style="display:inline; margin-left:.15rem;">
               Describe any recent incidents of Family Violence against the protected party and any child(ren).
            </div>
            <div style="margin:0.5rem 0 0 1.5rem;">
                Includes:
                <ul style="text-indent:0rem; font-style:italic;">
                    <li>How the other party made the protected party and/or the child(ren) feel unsafe (describe examples of the other party’s behaviour that made you afraid)</li>
                    <li>A description of the incident(s) (write as much detail as possible)</li>
                    <li>Who was involved (include the police if they were involved at any time)</li>
                    <li>Who witnessed it</li>
                    <li>Any exposure the child or children have had to family violence or abuse</li>
                    <li>Any injuries or trauma from the incident</li>
                    <li>Any doctor’s notes, police reports or photos (you must refer to them here as exhibits and make copies of them for the court)</li>
                </ul>
                <div v-if="yourStory.recentIncidents" class="answerbox"> {{yourStory.recentIncidents}}</div>
                <div v-else style="margin-bottom:2rem;"></div>
            </div>
        </section>

<!-- <SWEAR > -->
        <div class="print-block">
            <div style="margin:3rem 0 0 0">Sworn or affirmed before me</div>

            <div style="margin:0.5rem 0 0 0">
                <underline-form style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem" beforetext="at" hint="city" text="" />                        
                <div style="margin-top:0.2rem; text-indent:3px;display:inline;"> , British Columbia </div>
            </div>
            <div style="margin:.5rem 0 0 0">
                <underline-form style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="on" hint="date (mmm/dd/yyyy)" text="" />
            </div>

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div>
                <div style="width:20rem; display:inline-block; font-size:9pt" >A Commissioner for taking Affidavits in British Columbia</div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
            </div>
            <div style="width:20rem; display:inline-block; font-size:9pt" >[print name or affix stamp of commissioner]</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import {getYourInformationResults} from "@/components/utils/PopulateForms/PopulateCommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { contactInfoType, addressInfoType } from '@/types/Application/CommonInformation';
import { schedule1ChildInfoType, schedule1AnotherAdultInfoType, schedule1OtherChildrenInfoType, schedule1SharingAdultInfoType, schedule1BackgroundInfoType, schedule1YourStoryInfoType, schedule1NoGoInfoType, schedule1NoContactInfoType, schedule1WeaponsFirearmsInfoType, schedule1RemovePersonInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule1 extends Vue {

    @Prop({required:true})
    result!: any;    

    yourInfo = {} as yourInformationInfoDataInfoType;
    anotherAdult = {} as schedule1AnotherAdultInfoType;
    // Adding initial empty values to display an empty row in the table if no records exist
    childrenItem: schedule1ChildInfoType[] = [{name:'', dob:'', relation:'', living:''}];
    sharingAdultItem: schedule1SharingAdultInfoType[] = [{name:'', dob:'', relation: ''}];
    otherChildrenItem: schedule1OtherChildrenInfoType[] = [{name:'', dob:'', protectedRelation:'', otherRelation:'', livingWith: ''}];
    backgroundSurvey = {} as schedule1BackgroundInfoType;
    yourStory = {} as schedule1YourStoryInfoType;
    noGo = {} as schedule1NoGoInfoType;
    noContact = {} as schedule1NoContactInfoType;
    weaponsFirearms = {} as schedule1WeaponsFirearmsInfoType;
    removePerson = {} as schedule1RemovePersonInfoType;
    serviceAddress = {} as addressInfoType;
    serviceContact = {} as contactInfoType;
    
    hasSharingAdult = false;     
    hasAnotherAdult = false;    
    hasChildren = false;
    dataReady = false;
    applicantNeedsProtection = '';

    childrenFields= [
        {key:"name",     label:"Child's full legal name",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Other party's relationship to the child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:22%;"},
        {key:"living",   label:"Child is currently living with",         tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
    ]
    
    sharingAdultFields = [
        {key:"name",     label:"Full name",                                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Date of birth (mmm/dd/yyyy)",              tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Relationship to other protected person(s)",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:20%;"},
    ]    
    
    otherChildrenFields=[
        {key:"name", label:"Child's full legal name",                             tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
        {key:"dob", label:"Child's date of birth (mmm/dd/yyyy)",                  tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:14.5%;"},
        {key:"protectedRelation", label:"Protected party's relationship to child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17.75%;"},
        {key:"otherRelation", label:"Other party's relationship to child",        tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17.75%;"},
        {key:"livingWith", label:"Child is currently living with",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:23%;"},
    ]

    mounted(){   
        this.dataReady = false;     
        this.yourInfo = this.getYourInfo() 
        this.getServiceInfo();
        this.getProtectingPeople();
        this.getOtherChildrenInfo();
        this.getNoGo();
        this.getNoContact();
        this.getWeaponsFirearms();
        this.getRemovePerson();
        this.getYourStory();
        this.getbackgroundSurvey();
        this.dataReady = true;
    }

    public getYourInfo(){

        if(this.result?.yourinformationPOSurvey){
            return getYourInformationResults(this.result.yourinformationPOSurvey);
        }
        else
            return {} as yourInformationInfoDataInfoType;
    }

    public getServiceInfo(){
        if(this.result?.yourinformationPOSurvey?.Lawyer == 'y'){
            this.serviceAddress = this.result.yourinformationPOSurvey.LawyerAddress
            this.serviceContact = this.result.yourinformationPOSurvey.LawyerContact
        }else if(this.result?.yourinformationPOSurvey){
            this.serviceAddress = this.result.yourinformationPOSurvey.ApplicantAddress
            this.serviceContact = this.result.yourinformationPOSurvey.ApplicantContact
        }
    }
    
    public getProtectingPeople(){
        
        this.hasChildren = false;
        this.hasSharingAdult = false;
        this.hasAnotherAdult = false;
        this.applicantNeedsProtection = '';
        
        if(this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection)
            this.applicantNeedsProtection = this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection
        
        if( //Add Child info IF:
           (this.result?.protectionFromWhomSurvey?.childPO=='y' && this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection== "y")
        || (this.result?.protectionFromWhomSurvey?.childPO=='y' && this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection== "n" && this.result?.protectionFromWhomSurvey?.anotherAdultPO=='n')
        ){            
            this.childrenItem = [];
            this.hasChildren = true;
            for(const child of this.result.protectionFromWhomSurvey.allchildren){
                this.childrenItem.push({
                    name:Vue.filter('getFullName')(child.childName), 
                    dob:Vue.filter('beautify-date')(child.childDOB), 
                    relation:child.childRelationship,
                    living:child.childLivingWith
                })
            }
        }

        if( //Add Sharing resident's Adult info IF:
            (this.result?.protectionFromWhomSurvey?.anotherAdultSharingResi=='y') && 
            (this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection== 'y' || 
             this.result?.protectionFromWhomSurvey?.anotherAdultPO=='y'            ||
             this.result?.protectionFromWhomSurvey?.childPO=='y')
        ){
            this.sharingAdultItem = [];
            this.hasSharingAdult = true;
            for(const sharingAdult of this.result.protectionFromWhomSurvey.allAnotherAdultsSharingResi){
                this.sharingAdultItem.push({
                    name:Vue.filter('getFullName')(sharingAdult.anotherAdultSharingResiName), 
                    dob:Vue.filter('beautify-date')(sharingAdult.anotheradultSharingResiDOB), 
                    relation:sharingAdult.anotherAdultSharingResiRelation
                })
            }            
        }

        if( //Add Apply for another Adult
            this.result?.protectionFromWhomSurvey?.anotherAdultPO=='y' && 
            this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection == "n"
        ){
            this.hasAnotherAdult = true;
            this.anotherAdult = {
                nameFull:  Vue.filter('getFullName')(this.result.protectionFromWhomSurvey.anotherAdultName),
                dobBeauty: Vue.filter('beautify-date')(this.result.protectionFromWhomSurvey.anotherAdultDOB),
                reason:    this.result.protectionFromWhomSurvey.anotherAdultReasonForPO
            }            
        }
    }

    public getOtherChildrenInfo(){
       
        if(this.result?.backgroundSurvey?.PartiesHasOtherChilderen=='y'){
            this.otherChildrenItem = [];
            for(const child of this.result.backgroundSurvey.allOtherChilderen){
                this.otherChildrenItem.push({
                    name:Vue.filter('getFullName')(child.childName), 
                    dob:Vue.filter('beautify-date')(child.childDOB), 
                    protectedRelation:child.childRelationshipWithProtected,
                    otherRelation:child.childRelationshipWithOther,
                    livingWith:child.childLivingWith
                })
            }
        }
    }
    
    public getNoGo(){        
        this.noGo = { places:[], otherComment:''};

        if(this.result?.noGoSurvey?.RespondentNoGo == 'y' && this.result?.noGoSurvey?.RespondentNoGoPlaces){            
            this.noGo.places = this.result.noGoSurvey.RespondentNoGoPlaces

            if(this.result.noGoSurvey.RespondentNoGoPlaces.includes('other') && this.result.noGoSurvey.RespondentNoGoPlacesComment)
                this.noGo.otherComment = this.result.noGoSurvey.RespondentNoGoPlacesComment
        }
    }
   
    public getNoContact(){
        this.noContact = {reasonForComm:[], otherComment:''};

        if(this.result?.noContactSurvey?.needCommunication == 'y' && this.result?.noContactSurvey?.reasonForCommunication){
            this.noContact.reasonForComm = this.result.noContactSurvey.reasonForCommunication
        
            if(this.result.noContactSurvey.reasonForCommunication.includes('other') && this.result.noContactSurvey.reasonForCommunicationComment)
                this.noContact.otherComment = this.result.noContactSurvey.reasonForCommunicationComment
        }
    }

    public getWeaponsFirearms(){
        this.weaponsFirearms = {firearms:'', firearmsReason:'', firearmsYes:'', firearmsYesReason:'', weapons:'', weaponsReasons:'', weaponsYes:'', weaponsYesReason:''}

        if(this.result?.weaponsFirearmsSurvey?.RespondentFirearms){
            this.weaponsFirearms.firearms = this.result.weaponsFirearmsSurvey.RespondentFirearms;

            if(this.result.weaponsFirearmsSurvey.RespondentFirearms == 'y' && this.result.weaponsFirearmsSurvey.firearmsReason)
                this.weaponsFirearms.firearmsReason = this.result.weaponsFirearmsSurvey.firearmsReason
        }
            
        if(this.result?.weaponsFirearmsSurvey?.RespondentFirearmsYes){
            this.weaponsFirearms.firearmsYes = this.result.weaponsFirearmsSurvey.RespondentFirearmsYes

            if(this.result.weaponsFirearmsSurvey.RespondentFirearmsYes == 'y' && this.result.weaponsFirearmsSurvey.firearmsYesReason)
                this.weaponsFirearms.firearmsYesReason = this.result.weaponsFirearmsSurvey.firearmsYesReason
        }
        
        if(this.result?.weaponsFirearmsSurvey?.RespondentWeapons){
            this.weaponsFirearms.weapons = this.result.weaponsFirearmsSurvey.RespondentWeapons;
        
            if(this.result.weaponsFirearmsSurvey.RespondentWeapons == 'y' && this.result.weaponsFirearmsSurvey.weaponsReasons)
                this.weaponsFirearms.weaponsReasons = this.result.weaponsFirearmsSurvey.weaponsReasons
        }

        if(this.result.weaponsFirearmsSurvey.RespondentWeaponsYes){
            this.weaponsFirearms.weaponsYes = this.result.weaponsFirearmsSurvey.RespondentWeaponsYes

            if(this.result.weaponsFirearmsSurvey.RespondentWeaponsYes == 'y' && this.result.weaponsFirearmsSurvey.weaponsYesReason)
                this.weaponsFirearms.weaponsYesReason = this.result.weaponsFirearmsSurvey.weaponsYesReason
        }
    }
    
    public getRemovePerson(){
        this.removePerson = {liveTogether:'', needPolice:[], needPoliceComment:''}
        if(this.result?.removePersonSurvey?.RespondentLiveTogether){
            this.removePerson.liveTogether = this.result.removePersonSurvey.RespondentLiveTogether     

            if(this.result?.removePersonSurvey?.needPolice){
                this.removePerson.needPolice = this.result.removePersonSurvey.needPolice;

                if(this.result.removePersonSurvey.needPolice.includes('other') && this.result.removePersonSurvey.needPoliceComment)
                    this.removePerson.needPoliceComment = this.result.removePersonSurvey.needPoliceComment
            }
        }
    }
    
    public getYourStory(){
        this.yourStory = {isViolence:'', whatViolence:'', isConcerns:'', whatConcerns:'', recentIncidents:''}
        if(this.result?.yourStorySurvey?.isFamilyViolence){
            this.yourStory.isViolence = this.result.yourStorySurvey.isFamilyViolence;
            if(this.result.yourStorySurvey.isFamilyViolence == 'y' && this.result.yourStorySurvey.whatViolence)
                this.yourStory.whatViolence = this.result.yourStorySurvey.whatViolence
        }
      
        if(this.result?.yourStorySurvey?.isNoneExplainedConcerns){
            this.yourStory.isConcerns = this.result.yourStorySurvey.isNoneExplainedConcerns;
            if(this.result.yourStorySurvey.isNoneExplainedConcerns == 'y' && this.result.yourStorySurvey.noneExplainedConcerns)
                this.yourStory.whatConcerns = this.result.yourStorySurvey.noneExplainedConcerns
        }

        if(this.result?.yourStorySurvey?.recentIncidents)
            this.yourStory.recentIncidents = this.result.yourStorySurvey.recentIncidents
    }
    
    public getbackgroundSurvey(){
        
        this.backgroundSurvey = {
            married:'',
            protectedSpouse:'', 
            liveTogetherDate:'', 
            marriageDate: '',
            seperated:'', 
            separationDate:'',
            howPartiesRelated:'',
            hasOtherChilderen:'',
            existingOrders:'',
            culturalExplain:'',
            mentalHealthConcern:'',
            mentalHealthConcernReasons:'',
            riskOfViolence:'',
            violenceCirumstances:'',
            existingPOOrders:'',
            disobeyOrder:'',
            describeDisobeyOrder:'',
            concernForNotObeying:'',
            explainNotObeyingConcern:'',
            reportedToPolice:'',
            policeActions:'',
            reportedToSW:'',
            swAction: ''
        }
        
        if(this.result?.backgroundSurvey?.howPartiesRelated)
            this.backgroundSurvey.howPartiesRelated = this.result.backgroundSurvey.howPartiesRelated

        if(this.result?.backgroundSurvey?.werePOPartiesMarried){

            this.backgroundSurvey.married = this.result.backgroundSurvey.werePOPartiesMarried        

            if(this.result.backgroundSurvey.werePOPartiesMarried == 'y'){
                this.backgroundSurvey.protectedSpouse = Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName)           
                this.backgroundSurvey.liveTogetherDate = Vue.filter('beautify-date-blank')(this.result.backgroundSurvey.liveTogetherPODate)            
                this.backgroundSurvey.marriageDate = Vue.filter('beautify-date-blank')(this.result.backgroundSurvey.dateOfMarriagePO)

                if(this.result?.backgroundSurvey?.isSeperatedPO){
                    this.backgroundSurvey.seperated = this.result.backgroundSurvey.isSeperatedPO
                    if(this.result.backgroundSurvey.isSeperatedPO == 'Yes')
                        this.backgroundSurvey.separationDate = Vue.filter('beautify-date')(this.result.backgroundSurvey.separationDate)
                }            
            }
        }

        if(this.result?.backgroundSurvey?.PartiesHasOtherChilderen){
            this.backgroundSurvey.hasOtherChilderen = this.result.backgroundSurvey.PartiesHasOtherChilderen;
        }

        if(this.result?.backgroundSurvey?.ExistingOrders)
            this.backgroundSurvey.existingOrders = this.result.backgroundSurvey.ExistingOrders;
        
        if(this.result?.backgroundSurvey?.likeToAddCulturalExplanation == 'y' && this.result?.backgroundSurvey?.culturalExplain){
            this.backgroundSurvey.culturalExplain = this.result.backgroundSurvey.culturalExplain
        }

        if(this.result?.backgroundSurvey?.mentalHealthConcernPO){
            this.backgroundSurvey.mentalHealthConcern = this.result.backgroundSurvey.mentalHealthConcernPO;
            if(this.result.backgroundSurvey.mentalHealthConcernPO == 'y' && this.result.backgroundSurvey.explainReasonsPO)
                this.backgroundSurvey.mentalHealthConcernReasons = this.result.backgroundSurvey.explainReasonsPO;
        }
        
        if(this.result?.backgroundSurvey?.riskOfViolencePO){
            this.backgroundSurvey.riskOfViolence = this.result.backgroundSurvey.riskOfViolencePO
            if(this.result.backgroundSurvey.riskOfViolencePO== 'y' && this.result.backgroundSurvey.describeCirumstancesPO)
                this.backgroundSurvey.violenceCirumstances = this.result.backgroundSurvey.describeCirumstancesPO;
        }

        if(this.result?.backgroundSurvey?.existingPOOrders)
            this.backgroundSurvey.existingPOOrders = this.result.backgroundSurvey.existingPOOrders

        if(this.result?.backgroundSurvey?.otherPartyDisobeyOrder){
            this.backgroundSurvey.disobeyOrder = this.result.backgroundSurvey.otherPartyDisobeyOrder;
            if(this.result.backgroundSurvey.otherPartyDisobeyOrder == 'Yes' && this.result.backgroundSurvey.describeDisobeyOrder)
                this.backgroundSurvey.describeDisobeyOrder = this.result.backgroundSurvey.describeDisobeyOrder
        }

        if(this.result?.backgroundSurvey?.concernForNotObeying){
            this.backgroundSurvey.concernForNotObeying = this.result.backgroundSurvey.concernForNotObeying;
            if(this.result.backgroundSurvey.concernForNotObeying == 'y' && this.result.backgroundSurvey.explainReasonsForConcern)
                this.backgroundSurvey.explainNotObeyingConcern = this.result.backgroundSurvey.explainReasonsForConcern;
        }

        if(this.result?.backgroundSurvey?.reportedConcernsToPolice){
            this.backgroundSurvey.reportedToPolice = this.result.backgroundSurvey.reportedConcernsToPolice;
            if(this.result.backgroundSurvey.reportedConcernsToPolice == 'y' && this.result.backgroundSurvey.describeActionsByPolice)
                this.backgroundSurvey.policeActions = this.result.backgroundSurvey.describeActionsByPolice;
        }

        if(this.result?.backgroundSurvey?.reportedConcernsToSW){
            this.backgroundSurvey.reportedToSW = this.result.backgroundSurvey.reportedConcernsToSW;
            if(this.result.backgroundSurvey.reportedConcernsToSW == 'y' && this.result.backgroundSurvey.desrcibeSWAction)
                this.backgroundSurvey.swAction = this.result.backgroundSurvey.desrcibeSWAction
        }
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 