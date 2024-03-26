<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Financial Statement</b></div>             
                <div style="font-size:10pt;"><b>FORM 4</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 3, 25, 28 and 172</div>
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
            style="text-indent:2px;display:inline; font-size: 9pt; margin-top: 1rem;" 
            textwidth="15rem" 
            beforetext="<b>I,</b>" 
            hint="(full name of party)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline; font-size: 9pt; margin-top: 1rem;" 
            textwidth="7rem" 
            beforetext=" " 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.occupation"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" 
            textwidth="17rem" 
            beforetext="of" 
            hint="(address of party, city, province)" 
            :italicHint="false" :text="address"/>

            
        <div style="text-indent:5px; display: block; font-size: 9pt; margin-top: 2rem; font-weight: 700;"> 
            Swear or affirm that:
        </div> 
        
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                The information set out in this financial statement is true, to the best of my knowledge.
            </div>
        </section>

    <!-- <2> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I have made complete disclosure in this financial statement of:
            </div>
            <div style="text-indent:5px;display:block; font-size: 9pt; font-style: italic;"> 
                Select all options that apply
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="requiredParts.part1Required?'yes':''" 
                    text="my income, including benefits and adjustments, if any, in Part 1"/>
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="requiredParts.part2and3Required?'yes':''" 
                    text="my expenses and debts, in Part 2"/>
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="requiredParts.part2and3Required?'yes':''" 
                    text="my assets, in Part 3"/>
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="requiredParts.part4Required?'yes':''" 
                    text="income of other person(s) in my household, in Part 4"/>
            </div>

            <div style="display:block;">
                <check-box 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline; margin-left: 1rem;" 
                    :check="requiredParts.part5Required?'yes':''" 
                    text="undue hardship, in Part 5"/>
            </div>           
                    
        </section>
       

        <div class="print-block">

        <!-- <SWEAR > --> 

            <div style="text-indent:5px;display:block; font-size: 9pt;margin:1rem 0 0 0"> 
                Sworn or affirmed before me 
            </div>

            <div style="margin:0.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem" beforetext="at" hint="(city)" text="" />
                <div style="text-indent:5px;display:inline; font-size: 9pt;margin:1rem 0 0 0"> 
                    , British Columbia 
                </div>
            </div>
            <div style="margin:.5rem 0 0 0">
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="on" hint="(date)" text="" />
            </div>

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div class="row" style="margin: 0 0 0 0.15rem">
                <div style="width:20rem; display:inline-block; font-size:9pt" >
                    A Commissioner for taking Affidavits in British Columbia
                    (print name or affix stamp of commissioner)
                </div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
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
import { aboutAffiantDataInfoType} from '@/types/Application/Affidavit';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})
export default class Form4Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType; 
    address = '';
    requiredParts = {
        part1Required: false,
        part2and3Required: false,
        part4Required: false,
        part5Required: false
    };   
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){
        this.getAffiantInfo();  
        this.getFsInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        
    }
   
    public getAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantFsSurvey){

            let aboutAffiant = {} as aboutAffiantDataInfoType;
            aboutAffiant = this.result.aboutAffiantFsSurvey;

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

    public getFsInfo(){  
        
        this.requiredParts = {
            part1Required: false,
            part2and3Required: false,
            part4Required: false,
            part5Required: false
        }
       
        if(this.result?.financialStatementSurvey){
            this.requiredParts = Vue.filter('getFsRequiredParts')(this.result.financialStatementSurvey);
        }
            
    }  
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
