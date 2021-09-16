<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 3 – WAIVING OR MODIFYING ANY OTHER REQUIREMENT UNDER THE RULES</b></div>
            <div style="text-align:center;"><b>This is Schedule 3 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed if you are applying to waive or modify any other requirement under the rules, including a time limit set by an order or direction, even after the time limit has expired.</i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.15rem">
                    I am applying for an order to waive or modify the following requirement(s) under the rules:
                </div>
                    
                <div>
                    <i style="margin-left:1.0rem">Select all options that apply</i>
                </div>

                <div style="margin-left:1.0rem;">
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Filing at a court registry other than the court registry required by Rule 7')?'yes':''" text="filing at a court registry other than the court registry required by Rule 7"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Attending a needs assessment')?'yes':''" text="attending a needs assessment"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Completing a parenting education program')?'yes':''" text="completing a parenting education program"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Participating in consensual dispute resolution')?'yes':''" text="participating in consensual dispute resolution"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Filing a completed financial statement with my application or reply')?'yes':''" text="filing a completed financial statement with my application, counter application or reply"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Filing the required documents for an application about guardianship of a child')?'yes':''" text="filing the required documents for an application about guardianship of a child"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Time to file a reply, including permission to file a reply after the time to reply has passed')?'yes':''" text="time to file a reply, including permission to file a reply after the time to reply has passed"/>
                    <check-box  :check="modReqInfo.appliedRequirementsList.includes('Time to provide/exchange document(s)')?'yes':''" text="time to provide/exchange document(s)"/>

                    <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="modReqInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')?'yes':''" text="time limit set by an order or direction made on"/>
                    <underline-form style="text-indent:3px;display:inline-block;" textwidth="6rem" beforetext="" hint="mmm/dd/yyyy" :text="modReqInfo.dateOfOrder"/>                     
                    <underline-form style="text-indent:3px;display:inline-block;" textwidth="13rem" beforetext="by" hint="name of judge or family justice manager" :text="modReqInfo.judgeName"/>                     
                    <div style="margin-top:0.7rem"></div>
                    <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="modReqInfo.appliedRequirementsList.includes('other')?'yes':''" text="other <i>(specify):</i>"/>
                    <underline-form style="text-indent:1px;display:inline-block;" textwidth="33.3rem" beforetext="" hint="" :text="modReqInfo.appliedRequirementsListComment"/>                     
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The details of the order I am applying for are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Tell the court the specifics of the order you are applying for. Include if you are applying for the court to waive
                            (cancel) the requirement or to modify (change) the requirement. If you are applying to modify the
                            requirement, specify how you want the requirement changed, for example, additional time to meet the
                            requirement or completing the requirement after taking some other step.
                        </i>
                    </div>
                    
                    <div v-if="modReqInfo.orderDetail" 
                    class="answerbox">{{modReqInfo.orderDetail}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The facts on which this application is based are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Provide the facts you want the court to consider, including:
                        </i>
                    </div>
                    <ul style="text-indent:0;font-style:italic">
                        <li>why you are making the application to waive or modify a requirement</li>
                        <li>why you need the court to make the order</li>
                        <li>whether you are able to complete the requirement at a later date and when you expect to be able to complete the requirement</li>
                        <li>if you are applying to waive or modify any early resolution requirements, what your family law
                            matter is about and who is involved (names of any other party and children the application would be about)</li>
                        <li>how waiving or modifying the requirement will benefit the case proceeding</li>
                    </ul>
                    
                    <div v-if="modReqInfo.applicationFacts" 
                    class="answerbox">{{modReqInfo.applicationFacts}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';  
import "@/store/modules/application";

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule3DataInfoType } from '@/types/Application/CaseManagement/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;   
    modReqInfo = {} as schedule3DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

   
    public extractInfo(){
        this.modReqInfo = this.getWaiveModifyAnyOtherRequirementsInfo();
    }

    public getWaiveModifyAnyOtherRequirementsInfo(){
        
        let waiveModifyAnyOtherRequirementsInfo = {} as schedule3DataInfoType;
        
        if(this.result?.changingOrCancellingAnyOtherRequirementSurvey){

            const chgSurvey = this.result.changingOrCancellingAnyOtherRequirementSurvey;
                
            waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList = chgSurvey.appliedRequirementsList? chgSurvey.appliedRequirementsList: [];
            waiveModifyAnyOtherRequirementsInfo.appliedRequirementsListComment = chgSurvey.appliedRequirementsListComment? chgSurvey.appliedRequirementsListComment: '';
            waiveModifyAnyOtherRequirementsInfo.orderDetail = chgSurvey.orderDetail? chgSurvey.orderDetail: '';            
            waiveModifyAnyOtherRequirementsInfo.applicationFacts = chgSurvey.applicationFacts ? chgSurvey.applicationFacts:'';
            waiveModifyAnyOtherRequirementsInfo.dateOfOrder = waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')? Vue.filter('beautify-date-blank')(chgSurvey.dateOfOrder):'' 
            waiveModifyAnyOtherRequirementsInfo.judgeName = waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')? chgSurvey.judgeName: ''
        }

        return waiveModifyAnyOtherRequirementsInfo
    } 

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>