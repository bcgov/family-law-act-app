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
                :fields="childFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="min-height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                    </template>
            </b-table> 
        </section>

    <!-- <2> -->
        <div class="print-block">
            <section>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob"/>
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
                :fields="childRelationshipFields"
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
                :fields="childLivingArrangementFields"
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
            <div v-if="careDetails.length>0" 
                class="answerbox">{{careDetails}}</div>
                <div v-else style="margin-bottom:3rem;"></div>  
        </section>

    <!-- <6> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="!familyViolenceExists?'yes':''" 
                    text="<b>I am not aware</b> of any incidents of family violence, as that term is defined in section 1 of the Family Law Act, that affect the
                        child(ren) referred to in paragraph 1 of this affidavit."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="familyViolenceExists?'yes':''" 
                text="<b>I am aware</b> of the following incidents of family violence, as that term is defined in section 1 of the Family Law Act, that affect
                    the child(ren) referred to in paragraph 1 of this affidavit:<br><i>Describe the incidents of family violence of which you are aware</i>"/>
            
            <div v-if="familyViolenceExists" 
                class="answerbox">{{ familyViolenceDesc }}</div>
            <div v-else style="margin-bottom:3rem;"></div>  
        </section>

    <!-- <7> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="!otherChildrenExist?'yes':''" 
                    text="<b>I am not</b> a parent, step-parent or guardian of any children except that child/those children referred to in paragraph 1 of this
                        affidavit."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="otherChildrenExist?'yes':''" 
                text="<b>I am</b> the parent, step-parent or guardian of the following child(ren) who is/are not referred to in paragraph 1 of this affidavit."/>
            
            <b-table
                :items="otherChildrenInfo"
                :fields="otherChildrenFields"
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
                    :check="!courtProceedingsExist?'yes':''" 
                    text="<b>I have not been</b> 
                    involved in court proceedings in British Columbia under the <i>Child, Family and Community Service Act</i>, the
                    <i>Family Relations Act</i>, the <i>Family Law Act</i>, or the <i>Divorce Act (Canada)</i>, or in any court proceedings under comparable
                    legislation in any other jurisdiction, concerning children under my care."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="courtProceedingsExist?'yes':''" 
                text="<b>I have been</b> 
                    involved in the following court proceedings in British Columbia under the <i>Child, Family and Community Service Act</i>, the
                    <i>Family Relations Act</i>, the <i>Family Law Act</i>, or the <i>Divorce Act (Canada)</i>, and/or in any court proceedings under comparable
                    legislation in any other jurisdiction, concerning children under my care."/>
            
            <b-table
                :items="civilProceedingInfo"
                :fields="proceedingFields"
                class="mt-2"
                small
                bordered>  
                    <template v-slot:cell(courtOrderDates)="data">
                        <ul>
                            <li v-for="(orderDate,inx) in data.value" :key="inx" style="margin:0;">
                                {{ orderDate }}
                            </li>
                        </ul>
                    </template>                  
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    
            </b-table>  

            <div style="display:block; font-size: 9pt; margin: 1rem 0;"> 
                <ol class="list-brackets" style="margin:0.25rem 0 0 1.5rem;" type="a">
                    
                    <li v-for="exhibit in orderList" :key="exhibit.exhibitIndex" style="margin:0.5rem 0 0 0;">                        
                        <underline-form 
                            style="text-indent:0;margin-left:.75rem;display:inline-block;" 
                            textwidth="6rem" 
                            beforetext="The order dated" 
                            hint="(mmm/dd/yyyy)" 
                            :text="exhibit.fileDate | beautify-date"/>
                        <underline-form 
                            style="text-indent:1px;display:inline-block;" 
                            textwidth="3rem" 
                            beforetext="referred to in Item" 
                            hint="(1, 2, 3, etc.)" 
                            :text="exhibit.itemNo"/> 
                        <underline-form 
                            style="text-indent:1px;display:inline-block;" 
                            textwidth="3rem" 
                            beforetext="above is attached as Exhibit" 
                            hint="(A, B, etc.)" 
                            :text="exhibit.exhibitName.replace('Exhibit ', '')"/>
                    </li>
                            
                </ol>
            
            </div>
        </section>

    <!-- <9> -->
        
        <section>            
            <underline-form 
                style="text-indent:0;margin-left:.25rem;display:inline;" 
                textwidth="2.5rem" 
                beforetext="Attached to this affidavit and marked as Exhibit" 
                hint="(A, B, etc.)" 
                :text="mcfdRecord.exhibitName?mcfdRecord.exhibitName.replace('Exhibit ',''):''"/>
                <div style="text-indent:5px;display:inline;"> 
                    is a copy of a British Columbia Ministry of
                </div>           
                <underline-form 
                    style="text-indent:0;display: inline-block; margin: 0.25rem 0;" 
                    textwidth="6rem" 
                    beforetext=" Children and Family Development records check dated" 
                    hint="(mmm/dd/yyyy)" 
                    :text="mcfdRecord.fileDate?mcfdRecord.fileDate:''"/>                    
                <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                    .
                </div>            
                    
        </section>

    <!-- <10> -->
        
        <section>            
            <underline-form 
                style="text-indent:0;margin-left:.25rem;display:inline;" 
                textwidth="2.5rem" 
                beforetext="Attached to this affidavit and marked as Exhibit" 
                hint="(A, B, etc.)" 
                :text="porsRecord.exhibitName?porsRecord.exhibitName.replace('Exhibit ',''):''"/>

            <div style="text-indent:5px;display:inline;"> 
                is a copy of a Protection Order Registry protection order
            </div>
               
            <underline-form 
                style="text-indent:0;display: inline-block; margin: 0.35rem 0;"
                textwidth="6rem" 
                beforetext=" records check dated" 
                hint="(mmm/dd/yyyy)" 
                :text="porsRecord.fileDate?porsRecord.fileDate:''"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                .
            </div>
               
          
        </section>

    <!-- <11> -->
        
        <section>            
            <underline-form 
                style="text-indent:0;margin-left:.25rem;display:inline;" 
                textwidth="2.5rem" 
                beforetext="Attached to this affidavit and marked as Exhibit" 
                hint="(A, B, etc.)" 
                :text="crcRecord.exhibitName?crcRecord.exhibitName.replace('Exhibit ',''):''"/>

            <div style="text-indent:5px;display:inline;"> 
                    is a copy of a criminal records check dated
            </div>
            <underline-form 
                style="text-indent:0;display: inline; margin: 0.25rem 0;" 
                textwidth="6rem" 
                beforetext="" 
                hint="(mmm/dd/yyyy)" 
                :text="crcRecord.fileDate?crcRecord.fileDate:''"/>

            <div style="text-indent:5px;display:inline;"> 
                obtained from the
            </div>
            
            <underline-form 
                style="text-indent:0;display: inline-block; margin: 0.35rem 0;" 
                textwidth="26.75rem" 
                beforetext="" 
                hint="(name and location of police force or department from which the criminal records check was obtained)" 
                :text="policeDept"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                .
            </div>
                           
        </section>

    <!-- <12> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="!pastConviction?'yes':''" 
                    text="There are no criminal offences, other than those, if any, specified in the criminal records check referred to in paragraph 11 of
                    this affidavit, of which I have been convicted and not pardoned."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="pastConviction?'yes':''" 
                text="In addition to the convictions, if any, specified in the criminal records check referred to in paragraph 11 of this affidavit, I have
                been convicted of, and not pardoned for, the following criminal offences:<br><i>Provide details of any criminal convictions, not referred to in the criminal records check, for which you have not received a
                pardon</i>"/>
            
            <div style="margin:0rem 0 0 1rem;" v-if="pastConviction" 
                class="answerbox">{{ convictionDetails }}</div>
            <div v-else style="margin-bottom:3rem;"></div>  
        </section>

    <!-- <13> -->
        <section>
            <i>
                Select whichever option is correct.
            </i>
            <check-box style="margin:0 0 0 1rem;" 
                    :check="!currentlyConvicted?'yes':''" 
                    text="<b>I am not</b> currently charged with any criminal offences."/> 

            <check-box 
                style="margin:1rem 0 0 1rem;" 
                :check="currentlyConvicted?'yes':''" 
                text="<b>I am</b> currently charged with criminal offences. The particulars of each charge are set out below:"/>
            
            <b-table
                :items="currentCharges"
                :fields="chargeFields"
                class="mt-2"
                small
                bordered>             
                    <template v-slot:cell()="data">
                        <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>
                    </template>
                    <template v-slot:head(chargeDate)>
                        Date of alleged offence <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
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
import { aboutAffiantGaDataInfoType, backgroundCivilCourtProceedingsDataInfoType, backgroundCriminalHistoryDataInfoType, backgroundFamilyViolenceDataInfoType, caringForChildGaChildInfoDataInfoType, caringForChildGaDataInfoType, chargesDataInfoType, childGaInfoType, exhibitsDataInfoType, guardianshipAffidavitDataInfoType } from '@/types/Application/GuardianshipAffidavit';

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

    childrenInfo = [];
    careDetails = '';
    otherChildrenExist = false;
    otherChildrenInfo = [];

    familyViolenceExists = false;
    familyViolenceDesc = '';

    courtProceedingsExist = false;
    civilProceedingInfo = [];
    exhibitList = [];
    orderList = [];
    porsRecord = {} as exhibitsDataInfoType;
    mcfdRecord = {} as exhibitsDataInfoType;
    crcRecord = {} as exhibitsDataInfoType;
    policeDept = '';

    pastConviction = false;
    convictionDetails = '';
    currentlyConvicted = false; 
    currentCharges = [];

    childFields = [
        {key:"fullName",               label:"Child's full name",                                           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth",                                       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"currentGuardiansToChild",label:"Name(s) of child's current guardian(s)",                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"parentsNotGuardians",    label:"Name(s) of child's parent(s) who are not current guardian(s)",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];

    childRelationshipFields = [
        {key:"fullName",               label:"Child's full name",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"relationWithchild",      label:"Nature of relationship to child",   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"lengthOfRelationship",   label:"Length of relationship",            tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ];  

    childLivingArrangementFields = [
        {key:"fullName",               label:"Child's full name",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"currentLiving",          label:"Current living arrangements",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ]; 

    otherChildrenFields = [
        {key:"fullName",               label:"Child's full name",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth",             tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"relation",               label:"Nature of relationship to child",   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ];

    proceedingFields = [
        {key:"itemNo",                 label:"Item #",                                                                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"partyNames",             label:"Names of the parties to the proceeding",                                      tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"courtLocation",          label:"Name and location of court in which the proceeding was conducted",            tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"courtOrderDates",        label:"Date of any orders concerning children under my care made in the proceeding", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];

    chargeFields = [
        {key:"chargeNature",             label:"Nature of alleged offence",                                       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"chargeDate",               label:"Date of alleged offence",                                         tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"chargeCourtLocation",      label:"Name and location of court in which proceedings are outstanding", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ];
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){
        this.getGaAffiantInfo();  
        this.getExhibitInfo();        
        this.childrenInfo = this.getChildrenDetails();
        this.getCareDetails();
        this.getFamilyViolenceInfo();
        this.getChargeDetails();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);        
    } 

    public getGaAffiantInfo(){ 

        this.yourInfo = {} as yourInformationInfoDataInfoType; 
        this.address = '';
        
        if(this.result?.aboutAffiantGaSurvey){

            let aboutAffiant = {} as aboutAffiantGaDataInfoType;
            aboutAffiant = this.result.aboutAffiantGaSurvey;

            this.yourInfo = getYourInformationResults(aboutAffiant);    
            this.yourInfo.dob = Vue.filter("beautify-date")(aboutAffiant.Dob);       
            const addressInfo = aboutAffiant.ApplicantAddress;

            const addressText = addressInfo.street + ', ' 
                                + addressInfo.city + ', ' 
                                + addressInfo.state + ', ' 
                                + addressInfo.country + ', ' 
                                + addressInfo.postcode;

            this.address = aboutAffiant.inCareOf?.length>0?('Care of '+ addressText ):addressText;
        }
            
    }

    public getFamilyViolenceInfo(){ 

        this.familyViolenceExists = false;
        this.familyViolenceDesc = '';

        if(this.result?.backgroundFamilyViolenceSurvey){

            let familyViolenceData = {} as backgroundFamilyViolenceDataInfoType;
            familyViolenceData = this.result.backgroundFamilyViolenceSurvey;

            this.familyViolenceExists = familyViolenceData.familyViolenceExists == 'y'; 
            
            if(this.familyViolenceExists){
                this.familyViolenceDesc = familyViolenceData.familyViolenceDesc;
            }
        }
    
    }

    public getChildrenDetails(){

        const childrenInfo = [];
        
        const childData: childGaInfoType[] =  this.result.childrenDetailsGaSurvey;

        for (const child of childData){            
            const childInfo = {fullName: '', dob:'', currentGuardiansToChild: '', parentsNotGuardians: '', relationWithchild: '', lengthOfRelationship: '', currentLiving:''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.currentGuardiansToChild = child.currentGuardiansToChild.map(function (guardian) { return guardian.name; }).join(', ');
            if (child.parentsNotGuardiansExist == 'y'){
                for (const parent of child.parentsNotGuardians)
                childInfo.parentsNotGuardians = child.parentsNotGuardians.map(function (parent) { return parent.name; }).join(', ');
            }
            childInfo.relationWithchild = child.relationWithchild;

            if (child.lengthOfRelationship.selected == 'sinceBirth'){
                childInfo.lengthOfRelationship = "Since Birth";
            } else {
                childInfo.lengthOfRelationship = "Since "+ child.lengthOfRelationship?.relationStartDate?Vue.filter('beautify-date')(child.lengthOfRelationship.relationStartDate):'';
            }

            childInfo.currentLiving = child.currentLiving;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getCareDetails(){

        this.careDetails = '';
        this.otherChildrenExist = false;
        this.otherChildrenInfo = [];

        const careData: caringForChildGaDataInfoType = this.result.caringForChildGaSurvey;

        if (careData){

            this.careDetails = careData.caringForChildGa?.careDetails?careData.caringForChildGa.careDetails:'';
            this.otherChildrenExist = careData.caringForChildGa?.parentOtherChild == 'y';        

            if (this.otherChildrenExist){
                const childData: caringForChildGaChildInfoDataInfoType[] = careData.childInfo;
                for (const child of childData){            
                    const childInfo = {fullName: '', dob:'', relation: ''};
                    childInfo.fullName = Vue.filter('getFullName')(child.name);
                    childInfo.dob = Vue.filter('beautify-date')(child.dob);            
                    childInfo.relation = child.relation;           
                    this.otherChildrenInfo.push(childInfo);
                } 
                
            } else {
                this.otherChildrenInfo = [{fullName: '', dob:'', relation: ''}];
            }
        } 
    }

    public getExhibitInfo(){  

        this.courtProceedingsExist = false;
        this.civilProceedingInfo = [{itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []}];
        this.exhibitList = this.result.gaExhibitList;
        this.orderList = [];

        this.porsRecord = {} as exhibitsDataInfoType;
        this.mcfdRecord = {} as exhibitsDataInfoType;
        this.crcRecord = {} as exhibitsDataInfoType;
        this.policeDept = '';

        const proceedingData: backgroundCivilCourtProceedingsDataInfoType = this.result.backgroundCivilCourtProceedingsSurvey;

        if (proceedingData && this.result.gaExhibitList){

            this.courtProceedingsExist = proceedingData.courtProceedingsExist == 'y';
            if(this.courtProceedingsExist){
                this.orderList = this.exhibitList.filter(exhibit => exhibit.itemNo != 0); 
                const civilProceedingsData = this.orderList;
                this.civilProceedingInfo = [];  
                
                let maxItemNo = '';
                
                for (const proceeding of civilProceedingsData){

                    const proceedingInfo = {itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []};
                    const index = this.civilProceedingInfo.findIndex(proc=>{return(proc.itemNo == proceeding.itemNo)})
                    if(index >= 0 ){                
                        this.civilProceedingInfo[index].courtOrderDates.push(Vue.filter('beautify-date')(proceeding.fileDate)); 
                    } else {
                        proceedingInfo.itemNo = proceeding.itemNo;
                        proceedingInfo.partyNames = proceeding.partyNames;
                        proceedingInfo.courtLocation = proceeding.courtLocation;
                        proceedingInfo.courtOrderDates.push(Vue.filter('beautify-date')(proceeding.fileDate));
                        this.civilProceedingInfo.push(proceedingInfo);
                    }  
                    
                    maxItemNo = proceeding.itemNo;
                }
                
                let noOrderBaseIndex = Number(maxItemNo) + 1;

                for (const proceeding of proceedingData.courtProceedings){

                    if(proceeding.courtOrdersExist == 'n'){
                        const proceedingInfo = {itemNo: '', partyNames: '', courtLocation:'', courtOrderDates: []};                        
                        proceedingInfo.itemNo = String(noOrderBaseIndex);
                        proceedingInfo.partyNames = proceeding.partyNames;
                        proceedingInfo.courtLocation = proceeding.courtLocation;
                        proceedingInfo.courtOrderDates = [];
                        this.civilProceedingInfo.push(proceedingInfo); 
                        noOrderBaseIndex++;
                    }
                                 
                } 


            }
        }

        if(this.result?.guardianshipAffidavitSurvey){

            const ga: guardianshipAffidavitDataInfoType = this.result.guardianshipAffidavitSurvey

            if (ga.haveBrcResults == 'y'){
                const mcfdRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Ministry of Children and Family Development Record Check dated ")[0];                
                this.mcfdRecord.exhibitName = mcfdRecordData.exhibitName;
                this.mcfdRecord.fileDate = Vue.filter('beautify-date')(mcfdRecordData.fileDate);

                const crcRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Criminal Record Check dated ")[0];
                this.crcRecord.exhibitName = crcRecordData.exhibitName;
                this.crcRecord.fileDate = Vue.filter('beautify-date')(crcRecordData.fileDate);

                const porsRecordData = this.exhibitList.filter(exhibit => exhibit.fileName == "Protection Order Record Check from the Protection Order Registry dated ")[0];
                this.porsRecord.exhibitName = porsRecordData.exhibitName;
                this.porsRecord.fileDate = Vue.filter('beautify-date')(porsRecordData.fileDate)
                this.policeDept = ga.policeDept?ga.policeDept:'';
            }
        }    
    }  

    public getChargeDetails(){

        this.convictionDetails = '';
        this.pastConviction = false;
        this.currentlyConvicted = false;
        this.currentCharges = [];

        const criminalData: backgroundCriminalHistoryDataInfoType = this.result.backgroundCriminalHistorySurvey;

        if (criminalData){

            this.pastConviction = criminalData.pastConviction == 'y';
            if (this.pastConviction){
                this.convictionDetails = criminalData.convictionDetails?criminalData.convictionDetails:'';
            }
            
            this.currentlyConvicted = criminalData.currentlyConvicted == 'y';       

            if (this.currentlyConvicted){
                const chargeData: chargesDataInfoType[] = criminalData.currentCharges;
                for (const charge of chargeData){            
                    const chargeInfo = {chargeNature: '', chargeDate:'', chargeCourtLocation: ''};
                    chargeInfo.chargeNature = charge.chargeNature;
                    chargeInfo.chargeDate = Vue.filter('beautify-date')(charge.chargeDate);            
                    chargeInfo.chargeCourtLocation = charge.chargeCourtLocation;           
                    this.currentCharges.push(chargeInfo);
                } 
                
            } else {
                this.currentCharges = [{chargeNature: '', chargeDate:'', chargeCourtLocation: ''}];
            }
        } 
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>