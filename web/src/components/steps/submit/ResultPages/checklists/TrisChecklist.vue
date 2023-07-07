<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR THE TRIAL READINESS STATEMENT
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
                    text="Step 1: Complete the Trial Readiness Statement form"/>               
            </div>   
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                This form is available online at 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">
                    www.gov.bc.ca/court-forms
                </a> or at any 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>.
            </p>
            <p>
                You can complete the form online and print it for filing. You can also complete it by hand. 
                If you complete it by hand, be sure it’s readable. 
            </p> 
            <p style="margin:0.5rem 0 2rem 0;">
                Follow the instructions provided in the form and include all the information that is asked for.
            </p>           
            
            <div style="margin:0;" class="margintop-1vue">
                To prepare the form for filing:
            </div>
            <ul>                
                <li>
                    print or make copies of the completed form: one set for you, one set for the Court, and one set for each other party
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
                    check="" 
                    text="Step 2: File the Trial Readiness Statement form at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>
                where the existing Provincial Court case with the same parties is filed. 
                It must be filed at least 7 days before the date of the trial preparation 
                conference unless the court has ordered otherwise.
            </div>
            <div style="margin:0 0 0.5rem 0;">
                The registry clerk will review your form to make sure it is complete before filing it. 
                You will be given a copy for your records.
            </div> 
            <div style="margin:0 0 0.5rem 0;">
                There are no fees for filing Provincial Court family matters.
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
                    text="Step 3: Serve the Trial Readiness Statement on each other party"/>               
            </div> 

            <div style="margin:0 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. 
                It is important that each other party is aware of what step is being taken 
                in the case and are given a chance to tell their side of the story to the court.
            </div>  
            
            <div style="margin:0 0 0.5rem 0;">
                You must serve each other party with a copy of the filed Trial Readiness 
                Statement at least 7 days before the date of the trial preparation conference 
                unless the court ordered otherwise.
            </div>
            
            <div style="margin:0 0 0.5rem 0;">                
                The Trial Readiness Statement must be served to the address of service 
                of each other party in any of the following ways:
            </div>
            <ul>
                <li>by leaving the documents at the party’s address for service</li>
                <li>by mailing the documents by ordinary mail to the party’s address for service</li>
                <li>by mailing the documents by registered mail to the party’s address for service</li>
                <li>
                    if the party’s address for service includes an email address, by emailing the 
                    documents to that email address                  
                </li>
                <li>
                    if the party’s address for service includes a fax number, by faxing the 
                    documents to that fax number                  
                </li>
            </ul>

            <p>
                The court may need proof you served the Trial Readiness Statement. The person 
                serving the documents must complete a  
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf">
                    Certificate of Service Form 7
                </a> so that you can prove service of the documents. You must attach a copy of 
                the documents to the Certificate of Service. Remember to make a copy before the 
                documents are served.
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

export default class TrisChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>