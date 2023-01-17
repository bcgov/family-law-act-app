<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR REQUEST TO FILE AN AGREEMENT
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
                    text="Step 1: Complete the Request to File an Agreement form"/>               
            </div>   
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                This form is available online at 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">
                    www.gov.bc.ca/cour-forms
                </a> or at any 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>.
            </p>
            <p>
                You can complete the form online and print it for filing. You can also complete it by hand. 
                If you complete it by hand, be sure it’s readable. Registry staff and staff at any 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F">
                    Justice Access Centre
                </a> or 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=E12512BAACDF45979AEF905033BE4CEA">
                    Family Justice Centre
                </a> 
                can help answer questions about the forms but they cannot help complete your forms or 
                give advice about legal problems. If you need help filling in the forms and do not have 
                a lawyer, ask the court registry staff or staff at the Justice Access Center or Family 
                Justice Centre to refer you to someone who can help.
            </p> 
            <p style="margin:0.5rem 0 2rem 0;">
                Follow the instructions in the form and include all the information that is asked for.
            </p>           
            
            <div style="margin:0;" class="margintop-1vue">
                To prepare the form for filing:
            </div>
            <ul>
                <li>
                    print or make copies of the completed form: one set for you, one set for the 
                    Court, and one set for each other party
                </li>                
                <li>
                    bring all copies to the court registry for filing <b>or</b> send by mail or by fax filing using the 
                    <a 
                        target="_blank" 
                        href="https://www2.gov.bc.ca/assets/download/37FB0BCC59AE42EDA53C4C8569E47718"> 
                        Fax Filing Cover Page Form 52
                    </a>
                </li>
            </ul>
         
        </div>

<!-- <Step 2> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 2: File the Request to File an Agreement form and written agreement at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a> :
            </div>
            <ul>
               <li>where the existing Provincial Court case with the same parties is filed, or</li>               
               <li>nearest to where the child lives most of the time, if the case involves a child-related issue, or</li>
               <li>nearest to where you live, if the case does not involve a child-related issue.</li>
            </ul>
            <div style="margin:0 0 0.5rem 0;">     
                The registry clerk will review your package to make sure it is complete before filing it. 
                You will be given a copy for your records.      
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

export default class EnfrcFileAgreementChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>