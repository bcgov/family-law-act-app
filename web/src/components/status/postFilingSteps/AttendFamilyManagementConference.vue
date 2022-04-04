<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Attend the Family Management Conference
        </p> 

        <p>
            A family management conference is an informal 
            and time-limited process in which a judge or family justice manager:
        </p>
        <ul style="margin-top:-0.75rem">
            <li>assists the parties to identify the issues to be resolved</li>
            <li>explores options to resolve the issues</li>
            <li>can make case management orders or directions to make sure your case is ready   for the next step</li>
            <li>can make interim (temporary) orders about your family law matters</li>
            <li>can make an order by consent of the parties</li>
            <li>can make an order without a party, if a party does not show up or file a reply</li>            
        </ul>

        <p>
            Your scheduling notice will provide you with more 
            information about what happens at the family management conference.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AttendFamilyManagementConference extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
