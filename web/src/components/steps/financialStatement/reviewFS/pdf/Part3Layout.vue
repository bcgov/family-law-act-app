<template>
    <div v-if="dataReady">

    <!-- <Page 1> -->          

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Part 3 – Assets
        </div>
        
        <div class="print-block">
            
            <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
                Complete this part only if you are required to provide information about assets. 
                See the chart in the instructions for this form to determine if this part applies 
                to your situation.
            </div>

            <div style="text-indent:5px;display:block; font-size: 9pt; margin: 1rem 0;"> 
                An asset is something of value that you own or that belongs to you.
            </div>

            <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
                List all your assets in the table below, provide a brief description and 
                how much the asset is currently worth (the value).
            </div>

            <table class="fullsize">
                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142; font-weight: 700;">
                        Asset                    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-weight: 700;">
                        Description of asset
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-weight: 700;">
                        Current value of Asset
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Real Estate
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Street address
                        <tr v-for="(realEstateItem,inx) in realEstate" :key="inx"> 
                            <div  class="answer">{{ realEstateItem.desc }} </div>                            
                        </tr>
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value
                        <tr v-for="(realEstateItem,inx) in realEstate" :key="inx"> 
                            <div  class="answer">${{ realEstateItem.value }} </div>                            
                        </tr>
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Cars/Boats/Vehicles
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Make, model, year
                        <tr v-for="(carItem,inx) in cars" :key="inx"> 
                            <div  class="answer">{{ carItem.desc }} </div>                            
                        </tr>
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value
                        <tr v-for="(carItem,inx) in cars" :key="inx"> 
                            <div  class="answer">${{ carItem.value }} </div>                            
                        </tr>
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Cash assets - including cash and bank accounts    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Type of cash asset (for example cash, savings account, chequing account) 
                        <tr v-for="(cashItem,inx) in cash" :key="inx"> 
                            <div  class="answer">{{ cashItem.desc }} </div>                            
                        </tr>   
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Current Balance  
                        <tr v-for="(cashItem,inx) in cash" :key="inx"> 
                            <div  class="answer">${{ cashItem.value }} </div>                            
                        </tr>  
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Investments - including TFSAs, RRSPs, stocks and bonds, pensions  
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Type of investment
                        <tr v-for="(investmentItem,inx) in investment" :key="inx"> 
                            <div  class="answer">{{ investmentItem.desc }} </div>                            
                        </tr>
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Current Balance
                        <tr v-for="(investmentItem,inx) in investment" :key="inx"> 
                            <div  class="answer">${{ investmentItem.value }} </div>                            
                        </tr>
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Loans and Credit (money owing to me)    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Name of borrower
                        <tr v-for="(loanItem,inx) in loans" :key="inx"> 
                            <div  class="answer">{{ loanItem.desc }} </div>                            
                        </tr>
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Amount owing
                        <tr v-for="(loanItem,inx) in loans" :key="inx"> 
                            <div  class="answer">${{ loanItem.value }} </div>                            
                        </tr>                        
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Other - including precious metals, art, jewelry or other items of high value    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Brief description  
                        <tr v-for="(otherItem,inx) in other" :key="inx"> 
                            <div  class="answer">{{ otherItem.desc }} </div>                            
                        </tr>
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value  
                        <tr v-for="(otherItem,inx) in other" :key="inx"> 
                            <div  class="answer">${{ otherItem.value }} </div>                            
                        </tr>   
                    </td>
                </tr> 
                
                <tr style="border:1px solid #414142;" >
                    <td colspan="13" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                        Total               
                    </td>
                    
                    <td colspan="3" style="border:1px solid #414142;"><div  class="answer">${{ total }} </div></td>
                </tr>
            
            </table>       
            
        </div>

        <div class="print-block">

            <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
                Disposition of Assets
            </div>

            <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; font-size: 9.45pt;">
                I have sold or disposed of an asset(s) in the last two years
            </div>
            <div style="display:inline-block;">
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shiftmark="1"  marginLeft="1.25rem" :check="disposedAsset?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" shiftmark="1" marginLeft="0.5rem" :check="!disposedAsset?'yes':''" text="No"/> 
            </div>

            <div v-if="disposedAsset" class="answerbox">
                {{ disposedDesc }}
            </div> 
                
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
   
    realEstate = [];
    totalRealEstate = 0;
    cars = [];
    totalCars = 0;
    cash = [];
    totalCash = 0;
    investment = [];
    totalInvestment = 0;
    loans = [];
    totalLoans = 0;
    other = [];
    totalOther = 0;
    total = 0;
    disposedAsset = false;
    disposedDesc = '';
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){  
        
        const assetTypes = this.result?.assetsFSSurvey?.assetTypes?this.result.assetsFSSurvey.assetTypes:[];
        this.total = 0;
        if(assetTypes.includes("realEstate")){
            this.getRealEstateInfo();
            this.total = this.total + this.totalRealEstate;
        } 
        if(assetTypes.includes("cars")){
            this.getCarInfo();
            this.total = this.total + this.totalCars;
        } 
        if(assetTypes.includes("cash")){
            this.getCashInfo();
            this.total = this.total + this.totalCash;
        } 
        if(assetTypes.includes("investments")){
            this.getInvestmentInfo();
            this.total = this.total + this.totalInvestment;
        } 
        if(assetTypes.includes("loans")){
            this.getLoanInfo();
            this.total = this.total + this.totalLoans;
        } 
        if(assetTypes.includes("otherAssets")){
            this.getOtherInfo();
            this.total = this.total + this.totalOther;
        }

        this.disposedAsset = false;
        this.disposedDesc = '';
        
        if(this.result?.dispositionAssetsFSSurvey?.soldAsset)
            this.disposedAsset = this.result.dispositionAssetsFSSurvey.soldAsset == 'y'

        if(this.disposedAsset && this.result?.dispositionAssetsFSSurvey?.soldAssetDescription)
            this.disposedDesc = this.result.dispositionAssetsFSSurvey.soldAssetDescription
        
    } 

    public getRealEstateInfo(){ 

        const emptyRealEstate = { desc: '', value: '' };
        this.realEstate = [];    
        this.totalRealEstate = 0;   

        if(this.result?.realEstateFSSurvey){  
            let totalRealEstateAmount = 0;          

            for(const realEstateSurvey of this.result.realEstateFSSurvey){
                let realEstateInfo = {
                    desc: realEstateSurvey.realEstateDescription?realEstateSurvey.realEstateDescription:'',                    
                    value: realEstateSurvey.realEstateValue?Number(realEstateSurvey.realEstateValue):0
                };
                this.realEstate.push(realEstateInfo);
                totalRealEstateAmount = totalRealEstateAmount +realEstateInfo.value;                
            }
            this.totalRealEstate = totalRealEstateAmount;
        }

        if(this.realEstate.length == 0){
            this.realEstate.push(emptyRealEstate);
        }            
    }

    public getCarInfo(){ 

        const emptyCar = { desc: '', value: '' };

        this.cars = [];    
        this.totalCars = 0;   

        if(this.result?.carsBoatsVehiclesFSSurvey){  
            let totalCarAmount = 0;          

            for(const carsSurvey of this.result.carsBoatsVehiclesFSSurvey){
                let carsInfo = {
                    desc: carsSurvey.carsBoatsVehiclesDescription?carsSurvey.carsBoatsVehiclesDescription:'',                    
                    value: carsSurvey.carsBoatsVehiclesValue?Number(carsSurvey.carsBoatsVehiclesValue):0
                };
                this.cars.push(carsInfo);
                totalCarAmount = totalCarAmount +carsInfo.value;                
            }
            this.totalCars = totalCarAmount;
        }

        if(this.cars.length == 0){
            this.cars.push(emptyCar);
        }            
    }

    public getCashInfo(){ 

        const emptyCash = { desc: '', value: '' };

        this.cash = [];    
        this.totalCash = 0;   

        if(this.result?.cashAssetsFSSurvey){  
            let totalCashAmount = 0;          

            for(const cashSurvey of this.result.cashAssetsFSSurvey){
                let cashInfo = {
                    desc: cashSurvey.cashAssetsDescription?cashSurvey.cashAssetsDescription:'',                    
                    value: cashSurvey.cashAssetsValue?Number(cashSurvey.cashAssetsValue):0
                };
                this.cash.push(cashInfo);
                totalCashAmount = totalCashAmount + cashInfo.value;                
            }
            this.totalCash = totalCashAmount;
        }

        if(this.cash.length == 0){
            this.cash.push(emptyCash);
        }            
    }

    public getInvestmentInfo(){ 

        const emptyInvestment = { desc: '', value: '' };

        this.investment = [];    
        this.totalInvestment = 0;   

        if(this.result?.investmentsFSSurvey){  
            let totalInvestmentAmount = 0;          

            for(const investmentSurvey of this.result.investmentsFSSurvey){
                let investmentInfo = {
                    desc: investmentSurvey.investmentsDescription?investmentSurvey.investmentsDescription:'',                    
                    value: investmentSurvey.investmentsValue?Number(investmentSurvey.investmentsValue):0
                };
                this.investment.push(investmentInfo);
                totalInvestmentAmount = totalInvestmentAmount + investmentInfo.value;                
            }
            this.totalInvestment = totalInvestmentAmount;
        }

        if(this.investment.length == 0){
            this.investment.push(emptyInvestment);
        }            
    }

    public getLoanInfo(){ 

        const emptyLoan = { desc: '', value: '' };

        this.loans = [];    
        this.totalLoans = 0;   

        if(this.result?.loansCreditsFSSurvey){  
            let totalLoanAmount = 0;          

            for(const loanSurvey of this.result.loansCreditsFSSurvey){
                let loanInfo = {
                    desc: loanSurvey.loansCreditsDescription?loanSurvey.loansCreditsDescription:'',                    
                    value: loanSurvey.loansCreditsValue?Number(loanSurvey.loansCreditsValue):0
                };
                this.loans.push(loanInfo);
                totalLoanAmount = totalLoanAmount + loanInfo.value;                
            }
            this.totalLoans = totalLoanAmount;
        }

        if(this.loans.length == 0){
            this.loans.push(emptyLoan);
        }            
    }

    public getOtherInfo(){ 

        const emptyOther = { desc: '', value: '' };

        this.other = [];    
        this.totalOther = 0;   

        if(this.result?.otherAssetsFSSurvey){  
            let totalOtherAmount = 0;          

            for(const otherSurvey of this.result.otherAssetsFSSurvey){
                let loanInfo = {
                    desc: otherSurvey.otherAssetsDescription?otherSurvey.otherAssetsDescription:'',                    
                    value: otherSurvey.otherAssetsValue?Number(otherSurvey.otherAssetsValue):0
                };
                this.other.push(loanInfo);
                totalOtherAmount = totalOtherAmount + loanInfo.value;                
            }
            this.totalOther = totalOtherAmount;
        }

        if(this.other.length == 0){
            this.other.push(emptyOther);
        }            
    }   
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
