<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />
        <div style="text-align:center;"><b> SCHEDULE 1 – APPLICATION FOR ORDER RESPECTING PARENTING ARRANGEMENTS OR GUARDIANSHIP</b></div>
        <div style="text-align:center;"><b> This is Schedule 1 to the Application About a Priority Parenting Matter</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>
                This schedule must be completed only if you are applying for a priority parenting matter order under section 45
                [orders respecting parenting arrangements] or 51 [order respecting guardianship] of the Family Law Act because
                the order will allow the child to be returned or [placed with another person] in accordance with the Child, Family
                and Community Service Act, or the child will be removed under section 30, 36 or 42 of that Act unless the order is
                made.
            </i>
        </div>

        <div style="margin:1rem 0; text-align:justify; font-weight: bold;">
            To be completed by a director under the Child, Family and Community Service Act
        </div>



<!-- <1> -->
        <section>
            <div style="display:inline; margin-left:0.25rem; ">In the matter of the child(ren):</div>          
            
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

        <div style="margin-top: 2rem;"></div>     

<!-- <2> -->
        <div class="print-block">            
            <section> 
                                
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    The parent(s) of the child(ren) is/are:
                </div>

                <div v-if="true" class="answerbox">PLACEHOLDER</div>
                <div v-else style="margin-bottom:3rem;"></div>        
            
            </section>                
            
        </div> 

        <div style="margin-top: 2rem;"></div>

<!-- <3> -->
        <div class="print-block">
            <section> 
                <div style="display:inline;">
                    
                    <div style="text-indent:5px;display:inline;"> The information is provided on behalf of the director by:</div>
                    <table style="margin-top: 1rem;" class="compactfullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">
                                Name: 
                                <div class="answer">
                                    {{infoProvider.name | getFullName}}
                                </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer"> {{infoProvider.address?infoProvider.address.street:''}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{infoProvider.address?infoProvider.address.city:''}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{infoProvider.address?infoProvider.address.state:''}}</div> </td>
                            <td>Postal Code: <div class="answer">{{infoProvider.address?infoProvider.address.postcode:''}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{infoProvider.contactInfo?infoProvider.contactInfo.email:''}}</div> </td>
                            <td>Telephone: <div class="answer">{{infoProvider.contactInfo?infoProvider.contactInfo.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
            </section>
        </div> 

        <div style="margin-top: 2rem;"></div>

<!-- <4> -->
        <div class="print-block">
            <section> 
                <div style="display:inline;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="14rem" 
                        beforetext="This schedule is being completed on:" 
                        hint="" 
                        :italicHint="false" 
                        :text="scheduleInfo.scheduleCompletionDate | beautify-date"/>
                </div>
            </section>
        </div>

        <div style="margin-top: 2rem;"></div>

<!-- <5> -->
        <div class="print-block">
            <section> 
                <div style="display:inline;">
                    
                    <div style="text-indent:5px;display:inline;"> 
                        The director under the Child, Family and Community Service Act can be served with this application at:
                    </div>
                    <table style="margin-top: 1rem;" class="compactfullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">
                                Name: 
                                <div class="answer">
                                    {{director.name | getFullName}}
                                </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer"> {{director.address?director.address.street:''}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{director.address?director.address.city:''}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{director.address?director.address.state:''}}</div> </td>
                            <td>Postal Code: <div class="answer">{{director.address?director.address.postcode:''}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{director.contactInfo?director.contactInfo.email:''}}</div> </td>
                            <td>Telephone: <div class="answer">{{director.contactInfo?director.contactInfo.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
            </section>
        </div> 

        <div style="margin-top: 2rem;"></div>


<!-- <6> -->
        <div class="print-block">  

            <section>
                <check-box
                    inline="inline"
                    boxMargin="0rem"                    
                    style="margin:0 0 0 0.5rem;display:inline;" 
                    :check="true?'yes':''" 
                    text="I have been advised that"/>
                      
                <div style="display:inline;" >
                    <span style="text-decoration: underline; margin:0 0.5rem 0 0.5rem">
                        {{scheduleInfo.partyNames}}uuuuu
                    </span>
                    is applying for a priority parenting matter order under section 45
                    [orders respecting parenting arrangements] or 51 [order respecting
                    guardianship] of the Family Law Act about a child to whom I have been
                    providing services under the Child, Family and Community Services.
                </div>
            </section>
        </div>

<!-- <7> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    There is a court proceeding under the Child, Family and Community Service Act concerning the child(ren)
                </div>
                <div style="display:inline-block; margin-left:1.5rem; font-size: 9pt;">
                    <div>
                        <check-box 
                            class="marginleft" 
                            inline="inline" 
                            boxMargin="0" 
                            style="display:inline;" 
                            shift="10" 
                            :check="scheduleInfo.courtProceedingExists?'yes':''" text="Yes - Court Location:"/>
                        <div style="display:inline;" >
                            <span style="text-decoration: underline; margin:0 0.75rem 0 0.25rem">
                                {{scheduleInfo.proceedingLocation}}uuuuu
                            </span>

                            File Number:
                            <span style="text-decoration: underline; margin:0 0.75rem 0 0.25rem">
                                {{scheduleInfo.proceedingFileNumber}}uuuuu
                            </span> 
                           
                            Date of next CFCSA proceeding:
                            <span style="text-decoration: underline; margin:0 0.75rem 0 0.25rem">
                                {{scheduleInfo.nextCFCSADate}}uuuuu
                            </span>

                        </div>
                    </div>

                    <check-box 
                        class="marginleft" 
                        inline="inline" 
                        boxMargin="0" 
                        style="display:inline;" 
                        shift="-7" 
                        marginLeft="0.75rem" 
                        :check="!scheduleInfo.courtProceedingExists?'yes':''"  text="No"/>                                  
                     
                </div>                             
          
            </section>
        </div> 

<!-- <8> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    If granted, I believe the priority parenting matter order respecting parenting arrangements and/or
                    guardianship of a child that is being applied for would likely allow the child(ren) to be returned to the
                    applicant or prevent the removal of the child(ren) under the <i>Child, Family and Community Service Act</i>.
                </div>
                <div style="display:inline-block; margin-left:1.5rem;">
                    <check-box class="marginleft" inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="scheduleInfo.allowChildReturn?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="8" marginLeft="1.75rem" :check="!scheduleInfo.allowChildReturn?'yes':''" text="No"/> 
                </div>                             
          
            </section>
        </div> 

<!-- <9> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    I would like to share the following information with the court:
                    <i style="display:block; margin-top: 0.5rem;">
                        You may choose to complete this section or leave this section blank. Please only 
                        share information that is needed by the court to understand why it is in the best 
                        interest of the child under section 4 of the Child, Family and Community Service 
                        Act to address this matter as a priority. As per section 79 (a) of the Child,
                        Family and Community Service Act, please only disclose information that is necessary 
                        to ensure the safety or well-being of a child.
                    </i>
                </div>

                <div v-if="scheduleInfo.infoShared" class="answerbox">{{scheduleInfo.infoShared}}</div>
                <div v-else style="margin-bottom:3rem;"></div>        
          
            </section>
        </div>   

  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { priorityParentingDirectorDataInfoType, priorityParentingInfoProviderDataInfoType, schedule1DataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';
import { childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule1 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;
    scheduleInfo = {} as schedule1DataInfoType; 
    infoProvider = {} as priorityParentingInfoProviderDataInfoType; 
    director = {} as priorityParentingDirectorDataInfoType;

    childrenInfo: childrenInfoSurveyInfoType[] = [];

    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
    ] 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.scheduleInfo = this.getScheduleOneInfo();
        this.childrenInfo = this.getChildrenInfo();
        this.infoProvider = this.getInfoProviderInfo();
        this.director = this.getDirectorInfo();        
    }

    public getScheduleOneInfo() {

        let schedule1Info = {} as schedule1DataInfoType;      

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
      
        return schedule1Info;
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