<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="row">
            <div class="col-md-12 order-heading">
                <div>
                    <h1>Reason for scheduling</h1>
                    <div>
                        <h2 style="color: #556077; font-size: 1.35em; line-height: 1.2;">
                            Why do you need to schedule a court appearance on your application?
                        </h2>
                        <p style="font-size: 1.1rem;">
                            What happened on the last court date? Why do you need to come back to court on this application?
                        </p>
                        <p style="font-size: 1.1rem;">
                            Select from the list below.
                        </p>
                    </div>
                </div>        
                
                <div>                    
                    <b-form-group>
                        <b-form-checkbox-group
                            v-model="selectedReason"
                            v-on:change="onChange($event)"
                            name="reasons"
                            stacked>                
                            <div class="checkbox-border">
                                <b-form-checkbox value="adjourned">
                                    <div class="checkbox-choices">
                                        It was adjourned by the court without setting a new date
                                    </div>
                                <p>
                                    Your court matter was adjourned generally (without scheduling a new date). 
                                    You are now ready and need a court appearance to be scheduled.
                                </p>                    
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="struck">
                                    <div class="checkbox-choices">
                                        It was struck from the court list by the court
                                    </div>
                                    <p>
                                        The parties did not attend a scheduled court appearance so 
                                        the court took it off the list for the day. You are now 
                                        ready and need a court appearance to be scheduled.
                                    </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="party">
                                    <div class="checkbox-choices">
                                        The court:
                                        <ul>
                                            <li>referred a party to a program, professional or resource</li>
                                            <li>required a party to attend, participate or complete a requirement</li>
                                        </ul>
                                    </div>
                                    <p>
                                        The court may have directed you to a family justice counsellor, mediator, 
                                        counsellor or other program, professional or resource, or to participate 
                                        in a full section 211 report or views of the child report. You have 
                                        completed one or more of the above directions and need a court appearance 
                                        to be scheduled.
                                    </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="deficiency">
                                    <div class="checkbox-choices">We fixed a deficiency under the rules</div>
                                <p>
                                    A deficiency is something that you may have been required to do under the rules 
                                    that was missed or wasn’t done correctly. For example, filling out information 
                                    in a form or how you served the other party. You have fixed the deficiency and 
                                    need a court appearance to be scheduled.
                                </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="orderChanged">
                                    <div class="checkbox-choices">
                                        There is an <tooltip title="interim order" :index="0"/> that needs to be changed, suspended or cancelled
                                    </div>
                                    <p>
                                        Your family circumstances have changed and you have new information. 
                                        The court made an interim order that you need to have changed, 
                                        suspended or cancelled under 
                                        <a target="_blank" href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_10#section216">
                                            section 216(3)
                                        </a> of the <i>Family Law Act</i> before your hearing or trial. 
                                        You need a court appearance to be scheduled.
                                    </p>
                                </b-form-checkbox>
                            </div>
                            <div class="checkbox-border">
                                <b-form-checkbox value="family">
                                    <div class="checkbox-choices">
                                        I already attended a family management conference and I need 
                                        an <tooltip title="interim order" :index="1"/> on my family 
                                        law matter before my next court date
                                    </div>
                                    <p>
                                        You have an application, reply or counter application for a 
                                        family law matter. You have already attended a family management 
                                        conference about it but family circumstances have changed and 
                                        you have new information. You need an interim order under 
                                        <a target="_blank" href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_10#section216">
                                            section 216 or 217
                                        </a> of the <i>Family Law Act</i> before your next court date. You need a court appearance to be scheduled.                                    
                                    </p>
                                </b-form-checkbox>
                            </div>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';   
import { namespace } from "vuex-class";  

import Tooltip from "@/components/survey/Tooltip.vue";
import PageBase from "../PageBase.vue";

import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class ReasonForScheduling extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    
    selectedReason = [];
    currentStep =0;
    currentPage =0;   

    mounted(){      
        this.reloadPageInformation();
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;    
        
        this.selectedReason = [];

        if (this.step.result?.reasonForSchedulingSurvey?.data){
            this.selectedReason = this.step.result.reasonForSchedulingSurvey.data;
            this.setPages();                          
        }        
       
        const progress = this.selectedReason.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);     
    }

    public setPages() {

        const p = this.stPgNo.RQS;
        const requiresInterimOrderPage = this.selectedReason?.length >0?(this.selectedReason?.includes('orderChanged') || this.selectedReason?.includes('family')):false;
        
        togglePages([p.InterimOrder], requiresInterimOrderPage, this.currentStep);
       
    }  
    
    public onChange(selectedReason) {
        this.UpdatePathwayCompleted({pathway:"requestScheduling", isCompleted:false})
           
        this.setPages();
       
        Vue.filter('surveyChanged')('requestScheduling')               
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }   

    public getSelectedReasons(){
        let result = ''
        for(const reason of this.selectedReason){
            if(reason=='adjourned')               result+='It was adjourned by the court without setting a new date'+'\n';
            if(reason=='struck')                  result+='It was struck from the court list by the court'+'\n';
            if(reason=='party')                   result+='The court:<ul><li>referred a party to a program, professional or resource</li><li>required a party to attend, participate or complete a requirement</li></ul>'+'\n';
            if(reason=='deficiency')              result+='We fixed a deficiency under the rules'+'\n';
            if(reason=='orderChanged')            result+='There is an interim order that needs to be changed, suspended or cancelled'+'\n';
            if(reason=='family')                  result+='I already attended a family management conference and I need an interim order on my family law matter before my next court date'+'\n';
        }
        return result;
    }   

    beforeDestroy() {
        const progress = this.selectedReason.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'ReasonForScheduling',title:'I need to schedule a court appearance on my application because:',value:this.getSelectedReasons()}]        
        this.UpdateStepResultData({step:this.step, data: {reasonForSchedulingSurvey: {data: this.selectedReason, questions: questions, pageName:"Reason for Scheduling", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";
    .checkbox-border {
        border: 1px solid rgba($gov-mid-blue, 0.3);
        border-radius: 15px;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 8px;
    }
    .checkbox-choices{
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 17px;
    }

    input {
        padding-left: 20px;
    }
</style>