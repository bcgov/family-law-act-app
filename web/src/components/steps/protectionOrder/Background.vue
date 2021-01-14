<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/background.json";

import PageBase from "../PageBase.vue";
import { stepInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class Background extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void


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

        if (this.step.result['backgroundSurvey']){
            //console.log(this.step.result)
            this.survey.data = this.step.result['backgroundSurvey'];
        }  

        this.survey.setVariable("RespondentName", this.getFullName(this.$store.state.Application.respondentName));
        this.survey.setVariable("protectedPartyName", this.getFullName(this.$store.state.Application.protectedPartyName));
        
        let children ="";
        for(const child of this.$store.state.Application.protectedChildName){
            if(child.childName)
                children+='<li>'+ this.getFullName(child.childName) +'</li>'
        }
        //console.log(children)
        this.survey.setVariable("protectedChildName",children)
        //survey.setValue("protectedPartyName", this.getFullName(this.$store.getters["application/getProtectedPartyName"]));
        //survey.setJsonObject({'protected':'ok'})
        //survey.data.setJsonObject({'protected':'ok'})
        //console.log(survey.data)    
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

    public getFullName(nameObject){
        if (nameObject) {
            return nameObject.first +
                " " +
                nameObject.middle +
                " " +
                nameObject.last;
        } else{
            return " "
        }
    }
  
    beforeDestroy() {
        this.$store.commit("Application/updateStepResultData",{
            step: this.step,
            data:{backgroundSurvey: this.survey.data}
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
