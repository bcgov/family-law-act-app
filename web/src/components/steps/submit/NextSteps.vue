
<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        
        <h2 class="mt-4">Next Steps</h2>
        <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            <h3>What happens at the Court Registry? </h3>
            <p>The court registry staff will check your documents to make sure they are complete.</p>
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
                        <b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <div style='display:inline-block'>1-866-577-2525</div>
                    </p>
                    <p>
                        <b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
                    </p>                
                </div>
            </div>

            <div v-if="hasNeedPOselected">
                <p>
                    If you are filing your application in person and you are asking for a protection order in your application, you will need to <tooltip title='swear or affirm' index="0"/> the affidavit. To swear or affirm the affidavit, you will need to show a piece of photo ID and you will be asked to sign the affidavit in front of a commissioner for taking affidavits. There is no fee to swear or affirm your affidavit at the court registry.
                </p>
                <p>
                    If you are filing your application by email and you are asking for a protection order in your application, you will need to be prepared to <tooltip title='swear or affirm' index="1"/> the information in your application during your court appearance.
                </p>
            </div>

            <p>
                Once your application is reviewed, the registry staff will stamp the document, assign a court file number (if there is no existing court file number), schedule the court appearance, and return a copy of the application to you.
            </p>
            <p>
                The registry will give you information about your next steps.
            </p>

             <div>
                <div class="my-4 text-primary" @click="showServeOtherParty= !showServeOtherParty" style="border-bottom:1px solid; width:18.5rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> How do I serve the other party?
                    <span v-if="showServeOtherParty" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showServeOtherParty" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div v-if="showServeOtherParty" class="mx-4 mb-5 mt-3">
                    <p>
                        Unless you are applying for a protection order without notice to the other party, each other party named in your application must be served with a copy of the documents.
                    </p>
                    <p>
                        An Application About a Protection Order or Application About a Family Law Matter must be personally served on the other party.
                    </p>
                    <p>
                        Personal service requires that an adult (at least 19 years old) who is not a party hand-deliver the documents to the party to be served. 
                    </p>
                    <p>
                        For an Application About a Protection Order, or other application with a court appearance, you must serve the other party with at least 7 days’ notice of the date and time of the court appearance unless the court has ordered something else. This means there must be at least 7 days between the date the application document is served on the other party or person and the date and time of the court appearance.
                    </p>
                    <p>
                        All other applications (except for the two noted above) can be served by ordinary service. The other party can be served by ordinary service in any of the following ways:
                        <ul>
                            <li>by leaving the documents at the party’s address for service</li>
                            <li>by mailing the documents by ordinary mail to the party’s address for service</li>
                            <li>by mailing the documents by registered mail to the party’s address for service</li>
                            <li>if the party’s address for service includes an email address, by emailing the documents to that email address</li>
                            <li>if the party’s address for service includes a fax number, by faxing the documents to that fax number</li>
                        </ul>
                    </p>
                    <p>
                        A party’s address for service is the address they have provided to the court. If a party does not have an address for service, the application must be served by personal service.
                    </p>
                    <p>
                        A person, who is not a party may be served by:
                        <ul>
                            <li>mailing a copy of the application by ordinary mail or registered mail to the person’s postal address; or</li>
                            <li>leaving a copy of the application directly with the person (this is called personal service)</li>
                        </ul>
                    </p>
                    <p>
                        The court may need proof you had the documents served. The person serving the documents must complete a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf?forcedownload=true" target="_blank">Certificate of Service Form 7</a> so that you can prove personal service of the documents. You must attach a copy of the documents to the Certificate of Service. Remember to make a copy before the documents are served.
                    </p>
                </div>
             </div>
            
        </b-card>
    
    </page-base>
</template>

<script lang="ts">
    import { Component, Vue} from 'vue-property-decorator';
    import PageBase from "@/components/steps/PageBase.vue";

    import Tooltip from "@/components/survey/Tooltip.vue";

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
        hasNeedPOselected = false
        showServeOtherParty = false

        mounted(){ 
            this.hasNeedPOselected = false
            this.currentStep = this.$store.state.Application.currentStep;
            this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
            //console.log(this.currentPage)
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
            if( this.$store.state.Application.steps[0].result && 
                this.$store.state.Application.steps[0].result.selectedForms &&
                this.$store.state.Application.steps[0].result.selectedForms.includes('protectionOrder') &&
                this.$store.state.Application.steps[1].result &&
                this.$store.state.Application.steps[1].result.questionnaireSurvey &&
                this.$store.state.Application.steps[1].result.questionnaireSurvey.orderType == 'needPO'
            )  this.hasNeedPOselected =  true;
        }

        public onPrev() {
            this.UpdateGotoPrevStepPage()
        }

        public onNext() {
            this.UpdateGotoNextStepPage()
        }
    }
</script>
