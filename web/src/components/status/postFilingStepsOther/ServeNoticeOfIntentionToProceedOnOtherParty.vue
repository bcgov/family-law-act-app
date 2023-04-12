<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.             
            Give a filed copy of the Notice of Intention to Proceed form to each other party
        </p>

        <p>
            Depending on the last step that was taken, there are different ways you must give a copy to each other party.
        </p>
        
        <p>
            If the last step taken was the filing of the Application About a Family Law Matter or any 
            other step following the filing the Application, including the filing of an Application 
            to Obtain an Order, Application Respecting Existing Orders or Agreements or 
            Notice of Motion and no final order has been made, you must serve each other party with 
            a copy of the Notice of Intention to Proceed, and previously filed and served application, 
            in any of the following ways:            
        </p>
        <ul style="margin-top:-0.75rem">
             <li>by leaving the documents at the party’s address for service</li>
            <li>by mailing the documents by ordinary mail to the party’s address for service</li>
            <li>by mailing the documents by registered mail to the party’s address for service</li>
            <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
            <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>            
        </ul>

        <p>
            If the filed application has not been previously served, it must be served by personal service. In this case, the 
            Notice of Intention to Proceed may also be served personally together with the previously filed application.
        </p>

        <p>
            A party's address for service is the address they have provided to the court. 
            A party who does not have an address for service must be served by leaving a copy of 
            the application documents directly with the person (this is called personal service). 
        </p>
        <p>
            Personal service requires that an adult (at least 19 years old) who is not a party 
            hand deliver the documents to the party to be served.
        </p>

        <p>
            If your case is filed in an early resolution registry and the last step taken was the filing 
            of the Notice to Resolve a Family Law Matter, participation in a needs assessment, 
            completion of a parenting education program or participation in consensual dispute resolution, 
            you can give each other party a copy of the Notice of Intention to Proceed, and Notice 
            to Resolve a Family Law Matter if not already provided, using any way you believe will get it 
            to them, including:
        </p>
        <ul style="margin-top:-0.75rem">
            <li>giving them a copy in person</li>
            <li>sending a copy by email, text message, instant message, or mail</li>
            <li>getting a friend or someone else to give them a copy</li>
        </ul>     

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ServeNoticeOfIntentionToProceedOnOtherParty extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
