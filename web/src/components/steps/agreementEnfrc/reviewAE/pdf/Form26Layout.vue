<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-ppm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:12pt;"><b>Request to File an Agreement</b></div>             
                <div style="font-size:10pt;"><b>FORM 26</b></div>
                <div style="font-size:9pt;">Provincial Court Family Rules</div>
                <div style="font-size:9pt;">Rules 132</div>
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
            <div style="margin:0.25rem 0; text-indent:0px;  ">My contact information and address for service of court documents are:</div>
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
                        textwidth="16rem" 
                        beforetext="The other party, who is the subject of this determination, is" 
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

    <!-- <3> -->

        <div class="print-block" style="margin-top: 1rem;">
            <section> 
                <div style="margin:0rem 0 0 0.5rem; display:inline;">
                    <check-box 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline; margin:0 0.5rem 0 0;" 
                        :check="form26Info.filed?'yes':''" 
                        text="I request the written agreement dated"/>               
                    <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form26Info.agreementDate"/>
                    <div style="text-indent:0px;display:inline;"> between the above parties be filed in the Provincial Court</div>
                </div>              
            </section>
        </div> 

    <!-- <4> -->
        <div class="print-block">
            <section>
                <div style="margin:0 0 0 0.25rem;display:inline;  ">The written agreement is being filed under the following provision(s) of the <i>Family Law Act</i>:</div>
   
                <div style="margin:0.25rem 0 0 1rem; " >
                    <i>Select all options that apply</i>                                   
                    <check-box                                                                                      
                        :check="form26Info.agreementList.includes('section15')?'yes':''" 
                        text="section 15 <i>[when parenting coordinators may assist]</i>"/>               
                    <check-box
                        :check="form26Info.agreementList.includes('section44')?'yes':''" 
                        text="section 44 (3) <i>[agreements respecting parenting arrangements]</i>"/>   
                    <check-box
                        :check="form26Info.agreementList.includes('section58')?'yes':''" 
                        text="section 58 (3) <i>[agreements respecting contact]</i>"/>   
                    <check-box                            
                        :check="form26Info.agreementList.includes('section148')?'yes':''" 
                        text="section 148 (2) <i>[agreements respecting child support]</i>"/>   
                    <check-box                            
                        :check="form26Info.agreementList.includes('section163')?'yes':''" 
                        text="section 163 (3) <i>[agreements respecting spousal support]</i>"/>
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
import { enfrcOtherPartyDataInfoType, form26InformationDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { enforceAgreementOrOrderSurveyDataInfoType } from '@/types/Application/AgreementEnforcement';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateYourInformation';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class Form26Layout extends Vue {

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
    form26Info = {} as form26InformationDataInfoType;
    
    existingFileNumber = ''   
    

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
        this.form26Info = this.getForm26Info();
        this.getLocationInfo()
    } 
    
    public getLocationInfo(){                
        const locationData = this.result.filingLocationSurvey;           
        this.existingFileNumber = locationData?.ExistingFileNumber? locationData.ExistingFileNumber:'';        
    }
    
    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
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
    
    public getForm26Info() {        

        let form26Information = {} as form26InformationDataInfoType;
        form26Information.agreementList = [];
        form26Information.agreementDate = '';        
        
        if (this.result?.enfrcQuestionnaireSurvey?.includes('writtenAgreementOrder') && this.result?.enforceAgreementOrOrderSurvey) { 

            const enfrcAgrmntOrdr: enforceAgreementOrOrderSurveyDataInfoType = JSON.parse(JSON.stringify(this.result.enforceAgreementOrOrderSurvey));

            const form26Conditions = (enfrcAgrmntOrdr.enforceOrder == "n") && (enfrcAgrmntOrdr.filedOrder == 'n') && (enfrcAgrmntOrdr.existingType == "writtenAgreement")

            form26Information.agreementDate = (form26Conditions)?Vue.filter('beautify-date')(enfrcAgrmntOrdr.existingDate):'';
            form26Information.agreementList = (form26Conditions)?enfrcAgrmntOrdr.agreementType:[];
            form26Information.filed = form26Conditions;
        }
        //console.log(form26Information)
        if(this.result?.enfrcQuestionnaireSurvey?.includes('parentingCoordinatorDetermination')){
            const detData  = this.result?.enforceChangeSetAsideDeterminationSurvey
            if(detData?.filedOrder == "n" && detData?.appointedDetermination?.selected == "writtenAgreement" && detData?.filedAgreement == "n"){
                form26Information.agreementList.push("section15");
                if(form26Information.agreementDate == ''){
                    form26Information.filed = true;
                    form26Information.agreementDate = Vue.filter('beautify-date-blank')(detData?.appointedDetermination?.writtenAgreementDate);
                }            
            }
       
        }

        return form26Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>