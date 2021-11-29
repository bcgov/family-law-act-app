<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Serve a copy of the order on each other party
        </p> 

        <p>
            If the judge grants your order without notice to any other party, you must serve a copy of 
            the order each other party. The order must be served to the address for service of 
            each other party in any of the following ways:            
        </p>
        <ul style="margin-top:-0.75rem">
            <li>by leaving the documents at the party’s address for service</li>
            <li>by mailing the documents by ordinary mail to the party’s address for service</li>
            <li>by mailing the documents by registered mail to the party’s address for service</li>
            <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
            <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>            
        </ul>

        <p>
            Note: If your application was made to allow service of a document using an alternative method, 
            the order can be served along with the document using the method ordered by the judge.
        </p>

       

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ServeCopyOfOrderOnOtherParty extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
