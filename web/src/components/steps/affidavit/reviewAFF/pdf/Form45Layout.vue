<template>
    <div v-if="dataReady" style="font-size: 12pt;">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :headerTableData="[
            {value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            {value: otherPartyNames}, 
            {value: ''}]"
            formName="Affidavit – General"
            formNumber="FORM 45"
            formRuleNumber="Rules 171 and 172"
        ></FormHeader>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: block;">
            <p>This Affidavit provides evidence to the court of the facts and events it sets out. </p>
        </div>

        <div style="display: block; border: 2px dashed #333; background: #d6d6d6; padding: 8px;">
            <p><b>Please read before completing the form:</b></p>
            <ul>
                <li>An affidavit is used to present written evidence that is relevant to the case to the court.</li>
                <li>The affidavit must be signed with a commissioner for taking affidavits. Lawyers and notaries are all commissioners for taking affidavits. The court registry also has staff who are commissioners for taking affidavits who can swear or affirm your affidavit for free.</li>
                <li>
                    For guidance completing this form, please read the guidebook. The guide is available online at <a href="http://www.gov.bc.ca/court-forms" target="_blank">www.gov.bc.ca/court-forms</a> or from your local court registry.
                </li>
            </ul>
        </div>
        
        <div style="margin-bottom: 1rem;"></div>

        <grey-box-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="22rem" 
            beforetext="<b>I, </b>" 
            hint="Full name" 
            :hintFontSize="hintFontSize"
            :hintTextColor="hintTextColor"
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <grey-box-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="Occupation" 
            :hintFontSize="hintFontSize"
            :hintTextColor="hintTextColor"
            :italicHint="false" :text="yourInfo.occupation"/>

        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            of
        </div>

        <div style="margin-top: 1rem;">  

            <grey-box-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="30rem" 
                beforetext="" 
                hint="Address of person, City, Province" 
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor"
                :italicHint="false" :text="address"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                ,
            </div>

        </div>        
        
        <div style="text-indent:5px;display:block; margin-top: 2rem; font-weight: bold;"> 
            SWEAR OR AFFIRM THAT:
        </div> 
        <div style="display:block; margin: 1rem 0 0 5px; font-weight: bold;"> 
            I know or believe the following facts to be true. If these facts are based on information from others, I believe that information to be true.
        </div>
           
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->
        <section>
            <div style="text-indent:5px;display:inline;"> 
                I am making this affidavit
            </div>
            
            <br>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline; margin-left: 1rem;" 
                :check="supportApplication?'yes':''" 
                text="in support of an application"/>
            <grey-box-form 
                style="text-indent:4px;display:inline-block; font-size: 9pt;" 
                textwidth="24rem" 
                beforetext="" 
                hint="Briefly describe the type of application"
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor" 
                :text="supportApplication?appType:''"/>
            
            <div v-if="supportApplication" style="margin:1rem 0 0 9rem;">

                <div  v-for="app, inx in additionalAppType" :key="inx" style="margin:1rem 0 0 1rem;"> 
                    
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
                        :text="app | truncate(65)"/>                    
                </div>

                <div v-if="otherType.length>0" style="margin:0.5rem 0 0 1rem;"> 
                    
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
                        :text="otherType | truncate(65)"/>                    
                </div>
            </div>            
            
            <div style="margin:1rem 0 0 2rem;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="!supportApplication?'yes':''" 
                    text="in response to an application"/>
                <grey-box-form 
                    style="text-indent:4px;display:inline-block; font-size: 9pt;" 
                    textwidth="24rem" 
                    beforetext="" 
                    hint="Briefly describe the type of application" 
                    :hintFontSize="hintFontSize"
                    :hintTextColor="hintTextColor" 
                    :text="!supportApplication?appType:''"/>            
            </div>
            <div v-if="!supportApplication" style="margin:0.5rem 0 0 9rem;">

                <div  v-for="app, inx in additionalAppType" :key="inx" style="margin:1rem 0 0 1rem;"> 
                    
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
                        :text="app | truncate(65)"/>                    
                </div>
                
                <div v-if="otherType.length>0" style="margin:1rem 0 0 1rem;"> 
                    
                    <grey-box-form
                        style="text-indent:0;margin-left:1rem;display:inline;" 
                        textwidth="30rem"
                        beforetext=""
                        hint="" 
                        :text="otherType | truncate(65)"/>                    
                </div>
            </div>
        </section>
            
        <div class="print-block" style="margin-top: 1rem; color: #999">
            <i>
                List the facts that you wish to present to the court using short sentences. Each fact or piece of information should be organized into its own numbered paragraphs (starting with 2). If certain facts are not within your personal knowledge, identify the source of your information. If you refer to documents, attach them to this affidavit and mark them as exhibits.
            </i>
        </div>
        <!-- <2> -->        

        <div v-for="story in stories" :key="story.index"
            style="display:block; font-size: 11pt; margin-top: 1rem;"> 
            <div style="display: flex;">
                <div style="padding: 10px;">
                    <b>{{ story.index }}.</b> 
                </div>
                <div class="answerbox" style="width: 100%; background: #d6d6d6;min-height: 30px; padding: 4px;">
                    {{ story.content }}
                </div>
            </div>
        </div> 

        <div class="print-block">

            <div style="display:block; font-size: 11pt; margin-top: 1rem;"> 
                <div style="display: flex;">
                    <div style="padding: 10px;">
                        <b>{{ lastStory.index }}.</b> 
                    </div>
                    <div class="answerbox" style="width: 100%; background: #d6d6d6;min-height: 30px; padding: 4px;">
                        {{ lastStory.content }}
                    </div>
                </div>
            </div>

            <!-- <SWEAR > -->                    
            <FormFooterSignature></FormFooterSignature>
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
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormFooterSignature from '@/components/utils/PopulateForms/components/FormFooterSignature.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        CourtStamp,
        GreyBoxForm, 
        FormHeader,
        FormFooterSignature   
    }
})

export default class Form45Layout extends Vue {

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

    hintFontSize = "8pt"
    hintTextColor = "#333"

    otherPartyNames = '';
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;  

        console.log(this.result);
        
        this.otherPartyNames = `${this.result.otherFormsLastNamesOfPartiesSurvey?.party1 ? this.result.otherFormsLastNamesOfPartiesSurvey?.party1 : ''}${this.result.otherFormsLastNamesOfPartiesSurvey?.party2 ? '/' + this.result.otherFormsLastNamesOfPartiesSurvey?.party2: ''}`;
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
