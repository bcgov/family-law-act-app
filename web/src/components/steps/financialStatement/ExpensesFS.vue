<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">

        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Expenses</h4>                   
                    
                    <p>
                        An expense is the amount of money <b>you</b> spend on something.
                    </p>

                    <div>
                        <div class="question">
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
                            :key="housingTableKey"
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

                    <!-- food -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Food & Household Supplies
                        </b-row>                        
                        <b-table
                            :key="foodTableKey"
                            :items="foodItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('food', true, data)"                                    
                                                v-model="foodItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('food', false, data)"                                    
                                                v-model="foodItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">                                    
                                    <div v-if="data.value == 'Household supplies'" class="item-rows">
                                        <p>
                                            Household supplies such as cleaning supplies, lightbulbs, 
                                            batteries, toilet paper and laundry detergent
                                        </p>
                                    </div> 
                                    <div v-else class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- transportation -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Transportation
                        </b-row>                        
                        <b-table
                            :key="transportTableKey"
                            :items="transportItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('transport', true, data)"                                    
                                                v-model="transportItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('transport', false, data)"                                    
                                                v-model="transportItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- clothing -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Clothing & Self-care
                        </b-row>                        
                        <b-table
                            :key="clothingTableKey"
                            :items="clothingItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('clothing', true, data)"                                    
                                                v-model="clothingItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('clothing', false, data)"                                    
                                                v-model="clothingItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- health -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Health & Medical
                        </b-row>                        
                        <b-table
                            :key="healthTableKey"
                            :items="healthItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('health', true, data)"                                    
                                                v-model="healthItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('health', false, data)"                                    
                                                v-model="healthItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- children -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Children
                        </b-row>                        
                        <b-table
                            :key="childrenTableKey"
                            :items="childrenItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('children', true, data)"                                    
                                                v-model="childrenItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('children', false, data)"                                    
                                                v-model="childrenItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- miscellaneous -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Miscellaneous/Other
                        </b-row>                        
                        <b-table
                            :key="miscellaneousTableKey"
                            :items="miscellaneousItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('miscellaneous', true, data)"                                    
                                                v-model="miscellaneousItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('miscellaneous', false, data)"                                    
                                                v-model="miscellaneousItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- premiums -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Premiums, Contributions and Debt Repayment
                        </b-row>                        
                        <b-table
                            :key="premiumsTableKey"    
                            :items="premiumsItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('premiums', true, data)"                                    
                                                v-model="premiumsItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('premiums', false, data)"                                    
                                                v-model="premiumsItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- tax -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Reserve for income tax
                        </b-row>                        
                        <b-table
                            :key="taxTableKey"    
                            :items="taxItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('tax', true, data)"                                    
                                                v-model="taxItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('tax', false, data)"                                    
                                                v-model="taxItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div class="item-rows">
                                        {{ data.value }}
                                    </div>                               
                                </template>
                        </b-table>                       
                    </div>

                    <!-- other -->
                    <div>
                        <b-row class="bg-warning ml-0 text-white pl-2" style="width: 100%; font-weight: 700;">
                            Other
                        </b-row>                        
                        <b-table
                            :key="otherTableKey"
                            :items="otherItem"
                            :fields="expenseFields"                   
                            small                    
                            bordered>
                                <template v-slot:cell(yearlyAmount)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label class="dollar-label">$</label>
                                            <b-form-input 
                                                style="float:left;margin-left:0.1rem;width:85%;"
                                                @change="inputValueChanged('other', true, data)"                                    
                                                v-model="otherItem[data.index][data.field.key]"
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
                                                @change="inputValueChanged('other', false, data)"                                    
                                                v-model="otherItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                
                                </template>
                                <template v-slot:cell(amountName)="data">
                                    <div style="text-align:left;font-size:12pt;color:#000">
                                        <b-form>
                                            <label style="float:left;margin:0.5rem 0.5rem; font-weight: 700;">
                                                <i>{{ data.value }}</i>
                                            </label>
                                            <b-form-textarea
                                                style="float:left;margin-left:0.3rem; width:85% !important;"                                                                                    
                                                v-model="otherDesc">
                                            </b-form-textarea>
                                        </b-form>
                                    </div>                                    
                                </template>
                        </b-table>                       
                    </div> 

                    <!-- total -->
                    <div>
                        <b-row class="bg-primary ml-0 text-primary pl-2" style="width: 100%; font-weight: 700;">
                            Total Expenses
                        </b-row>                        
                        <b-table
                            :key="tableKey"
                            :items="totalExpensesItem"
                            :fields="expenseFields"                                                        
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
                                <template v-slot:cell(monthlyAmount)="data">
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
                                    <div class="total-rows">
                                        {{ data.value }}
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
    housingTableKey = 0;
    foodTableKey = 0;
    transportTableKey = 0;
    clothingTableKey = 0;
    healthTableKey = 0;
    childrenTableKey = 0;
    miscellaneousTableKey = 0;
    premiumsTableKey = 0;
    taxTableKey = 0;
    otherTableKey = 0;

    otherDesc = "";

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
        {amountName: "amount of income tax you pay",  monthlyAmount: 0,   yearlyAmount: 0}
    ];

    otherItem = [
        {amountName: "Specify:",  monthlyAmount: 0,   yearlyAmount: 0}
    ];
    
    totalExpensesItem = [
        {amountName: "Total",  monthlyAmount: 0,   yearlyAmount: 0}
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

            this.otherDesc = expenseData.otherDesc?expenseData.otherDesc:''; 
            
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
            this.housingTableKey++
        
        } else if(tableName == 'food'){
            if(amountType)
                this.foodItem[data.index].monthlyAmount = this.foodItem[data.index].yearlyAmount/12;
            else
                this.foodItem[data.index].yearlyAmount = 12 * this.foodItem[data.index].monthlyAmount;        
            this.foodTableKey++
        
        } else if(tableName == 'transport'){
            if(amountType)
                this.transportItem[data.index].monthlyAmount = this.transportItem[data.index].yearlyAmount/12;
            else
                this.transportItem[data.index].yearlyAmount = 12 * this.transportItem[data.index].monthlyAmount;        
            this.transportTableKey++
        
        } else if(tableName == 'clothing'){
            if(amountType)
                this.clothingItem[data.index].monthlyAmount = this.clothingItem[data.index].yearlyAmount/12;
            else
                this.clothingItem[data.index].yearlyAmount = 12 * this.clothingItem[data.index].monthlyAmount;        
            this.clothingTableKey++
        
        } else if(tableName == 'health'){
            if(amountType)
                this.healthItem[data.index].monthlyAmount = this.healthItem[data.index].yearlyAmount/12;
            else
                this.healthItem[data.index].yearlyAmount = 12 * this.healthItem[data.index].monthlyAmount;        
            this.healthTableKey++
        
        } else if(tableName == 'children'){
            if(amountType)
                this.childrenItem[data.index].monthlyAmount = this.childrenItem[data.index].yearlyAmount/12;
            else
                this.childrenItem[data.index].yearlyAmount = 12 * this.childrenItem[data.index].monthlyAmount;        
            this.childrenTableKey++
        
        } else if(tableName == 'miscellaneous'){
            if(amountType)
                this.miscellaneousItem[data.index].monthlyAmount = this.miscellaneousItem[data.index].yearlyAmount/12;
            else
                this.miscellaneousItem[data.index].yearlyAmount = 12 * this.miscellaneousItem[data.index].monthlyAmount;        
            this.miscellaneousTableKey++
        
        } else if(tableName == 'premiums'){
            if(amountType)
                this.premiumsItem[data.index].monthlyAmount = this.premiumsItem[data.index].yearlyAmount/12;
            else
                this.premiumsItem[data.index].yearlyAmount = 12 * this.premiumsItem[data.index].monthlyAmount;        
            this.premiumsTableKey++
        
        } else if(tableName == 'tax'){
            if(amountType)
                this.taxItem[data.index].monthlyAmount = this.taxItem[data.index].yearlyAmount/12;
            else
                this.taxItem[data.index].yearlyAmount = 12 * this.taxItem[data.index].monthlyAmount;        
            this.taxTableKey++
        
        } else if(tableName == 'other'){
            if(amountType)
                this.otherItem[data.index].monthlyAmount = this.otherItem[data.index].yearlyAmount/12;
            else
                this.otherItem[data.index].yearlyAmount = 12 * this.otherItem[data.index].monthlyAmount;        
            this.otherTableKey++
        
        }

        const totalMonthlyHousing = this.housingItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyHousing = this.housingItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyFood = this.foodItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyFood = this.foodItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyTransport = this.transportItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyTransport = this.transportItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyClothing = this.clothingItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyClothing = this.clothingItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyHealth = this.healthItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyHealth = this.healthItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyChildren = this.childrenItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyChildren = this.childrenItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyMiscellaneous = this.miscellaneousItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyMiscellaneous = this.miscellaneousItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyPremiums = this.premiumsItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyPremiums = this.premiumsItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyTax = this.taxItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyTax = this.taxItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);

        const totalMonthlyOther = this.otherItem.reduce((sum, amount) => sum + Number(amount.monthlyAmount), 0);
        const totalYearlyOther = this.otherItem.reduce((sum, amount) => sum + Number(amount.yearlyAmount), 0);
       
        this.totalExpensesItem[0].monthlyAmount = totalMonthlyHousing + totalMonthlyFood + totalMonthlyTransport
                                                    + totalMonthlyClothing + totalMonthlyHealth + totalMonthlyChildren
                                                    + totalMonthlyMiscellaneous + totalMonthlyPremiums + totalMonthlyTax
                                                    + totalMonthlyOther;
        this.totalExpensesItem[0].yearlyAmount = totalYearlyHousing + totalYearlyFood + totalYearlyTransport
                                                    + totalYearlyClothing + totalYearlyHealth + totalYearlyChildren
                                                    + totalYearlyMiscellaneous + totalYearlyPremiums + totalYearlyTax
                                                    + totalYearlyOther;
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
            total: this.totalExpensesItem,
            otherDesc: this.otherDesc
        }

        return result;
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