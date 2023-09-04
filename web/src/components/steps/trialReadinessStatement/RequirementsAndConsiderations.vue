<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <div v-if="dataLoaded" class="row">
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
                
                <div :key="updated">                    
                    <b-form-group >
                        <b-form-checkbox-group
                        
                            v-model="reqInfo.specialReqList"
                            @change="updateSelection()"                    
                            name="requests"
                            stacked>                
                            <div class="checkbox-border" :style="(state.specialReqList || state.techSpecs)?'outline: 2px solid red;':''" >
                                <b-form-checkbox value="technology">
                                    <div class="checkbox-choices">
                                        Technology needs
                                    </div>                               
                                </b-form-checkbox>
                                <b-row v-if="reqInfo.specialReqList.includes('technology')">                                    
                                    <b-col cols="2"><label style="margin:0.5rem 0;">Please specify:</label></b-col>
                                    <b-col>
                                        <b-form-textarea style="width: 100% !important;" v-model="reqInfo.techSpecs"/>
                                    </b-col>
                                </b-row>
                            </div>

                            <div class="checkbox-border" :style="(state.specialReqList || state.interpreterInfo)?'outline: 2px solid red;':''">
                                <b-form-checkbox value="interpreter">
                                    <div class="checkbox-choices">
                                        Interpreter
                                    </div>                                    
                                </b-form-checkbox>
                                <div v-if="reqInfo.specialReqList.includes('interpreter')">
                                    <b-row>                                    
                                        <b-col cols="2"><label style="margin:0.5rem 0;">Name of party or witness:</label></b-col>
                                        <b-col>
                                            <b-form-textarea style="width: 100% !important;" v-model="reqInfo.interpreterInfo.name"/>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-2"> 
                                        <b-col cols="2"><label style="margin:0.5rem 0;">Language:</label></b-col>
                                        <b-col><b-form-textarea style="width: 100% !important;" v-model="reqInfo.interpreterInfo.language"/></b-col>
                                    </b-row>                                        
                                    Note: If more than one party or witness requires an interpreter, please 
                                    list each individual separated by a comma. If more than one language 
                                    is also required, please list each language separated by a comma.
                                </div>
                            </div>

                            <div class="checkbox-border" :style="(state.specialReqList || state.safetySpecs)?'outline: 2px solid red;':''" >
                                <b-form-checkbox value="safety">
                                    <div class="checkbox-choices">
                                        Safety planning                                        
                                    </div>                                    
                                </b-form-checkbox>
                                <div v-if="reqInfo.specialReqList.includes('safety')">
                                    Please explain your concerns or why you need a safety plan in place:
                                    <b-row class="mt-2">
                                        <b-form-textarea class="mx-3" style="width: 100% !important;" v-model="reqInfo.safetySpecs"/>
                                    </b-row>
                                </div>
                            </div>

                            <div class="checkbox-border" :style="(state.specialReqList || state.trialSpecs)?'outline: 2px solid red;':''" >
                                <b-form-checkbox value="accommodations">
                                    <div class="checkbox-choices" style="display:inline !important;">Trial accommodations</div>
                                    <div style="display:inline !important;">
                                        such as allowing evidence by affidavit, video or
                                        telephone attendance or other accommodation. Please specify:
                                    </div>  
                                </b-form-checkbox>
                                <div v-if="reqInfo.specialReqList.includes('accommodations')">
                                    <b-row>
                                        <b-form-textarea class="mx-3" style="width: 100% !important;" v-model="reqInfo.trialSpecs"/>
                                    </b-row>
                                </div>
                            </div>

                            <div class="checkbox-border" :style="(state.specialReqList || state.disabilitySpecs)?'outline: 2px solid red;':''" >
                                <b-form-checkbox value="disability">
                                    <div class="checkbox-choices"  style="display:inline !important;">
                                        Accommodations for disability
                                    </div>
                                    <div style="display:inline !important;">
                                        such as an accessible court room, audio aids, or other.
                                        Please specify:
                                    </div>                                    
                                </b-form-checkbox>
                                <div v-if="reqInfo.specialReqList.includes('disability')">
                                    <b-row class="mt-2">
                                        <b-form-textarea class="mx-3" style="width: 100% !important;" v-model="reqInfo.disabilitySpecs"/>
                                    </b-row>
                                </div>
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
    
    reqInfo = {} as requirementsAndConsiderationsSurveyDataInfoType;
    currentStep =0;
    currentPage =0;   
    updated = 0;
    dataLoaded = false;

    state: any = {
        specialReqList: false,
        techSpecs: false,
        interpreterInfo: false,
        safetySpecs: false,
        trialSpecs: false,
        disabilitySpecs: false
    };

    mounted(){      
        this.dataLoaded = false;
        this.updated = 0;
        this.initStates();
        this.reloadPageInformation();
    }

    public initStates() {
        for (const key of Object.keys(this.state)) {
            this.state[key] = false;
        }
    }

    public updateSelection(){
        this.updated ++;
        this.checkFields();
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;    

        this.reqInfo = {} as requirementsAndConsiderationsSurveyDataInfoType;
        this.reqInfo.specialReqList = [];
        this.reqInfo.interpreterInfo = {name: '', language: ''} as interpreterDetailsDataInfoType;
        this.reqInfo.techSpecs = '';
        this.reqInfo.safetySpecs = '';
        this.reqInfo.trialSpecs = '';
        this.reqInfo.disabilitySpecs = '';

        if (this.step.result?.requirementsAndConsiderationsSurvey?.data){
            const reqData = this.step.result.requirementsAndConsiderationsSurvey.data;
            this.reqInfo.specialReqList = reqData.specialReqList?reqData.specialReqList:[];            
            this.reqInfo.techSpecs = reqData.techSpecs?reqData.techSpecs:'';
            this.reqInfo.interpreterInfo = reqData.interpreterInfo?reqData.interpreterInfo:{};
            this.reqInfo.safetySpecs = reqData.safetySpecs?reqData.safetySpecs:'';
            this.reqInfo.trialSpecs = reqData.trialSpecs?reqData.trialSpecs:'';
            this.reqInfo.disabilitySpecs = reqData.disabilitySpecs?reqData.disabilitySpecs:'';
        }     
       
        const progress = this.checkFields(true)? 50 : 100; 
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);     

        this.dataLoaded = true;
    }   

    public onPrev() {
        if (this.checkFields()){
            Vue.prototype.$UpdateGotoPrevStepPage();
        }        
    }

    public onNext() {        
        if (this.checkFields()){
            Vue.prototype.$UpdateGotoNextStepPage();   
        }    
    }  
    
    public checkFields(pageload?) {
        
        if(!pageload)
            this.state.specialReqList = this.reqInfo.specialReqList.length>0? false : true;       

        if (this.reqInfo.specialReqList.includes('technology')){
            this.state.techSpecs = this.reqInfo.techSpecs?false:true;
        } else {
            this.state.techSpecs = false;
        }

        if (this.reqInfo.specialReqList.includes('interpreter')){
            this.state.interpreterInfo = (this.reqInfo.interpreterInfo?.language && this.reqInfo.interpreterInfo?.name)?false:true;
        } else {
            this.state.interpreterInfo = false;
        }

        if (this.reqInfo.specialReqList.includes('safety')){
            this.state.safetySpecs = this.reqInfo.safetySpecs?false:true;
        } else {
            this.state.safetySpecs = false;
        }

        if (this.reqInfo.specialReqList.includes('accommodations')){
            this.state.trialSpecs = this.reqInfo.trialSpecs?false:true;
        } else {
            this.state.trialSpecs = false;
        }

        if (this.reqInfo.specialReqList.includes('disability')){
            this.state.disabilitySpecs = this.reqInfo.disabilitySpecs?false:true;
        } else {
            this.state.disabilitySpecs = false;
        }

        for (const key of Object.keys(this.state)) {
            if (this.state[key]) return false;
        }
        return true;
    }

    public getSelectedReqs(){
        let reqs = ''
        for(const req of this.reqInfo.specialReqList){
            if(req=='technology')           reqs+='Technology needs: '+ this.reqInfo.techSpecs+'\n';
            if(req=='interpreter')          reqs+='Interpreter for '+ this.reqInfo.interpreterInfo.name + ' in ' + this.reqInfo.interpreterInfo.language +'\n';
            if(req=='safety')               reqs+='Safety planning: '+ this.reqInfo.safetySpecs+'\n';
            if(req=='accommodations')       reqs+='Trial accommodations: '+ this.reqInfo.trialSpecs+'\n';
            if(req=='disability')           reqs+='Accommodations for disability: '+ this.reqInfo.disabilitySpecs+'\n';
        }
        return reqs;
    }   

    beforeDestroy() {
        const progress = this.checkFields()? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'Requirements and Considerations',title:'I need the following special requirements or considerations to support my trial:',value:this.getSelectedReqs()}]        
        this.UpdateStepResultData({step:this.step, data: {requirementsAndConsiderationsSurvey: {data: this.reqInfo, questions: questions, pageName:"Requirements and Considerations", currentStep:this.currentStep, currentPage:this.currentPage}}});
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