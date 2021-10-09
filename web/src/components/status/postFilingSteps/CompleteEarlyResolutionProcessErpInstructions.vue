<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Complete the early resolution process outlined in the “What You Must Do” section of this form
        </p>  

        <p>
            Before proceeding any further with your court case, you must meet the following early resolution requirements:
        </p> 

        <ul>
            <li>needs assessment</li>
            <li>parenting education course</li>
            <li>consensual dispute resolution</li>
        </ul>
       
        <p>
            You have met these requirements if you have participated in a needs assessment, parenting education course and consensual
            dispute resolution OR if you were exempt by the needs assessor or the court from participating in any of these.
        </p>

        <p>
            If you do not resolve all issues during the early resolution process, either party can make an application to the Provincial Court for a
            court order by filing an <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa712.pdf?forcedownload=false"
                   target="_blank">
                   Application About a Family Law Matter Claim Form 3 </a> or complete the form using this application - Family Law Application. <br/>
            Contact the <a target="_blank" href="https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac"> Justice Access Centre </a> in person or by phone to find out more about meeting the requirements.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CompleteEarlyResolutionProcessErpInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
