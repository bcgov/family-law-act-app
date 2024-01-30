<template>
    <page-base v-bind:hideNavButtons="!showTable" v-bind:disableNext="isDisableNext()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <div class="home-content">
            <div class="row">
                <div class="col-md-12 text-dark">
                    <h2>Property Division in Respect of a Companion Animal</h2>
                    <p>
                        A companion animal is often a family pet. Section 1 of the 
                        <a href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_01#section1' target='_blank'>Family Law Act</a> 
                        defines a companion animal as an animal that is kept primarily 
                        for the purpose of companionship. Section 3.1 of the 
                        <a href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_01#section3' target='_blank'>Family Law Act</a> 
                        states that a companion animal is not:
                        <ul class="mt-2">
                            <li>a guide dog or service dog within the meaning of the <a href='https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/15017' target='_blank'>Guide Dog and Service Dog Act</a>;</li>
                            <li>an animal that is kept as part of a business;</li>
                            <li>an animal that is kept for agricultural purposes.</li>
                        </ul>
                        If you are unsure if your animal is a companion animal under the Family Law Act, 
                        you should talk to a lawyer.
                    </p>
                    
                    <legal-assistance-faq-dropdown class="ml-n4"/>

                    <p>
                        Property division in respect of a companion animal is who will have ownership 
                        and possession of a companion animal when spouses separate. The court may only 
                        make an order for ownership and possession of a companion animal 
                        <b>by one spouse</b>, but spouses may agree out of court to share ownership and 
                        possession of a companion animal.
                    </p>

                    <other-party-not-spouse-faq-dropdown class="ml-n4"/>
                    <possession-companion-faq-dropdown class="ml-n4"/>
                    <p>
                        If you want a court order about property division in respect of a companion animal, 
                        this pathway will help you complete the form to make your application.
                    </p>

                    <h3 class="mt-5">Order Details</h3>
                    <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">
                        I am applying for a property division order for sole ownership and possession of 
                        the companion animal(s) as follows: 
                    </h2>
                    <p>
                        Please enter the details of the order in the fields below. Add each companion animal 
                        who is the subject of your family law matter application. To add a companion animal, 
                        click the "Add Animal" button. If you are done entering all the companion animals, 
                        click the "Next" button.
                    </p>
                    <div class="animalSection" v-if="showTable">
                        <div class="animalAlign">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name of companion animal</th>
                                        <th scope="col">Type of animal</th>
                                        <th scope="col">Sole ownership and possession to</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="animal in animalData" :key="animal.id">
                                        <td>{{animal.animalName}}</td>
                                        <td>{{animal.animalType}}</td>
                                        <td>{{animal.animalOwnership}}</td>
                                        <td>
                                            <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Delete" @click="deleteRow(animal.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                                            <a class="btn btn-light" v-b-tooltip.hover.noninteractive title="Edit" @click="openForm(animal)"><i class="fa fa-edit"></i></a>
                                        </td>
                                    </tr>
                                    <tr class="clickableRow" @click="openForm()">
                                        <td colspan = "7">
                                            <a :class="isDisableNext()?'text-danger h4 my-2':'h4 my-2'" style="cursor: pointer;"
                                            >+Add Companion Animal</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="!showTable" id="animal-info-survey">
                    <property-division-companion-animal-survey v-on:showTable="animalComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
                </div>
               
            </div>
        </div>
       
        <b-card v-if="incompleteError && showTable" name="incomplete-error" class="alert-danger p-3 my-4 " no-body>
            <div>Required Companion Animal information is missing. Click the "Edit button <div class="d-inline fa fa-edit"></div> " to fix it. </div>
        </b-card>   
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import PropertyDivisionCompanionAnimalSurvey from "./PropertyDivisionCompanionAnimalSurvey.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../../PageBase.vue";

import LegalAssistanceFaqDropdown from "@/components/utils/FaqDropdowns/LegalAssistanceFaqDropdown.vue";
import OtherPartyNotSpouseFaqDropdown from "@/components/utils/FaqDropdowns/OtherPartyNotSpouseFaqDropdown.vue";
import PossessionCompanionFaqDropdown from "@/components/utils/FaqDropdowns/PossessionCompanionFaqDropdown.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        LegalAssistanceFaqDropdown,
        OtherPartyNotSpouseFaqDropdown,
        PossessionCompanionFaqDropdown,
        PropertyDivisionCompanionAnimalSurvey,
        PageBase
    }
})
export default class PropertyDivisionCompanionAnimal extends Vue {

    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    currentStep =0;
    currentPage =0;
    showTable = true;

    animalData = [];
    anyRowToBeEdited = null;
    editId = null; 
    incompleteError =  false;  

    
    public openForm(anyRowToBeEdited?) {
        this.showTable = false;
        Vue.nextTick(()=>{
            const el = document.getElementById('animal-info-survey')
            if(el) el.scrollIntoView();
        })
        if(anyRowToBeEdited) {
            this.editId = anyRowToBeEdited.id;
            this.anyRowToBeEdited = anyRowToBeEdited;
        } else {
            this.anyRowToBeEdited = null;
        }
    }

    public animalComponentData(value) {       
        this.showTable = value;
    }

    public populateSurveyData(animalValue) {

        const currentIndexValue = this.animalData?.length > 0 ? this.animalData[this.animalData.length - 1].id : 0;
        const id = currentIndexValue + 1;
        const newAnimal = { ...animalValue, id };
        this.animalData = [...this.animalData, newAnimal];
        this.showTable = true;
    }

    public deleteRow(rowToBeDeleted) {
       
        this.animalData = this.animalData.filter(data => {
            return data.id !== rowToBeDeleted;
        }); 
        this.surveyHasError();
    }

    public editRow(editedRow) {
        this.animalData = this.animalData.map(data => {
            return data.id === this.editId ? editedRow : data;
        });
        this.showTable = true;
        this.surveyHasError();
    }

    public onPrev() {
       Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();
    }

    created() {
        if (this.step.result?.propertyDivisionCompanionAnimalSurvey) {
            this.animalData = this.step.result.propertyDivisionCompanionAnimalSurvey.data;
        }
    }

    mounted(){
        Vue.nextTick(()=>this.surveyHasError());
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        
    }

    public surveyHasError(){
        let progress = this.animalData.length==0? 50 : 100;
        this.incompleteError =  false;        
        for(const animal of this.animalData){
            if (!animal.animalType || !animal.animalName || !animal.animalOwnership ){            
                this.incompleteError = true;  
                progress = 50;    
                break
            }
        }        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public isDisableNext() {
        return (this.animalData?.length <= 0);
    }

    beforeDestroy() {
        this.surveyHasError();        
        this.UpdateStepResultData({step:this.step, data: {propertyDivisionCompanionAnimalSurvey: this.getAnimalResults()}})       
    }

    public getAnimalResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        for(const animal of this.animalData)
        {
            questionResults.push({name:'propertyDivisionCompanionAnimalSurvey', value: this.getAnimalInfo(animal), title:'Companion Animal '+animal.id +' Information', inputType:''})
        }
        
        return {data: this.animalData, questions:questionResults, pageName:'Companion Animal Information', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getAnimalInfo(animal){
        const resultString = [];
        resultString.push(Vue.filter('styleTitle')("Name of Companion Animal: ")+animal.animalName);
        resultString.push(Vue.filter('styleTitle')("Type of Animal: ")+animal.animalType);
        resultString.push(Vue.filter('styleTitle')("Sole Ownership and Possession to: ")+animal.animalOwnership);        
        return resultString
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
.animalSection {
    border: 2px solid rgba($gov-pale-grey, 0.7);
    border-radius: 18px;
    width: 100%
}
.animalAlign {
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
</style>
