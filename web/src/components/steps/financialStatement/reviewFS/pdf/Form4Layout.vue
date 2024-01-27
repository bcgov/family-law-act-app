<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Financial Statement</b></div>             
                <div style="font-size:10pt;"><b>FORM 4</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 3, 25, 28 and 172</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value: existingFileNumber}]"
                    :fields="[{key:'name',tdClass:'border-dark text-center align-middle'},{key:'value',tdClass:'border-dark text-center align-middle'}]"
                    small
                    bordered
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="font-size:6pt; margin:.1rem 0;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:cell(value)="data">
                            <div style="font-size:7pt !important; color:#000;">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div> 

       
        <underline-form 
            style="text-indent:2px;display:inline; font-size: 9pt; margin-top: 1rem;" 
            textwidth="15rem" 
            beforetext="<b>I,</b>" 
            hint="(full name of party)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline; font-size: 9pt; margin-top: 1rem;" 
            textwidth="7rem" 
            beforetext=" " 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.occupation"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="17rem" 
            beforetext="of" 
            hint="(address of party, city, province)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

            
        <div style="text-indent:5px; display: block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            Swear or affirm that:
        </div> 
        
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                The information set out in this financial statement is true, to the best of my knowledge.
            </div>
        </section>

    <!-- <2> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I have made complete disclosure in this financial statement of:
            </div>
            <div style="text-indent:5px;display:block; font-size: 9pt; font-style: italic;"> 
                Select all options that apply
            </div>

            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="my income, including benefits and adjustments, if any, in Part 1"/>

            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="my expenses and debts, in Part 2"/>    
                
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="my assets, in Part 3"/>

            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="income of other person(s) in my household, in Part 4"/>    
            
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="undue hardship, in Part 5"/>    
                    
        </section>
       

        <div class="print-block">

        <!-- <SWEAR > --> 

            <div style="text-indent:5px;display:block; font-size: 9pt;margin:1rem 0 0 0"> 
                Sworn or affirmed before me 
            </div>

            <div style="margin:0.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem" beforetext="at" hint="(city)" text="" />
                <div style="text-indent:5px;display:inline; font-size: 9pt;margin:1rem 0 0 0"> 
                    , British Columbia 
                </div>
            </div>
            <div style="margin:.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="on" hint="(date)" text="" />
            </div>

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div class="row" style="margin: 0 0 0 0.15rem">
                <div style="width:20rem; display:inline-block; font-size:9pt" >
                    A Commissioner for taking Affidavits in British Columbia
                    (print name or affix stamp of commissioner)
                </div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
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
