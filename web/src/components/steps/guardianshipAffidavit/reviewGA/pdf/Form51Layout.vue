<template>
    <div v-if="dataReady">
       <electronic-filing-statement
            :isLawyer=isLawyer
            :lawyerName=lawyerName
            :parties=parties
            :otherParties=otherParties
            :applicant=applicant
            :documents=documents
            :location=result.applicationLocation
            :filingNumber=existingFileNumber
       />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import ElectronicFilingStatement from "@/components/steps/affidavit/ElectronicFilingStatementLayout.vue"
import { nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { electronicFilingStatementDataInfoType } from '@/types/Application/Affidavit';

@Component({
    components:{
        ElectronicFilingStatement
    }
})

export default class Form51Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;  

    isLawyer = false;
    lawyerName = '';
    parties = '';
    otherParties = '';
    applicant = '';
    documents = '';

    existingFileNumber = '';
    
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){       
        this.getDocumentInfo();    
        this.getFilingInfo();    
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);        
    } 

    public getFilingInfo(){    
        
        this.isLawyer = false;
        this.lawyerName = '';
        this.parties = '';
        this.otherParties = '';
        this.applicant = '';

        if(this.result?.electronicFilingStatementGaSurvey){

            let electronicFilingStatement = {} as electronicFilingStatementDataInfoType;

            electronicFilingStatement = this.result.electronicFilingStatementGaSurvey; 
            
            this.isLawyer = electronicFilingStatement.Lawyer == 'y';

            if (this.isLawyer){

                this.lawyerName = electronicFilingStatement.ApplicantName?Vue.filter('getFullName')(electronicFilingStatement.ApplicantName):'';
                const partiesList = [];
                for (const party of electronicFilingStatement.PartyInfoEfsp){
                    partiesList.push(Vue.filter('getFullName')(party.name))
                }
                this.parties = partiesList.join(', ')
            } else {
                this.applicant = electronicFilingStatement.ApplicantName?Vue.filter('getFullName')(electronicFilingStatement.ApplicantName):'';
            }           

            const otherPartiesList = [];
            for (const otherParty of electronicFilingStatement.OtherPartyInfoEfsp){
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ')
           
        }            
    }

    public getDocumentInfo(){       
        
        this.documents = '';        

        if(this.result?.gaEfsDocuments?.length>0){
            const documentName = this.result.gaEfsDocuments[0].documentName;
            const applicant = Vue.filter('getFullName')(this.result.gaEfsDocuments[0].efsApplicantName);
            this.documents = documentName + ' of ' + applicant;
        }        
    
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>