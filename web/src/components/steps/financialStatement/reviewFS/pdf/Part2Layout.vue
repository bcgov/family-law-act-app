<template>
    <div v-if="dataReady">

<!-- <Page 1> -->          

    <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
        Part 2 – Personal expenses and debts
    </div>

    <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
        Expenses
    </div>
    
    <div class="print-block">
            
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
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Property taxes and strata fees
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Utilities
                                Include electricity, gas, water, waste, home phone, and
                                internet
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Homeowner/renter’s Insurance
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Home maintenance and repair
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Housing Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$</td>
                            <td colspan="2" style="border:1px solid #414142;">$     -></td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                
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
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Eating out
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Household supplies such as cleaning supplies, lightbulbs,
                                batteries, toilet paper and laundry detergent
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>                        

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Food & Household supplies Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$</td>
                            <td colspan="2" style="border:1px solid #414142;">$     -></td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                
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
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Fuel
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Maintenance and repairs
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>   
                        
                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Public Transit, taxis and parking
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>  

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142;">
                                Other
                            </td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                            <td colspan="2" style="border:1px solid #414142;"></td>
                        </tr>

                        <tr style="border:0px solid #414142;" >
                            <td colspan="12" style="border:1px solid #414142; text-align: right; font-weight: 700;">
                                Transportation Subtotal:
                            </td>
                            <td colspan="2" style="border:1px solid #414142;">$</td>
                            <td colspan="2" style="border:1px solid #414142;">$     -></td>
                        </tr>

                    </table>                
                </td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                <td colspan="2" style="border:1px solid #414142;"></td>
                
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Clothing & Self-care</b><br>
                    Include clothing, hair dresser/barber and cosmetics                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Health & Medical</b><br>
                    Include regular dental care, orthodontics, medicine, eye glasses or contact lenses                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Children</b><br>
                    Include school activities, extracurricular activities, tuition/school fees, camps, babysitting,
                    allowances and daycare                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Miscellaneous/Other</b><br>
                    Include gifts & donations, alcohol, tobacco & cannabis, entertainment & recreation, cell phone,
                    cable, subscription services, pet expenses and vacations                
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142;">
                    <b>Premiums, Contributions and Debt Repayment</b><br>
                    Include life or term insurance premiums, RRSP or other contributions, debt repayment
                    (for expenses not itemized above)               
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142; font-weight: 700;">
                    Other <i>(specify):</i>               
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr>

            <tr style="border:1px solid #414142;" >
                <td colspan="12" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                    Total               
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
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

            <tr style="border:1px solid #414142;" >
                <td colspan="7" style="border:1px solid #414142;">
                    
                </td>
                <td colspan="7" style="border:1px solid #414142;">
                   
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr> 

            <tr style="border:1px solid #414142;" >
                <td colspan="7" style="border:1px solid #414142;">
                    
                </td>
                <td colspan="7" style="border:1px solid #414142;">
                   
                </td>
                <td colspan="2" style="border:1px solid #414142;">$</td>
            </tr> 
            <tr style="border:1px solid #414142;" >
                <td colspan="14" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                    Total               
                </td>
                
                <td colspan="2" style="border:1px solid #414142;">$</td>
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
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getLocationInfo, getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { aboutAffiantDataInfoType, affidavitDataInfoType, storyDataInfoType } from '@/types/Application/Affidavit';

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
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType; 
    address = '';
    supportApplication = false;
    appType = '';   
    otherType = '';
    additionalAppType = []; 
    stories: storyDataInfoType[] = [];
    lastStory = {} as storyDataInfoType; 
    storyCount = 0;
   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getAffidavitInfo();  
        this.getAffiantInfo();  
        this.getStoryInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        
    } 

    public getAffidavitInfo(){    
        
        this.supportApplication = false;
        this.appType = ''
        this.additionalAppType = [];
        this.otherType = '';

        if(this.result?.affidavitSurvey){

            let aff = {} as affidavitDataInfoType;
            aff = this.result.affidavitSurvey;

            this.supportApplication = aff.affidavitReason != 'response';            

            const appTypeInfo = aff.applicationType?aff.applicationType:[];

            const appList = [];
            let otherTypeInfo = '';

            for (const app of appTypeInfo){
                if (app == 'other'){
                    otherTypeInfo = aff.applicationTypeComment;
                } else {
                    appList.push('about ' + app.replace(/`/g, ''))
                }
            }

            if (appList.length == 0){

                this.appType = Vue.filter('truncate')(otherTypeInfo, 42);
                this.otherType = '';
                this.additionalAppType = [];

            } else if (appList.length == 1){

                this.appType = Vue.filter('truncate')(appList[0], 42);
                this.otherType = otherTypeInfo;
                this.additionalAppType = [];

            } else if (appList.length > 1){

                this.appType = Vue.filter('truncate')(appList[0], 42);
                this.otherType = otherTypeInfo;
                const additionalList = appList.slice(1)           

                for (let index = 0; index < additionalList.length; index+=2){
                    
                    this.additionalAppType.push(additionalList[index] + (additionalList[index + 1]?(', ' + additionalList[index + 1]):''))
                
                }
            }

        }
    }

    public getAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantSurvey){

            let aboutAffiant = {} as aboutAffiantDataInfoType;
            aboutAffiant = this.result.aboutAffiantSurvey;

            this.yourInfo = getYourInformationResults(aboutAffiant);            
            const addressInfo = aboutAffiant.ApplicantAddress;

            const addressText = addressInfo.street + ', ' 
                                + addressInfo.city + ', ' 
                                + addressInfo.state + ', ' 
                                + addressInfo.country + ', ' 
                                + addressInfo.postcode;

            this.address = aboutAffiant.inCareOf?.length>0?('Care of '+ addressText ):addressText;
        }
            
    }

    public getStoryInfo(){  
        
        this.stories = [];
        this.storyCount = 0;
        this.lastStory = {};

        const storyList: storyDataInfoType[] = [];
       
        if(this.result?.yourStoryAffSurvey?.storyAff){

            const storyInfo = this.result.yourStoryAffSurvey.storyAff;
            for (const story in storyInfo){
               storyList.push({index: Number(story) + 2, content:storyInfo[story].storyDescription})
            }

            this.storyCount = storyList.length;

            if (this.storyCount == 0){

                this.stories = []
                this.lastStory = {};

            } else if (this.storyCount == 1){

                this.lastStory = storyList[0];                
                this.stories = [];

            } else if (this.storyCount > 1){

                this.stories = storyList.slice(0, this.storyCount - 1);
                this.lastStory = storyList.slice(this.storyCount-1)[0];               
            } 


        }
            
    }  
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
