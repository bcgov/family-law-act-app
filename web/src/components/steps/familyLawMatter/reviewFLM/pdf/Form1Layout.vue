<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->
        <FormHeader 
            :headerTableData="headerItems" 
            formName="Notice to Resolve a Family Law Matter" 
            formNumber="Form 1" 
            ruleFontSize="10pt"
            formRuleNumber="Rule 10" />

        <!-- Header description -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="font-size: 11pt;">
                    This Notice to Resolve a Family Law Matter provides notice that a party is seeking resolution 
                    of a family law matter in an early resolution registry. Before proceeding any further with the
                    family law matter, each party is required to meet the early resolution requirements described 
                    in Part 2 of the rules.
                </div>
                
                <!-- gray box -->
                <div style="width: 100%; margin-left:0px; margin-right: 0px; border-style: dashed; border-color: black; float: left; padding:0rem; background: #b5b5b5;">
                    <b>Please read before completing the form:</b>
                    <ul>
                        <li>This form is only to be used in an early resolution registry and is only required if you
                            have a family law matter to resolve.
                        </li>
                        <li>For guidance filling in this form, please read the guidebook. The guide is available
                            online at <a style="color: blue;" href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
                        </li>
                    </ul>
                </div>
            </div>

            <div style="float: right;width: 20%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p style="margin-bottom: 0.3rem;">
                    <b-icon-book />
                    <br />
                    For more information about early resolution registries, see the guidebook.
                </p>
            </div>
        </div>

        <!-- <Part 1> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="margin-top: 0.5rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 1 | Notice</b>
                </div>
                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                        <div style="display: inline-block; font-size: 11pt;">
                            <b>1.</b>  <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-top:-20px;" :check="true?'yes':''" text=""/>
                        </div>
                        <div style="margin-top:-20px;text-indent:0px;padding-left:40px;text-align:justify;text-justify:inter-word;">
                            I understand <b>the following people must be provided with a copy of the notice</b> to resolve:
                        </div>
                        <ul style="margin-left: 25px;">
                            <li>all parents and current guardians of each child who is the subject of the family
                                law matter
                            </li>
                            <li>my spouse, if I am applying for spousal support or property division in respect
                                of a companion animal
                            </li>
                            <li> each other adult who the family law matter is about</li>
                        </ul>
                        <div style="text-indent:40px;text-align: justify;text-justify: inter-word;"><b>They are the other party/parties in this case.</b></div>
                    </div>
                </div>
            </div>

            <div style="float: right;width: 20%; margin-top: 35px; margin-bottom: -15px; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p style="margin-bottom: 0.3rem;">
                    <b-icon-book />
                    <br />
                    For more information about how to give notice to the other party, see the guidebook.
                </p>
            </div>
        </div>

        <!-- <Part 2> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 | About the parties</b>
                </div>
                <div style="margin-left:0px;width: 100%; float: right; margin-right: 0px;">
                    <div style="text-indent: 0px;margin: 0.5rem 0.5rem 0.5rem 0.5rem;">
                        <div style="display: inline-block; font-size: 11pt;">
                            <b>2. My full name</b> is:
                        </div>
                        <grey-box-form style="text-indent:30px;display:inline-block; font-size: 9pt;" textwidth="365px"
                            beforetext="" hint="Full name of party" :italicHint="false"
                            hintMargin="130px" :text="yourInfo.name | getFullName" />
                    </div>
                </div>
                <div style="text-indent: 4px;">
                    <div style="display: inline-block; font-size: 11pt;margin-left:16px;">
                        My <b>date of birth </b> is:
                    </div>
                    <grey-box-form style="text-indent:9px;display:inline-block; font-size: 9pt; " textwidth="357px"
                        beforetext="" hint="(dd/mmm/yyyy)" :italicHint="false"
                        hintMargin="150px" :text="yourInfo.dob | beautify-date-mid" />
                </div>
                <div style="text-indent: 4px;">
                    <div style="display: inline-block; font-size: 11pt;margin-left:16px;">
                        My <b>current contact information</b> is:
                        <br />
                    </div>
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 27px; font-size: 9pt; background-color: #dedede; width: 95%;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">
                                Email: <div style="display: inline">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">
                                Telephone: <div style="display: inline">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>
                    <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                        <div style="text-indent: 0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                            <div style="display: inline-block; font-size: 11pt;">
                                <b>3.</b> The full name of <b> other party to this agreement</b> is:
                            </div>
                            <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" textwidth="155px" 
                                beforetext="" hint="" :italicHint="false"
                                hintMargin="100px" :text="firstOtherParty.name | getFullName" />
                        </div>
                    </div>

                    <div style="margin-left:-5px;width: 100%; float: right; margin-right: 0px; margin-top: -13px;">
                        <div style="text-align: right; margin-right: 6%; margin-top: 7px;">
                            <div style="display: inline-block; font-size: 11pt;">
                                Their <b>date of birth</b>  (dd/mmm/yyyy) is:
                            </div>
                            <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" 
                                textwidth="155px" 
                                beforetext="" hint="" 
                                :italicHint="false"
                                hintMargin="100px" 
                                :text="firstOtherParty.dob | beautify-date-mid" />
                        </div>
                    </div>

                    <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px; margin-top: 0px;">
                        <div style="text-align: right; margin-right: 6%; margin-top: 7px;">
                            <!-- if additional parties -->
                            <div v-if="additionalOtherParties.length>0">
                                <div style="margin-left: -250px; font-size: 11pt; display: block; width: 100%; float:left; margin-bottom: 5px;">
                                    <check-box inline="inline" style="display: inline; margin: -20px" :check="true?'yes':''" text="There is an additional party."/>
                                </div>
                                <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx">
                                    <div style="display: inline-block; font-size: 11pt; ">
                                        The <b>additional party’s</b> full name is:
                                    </div>
                                    <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" textwidth="155px" 
                                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" 
                                        hintMargin="100px" :text="otherParty.name | getFullName" />

                                    <div style="display: inline-block; font-size: 11pt; margin-top: 2px;">
                                        Their <b>date of birth</b> (dd/mmm/yyyy) is:
                                    </div>
                                    <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" 
                                        textwidth="155px" 
                                        beforetext="" hint="" 
                                        :italicHint="false" 
                                        hintMargin="100px" 
                                        :text="otherParty.dob | beautify-date-mid" />
                                </div>
                            </div>
                            <!-- if NO additional parties -->
                            <div v-else>
                                <div style="margin-left: -250px; font-size: 11pt; display: block; width: 100%; float:left; margin-bottom: 5px;">
                                    <check-box inline="inline" style="display: inline; margin: -20px" :check="false?'yes':''" text="There is an additional party."/>
                                </div>
                                    <div style="display: inline-block; font-size: 11pt; ">
                                        The <b>additional party’s</b> full name is:
                                    </div>
                                    <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" textwidth="155px" 
                                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" 
                                        hintMargin="100px" :text="'.'" />

                                    <div style="display: inline-block; font-size: 11pt; margin-top: 2px;">
                                        Their <b>date of birth</b> (dd/mmm/yyyy) is:
                                    </div>
                                    <grey-box-form style="text-indent:5px;display:inline-block; font-size: 9pt; margin-right:-30px;" textwidth="155px" 
                                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" 
                                        hintMargin="100px" :text="'.'" />
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div style="float: right;width: 20%; margin-top: 35px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p style="margin-bottom: 0.3rem;">
                    <b-icon-book />
                    <br />
                    For more information about how to give notice to the other party, see the guidebook.
                </p>
            </div>
        </div>

        <!-- <Part 3> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 3 | Family law matters that you need help resolving</b>
                </div>

                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -0px;margin: 0rem 0rem 8rem 0.7rem; font-size: 11pt;">
                        <div>
                            <b>4.</b> I would like <b>help with</b> the following family law matter(s):
                        </div>
                        <div style="margin-left:1rem; color: #626262">
                            <i>Select all options that apply</i>
                        </div>
                        <div style="margin-left:2.5rem; text-indent: -17px;">
                            <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('parentingArrangements')?'yes':''" text="Parenting arrangements, including parental responsibilities and parenting time"/>
                            <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('childSupport')?'yes':''" text="Child support"/> 
                            <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('contactWithChild')?'yes':''" text="Contact with a child"/>
                            <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('guardianOfChild')?'yes':''" text="Guardianship of a child"/>
                            <check-box style="line-height:1.15rem;margin-bottom:0.25rem;" :check="selectedPathways.includes('spousalSupport')?'yes':''" text="Spousal Support"/>
                            <check-box style="line-height:1.15rem;margin-bottom:0.25rem;" :check="selectedPathways.includes('companionAnimal')?'yes':''" text="Property division in respect of a companion animal"/>
                        </div>
                    </div>
                </div>
            </div>

            <div style="float: right; width: 20%; margin-top: 10px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p style="margin-bottom: 0.3rem;">
                    <b-icon-info-circle-fill />
                    <br />
                    Some matters don’t fall under the definition of “family law matter”, including a protection order or priority parenting matter. The early resolution process is not required to apply for an order about these other matters [Rule 12].
                </p>
            </div>
            <div style="float: right;width: 20%; margin-top: 5px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p style="margin-bottom: 0.3rem;">
                    <b-icon-book />
                    <br />
                    For more information about family law matters and how to apply for other orders about other matters, see the guidebook.
                </p>
            </div>
        </div>

        <!-- <Part 4> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 4 | Identification of children</b>
                </div>

                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -20px; padding-left: 20px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                        <div style="color: #626262">
                            <b>5.</b> <i>Select the correct option below and provide the additional information if applicable</i>
                        </div>
                        <div style="margin-left:2.5rem; text-indent: -17px;" >
                            <check-box marginLeft="1.5rem"  :check="!childRelatedType?'yes':''" text="My family law matter is <b>not about a child</b> or children"/>
                            <check-box marginLeft="1.5rem"  :check="childRelatedType?'yes':''" text="My family law matter is about <b>the following child</b> or children:"/>
                            <i style="margin-left:0.5rem; color: #626262">Provide the requested information below for each child</i>
                        </div>
                        <b-table
                            :items="childrenInfo"
                            :fields="childrenFields"
                            class="mt-2"
                            small>                    
                                <template v-slot:cell()="data">
                                    <div style="height:1rem; font-size:8pt;color:#000;background-color: #d6d6d6;">{{data.value}}</div>                                           
                                </template>
                                <template v-slot:head(dob)>
                                    Child's date of birth <br/><i style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</i>
                                </template>
                        </b-table>
                    </div>
                </div>
            </div>

        </div>

        <!-- <Part 5> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 5 | Existing orders and agreements</b>
                </div>

                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -20px; padding-left: 20px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                        <div>
                            <b>6.</b> There is an <b>existing court order or written agreement</b> about parenting 
                            arrangements, child support, contact with a child, guardianship of a child, spousal 
                            support, and/or property division in respect of a companion animal.
                        </div>
                        <div style="margin-left:2.5rem; text-indent: -17px;" >
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="<b>Yes</b>"/>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="<b>No</b>"/>
                        </div>
                    </div>
                </div>
                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -20px; padding-left: 20px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                        <div>
                            <b>7.</b> There is an <b>existing court order, agreement or plan protecting</b> one of the parties 
                            or the child(ren), or restraining contact between the parties, including:
                            <ul style="text-indent: 0px; margin-bottom: 0rem;">
                                <li>a protection order,</li>
                                <li>an order, agreement or plan involving child protection services, or</li>
                                <li>a peace bond, restraining order, bail condition or other criminal order.</li>
                            </ul>
                        </div>
                        <div style="margin-left:2.5rem; text-indent: -17px;" >
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="<b>Yes</b>"/>
                            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="<b>No</b>"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="float: right; width: 20%; margin-top: 30px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
            <p style="margin-bottom: 0.3rem;">
                <b-icon-info-circle-fill />
                <br />
                Include any order (interim or final), agreement or plan from any level of court and any location.
            </p>
        </div>

        <!-- <Part 6> -->
        <div>
            <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 6 | Filing location </b>
                </div>

                <div style="margin-left:-5px;width: 100%; float: left; margin-right: 0px;">
                    <div style="text-indent: -20px; padding-left: 20px; margin: 0rem 0rem 1rem 0.7rem; font-size: 11pt;">
                        <div>
                            <b>8.</b> I am filing this application <b>in the court registry</b>: 
                        </div>
                        <div style="margin-left:1rem; color: #626262">
                            <i>Select only one of the options below</i>
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                                text="Where my <b>existing case</b> with the same party/parties is located. I already have a file number"/> 
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                                text="Closest to <b>where the child lives</b> most of the time, because my case involves a child-related issue"/>
                            <check-box  
                                :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" 
                                text="closest to <b>where I live</b> because my case does not involve a child-related issue"/>
                            <check-box  
                                :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" 
                                text="Permitted by <b>court order</b>"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="float: right; width: 20%; margin-top: 30px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
            <p style="margin-bottom: 0.3rem;">
                <b-icon-info-circle-fill />
                <br />
                Rule 7 sets out the requirements for which registry to use. Talk to the court registry to see if there is already an existing case at a court location.
            </p>
        </div>

        <!-- gray box -->
        <div style="width: 80%; margin-left:-10px; margin-right: 10px; border-style: dashed; border-color: black; border-width:2px ; float: left; padding:0.5rem; background-color: #ececec; background-image: radial-gradient(#b5b5b5 10%, transparent 1%); background-size: 15px 15px; background-position: 0 0, 30px 30px; background-repeat: repeat;">
            <b>IMPORTANT NOTE:</b>
            <div>
                <b>Before proceeding any further</b> with your case, each party is required to meet the 
                early resolution requirements described in the rules and <b>set out in Part 7 of this Notice</b>.
            </div>
            <div>
                <b>If you require a time sensitive order</b> on a family law matter, you may be able to 
                postpone participation in one or more early resolution requirements until after you 
                have received your time sensitive order. Please speak to Family Justice Services 
                Division or the court registry if this situation applies to you.
            </div>
        </div>

        <!-- <Part 7> -->
        <div>
            <div style="width: 80%; margin-left:-10px; margin-right: 10px; float: left; ">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 7 | What you must do to meet the early resolution requirements</b>
                </div>
                <div style="margin-top: 0.3rem;"></div>

                <!-- light gray box -->
                <div style="margin-left:7px; margin-right: 0px; float: left; padding:0.3rem; background-color: #ececec; width: 99%;">
                    <div>
                        More information about the services provided by Family Justice Services Division, including 
                        contact information for the Justice Access Centres, can be found at 
                        <a style="color: blue;" href="www.gov.bc.ca/family-justice-services-division">www.gov.bc.ca/family-justice-services-division</a>.
                    </div>
                    <div style="margin-top: 0.5rem;"></div>
                    <div>
                        If you have already participated in some or all of the early resolution requirements set out 
                        below within the last year, Family Justice Services Division will confirm you have met the 
                        early resolution requirements and prepare the required documents for court.
                    </div>
                </div>
            </div>
        </div>

        <!-- Part 7-1-->
        <div>
            <div style="width: 80%; margin-left:-10px; margin-right: 10px; float: left; ">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #9a9a9a; color: white; font-size: 13pt;">
                    1 | Needs Assessment
                </div>
                <div style="margin-top: 0.3rem;"></div>

                <!-- light gray box -->
                <div style="margin-left:7px; margin-right: 0px; float: left; padding:0.3rem; background-color: #ececec; width: 99%;">
                    <div>
                        A needs assessment is a one-on-one meeting with a needs assessor. A needs assessor is a 
                        neutral person trained to help you understand this process and other ways available to 
                        resolve your family law matter and other issues. 
                    </div>
                    <div style="margin-top: 0.5rem;"></div>
                    <div>
                        A needs assessor can provide legal information, make referrals to supports, 
                        including legal advice, and help identify the next steps that are right for you.
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
            <div style="text-indent: -20px; padding-left: 10px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                <div style="margin-left:0rem; text-indent: -17px; margin-top: 0.5rem;" >
                    <check-box marginLeft="1.5rem" :check="false?'yes':''" text="<b>Contact</b> Family Justice Services Division to <b>schedule</b> your individual <b>needs assessment</b>."/> 
                </div>
                <div style="width: 70%; text-align: center; margin: auto; padding:0.5rem; border: 1px solid #D3D3D3; color: #D3D3D3">
                    </br>FJSD</br>contact information</br></br>
                </div>
                <div style="margin-left:0rem; text-indent: -17px; margin-top: 0.5rem;" >
                    <check-box marginLeft="1.5rem" :check="false?'yes':''" text="<b>Participate in a needs assessment</b>"/> 
                </div>
            </div>
        </div>

        <div style="float: right; width: 20%; margin-top: 10px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
            <p style="margin-bottom: 0.3rem;">
                <b-icon-info-circle-fill />
                <br />
                You may be contacted by a needs assessor if someone else has filed a Notice to Resolve a Family Law Matter and has named you as the other party.
            </p>
        </div>

        <!-- Part 7-2-->
        <div>
            <div style="width: 80%; margin-left:-10px; margin-right: 10px; float: left; ">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #9a9a9a; color: white; font-size: 13pt;">
                    2 | Parenting Education Program
                </div>
                <div style="margin-top: 0.3rem;"></div>

                <!-- light gray box -->
                <div style="margin-left:7px; margin-right: 0px; float: left; padding:0.3rem; background-color: #ececec; width: 99%;">
                    <div>
                        Free online parenting courses to provide information to help parents make careful 
                        and informed decisions about their separation and to ensure decisions are based on the best 
                        interests of the child/youth.
                    </div>
                    <div style="margin-top: 0.5rem;"></div>
                </div>
            </div>
        </div>

        <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
            <div style="text-indent: -20px; padding-left: 10px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                <div style="margin-left:0rem; text-indent: -17px; margin-top: 0.5rem;" >
                    <check-box marginLeft="1.5rem" :check="false?'yes':''" text="<b>Complete a parenting education course</b>, unless you are exempt by a needs assessor. Your needs assessor will provide you with more information on the parenting education course that is right for you and how to complete it."/> 
                </div>
            </div>
        </div>

        <div style="float: right; width: 20%; margin-top: -30px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
            <p style="margin-bottom: 0.3rem;">
                <b-icon-info-circle-fill />
                <br />
                The reasons a person may be exempt from completing a parenting education course are set out in Rule 17.
            </p>
        </div>

        <!-- Part 7-3-->
        <div>
            <div style="width: 80%; margin-left:-10px; margin-right: 10px; float: left; ">
                <div style="margin-top: 1rem;"></div>
                <div style="background: #9a9a9a; color: white; font-size: 13pt;">
                    3 | Consensual Dispute Resolution
                </div>
                <div style="margin-top: 0.3rem;"></div>

                <!-- light gray box -->
                <div style="margin-left:7px; margin-right: 0px; float: left; padding:0.3rem; background-color: #ececec; width: 99%;">
                    <div>Consensual dispute resolution means:</div>
                    <div>(a) mediation with a family law mediator</div>
                    <div>(b) a collaborative family law process, or</div>
                    <div>(c) facilitated negotiation of a child support or spousal support matter with a child support officer.</div>
                    <div style="margin-top: 0.5rem;"></div>
                </div>
            </div>
        </div>

        <div style="margin-left:-10px;width: 80%; float: left; margin-right: 10px;">
            <div style="text-indent: -20px; padding-left: 10px; margin: 0rem 0rem 0rem 0.7rem; font-size: 11pt;">
                <div style="margin-left:0rem; text-indent: -17px; margin-top: 0.5rem;" >
                    <check-box marginLeft="1.5rem" :check="false?'yes':''" text="<b>Participate in consensual dispute 
                        resolution</b>, unless your needs assessor determines that the parties cannot access 
                        consensual dispute resolution services or that it is not appropriate."/> 
                </div>
                <div style="text-indent: -0px; padding-left: 8px; margin-bottom: 1rem;">
                    Your needs assessor will provide you with more information about what consensual 
                    dispute resolution is, whether it is right for you, and the process for participating in it.
                </div>
            </div>
        </div>

        <div style="float: right; width: 20%; margin-top: 10px; margin-bottom: 0rem; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
            <p style="margin-bottom: 0.3rem;">
                <b-icon-info-circle-fill />
                <br />
                Consensual dispute resolution is not required if one of the parties is the Director of Maintenance Enforcement or a director under the Child, Family and Community Service Act.
            </p>
        </div>

        <!-- gray box -->
        <div style="width: 80%; margin-left:-10px; margin-right: 10px; border-style: dashed; border-color: black; border-width:2px ; float: left; padding:0.5rem; background-color: #ececec; background-image: radial-gradient(#b5b5b5 10%, transparent 1%); background-size: 15px 15px; background-position: 0 0, 30px 30px; background-repeat: repeat;">
            <b>IMPORTANT NOTE:</b>
            <div>
                <b>If you do not resolve all family law matters during the early resolution process</b> 
                either party can apply to the Provincial Court for a court order by filing an Application 
                About a Family Law Matter Form 3. Family Justice Services Division will confirm you have 
                met the early resolution requirements.
            </div>
            <div>
                <b>If you do not participate in the early resolution process</b>, the other party 
                will be allowed to proceed to the Provincial Court to ask for a court order. A party 
                must have met the early resolution requirements before they will be allowed to file 
                an Application About a Family Law Matter or Reply to an Application About a Family 
                Law Matter in the case.
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
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import GreyBoxForm  from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { childrenInfoSurveyInfoType, yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { childDetailsDataInfoType } from '@/types/Application/FamilyLawMatter';
import { existingOrdersInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        CheckBox,
        OrderedCheckBox,
        GreyBoxForm,
        FormHeader    
    }
})
export default class Form1Layout extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedPathways!: string[];
    
    @applicationState.State
    public applicantName!: nameInfoType;  

    dataReady = false;   

    otherPartyInfo=[];
    additionalOtherParties = [];
    firstOtherParty = {} as any;
    yourInfo = {} as yourInformationInfoDataInfoType;
    childrenInfo: childrenInfoSurveyInfoType[] = []; 
    applicantList = [];
    childRelatedType = false;
    filingLocationReason = '';  
    existingOrders = {} as existingOrdersInfoType;
    existingFileNumber = '';

    headerItems = [];
    
    childrenFields=[
        {key:"fullName", label:"Child's full name",                   tdClass:"text-center align-middle", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:30%; font-weight: bold; border: none; border-bottom: 2px solid #333;"},
        {key:"dob",      label:"Child's date of birth (mmm/dd/yyyy)", tdClass:"text-center align-middle", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:15%; font-weight: bold; border: none; border-bottom: 2px solid #333;"}
    ]
   
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
        
        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }

        this.existingOrders = {existingFlm: false, existingPO: false}

        this.existingOrders.existingFlm = this.result.flmBackgroundSurvey?.ExistingOrdersFLM == 'y';
        this.existingOrders.existingPO =  this.result.flmBackgroundSurvey?.existingPOOrders == 'y';

        this.existingFileNumber = this.result.filingLocationSurvey?.ExistingFileNumber? this.result.filingLocationSurvey.ExistingFileNumber : ''

        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }   
        this.childrenInfo = this.getChildrenInfo();     
        this.yourInfo = this.getYourInfo();
    }   
    
    public getChildrenInfo(){
        
        const selectedPathways = this.result?.flmQuestionnaireSurvey?this.result?.flmQuestionnaireSurvey:[];
        
        if (selectedPathways.includes("parentingArrangements") || 
                selectedPathways.includes("childSupport") ||
                selectedPathways.includes("contactWithChild") ||
                selectedPathways.includes("guardianOfChild")){
            this.childRelatedType = true;
        } else {
            this.childRelatedType = false;
        }

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: childDetailsDataInfoType[] = this.result?.childrenInfoSurvey? this.result.childrenInfoSurvey: [];
        
        if(this.childRelatedType){
            for (const child of childData){            
                childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
                childInfo.fullName = Vue.filter('getFullName')(child.name);
                childInfo.dob = Vue.filter('beautify-date')(child.dob);            
                childrenInfo.push(childInfo)
            }        
        }
        else
            childrenInfo.push({fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''});
          

        return childrenInfo;
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
                    lawyer:''
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