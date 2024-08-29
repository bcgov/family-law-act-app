<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 7" scheduleTitle="Parenting Arrangements" scheduleDescription="No existing final order or written agreement"></ScheduleHeader>
                </div>
                <div style="width: 20%;"></div>
            </div>
            <div style="margin-bottom: 0.5rem;"></div>

            <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <NoteBox fontSize="10pt">
                    <span>Complete this schedule only if you need a court order about parenting arrangements, including 
                    parental responsibilities and parenting time, and you do not have an existing final court order or 
                    written agreement about parenting arrangements.</span>
                </NoteBox>
            </div>
            <div style="width: 20%;"></div>
        </div>

        <div style="margin-bottom: 1rem;"></div>
<!-- <1> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Guardian of the child"></FormPart>
                    <section> 
                        <i>Select the option that applies to your situation</i>
                        <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.guardianApplicant == 'y'?'yes':''" text="I am the <b>child’s guardian</b>"/>
                        <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.applyingGuardianApplicant == 'y'?'yes':''"  text="I am <b>applying to be appointed</b> as the child’s guardian <i>(I am also completing <b>Schedule 7</b>)</i>"/>
                    </section>
            </div>
            <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <span>
                            Only a guardian may have parental responsibilities and parenting time with respect to a child <i>[s. 39 Family Law Act]</i>. For information about who is a guardian of a child, see the guidebook.
                        </span>
                    </NoteBox>
            </div> 
    </div>
    <div style="margin-bottom: 1rem;"></div> 

    <!-- <2> -->
        <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; margin-right: 8px;">
                    <FormPart :part="2" title="Order about parenting arrangements"></FormPart>
                    <NoteBox fontSize="10pt">
                        <p>
                            Parenting arrangements include how each guardian of a child will parent their child(ren), including each guardian’s responsibilities for decision making about a child (parental responsibilities), and the time each guardian spends with a child (parenting time).
                            <br>
                            Guardians can arrange parental responsibilities and parenting time in any way that is in the best interests of the child.
                            <br>
                            The court can make orders under Division 2 [Parenting Arrangements] of Part 4 [Care of and Time with Children] of the <i>Family Law Act.</i>
                        </p>
                    </NoteBox>
                    <br>

                <div>
                    <b>2. </b>
                    <p style="display: inline;">I am applying for an <b>order about parental responsibilities</b> as follows:</p>
                    <br>
                    <i style="color: #ababab;">List the details of the order you are asking for. You may leave this question blank.</i>
                    
                    <div class="answerbox" style="height: 100px; background-color:#dedede;">
                        {{parentArrInfo.parentResp.expl}}
                    </div>
                </div>

                <br>
                    <div>
                        <b>3. </b>
                        <p  style="display: inline;">I am applying for an <b>order about parenting time</b> as follows:</p>
                        <br>
                        <i style="color: #ababab;">List the details of the order you are asking for. You may leave this question blank.</i>
                        
                        <div class="answerbox" style="min-height: 100px; padding: 8px background-color:#dedede">
                            <div v-if="parentArrInfo.parentTime.desired" style="font-size: 10px;">
                                <b>I am asking for the child(ren) to spend time with me as follows:</b>
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                                {{parentArrInfo.parentTime.desired}}
                            </div>
                            
                            <br>

                            <div v-if="parentArrInfo.parentTime.myConditions" style="font-size: 10px; ">
                                <b>I am willing to have the following conditions placed on my time with the child(ren):</b>
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                                {{parentArrInfo.parentTime.myConditions}}
                            </div>
                            
                            <br>

                            <div v-if="parentArrInfo.parentTime.opDesired" style="font-size: 10px;">
                                <b>I am asking for the child(ren) to spend time with the other guardian(s) as follows:</b>
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                                {{parentArrInfo.parentTime.opDesired}}
                            </div>
                            
                            <br>

                            <div v-if="parentArrInfo.parentTime.opConditions" style="font-size: 10px;">
                                <b>I am asking to have the following conditions placed on the other guardian’s time with the child(ren):</b>
                            </div>
                            <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                                {{parentArrInfo.parentTime.opConditions}}
                            </div>
                        </div>  
                    </div>
                    <br>
                    <div>
                        <b>4. </b>
                        <p  style="display: inline"><b>I am applying for an order about</b></p>
                        <ul>
                            <li>the <b>implementation of an order</b> about parenting arrangements made under the Family Law Act, or</li>
                            <li>the <b>means for resolving disputes</b> about an order about parenting arrangements made under the Family Law Act,</li>
                        </ul>
                        <p>as follows: <br>
                        <i style="color:#ababab">List the details of the order you are asking for. You may leave this question blank.</i>
                        </p> 
                        <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                            {{parentArrInfo.parentalArr.desc}}
                        </div>   
                    </div>
                    <br>
                    <div>
                        <b>5. </b>
                        <p  style="display: inline">I am applying for <b>directions</b> from the court under s. 49 of the <i>Family Law Act</i> respecting the following <b>issue affecting a child</b>:</p>
                        <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">
                            {{result.otherParentingArrangementsSurvey.seekingDirectionFromCourtDescription}}
                        </div> 
                    </div>

                </div>
                <div style="width: 20%;">
                    <div style="padding-top:10px">
                        <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Parental responsibilities can be set up so they can be exercised by:
                        </p>
                        <ul style="margin-left: -30px;">
                            <li>One or more guardians only,</li>
                            <li>Each guardian acting separately, or</li>
                            <li>All guardians acting together.</li>
                        </ul>
                        <i>[s. 40 Family Law Act]</i>
                    </NoteBox>
                  
                    </div>
                   

                    <div style="padding-top:10px">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            S. 49 of the <i>Family Law Act</i> allows a child’s guardian to apply to court for directions respecting an issue affecting the child, and the court may make an order giving the directions it considers appropriate.
                        </p>
                    </NoteBox>
                </div>
                </div>
        </div>

        <div style="margin-bottom: 1rem;"></div>
           <!-- 3 -->
           <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Best interests of the child"></FormPart>
                    <div>
                        <b>6. </b> 
                        <p style="display: inline">I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the <b>best interests of the child(ren)</b> because:</p>
                        <p><i>List your reasons</i></p>
                        <div class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{parentArrInfo.childBestInterest}}</div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-book></b-icon-book>
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the <i>Family Law Act</i>.The parties and the court must consider the best interests of a child when making a decision about parenting arrangements.For more information, see the guidebook.
                        </p>
                    </NoteBox>
                </div>        
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule1DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        ScheduleHeader,
        NoteBox,
        FormPart
    }
})

export default class Schedule11 extends Vue {

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
        if (this.result.childrenInfoSurvey?.length > 0){            
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

        if (this.result.parentalResponsibilitiesSurvey?.parentalResponsibilitiesOrder == 'y'){
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

        if (this.result.parentingTimeSurvey?.parentingTimeOrder == 'y'){
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

        if (this.result.otherParentingArrangementsSurvey?.parentalArrangements == 'y'){
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
        
        if (this.result.bestInterestsOfChildSurvey?.newParentingArrangementsChildBestInterestDescription){
            parentingArrangements.childBestInterest = this.result.bestInterestsOfChildSurvey.newParentingArrangementsChildBestInterestDescription

        } else {            
            parentingArrangements.childBestInterest = '';
        }
        
        return parentingArrangements;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>