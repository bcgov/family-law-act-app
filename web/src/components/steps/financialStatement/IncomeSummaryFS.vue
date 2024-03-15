<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">

        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Income Summary</h4>
                    <p>
                        To determine the total income used to calculate child support, 
                        special or extraordinary expenses and spousal support, you may 
                        need to adjust your annual income based on the Schedule III 
                        adjustments under the 
                        <a href="https://laws-lois.justice.gc.ca/eng/regulations/SOR-97-175/page-19.html#docCont"
                            target="_blank">Federal Child Support Guidelines</a>. 
                    </p>
                    <p>
                        You may want to refer to income tax terms in the
                        <a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/tax-packages-years/general-income-tax-benefit-package/5000-g/income-tax-benefit-guide.html"
                            target="_blank">General Income Tax and Benefit Guide</a>
                        used by the 
                        <a href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/reporting-income.html"
                            target="_blank">Canada Revenue Agency</a>
                             and to specific lines found in your T1 Income Tax and Benefits Return (which is 
                            referred as “return” in these worksheets) or your notice of assessment or notice of 
                            reassessment to complete this part. 
                        
                    </p>
                    <p>
                        The amounts you provide in your income summary will be subtracted from (deductions) 
                        or added to (additions) your income for the purposes of determining child support, 
                        the portion owing for special or extraordinary expenses, or spousal support. 
                        Remember to record all of these as yearly (annual) amounts.
                    </p>

                    <div>
                        <div class="question">
                            Record the yearly (annual) amounts of your income and adjustments in the table below.<br> 
                            Put ‘0’ in a field if it doesn’t apply to you.
                        </div>
                        <p>
                            If your income and adjustments are expected to be similar to what 
                            is set out in your most recent federal tax return, you can use 
                            the amount from the referenced parts of the tax return for 
                            the income summary. If not, record what you expect the amounts 
                            on your federal tax return to be this year.
                        </p>
                        <p>
                            For help calculating your income, you can visit the 
                            <a href="https://www.justice.gc.ca/eng/rp-pr/fl-lf/child-enfant/guide/toc-tdm.html"
                                target="_blank">Department of Justice website on child support</a>
                            which includes detailed information including the Federal Child Support Guidelines: 
                            Step-by-Step Worksheet 1. You can also talk with a child support officer, 
                            family justice counsellor or a lawyer.
                        </p>
                            
                    </div>

                    <!-- income -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Total income
                        </b-row>
                        <b-table
                            :key="tableKey"
                            :items="totalIncomeItem"
                            :fields="incomeSummaryFields"
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="totalIncomeItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data" class="item-rows">
                                        <p>My <b>total annual income before adjustments</b></p>
                                        <p class="sub-title">[Line 15000 of tax return or expected amount for this year]</p>
                                    </div>                                
                                </template>
                        </b-table>
                        <b-row class="bg-secondary ml-0 text-white pl-2" style="width: 100%;">
                            <b class="mr-2">Adjustments to total income</b>
                            in accordance with Schedule III of the Child Support Guidelines
                        </b-row>
                    </div>

                    <!-- deductions -->
                    <div class="mt-2">
                        <b-row class="bg-secondary ml-0 text-dark pl-2" style="width: 100%;">
                            <b class="mr-2">Deductions</b>
                            (use annual amounts)
                        </b-row>
                        <b-table
                            :key="deductionsTableKey"
                            :items="deductionItem"
                            :fields="incomeSummaryFields"
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label v-if="data.index == 0" class="dollar-label">$</label>
                                            <label v-else-if="data.index == 10" class="plus-dollar-label">- $</label>
                                            <label v-else class="plus-dollar-label">+ $</label>
                                            <b-form-input 
                                                :disabled="data.index == 10"
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="deductionItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data.value=='childSupportReceived'" class="item-rows" >
                                        <p>
                                            Taxable child support received (if you receive child support
                                             based on an order or agreement made <b>before</b> May 1, 1997)
                                        </p>
                                        <p class="sub-title" style="margin-bottom: 0; margin-top: -1rem;">[Portion for taxable child support from line 12800 of tax return]</p>
                                    </div>
                                    <div v-else-if="data.value=='spouseSupportReceived'" class="item-rows" >
                                        <p>Spousal support received</p>
                                        <p class="sub-title">[Portion for spousal support from line 12800 of tax return]</p>
                                    </div>
                                    <div v-else-if="data.value=='uccb'" class="item-rows" >
                                        <p>
                                            Universal childcare benefit (UCCB) lump-sum payment (In July 2016, 
                                            UCCB was replaced by the tax-free Canada Child Benefit which is 
                                            not included in this calculation)
                                        </p>
                                        <p class="sub-title">[Line 11700 of tax return]</p>
                                    </div>
                                    <div v-else-if="data.value=='splitPension'" class="item-rows" >
                                        <p>Split-pension amount</p>
                                        <p class="sub-title"> 
                                            [Eligible pension income that your spouse or common-law partner 
                                            transferred to you from line 11600 of tax return]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='employmentExpense'" class="item-rows" >
                                        <p>
                                            Employment expenses including union dues and other professional dues
                                        </p>
                                        <p class="sub-title">
                                            [Line 21200 and 22900 of tax return]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='socialAssistance'" class="item-rows" >
                                        <p>
                                            Social assistance received for other members of your household
                                        </p>
                                        <p class="sub-title">
                                            [Portion of line 14500 of tax return that applies to other 
                                            family members. If you are not sure how much that is, you 
                                            can contact the social assistance office or refer to social 
                                            assistance rate tables if available online.]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='excessPortion'" class="item-rows" >
                                        <p>
                                            Excess portion of dividends from taxable Canadian corporations
                                        </p>
                                        <p class="sub-title">
                                            [Line 12000 of tax return minus total amount of dividends received on T5]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='investmentLosses'" class="item-rows" >
                                        <p>Actual business investment losses</p>
                                        <p class="sub-title">[Line 21699 of tax return]</p>
                                    </div>
                                    <div v-else-if="data.value=='carryingCharges'" class="item-rows" >
                                        <p>Carrying charges</p>
                                        <p class="sub-title">[Line 22100 of tax return]</p>
                                    </div>
                                    <div v-else-if="data.value=='partnership'" class="item-rows" >
                                        <p>
                                            Partnership or sole proprietorship income required to use for capital 
                                            in the partnership/proprietorship
                                        </p>
                                        <p class="sub-title">
                                            [If you earned income through a partnership or a sole proprietorship, 
                                            deduct any amount included in your income that is required by the 
                                            partnership or sole proprietorship for capitalization purposes. 
                                            Enter the result on this line.]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='deductionTotal'" class="total-rows">
                                        Total deductions from income
                                    </div>
                                                                           
                                </template>
                        </b-table>
                    </div>

                    <!-- additions -->
                    <div class="mt-2">
                        <b-row class="bg-secondary ml-0 text-dark pl-2" style="width: 100%;">
                            <b class="mr-2">Additions</b>
                            (use annual amounts)
                        </b-row>
                        <b-table
                            :key="additionsTableKey"
                            :items="additionItem"
                            :fields="incomeSummaryFields"
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label v-if="data.index == 0" class="dollar-label">$</label>
                                            <label v-else class="plus-dollar-label">+ $</label>
                                            <b-form-input 
                                                :disabled="data.index == 4"
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="additionItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data.value=='capitalOffset'" class="item-rows">
                                        <p>
                                            Offset of capital gains and capital losses (if zero or less, 
                                            indicate “0” in this line)
                                        </p>
                                        <p class="sub-title">
                                            [Line 19700 of “Schedule 3 – Capital Gains (or Losses) minus line 12700 of tax return]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='selfEmployment'" class="item-rows" >
                                        <p>
                                            Payments made from self-employment income including wages to 
                                            <b>non-arm’s length parties</b> (like a family member) except 
                                            for the portion that is necessary to earn self-employment income
                                        </p>
                                        <p class="sub-title">
                                            [Include on this line any income amount for salaries, benefits, 
                                            wages, management fees or other payments paid to, or on behalf 
                                            of, the other person. You don’t need to include the amount if 
                                            it is reasonable, and it was necessary for you to have paid 
                                            the amount to earn the self-employment income.]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='capitalCost'" class="item-rows" >
                                        <p>
                                            Capital cost allowance for property
                                        </p>
                                        <p class="sub-title">
                                            [If your return includes a deduction for capital cost allowance for 
                                            real property (e.g. buildings), you will need to enter that amount 
                                            on this line.]
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='employeeStock'" class="item-rows" >
                                        <p>
                                            Value of exercised employee stock options with Canadian-controlled 
                                            private corporation
                                        </p>
                                        <p class="sub-title">
                                            [You are required to enter an amount on this line where you have 
                                            exercised a stock option to purchase shares of a Canadian-controlled 
                                            private corporation (or a publicly traded corporation that is 
                                            subject to the same tax treatment regarding stock options as 
                                            a Canadian-controlled private corporation).
                                            <br>
                                        
                                            You need to put “0” on this line if you sold the shares in the same 
                                            year you exercised the stock options to obtain the shares. Otherwise, 
                                            to calculate the employee stock option benefit to be included:
                                            <ul>
                                                <li>
                                                    first, find the total value of shares acquired by stock 
                                                    option (you can multiply the number of shares by the 
                                                    market value of one of them)
                                                </li>
                                                <li>
                                                    subtract from that amount the total amount that you paid 
                                                    for the stock options and the shares
                                                </li>
                                            </ul>
                                            The result is the stock option benefit. Enter the amount on this line.]                                        
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='additionsTotal'" class="total-rows" >
                                        Total additions to income
                                    </div>                                                                  
                                </template>
                        </b-table>
                    </div> 

                    <!-- child support purposes -->
                    <div>                        
                        <b-table
                            :key="childSupportTableKey"
                            :items="childSupportPurposeItem"
                            :fields="incomeSummaryFields"
                            tbody-tr-class="child-table"                            
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                disabled
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="childSupportPurposeItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data" class="total-rows">
                                        Annual income for child support purposes
                                    </div>                                
                                </template>
                        </b-table>                        
                    </div>

                    <!-- extraordinary -->
                    <div class="mt-2" v-if="extraExpenses">                        
                        <b-table
                            :key="extraExpensesTableKey"
                            :items="extraExpensesItem"
                            :fields="incomeSummaryFields"
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label v-if="data.index == 3" class="dollar-label">$</label>
                                            <label v-else-if="data.index == 0 || data.index == 1" class="plus-dollar-label">+ $</label>
                                            <label v-else-if="data.index == 2" class="plus-dollar-label">- $</label>                                            
                                            <b-form-input 
                                                :disabled="data.index == 3"
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="extraExpensesItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data.value=='benefitPaid'" class="item-rows row">
                                        
                                        <div class="col-md-1" style="font-weight: 700;">
                                            Add
                                        </div>
                                        <div class="col-md-11" style="padding-left: 2rem;">
                                            Any benefit paid to you for a child for whom special or extraordinary 
                                            expenses are being requested that is not included in the income on line 18
                                        </div>

                                    </div>
                                    <div v-else-if="data.value=='spousalReceived'" class="item-rows row">
                                        
                                        <div class="col-md-1" style="font-weight: 700;">
                                            Add
                                        </div>
                                        <div class="col-md-11" style="padding-left: 2rem;">
                                            Spousal support received from other party (if any)
                                        </div>

                                    </div>
                                    <div v-else-if="data.value=='spousalPaid'" class="item-rows row">
                                        
                                        <div class="col-md-1" style="font-weight: 700;">
                                            Subtract
                                        </div>
                                        <div class="col-md-11" style="padding-left: 2rem;">
                                            Spousal support paid to other party (if any)
                                        </div>

                                    </div>                                    
                                    <div v-else-if="data.value=='specialTotal'" class="total-rows" >
                                        Annual income for special or extraordinary expenses
                                    </div>                                                                  
                                </template>
                        </b-table>
                    </div>

                    <!-- spousal -->
                    <div class="mt-2" v-if="spouseSupport">
                        <b-row class="bg-secondary ml-0 text-dark pl-2" style="width: 100%;">
                            <b class="mr-2">Other additions to income for spousal support</b>
                            <i>(complete only if there is an application for spousal support)</i>
                        </b-row>
                        <b-table
                            :key="spouseExpensesTableKey"
                            :items="spouseExpensesItem"
                            :fields="incomeSummaryFields"
                            thead-class="d-none"                            
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label v-if="data.index == 3" class="dollar-label">$</label>
                                            <label v-else class="plus-dollar-label">+ $</label>
                                            <b-form-input 
                                                :disabled="data.index == 3"
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputYearlyValueChanged()"                                    
                                                v-model="spouseExpensesItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div v-if="data.value=='childReceived'" class="item-rows">
                                        <p>
                                            Total child support received
                                        </p>                                        
                                    </div>
                                    <div v-else-if="data.value=='socialAssist'" class="item-rows" >
                                        <p>
                                            Social assistance received for other members of your household
                                        </p>
                                    </div>
                                    <div v-else-if="data.value=='govBenefit'" class="item-rows" >
                                        <p>
                                            Any government benefit received for a child that is not included 
                                            in the income on line 18
                                        </p>                                        
                                    </div>                                   
                                    <div v-else-if="data.value=='spouseSupportFund'" class="total-rows" >
                                        Annual income for spousal support purposes
                                    </div>                                                                  
                                </template>
                        </b-table>
                    </div>

                </div>
            </div>
        </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import _ from 'underscore';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class IncomeSummaryFs extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = false;
    tableKey = 0;
    deductionsTableKey = 0; 
    additionsTableKey = 0; 
    childSupportTableKey = 0;
    extraExpensesTableKey = 0;
    spouseExpensesTableKey = 0;
    extraExpenses = false;
    spouseSupport = false;
    
    totalIncomeItem = [
        {lineNumber: 1, amountName:"totalIncome",   yearlyAmount: 0}
    ];

    deductionItem = [
        {lineNumber: 2,  amountName:"childSupportReceived",    yearlyAmount: 0},
        {lineNumber: 3,  amountName:"spouseSupportReceived",   yearlyAmount: 0},
        {lineNumber: 4,  amountName:"uccb",                    yearlyAmount: 0},
        {lineNumber: 5,  amountName:"splitPension",            yearlyAmount: 0},
        {lineNumber: 6,  amountName:"employmentExpense",       yearlyAmount: 0},
        {lineNumber: 7,  amountName:"socialAssistance",        yearlyAmount: 0},
        {lineNumber: 8,  amountName:"excessPortion",           yearlyAmount: 0},
        {lineNumber: 9,  amountName:"investmentLosses",        yearlyAmount: 0},
        {lineNumber: 10, amountName:"carryingCharges",         yearlyAmount: 0},
        {lineNumber: 11, amountName:"partnership",             yearlyAmount: 0},
        {lineNumber: 12, amountName:"deductionTotal",          yearlyAmount: 0}
    ];

    additionItem = [
        {lineNumber: 13,  amountName:"capitalOffset",    yearlyAmount: 0},
        {lineNumber: 14,  amountName:"selfEmployment",   yearlyAmount: 0},
        {lineNumber: 15,  amountName:"capitalCost",      yearlyAmount: 0},
        {lineNumber: 16,  amountName:"employeeStock",    yearlyAmount: 0},
        {lineNumber: 17,  amountName:"additionsTotal",   yearlyAmount: 0},
        
    ];

    childSupportPurposeItem = [
        {lineNumber: 18,  amountName:"childSupportFund", yearlyAmount: 0}
    ];

    extraExpensesItem = [
        {lineNumber: 19,  amountName:"benefitPaid",     yearlyAmount: 0},
        {lineNumber: 20,  amountName:"spousalReceived", yearlyAmount: 0},
        {lineNumber: 21,  amountName:"spousalPaid",     yearlyAmount: 0},
        {lineNumber: 22,  amountName:"specialTotal",    yearlyAmount: 0}
    ];

    spouseExpensesItem = [
        {lineNumber: 23,  amountName:"childReceived",       yearlyAmount: 0},
        {lineNumber: 24,  amountName:"socialAssist",        yearlyAmount: 0},
        {lineNumber: 25,  amountName:"govBenefit",          yearlyAmount: 0},
        {lineNumber: 26,  amountName:"spouseSupportFund",   yearlyAmount: 0}
    ];

    incomeSummaryFields = [
        {key:"lineNumber",      label:"",    class:"line-number"}, 
        {key:"amountName",      label:"",    class:"amount-name"},
        {key:"yearlyAmount",    label:"",    class:"yearly-amount"}      
    ];

    mounted(){        
        this.reloadPageInformation();
    } 
    
    public reloadPageInformation() {        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.extraExpenses = false;
        this.spouseSupport = false;

        if(this.step.result?.financialStatementSurvey?.data){
            const fsData = this.step.result.financialStatementSurvey.data;            
            this.spouseSupport = fsData.spousalAppExists == 'y';
            this.extraExpenses = fsData.childAppExists == 'y' && fsData.situationType.includes("There is a claim for section 7 special or extraordinary expenses")
        }
        
        if (this.step.result?.incomeSummaryFSSurvey?.data) {
            const incomeSummaryData = this.step.result.incomeSummaryFSSurvey.data
            if (incomeSummaryData.totalIncome){
                this.totalIncomeItem = incomeSummaryData.totalIncome;
            }
            if(incomeSummaryData.deduction){
                this.deductionItem = incomeSummaryData.deduction;
            }
            if(incomeSummaryData.addition){
                this.additionItem = incomeSummaryData.addition;
            }
            if(incomeSummaryData.childSupportFund){
                this.childSupportPurposeItem = incomeSummaryData.childSupportFund;
            }
            
            if(incomeSummaryData.extraExpenses && this.extraExpenses){
                this.extraExpensesItem = incomeSummaryData.extraExpenses;
            }

            if(incomeSummaryData.spouseExpenses && this.spouseSupport){
                this.spouseExpensesItem = incomeSummaryData.spouseExpenses;
            }
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }      

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
    }

    public inputYearlyValueChanged(){

        // calculate total deductions
        this.deductionItem[10].yearlyAmount = 0;
        const deductionsList = this.deductionItem.slice(0, this.deductionItem.length - 1)
        const totalDeductions = deductionsList.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);
        this.deductionItem[10].yearlyAmount = totalDeductions;  

        // calculate total deductions
        this.additionItem[4].yearlyAmount = 0;
        const additionsList = this.additionItem.slice(0, this.additionItem.length - 1)
        const totalAdditions = additionsList.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);
        this.additionItem[4].yearlyAmount = totalAdditions;

        //calculate total for child support
        this.childSupportPurposeItem[0].yearlyAmount = Number(this.totalIncomeItem[0].yearlyAmount) - totalDeductions + totalAdditions; 
                
        // calculate extraordinary 
        if(this.extraExpenses){
            this.extraExpensesItem[3].yearlyAmount = 0;
            const totalExtraReceived = Number(this.extraExpensesItem[0].yearlyAmount) + Number(this.extraExpensesItem[1].yearlyAmount);
            const totalExtraPaid = Number(this.extraExpensesItem[2].yearlyAmount)
            this.extraExpensesItem[3].yearlyAmount = Number(this.childSupportPurposeItem[0].yearlyAmount) + totalExtraReceived - totalExtraPaid;
        }

        // calculate spousal expenses 
        if(this.spouseSupport){
            if(this.deductionItem[5].yearlyAmount &&  this.deductionItem[10].yearlyAmount > 0){
                this.spouseExpensesItem[1].yearlyAmount = this.deductionItem[5].yearlyAmount;
            }
            this.spouseExpensesItem[3].yearlyAmount = 0;
            const spouseExpensesList = this.spouseExpensesItem.slice(0, this.spouseExpensesItem.length - 1)
            const totalSpouseExpenses = spouseExpensesList.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);
            this.spouseExpensesItem[3].yearlyAmount = Number(this.childSupportPurposeItem[0].yearlyAmount) + totalSpouseExpenses;
        }
                
        this.tableKey ++;
        this.deductionsTableKey ++;
        this.additionsTableKey ++;
        this.childSupportTableKey ++;
        this.extraExpensesTableKey ++;
        this.spouseExpensesTableKey ++;
    }        

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()
    }

    public getIncomeResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.getIncomeInfo()){

            const incomeInfo = this.getIncomeInfo().totalIncome;
            for(const incomeType of incomeInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }

            const deductionInfo = this.getIncomeInfo().deduction;
            for(const incomeType of deductionInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }

            const additionInfo = this.getIncomeInfo().addition;
            for(const incomeType of additionInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }

            const childSupportFundInfo = this.getIncomeInfo().childSupportFund;
            for(const incomeType of childSupportFundInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }

            const extraExpensesInfo = this.getIncomeInfo().extraExpenses;
            for(const incomeType of extraExpensesInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }

            const spouseExpensesInfo = this.getIncomeInfo().spouseExpenses;
            for(const incomeType of spouseExpensesInfo) {
                questionResults.push({name:'incomeSummaryFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }
        }  
        
        return {data: this.getIncomeInfo(), questions:questionResults, pageName:'Income Summary', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getIncomeInfo(){       

        let result = {
            totalIncome: this.totalIncomeItem,
            deduction: this.deductionItem,
            addition: this.additionItem,
            childSupportFund: this.childSupportPurposeItem,
            extraExpenses: this.extraExpensesItem,
            spouseExpenses: this.spouseExpensesItem
        }

        return result
    }
    
    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
        this.UpdateStepResultData({step:this.step, data: {incomeSummaryFSSurvey: this.getIncomeResults()}})
    }
}
</script>

<style lang="scss">
    .yearly-amount {
        width:19%;
    }

    .line-number {
        width:3%;
    }

    .amount-name {
        width:78%;
    }

    .child-table {
        border: 2px solid #f9ca54;
    }

    .total-rows {
        text-align:left;
        font-size:12pt; 
        font-weight: 700;
    }

    .item-rows {
        text-align:left;
        font-size:12pt;
    }

    .plus-dollar-label {
        float:left;
        margin:0.5rem 0;
    }

    .dollar-label {
        float:left;
        margin:0.5rem 0; 
        margin-right:0.75rem;
    }
</style>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
    padding-bottom: 20px;
    padding-top: 2rem;
    max-width: 950px;
    color: black;
}

.page-title {
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: #494949;
    text-align: left; 
}

.question {
    color:#556077; 
    font-size:1.40em; 
    font-weight:bold;
}

.table, td, th{
    border: 1px solid rgba($gov-pale-grey, 0.9);
  
}
.clickableRow {
    background-color: rgba($gov-pale-grey, 0.5);
    td a {
        display: block;
    }
}

.sub-title {
    font-size: 10pt;
    margin-bottom: 0; 
    margin-top: -1rem;
}
</style>
