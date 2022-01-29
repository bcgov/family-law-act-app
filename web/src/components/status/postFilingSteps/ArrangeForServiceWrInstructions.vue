<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <div style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Arrange for service of the {{applicationName}} to Application on each other party            
        </div>

        <p>
            Service is the act of giving or leaving documents with the required person. It is 
            important that each other party is aware of what step is being taken and are 
            given a chance to prepare for court.           
        </p>

        <p> 
            You must serve the other party with a filed copy of the written response before 
            the date of the court appearance, unless the court has ordered something else. 
            This means you cannot serve the other party on the date of the court appearance, 
            it must be before.                
        </p>

        <p>
            A {{applicationName}} to Application must be served to the address of service 
            of each other party in any of the following ways:
        </p>
        <ul style="margin-top:-0.75rem">
            <li>by leaving the documents at the party’s address for service</li>
            <li>by mailing the documents by ordinary mail to the party’s address for service</li>
            <li>by mailing the documents by registered mail to the party’s address for service</li>
            <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
            <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>
        </ul>

        <p>
            A party's address for service is the address they have provided to the court. 
        </p>

        <div>
            <p>
                A person, who is not a party or who does not have an address for service, must be served by:                
            </p>
            <ul style="margin-top:-0.75rem">
                <li>mailing a copy of the application by registered mail to the person’s postal address; or</li>
                <li>leaving a copy of the application directly with the person (this is called personal service)</li>
            </ul>
        </div>

        <p>
            Personal service requires that an adult (at least 19 years old) who is not a party hand-deliver 
            the documents to the party to be served.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArrangeForServiceWrInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;

    @Prop({required: true})
    applicationName!: string;
    
}
</script>
