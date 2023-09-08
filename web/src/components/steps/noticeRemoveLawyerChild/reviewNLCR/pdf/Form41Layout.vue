<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Removal of Lawyer for Child</b></div>               
                <div style="font-size:10pt;"><b>FORM 41</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 162</div>
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

        <div style="text-indent:5px;display:inline; font-size: 9pt; font-weight: 700;"> 
            In the Provincial Court of British Columbia
        </div> 
        <div style="margin:0.25rem 0 0 0rem;">
            
            <underline-form 
                style="text-indent:0;margin-left:.05rem;display:inline-block;" 
                textwidth="10rem" 
                beforetext="I" 
                hint="(full name of lawyer)" 
                :text="applicantName | getFullName"/>  

            am no longer representing the following child(ren) in this case:
        </div>

        <b-table
            :items="childDetails"
            :fields="childTableFields"
            class="mt-4"
            small
            bordered>                    
            <template v-slot:cell()="data">
                <div style="font-size:11pt;color:#000">{{data.value}}</div>                                           
            </template>
            <template v-slot:head(dob)>
                Child’s Date of Birth <br><span style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</span>                            
            </template>                       
        </b-table>

        <div style="margin-top: 1rem;"></div>

        <check-box 
            inline="inline"
            shiftmark="1"
            shift="10"
            boxMargin="0" 
            style="margin:0 0 0 0.5rem; display:inline;" 
            :check="acknowledgeService?'yes':''" 
            text="I understand I need to serve each party with a filed copy of this notice"/>

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
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { noticeRemoveLawyerChildDataInfoType, childInformationNlcrDataInfoType } from '@/types/Application/NoticeRemoveLawyerChild';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
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
        {key:"name",label:"Child’s full name",     tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"dob", label:"Child’s Date of Birth", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
    ];
   
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
        }             
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>