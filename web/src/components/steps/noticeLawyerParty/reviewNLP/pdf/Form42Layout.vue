<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Lawyer for Party</b></div>               
                <div style="font-size:10pt;"><b>FORM 42</b></div>
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
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="17rem" 
                beforetext="I" 
                hint="(full name of lawyer)" 
                :italicHint="false" :text="lawyerInformation.lawyerName | getFullName"/>

            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="19rem" 
                beforetext=", of" 
                hint="(firm name, if applicable)" 
                :italicHint="false" :text="lawyerInformation.firmName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                am the lawyer for the following party/parties:
            </div>  
            
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="32rem" 
                beforetext="<i>Provide the full name of each party the lawyer is representing</i>" 
                hint=""
                :italicHint="false" 
                :text="otherParties"/>     

        </section>

           
        <div style="margin-top: 1rem;"></div>  

<!-- <2> -->
    <section>
        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            I will be representing the party/parties identified in section 1 as follows:
        </div> 
        <!-- <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="17rem" 
            beforetext="I will be representing the party/parties identified in section 1 as follows:" 
            hint="" 
            :italicHint="false" :text="yourInfo.name | getFullName"/> -->

        <div style="margin-top: 0.5rem;"></div>

        <i>Select all options that apply</i>
        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="listOfIssues.includes('allIssues')?'yes':''" text="on all issues until further notice to the court"/>
        </div>
        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;" 
                :check="listOfIssues.includes('specifiedIssues')?'yes':''" 
                text="on only the following specified issue(s) until further notice to the court:"/>
            <underline-form 
                style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                textwidth="10rem" 
                beforetext="" 
                hint="" 
                :text="specifiedIssuesComment"/>
                   
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;" 
                :check="listOfIssues.includes('courtDocumentsPreparation')?'yes':''" 
                text="preparation of the following court documents for filing and/or filing of the court documents:"/>
            <underline-form 
                style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                textwidth="37.5rem" 
                beforetext="<i>List any applicable court document(s)</i>" 
                hint="" 
                :text="courtDocumentsPreparationComment"/>
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="listOfIssues.includes('familyManagementConference')?'yes':''" text="at the family management conference"/>
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="listOfIssues.includes('familySettlementConference')?'yes':''" text="at the family settlement conference"/>
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="listOfIssues.includes('trial')?'yes':''" text="at trial (including any scheduled trial preparation conference)"/>
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;" 
                :check="listOfIssues.includes('applicationAbout')?'yes':''" 
                text="on the application about <i>(specify)</i>:"/>
            <underline-form 
                style="text-indent:1px;display:inline-block;" 
                textwidth="6rem" 
                beforetext="" 
                hint="" 
                :text="applicationAboutComment"/>            
        </div>

        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;" 
                :check="listOfIssues.includes('other')?'yes':''" 
                text="other <i>(specify)</i>:"/>
            <underline-form 
                style="text-indent:1px;display:inline-block;" 
                textwidth="6rem" 
                beforetext="" 
                hint="" 
                :text="otherComment"/>            
        </div>
    </section>
           
    <div style="margin-top: 1rem;"></div>
<!-- <3> -->

    <section>

        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            <i>Select the option that applies and complete any required information</i>
        </div> 
        <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="true?'yes':''" 
                text="There are no changes to the contact information or address for service of court documents on file"/>
        </div>
        <div class="marginleft2p5vue" style="margin:0.25rem 0 0.5rem 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="true?'yes':''" 
                text="The contact information and address for service of court documents are:"/>
        </div>

        <table class="compactfullsize" style="font-size: 9pt;">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Firm name (if applicable): <div class="answer"> {{lawyerInformation.firmName}}</div></td>
            </tr>
            <tr style="border:1px solid #414142">          
                <td colspan="3">Address: <div class="answer">{{lawyerInformation.address.street}} </div> </td>
            </tr>
            <tr style="border:1px solid #313132">
                <td  >City: <div class="answer">{{lawyerInformation.address.city}}</div> </td>
            <td style="padding-left:50px">Province: <div class="answer">{{lawyerInformation.address.state}}</div> </td>
                <td>Postal Code: <div class="answer">{{lawyerInformation.address.postcode}}</div> </td>
            </tr>
            <tr style="border:1px solid #313132">
                <td colspan="2">Email: <div class="answer">{{lawyerInformation.contact.email}}</div> </td>
                <td>Telephone: <div class="answer">{{lawyerInformation.contact.phone}}</div> </td>
            </tr>
        </table>
         
    </section>

    <div style="margin-top: 1rem;"></div>  
<!-- <4> -->
    <section>
        <check-box 
            inline="inline" 
            boxMargin="0" 
            style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
            :check="acknowledgeService?'yes':''" 
            text="I understand I need to serve each other party with a filed copy of this notice."/>
                                         
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
import { lawyerInformationInfoDataInfoType, noticeLawyerPartyDataInfoType } from '@/types/Application/LawyerParty';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})

export default class Form42Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;     

    existingFileNumber = '';
    acknowledgeService = false; 
    lawyerInformation = {} as lawyerInformationInfoDataInfoType; 
    
    otherParties = '';
    listOfIssues = [];    
    otherComment = '';    
    applicationAboutComment = '';
    courtDocumentsPreparationComment = '';
    specifiedIssuesComment = '';

   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLPConfirmationSurvey?.confirmation == 'Confirmed';
        this.getNoticeLawyerPartyInfo();  
    } 

    public getNoticeLawyerPartyInfo(){  
        
        this.lawyerInformation = {} as lawyerInformationInfoDataInfoType;  
        this.otherParties = '';        

        this.listOfIssues = [];   
        this.otherComment = '';    
        this.applicationAboutComment = '';
        this.courtDocumentsPreparationComment = '';
        this.specifiedIssuesComment = '';

        if(this.result?.noticeLawyerPartySurvey){

            let noticeLawyerParty = {} as noticeLawyerPartyDataInfoType;
            noticeLawyerParty = this.result.noticeLawyerPartySurvey;    

            this.getLawyerInformationResults(noticeLawyerParty);

            const otherParties = [];
            for (const otherParty of noticeLawyerParty.OtherPartyInfoNlp){
                otherParties.push(Vue.filter('getFullName')(otherParty.name))
            }      

            this.otherParties = otherParties.join(', ')           

            this.listOfIssues = noticeLawyerParty.IssuesList?.checked?noticeLawyerParty.IssuesList.checked:[];
            if (this.listOfIssues.includes("other")){
                this.otherComment = noticeLawyerParty.IssuesList?.otherComment?noticeLawyerParty.IssuesList.otherComment:'';
            }      
            
            if (this.listOfIssues.includes("specifiedIssues")){
                this.specifiedIssuesComment = noticeLawyerParty.IssuesList?.specifiedIssuesComment?noticeLawyerParty.IssuesList.specifiedIssuesComment:'';
            }  

            if (this.listOfIssues.includes("courtDocumentsPreparation")){
                this.courtDocumentsPreparationComment = noticeLawyerParty.IssuesList?.courtDocumentsPreparationComment?noticeLawyerParty.IssuesList.courtDocumentsPreparationComment:'';
            }  

            if (this.listOfIssues.includes("applicationAbout")){
                this.applicationAboutComment = noticeLawyerParty.IssuesList?.applicationAboutComment?noticeLawyerParty.IssuesList.applicationAboutComment:'';
            }  
        }             
    }

    public getLawyerInformationResults(noticeLawyerParty: noticeLawyerPartyDataInfoType) {               

        this.lawyerInformation = {
            firmName: noticeLawyerParty.FirmName?noticeLawyerParty.FirmName:'',
            lawyerName: noticeLawyerParty.ApplicantName?noticeLawyerParty.ApplicantName:{} as nameInfoType,
            address: noticeLawyerParty.LawyerAddressNlp?noticeLawyerParty.LawyerAddressNlp:{} as addressInfoType,
            contact: noticeLawyerParty.LawyerContact?noticeLawyerParty.LawyerContact:{} as contactInfoType
        }          
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>