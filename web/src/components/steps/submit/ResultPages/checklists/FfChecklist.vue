<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR FAX FILING COVER PAGE
        </div>

<!-- <Step 1> -->
        <div>
            <div style="margin:0rem 0 0rem 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 1rem 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 1: Complete the Filing Form"/>               
            </div>                
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                You can complete the form online and print the form.
            </p>                    
         
        </div>

<!-- <Step 2> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 2: Prepare your other documents"/>               
            </div>  
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                Prepare the documents you want to file by fax and ensure that they are complete.
            </div>        
        </div>

<!-- <Step 3> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 3: Fax the form"/>               
            </div>

            <p>
                You must fax the forms to the Provincial Court Registry where the existing Provincial Court Case is filed.
            </p>
            
            <p style="margin:0.5rem 0 0.5rem 0;">
                The fax number of where to fax your documents can be found at
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>.
            </p>   
            
            <p style="margin:0.5rem 0 0.5rem 0;">
                The registry clerk will review your form to make sure it is complete before filing it. 
                You will be given a filed copy of your forms for your records.
            </p>  

            <p style="margin:0.5rem 0 0.5rem 0;">
                There are no fees for filing Provincial Court Family documents.
            </p>

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{
        CheckBox
    }
})

export default class FfChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>