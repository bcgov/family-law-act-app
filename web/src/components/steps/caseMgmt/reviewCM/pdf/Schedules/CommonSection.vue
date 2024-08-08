<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> : BEGIN -->
    <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Application for Case Management Order Without Notice <br/>or Attendance</b></div>
                <div style="font-size:12pt;"><b>Form 11</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 62, 63, 65 and 78</div> 
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ locationInfo.existingFileNumber ? locationInfo.existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number:<br/><i>For registry use only </i></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>
        <div style="width: 80%;float: left; padding:0.3rem;">
            This Application for Case Management Order Without Notice or Attendance sets out the 
            details of a case management order that a person is applying for without notice to another 
            party and without attendance at a court appearance.
        </div>
        <div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; padding:0.3rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">You must complete the main application and any applicable schedule for your
                application identified in Part 3 of the main application.
                </div>
            </li>
            <li><div style="margin-left:9px;">For guidance filling in this form, please read the guidebook. The guide is available
                online at <a href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
            </div>
            </li>
            
        </ul>
    </div> 
    <div style="float: right;width: 18%; margin-top: -65px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    You can apply to modify the service or notice requirements if you have an urgent application.
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
                        <b>2.</b><span style="margin-left:12px;">The <b>other party’s full name is:</b></span>
                    </div>
                    <div v-for="otherparty,inx in otherPartyInfo" :key="inx" style="display:inline;">
                    <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;"
                        textwidth="270px" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="Full name of party/parties" 
                        :italicHint="false" 
                        textBackgroundColor="#dedede"
                        hintMargin="80px"
                        :text="otherparty.name | getFullName"/> 
                    </div>                    
            </div>
            
        </div>
        
    </div>
<!-- <1> : END-->
<!-- <2> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 |  Application without notice </b>
            </div>
            <div style="margin-top: 1rem;"></div>
        <span style="font-size: 11pt;margin-left:20px"><b>3. </b></span>
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:6px;" :check="understandWithoutNotice?'yes':''" text=""/> 
                 <div style="margin-top:-23px;text-indent:47px;margin-left:20px">I am <b>applying</b> for a case management order <b>without notice</b> to any other</div> 
                <div style="text-indent:47px;margin-left:22px"> party. I understand that <b>I will be required to serve a copy of any order</b></div> 
                <div style="text-indent:47px;margin-left:22px">I receive on each other party along with a copy of this application and</div> 
                <div style="text-indent:47px;margin-left:22px"> any supporting document(s).</div> 
        
        </div>   
        <div style="float: right;width: 18%; margin-top: 50px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    To apply with notice, you can file an Application for Case Management Order Form 10.
                </p>
        </div>      
    </div>    
<!-- <2> : END-->
<!-- <3> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 3 | About the order</b>
            </div>
            <div style="min-width:80%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    You can apply for one or more case management orders using this form.
                </p>
        </div> 
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-top:-10px;">
                <div style="display: inline-block; font-size: 11pt;">
                        <b>4.</b><span style="margin-left:12px;">I am applying for the following case management order(s):</span>
                        <div style="font-size: 11pt;margin-left:30px;"><i>Select all options that apply and complete the required schedule(s)</i></div>
                    </div>   
                    <div>
                    <check-box   style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="selectedSchedules.includes('schedule1')?'yes':''" text='Allowing a person to <b>attend a court appearance</b> using another method of attendance -> <i>Complete <span style="color:#626262"><b>Schedule 1</b></span></i>'/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="selectedSchedules.includes('schedule2')?'yes':''" text='<b>Waiving or modifying</b> any requirement related to <b>service or giving notice</b> to a person, including allowing an alternative method for the service of a document -> <i>Complete <span style="color:#626262"><b>Schedule 2</b></span></i>'/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="selectedSchedules.includes('schedule3')?'yes':''" text='<b>Waiving or modifying any other requirement</b> under the rules -> <i>Complete <span style="color:#626262"><b>Schedule 3</b></span></i>'/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="selectedSchedules.includes('schedule4')?'yes':''" text='Requiring <b>access to information</b> in accordance with <b>section 242</b> <i>[orders respecting searchable information]</i> of the <i> Family Law Act</i> -> <i>Complete <span style="color:#626262"><b>Schedule 4</b></span></i>'/>
                    
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="(caseList.includes('section12') && understandWithoutNotice)?'yes':''" 
                                text='Authorizing an official of the court, in accordance with section 10 of the <i>Family Orders and Agreements Enforcement Assistance Act (Canada)</i>, to make an application under section 12 of that Act for the <b>release of information</b><br/><i><span style="color:#626262"><b>File a criminal
                                record check and completed affidavit</b></span> that meets the requirements of sections 8 and 9 of the Family Orders and Agreements Enforcement Assistance Act (Canada)</i>'/>
                    <br/>
                    <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:40px;" :check="selectedSchedules.includes('schedule5')?'yes':''" text='<b>Recognizing an extraprovincial order</b> other than a support order -> <i>Complete <span style="color:#626262"><b>Schedule 5</b></span></i>'/> 
                                 
                </div>                                 
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 50px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    You can apply to modify the service or notice requirements if you have an urgent application.
                </p>
        </div>    
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    You can apply to modify the reply period if you have an urgent application. 
                </p>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about the requirements for the affidavit, see the guidebook. 
                </p>
        </div>    
    </div> 
<!-- <3> : END-->
<!-- <4> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 4 | Information about children</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>5.</b><span style="margin-left:12px;"><i>Select the correct option below and provide the additional information</i></span>
                        <div style="margin-left:25px;"><i>if applicable</i></div>
                    </div>     
                    <div>
                    <div style="text-indent: 20px;">
                        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-left:5px"  :check="childRelatedType == 'Not a party to the case'?'yes':''" text="<b>I am not a party</b> to the case"/>               
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
                    <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin-left:50px;"><i>Provide the requested information below for each child</i></div>
                    <b-table
                    :items="childrenInfo"
                    :fields="childrenFields"
                    class="mt-2"
                    small
                    bordered
                    style="width:480px;margin-left:50px">                    
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;"><br/>(dd/mmm/yyyy)</i>
                        </template>
                </b-table>
            </div>            
        </div>               
    </div>    
<!-- <4> : END-->
<!-- <5> : BEGIN--> 
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 5 | Filing location</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>6.</b><span style="margin-left:12px;">I am filing this application <b>in the court registry</b>:</span>
                        <div style="font-size: 11pt;margin-left:30px;"><i>Select only one of the options below</i></div>
                    </div>     
                    <div>
                    <div >
                        <check-box  style="display: block; text-indent: -17px;margin-left:45px"  :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" text="Where my <b>existing case</b> with the same party/parties is located. I already have a file number"/>               
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
<!-- <5> : END--> 
<!-- <6> : BEGIN--> 
    <div>
        <div style="width: 80%; float: left; margin-right: 10px; margin-top:10px;">
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 6 |Address for service</b>
            </div>
            <div style="margin-top: 0.5rem;"></div>
            <div style="text-align: justify;text-justify: inter-word;font-size: 11pt;">
                <span style="font-size: 11pt;margin-left:15px"><b>7. </b></span><span style="margin-left:12px">My <b>address for service</b> of court documents and contact </span>
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
    <div class="print-block">
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; margin-top: 10px;width: 80%;padding:0.5rem; background: #d6d6d6; ">
        <b>IMPORTANT NOTE:</b>
        <p>
            A judge reviewing an application for a case management order without notice or attendance 
            may do any of the following:
        </p>    
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">approve and sign the order without the need for you to come to court
                </div>
            </li>
            <li><div style="margin-left:9px;">ask you to provide more information or evidence in writing or by coming to court to give
                that information
            </div>
            </li>
            <li><div style="margin-left:9px;">require that notice be given to any other parties
                </div>
            </li>
            <li><div style="margin-left:9px;">reject the application with an explanation
                </div>
            </li>
            
        </ul>
    </div>
    </div>
<!-- <6> : END--> 
    
<!-- <1> -->
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

<!-- <2> -->
        <!-- <div class="print-block">
            <section>  
                <div v-if="otherPartyInfo.length>1" style="margin-left:0.2rem; display:inline">The other parties are</div>
                <div v-else style="margin-left:0.2rem; display:inline">The other party is</div>
                <div v-for="otherparty,inx in otherPartyInfo" :key="inx" style="display:inline;">
                    <underline-form 
                        style="margin-top:0.5rem; text-indent:2px;display:inline-block;" 
                        textwidth="15.9rem" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="full name of the other party/parties" 
                        :italicHint="false" 
                        :text="otherparty.name | getFullName"/> 
                </div>                
            </section>
        </div>  -->

        <!-- <div style="margin-top:1rem;"></div> -->
<!-- <3> -->        
        <!-- <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="understandWithoutNotice?'yes':''" 
                marginLeft="1.5rem"
                text="I am applying for a case management order without notice to any other party and I understand that"/>
            <div style=" text-indent:0; margin:0 0 -0.25rem 1.65rem;"> 
                I will be required to serve a copy of any order I receive on each other party along with a copy of this
                application and any supporting document(s).
            </div>
        </section> -->

<!-- <4> -->
        <!-- <div class="print-block">
            <section>
                <div style="display:inline; margin-left:0.25rem; "><i>Select only one of the options below and complete the required information:</i></div>          
                 <div style="margin:0.25rem 0 0 1rem;font-size: 9.51pt;" >                    
                    <check-box marginLeft="1.5rem"  :check="childRelatedType == 'Not a party to the case'?'yes':''" text="I am not a party to the case"/>
                    <check-box marginLeft="1.5rem"  :check="childRelatedType == 'A party to the case and the case does not involve a child-related issue'?'yes':''" text="I am a party to the case and the case does not involve a child related issue"/>
                    <check-box marginLeft="1.5rem"  :check="childRelatedType == 'A party to the case and the case involves a child-related issue'?'yes':''" text="I am a party to the case and the case involves a child-related issue about the following child or children:"/>
                 </div>
                <b-table
                    :items="childrenInfo"
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

        <!-- <div class="print-block mt-0">
            <div style="margin-top:1rem;"><b>Filing location</b></div>  


            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">I am filing this form in the court registry:</div>
                <div style="margin-left:1rem;">
                    <i>Select only one of the options below</i>
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                        text="where my existing case with the same party/parties is located"/> 
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                        text="closest to where the child lives most of the time, because my case involves a child-related issue"/>          
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" 
                        text="closest to where I live because my case does not involve a child-related issue"/>
                    <check-box  
                        :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" 
                        text="permitted by court order"/>                    
                </div>
            </section>
        </div> -->

<!-- <6> -->
        <!-- <div class="print-block"> 
            <div style="margin-top:1rem;"><b>ABOUT THE ORDER</b></div>
            <section>
                <div style="display:inline; margin-left:0.15rem;"> I am applying for the following case management order(s): </div>
                <div style="margin-left:1.1rem;"><i>Select all that apply and complete the required schedule(s)</i></div>
                <div style="margin:0.25rem 0 0 1.7rem;font-size: 10pt;" >                    
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="allowing a person to attend a court appearance using another method of attendance <i>[complete and attach Schedule 1]</i>"/>
                    <check-box  :check="selectedSchedules.includes('schedule2')?'yes':''" text="waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for the service of a document <i>[complete and attach Schedule 2]</i>"/>
                    <check-box  :check="selectedSchedules.includes('schedule3')?'yes':''" text="waiving or modifying any other requirement under the rules <i>[complete and attach Schedule 3]</i>"/>
                    <check-box  :check="selectedSchedules.includes('schedule4')?'yes':''" text="requiring access to information in accordance with section 242 <i>[orders respecting searchable information]</i> of the <i> Family Law Act [complete and attach Schedule 4]</i>"/>
                    
                    <check-box  :check="(caseList.includes('section12') && understandWithoutNotice)?'yes':''" 
                                text="authorizing an official of the court, in accordance with section 10 of the <i>Family Orders and Agreements Enforcement Assistance Act (Canada)</i>, to make an application under section 12 of that Act for the release of information <i>[file a criminal
                                record check and completed affidavit that meets the requirements of sections 8 and 9 of the Family Orders and Agreements Enforcement Assistance Act (Canada)]</i>"/>
                    <check-box  :check="selectedSchedules.includes('schedule5')?'yes':''" text="recognizing an extraprovincial order other than a support order <i>[complete and attach Schedule 5]</i>"/> 
                </div>                  
            </section>
        </div>    -->
        <div style="page-break-after:always;">&nbsp;</div> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType, otherPartyInfoType} from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { cmChildrenInfoSurveyDataInfoType, withoutNoticeOrAttendanceSurveyDataInfoType } from '@/types/Application/CaseManagement';
import { caseManagementOtherPartyDataInfoType, cmLocationInfoDataInfoType } from '@/types/Application/CaseManagement/PDF';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';


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
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    dataReady = false;   

    locationInfo = {} as cmLocationInfoDataInfoType;

    otherPartyInfo=[];
    yourInfo = {} as yourInformationInfoDataInfoType;   
    
    childRelatedType = '';   
    childrenInfo: childrenInfoSurveyInfoType[] = [];  
    filingLocationReason = '';    
    understandWithoutNotice = false;
    caseList = [];
   
    childrenFields = [
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
        this.caseList = [];

        if (this.result?.withoutNoticeOrAttendanceSurvey){
            const withoutNoticeData: withoutNoticeOrAttendanceSurveyDataInfoType = this.result.withoutNoticeOrAttendanceSurvey;
            this.understandWithoutNotice = withoutNoticeData.needWithoutNotice == 'y' && withoutNoticeData.orderWithoutNoticeAcknowledgement == 'I understand';
        } else {
            this.understandWithoutNotice = false;
        }  

        if (this.result?.cmQuestionnaireSurvey){
            this.caseList = this.result.cmQuestionnaireSurvey
        }
        
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

        this.childRelatedType = this.result?.cmChildrenInfoSurvey?.childRelatedType? this.result.cmChildrenInfoSurvey.childRelatedType: '';

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: cmChildrenInfoSurveyDataInfoType[] = this.result?.cmChildrenInfoSurvey?.childData ? this.result.cmChildrenInfoSurvey.childData : [];
        
        if(this.childRelatedType == 'A party to the case and the case involves a child-related issue'){
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
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>