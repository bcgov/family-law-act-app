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
                :check="!supportApplication?'yes':''" 
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

                <tr style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12"></td>
                    <td style="border:1px solid #414142;" colspan="4"></td>
                    <td style="border:1px solid #414142;" colspan="4"></td>
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
               :check="!supportApplication?'yes':''" 
               text="I have unusually high expenses to exercise parenting time or contact with the child(ren)."/>
              
           <div style="display:block; margin-left: 3rem; font-style: italic;">Specify below what expenses you have</div>
           <div v-if="true" class="answerbox"></div> 
        </section>

        <!-- <3> --> 
        <section>
           
           <check-box
               checkbox="" 
               inline="inline" 
               boxMargin="0"
               style="display:inline; margin-left: 0.5rem;" 
               :check="!supportApplication?'yes':''" 
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

               <tr style="border:1px solid #414142;" >
                   <td style="border:1px solid #414142;" colspan="12"></td>
                   <td style="border:1px solid #414142;" colspan="4"></td>
                   <td style="border:1px solid #414142;" colspan="4"></td>
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
               :check="!supportApplication?'yes':''" 
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

               <tr style="border:1px solid #414142;" >
                   <td style="border:1px solid #414142;" colspan="12"></td>
                   <td style="border:1px solid #414142;" colspan="4"></td>
                   <td style="border:1px solid #414142;" colspan="4"></td>
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
                :check="!supportApplication?'yes':''" 
                text="other undue hardship circumstances (specify):"/>
           
            <div v-if="true" class="answerbox"></div> 
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
