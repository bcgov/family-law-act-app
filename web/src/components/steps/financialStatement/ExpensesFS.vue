<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">

        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Expenses</h1>                   
                    
                    <p>
                        An expense is the amount of money <b>you</b> spend on something.
                    </p>

                    <div>
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Estimate how much YOU pay for each of the expenses listed below.
                        </div>
                        <p>
                            The form records both a <b>monthly</b> and <b>yearly</b> amount. You may 
                            choose to provide either a monthly or annual amount and this 
                            service will calculate the other amount for you.
                        </p>
                        <p>
                            <b>Note:</b> You may be asked to provide the court with proof of an amount 
                            or a breakdown of how you came to the estimate. Keep a record of 
                            how you calculated an amount and be prepared to provide proof such 
                            as bill payments or bank statements.
                        </p>
                            
                    </div>

                    <!-- housing -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Housing
                        </b-row>                        
                        <b-table
                            :items="housingItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('housing', true, data)"                                    
                                                v-model="housingItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(monthlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('housing', false, data)"                                    
                                                v-model="housingItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">                                    
                                    <div v-if="data.value == 'Utilities'" class="item-rows">
                                        <p>Utilities</p>
                                        <p class="sub-title">
                                            include electricity, gas, water, waste, home phone, and internet
                                        </p>
                                    </div> 
                                    <div v-else class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- deductions -->
                    <!-- <div class="mt-2">
                        <b-row class="ml-0 pl-2" style="width: 100%;">
                            <b class="mr-2">Housing</b>
                            
                        </b-row>
                        <b-table
                            :key="deductionsTableKey"
                            :items="deductionItem"
                            :fields="expenseFields"
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
                                                @change="inputValueChanged(tableName, amountType, data)"                                    
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
                    </div> -->

                    <!-- additions -->
                    <!-- <div class="mt-2">
                        <b-row class="bg-secondary ml-0 text-dark pl-2" style="width: 100%;">
                            <b class="mr-2">Additions</b>
                            (use annual amounts)
                        </b-row>
                        <b-table
                            :key="additionsTableKey"
                            :items="additionItem"
                            :fields="expenseFields"
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
                                                @change="inputValueChanged(tableName, amountType, data)"                                    
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
                    </div>  -->

                    <!-- extraordinary -->
                    <!-- <div class="mt-2" v-if="extraExpenses">                        
                        <b-table
                            :key="extraExpensesTableKey"
                            :items="extraExpensesItem"
                            :fields="expenseFields"
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
                                                @change="inputValueChanged(tableName, amountType, data)"                                    
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
                    </div> -->

                    <!-- spousal -->
                    <!-- <div class="mt-2" v-if="spouseSupport">
                        <b-row class="bg-secondary ml-0 text-dark pl-2" style="width: 100%;">
                            <b class="mr-2">Other additions to income for spousal support</b>
                            <i>(complete only if there is an application for spousal support)</i>
                        </b-row>
                        <b-table
                            :key="spouseExpensesTableKey"
                            :items="spouseExpensesItem"
                            :fields="expenseFields"
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
                                                @change="inputValueChanged(tableName, amountType, data)"                                    
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
                    </div> -->

                    <!-- total -->
                    <div>                        
                        <b-table
                            :key="tableKey"
                            :items="totalExpensesItem"
                            :fields="expenseFields"
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
                                                v-model="totalExpensesItem[data.index][data.field.key]"
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
export default class ExpensesFs extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;  
    tableKey = 0;

    expenseFields = [
        {key:"amountName",      label:"Expenses",       tdClass:"border-left-0 align-middle",   thClass:"text-primary border-left-0",   thStyle:"font-size:12pt; width:60%;"}, 
        {key:"monthlyAmount",   label:"Monthly Total",  tdClass:"border-top-0 align-middle",    thClass:"text-primary",                 thStyle:"font-size:12pt; width:18%;"},
        {key:"yearlyAmount",    label:"Yearly Total",   tdClass:"border-top-0 align-middle",    thClass:"text-primary",                 thStyle:"font-size:12pt; width:19%;"}  
    ];
    
    housingItem = [
        {amountName:"Rent/mortgage",                    monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Property taxes and strata fees",   monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Utilities",                        monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Homeowner/renter’s insurance",     monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Home maintenance and repair",      monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Other",                            monthlyAmount: 0,   yearlyAmount: 0}
    ];

    foodItem = [
        {amountName:"Groceries",            monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Eating out",           monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Household supplies",   monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Other",                monthlyAmount: 0,   yearlyAmount: 0}
    ];

    transportItem = [
        {amountName:"Car insurance and car loan payments",  monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Fuel",                                 monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Maintenance and repairs",              monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Public transit, taxis and parking",    monthlyAmount: 0,   yearlyAmount: 0},
        {amountName:"Other",                                monthlyAmount: 0,   yearlyAmount: 0}
    ];

    clothingItem = [
        {amountName: "include clothing, hair dresser/barber and cosmetics",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    healthItem = [
        {amountName: "include regular dental care, orthodontics, medicine, eye glasses or contact lenses",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    childrenItem = [
        {amountName: "include school activities, extracurricular activities, tuition/school fees, camps, babysitting, allowances and daycare",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    miscellaneousItem = [
        {amountName: "include gifts & donations, alcohol, tobacco & cannabis, entertainment & recreation, cell phone, cable, subscription services, pet expenses and vacations",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    premiumsItem = [
        {amountName: "include life or term insurance premiums, RRSP or other contributions, debt repayment (for expenses not itemized above)",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    taxItem = [
        {amountName: "(amount of income tax you pay)",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    otherItem = [
        {amountName: "other",  monthlyAmount: 0,   yearlyAmount: 0}
    ];   

    
    totalExpensesItem = [
        {amountName: "total",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    

    mounted(){        
        this.reloadPageInformation();
    } 
    
    public reloadPageInformation() {        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.expensesFSSurvey?.data) {
            const expenseData = this.step.result.expensesFSSurvey.data
            if (expenseData.housing){
                this.housingItem = expenseData.housing;
            }
            if(expenseData.food){
                this.foodItem = expenseData.food;
            }
            if(expenseData.transport){
                this.transportItem = expenseData.transport;
            }
            if(expenseData.clothing){
                this.clothingItem = expenseData.clothing;
            }
            
            if(expenseData.health){
                this.healthItem = expenseData.health;
            }

            if(expenseData.children){
                this.childrenItem = expenseData.children;
            }

            if(expenseData.miscellaneous){
                this.miscellaneousItem = expenseData.miscellaneous;
            }

            if(expenseData.premiums){
                this.premiumsItem = expenseData.premiums;
            }

            if(expenseData.tax){
                this.taxItem = expenseData.tax;
            }

            if(expenseData.other){
                this.otherItem = expenseData.other;
            }

            if(expenseData.total){
                this.totalExpensesItem = expenseData.total;
            }
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }      

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
    }
    
    public inputValueChanged(tableName, amountType, data){

        if(tableName == 'housing'){
            if(amountType)
                this.housingItem[data.index].monthlyAmount = this.housingItem[data.index].yearlyAmount/12;
            else
                this.housingItem[data.index].yearlyAmount = 12 * this.housingItem[data.index].monthlyAmount;        
        }

        //TODO: add all
        this.totalExpensesItem[0].yearlyAmount = Number(this.housingItem[0].yearlyAmount);
        this.tableKey ++;
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()
    }

    public getExpenseResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.getExpenseInfo()){

            const incomeInfo = this.getExpenseInfo().total;
            for(const incomeType of incomeInfo) {
                questionResults.push({name:'expensesFSSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.amountName +' yearly amount:', inputType:''})
            }
        }  
        
        return {data: this.getExpenseInfo(), questions:questionResults, pageName:'Expenses', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getExpenseInfo(){       

        let result = {
            housing: this.housingItem, 
            food: this.foodItem,
            transport: this.transportItem,
            clothing: this.clothingItem,
            health: this.healthItem,
            children: this.childrenItem,
            miscellaneous: this.miscellaneousItem,
            premiums: this.premiumsItem,
            tax: this.taxItem,
            other: this.otherItem,
            total: this.totalExpensesItem
        }

        return result
    }
    
    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
        this.UpdateStepResultData({step:this.step, data: {expensesFSSurvey: this.getExpenseResults()}})
    }
}
</script>

<style lang="scss">   

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
.childSection {
    border: 2px solid rgba($gov-pale-grey, 0.7);
    border-radius: 18px;
    width: 100%
}
.childAlign {
    padding: 20px;
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
