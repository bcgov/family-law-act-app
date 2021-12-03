<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />
        <div style="text-align:center;"><b> SCHEDULE 2 – APPLICATION FOR ORDER RESPECTING GUARDIANSHIP OF A CHILD</b></div>
        <div style="text-align:center;"><b> This is Schedule 2 to the Application About a Priority Parenting Matter</b></div>

        <div style="margin:1rem 0; text-align:justify">            
            This schedule must be completed only if you are applying for a priority parenting matter order respecting
            guardianship under section 51 [order respecting guardianship] of the Family Law Act because the order is
            needed to transfer a child from the care of the Director or to prevent the removal of a child under the Child,
            Family and Community Service Act.
        </div>

<!-- <1> --> 
        
        <div style="text-align:justify; font-weight: bold;">
            Indigenous ancestry of child(ren)
        </div> 
        <div style="text-align:justify;">                
            <i>These questions will help the court make a decision about guardianship of a child.</i>
        </div>         
        <section>               
            <div style="display:inline; margin-left:0.25rem;">There is an existing written agreement or court order about the child(ren) concerning parenting arrangements, child support, contact with a child, or guardianship:
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'yes')?'yes':''"  text="Yes"/>                        
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'no')?'yes':''" text="No"/> 
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'unknown')?'yes':''" text="Unknown"/> 
            </div>               
            <div style="margin:0 0 0 1rem; display: block;"><i>If yes,</i> please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</div>            
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('nnn')?'yes':''" text="First Nation"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('nn')?'yes':''" text="Nisga'a"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('nn')?'yes':''" text="Treaty First Nation"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('nn')?'yes':''" 
                text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('lll')?'yes':''" 
                text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/> 
        </section>

        <div style="margin-top: 1rem;"></div> 

<!-- <2> -->
        <div class="print-block">
            <section>               
                <div style="display:inline; margin-left:0.25rem;">
                    <i>Complete the following statement only if the child is a Nisga’a child or a Treaty First Nation child</i>
                   <div style="display:inline-block; margin-left:1.75rem;">
                        <check-box 
                            class="marginleft" 
                            marginLeft="1.75rem"
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            shift="7" 
                            :check="scheduleInfo.understandFirstNationsService?'yes':''" 
                            text="I acknowledge that I must serve the Nisga'a Lisims Government or the Treaty First Nation to which the
                                child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/> 
                    </div>                   
                </div>  
            </section>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <3> -->
        <div class="print-block">  
            <section>
                <check-box
                    class="marginleft"
                    marginLeft="1.25rem" 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0.5rem 0 0.5rem; display:inline"
                    :check="scheduleInfo.understandFileForm5?'yes':''" 
                    text="I understand that I am required to file a Guardianship Affidavit in Form 5 as described in Rule 26"/> 
                <div style="margin:0 0 0 1.5rem;display:inline;" >
                    before the court can make a final order about guardianship
                </div>
            </section>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <4> -->

        <div class="print-block"> 
            <section>
                <check-box
                    class="marginleft" 
                    marginLeft="1.25rem"
                    inline="inline"
                    boxMargin="0rem"                    
                    style="margin:0 0.5rem 0 0.5rem;display:inline;" 
                    :check="scheduleInfo.initiatedCriminalCheck?'yes':''" 
                    text="I have initiated or completed a criminal record check as required for the Guardianship Affidavit in "/>
                <div style="margin-left: 1.5rem;display:inline;" >
                    Form 5
                </div>
            </section>
        </div>        

        <div style="margin-top: 1rem;"></div>

<!-- <5> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; margin:0 0.5rem 0 0.25rem; ">
                    <i>Select only one of the options below</i>
                </div>
                <div style="display:block; margin-left:1.5rem;">
                    <check-box 
                        class="marginleft" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:block;" 
                        shift="10" 
                        :check="scheduleInfo.filingRequiredDocs?'yes':''" 
                        text="I am filing the following required documents along with this application"/>
                    <div style="margin-left: 2rem;">
                        <check-box 
                        class="marginleft" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:block;" 
                        shift="10" 
                        :check="scheduleInfo.fileConsent?'yes':''" 
                        text="a Consent for Child Protection Record Check in Form 5 under the Family Law Act Regulation"/>
                        <check-box 
                        class="marginleft" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:block;" 
                        shift="10" 
                        :check="scheduleInfo.fileRequest?'yes':''" 
                        text="a request, in the form provided by the registry, to search the protection order registry"/>

                    </div>                  

                    <check-box 
                        class="marginleft" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:block;" 
                        shift="10" 
                        marginLeft="1.75rem" 
                        :check="!scheduleInfo.filingRequiredDocs?'yes':''"  
                        text="I am not able to complete the required documents at this time. I am filing an Application for Case
                            Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that
                            this application be filed with the additional documents."/>
                </div>
            </section>
        </div>
  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { priorityParentingDirectorDataInfoType, priorityParentingInfoProviderDataInfoType, schedule2DataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';
import { childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule2 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;
    scheduleInfo = {} as schedule2DataInfoType;     
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.scheduleInfo = this.getSchedule2Info();
        
    }

    public getSchedule2Info() {

        let schedule2Info = {} as schedule2DataInfoType;      

        schedule2Info.ancestryType = [];

        // if (this.result?.attendanceUsingElectronicCommunicationSurvey){
        //     const virtualAttendanceData: attendanceUsingElectronicCommunicationSurveyDataInfoType = this.result.attendanceUsingElectronicCommunicationSurvey;
        //     virtualAttendanceInfo.attendees =  virtualAttendanceData.attendessList?.['checked'];
        //     virtualAttendanceInfo.lawyerName = virtualAttendanceData.attendessList?.['checked']?.includes('lawyer')? (virtualAttendanceData.attendessList['lawyerComment']): '';
        //     virtualAttendanceInfo.eventType =  virtualAttendanceData.appearanceType;
        //     virtualAttendanceInfo.eventTypeComment = (virtualAttendanceData.appearanceType == 'other')? virtualAttendanceData.appearanceTypeComment:'';
        //     virtualAttendanceInfo.eventDate = Vue.filter('beautify-date-blank')(virtualAttendanceData.appearanceSchedule);
        //     virtualAttendanceInfo.eventTime = Vue.filter('convert-time24to12')(Vue.filter('beautify-time')(virtualAttendanceData.appearanceSchedule));
        //     virtualAttendanceInfo.attendanceMethod = virtualAttendanceData.attendanceMethod;
        //     virtualAttendanceInfo.attendanceType = virtualAttendanceData.attendanceType;
        //     if (virtualAttendanceData.attendanceType == 'byTelephone'){
        //         // virtualAttendanceInfo.phoneNumber = virtualAttendanceData.telephoneNumber;
        //         // virtualAttendanceInfo.directLine = virtualAttendanceData.directPhone == 'y'; 
        //         virtualAttendanceInfo.attendanceTypeComment = '';
        //     }else if(virtualAttendanceData.attendanceType == 'byVideo'){
        //         // virtualAttendanceInfo.phoneNumber = '';
        //         virtualAttendanceInfo.attendanceTypeComment ='By video using MS Teams'; 
        //         virtualAttendanceInfo.attendanceType = 'other'; 
        //     } 
        //     else {
        //         // virtualAttendanceInfo.phoneNumber = '';
        //         virtualAttendanceInfo.attendanceTypeComment = (virtualAttendanceData.attendanceType == 'other')?virtualAttendanceData.attendanceTypeComment:'';                
        //     }
        //     //virtualAttendanceInfo.understandPhoneRequirements = virtualAttendanceData.understandRequirements == 'y';
        //     virtualAttendanceInfo.documentsSubmitted = virtualAttendanceData.submittedDocuments == 'y';
        //     virtualAttendanceInfo.virtualAttendanceReason = virtualAttendanceData.attendanceTypeReason;
        // }
      
        return schedule2Info;
    }

    public getChildrenInfo(){

        // this.childRelatedType = this.result?.cmChildrenInfoSurvey?.childRelatedType? this.result.cmChildrenInfoSurvey.childRelatedType :'';

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        // const childData: cmChildrenInfoSurveyDataInfoType[] = this.result?.cmChildrenInfoSurvey?.childData? this.result.cmChildrenInfoSurvey.childData: [];
        
        // if(this.childRelatedType == 'A party to the case and the case involves a child-related issue'){
        //     for (const child of childData){            
        //         childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        //         childInfo.fullName = Vue.filter('getFullName')(child.name);
        //         childInfo.dob = Vue.filter('beautify-date')(child.dob);            
        //         childrenInfo.push(childInfo)
        //     }        
        // }
        // else
            childrenInfo.push({fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''});
          

        return childrenInfo;
    }

    public getInfoProviderInfo(){

        // this.childRelatedType = this.result?.cmChildrenInfoSurvey?.childRelatedType? this.result.cmChildrenInfoSurvey.childRelatedType :'';

        let providerInfo = {} as priorityParentingInfoProviderDataInfoType;
        // const childData: cmChildrenInfoSurveyDataInfoType[] = this.result?.cmChildrenInfoSurvey?.childData? this.result.cmChildrenInfoSurvey.childData: [];
        
        // if(this.childRelatedType == 'A party to the case and the case involves a child-related issue'){
        //     for (const child of childData){            
        //         childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        //         childInfo.fullName = Vue.filter('getFullName')(child.name);
        //         childInfo.dob = Vue.filter('beautify-date')(child.dob);            
        //         childrenInfo.push(childInfo)
        //     }        
        // }
        // else
            

        return providerInfo;
    }

    public getDirectorInfo(){

        // this.childRelatedType = this.result?.cmChildrenInfoSurvey?.childRelatedType? this.result.cmChildrenInfoSurvey.childRelatedType :'';

        let directorInfo = {} as priorityParentingDirectorDataInfoType;
       
        // const childData: cmChildrenInfoSurveyDataInfoType[] = this.result?.cmChildrenInfoSurvey?.childData? this.result.cmChildrenInfoSurvey.childData: [];
        
        // if(this.childRelatedType == 'A party to the case and the case involves a child-related issue'){
        //     for (const child of childData){            
        //         childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        //         childInfo.fullName = Vue.filter('getFullName')(child.name);
        //         childInfo.dob = Vue.filter('beautify-date')(child.dob);            
        //         childrenInfo.push(childInfo)
        //     }        
        // }
        // else
            

        return directorInfo;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>