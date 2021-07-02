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
                <check-box style="" :check="true?'yes':''" text="me"/>                                
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="my lawyer, "/>
                <underline-form style="margin-left:0.25rem; text-indent:3px;display:inline-block;" textwidth="16rem" beforetext="" hint="full name of lawyer" text=""/>
            </div>
                
            <div style="margin:0.5rem 0 0 1.1rem;">to attend at the:</div>
            <div style="margin-left:1.1rem;"><i>Select only one of the options below</i></div>

            <div style="margin:0.25rem 0 0 1.1rem;font-size: 10pt;" >
                <check-box style="" :check="true?'yes':''" text="family management conference"/>
                <check-box style="" :check="true?'yes':''" text="family settlement conference"/>
                <check-box style="" :check="true?'yes':''" text="trial preparation conference"/>
                <check-box style="" :check="true?'yes':''" text="hearing"/>
                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" text=""/>                
            </div>   

            <div style="margin:1rem 0 0.5rem 1.0rem;">
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="9rem" beforetext="Scheduled for" hint="mmm/dd/yyyy" text=""/>                
                <underline-form style="text-indent:3px;display:inline-block;" textwidth="5rem" beforetext="at" hint="HH:MM" text=""/> 
            </div>
            
            <div style="margin:1.25rem 0 0 1.1rem;">By electronic communication as follows:</div>
            <div style="margin:0.25rem 0 0 1.1rem;font-size: 10pt;" >
                <div></div>
                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="telephone at "/>
                <underline-form style="text-indent:5px;display:inline-block;" textwidth="19.5rem" beforetext="" hint="phone number" text=""/>
  
                 <div style=" margin:0.25rem 0 0.5rem 1.75rem;;">
                    Is this a direct phone line? 
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="true?'yes':''"  text="Yes"/>                        
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-5" marginLeft="0.75rem" :check="!true?'yes':''" text="No"/> 
                    <div>
                        <i>If no, the person answering the phone must know the call will be coming and put it through immediately</i>
                    </div>
                </div>    

                <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="other electronic communication method <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="19.5rem" beforetext="" hint="" text=""/>                
            </div>  

        </section>

<!-- <2> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem;">
                    I understand the following requirements and I will comply with them
                </div>
                <div style="display:inline-block;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="true?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-5" marginLeft="0.75rem" :check="!true?'yes':''" text="No"/> 
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
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10"  marginLeft="1.75rem" :check="true?'yes':''"  text="Yes"/>                                  
                    <check-box class="marginleft1vue" inline="inline" boxMargin="0" style="display:inline;" shift="-8" marginLeft="0.5rem" :check="!true?'yes':''" text="No"/> 
                </div>                             
          
            </section>
        </div>   

<!-- <4> -->
        <div class="print-block">            
            <section>               
                <div style="display:inline; text-indent:0; margin:0 0.5rem 0 0rem; ">
                    I (and/or my lawyer) am unable to attend in person because:
                </div>

                <div v-if="false" class="answerbox"></div>
                <div v-else style="margin-bottom:3rem;"></div>        
          
            </section>
        </div>   

  
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule1DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
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
    childrenInfo: childrenInfoSurveyInfoType[] = [];
    parentArrInfo = {} as schedule1DataInfoType;   
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){        
        if (this.result.childrenInfoSurvey && this.result.childrenInfoSurvey.length > 0){            
            this.childrenInfo = this.getChildrenInfo();                      
        } else {            
            this.childrenInfo = [];            
        }        
        this.parentArrInfo = this.getParentingArrangementsInfo();
    } 
    
    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.childrenInfoSurvey;
       
        for (const child of childData){            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childInfo.currentSituation = child.currentLiving;
            childrenInfo.push(childInfo)
        }       

        return childrenInfo;
    }

    public getParentingArrangementsInfo(){
        let parentingArrangements = {} as schedule1DataInfoType;       

        if (this.result.parentalResponsibilitiesSurvey && this.result.parentalResponsibilitiesSurvey.parentalResponsibilitiesOrder == 'y'){
            const allResponsibilities = this.result.parentalResponsibilitiesSurvey.allResponsibilitiesOrder == 'y' && this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities;
            parentingArrangements.parentResp = {
                applying: true,
                allResp: this.result.parentalResponsibilitiesSurvey.allResponsibilitiesOrder == 'y',
                children: allResponsibilities?this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities:[],
                allKids: allResponsibilities && this.result.parentalResponsibilitiesSurvey.childrenRequestedResponsibilities.length == this.childrenInfo.length,
                expl: this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities? this.result.parentalResponsibilitiesSurvey.ExplainResponsibilities:''
            }

        } else {
            parentingArrangements.parentResp= {
                applying: false,
                allResp: false,
                children: [],
                allKids: false,
                expl: ''
            }
        }

        if (this.result.parentingTimeSurvey && this.result.parentingTimeSurvey.parentingTimeOrder == 'y'){
            const parentingTime = this.result.parentingTimeSurvey
            parentingArrangements.parentTime = {
                applying: true,
                desired: parentingTime.applicantDesiredParentingTime,
                conditionMe: parentingTime.conditionedApplicantParentingTime == 'y',
                myConditions: (parentingTime.conditionedApplicantParentingTime == 'y')? parentingTime.ApplicantParentingTimeConditions:'',
                conditionOp: parentingTime.conditionedRespondentParentingTime == 'y',
                opConditions: (parentingTime.conditionedRespondentParentingTime == 'y')?parentingTime.RespondentParentingTimeConditions:'',
                opDesired: parentingTime.respondentDesiredParentingTime
            }

        } else {
            parentingArrangements.parentTime = {
                applying: false,
                desired: '',
                conditionMe: false,
                myConditions: '',
                conditionOp: false,
                opConditions: '',
                opDesired: ''    
            }     
        }

        if (this.result.otherParentingArrangementsSurvey && this.result.otherParentingArrangementsSurvey.parentalArrangements == 'y'){
            const parentalArrangements = this.result.otherParentingArrangementsSurvey
            parentingArrangements.parentalArr = {
                applying: true,
                desc: parentalArrangements.parentalArrangementsDescription                
            }
        } else {
            parentingArrangements.parentalArr = {
                applying: false,
                desc: ''                
            }
        }
        
        if (this.result.bestInterestsOfChildSurvey 
            && this.result.bestInterestsOfChildSurvey.newParentingArrangementsChildBestInterestDescription){
                parentingArrangements.childBestInterest = this.result.bestInterestsOfChildSurvey.newParentingArrangementsChildBestInterestDescription

        } else {
            // console.log('here')
            parentingArrangements.childBestInterest = '';
        }
        //console.log(parentingArrangements)
        return parentingArrangements;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>