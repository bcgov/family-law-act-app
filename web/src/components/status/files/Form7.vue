<template>
    <div style="margin:0; padding: 0; border-color: grey;">        
        
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:1.75rem; font-weight:700; display: block; margin-left: auto; margin-right: auto; text-align: center;">
            Preparing a Certificate of Service
        </div>
        <div 
            style="margin-bottom:1rem; font-size:1.25rem; font-weight:700; display: block; margin-left: auto; margin-right: auto; text-align: center;">
            Form 7
        </div>
        <div 
            style="margin-bottom:1rem; font-size: 20px; display: block; margin-left: auto; margin-right: auto; text-align: center;">
            Provincial Court Family Rules
        </div>

        <div>
            <p>Complete this form to prove a document was served.</p>
            <p>
                Service is the act of giving or leaving documents with the required person. It is important that each other party:
                <ul>
                    <li>know that a case is going on,</li>
                    <li>are aware of what step is being taken, and</li>
                    <li>are given a chance to tell their side of the story to the court.</li>
                </ul>
                Different court documents must be served in different ways. It is important to make sure you are serving a document properly. Your
                matter can be delayed if the other person is not properly served.
            </p>
            <p>
                For some types of documents, the other person must be served personally. These include:
                <ul>
                    <li>an Application About a Family Law Matter</li>
                    <li>an Application about a Protection Order</li>
                    <li>a subpoena</li>
                </ul>                 
            </p>
            <p>
                Personal service requires an adult who is not a party to hand-deliver the documents directly to the person being served.
            </p>
            <p>
                For most other documents, the documents can be served to the address for service in any of the following ways:
                <ul>
                    <li>by leaving the documents at the party’s address for service</li>
                    <li>by mailing the documents by ordinary mail to the party’s address for service</li>
                    <li>by mailing the documents by registered mail to the party’s address for service</li>
                    <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
                    <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>
                </ul>
                A party’s address for service is the address they have provided to the court.
            </p>
            <p>
                If you can’t serve the documents in the way required by the court, you can ask for a court order allowing 
                another method of service. To apply, you will need to complete an
                <a href="https://www2.gov.bc.ca/assets/download/D6B5BF5B2ECB46B08BBC54808F4F7BB1"
                   target="_blank"
                    > Application for a Case Management Order without Notice or Appearance Form 11
                </a>.

            </p>
        </div>

<!-- <Step 1> -->
        <div>  

            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 1: Serve the documents"/>               
            </div>
            
            <p>
               Check the instructions for the document you are serving to confirm how to serve it. 
               Remember some documents must be personally served.<br/>
               If you are serving the Application About a Family Law Matter, you must give the other party:
                <ul>
                    <li>
                        instructions about how to file a reply and obtaining a reply form,
                    </li>
                    <li>
                        a copy of the Application About a Family Law Matter and any other documents you filed with it.
                    </li>                    
                </ul>
                The court registry will usually give you the instruction sheet when you file your application but you can also print a copy from
                <a
                    href="www.gov.bc.ca/court-forms/"
                    target="_blank">www.gov.bc.ca/court-forms/
                </a>.
            </p>            
        </div>

<!-- <Step 2> -->
        <div class="my-2">
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 2: Complete the Certificate of Service form"/>               
            </div>   
           
            <div class="my-2">
                The Certificate of Service form must be completed by the person who served the documents. 
                Instructions are on the form. Make sure you check off and attach a copy of each document 
                served on the other party.
            </div>

            <div class="my-2">
                If you served the documents by registered mail, you can go to the Canada Post website
                <a
                    href="http://www.canadapost.ca"
                    target="_blank">www.canadapost.ca/
                </a>. 
                to track your service. Print the confirmation of delivery, or proof of signature, 
                and file it with this form.
                
            </div> 
        </div>

<!-- <Step 3> -->
        <div class="my-4">
            
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 3: File the Certificate of Service form at the Provincial Court Registry"/>               
            </div>

            <p>You must file the Certificate of Service at the court registry where the existing case is filed.</p> 

        </div>
        <div class="new-page" />
        <!-- <HEADER> -->
        <div class="form-header-cm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:1.75rem;"><b>Certificate of Service</b></div>                
                <div style="font-size:1.25rem;"><b>Form 7</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 2, 27, 68, 77, 136 and 183</div>
            </div>
            <div style="float:right;">
                
                <b-table
                    :items="[{name:'Registry Location:'},{name:'Court File Number:'}]"
                    :fields="[{key:'name',tdClass:'border-dark text-center align-middle'}]"
                    small
                    bordered
                    thead-class="d-none">
                     <template v-slot:cell(name)="data">
                        <div style="font-size:0.65rem; margin:.1rem 7rem 1rem .1rem;">{{data.value}}</div> 
                     </template>
                </b-table>
            </div>
        </div>

        <!-- <1> -->
        <div style="display: block;margin-top: 2rem;">
            <div style="text-indent:1px;display:block;font-weight: 700;">I certify that</div>
            <underline-form 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="35rem" 
                beforetext="I," 
                hint="Your full name" 
                :italicHint="false" 
                text=""/>
            <underline-form 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="32.5rem" 
                beforetext="served" 
                hint="Full name of the person served (copy their name from the document you served them)" 
                :italicHint="false" 
                text=""/>
            <underline-form 
                style="margin-top: 1rem;text-indent:1px;display:inline-block;font-weight: 700;" 
                textwidth="15rem" 
                beforetext="on" 
                hint="Date the document(s) were service (mmm/dd/yyyy)" 
                :italicHint="false" 
                text=""/>
            <underline-form 
                style="margin-top: 1rem;text-indent:1px;display:inline-block;font-weight: 700;" 
                textwidth="10rem" 
                beforetext="at" 
                hint="Time the document(s) were served" 
                :italicHint="false" 
                text=""/>
            <div style="text-indent:1px;display:inline;font-weight: 700;">a.m./p.m.</div>
            <underline-form 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="34.5rem" 
                beforetext="at" 
                hint="Street address or location, city, province, or email address or fax number where the document(s) were served." 
                :italicHint="false" 
                text=""/>
            
            <div 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;">
                with the following document(s):
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:0px;font-style: italic;">
                Select all options that apply. Attach a copy of each document you have selected 
                below (except the blank reply) to this Certificate of Service.
            </div>

            <table>

                <tr>
                    <td style="width: 20rem; display: inline-block;">
                        <div 
                            v-for="(rightDoc, rightDocIndex) in rightDocuments"           
                            v-bind:key="rightDocIndex" 
                            style="margin:0rem 0 0 0; display:block;">
                            <check-box 
                                inline="inline" 
                                boxMargin="0" 
                                shiftmark=0
                                style="display:inline; margin:0 0.5rem 0 0;" 
                                check="" 
                                :text="rightDoc"/>               
                        </div>                        
                    </td>
                    
                    <td style="width: 19rem; display: inline-block;">
                        <div 
                            v-for="(leftDoc, leftDocIndex) in leftDocuments"           
                            v-bind:key="leftDocIndex" 
                            style="margin:0 0 0 0; display:block;">
                            <check-box 
                                inline="inline" 
                                boxMargin="0" 
                                shiftmark=0
                                style="display:inline; margin:0 0 0 0;" 
                                check="" 
                                :text="leftDoc"/>               
                        </div>  
                    </td>
                </tr>
                
                   

            </table>
            <underline-form 
                style="margin-top: 0.75rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="40rem" 
                beforetext="" 
                hint="" 
                :italicHint="false" 
                text=""/>
            <div 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;">
                by:
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:0px;font-style: italic;">
                Select the appropriate option for how you served the other party with the document(s)
            </div>
            <div 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;text-decoration: underline;">
                Personal service
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:0px;font-style: italic;">
                Note: Application About a Family Law Matter or About a Protection Order can only be served this way.
            </div>
            <div style="margin:0 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="leaving a copy of the document(s) with the person"/>               
            </div>
            <div style="margin:0 0 0 0; display:block;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="alternative service method ordered by the court (specify the method or instructions you followed as ordered by the court):"/>               
            </div>
            <underline-form 
                style="margin-top: 0.75rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="40rem" 
                beforetext="" 
                hint="" 
                :italicHint="false" 
                text=""/>

            <div 
                style="margin-top: 1rem;text-indent:1px;display:block;font-weight: 700;text-decoration: underline;">
                Ordinary service
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:0px;font-style: italic;">
                Note: This method of service is not allowed for an Application About a Family Law Matter or About a Protection Order.
            </div>
            <div style="margin:0 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="leaving a copy of the document(s) at the person’s address for delivery"/>               
            </div>
            <div style="margin:0 0 0 0; display:block;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="mailing the document(s) by ordinary mail to the person’s address for delivery on"/>
                <underline-form 
                    style="margin-top: 0.75rem;text-indent:1px;display:inline;font-weight: 700;" 
                    textwidth="6rem" 
                    beforetext="" 
                    hint="(mmm/dd/yyyy)" 
                    :italicHint="false" 
                    text=""/>
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:1.5rem;font-style: italic;">
                Note: The date the document(s) were served is 14 days after the documents were mailed.
            </div>
            <div style="margin:0 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="mailing the document(s) by registered mail to the person’s address for delivery"/>               
            </div>
            <div 
                style="margin:0.25rem 0;text-indent:1.5rem;font-style: italic; display:inline-block;">
                Note: The date the document(s) were served is the date the document(s) were 
                confirmed to have been delivered by Canada Post. Attach a copy of the 
                delivery confirmation from Canada Post.
            </div>
            <div style="margin:0 0 0 0; display:inline-block;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="emailing the document(s) to the person’s email address for delivery"/>               
            </div>
            <div style="margin:0 0 0 0; display:inline-block;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="faxing the document(s) to the person’s fax number for delivery"/>               
            </div>
            <div style="margin:0 0 0 0; display:block;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0;" 
                    check="" 
                    text="alternative service method ordered by the court (specify the 
                    method or instructions you followed as ordered by the court):"/>               
            </div>
            <underline-form 
                style="margin-top: 0.75rem;text-indent:1px;display:block;font-weight: 700;" 
                textwidth="40rem" 
                beforetext="" 
                hint="" 
                :italicHint="false" 
                text=""/>            
                
        </div>

        <div class="print-block">
            

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:19rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:19rem;border:1px solid #313132; display:inline-block; margin-left:2rem;"></div>
            </div>
            <div>
                <div style="width:19rem; display:inline-block; font-size:9pt" >Signature of the person who served the document</div>
                <div style="width:19rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Date of signature (mmm/dd/yyyy)</div>
            </div>
            
        </div>

        

    </div>
    
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";

@Component({
    components:{
        CheckBox,
        UnderlineForm
        
    }
})
export default class Form7 extends Vue {

    rightDocuments = [
       "Application About a Family Law Matter", 
       "Financial Statement",
       "Guardianship Affidavit",
       "Instructions about filing reply",
       "Application for Case Management Order",
       "Application About a Protection Order",
       "Application About Priority Parenting Matter"
    ];

    leftDocuments = [
        "Order", 
        "Reply to a Counter Application",
        "Application for Order Prohibiting the Relocation of a Child",
        "Application About Enforcement",
        "Written Response to Application",
        "Notice of Intention to Proceed",
        "Other (list any additional document(s) that you served here):"
    ];



}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>