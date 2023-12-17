<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12">
                    <h1>Background</h1>
                    <div style='font-size: 1.5rem;text-decoration: underline;'>Civil court proceedings</div>

                    <div class="mt-3">
                        <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">
                            Have you been involved in court proceedings concerning any 
                            child in your care under any of the following legislation?
                        </h2>      
                        <p>
                            <ul>
                                <li>B.C. 
                                    <a target='_blank' href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96046_01'>
                                        Child, Family and Community Service Act</a>
                                </li>
                                <li>B.C. 
                                    <a target='_blank' href='https://www.bclaws.gov.bc.ca/civix/document/id/consol20/consol20/00_96128_01'>
                                        Family Relations Act</a>
                                </li>
                                <li>B.C. 
                                    <a target='_blank' href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_00'>
                                    Family Law Act</a>
                                </li>
                                <li>
                                    <a target='_blank' href='https://laws-lois.justice.gc.ca/eng/acts/d-3.4/'>Divorce Act (Canada)</a>
                                </li>
                                <li>any comparable legislation in another jurisdiction</li>
                            </ul>            
                        </p>  
                        <p>
                            Court proceedings may be in Provincial Court or Supreme Court. There are different types of proceedings, 
                            including divorce and family law proceedings under the Divorce Act, Family Law Act or Family Relations Act, 
                            or child protection under the Child, Family and Community Service Act. You may also have been involved 
                            in court proceedings about a child in another jurisdiction outside British Columbia.
                        </p>
                        <p>
                            If your court proceedings were about a separation or divorce that did not involve a child under 
                            your care, you do not need to include it.
                        </p>
                        <div>
                            <b-form-group>
                                <b-form-radio-group  
                                    style="color: #556077; font-size: 1.5em; line-height: 1.2;"
                                    class="ml-3 survey-yesno-vue"                          
                                    v-model="courtProceedingsExist"
                                    name="otherChild"
                                    @change="situationChanged">                
                                    <b-form-radio class="mr-5" value="y">
                                        <div style="transform:translate(5px,-5px);">Yes</div>                                   
                                    </b-form-radio>                                    
                                    <b-form-radio value="n">
                                        <div style="transform:translate(5px,-5px);">No</div>                                      
                                    </b-form-radio>

                                </b-form-radio-group>
                            </b-form-group>
                        </div>                
                    </div>

                    <b-card v-if="courtProceedingsExist == 'y'" :key="updated" no-body class="info-box mt-4">  
                        <b-row>
                            <b-col cols="1" class="m-0" style="padding-right: 0;">
                                <b-icon-exclamation-circle-fill class="text-primary"/>
                            </b-col>
                            <b-col cols="11" style="padding-left: 0 !important; margin-left: 0 !important;">
                                <p>
                                    To complete this section of the affidavit, you will need information about each 
                                    court proceeding, including a copy of any court order concerning a child in your 
                                    care under the court proceeding.
                                </p>
                                <p>  
                                    Each court order must be attached to your affidavit as an exhibit. If you 
                                    do not have a copy of a court order, contact the court registry where the 
                                    order was made to find out how to get a copy.
                                </p>
                                <p>
                                    This service will help you to identify each exhibit that must be attached 
                                    to your guardianship affidavit.
                                </p>

                            </b-col>
                        </b-row> 
                    </b-card>


                    <div class="mt-4" v-if="courtProceedingsExist == 'y'" :key="updated+1">
                        <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">
                            Please provide the information requested for each court proceeding 
                            you have been involved in concerning a child in your care.
                        </h2>
                        <p>
                            Please enter the details of the court proceeding in the fields below. 
                            Add each additional court proceeding. To add information about a new 
                            court proceeding, click the “Add Court Proceeding” button. If you 
                            are done entering all the court proceedings, click the “Next” button.
                        </p>
                        <div class="proceedingSection" v-if="showTable">
                            <div class="proceedingAlign">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Name of parties</th>
                                        <th scope="col">Name and Location of Court</th>
                                        <th scope="col">Date of any orders</th>                                    
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div></div>
                                        <tr v-for="proceeding in civilProceedingsData" :key="proceeding.id">
                                        <td>{{proceeding.partyNames}}</td>
                                        <td>{{proceeding.courtLocation}}</td>
                                        <td v-if="proceeding.courtOrdersExist == 'y'">
                                            <ul v-for="(order, inx) in proceeding.courtOrderDates" :key="inx+''+order">                        
                                                <li>{{ order.orderDate | beautify-date }}</li>                                                
                                            </ul>
                                        </td>
                                        <td v-else></td>                                   
                                        <td><a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(proceeding.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                        <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(proceeding)"><i class="fa fa-edit"></i></a></td>
                                        </tr>
                                        <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add Court Proceeding</a>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="col-md-12" v-if="!showTable" id="civil-proceedings-survey">
                    <civil-proceedings-survey v-on:showTable="civilProceedingsComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>               
            </div>
        </div>
        
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required Child information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import CivilProceedingsSurvey from "./CivilProceedingsSurvey.vue";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";

const applicationState = namespace("Application");

@Component({
    components:{
        CivilProceedingsSurvey,
        PageBase
    }
})
export default class BackgroundCivilCourtProceedings extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    dataReady = false;
    currentStep =0;
    currentPage =0;
    showTable = true;  
    civilProceedingsData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false; 
    
    courtProceedingsExist = 'n';    
    updated = 0;

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());        
        this.reloadPageInformation();        
    }  

    public reloadPageInformation() {

        this.updated = 0;

        this.dataReady = false;  

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage; 
        
        if (this.step.result?.backgroundCivilCourtProceedingsSurvey?.data) {

            const civilProceedingsInfo = this.step.result.backgroundCivilCourtProceedingsSurvey.data;   
            this.courtProceedingsExist = civilProceedingsInfo?.courtProceedingsExist?civilProceedingsInfo.courtProceedingsExist:'n';
            this.civilProceedingsData = civilProceedingsInfo.courtProceedings?civilProceedingsInfo.courtProceedings:[];             
        }        

        this.dataReady = true;
    }

    public situationChanged(){
        this.updated++;
    }
    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
         Vue.nextTick(()=>{
            const el = document.getElementById('civil-proceedings-survey')
            if(el) el.scrollIntoView();
        })
        if(anyRowToBeEdited) {
            this.editId = anyRowToBeEdited.id;
            this.anyRowToBeEdited = anyRowToBeEdited;
        } else {
            this.anyRowToBeEdited = null;
        }
    }

    public civilProceedingsComponentData(value) {       
        this.showTable = value;
    }

    public populateSurveyData(civilProceedingValue) {

        const currentIndexValue = this.civilProceedingsData?.length > 0 ? this.civilProceedingsData[this.civilProceedingsData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newCivilProceeding = { ...civilProceedingValue, id };
        this.civilProceedingsData = [...this.civilProceedingsData, newCivilProceeding];

        this.showTable = true; 
        this.resetCivilProceedingRelatedPages();
    }

    public deleteRow(rowToBeDeleted) {
       
        this.civilProceedingsData = this.civilProceedingsData.filter(data => {
            return data.id !== rowToBeDeleted;
        }); 
        this.resetCivilProceedingRelatedPages();
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.civilProceedingsData = this.civilProceedingsData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
        this.surveyHasError();
        this.resetCivilProceedingRelatedPages();
    }

    public onPrev() {
       Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {       
       Vue.prototype.$UpdateGotoNextStepPage();       
    }

    public getCivilProceedingResults(){
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        questionResults.push({name:'courtProceedingsExist', value: this.courtProceedingsExist == 'y'?'Yes':'No', title:'Have you been involved in court proceedings concerning any child in your care under any of the following legislation?', inputType:''})
        
        if(this.courtProceedingsExist == 'y'){
            for(const proceeding of this.civilProceedingsData)
            {
                questionResults.push({name:'proceedingInfoSurvey', value: this.getCivilProceedingInfo(proceeding), title:'Proceeding '+proceeding.id +' Information', inputType:''})
            }
        }        
        
        return {
            data: {
                courtProceedings: this.civilProceedingsData, 
                courtProceedingsExist: this.courtProceedingsExist
                
            },
            questions:questionResults, pageName:'Court Proceedings Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getCivilProceedingInfo(proceeding){
        const resultString = [];

        resultString.push(Vue.filter('styleTitle')("Party Name(s): ")+proceeding.partyNames);
        resultString.push(Vue.filter('styleTitle')("Court Location: ")+proceeding.courtLocation);

        let orderDates = '';

        if(proceeding.courtOrdersExist == 'y'){
            orderDates = '<ul>'
            for(const order of proceeding.courtOrderDates) {
                orderDates = orderDates+'<li>'+Vue.filter('beautify-date')(order.orderDate)+'</li>';
            }
            orderDates = orderDates+'</ul>'
        }        

        resultString.push(Vue.filter('styleTitle')("Order Dates: ")+orderDates)             
        
        return resultString
    }

    public resetCivilProceedingRelatedPages() {
    
        const p = this.stPgNo.GA;
        const pages = [
            p.Exhibits,
            p.ReviewYourAnswersGA
        ];
        Vue.filter('setProgressForPages')(p._StepNo, pages,50);    

    }

    public surveyHasError(){
        let progress = (this.courtProceedingsExist == 'y' && this.civilProceedingsData?.length == 0)? 50 : 100;
        this.incompleteError =  false;        
        for(const proceeding of this.civilProceedingsData){
            if (!proceeding.partyNames || 
                !proceeding.courtLocation || !proceeding.courtOrdersExist 
                || (proceeding.courtOrdersExist == 'y' && proceeding.courtOrderDates?.length == 0) ){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (this.courtProceedingsExist == 'y' && this.civilProceedingsData?.length == 0);
    }

    beforeDestroy() {
        this.surveyHasError();        
        this.UpdateStepResultData({step:this.step, data: {backgroundCivilCourtProceedingsSurvey: this.getCivilProceedingResults()}})       
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
.proceedingSection {
    border: 2px solid rgba($gov-pale-grey, 0.7);
    border-radius: 18px;
    width: 100%
}
.proceedingAlign {
    padding: 20px;
}
.table, td, th{
    border: 1px solid rgba($gov-pale-grey, 0.9);
  
}
.clickableRow {
    background-color: rgba($gov-pale-grey, 0.5);
    td a {
        display: block;
    }
}

.radio-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.form-group .radio-choices{
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: normal;
  font-size: 17px;
}

.info-box {
    background: #e7efff;
    border: 1px solid #c9d0e3;
    border-radius: 4px;
    margin: 0.5em 0 0 0;
    padding: 0.5em;
    line-height: 1.4;
    font-size: 18px;
}
</style>
