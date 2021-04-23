<template>
    <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <form-k @enableNext="EnableNext"/>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormK from  "./pdf/FormK.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        FormK,
        PageBase
    }
})
export default class PreviewForms extends Vue {
    
    // @Prop({required: true})
    // type!: string;

    // @Prop({required: true})
    // currentPage!: number;

    // @applicationState.State
    // public generatedForms!: string[];
    // @applicationState.Action
    // public UpdateGeneratedForms!: (newGeneratedForms) => void

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void


    currentStep = 0;
    currentPage = 0;
    disableNext = true;

    mounted(){
        this.disableNext = true;
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        //this.togglePages([this.currentPage+1],true)
    } 

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public EnableNext(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
        this.disableNext=false;        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);
    }

}
</script>