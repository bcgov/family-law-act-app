<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader formName="Affidavit of Personal Service" formNumber="FORM 48" formRuleNumber="Rule 183" :headerTableData="
            [{value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            {value: ''}, 
            {value: ''}]"></FormHeader>    

        <div style="margin-top: 1rem;"></div>

        <grey-box-form 
            style="text-indent:2px;display:inline-block; font-size: 12pt;" 
            textwidth="22rem" 
            beforetext="<b>I, </b>" 
            hint="Full name" 
            :hintFontSize="hintFontSize"
            :hintTextColor="hintTextColor"
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <grey-box-form 
            style="text-indent:2px;display:inline-block; font-size: 12pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="Occupation" 
            :hintFontSize="hintFontSize"
            :hintTextColor="hintTextColor"
            :italicHint="false" :text="yourInfo.occupation"/>
        

        <div style="margin: 1rem 0;">
            <grey-box-form 
                style="text-indent:2px;font-size: 12pt;" 
                textwidth="37.25rem" 
                beforetext="of" 
                hint="Address of person, City, Province" 
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor"
                :italicHint="false" :text="address"/> 
            <div style="text-indent:5px;display:inline; font-size: 9pt;">
            ,
            </div>
        </div> 

        <div style="text-indent:5px;display:block; font-size: 12pt; margin-top: 2rem; font-weight: bold;"> 
            SWEAR OR AFFIRM THAT:
        </div>

        
           
        <div style="margin-top: 1rem;"></div>  
    <!-- <1> -->
        <section style="text-indent: 0pt;">
            <p style="display: inline; text-indent: 4px;font-size: 14pt;"><b>I personally served</b></p>
            <br>
            <grey-box-form 
                style="text-indent:2px;display:inline-block; font-size: 12pt;" 
                textwidth="37.5rem" 
                beforetext="" 
                hint="Full name of the person served (copy their name from the document you served them)" 
                hintindent="10pt"
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor"
                :italicHint="false" :text="servedPersonName"/>        
            
            <div style="margin-top: 20px;">
                <grey-box-form 
                style="text-indent:2px;display:inline; font-size: 12pt;margin-top: 1rem;" 
                textwidth="20rem" 
                beforetext="<b>on</b>" 
                hint="Date the documents were served (dd/mmm/yyyy)" 
                hintindent="10pt"
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor"
                :italicHint="false" :text="serviceDate"/>
                
                <grey-box-form 
                    style="text-indent:2px;display:inline; font-size: 12pt;margin-top: 1rem;" 
                    textwidth="11rem" 
                    beforetext="<b>at</b>" 
                    aftertext="<b>a.m./p.m.</b>"
                    hint="Time the documents were served"
                    hintindent="0"
                    :hintFontSize="hintFontSize"
                    :hintTextColor="hintTextColor" 
                    :italicHint="false" :text="serviceTime"/>  
            </div>
            
            <div style="margin-top: 20px;">
                <grey-box-form 
                style="text-indent:2px;font-size: 12pt;" 
                textwidth="37.5rem" 
                beforetext="<b>at</b>" 
                hint="Street address or location where service took place, city, province" 
                hintindent="10pt"
                :hintFontSize="hintFontSize"
                :hintTextColor="hintTextColor" 
                :italicHint="false" :text="serviceAddress"/> 
            </div>
            

            <div style="text-indent:14px; display:block; font-size: 12pt; margin: 2rem 0 0.5rem 0.25rem;"> 
                <b>with a copy of the following document(s):</b>
            </div> 
            <div style="margin-left:14px; display:block; font-size: 12pt; font-style: italic;"> 
                Indicate each document served by marking it with an exhibit letter, listing it below, and attaching a copy to the affidavit.
            </div>

            <div style="margin-top: 1rem;"></div>

            <div v-for="exhibit,inx in exhibitList" :key="inx">            
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 13pt; margin-top: 1rem;" 
                    textwidth="30rem" 
                    :beforetext="'Exhibit &quot;' + exhibit.exhibitName +'&quot;:'"
                    hint="" 
                    :italicHint="false" :text="exhibit.fileName"/>              
            </div>

        </section>

    <!-- <2> -->

        <section>
            
            <div style="display:inline; font-size: 12pt;"> 
                The party served was identified to me in this manner:
            </div>

            <div style="display:block; font-style: italic; margin: 0 0 0 1rem;"> 
                Select only one of the options below
            </div>
            
            <div style="display:block;font-size: 12pt;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px;" 
                    :check="idMethod == 'I know the person'?'yes':''" 
                    text="I know the person"/>
            </div>

            <div style="display:block;font-size: 12pt;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px;" 
                    :check="idMethod == 'The person served admitted to being this person'?'yes':''" 
                    text="the person served admitted to being this person"/>   
            </div>         
                
            <div style="display:block;font-size: 12pt;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px; margin-right: 20px;" 
                    :check="idMethod == 'other'?'yes':''" 
                    text="Other (specify):"/>
                    
                <div v-if="idMethod == 'other'" class="answerbox" style="display: inline-block; font-size: 12pt;background: #d6d6d6; width: 420px; height: 26px;">{{idMethodComment}}</div>
                <div v-else class="answerbox" style="display: inline-block; margin-bottom:3rem;background: #d6d6d6;"></div> 
            </div>

        </section>       

        <div class="print-block">
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
import { aboutAffiantApsDataInfoType, aboutServiceApsDataInfoType } from '@/types/Application/AffidavitPersonalService';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormFooterSignature from '@/components/utils/PopulateForms/components/FormFooterSignature.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        GreyBoxForm,
        FormHeader,
        FormFooterSignature       
    }
})

export default class Form48Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType; 
    address = '';
    servedPersonName = '';
    serviceDate = '';
    serviceTime = '';
    serviceAddress = '';
    exhibitList = [];

    idMethod = '';
    idMethodComment = '';
    
    hintFontSize = "8pt"
    hintTextColor = "#333"
   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;   
    }
   
    public extractInfo(){        
        this.getAffiantInfo();  
        this.getServiceInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        
    }    

    public getAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantApsSurvey){

            let aboutAffiant = {} as aboutAffiantApsDataInfoType;
            aboutAffiant = this.result.aboutAffiantApsSurvey;

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

    public getServiceInfo(){  

        this.servedPersonName = '';
        this.serviceDate = '';
        this.serviceTime = '';      
        this.serviceAddress = '';
        this.exhibitList = [];  

        this.idMethod = '';
        this.idMethodComment = '';           
       
        if(this.result?.aboutServiceApsSurvey){

            const serviceData: aboutServiceApsDataInfoType = this.result.aboutServiceApsSurvey;
            
            this.servedPersonName = serviceData.ServedPersonName?Vue.filter('getFullName')(serviceData.ServedPersonName):'';
            
            if(serviceData.dateTimeServed){
                this.serviceDate = Vue.filter('beautify-date-mid')(serviceData.dateTimeServed);
                this.serviceTime = Vue.filter('convert-date-time24to12')(serviceData.dateTimeServed);                           
            }

            if(serviceData.locationServed){

                const addressInfo = serviceData.locationServed
                const addressText = addressInfo.street + ', ' 
                                    + addressInfo.city + ', ' 
                                    + addressInfo.state + ', ' 
                                    + addressInfo.country + ', ' 
                                    + addressInfo.postcode;
                this.serviceAddress = addressText;
            }            
            
            this.exhibitList = serviceData.documentListAps?serviceData.documentListAps:[];

            this.idMethod = serviceData.idMethod?serviceData.idMethod:'';
            this.idMethodComment = (this.idMethod == 'other' && serviceData.idMethodComment)?serviceData.idMethodComment:'';

        }
            
    }  
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
