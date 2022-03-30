<template>
    <div> 
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div style="font-size:14pt;font-weight:600; margin-bottom:1rem;">CHECKLIST FOR REPLY TO A FAMILY LAW MATTER FORM</div>

<!-- <Step 1> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 1: Complete the Reply to a Family Law Matter form"/>               
            </div>  
        </div>

<!-- <Step 2> -->
        <div>
            <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="'yes'" 
                    text="Step 2: File the Reply to an Application About a Family Law Matter form at the Provincial Court Registry"/>               
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
                    text="Step 3: Schedule your Family Management Conference"/>               
            </div>

            <p>
                Your first step with the court will be to attend a family management conference. 
                The court registry will provide you and the other party with instructions on how 
                to schedule your family management conference.
            </p>

            <p>
                If you have a lawyer, they will help with scheduling your case for a date you 
                can attend.
            </p>            

        </div>

<!-- <Step 4> -->
        <div>
             <div style="margin:0rem 0 0 0; display:inline;">
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    shiftmark=0
                    style="display:inline; margin:0 0.5rem 0 0; font-weight: 600;" 
                    check="" 
                    text="Step 4: Attend the Family Management Conference"/>               
            </div>  
            
            <div style="margin:0;">
                A family management conference is an informal and time-limited process in which a 
                judge or family justice manager:
            </div>
            <ul>
                <li>assists the parties to identify the issues to be resolved</li>
                <li>explores options to resolve the issues</li>
                <li>can make case management orders or directions to make sure your case is ready for the next step</li>
                <li>can make interim (temporary) orders about your family law matters</li>
                <li>can make an order by consent of the parties</li>
                <li>can make an order without a party, if a party does not show up or file a reply</li>
            </ul>

            <p>
                Your scheduling notice will provide you with more information about what happens at the family management conference.
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

export default class RflmChecklist extends Vue {

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>