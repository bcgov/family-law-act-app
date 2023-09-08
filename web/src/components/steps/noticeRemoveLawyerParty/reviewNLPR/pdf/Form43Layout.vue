<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Removal of Lawyer for Party</b></div>               
                <div style="font-size:10pt;"><b>FORM 43</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 163</div>
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

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                <i>Select the option that applies and complete the required information</i>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="applicantLawyer?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="(full name of lawyer)" 
                    :text="applicantName | getFullName"/>   
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="am no longer representing" 
                    hint="(full name of party/parties)" 
                    :italicHint="false" :text="otherParties"/>
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 0.5rem;" 
                    textwidth="17rem" 
                    beforetext="on this case effective"
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="effectiveDate | beautify-date"/>
            </div>

            <div class="marginleft2p5vue" style="margin:0.5rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="!applicantLawyer?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="(full name of party)" 
                    :text="applicantName | getFullName"/>   
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="am no longer represented by" 
                    hint="(full name of lawyer)" 
                    :italicHint="false" :text="lawyerName | getFullName"/>
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 0.5rem;" 
                    textwidth="17rem" 
                    beforetext="on this case effective"
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="effectiveDate | beautify-date"/>
            </div>
        </section>
           
        <div style="margin-top: 1rem;"></div>  

<!-- <2> -->
    <section>
        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            <i>Select the option that applies and complete the required information</i>
        </div> 
        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;" 
                :check="!contactInfoChanged?'yes':''" 
                text="There are no changes to the contact information or address for service of court documents on file"/>                   
        </div>        
       
        <div class="marginleft2p5vue" style="margin:0.5rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="contactInfoChanged?'yes':''" 
                text="The contact information and address for service of court documents are now changed to:"/>
        </div>

        <table class="compactfullsize" style="font-size: 9pt;">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Lawyer name (if applicable): <div class="answer"> {{contactInfo.lawyerName | getFullName}}</div></td>
            </tr>
            <tr style="border:1px solid #414142">          
                <td colspan="3">Address: <div class="answer">{{contactInfo.address.street}} </div> </td>
            </tr>
            <tr style="border:1px solid #313132">
                <td  >City: <div class="answer">{{contactInfo.address.city}}</div> </td>
            <td style="padding-left:50px">Province: <div class="answer">{{contactInfo.address.state}}</div> </td>
                <td>Postal Code: <div class="answer">{{contactInfo.address.postcode}}</div> </td>
            </tr>
            <tr style="border:1px solid #313132">
                <td colspan="2">Email: <div class="answer">{{contactInfo.contact.email}}</div> </td>
                <td>Telephone: <div class="answer">{{contactInfo.contact.phone}}</div> </td>
            </tr>
        </table>

    </section>
           
    <div style="margin-top: 1rem;"></div>
<!-- <3> -->
 
    <section>
        <check-box 
            inline="inline" 
            boxMargin="0" 
            style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
            :check="acknowledgeService?'yes':''" 
            text="I understand I need to serve each party with a filed copy of this notice"/>
                                         
    </section>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { addressInfoType, contactInfoType, nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { contactInformationDataInfoType, noticeRemoveLawyerPartyDataInfoType } from '@/types/Application/NoticeRemoveLawyerParty';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})

export default class Form43Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;     

    existingFileNumber = '';
    acknowledgeService = false; 
    applicantLawyer = false;
    lawyerName = '';
    effectiveDate = '';
    contactInfoChanged = false; 
    contactInfo = {} as contactInformationDataInfoType;
    otherParties = '';   
   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLPRConfirmationSurvey?.confirmation == 'Confirmed';
        this.getNoticeRemoveLawyerPartyInfo();  
    } 

    public getNoticeRemoveLawyerPartyInfo(){  
        
        this.applicantLawyer = false;
        this.lawyerName = '';
        this.effectiveDate = '';
        this.contactInfoChanged = false; 
        this.contactInfo = {} as contactInformationDataInfoType;
        this.otherParties = '';

        if(this.result?.noticeRemoveLawyerPartySurvey){

            let noticeRemoveLawyerParty = {} as noticeRemoveLawyerPartyDataInfoType;
            noticeRemoveLawyerParty = this.result.noticeRemoveLawyerPartySurvey;    

            this.getContactInformationResults(noticeRemoveLawyerParty);

            const otherParties = [];
            for (const otherParty of noticeRemoveLawyerParty.OtherPartyInfoNlpr){
                otherParties.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherParties.join(', ');
        }             
    }

    public getContactInformationResults(noticeRemoveLawyerParty: noticeRemoveLawyerPartyDataInfoType) {               

        this.contactInfo = {
            lawyerName: noticeRemoveLawyerParty.ApplicantName?noticeRemoveLawyerParty.ApplicantName:{} as nameInfoType,
            address: noticeRemoveLawyerParty.LawyerAddressNlpr?noticeRemoveLawyerParty.LawyerAddressNlpr:{} as addressInfoType,
            contact: noticeRemoveLawyerParty.LawyerContact?noticeRemoveLawyerParty.LawyerContact:{} as contactInfoType
        }          
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>