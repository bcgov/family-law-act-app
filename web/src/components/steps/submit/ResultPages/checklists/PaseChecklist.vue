<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR NOTICE OF EXEMPTION FROM PARENTING EDUCATION PROGRAM
        </div>

<!-- <Step 1> -->
        <div>
            <div style="margin:0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 1rem 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 1: Complete the top portion of the form to show you are exempt because you are not required to participate. Be sure to select the reason why you are not required to participate in a parenting education program."/>               
            </div>         
        </div>

<!-- <Step 2> -->
        <div>
            <div style="margin:1rem 0 0rem 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 1rem 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 2: File the completed form with the court registry."/>               
            </div>   

            <div style="margin:0.5rem 0 0.5rem 0;">
                A <b>request to be exempt can be approved</b> by a local manager, or designate, 
                of the Family Justice Services Division, for any of the following reasons:
                <ul>
                    <li>you cannot access an online version of the parenting education program</li>
                    <li>
                        the parenting education program is not available in a language you are fluent in
                    </li>      
                    <li>
                        you cannot complete the parenting education program because of literacy challenges
                    </li>       
                    <li>
                        you cannot complete the parenting education program because of a serious medical condition, or
                    </li>   
                    <li>
                        a consent order is filed that resolves all the issues involving the children
                    </li>   
                </ul>
            </div>
            <p style="font-weight: 700">
                Complete the form to request to be exempt. Be sure to include your contact information.
            </p>
         
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
                    text="Step 3: Submit the form to Family Justice Services Division to review your request before filing the completed form with the court registry."/>               
            </div>  

            <p style="margin:0.5rem 0 0.5rem 0;">
                To submit the request for approval, contact your local Family Justice Centre or Justice Access Centre.
                For local address and contact information visit:  
                <a 
                    target="_blank" 
                    href="http://www.clicklaw.bc.ca/helpmap/service/1019">
                    www.clicklaw.bc.ca/helpmap/service/1019
                </a> or call 1-844-747-3963 to connect you with a local office who can assist.
            </p>   
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                If the request to be exempt is approved, file the approved form with the court registry.               
            </div>     
            <div style="margin:0.5rem 0 0.5rem 0;">               
                If your request is not approved, you must complete the parenting education program.
            </div>    
        </div>

<!-- <Step 4> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 4: File with at the Provincial Court Registry – ONLY IF APPROVED"/>               
            </div>  

            <p style="margin:0.5rem 0 0.5rem 0;">
                If your request to be exempt was approved, you must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a> where the existing Provincial Court case is filed.
            </p>   
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                The registry clerk will review your package to make sure it is complete before 
                filing it. You will be given a copy for your records.              
            </div>     
            <div style="margin:0.5rem 0 0.5rem 0;">               
                There are no fees for filing Provincial Court family documents.
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

export default class PaseChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>