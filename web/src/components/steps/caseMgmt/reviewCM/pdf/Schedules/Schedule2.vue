<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <!-- <div class="new-page"></div>
            <div style="text-align:center;"><b> SCHEDULE 2 – WAIVING OR MODIFYING ANY REQUIREMENT RELATED TO SERVICE OR GIVING NOTICE,</b></div>
            <div style="text-align:center;"><b> INCLUDING ALLOWING AN ALTERNATIVE METHOD OF SERVICE</b></div>
            <div style="text-align:center;"><b> This is Schedule 2 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for an order to waive or modify any requirement related to service or giving notice, including allowing an alternative method for the service of a document.</i>
            </div> -->
<!--Header : BEGIN-->
<div >
    <div class="new-page"></div>
        <div style="width:80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 12pt;">
                    <b>Schedule 2 | Waiving or modifying requirement</b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:105px;margin-top:-40px;"><b>related to service or giving notice</b></span>
            </div>
            
            <div style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    Complete this schedule only if you are applying for an order to waive or modify any requirement 
                    related to service or giving notice, including allowing an alternative method for the service of a document.

                </p>
        </div>
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about requirements related to service or giving notice, see the guidebook.  
                </p>
        </div>
    </div> 
<!--Header : End-->
<!-- <1> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 1 |  What are you applying for</b>
            </div>
            <div style="min-width:80%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    Depending on the order you need, the court requires different information. 
                </p>
        </div> 
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                <div style="display: inline-block; font-size: 11pt;">
                        <b>1.</b><span style="margin-left:12px;">I am applying for an order to:</span>
                        <div style="font-size: 11pt;margin-left:22px;"><i>Select each applicable option and complete the required part(s)</i></div>
                    </div>   
                    <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="modReqInfo.changetype.includes('changewaive')?'yes':''" text='<b>Waive</b> a requirement related to service or giving notice -> <i>Complete <span style="color:#626262"><b>Part 2</b></span></i>'/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="modReqInfo.changetype.includes('changemodify')?'yes':''" text='<b>Modify</b> a requirement related to service or giving notice -> <i>Complete <span style="color:#626262"><b>Part 3</b></span></i>'/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="modReqInfo.isAltMethodService?'yes':''" text='<b>Allow service</b> of a document using an <b>alternative method</b> -> <i>Complete <span style="color:#626262"><b>Part 4</b></span></i>'/>
                    <br/>
                                  
                </div>                                 
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If a requirement is waived, it means it no longer applies. The court can order that an 
                    application proceed without notice to a person only in certain circumstances set out in the Rules.
                    If a requirement is modified, you still need to meet the requirement, but it has been changed. 
                </p>
        </div>               
    </div> 
<!-- <1> : END-->
<!-- <2> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 |  Waive a requirement – <span style="font-size:9pt;">Complete this part only if you are applying to waive a</span></b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:220px;margin-top:-40px;font-size:8pt;"><b>requirement related to service or giving notice.</b></span>
            </div>
            <div style="min-width:80%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:8pt;">
                <p>
                    Judges normally hear from all parties before making decisions. When, for example, there is 
                    urgency or risk of harm, the court could hear from only one party.

                </p>
        </div> 
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                <div style="display: inline-block; font-size: 11pt;">
                        <b>2.</b><span style="margin-left:12px;">I am applying to <b>waive the requirement</b> for service or giving notice to a</span>
                        <div style="font-size: 11pt;margin-left:24px;">person of the following document(s):</div>
                        <div style="font-size: 11pt;margin-left:24px;"><i>Select all options that apply</i></div>
                    </div>   
                    <div style="margin-left:1.0rem;">
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.waiveChangeRequirementList.includes('Application About Priority Parenting Matter')?'yes':''" text="Application About Priority Parenting Matter"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.waiveChangeRequirementList.includes('Application About a Family Law Matter')?'yes':''" text="Application About a Family Law Matter"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.waiveChangeRequirementList.includes('Subpoena')?'yes':''" text="Subpoena"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.waiveChangeRequirementList.includes('Order')?'yes':''" text="Order"/>
                        <span>
                        <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;"  :check="modReqInfo.waiveChangeRequirementList.includes('other')?'yes':''" text=""/>
                        <underline-form style="text-indent:1px;display:block;margin-top:-22px;margin-left:34px;" textwidth="23rem" beforetext="Other <i>(specify):</i>" hint="" :text="modReqInfo.waiveChangeRequirementComment|truncate-word-after(70)"/>                     
                        <div class="answer">{{modReqInfo.waiveChangeRequirementComment|truncate-word-before(70)}}</div>
                    </span>
                    </div>   
                                               
            </div>            
        </div>
               
    </div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                    <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>3. </b></span><span style="margin-left:12px;">The <b>facts</b> on which this application is based <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>Explain why you are making the application and why the order you</i>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>are requesting should be made</i>
                </div>
                
                <div v-if="modReqInfo.applicationFacts" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;">
                    {{modReqInfo.applicationFacts}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;margin-bottom:3rem;"></div> 
                
            </div>                            
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Remember to include:
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>why the application or your situation is urgent or what special circumstances exist,</li>
                    <li>why the other party should not be served or given notice, and</li>
                    <li>what you believe will happen if the other party is served or given notice.</li>
                    </ul>
                    </div>                    
                </p>
        </div>
                      
    </div> 
<!-- <2> : END-->
<!-- <3> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 3 |  Modify a requirement – <span style="font-size:9pt;">Complete this part only if you are applying to </span></b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:228px;margin-top:-40px;font-size:8pt;"><b>modify a requirement related to service or giving notice.</b></span>
            </div>
            <div style="min-width:80%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:8pt;">
                <p>
                    If obtaining an order from the court is time sensitive, the court may allow less than the required 
                    amount of notice. If there are special circumstances requiring more time to prepare to attend 
                    court, the court may allow more than the required amount of notice.

                </p>
        </div> 
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                <div style="display: inline-block; font-size: 11pt;">
                        <b>4.</b><span style="margin-left:12px;">I am applying to <b>modify the requirement</b> for service or giving notice to a</span>
                        <div style="font-size: 11pt;margin-left:24px;">person of the following document(s):</div>
                        <div style="font-size: 11pt;margin-left:24px;"><i>Select all options that apply</i></div>
                    </div>   
                    <div style="margin-left:1.0rem;">
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.modifyChangeRequirementList.includes('Application About Priority Parenting Matter')?'yes':''" text="Application About Priority Parenting Matter"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.modifyChangeRequirementList.includes('Application About a Family Law Matter')?'yes':''" text="Application About a Family Law Matter"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.modifyChangeRequirementList.includes('Subpoena')?'yes':''" text="Subpoena"/>
                        <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;" :check="modReqInfo.modifyChangeRequirementList.includes('Order')?'yes':''" text="Order"/>
                        <span>
                        <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:25px;"  :check="modReqInfo.modifyChangeRequirementList.includes('other')?'yes':''" text=""/>
                        <underline-form style="text-indent:1px;display:block;margin-top:-22px;margin-left:34px;" textwidth="23rem" beforetext="Other <i>(specify):</i>" hint="" :text="modReqInfo.modifyChangeRequirementComment|truncate-word-after(70)"/>                     
                        <div class="answer">{{modReqInfo.modifyChangeRequirementComment|truncate-word-before(70)}}</div>
                        </span>
                    </div>   
                                               
            </div>            
        </div>
               
    </div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>5. </b></span><span style="margin-left:12px;">The <b>details of the order</b> I am applying for <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>Explain how you want the requirement for service or giving notice </i>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>to be modified</i>
                </div>
                
                <div v-if="modReqInfo.orderChangesDetail" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:190px;">
                    {{modReqInfo.orderChangesDetail}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:190px;margin-bottom:3rem;"></div> 
                
            </div>                            
            </div>            
        </div> 
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:5px;">
                  
                    <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>6. </b></span><span style="margin-left:12px;">The <b>facts</b> on which this application is based <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>Explain why you are making the application and why the order you</i>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>are requesting should be made</i>
                </div>
                
                <div v-if="modReqInfo.modifyMethodApplicationFacts" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:190px;">
                    {{modReqInfo.modifyMethodApplicationFacts}}
                </div>
                <div v-else  style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:190px;margin-bottom:3rem;"></div> 
            </div>                            
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 10px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Remember to include: 
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>why the application or your situation is urgent or what special circumstances exist,</li>
                    <li>why the requirement should be modified, and</li>
                    <li>how it will benefit the case proceeding.</li>
                    </ul>
                    </div>                    
                </p>
        </div>
                      
    </div> 
<!-- <3> : END-->
<!-- <4A : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 4 |  Allow service of a document using an alternative method </b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:2px;margin-top:-40px;font-size:8pt;">Complete this part only if you are applying to allow service using an alternative method.
                    </span>
            </div>
            <div style="min-width:80%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:8pt;">
                <p>
                    Service of a document must be done according to the rules unless the court makes an order 
                    allowing another method of service
                </p>
            </div> 
            <div style="background: #a2a2a2; color: white; font-size: 10pt;padding:1px;">
                Person and documents to be served
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;margin-left:-15px;">
                        <b>7.</b><span style="margin-left:12px;">I need <b>to serve</b></span>
                    </div>
                    <div v-for="name,inx in modReqInfo.nameOfPersonToBeServed" :key="inx" style="display:inline;">
                        <underline-form v-if="name"  style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="372px" :beforetext="inx==0?'':',' " hint="Full name of person" hintMargin="135px" :italicHint="false" :text="name"/>
                    </div>
                    <div style="display:inline; margin-left:10px">
                         <b>with the following document(s):</b>
                    </div>
                    <div style="margin-left:8px;font-size: 11pt;text-indent:5px;">
                    <i>List each document you need an order from the court to serve using an 
                    </i>
                </div>
                <div style="margin-left:10px;font-size: 11pt;text-indent:5px;">
                    <i>alternative method</i>
                </div>
                <div v-if="modReqInfo.altMethodDocList"  style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:10px;min-height:190px;"
                    v-html="modReqInfo.altMethodDocList" >{{modReqInfo.altMethodDocList}}</div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:190px;margin-bottom:3rem;"></div> 
            </div> 
            <div style="background: #a2a2a2; color: white; font-size: 10pt;padding:1px;">
                Reason for application
            </div>      
        </div>
        <div style="float: right;width: 18%; margin-top: 15px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    To make an order that the document be served using an alternative method of service, the court must be satisfied that the person to be served cannot be found after a diligent search, is evading service of the document or is temporarily outside British Columbia [Rule 182].        
                </p>
        </div>
              
    </div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>8. </b></span><span style="margin-left:12px;"><i>Select whichever option is correct and complete the requested information</i></span>
                <br/>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="modReqInfo.isalternativeServiceReasonUnknown" text='<b>I do not know where to find</b> the person to be served. I have made the following <b>efforts to find them</b>:'/>             
                </div> 
                <div style="margin-left:45px;font-size: 11pt;text-indent:5px;">
                    <i>Explain how you have tried to locate them, where you have searched, and  </i>
                </div>
                <div style="margin-left:45px;font-size: 11pt;text-indent:5px;">
                    <i>who you have contacted</i>
                </div>
                
                <div v-if="modReqInfo.isalternativeServiceReasonUnknown" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;">
                    {{modReqInfo.alternativeServiceReasonDetails}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;"></div>                
                <div style="margin-top: 1rem;"></div>


            </div>                            
            </div>            
        </div> 
        <div style="float: right;width: 18%; margin-top: 15px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    You may have some contact information for the person, but you do not know how to find them in person.

                </p>
        </div>

    </div> 
    
<!-- <4A> : END-->
<!-- <4B> : BEGIN-->
    
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="modReqInfo.isalternativeServiceReasonNotReachable" text='I believe the person to be served is <b>avoiding service</b> of the document(s) or is <b>temporarily outside of British Columbia</b>. I believe this to be true because the following <b>efforts have been made to serve</b> them with the document(s):
'/>             
                </div> 
                <div style="margin-left:45px;font-size: 11pt;text-indent:5px;">
                    <i>Explain when and where you tried to serve the person and what happened </i>
                </div>
                <div style="margin-left:45px;font-size: 11pt;text-indent:5px;">
                    <i>when you tried</i>
                </div>
                
                <div v-if="modReqInfo.isalternativeServiceReasonNotReachable" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:210px;">
                    {{modReqInfo.alternativeServiceReasonDetails}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:210px;"></div>                
            </div>                            
            </div>            
        </div> 
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                    <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>9. </b></span><span style="margin-left:12px;"><b>I know</b> the following <b>information about the person’s</b> address, location, 
                    </span>
                    <div style="margin-left:30px;">contact information or who might be able to get in touch with them:</div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>Include the information you know, how you know the information and</i>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <i>when it was last confirmed or became known to you</i>
                </div>
                
                <div v-if="modReqInfo.personwhereabouts" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:210px;">
                    {{modReqInfo.personwhereabouts}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:210px;"></div>                
                
            </div>                            
            </div>            
        </div>  
        
        <div style="float: right;width: 18%; margin-top: -200px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    You can include what you saw, who you may have talked to and what they said.                   
                </p>
        </div>
                      
    </div> 
<!-- <4B> : END-->    
<!-- <4C> : BEGIN-->
    <div style="page-break-after:always;">&nbsp;</div>
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            
            <div style="background: #a2a2a2; color: white; font-size: 10pt;padding:1px;">
                Order for alternative method of service
            </div>      
        </div>
               
    </div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>10. </b></span><span style="margin-left:12px;">I am applying for an order <b>to be allowed to serve the document(s)</b> 
                 </span>   
                 <div style="margin-left:37px;"><b>in the following manner:</b> 
                 </div>   
                 <div style="margin-left:30px;font-size: 11pt;text-indent:5px;">
                    <i>Select only one option and provide the requested information
                    </i>
                </div> 
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('post')?'yes':''" text='Posting the documents on the door of the person’s residence at <i>(provide address)</i>:'/>             
                </div>                 
                <div v-if="modReqInfo.alternativeorderservice.includes('post')" style="text-indent:15px;padding:10px;font-size: 11pt;margin-left:40px;">
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailAddress }} 
                                </div>
                            </td>
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailCity }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    Address
                                </div>
                            </td>
                            
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    City
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                </div>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('relative')?'yes':''" text='Leaving the documents with a relative or other adult person to give to the person to be served:'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('relative')" style="text-indent:15px;padding:10px;font-size: 11pt;margin-left:40px;">
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:right;">
                                    Full name of relative/adult person:
                                </div>
                            </td>
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativeRelativeName }} 
                                </div>
                            </td>
                            
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:right;">
                                    Relationship to person to be served:
                                </div>
                            </td>
                            
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativeRelatveRelationship }} 
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                </div>
                
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('mail')?'yes':''" text='Mailing the documents by '/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('mail')" style="text-indent:15px;font-size: 11pt;margin-left:20px;">
                    <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;text-indent: -17px;" shift="10"  marginLeft="1.75rem" :check="modReqInfo.alternativemailType.includes('registeredmail')?'yes':''"  text="Registered mail"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;text-indent: -17px;" shift="-8" marginLeft="0.5rem" :check="modReqInfo.alternativemailType.includes('regularmail')?'yes':''" text="Regular mail"/>
                    </div>
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 55px; font-size: 9pt;width:80%;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailAddress }} 
                                </div>
                            </td>
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailCity }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    Address
                                </div>
                            </td>
                            
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    City
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                </div>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('email')?'yes':''" text='Sending the documents to the person’s email at:'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('email')" style="text-indent:15px;font-size: 11pt;margin-left:5px;">
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 55px; font-size: 9pt;width:80%;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativeEmail }} 
                                </div>
                            </td>                            
                        </tr>                    
                    </table>
                </div>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('text')?'yes':''" text='Sending the documents by text message to the person’s cell at:'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('text')" style="text-indent:15px;font-size: 11pt;margin-top:-25px;margin-left:50px;">
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 55px; font-size: 9pt;width:75%;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativeText }} 
                                </div>
                            </td>                            
                        </tr>                    
                    </table>
                </div>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('instant')?'yes':''" text='Sending the documents by instant messaging to the person to be served through'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('instant')" style="text-indent:15px;padding:10px;font-size: 11pt;margin-left:40px;">
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; ">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div  >
                                    {{ modReqInfo.alternativeSocialPlatform }} 
                                </div>
                            </td>
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;">
                                <div  style="background-color:#fff;margin-left:18px;">
                                    <b>at</b>
                                </div>
                            </td>
                            <td colspan="5" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div >
                                    {{ modReqInfo.alternativeSocialPlatformId }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    Social platform
                                </div>
                            </td>
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;">
                                <div  style="background-color:#fff;margin-left:18px;">
                                    <b>&nbsp;</b>
                                </div>
                            </td>
                            <td colspan="5" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    Account identifier (handle, number, etc.)
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('knownaddress')?'yes':''" text='Leaving the documents at the person’s last known address at <i>(provide address):</i>'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('knownaddress')" style="text-indent:15px;padding:10px;font-size: 11pt;margin-left:40px;">
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt;">
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailAddress }} 
                                </div>
                            </td>
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #dedede;">
                                <div>
                                    {{ modReqInfo.alternativemailCity }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td colspan="2" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    Address
                                </div>
                            </td>
                            
                            <td colspan="1" style="border: 2px solid #fff; padding: 4px;background-color: #fff;">
                                <div style="font-size:8pt;text-align:center;">
                                    City
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                </div>              
                <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="modReqInfo.alternativeorderservice.includes('other')?'yes':''" text='Other method <i>(specify)</i>:'/>             
                </div> 
                <div v-if="modReqInfo.alternativeorderservice.includes('other')" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:65px;min-height:100px;">
                    {{modReqInfo.alternativeOther}}
                </div>
                
            </div>                            
            </div>            
        </div> 
        
                      
    </div> 
<!-- <4C> : END-->
<!-- <4D> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            
            <div style="background: #a2a2a2; color: white; font-size: 10pt;padding:1px;">
                The facts
            </div>      
        </div>
               
    </div> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                  
                <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>11. </b></span><span style="margin-left:12px;">I believe the alternative method of service I am requesting <b>will bring the</b>
                 </span>   
                 <div style="margin-left:37px;"><b>documents to the attention of the person to be served</b> because:
                 </div>   
                         
                 
                <div v-if="modReqInfo.altMethodApplicationFacts" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:40px;min-height:200px;">
                    {{modReqInfo.altMethodApplicationFacts}}
                </div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:65px;min-height:200px;"></div>                
                
            </div>                            
            </div>            
        </div> 
          
        
       
                      
    </div> 
<!-- <4D> : END-->
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule2DataInfoType } from '@/types/Application/CaseManagement/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule2 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;
    modReqInfo = {} as schedule2DataInfoType; 
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){        
        this.modReqInfo = this.getWaiveModifyRequirementsInfo();
    }

    public getWaiveModifyRequirementsInfo(){
        let waiveModifyRequirementsInfo = {} as schedule2DataInfoType;
        
        if(this.result?.changingOrCancellingAServiceOrNoticeSurvey){
            const chgSurvey = this.result.changingOrCancellingAServiceOrNoticeSurvey;
            const namesOfNeedToBeServedCondition = chgSurvey.namesOfNeedToBeServed? chgSurvey.namesOfNeedToBeServed?.split(/[;,]+/).map(item => {return item.trim();}):[]

            waiveModifyRequirementsInfo.isWaiveOrModify =  (chgSurvey.changeOrCancelRequirementForService =='y');
            waiveModifyRequirementsInfo.isAltMethodService = (chgSurvey.anotherMethodOfService == 'y');
            waiveModifyRequirementsInfo.changetype = chgSurvey.changeOrCancelRequirementForService =='y' ? chgSurvey.changetype : '';
            waiveModifyRequirementsInfo.orderChangesDetail = (waiveModifyRequirementsInfo.isWaiveOrModify  && waiveModifyRequirementsInfo.changetype == "changemodify") ? chgSurvey.orderChangesDetail: '';            
            waiveModifyRequirementsInfo.waiveChangeRequirementList = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changewaive') ? chgSurvey.documentList: [];
            waiveModifyRequirementsInfo.waiveChangeRequirementComment = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changewaive') ? chgSurvey.documentListComment:'';
            waiveModifyRequirementsInfo.applicationFacts = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changewaive') ? chgSurvey.applicationFacts:'';

            waiveModifyRequirementsInfo.nameOfPersonToBeServed = waiveModifyRequirementsInfo.isAltMethodService?namesOfNeedToBeServedCondition:[];
            waiveModifyRequirementsInfo.altMethodApplicationFacts = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.applicationFactsAltMethod:'';
            waiveModifyRequirementsInfo.altMethodServingDetails = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.altMethodServingDetails:'';
            waiveModifyRequirementsInfo.isalternativeServiceReasonUnknown =  waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.alternativeServiceReason == "unknown": false;
            waiveModifyRequirementsInfo.isalternativeServiceReasonNotReachable =  waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.alternativeServiceReason == "outofreach": false;
            waiveModifyRequirementsInfo.alternativeServiceReasonDetails = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.alternativeServiceReasonDetails:'';
            waiveModifyRequirementsInfo.personwhereabouts = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.personwhereabouts:'';
            waiveModifyRequirementsInfo.alternativeorderservice = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.alternativeorderservice:'';
            waiveModifyRequirementsInfo.alternativemailType = chgSurvey.alternativemailType ?  chgSurvey.alternativemailType : '';
            waiveModifyRequirementsInfo.alternativemailAddress = chgSurvey.alternativemailAddress ?  chgSurvey.alternativemailAddress : '';
            waiveModifyRequirementsInfo.alternativemailCity = chgSurvey.alternativemailCity ?  chgSurvey.alternativemailCity : '';
            waiveModifyRequirementsInfo.alternativeEmail = chgSurvey.alternativeEmail ?  chgSurvey.alternativeEmail : '';
            waiveModifyRequirementsInfo.alternativeText = chgSurvey.alternativeText ?  chgSurvey.alternativeText : '';
            waiveModifyRequirementsInfo.alternativeOther = chgSurvey.alternativeOther;
            waiveModifyRequirementsInfo.alternativeRelativeName = chgSurvey.alternativeRelativeName ?  chgSurvey.alternativeRelativeName : '';
            waiveModifyRequirementsInfo.alternativeRelatveRelationship = chgSurvey.alternativeRelatveRelationship ?  chgSurvey.alternativeRelatveRelationship : '';
            waiveModifyRequirementsInfo.alternativeSocialPlatform = chgSurvey.alternativeSocialPlatform ?  chgSurvey.alternativeSocialPlatform : '';
            waiveModifyRequirementsInfo.alternativeSocialPlatformId = chgSurvey.alternativeSocialPlatformId ?  chgSurvey.alternativeSocialPlatformId : '';
            
            waiveModifyRequirementsInfo.modifyChangeRequirementList = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changemodify') ? chgSurvey.documentList: [];
            waiveModifyRequirementsInfo.modifyMethodApplicationFacts = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changemodify') ? chgSurvey.applicationFacts:'';
            waiveModifyRequirementsInfo.modifyChangeRequirementComment = (waiveModifyRequirementsInfo.isWaiveOrModify && waiveModifyRequirementsInfo.changetype == 'changemodify') ? chgSurvey.documentListComment:'';
            //waiveModifyRequirementsInfo.waiveMethodApplicationFacts = (waiveModifyRequirementsInfo.isAltMethodService && waiveModifyRequirementsInfo.changetype == 'changewaive') ? chgSurvey.applicationFacts:'';



            let altMetList = chgSurvey.documentListForAltMethod;
            if(altMetList){
                altMetList = altMetList.replace(/\n/g,'<br>');
                altMetList = altMetList.replace(/;/g, '<br>');
                altMetList = altMetList.replace(/,/g, '<br>');
            }
            waiveModifyRequirementsInfo.altMethodDocList  = waiveModifyRequirementsInfo.isAltMethodService? altMetList:'';
          }
        
        
        return waiveModifyRequirementsInfo;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>