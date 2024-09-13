<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
    <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="margin-left:-20px;font-size: 14pt;"><b>Written Response to Application</b></div>
                <div style="margin-left:-30px;font-size: 9pt;" >
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a case management order')?'yes':''" text="for case management order"/>
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a protection order')?'yes':''" text="about a protection order" />
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a priority parenting matter')?'yes':''" text="about a priority parenting matter"/>

                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('prohibiting relocation of a child')?'yes':''" text="about prohibiting relocation of a child"/>
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('an order under the Family Maintenance Enforcement Act')?'yes':''" text="for order under the <i>Family Maintenance Enforcement Act</i>" />
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('enforcement')?'yes':''" text="about enforcement"/>
                </div> 
                <div style="margin-left:-20px;font-size: 14pt;"><b>Form 19</b></div> 
                <div style="margin-left:-20px;font-size:9pt;">Provincial Court Family Rules</div>
                <div style="margin-left:-20px;font-size:9pt;">Rules 86, 137 and 142.1</div>
                
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
                    <div style="float: left; width: 50%; padding: 2px;"> Document number:<br/><i>For registry use only </i></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>
        <div>
        <div style="margin-left:-20px;margin-top: 0px;">&nbsp;</div>
        <div style="margin-left:-20px;margin-top: 100px;">This Written Response to Application provides notice to each party,</div> 
        <div style="margin-left:-20px;margin-top: -2px;">and the court, of a party’s reply to an application.</div>        
        </div>
        <div style="margin-top: 0.3rem;"></div>
        <div style="margin-left:-20px;border-style: dashed; border-color: black; float: left; padding:0.5rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul>
            <li>You can use this form to file a written response to an application. 
                You must still attend court. It is used in addition to, not in place of, attending court.

            </li>
            <li>For guidance filling in this form, please read the guidebook. The guide is available
                online at <a style="color:#1C35F4;" href="www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.

            </li>
            
        </ul>
        </div>
<!-- <1> -->
    <div>
        <div style="margin-left:-20px;width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.5rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 1 | About the Parties</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>1. My full name</b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="383px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;margin-left:16px;">
                        My <b>date of birth </b> is:
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="362px"
                        beforetext="" hint="(dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="150px" :text="yourInfo.dob | beautify-date-full" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>2. </b>The <b>other party’s full name is:</b>
                    </div>
                    <div v-for="otherparty,inx in otherPartyInfo" :key="inx" style="font-size: 9pt; display:inline;">
                    <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;"
                        textwidth="280px" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="Full name of party/parties" 
                        textBackgroundColor="#dedede" hintMargin="80px"
                        :italicHint="false" 
                        :text="otherparty.name | getFullName"/> 
                    </div> 
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 35px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size: 9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    Copy the party information from a filed document in your case. It should match.
                </p>
        </div>
    </div>
<!-- <2> -->
    <div>
        <div style="margin-left:-20px;width: 80%; float: left; margin-right: 10px;">
            <!-- <div style="margin-top: 1rem;"></div> -->
            <div style="background: #626262; color: white; font-size: 11pt;width:99%;">
                    <b>Part 2 | Replying to an application</b>
            </div>
        </div>
        <div style="margin-left:-20px;width: 85%; float: left; margin-right: 10px;">
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>3. </b>I am completing this written response <b>to reply to the application about:</b>                         
                    </div>
                    <div style="display: inline-block; font-size: 9.5pt;margin-left:15px;">
                        <i>Briefly describe the type of application</i>                         
                    </div>
                    <div style="margin-top: 0.2rem;"></div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="514px"
                        beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="wrInfo.applicationsList" />
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <span style="display: inline-block; font-size: 11pt;">
                        <b>&nbsp;made by</b> <i>(name of person)</i>:
                    </span>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="330px"
                        beforetext="" hint="Name of person who made the application" :italicHint="false" textBackgroundColor="#dedede" hintMargin="80px" :text="wrInfo.otherPartiesList" />
            </div>
        </div>
        <div style="margin-left:-20px;width: 85%; float: left; margin-right: 10px;">            
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="float: left;width:35%;">
                        <div style="font-size: 11pt;float: right;"><b>on</b><i>(filed date)</i>:</div>
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="322px"
                        beforetext="" hint="(dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="135px" :text="wrInfo.applicationFiledOn | beautify-date-full" />
            
            </div>
        </div>   
            <div style="margin-left:-20px;width: 90%; float: left; margin-right: 10px;">
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                <div style="display: inline-block; font-size: 11pt;">
                        <b>4. </b>  <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;margin-top:-20px;" :check="true?'yes':''" text=""/>                       
                </div>
                <div style="margin-top:-25px;text-indent:47px;text-align: justify;text-justify: inter-word;">I understand to reply to the application <b>I must attend court</b> on the date</div>
                    <div style="text-indent:47px;text-align: justify;text-justify: inter-word;">and time for the court appearance referred to in the application <b>and I </b></div>
                    <div style="text-indent:47px;text-align: justify;text-justify: inter-word;"><b>may file and serve</b> this written response on each other party before</div>  
                    <div style="text-indent:47px;text-align: justify;text-justify: inter-word;">  that date.</div>
            </div>   
                  
            
        </div>          
    </div>
<!-- <3> -->
    <div class="print-block">
        <div style="margin-left:-20px;width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white;">
                    <span style="font-size: 11pt;line-height:5px !important;"><b>Part 3 | Agreement with orders – </b></span>
                    <span style="font-size: 9pt;padding:2px;">Complete this part only if you agree to all or part of the order requested by the other party in their application. You may leave this part blank</span>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin-top:5px;margin-left:20px;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>5. </b><i>Select the option that applies and complete the additional information,</i></div>
                <div style="font-size: 11pt;margin-left:20px;"><i>as applicable</i></div>
            </div>
               
        <div>
    
        <div style="text-indent: 20px;margin-left:15px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;"  :check="wrInfo.agreed?'yes':''" text="<b>I agree to the order</b> as requested by the other party"/>               
        </div>

        <div  style="text-indent: 20px;margin-left:15px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;"  :check="wrInfo.partialagreed?'yes':''" text=""/>
        <div style="margin-top:-20px;text-indent:47px;">
            <b>I agree only to the following order term(s)</b> requested by the other party:</div> 
        <div style="text-indent:47px;">Provide details of the order term(s) you agree to &nbsp;        
        </div>  
        <!-- <div  style="margin-left:47px;"> -->
        <div v-if="wrInfo.agreed && wrInfo.agreeDetails" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:100px;">{{wrInfo.agreeDetails}}</div>
        <div v-else style="margin-bottom:3rem;"></div> 
        </div>
        
        <div>
            <div style="text-align: justify;text-justify: inter-word; margin-left:20px;margin-top:10px;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>6. </b>I wish to provide the following <b>information to the court</b> about the </div>
                <div style="font-size: 11pt;margin-left:20px;">application even though I agree:</div>
            </div>
            <!-- <div  style="margin-left:57px;"> -->
                <div v-if="wrInfo.agreeAdditionalDetailsYesNo && wrInfo.agreeAdditionalDetails" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:100px;">{{wrInfo.agreeAdditionalDetails}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
        </div>
           
        </div>  
            
           
        </div>
        
    </div>     
<!-- <4A> -->
    <div>
        <div style="margin-left:-20px;width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white;">
                    <span style="font-size: 11pt;line-height:5px !important;"><b>Part 4 | Disagreement with order – </b></span>
                    <span style="font-size: 9pt;padding:2px;">Complete this part only if you disagree with all or part of the order requested by the other party in their application. You may leave this part blank.</span>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>7. </b><i>Select the option that applies and complete the additional information,</i></div>
                <div style="font-size: 11pt;margin-left:20px;"><i>as applicable</i></div>
            </div>
               
        <div>    
        <div style="text-indent: 20px;margin-left:10px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;"  :check="wrInfo.disagree?'yes':''" text="<b>I disagree with the order</b> as requested by the other party"/>               
        </div>

        <div  style="text-indent: 20px;margin-left:10px;">
        <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;"  :check="wrInfo.partialdisagree?'yes':''" text=""/>
        <div style="margin-top:-20px;text-indent:47px;">
        <b>I disagree only with the following order term(s) </b>as requested by the</div> 
        <div style="text-indent:47px;">other party:</div>
        <div style="text-indent:47px;font-size:9.5pt;"><i>Provide details of the order term(s) you disagree to </i>&nbsp;        
        </div>  
        <!-- <div  style="margin-left:47px;"> -->
        <div v-if="wrInfo.disagree && wrInfo.disagreeDetails" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:100px;">{{wrInfo.disagreeDetails}}</div>
        <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:100px;"></div>                
    </div>        
        
          
        </div>
        
        
        </div> 
        
    </div>   
    <!-- <4B> -->
        <div>
        <div style="margin-left:-20px;width: 80%; float: left; margin-right: 10px;">
            
               
        <div>    
        
        <div>
            <div style="text-align: justify;text-justify: inter-word; margin-left:20px;margin-top:10px;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>8. I do not agree with the order requested</b> by the other party because:</div>
            </div>
            <!-- <div  style="margin-left:57px;"> -->
            <div v-if="wrInfo.partialdisagree && wrInfo.disAgreeDetailsOtherParty" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:150px;">{{wrInfo.disAgreeDetailsOtherParty}}</div>
            <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:150px;"></div>                

        </div>  
        <div>
            <div style="text-align: justify;text-justify: inter-word; margin-left:20px;margin-top:10px;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>9. </b>I am <b>applying for the order to be made as follows:</b></div>
                <div style="text-indent:22px;font-size:9.5pt;"><i>Provide the details of the order(s) about this issue that you want the court to make</i></div>  
                <div style="text-indent:22px;font-size:9.5pt;"><i>instead of what the other party has asked for </i>&nbsp;</div>     
            </div>
            <!-- <div  style="margin-left:57px;"> -->
                <div v-if="wrInfo.orderDetails" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:200px;" v-html="wrInfo.orderDetails">{{wrInfo.orderDetails}}</div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;"></div>                

            
        </div> 
        <div>
            <div style="text-align: justify;text-justify: inter-word; margin-left:20px;margin-top:10px;font-size: 11pt;">
                <div style="font-size: 11pt;"><b>10.</b> The <b>facts</b> on which this written response is based are as follows:</div>
                <div style="margin-left:30px;font-size: 9pt;"><i>Provide the facts you want the court to consider when they are making a decision about
                    the application, including why the order you are requesting should be made instead of the
                    order the other party has asked for</i></div>
            </div>
            <!-- <div  style="margin-left:57px;"> -->
                <div v-if="wrInfo.orderFacts" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:200px;">{{wrInfo.orderFacts}}</div>
                <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:200px;"></div>                
        </div> 
          
        </div>
        
        
        </div> 
        <div style="float: right;width: 18%; margin-top:220px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size: 9pt;">
                <p>
                    <b-icon-info-circle-fill/>
                    <br />
                    If you want an order about a different matter, including a family law matter, you must file your own application.
                </p>
        </div>
        <div style="float: right;width: 18%; margin-top:120px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size: 9pt;">
                <p>
                    <b-icon-info-circle-fill/>
                    <br />
                    If you choose to, you can prepare an Affidavit – General in Form 45 to provide evidence in writing to support your response. You can also give spoken evidence in court.
                </p>
        </div>
        
    </div> 
<!-- <4C> -->
        <div>
        <div style="margin-left:-20px;width: 85%; float: left; margin-right: 10px;margin-top:50px;">
        <div style="margin-left:30px;font-size: 9.5pt;text-indent:5px;width: 85%;">
            <i>To add more, select the box below and attach a page with the additional information</i>
        </div>
        <div style="text-indent: 20px;margin-left:20px;">
                <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -17px;" :check="''" text=""/> 
                <span style="margin-top:-22px;text-indent:37px;font-size: 11pt;"><b>Additional Pages</b>&nbsp;</span><span style="color:#414142;"><b>(see attached)</b></span>  
        </div>
        </div> 
        
        <div style="float: right;width: 18%;margin-top:-90px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size: 9pt;">
                <p>
                    <b-icon-paperclip/>
                    <br />
                    If you need more space, select the box, and remember to include your additional page(s).
                </p>    
        </div>
    </div> 
<!--5 -->
<div class="print-block">
        <div style="width: 80%; float: left; margin-right: 10px; margin-top:60px;">
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 5 |Address for service</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin-left:20px;margin-top:10px;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>11. </b></span>My <b>address for service</b> of court documents and contact information is:
                <br/>
                <div style="margin-left:17px;font-size: 9pt;text-indent:5px;">
                    <i>You must provide an address for service and contact number, but it does not have to be</i>
                </div>
                <div style="margin-left:17px;font-size: 9pt;text-indent:5px;">
                    <i> your own if you don’t want to</i>
                </div>
                
                <div style="width: 100%;">
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
            </div>

                    <div style="margin-top: 0.5rem;"></div>
                
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
        
        <div style="float: right;width: 18%; margin-top: 95px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size: 9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about how this information will be used and who will have access to it, see the guidebook.
                </p>
        </div>
        
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
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { getWrittenResponseApplications } from '@/components/utils/ReplyPathways';

import { form19DataInfoType, writtenResponseOtherPartyDataInfoType } from '@/types/Application/WrittenResponse/PDF';
import { aboutWrittenResponseOrderSurveyDataInfoType, agreeDisagreeSurveyDataInfoType, wrReplyingToApplicationSurveyDataInfoType } from '@/types/Application/WrittenResponse';

@Component({
    components:{
        UnderlineForm,
        CheckBox        
    }
})

export default class Form19Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.State
    public types!: string[];    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;
    wrInfo = {} as form19DataInfoType;
    
    existingFileNumber = '';
    filingLocationReason = '';  
    
    
    otherParties: string[] = [];
    otherPartyInfo = [];
    

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
        this.yourInfo = this.getYourInfo();
        this.otherPartyInfo = this.getOtherPartyInfo();
        this.wrInfo = this.getWrInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: writtenResponseOtherPartyDataInfoType[] = [];        

        if (this.result?.otherPartyCommonSurvey?.length > 0){
            
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as writtenResponseOtherPartyDataInfoType;

                if (party.name)
                    otherParty.name = party.name;
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }
    
    public getWrInfo() {

        const wrInformation = {} as form19DataInfoType;

        wrInformation.caseList = getWrittenResponseApplications(this.types);
       

        wrInformation.applicationsList = (wrInformation.caseList)?wrInformation.caseList.join(' and '):'';

        wrInformation.otherPartiesList = '';
        wrInformation.applicationFiledOn = '';

        if (this.result.wrReplyingToApplicationSurvey) {
            const wrReplyingToApplicationData: wrReplyingToApplicationSurveyDataInfoType = this.result.wrReplyingToApplicationSurvey;
            const applicants = [];

            for (const applicant of wrReplyingToApplicationData.partiesMakingApplication){

                if (applicant == "other"){
                    if (wrReplyingToApplicationData.partiesMakingApplicationComment){
                        applicants.push(wrReplyingToApplicationData.partiesMakingApplicationComment)
                    }
                } else {
                    applicants.push(applicant)

                }
            }
            
            wrInformation.otherPartiesList = applicants.join(', ');
            wrInformation.applicationFiledOn = wrReplyingToApplicationData.applicationFiledOn;
        }

        wrInformation.orderFacts = '';
        wrInformation.orderDetails = '';
        

        if (this.result.aboutWrittenResponseOrderSurvey) {
            const aboutWrOrderData: aboutWrittenResponseOrderSurveyDataInfoType = this.result.aboutWrittenResponseOrderSurvey;
            if (aboutWrOrderData.requiredChanges == 'y'){
                wrInformation.orderDetails = aboutWrOrderData.orderDescription;
                wrInformation.orderFacts = aboutWrOrderData.applicationFacts;
            }
        }

        wrInformation.agreed = false;
        wrInformation.disagree = false;
        wrInformation.partialagreed = false;
        wrInformation.partialdisagree = false;
        wrInformation.agreeAdditionalDetailsYesNo = false;
        wrInformation.agreeDetails = '';
        wrInformation.disagreeDetails = '';
        wrInformation.agreeAdditionalDetails = '';
        wrInformation.disAgreeDetailsOtherParty = '';

        if (this.result.agreeDisagreeSurvey) {
            const agreeDisagreeData: agreeDisagreeSurveyDataInfoType = this.result.agreeDisagreeSurvey;
            wrInformation.agreed = agreeDisagreeData.agreeDisagree.includes('agree');
            wrInformation.disagree = agreeDisagreeData.agreeDisagree.includes('disagree');
            wrInformation.partialagreed = agreeDisagreeData.agreeDisagree.includes('partialagree');
            wrInformation.partialdisagree = agreeDisagreeData.agreeDisagree.includes('partialdisagree');
            wrInformation.agreeAdditionalDetailsYesNo = agreeDisagreeData.agreeAdditionalDetailsYesNo && agreeDisagreeData.agreeAdditionalDetailsYesNo.includes('y');
            
            if (wrInformation.agreed){
                wrInformation.agreeDetails = agreeDisagreeData.agreeDetails;
                if (wrInformation.agreeAdditionalDetailsYesNo){
                    wrInformation.agreeAdditionalDetails = agreeDisagreeData.agreeAdditionalDetails;
                }
            }
            if (wrInformation.disagree){
                wrInformation.disagreeDetails = agreeDisagreeData.disAgreeDetails;
                wrInformation.disAgreeDetailsOtherParty = agreeDisagreeData.disAgreeDetailsOtherParty;
            }            
        }

       
        return wrInformation;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>