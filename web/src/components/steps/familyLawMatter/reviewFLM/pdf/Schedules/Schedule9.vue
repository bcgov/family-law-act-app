<template>
    <div v-if="dataReady"> 
       
<!-- <Page 10> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 9 – SPOUSAL SUPPORT – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 9 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making a new application about spousal support.</i>
            </div>

            <div style="margin-top:1rem;"><b>Entitlement to spousal support</b></div>
<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 0 0.5rem;">I believe that I am, or the other party is, entitled to spousal support for the following reason(s):</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i style="margin:0 0 0 0rem;" >Select all options that apply</i>
                    <check-box style="" :check="spsSupInfo.current.adv?'yes':''" text="there are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship"/>
                    <check-box style="" :check="spsSupInfo.current.share?'yes':''" text="to share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child"/>
                    <check-box style="" :check="spsSupInfo.current.hardship?'yes':''" text="to relieve economic hardship of the spouses arising from the breakdown of the relationship"/>
                    <check-box style="" :check="spsSupInfo.current.bcmIndpndnt?'yes':''" text="to help each spouse become financially independent within a reasonable period"/>                    
                </div>            
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Current arrangements</b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin:0 0 0rem 0.35rem;">The current support arrangements are as follows:</div>
                    <div v-if="spsSupInfo.current.crntArrngmnt.length > 0" 
                            class="answerbox">{{spsSupInfo.current.crntArrngmnt}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>        
            </div>
        
            <div class="print-block">
                <div style="margin-top:2rem;"><b>Income and earning potential</b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin:0 0 0rem 0.35rem;">My current employment situation, training, health and ability to work are as follows:</div>
                    <div v-if="spsSupInfo.incomeInfo.myIncome.length > 0" 
                            class="answerbox">{{spsSupInfo.incomeInfo.myIncome}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

            <div style="margin-top:1.5rem;"></div>
<!-- <4> -->
            <section>               
                <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                <div style="margin:0 0 0 1.25rem;">
                    <check-box style="" :check="!spsSupInfo.incomeInfo.knowOpIncome?'yes':''" text="I do not know the income of the other party"/>
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="spsSupInfo.incomeInfo.knowOpIncome?'yes':''" text="I believe the other party’s annual income is $"/>
                    <underline-form style="display:inline;margin:0 0 0 0.5rem;" textwidth="8rem" beforetext="" hint="" :text="spsSupInfo.incomeInfo.opIncome"/>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <5> -->
            <section>
                <div style="display:inline; margin:0 0 0 0.5rem;">I know the following facts about the other party’s employment, training, health and ability to work:</div>
                <div style="margin:0 0 0rem 1.5rem;">
                    <i style="margin:0 0 0 0rem;" >If you do not have any information, please leave this section blank</i>
                </div>
                <div v-if="spsSupInfo.incomeInfo.knowFacts" 
                     class="answerbox">{{spsSupInfo.incomeInfo.facts}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div class="print-block">
                <div style="margin-top:1.5rem;"><b>About the order</b></div>
<!-- <6> -->
                <section>
                    <div style="display:inline; margin:0 0 0 0.25rem;"> I am applying for an order for spousal support to be paid by</div>                   
                    <underline-form v-for="payor,inx in spsSupInfo.current.payors" :key="inx" style="text-indent:0px;display:inline; margin:0 0 0 0.5rem;" textwidth="11.5rem" :beforetext="inx>0?', ':''" hint="name of paying party" :text="payor"/>          
                    <div style="display:inline; margin:0 0 0 0.5rem;">as follows:</div>
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
<!-- <7> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 0rem 1.25rem;">
                        <check-box style="" :check="spsSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box style="" :check="!spsSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                    </div>
                    <div v-if="!spsSupInfo.calc.attaching" 
                        class="answerbox">{{spsSupInfo.calc.reason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <8> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box style="" :check="!spsSupInfo.applyForCaseManagement?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box style="" :check="spsSupInfo.applyForCaseManagement?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
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
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Form3 extends Vue {

    @Prop({required:true})
    result!: any;
  
    dataReady = false;
    spsSupInfo = {}

    
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    } 

    public extractInfo(){
        this.spsSupInfo = this.getNewSpousalSupportInfo();
    }

    public getNewSpousalSupportInfo(){
        let newSpousalSupportInfo = {
            current: {
                adv: false,
                share: false,
                hardship: false,
                bcmIndpndnt: false,
                crntArrngmnt: '',
                payors: ''
            },
            incomeInfo: {
                myIncome: '',
                knowOpIncome: false,
                opIncome: '',
                knowFacts: false,
                facts: ''
            },
            payDetails:{
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
            applyForCaseManagement: false
        }

        console.log(this.result)

        if (this.result.spousalSupportSurvey){
            const entitlementReasons = this.result.spousalSupportSurvey.listOfReasons?this.result.spousalSupportSurvey.listOfReasons:[]
            newSpousalSupportInfo.current = {
                adv: entitlementReasons.includes('There are economic advantages or disadvantages to the spouses arising from the relationship or breakdown of the relationship'),
                share: entitlementReasons.includes('To share the financial consequences arising from caring for the children during the relationship, beyond the duty to provide support for the child'),
                hardship: entitlementReasons.includes('To relieve economic hardship of the spouses arising from the breakdown of the relationship'),
                bcmIndpndnt: entitlementReasons.includes('To help each spouse become financially independent within a reasonable period'),
                crntArrngmnt: (this.result.spousalSupportSurvey.currentSupport)? this.result.spousalSupportSurvey.currentSupport:'',
                payors: (this.result.spousalSupportSurvey.listOfSupportPayors 
                        && this.result.spousalSupportSurvey.listOfSupportPayors.length > 0)? this.result.spousalSupportSurvey.listOfSupportPayors:''
            }

        }

        if (this.result.spousalSupportIncomeAndEarningPotentialSurvey){
            const incomeEarning = this.result.spousalSupportIncomeAndEarningPotentialSurvey
            newSpousalSupportInfo.incomeInfo = {
                myIncome: incomeEarning.incomeInfo?incomeEarning.incomeInfo:'',
                knowOpIncome: (incomeEarning.knowIncome
                        && incomeEarning.knowIncome == 'y'),
                opIncome: (incomeEarning.knowIncome
                        && incomeEarning.knowIncome == 'y'
                        && incomeEarning.incomeAmount)?incomeEarning.incomeAmount:'',
                knowFacts: (incomeEarning.knowFacts
                        && incomeEarning.knowFacts == 'y'),
                facts: (incomeEarning.knowFacts
                        && incomeEarning.knowFacts == 'y'
                        && incomeEarning.factsExplanation)?incomeEarning.factsExplanation:''                
            }
        }

        if (this.result.aboutSpousalSupportOrderSurvey.howToPaySpousalSupport){ 
            const aboutSpousalSupport = this.result.aboutSpousalSupportOrderSurvey.howToPaySpousalSupport;           
            newSpousalSupportInfo.payDetails = {
                monthly: aboutSpousalSupport.selected == 'monthly',
                start: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyStartDate)?Vue.filter('beautify-date')(aboutSpousalSupport.monthlyStartDate):'',
                end: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyEndDate)?Vue.filter('beautify-date')(aboutSpousalSupport.monthlyEndDate):'',
                rate: (aboutSpousalSupport.selected == 'monthly'
                        && aboutSpousalSupport.monthlyAmount)?aboutSpousalSupport.monthlyAmount:'',
                lumpSum: aboutSpousalSupport.selected == 'lumpsum',
                lumpSumAmount: (aboutSpousalSupport.selected == 'lumpsum'
                        && aboutSpousalSupport.lumpsumAmount)? aboutSpousalSupport.lumpsumAmount:'',
                other: aboutSpousalSupport.selected == 'other',
                otherComm: (aboutSpousalSupport.selected == 'other' 
                        && aboutSpousalSupport.otherComment)? aboutSpousalSupport.otherComment:''
            }
        }

        if (this.result.calculatingSpousalSupportSurvey){
            newSpousalSupportInfo.calc = {
                attaching: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'y'),
                reason: (this.result.calculatingSpousalSupportSurvey.attachingCalculations 
                        && this.result.calculatingSpousalSupportSurvey.attachingCalculations == 'n'
                        && this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations)?this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations:''
            }
        }

        if(this.result.flmAdditionalDocsSurvey && (this.result.flmAdditionalDocsSurvey.isFillingAdditionalDocs=='n' )){
            newSpousalSupportInfo.applyForCaseManagement = true           
        }

        return newSpousalSupportInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
