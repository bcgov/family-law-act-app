<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-cmo">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Application for Case Management Order</b></div>
                <div style="font-size:10pt;"><b>Form 10</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 54, 55, 64, 83, and 159</div>
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
                            <div style="font-size:8pt !important; color:#000;">{{data.value}}</div>                                           
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
                    <td colspan="2">Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                    <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>

        <div style="margin-top: 1.5rem;"></div>
        
<!-- <2> -->        
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="form10Info.understandNotice?'yes':''" 
                marginLeft="1.5rem"
                text="I understand I must give notice of this application to other party, including any other person who"/>
            <div style=" text-indent:0; margin:0 0 -0.25rem 1.65rem;"> 
                may be directly affected by the order. To give notice, they must be served with the application and
                supporting documents at least 7 days before the date of the court appearance unless the court 
                allows the application to be made without notice or with less than 7 days' notice."
            </div>
        </section>

        <div style="margin-top: 1.5rem;"></div>

<!-- <3> -->
        <div class="print-block">
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
        </div> 

        <div style="margin-top: 1.5rem;"></div>

<!-- <4> -->
        <div class="print-block mt-0">
            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">
                    <i>Complete only if applicable. You may leave this section blank.</i>
                </div>
                <div style="text-indent:0;">The following other person(s) who may be directly affected by the order is/are:</div>
                
                <div v-if="form10Info.otherPersonsList" class="answerbox">{{form10Info.otherPersonsList}}</div>
                <div v-else style="margin-bottom:3rem;">                    
                </div>                
            </section>
        </div>

        <div style="margin-top: 1.5rem;"></div>

<!-- <5> -->
        <div class="print-block mt-0">
            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">
                    <i>Complete only if everyone consents to the order you are asking for. You may leave this section blank.</i>
                </div>

                 <div style="margin-left:1rem;">                   
                    <check-box  
                        :check="form10Info.givenConsent?'yes':''" 
                        text="Each party, including any person directly affected by the order, has consented to the case management order and:"/>
                </div>
                    
                <div style="margin-left:2.75rem;">
                    <i>Select only one of the following options</i>
                    <check-box  
                        :check="form10Info.givenConsent && (form10Info.consentDirection == 'fileForm18')?'yes':''" 
                        text="a <b>draft Consent Order</b> in Form 18 signed by each party, and any other person directly affected by the order, or their
                        lawyer, is submitted with this application and supporting documents for review without attending before the court"/>          
                    <check-box  
                        :check="form10Info.givenConsent && (form10Info.consentDirection == 'scheduleAppearance')?'yes':''" 
                        text="a court appearance is requested"/>                                   
                </div>
            </section>
        </div>

<!-- <6> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; font-size: 9.45pt;">
                    I have contacted the other party to discuss available dates and times for the court appearance
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="form10Info.contactedOP?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="!form10Info.contactedOP?'yes':''" text="No"/> 
                </div>
                              
                <div style="margin-left:1.0rem;">
                    <i>If yes, have they have agreed to a date and time for the court appearance?</i>                
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="form10Info.contactedOP && form10Info.oPAgreed?'yes':''"  text="Yes"/>                        
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-5" marginLeft="0.75rem" :check="form10Info.contactedOP && !form10Info.oPAgreed?'yes':''" text="No"/> 
                </div>            
            </section>

         <!-- <For registery> -->
                 
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
            </b></div>
        </div>

        <div class="print-block mt-0">
            <div style="margin-top:1rem;"><b>Filing location</b></div>            
<!-- <7> -->
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

<!-- <8> -->
        <div class="print-block"> 
            <section>
                <div style="display:inline; margin-left:0.25rem;"> I am applying for the following case management order(s): </div>
                <div style="margin:0.25rem 0 0 2rem;font-size: 10pt;" >                    
                    <check-box  :check="form10Info.caseList.includes('fileTransfer')?'yes':''" text="transferring the court file to another registry for all purposes or specific purposes"/>
                    <check-box  :check="form10Info.caseList.includes('fileAccess')?'yes':''" text="relating to the management of a court record, file or document, including access to a court file"/>
                    <check-box  :check="form10Info.caseList.includes('fileCorrection')?'yes':''" text="correcting or amending a filed document, including the correction of a name or date of birth"/>
                    <check-box  :check="form10Info.caseList.includes('settingTime')?'yes':''" text="setting a specified period for the filing and exchanging of information or evidence, including a financial statement in Form 4
                                                                    <i>[Financial Statement]</i>"/>
                    <check-box  :check="form10Info.caseList.includes('nonPartyDisclosure')?'yes':''" text="specifying or requiring information that must be disclosed by a person who is not a party to the case"/>
                    <check-box  :check="form10Info.caseList.includes('section33')?'yes':''" text="requiring that a parentage test be taken under section 33 <i>[parentage tests]</i> of the Family Law Act"/>
                    <check-box  :check="form10Info.caseList.includes('section242')?'yes':''" text="requiring access to information in accordance with section 242 <i>[orders respecting searchable information]</i> of the Family Law Act"/>
                    <check-box  :check="form10Info.caseList.includes('section12')?'yes':''"  
                                text="authorizing an official of the court, in accordance with section 10 of the Family Orders and Agreements Enforcement Assistance Act (Canada), to make an application under section 12 of that Act for the release of information"/>
                    <check-box  :check="form10Info.caseList.includes('otherProvinceOrder')?'yes':''" text="recognizing an extraprovincial order other than a support order"/>
                    <check-box  :check="form10Info.caseList.includes('changeServiceRequirement')?'yes':''" text="waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for
                                                                    the service of a document"/>
                    <check-box  :check="form10Info.caseList.includes('changeRequirement')?'yes':''" text="waiving or modifying any other requirement under these rules, including a time limit set under these rules or a time limit set by
                                                                    an order or direction, even after the time limit has expired"/>
                    <check-box  :check="form10Info.caseList.includes('remoteAttendance')?'yes':''" text="allowing a person to attend a court appearance using a different method of attendance"/>
                    <check-box  :check="form10Info.caseList.includes('adjourningAppearance')?'yes':''" text="adjourning a court appearance"/>
                    <check-box  :check="form10Info.caseList.includes('rule112')?'yes':''" text="respecting the conduct of a party or management of a case"/>
                    <check-box  :check="form10Info.caseList.includes('section211')?'yes':''" text="relating to a report under section 211 <i>[orders respecting reports]</i> of the Family Law Act, including requiring that a person who
                                                                    prepared the report attend a trial as a witness"/>
                    <check-box  :check="form10Info.caseList.includes('section204')?'yes':''" text="adding or removing a party to the case, including leave to intervene under section 204(2) <i>[intervention by Attorney General or
                                                                    other person]</i> of the Family Law Act"/>
                    <check-box  :check="form10Info.caseList.includes('lawyerAppointment')?'yes':''" text="respecting the appointment of a lawyer to represent" />
                    <ol style="margin:0 0 0 -0.5rem" class='resetcounterroman' > <li class='bracketroman'> the interests of a child or,</li><li class='bracketroman'>a party</li></ol>
                    <check-box  :check="form10Info.caseList.includes('orderSettlement')?'yes':''" text="settling or correcting the terms of an order made under the rules"/>
                    <check-box  :check="form10Info.caseList.includes('subpoenaCancelation')?'yes':''" text="cancelling a subpoena"/>
                    <check-box  :check="form10Info.caseList.includes('orderOfAbsenceChange')?'yes':''" text="changing, suspending or cancelling an order made in my absence"/>                  
                </div>                  
            </section>
        </div>

<!-- <9> -->
        <div class="print-block mt-0">
            <section>
                <div style="display:inline; margin:0 0 0 0.05rem">                    
                    The details of the order(s) I am applying for are as follows:
                </div>
                <div style="text-indent:0; margin:0 0 0 0.25rem">
                    <i>Tell the court and the other party the details of the order(s) you are asking for</i>
                </div>

                <div v-if="form10Info.orderDetails" class="answerbox">{{form10Info.orderDetails}}</div>
                <div v-else style="margin-bottom:3rem;"></div>                
            </section>
        </div>

<!-- <10> -->
        <div class="print-block">
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
        </div> 

<!-- <11> -->
        <div class="print-block mt-0">            

            <section>
                <div style="display:inline; margin:0 0 0 0.05rem">                    
                    The facts on which this application is based are as follows:
                </div>
                <div style="text-indent:0; margin-left:0.6rem">
                    <i>Provide the facts you want the court to consider. If you are applying to change, suspend or cancel an order made in your absence,
                        you must explain why you did not file a reply or attend court when required, why the order should be made and the reasons(s) for
                        any delay in making this application.</i>
                </div>

                <div class="answerbox" v-if="includesFoaeaaOnly">
                    Please see the affidavit filed in support of this application.
                </div>
                <div v-if="!includesFoaeaaOnly && form10Info.orderFacts" class="answerbox">
                    {{form10Info.orderFacts}}
                </div>
                <div v-else-if="!includesFoaeaaOnly && !form10Info.orderFacts" style="margin-bottom:3rem;"></div>                
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