<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Request for Scheduling</b></div>               
                <div style="font-size:10pt;"><b>FORM 39</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 156</div>
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
                textwidth="35rem" 
                beforetext="My name is" 
                hint="(full name of party)" 
                :italicHint="false" :text="yourInfo.name | getFullName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                .
            </div>
            <div style="margin-top: 1rem;"></div>
        </section>

           
        <div style="margin-top: 1rem;"></div>  
<!-- <2> -->

        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="33rem" 
                beforetext="The other party is" 
                hint="(full name of other party/parties)"
                :italicHint="false" 
                :text="otherParties"/>     
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                .
            </div>
        </section>

        <div style="margin-top: 1rem;"></div>  

<!-- <3> -->
        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="6rem" 
                beforetext="On" 
                hint="(mmm/dd/yyyy)" 
                :italicHint="false" :text="yourInfo.name | getFullName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                :
            </div>

            <div style="margin-top: 1rem;"></div>

            <i>Select all options that apply</i>
            <div class="marginleft1p5vue" style="margin:0.25rem 0 0 1.5rem;">

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="this matter was adjourned by the court without setting a new date (adjourned generally)"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="this matter was struck off the court list by the court without setting a new date"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="an order or direction was made by the court referring or requiring the party/parties to attend, participate or complete a
                    requirement before returning to court"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="an order or direction was made by the court requiring that a deficiency under these rules be addressed by a party before
                    returning to court"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="an order was made by the court providing for the review of the order"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="an interim order was made by the court and I am applying for the interim order to be changed, suspended or cancelled
                    under section 216 (3) of the <i>Family Law Act</i> because:"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="I would like the interim order changed, suspended or cancelled as follows:"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="I attended a family management conference regarding this matter."/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="I am applying for an interim order under section 216 or 217 of the <i>Family Law Act</i> for the following family law matter order(s)
                    applied for in my application, reply or counter application:"/>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="disWholeApp.length>0?'yes':''" 
                            text="parenting arrangements, including parental responsibilities and parenting time"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="disWholeApp.length>0?'yes':''" 
                            text="child support"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="disWholeApp.length>0?'yes':''" 
                            text="contact with a child"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="disWholeApp.length>0?'yes':''" 
                            text="guardianship of a child"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="disWholeApp.length>0?'yes':''" 
                            text="spousal support"/>
                    </div>
            </div>

        </section>

<!-- <4> -->
        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="6rem" 
                beforetext="I request that the application filed on" 
                hint="(mmm/dd/yyyy)" 
                :italicHint="false" :text="yourInfo.name | getFullName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                be scheduled for a:
            </div>

            <div style="margin-top: 1rem;"></div>

            <div class="marginleft1p5vue" style="margin:0.25rem 0 0 1.5rem;">
           
                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;"
                    :check="courtAppearanceScheduled == 'n'?'yes':''" 
                    text="family management conference"/>

                
                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="courtAppearanceScheduled == 'y'?'yes':''" 
                    text="other court appearance as ordered or directed by the court (specify):"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="" 
                    :text="courtAppearanceScheduled == 'y'?courtDate:''"/>    
            </div>        
           

        </section>

        <div style="margin-top: 1rem;"></div>  

<!-- <5> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline;" 
                :check="acknowledgeService?'yes':''" 
                text="I understand I must give notice of this request for scheduling to each other party. To give notice, "/>                
                <div style="text-indent:30px;">
                    they must be served with the document at least 7 days before the date set for the court</div>
                <div style="text-indent:30px;"> appearance.</div>
        </section>

        <div style="margin-top: 3rem;"></div>
        
        <div style="margin:0 0 1rem 1rem; font-weight:normal; font-size:12pt;">
            <i>For registry or judicial case manager use only</i>
        </div>


    <!-- <For registery> -->
        <div class="print-block">
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                 
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="17rem" beforetext="<b>A</b>" hint="(type of appearance)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="7rem" beforetext="<b>is scheduled for</b>" hint="(mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="3rem" beforetext="<b>at</b>" hint="(time)" text=""/>
                <div style="text-indent:2px;display:inline;"><b> a.m./p.m.</b></div>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="38rem" beforetext="<b>at</b>" hint="(court registry, street address, city)" text=""/>               
            </div>
            <div 
                style="margin:1.5rem 0 0 1rem; font-size:9pt;">
                <b>
                    NOTE TO THE OTHER PARTY: If you do not appear in court on the date and time above, the Court may make an order in
                    your absence.
                </b>
            </div>
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

export default class Form39Layout extends Vue {

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

        if(this.result?.discontinuanceInformationSurvey && this.result?.moreInformationRqsSurvey){

            let discontinuance = {} as discontinuanceInformationSurveyDataInfoType;
            discontinuance = this.result.discontinuanceInformationSurvey;  
            
            let moreInfo = {} as moreInformationSurveyDataInfoType;
            moreInfo = this.result.moreInformationRqsSurvey;  

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