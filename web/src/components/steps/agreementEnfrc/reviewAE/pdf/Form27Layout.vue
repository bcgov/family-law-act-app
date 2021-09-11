<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-ea">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:12pt;"><b>Request to File a Determination</b></div>     
                <div style="font-size:12pt;"><b>of Parenting Coordinator</b></div>             
                <div style="font-size:10pt;"><b>FORM 27</b></div>
                <div style="font-size:9pt;">Provincial Court Family Rules</div>
                <div style="font-size:9pt;">Rules 133</div>
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
            <underline-form style="text-indent:2px;display:inline-block;  " textwidth="18.75rem" beforetext="My name is" hint="(full name of party)" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;  " textwidth="9rem" beforetext=". My date of birth is" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:1px;display:inline;  ">.</div>
            <div style="margin-top:0.25rem; text-indent:0px;  ">My contact information and address for service of court documents are:</div>
            <table class="fullsize" style="margin-top:0 !important;  ">
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
        <div class="print-block" style="margin-top: 0rem;">
            <section> 
                <div style="display:inline;  ">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; margin-top: 0.6rem;" 
                        textwidth="15rem" 
                        beforetext="The other party, who is the subject of this determination, is" 
                        hint="      (full name of other party)" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <div style="display:inline;">.</div>
                    <div style="margin:0.25rem 0 0.05rem 1rem;">
                        <underline-form 
                            style="display:inline;text-indent:0px; margin-top: 1rem;" 
                            textwidth="7rem" 
                            beforetext="Their date of birth is" 
                            hint="(mmm/dd/yyyy)" 
                            :italicHint="false" 
                            :text="firstOtherParty.dob | beautify-date"/>
                        <div style="text-indent:5px;display:inline;"> .</div>                    
                        <div style="text-indent:1px; margin-top: 1rem;display:inline;"> Their contact information, as I know it, is:</div>
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

    <!-- <3> -->

        <div class="print-block" style="margin-top: 1rem;">
            <section> 
                <div style="display:inline; margin:0rem 0 0 0.35rem;">
                    <check-box 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline; margin:0 0.5rem 0 0;" 
                        :check="form27Info.filed?'yes':''" 
                        text="I request the determination by a parenting coordinator referred to in section 18 <i>[determinations by</i>"/>
                    <div style="text-indent:0px; margin:0rem 0 0 1.75rem; " >
                        <i>parenting coordinators]</i> of the <i>Family Law Act</i> dated               
                        <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form27Info.existingDate"/>
                        <div style="text-indent:0px; display:inline;"> between the above parties be filed in the Provincial Court</div>
                    </div>
                </div>              
            </section>
        </div> 

    <!-- <4> -->
        <div class="print-block">
            <section>
                <div style="margin:0 0 0 0.25rem;display:inline;  ">The parenting coordinator made the determination under:</div>

                <div style="margin:0rem 0 0 1rem; " >
                    <i>Select only one of the options below and complete the required information.</i> 

                    <div style="margin:0.5rem 0 0 0rem;">
                        <check-box 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline; margin:0 0.5rem 0 0;" 
                            :check="form27Info.type == 'writtenAgreement'?'yes':''" 
                            text="an agreement made on"/>               
                        <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form27Info.agreementDate"/>
                        <div style="text-indent:10px;display:inline;"> between </div>
                        <div v-for="party,inx in form27Info.partiesToAgreement" :key="inx" style="text-indent:10px;display:inline;">
                            <underline-form style="text-indent:1px;display:inline;" textwidth="16.75rem" beforetext="" hint="(parties to the agreement)" :text="party"/>
                            <div v-if="inx != (form27Info.partiesToAgreement.length-1)" style="display:inline;"> , </div>
                        </div>
                        <div style="display:inline; text-indent:0px; line-height:1.5rem; margin:0.25rem 0 0 0.72rem;"> which is filed in the Provincial Court </div>
                    </div>

                    <div style="margin:0.75rem 0 0 0rem;">
                        <check-box 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline; margin:0 0.5rem 0 0;" 
                            :check="form27Info.type == 'courtOrder'?'yes':''" 
                            text="a court order made on"/>               
                        <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form27Info.orderDate"/>
                        
                    </div>                            
                </div>                  
            </section>
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
import { enfrcOtherPartyDataInfoType, form27InformationDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { enforceChangeSetAsideDeterminationSurveyDataInfoType } from '@/types/Application/AgreementEnforcement';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class Form27Layout extends Vue {

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
    form27Info = {} as form27InformationDataInfoType;
    
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
        this.form27Info = this.getForm27Info();
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
    
    public getForm27Info() {

        let form27Information = {} as form27InformationDataInfoType;

        function splitNames(names: string): string[]{
            const splitNamesList = names.split(',').map(item => {
                return item.trim();
            });
            return splitNamesList.filter(item=>{return(item)})
        }

        if (this.result?.enforceChangeSetAsideDeterminationSurvey) {  

            const enfrcChngdDet: enforceChangeSetAsideDeterminationSurveyDataInfoType = this.result.enforceChangeSetAsideDeterminationSurvey;         
            form27Information.existingDate = (enfrcChngdDet.filedOrder == 'n')?Vue.filter('beautify-date')(enfrcChngdDet.existingDate):'';
            form27Information.type = (enfrcChngdDet.filedOrder == 'n')?enfrcChngdDet.appointedDetermination.selected:'';
            form27Information.filed = enfrcChngdDet.filedOrder == 'n';
            form27Information.agreementDate = (form27Information.type == 'writtenAgreement')? Vue.filter('beautify-date')(enfrcChngdDet.appointedDetermination.writtenAgreementDate):'';
            form27Information.orderDate = (form27Information.type == 'courtOrder')? Vue.filter('beautify-date')(enfrcChngdDet.appointedDetermination.courtOrderDate):'';       
            form27Information.partiesToAgreement = (enfrcChngdDet.agreementParties && enfrcChngdDet.filedOrder == 'n' && form27Information.type == 'writtenAgreement')? splitNames(enfrcChngdDet.agreementParties) : [' ']
        }
  
        return form27Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>