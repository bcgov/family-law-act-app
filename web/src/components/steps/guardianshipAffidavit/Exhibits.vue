<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card border-variant="white">
            
            <b-row>
                <h1>Exhibits</h1>                   
            </b-row>   
            
            <b-row>                    
                <p>The following exhibits identified through this pathway must be filed with your guardianship affidavit:</p>
            </b-row>

            <b-card border-variant="white">
                <ul style="padding-inline-start: 20px; margin:0">
                    <li  v-for="(exhibit,inx) in exhibits" :key="inx">
                        {{exhibit.exhibitName}}: {{ exhibit.fileName }} {{ exhibit.fileDate | beautify-date}}
                    </li>
                </ul>
            </b-card>

            <b-card border-variant="white" class="margin-top: 1rem;">   
                <p>
                    Collect all your exhibits so you’re ready to finalize your affidavit.
                </p>
                <p>
                    Each exhibit will be marked by the commissioner for taking affidavits 
                    using a certificate (usually a stamp) with wording like this: 
                    “This is Exhibit [A, B, C…] referred to in the affidavit of [name] sworn 
                    (or affirmed) before me on [date] at [location]” and is signed by the 
                    commissioner for taking affidavits.
                </p>
                <p>
                    If you are filing an unsworn affidavit, make sure you write which 
                    exhibit it is at the top of each one and file them along with 
                    your affidavit.

                </p>
            </b-card>
           
        </b-card>
  
    </page-base>
</template>
  
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import * as _ from 'underscore';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { exhibitsDataInfoType, guardianshipAffidavitDataInfoType } from '@/types/Application/GuardianshipAffidavit';
import { guardianOfChildDataInfoType } from '@/types/Application/FamilyLawMatter/GuardianShip';
  
@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class Exhibits extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;     

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void   
      
    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void
  
    currentStep = 0;
    currentPage = 0;
    exhibits = [];
    
    mounted(){
        this.exhibits = [];
        this.reloadPageInformation();
    }
  
    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
          
        this.exhibits = this.setExhibitList();      
        this.UpdateCommonStepResults({data:{'gaExhibitList':this.exhibits}});        
          
                
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
    }  

    public setExhibitList(){
       
        const gaExhibitList: exhibitsDataInfoType[] = [];

        let baseIndex = 1;

        if (this.step.result?.backgroundCivilCourtProceedingsSurvey?.data) {

            const civilProceedingsInfo = this.step.result.backgroundCivilCourtProceedingsSurvey.data;   
            const courtProceedingsExist = civilProceedingsInfo?.courtProceedingsExist?civilProceedingsInfo.courtProceedingsExist:'n';
            if (courtProceedingsExist == 'y'){
                const civilProceedingsData = civilProceedingsInfo.courtProceedings?civilProceedingsInfo.courtProceedings:[];
                let itemNo = 1;
                for(const proceeding of civilProceedingsData){

                    if(proceeding.courtOrdersExist == 'y'){                        
                        for(const order of proceeding.courtOrderDates) {
                            const exhibit = {} as exhibitsDataInfoType;
                            exhibit.fileDate = order.orderDate;
                            exhibit.fileName = 'Order dated ';
                            exhibit.exhibitIndex = baseIndex;
                            exhibit.exhibitName = 'Exhibit '+ Vue.filter('getAlphabetBasedOnIndex')(baseIndex);
                            exhibit.itemNo = itemNo;
                            exhibit.partyNames = proceeding.partyNames;
                            exhibit.courtLocation = proceeding.courtLocation;
                            gaExhibitList.push(exhibit);
                            baseIndex++;
                        }                        
                    }
                    itemNo++;
                }                
            }
            
        } 

     
        if (this.step.result.guardianshipAffidavitSurvey?.data){
            const gaData: guardianshipAffidavitDataInfoType = this.step.result.guardianshipAffidavitSurvey?.data;

            if (gaData.haveBrcResults == 'y'){

                if (gaData.mcfdRecordCheckDate){

                    const exhibit = {} as exhibitsDataInfoType;
                    exhibit.fileDate = gaData.mcfdRecordCheckDate;
                    exhibit.fileName = 'Ministry of Children and Family Development Record Check dated ';
                    exhibit.exhibitIndex = baseIndex;
                    exhibit.exhibitName = 'Exhibit '+ Vue.filter('getAlphabetBasedOnIndex')(baseIndex);
                    exhibit.itemNo = 0;
                    exhibit.partyNames = '';
                    exhibit.courtLocation = '';
                    gaExhibitList.push(exhibit);
                    baseIndex++;
                }

                if (gaData.porsRecordCheckDate){

                    const exhibit = {} as exhibitsDataInfoType;
                    exhibit.fileDate = gaData.porsRecordCheckDate;
                    exhibit.fileName = 'Protection Order Record Check from the Protection Order Registry dated ';
                    exhibit.exhibitIndex = baseIndex;
                    exhibit.exhibitName = 'Exhibit '+ Vue.filter('getAlphabetBasedOnIndex')(baseIndex);
                    exhibit.itemNo = 0;
                    exhibit.partyNames = '';
                    exhibit.courtLocation = '';
                    gaExhibitList.push(exhibit);
                    baseIndex++;
                }

                if (gaData.criminalRecordCheckDate){
                    const exhibit = {} as exhibitsDataInfoType;
                    exhibit.fileDate = gaData.criminalRecordCheckDate;
                    exhibit.fileName = 'Criminal Record Check dated ';
                    exhibit.exhibitIndex = baseIndex;
                    exhibit.exhibitName = 'Exhibit '+ Vue.filter('getAlphabetBasedOnIndex')(baseIndex);
                    exhibit.itemNo = 0;
                    exhibit.partyNames = '';
                    exhibit.courtLocation = '';
                    gaExhibitList.push(exhibit);
                    baseIndex++;
                } 

            }           
        }
        
        return gaExhibitList;
   }
  
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }
  
    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    } 

    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
    }
}
</script>
  
  <style lang="scss">
  @import "../../../styles/survey";

  </style>
  