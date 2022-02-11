<template>
    <div v-if="dataReady"> 
       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 9 – REPLY TO AN APPLICATION ABOUT SPOUSAL SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 9 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with a new application by the other party about
                    spousal support. The order they applied for about spousal support can be found in Schedule 9 of their Application
                    About a Family Law Matter.
                </i>
            </div>
           
<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 0 0.5rem;">
                    <i style="margin:0 0 0 0rem;" >Select only one of the options below</i>
                </div>
                <div style="margin:0 0 0 1.5rem;">                    
                    <check-box 
                        :check="spsSupInfo.spouse?'yes':''" 
                        text="I am (or was) the other party’s spouse"/>
                    <check-box 
                        :check="!spsSupInfo.spouse?'yes':''" 
                        text="I have never been the other party’s spouse"/>                    
                </div>            
            </section> 

            <div style="margin-top:1.5rem;"></div>
<!-- <2> -->
            <section> 
                <div style="display:inline; margin:0 0 0 0.25rem;">I do not agree with the order about spousal support requested by the other party because:</div>              
                <div>
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                </div>
                <div style="margin:0 0 0 1.25rem;">
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.entitled?'yes':''" 
                        text="I do not believe the other party is entitled to spousal support<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.entitled && spsSupInfo.disagreeDetails.entitledDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.entitledDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box :check="!spsSupInfo.disagreeDetails.correctIncomeClaim?'yes':''" text="my income is not what the other party claims it is"/>
                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.correctEmploymentClaim?'yes':''" 
                        text="my employment, training, health and ability to work is not what the other party claims it is<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.correctEmploymentClaim && spsSupInfo.disagreeDetails.correctEmploymentClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.correctEmploymentClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.correctOpFinancialClaim?'yes':''" 
                        text="the other party’s financial situation is not what they claim it is<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.correctOpFinancialClaim && spsSupInfo.disagreeDetails.correctOpFinancialClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.correctOpFinancialClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.correctOpEmploymentClaim?'yes':''" 
                        text="I believe the other party’s employment, training, health and ability to work is not what the other party claims it is<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.correctOpEmploymentClaim && spsSupInfo.disagreeDetails.correctOpEmploymentClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.correctOpEmploymentClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="!spsSupInfo.disagreeDetails.correctOpExpenseClaim?'yes':''" 
                        text="the other party’s expenses are not what they claim them to be<br><i>Explain below</i>"/>
                    <div v-if="!spsSupInfo.disagreeDetails.correctOpExpenseClaim && spsSupInfo.disagreeDetails.correctOpExpenseClaimDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.correctOpExpenseClaimDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                    <check-box 
                        class="marginleft" 
                        checkbox="" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        :check="spsSupInfo.disagreeDetails.other?'yes':''" 
                        text="other reason <i>(specify)</i>"/>
                    <div v-if="spsSupInfo.disagreeDetails.other && spsSupInfo.disagreeDetails.otherDesc" 
                        class="answerbox">{{spsSupInfo.disagreeDetails.otherDesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>

                </div>
            </section>           

            <div class="print-block">                
<!-- <3> -->
                <section>
                    <div style="display:inline; margin:0 0 0 0.25rem;"> The order for spousal support that I believe should be made is as follows:</div>                   
                    <div>
                        <i style="margin:0 0 0 1.5rem;" >Select all options that apply and complete the required information</i>
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.monthly?'yes':''" text="in the amount of "/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="5rem" beforetext="$" hint="" :text="spsSupInfo.payDetails.rate"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="per month to commence on" hint="mmm/dd/yyyy" :text="spsSupInfo.payDetails.start"/>            
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="until" hint="mmm/dd/yyyy" :text="spsSupInfo.payDetails.end"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.lumpSum?'yes':''" text="in a lump sum of"/>
                        <underline-form style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="8rem" beforetext="$" hint="" :text="spsSupInfo.payDetails.lumpSumAmount"/>            
                    </div>
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0rem 1.5rem;">
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.payDetails.other?'yes':''" text="other <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="32.35rem" beforetext="" hint="" :text="spsSupInfo.payDetails.otherComm"/>            
                    
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <4> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 0rem 1.25rem;">
                        <check-box  :check="spsSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box  :check="!spsSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="!spsSupInfo.calc.attaching" 
                        class="answerbox">{{spsSupInfo.calc.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <5> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box  :check="!spsSupInfo.filingForm4?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box  :check="spsSupInfo.filingForm4?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>This family law case includes an application about spousal support. You must provide your financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>
                    </ul>
                </div>
            </div>
        </div> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule9DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule9 extends Vue {

    @Prop({required:true})
    result!: any;
  
    dataReady = false;
    spsSupInfo = {} as schedule9DataInfoType;    
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    } 

    public extractInfo(){
        this.spsSupInfo = this.getNewSpousalSupportInfo();
    }

    public getNewSpousalSupportInfo(){

        let newSpousalSupportInfo = {} as schedule9DataInfoType;

        newSpousalSupportInfo = {

            spouse: false,
            disagreeDetails: {
                entitled: false,
                entitledDesc: '',
                correctIncomeClaim: false,
                correctEmploymentClaim: false,
                correctEmploymentClaimDesc: '',
                correctOpFinancialClaim: false,
                correctOpFinancialClaimDesc: '',
                correctOpEmploymentClaim: false,
                correctOpEmploymentClaimDesc: '',
                correctOpExpenseClaim: false,
                correctOpExpenseClaimDesc: '',
                other: false,
                otherDesc: ''
            },  
            payDetails: {
                monthly: false,
                start: '',
                end: '',
                rate: '',
                lumpSum: false,
                lumpSumAmount: '',
                other: false,
                otherComm: ''
            },
            calc: {
                attaching: false,
                reason: ''  
            },           
            filingForm4: false,

        }        

        return newSpousalSupportInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
