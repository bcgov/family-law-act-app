<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Complete the early resolution process outlined in the “What You Must Do” section of this form
        </p>  

        <!-- <p>
            Before proceeding any further with your court case, you must meet the following early resolution requirements:
        </p>  -->

        <p>
            Contact <a href="http://www.gov.bc.ca/family-justice-services-division" target="_blank">
                Family Justice Services Division</a> 
                to schedule your individual needs assessment.
        </p>
        <p>
            If you have already participated in some or all of the early resolution requirements
            within the last year, Family Justice Services Division will confirm you have met the 
            early resolution requirements and prepare the required documents for the court.<br>
            <b>NOTE:</b>
            You may be contacted by a needs assessor if someone else has filed a Notice to Resolve 
            a Family Law Matter and named you as the other party in that document.
        </p>

        <ul>
            <li><b>needs assessment</b>
                <p>
                    A needs assessment is a one-on-one meeting with a needs assessor who is a neutral 
                    person trained to help people understand this process and other ways that are available 
                    to resolve their family law matter and other issues. A needs assessor can provide some 
                    legal information, make referrals to supports, including legal advice, and help identify 
                    the next steps that are right for you.
                </p>
            </li>
            <li><b>parenting education course</b>
                <p>
                    Complete a parenting education course, unless you are exempt for one of the reasons 
                    identified in Rule 17.<br>
                    Your needs assessor will provide you with more information on the parenting education 
                    course right for you and how to complete it.
                </p>
            </li>
            <li><b>consensual dispute resolution</b>
                <p>
                    Participate in consensual dispute resolution, unless your needs assessor determines 
                    that it is not appropriate.<br>
                    Your needs assessor will provide you with more information on what consensual dispute 
                    resolution is, whether it is right for you, and the process for participating in it.
                </p>
            </li>
        </ul>

        <p>
            <b>NOTE TO THE PARTIES:</b><br>
            If you require a time sensitive order on a family law matter, you may be able to postpone 
            participating in one or more of the early resolution requirements until after you have received 
            your time sensitive order. Please speak to Family Justice Services Division or the court registry 
            if this situation applies to you.
        </p>
        <p>
            <b>Reminder:</b><br>
            If you do not resolve all family law matters during the early resolution requirements, either 
            party can file an application in the Provincial Court to request a court order.<br>
            If you do not participate in the early resolution requirements, the other party will be allowed 
            to proceed to the Provincial Court to ask for a court order. A party must have met the requirements 
            for early resolution before they will be allowed to file an Application About a Family Law Matter or 
            Reply to an Application About a Family Law Matter in the case.

        </p>
       
        <!-- <p>
            You have met these requirements if you have participated in a needs assessment, parenting education course and consensual
            dispute resolution OR if you were exempt by the needs assessor or the court from participating in any of these.
        </p>

        <p>
            If you do not resolve all issues during the early resolution process, either party can make an application to the Provincial Court for a
            court order by filing an <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa712.pdf?forcedownload=false"
                   target="_blank">
                   Application About a Family Law Matter Claim Form 3 </a> or complete the form using this application - Family Law Application. <br/>
            Contact the <a target="_blank" href="https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac"> Justice Access Centre </a> in person or by phone to find out more about meeting the requirements.
        </p> -->

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
