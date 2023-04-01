<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR ELECTRONIC FILING STATEMENT
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
                    text="Step 1: Complete the form"/>               
            </div>
            
            <p style="margin:0.5rem 0 2rem 0;">
                Please note that this form is used only when you are submitting affidavits 
                or financial statements online via the Apply for a Family Law Act Order application. 
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
                    text="Step 2: File the completed form with the court registry."/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>
                where the existing Provincial Court case with the same parties is filed.
                Please include the affidavit(s) that the Electronic Filing Statement references.
            </div>
            <div style="margin:0 0 0.5rem 0;">
                The registry clerk will review your package to make sure it is complete before 
                filing it. You will be given a copy for your records.
            </div>           
            <div style="margin:0 0 0.5rem 0;">
                There are no fees for filing Provincial Court family documents.
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
                    text="Step 3: Serve a copy of the Electronic Filing Statement with the Affidavit on each other party"/>               
            </div> 
            
            
            <div style="margin:0 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. It is important that each other 
                party know that a case is going on, are aware of what step is being taken, and are given a chance to tell 
                their side of the story to the court.
            </div>              

        </div>

        <div>
            The Electronic Filing Statement and Affidavit(s) must be served to the address of service 
            of each other party in any of the following ways:
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
        </div>

        <div style="margin:0 0 0.5rem 0;">
            A party’s address for service is the address they have provided to the court. 
            A party who does not have an address for service must be served by leaving 
            a copy of the application document(s) directly with the person 
            (this is called personal service).
        </div>

        <div style="margin:0 0 0.5rem 0;">
            Personal service requires that an adult (at least 19 years old) who is 
            not a party hand-deliver the documents to the party to be served.
        </div>

        <div style="margin:0 0 0.5rem 0;">
            The court may need proof you had the affidavit served. The person serving the 
            documents must complete a  
            <a 
                target="_blank" 
                href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf">
                Certificate of Service Form 7
            </a> so that you can prove service of the documents. You must attach a copy of 
            the documents to the Certificate of Service. Remember to make a copy before the 
            documents are served.
        </div>
        <div style="margin:0; font-weight: 700;">
            Remember to make a copy before the documents are served.
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

export default class EfspChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>