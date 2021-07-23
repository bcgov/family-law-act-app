<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 1 – ATTENDANCE USING ELECTRONIC COMMUNICATION</b></div>
            <div style="text-align:center;"><b> This is Schedule 1 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for an order allowing a person to attend a conference or
                    hearing using electronic communication, including by telephone or video.</i>
            </div>


<!-- <1> -->
        <section>
            <div style="display:inline; margin-left:0.15rem;"> I am applying for an order to allow: </div>
            <div style="margin-left:1.1rem;"><i>Select all options that apply</i></div>
            <div style="margin:0.25rem 0 0 1.1rem;font-size: 10pt;" >
                <check-box style="" :check="scheduleInfo.attendees.includes('me')?'yes':''" text="me"/>                                
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="scheduleInfo.attendees.includes('lawyer')?'yes':''" text="my lawyer, "/>
                <underline-form style="margin-left:0.25rem; text-indent:3px;display:inline-block;" textwidth="16rem" beforetext="" hint="full name of lawyer" :text="scheduleInfo.lawyerName"/>
            </div>
                
            <div style="margin:0.5rem 0 0 1.1rem;">to attend at the:</div>
            <div style="margin-left:1.1rem;"><i>Select only one of the options below</i></div>

            <div style="margin:0.25rem 0 0 1.1rem;font-size: 10pt;" >
                <check-box style="" :check="scheduleInfo.eventType == 'familyManagementConference'?'yes':''" text="family management conference"/>
                <check-box style="" :check="scheduleInfo.eventType == 'familySettlementConference'?'yes':''" text="family settlement conference"/>
                <check-box style="" :check="scheduleInfo.eventType == 'trialPreparationConference'?'yes':''" text="trial preparation conference"/>
                <check-box style="" :check="scheduleInfo.eventType == 'hearing'?'yes':''" text="hearing"/>
                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="scheduleInfo.eventType == 'other'?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="scheduleInfo.eventTypeComment"/>                
            </div>   

            <div style="margin:1rem 0 0.5rem 1.0rem;">
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="9rem" beforetext="Scheduled for" hint="mmm/dd/yyyy" :text="scheduleInfo.eventDate"/>                
                <underline-form style="text-indent:3px;display:inline-block;" textwidth="5rem" beforetext="at" hint="HH:MM" :text="scheduleInfo.eventTime"/> 
            </div>
            
            <div style="margin:1.25rem 0 0 1.1rem;">By electronic communication as follows:</div>
            <div style="margin:0.25rem 0 0 1.1rem;font-size: 10pt;" >
                <div></div>
                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="scheduleInfo.attendanceType == 'byTelephone'?'yes':''" text="telephone at "/>
                <underline-form style="text-indent:5px;display:inline-block;" textwidth="19.5rem" beforetext="" hint="phone number" :text="scheduleInfo.phoneNumber"/>
  
                 <div style=" margin:0.25rem 0 0.5rem 1.75rem;;">
                    Is this a direct phone line? 
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="scheduleInfo.attendanceType == 'byTelephone' && scheduleInfo.directLine?'yes':''"  text="Yes"/>                        
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-5" marginLeft="0.75rem" :check="scheduleInfo.attendanceType == 'byTelephone' && !scheduleInfo.directLine?'yes':''" text="No"/> 
                    <div>
                        <i>If no, the person answering the phone must know the call will be coming and put it through immediately</i>
                    </div>
                </div>    

                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="scheduleInfo.attendanceType == 'other'?'yes':''" text="other electronic communication method <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="19.5rem" beforetext="" hint="" :text="(scheduleInfo.attendanceType == 'other')?scheduleInfo.attendanceTypeComment:''"/>                
            </div>  

        </section>

<!-- <2> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    I understand the following requirements and I will comply with them
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="scheduleInfo.understandPhoneRequirements?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-5" marginLeft="0.75rem" :check="!scheduleInfo.understandPhoneRequirements?'yes':''" text="No"/> 
                </div>
                
                <ul style="text-indent: 0px;">
                    <li>a speaker phone must not be used</li>
                    <li>I must remain near the phone at all times prior to the call from the Clerk of the Court</li>
                    <li>the call must be taken in a quiet and private location</li>
                    <li>no other person may be in the room during the appearance</li>
                    <li>I may speak only when the Judge or Family Justice Manager indicates I may speak</li>
                    <li>recording of the call is strictly prohibited</li>
                </ul>
            
            </section>
        </div>  

<!-- <3> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    The documents I may want to refer to in court have been submitted to the court registry and received by the other party
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="scheduleInfo.documentsSubmitted?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="!scheduleInfo.documentsSubmitted?'yes':''" text="No"/> 
                </div>                             
          
            </section>
        </div>   

<!-- <4> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    I (and/or my lawyer) am unable to attend in person because:
                </div>

                <div v-if="scheduleInfo.virtualAttendanceReason" class="answerbox">{{scheduleInfo.virtualAttendanceReason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>        
          
            </section>
        </div>   

  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule1DataInfoType } from '@/types/Application/CaseManagement/PDF';
import { attendanceUsingElectronicCommunicationSurveyDataInfoType } from '@/types/Application/CaseManagement';

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
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.scheduleInfo = this.getElectronicAttendanceInfo();
    }

    public getElectronicAttendanceInfo() {

        let virtualAttendanceInfo = {} as schedule1DataInfoType;      

        if (this.result.attendanceUsingElectronicCommunicationSurvey){
            const virtualAttendanceData: attendanceUsingElectronicCommunicationSurveyDataInfoType = this.result.attendanceUsingElectronicCommunicationSurvey;
            virtualAttendanceInfo.attendees =  virtualAttendanceData.attendessList?.['checked'];
            virtualAttendanceInfo.lawyerName = virtualAttendanceData.attendessList?.['checked']?.includes('lawyer')? (virtualAttendanceData.attendessList['lawyerComment']): '';
            virtualAttendanceInfo.eventType =  virtualAttendanceData.appearanceType;
            virtualAttendanceInfo.eventTypeComment = (virtualAttendanceData.appearanceType == 'other')? virtualAttendanceData.appearanceTypeComment:'';
            virtualAttendanceInfo.eventDate = Vue.filter('beautify-date-blank')(virtualAttendanceData.appearanceSchedule);
            virtualAttendanceInfo.eventTime = Vue.filter('convert-time24to12')(Vue.filter('beautify-time')(virtualAttendanceData.appearanceSchedule));
            virtualAttendanceInfo.attendanceType = virtualAttendanceData.attendanceType;
            if (virtualAttendanceData.attendanceType == 'byTelephone'){
                virtualAttendanceInfo.phoneNumber = virtualAttendanceData.telephoneNumber;
                virtualAttendanceInfo.directLine = virtualAttendanceData.directPhone == 'y'; 
                virtualAttendanceInfo.attendanceTypeComment = '';
            }else if(virtualAttendanceData.attendanceType == 'byVideo'){
                virtualAttendanceInfo.phoneNumber = '';
                virtualAttendanceInfo.attendanceTypeComment ='By video using MS Teams'; 
                virtualAttendanceInfo.attendanceType = 'other'; 
            } 
            else {
                virtualAttendanceInfo.phoneNumber = '';
                virtualAttendanceInfo.attendanceTypeComment = (virtualAttendanceData.attendanceType == 'other')?virtualAttendanceData.attendanceTypeComment:'';                
            }
            virtualAttendanceInfo.understandPhoneRequirements = virtualAttendanceData.understandRequirements == 'y';
            virtualAttendanceInfo.documentsSubmitted = virtualAttendanceData.submittedDocuments == 'y';
            virtualAttendanceInfo.virtualAttendanceReason = virtualAttendanceData.attendanceTypeReason;
        }
      
        return virtualAttendanceInfo;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>