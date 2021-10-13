<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Attend the Court Appearance
        </p>  

        <p>
            A judge can make decisions based only on the information presented 
            by the parties as evidence. Your evidence includes your application, 
            any additional affidavit, and spoken evidence provided in court.
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
    
}
</script>
