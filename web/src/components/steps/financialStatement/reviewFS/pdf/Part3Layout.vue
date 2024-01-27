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
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Cars/Boats/Vehicles    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Make, model, year
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Cash assets - including cash and bank accounts    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Type of cash asset (for example cash, savings account, chequing account)    
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Current Balance    
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Investments - including TFSAs, RRSPs, stocks and bonds, pensions  
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Type of investment
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Current Balance
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Loans and Credit (money owing to me)    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Name of borrower
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Amount owing
                    </td>
                </tr> 

                <tr style="border:1px solid #414142;" >
                    <td colspan="3" style="border:1px solid #414142;">
                        Other - including precious metals, art, jewelry or other items of high value    
                    </td>
                    <td colspan="10" style="border:1px solid #414142; font-style: italic;">
                        Brief description    
                    </td>
                    <td colspan="3" style="border:1px solid #414142; font-style: italic;">
                        Market Value    
                    </td>
                </tr> 
                
                <tr style="border:1px solid #414142;" >
                    <td colspan="13" style="border:1px solid #414142; font-weight: 700; text-align: right;">
                        Total               
                    </td>
                    
                    <td colspan="3" style="border:1px solid #414142;"></td>
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
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shiftmark="1"  marginLeft="1.25rem" :check="true?'yes':''"  text="Yes"/>                                  
                <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="!true?'yes':''" text="No"/> 
            </div>

            <div v-if="true" class="answerbox"></div> 
                
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
