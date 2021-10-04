<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{step}}.             
            Review the stamped document for a court date and time.
        </p>  

        <p>
            If you requested an application without notice, the registry 
            will have put a date and time for the application on your document.  
            In addition, the registry may have also provided you with information 
            about attending the hearing.
        </p> 

    </b-card>    
</template>

<script lang="ts">    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ReviewStampedDocumentPoInstructions extends Vue {    

    @Prop({required: true})
    step!: string;
    
}
</script>