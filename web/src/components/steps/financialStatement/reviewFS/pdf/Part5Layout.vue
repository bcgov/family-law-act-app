<template>
    <div v-if="dataReady">

<!-- <Page 1> -->          

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Part 5 – Undue Hardship
        </div>

        <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
            Complete this part only if you have made a claim for undue hardship in a child support claim.
        </div>
        <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
            Complete all sections that apply to your circumstances. You may leave a section blank.
        </div>
   
    <!-- <1> --> 
        <section>
           
            <check-box
                checkbox="" 
                inline="inline" 
                boxMargin="0"
                style="display:inline; margin-left: 0.5rem;" 
                :check="hasDebt?'yes':''" 
                text="I have an unusual or excessive amount of debt I incurred to support the family prior to separation"/>
               
            <div style="display:block; margin-left: 3rem;"> or to earn a living as follows:</div>
            <table class="fullsize">                
               
                <tr style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <b>Name of creditor and reason for borrowing</b><br>
                        <i>(name of bank, finance company, etc)</i>
                    </td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">Balance owing</td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">
                        Annual debt <br>repayment
                    </td>
                </tr>

                <tr v-if="creditorList.length == 0" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                </tr>

                <tr v-for="(creditor,inx) in creditorList" :key="inx" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer">{{ creditor.name }}</div>
                        <div class="answer">{{ creditor.reason }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ creditor.balance }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ creditor.payment }}</div>
                    </td>
                </tr>
            </table>
        </section> 

        <!-- <2> --> 
        <section>
           
            <check-box
                checkbox="" 
                inline="inline" 
                boxMargin="0"
                style="display:inline; margin-left: 0.5rem;" 
                :check="hasUnusualExpense?'yes':''" 
                text="I have unusually high expenses to exercise parenting time or contact with the child(ren)."/>
                
            <div style="display:block; margin-left: 3rem; font-style: italic;">Specify below what expenses you have</div>
            <div v-if="hasUnusualExpense" class="answerbox">
                {{ unusualExpenseDetails }}
            </div> 
        </section>

        <!-- <3> --> 
        <section>
           
            <check-box
                checkbox="" 
                inline="inline" 
                boxMargin="0"
                style="display:inline; margin-left: 0.5rem;" 
                :check="hasLegalDutyAdult?'yes':''" 
                text="I have a legal duty to support another person, such as a person who is ill or disabled or a former"/>
              
            <div style="display:block; margin-left: 3rem;">  spouse.</div>
            <table class="fullsize">                
              
                <tr style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <b>Full name of adult you support</b>
                    </td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">
                        Monthly amount <br>paid for support
                    </td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">
                        Annual amount <br>paid for support
                    </td>
                </tr>

                <tr v-if="adultList.length == 0" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                </tr>

                <tr v-for="(adult,inx) in adultList" :key="inx" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer">{{ adult.name }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ adult.monthly }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ adult.yearly }}</div>
                    </td>
                </tr>
            </table>
        </section> 
        
        <!-- <4> --> 
        <section>
           
            <check-box
               checkbox="" 
               inline="inline" 
               boxMargin="0"
               style="display:inline; margin-left: 0.5rem;" 
               :check="hasLegalDutyChild?'yes':''" 
               text="I have a legal duty to support a dependant child from another relationship"/>
           
            <table class="fullsize">                
              
                <tr style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <b>Full name of dependent you support</b>
                    </td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">
                        Monthly amount <br>paid for support
                    </td>
                    <td style="border:1px solid #414142; font-weight: 700;" colspan="4">
                        Annual amount <br>paid for support
                    </td>
                </tr>

                <tr v-if="childList.length == 0" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer" style="visibility:hidden;">yyy</div>
                    </td>
                </tr>

                <tr v-for="(child,inx) in childList" :key="inx" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer">{{ child.name }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ child.monthly }}</div>
                    </td>
                    <td style="border:1px solid #414142;" colspan="4">
                        <div class="answer">{{ child.yearly }}</div>
                    </td>
                </tr>
           </table>
        </section> 

        <!-- <5> --> 
        <section>
           
            <check-box
                checkbox="" 
                inline="inline" 
                boxMargin="0"
                style="display:inline; margin-left: 0.5rem;" 
                :check="hasOtherHardship?'yes':''" 
                text="other undue hardship circumstances (specify):"/>
           
            <div v-if="hasOtherHardship" class="answerbox">{{ otherHardshipDetails }}</div> 
        </section>
         
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})
export default class Form4Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    hasDebt = false;  
    creditorList = [];
    hasUnusualExpense = false;
    unusualExpenseDetails = '';
    hasLegalDutyAdult = false;
    adultList = [];
    hasLegalDutyChild = false;
    childList = [];
    hasOtherHardship = false;
    otherHardshipDetails = '';
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getCreditorInfo();  
        this.getHighExpenseInfo();  
        this.getAdultInfo();
        this.getChildInfo();
        this.getOtherInfo();
    } 

    public getCreditorInfo(){ 
        
        this.hasDebt = false;

        if(this.result?.undueHardshipFsExists)
            this.hasDebt = this.result.undueHardshipFsExists == 'Yes'; 
        
        this.creditorList = [];

        if( this.hasDebt && this.result?.undueHardshipFSSurvey){

            for(const debtInfo of this.result.undueHardshipFSSurvey){

                let debt = {
                    name: debtInfo.creditorFullName?debtInfo.creditorFullName:'', 
                    reason: debtInfo.debtReason?debtInfo.debtReason:'',
                    balance: debtInfo.debTotal?Number(debtInfo.debTotal):0,
                    payment: debtInfo.debtAnnualPayment?Number(debtInfo.debtAnnualPayment):0
                }                
                this.creditorList.push(debt);
            } 
        }
    }

    public getHighExpenseInfo(){ 

        this.hasUnusualExpense = false;
        this.unusualExpenseDetails = '';
        
        if(this.result?.unusuallyHighExpensesFSSurvey){
            const unusualExpense = this.result.unusuallyHighExpensesFSSurvey;
            this.hasUnusualExpense = unusualExpense.unusualExpensesExist == 'y';
            this.unusualExpenseDetails = unusualExpense.unusualExpensesDetails?unusualExpense.unusualExpensesDetails:'';           
        }
            
    }

    public getAdultInfo(){ 
        
        this.hasLegalDutyAdult = false;
        if(this.result?.legalDutyAnotherPersonFsExists)
            this.hasLegalDutyAdult = this.result.legalDutyAnotherPersonFsExists == 'Yes'; 
        
        this.adultList = [];

        if( this.hasLegalDutyAdult && this.result?.legalDutyAnotherPersonFSSurvey){

            for(const adultInfo of this.result.legalDutyAnotherPersonFSSurvey){

                let adult = {
                    name: adultInfo.antherPersonFullName?adultInfo.antherPersonFullName:'', 
                    monthly: adultInfo.monthlyPayment?Number(adultInfo.monthlyPayment):0,
                    yearly: adultInfo.yearlyPayment?Number(adultInfo.yearlyPayment):0
                }                
                this.adultList.push(adult);
            }
        }
    }

    public getChildInfo(){ 
        
        this.hasLegalDutyChild = false;
        if(this.result?.legalDutyDependentChildFsExists)
            this.hasLegalDutyChild = this.result.legalDutyDependentChildFsExists == 'Yes'; 
        
        this.childList = [];

        if( this.hasLegalDutyChild && this.result?.legalDutyDependentChildFSSurvey){

            for(const childInfo of this.result.legalDutyDependentChildFSSurvey){

                let child = {
                    name: childInfo.childFullName?childInfo.childFullName:'', 
                    monthly: childInfo.monthlyPayment?Number(childInfo.monthlyPayment):0,
                    yearly: childInfo.yearlyPayment?Number(childInfo.yearlyPayment):0
                }                
                this.childList.push(child);
            }
        }    
    }

    public getOtherInfo(){ 

        this.hasOtherHardship = false;
        this.otherHardshipDetails = '';        
        if(this.result?.otherCircumstancesFSSurvey){
            const otherInfo = this.result.otherCircumstancesFSSurvey;
            this.hasOtherHardship = otherInfo.otherCircumstancesExist == 'y';
            this.otherHardshipDetails = otherInfo.otherCircumstancesDetails?otherInfo.otherCircumstancesDetails:''
        }

    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
