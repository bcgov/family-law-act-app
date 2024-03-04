<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">

        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Income Information</h1>
                    <p>
                        It can be hard to calculate the income used to decide the amount of 
                        child support or spousal support, especially if you are self-employed, 
                        your income isn’t stable, or you have many sources of income. 
                    </p>
                    <p>
                        As a general rule, to calculate income for support, you must identify 
                        the amounts related to the sources of income used to calculate your 
                        “Total income” of the T1 General Form issued by the 
                        <a href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/reporting-income.html"
                            target="_blank">Canada Revenue Agency</a>.
                    </p>
                    <p>
                        To complete this part, you will be asked to provide details about 
                        all your sources of income and many deductions from your income 
                        that you will find on your T1 Federal Tax Return if you have 
                        filed your taxes.
                    </p>

                    <h2>Sources of Income</h2>
                   

                    <div>
                        <div style="color:#556077; font-size:1.40em; font-weight:bold;">
                            Select each source of income you have and provide the amount 
                            of income for each source.
                        </div>
                        <p>
                            The form records a <b>monthly</b> amount. You may choose to provide 
                            either a monthly amount or annual amount here and this service 
                            will calculate the monthly amount for you.
                        </p>
                        <p>
                            Please use <b>gross amounts</b> (before taxes or deductions).
                        </p>
                            
                    </div>

                    <div>
                        <b-table
                            :key="tableKey"
                            :items="incomeInformationItem"
                            :fields="incomeInformationFields"
                            class="mt-2"
                            small                    
                            bordered>
                                <template v-slot:cell()="data">                                    
                                    <div v-if="data.field.key == 'income'" style="text-align:left;font-size:12pt;color:#000;">                            
                                        <b-form>                                            
                                            <b-form-checkbox 
                                                style="float:left;margin-left:0.3rem;width:90%;"
                                                @change="incomeTypeChanged(data)"
                                                v-model="incomeInformationItem[data.index][data.field.key]">
                                            </b-form-checkbox>
                                        </b-form>
                                    </div>
                                    <div v-else-if="data.field.key == 'yearlyAmount'" style="text-align:left;font-size:12pt;color:#000">                            
                                        <b-form>
                                            <label style="float:left;margin:0.5rem 0;">$</label>
                                            <b-form-input 
                                                :disabled="!data.item.income"
                                                style="float:left;margin-left:0.1rem;width:90%;"
                                                @change="inputYearlyValueChanged(data)"                                    
                                                v-model="incomeInformationItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>    
                                    <div v-else-if="data.field.key == 'monthlyAmount'" style="text-align:left;font-size:12pt;color:#000;">                            
                                        <b-form>
                                            <label style="float:left;margin:0.5rem 0;">$</label>
                                            <b-form-input
                                                :disabled="!data.item.income"    
                                                style="float:left;margin-left:0.1rem;width:90%;"
                                                @change="inputMonthlyValueChanged(data)"                                    
                                                v-model="incomeInformationItem[data.index][data.field.key]"
                                                type="number">
                                            </b-form-input>
                                        </b-form>
                                    </div>                                       
                                </template>
                                <template v-slot:cell(incomeName)="data">                            
                                    <div v-if="data.value=='employee'" style="text-align:left;font-size:12pt;" >
                                        <b>I am an employee</b>
                                        <b-form>
                                            <label style="float:left;margin:0.5rem 0;">
                                                Employment income from (Name of employer:
                                            </label>
                                            <b-form-input 
                                                :disabled="!data.item.income"    
                                                style="float:left;margin-left:0.3rem;width:90%;"                                                                                    
                                                v-model="nameOfEmployer">
                                            </b-form-input>
                                            <label style="float:left;margin:0.5rem 0;">
                                                )
                                            </label>
                                        </b-form>
                                    </div>
                                    <div v-else-if="data.value=='EI'" style="text-align:left;font-size:12pt;" >
                                        <b>I am receiving Employment Insurance (EI) benefits</b>
                                        <p>Employment insurance benefits</p>
                                    </div>
                                    <div v-else-if="data.value=='WCB'" style="text-align:left;font-size:12pt;" >
                                        <b>I am receiving Worker’s Compensation benefits</b>
                                        <p>Worker’s compensation benefits</p>
                                    </div>
                                    <div v-else-if="data.value=='investment'" style="text-align:left;font-size:12pt;" >
                                        <b>I am receiving interest or investment income:</b>
                                        <p>Interest and investment income</p>
                                    </div>
                                    <div v-else-if="data.value=='pension'" style="text-align:left;font-size:12pt;" >
                                        <b>I am receiving a pension</b>
                                        including Old Age Security, CPP, disability, superannuation and other pensions
                                        <p>Pension income</p>
                                    </div>
                                    <div v-else-if="data.value=='govAssist'" style="text-align:left;font-size:12pt;" >
                                        <b>I am receiving government assistance</b>
                                        <b-form style="display:block;">
                                            <label style="float:left;margin:0.5rem 0;">
                                                Government assistance income from (Source:
                                            </label>
                                            <b-form-input 
                                                :disabled="!data.item.income"    
                                                style="float:left;margin-left:0.3rem;width:90%;"                                                                                    
                                                v-model="govSource">
                                            </b-form-input>                                            
                                        </b-form>
                                        
                                        <label style="float:left;margin:0.5rem 0;">
                                                )
                                        </label>
                                    </div>
                                    <div v-else-if="data.value=='selfEmployed'" style="text-align:left;font-size:12pt;" >
                                        <b>I am self-employed</b>
                                        <p>Self-employment income</p>
                                    </div>
                                    <div v-else-if="data.value=='trust'" style="text-align:left;font-size:12pt;" >
                                        <b>I am a beneficiary under a trust:</b>
                                        <p>Trust income</p>
                                    </div>
                                    <div v-else-if="data.value=='partnership'" style="text-align:left;font-size:12pt;" >
                                        <b>I am a partner in a partnership</b>                                        
                                        <p>Income and draw from a partnership</p>
                                    </div>
                                    <div v-else-if="data.value=='other'" style="text-align:left;font-size:12pt;" >
                                        <b>I have another source of income</b>
                                        <b-form>
                                            <label style="float:left;margin:0.5rem 0;">
                                                List all other sources of income and provide the total income from all other sources
                                            </label>
                                            <b-form-textarea 
                                                :disabled="!data.item.income"    
                                                style="float:left;margin-left:0.3rem;width:90%;"                                                                                    
                                                v-model="otherDesc">
                                            </b-form-textarea>
                                        </b-form>
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
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class IncomeInformation extends Vue {
    
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
    
    nameOfEmployer = "";
    govSource = "";
    otherDesc = "";

    incomeInformationItem = [
        {income: true, incomeName:"employee",       monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"EI",             monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"WCB",            monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"investment",     monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"pension",        monthlyAmount: 0, yearlyAmount: 0},    
        {income: true, incomeName:"govAssist",      monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"selfEmployed",   monthlyAmount: 0, yearlyAmount: 0},
        {income: true, incomeName:"trust",          monthlyAmount: 0, yearlyAmount: 0},  
        {income: true, incomeName:"partnership",    monthlyAmount: 0, yearlyAmount: 0},  
        {income: true, incomeName:"other",          monthlyAmount: 0, yearlyAmount: 0}  
        
    ];

    incomeInformationFields = [
        {key:"income",          label:"",               tdClass:"border-right-0 align-middle",  thClass:"border-right-0",               thStyle:"font-size:12pt; width:3%;"}, 
        {key:"incomeName",      label:"Income",         tdClass:"border-left-0 align-middle",   thClass:"text-primary border-left-0",   thStyle:"font-size:12pt; width:60%;"}, 
        {key:"monthlyAmount",   label:"Monthly amount", tdClass:"border-top-0 align-middle",    thClass:"text-primary",                 thStyle:"font-size:12pt; width:18%;"},
        {key:"yearlyAmount",    label:"Yearly amount",  tdClass:"border-top-0 align-middle",    thClass:"text-primary",                 thStyle:"font-size:12pt; width:19%;"}      
    ]

    mounted(){        
        this.reloadPageInformation();
    } 
    
    public reloadPageInformation() {        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.incomeInformationSurvey?.data) {
            const incomeData = this.step.result.incomeInformationSurvey.data
            if (incomeData.incomeAmounts){
                this.incomeInformationItem = this.step.result?.incomeInformationSurvey?.data?.incomeAmounts;
            }
            this.nameOfEmployer = incomeData.nameOfEmployer?incomeData.nameOfEmployer:''; 
            this.govSource = incomeData.govSource?incomeData.govSource:'';
            this.otherDesc = incomeData.otherDesc?incomeData.otherDesc:'';          
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }      

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
    }

    public inputYearlyValueChanged(data){    
        this.incomeInformationItem[data.index].monthlyAmount = this.incomeInformationItem[data.index].yearlyAmount/12;
        this.tableKey ++;
    }

    public incomeTypeChanged(data){
        if(data.value == false){
            this.incomeInformationItem[data.index].monthlyAmount = 0;
            this.incomeInformationItem[data.index].yearlyAmount = 0;
        }
        this.tableKey ++;
    }

    public inputMonthlyValueChanged(data){
        this.incomeInformationItem[data.index].yearlyAmount = 12 * this.incomeInformationItem[data.index].monthlyAmount;        
        this.tableKey ++;
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

            const incomeInfo = this.getIncomeInfo().incomeAmounts;
            for(const incomeType of incomeInfo) {
                if(incomeType.income)
                    questionResults.push({name:'incomeInformationSurvey', value: '$ '+ incomeType.yearlyAmount, title: incomeType.incomeName +' yearly amount:', inputType:''})
            }
        }  
        
        return {data: this.getIncomeInfo(), questions:questionResults, pageName:'Income Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getIncomeInfo(){

        let employer = "";
        let source = "";
        let other = "";

        if(this.incomeInformationItem[0].income){
            employer = this.nameOfEmployer;
        }

        if(this.incomeInformationItem[5].income){
            source = this.govSource;
        }

        if(this.incomeInformationItem[9].income){
            other = this.otherDesc;
        }

        let result = {
            incomeAmounts: this.incomeInformationItem,  
            nameOfEmployer: employer,
            govSource: source,
            otherDesc: other
        }

        return result
    }
    
    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
        this.UpdateStepResultData({step:this.step, data: {incomeInformationSurvey: this.getIncomeResults()}})
    }
}
</script>

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
</style>
