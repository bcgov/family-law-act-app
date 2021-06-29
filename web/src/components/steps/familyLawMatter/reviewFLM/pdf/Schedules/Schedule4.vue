<template>
    <div v-if="dataReady">

<!-- <Page 5> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 4 – CHILD SUPPORT ORDER OR WRITTEN AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 4 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel all or part of an existing final order about child support, or to set aside or replace all or part of an existing agreement about child support, for the child or children identified in section 11 of this application.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">The existing final order or agreement requires me to:</div>
                
                <div style="margin-left:1rem;">
                    <i>Select only one of the options below</i>
                    <check-box style="" :check="exChSupInfo.abtEx.payor?'yes':''" text="make payments for support of a child or children"/>
                    <check-box style="width:120%;" :check="exChSupInfo.abtEx.payee?'yes':''" text="receive payments for support of a child or children"/>
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChSupInfo.abtEx.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="exChSupInfo.abtEx.otherComm"/>            
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about child support made on"/>
                <underline-form style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" hint="mmm/dd/yyyy" :text="exChSupInfo.abtEx.orderDate"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtEx.exstngOrdr?'yes':''" text="I am applying for the existing final order about child support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="exChSupInfo.abtEx.changeOrdr?'yes':''" text="changed"/>
                        <check-box style="" :check="exChSupInfo.abtEx.cancelOrdr?'yes':''" text="cancelled"/>
                        <div>Since the final order about child support was made, circumstances have changed as follows:</div>
                        <i class="marginleft-1vue">Select all options that apply and complete the required information</i>
                        <check-box style="" :check="exChSupInfo.abtEx.changes.myfin?'yes':''" text="my financial situation has changed"/>
                        <check-box style="" :check="exChSupInfo.abtEx.changes.opfin?'yes':''" text="I believe the other party’s financial situation has changed"/>
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exChSupInfo.abtEx.changes.spcl?'yes':''" text="the special and extraordinary expenses for the child(ren) have changed as follows:"/>
                        <div v-if="exChSupInfo.abtEx.changes.spcl" 
                             class="answerbox">{{exChSupInfo.abtEx.expChangeInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>

                        <check-box style="margin:0 0 -0.25rem 0;" :check="exChSupInfo.abtEx.changes.lvng?'yes':''" text="the child(ren)’s living arrangement(s) have changed as follows:"/>
                        <div v-if="exChSupInfo.abtEx.changes.lvng"                            
                             class="answerbox">{{exChSupInfo.abtEx.lvngChangeInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>

                        <check-box style="margin:0 0 -0.25rem 0;" :check="exChSupInfo.abtEx.changes.newInfo?'yes':''" text="information has become available that was not available when the order was made (specify):"/>
                        <div v-if="exChSupInfo.abtEx.changes.newInfo"                            
                             class="answerbox">{{exChSupInfo.abtEx.newInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exChSupInfo.abtEx.changes.other?'yes':''" text="other changes or circumstances (specify):"/>
                        <div v-if="exChSupInfo.abtEx.changes.other" 
                             class="answerbox">{{exChSupInfo.abtEx.otherInfo}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.abtEx.exstngAgrmnt?'yes':''" text="I am applying for the existing agreement about child support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box style="" :check="exChSupInfo.abtEx.setAsideAgrmnt?'yes':''" text="set aside"/>
                        <check-box style="" :check="exChSupInfo.abtEx.replaceAgrmnt?'yes':''" text="replaced"/>
                        <div style="margin:0 0 -0.25rem 0;">I believe the agreement should be set aside or replaced because:</div>                    
                        <div v-if="exChSupInfo.abtEx.exstngAgrmnt" 
                            class="answerbox">{{exChSupInfo.abtEx.changesSinceAgrmnt}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you are applying to change or replace an existing final order or agreement about child support. You may leave this section blank.</i>
                    
                    <div style="margin:0 0 0 1rem;">
                        <div style="margin:0 0 -.25rem 0;">I am applying for the final order or agreement about child support to be changed or replaced as follows:</div>                    
                        <div v-if="exChSupInfo.abtOrg.newOrderDesc" 
                            class="answerbox">{{exChSupInfo.abtOrg.newOrderDesc}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Unpaid child support</b></div>
<!-- <6> -->
                <section>
                    <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="As of " hint="mmm/dd/yyyy" :text="exChSupInfo.unpdChSup.crntDate"/>
                    <underline-form style="margin-left:0.1rem; text-indent:0px;" textwidth="8rem" beforetext=", the amount of unpaid child support (arrears) was $" hint="" :text="exChSupInfo.unpdChSup.amnt"/>          
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid child support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select only one of the options below.</i>
                    <check-box style="margin:0 0 0 0rem;" :check="(exChSupInfo.unpdChSup.amnt != 0 && !exChSupInfo.unpdChSup.reduce)?'yes':''" text="I am not applying to reduce the amount of unpaid child support (arrears)"/>                    
                </div>
                <div style="margin:0 0 0 1.5rem;">    
                    <check-box  inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0.05rem;" :check="exChSupInfo.unpdChSup.reduce?'yes':''" text="I am applying to reduce the amount of unpaid child support (arrears) to"/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" :text="exChSupInfo.unpdChSup.reduceAmount"/>
                    <div style="margin:0 0 -0.25rem 0;">because:</div>
                    <div v-if="exChSupInfo.unpdChSup.reduce" 
                            class="answerbox">{{exChSupInfo.unpdChSup.whyReduceAmount}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </div>
                
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid child support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">I am applying for an order that the remaining unpaid child support (arrears) be paid as follows:</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select all options that apply and complete the required information</i>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">                        
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0rem;" :check="exChSupInfo.unpdChSup.paySchd =='monthly'?'yes':''" text="at a rate of "/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" :text="exChSupInfo.unpdChSup.monthlyAmount"/>
                </div>
                <div style="margin:0 0 0 1.5rem;">
                    <check-box style="margin:0 0.25rem 0 0rem;" :check="exChSupInfo.unpdChSup.paySchd =='Lump Sum'?'yes':''" text="in a lump sum"/>
                    <check-box  class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChSupInfo.unpdChSup.paySchd =='other'?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="32rem" beforetext="" hint="" :text="exChSupInfo.unpdChSup.otherComm"/>
                 </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <9> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0.25rem 0 0rem;" :check="exChSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much child support I believe should be paid according to the child support guidelines"/>
                        <check-box style="margin:0 0rem -0.25rem 0rem;" :check="!exChSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                        <div v-if="!exChSupInfo.calc.attaching" 
                            class="answerbox">{{exChSupInfo.calc.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">    
                <div style="margin-top:1rem;"><b>Start of payment(s)</b></div>
<!-- <10> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Child support payments may start or end on a past (retroactive), present or future date or event, such as the date of separation, the date this application is made or the start date of a new job</i>
                    <div style="margin:0 0 3rem 1.1rem;">
                        <underline-form style="display:inline; text-indent:0px;" textwidth="18.5rem" beforetext="The order about child support should start on" hint="mmm/dd/yyyy" :text="exChSupInfo.abtOrg.startDate | beautify-date-blank"/>
                        <div style="display:inline; margin:0 0 0 0.5rem;">because:</div>
                        <div v-if="exChSupInfo.abtOrg.startReason" 
                            class="answerbox">{{exChSupInfo.abtOrg.startReason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Financial statement</b></div>
<!-- <11> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.finStmnt.required?'yes':''" text="I am filing a Financial Statement in Form 4 with this application because the following applies to my situation:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <i>Select all options that apply</i>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.payor?'yes':''" text="I am the payor"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.split?'yes':''" text="there is split or shared parenting time"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.over19?'yes':''" text="there is a child 19 years old or over for whom support is being applied for"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.partyParentOfOther?'yes':''" text="a party has been acting as a parent to a child of the other party"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.payorEarnsHigh?'yes':''" text="the paying parent earns more than $150,000 per year"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.specialClaim?'yes':''" text="there is an application for special or extraordinary expenses for a child"/>
                        <check-box style="" :check="exChSupInfo.finStmnt.required && exChSupInfo.abtOrg.situation.undueHardship?'yes':''" text="I am claiming undue hardship"/>
                    </div>
                    <div style="margin:0.5rem 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="!exChSupInfo.applyForCaseManagement && exChSupInfo.abtOrg.situation.none?'yes':''" text="I am not required to file a Financial Statement at this time as none of these situations apply to me"/> 
                        <check-box style="margin:0 0 0 0rem;" :check="exChSupInfo.applyForCaseManagement?'yes':''" text="I am required to file a Financial Statement but I am not able to complete it at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>                   
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE TO THE PARTIES:</b></div>
                <div style="margin-top:0rem; font-size:9.7pt; text-align:justify;"><b>If this family law case includes an application to change or replace an order or agreement for child support, you must provide financial information with your application or reply to this application by completing and filing a Financial Statement in Form 4.</b></div>
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

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';
import { schedule4DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule4 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;   
    exChSupInfo = {} as schedule4DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){         
        this.exChSupInfo = this.getExistingChildSupportInfo();
    }

    public getExistingChildSupportInfo(){
        let existingChildSupportInfo = {} as schedule4DataInfoType;

        if (this.result.aboutExistingChildSupportSurvey && this.result.childSupportOrderAgreementSurvey){
            const orderChangeList = (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked.length>0)? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked:[];
            const existingType = this.result.childSupportOrderAgreementSurvey.existingType;  
            let date = '';
            if (existingType == 'ExistingOrder'){
                date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate);
            } else if (existingType == 'ExistingAgreement'){
                date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.agreementDate);
            }
            existingChildSupportInfo.abtEx = {                
                payor: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payor'),
                payee: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payee'),
                other: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other'),
                otherComm: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other' && this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment)? this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment:'',
                orderDate: date,
                exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
                fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
                cancelOrdr:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
                changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
                changeList: orderChangeList,
                changes:{
                    myfin: orderChangeList.includes('myFinancialChanged'),
                    opfin: orderChangeList.includes('partyFinancialChanged'),
                    spcl: orderChangeList.includes('expensesChanged'),
                    lvng: orderChangeList.includes('arrangementsChanged'),
                    newInfo: orderChangeList.includes('newInformation'),
                    other: orderChangeList.includes('other')
                },
                newInfo:       (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList?.includes('newInformation')      && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.newInformationComment)?      this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.newInformationComment:'',
                expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList?.includes('expensesChanged')     && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.expensesChangedComment)?     this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.expensesChangedComment:'',
                lvngChangeInfo:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList?.includes('arrangementsChanged') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.arrangementsChangedComment)? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.arrangementsChangedComment:'',
                otherInfo:     (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList?.includes('other')               && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList?.otherComment)?               this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.otherComment:'',
                exstngAgrmnt:       (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
                setAsideAgrmnt:     (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
                replaceAgrmnt:      (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
                changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement)? this.result.aboutExistingChildSupportSurvey.changesSinceAgreement : ''
            }
        }

        if (this.result.aboutChildSupportChangesSurvey){
            const aboutChildSupportChanges = this.result.aboutChildSupportChangesSurvey;
            const changeCondition =  (existingChildSupportInfo?.abtEx?.['replaceAgrmnt'] || existingChildSupportInfo?.abtEx?.['changeOrdr'])
            const orgSituationList = (changeCondition && aboutChildSupportChanges.listOfSituations)? aboutChildSupportChanges.listOfSituations:[]
            existingChildSupportInfo.abtOrg = {                
                newOrderDesc: changeCondition ?  aboutChildSupportChanges.orderDescription:'',
                startDate:   (changeCondition && aboutChildSupportChanges.orderStartingDate)? (aboutChildSupportChanges.orderStartingDate.selected == 'startingDate'?aboutChildSupportChanges.orderStartingDate.startingDate:aboutChildSupportChanges.orderStartingDate.otherComment):'',
                startReason: (changeCondition && aboutChildSupportChanges.orderStartDateReason)? aboutChildSupportChanges.orderStartDateReason:'',
                situationList: orgSituationList,                    
                situation: {
                    payor: orgSituationList.includes('I am required to pay child support'),
                    split: orgSituationList.includes('There is `split` or `shared` parenting time'),
                    over19: orgSituationList.includes('There is a child 19 years or older for who support is for'),
                    partyParentOfOther: orgSituationList.includes('A party has been acting as a parent to a child of the other party, for example a step-parent'),
                    payorEarnsHigh: orgSituationList.includes('The paying parent earns more than $150,000 per year'),
                    specialClaim: orgSituationList.includes('There is a claim for `special and extraordinary expenses` for a child'),
                    undueHardship: orgSituationList.includes('I am claiming `undue hardship`'),
                    none: orgSituationList.includes('None of the above apply to my situation')
                }
            }
        }

        if (this.result.unpaidChildSupportSurvey){
            const unpaidChildSupport = this.result.unpaidChildSupportSurvey;
            existingChildSupportInfo.unpdChSup = unpaidChildSupport.unpaid == 'y'?
            {
                crntDate: moment().format("MMM DD, yyyy"),   
                unpaid:           unpaidChildSupport.unpaid == 'y',
                reduce:          (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y'),
                reduceAmount:    (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y')? unpaidChildSupport.reduceAmount : '',
                whyReduceAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y')? unpaidChildSupport.whyReduceAmount : '',
                paySchd:         (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule)?      unpaidChildSupport.paymentSchedule.selected : '',
                monthlyAmount:   (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule?.selected == 'monthly')? unpaidChildSupport.paymentSchedule.monthlyAmount : '',
                amnt:            (unpaidChildSupport.unpaid == 'y')?  unpaidChildSupport.unPaidAmount : 0, 
                otherComm:       (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule?.selected == 'other')? unpaidChildSupport.paymentSchedule.otherComment : ''       
            }:{
                crntDate: moment().format("MMM DD, yyyy"),   
                unpaid: false,
                reduce: false,
                reduceAmount: '',
                whyReduceAmount: '',
                paySchd: '',
                monthlyAmount: '',
                amnt: 0, 
                otherComm:''  
            }
        }

        if (this.result.calculatingChildSupportSurvey){
            existingChildSupportInfo.calc = {   
                attaching: this.result.calculatingChildSupportSurvey.attachingCalculations == 'y',
                reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
            }
        }

        existingChildSupportInfo.finStmnt = {
            required: (existingChildSupportInfo.abtOrg?.situation?.payor ||
                       existingChildSupportInfo.abtOrg?.situation?.over19 ||
                       existingChildSupportInfo.abtOrg?.situation?.split  ||
                       existingChildSupportInfo.abtOrg?.situation?.partyParentOfOther  ||
                       existingChildSupportInfo.abtOrg?.situation?.payorEarnsHigh ||
                       existingChildSupportInfo.abtOrg?.situation?.specialClaim ||
                       existingChildSupportInfo.abtOrg?.situation?.undueHardship )
        }

        let form4unable = false;

        if(this.result.flmAdditionalDocumentsSurvey?.unableFileForms){
            for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
                if(form.includes("Financial Statement Form 4")){
                    form4unable = true;
                }
            }   
        }

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && form4unable){
            existingChildSupportInfo.applyForCaseManagement = true
            existingChildSupportInfo.finStmnt = {
                required: false
            }
        }

        return existingChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>