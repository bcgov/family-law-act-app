<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Intention to Proceed</b></div>               
                <div style="font-size:10pt;"><b>FORM 2</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 15 and 42</div>
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
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="17rem" beforetext="My name is" hint="(full name of party)" :italicHint="false" :text="yourInfo.name | getFullName"/>.
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="17rem" beforetext="My date of birth is" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                My contact information and address for service of court documents are:
            </div>
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
                :check="acknowledge?'yes':''" 
                text="More than one year has passed since the parties have taken any step in my case"/>           
        </section>

        <div style="margin-top: 1rem;"></div>  
<!-- <3> -->
        <section>

            The last step completed in my case, by any party, was:
            <i>Select only one of the options below and complete the required information</i> 

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="filing of the Notice to Resolve a Family Law Matter "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="completion of a needs assessment "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="completion of a parenting education program "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="completion of consensual dispute resolution "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="filing of the Application about a Family Law Matter on "/>                
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="true?'yes':''" 
                    text="other (specify) "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="22rem" 
                    beforetext="" 
                    hint="" 
                    :text="''"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="''"/>            
            </div>

            
                                         
        </section> 

        <div style="margin-top: 1rem;"></div>       

<!-- <4> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
                :check="acknowledge?'yes':''" 
                text="I understand I must give notice of my intention to proceed to each other party. To give notice, they must be served or provided with a copy of this document."/>           
        </section>

    <!-- <5> -->
        <div class="print-block" style="margin-top: 0rem;">
            <section> 
                <div style="display:inline;  ">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; margin-top: 0.6rem;" 
                        textwidth="16rem" 
                        beforetext="The other party is:" 
                        hint="(full name of other party)" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <div style="display:inline;">.</div>
                    <div style="margin:0.25rem 0 0 1rem;">
                        <underline-form 
                            style="display:inline;text-indent:0px; margin-top: 1rem;" 
                            textwidth="8rem" 
                            beforetext="Their date of birth is" 
                            hint="(mmm/dd/yyyy)" 
                            :italicHint="false" 
                            :text="firstOtherParty.dob | beautify-date"/>
                        <div style="text-indent:1px; margin-top: 1rem;display:inline;">. Their contact information, as I know it, is:</div>
                    </div>
                    <table class="fullsize">
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
                <div style="text-indent:5px; margin:0"><i>Additional party (Complete only if applicable. You may leave this section blank)</i></div>
                        
                <div v-if="additionalOtherParties.length>0">

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

                    <div style="display:inline;  ">
                    
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
import { nprOtherPartyDataInfoType } from '@/types/Application/IntentionProceed';

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

    existingFileNumber = '';  
    acknowledge = false;
   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
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
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledge = this.result.addressChangeNoticeSurvey?.acknowledgement?.length>0;
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