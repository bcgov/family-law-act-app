<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Electronic Filing Statement</b></div>               
                <div style="font-size:10pt;"><b>FORM 51</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 193</div>
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
        
<!-- <1> -->
        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                <i>Select the applicable option and complete the required information</i>
            </div> 
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="isLawyer?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="10rem" 
                    beforetext="" 
                    hint="(full name of person)" 
                    :text="isLawyer?lawyerName:''"/>   
                <underline-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                    textwidth="20rem" 
                    beforetext="am the lawyer for" 
                    hint="(full name of party/parties)" 
                    :italicHint="false" :text="isLawyer?parties:''"/>                
            </div>

            <div class="marginleft2p5vue" style="margin:0.5rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="!isLawyer?'yes':''" 
                    text="I"/>
                <underline-form 
                    style="text-indent:0;margin-left:.25rem;display:inline-block;" 
                    textwidth="15rem" 
                    beforetext="" 
                    hint="(full name of party)" 
                    :text="!isLawyer?applicant:''"/>   
                <div style="display:inline-block;margin-left:1.25rem;">, am not represented by a lawyer</div>
            </div>
        </section>
           
        <div style="margin-top: 1rem;"></div>  

<!-- <2> -->   
        <section > 
            <underline-form 
                style="margin-top:0.5rem; text-indent:2px;display:inline-block;" 
                textwidth="32.5rem" 
                beforetext="The other party is" 
                hint="full name of the other party/parties" 
                :italicHint="false" 
                :text="otherParties"/> 
        </section>
        

           
        <div style="margin-top: 1rem;"></div>
    <!-- <3> -->
    
        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I advise as follows:
            </div> 
            <div style="margin:0.25rem 0 0 1.5rem;">
                
                <underline-form 
                    style="text-indent:2px;margin-left:0rem;display:inline-block;" 
                    textwidth="17rem" 
                    beforetext="The" 
                    hint="name and identifying description of document" 
                    :text="documents"/>   
                <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                    is being submitted for filing electronically <i>(add if applicable)</i>
                </div>

                <underline-form 
                    style="text-indent:2px;margin: 0.5rem 0 0 -1rem;display:inline-block; font-size: 9pt;" 
                    textwidth="20rem" 
                    beforetext=" on behalf of" 
                    hint="(full name of party/parties)" 
                    :italicHint="false" :text="isLawyer?parties:''"/>                
            </div>
            
        </section>

        <div style="margin-left: 1.5rem; display:inline-block; font-size: 9pt; margin-top: 1rem;"> 
            The original paper version of the document being submitted for filing electronically 
            appears to bear an original signature of the person identified as the signatory and 
            I have no reason to believe that the signature on the document is not the signature 
            of the identified signatory.
        </div>

        <div style="margin-left: 1.5rem; display:inline-block; font-size: 9pt; margin-top: 1rem;"> 
            The version of the document that is being submitted for filing electronically appears 
            to be a true copy of the original paper version of the document and I have no reason 
            to believe that it is not a true copy of the original paper version.
        </div>


        <div style="margin:2rem 0 0 1rem; width:96.37%; font-weight:bold; font-size: 16pt; padding:0.5rem;font-family:BCSans">
            <underline-form 
                style="text-indent:2px;display:inline-block;margin:0 5rem 0.5rem 0;" 
                textwidth="12rem" 
                beforetext="" 
                hint="Date (mmm/dd/yyyy)" text=""/>
            <underline-form 
                style="text-indent:2px;display:inline-block;" 
                textwidth="20rem" 
                beforetext="" 
                hint="Signature" 
                text=""/>               
            
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
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { electronicFilingStatementDataInfoType } from '@/types/Application/Affidavit';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
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
        console.log(this.result)     
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