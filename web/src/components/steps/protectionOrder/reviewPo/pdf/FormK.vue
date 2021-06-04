<template>
<div v-if="dataReady"> 
    <!-- <b-button @click="Clear()">CLEAR</b-button>   -->
    <!-- <b-button @click="onPrint()">print</b-button>  
    <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>   -->
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div class="form-header"> 
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">               
                <div style="font-size:13pt;"><b>Application About a Protection Order</b></div>
                <div style="font-size:10pt;"><b>FORM 12</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 67, 68 and 172</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:existingFileNumber}]"
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

<!-- <1> -->
        <section>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="result.yourInformationSurveyPO.ApplicantName | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="result.yourInformationSurveyPO.ApplicantDOB | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents by the other party and the court are:</div>
                <table class="fullsize">
                    <tr>
                        <td v-if="result.yourInformationSurveyPO.Lawyer=='y'" colspan="3">Lawyer (if applicable): <div class="answer"> {{result.yourInformationSurveyPO.LawyerName | getFullName}}</div></td>
                        <td v-else  colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr>          
                        <td colspan="3">Address: <div class="answer"> {{serviceAddress.street}} </div> </td>
                    </tr>
                    <tr>
                        <td>City: <div class="answer">{{serviceAddress.city}}</div> </td>
                        <td>Province: <div class="answer">{{serviceAddress.state}}</div> </td>
                        <td>Postal Code: <div class="answer">{{serviceAddress.postcode}}</div> </td>
                    </tr>
                    <tr>
                        <td>Email: <div class="answer">{{serviceContact.email}}</div> </td>
                        <td></td>
                        <td>Telephone: <div class="answer">{{serviceContact.phone}}</div> </td>
                    </tr>
                </table>
        </section>

<!-- <2> -->
        <section>
            The person I want protection from, or who had made an application for protection from me, is the other party. An application is
            usually made with notice to the other party. To give notice, they must be served with the application and supporting documents
            before the date set for the court appearance. An Application About a Protection Order can also be made without notice to the
            other party.
            <div style="margin:0.25rem 0 0 2rem;" >
                <i>Select only one of the options below</i>
                <check-box style="" :check="result.urgencySurvey.PORNoNotice == 'n'?'yes':''" text="I am applying with notice to the other party"/>
                <check-box v-if="result.urgencySurvey.PORNoNotice == 'y'" style="" :check="result.urgencySurvey.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i> Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i><br/><div style=\'color:#000;font-size:11pt;\'>'+result.urgencySurvey.PORWhyNoNotice+'</div>'"/>
                <check-box v-else style="" :check="result.urgencySurvey.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i> Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i>'"/>
            </div>
        </section>

<!-- <3> -->
        <section> 
            <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party's name is" hint="full name of the other party" :italicHint="false" :text="otherParty.name | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". Their date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                <table class="fullsize">
                    <tr>                        
                        <td  colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr>          
                        <td colspan="3">Address: <div class="answer"> {{otherParty.address?otherParty.address.street:''}} </div> </td>
                    </tr>
                    <tr>
                        <td  >City: <div class="answer">{{otherParty.address?otherParty.address.city:''}}</div> </td>
                    <td style="padding-left:50px">Province: <div class="answer">{{otherParty.address?otherParty.address.state:''}}</div> </td>
                        <td>Postal Code: <div class="answer">{{otherParty.address?otherParty.address.postcode:''}}</div> </td>
                    </tr>
                    <tr>
                        <td>Email: <div class="answer">{{otherParty.contact?otherParty.contact.email:''}}</div> </td>
                        <td style="padding-left:50px"></td>
                        <td>Telephone: <div class="answer">{{otherParty.contact?otherParty.contact.phone:''}}</div> </td>
                    </tr>
                </table>
            </div>
        </section>

<!-- <4> -->
        <section>  
            I am applying for the following order:           
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select only one of the options below and complete the required schedule</i>
                <check-box style="" :check="result.selectedPOOrder.orderType == 'needPO'?'yes':''" text="Protection order <i>[Complete and attach Schedule 1]</i>"/>
                <check-box style="" :check="result.selectedPOOrder.orderType == 'changePO'?'yes':''" text="Order to change an existing protection order <i>[Complete and attach Schedule 2]</i>"/>
                <check-box style="" :check="result.selectedPOOrder.orderType == 'terminatePO'?'yes':''" text="Order to terminate and existing protection order <i>[Complete and attach Schedule 3]</i>"/>
            </div>
        </section>

<!-- <For registery> -->
        <div class="print-block">
            <div style="margin-top:1rem;"><i>For registry use only</i></div>
            <div style="width:99%; border:1px solid; text-weight:bold; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin-top:1rem; font-family:BCSans"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>


<!----------------------------------------------------------------  <NEED PO>   -------------------------------------------------------->
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="result.selectedPOOrder.orderType == 'needPO'">
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
            <underline-form style="display:inline-block;" textwidth="13rem" beforetext="I," hint="full name of party" :text="result.yourInformationSurveyPO.ApplicantName | getFullName"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="," hint="occupation" :text="result.yourInformationSurveyPO.ApplicantOccupation"/>
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
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y'?'yes':''" text="me"/>
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y' && result.protectionWhomSurvey.childPO == 'y'?'yes':''" text=" the following child(ren) I am parent or guardian to:<br><i>Complete only if applicable. You may leave this section blank</i>"/>                
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
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y' && result.protectionWhomSurvey.anotherAdultSharingResi == 'y'?'yes':''" text="The following adult(s) sharing the residence with the other protected person(s):<br><i>Complete only if the adult family member sharing the residence with another protected person needs to also be protected. You may leave this section blank.</i>"/>               
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
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n' && result.protectionWhomSurvey.anotherAdultPO == 'y'?'yes':''" text=" Other <i>(specify):</i>"/>               
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="full name of other person to be protected" :text="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'?(anotherAdult.nameFull ):''"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="11rem" beforetext="," hint="date of birth of other person (mmm/dd/yyyy)" :text="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'?(anotherAdult.dobBeauty ):'' "/>
                <div style="text-indent:-18px;display:block;margin-top:0.5rem;"> Explain why you are applying for the other person:</div>
                <div v-if="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'" class="answerbox"> {{result.protectionWhomSurvey.anotherAdultReasonForPO}}</div>
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
        <div style=""><b> ABOUT THE PROTECTION ORDER</b></div>
<!-- <3> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> I do not want the other party to be able to attend at, enter or be found at the following places:</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('Home')?'yes':''" text="Residence"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('School')?'yes':''" text="School"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('Workplace')?'yes':''" text="Place of Employment"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('ChildCareFacility')?'yes':''" text="Child care facility"/>
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces && result.noGoSurvey.RespondentNoGoPlaces.includes('other')?result.noGoSurvey.RespondentNoGoPlacesComment:'' "/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <4> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> The protected party may need to communicate with the other party for the following reason(s):</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication.includes('Consensual dispute resolution')?'yes':''" text="Consensual dispute resolution"/>
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication.includes('Parenting arrangements')?'yes':''" text="Parenting arrangements"/>
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication.includes('Ongoing court action')?'yes':''" text="Ongoing court action"/>
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication && result.noContactSurvey.reasonForCommunication.includes('other')?result.noContactSurvey.reasonForCommunicationComment:'' "/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <5> -->
        <section>
            I have concerns the other party would cause harm with or threaten to use guns, explosives or another kind of firearm
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearms == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearms == 'n'?'yes':''" text="No"/>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your concerns</i>
            <div class="answerbox" v-if="result.weaponsSurvey.RespondentFirearms == 'y'">{{result.weaponsSurvey.firearmsReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <6> -->
        <section>
            I believe the other party owns or has access to guns, explosives or another kind of firearm
            <div style="display:block; margin-left:0.5rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearmsYes == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearmsYes == 'n'?'yes':''" text="No"/>
            </div>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your belief</i>
            <div class="answerbox" v-if="result.weaponsSurvey.RespondentFirearmsYes == 'y'">{{result.weaponsSurvey.firearmsYesReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <7> -->
        <section>
            I have concerns the other party would cause harm with or threaten to use a weapon that is not a gun or explosive            
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentWeapons == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentWeapons == 'n'?'yes':''" text="No"/>        
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your concerns</i>
            <div class="answerbox" v-if="result.weaponsSurvey.RespondentWeapons == 'y'">{{result.weaponsSurvey.weaponsReasons}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>       
       
        <div style="margin-top:1rem;"></div>
<!-- <8> -->
        <section>
            I believe the other party owns a weapon that is not a gun or explosive            
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentWeaponsYes == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentWeaponsYes == 'n'?'yes':''" text="No"/>            
            <i style="display:block; margin-left:1rem;">Examples of weapons someone may own include swords, hunting knives, and nunchucks.</i>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your belief</i>
            <div class="answerbox" v-if="result.weaponsSurvey.RespondentWeaponsYes == 'y'">{{result.weaponsSurvey.weaponsYesReason}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <9> -->
        <section>
            The protected party currently shares a residence with the other party
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.removeSurvey.RespondentLiveTogether == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.removeSurvey.RespondentLiveTogether == 'n'?'yes':''" text="No"/>                       
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <10> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> I believe police assistance may be required for the following purpose(s):</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('To remove the other party from the shared residence')?'yes':''" text="To remove the other party from the shared residence"/>
                <check-box style="" :check="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('To supervise the removal of the protected party\'s personal belongings from the shared residence')?'yes':''" text="To supervise the removal of the protected party's personal belongings from the shared residence"/>
                <check-box style="" :check="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('To supervise the removal of the other party\'s personal belongings from the shared residence')?'yes':''" text="To supervise the removal of the other party's personal belongings from the shared residence"/>
                <check-box style="" :check="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('To supervise the removal of the child(ren)\'s personal belongings from a residence')?'yes':''" text="To supervise the removal of the child(ren)'s personal belongings from a residence"/>
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="result.removeSurvey.needPolice && result.removeSurvey.needPolice.includes('other')?result.removeSurvey.needPoliceComment:'' "/>
            </div>
        </section>

        <div style="margin-top:3rem;"><b> YOUR STORY</b></div>
        <div style="margin-top:0rem;font-family:BCSans;"><b>Relationship between parties</b></div>
<!-- <11> -->
        <section>
            The protection party and the other party are:
            <i style="display:block;margin-left:1rem;">Explain how the protected party/parties and the other party are related for the purposes of the application</i>
            <div v-if="result.backgroundSurvey.howPartiesRelated" class="answerbox"> {{result.backgroundSurvey.howPartiesRelated}}</div>
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
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.werePOPartiesMarried == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.werePOPartiesMarried == 'n'?'yes':''" text="No"/>                                    
            </div>
            <div style="margin:0 0 0 1rem;">
                <i>If yes, please complete all options below that apply to the parties</i>
                <div style="margin:0 0 0 0;">
                    <underline-form style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="7.75rem" beforetext="Date on which the parties began to live together in a marriage-like relationship:" hint="date (mmm/dd/yyyy)" :text="backgroundSurvey.liveTogetherDate" />
                    <underline-form style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="10rem" beforetext="Date of marriage:" hint="date of marriage (mmm/dd/yyyy)" :text="backgroundSurvey.marriageDate" />
                
                    <div style="margin:0.2rem 0 0 2.15rem;">
                        <div style="display:inline-block;">The protected party currently shares a residence with the other party</div>
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.werePOPartiesMarried == 'y' && result.backgroundSurvey.isSeperatedPO == 'Yes'?'yes':''" text="Yes"/>
                        <check-box class="marginleftminus" inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.werePOPartiesMarried == 'y' && result.backgroundSurvey.isSeperatedPO == 'No'?'yes':''" text="No"/>                       
                        <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.werePOPartiesMarried == 'y' && result.backgroundSurvey.isSeperatedPO == 'Unknown'?'yes':''" text="Unknown"/>                                           
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
                <check-box style="" :check="result.backgroundSurvey.PartiesHasOtherChilderen=='n'?'yes':''" text="The protected party and the other party are a parent, or guardian only to the child(ren), if any, identified in paragraph 2 of this affidavit"/>
                <check-box style="" :check="result.backgroundSurvey.PartiesHasOtherChilderen=='y'?'yes':''" text="The protected party and the other party are a parent, step-parent or guardian to the following child(ren) who is/are not identified in paragraph 2 of this affidavit:"/>
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
                    <check-box inline="inline" boxMargin="0" style="display:inline" :shift="10" :check="result.backgroundSurvey.ExistingOrders=='y'?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :shift="10" :check="result.backgroundSurvey.ExistingOrders=='n'?'yes':''" text="No"/>
                </div>
                <i style="display:block;margin-left:1rem">If yes, attach a copy of the agreement(s) or order(s) to this affidavit</i>
            </div>  
        </section> 

        <div style="margin-top:2rem;font-family:BCSans;"><b>About my family</b></div>
<!-- <15> -->
        <section>
            <i style="display:inline;margin-left:0.5rem;">You may choose to complete this section or leave this section blank</i>
            <div style="margin-left:0.27rem;text-indent:0rem;" >I would like to share the following information with the court about the cultural, linguistic, religious and spiritual upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
            
            <div v-if="result.backgroundSurvey.likeToAddCulturalExplanation == 'y'" class="answerbox"> {{result.backgroundSurvey.culturalExplain}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:2rem;font-family:BCSans;"><b>Other information</b></div>
<!-- <16> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have concerns about the mental health of the protected party and/or the other party</div>
            <div style="margin-left:1.0rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.mentalHealthConcernPO == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.mentalHealthConcernPO == 'n'?'yes':''" text="No"/>                       
            </div>
            <i style="display:block;margin-left:1.5rem;">If yes, explain the reason(s) for your concerns</i>
            <div v-if="result.backgroundSurvey.mentalHealthConcernPO == 'y'" class="answerbox"> {{result.backgroundSurvey.explainReasonsPO}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:1rem;"></div>
<!-- <17> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">Are there circumstances that may increase the risk of family violence</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.riskOfViolencePO == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.riskOfViolencePO == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe the circumstances such as: substance abuse, employment or financial difficulties, relationship status, criminal history, pregnancy, threats to you/another person/child/animal, stalking, forced sex, controlling behaviour, release from prison, strangling/choking/biting, threats or attempts to commit suicide, cultural religious beliefs or any other circumstances</i>
            <div v-if="result.backgroundSurvey.riskOfViolencePO == 'y'" class="answerbox"> {{result.backgroundSurvey.describeCirumstancesPO}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <18> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">There is an existing court order protecting one of the parties, the children, or restraining contact between the parties, including a protection order, child protection or supervision order, peace bond, restraining order, bail condition or other criminal orders</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.existingPOOrders == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.existingPOOrders == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.02rem;">If yes, attach a copy of the order(s) to your application</i>            
        </section>


        <div style="margin-top:1rem;"></div>
<!-- <19> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">Has the other party ever failed to obey a court order</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.otherPartyDisobeyOrder == 'Yes'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.otherPartyDisobeyOrder == 'No'?'yes':''" text="No"/>                       
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.otherPartyDisobeyOrder == 'Unknown'?'yes':''" text="Unknown"/> 
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe the circumstances:</i>
            <div v-if="result.backgroundSurvey.otherPartyDisobeyOrder == 'Yes'" class="answerbox"> {{result.backgroundSurvey.describeDisobeyOrder}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <20> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have concerns the other party may not obey a court order</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.concernForNotObeying == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.concernForNotObeying == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, explain the reason for your concerns:</i>
            <div v-if="result.backgroundSurvey.concernForNotObeying == 'y'" class="answerbox"> {{result.backgroundSurvey.explainReasonsForConcern}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

       <div style="margin-top:1rem;"></div>
<!-- <21> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have reported my safety concerns to the police</div>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.reportedConcernsToPolice == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.reportedConcernsToPolice == 'n'?'yes':''" text="No"/>                       
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe what action they have taken. You will be asked to describe specific incidents that police attended in a later section.</i>
            <div v-if="result.backgroundSurvey.reportedConcernsToPolice == 'y'" class="answerbox"> {{result.backgroundSurvey.describeActionsByPolice}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <22> -->
        <section>
            <div style="display:inline;margin-left:.5rem;">I have reported my safety concerns to a social worker (Ministry of Children and Family Development)</div>
            <div style="display:block;margin-left:.75rem;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.reportedConcernsToSW == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.backgroundSurvey.reportedConcernsToSW == 'n'?'yes':''" text="No"/>                       
            </div>
            <i style="text-indent:0rem;display:block;margin-left:.2rem;">If yes, describe what action they have taken</i>
            <div v-if="result.backgroundSurvey.reportedConcernsToSW == 'y'" class="answerbox"> {{result.backgroundSurvey.desrcibeSWAction}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <23> -->
        <section>            
            <div style="display:inline; margin-left:.5rem;">
                <div style="display:inline;">Is there any family violence you fear is likely to happen that you have not already described in this affidavit?</div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.yourStory.isFamilyViolence == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.yourStory.isFamilyViolence == 'n'?'yes':''" text="No"/>                       
            </div>

            <i style="text-indent:0rem;display:block;margin-left:0rem;">If yes, explain what type of family violence and the reason for your fear</i>
            <div v-if="result.yourStory.isFamilyViolence == 'y'" class="answerbox"> {{result.yourStory.whatViolence}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <24> -->
        <section>            
            <div style="display:inline; margin-left:.5rem;">
                <div style="display:inline;">Do you have any concerns for the safety of the protected party/parties that you have not already described in this affidavit?</div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.yourStory.isNoneExplainedConcerns == 'y'?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="result.yourStory.isNoneExplainedConcerns == 'n'?'yes':''" text="No"/>                       
            </div>

            <i style="text-indent:0rem;display:block;margin-left:0rem;">If yes, explain the concerns and the reason for your concerns</i>
            <div v-if="result.yourStory.isNoneExplainedConcerns == 'y'" class="answerbox"> {{result.yourStory.noneExplainedConcerns}}</div>
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
                <div v-if="result.yourStory.recentIncidents" class="answerbox"> {{result.yourStory.recentIncidents}}</div>
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

<!----------------------------------------------------------------  <CHANGE PO>   -------------------------------------------------------->  
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="result.selectedPOOrder.orderType == 'changePO'">
        <div class="new-page" />


        <div style="text-align:center;font-family:BCSans"><b> Schedule 2 - Change an Existing Protection Order</b></div>
        <div style="text-align:center;font-family:BCSans"><b> This is Schedule 2 to the Application about a Protection Order</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>This schedule must be completed if you are applying to change an existing protection order.</i>
        </div>

        <div style="margin-top:2rem;"></div>
<!-- <1> -->
        <section class="resetquestion">
            <check-box inline="inline" boxMargin="0" checkbox="" style="display:inline; margin-left:0.5rem;" :check="true?'yes':''" text=""/>
            <underline-form style="text-indent:0px;display:inline-block;" textwidth="8rem" beforetext="I am attaching a copy of the existing protection order made on" hint="date (mmm/dd/yyyy)" :text="result.aboutPOSurvey.dateOfPO | beautify-date"/>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <2> -->
        <section>  
            <i style="margin-left:.25rem;">Select only one of the options below</i>
            <div style="margin:0rem 0 0 1rem;" >                
                <check-box style="" :check="result.aboutPOSurvey.inCourtForPO == 'y' ?'yes':''" text="I was in court when the protection order was made"/>
                <check-box style="" :check="result.aboutPOSurvey.inCourtForPO == 'n' ?'yes':''" text="I was not in court when the protection order was made because:"/>                
            </div>
            <div style="margin-left:1rem;">
                <i>Explain why you were not in court when the protection order was made</i>
            </div>
            <div v-if="result.aboutPOSurvey.inCourtForPO == 'n'" class="answerbox"> {{result.aboutPOSurvey.whyNotInCourt}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <3> -->
        <section>  
            I am the:
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('protectedParty')?'yes':''" text="protected party"/>
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('parentGuardian')?'yes':''" text="parent or guardian of the protected party"/>
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('restrainedParty')?'yes':''" text="person who the protection order is against"/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <4> -->
        <section>  
            I am applying for the existing protection order to be changed as follows:
            <div v-if="result.aboutPOSurvey.whatChangesNeeded" class="answerbox"> {{result.aboutPOSurvey.whatChangesNeeded}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>

        <div style="margin-top:2rem;"><b>YOUR STORY</b></div>
<!-- <5> -->
        <section>  
            The facts on which this application is based are as follows:
            <i style="display:block; margin:0.25rem 0 0 1rem;">Explain why the order needs to be changed and the facts you want the court to consider</i>
            <div v-if="result.aboutPOSurvey.whyChangesNeeded" class="answerbox"> {{result.aboutPOSurvey.whyChangesNeeded}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>
    </div>



<!----------------------------------------------------------------  <TERMINATE PO>   -------------------------------------------------------->
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="result.selectedPOOrder.orderType == 'terminatePO'">
        <div class="new-page" />


        <div style="text-align:center;font-family:BCSans"><b> Schedule 3 – Terminate an Existing Protection Order</b></div>
        <div style="text-align:center;font-family:BCSans"><b> This is Schedule 3 to the Application about a Protection Order</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>This schedule must be completed if you are applying to terminate an existing protection order.</i>
        </div>

        <div style="margin-top:2rem;"></div>
<!-- <1> -->
        <section class="resetquestion">
            <check-box inline="inline" boxMargin="0" checkbox="" style="display:inline; margin-left:0.5rem;" :check="true?'yes':''" text=""/>
            <underline-form style="text-indent:0px;display:inline-block;" textwidth="6.5rem" beforetext="I am attaching a copy of the existing protection order made on" hint="date (mmm/dd/yyyy)" :text="result.aboutPOSurvey.terminateDateOfPO | beautify-date"/>
            <div style="display:inline; margin-left:0.5rem;">that I am applying to have terminated.</div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <2> -->
        <section>  
            <i style="margin-left:.25rem;">Select only one of the options below</i>
            <div style="margin:0rem 0 0 1rem;" >                
                <check-box style="" :check="result.aboutPOSurvey.inCourtForPO == 'y' ?'yes':''" text="I was in court when the protection order was made"/>
                <check-box style="" :check="result.aboutPOSurvey.inCourtForPO == 'n' ?'yes':''" text="I was not in court when the protection order was made because:"/>                
            </div>
            <div style="margin-left:1rem;">
                <i>Explain why you were not in court when the protection order was made</i>
            </div>
            <div v-if="result.aboutPOSurvey.inCourtForPO == 'n'" class="answerbox"> {{result.aboutPOSurvey.whyNotInCourt}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <3> -->
        <section>  
            I am the:
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('protectedParty')?'yes':''" text="protected party"/>
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('parentGuardian')?'yes':''" text="parent or guardian of the protected party"/>
                <check-box style="" :check="result.aboutPOSurvey.kindofPartyIbPO && result.aboutPOSurvey.kindofPartyIbPO.includes('restrainedParty')?'yes':''" text="person who the protection order is against"/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <4> -->
        <section>  
            The facts on which this application is based are as follows:
            <i style="display:block; margin:0.25rem 0 0 1rem;">Describe why the order should be terminated and the facts you want the court to consider</i>
            <div v-if="result.aboutPOSurvey.whyTerminatePO" class="answerbox"> {{result.aboutPOSurvey.whyTerminatePO}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>
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

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class FormK extends Vue {

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false;

    otherPartyInfo=[];
    existingFileNumber = '';

    applicantList = []
    serviceAddress = {street:'', city:'',country:'', postcode:'', state:''}
    serviceContact = {phone:"", fax:"", email:""}
    anotherAdult = {nameFull:'', dobBeauty:''}
    
    backgroundSurvey={protectedSpouse: '', liveTogetherDate:'', marriageDate: '', separationDate:''  }
    
    
    mounted(){
        this.dataReady = false;
        this.result = this.getFPOResultData()
        this.extractInfo();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }

    childrenItem = [{name:'', dob:'', relation:'',living:''}];
    childrenFields=[
        {key:"name",     label:"Child's full legal name",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Other party's relationship to the child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:22%;"},
        {key:"living",   label:"Child is currently living with",         tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
    ]

    sharingAdultItem = [{name:'', dob:'', relation:''}]
    sharingAdultFields = [
        {key:"name",     label:"Full name",                                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Date of birth (mmm/dd/yyyy)",              tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Relationship to other protected person(s)",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:20%;"},
    ]

    otherChildrenItem = [{name:'', dob:'', protectedRelation:'', otherRelation:'', livingWith:''}];
    otherChildrenFields=[
        {key:"name", label:"Child's full legal name",                             tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
        {key:"dob", label:"Child's date of birth (mmm/dd/yyyy)",                  tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:14.5%;"},
        {key:"protectedRelation", label:"Protected party's relationship to child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17.75%;"},
        {key:"otherRelation", label:"Other party's relationship to child",        tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:17.75%;"},
        {key:"livingWith", label:"Child is currently living with",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:23%;"},
    ]

    public extractInfo(){
        this.getServiceInfo()
        this.getProtectingPeople()
        this.getOtherPartyInfo()
        if(this.result.selectedPOOrder && this.result.selectedPOOrder.orderType == "needPO"){
            this.getBackgroundSurvey()
            this.getOtherChildrenInfo()
        }
    }

    public getServiceInfo(){
        if(this.result.yourInformationSurveyPO.Lawyer=='y'){
            this.serviceAddress = this.result.yourInformationSurveyPO.LawyerAddress
            this.serviceContact = this.result.yourInformationSurveyPO.LawyerContact
        }else{
            this.serviceAddress = this.result.yourInformationSurveyPO.ApplicantAddress
            this.serviceContact = this.result.yourInformationSurveyPO.ApplicantContact
        }
    }

    public getProtectingPeople(){
        if(this.result.protectionWhomSurvey && this.result.protectionWhomSurvey.ApplicantNeedsProtection== "y"){
            if(this.result.protectionWhomSurvey.childPO=='y'){
                this.childrenItem = [];
                for(const child of this.result.protectionWhomSurvey.allchildren){
                    this.childrenItem.push({
                        name:Vue.filter('getFullName')(child.childName), 
                        dob:Vue.filter('beautify-date')(child.childDOB), 
                        relation:child.childRelationship,
                        living:child.childLivingWith
                    })
                }
            }
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
        else if(this.result.protectionWhomSurvey && this.result.protectionWhomSurvey.ApplicantNeedsProtection == "n"){
            if(this.result.protectionWhomSurvey.anotherAdultPO=='y'){
                this.anotherAdult = {nameFull:Vue.filter('getFullName')(this.result.protectionWhomSurvey.anotherAdultName),dobBeauty:Vue.filter('beautify-date')(this.result.protectionWhomSurvey.anotherAdultDOB)}
            }
        }
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = ''
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
                
            info = [{'name':name, 'dob': dob , 'address': address ,'contact': contactInfo}]
        }
        else if(this.result.selectedPOOrder && (this.result.selectedPOOrder.orderType == 'changePO' || this.result.selectedPOOrder.orderType == 'terminatePO')){    
            for(const party of this.result.otherPartySurvey){
                dob = ''
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
                
                info.push({'name':name, 'dob': dob , 'address': address ,'contact': contactInfo})
            }
        }
        else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

        this.otherPartyInfo = info
        // console.log(info)
    }

    public getBackgroundSurvey(){
        let protectedSpouse ='';
        let marriageDate = '';
        let separationDate = '';
        let liveTogetherDate = '';

        //TODO may need to be redefined
        if(this.result.backgroundSurvey.werePOPartiesMarried == 'y'){
            protectedSpouse = Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName)
        }

        if(this.result.backgroundSurvey.werePOPartiesMarried == 'y'){
            liveTogetherDate = Vue.filter('beautify-date')(this.result.backgroundSurvey.liveTogetherPODate)
        }

        if(this.result.backgroundSurvey.werePOPartiesMarried == 'y'){
            marriageDate = Vue.filter('beautify-date')(this.result.backgroundSurvey.dateOfMarriagePO)
        }

        if(this.result.backgroundSurvey.isSeperatedPO == 'Yes'){
            separationDate = Vue.filter('beautify-date')(this.result.backgroundSurvey.separationDate)
        }

       this.backgroundSurvey={protectedSpouse: protectedSpouse, liveTogetherDate:liveTogetherDate, marriageDate: marriageDate, separationDate:separationDate  }
    }

    public getOtherChildrenInfo(){
        //this.otherChildrenItem = [];//{name:'', dob:'', protectedRelation:'', otherRelation:'', livingWith:''}
        if(this.result.backgroundSurvey.PartiesHasOtherChilderen=='y'){
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


    public onPrint() { 
        const pdf_type = 'AAP'    
        const el= document.getElementById("print");
        //console.log(el)
        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 720   `+moment().format("MMMM D, YYYY")+` \\a           Form K";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );
        
        const body = {
            'html':pdfhtml,
            'json_data':this.getFPOResultData()
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
            this.UpdatePathwayCompleted({pathway:"protectionOrder", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){        
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?pdf_type=FPO'
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
            link.download = "fpo.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }

    public Clear(){
        this.$store.state.Application.steps[0].result = {}
    }
 
    public getFPOResultData() {  
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(let i=1;i<2; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                //console.log(stepResults[stepResult])
                //console.log(stepResults[stepResult].data)
                result[stepResult]=stepResults[stepResult].data; 
            }
        }
    //     const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
    //     Object.assign(result, result, protectedPartyName);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        //const userLocation = this.$store.state.Common.userLocation;
        // console.log(applicationLocation)
        //console.log(userLocation)
        
        Object.assign(result, result,{applicationLocation: applicationLocation}); 
       
        // console.log(result)
        if (result.selectedPOOrder && result.selectedPOOrder.orderType){

            const orderType = result.selectedPOOrder.orderType;
            if (orderType == 'needPO'){

                if (result.poFilingLocationSurvey && 
                    result.poFilingLocationSurvey.ExistingFamilyCase && 
                    result.poFilingLocationSurvey.ExistingFamilyCase == 'y' &&
                    result.poFilingLocationSurvey.ExistingFileNumber){
                        this.existingFileNumber = result.poFilingLocationSurvey.ExistingFileNumber;
                    } else {
                        this.existingFileNumber = '';
                    }

            } else if (orderType == 'changePO'){

                if (result.aboutPOSurvey &&                    
                    result.aboutPOSurvey.ExistingFileNumber){
                        this.existingFileNumber = result.aboutPOSurvey.ExistingFileNumber;
                    } else {
                        this.existingFileNumber = '';
                    }

            } else if (orderType == 'terminatePO'){

                if (result.aboutPOSurvey &&                    
                    result.aboutPOSurvey.ExistingFileNumber){
                        this.existingFileNumber = result.aboutPOSurvey.ExistingFileNumber;
                    } else {
                        this.existingFileNumber = '';
                    }
            }

        }        

        // if ()

        Vue.filter('extractRequiredDocuments')(result, 'protectionOrder')

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
    
    .answer{color: #000; display:inline; font-size:11pt;}
    .answerbox{color: #000; font-size:11pt; display:block;text-indent:0px; margin:0.5rem 0 0 0.1rem;}
    .uline{text-decoration: underline; display: inline;}
    .form-header{display:block; margin:0 0 2rem 0;}

    section{
        counter-increment: question-counter;       
        text-indent: -17px;
        text-align: justify;
        text-justify: inter-word;
        margin: 0.5rem 0.5rem 0.5rem 1rem;}
 
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
        

    

</style>