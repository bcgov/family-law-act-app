<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Affidavit – General</b></div>               
                <div style="font-size:10pt;"><b>FORM 45</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 171 and 172</div>
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
        

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="I" 
            hint="(full name)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="8rem" 
            beforetext="," 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="of" 
            hint="(address of party, city, province)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>
        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            ,
        </div>
        
        
        <div style="text-indent:5px;display:block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            Swear or affirm that:
        </div> 
        <div style="display:block; font-size: 9pt; margin: 1rem 0 0 5px; font-weight: 700;"> 
            I know or believe the following facts to be true. If these facts are based on information 
            from others, I believe that information to be true.
        </div>
           
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I am making this affidavit
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline; margin-left: 1rem;" 
                :check="disWholeApp.includes('form6Counter')?'yes':''" 
                text="in support of an application"/>
            <underline-form 
                style="text-indent:1px;display:inline-block;" 
                textwidth="17.5rem" 
                beforetext="" 
                hint="(briefly describe the type of application)" 
                :text="disWholeApp.includes('form6Counter')?counterDate:''"/>            
            
            <div style="margin:0.5rem 0 0 12rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.includes('form6Counter')?'yes':''" 
                    text="in response to an application"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="disWholeApp.includes('form6Counter')?counterDate:''"/>            
            </div>
        </section>
            
        <div style="margin-top: 1rem;">
            <i>
                List the facts that you wish to present to the court. If certain facts are not within 
                your personal knowledge, identify the source of your information. If you refer to 
                documents, attach them to this affidavit and mark them as exhibits.
            </i>
        </div>
        <!-- <3> -->

        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                {{  }}
            </div>            
            
        </section>

    <!-- <SWEAR > -->        

        <div style="margin:0.5rem 0 0 0">
            <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem" beforetext="Sworn or affirmed before me at" hint="(city)" text="" />
        </div>
        <div style="margin:.5rem 0 0 0">
            <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="British Columbia on" hint="(date)" text="" />
        </div>

        <div style="margin:2rem 0 0 0">
            <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
            <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
        </div>
        <div>
            <div style="width:20rem; display:inline-block; font-size:9pt" >A Commissioner for taking Affidavits in British Columbia</div>
            <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
        </div>
        <div style="margin:.5rem 0 0 0">
            <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="" hint="[print name or affix stamp of commissioner]" text="" />
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

export default class Form40Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;   

    existingFileNumber = '';

    childDetails =[{name:'', dob: ''}];
    childTableFields = [
        {key:"name",             label:"Child’s full name",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"dob", label:"Child’s Date of Birth", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ];
    dateOfAddressChange = '';   
    acknowledge = false;

    listOfDiscontinuanceDocs = [];
    firstOtherParty = '';
    otherPartiesList = [];
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

            const otherParties = [];
            for (const otherParty of noticeDiscontinuance.otherPartyInfoDis){
                otherParties.push(Vue.filter('getFullName')(otherParty.name))
            }

            this.firstOtherParty = otherParties[0];
            this.otherPartiesList = otherParties.length>1?otherParties.slice(1):[];

            
           
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