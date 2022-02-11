<template>
    <div v-if="dataReady">  
        
<!-- <Page 8> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 17 – COUNTER APPLICATION TO APPOINT A GUARDIAN OF A CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 17 to the Reply to an Application About a Family Law Matter with Counter Application</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    Complete this schedule only if you are making a counter application to be appointed as a guardian of a child or
                    children identified in section 13 of the reply with counter application. 
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.becomeGuardian?'yes':''" text="I am applying to be appointed as a guardian of the following child(ren) identified in section 12 of"/>
                <div style="margin:0 0 0 2.5rem; display:inline;">this application:</div>
                <div style="margin: 0 0 1rem 3.5rem;">
                    <i>List the name of each child you want to be appointed as a guardian of</i>
                    <ul v-if="guardInfo.becomeGuardian && guardInfo.abtGuardian && guardInfo.abtGuardian.children">
                        <li v-for="(child,inx) of guardInfo.abtGuardian.children" :key="inx"><span class="mx-3">{{child}}</span></li>
                    </ul>                     
                </div>                
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Indigenous ancestry of child(ren)</b></div>
                <i>These questions will help the court make a decision about guardianship of a child.</i>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">Is the child or children Indigenous? </div>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.indigenous?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.nonIndigenous?'yes':''" text="No"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.unKnownAncestry?'yes':''" text="Unknown"/>
                    <div style="margin:0 0 0 1.35rem;">
                        <i style="margin:0 0 0 -0.25rem;" >If yes, please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</i>
                        <check-box  :check="guardInfo.ancestry.firstNation?'yes':''" text="First Nation"/>
                        <check-box  :check="guardInfo.ancestry.nisga?'yes':''" text="Nisg̲a’a"/>
                        <check-box  :check="guardInfo.ancestry.treatyFirstNation?'yes':''" text="Treaty First Nation"/>
                        <check-box  :check="guardInfo.ancestry.under12?'yes':''" text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                        <check-box  :check="guardInfo.ancestry.over12?'yes':''" text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                    </div>
                </section>
            </div>
    
            <div style="margin-top:1rem;"></div>
<!-- <3> -->
            <section>
                <i style="display:inline; margin:0 0 0 0.5rem;">Complete the following statement only if the child is a Nisg̲a’a child or a Treaty First Nation child</i>
                <div style="margin:0 0 0 1.35rem;">
                    <check-box  :check="guardInfo.ancestry.acknowledge?'yes':''" text="I acknowledge that I must serve the Nisg̲a’a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Guardianship affidavit and supporting documents</b></div>
<!-- <4> -->
                <section>
                    <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.becomeGuardian?'yes':''" text="I understand that I am required to file a Guardianship Affidavit in Form 5 as described in Rule 26"/>
                    <div style="margin:0 0 0 2rem; display:inline;">before the court can make a final order about guardianship</div>
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <5> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.criminalCheck?'yes':''" text="I have initiated or completed a criminal record check as required for the Guardianship Affidavit in"/>
                <div style="margin:0 0 0 2rem; display:inline;">Form 5</div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>                
                <div style="margin:0 0 0 1rem;">                     
                    <check-box  :check="guardInfo.applyForCaseManagement=='n'?'yes':''" text="I am filing the following required documents along with this application"/>
                </div>
                <div style="margin:0 0 0 3rem;">
                   <check-box  :check="guardInfo.applyForCaseManagement=='n'?'yes':''" text="a Consent for Child Protection Record Check in Form 5 under the <i>Family Law Act Regulation</i>"/>
                   <check-box  :check="guardInfo.applyForCaseManagement=='n'?'yes':''" text="a request, in the form provided by the registry, to search the protection order registry"/>
                </div>
                <div style="margin:0.5rem 0 0 1rem;">                     
                    <check-box  :check="guardInfo.applyForCaseManagement=='y'?'yes':''" text="I am not able to complete the required documents at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with the additional documents."/>
                </div>
            </section>
        </div>


    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

import { schedule7DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule17 extends Vue {

    @Prop({required:true})
    result!: any;
    
    @Prop({required:true})
    selectedSchedules!: string[]; 
   
    dataReady = false; 
    guardInfo = {} as schedule7DataInfoType;    
     
    childrenGuardianshipFields = [
        {key:"guardianName",  label:"Full name of guardian",                                tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"childName",     label:"Name of child(ren)",                                   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"guardianSince", label:"They have been a guardian of the child(ren) since:",   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:25%;"},
    ]

    mounted(){
        this.dataReady = false;       
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){
        if (this.selectedSchedules?.includes('schedule7') || this.selectedSchedules?.includes('schedule8')){
            this.guardInfo = this.getGuardianshipOfChildInfo(this.selectedSchedules.includes('schedule7'), this.selectedSchedules.includes('schedule8'));
        }        
    }

    public getGuardianshipOfChildInfo(guardian:boolean, cancel: boolean){
        let guardianshipInfo = {} as schedule7DataInfoType;

        if (guardian){
            guardianshipInfo.abtGuardian = {
                children: []
            }
            if (this.result.guardianOfChildSurvey){
                guardianshipInfo.abtGuardian.children = this.result.guardianOfChildSurvey.childrenList? this.result.guardianOfChildSurvey.childrenList:[];               
            }
        }

        if (cancel) {
            guardianshipInfo.abtCancel = {
                bestInterest: '',
                cancelDetails: [
                    {
                        guardianName: '', 
                        childName: '',
                        guardianSince: ''
                    }
                ]
            }

            if (this.result.guardianOfChildBestInterestsOfChildSurvey){
                const bestInterestInfo = this.result.guardianOfChildBestInterestsOfChildSurvey;
                guardianshipInfo.abtCancel.bestInterest = bestInterestInfo?.cancelGuradianChildBestInterest? bestInterestInfo.cancelGuradianChildBestInterest:''
            }
            if (this.result.guardianOfChildSurvey?.cancelGuardianDetails){
                if (this.result.guardianOfChildSurvey.cancelGuardianDetails?.length > 0){
                    guardianshipInfo.abtCancel.cancelDetails = [];
                }
                for (const detail of this.result.guardianOfChildSurvey.cancelGuardianDetails){
                    guardianshipInfo.abtCancel.cancelDetails.push({
                        guardianName: detail.nameOther, 
                        childName: detail.name,
                        guardianSince: Vue.filter('beautify-date')(detail.date)
                    })
                }                
            }
        }

        if (this.result.indigenousAncestryOfChildSurvey){
            const ancestryInfo = this.result.indigenousAncestryOfChildSurvey;
            if (ancestryInfo.indigenousChild == 'yes' && ancestryInfo.indigenousAncestry){
                guardianshipInfo.indigenous = true;
                guardianshipInfo.nonIndigenous = false;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry ={
                    firstNation: ancestryInfo.indigenousAncestry.includes('First Nation'),
                    nisga: ancestryInfo.indigenousAncestry.includes('Nisg̲a’a'),
                    treatyFirstNation: ancestryInfo.indigenousAncestry.includes('Treaty First Nation'),
                    under12: ancestryInfo.indigenousAncestry.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    over12: ancestryInfo.indigenousAncestry.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    acknowledge: (ancestryInfo.indigenousAncestry.includes('Nisg̲a’a') || ancestryInfo.indigenousAncestry.includes('Treaty First Nation'))? (ancestryInfo.ServeAcknowledgement == 'I acknowledge'):false
                }
            } else if (ancestryInfo.indigenousChild == 'no'){
                guardianshipInfo.indigenous = false;
                guardianshipInfo.nonIndigenous = true;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } else {
                guardianshipInfo.indigenous = false;
                guardianshipInfo.nonIndigenous = false;
                guardianshipInfo.unKnownAncestry = true;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } 
        }

        if(this.result.guardianOfChildSurvey?.applicationType?.includes('becomeGuardian')){
            guardianshipInfo.becomeGuardian = true;
        }else 
            guardianshipInfo.becomeGuardian = false;

        if(this.result.flmAdditionalDocumentsSurvey?.criminalChecked =='y' ){
            guardianshipInfo.criminalCheck = true;
        }else {
            guardianshipInfo.criminalCheck = false;
        }

        let form5unable = false;

        if(this.result.flmAdditionalDocumentsSurvey?.unableFileForms){
            for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
                if(form.includes("Form 5")||form.includes("registry search")){
                    form5unable = true;
                }
            }   
        }

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='y' ){
            guardianshipInfo.applyForCaseManagement = 'n'
        }else if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && form5unable){
            guardianshipInfo.applyForCaseManagement = 'y'
        }else if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && !form5unable){
            guardianshipInfo.applyForCaseManagement = 'n'
        }else{
            guardianshipInfo.applyForCaseManagement = ''
        }
        return guardianshipInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 

