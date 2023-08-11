<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Discontinuance</b></div>               
                <div style="font-size:10pt;"><b>FORM 50</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 191</div>
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
                hint="(full name of party)" 
                :italicHint="false" :text="yourInfo.name | getFullName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                am discontinuing
            </div>

            <div style="margin-top: 1rem;"></div>

            <i>Select the correct option(s) and complete any required information</i>

            <div style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    inline="inline" 
                    :boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.length>0?'yes':''" 
                    text="the whole of my"/>
            </div>                       

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.includes('form3')?'yes':''" 
                    text="application about "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="22rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="disWholeApp.includes('form3')?application.type:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="disWholeApp.includes('form3')?application.date:''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.includes('form6') || disWholeApp.includes('form8')?'yes':''" 
                    text="reply to an application about "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="20rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="(disWholeApp.includes('form6') || disWholeApp.includes('form8'))?reply.type:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="(disWholeApp.includes('form6') || disWholeApp.includes('form8'))?reply.date:''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disWholeApp.includes('form6Counter')?'yes':''" 
                    text="counter application filed on "/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="" 
                    hint="mmm/dd/yyyy" 
                    :text="disWholeApp.includes('form6Counter')?counterDate:''"/>            
            </div>

            <div style="margin-top: 1rem;"></div>  

            <div style="margin:0.25rem 0 0 1rem;">
                <check-box 
                    inline="inline"
                    :boxMargin="0" 
                    style="display:inline;" 
                    :check="disPartialApp.length>0?'yes':''" 
                    text="the following schedule(s)/part(s) of my"/>
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disPartialApp.includes('form3')?'yes':''" 
                    text="application about "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="22rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="disPartialApp.includes('form3')?application.type:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="disPartialApp.includes('form3')?application.date:''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disPartialApp.includes('form6') || disPartialApp.includes('form8')?'yes':''" 
                    text="reply to an application about "/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="20rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="(disPartialApp.includes('form6') || disPartialApp.includes('form8'))?reply.type:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="on" 
                    hint="mmm/dd/yyyy" 
                    :text="(disPartialApp.includes('form6') || disPartialApp.includes('form8'))?reply.date:''"/>            
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="disPartialApp.includes('form6Counter')?'yes':''" 
                    text="counter application filed on "/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="" 
                    hint="mmm/dd/yyyy" 
                    :text="disPartialApp.includes('form6Counter')?counterDate:''"/>            
            </div>

            <div style="margin:0.25rem 0 0 .75rem; font-style: italic;" >
                Describe the schedule(s) or part(s) you are discontinuing
            </div>
            
            <div v-if="partialInfo" 
                class="answerbox">{{ partialInfo }}</div>
            <div v-else style="margin-bottom:4rem;"></div>            

        </section>

           
        <div style="margin-top: 1rem;"></div>  
<!-- <2> -->

        <section>
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="32rem" 
                beforetext="The other party is" 
                hint="(full name of other party/parties)"
                :italicHint="false" 
                :text="otherParties"/>           
        </section>

        <div style="margin-top: 1rem;"></div>  
<!-- <3> -->
        <section>
            <i>Please select the correct option and complete any required information</i>
            <div style="margin:0.25rem 0 0 1.25rem;">
                <check-box 
                inline="inline" 
                :boxMargin="0"                
                style="display:inline;"
                :shift="0"
                :check="courtAppearanceScheduled == 'n'?'yes':''" 
                text="the application has no date scheduled for a court appearance"/>
            </div>

            <div style="margin:0.25rem 0 0 1.25rem;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="courtAppearanceScheduled == 'y'?'yes':''" 
                    text="the application is scheduled for a court appearance on "/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="6rem" 
                    beforetext="" 
                    hint="mmm/dd/yyyy" 
                    :text="courtAppearanceScheduled == 'y'?courtDate:''"/>            
            </div>

        </section>


        <div style="margin-top: 1rem;"></div>  
<!-- <4> -->
        <section>
            <div style="display:inline;">Has a trial preparation conference already happened?</div>
            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="trialPrepHappened == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="trialPrepHappened == 'n'?'yes':''" text="No"/>
            <div style="font-style: italic;">If yes, you must complete the consent section of this form.</div>
            <div style="font-style: italic;">
                Each other party is required to provide their consent to discontinue your application, reply or counter application. If any other
                party does not provide their consent, you must apply to the court to discontinue it.
            </div>

        </section>

        <div style="margin-top: 1rem;"></div>  
<!-- <5> -->
        <section>
            <div style="display:inline;">Is a trial date scheduled within 30 days of the date this notice is being filed?</div>
            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="trialDateWithin30Days == 'y'?'yes':''" text="Yes"/>
            <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="trialDateWithin30Days == 'n'?'yes':''" text="No"/>
            <div style="font-style: italic;">If yes, you must complete the consent section of this form.</div>
            <div style="font-style: italic;">
                Each other party is required to provide their consent to discontinue your application, reply or counter application. If any other
                party does not provide their consent, you must apply to the court to discontinue it.
            </div>

        </section>


        <div style="margin-top: 1rem; font-weight: 700;">
            Consent Of The Parties        
        </div>

        <div style="font-style: italic;">
            Complete this section only if a trial preparation conference has already happened or a trial is scheduled within 30 days of the date this
            notice is being filed. Otherwise, you may leave this section blank.        
        </div>

        <div style="margin-top: 1rem;"></div> 

        <div>
            <underline-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="32rem" 
                beforetext="The parties consent to" 
                hint="(full name of party)"
                :italicHint="false" 
                :text="''"/>
                <div style="display: inline;">discontinuing their application, reply or counter application as described in section 1 of this form.</div>           
        </div>

        <div style="margin-top: 1rem;"></div> 
        
        <div style="margin-top: 1rem;">
            <underline-form 
                style="text-indent:0px;display:inline-block;margin-left: 5rem;" 
                textwidth="32rem" 
                beforetext="" 
                hint="(signature)"
                :italicHint="false" 
                :text="''"/>           
        </div>

        <div style="margin-top: 1rem;">
            <underline-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="32rem" 
                beforetext="Signature of" 
                hint="(type or print name)"
                :italicHint="false" 
                :text="''"/>   
                <div style="display: inline;">,</div>               
            
        </div>

        <div class="marginleft2p5vue" style="margin-top: 1rem;">
            <check-box inline="inline" :shiftmark="1" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="false?'yes':''" text="party"/>
            <check-box inline="inline" :shiftmark="1" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="false?'yes':''" text="lawyer for"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="" hint="(name of party/parties)" :text="''"/>            
        </div>       
        
        <div style="margin-top: 1rem;">
            <underline-form 
                style="text-indent:0px;display:inline-block;margin-left: 5rem;" 
                textwidth="32rem" 
                beforetext="" 
                hint="(signature)"
                :italicHint="false" 
                :text="''"/>           
        </div>

        <div style="margin-top: 1rem;">
            <underline-form 
                style="text-indent:0px;display:inline-block;" 
                textwidth="32rem" 
                beforetext="Signature of" 
                hint="(type or print name)"
                :italicHint="false" 
                :text="''"/>   
                <div style="display: inline;">,</div>
        </div>

        <div class="marginleft2p5vue" style="margin-top: 1rem;">
            <check-box inline="inline" :shiftmark="1" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="false?'yes':''" text="party"/>
            <check-box inline="inline" :shiftmark="1" boxMargin="0" shift="10" style="display:inline;margin-left:0.35rem;" :check="false?'yes':''" text="lawyer for"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="" hint="(name of party/parties)" :text="''"/>            
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

export default class Form50Layout extends Vue {

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