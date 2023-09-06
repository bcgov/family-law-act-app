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
                    :check="disWholeApp.includes('form3')?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="(full name of lawyer)" 
                    :text="disWholeApp.includes('form3')?application.type:''"/>   
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="am no longer representing" 
                    hint="(full name of party/parties)" 
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 0.5rem;" 
                    textwidth="17rem" 
                    beforetext="on this case effective"
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
            </div>

            <div class="marginleft2p5vue" style="margin:0.5rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.includes('form3')?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="(full name of party)" 
                    :text="disWholeApp.includes('form3')?application.type:''"/>   
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="17rem" 
                    beforetext="am no longer represented by" 
                    hint="(full name of lawyer)" 
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 0.5rem;" 
                    textwidth="17rem" 
                    beforetext="on this case effective"
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
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
                :check="disWholeApp.includes('form3')?'yes':''" 
                text="There are no changes to the contact information or address for service of court documents on file"/>                   
        </div>        
       
        <div class="marginleft2p5vue" style="margin:0.5rem 0 0 1.5rem;">
            <check-box 
                class="marginleft" 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline;"
                :check="disWholeApp.length>0?'yes':''" 
                text="The contact information and address for service of court documents are now changed to:"/>
        </div>

        <table class="compactfullsize" style="font-size: 9pt;">
            <tr style="border:1px solid #414142" >
                <td colspan="3">Lawyer name (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
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
           
    <div style="margin-top: 1rem;"></div>
<!-- <3> -->
 
    <section>
        <check-box 
            inline="inline" 
            boxMargin="0" 
            style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
            :check="acknowledge?'yes':''" 
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
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { discontinuanceInformationSurveyDataInfoType, moreInformationSurveyDataInfoType, noticeDiscontinuanceDataInfoType } from '@/types/Application/Discontinuance';

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
   
    yourInfo = {} as yourInformationInfoDataInfoType;   

    existingFileNumber = '';
    dateOfAddressChange = '';   
    acknowledge = false;

    listOfDiscontinuanceDocs = [];
    otherParties = '';
    disWholeApp = [];
    disPartialApp = [];
    application = {type: 'a Family Law Matter', date: ''};
    reply = {type: '', date: ''};
    counterDate = '';
    partialInfo = '';
    courtAppearanceScheduled = '';
    courtDate = '';
    trialPrepHappened = '';
    trialDateWithin30Days = '';
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getNoticeDiscontinuanceInfo();    
        this.getDiscontinuanceInfo();    
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledge = this.result.addressChangeNoticeSurvey?.acknowledgement?.length>0;
    } 

    public getNoticeDiscontinuanceInfo(){          

        if(this.result?.noticeDiscontinuanceSurvey){

            let noticeDiscontinuance = {} as noticeDiscontinuanceDataInfoType;

            noticeDiscontinuance = this.result.noticeDiscontinuanceSurvey;            
            this.listOfDiscontinuanceDocs = noticeDiscontinuance.discontinuanceDocs?noticeDiscontinuance.discontinuanceDocs:[];

            this.yourInfo = getYourInformationResults(noticeDiscontinuance);

            const otherPartiesList = [];
            for (const otherParty of noticeDiscontinuance.otherPartyInfoDis){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ')
           
        } else {
            this.yourInfo = {} as yourInformationInfoDataInfoType;
        }
            
    }

    public getDiscontinuanceInfo(){       
        
        this.disWholeApp = [];
        this.disPartialApp = [];
        this.application = {type: 'a Family Law Matter', date: ''};
        this.reply = {type: '', date: ''};
        this.counterDate = '';
        this.partialInfo = '';
        this.courtAppearanceScheduled = '';
        this.courtDate = '';
        this.trialPrepHappened = '';
        this.trialDateWithin30Days = '';

        if(this.result?.discontinuanceInformationSurvey && this.result?.moreInformationSurvey){

            let discontinuance = {} as discontinuanceInformationSurveyDataInfoType;
            discontinuance = this.result.discontinuanceInformationSurvey;  
            
            let moreInfo = {} as moreInformationSurveyDataInfoType;
            moreInfo = this.result.moreInformationSurvey;  

            const partialInfoList = [];
            
            if (this.listOfDiscontinuanceDocs.includes('form3')){

                this.application.date = Vue.filter('beautify-date')(moreInfo.Form3FiledDate);

                if(discontinuance.discontinueAllForm3 == 'y'){
                    this.disWholeApp.push('form3')
                } else {
                    this.disPartialApp.push('form3');
                    if (discontinuance.discontinuePartForm3){
                        partialInfoList.push(discontinuance.discontinuePartForm3)
                    }                    
                    
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form6')){

                this.reply.date = Vue.filter('beautify-date')(moreInfo.ReplyFiledDate);
                
                if (moreInfo.ReplyType == 'form6'){
                    this.reply.type = 'a Family Law Matter';                    
                }

                if(discontinuance.discontinueAllForm6 == 'y'){
                    this.disWholeApp.push('form6')
                } else {
                    this.disPartialApp.push('form6');
                    if (discontinuance.discontinuePartForm6){
                        partialInfoList.push(discontinuance.discontinuePartForm6)
                    }  
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form6Counter')){

                this.counterDate = Vue.filter('beautify-date')(moreInfo.CounterFiledDate);

                if(discontinuance.discontinueAllForm6Counter == 'y'){
                    this.disWholeApp.push('form6Counter')
                } else {
                    this.disPartialApp.push('form6Counter')
                    if (discontinuance.discontinuePartForm6Counter){
                        partialInfoList.push(discontinuance.discontinuePartForm6Counter)
                    }  
                }
            }

            if (this.listOfDiscontinuanceDocs.includes('form8')){

                this.reply.date = Vue.filter('beautify-date')(moreInfo.ReplyFiledDate);
                
                if (moreInfo.ReplyType == 'form8'){
                    this.reply.type = 'a Counter Application';                    
                }

                if(discontinuance.discontinueAllForm8 == 'y'){
                    this.disWholeApp.push('form8')
                } else {
                    this.disPartialApp.push('form8');
                    if (discontinuance.discontinuePartForm8){
                        partialInfoList.push(discontinuance.discontinuePartForm8)
                    }  
                }
            }

            this.partialInfo = partialInfoList.join(', ');

            this.courtAppearanceScheduled = moreInfo.CourtAppearanceScheduled;
            this.courtDate = moreInfo.CourtAppearanceScheduled == 'y'?Vue.filter('beautify-date')(moreInfo.CourtAppearanceDate):'';
            this.trialPrepHappened = moreInfo.TrialPrep;
            this.trialDateWithin30Days = moreInfo.TrialDateScheduled;
        
        }        
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>