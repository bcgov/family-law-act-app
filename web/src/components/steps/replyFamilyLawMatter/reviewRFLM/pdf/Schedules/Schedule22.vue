<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 22 –COMPANION ANIMAL AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b>
                This is Schedule 22 to the Reply to an Application About a Family 
                Law Matter with Counter Application
            </b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    Complete this schedule only if you are making a counter application 
                    to set aside or replace all or part of an existing written
                    agreement about a companion animal.
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">
                <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing written agreement about a companion animal made on"/>
                <underline-form style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" hint="(mmm/dd/yyyy)" :text="exCompInfo.agreementDate"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing agreement</b></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">
                        I am applying for the existing written agreement about a companion animal to be:                   
                    </div>
                    <div style="margin:0 0 2rem 2.25rem;">
                        <check-box  :check="exCompInfo.setAside?'yes':''" text="set aside"/>
                        <check-box  :check="exCompInfo.replace?'yes':''" text="replaced"/>
                        <div>I believe the agreement should be set aside or replaced because:</div>                    
                        <div v-if="exCompInfo.reason" 
                            class="answerbox">{{exCompInfo.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>


            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.15rem">
                        Complete only if you are applying for the court to make an order to replace the existing 
                        written agreement about a companion animal. You may leave this section blank.
                    </i>
                    <div style="margin:1rem 0 0 1rem;">
                        <i> 
                            Note: Under section 97 of the Family Law Act, the court may only make 
                            an order for ownership and possession of a companion animal <b>by one spouse.</b>
                        </i>                        
                    </div>                   
                    
                    <div style="margin:1rem 3rem 2rem 1rem;">                      
                        <div>I am applying for the agreement about a companion animal to be replaced with an order as follows:</div>
                        <div v-if="exCompInfo.replace && exCompInfo.agreementReplacementDetails" 
                            class="answerbox">{{exCompInfo.agreementReplacementDetails}}</div>
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
import { schedule12DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { companionAnimalExistingAgreementDataInfoType } from '@/types/Application/FamilyLawMatter/CompanionAnimal';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule22 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    exCompInfo = {} as schedule12DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.exCompInfo = this.getExCompanionAnimalInfo(); 
    }

    public getExCompanionAnimalInfo(){
       
        let exCompInfo = {} as schedule12DataInfoType;

        exCompInfo = {
            agreementDate: '',
            reason: '',
            replace: false,
            agreementReplacementDetails: '',
            setAside: false
        }

        if (this.result.companionAnimalExistingAgreementSurvey){
            const exCompData: companionAnimalExistingAgreementDataInfoType = this.result.companionAnimalExistingAgreementSurvey;
            
            exCompInfo.agreementDate = Vue.filter('beautify-date')(exCompData.agreementDate);
            exCompInfo.reason = exCompData.setAsideReason;
            exCompInfo.replace = exCompData.existingAgreementDecision == 'Replaced';
            exCompInfo.setAside = exCompData.existingAgreementDecision == 'SetAside';
            if (exCompInfo.replace){
                exCompInfo.agreementReplacementDetails = exCompData.agreementReplacement?exCompData.agreementReplacement:'';
            }
        }

       return exCompInfo;
    } 

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 