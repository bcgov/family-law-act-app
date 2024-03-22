<template>
    <div v-if="dataReady">

<!-- <Page 1> -->          

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Part 1 – Income
        </div>

    <!-- <1> --> 
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I am attaching a copy of each of the following documents to my financial statement:
            </div>
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="true?'yes':''" 
                text="my tax return and related schedules for each of the three most recent taxation years; and"/>
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="true?'yes':''" 
                text="any notice of assessment and reassessment issued by the CRA for each of the three most recent taxation years."/> 
        </section>

    <!-- <2> --> 
        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                All of my sources of income and amounts of income per month are as follows:
            </div>
            <div style="text-indent:5px;display:block; font-size: 9pt; font-style: italic;"> 
                Select and complete all that apply. Please use gross amounts (before taxes or deductions)
            </div>
            
            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('employee')?'yes':''" 
                    text="employment income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['employee']?incomeAmounts['employee']:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="19rem" 
                    beforetext="from" 
                    hint="(employer)" 
                    :text="nameofEmployer?nameofEmployer:''"/>
            </div>  

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('EI')?'yes':''" 
                    text="employment insurance benefits of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['EI']?incomeAmounts['EI']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('WCB')?'yes':''" 
                    text="workers compensation benefit of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['WCB']?incomeAmounts['WCB']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('investment')?'yes':''" 
                    text="interest and investment income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['investment']?incomeAmounts['investment']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('pension')?'yes':''" 
                    text="pension income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['pension']?incomeAmounts['pension']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('govAssist')?'yes':''" 
                    text="government assistance income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['govAssist']?incomeAmounts['govAssist']:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="15rem" 
                    beforetext="from" 
                    hint="(sources)" 
                    :text="govSrc?govSrc:''"/>
            </div>  

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('selfEmployed')?'yes':''" 
                    text="self-employment income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['selfEmployed']?incomeAmounts['selfEmployed']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('trust')?'yes':''" 
                    text="trust income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['trust']?incomeAmounts['trust']:''"/>
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('other')?'yes':''" 
                    text="other income of $"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="" 
                    :text="incomeAmounts['other']?incomeAmounts['other']:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="22rem" 
                    beforetext="from" 
                    hint="(sources)" 
                    :text="otherDesc?otherDesc:''"/>
            </div>  

        </section>          
            
    <!-- <3> --> 
        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I am attaching proof of income from all applicable sources, including my:
            </div>
            <div style="text-indent:5px;display:block; font-size: 9pt; font-style: italic;"> 
                Select and attach all that apply.
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('employee')?'yes':''" 
                    text="most recent pay stub or statement of earnings, or a letter from my employer stating my salary and/or wages"/>                
            </div>  

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('EI')?'yes':''" 
                    text="most recent employment insurance benefit statement and record of employment"/>                
            </div> 

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('WCB')?'yes':''" 
                    text="most recent workers compensation benefit statement"/>                
            </div> 

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('investment')?'yes':''" 
                    text="most recent interest and investment statement"/>                
            </div> 

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('pension')?'yes':''" 
                    text="most recent pension income statement"/>                
            </div> 

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('govAssist')?'yes':''" 
                    text="most recent government assistance statement"/>                
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('selfEmployed')?'yes':''" 
                    text="self-employment income for the three most recent taxation years, including:"/>  
                    
                <div style="margin-left: 2.5rem;">
                    (i) the financial statements of my business or professional practice, other than a partnership, and
                </div>
                <div style="margin-left: 2.5rem;">
                    (ii) a statement showing a breakdown of all salaries, wages, management fees or other payments or 
                    benefits paid to, or on behalf of, persons or corporations with whom I do not deal at arm's length
                </div>               
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('partnership')?'yes':''" 
                    text="confirmation of income and draw from, and capital in, a partnership, for the three most recent taxation years"/>                
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="hasCorporation?'yes':''" 
                    text="corporate income for the three most recent taxation years, including:"/>  
                    
                <div style="margin-left: 2.5rem;">
                    (i) the financial statements of the corporation and its subsidiaries, and
                </div>
                <div style="margin-left: 2.5rem;">
                    (ii) a statement showing a breakdown of all salaries, wages, management 
                    fees or other payments or benefits paid to, or on behalf of, persons or 
                    corporations with whom the corporation, and every related corporation, 
                    does not deal at arms' length
                </div>               
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('trust')?'yes':''" 
                    text="trust settlement agreement and the trust's three most recent financial statements"/>                
            </div>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="incomeTypes.includes('other')?'yes':''" 
                    text="other (specify)"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="33.5rem" 
                    beforetext="" 
                    hint="" 
                    :text="(incomeTypes.includes('other') && otherProofOfIncome)?otherProofOfIncome:''"/>
            </div>

        </section>    
        
        <div class="print-block">
    <!-- <4> -->    
            <section> 
                
                <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                    Income Summary:
                </div>
                <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
                    Use gross annual amounts (before taxes or deductions) except where the word "net" appears
                </div>
                
                <table class="fullsize">
                    <tr style="border:1px solid #414142; font-weight: 700;" >
                        <td colspan="12">Total income before adjustments</td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">1</td>
                        <td colspan="12" style="border:1px solid #414142; font-style: italic; padding: 0.5rem;">
                            My <b>total annual income</b> (If your total income of your most recent federal income tax return sets out what
                            you expect your income to be for this year, record that amount. Otherwise, record what you expect your
                            total income for this year to be from all sources of income that apply to you.)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ totalIncome }} </div> </td>
                    </tr>
                    <tr style="border:1px solid #414142; font-weight: 700;" >
                        <td colspan="12">Adjustments to total income in accordance with Schedule III of the Child Support Guidelines</td>
                    </tr>
                    <tr style="border:1px solid #414142" >
                        <td colspan="12"><b>Deductions</b> (use annual amounts)</td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">2</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Taxable child support received
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[2] }} </div> </td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">3</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Spousal support received
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[3] }} </div> </td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">4</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Universal child care benefit (UCCB) lump-sum payment
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[4] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">5</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Split-pension amount
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[5] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">6</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Employment expenses
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[6] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">7</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Social assistance received for other members of your household
                        </td>
                        <td colspan="2">$<div class="answer"> </div> {{ deduction[7] }} </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">8</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Excess portion of dividends from taxable Canadian corporations
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[8] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">9</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Actual business investment losses
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[9] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">10</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Carrying charges
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[10] }}</div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">11</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Partnership or sole proprietorship income required to use for capital in the partnership/proprietorship
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[11] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">12</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            <b>Total deductions from income</b> (add lines 2 through 11)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ deduction[12] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142" >
                        <td colspan="12"><b>Additions</b> (use annual amount)</td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">13</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Offset of capital gains and capital losses (if zero or less, indicate “0” in this line)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ addition[13] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">14</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Payments made from self-employment income including wages to non-arm's 
                            length parties except for the portion that is necessary to earn 
                            self-employment income
                        </td>
                        <td colspan="2">$<div class="answer"> {{ addition[14] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">15</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Capital cost allowance for property
                        </td>
                        <td colspan="2">$<div class="answer"> {{ addition[15] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">16</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Value of exercised employee stock options with Canadian-controlled private corporation
                        </td>
                        <td colspan="2">$<div class="answer"> {{ addition[16] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">17</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            <b>Total additions to income</b> (add lines 13 through 16)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ addition[17] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">18</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            <b>Annual income for child support purposes</b> (line 1 minus line 12 plus line 17)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ childSupportFund }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">19</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Add Any benefit paid to you for a child for whom special or extraordinary expenses 
                            are being requested, that is not included in the income on line 18
                        </td>
                        <td colspan="2">$<div class="answer"> {{ extraExpenses[19] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">20</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Add Spousal support received from other party (if any)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ extraExpenses[20] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">21</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Subtract Spousal support paid to other party (if any)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ extraExpenses[21] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">22</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Annual income for special or extraordinary expenses 
                            (line 18 plus lines 19 and 20 minus line 21)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ extraExpenses[22] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142" >
                        <td colspan="15"><b>Other additions to income for spousal support</b> 
                            (complete only if there is an application for spousal support)
                        </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">23</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Total child support recieved
                        </td>
                        <td colspan="2">$<div class="answer"> {{ spouseExpenses[23] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">24</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Social assistance received for other members of your household
                        </td>
                        <td colspan="2">$<div class="answer"> {{ spouseExpenses[24] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">25</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            Any government benefit received for a child that is not included in the income on line 18
                        </td>
                        <td colspan="2">$<div class="answer"> {{ spouseExpenses[25] }} </div> </td>
                    </tr>

                    <tr style="border:1px solid #414142">          
                        <td style="border:1px solid #414142; text-align: center;" colspan="1">26</td>
                        <td colspan="12" style="border:1px solid #414142; padding: 0.5rem;">
                            <b>Annual income for spousal support purposes</b> (line 18 plus lines 23 through 25)
                        </td>
                        <td colspan="2">$<div class="answer"> {{ spouseExpenses[26] }}</div> </td>
                    </tr>
                
                </table>

            </section>        
            
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
import { disclosureInformationFSDataInfoType, incomeInformationDataInfoType, incomeSummaryFSDataInfoType } from '@/types/Application/FinancialStatement';

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

    govSrc = '';   
    nameofEmployer = '';
    otherDesc = '';
    incomeTypes = [];
    incomeAmounts = {};
    otherProofOfIncome = '';
    hasCorporation = false;   

    totalIncome = 0;
    deduction = {};
    addition = {};
    childSupportFund = 0;
    extraExpenses = {};
    spouseExpenses = {};
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getIncomeInfo();  
        this.getIncomeProofInfo();          
        this.getSummaryInfo();
    } 

    public getIncomeInfo(){    
        
        this.govSrc = '';   
        this.nameofEmployer = '';
        this.otherDesc = '';
        this.incomeTypes = [];
        this.incomeAmounts = {};

        if (this.result?.incomeInformationSurvey) {

            const incomeInfo: incomeInformationDataInfoType = this.result.incomeInformationSurvey;
            this.govSrc = '';
            this.nameofEmployer = '';
            this.otherDesc = '';

            const incomeData = incomeInfo.incomeAmounts;
            for(const incomeType of incomeData) {
                if(incomeType.income){
                    this.incomeTypes.push(incomeType.incomeName);
                    this.incomeAmounts[incomeType.incomeName]=incomeType.monthlyAmount;
                    if(incomeType.incomeName == 'employee'){
                        this.nameofEmployer = incomeInfo.nameOfEmployer?incomeInfo.nameOfEmployer:'';
                    } else if(incomeType.incomeName == 'govAssist'){
                        this.govSrc = incomeInfo.govSource?incomeInfo.govSource:'';
                    } else if(incomeType.incomeName == 'other'){
                        this.otherDesc = incomeInfo.otherDesc?incomeInfo.otherDesc:'';
                    }
                }
                    
            }

        }
    }

    public getIncomeProofInfo(){    
        
        this.otherProofOfIncome = '';
        this.hasCorporation = false;

        if (this.result?.disclosureInformationFSSurvey) {
            const disInfo: disclosureInformationFSDataInfoType = this.result.disclosureInformationFSSurvey;
            this.hasCorporation = disInfo.corporation && disInfo.corporation == 'Yes';
            this.otherProofOfIncome = disInfo.otherIncomeProofDocs?disInfo.otherIncomeProofDocs:'';
        }
    }

    public getSummaryInfo(){ 

        this.totalIncome = 0;
        this.deduction = {};
        this.addition = {};
        this.childSupportFund = 0;
        this.extraExpenses = {};
        this.spouseExpenses = {};  

        let extraExpense = false;
        let spouseSupport = false; 
        
        if(this.result?.financialStatementSurvey){

            const fsInfo = this.result.financialStatementSurvey;
            extraExpense = (fsInfo.childAppExists?fsInfo.childAppExists=='y': false) && fsInfo.situationType.includes("There is a claim for section 7 special or extraordinary expenses");
            spouseSupport = fsInfo.spousalAppExists?fsInfo.spousalAppExists=='y': false;
        }        

        if (this.result?.incomeSummaryFSSurvey) {
            const summaryInfo: incomeSummaryFSDataInfoType = this.result.incomeSummaryFSSurvey;
            
            if(summaryInfo.totalIncome && summaryInfo.totalIncome.length>0){
                this.totalIncome = summaryInfo.totalIncome[0]?.yearlyAmount?summaryInfo.totalIncome[0].yearlyAmount:0;
            }
            
            if(summaryInfo.deduction && summaryInfo.deduction.length>0){
                for(const deduction of summaryInfo.deduction) {
                    if(deduction.lineNumber && deduction.yearlyAmount){                       
                        this.deduction[deduction.lineNumber] = deduction.yearlyAmount;                        
                    }                    
                }
            }

            if(summaryInfo.addition && summaryInfo.addition.length>0){
                for(const addition of summaryInfo.addition) {
                    if(addition.lineNumber && addition.yearlyAmount){                       
                        this.addition[addition.lineNumber] = addition.yearlyAmount;                        
                    }                    
                }
            }

            if(summaryInfo.childSupportFund && summaryInfo.childSupportFund.length>0){
                this.childSupportFund = summaryInfo.childSupportFund[0].yearlyAmount;
            }            

            if(extraExpense && summaryInfo.extraExpenses && summaryInfo.extraExpenses.length>0){
                for(const extraExpense of summaryInfo.extraExpenses) {
                    if(extraExpense.lineNumber && extraExpense.yearlyAmount){                       
                        this.extraExpenses[extraExpense.lineNumber] = extraExpense.yearlyAmount;                        
                    }                    
                }
            }

            if(spouseSupport && summaryInfo.spouseExpenses && summaryInfo.spouseExpenses.length>0){
                for(const spouseExpense of summaryInfo.spouseExpenses) {
                    if(spouseExpense.lineNumber && spouseExpense.yearlyAmount){                       
                        this.spouseExpenses[spouseExpense.lineNumber] = spouseExpense.yearlyAmount;                        
                    }                    
                }
            }
        }   
    }  
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
