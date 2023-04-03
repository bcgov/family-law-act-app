<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR GUARDIANSHIP AFFIDAVIT
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
                    text="Step 1: Complete the Guardianship Affidavit form"/>               
            </div>
            
            <p>
                You can complete the form online and print it for filing.
            </p> 
            <p style="margin:0.5rem 0 1rem 0;">
                You need to complete and file the main part of the form and only the schedules that apply to your application.
            </p>   
            
            <div>
                Before you can complete the affidavit, you must complete the following background checks referenced in the form:
                <ul>
                    <li>a Ministry of Children and Family Development record check</li>
                    <li>a protection order record check from the Protection Order Registry, and</li>
                    <li>a criminal record check</li>                    
                </ul>
            </div>
         
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
                text="Step 2: Get the affidavit sworn/affirmed and signed with a commissioner for taking affidavits"/>               
        </div>  

        <div style="margin:0.5rem 0 0.5rem 0;">
            The affidavit must be sworn or affirmed no more than 7 days before it is filed.
        </div>
        
        <div style="margin:0 0 0.5rem 0;">
            The affidavit must be signed with commissioner for taking affidavits. They will need to see a 
            piece of your photo ID and they will ask you to promise that the information in the application 
            affidavit is true.
        </div>
        <div style="margin:0 0 0.5rem 0;">
            Lawyers and notaries are all commissioners for taking affidavits. The court registry also has 
            staff who are commissioners for taking affidavits who can swear or affirm your affidavit for free.
        </div>       
        
        <div style="margin:0 0 0.5rem 0;">
            If you cannot get the document sworn or affirmed before the document is filed, the unsworn document 
            can be filed if you will be available to swear or affirm that the contents of the document are true 
            during your court appearance.            
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
                    text="Step 3: File the Guardianship Affidavit form at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>
                where the existing Provincial Court case is filed.
            </div>
            <div style="margin:0 0 0.5rem 0;">
                The registry clerk will review your form to make sure it is complete before 
                filing it. You will be given a copy for your records.
            </div>           
            <div style="margin:0 0 0.5rem 0;">
                There are no fees for filing Provincial Court family documents.
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
                    text="Step 4: Serve a copy of the affidavit on each other party"/>               
            </div> 
                        
            <div style="margin:0 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. It is important 
                that each other party is aware of what step is being taken in the case and are given a 
                chance to tell their side of the story to the court.
            </div>            

        </div>

        <div>
            The Guardianship Affidavit must be served to the address of service of each other party in any of the following ways:
            <ul>
                <li>by leaving the documents at the party’s address for service</li>
                <li>by mailing the documents by ordinary mail to the party’s address for service</li>
                <li>by mailing the documents by registered mail to the party’s address for service</li>
                <li>
                    if the party’s address for service includes an email address, by emailing the 
                    document(s) to that email address                  
                </li>
                <li>
                    if the party’s address for service includes a fax number, by faxing the 
                    documents to that fax number                  
                </li>
            </ul>
        </div>

        <div style="margin:0 0 0.5rem 0;">
            A party's address for service is the address they have provided to the court. 
            A party who does not have an address for service must be served by leaving a 
            copy of the application document(s) directly with the person (this is called 
            personal service).
        </div>

        <div style="margin:0 0 0.5rem 0;">
            Personal service requires that an adult (at least 19 years old) who is 
            not a party hand-deliver the documents to the party to be served.
        </div>

        <div style="margin:0 0 0.5rem 0;">
            The court may need proof you had the documents served. The person serving the 
            documents must complete a  
            <a 
                target="_blank" 
                href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf">
                Certificate of Service Form 7
            </a> so that you can prove service of the documents took place. You must attach a copy of
            the documents to the Certificate of Service. Remember to make a copy before the documents 
            are served.
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

export default class GaChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>