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
                :italicHint="false" :text="lastAppearanceDate | beautify-date"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                :
            </div>

            <div style="margin-top: 1rem;"></div>

            <i>Select all options that apply</i>
            <div class="marginleft1p5vue" style="margin:0.25rem 0 0 1.5rem;">

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('adjourned')?'yes':''" 
                    text="this matter was adjourned by the court without setting a new date (adjourned generally)"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('struck')?'yes':''" 
                    text="this matter was struck off the court list by the court without setting a new date"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('party')?'yes':''" 
                    text="an order or direction was made by the court referring or requiring the party/parties to attend, participate or complete a
                    requirement before returning to court"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('deficiency')?'yes':''" 
                    text="an order or direction was made by the court requiring that a deficiency under these rules be addressed by a party before
                    returning to court"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reviewOrderMade?'yes':''" 
                    text="an order was made by the court providing for the review of the order"/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('orderChanged')?'yes':''" 
                    text="an interim order was made by the court and I am applying for the interim order to be changed, suspended or cancelled
                    under section 216 (3) of the <i>Family Law Act</i> because:"/>
                    <div v-if="reasons.includes('orderChanged') && reasonForChange.length>0" 
                        class="answerbox">{{reasonForChange}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('orderChanged')?'yes':''" 
                    text="I would like the interim order changed, suspended or cancelled as follows:"/>
                    <div v-if="reasons.includes('orderChanged') && descriptionOnChange.length>0" 
                        class="answerbox">{{descriptionOnChange}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('family')?'yes':''" 
                    text="I attended a family management conference regarding this matter."/>

                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="reasons.includes('family')?'yes':''" 
                    text="I am applying for an interim order under section 216 or 217 of the <i>Family Law Act</i> for the following family law matter order(s)
                    applied for in my application, reply or counter application:"/>

                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="flmTypes.includes('Parenting arrangements including parental responsibilities and parenting time')?'yes':''" 
                            text="parenting arrangements, including parental responsibilities and parenting time"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="flmTypes.includes('Child support')?'yes':''" 
                            text="child support"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="flmTypes.includes('Contact with a child')?'yes':''" 
                            text="contact with a child"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="flmTypes.includes('Guardianship of a child')?'yes':''" 
                            text="guardianship of a child"/>

                        <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                            :check="flmTypes.includes('Spousal support')?'yes':''" 
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
                :italicHint="false" :text="filedDate | beautify-date"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                be scheduled for a:
            </div>

            <div style="margin-top: 1rem;"></div>

            <div class="marginleft1p5vue" style="margin:0.25rem 0 0 1.5rem;">
           
                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;"
                    :check="appearanceType == 'familyManagementConference'?'yes':''" 
                    text="family management conference"/>

                
                <check-box inline="inline" :boxMargin="0" shift="10" style="margin-left:0.35rem;" 
                    :check="appearanceType == 'other'?'yes':''" 
                    text="other court appearance as ordered or directed by the court (specify):"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="" 
                    :text="appearanceType == 'other' && otherAppearanceDesc.length>0?otherAppearanceDesc:''"/>    
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
import { interimOrderSurveyDataInfoType, nextAppearanceSurveyDataInfoType, partyInformationRqsSurveyDataInfoType, requestForSchedulingDataInfoType } from '@/types/Application/RequestScheduling';

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

    existingFileNumber = '';
   
    yourInfo = {} as yourInformationInfoDataInfoType;  
    otherParties = ''; 
    acknowledgeService = false;

    filedDate = '';
    lastAppearanceDate = '';
    reviewOrderMade = false;

    reasons = [];
    flmTypes = [];
    descriptionOnChange = '';
    reasonForChange = '';

    appearanceType = '';
    otherAppearanceDesc = '';
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){ 
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);       
        this.getRequestSchedulingInfo();    
        this.getReasonForSchedulingInfo(); 
        this.getNextAppearanceInfo(); 
        this.getPartyInfo();        
    } 

    public getRequestSchedulingInfo(){      
        
        this.filedDate = '';
        this.lastAppearanceDate = '';
        this.reviewOrderMade = false;

        if(this.result?.requestForSchedulingSurvey){

            let requestForScheduling = {} as requestForSchedulingDataInfoType;

            requestForScheduling = this.result.requestForSchedulingSurvey;

            if (requestForScheduling.Unresolved == 'n' && requestForScheduling.ReviewOrdered == 'y'){
                this.reviewOrderMade = true;
            }

            this.filedDate = requestForScheduling.FiledDate?requestForScheduling.FiledDate:'';
            this.lastAppearanceDate = requestForScheduling.LastAppearanceDate?requestForScheduling.LastAppearanceDate:'';           
        }             
    }

    public getPartyInfo(){  
        
        this.yourInfo = {} as yourInformationInfoDataInfoType;
        this.otherParties = '';

        if(this.result?.partyInformationRqsSurvey){

            let partyInfo = {} as partyInformationRqsSurveyDataInfoType;

            partyInfo = this.result.partyInformationRqsSurvey;
            this.yourInfo = getYourInformationResults(partyInfo);

            const otherPartiesList = [];
            for (const otherParty of partyInfo.otherPartyInfoRqs){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ');   
            
            this.acknowledgeService = this.result.otherPartyRqsConfirmationSurvey?.confirmation == 'Confirmed';
        
        }
    
    }

    public getNextAppearanceInfo(){

        this.appearanceType = '';
        this.otherAppearanceDesc = '';

        if(this.result?.nextAppearanceSurvey){

            let appearanceInfo = {} as nextAppearanceSurveyDataInfoType;
            appearanceInfo = this.result.nextAppearanceSurvey;
            this.appearanceType = appearanceInfo.AppearanceType?appearanceInfo.AppearanceType:'';

            if (this.appearanceType == 'other'){
                this.otherAppearanceDesc = appearanceInfo.AppearanceTypeComment?appearanceInfo.AppearanceTypeComment:'';
            }
        }
    }    

    public getReasonForSchedulingInfo(){       

        this.reasons = [];
        this.flmTypes = [];
        this.descriptionOnChange = '';
        this.reasonForChange = '';        
        
        if(this.result?.reasonForSchedulingSurvey){

            this.reasons = this.result.reasonForSchedulingSurvey;  

            if (this.reasons.includes('family') || this.reasons.includes('orderChanged')){

                if(this.result?.interimOrderSurvey){

                    let interimInfo = {} as interimOrderSurveyDataInfoType;
                    interimInfo = this.result.interimOrderSurvey;

                    if (interimInfo.family){
                        this.flmTypes = interimInfo.FlmType?interimInfo.FlmType:[];
                    }

                    if (interimInfo.orderChanged){
                        this.descriptionOnChange = interimInfo.DescriptionOnChange?interimInfo.DescriptionOnChange:'';
                        this.reasonForChange = interimInfo.ReasonForChange?interimInfo.ReasonForChange:'';
                    }
                }
            }
        
        }        
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>