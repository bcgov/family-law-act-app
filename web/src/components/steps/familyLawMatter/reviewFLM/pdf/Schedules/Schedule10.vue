<template>
    <div v-if="dataReady"> 
<!-- <Page 11> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 10 – SPOUSAL SUPPORT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 10 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to change or cancel an existing final order about spousal support or to set aside or replace all or part of an existing written agreement about spousal support.</i>
            </div>


            <div style="margin-top:1rem;"></div>
<!-- <1> -->
            <section class="resetquestion">
                <check-box inline="inline" boxMargin="0" shift="5" style="display:inline; margin-left:0.0rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or written agreement about spousal support made"/>
                <underline-form style="margin:0.25rem 1.45rem; text-indent:0px;" textwidth="10rem" beforetext="on" hint="mmm/dd/yyyy" :text="exSpsSupInfo.current.date"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exSpsSupInfo.current.order?'yes':''" text="I am applying for the existing final order about spousal support to be:"/>                    
                    </div>
                    <div style="margin:0 0 0 3.25rem;">
                        <check-box  :check="exSpsSupInfo.orderInfo.change?'yes':''" text="changed"/>
                        <check-box  :check="exSpsSupInfo.orderInfo.cancel?'yes':''" text="cancelled"/>
                        <div>Since the final order about spousal support was made, circumstances have changed as follows:</div>
                        <i class='marginleft-1vue' style="margin-left:0rem;">Select all options that apply and complete the required information</i>
                        <check-box  :check="exSpsSupInfo.orderInfo.changes.myfin?'yes':''" text="my financial situation has changed"/>
                        <check-box  :check="exSpsSupInfo.orderInfo.changes.opfin?'yes':''" text="I believe the other party’s financial situation has changed"/>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exSpsSupInfo.orderInfo.changes.myEmp?'yes':''" text="my employment, training, health and/or ability to work has changed as follows:"/>
                        <div v-if="exSpsSupInfo.orderInfo.changes.myEmp" 
                                class="answerbox">{{exSpsSupInfo.orderInfo.myEmp}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exSpsSupInfo.orderInfo.changes.opEmp?'yes':''" text="I believe the other party’s employment, training, health and/or ability to work has changed as follows:"/>
                        <div v-if="exSpsSupInfo.orderInfo.changes.opEmp" 
                                class="answerbox">{{exSpsSupInfo.orderInfo.opEmp}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exSpsSupInfo.orderInfo.changes.houseHold?'yes':''" text="my household expenses have changed as follows:"/>
                        <div v-if="exSpsSupInfo.orderInfo.changes.houseHold" 
                                class="answerbox">{{exSpsSupInfo.orderInfo.houseHold}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exSpsSupInfo.orderInfo.changes.newInfo?'yes':''" text="information has become available that was not available when the order was made <i>(specify):</i>"/>
                        <div v-if="exSpsSupInfo.orderInfo.changes.newInfo" 
                                class="answerbox">{{exSpsSupInfo.orderInfo.newInfo}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                        
                        <check-box style="margin:0 0 -0.25rem 0;" :check="exSpsSupInfo.orderInfo.changes.other?'yes':''" text="other changes or circumstances <i>(specify)</i>:"/>
                        <div v-if="exSpsSupInfo.orderInfo.changes.other" 
                                class="answerbox">{{exSpsSupInfo.orderInfo.otherChange}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:2rem;"><b>Existing agreement</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="exSpsSupInfo.current.agreement?'yes':''" text="I am applying for the existing written agreement about spousal support to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box  :check="exSpsSupInfo.agreementInfo.setAside?'yes':''" text="set aside"/>
                            <check-box  :check="exSpsSupInfo.agreementInfo.replace?'yes':''" text="replaced"/>
                        </div>
                        <div style="margin:0 0 0 3rem;">I believe the agreement should be set aside or replaced because:</div>
                        <div style="margin:0 0 0 2rem;" v-if="exSpsSupInfo.agreementInfo.reason" 
                                class="answerbox">{{exSpsSupInfo.agreementInfo.reason}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                    </div>                
                </section> 
            </div>       
        
            <div class="print-block">
                <div style="margin-top:2rem;"><b>About the order</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you are applying to change or replace an existing final order or written agreement about spousal support. You may leave this section blank.</i>
                    <div style="margin:0 0 0 0rem; text-indent:0rem;">
                        I am applying for the final order or agreement about spousal support to be changed or replaced as follows:
                    </div>                    
                    <div style="margin:0 0 0 0rem;" v-if="exSpsSupInfo.about.chSinceOrder" 
                        class="answerbox">{{exSpsSupInfo.about.chSinceOrder}}</div>
                    <div v-else style="margin-bottom:2rem;"></div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1.5rem;"><b>Unpaid spousal support</b></div>
<!-- <5> -->
                <section>
                    <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="As of " hint="mmm/dd/yyyy" :text="exSpsSupInfo.payDetails.currentDate"/>
                    <underline-form style="margin-left:0.1rem; text-indent:0px;" textwidth="7rem" beforetext=", the amount of unpaid spousal support (arrears) was $" hint="" :text="exSpsSupInfo.payDetails.unPaidAmount"/>          
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid spousal support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select only one of the options below.</i>
                    <check-box style="margin:0 0 0 0rem;" :check="exSpsSupInfo.payDetails.unpaid && !exSpsSupInfo.payDetails.reduce?'yes':''" text="I am not applying to reduce the amount of unpaid spousal support (arrears)"/>                    
                </div>
                <div style="margin:0 0 0 1.5rem;">    
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0.07rem;" :check="exSpsSupInfo.payDetails.reduce?'yes':''" text="I am applying to reduce the amount of unpaid spousal support (arrears) to"/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="8rem" beforetext=" $" hint="" :text="exSpsSupInfo.payDetails.reduceAmount"/>
                    <div style="margin:0 0 0rem 0;">because:</div>
                    <div style="margin:0 0 0 1rem;" v-if="exSpsSupInfo.payDetails.reduce" 
                        class="answerbox">{{exSpsSupInfo.payDetails.reduceReason}}</div>
                    <div v-else style="margin-bottom:2rem;"></div>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Complete only if there is unpaid spousal support. You may leave this section blank.</i>
                <div style="margin:0 0 0 1.5rem;">I am applying for an order that the remaining unpaid spousal support (arrears) be paid as follows:</div>
                <div style="margin:0 0 0 1.5rem;">
                    <i>Select all options that apply and complete the required information</i>
                </div>
                <div style="margin:0.25rem 0 0 1.5rem;">                        
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline; margin:0 0.25rem 0 0rem;" :check="exSpsSupInfo.payDetails.monthly?'yes':''" text="at a rate of "/>                    
                    <underline-form style="display:inline; text-indent:0px;" textwidth="9rem" beforetext=" $" hint="" :text="exSpsSupInfo.payDetails.rate"/>
                    <div style="display:inline;margin:0 0 0 0.25rem;">per month</div>
                </div>
                <div style="margin:0.25rem 0 0 1.45rem;">
                    <check-box style="margin:0 0.25rem 0 0rem;" :check="exSpsSupInfo.payDetails.lumpSum?'yes':''" text="in a lump sum"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.45rem;">
                    <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exSpsSupInfo.payDetails.other?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="32rem" beforetext="" hint="" :text="exSpsSupInfo.payDetails.otherComm"/>
                 </div>
            </section>

            <div class="print-block">
                <div style="margin-top:2rem;"><b>Calculations</b></div>
<!-- <8> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    <div style="margin:0 0 0 1.25rem;">
                        <check-box style="margin:0 0.25rem 0 0rem;" :check="exSpsSupInfo.calc.attaching?'yes':''" text="I am attaching calculations showing how much spousal support I believe should be paid according to the Spousal Support Advisory Guidelines"/>
                        <check-box style="margin:0 0rem 0rem 0rem;" :check="!exSpsSupInfo.calc.attaching?'yes':''" text="I am not attaching calculations because:"/>
                        <div style="margin:0 0 0 1rem;" v-if="!exSpsSupInfo.calc.attaching" 
                            class="answerbox">{{exSpsSupInfo.calc.reason}}</div>
                        <div v-else style="margin-bottom:2rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1.5rem;"><b>Financial statement</b></div>
<!-- <9> -->
                <section>               
                    <i style="margin:0 0 0 0.5rem;" >Select only one of the options below</i>
                    <div style="margin:0 0 1rem 1.25rem;">
                        <check-box  :check="!exSpsSupInfo.applyForCaseManagement?'yes':''" text="I am filing a Financial Statement in Form 4 with this application"/>
                        <check-box  :check="exSpsSupInfo.applyForCaseManagement?'yes':''" text="I am not able to complete a Financial Statement at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with a completed Financial Statement."/>
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
import moment from 'moment';
import { schedule10DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

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

        let existingSpousalSupportInfo = {} as schedule10DataInfoType

        if (this.result.existingSpousalSupportOrderAgreementSurvey){
            existingSpousalSupportInfo.current = {
                date: '',
                order: this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder',
                agreement: this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingAgreement',
                directors: this.result.existingSpousalSupportOrderAgreementSurvey.filedWithDirector == 'y',
                reviewable: this.result.existingSpousalSupportOrderAgreementSurvey.reviewableTerm == 'y',
                fillForm: this.result.existingSpousalSupportOrderAgreementSurvey.fillOutForm == 'completeNow',
                description: ''
            }

            if (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder'                
                && this.result.existingSpousalSupportFinalOrderSurvey?.orderDate){
                    existingSpousalSupportInfo.current.date = Vue.filter('beautify-date')(this.result.existingSpousalSupportFinalOrderSurvey.orderDate);
            }

            if (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'               
                && this.result.existingSpousalSupportAgreementSurvey?.agreementDate){                    
                    existingSpousalSupportInfo.current.date = Vue.filter('beautify-date')(this.result.existingSpousalSupportAgreementSurvey.agreementDate);
            }

        }

        if ( this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingAgreement' && this.result.existingSpousalSupportAgreementSurvey){
            existingSpousalSupportInfo.agreementInfo = {                
                replace: this.result.existingSpousalSupportAgreementSurvey.agreementDifferenceType == 'replacedAgreement',
                setAside: this.result.existingSpousalSupportAgreementSurvey.agreementDifferenceType == 'setAsideAgreement',
                reason: this.result.existingSpousalSupportAgreementSurvey.changesReasoning
            }
        } else {
            existingSpousalSupportInfo.agreementInfo = {                
                replace: false,
                setAside: false,
                reason: ''
            }
        }

        if (this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingOrder' && this.result.existingSpousalSupportFinalOrderSurvey){
            const changesSinceOrderList = this.result.existingSpousalSupportFinalOrderSurvey.changesSinceOrderList
            const orderChangeList = (changesSinceOrderList?.checked?.length>0)? changesSinceOrderList.checked:[];
            
            existingSpousalSupportInfo.orderInfo = {

                changes: {
                    myfin: orderChangeList.includes('myFinancialChanged'),
                    opfin: orderChangeList.includes('partyFinancialChanged'),
                    myEmp: orderChangeList.includes('myEmploymentChanged'),
                    opEmp: orderChangeList.includes('partyEmploymentChanged'),
                    houseHold: orderChangeList.includes('myHouseholdChanged'),
                    newInfo: orderChangeList.includes('newInformation'),                    
                    other: orderChangeList.includes('other')
                },

                newInfo:     (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('newInformation')         && changesSinceOrderList && changesSinceOrderList.newInformationComment)?         changesSinceOrderList.newInformationComment:'',
                houseHold:   (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('myHouseholdChanged')     && changesSinceOrderList && changesSinceOrderList.myHouseholdChangedComment)?     changesSinceOrderList.myHouseholdChangedComment:'',
                myEmp:       (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('myEmploymentChanged')    && changesSinceOrderList && changesSinceOrderList.myEmploymentChangedComment)?    changesSinceOrderList.myEmploymentChangedComment:'',
                opEmp:       (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('partyEmploymentChanged') && changesSinceOrderList && changesSinceOrderList.partyEmploymentChangedComment)? changesSinceOrderList.partyEmploymentChangedComment:'',
                otherChange: (this.result.existingSpousalSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('other')                  && changesSinceOrderList && changesSinceOrderList.otherComment)?                  changesSinceOrderList.otherComment:'',
                
                change: this.result.existingSpousalSupportFinalOrderSurvey.orderDifferenceType == 'changeOrder',
                cancel: this.result.existingSpousalSupportFinalOrderSurvey.orderDifferenceType != 'changeOrder'             
                
            }
        }

        if (this.result.aboutExistingSpousalSupportOrderSurvey){
            const changeOrReplaceCondition = ((this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingOrder'     && this.result.existingSpousalSupportFinalOrderSurvey?.orderDifferenceType == 'changeOrder') ||
                                              (this.result.existingSpousalSupportOrderAgreementSurvey?.existingType == 'ExistingAgreement' && this.result.existingSpousalSupportAgreementSurvey?.agreementDifferenceType == 'replacedAgreement'));
               
            existingSpousalSupportInfo.about = {
                chSinceOrder: changeOrReplaceCondition? this.result.aboutExistingSpousalSupportOrderSurvey.changesSinceOrder:''
            }
        } else {
            existingSpousalSupportInfo.about = {
                chSinceOrder: ''
            }
        }       

        if (this.result.unpaidSpousalSupportSurvey){  
            
            const paymentSchedule = this.result.unpaidSpousalSupportSurvey.paymentSchedule
            existingSpousalSupportInfo.payDetails = this.result.unpaidSpousalSupportSurvey.unpaid == "y"?
            {
                currentDate: moment().format("MMM DD, yyyy"),
                unpaid:true ,
                unPaidAmount: this.result.unpaidSpousalSupportSurvey.unPaidAmount,
                reduce:       this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? true : false,
                reduceAmount: this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? this.result.unpaidSpousalSupportSurvey.reduceAmount:'',
                reduceReason: this.result.unpaidSpousalSupportSurvey.applyToReduce =="y"? this.result.unpaidSpousalSupportSurvey.whyReduceAmount:'',
                monthly:   paymentSchedule? paymentSchedule.selected == 'monthly':false,                
                rate:      paymentSchedule?.selected == 'monthly'? paymentSchedule.monthlyAmount:'',
                lumpSum:   paymentSchedule? paymentSchedule.selected == 'Lump Sum':false,                
                other:     paymentSchedule? paymentSchedule.selected == 'other':false,
                otherComm: paymentSchedule? paymentSchedule.otherComment: ''
            }:{
                currentDate:moment().format("MMM DD, yyyy"),
                unpaid: false,
                unPaidAmount: '0',
                reduce: false,
                reduceAmount: '',
                reduceReason: '',
                monthly: false,                
                rate: '',
                lumpSum: false,                
                other: false,
                otherComm: ''
            }
        }

        if (this.result.calculatingSpousalSupportSurvey){
            existingSpousalSupportInfo.calc = {
                attaching: this.result.calculatingSpousalSupportSurvey?.attachingCalculations == 'y',
                reason: ( this.result.calculatingSpousalSupportSurvey?.attachingCalculations == 'n'
                        && this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingSpousalSupportSurvey.whyNotAttachingCalculations:''
            }
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
            existingSpousalSupportInfo.applyForCaseManagement = true           
        }       

        return existingSpousalSupportInfo;
    }   
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 