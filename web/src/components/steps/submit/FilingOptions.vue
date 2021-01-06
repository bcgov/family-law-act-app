<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import * as SurveyVue from "survey-vue";
    import * as surveyEnv from "@/components/survey-glossary.ts"
    import surveyJson from "./Forms/filingOptions.json";
    import { Step } from "../../../models/step";
 
    import PageBase from "../PageBase.vue";

    @Component({
        components:{
            PageBase
        }
    })

    export default class FilingOptions extends Vue {
        
        @Prop({required: true})
        step!: Step;


        survey = new SurveyVue.Model(surveyJson);

        beforeCreate() {
            const Survey = SurveyVue;
            surveyEnv.setCss(Survey);
        }

        mounted(){
            this.initializeSurvey();
            this.addSurveyListener();
            this.reloadPageInformation()
            //console.log(this.step)
        }

        public initializeSurvey(){
            this.survey = new SurveyVue.Model(surveyJson);
            this.survey.commentPrefix = "Comment";
            this.survey.showQuestionNumbers = "off";
            this.survey.showNavigationButtons = false;
            surveyEnv.setGlossaryMarkdown(this.survey);
        }

        public reloadPageInformation() {
            //console.log(this.step.result)
            if (this.step.result["filingOptions"]){
                this.survey.data = this.step.result["filingOptions"];
            }
        }

        public addSurveyListener(){
            this.survey.onValueChanged.add((sender, options) => {
                //console.log(this.survey.data);
                // console.log(options)
                if(this.survey.data.selectedFilingType == 'byemail'){
                    this.togglePages([0,2,3], true);
                    this.togglePages([1], false);
                }else{
                    this.togglePages([0,1,3], true);
                    this.togglePages([2], false);
                }
            })
        }

        public togglePages(pageArr, activeIndicator) {
            //this.activateStep(activeIndicator);
            for (let i = 0; i < pageArr.length; i++) {
                this.$store.dispatch("application/setPageActive", {
                    currentStep: this.step.id,
                    currentPage: pageArr[i],
                    active: activeIndicator
                });
            }
        }

        public onPrev() {
            this.$store.dispatch("application/gotoPrevStepPage");
        }

        public onNext() {
            if(!this.survey.isCurrentPageHasErrors) {
                this.$store.dispatch("application/gotoNextStepPage");
            }
        }

        public onComplete() {
            this.$store.dispatch("application/setAllCompleted", true);
        }


        beforeDestroy() {
            this.$store.dispatch("application/updateStepResultData",{
                step: this.step,
                data:{filingOptions: this.survey.data}
            })
        }
    }


</script>