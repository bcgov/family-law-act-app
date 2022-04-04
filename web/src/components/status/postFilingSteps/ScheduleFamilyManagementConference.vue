<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Schedule your Family Management Conference
        </p> 

        <p class="mb-1">
            Your first step with the court will be to attend a family management conference. 
        </p>        

        <p class="my-0">
            The court registry will provide you and the other party 
            with instructions on how to schedule your family management conference. 
        </p>

        <p class="mt-1">
            If you have a lawyer, they will help with scheduling your case for a date you can attend.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleFamilyManagementConference extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
