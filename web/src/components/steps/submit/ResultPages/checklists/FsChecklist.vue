<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR FINANCIAL STATEMENT
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
                    text="Step 1: Complete the Financial Statement form"/>               
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
                Follow the instructions in the form.
            </p>           
            
            <div style="margin:0;" class="margintop-1vue">
                To prepare the form for filing:
            </div>
            <ul>
                <li>
                    collect the parts you completed, and any attachments as referenced in the form
                </li>
                <li>
                    print or make copies of the completed form: one for you, one for the Court, and one for each other party
                </li>
                <li>
                    staple each package of documents together
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
                text="Step 2: Get the affidavit sworn/affirmed and signed with a commissioner for taking affidavits"/>               
        </div>  
        
        <div style="margin:0 0 0.5rem 0;">
            The financial statement must be signed in front of a commissioner for taking affidavits. 
            They will need to see a piece of your photo ID and they will ask you to promise that 
            the information in the financial statement is true.
        </div>
        <div style="margin:0 0 0.5rem 0;">
            Lawyers and notaries are all commissioners for taking affidavits. The court registry 
            also has staff who are commissioners for taking affidavits who can swear or affirm 
            your affidavit for free.
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
                    text="Step 3: File your Financial Statement form at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the courthouse where the existing Application About a Family Law 
                Matter or family law case is filed.
            </div>
            <div style="margin:0 0 0.5rem 0;">
                The registry clerk will review your package to make sure it is complete before 
                filing it. You will be given a copy for your records.
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
                    text="Step 4: Serve the financial statement on each other party"/>               
            </div>  

            
            
            <div style="margin:0 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. 
                You must serve a copy of the financial statement on each other party. 
                If you are filing your financial statement:
            </div>
            <ul>
                <li>with your Application About a Family Law Matter, it is served along with the application</li>
                <li>
                    with your Reply to a Family Law Matter, the registry will give a copy to the other 
                    party. This counts as you serving it on them.
                </li>
                <li>in any other circumstance, it must be served on the other party to their address for service</li>
            </ul>           

            <p>
                Unless the registry serves it, the court may need proof the documents were served. 
                The person serving the document(s) must complete a  
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf">
                    Certificate of Service Form 7
                </a> so that you can prove personal service of the documents. You must attach 
                a copy of the documents to the Certificate of Service. Remember to make a copy 
                before the documents are served.
            </p>

        </div>

        <div>
            NOTE: If you submitted the form electronically, you will also need to serve the Electronic Filing Statement (Form 51).
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

export default class FsChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>