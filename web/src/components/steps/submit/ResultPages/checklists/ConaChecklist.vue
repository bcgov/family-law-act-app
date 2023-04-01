<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR CONSENT ADJOURNMENT
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
                    text="Step 1: Complete the Consent Adjournment form"/>               
            </div>   

            <div style="margin:0.5rem 0 0.5rem 0;">
                The Consent Adjournment form must be completed. The Consent 
                Adjournment form may be used where:
                <ul>
                    <li>At least one party is represented by counsel;</li>
                    <li>
                        the filing counsel is required to confirm that they have obtained 
                        the consent of all parties or their counsel and will be responsible 
                        for providing all other parties or their counsel with a copy of the 
                        filed form with the new court date and appearance details obtained 
                        from the registry
                    </li>      
                    <li>
                        the matter is adjourned from one list date to another with the same 
                        time estimate (or less) or as approved by the JCM if it was previously 
                        scheduled by the JCM or adjourned generally; and
                    </li>       
                    <li>
                        the Consent Adjournment form is submitted 
                        <b>at least two clear business</b> days 
                        in advance of the scheduled appearance.
                    </li>      
                </ul>
            </div>
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                Further details can be found in the
                <a 
                    target="_blank" 
                    href="https://www.provincialcourt.bc.ca/downloads/Practice%20Directions/FAM%2009%20Consent%20Adjournment%20(FLA_FMEA).pdf">
                    Practice Directive FAM 09
                </a>
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
                    text="Step 2: File the Consent Adjournment form at the Provincial Court Registry"/>               
            </div>  
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                You must file the Consent Adjournment at the court registry where 
                the existing case is filed <b>at least two clear business days</b> in 
                advance of the scheduled appearance.
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

export default class ConaChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>