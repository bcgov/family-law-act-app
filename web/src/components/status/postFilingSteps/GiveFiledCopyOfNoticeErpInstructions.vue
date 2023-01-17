<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{instructionsStep}}.             
            Give a filed copy of the Notice to Resolve a Family Law Matter form to each other party
        </p>  

        <p>
            You can give each other party a copy using any way you believe will get it to them, including:
        </p> 

        <ul>
            <li>giving them a copy in person</li>
            <li>sending a copy by email, text message, instant message, or mail</li>
            <li>getting a friend or someone else to give them a copy</li>
        </ul>
       
        <p>
            This is a 2-page form. Remember to give the other party both pages of the form.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GiveFiledCopyOfNoticeErpInstructions extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
