<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Arrange for service of the Application {{applicationName}} on each other party
        </p>  

        <p>
            Unless you are making your application without notice to the other party, arrange for service of the documents.
        </p>
        <ul style="margin-top:-0.75rem">
            <li>The filed copy of your Application {{applicationName}}</li>
            <li>Any other documents you filed with the Application {{applicationName}}</li>
            <li>Any instructions about attending the hearing which the registry may have provided</li>
        </ul>

        <p>
            Service is the act of giving or leaving documents with the required person. 
            It is important that each other party know that a family case is going on, 
            are aware of what step is being taken, and are given a chance to tell their 
            side of the story to the court.            
        </p>

        <p> 
            You must serve the other party with at least 7 days notice of the date and time 
            of the court appearance, unless the court has ordered something else. 
            This means there must be at least 7 days between the date the application 
            documents is served on the other party and the date and time of the court appearance.                
        </p>

        <p>
            An Application {{applicationName}} must be served to the address of service 
            of each other party in any of the following ways:
        </p>
        <ul style="margin-top:-0.75rem">
            <li>by leaving the documents at the party’s address for service</li>
            <li>by mailing the documents by ordinary mail to the party’s address for service</li>
            <li>by mailing the documents by registered mail to the party’s address for service</li>
            <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
            <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>
            
        </ul>

        <p style="margin-left:1.25rem;">
            A party's address for service is the address they have provided to the court. 
            A party who does not have an address for service must be served by leaving a copy of 
            the application documents directly with the person (this is called personal service). 
            Personal service means an adult person who is at least 19, other than you, must 
            hand-deliver the documents directly to the person being served. 
            A party cannot personally serve a document on the other party.
        </p>

        <div v-if="applicationName.includes('Case Management')">
            <p>
                A person, who is not a party may be served by:                
            </p>
            <ul style="margin-top:-0.75rem">
                <li>mailing a copy of the application by ordinary mail or registered mail to 
                    the person’s postal address; or</li>
                <li>leaving a copy of the application directly with the person 
                    (this is called personal service)</li>
            </ul>
        </div>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArrangeForServiceCmPpmRelocEnfrcInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;

    @Prop({required: true})
    applicationName!: string;
    
}
</script>
