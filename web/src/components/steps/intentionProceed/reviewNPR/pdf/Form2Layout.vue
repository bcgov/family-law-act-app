<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-enf">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt; line-height:1rem;"><b>Notice of Intention to Proceed</b></div>               
                <div style="font-size:10pt; line-height:1.25rem;"><b>FORM 2</b></div>
                <div style=" line-height:1rem;">Provincial Court Family Rules</div>
                <div style=" line-height:1rem;">Rules 15 and 42</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value: existingFileNumber}]"
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
        
<!-- <1> -->
        <section>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="21rem" beforetext="My name is" hint="(full name of party)" :italicHint="false" :text="yourInfo.name | getFullName"/>.
            <underline-form style="text-indent:2px;display:inline-block;margin-left:-0.25rem;" textwidth="7rem" beforetext=" My date of birth is" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            
            <div style="text-indent:2px;margin-top:0.25rem"> 
                My contact information and address for service of court documents are:
            </div>
            <table class="compactfullsize" style="margin-top:0.15rem !important; font-size: 9pt;">
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
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="overOneYear?'yes':''" 
                text="More than one year has passed since the parties have taken any step in my case"/>           
        </section>

        <div style="margin-top: 1rem;"></div>  
<!-- <3> -->
        <section>

            The last step completed in my case, by any party, was:
            <div style="margin-left:1rem;"><i>Select only one of the options below and complete the required information</i></div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.resolveFlmDate?'yes':''" 
                    text="filing of the Notice to Resolve a Family Law Matter "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.resolveFlmDate | beautify-date-blank"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.needsAssessmentDate?'yes':''" 
                    text="completion of a needs assessment "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.needsAssessmentDate | beautify-date-blank"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.parentingEducationProgramDate?'yes':''" 
                    text="completion of a parenting education program "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.parentingEducationProgramDate | beautify-date-blank"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.consensualDisputeResolutionDate?'yes':''" 
                    text="completion of consensual dispute resolution "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.consensualDisputeResolutionDate | beautify-date-blank"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.flmDate?'yes':''" 
                    text="filing of the Application about a Family Law Matter "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.flmDate | beautify-date-blank"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="lastStepInfo.otherDate?'yes':''" 
                    text="other (specify) "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="25rem" 
                    beforetext="" 
                    hint="" 
                    :text="lastStepInfo.otherDescription"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="lastStepInfo.otherDate | beautify-date-blank"/>            
            </div>            
                                         
        </section> 

        <div style="margin-top: 1rem;"></div>       

<!-- <4> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="acknowledgeService?'yes':''" 
                text="I understand I must give notice of my intention to proceed to each other party. To give notice, they"/>                
                <div style="text-indent:30px;">must be served or provided with a copy of this document.</div>
        </section>

    <!-- <5> -->
        <div class="print-block" style="margin-top: 0rem;">
            <section> 
                <div style="display:inline;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; margin-top: 0.6rem;" 
                        textwidth="17.5rem" 
                        beforetext="The other party is:" 
                        hint="(full name of other party)"
                        aftertext="." 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>                                       
                    <underline-form 
                        style="display:inline;text-indent:2px; margin-top: 0.6rem;" 
                        textwidth="6.75rem" 
                        beforetext="Their date of birth is" 
                        hint="(mmm/dd/yyyy or unknown)" 
                        :italicHint="false"
                        aftertext="." 
                        :text="firstOtherParty.dob | beautify-date"/>
                </div>
                <div style="text-indent:1px; margin:0.25rem 0 0rem 0;">Their contact information and address for service, as I know it, are:</div>
                
                <table class="compactfullsize" style="margin-top:0.15rem !important; font-size: 9pt;">
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
                
                <div style="text-indent:5px; margin:0"><i>Additional party (Complete only if applicable. You may leave this section blank)</i></div>
                        
                <div v-if="additionalOtherParties.length>0">

                    <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    
                        <table class="compactfullsize" style="font-size: 9pt;">
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

                    <div style="display:inline;  ">
                    
                        <table class="compactfullsize" style="font-size: 9pt;">
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

                <div style="font-weight:600; font-size: 8.5pt;">
                    <div style="margin-left:1rem;">NOTE TO OTHER PARTY:</div>
                    <div style="text-indent:0px;line-height:0.9rem;">
                        If the above contact information and/or address for service is not correct, you must file a Notice of 
                        Address Change in Form 46 and serve a copy of the notice on each other party.
                    </div>
                </div>
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
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { lastStepDataInfoType, nprOtherPartyDataInfoType } from '@/types/Application/IntentionProceed';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})

export default class Form2Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;   
    otherPartyInfo: nprOtherPartyDataInfoType[] = [];
    additionalOtherParties: nprOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as nprOtherPartyDataInfoType;
    lastStepInfo = {} as lastStepDataInfoType;

    existingFileNumber = '';  
    overOneYear = false;
    acknowledgeService = false;
   
    mounted(){
        this.dataReady = false;
        // console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){    

        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }         
        
        this.yourInfo = this.getYourInfo();        
        this.lastStepInfo = this.getLastStepInfo();
         this.result.noticeIntentionProceedSurvey?.lastStep;
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNprConfirmationSurvey?.confirmation == 'Confirmed';
        this.overOneYear = !this.result.noticeIntentionProceedSurvey?.unresolvedLessThanYear;
    } 

    public getYourInfo(){          

        if(this.result?.yourInformationNprSurvey){            
            return getYourInformationResults(this.result?.yourInformationNprSurvey); 
        } else {
            return {} as yourInformationInfoDataInfoType;
        }
            
    }

    public getOtherPartyInfo(){

        let OpInformation: nprOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyNprSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyNprSurvey;
        
            for(const party of otherPartyData){ 
                const otherParty = {} as nprOtherPartyDataInfoType;               

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

    public getLastStepInfo(){     
        
        const lastStepInfo = {
            resolveFlmDate: "",
            needsAssessmentDate: "",
            parentingEducationProgramDate: "",
            consensualDisputeResolutionDate: "",
            flmDate: "",
            selected: "",
            otherDate: "",
            otherDescription: ""
        }

        if(this.result?.noticeIntentionProceedSurvey?.lastStep && this.result?.noticeIntentionProceedSurvey?.unresolvedFlm == 'y'){  
            
            const lastStepData = this.result?.noticeIntentionProceedSurvey?.lastStep;
            lastStepInfo.selected = lastStepData.selected;
            if (lastStepInfo.selected == 'resolveFlm'){
                lastStepInfo.resolveFlmDate = lastStepData.resolveFlmDate;

            } else if (lastStepInfo.selected == 'parentingEducationProgram'){
                lastStepInfo.parentingEducationProgramDate = lastStepData.parentingEducationProgramDate;

            } else if (lastStepInfo.selected == 'needsAssessment'){
                lastStepInfo.needsAssessmentDate = lastStepData.needsAssessmentDate;

            } else if (lastStepInfo.selected == 'flm'){
                lastStepInfo.flmDate = lastStepData.flmDate;

            } else if (lastStepInfo.selected == 'consensualDisputeResolution'){
                lastStepInfo.consensualDisputeResolutionDate = lastStepData.consensualDisputeResolutionDate;

            } else if (lastStepInfo.selected == 'other'){
                lastStepInfo.otherDate = lastStepData.otherDate;
                lastStepInfo.otherDescription = lastStepData.otherDescription
            }
            
        }

        return lastStepInfo;
    
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