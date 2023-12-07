<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Guardianship Affidavit</b></div>               
                <div style="font-size:10pt;"><b>FORM 5</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 26, 51 and 172</div>
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
            beforetext="I" 
            hint="(full name)" 
            :italicHint="false" :text="yourInfo.name | getFullName"/>

        <underline-form 
            style="text-indent:2px;display:inline-block; font-size: 9pt;" 
            textwidth="15rem" 
            beforetext="," 
            hint="(occupation)" 
            :italicHint="false" :text="yourInfo.occupation"/>

        <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
            of
        </div>

        <div style="margin-top: 1rem;">  

            <underline-form 
                style="text-indent:2px;font-size: 9pt;" 
                textwidth="30rem" 
                beforetext="" 
                hint="(address of party, city, province)" 
                :italicHint="false" :text="address"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                ,
            </div>

        </div>

        
        
        
        <div style="text-indent:5px;display:block; font-size: 9pt; margin-top: 2rem;"> 
            SWEAR OR AFFIRM THAT:
        </div> 
        <div style="display:block; font-size: 9pt; margin: 1rem 0 0 5px; font-weight: 700;"> 
            I know or believe the following facts to be true. If these facts are based on information 
            from others, I believe that information to be true.
        </div>
           
        <div style="margin-top: 1rem;"></div>  

    <!-- <1> -->        
        <section>
            <div style="display:inline; margin-left:0.25rem;font-size: 9pt; ">
                I am making this affidavit in support of an application under the Family 
                Law Act to become a guardian of the following child(ren):
            </div>          
            
            <b-table
                :items="childrenInfo"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table> 
        </section>

    <!-- <2> -->
        <div class="print-block">
            <section>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            </section>
        </div>

    <!-- <3> -->        
        <section>
            <div style="display:inline; margin-left:0.25rem;font-size: 9pt; ">
                The nature and length of my relationship with the child(ren) 
                referred to in paragraph 1 of this affidavit is as follows:
            </div>          
            
            <b-table
                :items="childrenInfo"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table> 
        </section>

    <!-- <4> -->        
        <section>
            <div style="display:inline; margin-left:0.25rem;font-size: 9pt; ">
                The current living arrangements of the child(ren) referred 
                to in paragraph 1 of this affidavit are as follows:
            </div>          
            
            <b-table
                :items="childrenInfo"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table> 
        </section>
    <!-- <5> -->
        <section>
            I plan to care for the child(ren) referred to in paragraph 1 of this affidavit as follows:
            <i>Set out detailed plans for how the child(ren) is/are to be cared for.</i>
            <div v-if="true" 
                class="answerbox">care details</div>
                <div v-else style="margin-bottom:3rem;"></div>  
        </section>

    <!-- <6> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="true?'yes':''" 
                    text="<b>I am not aware</b> of any incidents of family violence, as that term is defined in section 1 of the Family Law Act, that affect the
                        child(ren) referred to in paragraph 1 of this affidavit."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="true?'yes':''" 
                text="<b>I am aware</b> of the following incidents of family violence, as that term is defined in section 1 of the Family Law Act, that affect
                    the child(ren) referred to in paragraph 1 of this affidavit:<br><i>Describe the incidents of family violence of which you are aware</i>"/>
            
            <div v-if="true" 
                class="answerbox">test</div>
            <div v-else style="margin-bottom:3rem;"></div>  
        </section>

    <!-- <7> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="true?'yes':''" 
                    text="<b>I am not</b> a parent, step-parent or guardian of any children except that child/those children referred to in paragraph 1 of this
                        affidavit."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="true?'yes':''" 
                text="<b>I am</b> the parent, step-parent or guardian of the following child(ren) who is/are not referred to in paragraph 1 of this affidavit."/>
            
            <b-table
                :items="childrenInfo"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table>  
        </section>

    <!-- <8> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="true?'yes':''" 
                    text="<b>I have not been</b> 
                    involved in court proceedings in British Columbia under the <i>Child, Family and Community Service Act</i>, the
                    <i>Family Relations Act</i>, the <i>Family Law Act</i>, or the <i>Divorce Act (Canada)</i>, or in any court proceedings under comparable
                    legislation in any other jurisdiction, concerning children under my care."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="true?'yes':''" 
                text="<b>I have been</b> 
                    involved in the following court proceedings in British Columbia under the <i>Child, Family and Community Service Act</i>, the
                    <i>Family Relations Act</i>, the <i>Family Law Act</i>, or the <i>Divorce Act (Canada)</i>, and/or in any court proceedings under comparable
                    legislation in any other jurisdiction, concerning children under my care."/>
            
            <b-table
                :items="childrenInfo"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table>  
        </section>




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
                <underline-form marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem" beforetext="" hint="[print name or affix stamp of commissioner]" text="" />
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
import { childGaInfoType } from '@/types/Application/GuardianshipAffidavit';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})

export default class Form5Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    existingFileNumber = '';  
   
    yourInfo = {} as yourInformationInfoDataInfoType; 
    address = '';
    supportApplication = false;
    appType = '';   
    otherType = '';
    additionalAppType = []; 
    stories: storyDataInfoType[] = [];
    lastStory = {} as storyDataInfoType; 
    storyCount = 0;

    childrenInfo: childGaInfoType[] = [];

    childrenFields = [
        {key:"fullName",               label:"Child's full name",                                           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",                         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"currentGuardiansToChild",label:"Name(s) of child's current guardian(s)",                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"parentsNotGuardians",    label:"Name(s) of child's parent(s) who are not current guardian(s)",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ]  
   
    mounted(){
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.getAffidavitInfo();  
        this.getAffiantInfo();  
        this.getStoryInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        
    } 

    public getAffidavitInfo(){    
        
        this.supportApplication = false;
        this.appType = ''
        this.additionalAppType = [];
        this.otherType = '';

        if(this.result?.affidavitSurvey){

            let aff = {} as affidavitDataInfoType;
            aff = this.result.affidavitSurvey;

            this.supportApplication = aff.affidavitReason != 'response';            

            const appTypeInfo = aff.applicationType?aff.applicationType:[];

            const appList = [];
            let otherTypeInfo = '';

            for (const app of appTypeInfo){
                if (app == 'other'){
                    otherTypeInfo = aff.applicationTypeComment;
                } else {
                    appList.push('about ' + app.replace(/`/g, ''))
                }
            }

            if (appList.length == 0){

                this.appType = Vue.filter('truncate')(otherTypeInfo, 42);
                this.otherType = '';
                this.additionalAppType = [];

            } else if (appList.length == 1){

                this.appType = Vue.filter('truncate')(appList[0], 42);
                this.otherType = otherTypeInfo;
                this.additionalAppType = [];

            } else if (appList.length > 1){

                this.appType = Vue.filter('truncate')(appList[0], 42);
                this.otherType = otherTypeInfo;
                const additionalList = appList.slice(1)           

                for (let index = 0; index < additionalList.length; index+=2){
                    
                    this.additionalAppType.push(additionalList[index] + (additionalList[index + 1]?(', ' + additionalList[index + 1]):''))
                
                }
            }

        }
    }

    public getAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantSurvey){

            let aboutAffiant = {} as aboutAffiantDataInfoType;
            aboutAffiant = this.result.aboutAffiantSurvey;

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

    public getStoryInfo(){  
        
        this.stories = [];
        this.storyCount = 0;
        this.lastStory = {};

        const storyList: storyDataInfoType[] = [];
       
        if(this.result?.yourStoryAffSurvey?.storyAff){

            const storyInfo = this.result.yourStoryAffSurvey.storyAff;
            for (const story in storyInfo){
               storyList.push({index: Number(story) + 2, content:storyInfo[story].storyDescription})
            }

            this.storyCount = storyList.length;

            if (this.storyCount == 0){

                this.stories = []
                this.lastStory = {};

            } else if (this.storyCount == 1){

                this.lastStory = storyList[0];                
                this.stories = [];

            } else if (this.storyCount > 1){

                this.stories = storyList.slice(0, this.storyCount - 1);
                this.lastStory = storyList.slice(this.storyCount-1)[0];               
            } 


        }
            
    }  
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>