<template>
    <div>

        <b-card v-for="(form,inx) in formsList" :key="inx" style="margin:1rem 0;border-radius:10px; border:2px solid #DDEEFF;">
            <div style="float:left; margin: 0.5rem 1rem;color:#5050AA; font-size:16px; font-weight:bold;" > 
                {{form.title}}
            </div>
            <b-button 
                style="float:right; margin: 0.25rem 1rem;"                  
                v-on:click.prevent="onDownload(form.name, inx)"
                :variant="form.color">
                    <span class="fa fa-print btn-icon-left"/>
                    Review and {{type}}
            </b-button>
        </b-card>

    </div> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
       
    }
})
export default class FormList extends Vue {
    
    @Prop({required: true})
    type!: string;

    @Prop({required: true})
    currentPage!: number;

    @applicationState.State
    public generatedForms!: string[];
    @applicationState.Action
    public UpdateGeneratedForms!: (newGeneratedForms) => void

    selected=""
    currentStep = 0;

    showPDFformName = '';
    showPDFpreview = false;

    formsList =[                
        { name:'PK', color:"danger", title:"Application About a Protection Order (FORM K)"},
        { name:'P3', color:"danger", title:"Application About a Family Law Matter (FORM 3)"},        
    ]

    mounted(){
        this.currentStep = this.$store.state.Application.currentStep;
        this.initFormsTitle();
        Vue.nextTick(()=> this.setProgress());
        this.$emit('formsList',this.formsList)
    } 
    
    public initFormsTitle(){
        for(const formInx in this.formsList)
        {
            if(this.generatedForms.includes(this.formsList[formInx].name))
                this.formsList[formInx].color = "success"
        }
    }
    
    public onDownload(formName, inx) {
        console.log("downloading"+inx)
        console.log(this.formsList[inx])
         this.$emit('onDownload',this.formsList[inx].name)

         this.formsList[inx].color = "success";
        // this.showPDFformName = formName;
        // this.showPDFpreview = true;

        // if(!this.generatedForms.includes(formName))
        // {
        //     const forms= this.generatedForms;
        //     forms.push(formName)
        //     this.UpdateGeneratedForms(forms);
        // }

        // this.setProgress()

        // if(this.checkErrorOnPages()){ 
        //     const currentDate = moment().format();
        //     this.$store.commit("Application/setLastPrinted", currentDate); 
        //     this.loadPdf();
        // }
    }

    public setProgress(){
        // console.warn('Set Progress')
        // console.log(this.currentStep)
        // console.log(this.currentPage)
        if(this.currentPage <0) return
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.isFormReviewed()?100:50, false);
    }

    public isFormReviewed(){
        for(const form of this.formsList)
            if(!this.generatedForms.includes(form.name)){
                console.log(form)
                return false
            }
        return true
    }

}
</script>