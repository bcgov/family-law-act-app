<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />

            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 1" scheduleTitle="Parenting Arrangements" scheduleDescription="No existing final order or written agreement"></ScheduleHeader>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap;">
                <div style="flex: 1">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>Complete this schedule only if you need a court order about parenting arrangements, including parental responsibilities and parenting time, and you do not have an existing final court order or written agreement about parenting arrangements.</p>
                    </NoteBox>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>
            
<!-- <1> -->
            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <FormPart :part="1" title="Guardian of the child"></FormPart>
                    
                    <section class="resetquestion"> 
                        Select the option that applies to your situation
                        <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.guardianApplicant == 'y'?'yes':''" text="I am the <b>child’s guardian</b>"/>
                        <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.applyingGuardianApplicant == 'y'?'yes':''" text="I am <b>applying to be appointed</b> as the child’s guardian <i>(I am also completing Schedule 7)</i>"/>
                    </section>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <p>
                            Only a guardian may have parental responsibilities and parenting time with respect to a child [s. 39 Family Law Act].For information about who is a guardian of a child, see the guidebook.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-bottom: 1rem;"></div>


            <!-- 2 -->
            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <FormPart :part="2" title="Order about parenting arrangements"></FormPart>

                    <NoteBox>
                        <p>
                            Parenting arrangements include how each guardian of a child will parent their child(ren), including each guardian’s responsibilities for decision making about a child (parental responsibilities), and the time each guardian spends with a child (parenting time).
                        </p>
                        <p>
                            Guardians can arrange parental responsibilities and parenting time in any way that is in the best interests of the child.
                        </p>
                        <p> 
                            The court can make orders under Division 2 [Parenting Arrangements] of Part 4 [Care of and Time with Children] of the Family Law Act.
                        </p>
                    </NoteBox>

                    <div class="print-block">
                        <div style="margin-top:1rem;"><b>Parental responsibilities</b></div>
                        <div><i>Parental responsibilities can be set up so that they can be exercised by <div class="uline">one or more guardians</div> only, or by <div class="uline">each guardian</div> acting separately, or by <div class="uline">all guardians</div> acting together.</i></div>
        <!-- <2> -->
                        <section>
                            <i style="display:inline; margin-left:0.25rem">Select all options that apply and complete the required information. You may leave a section blank.</i>
                            <div style="margin-left:1rem">
                                <check-box  :check="(parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp)?'yes':''" text="I am applying for an order that gives me all parental responsibilities for the following child(ren):<br/><i>List the name of each child you are requesting all parental responsibilities for</i>"/>
                                <div class="answer">
                                    <ul v-if="parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp">
                                        <li v-for="(child,inx) of parentArrInfo.parentResp.children" :key="inx"><span class="mx-3">{{child}}</span></li>
                                    </ul>
                                </div>                    
                                <check-box style="margin-top:1rem;" :check="(parentArrInfo.parentResp.applying && !parentArrInfo.parentResp.allResp) 
                                    || (parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp && !parentArrInfo.parentResp.allKids)?'yes':''" text="I am applying for an order for the parental responsibilities to be exercised by the guardians as follows:"/>                    
                                <div v-if="(parentArrInfo.parentResp.applying && !parentArrInfo.parentResp.allResp) 
                                    || (parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp && !parentArrInfo.parentResp.allKids)" class="answerbox">{{parentArrInfo.parentResp.expl}}</div>
                                <div v-else style="margin-bottom:3rem;"></div>
                            </div>            
                        </section>
                    </div>
        
                    <div class="print-block">
                        <div style="margin-top:3rem;"><b>Parenting time</b></div>
                        <div><i>During parenting time, a guardian has the parental responsibility of making day-to-day decisions affecting the child and having day-to-day care, control, and supervision of the child. Complete section 3 below only if you are applying for an order about parenting time. You may leave this section blank.</i></div>
        <!-- <3> -->
                        <section>
                            I am applying for an order about the allocation of parenting time as follows:
                            <i style="display:block; margin-left:1rem">Select all options that apply and complete the required information. You may leave a section blank.</i>
                            <check-box style="margin:0 0 0 1rem;" 
                                    :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.desired?'yes':''" 
                                    text="I am asking for the child(ren) to spend time with me as follows:"/> 
                            <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.desired)" 
                                class="answerbox">{{parentArrInfo.parentTime.desired}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
        
        
                            <check-box 
                                style="margin:1rem 0 0 1rem;" 
                                :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionMe?'yes':''" 
                                text="I am willing to have the following conditions placed on my time with the child(ren):"/>
                            
                            <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionMe)" 
                                class="answerbox">{{parentArrInfo.parentTime.myConditions}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>                    
                            
                            
                            <check-box 
                                style="margin:1rem 0 0rem 1rem;" 
                                :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.opDesired?'yes':''" 
                                text="I am asking for the child(ren) to spend time with the other guardian(s) as follows:"/>
                            <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.opDesired)" 
                                class="answerbox">{{parentArrInfo.parentTime.opDesired}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
                            
                            
                            <check-box 
                                style="margin:1rem 0 0rem 1rem;" 
                                :check="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionOp?'yes':''" 
                                text="I am asking to have the following conditions placed on the other guardian’s time with the child(ren):"/>
                            <div v-if="(parentArrInfo.parentTime.applying && parentArrInfo.parentTime.conditionOp)" 
                                class="answerbox">{{parentArrInfo.parentTime.opConditions}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>       
                       
                        </section>
                    </div>
        
                    <div class="print-block">
                        <div style="margin-top:3rem;"><b>Parenting arrangements</b></div>
        <!-- <4> -->
                        <section>
                            <i style="display:inline; margin-left:0.25rem">Complete only if there are additional order terms you want. You may leave this section blank.</i>
                            <div>
                                <check-box  
                                    inline="inline" 
                                    boxMargin="0" 
                                    style="display:inline; margin:0 0 0 1rem;" 
                                    :check="parentArrInfo.parentalArr.applying?'yes':''" text=""/>
                                <div style="display:inline;">I am applying for the following other order term(s) about parenting arrangements:</div>
                                <div v-if="(parentArrInfo.parentalArr.applying && parentArrInfo.parentalArr.desc)" 
                                class="answerbox">{{parentArrInfo.parentalArr.desc}}</div>
                                <div v-else style="margin-bottom:3rem;"></div>  
                            
                            
                            </div>                
                        </section> 
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <p>
                            Only a guardian may have parental responsibilities and parenting time with respect to a child [s. 39 Family Law Act].For information about who is a guardian of a child, see the guidebook.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- 3 -->
            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap:4px;">
                <div style="flex: 1">
                    <FormPart :part="3" title="Best interests of the child"></FormPart>
                    
                    <section class="resetquestion"> 
                        <p>I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the best interests of the child(ren)because:</p>
                        <p><i>List your reasons</i></p>

                        <div v-if="parentArrInfo.childBestInterest" 
                        class="answerbox">{{parentArrInfo.childBestInterest}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>  

                    </section>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-book></b-icon-book>
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the Family Law Act.The parties and the court must consider the best interests of a child when making a decision about parenting arrangements.For more information, see the guidebook.
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