<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
        <div v-if="showTable" :key="tableKey">
            <b-table
                :items="childrenSupportExpenseItem"
                :fields="childrenSupportExpenseFields"
                class="mt-2"
                small                    
                bordered>
                    <template v-slot:cell()="data">                            
                        <div v-if="data.index==0" style="text-align:center;font-size:10pt" ><b>{{data.value}}</b></div>
                        <div v-else-if="data.index==7" style="text-align:left;font-size:14pt">${{calculateTotal(data.field.key)}}</div>
                        <div v-else style="text-align:left;font-size:12pt;color:#000">                            
                            <b-form>
                                <label style="float:left;margin:0.5rem 0;">$</label>
                                <b-form-input 
                                    style="float:left;margin-left:0.3rem;width:90%;"
                                    @change="inputValueChanged()"                                    
                                    v-model="childrenSupportExpenseItem[data.index][data.field.key]"
                                    type="number">
                                </b-form-input>
                            </b-form>
                        </div>                                           
                    </template>
                    <template v-slot:cell(name)="data">                            
                        <div v-if="data.index==0" style="text-align:left;font-size:12pt;" ><b>{{data.value}}</b></div>
                        <div v-else-if="data.index==7" style="text-align:right;font-size:12pt;" ><b>{{data.value}}</b></div>                            
                        <div v-else style="text-align:left;font-size:12pt;">{{data.value}}</div>                                           
                    </template>
            </b-table>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/special-and-extraordinary-expenses.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class SpecialAndExtraordinaryExpenses extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;
    showTable = false;
    tableKey = 0;

    childData = [];

    childrenSupportExpenseItem =[
        {name:'Special and Extraordinary Expense', child0:"Annual Amount"},
        {name:'Child care expenses', child0:'0'},
        {name:'Portion of medical/dental premiums attributable to child', child0:'0'},
        {name:'Health related expenses that exceed insurance reimbursement by at least $100', child0:'0'},
        {name:'Extraordinary expenses for primary or secondary school', child0:'0'},
        {name:'Post-secondary school expenses', child0:'10'},
        {name:'Extraordinary extracurricular activities expenses', child0:'0'},
        {name:'Total', child0:"0",},
    ]
    childrenSupportExpenseFields = [
        {key:"name", label:"Name of Child:", tdClass:"border-top-0 align-middle", thClass:"text-primary text-right border-bottom-0", thStyle:"font-size:12pt; width:26%;"},       
    ]
   
    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.showTable = false;
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')           
            this.determineShowingTable()
        })
    }
    
    public reloadPageInformation() {        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.specialAndExtraordinaryExpensesSurvey) {
            this.survey.data = this.step.result.specialAndExtraordinaryExpensesSurvey.data;           
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        this.populateChildrenInfo()
        this.determineShowingTable();

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public populateChildrenInfo(){

        if (this.step.result?.childrenInfoSurvey) {
                
                this.childData = this.step.result.childrenInfoSurvey.data;                           
                
                for (const childInx in this.childData){
                    const child = this.childData[childInx];
                    const key = "child"+childInx
                    this.childrenSupportExpenseFields.push({key:key, label:Vue.filter('getFullName')(child.name),  tdClass:"align-middle", thClass:"text-primary text-center", thStyle:"width:10%;"})
                    this.childrenSupportExpenseItem[0][key]= 'Annual Amount';
                    for(let index=1; index<8; index++){

                        if(this.survey.data?.childrenSupportExpenseItem?.[index]?.[key])
                            this.childrenSupportExpenseItem[index][key] = this.survey.data.childrenSupportExpenseItem[index][key]
                        else
                            this.childrenSupportExpenseItem[index][key] = 0
                    }
                }
        }
    }

    public inputValueChanged(){    
        Vue.filter('surveyChanged')('familyLawMatter')
        this.tableKey ++;
    }

    public calculateTotal(key){                
        let sum = 0;
        for(let index=1; index<7; index++){
            sum+= Number(this.childrenSupportExpenseItem[index][key])
        }
        this.childrenSupportExpenseItem[7][key] = sum
        return sum;
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public determineShowingTable(){
        if(this.survey.data?.applyForExtraordinaryExpenses=='y')
            this.showTable=true;
        else
            this.showTable=false;
    }

    public getTotalExpenses(){
        let result = ''
        for (const [key, value] of Object.entries(this.childrenSupportExpenseItem[7]))
        {            
            if(key && key != 'name'){         
                if(!isNaN(Number(key.substring(5)))){
                    const child =this.childData[Number(key.substring(5))]
                   result += Vue.filter('getFullName')(child.name)+': Total  $'+value+'\n'
                }
            }
        }
        return result
    }
    
    beforeDestroy() {
        
        this.survey.setValue("childrenSupportExpenseItem",this.childrenSupportExpenseItem)
        this.survey.setValue("childrenSupportExpenseFields",this.childrenSupportExpenseFields)
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {specialAndExtraordinaryExpensesSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage, this.getTotalExpenses())}})
    }
}
</script>
