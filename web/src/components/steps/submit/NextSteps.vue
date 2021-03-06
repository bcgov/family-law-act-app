
<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        
        <h2 class="mt-4">Next Steps</h2>
        <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            <h3>What happens at the Court Registry? </h3>
            <p>The court registry staff will check your documents to make sure they’ve been completed properly.</p>
            <p>If you are not sure whether you’ve completed your application properly, you may want to get some legal advice before you file your documents.</p>
        
            <div>
                <div class="my-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                    <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                    <p>
                        Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.
                    </p>
                    <p>
                        <b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919
                    </p>
                    <p>
                        <b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <div style='display:inline-block'>1-866-577-2525</div>, or contact the <a href='https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F' target="_blank">Justice Access Centre</a>
                    </p>
                    <p>
                        <b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
                    </p>                
                </div>
            </div>

            <p>
                If you are filing your application in person and you are asking for a protection order in your application, you will need to <tooltip title='swear or affirm' index="0"/> the affidavit. To swear or affirm the affidavit, you will need to show a piece of photo ID and you will be asked to sign the affidavit in front of a commissioner for taking affidavits. There is no fee to swear or affirm your affidavit at the court registry.
            </p>
            <p>
                If you are filing your application by email and you are asking for a protection order in your application, you will need to be prepared to <tooltip title='swear or affirm' index="1"/> the information in your application during your court appearance.
            </p>
            <p>
                Once your application is complete, the registry staff will stamp the document, assign a court file number (if there isn’t already one), schedule the court appearance, and return a copy of the application to you.
            </p>
            <p>
                You will receive a date and time for your court appearance and information about how to appear. These appearances are usually happening by telephone or videoconference. 
            </p>
            <p class="mb-5">
                You will need a safe, quiet place where you can call into the court appearance.
            </p>
        </b-card>
    
    </page-base>
</template>

<script lang="ts">
    import { Component, Vue} from 'vue-property-decorator';
    import PageBase from "../PageBase.vue";

    import Tooltip from "@/components/steps/get-started/Tooltip.vue";

    import { namespace } from "vuex-class";   
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    @Component({
        components:{
            PageBase,
            Tooltip
        }
    })

    export default class NextSteps extends Vue {
        
        @applicationState.Action
        public UpdateGotoPrevStepPage!: () => void

        @applicationState.Action
        public UpdateGotoNextStepPage!: () => void

        showLegalAssistance = false
        currentStep=0;
        currentPage=0;

        mounted(){
            this.currentStep = this.$store.state.Application.currentStep;
            this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
            //console.log(this.currentPage)
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
        }

        public onPrev() {
            this.UpdateGotoPrevStepPage()
        }

        public onNext() {
            this.UpdateGotoNextStepPage()
        }
    }
</script>
