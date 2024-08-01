<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size:13pt;"><b>Application for Order</b></div>
                <div style="font-size:13pt;"><b>Prohibiting the Relocation of a Child</b></div>
                <div style="font-size:10pt;"><b>FORM 16</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 80</div>
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
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                <div style="float: left; width: 50%; padding: 2px;"> Document number: <div style="font-size: 6pt; padding-left:16px;">For registry use only</div> </div>
                     <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ fmepNumber ? fmepNumber : '&nbsp;' }} </div>
                </div>
            </div>         
        </div> 
        
        <div style="display:flex; flex-direction:row gap:4px; font-size:8pt" >
            <div style="width: 80%; float: left; margin-right: 10px;">
                <p>This Application for Order Prohibiting the Relocation of a Child sets out the details of an order 
                prohibiting the relocation of a child that a person is applying for under section 69 of the Family 
                Law Act. </p>
                <div style="border-style: dashed; border-color: black;float: left; padding:0.5rem; background: #909090;">
                <b>Please read before completing the form:</b>
                <ul>
                    <li>
                        This application is to be used only if a child’s guardian plans to relocate themselves, the child, or both, and there is a written agreement or order respecting parenting arrangements or contact with the child applies to the child [s. 65 Family Law Act].
                    </li>
                    <li>
                        If there is no written agreement or court order, you may apply for an order under s. 46 of the Family Law Act [changes to child’s residence if no agreement or order] using an Application About a Priority Parenting Matter Form 15 or Application About a Family Law Matter Form 3 to determine the parenting arrangements for the child including the location of the child’s residence.
                    </li>
                    <li>
                        For guidance filling in this form, please read the guidebook. The guide is available online at <a href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.
                    </li>
                </ul>
                </div>
            </div>
            <div style="width: 20% ">
           <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                <p>
                <b-icon-info-circle-fill />
                <br />
                    An application prohibiting the relocation of a child under s. 69 of the Family Law Act must be filed within 30 days after receiving written notice that the guardian plans to relocate the child [s. 68 Family Law Act]. 
                </p>
            </div>
            </div>
        
        </div>
        
        <div style="width: 80%; float: left; margin-right: 10px;">
        <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 1 | About the Parties</b>
            </div>

             <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                      <b>1. </b>My <b>full name</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="376px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
                     <div style="padding-top:12px; padding-left:12px;"> 
                      <div style="display: inline-block; font-size: 11pt;"> 
                        <b>My date of birth</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="356px"
                        beforetext="" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.dob | beautify-date" />
                     </div>  
             </div>

               <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>2. </b>The <b>other party’s full name is:</b>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="270px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="firstOtherParty.name | getFullName" /> 
                     <div style="padding-top:10px; padding-left:12px;">
                            <div style="display: inline-block; font-size: 11pt;">
                            Their <b>date of birth:</b>(dd/mmm/yyyy) is:
                            </div>  
                            <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="230px"
                        beforetext=""  :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="firstOtherParty.dob | beautify-date" />  
                      

                    <div>
                    <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                    :check="true?'yes':''" 
                    text="There is an additional party."/> 
                    
                    </div>
                    <div>
                    
                    </div>
                    <div style="display: inline-block; font-size: 11pt;"> 
                        The<b> additional party’s</b> full name is:
                    </div>
                  <!-- <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="230px"
                        beforetext="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="otherParty.name | getFullName" /> -->

                        <div style="display: inline-block; font-size: 11pt;"> 
                        Their<b>  date of birth</b> h (dd/mmm/yyyy) is: 
                    </div>
                     </div>     
               </div> 
        </div>




         <!-- <1> -->
        <section>
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="17rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px; font-size: 9pt;" textwidth="8rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> . My contact information and address for service of court documents are:</div>
            <table class="compactfullsize" style="margin-top:0.5 !important; font-size: 9pt;">
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
        </section>

        <div style="margin-top: 1rem;"></div>       

<!-- <2> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I understand I must give notice of this application to the relocating guardian(s). The relocating guardian is the"/>
            <div style="text-indent:0; margin:0 0 0 1.85rem;display:block; font-size: 9pt;" >
                other party. To give notice, they must be served with the application and supporting documents at
                least 7 days before the date set for the court appearance unless the court allows the application to be
                made without notice or with less than 7 days’ notice.
            </div>                              
        </section>

        <div style="margin-top: 1rem;"></div>        

<!-- <3> -->
        <div class="print-block">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="16.5rem" 
                        beforetext="The other party is" 
                        hint="full name of the other party" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <underline-form 
                        style="display:inline;text-indent:2px;" 
                        textwidth="7.5rem" 
                        beforetext=". Their date of birth is" 
                        hint="date of birth (mmm/dd/yyyy)" 
                        :italicHint="false" 
                        :text="firstOtherParty.dob | beautify-date"/>
                    <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                    <table class="compactfullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">
                                Lawyer (if applicable): 
                                <div class="answer">
                                    {{firstOtherParty.lawyer}}
                                </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer"> {{firstOtherParty.address?firstOtherParty.address.street:''}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.city:''}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.state:''}}</div> </td>
                            <td>Postal Code: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.postcode:''}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{firstOtherParty.contactInfo?firstOtherParty.contactInfo.email:''}}</div> </td>
                            <td>Telephone: <div class="answer">{{firstOtherParty.contactInfo?firstOtherParty.contactInfo.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
                <div style="text-indent:5px;"><i>Additional party (Complete only if applicable.)</i></div>
                        
                <div v-if="additionalOtherParties.length>0" style="font-size: 9pt;">

                    <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    
                        <table class="compactfullsize">
                            <tr style="border:1px solid #313132">
                                <td colspan="2">Full name: <div class="answer">{{otherParty.name | getFullName}}</div> </td>                                
                                <td>Date of birth: <div class="answer">{{otherParty.dob | beautify-date}}</div> </td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Contact information</td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">
                                    Lawyer (if applicable): 
                                    <div class="answer">
                                        {{otherParty.lawyer}}
                                    </div>
                                </td>
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
                                <td colspan="2">Email: <div class="answer">{{otherParty.contactInfo?otherParty.contactInfo.email:''}}</div> </td>
                                <td>Telephone: <div class="answer">{{otherParty.contactInfo?otherParty.contactInfo.phone:''}}</div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
                <div v-else>

                    <div style="display:inline; font-size: 9pt;">
                    
                        <table class="compactfullsize">
                            <tr style="border:1px solid #313132">
                                <td colspan="2">Full name: <div class="answer"></div> </td>                                
                                <td>Date of birth: <div class="answer"></div> </td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Contact information</td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Lawyer (if applicable): </td>
                            </tr>
                            <tr style="border:1px solid #313132">          
                                <td colspan="3">Address: <div class="answer"> </div> </td>
                            </tr>
                            <tr style="border:1px solid #313132">
                                <td  >City: <div class="answer"></div> </td>
                            <td style="padding-left:50px">Province: <div class="answer"></div> </td>
                                <td>Postal Code: <div class="answer"></div> </td>
                            </tr>
                            <tr style="border:1px solid #313132">
                                <td colspan="2">Email: <div class="answer"></div> </td>
                                <td>Telephone: <div class="answer"></div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
            </section>
        </div> 

        <div style="margin-top: 1rem;"></div>

<!-- <For registery> -->
        <div class="print-block">
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <div style="text-indent:4px; margin:0 0 1rem 0; font-weight:normal; font-size:12pt;"><i>For registry use only</i></div>
                
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
            <div style="margin:0.5rem 0 0 1rem; font-size:9pt;">
                <b>
                    NOTE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court
                    appearance, the court may make an order in your absence. You may also choose to file a written response in
                    reply to the application in Form 19 Written Response to Application.
                </b>
            </div>
            <div style="margin:0.2rem 0 0 1rem; font-size: 9pt;"> The court must be satisfied that:
                <ol class='resetcounteralpha'>
                    <li class='bracketalpha'>the proposed relocation is being made in good faith,</li>
                    <li class='bracketalpha'>the relocating guardian has proposed reasonable and workable arrangements to preserve the
                                            relationship between the child and the child’s other guardians, persons who are entitled to contact with
                                            the child, and other persons who have a significant role in the child’s life, and</li>
                    <li class='bracketalpha'>the relocation is in the best interests of the child.</li>
                </ol>
            </div>
        </div>

        <div class="print-block mt-5"></div>

        <div class="print-block mt-0">            
<!-- <4> -->
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
        </div>

        <div style="text-align:left; margin-top: 1rem;"><b>ABOUT THE ORDER</b></div>


<!-- <5> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I am applying for an order to prohibit the relocation of a child or children."/>                                 
        </section>


<!-- <6> -->
        <div class="print-block">
            <section>
                <div style="display:inline; margin-left:0.25rem; font-size: 9pt;">This application is about the following child(ren) that I am a guardian of:</div>          
                
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
        </div>   


<!-- <7> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
                :check="relocInfo.childBestInterestAcknowledgement?'yes':''" 
                text="I understand that I must consider the child(ren)’s best interests with respect to each order I am asking the 
                "/>
            <div style="text-indent:0; margin:0 0 0 1.75rem; font-size: 9pt;">court to make.</div>                                 
        </section> 


<!-- <8> --> 
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0"                 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="relocInfo.existingOrder?'yes':''" 
                :text="'I am attaching a copy of the written agreement or order respecting parenting arrangements referred to in'"/>
                <div style="text-indent:0; margin:0 0.25rem 0 1.75rem; font-size: 9pt;display:inline-block;">
                    section 65 of the Family Law Act made on
                </div>
                <underline-form 
                    style="text-indent:2px;display:inline" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="mmm/dd/yyyy" 
                    :italicHint="false" 
                    :text="relocInfo.existingOrderDate | beautify-date-blank"/>
                <div style="text-indent:0; margin:0 0 0 0.25rem; font-size: 9pt;display:inline">
                    that applies to the child(ren) that are the
                </div>
                <div style="text-indent:0; margin:0 0 0 1.75rem; font-size: 9pt;">
                    the subject of this application.
                </div>                                 
        </section>


<!-- <9> -->
        <div class="print-block">            
            <section>
               
                <div style="margin:0 0 0 0.5rem; display: inline; font-size: 9pt;"><i>Select only one of the options below and complete the required information</i></div>

                <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                    <check-box  style="display:inline;" boxMargin="0" inline="inline" :check="relocInfo.receivedNotice?'yes':''" text="I am attaching a copy of the notice of relocation given to me on"/>
                    <underline-form  style="margin:0 0 0.5rem 0rem;text-indent:2px;display:inline-block" textwidth="8rem" beforetext="" aftertext="." hint="mmm/dd/yyyy" :italicHint="false" :text="relocInfo.noticeDate | beautify-date-blank"/>
                </div>

                <div style="margin:0.25rem 0 0 1.25rem;  font-size: 9pt;">
                    <check-box style="display:inline;margin:0;" boxMargin="0" inline="inline" :check="!relocInfo.receivedNotice?'yes':''" text="" />
                    <underline-form  style="margin-left:0rem; text-indent:0px; display:inline" textwidth="5.7rem" beforetext="I did not receive written notice of relocation but became aware of the planned relocation on" aftertext="." hint="mmm/dd/yyyy" :italicHint="false" :text="relocInfo.foundOutDate | beautify-date-blank"/>
                    <div style="margin:0.5rem 0 0 1.05rem;  font-size: 9pt;">                   
                        <underline-form  style="margin-left:0.35rem; text-indent:5px;display:inline" textwidth="6rem" beforetext="I understand the date of the relocation of the child(ren) to be" hint="mmm/dd/yyyy" :italicHint="false" :text="relocInfo.presumedRelocationDate | beautify-date-blank"/>
                        <underline-form  style="margin:0 0 0 0.35rem; text-indent:5px;display:inline" :textwidth="relocInfo.presumedLocation.length<22 ?'9rem':'22rem'" beforetext="to" aftertext="." hint="proposed location" :italicHint="false" :text="relocInfo.presumedLocation"/> 
                    </div>                    
                    <div style="text-indent:0; margin:0.25rem 0 0 0.65rem; font-size: 9pt;"> 
                        I learned about the planned relocation:
                    </div>
                    <i style="text-indent:0;margin:0.25rem 0 0 0.65rem; display: block; font-size: 9pt;">Briefly explain how you found out about the planned relocation if you did not receive written notice</i>
                
                    <div v-if="!relocInfo.receivedNotice && relocInfo.foundOutDescription" 
                        class="answerbox">{{relocInfo.foundOutDescription}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </div> 
            </section>
        </div>   


<!-- <10> -->
        <div class="print-block">            
            <section> 
                <div style="margin:0 0 0 0.4rem; display: inline; font-size: 9pt;">
                    I believe it is in the child(ren)’s best interests to prohibit the proposed relocation because:                 
                </div>
                <div v-if="relocInfo.childBestInterestReason" 
                    class="answerbox">{{relocInfo.childBestInterestReason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>             
            </section>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { relocationOfChildInformationDataInfoType, relocationOfChildOtherPartyDataInfoType } from '@/types/Application/RelocationOfChild/PDF';
import { relocChildrenInfoDataInfoType, relocQuestionnaireSurveyDataInfoType, relocChildBestInterestSurveyDataInfoType } from '@/types/Application/RelocationOfChild';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';


@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox,
        
    }
})

export default class Form16Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;   

    otherPartyInfo: relocationOfChildOtherPartyDataInfoType[] = [];
    additionalOtherParties: relocationOfChildOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as relocationOfChildOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    relocInfo = {} as relocationOfChildInformationDataInfoType;

    existingFileNumber = '';
    filingLocationReason = '';
    childrenInfo = [{fullName:'', dob:'', currentSituation:'' }];  
    
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:18%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ] 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){
           
        this.otherPartyInfo = this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }

        if (this.result.relocChildrenInfoSurvey?.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.yourInfo = this.getYourInfo();
        this.relocInfo = this.getRelocInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
        
        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }
   } 
    
    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: relocChildrenInfoDataInfoType[] = this.result.relocChildrenInfoSurvey;
       
        for (const child of childData){            
            childInfo = {} as childrenInfoSurveyInfoType;
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.currentSituation = child.currentLiving;           
            childrenInfo.push(childInfo)
        }        

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

        let OpInformation: relocationOfChildOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = []; 
           
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as relocationOfChildOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;
                
                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getRelocInfo(){

        const relocInformation = {} as relocationOfChildInformationDataInfoType;

        if (this.result.relocQuestionnaireSurvey) {

            const relocationQuestionnaireData: relocQuestionnaireSurveyDataInfoType = this.result.relocQuestionnaireSurvey;

            relocInformation.existingOrder = (relocationQuestionnaireData.ExistingParentingArrangements == 'y');
            relocInformation.existingOrderDate = (relocationQuestionnaireData.ExistingParentingArrangements == 'y' &&
                                                    relocationQuestionnaireData.orderDate)?relocationQuestionnaireData.orderDate:']';
            relocInformation.receivedNotice = (relocationQuestionnaireData.receiveNotice == 'y');
            relocInformation.noticeDate = (relocationQuestionnaireData.receiveNotice == 'y' &&
                                            relocationQuestionnaireData.noticeDate)?relocationQuestionnaireData.noticeDate:'';
            relocInformation.foundOutDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.foundOutDate)?relocationQuestionnaireData.foundOutDate:''; 
            relocInformation.foundOutDescription = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.foundOutAboutRelocationDescription)?relocationQuestionnaireData.foundOutAboutRelocationDescription:''; 
            relocInformation.impactOnChild = (relocationQuestionnaireData.impactOnChild == 'y');
            relocInformation.presumedRelocationDate = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.relocationDate)?relocationQuestionnaireData.relocationDate:''; 
            relocInformation.presumedLocation = (relocationQuestionnaireData.receiveNotice == 'n' &&
                                            relocationQuestionnaireData.childProposedLocation)?relocationQuestionnaireData.childProposedLocation:''; 
            
        }

        if (this.result.relocChildBestInterestInfoSurvey) {

            const relocChildBestInterest: relocChildBestInterestSurveyDataInfoType = this.result.relocChildBestInterestInfoSurvey;
            relocInformation.childBestInterestAcknowledgement = relocChildBestInterest.childBestInterestAcknowledgement.includes('I understand');
            relocInformation.childBestInterestReason = relocChildBestInterest.childBestInterestDescription;
        }

        return relocInformation;
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">
    .container {
        display: inline;
        position: relative;
        padding: 0px;
        margin: 0px;
    
    
    
    }

    /* Create a custom checkbox */
    .container .checkmark {
        display: inline;
        position: absolute;
        border: 1px solid #000!important;
        padding: 1rem;
        top: 0;
        left: 0;
        height: 1em;
        width: 1em;
        background-color: #eee;
    }
</style>