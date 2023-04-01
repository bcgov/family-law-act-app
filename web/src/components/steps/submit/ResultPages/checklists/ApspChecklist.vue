<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR AFFIDAVIT OF PERSONAL SERVICE OF PROTECTION ORDER
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
                    text="Step 1: Complete the Affidavit of Personal Service of Protection Order"/>               
            </div>   
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                This form is available online at 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">
                    www.gov.bc.ca/court-forms
                </a>.
            </p>
            <p>
                The person who served the other party must complete the Affidavit of Personal Service of Protection Order form 
                can complete the form online and print it for filing. The person can also complete it by hand. 
                If you complete it by hand, be sure it’s readable.
            </p> 
            <p style="margin:0.5rem 0 2rem 0;">
                Follow the instructions in the form and include all the information that is asked for.
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
                text="Step 2: If possible, get the affidavit sworn/affirmed and signed with a commissioner for taking affidavits"/>               
        </div>  
        
        <div style="margin:0.5rem 0 0.5rem 0;">
            The Affidavit must be signed with a commissioner for taking affidavits. They 
            will need to see your photo ID and they will ask you to promise that the 
            information in the application affidavit is true.
        </div>
        <div style="margin:0 0 0.5rem 0;">
            Lawyers and notaries are all commissioners for taking affidavits. The court registry 
            also has staff who are commissioners for taking affidavits who can swear or affirm 
            your affidavit for free.
        </div>       
        <div style="margin:0 0 0.5rem 0;">
            The person who completed the service can go to any 
            <a 
                target="_blank" 
                href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                Provincial Court Registry
            </a> or 
            <a 
                target="_blank" 
                href="https://www2.gov.bc.ca/gov/content?id=FD6DB5BA2A5248038EEF54D9F9F37C4D">
                Service BC location
            </a>
            to swear or affirm the affidavit. 
            If you have the document sworn or affirmed at a different court registry, you will still need to file 
            it at the court registry where the existing case is filed.            
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
                    text="Step 3: File the Affidavit of Personal Service of Protection Order"/>               
            </div>  
           
            <div style="margin:0.5rem 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>
                where the existing Provincial Court case with the same parties is filed.
            </div>
            <div style="margin:0 0 0.5rem 0;">
                The registry clerk will review your form to make sure it is complete before 
                filing it. You will be given a copy for your records.
            </div>           
            <div style="margin:0 0 0.5rem 0;">
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

export default class ApspChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>