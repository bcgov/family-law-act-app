<template>
    <div v-if="dataReady"> 
<!-- <Page 11> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 10 – REPLY TO AN APPLICATION ABOUT SPOUSAL SUPPORT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 10 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to change or
                    cancel an existing final order about spousal support, or to set aside or replace all or part of an existing written
                    agreement about spousal support. The order they applied for about spousal support can be found in Schedule 10
                    of their Application About a Family Law Matter.
                </i>
            </div>


            <div style="margin-top:1rem;"></div>
<!-- <1> -->
            <section class="resetquestion">
                <i style="display:inline; margin-left:0.35rem">
                    Select only one of the options below
                </i>
               
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box 
                        style="margin:0 0.25rem 0 0rem;" 
                        :check="exSpsSupInfo.disagreeDetails.circumstancesChanged?'yes':''" 
                        text="I agree that circumstances have changed since the final order about spousal support was made"/>
                    <check-box 
                        style="margin:0 0.25rem 0 0rem;" 
                        :check="!exSpsSupInfo.disagreeDetails.circumstancesChanged?'yes':''" 
                        text="There has been no change in circumstances since the final order about spousal support was made"/>
                    <check-box 
                        style="margin:0 0.25rem 0 0rem;" 
                        :check="exSpsSupInfo.disagreeDetails.correctCircumstances?'yes':''" 
                        text="I agree the circumstances were as described by the other party when the written agreement about spousal support was made"/>
                    <check-box 
                        style="margin:0 0.25rem 0 0rem;" 
                        :check="!exSpsSupInfo.disagreeDetails.correctCircumstances?'yes':''" 
                        text="I do not believe the circumstances as described by the other party existed when the written agreement about spousal support was made"/>        
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1.5rem;"><b>Unpaid spousal support</b></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">
                        Select only one of the options below
                    </i>
                    
                    <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                        <check-box 
                            style="margin:0 0.25rem 0 0rem;" 
                            :check="exSpsSupInfo.disagreeDetails.agreeUnpaidAmount?'yes':''" 
                            text="I agree that the amount of unpaid spousal support (arrears) in the application is correct"/>
                        <check-box 
                            class="marginleft" 
                            checkbox="" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            :check="!exSpsSupInfo.disagreeDetails.agreeUnpaidAmount?'yes':''" 
                            text="The amount of unpaid spousal support (arrears) in the application is not correct. As of "/>
                        <underline-form 
                            style="margin-left:0.5rem; text-indent:0px;" 
                            textwidth="9rem" 
                            beforetext="" 
                            hint="mmm/dd/yyyy" 
                            :text="exSpsSupInfo.disagreeDetails.dateCalculatedUnpaid"/>
                        <underline-form 
                            style="margin-left:0.1rem; text-indent:0px;" 
                            textwidth="7rem" 
                            beforetext=", the amount of unpaid spousal support (arrears) was $" 
                            hint="" 
                            :text="exSpsSupInfo.disagreeDetails.unpaidAmount"/>          
                    </div>
                </section>
            </div>           

            <div class="print-block">
                <div style="margin-top:2rem;"><b>About the order</b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin:0; text-indent:0rem;">
                        I do not agree with the requested order about the existing final order or written agreement 
                        about spousal support because:
                    </div>                    
                    <div style="margin:0 0 0 0rem;" v-if="exSpsSupInfo.about.disagreeReason" 
                        class="answerbox">{{exSpsSupInfo.about.disagreeReason}}</div>
                    <div v-else style="margin-bottom:2rem;"></div>
                </section>
            </div> 

            <div class="print-block">               
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.25rem;">
                        <check-box 
                            style="margin:0 0.25rem 0 0rem;" 
                            :check="exSpsSupInfo.about.continueOrder?'yes':''" 
                            text="I am applying for the existing final order or written agreement about spousal support to continue to be in place"/>
                        <check-box 
                            style="margin:0 0rem 0rem 0rem;" 
                            :check="!exSpsSupInfo.about.continueOrder?'yes':''" 
                            text="I am applying to change or replace the existing final order or written agreement about spousal support as follows:"/>
                        <div style="margin:0 0 0 1rem;" v-if="!exSpsSupInfo.about.continueOrder && exSpsSupInfo.about.changeReason" 
                            class="answerbox">{{exSpsSupInfo.about.changeReason}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                    </div>
                </section>
            </div>          

            <div class="print-block">
                <div style="margin-top:2rem;"><b>Calculations</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.25rem;">
                        <check-box 
                            style="margin:0 0.25rem 0 0rem;" 
                            :check="exSpsSupInfo.calc.attaching?'yes':''" 
                            text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box 
                            style="margin:0 0rem 0rem 0rem;" 
                            :check="!exSpsSupInfo.calc.attaching?'yes':''" 
                            text="I am not attaching calculations because:"/>
                        <div style="margin:0 0 0 1rem;" v-if="!exSpsSupInfo.calc.attaching && exSpsSupInfo.calc.reason" 
                            class="answerbox">{{exSpsSupInfo.calc.reason}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1.5rem;"><b>Financial statement</b></div>
<!-- <6> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box 
                            :check="!exSpsSupInfo.filingForm4?'yes':''" 
                            text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box 
                            :check="exSpsSupInfo.filingForm4?'yes':''" 
                            text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                    <b>
                        This family law case includes an application to change or replace a final order or written agreement about
                        spousal support. You must provide updated financial information with your reply to the application by
                        completing and filing a Financial Statement in Form 4.
                    </b>
                </div>
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
import moment from 'moment';
import { schedule10DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule10 extends Vue {

    @Prop({required:true})
    result!: any; 
  
    dataReady = false;    
    exSpsSupInfo = {} as schedule10DataInfoType;
   
    mounted(){
        this.dataReady = false;       
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){        
        this.exSpsSupInfo = this.getExistingSpousalSupportInfo();
    }

    public getExistingSpousalSupportInfo(){        

        let existingSpousalSupportInfo = {} as schedule10DataInfoType; 

        existingSpousalSupportInfo = {
            disagreeDetails: {
                circumstancesChanged: false,
                correctCircumstances: false, 
                agreeUnpaidAmount: false,
                dateCalculatedUnpaid: moment().format("MMM DD, yyyy"),
                unpaidAmount: '' 
            },
            about: {
                disagreeReason: '',
                continueOrder: false,
                changeReason: ''
            },   
            calc: {
                attaching: false,
                reason: ''
            },   
            filingForm4: false 

        }    

        return existingSpousalSupportInfo;
    }   
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 