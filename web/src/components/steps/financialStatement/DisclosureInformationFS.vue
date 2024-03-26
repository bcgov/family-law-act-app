<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">

        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="page-title">Disclosure of Information</h4>
                    <p>
                        The child support guidelines describe the requirements for 
                        disclosure, calculating income, and proof of income that are 
                        required for child support applications. The specific income 
                        information that must be provided, is set out in s. 21 of the 
                        <a href="https://laws-lois.justice.gc.ca/eng/regulations/sor-97-175/page-2.html#h-1004334"
                            target="_blank">Child Support Guidelines</a>.
                    </p>
                    <p>
                        In this section, we will confirm your disclosure requirements 
                        – the information you need to provide as proof of income. 
                    </p>

                    <b-card class="px-3 sv_p_container" style="border-radius: 8px; padding-top: 0 !important;">

                        <b-row class="page-sub-title">
                            Income Information
                        </b-row>

                        <b-row class="question">
                            I am required to attach a copy of the following documents 
                            from Canada Revenue Agency to my financial statement:                          
                        </b-row>

                        <b-row>
                            You will be reminded in the filing step to submit these documents 
                            along with your Financial Statement.
                        </b-row>

                        <b-row class="mt-3">
                            <b-col cols="1" class="pl-4">
                                <b-icon-check-2 scale="2" class="ml-2"/>
                            </b-col>
                            <b-col>
                                My personal income tax return and related schedules for each 
                                of the <span style="color: #556077; font-size:1em; font-weight:bold;">3</span> 
                                most recent taxation years.
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col cols="1" class="pl-4">
                                <b-icon-check-2 scale="2" class="ml-2"/>
                            </b-col>
                            <b-col>
                                Every Notice of Assessment and Reassessment issued by Canada Revenue 
                                Agency for each of the 
                                <span style="color: #556077; font-size:1em; font-weight:bold;">3</span> 
                                most recent taxation years.
                            </b-col>
                        </b-row>                        

                        <b-row align-h="center">
                            <b-form-checkbox
                                style="color: #556077; font-size:1.4em;"
                                class="mt-4"
                                v-model="incomeAcknowledgement"
                                @change="determineReadyToContinue()">
                                <h4 style="margin: 0.26rem 0.5rem;">
                                    I understand
                                </h4>
                            </b-form-checkbox>
                        </b-row>

                        <b-row>
                            <div class="m-4 text-primary" @click="showCopyDocsInfo= !showCopyDocsInfo" style="border-bottom:1px solid; width:23rem;">
                                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> How do I get a copy of these documents? 
                                <span v-if="showCopyDocsInfo" class='ml-2 fa fa-chevron-up'/>
                                <span v-if="!showCopyDocsInfo" class='ml-2 fa fa-chevron-down'/>
                            </div>
                            <div class="mx-4" v-if="showCopyDocsInfo">
                                If you do not have a copy of your income tax return or your notice of assessment 
                                or notice of reassessment (if applicable) issued by the Canada Revenue Agency 
                                (CRA), you can contact the CRA to get a copy:
                                <ul>
                                    <li>
                                        Online using CRA’s 
                                        <a 
                                            href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html"
                                            target="_blank">
                                            My Account
                                        </a>
                                    </li>
                                    <li>By telephone to CRA’s individual income tax inquiries line at 1-800-959-8281</li>
                                </ul>

                            </div>
                        </b-row>

                        <b-row>
                            <div class="m-4 text-primary" @click="showTaxFilingInfo= !showTaxFilingInfo" style="border-bottom:1px solid; width:25rem;">
                                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> What if I am not up to date on filing my taxes? 
                                <span v-if="showTaxFilingInfo" class='ml-2 fa fa-chevron-up'/>
                                <span v-if="!showTaxFilingInfo" class='ml-2 fa fa-chevron-down'/>
                            </div>
                            <div class="mx-4" v-if="showTaxFilingInfo">
                                If you are not up to date on filing your taxes, you may want to talk to lawyer 
                                or an accountant about your options. You can apply to the court to allow more 
                                time to file all of your financial information if you need it by completing 
                                and filing an Application for Case Management Order Without Notice or Attendance 
                                Form 11.
                            </div>
                        </b-row>
                    </b-card>

                    <b-card class="px-3 my-5 sv_p_container" style="border-radius: 8px; width: 100%;">                        
                        <b-form-group>
                            <div class="question">
                                Do you control a corporation?
                            </div>                            
                            <b-form-radio-group
                                v-model="corporation"
                                @change="updateCorporation()"
                                class="mt-2 ml-3 survey-yesno-vue"
                                style="font-size:1.40em; display: inline-block;">
                                <b-form-radio class="mr-5" value="Yes"><div style="transform:translate(5px,-5px);">Yes</div></b-form-radio>
                                <b-form-radio value="No"><div style="transform:translate(5px,-5px);">No</div></b-form-radio>               
                            </b-form-radio-group>
                        </b-form-group>
                    </b-card> 
                    
                    <b-card class="px-3 sv_p_container" style="border-radius: 8px; padding-top: 0 !important;" :key="showProofOfIncomeListKey">

                        <b-row class="page-sub-title">
                            Proof of income
                        </b-row>

                        <b-row class="question">
                            I am required to attach a copy of the following documents as 
                            proof of income from each source of my income:                          
                        </b-row>

                        <b-row>
                            You will be reminded in the filing step to submit these documents 
                            along with your Financial Statement.
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('employee')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                My most recent pay stub or statement of earnings, or a 
                                letter from my employer stating my salary and/or wages
                            </b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('EI')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                My most recent employment insurance benefit statement 
                                and record of employment
                            </b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('WCB')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>My most recent worker’s compensation benefit statement</b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('investment')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>My most recent interest and investment statement</b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('pension')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>My most recent pension income statement</b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('govAssist')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>My most recent government assistance statement</b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('selfEmployed')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                My self-employment income for the three most recent taxation years, including:
                                <ol type="i">
                                    <li>
                                        the financial statements of my business or professional practice, 
                                        other than a partnership, and
                                    </li>
                                    <li>
                                        a statement showing a breakdown of all salaries, wages, management 
                                        fees or other payments or benefits paid to, or on behalf of, persons 
                                        or corporations with whom I do not deal at arm’s length
                                    </li>
                                </ol>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('partnership')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                Confirmation of my income and draw from, and capital in, a partnership, 
                                for the three most recent taxation years
                            </b-col>
                        </b-row>                        

                        <b-row class="mt-3" v-if="corporation == 'Yes'">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                My corporate income for the three most recent taxation years, including:
                                <ol type="i">
                                    <li>the financial statements of the corporation and its subsidiaries, and</li>
                                    <li>
                                        a statement showing a breakdown of all salaries, wages, management 
                                        fees or other payments or benefits paid to, or on behalf of, persons 
                                        or corporations with whom the corporation, and every related corporation, 
                                        does not deal at arm’s length
                                    </li>
                                </ol>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('trust')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                My trust settlement agreement and the trust’s three most recent 
                                financial statements
                            </b-col>
                        </b-row>

                        <b-row class="mt-3" v-if="proofOfIncomeList.includes('other')">
                            <b-col cols="1" class="pl-4"><b-icon-check-2 scale="2" class="ml-2"/></b-col>
                            <b-col>
                                Proof of other income:
                                <p style="color: #556077; font-size:1em;">
                                    Please specify what you are providing as proof of your other income
                                </p>
                                <b-form-textarea                                
                                    class="mt-2"
                                    v-model="otherIncomeProofDocs"
                                    @change="determineReadyToContinue()"/>
                            </b-col>
                        </b-row>

                        <b-row align-h="center">
                            <b-form-checkbox
                                style="color: #556077; font-size:1.4em;"
                                class="mt-4"
                                v-model="incomeProofAcknowledgement"
                                @change="determineReadyToContinue()">
                                <h4 style="margin: 0.26rem 0.5rem;">
                                    I understand
                                </h4>
                            </b-form-checkbox>
                        </b-row>
                    </b-card>                   
                </div>
            </div>
        </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class DisclosureInformationFS extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    disableNextButton = false;
    showCopyDocsInfo = false;
    showTaxFilingInfo = false
    currentStep =0;
    currentPage =0;
    proofOfIncomeList = [];
    showProofOfIncomeList = false;
    showProofOfIncomeListKey = 0;
    corporation = null;
    incomeAcknowledgement = false;
    incomeProofAcknowledgement = false;
    otherIncomeProofDocs = "";
    
    created() {
        this.disableNextButton = false;       
    }

    mounted(){        
        this.reloadPageInformation();
    } 
    
    public reloadPageInformation() {    

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.disclosureInformationFSSurvey?.data) {

            const disclosureData = this.step.result.disclosureInformationFSSurvey.data;

            this.corporation = disclosureData.corporation;
            this.incomeProofAcknowledgement = disclosureData.incomeProofAcknowledgement;
            this.incomeAcknowledgement = disclosureData.incomeAcknowledgement;   
            this.otherIncomeProofDocs = disclosureData.otherIncomeProofDocs;           
            this.determineReadyToContinue();   
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        } 

        if (this.step.result?.incomeInformationSurvey?.data?.incomeAmounts) {
            const incomeData = this.step.result?.incomeInformationSurvey.data.incomeAmounts;
            for(const incomeType of incomeData) {
                if(incomeType.income)
                    this.proofOfIncomeList.push(incomeType.incomeName);
            }
        }

        this.determineReadyToContinue();       

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
    }

    public updateCorporation(){ 
        this.determineReadyToContinue();       
        this.showProofOfIncomeListKey ++;        
    }

    public determineReadyToContinue(){       

        this.disableNextButton = this.corporation == null || !this.incomeAcknowledgement || 
                                !this.incomeProofAcknowledgement || 
                                (this.proofOfIncomeList.includes('other') && this.otherIncomeProofDocs.length==0);

    }   

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {        
        Vue.prototype.$UpdateGotoNextStepPage()
    }

    public getDisclosureResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.getDisclosureInfo()){

            const disclosureInfo = this.getDisclosureInfo();
            
            questionResults.push({
                name:'disclosureInformationFSSurvey', 
                value: disclosureInfo.incomeAcknowledgement?'I understand':'', 
                title: 'I am required to attach a copy of my documents from Canada Revenue Agency to my financial statement', inputType:''});

            questionResults.push({
                name:'disclosureInformationFSSurvey', 
                value: disclosureInfo.incomeProofAcknowledgement?'I understand':'', 
                title: 'I am required to attach a copy of my documents as proof of income from each source of my income to my financial statement', inputType:''});

            questionResults.push({
                name:'disclosureInformationFSSurvey', 
                value: disclosureInfo.corporation=='Yes'?'Yes':'No', 
                title: 'Do you control a corporation?', inputType:''});

            if(this.proofOfIncomeList.includes('other')){
                questionResults.push({
                    name:'disclosureInformationFSSurvey', 
                    value: disclosureInfo.otherIncomeProofDocs, 
                    title: 'What you are providing as proof of your other income?', inputType:''});
            }
            
        }  
        
        return {data: this.getDisclosureInfo(), questions:questionResults, pageName:'Disclosure of Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getDisclosureInfo(){

        let proofOfOtherIncome = this.proofOfIncomeList.includes('other')?this.otherIncomeProofDocs:"";        

        let result = {           
            incomeAcknowledgement: this.incomeAcknowledgement,
            corporation: this.corporation,
            incomeProofAcknowledgement: this.incomeProofAcknowledgement,
            otherIncomeProofDocs: proofOfOtherIncome
        }

        return result
    }
    
    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);        
        this.UpdateStepResultData({step:this.step, data: {disclosureInformationFSSurvey: this.getDisclosureResults()}})
    }
}
</script>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
    padding-bottom: 20px;
    padding-top: 2rem;
    max-width: 950px;
    color: black;
}

.page-title {
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: #494949;
    text-align: left; 
}

.page-sub-title {
    font-size: 1.54912rem; 
    font-weight: 700;
    color: #494949;
    text-align: left; 
    margin-bottom: 0.5rem;
}
.question {
    color:#556077; 
    font-size:1.40em; 
    font-weight:bold;
}

</style>
