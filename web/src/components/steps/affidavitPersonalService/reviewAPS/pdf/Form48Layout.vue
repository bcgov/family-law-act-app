<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Affidavit of Personal Service</b></div>               
                <div style="font-size:10pt;"><b>FORM 48</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 183</div>
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
            beforetext="I, " 
            hint="(full name)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.occupation"/>
        

        <div style="margin: 1rem 0;">
            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="37.25rem" 
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
                :italicHint="false" :text="servedPersonName"/>        

            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" 
                textwidth="12.5rem" 
                beforetext="on" 
                hint="(date the document(s) were served mmm/dd/yyyy)" 
                :italicHint="false" :text="serviceDate"/>
                  

            <div style="margin: 0.5rem 0 2rem 0;">
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" 
                    textwidth="11rem" 
                    beforetext="at" 
                    hint="(time the document(s) were served a.m./p.m.)" 
                    :italicHint="false" :text="serviceTime"/>  
                <underline-form 
                    style="text-indent:2px;font-size: 9pt;" 
                    textwidth="28.5rem" 
                    beforetext="at" 
                    hint="(address or location where service took place, city, province)" 
                    :italicHint="false" :text="serviceAddress"/> 
            </div> 

            <div style="display:block; font-size: 9pt; margin: 1rem 0 0.5rem 0.25rem;"> 
                with a copy of the following document(s):
            </div> 
            <div style="display:block; font-size: 9pt; margin: 0 0 0 0.25rem; font-style: italic;"> 
                Indicate each document served by marking it with an exhibit letter, listing it below, and attaching a copy to the affidavit.
            </div>

            <div v-for="exhibit,inx in exhibitList" :key="inx">            
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
                    textwidth="35rem" 
                    :beforetext="'EXHIBIT ' + exhibit.exhibitName +':'"
                    hint="(name of document)" 
                    :italicHint="false" :text="exhibit.fileName"/>              
            </div>

        </section>

    <!-- <2> -->

        <section>
            
            <div style="display:inline; font-size: 9pt;"> 
                The person served was identified to me in this manner:
            </div>

            <div style="display:block; font-style: italic; margin: 0 0 0 1rem;"> 
                Select only one of the options below
            </div>
            
            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px;" 
                    :check="idMethod == 'I know the person'?'yes':''" 
                    text="I know the person"/>
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px;" 
                    :check="idMethod == 'The person served admitted to being this person'?'yes':''" 
                    text="the person served admitted to being this person"/>   
            </div>         
                
            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    shiftmark="-3"
                    style="text-indent: 5px;" 
                    :check="idMethod == 'other'?'yes':''" 
                    text="Other (specify):"/>
                    
                <div v-if="idMethod == 'other'" class="answerbox">{{idMethodComment}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
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
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="" hint="(print name or affix stamp of commissioner)" text="" />
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
import { aboutAffiantApsDataInfoType, aboutServiceApsDataInfoType } from '@/types/Application/AffidavitPersonalService';

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
    servedPersonName = '';
    serviceDate = '';
    serviceTime = '';
    serviceAddress = '';
    exhibitList = [];

    idMethod = '';
    idMethodComment = '';    
   
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
                this.serviceDate = Vue.filter('beautify-date')(serviceData.dateTimeServed);
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
