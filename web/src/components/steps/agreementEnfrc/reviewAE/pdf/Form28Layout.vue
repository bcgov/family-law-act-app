<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-po">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Request to File an Order</b></div>                
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
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="20rem" beforetext="My name is" hint="(full name of party)" :italicHint="false" :text="yourInfo.name | getFullName"/>
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
        <div class="print-block" style="margin-top: 1.0rem;">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; margin-top: 0.25rem;" 
                        textwidth="15.5rem" 
                        beforetext="The other party to this order is" 
                        hint="      (full name of other party)" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <div style="display:inline;">.</div>
                    <underline-form 
                        style="display:inline;text-indent:0px; margin-top: 0.25rem;" 
                        textwidth="6.5rem" 
                        beforetext="Their date of birth is" 
                        hint="(mmm/dd/yyyy)" 
                        :italicHint="false" 
                        :text="firstOtherParty.dob | beautify-date"/>
                    <div style="text-indent:5px;display:inline;"> .</div>
                    <div style="text-indent:1px; margin-top: 0.25rem;"> Their contact information, as I know it, is:</div>
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
                <div style="text-indent:5px; margin:0; font-size: 9pt;"><i>Additional party (Complete only if applicable. You may leave this section blank)</i></div>
                        
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

    <!-- <3> -->

        <div class="print-block" style="margin-top: 1.0rem;">
            <section> 
                <div style="margin:0rem 0 0 0.3rem; display:inline;font-size: 9pt;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0.5rem 0 0;" :check="form28Info.filed?'yes':''" text="I request the copy of the order, certified by the court that made the order, dated"/>               
                    <underline-form style="text-indent:1px;display:inline;" textwidth="9rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form28Info.orderDate"/>
                    <div style="text-indent:0px; margin-left:1.7rem;">between the above parties be filed in the Provincial Court</div>
                </div>              
            </section>
        </div> 

    <!-- <4> -->
        <div class="print-block margintop1vue" style="margin-top: -1rem;" >
            <section>
                <div style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;">I request to file the order for the purpose(s) described in the following provision(s):</div>

                <div style="margin:0rem 0 0 1rem;font-size: 9pt;" >
                    <i>Select all options that apply</i>                   
                    
                    <check-box style="margin:0.05rem 0 0 0rem;" :check="form28Info.orderList.includes('foreignSupport')?'yes':''" text="section 18 <i>[registration of extraprovincial or foreign order]</i> of the <i>Interjurisdictional Support Orders Act</i>"/>
                    <check-box style="margin:0.05rem 0 0 0rem;" :check="form28Info.orderList.includes('section195')?'yes':''" text="section 195 <i>[Provincial Court enforcement of Supreme Court orders]</i> of the <i>Family Law Act</i>"/>
                    <check-box style="margin:0.05rem 0 0 0rem;" :check="form28Info.orderList.includes('section15-3')?'yes':''" text="section 15-3 (6) <i>[enforcement in Provincial Court]</i> of the <i>Supreme Court Family Rules</i>"/>
                   
                </div>                  
            </section>
        </div>


        <!-- <For registery> -->
        <div class="print-block" style="margin-top: 1.25rem;">
            <div style="margin:0 0 0 1rem; font-size: 9pt;"><i>For use by the Family Maintenance Enforcement Program or Interjurisdictional Support Services staff only</i></div>
            <div style="margin-left:0.85rem; width:96%; ;font-size: 9pt; border:1px solid;">

                <check-box :shift="10" :shiftmark="1" :boxMargin="0" style="margin:0.25rem 0 0 0rem;" :check="false?'yes':''" text="This request is being made and/or filed on behalf of the party by:"/>
                <div></div>   
                <div style="display:inline-block; margin:0.25rem 0 0 1.5rem;font-size: 9pt;">
                    <check-box inline="inline" style="display:inline" :shift="10" :shiftmark="1" boxMargin="0" :check="false?'yes':''"  text="Family Maintenance Enforcement Program"/>                        
                    <check-box inline="inline" style="display:inline" :shift="10" :shiftmark="1" boxMargin="0" :check="false?'yes':''" text="Interjurisdictional Support Services"/> 
                </div>

                <div style="margin:0.25rem 0 0 .75rem;" >
                    Notes:
                </div>
                
                <div v-if="false" 
                    class="answerbox"></div>
                <div v-else style="margin-bottom:4rem;"></div>
               
            </div>            
        </div>

        <div class="print-block mt-5"></div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import CheckBoxII from "./components/CheckBoxII.vue";
import OrderedCheckBox from "./components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { form28InformationDataInfoType, enfrcOtherPartyDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class Form28Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form28Info = {} as form28InformationDataInfoType;
    
    existingFileNumber = ''; 

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
        
        this.yourInfo = this.getYourInfo();
         this.form28Info = this.getForm28Info();
        this.getLocationInfo()
    } 
    
    public getLocationInfo(){                
        const locationData = this.result.filingLocationSurvey;           
        this.existingFileNumber = locationData?.ExistingFileNumber? locationData.ExistingFileNumber:'';        
    }   

    public getYourInfo(){

        let yourInformation = {} as yourInformationInfoDataInfoType;
        if(this.result.yourInformationSurvey){

            const applicantInfo = this.result.yourInformationSurvey;  
            const noLawyerAddressCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress;
            const noLawyerContactCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact;          
            yourInformation = {
                dob: applicantInfo.ApplicantDOB?applicantInfo.ApplicantDOB:'',
                name: applicantInfo.ApplicantName?applicantInfo.ApplicantName:'',
                lawyer: applicantInfo.Lawyer == 'y',
                lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
                address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((noLawyerAddressCondition)?applicantInfo.ApplicantAddress:''),
                contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((noLawyerContactCondition)?applicantInfo.ApplicantContact:''),
                lawyerFiling: false,
                lawyerStatement: {lawyerName: '', clientName: ''}
            }                     
        }
        return yourInformation;
    }

    public getOtherPartyInfo(){

        let OpInformation: enfrcOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                let otherParty = {} as enfrcOtherPartyDataInfoType;               

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
    
    public getForm28Info() {     

        const form28Information = {} as form28InformationDataInfoType;

        form28Information.orderList = [];

        if (this.result?.enforceAgreementOrOrderSurvey) { 
            
            const enfrcAgrmntOrdr = JSON.parse(JSON.stringify(this.result.enforceAgreementOrOrderSurvey));

            form28Information.orderDate = (enfrcAgrmntOrdr.filedOrder == 'n')?Vue.filter('beautify-date')(enfrcAgrmntOrdr.existingDate):'';

            if (enfrcAgrmntOrdr.filedOrder == 'n'){
                form28Information.orderList = enfrcAgrmntOrdr.orderType;
            } else {
                form28Information.orderList = [];
            }
            form28Information.filed = enfrcAgrmntOrdr.filedOrder == 'n';
        }        
        
        if (this.result.enfrcQuestionnaireSurvey) {   

            const enfrcQuest: string[] = this.result.enfrcQuestionnaireSurvey;
            if (enfrcQuest.includes('foreignSupport') && this.result.enforceAgreementOrOrderSurvey.filedOrder == 'n'){                
                form28Information.orderList.push('foreignSupport');
            }
        }       
       
        return form28Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>