<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card v-if="dataReady" class="border-white bg-white">
            <h1 class="text-cyan">Did You Know? …</h1>
            <h2 class="text-teal">That you don’t always need to go to court to resolve family law disputes!</h2>

            <p>
                BC laws encourage people to try to resolve their family law disputes out of court through 
                agreement and family dispute resolution processes, including:
            </p>

            <b-card class="border-white">
                <b-card-header class="text-uppercase font-weight-bold  row mx-2 mediation-header">
                    <div class="animated bounce infinite"><i class="fa fa-handshake-o" style="font-size:36px; " ></i></div>
                    <span class="ml-2 mt-1">Mediation</span>
                    
                    
                </b-card-header>
                <b-card-body>
                    Mediation is a meeting in an informal, neutral setting with a trained mediator 
                    who helps you and the other person talk about the issues and reach an agreement. 
                    <a 
                        href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/who-can-help/family-justice-counsellors"
                        target="_blank">Family Justice Counsellors
                    </a> provide free family mediation services throughout BC. 
                    You can also hire a 
                    <a 
                        href="https://www.mediatebc.com/"
                        target="_blank">private mediator
                    </a> or use 
                    <a 
                        href="https://mylawbc.com/mediation/"
                        target="_blank">MyLawBC’s free online mediation tool
                    </a>.

                </b-card-body>
            </b-card>

            <b-card class="border-white">
                <b-card-header class="collaborative-law-header text-uppercase font-weight-bold row mx-2">
                    <img  src="../../../assets/users-gear.svg" style="width: 3rem; height: 3rem;"/>                    
                    <span class="ml-2 mt-3">Collaborative Law</span>                    
                </b-card-header>
                <b-card-body>
                    In a collaborative family law process you and the other party each hire a 
                    lawyer who practises collaborative family law, and sign an agreement promising 
                    to work together to find acceptable solutions. The goal of a collaborative law 
                    process is to settle your case fairly, without going to court. 
                    <a 
                        href="https://www.bccollaborativerostersociety.com/index.php"
                        target="_blank">The BC Collaborative Roster Society
                    </a> has a roster of qualified collaborative law professionals.

                </b-card-body>
            </b-card>

            <b-card class="border-white">
                <b-card-header class="facilitated-negotiation-header text-uppercase font-weight-bold row mx-2">
                    <b-icon-person-fill class="mt-2" scale="2"/>
                    <b-icon-arrow-left-right class="mt-2 mx-4" scale="2" animation="cylon"/>
                    <b-icon-person-fill class="mt-2" scale="2" />      
                    <span class="ml-3 mt-1">Facilitated Negotiation</span>             
                </b-card-header>
                <b-card-body>
                    Negotiation involves discussing issues to try to reach an agreement. You work out a 
                    solution together that fits both of your interests. 
                    <br>A lawyer or other professional can help, or you could negotiate on your own. 
                    <br>Family Justice Services Division provides free facilitated negotiation of 
                    child support and spousal support issues with a 
                    <a 
                        href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/child-support"
                        target="_blank">Child Support Officer
                    </a>.

                </b-card-body>
            </b-card>

            <b-card class="border-white">
                <b-card-header class="parenting-coordination-header text-uppercase font-weight-bold row mx-2">
                    <b-icon-people-fill class="mt-2" scale="2" animation="throb"/>                    
                    <span class="ml-3 mt-1">Parenting Coordination</span>                    
                </b-card-header>
                <b-card-body>
                    A parenting coordinator helps parents resolve disputes about how parenting agreements 
                    or orders are put into effect using mediation and arbitration. If you cannot agree, 
                    a parenting coordinator can make a decision for you (called a determination). The 
                    <a 
                        href="http://www.bcparentingcoordinators.com/"
                        target="_blank">BC Parenting Coordinators Roster Society
                    </a>has a list of qualified parenting coordinators.

                </b-card-body>
            </b-card>

            <b-card class="border-white">
                <b-card-header class="arbitration-header text-uppercase font-weight-bold row mx-2">
                    <img src="../../../assets/users-gear.svg" style="width: 3rem; height: 3rem; color: blue;"/>                    
                    <span class="ml-2 mt-3">Arbitration</span>                    
                </b-card-header>
                <b-card-body>
                    Arbitrators play a private judge-like role. A family law arbitrator will make binding 
                    decisions to resolve family law disputes out of court. If you decide to use arbitration, 
                    you are asking another person to make the decisions for you, after hearing both sides. The 
                    <a 
                        href="https://adrbc.com/"
                        target="_blank">ADR Institute of British Columbia
                    </a>can assist you in finding an Arbitrator.

                </b-card-body>
            </b-card>



            <b-card class="mt-4 shadow-lg border-info bg-gradient-teal">
                <p style="font-weight: 700;" class="font-weight-bold text-cyan">
                    Research shows that these out of court dispute resolution processes are often faster, less expensive, 
                    and may better meet the needs of the parties involved, but sometimes court is still the best option.  
                    You and the other person can choose whichever process is best for you.                
                </p>
                <p style="font-weight: 700;" class="font-weight-bold text-primary">
                    If you are filing your application in an early resolution registry, unless it is not appropriate 
                    you will be required to try to resolve your family law matter using consensual dispute resolution 
                    before going to court. 
                </p>
                <p>
                    Consensual dispute resolution includes:
                    <ul>
                        <li>Mediation with a family law mediator</li>
                        <li>Participation in a collaborative law process</li>
                        <li>
                            Facilitated negotiation of a child support or spousal support matter with a child support officer
                        </li>                    
                    </ul>                
                </p>

                <p>
                    <span class="text-primary font-weight-bold">Where can I learn more about the different ways to resolve family law disputes?</span>
                    <ul>
                        
                        <li>
                            <a 
                                href="https://pubsdb.lss.bc.ca/resources/pdfs/pubs/How-Can-We-Resolve-Our-Family-Law-Issues-poster-eng.pdf"
                                target="_blank">Legal Aid BC
                            </a>
                        </li>
                        <li>
                            <a 
                                href="http://www.cfcj-fcjc.org/sites/default/files/publications/An%20Evaluation%20of%20the%20Cost%20of%20Family%20Law%20Disputes%20Infographic%20-%20Print.pdf"
                                target="_blank">The Canadian Forum on Civil Justice (CFCJ)
                            </a>
                        </li>
                                        
                    </ul>                
                </p>
            </b-card>
            

            <b-row class="my-5">                
                <b-col>
                    <b-button
                        style="height: 3rem;"
                        block
                        @click="continueOutsideCourtProcess"
                        :pressed.sync="outOfCourtProcessState"
                        :variant="outOfCourtProcessState?'primary':'secondary'"
                    ><b-icon-check scale="1.5" class="mr-2" v-if="outOfCourtProcessState" />
                        I’d like to explore out of court options
                    </b-button>
                </b-col> 
                <b-col >
                    <b-button
                        style="height: 3rem;"
                        block
                        @click="continueCourtProcess"
                        :pressed.sync="courtProcessState"
                        :variant="courtProcessState?'primary':'secondary'"
                    ><b-icon-check scale="1.5" class="mr-2" v-if="courtProcessState" />
                        Continue to court process
                    </b-button>
                </b-col>               
            </b-row>

        </b-card>     

        <b-modal size="xl" v-model="preparationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">What you need to get started:</h1>
            </template>
            <div class="m-3">
                <p>Try to collect as much information as possible before you start to complete the pathway.</p>
                <p>The type of information and documents you need will depend on what you are asking the court for.</p>
                <p>You might need:</p>
                <ul>
                    <li>
                        birth dates, names, and other related information about the other party and your children
                    </li>
                    <li>
                        any agreements or court orders you already have about a family law matter
                    </li>
                    <li>
                        information about the date you got married, started living together, separated and got divorced, if applicable                       
                    </li>
                    <li>
                        if you are asking for child or spousal support, information about your income and, if you have it, the other party’s income                       
                    </li>
                    <li>
                        if you are asking for orders about children, information about your children’s living arrangements, schedules and expenses                       
                    </li>
                </ul>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="closePreparationInfo">Continue</b-button>
            </template>            
        </b-modal>

        <b-modal v-model="thankYouMessage" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">
                <p>
                    Thank you for exploring out of court options. If you do not resolve your family 
                    law matters using an alternative dispute resolution process, or you decide you 
                    want to go to court, you can return to this service to complete and file your 
                    court forms.
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="closeThankYouMessage">Close</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import PageBase from "../PageBase.vue";
import { toggleSteps } from '@/components/utils/TogglePages';

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class FlmInfo extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType; 
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep = 0;
    currentPage = 0;

    preparationInfo = false;
    thankYouMessage = false;
    disableNextButton = false;
    dataReady = false;
  
    selectedOption = '';
    selected = [];
    selectedReplyForms = [];

    outOfCourtProcessState = false;
    courtProcessState = false;
    
    created() {
        this.disableNextButton = true;       
    }

    mounted(){   
        this.dataReady = false;    
        this.preparationInfo = false; 
        this.thankYouMessage = false;
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('replyToApplication');

        if (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms) {
            this.selected = this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms;
        }

        if (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms) {
            this.selectedReplyForms = this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms;
        }
        
        if (this.steps[0].result?.selectedFlmOption) {
            this.selectedOption = this.steps[0].result.selectedFlmOption;

            if (this.selectedOption == 'outOfCourtProcess'){
                this.outOfCourtProcessState = true;
            } else if (this.selectedOption == 'courtProcess'){
                this.courtProcessState = true;
            }
            this.determineSteps();
        }
        
        this.disableNextButton = !(this.selectedOption.length > 0);        

        const progress = this.selectedOption.length==0? 50 : 100;
                
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        this.dataReady = true;
    }

    public continueOutsideCourtProcess(){
        this.selectedOption = '';
        this.courtProcessState = !this.outOfCourtProcessState;
        this.thankYouMessage = true;

        this.setSelectedOption();      
    }  

    public continueCourtProcess(){
                
        this.outOfCourtProcessState = !this.courtProcessState;

        this.setSelectedOption();        
    }

    public setSelectedOption(){

        this.selectedOption = '';
        if (this.courtProcessState){
            this.selectedOption = 'courtProcess';
        } else {
            this.selectedOption = 'outOfCourtProcess';
        }    
        this.determineSteps();    
    }

    public determineSteps(){
        const wrIncluded = this.selectedReplyForms.includes("writtenResponse");
        const rflmIncluded = this.selectedReplyForms.includes("replyFlm");

        const flmRelatedSteps = [this.stPgNo.FLM._StepNo];

        if (!wrIncluded && !rflmIncluded && this.selected.length < 2){
            flmRelatedSteps.push(this.stPgNo.COMMON._StepNo);
            flmRelatedSteps.push(this.stPgNo.SUBMIT._StepNo)
        }

        toggleSteps(flmRelatedSteps, this.selectedOption == 'courtProcess');
        this.disableNextButton = !this.courtProcessState && !this.outOfCourtProcessState;

    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        if (this.selectedOption == 'courtProcess'){
            this.preparationInfo = true;
        } else {
            Vue.prototype.$UpdateGotoNextStepPage();
        }          
    }

    public closePreparationInfo(){
        this.preparationInfo = false;
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    public closeThankYouMessage(){
        this.thankYouMessage = false;        
    }
  
    beforeDestroy() {
        const progress = this.selectedOption.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedFlmOption: this.selectedOption}});
    }
}
</script>

<style scoped lang="scss">

    .mediation-header {
        background: linear-gradient(0.25turn, teal, #d6f5f5, teal);
        color: #0f3d3d;
        
    }

    .collaborative-law-header {
        background: linear-gradient(to left, rgb(216, 32, 32), rgb(81, 136, 74), rgb(245, 231, 43), rgb(78, 142, 226));
        color: #070707;        
    }

    .facilitated-negotiation-header {
        background: linear-gradient(0.25turn, teal, #d6f5f5, teal);
        color: #0f3d3d;        
    }

    .parenting-coordination-header {
        background: linear-gradient(0.25turn, teal, #d6f5f5, teal);
        color: #0f3d3d;        
    }

    .arbitration-header {
        background: linear-gradient(0.25turn, teal, #d6f5f5, teal);
        color: #0f3d3d;        
    }

</style>