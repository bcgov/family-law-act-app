<template>
<!----------------------------------------------------------------  <TERMINATE PO>   -------------------------------------------------------->
<!-- <Page 2> --> 
<!-- <Header> -->
    <div>
        <div class="new-page" />


        <div style="text-align:center;font-family:BCSans"><b> Schedule 3 – Terminate an Existing Protection Order</b></div>
        <div style="text-align:center;font-family:BCSans"><b> This is Schedule 3 to the Application about a Protection Order</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>This schedule must be completed if you are applying to terminate an existing protection order.</i>
        </div>

        <div style="margin-top:2rem;"></div>
<!-- <1> -->
        <section class="resetquestion">
            <check-box inline="inline" boxMargin="0" checkbox="" style="display:inline; margin-left:0.5rem;" :check="true?'yes':''" text=""/>
            <underline-form style="text-indent:0px;display:inline-block;" textwidth="6.5rem" beforetext="I am attaching a copy of the existing protection order made on" hint="date (mmm/dd/yyyy)" :text="aboutOrder.dateOfPO | beautify-date"/>
            <div style="display:inline; margin-left:0.5rem;">that I am applying to have terminated.</div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <2> -->
        <section>  
            <i style="margin-left:.25rem;">Select only one of the options below</i>
            <div style="margin:0rem 0 0 1rem;" >                
                <check-box style="" :check="aboutOrder.inCourtForPO == 'y' ?'yes':''" text="I was in court when the protection order was made"/>
                <check-box style="" :check="aboutOrder.inCourtForPO == 'n' ?'yes':''" text="I was not in court when the protection order was made because:"/>                
            </div>
            <div style="margin-left:1rem;">
                <i>Explain why you were not in court when the protection order was made</i>
            </div>
            <div v-if="aboutOrder.whyNotInCourt" class="answerbox"> {{aboutOrder.whyNotInCourt}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <3> -->
        <section>  
            I am the:
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="aboutOrder.kindOfParty.includes('protectedParty')?'yes':''" text="protected party"/>
                <check-box style="" :check="aboutOrder.kindOfParty.includes('parentGuardian')?'yes':''" text="parent or guardian of the protected party"/>
                <check-box style="" :check="aboutOrder.kindOfParty.includes('restrainedParty')?'yes':''" text="person who the protection order is against"/>
            </div>
        </section>

        <div style="margin-top:1rem;"></div>
<!-- <4> -->
        <section>  
            The facts on which this application is based are as follows:
            <i style="display:block; margin:0.25rem 0 0 1rem;">Describe why the order should be terminated and the facts you want the court to consider</i>
            <div v-if="aboutOrder.whyTerminatePO" class="answerbox"> {{aboutOrder.whyTerminatePO}}</div>
            <div v-else style="margin-bottom:2rem;"></div>
        </section>
    </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;

    mounted(){
        this.getAboutOrder();
    }
    
    aboutOrder = {dateOfPO:'', inCourtForPO:'', whyNotInCourt:'', kindOfParty:[], whyTerminatePO:''};
    public getAboutOrder(){  

        this.aboutOrder = {dateOfPO:'', inCourtForPO:'', whyNotInCourt:'', kindOfParty:[], whyTerminatePO:''};

        if(this.result?.aboutSurvey){
            const about = this.result.aboutSurvey;
            this.aboutOrder.dateOfPO =  about.terminateDateOfPO;
            this.aboutOrder.inCourtForPO = about.inCourtForPO;
            this.aboutOrder.whyNotInCourt = about.inCourtForPO == 'n'? about.whyNotInCourt:'';
            this.aboutOrder.kindOfParty = about.kindofPartyIbPO? about.kindofPartyIbPO:[];
            this.aboutOrder.whyTerminatePO = about.whyTerminatePO;
        }       
    }
    
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 