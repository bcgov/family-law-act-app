<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            <span v-if="byConsent">If applicable,  attend the Court Appearance</span>
            <span v-else>Attend the Court Appearance</span>
        </p>         

        <p>
            A judge can make decisions based only on the information presented 
            by the parties as evidence. Your evidence includes your application, 
            any additional affidavit, and spoken evidence provided in court.
        </p>       

        <div v-if="byConsent">
            <p>
                <b>Note: </b> If you are making your application <b>by consent</b> and you have included 
                a draft consent order, it usually means you can obtain the order without you having to 
                go to court. A judge reviews your application and unless the judge has any questions 
                about what you are asking for, approves your order without a court hearing.
            </p>
            <p>
                A judge reviewing an application for a case management consent order may do any of the following:
            </p>
            <ul style="margin-top:-0.75rem">
                <li>approve and sign the order without the need for the parties to come to court</li>
                <li>ask you to provide more information or evidence in writing or by coming to court to give that information</li>
                <li>require notice to be given to any other party</li>
                <li>make changes to the draft consent order and ask the parties to come to court to review and sign the changes if approved</li>
                <li>reject the application with an explanation</li>
            </ul>
            <p style="margin-left:0.75rem">
                Depending on what you are requesting on your application, it may take the judge a few days 
                to review your application. The registry staff will let you know when you can expect to hear 
                from them. If you have provided an email address in your address for service, they can usually 
                let you know the results of your application by email.
            </p>            
        </div> 

        <p style="margin:0.5rem 0 0.5rem 0;">
            If you can’t attend court using the method of attendance set out 
            in your application for the court appearance, you can request 
            the court’s permission to attend using a different method of 
            attendance by filing an 
            <a 
                target="_blank"
                href="https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178">
                Application for Case Management Order without Notice or Attendance Form 11</a>.
        </p>

        <p>
            If you have a lawyer, they will come to court with you and assist 
            during the hearing.
        </p>

        <p>    
            If you do not have a lawyer, you may find it helpful to bring a 
            trusted friend or family member with you to provide emotional support, 
            take notes, and organize documents during your court appearance. 
            The Provincial Court has adopted 
            <a 
                target="_blank" 
                href='https://www.provincialcourt.bc.ca/downloads/Practice%20Directions/Support%20Person%20Guidelines.pdf'>
                Support Person Guidelines
            </a> that explain when you are permitted to have a support person help you, 
            and what they can do.
        </p>

        <p>
            If you are attending at the courthouse in person for your court 
            appearance, 
            <a 
                target="_blank" 
                href='https://www2.gov.bc.ca/gov/content/justice/criminal-justice/victims-of-crime/victimlinkbc'>
                make a safety plan
            </a>. If the other party is also attending, 
            they will probably be close by. You can talk to a sheriff as part of 
            your safety planning. The sheriff’s office is available by phone.
        </p>

        <p>
            For contact information visit Courthouse Locations on the BC 
            Government website at 
            <a 
                href="https://www2.gov.bc.ca/gov/content/home"
                target="_blank">www.gov.bc.ca
            </a>.
        </p>
        <p>
            Your safety plan should include going to and from the courthouse.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AttendCourtAppearanceInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;

    @Prop({required: true})
    byConsent!: boolean;
    
}
</script>
