<template>
    <div v-if="dataReady">         
<!-- <Page 9> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 8 – REPLY TO AN APPLICATION ABOUT CANCELLING GUARDIANSHIP OF CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 8 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to cancel
                    guardianship of a child or children. The order they applied for about cancelling guardianship can be found in
                    Schedule 8 of their Application About a Family Law Matter.
                </i>
            </div>            
         
<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 3rem 0.35rem;">
                    Do not cancel guardianship of the child(ren) as requested because:
                </div> 
                <i>Select all options that apply and explain why</i>
                <check-box  
                    style="margin-left: 1rem;"
                    :check="guardInfo.ableGuardian?'yes':''" 
                    text="the guardian is able and willing to be a guardian because:"/>
                <div v-if="guardInfo.ableGuardian && guardInfo.ableGuardianDesc" 
                    class="answerbox">{{guardInfo.ableGuardianDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <check-box
                    style="margin-left: 1rem;"  
                    :check="guardInfo.suitableGuardian?'yes':''" 
                    text="the guardian is suitable to be a guardian because:"/>
                <div v-if="guardInfo.suitableGuardian && guardInfo.suitableGuardianDesc" 
                    class="answerbox">{{guardInfo.suitableGuardianDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <check-box  
                    style="margin-left: 1rem;"
                    :check="guardInfo.noConsent?'yes':''" 
                    text="the guardian does not consent to cancellation of their guardianship because:"/>
                <div v-if="guardInfo.noConsent && guardInfo.noConsentDesc" 
                    class="answerbox">{{guardInfo.noConsentDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <check-box  
                    style="margin-left: 1rem;"
                    :check="guardInfo.other?'yes':''" 
                    text="other reason(s) <i>(specify)</i>:"/>
                <div v-if="guardInfo.other && guardInfo.otherDesc" 
                    class="answerbox">{{guardInfo.otherDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
                
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">
                        I believe it is not in the best interests of the child(ren) to cancel guardianship as requested by the other party
                        because:
                    </div>
                    <div v-if="guardInfo.bstIntrst.length > 0" 
                            class="answerbox">{{guardInfo.bstIntrst}}</div>
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
import { schedule8DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeCancellationReasonListInfoType } from '@/types/Application/ReplyFamilyLawMatter/GuardianShip';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule8 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;
    guardInfo = {} as schedule8DataInfoType;
   
    mounted(){
        this.dataReady = false;       
        this.guardInfo = this.getGuardianshipOfChildInfo();       
        this.dataReady = true;      
    } 

    public getGuardianshipOfChildInfo(){
        let guardianshipInfo = {} as schedule8DataInfoType;

        guardianshipInfo = {
            ableGuardian: false,
            ableGuardianDesc: '',
            suitableGuardian: false,
            suitableGuardianDesc: '',
            noConsent: false,
            noConsentDesc: '',
            other: false,
            otherDesc: '',
            bstIntrst: ''
        }
        
        if (this.result.disagreeCancellingGuardianOfChildSurvey?.disagreeReasonList && this.result.disagreeCancellingGuardianOfChildSurvey?.childBestInterestReason){
            const disagreeReasons: disagreeCancellationReasonListInfoType = this.result.disagreeCancellingGuardianOfChildSurvey.disagreeReasonList;           
            guardianshipInfo = {
                ableGuardian: disagreeReasons.checked.includes('able'),
                ableGuardianDesc: (disagreeReasons.checked.includes('able') && disagreeReasons.ableComment)?disagreeReasons.ableComment:'',
                suitableGuardian: disagreeReasons.checked.includes('suitable'),
                suitableGuardianDesc: (disagreeReasons.checked.includes('suitable') && disagreeReasons.suitableComment)?disagreeReasons.suitableComment:'',
                noConsent: disagreeReasons.checked.includes('noConsent'),
                noConsentDesc: (disagreeReasons.checked.includes('noConsent') && disagreeReasons.noConsentComment)?disagreeReasons.noConsentComment:'',
                other: disagreeReasons.checked.includes('other'),
                otherDesc: (disagreeReasons.checked.includes('other') && disagreeReasons.otherComment)?disagreeReasons.otherComment:'',
                bstIntrst: this.result.disagreeCancellingGuardianOfChildSurvey?.childBestInterestReason?this.result.disagreeCancellingGuardianOfChildSurvey.childBestInterestReason:''
            }
        }
        
        return guardianshipInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
