<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Schedule your trial with the Judicial Case Manager or as directed by the Judge</span>
        </p>         

       
    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleTrialWithJudicialCaseManager extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
