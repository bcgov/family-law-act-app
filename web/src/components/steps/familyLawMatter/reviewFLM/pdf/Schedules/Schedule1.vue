<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 1 – PARENTING ARRANGEMENTS – NEW</b></div>
            <div style="text-align:center;"><b> This is Schedule 1 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are a guardian of a child or, are applying to be appointed as a guardian of a child, making a new application about parenting arrangements for a child or children identified in section 11 of this application. 
                Parenting arrangements include how each guardian of a child will parent their child(ren) together, including each guardian’s responsibilities for decision making about a child, and the time each guardian spends with a child.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                I am:
                <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.guardianApplicant == 'y'?'yes':''" text="a guardian of the child(ren) <br/> <i>A child’s parents are most often the child’s guardians, but other people can be guardians too. A parent who has never lived with their child is a guardian if they have regularly taken care of the child, there is an agreement or court order that says they are a guardian of a child, or under a will if the other parent dies. A person who is not a parent can become a guardian of a child by a court order or under a will.</i>"/>
                <check-box style="margin:0 0 0 1rem;" :check="result.parentingArrangementsSurvey && result.parentingArrangementsSurvey.applyingGuardianApplicant == 'y'?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Parental responsibilities</b></div>
                <div><i>Parental responsibilities can be set up so that they can be exercised by <div class="uline">one or more guardians</div> only, or by <div class="uline">each guardian</div> acting separately, or by <div class="uline">all guardians</div> acting together.</i></div>
<!-- <2> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Select all options that apply and complete the required information. You may leave a section blank.</i>
                    <div style="margin-left:1rem">
                        <check-box style="" :check="(parentArrInfo.parentResp.applying && parentArrInfo.parentResp.allResp)?'yes':''" text="I am applying for an order that gives me all parental responsibilities for the following child(ren):<br/><i>List the name of each child you are requesting all parental responsibilities for</i>"/>
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

            <div class="print-block">
                <div style="margin-top:3rem; display:block;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the child(ren)’s best interests because:
                    <div v-if="parentArrInfo.childBestInterest" 
                        class="answerbox">{{parentArrInfo.childBestInterest}}</div>
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
import { childDataInfoType } from '@/types/Application/CommonInformation/Pdf';

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
    childrenInfo: childDataInfoType[] = [];
    parentArrInfo = {} as schedule1DataInfoType;   
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){        
        if (this.result.childData && this.result.childData.length > 0){            
            this.childrenInfo = this.getChildrenInfo();                      
        } else {            
            this.childrenInfo = [];            
        }        
        this.parentArrInfo = this.getParentingArrangementsInfo();
    } 
    
    public getChildrenInfo(){

        const childrenInfo: childDataInfoType[] = [];
        let childInfo = {} as childDataInfoType;
        const childData = this.result.childData;
       
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

        if (this.result.parentalArrangementsSurvey && this.result.parentalArrangementsSurvey.parentalArrangements == 'y'){
            const parentalArrangements = this.result.parentalArrangementsSurvey
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
        
        if (this.result.bestInterestOfChildSurvey 
            && this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription){
                parentingArrangements.childBestInterest = this.result.bestInterestOfChildSurvey.newParentingArrangementsChildBestInterestDescription

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