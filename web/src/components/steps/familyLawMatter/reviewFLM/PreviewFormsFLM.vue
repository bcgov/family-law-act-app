<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <form3/>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Form3 from  "./pdf/Form3.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        Form3,
        PageBase
    }
})
export default class PreviewFormsFlm extends Vue {
    
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
    

    mounted(){
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

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);
    }

    // public onDownload(formName, inx) {
    //     console.log("downloading"+inx)
    //     console.log(this.formsList[inx])
    //     this.formsList[inx].color = "success";
    //     this.showPDFformName = formName;
    //     this.showPDFpreview = true;

    //     if(!this.generatedForms.includes(formName))
    //     {
    //         const forms= this.generatedForms;
    //         forms.push(formName)
    //         this.UpdateGeneratedForms(forms);
    //     }

    //     this.setProgress()

    //     // if(this.checkErrorOnPages()){ 
    //     //     const currentDate = moment().format();
    //     //     this.$store.commit("Application/setLastPrinted", currentDate); 
    //     //     this.loadPdf();
    //     // }
    // }

    // public setProgress(){
    //     // console.warn('Set Progress')
    //     // console.log(this.currentStep)
    //     // console.log(this.currentPage)
    //     if(this.currentPage <0) return
    //     Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.isFormReviewed()?100:50, false);
    // }

    // public isFormReviewed(){
    //     for(const form of this.formsList)
    //         if(!this.generatedForms.includes(form.name)){
    //             console.log(form)
    //             return false
    //         }
    //     return true
    // }

}
</script>