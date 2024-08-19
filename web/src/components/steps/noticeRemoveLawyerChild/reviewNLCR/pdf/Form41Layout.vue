<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader formName="Notice of Removal of Lawyer for Child" formNumber="Form 41" formRuleNumber="Rule 162" :headerTableData="
            [{value: result.applicationLocation}, 
            {value: existingFileNumber}]"></FormHeader>

        <div style="margin-bottom: 1rem;"></div>

        <p style="font-size: 12pt;">This Notice of Removal of Lawyer for Child provides notice to the court and each party that a lawyer has stopped representing a child who is the subject of the family law case.</p>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Party information"></FormPart>
                
                <div style="font-size: 12pt; margin-bottom: 10px;">
                    <p><b>1. </b> The <b>parties to this case</b> are:</p> 
                    
                    <grey-box-form 
                        v-for="(otherPartyPanel, idx) of otherPartyDetails" 
                        style="text-indent:2px;display:inline-block; font-size: 12pt;" 
                        textwidth="33rem" 
                        beforetext="" 
                        :hint="idx == otherPartyDetails.length - 1 ? 'Full name of each party': ''" 
                        hintindent="12rem"
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor"
                        :italicHint="false" 
                        :text="otherPartyPanel.name | getFullName"/>
                </div>

                <div>
                    <b>2. </b>
                    <check-box 
                        inline="inline"
                        shiftmark="1"
                        shift="10"
                        boxMargin="0" 
                        textDisplay="inline"
                        style="margin:0 0 0 0.5rem; display:inline; font-size: 12pt;" 
                        :check="acknowledgeService?'yes':''" 
                        text="I understand <b>I need to serve each party</b> with a filed copy of this notice."/> 
                </div>
            </div>
            <div style="width: 20%;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>                
                        The lawyer for a child must file and serve this notice on each other party when the lawyer stops representing the child [Rule 162].
                    </p>
                </NoteBox>
            </div> 
        </div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Lawyer for child"></FormPart>
                                
                <div>
                    <b>3. </b>
                    <grey-box-form 
                        style="text-indent:0;margin-left:.05rem;display:inline-block; font-size: 12pt;" 
                        textwidth="30rem" 
                        beforetext="I, " 
                        hint="Full name of lawyer"
                        hintindent="12rem"
                        :hintFontSize="hintFontSize"
                        :hintTextColor="hintTextColor" 
                        :text="applicantName | getFullName"/>  
                    
                    <p style="font-size: 12pt; margin-top: 10px;">
                        am <b>no longer representing</b> the following child(ren) in this case:
                    </p>
                </div>

                <b-table
                    :items="childDetails"
                    :fields="childTableFields"
                    class="mt-4"
                    small
                >                    
                    <template v-slot:cell()="data">
                        <div style="font-size:12pt;color:#000; background: #d6d6d6;">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child’s Date of Birth <br><span style="font-size:9pt; font-weight: normal; color: #999;">(dd/mmm/yyyy)</span>                            
                    </template>                       
                </b-table>

            </div>
            <div style="width: 20%;"></div> 
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
import { nameInfoType, otherPartyNameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { noticeRemoveLawyerChildDataInfoType, childInformationNlcrDataInfoType } from '@/types/Application/NoticeRemoveLawyerChild';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        FormHeader,
        FormPart,
        NoteBox    
    }
})
export default class Form41Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  
    existingFileNumber = '';    
    acknowledgeService = false;

    childDetails: childInformationNlcrDataInfoType[] =[{name:'', dob: ''}];
    childTableFields = [
        {key:"name",label:"Child’s full name",     tdClass:"text-center align-middle", thClass:"  align-middle", thStyle:"font-size:10pt; width:55%; font-weight: bold; border: none; border-bottom: 2px solid #333; padding-left: 16px;"},
        {key:"dob", label:"Child’s date of Birth", tdClass:"text-center align-middle", thClass:"  align-middle", thStyle:"font-size:10pt; width:35%; font-weight: bold; border: none; border-bottom: 2px solid #333; padding-left: 16px;"},
    ];

    otherPartyDetails: otherPartyNameInfoType[] = [];

    hintFontSize = '8pt';
    hintTextColor = '#333';
   
    mounted(){
        this.dataReady = false;
        //console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){     
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLCRConfirmationSurvey?.confirmation == 'Confirmed';
        this.getNoticeRemoveLawyerChildInfo();     
    } 

    public getNoticeRemoveLawyerChildInfo(){ 
       
        this.childDetails = [{name: '', dob: ''}];        

        if(this.result?.noticeRemoveLawyerChildSurvey){
            let noticeRemoveLawyerChild = {} as noticeRemoveLawyerChildDataInfoType;
            noticeRemoveLawyerChild = this.result.noticeRemoveLawyerChildSurvey; 
            
            const childrenInfo = [];

            for (const child of noticeRemoveLawyerChild.ChildInfoNlcr){
                const childInfo = {} as childInformationNlcrDataInfoType;
                childInfo.dob = child.dateOfBirth?Vue.filter('beautify-date')(child.dateOfBirth):'';
                childInfo.name = child.name?Vue.filter('getFullName')(child.name):'';
                childrenInfo.push(childInfo);
            }

            if (childrenInfo.length>0){
                this.childDetails = childrenInfo;
            }   
            
            if (noticeRemoveLawyerChild.otherPartyNamesDynamicPanel && noticeRemoveLawyerChild.otherPartyNamesDynamicPanel.length > 0) {
                this.otherPartyDetails = noticeRemoveLawyerChild.otherPartyNamesDynamicPanel;
            }
        }             
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>