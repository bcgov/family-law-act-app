<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts"
import surveyJson from "@/assets/POForm/safetyNeeds/removePerson.json";
import PageBase from "../../PageBase.vue";
import { Step } from "@/models/step";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class RemovePerson extends Vue {
    
    @Prop({required: true})
    step!: Step;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void


    respondentName = ""
    survey = new SurveyVue.Model(surveyJson);

    // watch: {
    // pageIndex: function(newVal) {
    //   this.survey.currentPageNo = newVal;
    // }
    @Watch('pageIndex')
    pageIndexChange(newVal) 
    {
        this.survey.currentPageNo = newVal;        
    }

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }
    
    mounted(){
        this.initializeSurvey();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }


    public reloadPageInformation() {

        if (this.step.result['removeSurvey']){
            this.survey.data = this.step.result['removeSurvey'];
        }
        
        
        let protectedPartyNameObject = this.$store.state.Application.protectedPartyName;
            
        //console.log(protectedPartyNameObject)

        if (protectedPartyNameObject) {
            let protectedPartyName =
                protectedPartyNameObject.first +
                " " +
                protectedPartyNameObject.middle +
                " " +
                protectedPartyNameObject.last;
                this.survey.setVariable("protectedPartyName", protectedPartyName);
        }

        let respondentNameObject = this.$store.state.Application.respondentName;
        if (respondentNameObject) {
            this.respondentName =
                respondentNameObject.first +
                " " +
                respondentNameObject.middle +
                " " +
                respondentNameObject.last;
        }        

        if (this.respondentName) {
            this.survey.setVariable("RespondentName", this.respondentName);
        }
    }
    

    public onPrev() {
        //this.$store.dispatch("application/gotoPrevStepPage");
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            //this.$store.dispatch("application/gotoNextStepPage");
            this.UpdateGotoNextStepPage()
        }
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }  
  
    beforeDestroy() {
        this.$store.commit("Application/updateStepResultData",{
            step: this.step,
            data:{removeSurvey: this.survey.data}
        })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/common";
</style>
