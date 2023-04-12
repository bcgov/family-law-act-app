<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Complete the required steps outlined in the “What You Must Do” section of the Notice of Intention to Proceed form</span>
        </p>         

        <p>
           Before proceeding any further with your court case, you must either: 
        </p>
        <ul style="margin-top:-0.75rem">
            <li>participate in a needs assessment, or</li>
            <li>attend a family management conference</li>
        </ul>

        <p>
           The next step you must take to proceed with your case will depend on what the last step taken in your case was.
           At the needs assessment or family management conference, the needs assessor or judge will be able to determine 
           where your case is at and what the most appropriate next step. 
        </p>

        <p>
           To schedule a family management conference, you must also meet the requirements for scheduling set out in Rules 37, 38, 39 and 40, as applicable, including: 
        </p>
        <ol style="margin-top:-0.75rem">
            <li>A reply has been filed by the other party, or a reply has not been filed and, based on the filed certificate of service, 30 days has passed since the application was served and, if at the time of filing the application,</li>
            <li>
                <ol style="margin-left:-1rem; list-style-type: lower-alpha">
                    <li>the application was filed in a family justice registry, a party has filed a referral request following the completion of a needs assessment, and a certificate of completion or notice of exemption for the parenting education program, or</li>
                    <li>the application was filed in a parenting education program registry, a party has filed a certificate of completion or notice of exemption for the parenting education program.</li>
                </ol>
            </li>
        </ol>  

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class WhatMustDoSection extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
