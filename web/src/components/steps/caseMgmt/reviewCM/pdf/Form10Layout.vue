<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> : BEGIN -->
    <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Application for Case Management Order</b></div>
                <div style="font-size:12pt;"><b>Form 10</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 54, 55, 62, 63, 64, 83,</div> 
                <div>118 and 159</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align: right;padding-right:5px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align: right;padding-right:5px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ locationInfo.existingFileNumber ? locationInfo.existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align: right;padding-right:5px;"> Document number:<br/><span style="color:#747474;font-size:7pt">For registry use only </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>
        <div style="width: 80%;float: left; padding:0.3rem;">
            This Application for Case Management Order sets out the details of a case management order 
            that a person is applying for. The order requested may be made without a court appearance 
            with the consent of all other parties including any person directly affected by the order or at a 
            court appearance with notice to each party and any other person who may be directly affected 
            by the order.
        </div>
        <div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; padding:0.3rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">You can use this form to apply for a case management order by consent without
                attending before the court, or to request a court appearance for the order.
                </div>
            </li>
            <li><div style="margin-left:9px;">For guidance filling in this form, please read the guidebook. The guide is available
                online at <a style="color:#1C35F4;" href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
            </div>
            </li>
            
        </ul>
    </div>    
    </div>
<!-- <HEADER> : END -->

<!-- <1> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 1 | About the parties and any other person who may be directly affected</b>
            </div>
             <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>1.</b><span style="margin-left:12px;"><b>My full name</b> is:</span>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="372px"
                        beforetext="" hint="Full name of party/person" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <span style="margin-left:25px;">My <b>date of birth</b> is:</span>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="350px"
                        beforetext="" hint="(dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="145px" :text="yourInfo.dob | beautify-date-full" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>2.</b><span style="margin-left:12px;">The <b>other party’s full name </b>is:</span>
                    </div>
                    <!-- <div v-for="otherparty,inx in otherPartyInfo" :key="inx" style="display:inline;background-color:#dedede;"> -->
                    <!-- <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;background-color:#dedede;"
                        textwidth="270px" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="Full name of party/parties" 
                        :italicHint="false" 
                        textBackgroundColor="#dedede"
                        hintMargin="80px"
                        :text="otherparty.name | getFullName"/> -->
                        <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;margin-bottom:10px;"
                        textwidth="270px" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="Full name of party/parties" 
                        textBackgroundColor="#dedede" hintMargin="80px"
                        :italicHint="false" 
                        :text="otherPartyInfo[0].name | getFullName"/> 
                        <div style="margin-left:232px;padding:0px;margin-top:-10px;">
                    <div v-if="otherPartyInfo.length > 1" v-for="otherparty,inx in otherPartyInfo.slice(1)" :key="inx" style="font-size: 9pt; display:inline;padding:10px;">
                        <div style="margin-top:-10px">
                    <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;"
                        textwidth="270px" 
                        :beforetext="inx>0? '' : '' " 
                        hint="" 
                        textBackgroundColor="#dedede" hintMargin="80px"
                        :italicHint="false" 
                        :text="otherparty.name | getFullName"/> 
                    </div>
                    </div> 
                </div> 
                        
                        
                        
                    <!-- </div>                     -->
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>3.</b><span style="margin-left:12px;color:#747474;"><i>Complete only if applicable. You may leave this question blank:</i></span>
                        <div style="margin-left:28px;">The following other person(s) who may be directed affected by the order is/are:</div>
                    </div>
                    <div>
                    <div v-if="form10Info.otherPersonsList" style="background-color: #626262">{{ form10Info.otherPersonsList }}</div>
                    <div v-else style="background-color: #dedede;font-size: 11pt;margin-left:25px;min-height:25px;"></div>                
                    <div style="font-size:6pt;text-align: center">Full name of other person(s)</div>
                    </div>
                    <!-- <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="510px"
                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="200px" :text="" /> -->
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    A case management order may be about something that a person who is not a party 
                    needs to do, for example a family justice counsellor. If it is, they also need to be identified.
                </p>
        </div>
    </div>
<!-- <1> : END-->
<!-- <2> : BEGIN-->
    <div style="page-break-after:always;">
        <div style="width: 80%; float: left; margin-right: 10px;margin-top:-10px">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 | Information about children</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>4.</b><span style="margin-left:12px;"><span style="color:#747474;font-style:italic">Select the correct option below and provide the additional information</span></span>
                        <div style="margin-left:25px;"><span style="color:#747474;font-style:italic">if applicable</span></div>
                    </div>     
                    <div>
                    <div style="text-indent: 20px;">
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="childRelatedType == 'Not a party to the case'?'yes':''" text="I am not a party to the case"/>               
                    </div>
                    <div style="text-indent: 20px;">
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="childRelatedType == 'A party to the case and the case does not involve a child-related issue'?'yes':''" text="I am a party to the case and the case <b>does not involve a child</b>-related"/>               
                        <div  style="display: inline; margin-left:52px">case</div>
                    </div>                    
                </div>                                 
            </div>            
        </div>               
    </div>  
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin-left:17px;margin-top:-8px">
                    <div style="text-indent: 20px;">
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="childRelatedType == 'A party to the case and the case involves a child-related issue'?'yes':''" text="I am a party to the case and the case <b>involves a child</b>-related issue"/>               
                        <div  style="display: inline; margin-left:52px">about the following child or children:</div>
                    </div>
                    
                    <div  style="display: inline; margin-left:52px"><span style="color:#747474;font-style: italic;">Provide the requested information below for each child</span></div>
                    <table style="width:80%;margin-left:52px; border-collapse: collapse;">
                    <tr style="border-bottom: 2px solid black;">
                    <td style="width:60%"><b>Child's full name</b></td>
                    <td style="text-align: center"><b>Child's date of birth</b><div style="font-size:6pt; font-weight:normal;font-style: italic;margin-top:-15px;text-align: center"><br/>(dd/mmm/yyyy)</div></td></tr>
                    <tr v-for="(table, index) in data" :key="index"><div style="background-color:#fff;height:1rem; font-size:8pt;">{{data.value}}</div>   </tr>
                    </table>
                    <table style="width:80%;margin-left:52px; border-collapse: collapse;">
                    <tbody >
                    <tr 
                    v-for="data in childrenInfo">
                    <td style="border-right: 2px solid #fff;"><div style="background-color: #d6d6d6">{{ data.fullName }}</div></td>
                    <td style="text-align: center"><div style="background-color: #d6d6d6">{{ data.dob }}</div></td>
                    </tr>
                    </tbody>    
                    </table>

            </div>            
        </div>               
    </div>    
<!-- <2> : END-->
<!-- <3> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 3 |  Notice of the application </b>
            </div>
            <div style="margin-top: 1rem;"></div>
        <span style="font-size: 11pt;margin-left:20px"><b>5. </b></span>
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="form10Info.understandNotice?'yes':''" text=""/> 
                <div style="margin-top:-25px;text-indent:47px;margin-left:20px">I understand <b>I must give notice</b> of this application to each other party, and </div> 
                <div style="text-indent:47px;margin-left:22px">any other person who may be directly affected by the order.</div> 
                <div style="text-indent:47px;margin-left:22px"><b>To give notice, they must be served</b> with the application and supporting</div> 
                <div style="text-indent:47px;margin-left:22px">documents at least 7 days before the date of the court appearance unless </div> 
                <div style="text-indent:47px;margin-left:22px">the court allows the application to be made without notice or with less </div> 
                    <div style="text-indent:47px;margin-left:22px">than 7 days’ notice.</div> 
        
        </div>   
        <div style="float: right;width: 18%; margin-top: 50px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about serving court documents, see the guidebook.
                </p>
        </div>      
    </div>    
<!-- <3> : END-->
<!-- <4> : BEGIN-->
        <!-- <div style="width: 80%; float: left; margin-right: 10px;"> -->
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;width: 80%; float: left; margin-right: 10px;">
                    <b>Part 4 |  Case management order </b>
            </div>
            <div style="margin-top: 1rem;"></div>
            <div style="display: inline-block; font-size: 11pt;width: 80%; margin-right: 10px;margin-top:10px;margin-left:20px;">
                <b>6.</b><span style="margin-left:22px;">I am applying for the following <b>case management order(s)</b>:</span>
            </div>  
            <div style="float: right;width: 18%; background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about the different case management orders you can apply for, see the guidebook or Rule 62.

                </p>
        </div> 
            <div style="font-size: 10pt;margin-left:50px;" >                    
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;"  :check="form10Info.caseList.includes('fileTransfer')?'yes':''" text="Transferring a court file to another registry for all purposes or specific purposes"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('fileAccess')?'yes':''" text="Relating to the management of a court record, file or document, including access to a court file"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('fileCorrection')?'yes':''" text="Correcting or amending a filed document, including the correction of a name or date of birth"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('settingTime')?'yes':''" text="Setting a specified period for the filing and exchanging of information or evidence, including a financial statement in Form 4 
                                                                    <i>[Financial Statement]</i>"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('nonPartyDisclosure')?'yes':''" text="Specifying or requiring information that must be disclosed by a person who is not a party to a case"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('section33')?'yes':''" text="Requiring that a parentage test be taken under section 33 <i>[parentage tests]</i> of the  <i>Family Law Act</i>"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('section242')?'yes':''" text="Requiring access to information in accordance with section 242 <i>[orders respecting searchable information]</i> of the  <i>Family Law Act</i>"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('section12')?'yes':''"  
                                text="Authorizing an official of the court, in accordance with section 10 of the <i>Family Orders and Agreements Enforcement Assistance Act</i> (Canada), to make an application under section 12 of that Act for the release of information"/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="form10Info.caseList.includes('otherProvinceOrder')?'yes':''" text="Recognizing an extraprovincial order other than a support order"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;"  :check="form10Info.caseList.includes('changeServiceRequirement')?'yes':''" text="Waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for
                                                                    the service of a document"/>
                    </div>     
        <!-- </div>    -->
             
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="font-size: 10pt;margin-left:50px;" >                    
                    
                    <check-box style="display:block;text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('changeRequirement')?'yes':''" text="Waiving or modifying any other requirement under these rules, including a time limit set under these rules or a time limit set by
                                                                    an order or direction, even after the time limit has expired"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('remoteAttendance')?'yes':''" text="Allowing a person to attend a court appearance using a different method of attendance"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('adjourningAppearance')?'yes':''" text="Adjourning a court appearance"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('rule112')?'yes':''" text="Respecting the conduct of a party or management of a case"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('section211')?'yes':''" text="Relating to a report under section 211 <i>[orders respecting reports]</i> of the <i>Family Law Act</i>, including requiring that a person who
                                                                    prepared the report attend a trial as a witness"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('section204')?'yes':''" text="Adding or removing a party to the case, including leave to intervene under section 204(2) <i>[intervention by Attorney General or
                                                                    other person]</i> of the <i>Family Law Act</i>"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('lawyerAppointment')?'yes':''" text="Respecting the appointment of a lawyer to represent" />
                    <ol style="margin:0 0 0 2rem" class='resetcounterroman' > <li class='bracketroman'> the interests of a child or,</li><li class='bracketroman'>a party</li></ol>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('orderSettlement')?'yes':''" text="Settling or correcting the terms of an order made under the rules"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('subpoenaCancelation')?'yes':''" text="Cancelling a subpoena"/>
                    <check-box  style="text-indent: -17px;margin-left:20px;" :check="form10Info.caseList.includes('orderOfAbsenceChange')?'yes':''" text="Changing, suspending or cancelling an order made in my absence"/>                  
                </div>                 
    </div>  
<!-- <4> : END-->
<!-- <5> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 5 | Details of the order</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>7. </b></span><span style="margin-left:12px;">The <b>details of the order</b> I am applying for are as follows:</span>
                <br/>
                <span style="margin-left:25px;font-size: 11pt;text-indent:47px;">
                    <span style="color:#747474;font-style:italic">List the specific details of the order(s) you are asking for</span>
                </span>
                <div v-if="form10Info.orderDetails" style="min-height:150px;text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;">{{form10Info.orderDetails}}</div>
                    <div v-else style="margin-bottom:3rem;min-height:150px;"></div> 
            </div>
        </div>        
    </div>
<!-- <5> : END-->
<!-- <6> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 6 | The facts</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>8. </b></span><span style="margin-left:12px;">The <b>facts</b> on which this application is based <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic">Explain why you are making the application and why the order you</span>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic">are requesting should be made</span>
                </div>
                
                <div v-if="!includesFoaeaaOnly && form10Info.orderFacts" style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:230px;">
                    {{form10Info.orderFacts}}
                </div>
                <div v-else-if="!includesFoaeaaOnly && !form10Info.orderFacts" style="margin-bottom:3rem;min-height:200px;"></div>  
                
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If you are applying to change, suspend, or cancel an order made in your absence, you must explain: 
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>why you did not file a reply or attend court when required,</li>
                    <li>why the order to change, suspend or cancel an order should be made, and,</li>
                    <li>the reason(s) for any delay in making this application.</li>
                    </ul>
                    </div>
                    <div style="margin-top:-15px;">Rule 54 and 159</div>
                    
                </p>
        </div>
        
    </div>
<!-- <6> : END-->
<!-- <7> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 7 | Consent of other party and any other person</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>9.</b><span style="margin-left:12px;color:#747474;"><i>Select one of the following options, and complete the additional </i></span>
                        <div style="margin-left:25px;color:#747474;"><i>information as applicable</i></div>
                    </div>     
                    <div>
                    <div style="text-indent: 20px;">
                        <check-box   style="display: block; text-indent: -17px;margin-left:40px"  :check="!form10Info.givenConsent?'yes':''" text="<b>I do not have the consent</b> of each party, and any other person directly affected by the order"/>               
                    </div>
                    <div style="text-indent: 20px;">
                        <check-box  style="display: block; text-indent: -17px;margin-left:40px"  :check="form10Info.givenConsent?'yes':''" text="Each party, and any person directly affected by the order, has consented to the case management order and:"/>               
                    </div>
                    <div style="margin-left:2.75rem;">
                    <check-box  style="display: block; text-indent: -17px;margin-left:20px" 
                        :check="form10Info.givenConsent && (form10Info.consentDirection == 'fileForm18')?'yes':''" 
                        text="a draft Consent Order in Form 18 signed by each party, and any other person directly affected by the order, or their
                        lawyer, is submitted with this application and supporting documents for review without attending before the court"/>          
                    <check-box   style="display: block; text-indent: -17px;margin-left:20px" 
                        :check="form10Info.givenConsent && (form10Info.consentDirection == 'scheduleAppearance')?'yes':''" 
                        text="a court appearance is requested"/>                                   
                </div>                  
                </div>                                 
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Before filing your application, it is good practice to contact the other party to see if they will consent to the order. If 
                    they do agree, you can choose to: 
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>prepare and file a Consent Order Form 18, or</li>
                    <li>go to a court appearance</li>
                    </ul>
                    </div>
                    <div style="margin-top:-15px;">Rule 83</div>
                    
                </p>
        </div>        
    </div>  
<!-- <7> : END-->
<!-- <8> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 8 | Availability for court appearance</b>
            </div>
            <div style="height:220px;text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>10.</b><span style="margin-left:12px;color:#747474;"><i>Select only one of the following options</i></span>
                    </div>     
                    <div>
                    <div style="text-indent: 20px;">
                        <check-box  style="display: block; text-indent: -17px;margin-left:40px"  :check="form10Info.contactedOP && form10Info.oPAgreed?'yes':''" text="<b>I contacted</b> the other party, and each other person affected, and <b>they have agreed</b> to a date and time for the court appearance"/>               
                    </div>
                    <div style="text-indent: 20px;">
                        <check-box style="display: block; text-indent: -17px;margin-left:40px"  :check="form10Info.contactedOP && !form10Info.oPAgreed?'yes':''" text="<b>I contacted</b> the other party, and each other person affected, but <b>we have not agreed</b>  to a date and time for the court appearance"/>               
                    </div>
                    <div style="text-indent: 20px;">
                        <check-box style="display: block; text-indent: -17px;margin-left:40px"  :check="!form10Info.contactedOP?'yes':''" text="<b>I have not contacted</b> the other party, and each other person "/>               
                    <div style="margin-left:34px;">affected, to discuss available dates and times for the court appearance</div>
                        </div>                 
                </div>                                 
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    The court prefers to schedule a court appearance for a date that works for everyone to help reduce delays. Try to pick a few dates that may work for you. The registry or judicial case manager will work with you to schedule a date based on the court’s availability too. 
                </p>
        </div>        
    </div> 
<!-- <8> : END-->
<!-- <9> : BEGIN-->
    <div class="print-block">
        <div style="width: 80%; float: left; margin-right: 10px;margin-top:-45px;" >
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 9 | About your court appearance</b>
            </div>
            <div style="text-indent: -8px;" value="3"> 
            <div style="text-indent: 22px;margin-top:10px;margin-left:-20px;color:#747474;"><i>For registry or judicial case manager use only</i></div>
            
            </div>
        </div>
            <div class="fla-col-left-80" style="border-style: solid; border-color: black; width: 80%;float: left;margin-top:15px; ">
        <div style="margin-top:10px;margin-left:-35px;">
            <ul>
            <b>The application, which requires a court appearance, will be heard by the court</b>
            <!-- <underline-form style="text-indent:4px;display:inline-block; " textwidth="150px" beforetext="<b>on </b>"  hintMargin="55px"  hint="date" text=""/> -->
            <!-- <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hintMargin="70px" hint="time" text=""/> -->
            <span style="margin-left:0px;"><b> on</b></span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">________________</span>
            <span style="margin-left:20px;"><b> at</b></span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">________________</span>
            <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>  
            <div style="margin-top:-3px;width:80%">                
            <div style="margin-left:70px !important;font-size:6pt;"><i> date</i></div>
            <div style="margin-left:230px !important;font-size:6pt;margin-top:-12px;"><i> time</i></div>
            </div>
            <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: 17px;margin-left:10px;" :check="''"
                    />
                    <ul style="margin-top: -20px;margin-left:-25px;">
                        <!-- <underline-form style="text-indent:4px;display:inline-block;margin-left:10px; " textwidth="350px" beforetext="in person at" hintMargin="120px"  hint="court location" text=""/>  -->
                        <span style="margin-left:20px;">in person at</span><span style="margin-left:20px;background-color:#dedede;width:100px;min-width:100px;">______________________________________________</span>
            
            <div style="margin-top:-3px;">
            <div style="margin-left:220px;font-size:6pt;"><i> court location</i></div>
            </div>
                    </ul>
                    <div style="margin-top: 1rem;"></div>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: 17px;margin-left:10px;" :check="''"
                    />                    
                    <ul style="margin-top: -20px;margin-left:-16px;">
                        <div>
                            <div style="width: 20%; margin-right: 10px;margin-top:-5px;margin-left:10px;">
                                by another method of attendance, <br/>
                                as specified 
                            </div>
                            <div style="width: 80%; margin-top:-90px;margin-bottom:10px;margin-left:90px;padding: 4px;line-height: 14px;border:1px solid;">
                            <div style="text-align: justify;font-size: 9pt;padding:2px;">
                            <b>Do not attend the courthouse in person.</b> The registry will send within 24 hours before the hearing date noted above the link to 
                            connect by MS Teams, including a dial-in conferencing number to be used by any party that is unable to use MS Teams 
                            or has problems with their video connection. If you have not provided your email address or telephone number to the registry on 
                            your Notice of Address Change (<a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true">Form 46</a>), you must contact the registry to obtain the MS Teams conference information.</div>
                            </div>

                        </div>
                        
                    </ul>
        </ul>
    </div>
    </div>
     <div style="float: right;width: 18%; margin-top: 10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    The registry or judicial case manager will work with you to schedule a date for the court appearance and will fill in the actual date and method of attendance on the form. Be prepared to talk about your availability if there are options for dates.
                </p>
            </div>
            
    </div>
    <div class="print-block">
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; margin-top: 10px;width: 80%;padding:0.5rem; background: #d6d6d6; ">
        <b>NOTE TO THE OTHER PARTY:</b>
        <p>
            <b>If you do not attend court</b> on the date and time scheduled for the court appearance, the court 
                may make an order in your absence. 
        </p>    
            <p>You may also <b>choose to file a written response</b> in reply to the application in Form 19 Written Response to Application.
        </p>
    </div>
    </div>
<br/>
<!--Appearance Notice: Begin -->
<div style="page-break-after:always;">&nbsp;</div> 
<div >
    <div style="width: 100%; ">                    
        <div style="width: 100%;float: left; margin-top: 0px;padding:0.5rem;font-size:12pt;">
            <div style="text-align: center;font-size:13pt;">
            <div style="margin-top: 1rem;"></div>
            <b>IMPORTANT INFORMATION ABOUT YOUR APPEARANCE</b>
            <div style="margin-top: 1rem;"></div>
        </div> 
        <b>What do parties need to know about attending by another method other than in person?</b>
        <div style="margin-top:5px;font-size:11pt;">
            If your notice indicates that you are to attend by another method of attendance, parties, including the judge, will attend 
            using the Microsoft Teams audio- and video-conferencing (video) platform. <b>Do not attend the courthouse in person</b>. 
            Parties will receive remote MS Teams appearance details within 24 hours prior to the appearance, this notification is
            sent to you by email.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            Microsoft Teams allows participants to join the conference using video or audio from a desktop, laptop, tablet, or
            smartphone, or to dial-in to a proceeding from a telephone. <b>If you are appearing by video</b>, please ensure that you 
            have downloaded Microsoft Teams or have the latest version of Google Chrome or Microsoft Edge.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            <b>If you received this Notice by mail</b> and intend to appear using video or audio from a desktop, laptop, tablet, or
            smartphone, and you did not provide an email address for service, please file an Notice of Address Change (PCFR
            Form 46), with the court registry that includes your email address and the court registry will send you the MS Teams
            meeting invite within 24 hours prior to your appearance.
        </div>
        <div style="margin-top:5px;font-size:11pt;">
            The link and dial up information may be shared with your lawyer if you have retained counsel; and with your client if
            you are counsel.
        </div>
        <div style="margin-top:15px;font-size:11pt;">
            <b>Please do not forward or share</b> the MS Teams link or dial up information to any unauthorized parties.
        </div>
        <div style="justify-content: left;font-size:12pt;margin-top:10px;">
            <b>Preparing for your Family Management Conference</b>
        </div>
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Legal Aid BC - Family Law Legal Advice</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            If you do not have a lawyer for your family law matter, visit <a href="https://family.legalaid.bc.ca/court-notices">legalaid.bc.ca/family-court-notices</a> to find out about 
            <b>free in person and remote legal advice services</b> that you may be eligible for that can help you prepare for your court date.
            Contact the advice services at least three weeks before your court date or as soon as you receive this notice.
            If you are unable to access the internet, contact the Family LawLINE at 604-408-2172 in Greater Vancouver or
            1-866-577-2525 elsewhere in BC.
        </div>  
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Family Justice Services</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            Family justice counsellors provide services to British Columbians going through separation and divorce and are 
            specially trained to help families resolve their issues about guardianship, parenting arrangements, contact and 
            support. There is no charge for their services.
        </div> 
        <div style="margin-top:5px;font-size:11pt;">
            At this time all services are available in-person as well as virtually (through telephone and videoconference) across 
            the province. For more information, parties can call [1-844-747-3963] or contact their closest <a href="https://www.clicklaw.bc.ca/helpmap/service/1019">Family Justice Centre</a>.
        </div>  
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Society for Children and Youth of BC Child and Youth Legal Centre</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            Free legal assistance directly for children and youth. Services may include legal advice and information, referral, or 
            full representation, depending on circumstances. Availability and wait times may vary. Services are for children and 
            youth who want legal assistance, are able to express their views and preferences, and who can instruct a lawyer.
        </div>   
        <div style="margin-top:5px;font-size:11pt;">
            For more information: <a href="https://www.scyofbc.org/child-youth-legal-centre/">https://www.scyofbc.org/child-youth-legal-centre/</a>
            Contact the Child and Youth Legal Centre <a href="cylc@scyofbc.org">cylc@scyofbc.org</a> - (778)-657-5544.
        </div>   
        <div style="justify-content: left;font-size:11pt;margin-top:10px;">
            <b>Interpreter</b>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            The court provides interpreters for family proceedings in provincial court. If you require an interpreter, please advise 
            the registry as soon as possible. This link includes all court locations (address and phone numbers): <a href="www.gov.bc.ca/
            courthouselocations">www.gov.bc.ca/courthouselocations</a>
        </div>    
        <div style="margin-top:10px;font-size:11pt;">
            <b>Before the scheduled hearing date</b>, please visit the Provincial Court website at <a href="https://www.provincialcourt.bc.ca">https://www.provincialcourt.bc.ca</a>
            and review:
            <ul>
            <li><i>Policy on Use of Electronic Devices in Courtrooms and Access to Court Proceedings Policy</i> (there is a general
                prohibition on the recording or broadcasting of court proceedings unless authorized by the Court and there are
                penalties for breach)
            </li>
            <li><i>NP 21 Remote Attendance in the Provincial Court</i> (for etiquette and directions on connecting by another method
                of attendance) (counsel attendance requirements when attending Family matters remotely)
            </li>
            <li><i>NP 24 Form of Address for Parties and Lawyers</i> (provide the judge or justice with each person’s name, title (e.g.
                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
            </li>
            <li><i>NP 24 Form of Address for Parties and Lawyers</i> (provide the judge or justice with each person’s name, title (e.g.
                “Mr./ Ms./Mx./Counsel Jones”) and pronouns to be used in the proceeding)
            </li>
            <li><i>Guide for Appearing in the Provincial Court using MS Teams</i>
            </li>
            <li><i>eNews</i> - What to expect at a family management conference?
            </li>
            </ul>
        </div>   
        <div style="justify-content: left;font-size:11pt;margin-top:25px;">
            <b>If you are unable to dial-in or are dropped from the appearance</b> immediately call the court registry.
        </div>  
    </div>
    </div>
    </div>
    <!--Appearance Notice: End -->
<!-- <9> : END-->           
<!-- <10> : BEGIN--> 
    <div style="page-break-after:always;">&nbsp;</div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 10 | Filing location</b>
            </div>
            <div style="height:220px;text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>11.</b><span style="margin-left:12px;">I am filing this application <b>in the court registry</b>:</span>
                        <div style="font-size: 11pt;margin-left:30px;"><i>Select only one of the options below</i></div>
                    </div>     
                    <div>
                    <div >
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" text="Where my <b>existing case</b> with the same party/parties is located. I already have a file number."/>               
                    </div>
                    <div>
                        <check-box style="display: block; text-indent: -17px;margin-left:45px"  :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" text="Closest to <b>where the child lives</b> most of the time, because my case involves a child-related issue"/>               
                    </div>
                    <div >
                        <check-box   style="display: block; text-indent: -17px;margin-left:45px"  :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" text="Closest to <b>where I live</b> because my case does not involve a child-related issue"/>               
                    </div>   
                    <div >
                        <check-box  style="display: block; width:100%;text-indent: -17px;margin-left:45px"  :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" text="Permitted by <b>court order</b>"/>               
                    </div>               
                </div>                                 
            </div>            
        </div>  
               
    </div>
<!-- <10> : END--> 
<!-- <11> : BEGIN--> 
    <div>
        <div style="width: 80%; float: left; margin-right: 10px; margin-top:10px;">
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 11 |Address for service</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>12. </b></span><span style="margin-left:12px">My <b>address for service</b> of court documents and contact </span>
                <div style="margin-left:12px;margin-left:38px;">information is:</div>
                <div style="margin-left:29px;font-size: 11pt;text-indent:5px;">
                    <i>You must provide an address for service and contact number, but it does </i>
                </div>
                <div style="margin-left:29px;font-size: 11pt;text-indent:5px;">
                    <i>not have to be your own if you don’t want to</i>
                </div>
                
                
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
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

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
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
<!-- <11> : END--> 


         <!-- <For registery> -->
<!--                  
            <div style="margin:2rem 0 0 1rem; width:96.37%; border:1px solid; font-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <div style="text-indent:4px; margin:0 0 1rem 0; font-weight:normal; font-size:12pt;"><i>For registry use only - if applicable</i></div>
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
                <div style="margin:0.5rem 0 0 0.25rem;">
                    <underline-form style="text-indent:0px;display:inline-block;margin:0.5rem 0 0.5rem 0;" textwidth="10rem" beforetext="<b>You must attend the court appearance</b>" hint="(method of attendance)" text=""/>
                    <div style="text-indent:5px;display:inline;"><b>, unless otherwise allowed by the court.</b></div>
                    <check-box inline="inline" boxMargin="0" style="display:inline; font-weight:normal;" shift="10" :check="''" text="See attached for details"/>                        
                </div>    
            </div>
            <div style="margin:1.5rem 0 0 1rem; font-size:12pt;"><b>
                NOTICE TO PARTIES: If you do not attend court on the date and time scheduled for the court appearance, 
                the court may make an order in your absence. You may also choose to file a written response in reply to the
                application in Form 19 Written Response to Application.
            </b></div> -->
        <!-- </div> -->







      
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { cmLocationInfoDataInfoType, caseManagementOtherPartyDataInfoType, form10DataInfoType } from '@/types/Application/CaseManagement/PDF';
import { cmChildrenInfoSurveyDataInfoType, byConsentSurveyDataInfoType, otherPersonsSurveyDataInfoType, schedulingSurveyDataInfoType, aboutCaseManagementOrderSurveyDataInfoType, cmNoticeSurveyDataInfoType } from '@/types/Application/CaseManagement';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})

export default class Form10Layout extends Vue {

    @Prop({required:true})
    result!: any;
    
    @applicationState.State
    public applicantName!: nameInfoType;   

    dataReady = false;   

    locationInfo = {} as cmLocationInfoDataInfoType;
    otherPartyInfo = [];
    yourInfo = {} as yourInformationInfoDataInfoType;   
    
    childRelatedType = '';   
    childrenInfo: childrenInfoSurveyInfoType[] = []; 
    form10Info = {} as form10DataInfoType;  
    filingLocationReason = ''; 
    includesFoaeaaOnly = false;
    
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
    ]   
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
        this.yourInfo = this.getYourInfo();  
        this.otherPartyInfo = this.getOtherPartyInfo();  
        this.childrenInfo = this.getChildrenInfo(); 
        this.locationInfo = this.getLocationInfo();
        this.form10Info = this.getForm10Info();

        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
    } 
    
    public getLocationInfo(){

        const locationInformation = {} as cmLocationInfoDataInfoType;
        if (this.result?.filingLocationSurvey){
            const locationData = this.result.filingLocationSurvey;           
            locationInformation.existingFileNumber = locationData.ExistingFileNumber && locationData?.ExistingFamilyCase =='y'? locationData.ExistingFileNumber:'';
            locationInformation.courtLocation = locationData.ExistingCourt? locationData.ExistingCourt:'';
        }
        
        return locationInformation;
    }

    public getChildrenInfo(){

        this.childRelatedType = this.result?.cmChildrenInfoSurvey?.childRelatedType? this.result.cmChildrenInfoSurvey.childRelatedType :'';

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: cmChildrenInfoSurveyDataInfoType[] = this.result?.cmChildrenInfoSurvey?.childData? this.result.cmChildrenInfoSurvey.childData: [];
        
        if(this.childRelatedType == 'A party to the case and the case involves a child-related issue'){
            for (const child of childData){            
                childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
                childInfo.fullName = Vue.filter('getFullName')(child.name);
                childInfo.dob = Vue.filter('beautify-date-full')(child.dob);            
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

        let OpInformation: caseManagementOtherPartyDataInfoType[] = [];        

        if (this.result?.otherPartyCommonSurvey?.length > 0){
            
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as caseManagementOtherPartyDataInfoType;

                if (party.name)
                    otherParty.name = party.name;
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }

    public getForm10Info() {

        const form10Info = {} as form10DataInfoType;      

        if (this.result?.byConsentSurvey){
            const consentData: byConsentSurveyDataInfoType = this.result.byConsentSurvey;
            form10Info.givenConsent = consentData.givenConsent == 'y';
            form10Info.consentDirection = consentData.giveConsentDirection; 
        }

        if (this.result?.otherPersonsSurvey){
            const otherPersonData: otherPersonsSurveyDataInfoType = this.result.otherPersonsSurvey;
            form10Info.otherPersonsList = (otherPersonData.otherPersonsExist == 'y')?(otherPersonData.otherPersonsList):''            
        }

        if (this.result?.schedulingSurvey){
            const schedulingData: schedulingSurveyDataInfoType = this.result.schedulingSurvey;
            form10Info.contactedOP = schedulingData.informedOtherParties == 'y';
            form10Info.oPAgreed = schedulingData.agreeOnSchedule == 'y';         
        }

        if (this.result?.cmQuestionnaireSurvey){
            form10Info.caseList = this.result.cmQuestionnaireSurvey
        }

        if (this.result?.aboutCaseManagementOrderSurvey){
            const aboutOrderData: aboutCaseManagementOrderSurveyDataInfoType = this.result.aboutCaseManagementOrderSurvey;
            form10Info.orderDetails = aboutOrderData.orderDescription;
            if (form10Info.caseList.length == 1 && form10Info.caseList.includes("section12")){
                form10Info.orderFacts = '';
                this.includesFoaeaaOnly = true;
            } else {
                form10Info.orderFacts = aboutOrderData.applicationFacts;
                this.includesFoaeaaOnly = false;
            }
        }  
        
        if (this.result?.cmNoticeSurvey){
            const noticeData: cmNoticeSurveyDataInfoType = this.result.cmNoticeSurvey;
            form10Info.understandNotice = noticeData.acknowledgement.includes('I understand')
        }
      
        return form10Info;
    } 
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>