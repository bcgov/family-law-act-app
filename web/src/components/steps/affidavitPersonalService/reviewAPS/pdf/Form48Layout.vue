<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-aps">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div class="my-0">
                <div class="text-right" >

                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="10rem" 
                        beforetext="Court File No." 
                        hint="" 
                        :italicHint="false" :text="existingFileNumber"/>                    
                </div>    
                
                <div class="text-right" >
                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="10rem" 
                        beforetext="Court Location" 
                        hint="" 
                        :italicHint="false" :text="result.applicationLocation"/>                    
                </div>  
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <div style="font-size:13pt;"><b>AFFIDAVIT OF PERSONAL SERVICE</b></div>               
                <div style="font-size:13pt; font-style: italic;"><b>(Emergency Intervention Disclosure Act)</b></div>
                <div style="font-size:17pt;"><b>In the Provincial Court of British Columbia</b></div>
            </div>            
        </div> 

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="22rem" 
            beforetext="I" 
            hint="Name" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="Occupation" 
            :italicHint="false" :text="yourInfo.occupation"/>
        

        <div style="margin: 1rem 0;">
            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="37.25rem" 
                beforetext="of" 
                hint="Address" 
                :italicHint="false" :text="address"/> 
        </div> 

        <check-box 
            checkbox="" 
            inline="inline-block" 
            shiftmark="1"
            boxMargin="0" 
            style="display:block; margin-left: 3rem;" 
            :check="oath?'yes':''" 
            text="MAKE OATH AND SAY THAT:"/>

        <check-box 
            checkbox="" 
            inline="inline" 
            shiftmark="1"
            boxMargin="0" 
            style="display:inline; margin-left: 3rem;" 
            :check="!oath?'yes':''" 
            text="SOLEMNLY AFFIRM THAT:"/>
           
        <div style="margin-top: 1rem;"></div>  

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="31.25rem" 
            beforetext="I personally served" 
            hint="Name of person" 
            :italicHint="false" :text="servedPersonName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" 
            textwidth="2rem" 
            beforetext="on the" 
            hint="" 
            :italicHint="false" :text="serviceDay"/>
        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="10rem" 
            beforetext="day of" 
            hint="" 
            :italicHint="false" :text="serviceMonth"/>
        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="2rem" 
            beforetext="20" 
            hint="" 
            :italicHint="false" :text="serviceYear"/>
        

        <div style="margin: 1rem 0;">
            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="40rem" 
                beforetext="at" 
                hint="Address" 
                :italicHint="false" :text="address"/> 
        </div> 

        <div style="text-indent:5px;display:block; font-size: 9pt; margin-top: 1rem;"> 
            with a copy of the following document(s):
        </div> 
        <div style="display:block; font-size: 9pt; margin: 0 0 0 5px; font-style: italic;"> 
            (Make sure a copy of each document is attached and marked with the correct exhibit letter.)
        </div>

        <div v-for="exhibit,inx in exhibitList" :key="inx">            
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
                textwidth="29rem" 
                :beforetext="'EXHIBIT ' + exhibit.exhibitName"
                hint="" 
                :italicHint="false" :text="exhibit.fileName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                (name of document)
            </div>
        </div>

        <div style="margin-top: 1rem;">
            <div style="display:block; font-size: 9pt;"> 
                The person served was identified to me in this manner:
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                :shiftmark="1"
                style="display:inline; margin-left: 1rem;" 
                :check="idMethod == 'I know the person'?'yes':''" 
                text="I know the person"/>

            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                :shiftmark="1"
                style="display:block; margin-left: 1rem;" 
                :check="idMethod == 'The person served admitted to being this person'?'yes':''" 
                text="He/she admitted to being the person"/>            
            
            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    :shiftmark="1"
                    style="display:inline; margin-left: 1rem;" 
                    :check="idMethod == 'other'?'yes':''" 
                    text="Other (specify)"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="32.5rem" 
                    beforetext="" 
                    hint="" 
                    :text="idMethod == 'other'?idMethodComment:''"/>            
            </div>
            
        </div>

        <div style="margin-top: 1rem;">
            <div style="display:block; font-size: 9pt;"> 
                The person was served in this manner:
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline; margin-left: 1rem;" 
                :check="serviceMethod == 'handing'?'yes':''" 
                text="By handing to and leaving a copy of the document(s) with him or her"/>

            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline"
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="serviceMethod != 'handing'?'yes':''" 
                    text="As directed by the Court by"/>
                <underline-form 
                    style="text-indent:2rem;display:block;" 
                    textwidth="32.5rem" 
                    beforetext="" 
                    hint="(State how the Court said service of the documents should be made.)" 
                    :text="serviceMethod != 'handing'?serviceMethodComment:''"/>            
            </div>            
        </div>

        <div class="print-block">

            <div style="margin-top: 1rem;">
                <div style="display:block; font-size: 9pt;"> 
                    SWORN or AFFIRMED BEFORE ME at the City of <span style="margin-left: 1rem;">)</span>
                </div>

                <div style="display:block; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:1.5px;display:inline-block; font-size: 9pt; margin-top: 0.5rem;" 
                        textwidth="10rem" 
                        beforetext="" 
                        hint="" 
                        :italicHint="false" text=""/>
                    <div style="text-indent:4px;display:inline; font-size: 9pt;"> 
                        , British Columbia <span style="margin-left: 0.9rem;">)</span>
                    </div>
                    
                </div>

                <div style="margin-top: 1rem;">

                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="2rem" 
                        beforetext="on the" 
                        hint="" 
                        :italicHint="false" text=""/>
                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="9rem" 
                        beforetext="day of" 
                        hint="" 
                        :italicHint="false" text=""/>
                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 0.9rem;"> 
                        )
                    </div>
                    <underline-form 
                        style="text-indent:4px;display:inline-block; font-size: 9pt;" 
                        textwidth="23rem" 
                        beforetext="" 
                        hint="" 
                        :italicHint="false" text=""/>                    
                </div>

                <div>
                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="2rem" 
                        beforetext="20" 
                        hint="" 
                        :italicHint="false" text=""/>
                    <div style="text-indent:4px;display:inline; font-size: 9pt;"> 
                        .
                    </div>

                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 13.5rem;"> 
                        )
                    </div>

                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 1rem;"> 
                        (Signature of person who served the documents)
                    </div>

                </div>

                <div style="margin-top: 0.5rem;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                        textwidth="16.5rem" 
                        beforetext="" 
                        hint="" 
                        :italicHint="false" text=""/>

                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 0.6rem;"> 
                        )
                    </div>

                </div>

                <div>                
                    <div style="text-indent:4px;display:inline; font-size: 9pt;"> 
                        A Commissioner for Taking Affidavits
                    </div>
                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 4.25rem;"> 
                        )
                    </div>
                </div>

                <div>                
                    <div style="text-indent:4px;display:inline; font-size: 9pt;"> 
                        For British Columbia
                    </div>
                    <div style="text-indent:4px;display:inline; font-size: 9pt; margin-left: 10rem;"> 
                        )
                    </div>
                </div>

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
import { aboutServiceApsDataInfoType } from '@/types/Application/AffidavitPersonalService';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
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
    oath = false;
    servedPersonName = '';
    serviceDay = '';
    serviceMonth = '';
    serviceYear = '';
    serviceAddress = '';
    exhibitList = [];   


    idMethod = '';
    idMethodComment = '';

    serviceMethod = '';
    serviceMethodComment = '';   
   
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

            let aboutAffiant = {} as aboutAffiantDataInfoType;
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
        this.serviceDay = '';
        this.serviceMonth = '';
        this.serviceYear = '';
        this.serviceAddress = '';
        this.exhibitList = [];  

        this.idMethod = '';
        this.idMethodComment = '';

        this.serviceMethod = '';
        this.serviceMethodComment = '';       
       
        if(this.result?.aboutServiceApsSurvey){

            const serviceData: aboutServiceApsDataInfoType = this.result.aboutServiceApsSurvey;
            
            this.servedPersonName = serviceData.ServedPersonName?Vue.filter('getFullName')(serviceData.ServedPersonName):'';
            
            if(serviceData.dateTimeServed){
                this.serviceDay = Vue.filter('get-datetime-day')(serviceData.dateTimeServed);
                this.serviceMonth = Vue.filter('get-datetime-full-month')(serviceData.dateTimeServed);
                this.serviceYear = Vue.filter('get-datetime-short-year')(serviceData.dateTimeServed);                
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
