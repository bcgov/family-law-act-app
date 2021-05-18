<template>
<div v-if="dataReady">    
    <!-- <b-button id="app-print" @click="onPrintSave()">Print</b-button>  -->
    <!-- <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>   -->    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-1-layout v-bind:result="result" v-bind:selectedPathways="selectedPathways"/>       

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import Form1Layout from "./Form1Layout.vue";

import moment from 'moment';
import { nameInfoType } from '@/types/Application';

@Component({
    components:{
        Form1Layout         
    }
})

export default class Form1 extends Vue {

    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedPathways = []

   
    mounted(){
        this.dataReady = false;
        this.result = this.getFLMResultData();
        this.selectedPathways = this.getPathwayInfo();
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }
   
           
    public onPrint() { 
               
        const el= document.getElementById("print");
        //console.log(el)
        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `" ";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order&pdf_type=NTRF&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

        // const body = new FormData();
        // body.append('html',pdfhtml)
        // body.append('json_data',null)

        const body = {
            'html':pdfhtml,
            'json_data':this.result
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  
        //console.log(body)
        this.$http.post(url,body, options)
        .then(res => {
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate); 
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){        
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?pdf_type=NTRF'
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "Form1.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }

 
    public getFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(let i=2;i<4; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){         
                if(stepResults[stepResult])
                    result[stepResult]=stepResults[stepResult].data; 
            }
        }     

        const childBestInterestAck = {childBestInterestAcknowledgement:this.$store.state.Application.steps[3].result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        
        
        //console.log(result)

        Vue.filter('extractRequiredDocuments')(result, 'familyLawMatter')

        return result;
    }

    public getPathwayInfo(){
        // console.log(this.result)

        let pathways = [];
        const selectedFLMs = this.result.flmSelectedForm; 
            
        if (selectedFLMs.includes("parentingArrangements")){
            pathways.push("parentingArrangements")
        }
        if (selectedFLMs.includes("childSupport")){
            pathways.push("childSupport")
        }
        if (selectedFLMs.includes("contactWithChild")){
            pathways.push("contactWithChild")
        } 
        if (selectedFLMs.includes("guardianOfChild")){
            pathways.push("guardianOfChild")
        }
                    
        if (selectedFLMs.includes("spousalSupport")){
            pathways.push("spousalSupport")
        }
        
        
        return pathways;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>