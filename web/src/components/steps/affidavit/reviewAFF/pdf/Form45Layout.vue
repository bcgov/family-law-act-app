<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Affidavit – General</b></div>               
                <div style="font-size:10pt;"><b>FORM 45</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 171 and 172</div>
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
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
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

        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            of
        </div>

        <div style="margin-top: 1rem;">  

            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="30rem" 
                beforetext="" 
                hint="(address of party, city, province)" 
                :italicHint="false" :text="address"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                ,
            </div>

        </div>

        
        
        
        <div style="text-indent:5px;display:block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            Swear or affirm that:
        </div> 
        <div style="display:block; font-size: 9pt; margin: 1rem 0 0 5px; font-weight: 700;"> 
            I know or believe the following facts to be true. If these facts are based on information 
            from others, I believe that information to be true.
        </div>
           
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I am making this affidavit
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="in support of an application"/>
            <underline-form 
                style="text-indent:1px;display:inline-block;" 
                textwidth="17.5rem" 
                beforetext="" 
                hint="(briefly describe the type of application)" 
                :text="supportApplication?appType:''"/>
            <div v-if="supportApplication" style="margin:0.5rem 0 0 9rem;">

                <div  v-for="app, inx in additionalAppType" :key="inx" style="margin:0.5rem 0 0 1rem;"> 
                    
                    <underline-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
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
            
            <div style="margin:0.5rem 0 0 11rem;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="!supportApplication?'yes':''" 
                    text="in response to an application"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="17rem" 
                    beforetext="" 
                    hint="(briefly describe the type of application)" 
                    :text="!supportApplication?appType:''"/>            
            </div>
            <div v-if="!supportApplication" style="margin:0.5rem 0 0 9rem;">

                <div  v-for="app, inx in additionalAppType" :key="inx" style="margin:0.5rem 0 0 1rem;"> 
                    
                    <underline-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
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
            
        <div style="margin-top: 1rem;">
            <i>
                List the facts that you wish to present to the court. If certain facts are not within 
                your personal knowledge, identify the source of your information. If you refer to 
                documents, attach them to this affidavit and mark them as exhibits.
            </i>
        </div>
        <!-- <2> -->        

        <div v-for="story in stories" :key="story.index"
            style="display:block; font-size: 9pt; margin-top: 1rem;"> 
            <b>{{ story.index }}.</b> {{ story.content }}
        </div> 

        <div class="print-block">

            <div style="display:block; font-size: 9pt; margin-top: 1rem;"> 
                <b>{{ lastStory.index }}.</b> {{ lastStory.content }}
            </div>

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

export default class Form40Layout extends Vue {

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
        this.appType = '';
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
