<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 6 – REPLY TO AN APPLICATION ABOUT CONTACT WITH A CHILD – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 6 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to change or
                    cancel an existing final order about contact, or to set aside or replace an existing agreement about contact, with
                    a child or children. The order they applied for about contact can be found in Schedule 6 of their Application About
                    a Family Law Matter.
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem"><i>Select only one of the options below</i></div>
                <div style="margin-left:1rem;">
                    <check-box 
                        :check="exChContInfo.agreeCircumstanceChanges?'yes':''" 
                        text="I agree that needs or circumstances have changed since the final order about contact was made"/>
                    <check-box 
                        style="width:120%;" 
                        :check="exChContInfo.disAgreeCircumstanceChanges?'yes':''" 
                        text="There has been no change in needs or circumstances since the final order about contact was made"/>  
                    <check-box  
                        :check="exChContInfo.agreeChanges?'yes':''" 
                        text="I agree the agreement is not in the best interests of the child(ren)"/>
                    <check-box 
                        style="width:120%;" 
                        :check="exChContInfo.agreeBestInterest?'yes':''" 
                        text="I believe the agreement is in the best interests of the child(ren)"/>                   
                </div>                
            </section>

            <div class="print-block">               
<!-- <2> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">
                        I do not agree with the requested order about the existing final order or agreement about contact with a
                        child or children because:
                    </div>
                    <div v-if="exChContInfo.disagreeReason.length > 0" 
                            class="answerbox">{{exChContInfo.disagreeReason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>
           

            <div class="print-block">
                
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box 
                            style="margin:0 0 0 0rem;" 
                            :check="exChContInfo.continue?'yes':''" 
                            text="I am applying for the existing final order or agreement about contact with a child or children to continue to be in place"/>                    
                    </div>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box  
                            :check="exChContInfo.change?'yes':''" 
                            text="I am applying to change or replace the existing final order or agreement about contact with a child or children as follows:"/>
                        <div v-if="exChContInfo.change && exChContInfo.changeDetails" 
                            class="answerbox">{{exChContInfo.changeDetails}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>
           
            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <4> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact I am applying for is in the child(ren)’s best interests because:</div>
                    <div v-if="exChContInfo.bstIntrst.length > 0" 
                            class="answerbox">{{exChContInfo.bstIntrst}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>
        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule6DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { replyExistingContactWithChildDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ContactWithChild';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule6 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    exChContInfo = {} as schedule6DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.exChContInfo = this.getExistingChildContactInfo(); 
    }

    public getExistingChildContactInfo(){

        let existingChildContactInfo = {} as schedule6DataInfoType;

        existingChildContactInfo = {
            agreeCircumstanceChanges: false,
            disAgreeCircumstanceChanges: false,
            agreeChanges: false,
            agreeBestInterest: false,
            disagreeReason: '',
            continue: false,
            change: false,
            changeDetails: '',    
            bstIntrst: ''
        } 

        if (this.result.replyExistingContactWithChildSurvey){
            const existingContactInfo: replyExistingContactWithChildDataInfoType = this.result.replyExistingContactWithChildSurvey;
            console.log(existingContactInfo)

            if (existingContactInfo.existingType == 'finalOrder'){

                existingChildContactInfo.agreeCircumstanceChanges = existingContactInfo.agreeFinalOrder == 'y';
                existingChildContactInfo.disAgreeCircumstanceChanges = existingContactInfo.agreeFinalOrder == 'n';
                existingChildContactInfo.agreeChanges = false;
                existingChildContactInfo.agreeBestInterest = false;
            } else if (existingContactInfo.existingType == 'agreement'){
                existingChildContactInfo.agreeChanges = existingContactInfo.agreeAgreement == 'y';
                existingChildContactInfo.agreeBestInterest = existingContactInfo.agreeAgreement == 'n';
                existingChildContactInfo.agreeCircumstanceChanges = false;
                existingChildContactInfo.disAgreeCircumstanceChanges = false;
            }
            
            existingChildContactInfo.disagreeReason = existingContactInfo.disagreeReason;

            existingChildContactInfo.continue = existingContactInfo.requestedOrder == 'noChange';
            existingChildContactInfo.change = existingContactInfo.requestedOrder == 'diffChange';
            existingChildContactInfo.changeDetails = existingContactInfo.requestedOrder == 'diffChange'?existingContactInfo.requestedChangeDescription:'';    
            existingChildContactInfo.bstIntrst = existingContactInfo.childBestInterestReason?existingContactInfo.childBestInterestReason: '';
        }        

        return existingChildContactInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 