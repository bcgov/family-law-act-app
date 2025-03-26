<template>
    <div v-if="dataReady" style="font-size: 10pt;">
<!-- Page 1 -->
<!-- <HEADER> -->
        <FormHeader formName="Request to File an Agreement" formNumber="Form 26" formRuleNumber="Rule 132" :headerTableData="
            [{value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            null, 
            {value: ''}]"></FormHeader>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Request to File an Agreement provides information about a written agreement that a person is filing under the <i>Family Law Act</i> in the Provincial Court. A written agreement that is filed in Provincial Court under the <i>Family Law Act</i> is enforceable under the Act as if it were an order of the Provincial Court.
                </div>
            </div>
            <div style="width: 20%;">

            </div>        
        </div>
        
<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="About the parties"></FormPart>

                <div style="margin-bottom: 1rem;">
                    <b>1. </b> 
                    <grey-box-form 
                        style="text-indent:2px;display:inline;" 
                        textwidth="25.6rem" 
                        beforetext="<b>My full name</b> is: " 
                        hint="Full name of party"
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor" 
                        :italicHint="false" 
                        :text="yourInfo.name | getFullName"
                    />
                </div>

                <div>
                    <grey-box-form 
                        style="display:inline;text-indent:2px;" 
                        textwidth="25.6rem" 
                        beforetext="My <b>date of birth</b> is: " 
                        hint="(dd/mmm/yyyy)" 
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor" 
                        :italicHint="false" 
                        :text="yourInfo.dob | beautify-date-mid"
                    />
                </div>
    
                <div style="margin-bottom: 1rem;"></div>

                <div> 
                    <b>3. </b>
                    <div style="display:inline;">
                        <GreyBoxForm  style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="The full name of <b>other party to this agreement</b> is:" hint="" :italicHint="false" :text="otherPartyInfo[0].name | getFullName" />
                        <!-- <GreyBoxForm v-else style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>other party’s full name</b> is:" hint="full name of the other party" :italicHint="false" text="" /> -->
                        <br>
                        <br>
                        <GreyBoxForm style="display:inline;text-indent:2px;margin-left:45px;" textwidth="14.7rem" hintMargin="10px" hintindent="4rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="" :italicHint="false" :text="otherPartyInfo[0].dob | beautify-date-mid" />
                        <!-- <GreyBoxForm v-else style="display:inline;text-indent:2px;" textwidth="16rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" text=" " /> -->
                    </div>
                    <div style="padding: 20px">
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;" :check="otherPartyInfo.length > 1?'yes':''" text="There is an additional party."/>
                        <div>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].name" style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The <b>additional party’s</b> full name is:" hint="full name of the other party" :italicHint="false" :text="otherPartyInfo[1].name | getFullName"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <span style="display: inline">The <b>additional party’s</b> full name is:</span>
                                <div style="background-color:#d6d6d6;height: 22px; width: 250px; margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                            <br/>
                            <GreyBoxForm v-if="otherPartyInfo.length > 1 && otherPartyInfo[1].dob" style="display:inline;text-indent:2px;" textwidth="6rem" beforetext="Their <b>date of birth</b>(dd/mmm/yyyy) is:" hint="date of birth (dd/mmm/yyyy)" :italicHint="false" :text="otherPartyInfo[1].dob | beautify-date-mid"/>
                            <div v-else style="text-indent:2px;display:inline-block;margin-top:10px;"> 
                                <p style="display: inline">Their <b>date of birth</b>(dd/mmm/yyyy) is:</p>
                                <div style="background-color:#d6d6d6; min-height: 22px; width: 250px;  margin-top:-25px; margin-left: 252px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%;"></div>        
        </div>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Request to file agreement"></FormPart>
   
                <div class="print-block" style="margin-top: 1rem;">
                    <div> 
                        <b>3. </b> <div style="margin:0rem 0 0 0.5rem; display:inline; font-size: 10">
                            <check-box 
                                boxMargin="0"
                                shiftmark="0"
                                inline="inline"
                                style="display:inline; margin:0 0.5rem 0 0;" 
                                :check="form26Info.filed?'yes':''" 
                                text="I <b>request to file a copy of the written agreement</b> dated,"/>               
                            <underline-form style="text-indent:1px;display:inline;" textwidth="7.25rem" beforetext="" hint="(dd/mmm/yyyy)" :text="form26Info.agreementDate | beautify-date-mid"/>
                            <div style="text-indent:0px;display:inline;"> between the above parties, in the Provincial Court.</div>
                        </div>              
                    </div>
                </div> 

            <!-- <4> -->
                <div class="print-block">
                    <div>
                        <b>4. </b>
                        <div style="margin:0 0 0 0.25rem;display:inline;  ">I am filing the written agreement <b>under the following provision(s)</b> of the <i>Family Law Act</i>:</div>
        
                        <div style="margin:0.25rem 0 0 1rem; " >
                            <i style="color: #999;">Select all options that apply</i>                                   
                            <check-box                                                                                     boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section15')?'yes':''" 
                                text="section 15 <i>[when parenting coordinators may assist]</i>"/>               
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section44')?'yes':''" 
                                text="section 44 (3) <i>[agreements respecting parenting arrangements]</i>"/>   
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section58')?'yes':''" 
                                text="section 58 (3) <i>[agreements respecting contact]</i>"/>   
                            <check-box
                                boxMargin="0"
                                shiftmark="0"
                                :check="form26Info.agreementList.includes('section92')?'yes':''" 
                                text="section 92(e), (f) and (g) <i>[agreements respecting property division]</i>"/>
                            <check-box 
                                boxMargin="0"
                                shiftmark="0"                           
                                :check="form26Info.agreementList.includes('section148')?'yes':''" 
                                text="section 148 (2) <i>[agreements respecting child support]</i>"/>   
                            <check-box    
                                boxMargin="0"
                                shiftmark="0"                        
                                :check="form26Info.agreementList.includes('section163')?'yes':''" 
                                text="section 163 (3) <i>[agreements respecting spousal support]</i>"/>
                        </div>                        
                    </div>
                </div>

            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-file-earmark-text />
                    <p>
                        You must file a copy of the written agreement along with this form.
                    </p>
                </NoteBox>

                <div style="margin-bottom: 1rem;"></div>
                
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>                
                        To determine what section applies, look at the terms in written agreement to see what the agreement is about. It may be filed under more than one section of the <i>Family Law Act</i> if your agreement is about different issues.
                        <br>
                        Section 92 applies to agreements respecting companion animals
                    </p>
                </NoteBox>
            </div>        
        </div>

        <div style="margin-bottom: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Address for service"></FormPart>

                <div>
                    <b>5. </b>
                    <div style="display: inline; margin:0.25rem 0; text-indent:0px;">
                        My <b>address for service</b> of court documents and contact information is:
                        <br>
                        <i style="color: #999;">You must provide an address for service and contact number, but it does not have to be your own if you don’t want to:</i>
                    </div>

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable): </td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>                
                        This information will be available to the other party and the court.
                    </p>
                </NoteBox>
            </div>        
        </div>

        <div class="print-block mt-5"></div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { enfrcOtherPartyDataInfoType, form26InformationDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { enforceAgreementOrOrderSurveyDataInfoType } from '@/types/Application/AgreementEnforcement';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox,
        FormHeader,
        FormPart,
        NoteBox,
        GreyBoxForm     
    }
})

export default class Form26Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form26Info = {} as form26InformationDataInfoType;
    
    existingFileNumber = ''   
    
    hintFontSize = '8pt';
    hintTextColor = '#333';

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
               
        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }       
        
        this.yourInfo = this.getYourInfo();
        this.form26Info = this.getForm26Info();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);        
    } 
    

    
    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: enfrcOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as enfrcOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;

                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getForm26Info() {        

        const form26Information = {} as form26InformationDataInfoType;
        form26Information.agreementList = [];
        form26Information.agreementDate = '';        
        
        if (this.result?.enfrcQuestionnaireSurvey?.includes('writtenAgreementOrder') && this.result?.enforceAgreementOrOrderSurvey) { 

            const enfrcAgrmntOrdr: enforceAgreementOrOrderSurveyDataInfoType = JSON.parse(JSON.stringify(this.result.enforceAgreementOrOrderSurvey));

            const form26Conditions = (enfrcAgrmntOrdr.enforceOrder == "n") && (enfrcAgrmntOrdr.filedOrder == 'n') && (enfrcAgrmntOrdr.existingType == "writtenAgreement")

            form26Information.agreementDate = (form26Conditions)?Vue.filter('beautify-date')(enfrcAgrmntOrdr.existingDate):'';
            form26Information.agreementList = (form26Conditions)?enfrcAgrmntOrdr.agreementType:[];
            form26Information.filed = form26Conditions;
        }
        //console.log(form26Information)
        if(this.result?.enfrcQuestionnaireSurvey?.includes('parentingCoordinatorDetermination')){
            const detData  = this.result?.enforceChangeSetAsideDeterminationSurvey
            if(detData?.filedOrder == "n" && detData?.appointedDetermination?.selected == "writtenAgreement" && detData?.filedAgreement == "n"){
                form26Information.agreementList.push("section15");
                if(form26Information.agreementDate == ''){
                    form26Information.filed = true;
                    form26Information.agreementDate = Vue.filter('beautify-date-blank')(detData?.appointedDetermination?.writtenAgreementDate);
                }            
            }
       
        }

        return form26Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>