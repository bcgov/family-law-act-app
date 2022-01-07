<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Complete and provide to the court registry
        </p>  

        <p>
            If a Judge grants your order, you will need to provide to the 
            court registry a 
            <a href="https://www2.gov.bc.ca/assets/download/2EA3479AA5804C98A103B066BA37AF56?forcedownload=true"
                target="_blank">
                Request for Service of Family Protection Order
            </a> 
            form. The form is used for service of the Protection Order on 
            the other party if an order is granted.
        </p> 

    </b-card>    
</template>

<script lang="ts">    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CompleteProvideForRegistryPoInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>