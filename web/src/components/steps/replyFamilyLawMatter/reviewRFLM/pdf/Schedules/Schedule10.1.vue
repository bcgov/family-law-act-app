<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>
                SCHEDULE 10.1 – REPLY TO AN APPLICATION ABOUT PROPERTY DIVISION IN RESPECT OF A COMPANION ANIMAL – NEW
            </b></div>
            <div style="text-align:center;"><b>This is Schedule 10.1 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with a new application by 
                    the other party for a property division order in respect of a companion animal. The order 
                    they applied for about property division in respect of a companion animal can be found in
                    Schedule 11 of their Application About a Family Law Matter.
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">
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
            </section>

            <div class="print-block">
<!-- <2> -->
                <section>
                    <div style="display:inline;">
                        I do not agree with the order requested by the other party about 
                        property division in respect of a companion animal because:
                    </div>
                    <div v-if="replyNewCompInfo.disagreeReason" 
                        class="answerbox">{{replyNewCompInfo.disagreeReason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>                   
                </section> 
            </div>

            <div class="print-block">
<!-- <3> -->
                <section>
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
                </section> 
            </div>

        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule101DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { animalRelationshipToOtherPartyDataInfoType, disagreePropertyDivisionDataInfoType, propertyDivisionOrderDataInfoType, replyNewPropertyDivisionDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/CompanionAnimal';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule101 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    replyNewCompInfo = {} as schedule101DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.replyNewCompInfo = this.getReplyNewCompanionAnimalInfo(); 
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

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 