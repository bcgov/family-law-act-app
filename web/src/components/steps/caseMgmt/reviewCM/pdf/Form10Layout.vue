<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-one-header">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Application for Case Management Order</b></div>
                <div style="font-size:9pt;"><b>Form 10</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rules 54, 55, 64, 83, and 159</div>
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
        
<!-- <1> -->
        <section>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents are:</div>
            <table class="fullsize" style="margin-top:0.5 !important">
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
                    <td>Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                    <td style="padding-left:50px"></td>
                    <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>
<!-- <2> -->
        
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem;display:inline;" 
                :check="true?'yes':''" 
                text="I understand I must give notice of this application to other party, including any other person who may be directly 
                affected by the order. To give notice, they must be served with the application and supporting documents at least 7 days 
                before the date of the court appearance unless the court allows the application to be made without notice or with less 
                than 7 days' notice."/>
        </section>

<!-- <3> -->
        <div class="print-block">
            <section> 
                <div style="display:inline;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="14.5rem" 
                        beforetext="The other party is" 
                        hint="full name of the other party/parties" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/> 
                </div>                
            </section>
        </div> 

<!-- <4> -->
        <div class="print-block mt-0">            

            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">
                    <i>Complete only if applicable. You may leave this section blank.</i>
                    <span>The following other person(s) who may be directly affected by the order is/are:</span>
                </div>

                <div v-if="true" 
                        class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;">(full name of other person(s))</div>                
            </section>
        </div>

<!-- <5> -->
        <div class="print-block mt-0">            

            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">
                    <i>Complete only if everyone consents to the order you are asking for. You may leave this section blank.</i>
                </div>

                 <div style="margin-left:1rem;">                   
                    <check-box style="" 
                        :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                        text="Each party, including any person directly affected by the order, has consented to the case management order and:"/>          
                                       
                </div>
                    
                <div style="margin-left:2rem;">
                    <i>Select only one of the following options</i>
                    <check-box style="" 
                        :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                        text="a <b>draft Consent Order</b> in Form 18 signed by each party, and any other person directly affected by the order, or their
                        lawyer, is submitted with this application and supporting documents for review without attending before the court"/>          
                    <check-box style="" 
                        :check="(filingLocationReason == 'It is the court location closest to where I live, because my case does not involve a child-related issue')?'yes':''" 
                        text="a court appearance is requested"/>                                   
                </div>
            </section>
        </div>

<!-- <6> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">I have contacted the other party to discuss available dates and times for the court appearance
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="true?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="!true?'yes':''" text="No"/> 
                </div>               
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">
                    <i>If yes, have they have agreed to a date and time for the court appearance?</i>
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="true?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="!true?'yes':''" text="No"/> 
                </div>            
            </section>
        </div>   

         <!-- <For registery> -->
        <div class="print-block">
            <div style="margin-top:0rem; font-size: 9pt;"><i>For registry use only</i></div>
            <div style="width:99%; border:1px solid; text-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin-top:0.5rem; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>

<!-- <7> -->
        <div class="print-block"> 
            <section>
                

                <div style="margin:0.25rem 0 0 3rem;font-size: 9pt;" >
                    <i>I am applying for the following case management order(s):</i>
                    <check-box style="" :check="true?'yes':''" text="transferring the court file to another registry for all purposes or specific purposes"/>
                    <check-box style="" :check="true?'yes':''" text="relating to the management of a court record, file or document, including access to a court file"/>
                    <check-box style="" :check="true?'yes':''" text="correcting or amending a filed document, including the correction of a name or date of birth"/>
                    <check-box style="" :check="true?'yes':''" text="setting a specified period for the filing and exchanging of information or evidence, including a financial statement in Form 4
                                                                    [Financial Statement]"/>
                    <check-box style="" :check="true?'yes':''" text="specifying or requiring information that must be disclosed by a person who is not a party to the case"/>
                    <check-box style="" :check="true?'yes':''" text="requiring that a parentage test be taken under section 33 [parentage tests] of the Family Law Act"/>
                    <check-box style="" :check="true?'yes':''" text="requiring access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act"/>
                    <check-box style="" :check="true?'yes':''" text="recognizing an extraprovincial order other than a support order"/>
                    <check-box style="" :check="true?'yes':''" text="waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for
                                                                    the service of a document"/>
                    <check-box style="" :check="true?'yes':''" text="waiving or modifying any other requirement under these rules, including a time limit set under these rules or a time limit set by
                                                                    an order or direction, even after the time limit has expired"/>
                    <check-box style="" :check="true?'yes':''" text="allowing a person to attend a conference or hearing using electronic communication, including by telephone or video"/>
                    <check-box style="" :check="true?'yes':''" text="adjourning a court appearance"/>
                    <check-box style="" :check="true?'yes':''" text="respecting the conduct of a party or management of a case"/>
                    <check-box style="" :check="true?'yes':''" text="relating to a report under section 211 [orders respecting reports] of the Family Law Act, including requiring that a person who
                                                                    prepared the report attend a trial as a witness"/>
                    <check-box style="" :check="true?'yes':''" text="adding or removing a party to the case, including leave to intervene under section 204(2) [intervention by Attorney General or
                                                                    other person] of the Family Law Act"/>
                    <check-box style="" :check="true?'yes':''" text="respecting the appointment of a lawyer to represent <ul><li>the interests of a child or,</li><li>a party</li></ul>"/>
                    <check-box style="" :check="true?'yes':''" text="settling or correcting the terms of an order made under the rules"/>
                    <check-box style="" :check="true?'yes':''" text="cancelling a subpoena"/>
                    <check-box style="" :check="true?'yes':''" text="changing, suspending or cancelling an order made in my absence"/>                  
                </div>                  
            </section>
        </div>

<!-- <8> -->
        <div class="print-block mt-0">            

            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">                    
                    <span>The details of the order(s) I am applying for are as follows:</span>
                    <i>Tell the court and the other party the details of the order(s) you are asking for.</i>
                </div>

                <div v-if="true" 
                        class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div>                
            </section>
        </div>

<!-- <9> -->
        <div class="print-block">
            <section>
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt; "><i>Select only one of the options below and complete the required information:</i></div>          
                 <div style="margin:0.25rem 0 0 3rem;font-size: 9pt;" >                    
                    <check-box style="" :check="true?'yes':''" text="I am not a party to the case"/>
                    <check-box style="" :check="true?'yes':''" text="I am a party to the case and the case does not involve a child related issue"/>
                    <check-box style="" :check="true?'yes':''" text="I am a party to the case and the case involves a child-related issue about the following child or children:"/>
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

<!-- <10> -->
        <div class="print-block mt-0">            

            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">                    
                    <span>The facts on which this application is based are as follows:</span>
                    <i>Provide the facts you want the court to consider. If you are applying to change, suspend or cancel an order made in your absence,
                        you must explain why you did not file a reply or attend court when required, why the order should be made and the reasons(s) for
                        any delay in making this application.</i>
                </div>

                <div v-if="true" 
                        class="answerbox"></div>
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

import UnderlineForm from "./Schedules/components/UnderlineForm.vue"
import CheckBox from "./Schedules/components/CheckBox.vue"
import OrderedCheckBox from "./Schedules/components/OrderedCheckBox.vue"
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { locationInfoDataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox        
    }
})

export default class Form10Layout extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedPathways!: string[];
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   

    otherPartyInfo=[];
    additionalOtherParties = [];
    firstOtherParty = {} as any;
    yourInfo = {} as yourInformationInfoDataInfoType;

    locationInfo = {} as locationInfoDataInfoType;
    childrenInfo: childrenInfoSurveyInfoType[] = [];

    applicantList = []
    
    filingLocationReason = '';   
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
    ]   

    public extractInfo(){        
        
        if (this.result.filingLocationSurvey && this.result.filingLocationSurvey.registryLocationReason) {
            this.filingLocationReason = this.result.filingLocationSurvey.registryLocationReason;
        }

        if (this.result.ppmChildrenInfoSurvey && this.result.ppmChildrenInfoSurvey.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this,this.otherPartyInfo.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }        
        this.yourInfo = this.getYourInfo();
         this.locationInfo = this.getLocationInfo(); 
    }  

    public getChildrenInfo() {

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.cmChildrenInfoSurvey;
       
        for (const child of childData) {            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);            
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }
    
    public getLocationInfo(){

        let locationInformation = {} as locationInfoDataInfoType;
        if (this.result.filingLocationSurvey){
            const locationData = this.result.filingLocationSurvey;
           
            locationInformation.existingFileNumber = locationData.ExistingFileNumber? locationData.ExistingFileNumber:'';
            locationInformation.courtLocation = locationData.ExistingCourt? locationData.ExistingCourt:'';

            // locationInformation.earlyResolutionRegistry = locationData.earlyResolutionRegistry;
            // locationInformation.familyJusticeRegistry = locationData.familyJusticeRegistry;
            // locationInformation.educationRegistry = locationData.familyEducationProgram;  
            // locationInformation.none = !(locationInformation.educationRegistry
            //                             || locationInformation.familyJusticeRegistry
            //                             || locationInformation.earlyResolutionRegistry);
        }
        
        return locationInformation;
    }

    public getYourInfo(){

        let yourInformation = {} as yourInformationInfoDataInfoType;
        if(this.result.yourInformationSurvey){

            const applicantInfo = this.result.yourInformationSurvey;            
            yourInformation = {
                dob: applicantInfo.ApplicantDOB?applicantInfo.ApplicantDOB:'',
                name: applicantInfo.ApplicantName?applicantInfo.ApplicantName:'',
                lawyer: applicantInfo.Lawyer == 'y',
                lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
                address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress)?applicantInfo.ApplicantAddress:''),
                contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact)?applicantInfo.ApplicantContact:''),

                lawyerFiling: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerFillingOut == 'y')?true:false,
                lawyerStatement: (applicantInfo.Lawyer == 'y' && 
                                applicantInfo.LawyerFillingOut == 'y' && 
                                applicantInfo.lawyerStatement)?{lawyerName: applicantInfo.lawyerStatement.lawyerName, clientName: applicantInfo.lawyerStatement.clientName}:{lawyerName: '', clientName: ''}
            }
                     
        }
        return yourInformation;
    }

    public getOtherPartyInfo(){

        let OpInformation = [
            {            
                dob: 'unknown',
                name: {'first': '','middle': '', 'last': ''},
                address: '',
                contactInfo: ''
            }               
        ];        

        if (this.result.otherPartyCommonSurvey && this.result.otherPartyCommonSurvey.length > 0){
            OpInformation = [];  
            // console.log(this.result.otherPartyCommonSurvey)  
            for(const party of this.result.otherPartyCommonSurvey){
                let otherParty = {            
                    dob: '',
                    name: {'first': '','middle': '', 'last': ''},
                    address: '',
                    contactInfo: ''
                }                

                if (party['knowDob'] == 'y' &&  party['dob'])
                    otherParty.dob = party['dob']

                if (party['name'])
                    otherParty.name = party['name']
                
                if (party['address'])
                    otherParty.address = party['address']
                
                if (party['contactInfo'])
                    otherParty.contactInfo = party['contactInfo']
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>