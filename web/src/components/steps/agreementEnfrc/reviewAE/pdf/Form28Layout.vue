<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-ppm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Application About Enforcement</b></div>                
                <div style="font-size:9pt;"><b>FORM 28</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rules 134</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:existingFileNumber}]"
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
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="16rem" beforetext="My name is" hint="(full name of party)" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px; font-size: 9pt;" textwidth="9rem" beforetext=". My date of birth is" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:1px;display:inline; font-size: 9pt;">.</div>
            <div style="margin-top:7px; text-indent:0px; font-size: 9pt;">My contact information and address for service of court documents are:</div>
            <table class="compactfullsize" style="margin-top:0 !important; font-size: 9pt;">
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
        <div class="print-block" style="margin-top: 2rem;">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; margin-top: 1rem;" 
                        textwidth="34rem" 
                        beforetext="The other party is" 
                        hint="      (full name of other party)" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <div style="display:inline;">.</div>
                    <underline-form 
                        style="display:inline-block;text-indent:0px; margin-top: 1rem;" 
                        textwidth="7rem" 
                        beforetext="Their date of birth is" 
                        hint="(mmm/dd/yyyy)" 
                        :italicHint="false" 
                        :text="firstOtherParty.dob | beautify-date"/>
                    <div style="text-indent:5px;display:inline;"> .</div>
                    <div style="text-indent:1px; margin-top: 1rem;"> Their contact information, as I know it, is:</div>
                    <table class="compactfullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">Lawyer (if applicable): </td>
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
                                <td colspan="3">Lawyer (if applicable): </td>
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

    <!-- <3> -->

        <div class="print-block">
            <section> 
                <div style="margin:0rem 0 0 0rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0.5rem 0 0;" :check="true?'yes':''" text="I request the copy of the order, certified by the court that made the order, dated"/>               
                    <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(mmm/dd/yyyy)" text=""/>
                    <div style="text-indent:10px;display:inline-block;">between the above parties be filed in the Provincial Court</div>
                </div>              
            </section>
        </div> 

    <!-- <4> -->
        <div class="print-block">
            <section>
                <div style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;">I request to file the order for the purpose(s) described in the following provision(s):</div>

                <div style="margin:0.25rem 0 0 1rem;font-size: 9pt;" >
                    <i>Select all options that apply</i>                   
                    
                    <check-box style="margin:0.25rem 0 0 0rem;" :check="true?'yes':''" text="section 18 <i>[registration of extraprovincial or foreign order]</i> of the <i>Interjurisdictional Support Orders Act</i>"/>
                    <check-box style="margin:0.25rem 0 0 0rem;" :check="true?'yes':''" text="section 195 <i>[Provincial Court enforcement of Supreme Court orders]</i> of the <i>Family Law Act</i>"/>
                    <check-box style="margin:0.25rem 0 0 0rem;" :check="true?'yes':''" text="section 15-3 (6) <i>[enforcement in Provincial Court]</i> of the <i>Supreme Court Family Rules</i>"/>
                   
                </div>                  
            </section>
        </div>


        <!-- <For registery> -->
        <div class="print-block">
            <div style="margin-top:0rem; font-size: 9pt;"><i>For use by the Family Maintenance Enforcement Program or Interjurisdictional Support Services staff only</i></div>
            <div style="width:99%; border:1px solid; text-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">

                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="This request is being made and/or filed on behalf of the party by:"/>
                   
                <div style="display:inline; margin-left:0.5rem;font-size: 9pt;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="true?'yes':''"  text="Family Maintenance Enforcement Program"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="true?'yes':''" text="Interjurisdictional Support Services"/> 
                </div> 

                <div style="margin-top: 1rem;font-size: 9pt;">
                    Notes:
                </div>
                
                <div v-if="true" 
                    class="answerbox"></div>
                <div v-else style="margin-bottom:3rem;"></div>
               
            </div>
            <div style="margin-top:0.5rem; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>

        <div class="print-block mt-5"></div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import CheckBoxII from "./components/CheckBoxII.vue"
import OrderedCheckBox from "./components/OrderedCheckBox.vue"
import { nameInfoType, otherPartyInfoType, noticeSurveyDataInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { priorityParentingInformationDataInfoType, priorityParentingOtherPartyDataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';
import { priorityParentingMatterOrderSurveyDataInfoType, ppmBackgroundDataSurveyDataInfoType, aboutPriorityParentingMatterOrderSurveyDataInfoType } from '@/types/Application/PriorityParentingMatter';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class Form29Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   
    
    otherPartyInfo: priorityParentingOtherPartyDataInfoType[] = [];
    additionalOtherParties: priorityParentingOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as priorityParentingOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    ppmInfo = {} as priorityParentingInformationDataInfoType;
    
    existingFileNumber = ''
    
    childrenInfo: childrenInfoSurveyInfoType[] = [];

    childrenFields = [
        {key:"fullName",               label:"Child's full name",                          tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",        tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",               tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"The other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ]   

    mounted(){
        this.dataReady = false;
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

        if (this.result.ppmChildrenInfoSurvey?.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.yourInfo = this.getYourInfo();
        this.ppmInfo = this.getPpmInfo();
        this.getLocationInfo()
    } 
    
    public getLocationInfo(){                
        const locationData = this.result.filingLocationSurvey;           
        this.existingFileNumber = locationData?.ExistingFileNumber? locationData.ExistingFileNumber:'';        
    }   
    
    public getChildrenInfo() {

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.ppmChildrenInfoSurvey;
       
        for (const child of childData) {            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childrenInfo.push(childInfo)
        }        

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
                lawyerFiling: false,
                lawyerStatement: {lawyerName: '', clientName: ''}
            }                     
        }
        return yourInformation;
    }

    public getOtherPartyInfo(){

        let OpInformation: priorityParentingOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                let otherParty = {} as priorityParentingOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getPpmInfo() {

        let ppmInformation = {} as priorityParentingInformationDataInfoType;

        if (this.result.ppmBackgroundSurvey) {
            const ppmBackgroundData: ppmBackgroundDataSurveyDataInfoType = this.result.ppmBackgroundSurvey;
            ppmInformation.ExistingCase = (ppmBackgroundData.ExistingOrdersFLM == 'y');
            ppmInformation.existingProceeding = (ppmBackgroundData.existingCourtProceeding == 'y');
            ppmInformation.proceedingInfo = (ppmBackgroundData.existingCourtProceeding == 'y' && 
                                             ppmBackgroundData.existingCourtProceedingDetails)? ppmBackgroundData.existingCourtProceedingDetails:'';
        }

        if (this.result.aboutPriorityParentingMatterOrderSurvey) {
            const aboutPpmOrderData: aboutPriorityParentingMatterOrderSurveyDataInfoType = this.result.aboutPriorityParentingMatterOrderSurvey;
            ppmInformation.facts = aboutPpmOrderData.applicationFacts;
            ppmInformation.orderdesc = aboutPpmOrderData.orderDescription;
        }

        if (this.result.noticeSurvey) {
            const noticeData: noticeSurveyDataInfoType = this.result.noticeSurvey;
            ppmInformation.noticeType = noticeData.noticeType;
        }

        if(this.result.ppmQuestionnaireSurvey && this.result.priorityParentingMatterOrderSurvey) {
            const ppmType: string[] = this.result.ppmQuestionnaireSurvey;
            const ppmOrderData: priorityParentingMatterOrderSurveyDataInfoType = this.result.priorityParentingMatterOrderSurvey;
            ppmInformation.ppmList = [];
                 
            if ((ppmType.includes('medical')) && (ppmOrderData.delayMedicalRisk == 'y') && 
                (ppmOrderData.confirmMedicalRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('medical');
                }
            if ((ppmType.includes('passport')) && (ppmOrderData.delayPassportRisk == 'y') && 
                (ppmOrderData.confirmDelayPassportRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('passport');
                }
            if ((ppmType.includes('travel')) && (ppmOrderData.delayTravelRisk == 'y') && 
                (ppmOrderData.travelWrongfullyDenied == 'y') && 
                (ppmOrderData.confirmTravelWrongfullyDenied?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('travel');
                }
            if ((ppmType.includes('locationChange')) && (ppmOrderData.existingParentingArrangements == 'n') &&
                (ppmOrderData.impactOnRelationship == 'y') && 
                (ppmOrderData.confirmImpactOnRelationship?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('locationChange');   
                }
            if ((ppmType.includes('preventRemoval')) && (ppmOrderData.noReturnRisk == 'y') && 
                (ppmOrderData.confirmNoReturnRisk?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('preventRemoval');   
                }
            if ((ppmType.includes('interjurisdictional')) && (ppmOrderData.childInBC == 'y') && 
                (ppmOrderData.harm == 'y') && (ppmOrderData.confirmHarm?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('interjurisdictional');      
                }
            if ((ppmType.includes('wrongfulRemoval')) && (ppmOrderData.wrongfulInBC == 'y') && 
                (ppmOrderData.confirmWrongfulInBC?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('wrongfulRemoval');   
                }
            if ((ppmType.includes('returnOfChild')) && (ppmOrderData.wrongfulReturn == 'y') && 
                (ppmOrderData.confirmWrongfulReturn?.includes('applyPPM'))){
                    ppmInformation.ppmList.push('returnOfChild');
                }
        }
        return ppmInformation;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>