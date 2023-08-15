<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div class="row">
            <div class="col-md-12 order-heading">
                <div>
                    <h1>Requirements and Considerations</h1>
                    <div style="font-size: 1.1rem;">
                        There are resources available to provide support to individuals during the court process. This includes:
                        <ul>
                            <li>technology resources to support attendance at court, evidence submissions or other technology needs</li>
                            <li>
                                interpreters for people who have difficulty understanding or speaking English, or deaf 
                                and hard of hearing persons
                            </li>
                            <li>safety planning for the courtroom with the sheriffs</li>
                            <li>accommodations for disability such as courtroom access and setup and audio aids</li>
                        </ul>
                        <p>
                            Resource availability may be limited in some court locations so early 
                            identification and booking may be required.
                        </p>
                        <p>
                            Did you know you can bring a support person with you to trial to provide 
                            emotional support, take notes and help organize documents? The Provincial 
                            Court generally welcomes ‘support persons’ to provide quiet help to 
                            self-represented litigants in family court trials. For more information, 
                            go to the 
                            <a 
                                target="_blank"
                                href="https://www.provincialcourt.bc.ca/downloads/Practice%20Directions/NP11.pdf">
                                Guidelines for Using a Support Person in Provincial Court
                            </a>.
                        </p>
                        
                    </div>
                    <div>
                        <h2 style="color: #556077; font-size: 1.35em; line-height: 1.2;">
                            Please identify if any special requirements or considerations 
                            are needed to support your trial.
                        </h2>                        
                    </div>
                </div>        
                
                <div>                    
                    <b-form-group>
                        <b-form-checkbox-group
                            v-model="reqInfo.specialReqList"                           
                            name="requests"
                            stacked>                
                            <div class="checkbox-border">
                                <b-form-checkbox value="technology">
                                    <div class="checkbox-choices">
                                        Technology needs
                                    </div>                               
                                </b-form-checkbox>
                                <b-row class="mx-2">                                    
                                    <b-col cols="3"><label style="margin:0.5rem 0;">Please specify:</label></b-col>
                                    <b-col><b-form-input v-model="reqInfo.techSpecs"></b-form-input>
                                    </b-col>
                                </b-row>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="interpreter">
                                    <div class="checkbox-choices">
                                        Interpreter
                                    </div>
                                    <p>
                                        <b-row class="mx-2">                                    
                                            <b-col><label style="margin:0.5rem 0;">Name of party or witness:</label></b-col>
                                            <b-col><b-form-input v-model="reqInfo.interpreterInfo.name"></b-form-input>
                                            </b-col>
                                            <b-col cols="2"><label style="margin:0.5rem 0;">Language:</label></b-col>
                                            <b-col><b-form-input v-model="reqInfo.interpreterInfo.language"></b-form-input>
                                            </b-col>
                                        </b-row>                                        
                                        Note: If more than one party or witness requires an interpreter, please 
                                        list each individual separated by a comma. If more than one language 
                                        is also required, please list each language separated by a comma.
                                    </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="safety">
                                    <div class="checkbox-choices">
                                        Safety planning                                        
                                    </div>
                                    <p>
                                        Please explain your concerns or why you need a safety plan in place:
                                    </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="accommodations">
                                    <div class="checkbox-choices">Trial accommodations</div>
                                    <p>
                                        such as allowing evidence by affidavit, video or
                                        telephone attendance or other accommodation. Please specify:
                                    </p>
                                </b-form-checkbox>
                            </div>

                            <div class="checkbox-border">
                                <b-form-checkbox value="disability">
                                    <div class="checkbox-choices">
                                        Accommodations for disability
                                    </div>
                                    <p>
                                        such as an accessible court room, audio aids, or other
                                        Please specify:
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
import { interpreterDetailsDataInfoType, requirementsAndConsiderationsSurveyDataInfoType } from '@/types/Application/TrialReadinessStatement';

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class RequirementsAndConsiderations extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    
    reqInfo = {} as requirementsAndConsiderationsSurveyDataInfoType;
    currentStep =0;
    currentPage =0;   

    mounted(){      
        this.reloadPageInformation();
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;    
        
        

        if (this.step.result?.requirementsAndConsiderationsSurvey?.data){
            this.reqInfo = this.step.result.requirementsAndConsiderationsSurvey.data;
            // this.setPages();                          
        } else {
            this.reqInfo = {} as requirementsAndConsiderationsSurveyDataInfoType;
            this.reqInfo.specialReqList = [];
            this.reqInfo.interpreterInfo = {} as interpreterDetailsDataInfoType;

        }        
       
        const progress = this.reqInfo.specialReqList.length==0? 50 : 100;   //TODO:  check states   
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);     
    }   

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }   

    public getSelectedReqs(){
        let reqs = ''
        for(const req of this.reqInfo.specialReqList){
            if(req=='adjourned')               reqs+='It was adjourned by the court without setting a new date'+'\n';
            if(req=='struck')                  reqs+='It was struck from the court list by the court'+'\n';
            if(req=='party')                   reqs+='The court:<ul><li>referred a party to a program, professional or resource</li><li>required a party to attend, participate or complete a requirement</li></ul>'+'\n';
            if(req=='deficiency')              reqs+='We fixed a deficiency under the rules'+'\n';
            if(req=='orderChanged')            reqs+='There is an interim order that needs to be changed, suspended or cancelled'+'\n';
            if(req=='family')                  reqs+='I already attended a family management conference and I need an interim order on my family law matter before my next court date'+'\n';
        }
        return reqs;
    }   

    beforeDestroy() {
        const progress = this.reqInfo.specialReqList.length==0? 50 : 100; //TODO:  check states
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'ReasonForScheduling',title:'I need to schedule a court appearance on my application because:',value:this.getSelectedReqs()}]        
        this.UpdateStepResultData({step:this.step, data: {requirementsAndConsiderationsSurvey: {data: this.reqInfo, questions: questions, pageName:"Reason for Scheduling", currentStep:this.currentStep, currentPage:this.currentPage}}});
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