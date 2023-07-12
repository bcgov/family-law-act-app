<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Notice of Exemption Form Parenting Education Program</span>
        </p>         

        <p>
            If your document was accepted and stamped by the registry you will 
            need to retain a copy of the stamped document for your records.  
            Please ensure that you download and save, or print a copy.            
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NoticeOfExemptionFromParentingEducationProgram extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
