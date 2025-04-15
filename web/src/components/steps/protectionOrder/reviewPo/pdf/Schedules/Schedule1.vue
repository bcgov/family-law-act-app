<template>
    <!----------------------------------------------------------------  <NEED PO>   -------------------------------------------------------->
    <!-- <Page 2> -->
    <!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <ScheduleHeader scheduleNumber="Schedule 1" scheduleTitle="Protection Order" scheduleDescription=""></ScheduleHeader>
            </div>
            <div style="width: 20%;"></div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
                Complete this schedule only if you are applying for a <i>Family Law Act</i> protection order.
                This schedule is an affidavit. It sets out the evidence to help you explain to the court why you
                need a protection order and what it should include.
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
        <!-- <PART 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="background: #626262; color: white; font-size: 13pt; width: 78%;">
                <b>Part 1 | Affidavit</b>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%">
                <grey-box-form style="display:inline-block;" textwidth="13rem" beforetext="I," hint="full name of party"
                    :text="yourInfo.name | getFullName" />
                <grey-box-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext=","
                    hintindent="1rem" hint="occupation" :text="yourInfo.occupation" />
                <div style="margin-top: 0.8rem;"></div>

                <grey-box-form style="text-indent:1px;display:inline-block;" textwidth="20rem" beforetext="of"
                    hint="address of party, city, province" :text="serviceAddress | getFullAddress" />
                <div style="text-indent:1px;display:inline;"> ,</div>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div class="mt-3">
                <b>SWEAR OR AFFIRM THAT:</b>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>1. </b>I am making this affidavit in support of an application for a protection order.
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -130px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-book />
                    <div style="font-size: 9px">For more information about swearing or affirming an affidavit, see the
                        guidebook.</div>
                    </p>
                </div>
            </div>
        </div>


        <!-- <PART 2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="background: #626262; color: white; font-size: 13pt; width: 78%;">
                <b>Part 2 | Protected party/parties</b>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
                A protection order made under the <i>Family Law Act</i> is a court order that protects one family
                member from another family member if there is a risk of family violence.<br />
                The person(s) identified in this part is/are referred to as the protected party/parties. The other
                party is the family member they need protection from.
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>2. </b>I am applying for a protection order for <b>the following person(s) to be protected:</b>
                <div style="margin:0.25rem 0 0 2rem; width: 80%;">
                    <i>Select and complete only those options that apply to your situation. You may select more than
                        one.</i>
                    <check-box shift="10" shiftmark="0" :check="applicantNeedsProtection == 'y' ? 'yes' : ''" text="me" />
                    <check-box shift="10" shiftmark="0" :check="hasChildren ? 'yes' : ''"
                        text=" the following <b>child(ren)</b> I am parent or guardian to:<br><i>Complete only if applicable. You may leave this section blank</i>" />
                </div>
                <b-table :items="childrenItem" :fields="childrenFields" class="mt-2" small>
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{ data.value }}</div>
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
                    <template v-slot:head(livingwith)>
                        Child is currently living with <i style="font-size:6pt; font-weight:normal;">(name of
                            person)</i>
                    </template>
                </b-table>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">As set out in s. 183 of the <i>Family Law Act</i>, a protection order
                        can
                        protect:<br />
                        <ul>
                            <li>you (the applying party)</li>
                            <li>your children</li>
                            <li>an adult family member that lives with the protected party (you and/or your children)
                            </li>
                            <li>an at-risk person you are applying on behalf of for protection from their family member
                            </li>
                        </ul>
                    </div>
                    </p>
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <div style="margin:0.25rem 0 0 2rem;">
                    <check-box shift="10" shiftmark="0" :check="hasSharingAdult ? 'yes' : ''"
                        text="The following <b>adult family member(s)</b> sharing the residence with the other protected person:" />
                </div>
                <b-table :items="sharingAdultItem" :fields="sharingAdultFields" class="mt-2" small>
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{ data.value }}</div>
                    </template>
                    <template v-slot:head(dob)>
                        <b>Date of birth</b> <br /> <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                    </template>
                </b-table>

                <div style="margin:0.25rem 0 0 2rem;">
                    <check-box shift="10" shiftmark="0" :check="hasAnotherAdult ? 'yes' : ''"
                        text="The following <b>other at-risk person</b> I am applying on behalf of for a protection order:" />
                    <b-table :items="otherAdultItem" :fields="otherAdultFields" class="mt-2" small>
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{ data.value }}</div>
                        </template>
                        <template v-slot:head(dobBeauty)>
                            <b>Date of birth</b> <br /> <i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                        </template>
                    </b-table>
                    <div style="text-indent:-18px;display:block;margin-top:0.5rem;"> Explain why you are applying for
                        the other
                        person:</div>
                    <div class="answerbox" style="width:98%"> {{ anotherAdult.reason ? anotherAdult.reason : '&nbsp;' }}
                    </div>
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -5px; background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">You cannot apply for the protection of another person’s child. If you
                        believe a
                        child
                        needs protection and their parent or guardian is unwilling or unable to apply for a protection
                        order on
                        their
                        behalf, contact the Ministry of Children and Family Development.</div>
                    </p>
                </div>

                <div style="background: #FFFFFF; line-height: 8px;">
                    &nbsp;<br />
                </div>

                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-book />
                    <div style="font-size: 9px">A family member is a defined term under s. 1 of the <i>Family Law
                            Act</i>. For
                        more
                        information about who is a family member, see the guidebook.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <PART 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="background: #626262; color: white; font-size: 13pt; width: 78%;">
                <b>Part 3 | About the protection order</b>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
                The questions in this part will help the court understand what terms the protection order may
                need to include.
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>No go</b>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -90px; background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">A protection order may include any of the terms set out in s.183(3) of
                        the
                        <i>Family Law Act</i>.
                    </div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
        <!-- <3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>3. </b>I <b>do not want</b> the other party to be able to <b>attend at, enter or be found
                    near</b><br /> the
                following places:
                <div style="margin:0.25rem 0 0 1rem;">
                    <i>Select all options that apply</i>
                    <check-box shift="10" shiftmark="0" :check="noGo.places.includes('Home') ? 'yes' : ''"
                        text="Residence" />
                    <check-box shift="10" shiftmark="0" :check="noGo.places.includes('School') ? 'yes' : ''"
                        text="School" />
                    <check-box shift="10" shiftmark="0" :check="noGo.places.includes('Workplace') ? 'yes' : ''"
                        text="Place of employment" />
                    <check-box shift="10" shiftmark="0" :check="noGo.places.includes('ChildCareFacility') ? 'yes' : ''"
                        text="Child care facility" />
                    <check-box shift="10" shiftmark="0" :check="noGo.places.includes('other') ? 'yes' : ''"
                        text="Other <i>(specify):</i>" />
                    <grey-box-form marginTop="-12px" style="text-indent:1px;display:inline-block;" textwidth="30rem"
                        beforetext="" hint="" :text="noGo.otherComment" />
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: 0px; background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">You might be asked by the judge at your court appearance to provide the
                        specific address and name of the place. Be sure to have them ready.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>No contact except</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
        <!-- <4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>4. </b>The protected party may <b>need to communicate</b> with the other party for the following
                reason(s):
                <div style="margin:0.25rem 0 0 1rem;">
                    <i>Select all options that apply</i>
                    <check-box shift="10" shiftmark="0" :check="!noContact.reasonForComm.length ? 'yes' : ''"
                        text="Not applicable" />
                    <check-box shift="10" shiftmark="0"
                        :check="noContact.reasonForComm.includes('Consensual dispute resolution') ? 'yes' : ''"
                        text="Consensual dispute resolution" />
                    <check-box shift="10" shiftmark="0"
                        :check="noContact.reasonForComm.includes('Parenting arrangements') ? 'yes' : ''"
                        text="Parenting arrangements" />
                    <check-box shift="10" shiftmark="0"
                        :check="noContact.reasonForComm.includes('Ongoing court action') ? 'yes' : ''"
                        text="Ongoing court action" />
                    <check-box shift="10" shiftmark="0" :check="noContact.reasonForComm.includes('other') ? 'yes' : ''"
                        text="Other <i>(specify):</i>" />
                    <grey-box-form marginTop="-12px" style="text-indent:1px;display:inline-block;" textwidth="30rem"
                        beforetext="" hint="" :text="noContact.otherComment" />
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Firearms and weapons</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
        <!-- <5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>5. </b>I am concerned the other party would <b>cause harm with or threaten to use <br />guns,
                    explosives or
                    another kind of firearm</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.firearms == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.firearms == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> ➜ explain the reason(s) for your concerns:" />
                <div class="answerbox" style="width:98%">{{ weaponsFirearms.firearmsReason ?
                    weaponsFirearms.firearmsReason :
                    '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        <!-- <6> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>6. </b>I believe the other party <b>owns or has access to guns, explosives or another kind<br /> of
                    firearm</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.firearmsYes == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.firearmsYes == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> ➜ explain the reason(s) for your belief:" />
                <div class="answerbox" style="width:98%">{{ weaponsFirearms.firearmsYesReason ?
                    weaponsFirearms.firearmsYesReason
                    : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        <!-- <7> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>7. </b>I am concerned the other party would <b>cause harm with or threaten to use a <br />weapon that
                    is not
                    a gun or explosive</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.weapons == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.weapons == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> ➜ explain the reason(s) for your concerns:" />
                <div class="answerbox" style="width:98%">{{ weaponsFirearms.weaponsReasons ?
                    weaponsFirearms.weaponsReasons :
                    '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top:1rem;"></div>
        <!-- <8> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>8. </b>I believe the other party <b>owns a weapon that is not a gun or explosive</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.weaponsYes == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="weaponsFirearms.weaponsYes == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> ➜ explain the reason(s) for your belief:" />
                <div class="answerbox" style="width:98%">{{ weaponsFirearms.weaponsYesReason ?
                    weaponsFirearms.weaponsYesReason :
                    '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -30px; background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">Examples of weapons someone might own include swords, hunting knives,
                        nun
                        chucks, and brass knuckles.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Remove person or belongings from residence</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>
        <!-- <9> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>9. </b>I believe <b>police assistance may be required</b> for the following purpose(s):
                <div style="margin:0.25rem 0 0 1rem;">
                    <i>Select all options that apply</i>
                    <check-box shift="10" shiftmark="0"
                        :check="removePerson.needPolice.includes('To remove the other party from the shared residence') ? 'yes' : ''"
                        text="To remove the other party from the shared residence" />
                    <check-box style="margin-top:0rem;" shift="10" shiftmark="0"
                        :check="removePerson.needPolice.includes('To supervise the removal of the protected party\'s personal belongings from the shared residence') ? 'yes' : ''"
                        text="To supervise the removal of the protected party's personal belongings from the shared residence" />
                    <check-box style="margin-top:0rem;" shift="10" shiftmark="0"
                        :check="removePerson.needPolice.includes('To supervise the removal of the other party\'s personal belongings from the shared residence') ? 'yes' : ''"
                        text="To supervise the removal of the other party's personal belongings from the shared residence" />
                    <check-box style="margin-top:0rem;" shift="10" shiftmark="0"
                        :check="removePerson.needPolice.includes('To supervise the removal of the child(ren)\'s personal belongings from a residence') ? 'yes' : ''"
                        text="To supervise the removal of the child(ren)'s personal belongings from a residence" />
                    <check-box style="margin-top:0rem;" shift="10" shiftmark="0"
                        :check="removePerson.needPolice.includes('other') ? 'yes' : ''" text="Other <i>(specify):</i>" />
                    <div class="answerbox" style="width:98%">{{ removePerson.needPoliceComment ?
                        removePerson.needPoliceComment :
                        '&nbsp;'}}</div>
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">The court can order that the police help to remove the other party from
                        a shared
                        residence and/or that they help supervise the removal or collection of belongings.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <PART 4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="background: #626262; color: white; font-size: 13pt; width: 78%;">
                <b>Part 4 | Your story</b>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
                The questions in this part will help the court better understand the relationship between the
                parties, background, risk factors and circumstances that have brought you before the court to
                apply for a protection order.
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -30px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">Section 184 of the Family Law Act sets out what a court must consider in
                        determining
                        whether to make a protection order.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Relationship between the parties</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <10> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>10. </b><i>Select only one of the options below</i>
                <div style="margin:0 0 0 0.35rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                        :check="backgroundSurvey.married == 'y' ? 'yes' : ''"
                        text="The protected party is (or was) the other party’s <b>spouse</b>. The parties are (or
                        were) <b>married</b>, or <b>live</b> (or have lived) <b>together</b> in a marriage-like relationship." />
                </div>
                <i>Complete the information below about your relationship, as applicable. <b>You may
                        leave a field blank if it does not apply.</b></i>
                <div style="margin:0 0 0 0;">
                    <table>
                        <tr>
                            <td style="text-align: right;">
                                Date on which the parties began to live together in<br /> a marriage-like relationship
                                (dd/mmm/yyyy):
                            </td>
                            <td>
                                <grey-box-form marginTop="-22px"
                                    style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="7.75rem"
                                    :text="backgroundSurvey.liveTogetherDate | beautify-date-mid" hint=""
                                    beforetext="" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                Date of marriage (dd/mmm/yyyy):
                            </td>
                            <td>
                                <grey-box-form marginTop="-22px"
                                    style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="7.75rem"
                                    :text="backgroundSurvey.marriageDate | beautify-date-mid" hint="" beforetext="" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                Date of separation (dd/mmm/yyyy)
                            </td>
                            <td>
                                <grey-box-form marginTop="-22px"
                                    style="margin-top:0.2rem; text-indent:0px;display:block;" textwidth="7.75rem"
                                    :text="backgroundSurvey.separationDate | beautify-date-mid" hint="" beforetext="" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div style="margin:0 0 0 0.35rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                        :check="backgroundSurvey.married == 'n' ? 'yes' : ''" text="The protected party has never been the other party’s spouse. The protected
                        party/parties and the other party are related as follows:" />
                    <i><b>Describe how</b> they are <b>related</b> for the purposes of this application</i>
                    <div class="answerbox" style="width:98%"> {{ '&nbsp;' }}</div>
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -30px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">If the protection order is only for the protection of a child or
                        children, please answer this Part for the parents or guardians of the children.</div>
                    </p>
                </div>

                <div style="background: #FFFFFF; line-height: 8px;">
                    &nbsp;<br />
                </div>

                <div style="margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">Spouses may be separated even if they continue to live in the same
                        residence
                        [<i>Family Law Act</i> s. 3(4)].</div>
                    </p>
                </div>

                <div style="background: #FFFFFF; line-height: 8px;">
                    &nbsp;<br />
                </div>

                <div style="margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-book />
                    <div style="font-size: 9px">A family member is a defined term under s. 1 of the <i>Family Law
                            Act</i>. For
                        more
                        information about who is a family member, see the guidebook.</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <11> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>11. </b>The protected party <b>currently shares a residence</b> with the other party<br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="removePerson.liveTogether == 'y' ? 'yes' : ''" text="Yes" />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="removePerson.liveTogether == 'n' ? 'yes' : ''" text="No" />
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Children</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <12> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>12. </b><i>Select whichever option is correct and complete the required information</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box shift="10" shiftmark="0" :check="backgroundSurvey.hasOtherChilderen == 'n' ? 'yes' : ''"
                        text="The protected party and the other party are a <b>parent, step-parent or guardian only to the child(ren)</b>, if any, identified <b>in Part 2</b> of this schedule." />
                    <check-box shift="10" shiftmark="0" :check="backgroundSurvey.hasOtherChilderen == 'y' ? 'yes' : ''"
                        text="The protected party and the other party are a <b>parent, step-parent or guardian</b> to the following child(ren) who is/are <b>not identified in Part 2</b> of this schedule:" />
                    <i>Provide the requested information below for each child</i>
                </div>

                <b-table :items="otherChildrenItem" :fields="otherChildrenFields" class="mt-2" small>
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{ data.value }}</div>
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth<i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
                    <template v-slot:head(livingwith)>
                        Child is currently living with <i style="font-size:6pt; font-weight:normal;">(name of
                            person)</i>
                    </template>
                </b-table>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -5px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">A child may split their time between two residences. If a child spends
                        at least
                        40% of
                        their time living somewhere, include both.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>About the family</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <13> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>13. </b>I would like to share the following information with the court about the <b>cultural,
                    linguistic,
                    religious and spiritual upbringing and heritage of my family</b>, including, if the child is an
                Indigenous
                child, the child’s Indigenous identity:
                <i>You may choose to leave this question blank</i>
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.culturalExplain ?
                    backgroundSurvey.culturalExplain
                    : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Court orders and agreements</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <14> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>14. </b>There is an <b>existing court order or written agreement</b> about parenting<br />
                arrangements, child support, contact with a child, guardianship of a child,<br /> spousal
                support, and/or property division in respect of a companion animal.
                <div style="margin:0 0 0 0.5rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline" :shift="10" shiftmark="0"
                        :check="backgroundSurvey.existingOrders == 'y' ? 'yes' : ''" text="Yes (see attached copy)" />
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :shift="10"
                        shiftmark="0" :check="backgroundSurvey.existingOrders == 'n' ? 'yes' : ''" text="No" />
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">Include any order (interim or final), agreement or plan from any level
                        of court
                        and any
                        location.</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <15> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>15. </b>There is an <b>existing court order, agreement or plan protecting</b> one of the<br />
                parties or the
                child(ren), or restraining contact between the parties, including:
                <ul>
                    <li style="text-indent: 20px;">a protection order,</li>
                    <li style="text-indent: 20px;">an order, agreement or plan involving child protection services, or
                    </li>
                    <li style="text-indent: 20px;">a peace bond, restraining order, bail condition or other criminal
                        order.</li>
                </ul>
                <div style="display:block; margin-left:.5rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                        :check="backgroundSurvey.existingPOOrders == 'y' ? 'yes' : ''" text="Yes (see attached copy)" />
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                        :check="backgroundSurvey.existingPOOrders == 'n' ? 'yes' : ''" text="No" />
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: 10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-paperclip />
                    <div style="font-size: 9px">If yes, you must attach a copy of any order, agreement or plan to this
                        application for
                        filing.</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <16> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>16. </b>Has the other party ever <b>failed to obey a court order</b>?<br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.disobeyOrder == 'Yes' ? 'yes' : ''"
                    text="Yes ➜ describe the circumstances" /><br />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.describeDisobeyOrder ?
                    backgroundSurvey.describeDisobeyOrder : '&nbsp;'}}</div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.disobeyOrder == 'No' ? 'yes' : ''" text="No" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.disobeyOrder == 'Unknown' ? 'yes' : ''" text="Unknown" />
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <17> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>17. </b>I am concerned the other party <b>may not obey a court order</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.concernForNotObeying == 'n' ? 'yes' : ''" text="No" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.concernForNotObeying == 'y' ? 'yes' : ''"
                    text="Yes 🠆 explain the reason(s) for your concerns:" />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.explainNotObeyingConcern ?
                    backgroundSurvey.explainNotObeyingConcern : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Reporting safety concerns</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <18> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>18. </b>I am concerned the other party <b>may not obey a court order</b><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.reportedToPolice == 'n' ? 'yes' : ''" text="No" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.reportedToPolice == 'y' ? 'yes' : ''"
                    text="Yes 🠆 describe what actions they have taken:" />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.policeActions ?
                    backgroundSurvey.policeActions :
                    '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -30px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">You will be asked to describe specific incidents that police
                        attended in a later part of this form.</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <19> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>19. </b>I have <b>reported</b> my safety concerns <b>to a social worker</b> (Ministry of Children
                and<br />
                Family Development)<br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.reportedToSW == 'n' ? 'yes' : ''" text="No" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.reportedToSW == 'y' ? 'yes' : ''"
                    text="Yes 🠆 describe what actions they have taken:" />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.swAction ? backgroundSurvey.swAction :
                    '&nbsp;'}}
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">If there is reason to believe a child (under 19) is being abused,
                        neglected,
                        sexually
                        exploited, or is otherwise in need of protection, and a parent or guardian is unable or
                        unwilling to
                        protect the
                        child, the matter must be reported to a social worker at the Ministry of Children and Family
                        Development.</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>History of family violence</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <20> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>20. </b>Describe any <b>recent incidents of family violence against the protected<br />
                    party/parties and any child(ren).</b>
                <i style="text-indent:0rem;display:block;margin-left:.2rem;">Start with the most recent incident
                    continuing
                    backwards. Go back as far as you think is<br />
                    important for the court to know.<br />
                    If there is a police report, medical report or doctor’s note, or any photographs related to<br /> an
                    incident, you must talk about them in this section. Refer to the document, state it<br /> is
                    attached as an exhibit and attach them as exhibits.</i>
                <div class="answerbox" style="width:98%"> {{ yourStory.recentIncidents ? yourStory.recentIncidents :
                    '&nbsp;'}}
                </div>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.riskOfViolence == 'y' ? 'yes' : ''"
                    text="<b>Additional page(s) (see attached)</b>" />
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-book />
                    <div style="font-size: 9px">For more information about what information you should include, see the
                        guidebook.</div>
                    </p>
                </div>

                <div style="margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-paperclip />
                    <div style="font-size: 9px">Remember to attach a copy of any exhibit(s) when you file your
                        application.
                        Each exhibit gets a letter assigned to it, starting with ‘A’ and continuing through the
                        alphabet. For example, the police report attached as Exhibit A.</div>
                    </p>
                </div>

                <div style="background: #FFFFFF; line-height: 8px;">
                    &nbsp;<br />
                </div>

                <div style="margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-paperclip />
                    <div style="font-size: 9px">If you need more space, select the box, and remember to include your
                        additional
                        page(s).</div>
                    </p>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="background: #d7d7d7; color: white; font-size: 13pt; width: 80%;">
                <b>Risk of family violence</b>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <div style="margin-top:1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
                There are different circumstances that may make a person or relationship more at-risk for family
                violence. These circumstances may contribute to family violence but may not be the cause of
                family violence. It is helpful for the court to be aware of these circumstances.
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <21> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>21. </b>I am concerned about the <b>mental health</b> of the protected party and/or the other<br />
                party<br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.mentalHealthConcern == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.mentalHealthConcern == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> 🠆 explain the reason(s) for your concerns:" />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.mentalHealthConcernReasons ?
                    backgroundSurvey.mentalHealthConcernReasons : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -40px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">A person whose safety and security is, or is likely, at risk from family
                        violence carried
                        out by a family member is an at-risk family member [s.182 <i>Family Law Act</i>].</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <22> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-left: 8px;">
                <b>22. </b>Are there <b>circumstances</b> you want to share about a party or the relationship
                <b>that<br /> may
                    increase the risk of family violence</b>?
                <i style="text-indent:0rem;display:block;margin-left:.2rem; width:98%">Circumstances may include risk
                    factors
                    such as substance misuse, employment or
                    financial stress, history of violence, and vulnerabilities including pregnancy, age, family
                    circumstances, health or economic dependence</i>
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.riskOfViolence == 'n' ? 'yes' : ''" text="<b>No</b>" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="backgroundSurvey.riskOfViolence == 'y' ? 'yes' : ''"
                    text="<b>Yes</b> 🠆 please describe the circumstances:" />
                <div class="answerbox" style="width:98%"> {{ backgroundSurvey.violenceCirumstances ?
                    backgroundSurvey.violenceCirumstances : '&nbsp;'}}</div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-book />
                    <div style="font-size: 9px">For more information about risk factors for family violence, see the
                        guidebook
                        or s.184 of
                        the <i>Family Law Act</i>.</div>
                    </p>
                </div>

                <div style="background: #FFFFFF; line-height: 8px;">
                    &nbsp;<br />
                </div>

                <div style="margin-top: 0px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">The court may make a protection order if the court determines that
                        family
                        violence is likely to occur, and the other family member is an at-risk family member [s.183
                        <i>Family
                            Law Act</i>].</div>
                    </p>
                </div>
            </div>
        </div>

        <!-- <23> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b>23. </b>Is there any family violence <b>you fear is likely</b> to happen or <b>concerns for the
                    safety</b><br /> of the protected party/parties that you have <b>not already described</b> in this
                affidavit?<br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="yourStory.isViolence == 'n' ? 'yes' : ''" text="No" /><br />
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" shiftmark="0"
                    :check="yourStory.isViolence == 'y' ? 'yes' : ''" text="Yes 🠆 please describe the circumstances:" />
                <div class="answerbox" style="width:98%"> {{ yourStory.whatViolence ? yourStory.whatViolence : '&nbsp;' }}
                </div>
            </div>
            <div style="width: 20%; padding: 6px;">
            </div>
        </div>

        <!-- <SWEAR > -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div style="margin:1rem 0 0 0">Sworn or affirmed before me</div>

                <div style="margin:0.5rem 0 0 0">
                    <grey-box-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;"
                        textwidth="12rem" beforetext="at" hint="City" text="" />
                    <div style="margin-top:0.2rem; text-indent:3px;display:inline;"> , British Columbia </div>
                </div>
                <div style="margin:1rem 0 0 0">
                    <grey-box-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;"
                        textwidth="11.75rem" beforetext="on" hint="Date" text="" />
                </div>

                <div style="margin:2rem 0 0 0">
                    <div style="height:3rem; width:15rem;border:1px solid #313132; display:inline-block;"></div>
                    <div
                        style="height:3rem; width:15rem;border:1px solid #313132; display:inline-block; margin-left:2rem;">
                    </div>
                </div>
                <div>
                    <div style="width:15rem; display:inline-block; font-size:9pt">A Commissioner for taking Affidavits
                        in
                        British Columbia</div>
                    <div style="width:15rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
                </div>
                <div style="width:15rem; display:inline-block; font-size:9pt">[print name or affix stamp of
                    commissioner]</div>
            </div>
            <div style="width: 20%; padding: 6px;">
                <div style="margin-top: -20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
                    <p>
                        <b-icon-info-circle-fill />
                    <div style="font-size: 9px">This document must be signed only with a commissioner for taking
                        affidavits. A commissioner is available at the court registry for free. Do not sign the
                        document until they tell you to. You will sign it with them.</div>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import { getYourInformationResults } from "@/components/utils/PopulateForms/PopulateCommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { contactInfoType, addressInfoType } from '@/types/Application/CommonInformation';
import { schedule1ChildInfoType, schedule1AnotherAdultInfoType, schedule1OtherChildrenInfoType, schedule1SharingAdultInfoType, schedule1BackgroundInfoType, schedule1YourStoryInfoType, schedule1NoGoInfoType, schedule1NoContactInfoType, schedule1WeaponsFirearmsInfoType, schedule1RemovePersonInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components: {
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        ScheduleHeader
    }
})
export default class Schedule1 extends Vue {

    @Prop({ required: true })
    result!: any;

    yourInfo = {} as yourInformationInfoDataInfoType;
    anotherAdult = {} as schedule1AnotherAdultInfoType;
    // Adding initial empty values to display an empty row in the table if no records exist
    childrenItem: schedule1ChildInfoType[] = [{ name: '', dob: '', myrelation: '', relation: '', living: '' }];
    sharingAdultItem: schedule1SharingAdultInfoType[] = [{ name: '', dob: '', relation: '' }];
    otherChildrenItem: schedule1OtherChildrenInfoType[] = [{ name: '', dob: '', protectedRelation: '', otherRelation: '', livingWith: '' }];
    otherAdultItem: schedule1AnotherAdultInfoType[] = [{ nameFull: '', dobBeauty: '' }];
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

    childrenFields = [
        { key: "name", label: "Child's full name", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
        { key: "dob", label: "Child's date of birth (mmm/dd/yyyy)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:12.5%;" },
        { key: "myrelation", label: "My relationship to the child", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:13.75%;" },
        { key: "relation", label: "Other party's relationship to the child", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:13.75%;" },
        { key: "living", label: "Child is currently living with (name of person)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
    ]

    sharingAdultFields = [
        { key: "name", label: "Full name", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:30%;" },
        { key: "dob", label: "Date of birth (mmm/dd/yyyy)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:17%;" },
        { key: "relation", label: "Relationship to other protected person(s)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
    ]

    otherChildrenFields = [
        { key: "name", label: "Child's full name", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
        { key: "dob", label: "Child's date of birth (mmm/dd/yyyy)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:12.5%;" },
        { key: "protectedRelation", label: "My relationship to the child", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:13.75%;" },
        { key: "otherRelation", label: "Other party's relationship to child", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:13.75%;" },
        { key: "livingWith", label: "Child is currently living with (name of person)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
    ]

    otherAdultFields = [
        { key: "fullName", label: "Full name of other person to be protected", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:20%;" },
        { key: "dobBeauty", label: "Date of birth (dd/mmm/yyyy)", tdClass: "border-dark text-center", thClass: "border-dark text-center align-middle", thStyle: "font-size:8pt; width:12.5%;" },
    ]
    mounted() {
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

    public getYourInfo() {

        if (this.result?.yourinformationPOSurvey) {
            return getYourInformationResults(this.result.yourinformationPOSurvey);
        }
        else
            return {} as yourInformationInfoDataInfoType;
    }

    public getServiceInfo() {
        if (this.result?.yourinformationPOSurvey?.Lawyer == 'y') {
            this.serviceAddress = this.result.yourinformationPOSurvey.LawyerAddress
            this.serviceContact = this.result.yourinformationPOSurvey.LawyerContact
        } else if (this.result?.yourinformationPOSurvey) {
            this.serviceAddress = this.result.yourinformationPOSurvey.ApplicantAddress
            this.serviceContact = this.result.yourinformationPOSurvey.ApplicantContact
        }
    }

    public getProtectingPeople() {

        this.hasChildren = false;
        this.hasSharingAdult = false;
        this.hasAnotherAdult = false;
        this.applicantNeedsProtection = '';

        if (this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection)
            this.applicantNeedsProtection = this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection

        if ( //Add Child info IF:
            (this.result?.protectionFromWhomSurvey?.childPO == 'y' && this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection == "y")
            || (this.result?.protectionFromWhomSurvey?.childPO == 'y' && this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection == "n" && this.result?.protectionFromWhomSurvey?.anotherAdultPO == 'n')
        ) {
            this.childrenItem = [];
            this.hasChildren = true;
            for (const child of this.result.protectionFromWhomSurvey.allchildren) {
                this.childrenItem.push({
                    name: Vue.filter('getFullName')(child.childName),
                    dob: Vue.filter('beautify-date')(child.childDOB),
                    myrelation: child.childRelationshipWithProtected,
                    relation: child.childRelationship,
                    living: child.childLivingWith
                })
            }
        }

        if ( //Add Sharing resident's Adult info IF:
            (this.result?.protectionFromWhomSurvey?.anotherAdultSharingResi == 'y') &&
            (this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection == 'y' ||
                this.result?.protectionFromWhomSurvey?.anotherAdultPO == 'y' ||
                this.result?.protectionFromWhomSurvey?.childPO == 'y')
        ) {
            this.sharingAdultItem = [];
            this.hasSharingAdult = true;
            for (const sharingAdult of this.result.protectionFromWhomSurvey.allAnotherAdultsSharingResi) {
                this.sharingAdultItem.push({
                    name: Vue.filter('getFullName')(sharingAdult.anotherAdultSharingResiName),
                    dob: Vue.filter('beautify-date')(sharingAdult.anotheradultSharingResiDOB),
                    relation: sharingAdult.anotherAdultSharingResiRelation
                })
            }
        }

        if ( //Add Apply for another Adult
            this.result?.protectionFromWhomSurvey?.anotherAdultPO == 'y' &&
            this.result?.protectionFromWhomSurvey?.ApplicantNeedsProtection == "n"
        ) {
            this.hasAnotherAdult = true;
            this.anotherAdult = {
                nameFull: Vue.filter('getFullName')(this.result.protectionFromWhomSurvey.anotherAdultName),
                dobBeauty: Vue.filter('beautify-date')(this.result.protectionFromWhomSurvey.anotherAdultDOB),
                reason: this.result.protectionFromWhomSurvey.anotherAdultReasonForPO
            }
        }
    }

    public getOtherChildrenInfo() {

        if (this.result?.backgroundSurvey?.PartiesHasOtherChilderen == 'y') {
            this.otherChildrenItem = [];
            for (const child of this.result.backgroundSurvey.allOtherChilderen) {
                this.otherChildrenItem.push({
                    name: Vue.filter('getFullName')(child.childName),
                    dob: Vue.filter('beautify-date')(child.childDOB),
                    protectedRelation: child.childRelationshipWithProtected,
                    otherRelation: child.childRelationshipWithOther,
                    livingWith: child.childLivingWith
                })
            }
        }
    }

    public getNoGo() {
        this.noGo = { places: [], otherComment: '' };

        if (this.result?.noGoSurvey?.RespondentNoGo == 'y' && this.result?.noGoSurvey?.RespondentNoGoPlaces) {
            this.noGo.places = this.result.noGoSurvey.RespondentNoGoPlaces

            if (this.result.noGoSurvey.RespondentNoGoPlaces.includes('other') && this.result.noGoSurvey.RespondentNoGoPlacesComment)
                this.noGo.otherComment = this.result.noGoSurvey.RespondentNoGoPlacesComment
        }
    }

    public getNoContact() {
        this.noContact = { reasonForComm: [], otherComment: '' };

        if (this.result?.noContactSurvey?.needCommunication == 'y' && this.result?.noContactSurvey?.reasonForCommunication) {
            this.noContact.reasonForComm = this.result.noContactSurvey.reasonForCommunication

            if (this.result.noContactSurvey.reasonForCommunication.includes('other') && this.result.noContactSurvey.reasonForCommunicationComment)
                this.noContact.otherComment = this.result.noContactSurvey.reasonForCommunicationComment
        }
    }

    public getWeaponsFirearms() {
        this.weaponsFirearms = { firearms: '', firearmsReason: '', firearmsYes: '', firearmsYesReason: '', weapons: '', weaponsReasons: '', weaponsYes: '', weaponsYesReason: '' }

        if (this.result?.weaponsFirearmsSurvey?.RespondentFirearms) {
            this.weaponsFirearms.firearms = this.result.weaponsFirearmsSurvey.RespondentFirearms;

            if (this.result.weaponsFirearmsSurvey.RespondentFirearms == 'y' && this.result.weaponsFirearmsSurvey.firearmsReason)
                this.weaponsFirearms.firearmsReason = this.result.weaponsFirearmsSurvey.firearmsReason
        }

        if (this.result?.weaponsFirearmsSurvey?.RespondentFirearmsYes) {
            this.weaponsFirearms.firearmsYes = this.result.weaponsFirearmsSurvey.RespondentFirearmsYes

            if (this.result.weaponsFirearmsSurvey.RespondentFirearmsYes == 'y' && this.result.weaponsFirearmsSurvey.firearmsYesReason)
                this.weaponsFirearms.firearmsYesReason = this.result.weaponsFirearmsSurvey.firearmsYesReason
        }

        if (this.result?.weaponsFirearmsSurvey?.RespondentWeapons) {
            this.weaponsFirearms.weapons = this.result.weaponsFirearmsSurvey.RespondentWeapons;

            if (this.result.weaponsFirearmsSurvey.RespondentWeapons == 'y' && this.result.weaponsFirearmsSurvey.weaponsReasons)
                this.weaponsFirearms.weaponsReasons = this.result.weaponsFirearmsSurvey.weaponsReasons
        }

        if (this.result.weaponsFirearmsSurvey.RespondentWeaponsYes) {
            this.weaponsFirearms.weaponsYes = this.result.weaponsFirearmsSurvey.RespondentWeaponsYes

            if (this.result.weaponsFirearmsSurvey.RespondentWeaponsYes == 'y' && this.result.weaponsFirearmsSurvey.weaponsYesReason)
                this.weaponsFirearms.weaponsYesReason = this.result.weaponsFirearmsSurvey.weaponsYesReason
        }
    }

    public getRemovePerson() {
        this.removePerson = { liveTogether: '', needPolice: [], needPoliceComment: '' }
        if (this.result?.removePersonSurvey?.RespondentLiveTogether) {
            this.removePerson.liveTogether = this.result.removePersonSurvey.RespondentLiveTogether

            if (this.result?.removePersonSurvey?.needPolice) {
                this.removePerson.needPolice = this.result.removePersonSurvey.needPolice;

                if (this.result.removePersonSurvey.needPolice.includes('other') && this.result.removePersonSurvey.needPoliceComment)
                    this.removePerson.needPoliceComment = this.result.removePersonSurvey.needPoliceComment
            }
        }
    }

    public getYourStory() {
        this.yourStory = { isViolence: '', whatViolence: '', isConcerns: '', whatConcerns: '', recentIncidents: '' }
        if (this.result?.yourStorySurvey?.isFamilyViolence) {
            this.yourStory.isViolence = this.result.yourStorySurvey.isFamilyViolence;
            if (this.result.yourStorySurvey.isFamilyViolence == 'y' && this.result.yourStorySurvey.whatViolence)
                this.yourStory.whatViolence = this.result.yourStorySurvey.whatViolence
        }

        if (this.result?.yourStorySurvey?.isNoneExplainedConcerns) {
            this.yourStory.isConcerns = this.result.yourStorySurvey.isNoneExplainedConcerns;
            if (this.result.yourStorySurvey.isNoneExplainedConcerns == 'y' && this.result.yourStorySurvey.noneExplainedConcerns)
                this.yourStory.whatConcerns = this.result.yourStorySurvey.noneExplainedConcerns
        }

        if (this.result?.yourStorySurvey?.recentIncidents)
            this.yourStory.recentIncidents = this.result.yourStorySurvey.recentIncidents
    }

    public getbackgroundSurvey() {

        this.backgroundSurvey = {
            married: '',
            protectedSpouse: '',
            liveTogetherDate: '',
            marriageDate: '',
            seperated: '',
            separationDate: '',
            howPartiesRelated: '',
            hasOtherChilderen: '',
            existingOrders: '',
            culturalExplain: '',
            mentalHealthConcern: '',
            mentalHealthConcernReasons: '',
            riskOfViolence: '',
            violenceCirumstances: '',
            existingPOOrders: '',
            disobeyOrder: '',
            describeDisobeyOrder: '',
            concernForNotObeying: '',
            explainNotObeyingConcern: '',
            reportedToPolice: '',
            policeActions: '',
            reportedToSW: '',
            swAction: ''
        }

        if (this.result?.backgroundSurvey?.howPartiesRelated)
            this.backgroundSurvey.howPartiesRelated = this.result.backgroundSurvey.howPartiesRelated

        if (this.result?.backgroundSurvey?.werePOPartiesMarried) {

            this.backgroundSurvey.married = this.result.backgroundSurvey.werePOPartiesMarried

            if (this.result.backgroundSurvey.werePOPartiesMarried == 'y') {
                this.backgroundSurvey.protectedSpouse = Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName)
                this.backgroundSurvey.liveTogetherDate = Vue.filter('beautify-date-blank')(this.result.backgroundSurvey.liveTogetherPODate)
                this.backgroundSurvey.marriageDate = Vue.filter('beautify-date-blank')(this.result.backgroundSurvey.dateOfMarriagePO)

                if (this.result?.backgroundSurvey?.isSeperatedPO) {
                    this.backgroundSurvey.seperated = this.result.backgroundSurvey.isSeperatedPO
                    if (this.result.backgroundSurvey.isSeperatedPO == 'Yes')
                        this.backgroundSurvey.separationDate = Vue.filter('beautify-date')(this.result.backgroundSurvey.separationDate)
                }
            }
        }

        if (this.result?.backgroundSurvey?.PartiesHasOtherChilderen) {
            this.backgroundSurvey.hasOtherChilderen = this.result.backgroundSurvey.PartiesHasOtherChilderen;
        }

        if (this.result?.backgroundSurvey?.ExistingOrders && (this.childrenItem[0]?.name || this.otherChildrenItem[0]?.name))
            this.backgroundSurvey.existingOrders = this.result.backgroundSurvey.ExistingOrders;

        if (this.result?.backgroundSurvey?.likeToAddCulturalExplanation == 'y' && this.result?.backgroundSurvey?.culturalExplain) {
            this.backgroundSurvey.culturalExplain = this.result.backgroundSurvey.culturalExplain
        }

        if (this.result?.backgroundSurvey?.mentalHealthConcernPO) {
            this.backgroundSurvey.mentalHealthConcern = this.result.backgroundSurvey.mentalHealthConcernPO;
            if (this.result.backgroundSurvey.mentalHealthConcernPO == 'y' && this.result.backgroundSurvey.explainReasonsPO)
                this.backgroundSurvey.mentalHealthConcernReasons = this.result.backgroundSurvey.explainReasonsPO;
        }

        if (this.result?.backgroundSurvey?.riskOfViolencePO) {
            this.backgroundSurvey.riskOfViolence = this.result.backgroundSurvey.riskOfViolencePO
            if (this.result.backgroundSurvey.riskOfViolencePO == 'y' && this.result.backgroundSurvey.describeCirumstancesPO)
                this.backgroundSurvey.violenceCirumstances = this.result.backgroundSurvey.describeCirumstancesPO;
        }

        if (this.result?.backgroundSurvey?.existingPOOrders)
            this.backgroundSurvey.existingPOOrders = this.result.backgroundSurvey.existingPOOrders

        if (this.result?.backgroundSurvey?.otherPartyDisobeyOrder) {
            this.backgroundSurvey.disobeyOrder = this.result.backgroundSurvey.otherPartyDisobeyOrder;
            if (this.result.backgroundSurvey.otherPartyDisobeyOrder == 'Yes' && this.result.backgroundSurvey.describeDisobeyOrder)
                this.backgroundSurvey.describeDisobeyOrder = this.result.backgroundSurvey.describeDisobeyOrder
        }

        if (this.result?.backgroundSurvey?.concernForNotObeying) {
            this.backgroundSurvey.concernForNotObeying = this.result.backgroundSurvey.concernForNotObeying;
            if (this.result.backgroundSurvey.concernForNotObeying == 'y' && this.result.backgroundSurvey.explainReasonsForConcern)
                this.backgroundSurvey.explainNotObeyingConcern = this.result.backgroundSurvey.explainReasonsForConcern;
        }

        if (this.result?.backgroundSurvey?.reportedConcernsToPolice) {
            this.backgroundSurvey.reportedToPolice = this.result.backgroundSurvey.reportedConcernsToPolice;
            if (this.result.backgroundSurvey.reportedConcernsToPolice == 'y' && this.result.backgroundSurvey.describeActionsByPolice)
                this.backgroundSurvey.policeActions = this.result.backgroundSurvey.describeActionsByPolice;
        }

        if (this.result?.backgroundSurvey?.reportedConcernsToSW) {
            this.backgroundSurvey.reportedToSW = this.result.backgroundSurvey.reportedConcernsToSW;
            if (this.result.backgroundSurvey.reportedConcernsToSW == 'y' && this.result.backgroundSurvey.desrcibeSWAction)
                this.backgroundSurvey.swAction = this.result.backgroundSurvey.desrcibeSWAction
        }
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss"></style>