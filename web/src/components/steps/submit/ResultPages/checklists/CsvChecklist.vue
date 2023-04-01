<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR CERTIFICATE OF SERVICE
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
                    text="Step 1: Serve the documents"/>               
            </div>   

            <div style="margin:0.5rem 0 0.5rem 0;">
                Check the instructions for the document you are serving to confirm how to serve it. 
                Remember some documents must be personally served.
            </div> 

            <div>
                If you are serving the Application About a Family Law Matter, you must give the other party:
                <ul>
                    <li>instructions about how to file a reply and obtaining a reply form,</li>
                    <li>a copy of the Application About a Family Law Matter and any other documents you filed with it.</li>                   
                </ul>
            </div>
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                The court registry will usually give you the instruction sheet when you file your 
                application but you can also print a copy from
                <a 
                    target="_blank" 
                    href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms">
                    www.gov.bc.ca/court-forms
                </a>.
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
                check="'yes'" 
                text="Step 2: Complete the Certificate of Service form"/>               
        </div>  
        
        <div style="margin:0.5rem 0 0.5rem 0;">
            The Certificate of Service form must be completed by the person who served the 
            documents. Instructions are on the form. Make sure you check off and attach a 
            copy of each document served on the other party.
        </div>
               
        <div style="margin:0 0 0.5rem 0;">
            If you served the documents by registered mail, you can go to the Canada Post website 
            <a 
                target="_blank" 
                href="https://www.canadapost.ca">
                www.canadapost.ca
            </a> 
            to track your service. Print the confirmation of delivery, or proof of signature, and file it with this form.            
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
                    text="Step 3: File the Certificate of Service form at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0.5rem 0 0.5rem 0;">
                You must file the Certificate of Service at the court registry where the existing case is filed.
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

export default class CsvChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>