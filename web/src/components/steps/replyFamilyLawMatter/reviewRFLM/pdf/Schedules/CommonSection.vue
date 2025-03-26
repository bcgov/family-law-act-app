<template>
    <div v-if="dataReady">
<!-- <HEADER> : BEGIN -->
    <div style="height: 160px;">
            <div style="float:left; width: 40%;">
                <div style="font-size: 14pt;"><b>Reply to an Application<br/>About a Family Law Matter</b></div>
                <div><check-box
                    inline="inline" 
                    shiftmark="1" boxMargin="0" shift="1" 
                    style="margin:0; padding:0; display:inline; " 
                    :check="includesCounter?'yes':''" 
                    text=" <b>with counter application</b>"/> </div>
                <div style="font-size:12pt;"><b>Form 6</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 28</div> 
            </div>
            <div style="float: left; width: 25%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 30pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align: right;padding-right:5px;"> Registry location: </div>
                    <div style="margin-left:-3px;float: left; background-color: #d6d6d6; width: 115px; padding: 2px;text-align:left;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;text-align: right;padding-right:5px;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 115px; padding: 2px;text-align:left;"> {{ locationInfo.existingFileNumber ? locationInfo.existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;text-align: right;padding-right:5px;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number:<br/><span style="color:#747474;font-size:7pt">For registry use only </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 115px; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>
        <div style="width: 80%;float: left; padding:0.3rem;">
            This Reply to an Application About a Family Law Matter provides notice to each party, and the
court, of a party’s reply to an application about a family law matter and a counter application, if applicable.
        </div>
        <div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; padding:0.3rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">You must complete the main reply portion of the form and any applicable schedule(s)
                for the family law matter(s) identified in Part 3 of the main reply.
                </div>
            </li>
            <li><div style="margin-left:9px;">If the other party’s application is about child support or spousal support, you must also
                    file a Financial Statement in Form 4.
                </div>
            </li>
            <li><div style="margin-left:9px;">You will need to reference the application about a family law matter that you received.
                </div>
            </li>
            <li><div style="margin-left:9px;">For guidance filling in this form, please read the guidebook. The guide is available
                online at <a style="color:#1C35F4;" href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
            </div>
            </li>
            
        </ul>
    </div> 
    
    </div>
    <div class="print-block">
        <div style="border-style: dashed; border-color: black; float: left; margin-top: 10px;width: 80%;padding:0.5rem; background: #d6d6d6; ">
        <b>IMPORTANT NOTE TO THE OTHER PARTY:</b>
        <p>
            If the reply includes a counter application, you may reply to the counter application by filing a
            Reply to a Counter Application in Form 8, and any additional documents that may be required
            to be filed, <b>within 30 days</b> after the date you receive the reply with counter application.
        </p>  
    </div>
    </div>
<!-- <HEADER> : END -->
<!-- <1> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 1 | About the parties</b>
            </div>
             <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>1.</b><span style="margin-left:12px;">The Application About a Family Law Matter was filed by</span>
                    </div><br/>
                    <underline-form style="margin-top:5px;text-indent:4px;display:inline-block; font-size: 9pt;margin-left:22px;" textwidth="65%"
                        beforetext="" hint="Full name of other party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="otherPartyInfo" />
            <span></span>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>2.</b><span style="margin-left:12px;">My <b>full name</b> is:</span>
                    </div>
                    <underline-form style="margin-top:5px;text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="377px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
            <span></span>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <span style="margin-left:24px;">My  <b>date of birth</b> is (dd/mmm/yyyy):</span>
                    </div>
                    <underline-form style="margin-top:5px;text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="242px"
                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.dob | beautify-date" />
            <span></span>
            </div>            
        </div>
        <div style="float: right;width: 18%; margin-top:55px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Copy the other party’s name from their application.. 
                </p>
        </div>   
    </div>
<!-- <1> : END-->
<!-- <2> : BEGIN--> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 | Relationship between the parties</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>3.</b><span style="margin-left:12px;color:#747474;font-style: italic;">Select only one of the options below</span>
                    </div>     
                    <div>
                    <div >
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="isRelationshipCorrect?'yes':''" text="The <b>information</b> set out in Part 4 of the Application About a Family Law Matter <b>about the relationship between the parties is correct</b>."/>               
                    </div>
                    <div>
                        <check-box style="display: block; text-indent: -17px;margin-left:45px"  :check="!isRelationshipCorrect?'yes':''" text="The <b>information</b> set out in Part 4 of the Application About a Family Law Matter
                        <b>about the relationship between the parties is not correct</b> as follows:"/>               
                    </div>
                    <div style="font-size: 11pt;margin-left:55px;"><span style="color:#747474;font-style: italic;">Identify the information you say is not correct and set out the correct information</span></div>
                    <div v-if="!isRelationshipCorrect && relationshipDetails" style="margin-left:55px;background-color:#dedede;min-height:180px;">{{ relationshipDetails }}</div>
                    <div v-else style="background-color: #dedede;font-size: 11pt;margin-left:55px;min-height:180px;"></div>   
                </div>                                 
            </div>            
        </div>
    </div>
<!-- <2> : END-->   
<!-- <3> : BEGIN--> 
<!-- <3A : BEGIN-->
    <div >
        
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 3 |  Identification of children  </b> - <span style="margin-left:2px;margin-top:-40px;font-size:8pt;">You do not need to complete this part if the application or
                    </span>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:2px;margin-top:-40px;font-size:8pt;">counter application, if applicable, does not ask for any order(s) about a child or children
                    </span>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>4.</b><span style="margin-left:12px;color:#747474;font-style: italic;">Select only one of the options below</span>
                    </div>     
                    <div>
                    <div >
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="aboutChildren && !incorrectChildInfo?'yes':''" text="The <b>other party correctly provided</b> the name and date of birth of each child
involved in the application, and counter application, if applicable."/>               
                    </div>
                    <div>
                        <check-box style="display: block; text-indent: -17px;margin-left:45px"  :check="aboutChildren && incorrectChildInfo?'yes':''" text="The <b>correct information about each child</b> who is the subject of the
application and/or counter application is as follows:"/>               
                    </div>
                    <div style="font-size: 11pt;margin-left:55px;"><span style="color:#747474;font-style: italic;">Provide the requested information below for each child
                    </span></div>
               
                </div>   
                <table style="width:85%;margin-left:52px; border-collapse: collapse;">
                    <tr style="border-bottom: 2px solid black;">
                    <td style="text-align: center;width:30%"><b>Child's full name</b></td>
                    <td style="text-align: center;width:20%"><b>Child's date of birth</b><div style="font-size:6pt; font-weight:normal;font-style: italic;margin-top:-15px;text-align: center"><br/>(dd/mmm/yyyy)</div></td>
                    <td style="text-align: center;width:20%"><b>My relationship to the child</b></td>
                    <td style="text-align: center;width:20%"><b>Other party’s relationship to the child</b></td>
                    <td style="text-align: center;width:10%"><b>Child currently living with</b><div style="font-size:6pt; font-weight:normal;font-style: italic;margin-top:-15px;text-align: center"><br/>(name of person)</div></td>
                </tr>
                    </table>
                    <table v-if="counterChildrenInfo && counterChildrenInfo.length >=1 && counterChildrenInfo[0].fullName" style="width:85%;margin-left:52px; border-collapse: collapse;">
                    <tbody>
                    <tr 
                    v-for="data in counterChildrenInfo">
                    <td style="border-right: 1px solid #fff;width:30%"><div style="background-color: #d6d6d6">{{ data.fullName }}</div></td>
                    <td style="border-right: 1px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.dob }}</div></td>
                    <td style="border-right: 1px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.myRelationship }}</div></td>
                    <td style="border-right: 1px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.otherPartyRelationship }}</div></td>
                    <td style="border-right: 1px solid #fff;text-align: center;width:10%"><div style="background-color: #d6d6d6">{{ data.currentSituation }}</div></td>
                    </tr>
                    </tbody>    
                    </table>    
                    <table v-else style="width:85%;margin-left:52px; border-collapse: collapse;">
                    <tbody>
                    <tr>
                    <td style="border-right: 1px solid #fff;width:30%"><div style="background-color: #d6d6d6;min-height:20px;"></div></td>
                    <td style="border-right: 1px solid #fff;width:20%"><div style="background-color: #d6d6d6;min-height:20px;"></div></td>
                    <td style="border-right: 1px solid #fff;width:20%"><div style="background-color: #d6d6d6;min-height:20px;"></div></td>
                    <td style="border-right: 1px solid #fff;width:20%"><div style="background-color: #d6d6d6;min-height:20px;"></div></td>
                    <td style="border-right: 1px solid #fff;width:10%"><div style="background-color: #d6d6d6;min-height:20px;"></div></td>
                    </tr>
                    </tbody>    
                    </table>                           
            </div> 
        </div>
        <div style="float: right;width: 18%; margin-top:205px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    A child’s residence is usually where they live at least 40% of the time. If a child currently splits their time between two residences, include both.        
                </p>
        </div>
              
    </div> 
<!-- <3A> : END-->
<!-- <3B> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                <div style="display: inline-block; font-size: 11pt;margin-left:6px;">
                       <b>5.</b>
                </div> 
            <div>
                    <div style="margin-top:-23px;">
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="aboutChildren && childBestInterestAcknowledmentCheck?'yes':''" text="I understand that I must consider the <b>best interests of the child</b> with respect to
each order I am asking the court to make about the child. The “best interests of the
child” is a legal test used to decide what would best protect the child’s physical,
psychological, and emotional safety, security and well-being [<i>Family Law Act</i> s. 37]."/>               
                    </div>
                </div>   
                                         
            </div> 
        </div>
        <div style="float: right;width: 18%; margin-top:10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about best interests of the child, see the guidebook.         
                </p>
        </div>
              
    </div> 
      
<!-- <3B> : END-->
<!-- <4> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">          
            <div style="margin-top: 1.5rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 4 |  About us  </b>                    
            </div>     
        </div> 
               
        <div style="margin-top: 2rem;"></div>
        <div style="width: 80%; float: left; margin-right: 10px;">
          <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;margin-left:15px;"><b>6. </b></span><span style="margin-left:12px;">I would like to share the following information with the court about the
                 </span>   
                 <div style="margin-left:45px;"><b>cultural, linguistic, religious and spiritual upbringing and heritage of my family</b> including,
                    if the child is an Indigenous child, the child’s Indigenous identity:
                 </div>   
                 <div style="margin-left:45px;color:#747474;font-style: italic;">You may choose to leave this question blank</div>        
                 
                <div v-if="culturalInfo && culturalInfo.length > 0" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:200px;">
                    {{culturalInfo}} 
                </div>
                <div v-else style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:200px;"></div>                
                
            </div>                            
            </div>            
        </div>   
               
    </div> 
<!-- <4> : END-->
<!-- <5A> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 5 | Existing orders and agreements </b>                    
            </div>     
        </div>
               
 
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;margin-left:15px;"><b>7. </b></span><span style="margin-left:2px;">There is an <b>existing court order or written agreement</b> about parenting
                 </span>   
                 <div style="margin-left:35px;">arrangements, child support, contact with a child, guardianship of a child, spousal support, and/or property division in respect of a 
                    companion animal that was <b>not provided by the other party</b> with their application.
                 </div>   
                 <table style="margin-left:25px;">
                <tr>
                <td style="width:400px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:16px;" :check="existingOrders.existingFlm?'yes':''" text='<b>Yes <span style="color:#747474;"></check-box>(see attached copy)</span></b>'/>
                </td>
                <td style="width:40%">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:16px;" :check="!existingOrders.existingFlm?'yes':''" text="<b>No</b>"/> 
                </td>
                </tr>
                 </table>
                
            </div>                            
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top:20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Include any order (interim or final), agreement or plan from any level of court and any location.        
                </p>
        </div>          
    </div> 
<!-- <5A> : END-->
<!-- <5B> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="font-size: 11pt;">
                <span style="font-size: 11pt;margin-left:15px;"><b>8. </b></span><span style="margin-left:2px;">There is an <b>existing court order, agreement or plan protecting</b> 
                 </span>   
                 <div style="margin-left:35px;">one of the parties or the child(ren), or restraining contact between the parties, that was <b>not provided by the other party with their application</b>, including:
                 </div>
                 <ul style="margin-left:20px;">
                    <li>a protection order,</li>
                    <li>an order, agreement or plan involving child protection services, or</li>
                    <li>a peace bond, restraining order, bail condition or other criminal order.</li>
                </ul>   
                 <table style="margin-left:25px;margin-top:-10px;">
                <tr>
                <td style="width:400px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:16px;" :check="existingOrders.existingPO?'yes':''" text='<b>Yes <span style="color:#747474;"></check-box>(see attached copy)</span></b>'/>
                </td>
                <td style="width:40%">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:16px;" :check="!existingOrders.existingPO?'yes':''" text="<b>No</b>"/> 
                </td>
                </tr>
                 </table>
                
            </div>                            
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top:20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-paperclip/>
                    <br />
                    If yes, you must attach a copy of any order, agreement or plan to this application for filing.        
                </p>
        </div>          
    </div> 
<!-- <5B> : END-->
<!-- <6> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 6 | Replying to the other party</b>
            </div>
            <div class="print-block">
        <div style="border-style: solid; border-color: black; border-width:0px ;float: left; margin-top: 10px;padding:0.5rem; background: #d6d6d6; ">
        In your reply, you may:
        <ul style="margin-left:-14px;">
            <li><div style="margin-left:9px;">agree with one or more of the orders about a family law matter applied for in the Application
                About a Family Law Matter;
                </div>
            </li>
            <li><div style="margin-left:9px;">disagree with one or more of the orders about a family law matter applied for in the
                Application About a Family Law Matter, and ask that a different order be made; or
                </div>
            </li>
            <li><div style="margin-left:9px;">apply for an order about a family law matter that was not included in the Application About a
                Family Law Matter
                </div>
            </li>
        </ul> 
    </div>
    </div>   
    <div style="display: inline-block; font-size: 11pt;margin-left:10px;">
      
    <div><b>9.</b> <span><b>In reply to the other party’s application</b> about a family law matter:</span></div>
    <div style="color:#747474;font-style: italic;margin-left:10px;">Select only one option for each family law matter and complete the required </div>
    <div style="color:#747474;font-style: italic;margin-left:10px;">schedule(s), as applicable. If you are making a counter application, select the </div>
    <div style="color:#747474;font-style: italic;margin-left:10px;">appropriate answer to the question below to identify which schedule you must complete</div>
    </div>          
        </div>
        <div style="float: right;width: 18%; margin-top:55px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    This part will help you identify 
                    which family law matter you 
                    and the other party may agree 
                    or disagree about, and if there 
                    is another family law matter 
                    you want to add an 
                    application for an order about. 
                    Based on how you reply, it will 
                    help identify the additional 
                    schedule(s) you must 
                    complete to provide more 
                    information to the court and 
                    the other party.
                </p>
        </div>   
    </div>
<!-- <6> : END-->
<!-- <6A> : BEGIN-->
<div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Parenting arrangements</b>, including parental responsibilities and parenting time</div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('naParentingArrangements')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('agreeParentingArrangements')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('disagreeParentingArrangements')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about parenting arrangements should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 1</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('counterParentingArrangements')?'yes':''" text="I am making a counter application for an order. No application"/>               
        <div style="margin-left:33px">about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about parenting arrangements,
            including parental responsibilities and parenting time?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('noFinalOrderParentingArrangements')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 7</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedParentingArrangementsForm.includes('yesFinalOrderParentingArrangements')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 8</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6A> : END-->
<!-- <6B> : BEGIN-->
<div>
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Child Support</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('naChildSupport')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('agreeChildSupport')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('disagreeChildSupport')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about child support should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 2</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('counterChildSupport')?'yes':''" text="I am making a counter application for an order about child "/>               
        <div style="margin-left:33px">support. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about child support?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('noFinalOrderChildSupport')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 9</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedChildSupportForm.includes('yesFinalOrderChildSupport')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 10</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<div style="float: right;width: 18%; margin-top:20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-file-text />
                    <br />
                    If this family law case includes
                    an application about child
                    support, you must provide
                    your financial information with
                    your reply to the application
                    by completing and filing a
                    Financial Statement in Form 4
                    [Rule 28].                 
</p>
</div>  
    </div>
<!-- <6B> : END-->
<!-- <6C> : BEGIN-->
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Contact with a child</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('naContact')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('agreeContact')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('disagreeContact')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about contact with a child should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 3</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('counterContact')?'yes':''" text="I am making a counter application for an order about contact "/>               
        <div style="margin-left:33px">with a child. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about contact with a child?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('noFinalOrderContact')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 11</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedContactWithChildForm.includes('yesFinalOrderContact')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 12</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6C> : END-->
<!-- <6D> : BEGIN-->
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Guardianship of a child</b> - appointing a new guardian or cancelling guardianship</div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedGuardianshipForm.includes('naguardianship')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedGuardianshipForm.includes('agreeGuardianship')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedGuardianshipForm.includes('disagreeGuardianship')?'yes':''" text='I disagree with the request of the other party. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span>'/>               
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 4</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedGuardianshipForm.includes('counterGuardianship')?'yes':''" text="I am making a counter application for an order to appoint"/>               
        <div style="margin-left:33px">a new guardian or to cancel the guardianship of a child. <span style="font-style:italic;color:#747474;"><br/><b>-> </b>Complete <b>Schedule 13</b></span></div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6D> : END-->
<!-- <6E> : BEGIN-->
<div>
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Spousal support</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('naSpouseSupport')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('agreeSpouseSupport')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('disagreeSpouseSupport')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about spousal support should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 5</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('counterSpouseSupport')?'yes':''" text="I am making a counter application for an order about spousal "/>               
        <div style="margin-left:33px">support. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about spousal support?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('noFinalOrderSpouseSupport')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 14</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSpousalSupportForm.includes('yesFinalOrderSpouseSupport')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 15</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<div style="float: right;width: 18%; margin-top:20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-file-text />
                    <br />
                    If this family law case includes
                    an application about spousal
                    support, you must provide
                    your financial information with
                    your reply to the application
                    by completing and filing a
                    Financial Statement in Form 4
                    [Rule 28].                 
</p>
</div>  
    </div>
<!-- <6E> : END-->
<!-- <6F> : BEGIN-->
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Property division in respect of a companion animal</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('naCompanionAnimal')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('agreeCompanionAnimal')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('disagreeCompanionAnimal')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about companion animal should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 6</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('counterCompanionAnimal')?'yes':''" text="I am making a counter application for an order about property "/>               
        <div style="margin-left:33px">division in respect of a companion animal. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a written agreement about property division in respect of a companion animal?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('noFinalOrderCompanionAnimal')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 16</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedCompanionAnimalForm.includes('yesFinalOrderCompanionAnimal')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 17</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6F> : END-->
<!-- <7> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 7 |  Initial requirements </b>
            </div>
            <div style="margin-top: 1rem;"></div>
            <span style="font-size: 11pt;margin-left:20px"><b>10. </b></span>
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="isAdditionalInfo?'yes':''" text=""/> 
                 <div style="margin-top:-23px;text-indent:47px;margin-left:20px">I understand that I may be required to <b>complete additional requirements</b></div> 
                <div style="text-indent:47px;margin-left:22px"> before filing my application or scheduling a family management </div> 
                <div style="text-indent:47px;margin-left:22px"> conference depending on the court registry where my case is filed, </div> 
                <div style="text-indent:47px;margin-left:22px"> including one or more of the following:</div>        
        </div>   
        <div style="float: right;width: 18%; margin-top: 50px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If the application is in an early resolution registry, you must have already met the early
                    resolution requirements to file your reply [Rule 28].
                </p>
        </div>  
         
    </div>    
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;margin-left:55px;margin-top:-50px;">
            <ul>
                    <li>an online <b>parenting education program</b> (Parenting After Separation)</li>
                    <li>an individual <b>needs assessment</b> with a family justice counsellor</li>
                    <li>at least one <b>consensual dispute resolution session</b>, if applicable</li>
            </ul>
        </div>   
        <div style="float: right;width: 18%; margin-top:-20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about the different registry types and how to meet the requirements, see the guidebook.
                </p>
        </div>        
    </div>    
<!-- <7> : END-->
<!-- <8> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 8 | Lawyer’s statement</b> - <span style="margin-left:2px;margin-top:-40px;font-size:8pt;">Complete this part only if you are a lawyer for the party.
                    </span>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>11.</b><span style="margin-left:12px;color:#747474;font-style: italic;">If you are not a lawyer, you may leave this question blank</span>
                    </div>     
                    <div>
                    <div style="display:inline-flex;">
                          
                        <table>
                        <tr>
                        <td><check-box style="display: block; text-indent: -17px;margin-left:45px;margin-top:-5px;"  :check="yourInfo.lawyerFiling?'yes':''" text=""/></td>
                        <td><div style="margin-left:1px">I,</div></td>
                        <td><div style="margin-left:5px;min-width:150px;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;">{{ yourInfo.lawyerStatement.lawyerName }}</div></td>
                        <td><div style="margin-left:5px;width:95px;">, the lawyer for</div></td>
                        <td><div style="margin-left:5px;min-width:155px;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;">{{ yourInfo.lawyerStatement.clientName }}</div></td>
                        <td><span style="margin-left:5px;">, </span></td>
                        </tr>
                        <tr>
                        <td colspan="2"></td>    
                        <td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of lawyer</div></td>    
                        <td></td>    
                        <td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of party</div></td>   
                        <td></td>   
                        </tr>
                        </table> 
                        <!-- <span style="margin-left:2px">I,</span>   
                        <table style="margin-left:5px;width:80%;">
                            <tr><td><div style="margin-left:5px;width:150px;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;">{{ yourInfo.lawyerStatement.lawyerName }}</div> </td></tr>
                        <tr><td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of lawyer</div></td></tr></table>       
                        <span style="margin-left:5px;width:95px;">, the lawyer for</span>  
                        <table><tr><td><div style="margin-left:5px;min-width:155px;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;">{{ yourInfo.lawyerStatement.clientName }}</div> </td></tr><tr><td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of party</div></td></tr></table>       
                        <span style="margin-left:5px;">, </span>   -->
                    </div>                    
                    <div style="font-size: 11pt;margin-left:55px;">acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>.</div>
               
                </div>                                 
            </div>            
        </div>
    </div>
<!-- <8> : END-->    
<!-- <9> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px; margin-top:10px;">
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 9 |Address for service</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>12. </b></span><span style="margin-left:9px">My <b>address for service</b> of court documents and contact information</span>
                <div style="margin-left:12px;margin-left:35px;"> is:</div>
                <div style="margin-left:29px;font-size: 11pt;text-indent:5px;">
                    <i>You must provide an address for service and contact number, but it does </i>
                </div>
                <div style="margin-left:29px;font-size: 11pt;text-indent:5px;">
                    <i>not have to be your own if you don’t want to</i>
                </div>
                
                
                <table class="compactfullsize" style="width:95%;margin-top:0.5 !important; margin-left: 32px; font-size: 9pt; background-color: #dedede;">
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

                    <table class="compactfullsize" style="width:95%;margin-top:0.5 !important; margin-left: 32px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="width:95%;margin-top:0.5 !important; margin-left: 32px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer’s name and firm name (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable): </td>
                        </tr>
                    </table>
                
                
            </div>
        </div>
        
        <div style="float: right;width: 18%; margin-top: 45px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about how this information will be used and who will have access to it, see the guidebook.
                </p>
        </div>
        
    </div>
<!-- <9> : END-->

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
import { locationInfoDataInfoType, existingOrdersInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { rflmBackgroundSurveyDataInfoType, rflmQuestionnaireDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';
import { agreeDisagreeInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { schedule101DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

import { animalRelationshipToOtherPartyDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/CompanionAnimal';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedSchedules!: string[];  

    @Prop({required:true})
    agreeDisagreeResults!: agreeDisagreeInfoType;
    
    dataReady = false;
    includesCounter = false;
    aboutChildren = false;
    counterAboutChildren = false;

    locationInfo = {} as locationInfoDataInfoType;

    otherPartyInfo='';
    yourInfo = {} as yourInformationInfoDataInfoType;
    
    existingOrders = {} as existingOrdersInfoType;    
    replyNewCompInfo = {} as schedule101DataInfoType;
    childrenInfo = []
    counterChildrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    childBestInterestAcknowledmentCheckCounter = false;
    incorrectChildInfo = false;
    culturalInfo = '';
    selectedParentingArrangementsForm = [];
    selectedChildSupportForm = [];
    selectedContactWithChildForm = [];
    selectedGuardianshipForm = [];
    selectedSpousalSupportForm = [];
    selectedCompanionAnimalForm = [];
    isAdditionalInfo = false;
    isRelationshipCorrect = false;
    relationshipDetails = ''


    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }

    childrenCorrectionFields=[
        {key:"fullName",               label:"Child's full name",                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
    ]  
   
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"Other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]   

    public extractInfo(){     

        this.includesCounter = this.result.rflmCounterAppSurvey.counter == 'Yes';
        
        this.existingOrders = this.getExistingOrdersInfo();
        const rflmQuestionnaireInfo: rflmQuestionnaireDataInfoType = this.result.rflmQuestionnaireSurvey;
        const counterList: string[] = this.result.rflmCounterAppSurvey?.counterList;    
        
        const childRelatedApplication = ( 
            rflmQuestionnaireInfo.selectedParentingArrangementsForm.length > 0 || 
            rflmQuestionnaireInfo.selectedChildSupportForm.length > 0 ||
            rflmQuestionnaireInfo.selectedContactWithChildForm.length > 0 || 
            rflmQuestionnaireInfo.selectedGuardianshipForm.length > 0 
        )
        this.selectedParentingArrangementsForm = rflmQuestionnaireInfo.selectedParentingArrangementsForm.length > 0 ? rflmQuestionnaireInfo.selectedParentingArrangementsForm : [];
        this.selectedChildSupportForm = rflmQuestionnaireInfo.selectedChildSupportForm.length > 0 ? rflmQuestionnaireInfo.selectedChildSupportForm : [];
        this.selectedContactWithChildForm = rflmQuestionnaireInfo.selectedContactWithChildForm.length > 0 ? rflmQuestionnaireInfo.selectedContactWithChildForm : [];
        this.selectedGuardianshipForm = rflmQuestionnaireInfo.selectedGuardianshipForm.length > 0 ? rflmQuestionnaireInfo.selectedGuardianshipForm : [];
        this.selectedSpousalSupportForm = rflmQuestionnaireInfo.selectedSpousalSupportForm.length > 0 ? rflmQuestionnaireInfo.selectedSpousalSupportForm : [];
        this.selectedCompanionAnimalForm = rflmQuestionnaireInfo.selectedCompanionAnimalForm.length > 0 ? rflmQuestionnaireInfo.selectedCompanionAnimalForm : [];
        if (childRelatedApplication){
            this.aboutChildren = true;
            this.incorrectChildInfo = this.result.correctChildInfo == 'No';
            if (this.incorrectChildInfo && this.result.childrenInfoSurvey?.length > 0){           
                this.childrenInfo = this.getChildrenInfo();
            } else {
                this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            }
            this.childBestInterestAcknowledmentCheck = this.result.rflmChildBestInterestAcknowledgement;
                       
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            this.childBestInterestAcknowledmentCheck = false;
            this.incorrectChildInfo = false;
        }        

        const childRelatedCounterApplication = this.includesCounter && (
            counterList.includes('parentingArrangements') ||
            counterList.includes('childSupport') || 
            counterList.includes('contactWithChild') ||
            counterList.includes('guardianOfChild'))

        if (childRelatedCounterApplication && this.result.childrenInfoSurvey?.length > 0){
            this.counterAboutChildren = true;
            this.counterChildrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheckCounter = this.result.rflmChildBestInterestAcknowledgement;            
        } else {
            this.counterAboutChildren = false;
            this.counterChildrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            this.childBestInterestAcknowledmentCheckCounter = false;
        }        

        if (this.result.rflmBackgroundSurvey?.likeToAddCulturalExplanation == 'y' && this.result.rflmBackgroundSurvey?.culturalExplain){
            this.culturalInfo = this.result.rflmBackgroundSurvey.culturalExplain;
        } else {
            this.culturalInfo = '';
        } 
        
        this.otherPartyInfo = this.getOtherPartyInfo();
        this.yourInfo = this.getYourInfo();     
        this.locationInfo = this.getLocationInfo();  
        this.isAdditionalInfo = this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs;

        let replyNewCompanionInfo = {} as schedule101DataInfoType;


        if (this.result.animalRelationshipToOtherPartySurvey){
            const animalRelationshipToOtherPartyData: animalRelationshipToOtherPartyDataInfoType = this.result.animalRelationshipToOtherPartySurvey;
            this.isRelationshipCorrect = animalRelationshipToOtherPartyData.otherPartyIsSpouse == 'y';
            if (!this.isRelationshipCorrect){
                this.relationshipDetails = animalRelationshipToOtherPartyData.otherPartyRelationshipDesc?animalRelationshipToOtherPartyData.otherPartyRelationshipDesc:'';
            }
        }
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

        if (this.result.rflmBackgroundSurvey){
            const backgroundInfo: rflmBackgroundSurveyDataInfoType = this.result.rflmBackgroundSurvey
            existing.existingFlm = backgroundInfo.ExistingOrdersFLM == 'y' || backgroundInfo.otherPartyAttach == 'n';
            existing.existingPO =  backgroundInfo.existingPOOrdersAttached == 'n';
        }        

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
                name: {'first': '','middle': '', 'last': ''}                
            }               
        ];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];    
            for(const party of this.result.otherPartyCommonSurvey){
                if (party.name){
                    const otherParty = Vue.filter('getFullName')(party.name)
                    OpInformation.push(otherParty)
                }                    
            }
        } 

        return OpInformation.join(', ')
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>