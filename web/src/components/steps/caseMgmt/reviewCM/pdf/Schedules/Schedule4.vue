<template>
    <div v-if="dataReady">

<!-- <Page 5> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 4 – ACCESS TO INFORMATION SECTION 242</b></div>
            <div style="text-align:center;"><b>This is Schedule 4 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.15rem">
                    The details of the order I am applying for are as follows:
                </div>
                    
                <div style="text-indent:0; margin-left:0rem">
                    <i>
                        Tell the court the specifics of the order you are applying for                        
                    </i>
                </div>
                
                <div v-if="false" 
                class="answerbox"></div>
                <div v-else style="margin-bottom:3rem;"></div> 
                            
            </section>

<!-- <2> -->
            <section> 
                <div style="display:inline; margin-left:0.15rem">
                    The facts on which this application is based are as follows:
                </div>
                    
                <div style="text-indent:0; margin-left:0rem">
                    <i>
                        Provide the facts you want the court to consider
                    </i>
                </div>
                
                <div v-if="false" 
                class="answerbox"></div>
                <div v-else style="margin-bottom:3rem;"></div> 
                            
            </section>
      
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
        // // console.log(this.result)

        // if (this.result.aboutExistingChildSupportSurvey && this.result.childSupportOrderAgreementSurvey){
        //     const orderChangeList = (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked.length>0)? this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.checked:[];
        //     const existingType = this.result.childSupportOrderAgreementSurvey.existingType;  
        //     let date = '';
        //     if (existingType == 'ExistingOrder'){
        //         date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.orderDate);
        //     } else if (existingType == 'ExistingAgreement'){
        //         date = Vue.filter('beautify-date')(this.result.aboutExistingChildSupportSurvey.agreementDate);
        //     }
        //     existingChildSupportInfo.abtEx = {                
        //         payor: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payor'),
        //         payee: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'payee'),
        //         other: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other'),
        //         otherComm: (this.result.childSupportOrderAgreementSurvey.existingResponsibilityType == 'other' && this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment)? this.result.childSupportOrderAgreementSurvey.existingResponsibilityTypeComment:'',
        //         orderDate: date,
        //         exstngOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder'),
        //         fldDrctr: (this.result.childSupportOrderAgreementSurvey.filedWithDirector == 'y'),
        //         cancelOrdr:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'cancelOrder'),
        //         changeOrdr: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' && this.result.aboutExistingChildSupportSurvey.orderDifferenceType == 'changeOrder'),
        //         changeList: orderChangeList,
        //         changes:{
        //             myfin: orderChangeList.includes('myFinancialChanged'),
        //             opfin: orderChangeList.includes('partyFinancialChanged'),
        //             spcl: orderChangeList.includes('expensesChanged'),
        //             lvng: orderChangeList.includes('arrangementsChanged'),
        //             newInfo: orderChangeList.includes('newInformation'),
        //             other: orderChangeList.includes('other')
        //         },
        //         newInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&        orderChangeList.includes('newInformation')     && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.newInformationComment)?      this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.newInformationComment:'',
        //         expChangeInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('expensesChanged')    && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.expensesChangedComment)?     this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.expensesChangedComment:'',
        //         lvngChangeInfo:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&  orderChangeList.includes('arrangementsChanged') && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.arrangementsChangedComment)?this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.arrangementsChangedComment:'',
        //         otherInfo: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingOrder' &&      orderChangeList.includes('other')              && this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.otherComment)?               this.result.aboutExistingChildSupportSurvey.changesSinceOrderList.otherComment:'',
        //         exstngAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement'),
        //         setAsideAgrmnt:(this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'setAsideAgreement'),
        //         replaceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.agreementDifferenceType == 'replacedAgreement'),
        //         changesSinceAgrmnt: (this.result.childSupportOrderAgreementSurvey.existingType == 'ExistingAgreement' && this.result.aboutExistingChildSupportSurvey.changesSinceAgreement)?this.result.aboutExistingChildSupportSurvey.changesSinceAgreement:''
        //     }
        // }

        // if (this.result.aboutChildSupportChangesSurvey){
        //     const aboutChildSupportChanges = this.result.aboutChildSupportChangesSurvey;
        //     const changeCondition =   existingChildSupportInfo.abtEx && (existingChildSupportInfo.abtEx['replaceAgrmnt'] || existingChildSupportInfo.abtEx['changeOrdr'])
        //     const orgSituationList = (changeCondition && aboutChildSupportChanges.listOfSituations)?aboutChildSupportChanges.listOfSituations:[]
        //     existingChildSupportInfo.abtOrg = {                
        //         newOrderDesc: changeCondition? aboutChildSupportChanges.orderDescription:'',
        //         startDate:   (changeCondition && aboutChildSupportChanges.orderStartingDate)?(aboutChildSupportChanges.orderStartingDate.selected == 'startingDate'?aboutChildSupportChanges.orderStartingDate.startingDate:aboutChildSupportChanges.orderStartingDate.otherComment):'',
        //         startReason: (changeCondition && aboutChildSupportChanges.orderStartDateReason)?aboutChildSupportChanges.orderStartDateReason:'',
        //         situationList: orgSituationList,                    
        //         situation: {
        //             payor: orgSituationList.includes('I am required to pay child support'),
        //             split: orgSituationList.includes('There is `split` or `shared` parenting time'),
        //             over19: orgSituationList.includes('There is a child 19 years or older for who support is for'),
        //             partyParentOfOther: orgSituationList.includes('A party has been acting as a parent to a child of the other party, for example a step-parent'),
        //             payorEarnsHigh: orgSituationList.includes('The paying parent earns more than $150,000 per year'),
        //             specialClaim: orgSituationList.includes('There is a claim for `special and extraordinary expenses` for a child'),
        //             undueHardship: orgSituationList.includes('I am claiming `undue hardship`'),
        //             none: orgSituationList.includes('None of the above apply to my situation')
        //         }
        //     }
        // }

        // if (this.result.unpaidChildSupportSurvey){
        //     const unpaidChildSupport = this.result.unpaidChildSupportSurvey;
        //     existingChildSupportInfo.unpdChSup = unpaidChildSupport.unpaid == 'y'?
        //     {
        //         crntDate: moment().format("MMM DD, yyyy"),   
        //         unpaid: unpaidChildSupport.unpaid == 'y',
        //         reduce: unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y',
        //         reduceAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y')?unpaidChildSupport.reduceAmount:'',
        //         whyReduceAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.applyToReduce == 'y')?unpaidChildSupport.whyReduceAmount:'',
        //         paySchd: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule)?unpaidChildSupport.paymentSchedule.selected:'',
        //         monthlyAmount: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule && unpaidChildSupport.paymentSchedule.selected == 'monthly')? unpaidChildSupport.paymentSchedule.monthlyAmount:'',
        //         amnt: (unpaidChildSupport.unpaid == 'y')?unpaidChildSupport.unPaidAmount:0, 
        //         otherComm: (unpaidChildSupport.unpaid == 'y' && unpaidChildSupport.paymentSchedule) && (unpaidChildSupport.paymentSchedule.selected == 'other')? unpaidChildSupport.paymentSchedule.otherComment:''       
        //     }:{
        //         crntDate: moment().format("MMM DD, yyyy"),   
        //         unpaid: false,
        //         reduce: false,
        //         reduceAmount: '',
        //         whyReduceAmount: '',
        //         paySchd: '',
        //         monthlyAmount: '',
        //         amnt: 0, 
        //         otherComm:''  
        //     }
        // }

        // if (this.result.calculatingChildSupportSurvey){
        //     existingChildSupportInfo.calc = {   
        //         attaching: this.result.calculatingChildSupportSurvey.attachingCalculations == 'y',
        //         reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
        //     }
        // }

        // // console.log('____')
        // // console.log(existingChildSupportInfo.abtOrg.situation)


        // existingChildSupportInfo.finStmnt = {
        //     required: (existingChildSupportInfo.abtOrg.situation.payor ||
        //             existingChildSupportInfo.abtOrg.situation.over19 ||
        //             existingChildSupportInfo.abtOrg.situation.split  ||
        //             existingChildSupportInfo.abtOrg.situation.partyParentOfOther  ||
        //             existingChildSupportInfo.abtOrg.situation.payorEarnsHigh ||
        //             existingChildSupportInfo.abtOrg.situation.specialClaim ||
        //             existingChildSupportInfo.abtOrg.situation.undueHardship )
        // }

        // let form4unable = false;

        // if(this.result.flmAdditionalDocumentsSurvey && this.result.flmAdditionalDocumentsSurvey.unableFileForms){
        //     for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
        //         if(form.includes("Financial Statement Form 4")){
        //             form4unable = true;
        //         }
        //     }   
        // }

        // if(this.result.flmAdditionalDocumentsSurvey && (this.result.flmAdditionalDocumentsSurvey.isFilingAdditionalDocs=='n' ) && form4unable){
        //     existingChildSupportInfo.applyForCaseManagement = true
        //     existingChildSupportInfo.finStmnt = {
        //         required: false
        //     }
        // }

        return existingChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>