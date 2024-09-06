<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <!-- <Header> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px; text-align: center;">
                    <ScheduleHeader 
                        scheduleNumber="Schedule 6" 
                        scheduleTitle="Property division in respect of a companion animal" 
                        scheduleDescription="Disagree with order requested by other party"/>
                </div>
                <div style="width: 20%;"/>
            </div>
            <div style="margin-bottom: 0.5rem;"/>

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                        <NoteBox>
                            <p style="margin-bottom: 0rem; font-size: 10pt;">
                                Complete this schedule only if you disagree with all or part of the order about property division in 
                                respect of the companion animal applied for by the other party on Schedule 10 or Schedule 11 of 
                                their Application About a Family Law Matter
                            </p>
                        </NoteBox>
                </div>
                <div style="width: 20%;"/>
            </div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row; margin-top: 0.5rem">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="1" title="Relationship between the parties"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>1. </b> 
                        <div style="text-indent:10px;display:inline; color: #626262">
                            <i>Select only one of the options below</i>
                        </div>
                    </div>
                    <div style="margin-left: 2rem;">
                        <check-box inline="inline-block" boxMargin="0"
                            shift="10" shiftmark="0"  marginLeft="1.75rem" :check="replyNewCompInfo.spouse?'yes':''"  text="<b>I am</b> (or was) the other party’s spouse"/>
                        <check-box inline="inline-block" boxMargin="0" 
                            shift="10" shiftmark="0"  marginLeft="1.75rem" :check="!replyNewCompInfo.spouse?'yes':''"  text="<b>I have never been</b> the other party’s spouse"/>
                        <i style="margin-left:1.5rem; color:#626262">Please describe your relationship to the other party</i>
                        <div v-if="!replyNewCompInfo.spouse && replyNewCompInfo.relationshipDetails" class="answerbox" style="width:95%; background-color: #dedede; word-wrap: break-word; margin-left:1.5rem;">
                            {{replyNewCompInfo.relationshipDetails}}
                        </div>
                        <div v-else style="margin-left:1.5rem; min-height:50px; background-color: #dedede"/>
                    </div>
                    
                </div>
                <div style="width: 20%; margin-top: 120px" />
            </div>

            <!-- <2> -->
            <div style="display: flex; flex-direction: row; margin-top: 0.5rem">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="2" title="Reason you disagree"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>2. </b> 
                        <div style="text-indent:10px;display:inline;">
                            <b>I do not agree with the order requested</b> by the other party about property division in respect of a companion animal because:
                        </div>
                    </div>
                    <div style="margin-left: 2rem;">
                        <div v-if="replyNewCompInfo.disagreeReason" class="answerbox" style="width:95%; background-color: #dedede; word-wrap: break-word;">
                            {{replyNewCompInfo.disagreeReason}}
                        </div>
                        <div v-else style="min-height:150px; background-color: #dedede"/>
                    </div>
                    
                </div>
                <div style="width: 20%; margin-top: 120px" />
            </div>

            <!-- <3> -->
            <div style="display: flex; flex-direction: row; margin-top: 0.5rem">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="3" title="Existing agreement" subtitle="Complete this part only if there is an existing agreement about property division in respect of the companion animal"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>3. </b> 
                        <div style="text-indent:10px;display:inline; color: #626262">
                            <i>Select only one of the options below</i>
                        </div>
                    </div>
                    <div style="margin-left: 2rem;">
                        <check-box inline="inline-block" boxMargin="0"
                            shift="10" shiftmark="0"  marginLeft="1.75rem" :check="!exReplyCompInfo.replace ?'yes':''"  
                            text="I would like the agreement to <b>continue to be in place</b> <i style='color: #626262'>➜ If you selected this option, no further information is required on this schedule</i>"/>
                        <check-box inline="inline-block" boxMargin="0" 
                            shift="10" shiftmark="0"  marginLeft="1.75rem" :check="exReplyCompInfo.replace ?'yes':''"  text="I am applying for the agreement to be <b>replaced</b> as set out in Part 4"/>
                    </div>
                </div>
                <div style="width: 20%; margin-top: 120px" />
            </div>

            <!-- <4> -->
                <div style="display: flex; flex-direction: row; margin-top: 0.5rem">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="4" title="Order about property division in respect of a companion animal" 
                        subtitle="You do not need to complete this part if have indicated you would like the existing agreement to continue to be in place"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>4. </b> 
                        <div style="text-indent:10px;display:inline;">
                            I am applying for a <b>property division order for sole ownership and possession of
                            the companion animal(s)</b> as follows:
                        </div>
                    </div>
                    <!-- Return to this -->
                    <div style="margin-left: 2rem;">
                        <b-table
                            :items="[{},{},{},{}]"
                            :fields="fields"
                            class="mt-2"
                            small>                    
                                <template v-slot:cell()="data">
                                    <div style="height:1rem; font-size:8pt;color:#000;background-color: #d6d6d6;">{{data.value}}</div>                                           
                                </template>
                                <template v-slot:head(party)>
                                    To [party]<br/><span style="color: #626262; font-size:6pt">Select one option for each animal</span>
                                </template>
                                <template v-slot:cell(party)>
                                    <check-box inline="inline" boxMargin="0" textDisplay="inline"
                                        shift="10" shiftmark="0" :check="false ?'yes':''" text="Me" style="font-size:9pt; display: inline"/>
                                    <check-box inline="inline" boxMargin="0" textDisplay="inline"
                                        shift="10" shiftmark="0" :check="false ?'yes':''" text="Other party" style="font-size:9pt; display: inline"/>
                                </template>
                        </b-table>
                    </div>
                </div>
                <div style="width: 20%; margin-top: 80px">
                    <NoteBox textColor="#626262">
                        <b-icon-info-circle-fill/>
                        <p>
                            Under section 97 of the 
                            <i>Family Law Act</i>, the court may 
                            only make an order for 
                            ownership and possession of 
                            a companion animal by one 
                            spouse. 
                        </p>
                    </NoteBox>
                </div>
            </div>

        <!-- <5> -->
            <div style="display: flex; flex-direction: row; margin-top: 0.5rem">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="5" title="The facts" 
                        subtitle="You do not need to complete this part if have indicated you would like the existing agreement to continue to be in place"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>5. </b> 
                        <div style="text-indent:10px;display:inline;">
                            The <b>facts</b> on which this application is based are as follows: <br/>
                            <i style="color: #626262">Provide the facts you want the court to consider and why the court should make the order you are applying for</i>
                        </div>
                    </div>
                    <!-- Return to this -->
                    <div style="margin-left: 2rem;">
                        <div v-if="replyNewCompInfo.newOrderDetails" style="background-color: #dedede; word-wrap: break-word;" class="answerbox">{{ replyNewCompInfo.newOrderDetails }}</div>
                        <div v-else style="margin-bottom:3rem; min-height:150px; background-color: #dedede"/> 
                    </div>
                </div>
                <div style="width: 20%; margin-top: 120px" />
            </div>

<!-- <1> -->
            <!-- <section class="resetquestion">
                <div style="display:inline;">
                    Select only one of the options below                   
                </div>
                <div style="margin:0 0 2rem 1.25rem;">
                    <check-box  :check="replyNewCompInfo.spouse?'yes':''" text="I am (or was) the other party’s spouse"/>
                    <check-box  :check="!replyNewCompInfo.spouse?'yes':''" text="I have never been the other party’s spouse"/>
                    <div style="margin:0 0 0rem 1.75rem;">Please describe your relationship to the other party:</div>                    
                    <div v-if="!replyNewCompInfo.spouse && replyNewCompInfo.relationshipDetails" 
                        class="answerbox">{{replyNewCompInfo.relationshipDetails}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </div>
            </section> -->

            <!-- <div class="print-block"> -->
<!-- <2> -->
                <!-- <section>
                    <div style="display:inline;">
                        I do not agree with the order requested by the other party about 
                        property division in respect of a companion animal because:
                    </div>
                    <div v-if="replyNewCompInfo.disagreeReason" 
                        class="answerbox">{{replyNewCompInfo.disagreeReason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>                   
                </section> 
            </div>

            <div class="print-block"> -->
<!-- <3> -->
                <!-- <section>
                    <div style="display:inline;">
                        I believe the court should make the following order for property division in respect of a companion animal:
                    </div>
                    <div style="font-style: italic;display:block;margin:0 0 0 1rem;">                        
                        Note: Under section 97 of the Family Law Act, the court may only make 
                        an order for ownership and possession of a companion animal <b>by one spouse.</b>                                             
                    </div>                   
                    
                    <div style="margin:1rem 3rem 2rem 0.25rem;">
                        <div v-if="replyNewCompInfo.newOrderDetails" 
                            class="answerbox">{{replyNewCompInfo.newOrderDetails}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>  -->
            </div>

        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import { schedule101DataInfoType, schedule102DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { animalRelationshipToOtherPartyDataInfoType, disagreePropertyDivisionDataInfoType, propertyDivisionOrderDataInfoType, disagreeExistingPropertyDivisionOrderDataInfoType, replyNewPropertyDivisionDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/CompanionAnimal';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        ScheduleHeader,
        NoteBox,
        FormPart
    }
})

export default class Schedule101 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    replyNewCompInfo = {} as schedule101DataInfoType;
    exReplyCompInfo = {} as schedule102DataInfoType;

    fields=[
        {key:"companion", label:"Name of companion animal", tdClass:"text-center align-middle", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:25%; font-weight: bold; border: none; border-bottom: 2px solid #333;"},
        {key:"type",      label:"Type of animal", tdClass:"text-center align-middle", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:13%; font-weight: bold; border: none; border-bottom: 2px solid #333;"},
        {key:"party",      label:"To [party]", tdClass:"text-center align-middle", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:25%; font-weight: bold; border: none; border-bottom: 2px solid #333;"}
    ]
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.replyNewCompInfo = this.getReplyNewCompanionAnimalInfo(); 
        this.exReplyCompInfo = this.getExReplyCompanionAnimalInfo(); 
    }

    public getReplyNewCompanionAnimalInfo(){
       
        let replyNewCompanionInfo = {} as schedule101DataInfoType;

        replyNewCompanionInfo = {
            newOrderDetails: '',
            disagreeReason: '',
            spouse: false,
            relationshipDetails: '' 
        }

        if (this.result.disagreePropertyDivisionSurvey){
            const disagreePropertyDivisionData: disagreePropertyDivisionDataInfoType = this.result.disagreePropertyDivisionSurvey;
            replyNewCompanionInfo.disagreeReason = disagreePropertyDivisionData.disagreeCompanionAnimalOrder?disagreePropertyDivisionData.disagreeCompanionAnimalOrder:'';           
        }

        if (this.result.animalRelationshipToOtherPartySurvey){
            const animalRelationshipToOtherPartyData: animalRelationshipToOtherPartyDataInfoType = this.result.animalRelationshipToOtherPartySurvey;
            replyNewCompanionInfo.spouse = animalRelationshipToOtherPartyData.otherPartyIsSpouse == 'y';
            if (!replyNewCompanionInfo.spouse){
                replyNewCompanionInfo.relationshipDetails = animalRelationshipToOtherPartyData.otherPartyRelationshipDesc?animalRelationshipToOtherPartyData.otherPartyRelationshipDesc:'';
            }
        }

        if (this.result.propertyDivisionOrderSurvey){
            const propertyDivisionOrderData: propertyDivisionOrderDataInfoType = this.result.propertyDivisionOrderSurvey;
            replyNewCompanionInfo.newOrderDetails = propertyDivisionOrderData.propertyDivisionCourtOrderBelief?propertyDivisionOrderData.propertyDivisionCourtOrderBelief:'';           
        }
        
       return replyNewCompanionInfo;
   }

   public getExReplyCompanionAnimalInfo(){
       
       let exReplyCompInfo = {} as schedule102DataInfoType;

       exReplyCompInfo = {
           disagreeReason: '',
           replace: false,
           replaceDetails: ''  
       }

       if (this.result.disagreeExistingPropertyDivisionOrderSurvey){
           const exReplyCompData: disagreeExistingPropertyDivisionOrderDataInfoType = this.result.disagreeExistingPropertyDivisionOrderSurvey;
           
           exReplyCompInfo.disagreeReason = exReplyCompData.disagreeExistingCompanionAnimalOrder?exReplyCompData.disagreeExistingCompanionAnimalOrder:''//exCompData.setAsideReason;
           exReplyCompInfo.replace = exReplyCompData.existingOrderContinue == 'n';         
           if (exReplyCompInfo.replace){
               exReplyCompInfo.replaceDetails = exReplyCompData.replaceExistingAgreementChanges?exReplyCompData.replaceExistingAgreementChanges:'';
           }
       }

      return exReplyCompInfo;
  } 

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 