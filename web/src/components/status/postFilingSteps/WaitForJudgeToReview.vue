<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Wait for a judge to review your application
        </p> 

        <p>
            A judge reviewing an application for a case management order without notice or attendance 
            may do any of the following:            
        </p>
        <ul style="margin-top:-0.75rem">
            <li>approve and sign the order without the need for you to come to court</li>
            <li>ask you to provide more information or evidence in writing or by coming to court to give that information</li>
            <li>require that notice be given to any other parties</li>
            <li>reject the application with an explanation</li>
        </ul>

        <p>
            Depending on what you are requesting on your application, it may take the judge a few days to 
            review your application. The registry staff will let you know when you can expect to hear from them. 
            If you have provided an email address in your address for service, they can usually let you know the 
            results of your application by email.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class WaitForJudgeToReview extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
