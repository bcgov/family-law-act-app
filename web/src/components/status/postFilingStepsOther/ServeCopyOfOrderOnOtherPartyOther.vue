<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.             
            Serve or provide a copy of the filed {{applicationName}} (where applicable) to each other party            
        </p> 

        <p>
            Service is the act of giving or leaving documents with the required person. 
            It is important that each other party know that a family case is going on, 
            are aware of what step is being taken, and are given a chance to tell their 
            side of the story to the court.            
        </p>

        <p v-if="sevenDays"> 
            You must serve the other party with at least 7 days notice of the date and time 
            of the court appearance, unless the court has ordered something else. 
            This means there must be at least 7 days between the date the application 
            documents is served on the other party and the date and time of the court appearance.                
        </p>
        <p v-else>
            You must serve the other party within 14 days of filing the notice, 
            or before the date of the next scheduled court appearance, whichever is sooner.                            
        </p>

        

        <p>
            Some documents must be served to the address of service 
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
            A party who does not have an address for service must be served by leaving a copy of 
            the application documents directly with the person (this is called personal service). 
        </p>
        <p>
            Personal service requires that an adult (at least 19 years old) who is not a party 
            hand deliver the documents to the party to be served.
        </p>

       

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ServeCopyOfOrderOnOtherPartyOther extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;

    @Prop({required: true})
    applicationName!: string;

    @Prop({default: false})
    sevenDays!: boolean;

    @Prop({default: false})
    includesEfsp!: boolean; 

    dataReady = false;
    efspShouldBeListed = false;

    mounted(){
        this.dataReady = false;
        this.efspShouldBeListed = this.applicationName == 'Affidavit – General' && this.includesEfsp;        
    }    
    
}
</script>
