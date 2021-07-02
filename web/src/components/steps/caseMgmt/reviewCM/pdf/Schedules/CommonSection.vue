<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-cm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Application for Case Management Order</b></div>
                <div style="font-size:13pt;"><b>Without Notice or Attendance</b></div>
                <div style="font-size:10pt;"><b>FORM 11</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 65 and 78</div>
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
                    <td>Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                    <td style="padding-left:50px"></td>
                    <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>

<!-- <2> -->
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

        <div style="margin-top:1rem;"></div>
<!-- <3> -->        
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="true?'yes':''" 
                marginLeft="1.5rem"
                text="I am applying for a case management order without notice to any other party and I understand that"/>
            <div style=" text-indent:0; margin:0 0 -0.25rem 1.65rem;"> 
                I will be required to serve a copy of any order I receive on each other party along with a copy of this
                application and any supporting document(s).
            </div>
        </section>

<!-- <4> -->
        <div class="print-block">
            <section>
                <div style="display:inline; margin-left:0.25rem; "><i>Select only one of the options below and complete the required information:</i></div>          
                 <div style="margin:0.25rem 0 0 1rem;font-size: 9.51pt;" >                    
                    <check-box marginLeft="1.5rem" style="" :check="true?'yes':''" text="I am not a party to the case"/>
                    <check-box marginLeft="1.5rem" style="" :check="true?'yes':''" text="I am a party to the case and the case does not involve a child related issue"/>
                    <check-box marginLeft="1.5rem" style="" :check="true?'yes':''" text="I am a party to the case and the case involves a child-related issue about the following child or children:"/>
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

<!-- <5> -->
        <div class="print-block"> 
            <div style="margin-top:1rem;"><b>ABOUT THE ORDER</b></div>
            <section>
                <div style="display:inline; margin-left:0.15rem;"> I am applying for the following case management order(s): </div>
                <div style="margin-left:1.1rem;"><i>Select all that apply and complete the required schedule(s)</i></div>
                <div style="margin:0.25rem 0 0 1.7rem;font-size: 10pt;" >                    
                    <check-box style="" :check="true?'yes':''" text="allowing a person to attend a conference or hearing using electronic communication, including by telephone or video <i>[complete and attach Schedule 1]</i>"/>
                    <check-box style="" :check="true?'yes':''" text="waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for the service of a document <i>[complete and attach Schedule 2]</i>"/>
                    <check-box style="" :check="true?'yes':''" text="waiving or modifying any other requirement under the rules <i>[complete and attach Schedule 3]</i>"/>
                    <check-box style="" :check="true?'yes':''" text="requiring access to information in accordance with section 242 <i>[orders respecting searchable information]</i> of the <i> Family Law Act [complete and attach Schedule 4]</i>"/>
                    
                    <check-box style="" :check="true?'yes':''" text="recognizing an extraprovincial order other than a support order <i>[complete and attach Schedule 5]</i>"/>
                    
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

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { locationInfoDataInfoType, relationshipBetweenPartiesInfoType, existingOrdersInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';


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
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void
    
    dataReady = false;
    aboutChildren = false;

    locationInfo = {} as locationInfoDataInfoType;

    otherPartyInfo=[];
    yourInfo = {} as yourInformationInfoDataInfoType;

    applicantList = []
    
    existingOrders = {} as existingOrdersInfoType;
    
    relationshipBetweenParties = {} as relationshipBetweenPartiesInfoType;
    childrenInfo: childrenInfoSurveyInfoType[] = [{fullName:'', dob:'', myRelationship:'', otherPartyRelationship:'', currentSituation:''}];
    childBestInterestAcknowledmentCheck = false;
    culturalInfo = '';  
    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    childrenFields=[
        {key:"fullName",               label:"Child's full legal name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"Other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",       label:"Child is currently living with",         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]   

    public extractInfo(){ 
        
       
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
        // if (childRelatedApplication && this.result.childrenInfoSurvey && this.result.childrenInfoSurvey.length > 0){
        //     this.aboutChildren = true;
        //     this.childrenInfo = this.getChildrenInfo();
        //     this.childBestInterestAcknowledmentCheck = this.result.childBestInterestAcknowledgement;            
        // } else {
        //     this.aboutChildren = false;
        //     this.childrenInfo = [{fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''}];
        //     this.childBestInterestAcknowledmentCheck = false;
        // }

        // if (this.result.flmBackgroundSurvey.culturalExplain) {
        //     this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        // }       
        
        this.otherPartyInfo = this.getOtherPartyInfo()
        this.yourInfo = this.getYourInfo()     
        // this.locationInfo = this.getLocationInfo();  

    }

    public getLocationInfo(){

        let locationInformation = {} as locationInfoDataInfoType;
        // if (this.result.filingLocationSurvey){
        //     const locationData = this.result.filingLocationSurvey;
           
        //     locationInformation.existingFileNumber = locationData.ExistingFileNumber? locationData.ExistingFileNumber:'';
        //     locationInformation.courtLocation = locationData.ExistingCourt? locationData.ExistingCourt:'';

        //     locationInformation.earlyResolutionRegistry = locationData.earlyResolutionRegistry;
        //     locationInformation.familyJusticeRegistry = locationData.familyJusticeRegistry;
        //     locationInformation.educationRegistry = locationData.familyEducationProgram;  
        //     locationInformation.none = !(locationInformation.educationRegistry
        //                                 || locationInformation.familyJusticeRegistry
        //                                 || locationInformation.earlyResolutionRegistry);
        // }
        
        return locationInformation;
    }

    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.childrenInfoSurvey;
       
        // for (const child of childData){            
        //     childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        //     childInfo.fullName = Vue.filter('getFullName')(child.name);
        //     childInfo.dob = Vue.filter('beautify-date')(child.dob);
        //     childInfo.myRelationship = child.relation;
        //     childInfo.otherPartyRelationship = child.opRelation;
        //     childInfo.currentSituation = child.currentLiving;
        //     childrenInfo.push(childInfo)
        // }        

        return childrenInfo;
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