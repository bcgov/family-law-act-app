<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-rflm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Reply to an Application</b></div>
                <div style="font-size:13pt;"><b>About a Family Law Matter</b></div>
                <check-box
                    inline="inline" 
                    shiftmark="1" boxMargin="0" shift="1" 
                    style="margin:0; padding:0; display:inline;" 
                    :check="includesCounter?'yes':''" 
                    text="with counter application"/>            
                <div style="font-size:10pt;"><b>FORM 6</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 28</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:locationInfo.existingFileNumber}]"
                    :fields="[{key:'name',tdClass:'border-dark text-center align-middle'},{key:'value',tdClass:'border-dark text-center align-middle'}]"
                    small
                    bordered
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="font-size:6pt; margin:.1rem 0;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:cell(value)="data">
                            <div style="font-size:7pt !important; color:#000;">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div>

        <div style="margin-top:1rem;"><b>Information about the parties</b></div>
<!-- <1> -->
        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block;" 
                textwidth="16rem" 
                beforetext="The Application About a Family Law Matter was filed by" 
                hint="full name of the other party" :italicHint="false" :text="otherPartyInfo"/>
            <div style="text-indent:5px;display:inline;">
                 . They are the other party in this case.
            </div>
            
        </section>
<!-- <2> -->
        <section>
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
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Lawyer’s statement</b></div>
<!-- <3> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">Complete this section only if you are a lawyer for the party. You may leave this section blank.</div>
                <div>
                    <check-box  inline="inline" boxMargin="0" style="margin:0 0 0 1rem;display:inline" :check="yourInfo.lawyerFiling?'yes':''" text=""/>
                    <underline-form style="text-indent:0px;display:inline;" textwidth="15.5rem" beforetext="I, " hint="full name of lawyer" :text="yourInfo.lawyerStatement.lawyerName"/>
                    <underline-form style="text-indent:2px;display:inline;" textwidth="16.25rem" beforetext=", the lawyer for" hint="full name of party" :text="yourInfo.lawyerStatement.clientName"/>
                    <div style="display:inline;">, acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>. </div>
                </div>           
            </section>
        </div>      
         
        <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
<!-- <4> -->
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
        </div>

<!-- <5> -->
        <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section>
       
        <div class="print-block">
            <div style="margin-top:1rem;"><b>About us</b></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">You may choose to complete this section or leave this section blank</i>
                <div style="margin-left:.5rem; text-indent:0rem;">
                    I would like to share the following information with the court about the cultural, linguistic, religious and spiritual 
                    upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
                <div style="margin-left:.5rem; text-indent:0rem;"></div>
                <div v-if="culturalInfo.length > 0" class="answerbox">{{culturalInfo}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>  
        </div> 

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Existing written agreements or court orders</b></div>
<!-- <7> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">There is an existing written agreement or court order about parenting arrangements, child support, contact with a child, guardianship of a child, and/or spousal support </div>          
                <div style="margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                    <i style="display:block">If yes, attach a copy of the agreement(s) or order(s) to your reply</i>
                </div>
            </section>
        </div>

 <!-- <8> -->
        <section> 
            <div style="display:inline; margin-left:0.25rem">
                There is an existing court order, agreement or plan protecting one of the parties or the child(ren), or
                restraining contact between the parties, including a protection order, an order, agreement or plan involving
                child protection services, or a peace bond, restraining order, bail condition or other criminal order
            </div>            
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                <i style="display:block">If yes, attach a copy of the order(s), agreement(s) or plan(s) to your reply</i>
            </div>
        </section>   

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Initial requirements</b></div>
<!-- <9> -->
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
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="parental responsibilities"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="parenting time"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="conditions on parenting time"/>
                    
                    <div style="margin-top:0.25rem;">Parenting arrangements order/agreement – existing <i>[see Schedule 2 of Application About a Family Law Matter]</i></div>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to parental responsibilities"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to parenting time"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to conditions on parenting time"/>
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="child support – new <i>[see Schedule 3 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="child support order/agreement – existing <i>[see Schedule 4 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="contact with a child – new <i>[see Schedule 5 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="contact order/agreement – existing <i>[see Schedule 6 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="appointing a guardian of a child <i>[see Schedule 7 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="cancelling guardianship of a child <i>[see Schedule 8 of Application About a Family Law Matter]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="spousal support – new <i>[see Schedule 9 of Application About a Family Law Matter]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="spousal support order/agreement – existing <i>[see Schedule 10 of Application About a Family Law Matter]</i>"/>                    
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
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="parental responsibilities"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="parenting time"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="conditions on parenting time"/>
                    
                    <div style="margin-top:0.25rem;">Parenting arrangements order/agreement – existing <i>[complete and attach Schedule 2]</i></div>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to parental responsibilities"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to parenting time"/>
                    <check-box  :check="selectedSchedules.includes('schedule1')?'yes':''" text="change to conditions on parenting time"/>
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="child support – new <i>[complete and attach Schedule 3]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="child support order/agreement – existing <i>[complete and attach Schedule 4]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="contact with a child – new <i>[complete and attach Schedule 5]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="contact order/agreement – existing <i>[complete and attach Schedule 6]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="appointing a guardian of a child <i>[complete and attach Schedule 7]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="cancelling guardianship of a child <i>[complete and attach Schedule 8]</i>"/>                    
                </div>

                <div style="margin-left:1rem;">                    
                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="spousal support – new <i>[complete and attach Schedule 9]</i>"/>
                    <check-box  
                        :check="selectedSchedules.includes('schedule1')?'yes':''" 
                        text="spousal support order/agreement – existing <i>[complete and attach Schedule 10]</i>"/>                    
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
<!-- <12> -->
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
              
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
<!-- <13> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Select only one of the options below and complete the required information</i>          
                <div style="margin-left:1.5rem">
                    <check-box  
                        :check="!counterAboutChildren?'yes':''" 
                        text="My counter application does not ask for any order(s) about a child or children <i>(skip section 14)</i>"/>
                    <check-box  
                        :check="counterAboutChildren?'yes':''" 
                        text="My counter application is asking for an order(s) about the following child or children:"/>                   
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
        </div>

<!-- <14> -->
        <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Note to the other party:</b></div>
            <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                <b>
                    If the reply includes a counter application, you may reply to the counter application by filing a Reply to a
                    Counter Application in Form 8, and any additional documents that may be required to be filed, within 30 days
                    after the date you receive the reply with counter application.
                </b>
            </div>
        </div>


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
import { rflmBackgroundSurveyDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';

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
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void
    
    dataReady = false;
    includesCounter = false;
    aboutChildren = false;
    counterAboutChildren = false;

    locationInfo = {} as locationInfoDataInfoType;

    otherPartyInfo='';
    yourInfo = {} as yourInformationInfoDataInfoType;
    
    existingOrders = {} as existingOrdersInfoType;    
   
    childrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    incorrectChildInfo = false;
    culturalInfo = '';
   
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
        
        console.log(this.result)       

        this.includesCounter = this.result.rflmCounterAppSurvey.counter == 'Yes';
        
        this.existingOrders = this.getExistingOrdersInfo();
        
        const childRelatedApplication = ( 
            this.selectedSchedules.includes('schedule1') ||
            this.selectedSchedules.includes('schedule2') || 
            this.selectedSchedules.includes('schedule3') ||
            this.selectedSchedules.includes('schedule4') ||
            this.selectedSchedules.includes('schedule5') || 
            this.selectedSchedules.includes('schedule6') ||
            this.selectedSchedules.includes('schedule7') || 
            this.selectedSchedules.includes('schedule8')
        )

        if (childRelatedApplication && this.result.rflmChildrenInfoSurvey?.length > 0){
            this.aboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.rflmChildBestInterestAcknowledgement;
            this.incorrectChildInfo = this.result.incorrectChildInfo == 'Yes'            
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            this.childBestInterestAcknowledmentCheck = false;
            this.incorrectChildInfo = false;
        }

        const childRelatedCounterApplication = (
            this.selectedSchedules.includes('schedule11') ||
            this.selectedSchedules.includes('schedule12') || 
            this.selectedSchedules.includes('schedule13') ||
            this.selectedSchedules.includes('schedule14') ||
            this.selectedSchedules.includes('schedule15') || 
            this.selectedSchedules.includes('schedule16') ||
            this.selectedSchedules.includes('schedule17') || 
            this.selectedSchedules.includes('schedule18')
        )

        if (childRelatedCounterApplication && this.result.rflmChildrenInfoSurvey?.length > 0){
            this.counterAboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.rflmChildBestInterestAcknowledgement;            
        } else {
            this.counterAboutChildren = false;
            this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
            this.childBestInterestAcknowledmentCheck = false;
        }        

        if (this.result.flmBackgroundSurvey?.likeToAddCulturalExplanation == 'y' && this.result.flmBackgroundSurvey?.culturalExplain){
            this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        } else {
            this.culturalInfo = '';
        } 
        
        this.otherPartyInfo = this.getOtherPartyInfo();
        this.yourInfo = this.getYourInfo();     
        this.locationInfo = this.getLocationInfo();  
    }

    public getLocationInfo(){

        let locationInformation = {} as locationInfoDataInfoType;
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
        const childData = this.result.rflmChildrenInfoSurvey;
       
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
        let existing = {existingFlm: false, existingPO: false}

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