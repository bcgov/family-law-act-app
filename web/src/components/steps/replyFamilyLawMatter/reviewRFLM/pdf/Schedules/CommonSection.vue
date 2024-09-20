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
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
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
    <div style="float: right;width: 18%; margin-top: -65px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about case management orders, see the guidebook. 
                </p>
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
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="''" text="The <b>information</b> set out in Part 4 of the Application About a Family Law Matter <b>about the relationship between the parties is correct</b>."/>               
                    </div>
                    <div>
                        <check-box style="display: block; text-indent: -17px;margin-left:45px"  :check="''" text="The <b>information</b> set out in Part 4 of the Application About a Family Law Matter
                        <b>about the relationship between the parties is not correct</b> as follows:"/>               
                    </div>
                    <div style="font-size: 11pt;margin-left:55px;"><span style="color:#747474;font-style: italic;">Identify the information you say is not correct and set out the correct information</span></div>
               
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
                    <table v-if="counterChildrenInfo && counterChildrenInfo.length >=1" style="width:85%;margin-left:52px; border-collapse: collapse;">
                    <tbody>
                    <tr 
                    v-for="data in counterChildrenInfo">
                    <td style="border-right: 2px solid #fff;width:30%"><div style="background-color: #d6d6d6">{{ data.fullName }}</div></td>
                    <td style="border-right: 2px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.dob }}</div></td>
                    <td style="border-right: 2px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.myRelationship }}</div></td>
                    <td style="border-right: 2px solid #fff;text-align: center;width:20%"><div style="background-color: #d6d6d6">{{ data.otherPartyRelationship }}</div></td>
                    <td style="border-right: 2px solid #fff;text-align: center;width:10%"><div style="background-color: #d6d6d6">{{ data.currentSituation }}</div></td>
                    </tr>
                    </tbody>    
                    </table>    
                    <table v-else style="width:85%;margin-left:52px; border-collapse: collapse;">
                    <tbody>
                    <tr>
                    <td style="border-right: 2px solid #fff;width:30%"><div style="background-color: #d6d6d6;margin-bottom:20px;"></div></td>
                    <td style="border-right: 2px solid #fff;width:20%"><div style="background-color: #d6d6d6;margin-bottom:20px;"></div></td>
                    <td style="border-right: 2px solid #fff;width:20%"><div style="background-color: #d6d6d6;margin-bottom:20px;"></div></td>
                    <td style="border-right: 2px solid #fff;width:20%"><div style="background-color: #d6d6d6;margin-bottom:20px;"></div></td>
                    <td style="border-right: 2px solid #fff;width:10%"><div style="background-color: #d6d6d6;margin-bottom:20px;"></div></td>
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
            <div>
                    <div >
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
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 4 |  About us  </b>                    
            </div>     
        </div>
               
 
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>6. </b></span><span style="margin-left:12px;">I would like to share the following information with the court about the
                 </span>   
                 <div style="margin-left:30px;"><b>cultural, linguistic, religious and spiritual upbringing and heritage of my family</b> including,
                    if the child is an Indigenous child, the child’s Indigenous identity:
                 </div>   
                 <div style="margin-left:30px;color:#747474;font-style: italic;">You may choose to leave this question blank</div>        
                 
                <div v-if="culturalInfo && culturalInfo.length > 0" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:30px;min-height:200px;">
                    {{culturalInfo}} 
                </div>
                <div v-else style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:30px;min-height:200px;"></div>                
                
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
                <span style="font-size: 11pt;"><b>7. </b></span><span style="margin-left:12px;">There is an <b>existing court order or written agreement</b> about parenting
                 </span>   
                 <div style="margin-left:30px;">arrangements, child support, contact with a child, guardianship of a child, spousal support, and/or property division in respect of a 
                    companion animal that was <b>not provided by the other party</b> with their application.
                 </div>   
                 <table style="margin-left:25px;">
                <tr>
                <td style="width:400px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="existingOrders.existingFlm?'yes':''" text='<b>Yes <span style="color:#747474;"></check-box>(see attached copy)</span></b>'/>
                </td>
                <td style="width:40%">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="!existingOrders.existingFlm?'yes':''" text="<b>No</b>"/> 
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
                <span style="font-size: 11pt;"><b>8. </b></span><span style="margin-left:12px;">There is an <b>existing court order, agreement or plan protecting</b> 
                 </span>   
                 <div style="margin-left:30px;">one of the parties or the child(ren), or restraining contact between the parties, that was <b>not provided by the other party with their application</b>, including:
                 </div>
                 <ul style="margin-left:20px;">
                    <li>a protection order,</li>
                    <li>an order, agreement or plan involving child protection services, or</li>
                    <li>a peace bond, restraining order, bail condition or other criminal order.</li>
                </ul>   
                 <table style="margin-left:25px;margin-top:-10px;">
                <tr>
                <td style="width:400px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="existingOrders.existingPO?'yes':''" text='<b>Yes <span style="color:#747474;"></check-box>(see attached copy)</span></b>'/>
                </td>
                <td style="width:40%">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="!existingOrders.existingPO?'yes':''" text="<b>No</b>"/> 
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
                    Copy the other party’s name from their application.. 
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
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 7</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 8</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6A> : END-->
<!-- <6B> : BEGIN-->
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Child Support</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about child support should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 2</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I am making a counter application for an order about child "/>               
        <div style="margin-left:33px">support. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about child support?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 9</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 10</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
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
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about contact with a child should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 3</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I am making a counter application for an order about contact "/>               
        <div style="margin-left:33px">with a child. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about contact with a child?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 11</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 12</b></span>'/> 
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
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='I disagree with the request of the other party. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span>'/>               
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 4</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I am making a counter application for an order to appoint"/>               
        <div style="margin-left:33px">a new guardian or to cancel the guardianship of a child. <span style="font-style:italic;color:#747474;"><br/><b>-> </b>Complete <b>Schedule 13</b></span></div>
    </tr>            
</table>
</div>
</div>
</div>
<!-- <6D> : END-->
<!-- <6E> : BEGIN-->
    <div style="width: 80%; float: left; margin-right: 10px;">
    <div style="text-indent: -0px;margin-left:20px;">
<div style="border-style: solid; border-color: black; float: left; margin-top: 10px;width: 95%;padding:0.5rem; border-width:1px;">       
    <div><b>Spousal support</b></div>
    <table>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about spousal support should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 5</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I am making a counter application for an order about spousal "/>               
        <div style="margin-left:33px">support. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a final order or written agreement about spousal support?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 14</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 15</b></span>'/> 
        </div>
    </tr>            
</table>
</div>
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
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="Not applicable"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I agree with the request of the other party"/>               
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I disagree with the request of the other party. A different order "/>               
        <div style="margin-left:33px">about companion animal should be made. <span style="font-style:italic;color:#747474;"><b>-></b> Complete</span></div>
        <div style="margin-left:33px;font-style:italic;color:#747474;"><b>Schedule 6</b></div>
    </tr>
    <tr>
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text="I am making a counter application for an order about property "/>               
        <div style="margin-left:33px">division in respect of a companion animal. No application about this family law matter was made by the other party.</div>
        <div style="margin-left:33px;color:#747474;padding-right:5px;">Do you have a written agreement about property division in respect of a companion animal?</div>
        <div style="margin-left:30px">
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='No <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 16</b></span>'/> <br/>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="selectedSchedules.includes('schedule11')?'yes':''" text='Yes <span style="font-style:italic;color:#747474;"><b>-> </b>Complete <b>Schedule 17</b></span>'/> 
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
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="''" text=""/> 
                 <div style="margin-top:-23px;text-indent:47px;margin-left:20px">I understand that I may be required to <b>complete additional requirements</b></div> 
                <div style="text-indent:47px;margin-left:22px"> before filing my application or scheduling a family management </div> 
                <div style="text-indent:47px;margin-left:22px"> conference depending on the court registry where my case is filed, </div> 
                <div style="text-indent:47px;margin-left:22px"> including one or more of the following:</div>        
        </div>   
        <div style="float: right;width: 18%; margin-top: 50px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    To apply with notice, you can file an Application for Case Management Order Form 10.
                </p>
        </div>      
    </div>    
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;margin-left:55px;margin-top:-10px;">
            <ul>
                    <li>an online <b>parenting education program</b> (Parenting After Separation)</li>
                    <li>an individual <b>needs assessment</b> with a family justice counsellor</li>
                    <li>at least one <b>consensual dispute resolution session</b>, if applicable</li>
            </ul>
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
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="''" text=""/>     
                        <span>I,</span>   
                        <table><tr><td><div style="margin-left:5px;min-width: 160x;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;"></div> </td></tr><tr><td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of lawyer</div></td></tr></table>       
                        <span style="margin-left:5px;">, the lawyer for</span>  
                        <table><tr><td><div style="margin-left:5px;min-width: 160px;min-height:25px;background-color: #dedede;padding:2px;margin-bottom:10px;"></div> </td></tr><tr><td><div style="text-align:center;margin-top:-15px;font-size:7pt;">Full name of party</div></td></tr></table>       
                        <span style="margin-left:5px;">, </span>  
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
<!-- <3> : END--> 
<!-- <Page 1> -->
<!-- <HEADER> -->
<!-- <1> -->
        <!-- <section>
            <underline-form 
                style="text-indent:2px;display:inline-block;" 
                textwidth="16rem" 
                beforetext="The Application About a Family Law Matter was filed by" 
                hint="full name of the other party" :italicHint="false" :text="otherPartyInfo"/>
            <div style="text-indent:5px;display:inline;">
                 . They are the other party in this case.
            </div>
            
        </section> -->
<!-- <2> -->
        <!-- <section>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents are:</div>
            <table class="fullsize">
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
            </table>
        </section> -->

        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>Lawyer’s statement</b></div>
            <section>
                <div style="display:inline; margin-left:0.25rem">Complete this section only if you are a lawyer for the party. You may leave this section blank.</div>
                <div>
                    <check-box  inline="inline" boxMargin="0" style="margin:0 0 0 1rem;display:inline" :check="yourInfo.lawyerFiling?'yes':''" text=""/>
                    <underline-form style="text-indent:0px;display:inline;" textwidth="15.5rem" beforetext="I, " hint="full name of lawyer" :text="yourInfo.lawyerStatement.lawyerName"/>
                    <underline-form style="text-indent:2px;display:inline;" textwidth="16.25rem" beforetext=", the lawyer for" hint="full name of party" :text="yourInfo.lawyerStatement.clientName"/>
                    <div style="display:inline;">, acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>. </div>
                </div>           
            </section>
        </div>       -->
         
        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
            <section>
                <i style="display:inline; margin-left:0.25rem">Select only one of the options below</i>          
                <div style="margin-left:1.5rem">
                    <check-box  :check="!aboutChildren?'yes':''" text="The application does not ask for any order(s) about a child or children <i>(skip ahead to section 6)</i>"/>
                    <check-box  :check="aboutChildren && !incorrectChildInfo?'yes':''" text="The other party correctly provided the name and date of birth of each child involved in the application"/>
                    <check-box  :check="aboutChildren && incorrectChildInfo?'yes':''" text="The following is the correct name and date of birth of each child involved in the application:"/>
                    <i>If you have selected this option, please provide the name and date of birth of ALL the children</i>
                </div>
                <b-table
                    :items="childrenInfo"
                    :fields="childrenCorrectionFields"
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
        </div> -->

<!-- <5> -->
        <!-- <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="aboutChildren && childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section> -->
       
        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>About us</b></div>
            <section>
                <i style="display:inline; margin-left:0.25rem">You may choose to complete this section or leave this section blank</i>
                <div style="margin-left:.5rem; text-indent:0rem;">
                    I would like to share the following information with the court about the cultural, linguistic, religious and spiritual 
                    upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
                <div style="margin-left:.5rem; text-indent:0rem;"></div>
                <div v-if="culturalInfo.length > 0" class="answerbox">{{culturalInfo}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>  
        </div>  -->

        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>Existing written agreements or court orders</b></div>
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    There is an existing agreement or court order about parenting arrangements, 
                    child support, contact with a child, guardianship of a child, spousal support, 
                    and/or property division in respect of a companion animal that was not provided 
                    by the other party with their application.
                </div>          
                <div style="margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                    <i style="display:block">If yes, attach a copy of the agreement(s) or order(s) to your reply</i>
                </div>
            </section>
        </div> -->

 <!-- <8> -->
        <!-- <section> 
            <div style="display:inline; margin-left:0.25rem">
                There is an existing court order, agreement or plan protecting one of the parties or the child(ren), or
                restraining contact between the parties, including a protection order, an order, agreement or plan involving
                child protection services, or a peace bond, restraining order, bail condition or other criminal order that 
                was not provided by the other party with their application
            </div>            
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                <i style="display:block">If yes, attach a copy of the order(s), agreement(s) or plan(s) to your reply</i>
            </div>
        </section>    -->

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Initial requirements</b></div>
            <section> 
                I am filing my application in:
                <check-box 
                    style="margin:0 0 0 1rem;" 
                    :check="locationInfo.earlyResolutionRegistry?'yes':''" 
                    text="an early resolution registry and I have met the following requirements:<br/><i>The requirements have been met if you <span style='text-decoration: underline;'>completed or participated in</span>, or if <span style='text-decoration: underline;'>you were granted an exemption</span> from completing or participating in, the following: <br/>Select all options that apply.</i>"/>
                <div style="margin:0 0 0 2.75rem;">
                    <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="needs assessment"/>
                    <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="parenting education program"/>
                    <check-box  :check="locationInfo.earlyResolutionRegistry?'yes':''" text="consensual dispute resolution"/>
                </div>
                <check-box 
                    style="margin:0.25rem 0 0 1rem;" 
                    :check="locationInfo.familyJusticeRegistry?'yes':''" 
                    text="a family justice registry and I understand I will be required to participate in a needs assessment and complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                <check-box 
                    style="margin:0.25rem 0 0 1rem;" 
                    :check="locationInfo.educationRegistry?'yes':''" 
                    text="a parenting education program registry and I understand I will be required to complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Replying to the other party</b></div>
            <div style="margin-top:1rem;"><b>Agreement with order(s)</b></div>
<!-- <10> -->
            <section>
                <b style="margin-left:0.25rem">I agree with the following order(s) applied for by the other party:</b><br>
                <i>
                    Refer to the Application About a Family Law Matter schedules as referenced below to assist in completing
                    this section.
                </i><br>
                <i>Select all options that apply</i>
                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.5rem;"><b>Parenting arrangements</b></div>
                    <div style="margin-top:0.25rem;">Parenting arrangements – new <i>[see Schedule 1 of Application About a Family Law Matter]</i></div>
                    <check-box 
                        :check="agreeDisagreeResults.newParentResp.opApplied && agreeDisagreeResults.newParentResp.agree?'yes':''" 
                        text="parental responsibilities"/>
                    <check-box 
                        :check="agreeDisagreeResults.newParentTime.opApplied && agreeDisagreeResults.newParentTime.agree?'yes':''" 
                        text="parenting time"/>
                    <check-box 
                        :check="agreeDisagreeResults.newParentTimeConditions.opApplied && agreeDisagreeResults.newParentTimeConditions.agree?'yes':''" 
                        text="conditions on parenting time"/>
                    
                    <div style="margin-top:0.25rem;">Parenting arrangements order/agreement – existing <i>[see Schedule 2 of Application About a Family Law Matter]</i></div>
                    <check-box 
                        :check="agreeDisagreeResults.existingParentResp.opApplied && agreeDisagreeResults.existingParentResp.agree?'yes':''" 
                        text="change to parental responsibilities"/>
                    <check-box 
                        :check="agreeDisagreeResults.existingParentTime.opApplied && agreeDisagreeResults.existingParentTime.agree?'yes':''" 
                        text="change to parenting time"/>
                    <check-box 
                        :check="agreeDisagreeResults.existingParentTimeConditions.opApplied && agreeDisagreeResults.existingParentTimeConditions.agree?'yes':''" 
                        text="change to conditions on parenting time"/>
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box  
                        :check="agreeDisagreeResults.newChildSupport.opApplied && agreeDisagreeResults.newChildSupport.agree?'yes':''" 
                        text="child support – new <i>[see Schedule 3 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="agreeDisagreeResults.existingChildSupport.opApplied && agreeDisagreeResults.existingChildSupport.agree?'yes':''" 
                        text="child support order/agreement – existing <i>[see Schedule 4 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box  
                        :check="agreeDisagreeResults.newChildContact.opApplied && agreeDisagreeResults.newChildContact.agree?'yes':''" 
                        text="contact with a child – new <i>[see Schedule 5 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="agreeDisagreeResults.existingChildContact.opApplied && agreeDisagreeResults.existingChildContact.agree?'yes':''" 
                        text="contact order/agreement – existing <i>[see Schedule 6 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box  
                        :check="agreeDisagreeResults.appointGuardian.opApplied && agreeDisagreeResults.appointGuardian.agree?'yes':''" 
                        text="appointing a guardian of a child <i>[see Schedule 7 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="agreeDisagreeResults.cancelGuardian.opApplied && agreeDisagreeResults.appointGuardian.agree?'yes':''" 
                        text="cancelling guardianship of a child <i>[see Schedule 8 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box  
                        :check="agreeDisagreeResults.newSpouseSupport.opApplied && agreeDisagreeResults.newSpouseSupport.agree?'yes':''" 
                        text="spousal support – new <i>[see Schedule 9 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="agreeDisagreeResults.existingSpouseSupport.opApplied && agreeDisagreeResults.existingSpouseSupport.agree?'yes':''" 
                        text="spousal support order/agreement – existing <i>[see Schedule 10 of Application About a Family Law Matter]</i>"/>                    
                </div>  
                
                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Property division</b></div>
                    <check-box  
                        :check="agreeDisagreeResults.newCompanionAnimal.opApplied && agreeDisagreeResults.newCompanionAnimal.agree?'yes':''" 
                        text="in respect of a companion animal – new <i>[see Schedule 11 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="agreeDisagreeResults.existingCompanionAnimal.opApplied && agreeDisagreeResults.existingCompanionAnimal.agree?'yes':''" 
                        text="companion animal agreement – existing <i>[see Schedule 12 of Application About a Family Law Matter]</i>"/>                    
                </div>
              
            </section>
        </div>

          <div class="print-block">            
            <div style="margin-top:1rem;"><b>Disagreement with order(s)</b></div>
<!-- <11> -->
            <section>
                <b style="margin-left:0.25rem">I do not agree to all or part of the following order(s) applied for by the other party:</b><br>
                <i>
                    Refer to the Application About a Family Law Matter schedules to assist in completing this section.
                </i>
                <i>Select all options that apply, complete and attach the required schedule(s).</i>
                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Parenting arrangements</b></div>
                    <div style="margin-top:0.25rem;">Parenting arrangements – new <i>[complete and attach Schedule 1]</i></div>
                    <check-box 
                        :check="!agreeDisagreeResults.newParentResp.agree && agreeDisagreeResults.newParentResp.opApplied?'yes':''" 
                        text="parental responsibilities"/>
                    <check-box 
                        :check="!agreeDisagreeResults.newParentTime.agree && agreeDisagreeResults.newParentTime.opApplied?'yes':''" 
                        text="parenting time"/>
                    <check-box 
                        :check="!agreeDisagreeResults.newParentTimeConditions.agree && agreeDisagreeResults.newParentTimeConditions.opApplied?'yes':''" 
                        text="conditions on parenting time"/>
                    
                    <div style="margin-top:0.25rem;">Parenting arrangements order/agreement – existing <i>[complete and attach Schedule 2]</i></div>
                    <check-box 
                        :check="!agreeDisagreeResults.existingParentResp.agree && agreeDisagreeResults.existingParentResp.opApplied?'yes':''" 
                        text="change to parental responsibilities"/>
                    <check-box 
                        :check="!agreeDisagreeResults.existingParentTime.agree && agreeDisagreeResults.existingParentTime.opApplied?'yes':''" 
                        text="change to parenting time"/>
                    <check-box 
                        :check="!agreeDisagreeResults.existingParentTimeConditions.agree && agreeDisagreeResults.existingParentTimeConditions.opApplied?'yes':''" 
                        text="change to conditions on parenting time"/>
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box  
                        :check="!agreeDisagreeResults.newChildSupport.agree && agreeDisagreeResults.newChildSupport.opApplied?'yes':''" 
                        text="child support – new <i>[complete and attach Schedule 3]</i>"/>
                    <check-box  
                        :check="!agreeDisagreeResults.existingChildSupport.agree && agreeDisagreeResults.existingChildSupport.opApplied?'yes':''" 
                        text="child support order/agreement – existing <i>[complete and attach Schedule 4]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box  
                        :check="!agreeDisagreeResults.newChildContact.agree && agreeDisagreeResults.newChildContact.opApplied?'yes':''" 
                        text="contact with a child – new <i>[complete and attach Schedule 5]</i>"/>
                    <check-box  
                        :check="!agreeDisagreeResults.existingChildContact.agree && agreeDisagreeResults.existingChildContact.opApplied?'yes':''" 
                        text="contact order/agreement – existing <i>[complete and attach Schedule 6]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box  
                        :check="!agreeDisagreeResults.appointGuardian.agree && agreeDisagreeResults.appointGuardian.opApplied?'yes':''" 
                        text="appointing a guardian of a child <i>[complete and attach Schedule 7]</i>"/>
                    <check-box  
                        :check="!agreeDisagreeResults.cancelGuardian.agree && agreeDisagreeResults.cancelGuardian.opApplied?'yes':''" 
                        text="cancelling guardianship of a child <i>[complete and attach Schedule 8]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box  
                        :check="!agreeDisagreeResults.newSpouseSupport.agree && agreeDisagreeResults.newSpouseSupport.opApplied?'yes':''" 
                        text="spousal support – new <i>[complete and attach Schedule 9]</i>"/>
                    <check-box  
                        :check="!agreeDisagreeResults.existingSpouseSupport.agree && agreeDisagreeResults.existingSpouseSupport.opApplied?'yes':''" 
                        text="spousal support order/agreement – existing <i>[complete and attach Schedule 10]</i>"/>                    
                </div> 
                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Property division</b></div>
                    <check-box  
                        :check="!agreeDisagreeResults.newCompanionAnimal.agree && agreeDisagreeResults.newCompanionAnimal.opApplied?'yes':''" 
                        text="in respect of a companion animal – new <i>[complete and attach Schedule 10.1]</i>"/>
                    <check-box  
                        :check="!agreeDisagreeResults.existingCompanionAnimal.agree && agreeDisagreeResults.existingCompanionAnimal.opApplied?'yes':''" 
                        text="companion animal agreement – existing <i>[complete and attach Schedule 10.2]</i>"/>                    
                </div>
              
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
            <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                <b>If this family law case includes an application about support, you must provide your financial information with
                    your reply to the application by completing and filing a Financial Statement in Form 4. 
                </b>
            </div>
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

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Making a counter application</b></div>
            <div style="margin-top:1rem;">
                <i>
                    Complete this section only if, in addition to replying to the other party’s application, you want to apply for an
                    order about a family law matter that the other party did not make an application about in section 6 of their
                    Application About a Family Law Matter                    
                </i>
            </div>

            <section>
                <b style="margin-left:0.25rem">I am applying for a court order about the following family law matter(s):</b><br>                
                <i>Select all options that apply, complete and attach the required schedule(s)</i>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Parenting arrangements</b></div>
                    <div style="margin-top:0.25rem;"></div>
                    <check-box 
                        :check="selectedSchedules.includes('schedule11')?'yes':''" 
                        text="Parenting arrangements – new <i>[complete and attach Schedule 11]</i> including parental responsibilities and parenting time"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule12')?'yes':''" 
                        text="Parenting arrangements order/agreement – existing <i>[complete and attach Schedule 12]</i> including parental responsibilities and parenting time"/>
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule13')?'yes':''" 
                        text="child support – new <i>[complete and attach Schedule 13]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule14')?'yes':''" 
                        text="child support order/agreement – existing <i>[complete and attach Schedule 14]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule15')?'yes':''" 
                        text="contact with a child – new <i>[complete and attach Schedule 15]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule16')?'yes':''" 
                        text="contact order/agreement – existing <i>[complete and attach Schedule 16]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule17')?'yes':''" 
                        text="appointing a guardian of a child <i>[complete and attach Schedule 17]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule18')?'yes':''" 
                        text="cancelling guardianship of a child <i>[complete and attach Schedule 18]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule19')?'yes':''" 
                        text="spousal support – new <i>[complete and attach Schedule 19]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule20')?'yes':''" 
                        text="spousal support order/agreement – existing <i>[complete and attach Schedule 20]</i>"/>                    
                </div>  
                
                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Property division</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule21')?'yes':''" 
                        text="in respect of a companion animal – new <i>[complete and attach Schedule 21]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule22')?'yes':''" 
                        text="companion animal agreement – existing <i>[complete and attach Schedule 22]</i>"/>                    
                </div>
              
            </section>
        </div>

        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>

            <section>
                <i style="display:inline; margin-left:0.25rem">Select only one of the options below and complete the required information</i>          
                <div style="margin-left:1.5rem">
                    <check-box  
                        :check="includesCounter && !counterAboutChildren?'yes':''" 
                        text="My counter application does not ask for any order(s) about a child or children <i>(skip section 14)</i>"/>
                    <check-box  
                        :check="includesCounter && counterAboutChildren?'yes':''" 
                        text="My counter application is asking for an order(s) about the following child or children:"/>                   
                </div>
                <b-table
                    :items="counterChildrenInfo"
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
        </div> -->

<!-- <14> -->
        <!-- <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="counterAboutChildren && childBestInterestAcknowledmentCheckCounter?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section> -->

        <!-- <div class="print-block">
            <div style="margin-top:1rem;"><b>Note to the other party:</b></div>
            <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                <b>
                    If the reply includes a counter application, you may reply to the counter application by filing a Reply to a
                    Counter Application in Form 8, and any additional documents that may be required to be filed, within 30 days
                    after the date you receive the reply with counter application.
                </b>
            </div>
        </div> -->


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
   
    childrenInfo = []
    counterChildrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    childBestInterestAcknowledmentCheckCounter = false;
    incorrectChildInfo = false;
    culturalInfo = '';
    selectedParentingArrangementsForm = [];
   
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
        console.log(this.selectedParentingArrangementsForm);
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