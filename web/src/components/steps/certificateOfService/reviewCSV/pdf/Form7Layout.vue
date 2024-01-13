<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Affidavit of Personal Service</b></div>  
                <div style="font-size:13pt;"><b>of Protection Order</b></div>              
                <div style="font-size:10pt;"><b>FORM 49</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 183</div>
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
            style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="22rem" 
            beforetext="I" 
            hint="(full name)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.occupation"/>

        <div style="margin-top: 1rem;">  

            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="37rem" 
                beforetext="of" 
                hint="(address of party, city, province)" 
                :italicHint="false" :text="address"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                ,
            </div>

        </div>
        
        <div style="text-indent:5px;display:block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            SWEAR OR AFFIRM THAT:
        </div> 
           
        <div style="margin-top: 1rem;"></div>  

        <!-- <1> -->
        <section>  

            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="20rem" 
                beforetext="I personally served" 
                hint="(full name of person served)" 
                :italicHint="false" :text="yourInfo.name | getFullName"/>        

            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" 
                textwidth="12.5rem" 
                beforetext="on" 
                hint="(date the document(s) were served mmm/dd/yyyy)" 
                :italicHint="false" :text="yourInfo.occupation"/>
                  

            <div style="margin: 0.5rem 0 2rem 0;">
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" 
                    textwidth="11rem" 
                    beforetext="at" 
                    hint="(time the document(s) were served a.m./p.m.)" 
                    :italicHint="false" :text="yourInfo.occupation"/>  
                <underline-form 
                    style="text-indent:2px;font-size: 9pt;" 
                    textwidth="28.5rem" 
                    beforetext="at" 
                    hint="(address or location where service took place, city, province)" 
                    :italicHint="false" :text="address"/> 
            </div> 
            
        </section>

    <!-- <2> -->
        <section>
            <check-box 
                checkbox="" 
                inline="inline-block" 
                boxMargin="0" 
                style="display:inline; margin-left: 0.5rem;" 
                :check="supportApplication?'yes':''" 
                text="I also personally served them with a copy of the following document(s):"/>
            
            <div style="display:block; font-style: italic; margin: 1rem 0 0 1rem;"> 
                Indicate each additional document served by marking it with 
                an exhibit letter, listing it below, and attaching a copy to the affidavit.
            </div>
            
            <div v-if="supportApplication" style="margin:0.5rem 0 0 9rem;">

                <div  v-for="app, inx in additionalAppType" :key="inx" style="margin:0.5rem 0 0 1rem;"> 
                    
                    <underline-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        :beforetext="'Exhibit '+ app"
                        hint="(name of document)" 
                        :text="app | truncate(65)"/>                    
                </div>

                <div v-if="otherType.length>0" style="margin:0.5rem 0 0 1rem;"> 
                    
                    <underline-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
                        :text="otherType | truncate(65)"/>                    
                </div>
            </div> 
           
        </section>

         <!-- <3> -->

        <section>
            
            <div style="display:inline;"> 
                The person served was identified to me in this manner:
            </div>

            <div style="display:block; font-style: italic; margin-left: 1rem;"> 
                Select only one of the options below
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="I know the person"/>

            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="He/she admitted to being the person"/>            
            
            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="!supportApplication?'yes':''" 
                    text="Other (specify):"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="32.5rem" 
                    beforetext="" 
                    hint="" 
                    :text="!supportApplication?appType:''"/>            
            </div>      
            
        </section>

        <div class="print-block">

        <!-- <SWEAR > -->        

            <div style="margin:1rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem" beforetext="Sworn or affirmed before me at" hint="(city)" text="" />
            </div>
            <div style="margin:.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="British Columbia on" hint="(date)" text="" />
            </div>

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div>
                <div style="width:20rem; display:inline-block; font-size:9pt" >A Commissioner for taking Affidavits in British Columbia</div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
            </div>
            <div style="margin:.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="" hint="[print name or affix stamp of commissioner]" text="" />
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

export default class Form49Layout extends Vue {

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
