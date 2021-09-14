<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Application for Order</b></div>
                <div style="font-size:11pt;"><b>Prohibiting the Relocation of a Child</b></div>
                <div style="font-size:9pt;"><b>FORM 16</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rule 80</div>
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

<!-- <For registery> -->
        <div class="print-block">
            <div style="margin:0 0 0 1rem; font-size: 9pt;"><i>For registry use only</i></div>
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin:0.5rem 0 0 1rem; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
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

        <div style="text-align:left;"><b>ABOUT THE ORDER</b></div>


<!-- <4> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I am applying for an order to prohibit the relocation of a child or children."/>                                 
        </section>


<!-- <5> -->
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


<!-- <6> -->
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


<!-- <7> --> 
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


<!-- <8> -->
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


<!-- <9> -->
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

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import OrderedCheckBox from "./components/OrderedCheckBox.vue"
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { relocationOfChildInformationDataInfoType, relocationOfChildOtherPartyDataInfoType } from '@/types/Application/RelocationOfChild/PDF';
import { relocChildrenInfoDataInfoType, relocQuestionnaireSurveyDataInfoType, relocChildBestInterestSurveyDataInfoType } from '@/types/Application/RelocationOfChild';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateYourInformation';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox        
    }
})

export default class Form16Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   

    otherPartyInfo: relocationOfChildOtherPartyDataInfoType[] = [];
    additionalOtherParties: relocationOfChildOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as relocationOfChildOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    relocInfo = {} as relocationOfChildInformationDataInfoType;

    existingFileNumber = ''
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
        this.getLocationInfo()
    } 
    
    public getLocationInfo(){                
        const locationData = this.result.filingLocationSurvey;           
        this.existingFileNumber = locationData?.ExistingFileNumber? locationData.ExistingFileNumber:'';        
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
                let otherParty = {} as relocationOfChildOtherPartyDataInfoType;               

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

        let relocInformation = {} as relocationOfChildInformationDataInfoType;

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