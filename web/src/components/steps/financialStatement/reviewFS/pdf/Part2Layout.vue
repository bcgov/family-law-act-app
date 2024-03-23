<template>
    <div v-if="dataReady">

<!-- <Page 1> -->  
    <div class="print-block">        

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Part 2 – Personal expenses and debts
        </div>

        <div style="display:block;font-weight: 700; margin-top: 0.25rem;"> 
            Expenses
        </div>    
            
        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            An expense is the amount of money you spend on something.
        </div>
        <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
            Estimate how much you pay in a month and a year for each of the expenses 
            listed below. Note: You may be asked to provide the court with proof of 
            an amount or a breakdown of how you came to the estimate.
        </div>
        
        <table class="fullsize">
            <tr style="border:1px solid #414142; font-weight: 700;" >
                <td colspan="12" style="border:1px solid #414142;">Expenses</td>
                <td colspan="2" style="border:1px solid #414142;">Monthly</td>
                <td colspan="2" style="border:1px solid #414142;">Yearly</td>
            </tr>
            <tr style="border:1px solid #414142; padding:0 !important;">
                <td colspan="12" style="padding: 0;">
                    <table class="fullsize" style="padding:0 !important; margin:0 !important;">
                        <tr style="font-weight: 700;padding: 0 !important;margin:0 !important;" >
                            <td colspan="12" style="border:1px solid #414142;">Housing</td>
                            <td colspan="2" style="border:1px solid #414142;">Monthly</td>
                            <td colspan="2" style="border:1px solid #414142;">Yearly</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Rent/mortgage
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Rent/mortgage'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Rent/mortgage'].yearlyAmount }}</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Property taxes and strata fees
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Property taxes and strata fees'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Property taxes and strata fees'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Utilities
                                Include electricity, gas, water, waste, home phone, and
                                internet
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Utilities'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Utilities'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Homeowner/renter’s Insurance
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Homeowner/renter’s insurance'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Homeowner/renter’s insurance'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Home maintenance and repair
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Home maintenance and repair'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Home maintenance and repair'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Other'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Other'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Housing Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Total'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Total'].yearlyAmount }}</td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Total'].monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ housing['Total'].yearlyAmount }}</td>
                
            </tr>

            <tr style="border:1px solid #414142; padding:0 !important;">
                <td colspan="12" style="padding: 0;">
                    <table class="fullsize" style="padding:0 !important; margin:0 !important;">
                        <tr style="font-weight: 700;padding: 0 !important;margin:0 !important;" >
                            <td colspan="12" style="border:1px solid #414142;">Food & Household supplies</td>
                            <td colspan="2" style="border:1px solid #414142;">Monthly</td>
                            <td colspan="2" style="border:1px solid #414142;">Yearly</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Groceries
                            </td>
                            
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Groceries'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Groceries'].yearlyAmount }}</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Eating out
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Eating out'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Eating out'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Household supplies such as cleaning supplies, lightbulbs,
                                batteries, toilet paper and laundry detergent
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Household supplies'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Household supplies'].yearlyAmount }}</td>
                        </tr>                        

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Other'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Other'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Food & Household supplies Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Total'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ food['Total'].yearlyAmount }}</td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ food['Total'].monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ food['Total'].yearlyAmount }}</td>
                
            </tr>

            <tr style="border:1px solid #414142; padding:0 !important;">
                <td colspan="12" style="padding: 0;">
                    <table class="fullsize" style="padding:0 !important; margin:0 !important;">
                        <tr style="font-weight: 700;padding: 0 !important;margin:0 !important;" >
                            <td colspan="12" style="border:1px solid #414142;">Transportation</td>
                            <td colspan="2" style="border:1px solid #414142;">Monthly</td>
                            <td colspan="2" style="border:1px solid #414142;">Yearly</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Car Insurance and car loan payments
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Car insurance and car loan payments'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Car insurance and car loan payments'].yearlyAmount }}</td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Fuel
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Fuel'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Fuel'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Maintenance and repairs
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Maintenance and repairs'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Maintenance and repairs'].yearlyAmount }}</td>
                        </tr>   
                        
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Public Transit, taxis and parking
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Public transit, taxis and parking'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Public transit, taxis and parking'].yearlyAmount }}</td>
                        </tr>  

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Other'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Other'].yearlyAmount }}</td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Transportation Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Total'].monthlyAmount }}</td>
                            <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Total'].yearlyAmount }}</td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Total'].monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ transport['Total'].yearlyAmount }}</td>
                
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Clothing & Self-care</b><br>
                    Include clothing, hair dresser/barber and cosmetics                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ clothing.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ clothing.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Health & Medical</b><br>
                    Include regular dental care, orthodontics, medicine, eye glasses or contact lenses                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ health.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ health.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Children</b><br>
                    Include school activities, extracurricular activities, tuition/school fees, camps, babysitting,
                    allowances and daycare                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ children.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ children.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Miscellaneous/Other</b><br>
                    Include gifts & donations, alcohol, tobacco & cannabis, entertainment & recreation, cell phone,
                    cable, subscription services, pet expenses and vacations                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ miscellaneous.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ miscellaneous.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Premiums, Contributions and Debt Repayment</b><br>
                    Include life or term insurance premiums, RRSP or other contributions, debt repayment
                    (for expenses not itemized above)               
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ premiums.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ premiums.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142; font-weight: 700;">
                    Other <i>(specify):</i> <div class="answer"> {{ otherDesc }} </div>              
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ other.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ other.yearlyAmount }}</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                    Total               
                </td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ totalExpenses.monthlyAmount }}</td>
                <td colspan="2" style="border:1px solid #414142;">$ {{ totalExpenses.yearlyAmount }}</td>
            </tr>
        
        </table>
        
    </div>

    <div class="print-block">

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Debts
        </div>
            
        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            A debt is an amount of money you owe someone that you have a duty to pay.
        </div>
        <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
            Identify any outstanding debts. Do NOT record the monthly payment for 
            mortgage, car loans, credit card payments or other debts included 
            in the expenses section above, just the total balance owing.
        </div>
        
        <table class="fullsize">
            <tr style="border:1px solid #414142;" >
                <td colspan="7" style="border:1px solid #414142;">
                    <b>Name of creditor</b><br>
                    <i>(name of bank, finance company, person, etc)</i>
                </td>
                <td colspan="7" style="border:1px solid #414142;">
                    <b>Reason for borrowing</b><br>
                    <i>(for example, mortgage, car loan, school)</i>
                </td>
                <td colspan="2" style="border:1px solid #414142; font-weight: 700;">Balance owing</td>
            </tr> 

            <tr v-for="(debtItem,inx) in debt" :key="inx" style="border:1px solid #414142;" >
                <td colspan="7" style="border:1px solid #414142;">
                    <div class="answer">{{debtItem.creditor}}</div>                    
                </td>
                <td colspan="7" style="border:1px solid #414142;">
                    <div class="answer">{{debtItem.reason}}</div>
                   
                </td>
                <td colspan="2" style="border:1px solid #414142;">
                    $ <div class="answer">{{debtItem.balanceOwing}}</div>
                </td>
            </tr>
            
            <tr style="border:1px solid #414142;" >
                <td colspan="14" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                    Total               
                </td>
                
                <td colspan="2" style="border:1px solid #414142;">$ {{ totalDebt }}</td>
            </tr>
        
        </table>
            
        </div>

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
import { expensesFSDataInfoType } from '@/types/Application/FinancialStatement';

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

    housing = {}; 
    food = {};
    transport = {};
    clothing = {};
    health = {};
    children = {};
    miscellaneous = {};
    premiums = {};
    tax = {};
    other = {};
    totalExpenses = {};
    otherDesc = '';

    debt = [];
    totalDebt = 0;
    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getExpenseInfo();  
        this.getDebtInfo();
    } 

    public getExpenseInfo(){    
        
        this.housing = {
            'Rent/mortgage': {},
            'Property taxes and strata fees': {},
            'Utilities': {},
            'Homeowner/renter’s insurance': {},
            'Home maintenance and repair': {},
            'Other': {},
            'Total': {}
        };
        this.food = {
            'Groceries': {},
            'Eating out': {},
            'Household supplies': {},
            'Other': {},
            'Total': {}
        };
        this.transport = {
            'Car insurance and car loan payments': {},
            'Fuel': {},
            'Maintenance and repairs': {},
            'Public transit, taxis and parking': {},
            'Other': {},
            'Total': {}
        };
        this.clothing = {};
        this.health = {};
        this.children = {};
        this.miscellaneous = {};
        this.premiums = {};
        this.tax = {};
        this.other = {};
        this.totalExpenses = {};
        this.otherDesc = '';

        if (this.result?.expensesFSSurvey) {
            const expenseInfo: expensesFSDataInfoType = this.result.expensesFSSurvey;

            this.otherDesc = expenseInfo.otherDesc?expenseInfo.otherDesc:'';
            
            if(expenseInfo.children && expenseInfo.children.length>0){
                this.children = { 
                    yearlyAmount: expenseInfo.children[0]?.yearlyAmount?expenseInfo.children[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.children[0]?.monthlyAmount?expenseInfo.children[0].monthlyAmount:0
                }
            }

            if(expenseInfo.clothing && expenseInfo.clothing.length>0){
                this.clothing = { 
                    yearlyAmount: expenseInfo.clothing[0]?.yearlyAmount?expenseInfo.clothing[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.clothing[0]?.monthlyAmount?expenseInfo.clothing[0].monthlyAmount:0
                }
            }            
            
            if(expenseInfo.food && expenseInfo.food.length>0){
                let monthTotal = 0;
                for(const food of expenseInfo.food) {                    
                    if(food.amountName){                       
                        this.food[food.amountName] = {
                            monthlyAmount: food.monthlyAmount?food.monthlyAmount:0,
                            yearlyAmount: food.yearlyAmount?food.yearlyAmount:0
                        };
                        monthTotal = monthTotal + Number(food.monthlyAmount);                       
                    }                    
                }
                this.food['Total'] = {
                    monthlyAmount: monthTotal,
                    yearlyAmount: monthTotal * 12
                };

            }

            if(expenseInfo.health && expenseInfo.health.length>0){
                this.health = { 
                    yearlyAmount: expenseInfo.health[0]?.yearlyAmount?expenseInfo.health[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.health[0]?.monthlyAmount?expenseInfo.health[0].monthlyAmount:0
                }
            }  

            if(expenseInfo.housing && expenseInfo.housing.length>0){
                let monthTotal = 0;
                for(const housing of expenseInfo.housing) {                    
                    if(housing.amountName){                       
                        this.housing[housing.amountName] = {
                            monthlyAmount: housing.monthlyAmount?housing.monthlyAmount:0,
                            yearlyAmount: housing.yearlyAmount?housing.yearlyAmount:0
                        };
                        monthTotal = monthTotal + Number(housing.monthlyAmount);                       
                    }                    
                }
                this.housing['Total'] = {
                    monthlyAmount: monthTotal,
                    yearlyAmount: monthTotal * 12
                };

            }

            if(expenseInfo.miscellaneous && expenseInfo.miscellaneous.length>0){
                this.miscellaneous = { 
                    yearlyAmount: expenseInfo.miscellaneous[0]?.yearlyAmount?expenseInfo.miscellaneous[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.miscellaneous[0]?.monthlyAmount?expenseInfo.miscellaneous[0].monthlyAmount:0
                }
            } 

            if(expenseInfo.other && expenseInfo.other.length>0){
                this.other = { 
                    yearlyAmount: expenseInfo.other[0]?.yearlyAmount?expenseInfo.other[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.other[0]?.monthlyAmount?expenseInfo.other[0].monthlyAmount:0
                }
            } 

            if(expenseInfo.premiums && expenseInfo.premiums.length>0){
                this.premiums = { 
                    yearlyAmount: expenseInfo.premiums[0]?.yearlyAmount?expenseInfo.premiums[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.premiums[0]?.monthlyAmount?expenseInfo.premiums[0].monthlyAmount:0
                }
            } 

            if(expenseInfo.tax && expenseInfo.tax.length>0){
                this.tax = { 
                    yearlyAmount: expenseInfo.tax[0]?.yearlyAmount?expenseInfo.tax[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.tax[0]?.monthlyAmount?expenseInfo.tax[0].monthlyAmount:0
                }
            }

            if(expenseInfo.total && expenseInfo.total.length>0){
                this.totalExpenses = { 
                    yearlyAmount: expenseInfo.total[0]?.yearlyAmount?expenseInfo.total[0].yearlyAmount:0,
                    monthlyAmount: expenseInfo.total[0]?.monthlyAmount?expenseInfo.total[0].monthlyAmount:0
                }
            }

            if(expenseInfo.transport && expenseInfo.transport.length>0){
                let monthTotal = 0;
                for(const transport of expenseInfo.transport) {                    
                    if(transport.amountName){                       
                        this.transport[transport.amountName] = {
                            monthlyAmount: transport.monthlyAmount?transport.monthlyAmount:0,
                            yearlyAmount: transport.yearlyAmount?transport.yearlyAmount:0
                        };
                        monthTotal = monthTotal + Number(transport.monthlyAmount);                       
                    }                    
                }
                this.transport['Total'] = {
                    monthlyAmount: monthTotal,
                    yearlyAmount: monthTotal * 12
                };
            }
        }
    }

    public getDebtInfo(){ 

        const emptyDebt = {
            creditor:'',
            reason:'',
            balanceOwing: ''
        };

        this.debt = [];    
        this.totalDebt = 0;   
        
        if(this.result?.debtsFSSurvey){  
            let totalDebtAmount = 0;          

            for(const debtSurvey of this.result.debtsFSSurvey){
                let debtInfo = {
                    creditor: debtSurvey.creditorName?debtSurvey.creditorName:'',
                    reason: debtSurvey.reasonForBorrowing?debtSurvey.reasonForBorrowing:'',
                    balanceOwing: debtSurvey.balanceOwing?debtSurvey.balanceOwing:0
                };
                this.debt.push(debtInfo);
                totalDebtAmount = totalDebtAmount + Number(debtInfo.balanceOwing);                
            } 

            this.totalDebt = totalDebtAmount;
        }

        if(this.debt.length == 0){
            this.debt.push(emptyDebt);
        }            
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
