<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div 
            style="font-size:14pt;font-weight:600; margin-bottom:1rem;">
            CHECKLIST FOR CONSENT ORDER
        </div>

<!-- <Step 1> -->
        <div>
            <div style="margin:0rem 0 0rem 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 1rem 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 1: Complete the Consent Order form"/>               
            </div>                
           
            <p style="margin:0.5rem 0 0.5rem 0;">
                You can complete the form online and submit it for filing electronically using this service.
            </p>                    
         
        </div>

<!-- <Step 2> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 2: Sign Consent Order form"/>               
            </div>  
        
            <div style="margin:0.5rem 0 0.5rem 0;">
                The Consent Order form must be signed by the parties or their lawyers.
            </div>        
        </div>

<!-- <Step 3> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 3: General process for Consent Orders"/>               
            </div>

            <p>
                If an application is made for a consent order without the 
                attendance of the parties at court, a clerk must place 
                the application, draft consent order and supporting 
                documents before a judge, or a family justice manager 
                if the consent order is within the jurisdiction of the 
                family justice manager.
            </p>
            
            <p style="margin:0.5rem 0 0.5rem 0;">
                If a direction is given by the Court, the parties and any 
                other person specified by the judge or family justice manager 
                must be notified by the registry clerk and the notification 
                must include the date, time and place for the court appearance 
                and any other information in the direction.
            </p>   
            
            <p style="margin:0.5rem 0 0.5rem 0;">
                If a consent order is made, the registry clerk will provide 
                a filed copy of the consent order to the parties or their lawyers.
            </p>  

            <p style="margin:0.5rem 0 0.5rem 0;">
                Parties who have applied for a consent order and have had their 
                application rejected must include a copy of the reasons for 
                rejection with subsequent related applications for consent orders.
            </p>

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

@Component({
    components:{
        CheckBox
    }
})

export default class CorChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>