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
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name"/>
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
                :check="understandWithoutNotice?'yes':''" 
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
                    <check-box marginLeft="1.5rem" style="" :check="childRelatedType == 'Not a party to the case'?'yes':''" text="I am not a party to the case"/>
                    <check-box marginLeft="1.5rem" style="" :check="childRelatedType == 'A party to the case and the case does not involve a child-related issue'?'yes':''" text="I am a party to the case and the case does not involve a child related issue"/>
                    <check-box marginLeft="1.5rem" style="" :check="childRelatedType == 'A party to the case and the case involves a child-related issue'?'yes':''" text="I am a party to the case and the case involves a child-related issue about the following child or children:"/>
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
                    <check-box style="" :check="selectedSchedules.includes('schedule1')?'yes':''" text="allowing a person to attend a conference or hearing using electronic communication, including by telephone or video <i>[complete and attach Schedule 1]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule2')?'yes':''" text="waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for the service of a document <i>[complete and attach Schedule 2]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule3')?'yes':''" text="waiving or modifying any other requirement under the rules <i>[complete and attach Schedule 3]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule4')?'yes':''" text="requiring access to information in accordance with section 242 <i>[orders respecting searchable information]</i> of the <i> Family Law Act [complete and attach Schedule 4]</i>"/>
                    
                    <check-box style="" :check="selectedSchedules.includes('schedule5')?'yes':''" text="recognizing an extraprovincial order other than a support order <i>[complete and attach Schedule 5]</i>"/>
                    
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
import { nameInfoType, otherPartyInfoType, yourInformationDataInfoType, addressInfoType, contactInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { cmChildrenInfoSurveyDataInfoType, withoutNoticeOrAttendanceSurveyDataInfoType } from '@/types/Application/CaseManagement';
import { caseManagementOtherPartyDataInfoType, cmLocationInfoDataInfoType } from '@/types/Application/CaseManagement/PDF';


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

    locationInfo = {} as cmLocationInfoDataInfoType;

    otherPartyInfo=[];
    yourInfo = {} as yourInformationInfoDataInfoType;   
    
    childRelatedType: string = '';   
    childrenInfo: childrenInfoSurveyInfoType[] = [];  
    
    understandWithoutNotice = false;
   
    childrenFields = [
        {key:"fullName",               label:"Child's full legal name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
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

        if (this.result.withoutNoticeOrAttendanceSurvey){
            const withoutNoticeData: withoutNoticeOrAttendanceSurveyDataInfoType = this.result.withoutNoticeOrAttendanceSurvey;
            this.understandWithoutNotice = withoutNoticeData.needWithoutNotice == 'y' && withoutNoticeData.orderWithoutNoticeAcknowledgement == 'I understand';
        } else {
            this.understandWithoutNotice = false;
        }      
    }

    public getLocationInfo(){

        let locationInformation = {} as cmLocationInfoDataInfoType;
        if (this.result.filingLocationSurvey){
            const locationData = this.result.filingLocationSurvey;           
            locationInformation.existingFileNumber = locationData.ExistingFileNumber? locationData.ExistingFileNumber:'';
            locationInformation.courtLocation = locationData.ExistingCourt? locationData.ExistingCourt:'';
        }
        
        return locationInformation;
    }

    public getChildrenInfo(){

        this.childRelatedType = this.result.cmChildrenInfoSurvey.childRelatedType;

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: cmChildrenInfoSurveyDataInfoType[] = this.result.cmChildrenInfoSurvey.childData;
        
        if(this.childRelatedType=='A party to the case and the case involves a child-related issue'){
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

        let yourInformation = {} as yourInformationInfoDataInfoType;       

        if(this.result.yourInformationSurvey){

            const applicantInfo: yourInformationDataInfoType = this.result.yourInformationSurvey; 
            
            yourInformation = {
                dob: applicantInfo.ApplicantDOB?applicantInfo.ApplicantDOB:'',
                name: applicantInfo.ApplicantName?Vue.filter('getFullName')(applicantInfo.ApplicantName):'',
                lawyer: applicantInfo.Lawyer == 'y',
                lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?Vue.filter('getFullName')(applicantInfo.LawyerName):'',
                address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress)?applicantInfo.ApplicantAddress:{} as addressInfoType),
                contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact)?applicantInfo.ApplicantContact: {} as contactInfoType),
                lawyerFiling: false,
                lawyerStatement: {lawyerName: '', clientName: ''}
            }        
                     
        }
        return yourInformation;
    }

    public getOtherPartyInfo(){

        let OpInformation: caseManagementOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                let otherParty = {} as caseManagementOtherPartyDataInfoType;

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