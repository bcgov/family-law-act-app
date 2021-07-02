<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 3 – WAIVING OR MODIFYING ANY OTHER REQUIREMENT UNDER THE RULES</b></div>
            <div style="text-align:center;"><b>This is Schedule 3 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed if you are applying to waive or modify any other requirement under the rules, including a time limit set by an order or direction, even after the time limit has expired.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.15rem">
                    I am applying for an order to waive or modify the following requirement(s) under the rules:
                </div>
                    
                <div>
                    <i style="margin-left:1.0rem">Select all options that apply</i>
                </div>

                <div style="margin-left:1.0rem;">
                    <check-box style="" :check="true?'yes':''" text="filing at a court registry other than the court registry required by Rule 7"/>
                    <check-box style="" :check="true?'yes':''" text="attending a needs assessment"/>
                    <check-box style="" :check="true?'yes':''" text="completing a parenting education program"/>
                    <check-box style="" :check="true?'yes':''" text="participating in consensual dispute resolution"/>
                    <check-box style="" :check="true?'yes':''" text="filing a completed financial statement with my application, counter application or reply"/>
                    <check-box style="" :check="true?'yes':''" text="filing the required documents for an application about guardianship of a child"/>
                    <check-box style="" :check="true?'yes':''" text="time to file a reply, including permission to file a reply after the time to reply has passed"/>
                    <check-box style="" :check="true?'yes':''" text="time to provide/exchange document(s)"/>

                    <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="time limit set by an order or direction made on"/>
                    <underline-form style="text-indent:3px;display:inline-block;" textwidth="6rem" beforetext="" hint="mmm/dd/yyyy" text=""/>                     
                    <underline-form style="text-indent:3px;display:inline-block;" textwidth="13rem" beforetext="by" hint="name of judge or family justice manager" text=""/>                     
                    <div style="margin-top:0.7rem"></div>
                    <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33.3rem" beforetext="" hint="" text=""/>                     
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The details of the order I am applying for are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Tell the court the specifics of the order you are applying for. Include if you are applying for the court to waive
                            (cancel) the requirement or to modify (change) the requirement. If you are applying to modify the
                            requirement, specify how you want the requirement changed, for example, additional time to meet the
                            requirement or completing the requirement after taking some other step.
                        </i>
                    </div>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The facts on which this application is based are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Provide the facts you want the court to consider, including:
                        </i>
                    </div>
                    <ul style="text-indent:0;font-style:italic">
                        <li>why you are making the application to waive or modify a requirement</li>
                        <li>why you need the court to make the order</li>
                        <li>whether you are able to complete the requirement at a later date and when you expect to be able to complete the requirement</li>
                        <li>if you are applying to waive or modify any early resolution requirements, what your family law
                            matter is about and who is involved (names of any other party and children the application would be about)</li>
                        <li>how waiving or modifying the requirement will benefit the case proceeding</li>
                    </ul>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { schedule3DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;
    
    @applicationState.State
    public applicantName!: nameInfoType;
   
    dataReady = false;   
    chSupInfo = {} as schedule3DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    over19ChildSupportDetails =[{name:'', reasonForSupport:{illness:false, disability:false, student:false}}]
    childrenSupportFields = [
        {key:"name",             label:"Full name of child",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"reasonForSupport", label:"Reason for child support", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ]

    childrenSupportExpenseItem =[
        {name:'Special and Extraordinary Expense', child0:"Annual Amount", child1:"Annual Amount", child2:"Annual Amount", child3:"Annual Amount"},
        {name:'Child care expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Portion of medical/dental premiums attributable to child', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Health related expenses that exceed insurance reimbursement by at least $100', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Extraordinary expenses for primary or secondary school', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Post-secondary school expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Extraordinary extracurricular activities expenses', child0:"$", child1:"$", child2:"$", child3:"$"},
        {name:'Total', child0:"$", child1:"$", child2:"$", child3:"$"},
    ]
    childrenSupportExpenseFields = [
        {key:"name",   label:"Name of Child:", tdClass:"border-top-0 border-dark align-middle", thClass:"text-right border-dark border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"},
        {key:"child0", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child1", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child2", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        {key:"child3", label:"",               tdClass:"border-dark align-middle",              thClass:"border-dark align-middle",               thStyle:"width:17%;"},
        
    ]   

    public extractInfo(){
        this.chSupInfo = this.getNewChildSupportInfo();
    }

    public getNewChildSupportInfo(){
       
        let newChildSupportInfo = {} as schedule3DataInfoType;

        // if (this.result.childSupportSurvey && this.result.childSupportSurvey.applicantGuardianType){
        //     newChildSupportInfo.appType = {
        //         guardian: this.result.childSupportSurvey.applicantGuardianType == 'parentGuardian',
        //         standing: this.result.childSupportSurvey.applicantGuardianType == 'appointedGuardian',
        //         other: this.result.childSupportSurvey.applicantGuardianType == 'other',
        //         otherCom: (this.result.childSupportSurvey.applicantGuardianType == 'other' && this.result.childSupportSurvey.applicantGuardianTypeComment)? this.result.childSupportSurvey.applicantGuardianTypeComment: ''
        //     }
        // }

        // if (this.result.childSupportSurvey && this.result.childSupportSurvey['otherParty[0]GuardianType']){
        //     newChildSupportInfo.opType = {
        //         guardian: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'parentGuardian',
        //         standing: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'appointedGuardian',
        //         other: this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other',
        //         otherCom: (this.result.childSupportSurvey['otherParty[0]GuardianType'] == 'other' && this.result.childSupportSurvey['otherParty[0]GuardianTypeComment'])? this.result.childSupportSurvey['otherParty[0]GuardianTypeComment']: ''
        //     }
        // }

        // if (this.result.childSupportCurrentArrangementsSurvey){
        //     newChildSupportInfo.currCond = {
        //         splitShared: (this.result.childSupportCurrentArrangementsSurvey.applicantTimeType == 'y'),                
        //         timeDesc: (this.result.childSupportCurrentArrangementsSurvey.applicantTimeWithChildExplanation)? this.result.childSupportCurrentArrangementsSurvey.applicantTimeWithChildExplanation: '',
        //         supArr: (this.result.childSupportCurrentArrangementsSurvey.currentArrangmentExplanation)? this.result.childSupportCurrentArrangementsSurvey.currentArrangmentExplanation: ''
        //     }
        // }

        // if (this.result.incomeAndEarningPotentialSurvey){
        //     newChildSupportInfo.opInfo = {  
        //         facts: this.result.incomeAndEarningPotentialSurvey.knowFacts == 'y',
        //         income: this.result.incomeAndEarningPotentialSurvey.knowIncome == 'y',              
        //         factsDesc: (this.result.incomeAndEarningPotentialSurvey.knowFacts == 'y' && this.result.incomeAndEarningPotentialSurvey.factsExplanation)? this.result.incomeAndEarningPotentialSurvey.factsExplanation: '',
        //         incomeAmt: (this.result.incomeAndEarningPotentialSurvey.knowIncome == 'y' && this.result.incomeAndEarningPotentialSurvey.otherPartyIncome)? this.result.incomeAndEarningPotentialSurvey.otherPartyIncome: ''
        //     }
        // }

        // if (this.result.aboutChildSupportOrderSurvey){
        //     const aboutChildSupport = this.result.aboutChildSupportOrderSurvey;
        //     newChildSupportInfo.desiredSup = {  
        //         payor: aboutChildSupport.listOfSupportPayors.toString(),
        //         applicantPayor: (aboutChildSupport.listOfSupportPayors)?aboutChildSupport.listOfSupportPayors.includes(Vue.filter('getFullName')(this.applicantName)):false,
        //         payees: aboutChildSupport.listOfChildren,              
        //         over19: (aboutChildSupport.numberOf19yrsChild>0 && aboutChildSupport.supportChildOver19 == 'y'),
        //         payorErnsHigh:(aboutChildSupport.payorEarnsHigh == 'yes'),
        //         startDate: (aboutChildSupport.paymentRequestStartingDate.selected == 'startingDate')?Vue.filter('beautify-date')(aboutChildSupport.paymentRequestStartingDate.startingDate):aboutChildSupport.paymentRequestStartingDate.otherComment,
        //         reason: (aboutChildSupport.paymentRequestStartingDateWhy)? aboutChildSupport.paymentRequestStartingDateWhy: ''
        //     }
        //     if(aboutChildSupport.numberOf19yrsChild>0 && aboutChildSupport.supportChildOver19 == 'y')this.over19ChildSupportDetails = aboutChildSupport.over19Details;
        // }        

        // if (this.result.calculatingChildSupportSurvey){
        //     newChildSupportInfo.calc = {                
        //         attaching: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'y'),
        //         reason: (this.result.calculatingChildSupportSurvey.attachingCalculations == 'n' && this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations)? this.result.calculatingChildSupportSurvey.whyNotAttachingCalculations: ''
        //     }
        // }

        // if (this.result.undueHardshipSurvey){
        //     newChildSupportInfo.ndHard = {                
        //         change: (this.result.undueHardshipSurvey.changeAmount == 'y'),
        //         reasons: (this.result.undueHardshipSurvey.changeAmount == 'y' && this.result.undueHardshipSurvey.hardshipReasons)? {
        //             excessive: this.result.undueHardshipSurvey.hardshipReasons.includes("excessive amount of debt"), 
        //             high: this.result.undueHardshipSurvey.hardshipReasons.includes("high expenses"), 
        //             another: this.result.undueHardshipSurvey.hardshipReasons.includes("support another person"), 
        //             dependent:this.result.undueHardshipSurvey.hardshipReasons.includes("support a dependent child"), 
        //             other: this.result.undueHardshipSurvey.hardshipReasons.includes("other")
        //         }: {excessive: false, high: false, another: false, dependent:false, other: false},
        //         otherCom: (this.result.undueHardshipSurvey.changeAmount == 'y' 
        //             && this.result.undueHardshipSurvey.hardshipReasons
        //             && this.result.undueHardshipSurvey.hardshipReasons.includes("other") 
        //             && this.result.undueHardshipSurvey.hardshipReasonsComment)? this.result.undueHardshipSurvey.hardshipReasonsComment:'',
        //     }
        // }

        // if (this.result.specialAndExtraordinaryExpensesSurvey){
        //     const extraordinaryExpensesCondition = this.result.specialAndExtraordinaryExpensesSurvey.applyForExtraordinaryExpenses == 'y'
        //     newChildSupportInfo.specExp = {                
        //         applying: (extraordinaryExpensesCondition)
        //     }
        //     if(extraordinaryExpensesCondition && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem && this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseFields){
        //         this.childrenSupportExpenseItem = this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseItem
        //         this.childrenSupportExpenseFields = [{key:"name",    label:"Name of Child:", tdClass:"border-top-0 border-dark align-middle", thClass:"text-right border-dark border-bottom-0", thStyle:"font-size:7.43pt; width:26%;"}]
        //         const tableFields = this.result.specialAndExtraordinaryExpensesSurvey.childrenSupportExpenseFields
        //         if(tableFields)
        //             for(let i=1; i<tableFields.length; i++)
        //                 this.childrenSupportExpenseFields.push({key:tableFields[i].key, label:tableFields[i].label,  tdClass:"border-dark align-middle text-center",  thClass:"border-dark align-middle text-center",   thStyle:"width:17%;"},)

        // //         for(const item of this.childrenSupportExpenseItem)
        // // {key:"child0", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        // // {key:"child1", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        // // {key:"child2", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},
        // // {key:"child3", label:"",               tdClass:"border-dark align-middle",  thClass:"border-dark align-middle",   thStyle:"width:17%;"},  
        //     }            
        // }

        // newChildSupportInfo.finStmnt = {
        //     required: (newChildSupportInfo.desiredSup.applicantPayor ||
        //             newChildSupportInfo.desiredSup.over19 ||
        //             newChildSupportInfo.desiredSup.payorErnsHigh ||
        //             newChildSupportInfo.currCond.splitShared ||
        //             newChildSupportInfo.specExp.applying ||
        //             newChildSupportInfo.opType.standing ||
        //             newChildSupportInfo.ndHard.change)
        // };

        // let form4unable = false;

        // if(this.result.flmAdditionalDocumentsSurvey && this.result.flmAdditionalDocumentsSurvey.unableFileForms){
        //     for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
        //         if(form.includes("Financial Statement Form 4")){
        //             form4unable = true;
        //         }
        //     }   
        // }

        // if(this.result.flmAdditionalDocumentsSurvey && (this.result.flmAdditionalDocumentsSurvey.isFilingAdditionalDocs=='n') && form4unable ){
        //    newChildSupportInfo.applyForCaseManagement = true
        //     newChildSupportInfo.finStmnt = {
        //         required: false
        //     }
        // }

        return newChildSupportInfo;
    } 

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>