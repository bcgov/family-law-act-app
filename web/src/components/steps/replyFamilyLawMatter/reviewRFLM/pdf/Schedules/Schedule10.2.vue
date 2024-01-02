<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>
                SCHEDULE 10.2 – REPLY TO AN APPLICATION ABOUT A COMPANION ANIMAL AGREEMENT – EXISTING
            </b></div>
            <div style="text-align:center;"><b>This is Schedule 10.2 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application 
                    by the other party to set aside or replace all or part of an existing written 
                    agreement about a companion animal. The order they applied for about property 
                    division in respect of a companion animal can be found in Schedule 12 of 
                    their Application About a Family Law Matter.
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">

                <div style="display:inline;">
                    I do not agree with the order requested by the other party about 
                    property division in respect of a companion animal because:
                </div>
                <div v-if="exReplyCompInfo.disagreeReason" 
                    class="answerbox">{{exReplyCompInfo.disagreeReason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
                
            </section>

            <div class="print-block">
<!-- <2> -->
                <section>                    
                    <i style="margin:0 0 0 0.5rem;">
                        Select only one of the options below                   
                    </i>
                    <div style="margin:0 0 2rem 1.5rem;">
                        <check-box  :check="!exReplyCompInfo.replace?'yes':''" text="I would like the existing agreement about property division in respect of a companion animal to continue to be in place"/>
                        <check-box  :check="exReplyCompInfo.replace?'yes':''" text="I am applying to replace the existing agreement about property division in respect of a companion animal as follows:"/>                  
                        <div v-if="exReplyCompInfo.replace && exReplyCompInfo.replaceDetails" 
                            class="answerbox">{{exReplyCompInfo.replaceDetails}}</div>
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
import { schedule102DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { disagreeExistingPropertyDivisionOrderDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/CompanionAnimal';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule102 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    exReplyCompInfo = {} as schedule102DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.exReplyCompInfo = this.getExReplyCompanionAnimalInfo(); 
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