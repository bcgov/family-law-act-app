<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Arrange for service of the Application About A Protection Order on each other party
        </p>  

        <p>
            Unless you are making your application without notice to the other party, 
            arrange for personal service of the Application About a Protection Order 
            on each other party.
        </p> 

        <p>
            Service is the act of giving or leaving documents with the required person. 
            It is important that each other party know that a case is going on, are 
            aware of what step is being taken, and are given a chance to tell their 
            side of the story to the court.
        </p>

        <p>    
            You must arrange to have the other party personally served a copy of the 
            documents with at least 7 days' notice of the date and time of the court 
            appearance, unless the court has ordered something else. This means there 
            must be at least 7 days between the date the documents are served on the 
            other party and the date and time of the court appearance.
        </p>

        <p>
            An adult (at least 19 years old), who is not a party to the case, 
            must personally serve the application about a protection order by 
            hand-delivering a copy of the application to the other party.
        </p>

        <p>
            You may ask a friend, family member, or other adult person to 
            personally serve the documents for you. You can also hire a 
            person, called a process server, to serve the documents for 
            you. Process servers are experienced in finding and serving 
            people. To find a process server, search the Internet or 
            look in the yellow pages.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArrangeForServicePoInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
