<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR CONSENT TO INFORMAL TRIAL (KAMLOOPS)
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
                    text="Step 1: Complete the Consent to an Informal Trial form"/>               
            </div>  
            
            <p style="margin:0.5rem 0 0.5rem 0;">
                This form is available online at
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5A553F02835E4289AABE537C37781022">
                    www.gov.bc.ca/court-forms
                </a> or at the Kamloops court registry.
            </p>            
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                Submit the copies to the court registry for filing using this service or attend 
                in person <b>or</b> send by mail or by fax filing using the
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/assets/download/37FB0BCC59AE42EDA53C4C8569E47718">
                    Fax Filing Cover Page Form 52
                </a>.
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
                    text="Step 2: File the Consent to an Informal Trial form at the Kamloops Registry"/>               
            </div>  
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                This form is only to be used at the Kamloops Registry.
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
                    text="Step 3: Schedule your trial with the Judicial Case Manager or as directed by the Judge"/>               
            </div>  
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

export default class CiftChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>