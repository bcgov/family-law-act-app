<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.             
            Serve the Financial Statement and Electronic Filing Statement (Form 51) on each other party
        </p> 

        <p>
            Service is the act of giving or leaving documents with the required person. 
            You must serve a copy of the financial statement on each other party. 
            If you are filing your financial statement:
        </p>
        <ul style="margin-top:-0.75rem">
            <li>with your Application About a Family Law Matter, it is served along with the application</li>
            <li>with your Reply to a Family Law Matter, the registry will give a copy to the other party. This counts as you serving it on them.</li>
            <li>in any other circumstance, it must be served on the other party to their address for service</li>
        </ul>       

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ServeFinancialStatementOnOtherParty extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
