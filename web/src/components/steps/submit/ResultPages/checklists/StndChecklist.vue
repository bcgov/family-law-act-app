<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR {{ checklistInfo.title.toUpperCase() }}
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
                    :text="'Step 1: Complete the ' + checklistInfo.title + ' form'"/>               
            </div>   
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                You can complete the form online and either print it or submit it electronically 
                to the registry.
            </p>
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                Ensure that you follow the instructions provided in the form and include all 
                the information that is asked for.  You can print or save the form.
            </p>   
            
            <p v-if="checklistInfo.name =='NLC'" style="margin:0.5rem 0 2rem 0;">
                NOTE TO THE PARTIES: You are required to serve the lawyer for the child(ren) 
                with copies of any court documents, including any application and supporting 
                documents, as you would the other party, unless otherwise ordered by the court.
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
                    :text="'Step 2: File the ' + checklistInfo.title + ' form at the Provincial Court Registry'"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
                You must file at the 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content?id=5AD9441AEBD9428FA6EF86D6B1E39E96">
                    Provincial Court Registry
                </a>
                where your existing case is filed.
            </div>
            <div style="margin:0rem 0 2rem 0;">
                The registry clerk will review your form to make sure it is complete before filing it. 
                You will be given a copy for your records. There are no fees for filing Provincial Court family matters.
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
                    :text="'Step 3: Serve or provide a copy of the filed ' + checklistInfo.title + ' (where applicable) to each other party'"/>               
            </div>  

            <p style="margin:0.5rem 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. It is important 
                that each other party know that a case is going on, are aware of what step is being taken, 
                and are given a chance to tell their side of the story to the court.
            </p>

            <p style="margin:0 0 0.5rem 0;">
                You must serve the other party within 14 days of filing the notice, or before the date 
                of the next scheduled court appearance, whichever is sooner.
            </p>
            
            <div style="margin:0 0 0.5rem 0;">
                Some documents must be served to the address of service of each other 
                party in any of the following ways:
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
                A party's address for service is the address they have provided to the court. A party 
                who does not have an address for service must be served by leaving a copy of the 
                documents directly with the person (this is called personal service).
            </p>

            <p>
                Personal service requires that an adult (at least 19 years old) who is not a party 
                hand deliver the documents to the party to be served.
            </p>

            <p>
                The court may need proof you had the documents personally served. The person serving 
                the documents must complete a 
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf">
                    Certificate of Service Form 7
                </a> so that you can prove personal service of the documents. You must attach 
                a copy of the documents to the Certificate of Service. Remember to make a copy 
                before the documents are served.
            </p>

            <div style="margin:0 0 0.5rem 0;">
                If you are not required to serve a document but are required to provide a 
                copy to the other party, you may do so by sending to the address of service 
                of each other party in one of the following ways:
            </div>
            <ul>                
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

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { checklistInfoType } from '@/types/Common';

@Component({
    components:{
        CheckBox
    }
})
export default class StndChecklist extends Vue {

    @Prop({required: true})
    checklistInfo!: checklistInfoType;

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>