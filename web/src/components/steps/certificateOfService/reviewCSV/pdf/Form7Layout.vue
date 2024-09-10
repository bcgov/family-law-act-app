<template>
    <div v-if="dataReady" style="font-size:10pt;">
        <FormHeader :headerTableData="[
            {value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            {value: ''}, 
            {value: ''}]"
            formName="Certificate of Service"
            formNumber="FORM 7"
            formRuleNumber="Rules 2, 27, 68, 77, 136 and 183"
        ></FormHeader>
<!-- <Page 1> -->
<!-- <HEADER> : BEGIN -->
    <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt !important;"><b>Certificate of Service</b></div>
                <div style="font-size:12pt !important;"><b>Form 7</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 2, 27, 68, 77, 136 and 183</div> 
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height:15px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Court file number:</div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Last names of parties:<br/><span style="color:#747474;font-size:7pt">Party 1/Party 2 </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;min-height: 35px;"> {{ party1lastName +' / '+party2lastName }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Document number:<br/><span style="color:#747474;font-size:7pt">For registry use only </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
        </div>    
        <div style="width: 80%;float: left; padding:0.3rem;margin-top:-15px;">
            This Certificate of Service provides proof of service of court documents.
        </div>        
<!-- <HEADER> : END -->
<!-- <1A> : BEGIN -->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
        <span style="text-indent:5px;"> 
            <b>I certify that:</b>
        </span>   
    <underline-form 
            style="text-indent:2px;display:block; margin-top: 1rem; margin-left:40px;" 
            textwidth="475px" 
            beforetext="<b>I,</b>" 
            hint="Your full name" 
            textBackgroundColor="#dedede"
            hintMargin="200px"
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:block; margin-top: 1rem;margin-left:5px;" 
            textwidth="475px" 
            beforetext="<b>served</b>" 
            hint="Full name of the person served (copy their name from the document you served them)" 
            textBackgroundColor="#dedede"
            hintMargin="60px"
            :italicHint="false" :text="servedPersonName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; margin-top: 1rem;margin-left:32px;" 
            textwidth="220px" 
            beforetext="<b>on</b>" 
            hint="Date the documents were service (dd/mmm/yyyy)" 
            textBackgroundColor="#dedede"
            hintMargin="10px"
            :italicHint="false" :text="serviceDate | beautify-date-mid"/>

        <underline-form 
            style="text-indent:2px;display:inline-block;" 
            textwidth="160px" 
            beforetext="<b>at</b>" 
            hint="Time the documents were served" 
            textBackgroundColor="#dedede"
            hintMargin="10px"
            :italicHint="false" :text="serviceTime"/>

        <span style="text-indent:5px;display:inline;margin-left:5px;"> 
            <b>a.m./p.m.</b>
        </span>
        <underline-form 
            style="text-indent:2px;display:block; margin-top: 1rem; margin-left:32px;" 
            textwidth="480px" 
            beforetext="<b>at </b>" 
            hint="Street address or location, city, province, or email address or other identifier where the documents were served" 
            textBackgroundColor="#dedede"
            hintMargin="22px"
            :italicHint="false" :text="serviceAddress.substring(0,55)"/>
            <div v-if="serviceAddress && serviceAddress.length>55" style="width:480px;text-indent:2px;display:block;text-align:left ;margin-top: 0.4rem; margin-left:55px;background-color: #dedede;line-height:25px;">{{serviceAddress.substring(55)}}</div>
            <div v-if="serviceContact" style="padding-left:4px;width:480px;text-indent:2px;display:block;text-align:left ;margin-top: 0.4rem; margin-left:55px;background-color: #dedede;line-height:25px;">{{serviceContact}}</div>
            <div v-if="serviceEmail" style="padding-left:4px;width:480px;text-indent:2px;display:block;text-align:left ;margin-top: 0.4rem; margin-left:55px;background-color: #dedede;line-height:25px;">{{serviceEmail}}</div>
            <div v-if="otherServiceLocation" style="padding-left:4px;width:480px;text-indent:2px;display:block;text-align:left ;margin-top: 0.4rem; margin-left:55px;background-color: #dedede;line-height:25px;">{{otherServiceLocation}}</div>
    </div>
    <div style="width: 18%;float: right; margin-top: 20px;">
                <NoteBox style="color:#414142">
                    <b-icon-info-circle-fill />
                    <br />
                    For service by mail, the date the documents were served is 14 days after the date the documents were mailed, or the date the documents were confirmed as delivered if sent by registered mail.
                </NoteBox>
            </div>
</div>
<!-- <1A> : END -->
<!-- <2> : BEGIN -->
    <div style="display:block; margin-top: 2rem;"> 
            <b>with the following document(s) attached to this certificate:</b>
            <div style="color:#626262"><i>Select all options that apply</i></div>
    </div> 
        <div>
            <div style="width: 80%; float: left; margin-right: 10px;">
    
        
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
                    :check="documentList.includes('Financial Statement')?'yes':''" text="Financial Statement"/>
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
                    :check="documentList.includes('Guardianship Affidavit')?'yes':''" text="Guardianship Affidavit"/>
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
                    :check="documentList.includes('Instructions about filing reply')?'yes':''" text="Instructions about filing reply"/>
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
                    :check="documentList.includes('Application for Case Management Order')?'yes':''" text="Application for Case Management Order"/>
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
                    :check="documentList.includes('Application About a Protection Order')?'yes':''" text="Application About a Protection Order"/>
            </div>
            <div style="width:50%;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:inline;"
                    :check="documentList.includes('other')?'yes':''" text='Other <span style="color:#626262;font-style:italic;">(list additional document(s))</span>:'/>
            </div>
        </div>
        <div class="marginleft row" style="margin:0.25rem 0 0 0;">
            <div style="width:50%;">
                <check-box
                    checkbox=""
                    style="display:inline;" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    :check="documentList.includes('Application About Priority Parenting Matter')?'yes':''" text="Application About a Priority Parenting Matter"/>
                    <br/>
                    <check-box
                    checkbox=""
                    style="display:inline;" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    :check="documentList.includes('Order')?'yes':''" text="Order"/>
            </div>
            
            <div style="width:50%;margin-left:-35px;">
                <!-- <underline-form 
                style="text-indent:2px;margin-left:20px;" 
                textwidth="250px" 
                beforetext="" 
                hint="" 
                :italicHint="false" :text="?documentListComment:''"/>  -->
                <div v-if="documentList.includes('other')" style="margin-top:3px;background-color: #dedede;padding:5px;margin-left:25px;min-height:50px;margin-left:60px;">
                    {{documentListComment}}
                    </div>                   
                    <div v-else style="background-color: #dedede;padding:5px;margin-left:25px;min-height:50px;margin-bottom:0rem;margin-left:60px;"></div>   
            </div> 
            
        </div>
    </div> 
    <div style="width: 18%;float: right; margin-top: 20px;">
                <NoteBox style="color:#414142">
                    <b-icon-paperclip />
                    <br />
                    You must attach a copy of each document you served to this Certificate of Service.
                </NoteBox>
            </div>
</div> 
<!-- <2> : END -->
<!-- <3> : BEGIN -->    
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="display:block; margin-top: rem;"> 
            <b>by:</b>
            </div> 
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    Personal Service
            </div>
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box 
            checkbox="" 
            inline="inline" 
            :shiftmark="1"
            boxMargin="0" 
            style="display:block; margin-left: 1rem;" 
            :check="personalServiceMethod == 'Leaving a copy of the document(s) with the person'?'yes':''" 
            text="Leaving a copy of the document(s) with the person"/>

        <check-box 
            checkbox="" 
            inline="inline" 
            :shiftmark="1"
            boxMargin="0" 
            style="display:block; margin-left: 1rem;" 
            :check="personalServiceMethod == 'other'?'yes':''" 
            text="Alternate service method ordered by the court as follows:"/>          
        <div v-if="personalServiceMethod == 'other'" style="background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-left:45px;">
                    {{personalServiceMethodComment}}
                    </div>
                    <div v-else style="background-color: #dedede;padding:10px;margin-left:25px;min-height:70px;margin-bottom:0rem;margin-left:45px;"></div> 
                 
            </div>             
        </div>
        <div style="width: 18%;float: right; margin-top: 30px;">
                <NoteBox style="color:#414142">
                    <b-icon-info-circle-fill />
                    <br />
                    An Application About a Family Law Matter can only be served by personal service. 
                    An Application About a Protection Order must also be served by personal service
                    unless the court grants permission to proceed without notice.
                </NoteBox>
            </div>
</div>
<!-- <3> : END -->
<!-- <4A> : BEGIN -->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="display:block; margin-top: 1rem;"> 
            </div> 
            <div style="margin-top: 0.3rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                Ordinary service to a party’s address for service
            </div>
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'leaveCopy'?'yes':''" 
                text="Leaving a copy of the document(s) at the person’s address for service"/>              
            </div>
            <div style="display:block;text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="ordinaryServiceMethod == 'ordinaryMail'?'yes':''" 
                    text="Mailing the document(s) by ordinary mail to the person’s address for service"/>
                    <underline-form v-if="mailServiceDate"
                    style="text-indent:1px;display:inline;margin-left:45px;" 
                    textwidth="7rem" 
                    beforetext="on" 
                    hintMargin="20px"
                    hint="(dd/mmm/yyyy)" 
                    textBackgroundColor="#dedede"
                    :text="mailServiceDate"/>
                <div v-else style="margin-left:20px;" >
                <div style="margin-left:25px;">on</div>
                <div style="margin-top:-20px;width:7rem;text-indent:15px;background-color: #dedede;padding:10px;margin-left:45px;margin-bottom:3rem;min-height:15px;"></div>   
                 <div style="font-size:6pt;margin-top:-50px;margin-left:68px;">(dd/mmm/yyyy)</div>
                </div>              
                <div style="display:block; margin-top:1px;margin-left:45px;font-size:8pt;color:#626262"> 
                    Note: The date the document is served is 14 days after this date.
                </div>
            </div>  
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    :shiftmark="1"
                    boxMargin="0" 
                    style="display:block; margin-left: 1rem;" 
                    :check="ordinaryServiceMethod == 'registeredMail'?'yes':''" 
                    text="Mailing the document(s) by registered mail to the person’s address for service"/>   
                <div style="display:block; margin-left:45px;font-size:8pt;color:#626262"> 
                    Note: The date the document is served is the date the document was confirmed to have been delivered.
                </div>    
            </div>    
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'email'?'yes':''" 
                text="Emailing the document(s) to the person’s email address for service"/>           
            </div>  
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">     
            <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'fax'?'yes':''" 
                text="Faxing the document(s) to the person’s fax number for service"/>           
            </div>
                   
        </div>
        <div style="width: 18%;float: right; margin-top:30px;">
                <NoteBox style="color:#414142">
                    <b-icon-paperclip />
                    <br />
                    If you served the documents by registered mail, you must
                    attach a copy of the delivery confirmation.
                </NoteBox>
        </div>
</div>
<!-- <4A> : END -->
    
<!-- <4B> : BEGIN --> 
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="display:block; margin-top:0.5rem;"> 
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0rem -1rem;">
                <check-box 
                checkbox="" 
                inline="inline" 
                :shiftmark="1"
                boxMargin="0" 
                style="display:block; margin-left: 1rem;" 
                :check="ordinaryServiceMethod == 'other'?'yes':''" 
                text="Alternative service method ordered by the court as follows:"/>           
                <div v-if="ordinaryServiceMethodComment" style="background-color: #dedede;padding:5px;font-size: 11pt;margin-left:45px;min-height:70px;">{{ordinaryServiceMethodComment}}</div>
               <div v-else style="text-indent:15px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:45px;margin-bottom:2.5rem;min-height:70px;"></div> 
                
            </div>  
        </div>
    </div>     
</div>
<!-- <4B> : END -->   
<!-- <4C> : BEGIN --> 
    <div>
        <div style="width: 80%; float: left; margin-left: -15px;">
            <div style="text-indent: -0px;display:block;margin-top:50px;">
                <div style="margin-left:0px;" >
                <div style="margin-top:-20px;width:250px;text-indent:15px;background-color: #dedede;padding:10px;margin-left:45px;margin-bottom:3rem;min-height:38px;"></div>   
                 <div style="font-size:6pt;margin-top:-50px;margin-left:68px;">Signature of the person who served the document</div>
                </div>   
                <div style="margin-left:300px;margin-top:-49px" >
                <div style="margin-top:-20px;width:200px;text-indent:15px;background-color: #dedede;padding:10px;margin-left:45px;margin-bottom:3rem;min-height:38px;"></div>   
                 <div style="font-size:6pt;margin-top:-50px;margin-left:78px;">Date of signature (dd/mmm/yyyy)</div>
                </div>  
            </div>  
            
    </div>     
</div>
<!-- <4C> : END -->   

        
        
        

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
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        NoteBox,
        GreyBoxForm       
    }
})
export default class Form7Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
    party1lastName='';
    party2lastName=''
   
    yourInfo = {} as yourInformationInfoDataInfoType;
    servedPersonName = '';
    serviceDate = '';
    serviceTime = '';
    
    documentList = [];
    documentListComment = '';
    serviceDetails = '';    
    serviceAddress='';
    serviceEmail = '';
    serviceFax  = '';
    servicePhone = '';
    serviceContact='';
    otherServiceLocation='';
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
        console.log(this.result);
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);        
        this.party1lastName = this.result.otherFormsLastNamesOfPartiesSurvey?.party1; 
        this.party2lastName = this.result.otherFormsLastNamesOfPartiesSurvey?.party2;  
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
        this.serviceAddress = '';
        this.otherServiceLocation = '';
        this.serviceEmail = '';
        this.serviceFax = '';
        this.servicePhone = '';
        this.serviceContact = '';
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
                this.serviceAddress = addressText;
            } 
            this.otherServiceLocation = serviceData.otherServiceLocation?.length>0? 'other: '+ serviceData.otherServiceLocation:'';
            this.serviceEmail = serviceData.serviceContact?.email?.length>0? 'email: '+ serviceData.serviceContact?.email:'';
            this.serviceFax = serviceData.serviceContact?.fax?.length>0? 'fax: '+ serviceData.serviceContact?.fax:'';
            this.servicePhone = serviceData.serviceContact?.phone?.length>0? 'phone: '+ serviceData.serviceContact?.phone:'';

            this.serviceDetails = this.serviceAddress + ' ' + this.serviceEmail + ' ' + this.serviceFax + ' ' + this.servicePhone + ' ' + this.otherServiceLocation;
            this.serviceContact = this.serviceFax + ' ' + this.servicePhone;
            

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
