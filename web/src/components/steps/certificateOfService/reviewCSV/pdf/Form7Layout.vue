<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Certificate of Service</b></div>             
                <div style="font-size:10pt;"><b>FORM 7</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 2, 27, 68, 77, 136 and 183</div>
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

        <div style="text-indent:5px;display:block; font-size: 9pt; font-weight: 700;"> 
            I certify that
        </div>        

        <underline-form 
            style="text-indent:2px;display:block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="40rem" 
            beforetext="<b>I,</b>" 
            hint="Your full name" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="38rem" 
            beforetext="<b>served</b>" 
            hint="Full name of the person served (copy their name from the document you served them)" 
            :italicHint="false" :text="servedPersonName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="15rem" 
            beforetext="<b>on</b>" 
            hint="Date the document(s) were service (mmm/dd/yyyy)" 
            :italicHint="false" :text="serviceDate"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="<b>at</b>" 
            hint="Time the document(s) were served" 
            :italicHint="false" :text="serviceTime"/>

        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            a.m./p.m.
        </div>

        <div style="margin-top: 1rem;">
            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="40rem" 
                beforetext="<b>at</b>" 
                hint="Street address or location, city, province, or email address or fax number where the document(s) were served." 
                :italicHint="false" :text="serviceDetails.substring(0,85)"/>

            <div v-if="serviceDetails.length>85" class="answerbox">{{serviceDetails.substring(85)}}</div>
            <div v-else style="margin-bottom:3rem;"></div> 
        </div>
        
        <div style="display:block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            with the following document(s):
        </div> 

        <div style="display:block; font-style: italic; margin: 1rem 0 0 0rem;"> 
            Select all options that apply. Attach a copy of each document you have selected 
            below (except the blank reply) to this Certificate of Service.
        </div>
           
        <div style="margin-top: 1rem;"></div>                 
        
        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox=""
                    style="display:inline;" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    :check="documentList.includes('Application About a Family Law Matter')?'yes':''" text="Application About a Family Law Matter"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox=""
                    style="display:inline;" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    :check="documentList.includes('Order')?'yes':''" text="Order"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Financial Statement')?'yes':''" text="Financial Statement"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Reply to a Counter Application')?'yes':''" text="Reply to a Counter Application"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Guardianship Affidavit')?'yes':''" text="Guardianship Affidavit"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Application for Order Prohibiting the Relocation of a Child')?'yes':''" text="Application for Order Prohibiting the Relocation of a Child"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Instructions about filing reply')?'yes':''" text="Instructions about filing reply"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Application About Enforcement')?'yes':''" text="Application About Enforcement"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Application for Case Management Order')?'yes':''" text="Application for Case Management Order"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline"
                    :shiftmark="1" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Written Response to Application')?'yes':''" text="Written Response to Application"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Application About a Protection Order')?'yes':''" text="Application About a Protection Order"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Notice of Intention to Proceed')?'yes':''" text="Notice of Intention to Proceed"/>
            </div>
        </div>

        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box 
                    class="" 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('Application About Priority Parenting Matter')?'yes':''" text="Application About Priority Parenting Matter"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('other')?'yes':''" text="Other (list any additional document(s) that you served here):"/>
            </div>
        </div>

        <div style="margin-top: 1rem;">  

            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="42rem" 
                beforetext="" 
                hint="" 
                :italicHint="false" :text="documentList.includes('other')?documentListComment:''"/>
        </div>
        
        <div style="display:inline;margin-top: 1rem;"> 
            by:
        </div>

        <div style="display:block; font-style: italic; margin-left: 1rem;"> 
            Select the appropriate option for how you served the other party with the document(s)
        </div>

        <div style="display:block;text-decoration: underline; font-weight: 700;"> 
            Personal service
        </div>

        <div style="display:block; margin-left: 1rem; font-style: italic;"> 
            Note: Application About a Family Law Matter or About a Protection Order can only be served this way.
        </div>
        
        <check-box 
            checkbox="" 
            inline="inline" 
            :shiftmark="1"
            boxMargin="0" 
            style="display:block; margin-left: 1rem;" 
            :check="personalServiceMethod == 'leaving a copy of the document(s) with the person'?'yes':''" 
            text="leaving a copy of the document(s) with the person"/>

        <check-box 
            checkbox="" 
            inline="inline" 
            :shiftmark="1"
            boxMargin="0" 
            style="display:block; margin-left: 1rem;" 
            :check="personalServiceMethod == 'other'?'yes':''" 
            text="alternative service method ordered by the court (specify the method or instructions you followed as ordered by the court):"/>            
        <div 
            v-if="personalServiceMethod == 'other'" 
            class="answerbox"
            style="margin-left: 3rem;">
            {{personalServiceMethodComment}}
        </div>
        <div v-else style="margin-bottom:3rem;"></div>      
        
        <div class="print-block">

            <div style="display:block;text-decoration: underline; font-weight: 700;"> 
                Ordinary service
            </div>

            <div style="display:block; margin-left: 1rem; font-style: italic;"> 
                Note: This method of service is not allowed for an Application About a Family Law Matter or About a Protection Order.
            </div>
           
            <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'leaveCopy'?'yes':''" 
                text="leaving a copy of the document(s) at the person’s address for delivery"/>               
            
            <div style="display:block;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="ordinaryServiceMethod == 'ordinaryMail'?'yes':''" 
                    text="mailing the document(s) by ordinary mail to the person’s address for delivery on"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="(mmm/dd/yyyy)" 
                    :text="mailServiceDate"/>   
                    
                <div style="display:block; margin-left: 2.5rem; font-style: italic;"> 
                    Note: The date the document(s) were served is 14 days after the documents were mailed.
                </div>
            </div>  

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:block; margin-left: 1rem;" 
                    :check="ordinaryServiceMethod == 'registeredMail'?'yes':''" 
                    text="mailing the document(s) by registered mail to the person’s address for delivery"/>   
                <div style="display:block; margin-left: 2.5rem; font-style: italic;"> 
                    Note: The date the document(s) were served is the date the document(s) 
                    were confirmed to have been delivered by Canada Post. Attach a copy 
                    of the delivery confirmation from Canada Post.
                </div>     
            
            </div>

            <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'email'?'yes':''" 
                text="emailing the document(s) to the person’s email address for delivery"/>           

            <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'fax'?'yes':''" 
                text="faxing the document(s) to the person’s fax number for delivery"/>           

            <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'other'?'yes':''" 
                text="alternative service method ordered by the court (specify the method or instructions you followed as ordered by the court):"/>           
            
            <div 
                v-if="ordinaryServiceMethod == 'other'" 
                class="answerbox"
                style="margin-left: 3rem;">{{ordinaryServiceMethodComment}}</div>
            <div v-else style="margin-bottom:3rem;"></div>
            
        </div>

        <div class="print-block">

        <!-- <SWEAR > --> 

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div>
                <div style="width:20rem; display:inline-block; font-size:9pt" >Signature of the person who served the document</div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Date of signature (mmm/dd/yyyy)</div>
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
import { aboutAffiantCsvDataInfoType, aboutServiceCsvDataInfoType } from '@/types/Application/CertificateOfService';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})
export default class Form7Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType;
    servedPersonName = '';
    serviceDate = '';
    serviceTime = '';
    
    documentList = [];
    documentListComment = '';
    serviceDetails = '';    
    personalServiceMethod = '';
    personalServiceMethodComment = '';
    ordinaryServiceMethod = '';
    ordinaryServiceMethodComment = '';
    mailServiceDate = '';
    
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
        
        if(this.result?.aboutAffiantCsvSurvey){

            let aboutAffiant = {} as aboutAffiantCsvDataInfoType;
            aboutAffiant = this.result.aboutAffiantCsvSurvey;
            this.yourInfo = getYourInformationResults(aboutAffiant);
        }
            
    }

    public getServiceInfo(){  

        this.servedPersonName = '';
        this.serviceDate = '';
        this.serviceTime = '';      
        let serviceAddress = '';
        let otherServiceLocation = '';
        let serviceEmail = '';
        let serviceFax = '';
        let servicePhone = '';
        this.documentList = [];
        this.documentListComment = '';
        this.serviceDetails = '';    
        this.personalServiceMethod = '';
        this.personalServiceMethodComment = '';
        this.ordinaryServiceMethod = '';
        this.ordinaryServiceMethodComment = '';
        this.mailServiceDate = '';

        if(this.result?.aboutServiceCsvSurvey){

            const serviceData: aboutServiceCsvDataInfoType = this.result.aboutServiceCsvSurvey;
            
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
                serviceAddress = addressText;
            } 
            
            otherServiceLocation = serviceData.otherServiceLocation?.length>0? 'other: '+ serviceData.otherServiceLocation:'';
            serviceEmail = serviceData.serviceContact?.email?.length>0? 'email: '+ serviceData.serviceContact?.email:'';
            serviceFax = serviceData.serviceContact?.fax?.length>0? 'fax: '+ serviceData.serviceContact?.fax:'';
            servicePhone = serviceData.serviceContact?.phone?.length>0? 'phone: '+ serviceData.serviceContact?.phone:'';

            this.serviceDetails = serviceAddress + ' ' + serviceEmail + ' ' + serviceFax + ' ' + servicePhone + ' ' + otherServiceLocation;
            
            this.documentList = serviceData.documentListCsv?serviceData.documentListCsv:[];
            this.documentListComment = (this.documentList.includes('other')&&serviceData.documentListCsvComment)?serviceData.documentListCsvComment:''; 
           
            this.personalServiceMethod = serviceData.personalServiceMethod;
            this.personalServiceMethodComment = (serviceData.personalServiceMethod == 'other' && serviceData.personalServiceMethodComment)?serviceData.personalServiceMethodComment:'';
        
            this.ordinaryServiceMethod = serviceData.ordinaryServiceMethod.selected;
            this.ordinaryServiceMethodComment = (this.ordinaryServiceMethod == 'other' && serviceData.ordinaryServiceMethod.otherComment)?serviceData.ordinaryServiceMethod.otherComment:'';
            this.mailServiceDate = (this.ordinaryServiceMethod == 'ordinaryMail' && serviceData.ordinaryServiceMethod.mailServiceDate)?Vue.filter('beautify-date')(serviceData.ordinaryServiceMethod.mailServiceDate):'';
            
        
        }
    
}  

   

 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
