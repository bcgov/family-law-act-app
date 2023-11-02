<template>
    <div v-if="dataReady"> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR AFFIDAVIT – GENERAL
        </div>

        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
             

<!-- <Step 1> -->
        <div>
            <div style="margin:0rem 0 0rem 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 1rem 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 1: Complete the Affidavit - General form"/>               
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
                You can complete the form online and print it for filing. You can also complete it by hand. 
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
                :check="affSigned?'yes':''" 
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
            You can go to any 
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
                    :check="affSigned?'yes':''" 
                    text="Step 3: File your Affidavit – General form at the Provincial Court Registry"/>               
            </div>  
           
            <div style="margin:0 0 0.5rem 0;">
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

<!-- <Step 4> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 4: Serve the Affidavit – General on each other party"/>               
            </div> 
            
            
            <div style="margin:0 0 0.5rem 0;">
                Service is the act of giving or leaving documents with the required person. It is important 
                that each other party is aware of what step is being taken in the case and are given a 
                chance to tell their side of the story to the court.
            </div>                    

            <p v-if="efspFiled">
                You must serve each other party with a copy of the affidavit and electronic filing statement.
            </p>
            <p v-else>
                You must serve each other party with a copy of the filed affidavit.
            </p>

        </div>

        <div>
            The affidavit <span v-if="efspFiled">and electronic filing statement</span> must be served to the address of service of each other party in any of the following ways:
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
            If a party does not have an address for service, the application must be 
            served by personal service.
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



    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{
        CheckBox
    }
})
export default class AffChecklist extends Vue {

    @Prop({required: true})
    applicationId!: string;

    dataReady = false;
    error = '';
    efspFiled = false;
    affSigned = false;

    mounted(){
        this.dataReady = false;
        this.getApplicationInfo(this.applicationId);        
    }

    public getApplicationInfo(applicationId) { 


        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;
            console.log(applicationData)  
        
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            const apps = stepGETSTART.submittedPdfList

            if (apps.includes('AFF') && apps.includes('EFSP')){
                this.affSigned = true;
                if (apps.includes('EFSP')){
                    this.efspFiled = true;
                }
            }                             
            
            Vue.nextTick(()=> this.dataReady = true);

        }, err => {
            this.error = err;        
        });
    }

    public getStepResultByName(applicationData, stepName){
        if(applicationData?.steps){
            const steps = applicationData.steps.filter(step => step.name == stepName);
            if(steps.length == 1) return steps[0].result
        }
        return {}
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>