<template>        
<!-- <Page 2> --> 
        <div v-if="dataReady">
<!--Header : BEGIN-->
<div >
    <div class="new-page"></div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 12pt;">
                    <b>Schedule 1 | Attendance using another method of attendance</b>
            </div>
            
            <div style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    Complete this schedule only if you are applying for an order to allow a person to attend a court 
                    appearance using another method of attendance other than the default method. 
                </p>
        </div>
        </div>  
        <div style="float: right;width: 18%; margin-top: 52px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about methods of attendance, see the guidebook. 
                </p>
        </div>
    </div> 
<!--Header : End-->
<!-- <1> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;width:100%; float: left; margin-right: 10px;">
                    <b>Part 1 |  About the order </b>
            </div>
            <div style="margin-top: 1rem;"></div>
            <div style="display: inline-block; font-size: 11pt;width: 100%; margin-right: 10px;margin-top:5px;margin-left:20px;">
                <b>1.</b><span style="margin-left:22px;">I am applying for an <b>order to allow</b>:</span>
            </div>  
            <div style="font-size: 10pt;margin-left:50px;" >   
                <check-box  style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.attendees.includes('me')?'yes':''" text=""/>                   
                <div style="margin-top:-20px;margin-left:27px;">
                    <span>Me</span>
                </div>
                <span>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.attendees.includes('lawyer')?'yes':''" text=""/>
                    <div style="margin-top:-22px;margin-left:27px;">
                    <span>My lawyer <span style="color:#747474;font-style:italic;">(provide full name of lawyer)</span>:</span>
                    <div style="margin-top:-25px;margin-left:245px;min-width: 200px;min-height:25px;background-color: #dedede;padding:2px;">{{ scheduleInfo.lawyerName |truncate-word-after(35)}}</div>
                    <div v-if="scheduleInfo.lawyerName.length >=  35" style="margin-top:3px;margin-left:0px;min-width: 200px;display: inline-block;background-color:#dedede;padding:2px;">{{scheduleInfo.lawyerName|truncate-word-before(35)}}</div>    
                    
                    </div>
                </span>  
                <span>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;margin-top:4px" :check="scheduleInfo.attendees.includes('other')?'yes':''" text=""/>
                    <div style="margin-top:-20px;margin-left:27px;">
                    <span>Other <span style="color:#747474;font-style:italic;">(specify name and role)</span>:</span>
                    <div style="margin-top:-25px;margin-left:185px;min-width: 200px;min-height:25px;background-color: #dedede;padding:2px;">{{ scheduleInfo.otherName |truncate-word-after(35)}}</div>
                    <div v-if="scheduleInfo.otherName.length >=  35" style="margin-top:3px;margin-left:0px;min-width: 200px;display: inline-block;background-color:#dedede;padding:2px;">{{scheduleInfo.otherName|truncate-word-before(35)}}</div>    
                        
                </div>        
                </span>   
                <div style="margin-left:5px;"><b>to attend</b> at the</div>                      
                <div>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.eventType == 'familyManagementConference'?'yes':''" text="Family management conference"/>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.eventType == 'familySettlementConference'?'yes':''" text="Family settlement conference"/>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.eventType == 'trialPreparationConference'?'yes':''" text="Trial preparation conference"/>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.eventType == 'hearing'?'yes':''" text="Hearing"/>
                <span>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.eventType == 'other'?'yes':''" text=""/>
                    <div style="margin-top:-20px;margin-left:27px;">
                    <span>Other <span style="color:#747474;font-style:italic;">(specify)</span>:</span>
                    <div style="margin-top:-25px;margin-left:95px;min-width: 200px;min-height:25px;background-color: #dedede;padding:2px;">{{ scheduleInfo.eventTypeComment |truncate-word-after(55)}}</div>
                    <div v-if="scheduleInfo.eventTypeComment.length >=  55" style="margin-top:3px;margin-left:0px;min-width: 200px;display: inline-block;background-color:#dedede;padding:2px;">{{scheduleInfo.eventTypeComment|truncate-word-before(55)}}</div>    
                      
                    </div> 
                    </span> 
            </div>   
            
            <table style="margin-top:7px">
                            <tr>
                            <td><div style="width:120px;margin-top:-15px;padding-right:5px;padding-left:5px;"><b>scheduled for:</b></div></td>
                            <td><div style="text-align:center;width:100px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:25px;margin-bottom:10px;">{{ scheduleInfo.eventDate | beautify-date-text }}</div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Date (dd/mmm/yyyy)</div></div></td>
                            <td><div style="margin-top:-15px;padding-right:5px;padding-left:5px;"><b>at</b></div></td>

                            <td><div style="text-align:center;width:80px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:25px;margin-bottom:10px;">{{ scheduleInfo.eventTime }}</div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Time</div></div></td>
                            <td><div style="margin-top:-15px;padding-right:5px;padding-left:5px;"><b>by</b></div></td>
                            <td><div style="text-align:center;width:132px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:27px;margin-bottom:10px;">{{ scheduleInfo.attendanceMethod |truncate-word-after(20) }}</div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Method of attendance</div></div></td>
                            </tr>
                </table>  
                <div v-if="scheduleInfo.attendanceMethod.length >= 20" style="margin-top:1px;margin-left:0px;min-width: 200px;display: inline-block;border-bottom: 3px solid grey;border-width:1.2px;background-color:#dedede;border-color:black;text-align:left;">{{scheduleInfo.attendanceMethod|truncate-word-before(20)}}</div>        

            
            <div style="margin-left:5px;margin-top:5px;display:inline-block;"><b>by another method of attendance as follows:</b></div>  
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.attendanceType == 'inPerson'?'yes':''" text="In person"/>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.attendanceType == 'byTelephone'?'yes':''" text="Telephone"/>
                <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="scheduleInfo.attendanceType == 'byVideo'?'yes':''" text="Video conference"/>
                <span>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:21px;" :check="scheduleInfo.attendanceType == 'other'?'yes':''" text=""/>
                    <!-- <underline-form style="text-indent:1px;display:block;margin-top:-22px;margin-left:28px;" textwidth="8.5rem" beforetext="other means of electronic communication <i>(specify):</i>" hintMargin="60px" hint="" :text="(scheduleInfo.attendanceType == 'other')?scheduleInfo.attendanceTypeComment:''"/>                      -->
                    <div style="margin-top:-20px;margin-left:30px;">
                    <span>Other means of electronic communication <span style="color:#747474;font-style:italic;">(specify):</span></span>
                    <!-- <span style="margin-left:5px;min-width: 120px;display: inline-block;border-bottom: 3px solid grey;border-width:1.2px;background-color:#dedede;border-color:black;text-align:center;">{{ (scheduleInfo.attendanceType == 'other')?scheduleInfo.attendanceTypeComment:'' }}</span> -->
                    <div style="margin-top:-25px;margin-left:325px;min-width:100px;min-height:25px;background-color: #dedede;padding:2px;">{{ scheduleInfo.attendanceTypeComment |truncate-word-after(15)}}</div>
                    <div v-if="scheduleInfo.attendanceTypeComment.length >=  15" style="margin-top:3px;margin-left:0px;min-width: 200px;display: inline-block;background-color:#dedede;padding:2px;">{{scheduleInfo.attendanceTypeComment|truncate-word-before(15)}}</div>    
                          
                </div> 
                    </span>  
            </div>
        </div>        
        
    </div>  
<!-- <1> : END-->
<!-- <2> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;min-height:130px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 |  Documents for court appearance </b>
            </div>
            <div style="margin-top: 0.4rem;"></div>
            <span style="font-size: 11pt;margin-left:20px"><b>2. </b></span>
            <div style="margin-top:-25px;text-indent:47px;margin-left:0px">The documents I may want to refer to in court have been submitted</div> 
            <div style="text-indent:47px;margin-left:0px">to the court registry and received by the other party</div> 
            <div style="display:inline-block;margin-left:35px;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;text-indent: -17px;" shift="10"  marginLeft="1.75rem" :check="scheduleInfo.documentsSubmitted?'yes':''"  text="<b>Yes</b>"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;text-indent: -17px;" shift="-8" marginLeft="0.5rem" :check="!scheduleInfo.documentsSubmitted?'yes':''" text="<b>No</b>"/> 
                </div>                             
              
        </div>   
        <div style="float: right;width: 18%; margin-top: 30px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    During a court appearance, there may be documents you need to reference.
                </p>
        </div>      
    </div>    
<!-- <2> : END-->
<!--<3> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 3 | Reasons for attending by another method of attendance</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>3. </b></span><span style="margin-left:12px;">The <b>request</b> to attend by another method of attendance <b>is being</b></span>
                <div style="margin-left:27px;"><b>made because:</b></div>
                <div style="margin-left:25px;font-size: 9pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic;">List the reasons for not being able to attend by the default method of attendance</span>
                </div>
                <div style="margin-left:25px;font-size: 9pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic;"> and/or why you need to attend using the other method of attendance</span>
                </div>
                
                <div v-if="scheduleInfo.virtualAttendanceReason" style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:25px;min-height:250px;">
                    {{scheduleInfo.virtualAttendanceReason}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div> 
                
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 15px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    The court may consider:
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>the distance between locations</li>
                    <li>illness or disability</li>
                    <li>financial cost</li>
                    <li>expense incurred, or savings realized, by using electronic communication</li>
                    <li>concerns related to security, including risk of family violence</li>
                    <li>difficulty conducting the appearance using electronic communication</li>
                    </ul>
                    </div>                    
                </p>
        </div>
        
    </div>
<!--<3> : END-->
        
<!-- <3> -->
        <!-- <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    I (and/or my lawyer) need to attend the court appearance by another method of attendance because:
                </div>

                <div v-if="scheduleInfo.virtualAttendanceReason" class="answerbox">{{scheduleInfo.virtualAttendanceReason}}</div>
                <div v-else style="margin-bottom:3rem;"></div>        
          
            </section>
        </div>    -->

  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
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

        if (this.result?.attendanceUsingElectronicCommunicationSurvey){
            const virtualAttendanceData: attendanceUsingElectronicCommunicationSurveyDataInfoType = this.result.attendanceUsingElectronicCommunicationSurvey;
            virtualAttendanceInfo.attendees =  virtualAttendanceData.attendessList?.['checked'];
            virtualAttendanceInfo.lawyerName = virtualAttendanceData.attendessList?.['checked']?.includes('lawyer')? (virtualAttendanceData.attendessList['lawyerComment']): '';
            virtualAttendanceInfo.otherName = virtualAttendanceData.attendessList?.['checked']?.includes('other')? (virtualAttendanceData.attendessList['otherComment']): '';
            virtualAttendanceInfo.eventType =  virtualAttendanceData.appearanceType;
            virtualAttendanceInfo.eventTypeComment = (virtualAttendanceData.appearanceType == 'other')? virtualAttendanceData.appearanceTypeComment:'';
            virtualAttendanceInfo.eventDate = Vue.filter('beautify-date-blank')(virtualAttendanceData.appearanceSchedule);
            virtualAttendanceInfo.eventTime = Vue.filter('convert-time24to12')(Vue.filter('beautify-time')(virtualAttendanceData.appearanceSchedule));
            virtualAttendanceInfo.attendanceMethod = virtualAttendanceData.attendanceMethod;
            virtualAttendanceInfo.attendanceType = virtualAttendanceData.attendanceType;            
            virtualAttendanceInfo.attendanceTypeComment = (virtualAttendanceData.attendanceType == 'other')?virtualAttendanceData.attendanceTypeComment:'';                
            virtualAttendanceInfo.documentsSubmitted = virtualAttendanceData.submittedDocuments == 'y';
            virtualAttendanceInfo.virtualAttendanceReason = virtualAttendanceData.attendanceTypeReason;
        }
      
        return virtualAttendanceInfo;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>