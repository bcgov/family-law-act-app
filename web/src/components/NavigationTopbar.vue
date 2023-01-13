<template>
    <header name="navigation-topbar" class="app-header">

        <nav class="navbar navbar-expand-lg navbar-dark">
        <!-- Navbar content -->

            <div class="container-fluid">

                <a class="navbar-brand"
                    href="https://www2.gov.bc.ca"
                    style="max-width: 200px">
                    <img class="img-fluid d-none d-md-block"
                        src="../../public/images/bcid-logo-rev-en.svg"
                        width="177"
                        height="44"
                        alt="B.C. Government Logo"/>

                    <img class="img-fluid d-md-none"
                        src="../../public/images/bcid-symbol-rev.svg"
                        width="63"
                        height="44"
                        alt="B.C. Government Logo"/>

                </a>

                <div class="navbar-brand navbar-text">
                    Apply for a Family Law Act Order
                    <span class="navbar-tag">BETA</span>
                </div>

                <div class="navbar-extra">
                    <div id="app-profile">
                        <div v-if="userName" style="padding-right: rem">
                            <b-dropdown id="profileDropdown"
                                        text="Profile"
                                        variant="primary btn-transparent"
                                        menu-class="w-10"
                                        >
                                <template #button-content style="background-color: #003366">
                                    <span class="fa fa-user"></span> {{ userName }}
                                </template>
                                <b-dropdown-item-button @click="logout(false)"><b-icon-box-arrow-left class="mr-2"/>Logout </b-dropdown-item-button>
                                <b-dropdown-item-button @click="viewStatus()"><b-icon-card-list class="mr-2"/>Previous Applications </b-dropdown-item-button>
                                <b-dropdown-item-button 
                                   
                                    @click="viewStats()"><b-icon-file-earmark-bar-graph class="mr-2"/>Reports</b-dropdown-item-button>
                            </b-dropdown>
                        </div>
                    </div>
                </div>

                <div class="navbar-extra">
                    <b-button class="text-dark bg-warning mr-2" @click="tips = true">
                        Tips
                    </b-button>
                    <b-button class="text-primary bg-info" @click="getHelp = true">
                        Get Help
                    </b-button>
                </div>

                <div id="app-exit" class="app-exit">
                    <a  @click="logout(true)"
                        target="_blank"
                        id="quick-exit"
                        rel="external"
                        class="btn btn-primary text-warning">
                    <span class="fa fa-sign-out" /> Quick Exit
                    </a>
                </div>

                <button class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
            </div>

        </nav>

        <b-modal size="xl" v-model="getHelp" header-class="text-white bg-primary">

            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Where can I find help?</h1>
            </template>

            <div class="mx-5 my-4">
                <p class="help-header" style="font-weight: 700;">WHAT SHOULD I DO IF I FEEL UNSAFE?</p>
                <p>
                    If you or your children are in immediate danger, call the police right away or dial 911.
                </p>
                <p>
                    If you are not in immediate danger but are still afraid for your safety, 
                    <a href="https://www2.gov.bc.ca/gov/content/justice/criminal-justice/victims-of-crime/victimlinkbc"
                        target="_blank">VictimLinkBC
                    </a> can help.
                </p>
                <p>
                    <a href="https://www2.gov.bc.ca/gov/content/justice/criminal-justice/victims-of-crime/victimlinkbc"
                        target="_blank">VictimLinkBC
                    </a> is a toll-free, confidential multilingual service available across BC and Yukon 24 hours a day, 
                    7 days a week and can be accessed by calling or texting 1-800-563-0808 or sending an email to
                    <a href="mailto:VictimLinkBC@bc211.ca"
                    target="_blank">VictimLinkBC@bc211.ca</a>. It provides information and referral services to all 
                    victims of crime and immediate crisis support to victims of family and sexual violence.                    
                </p>
            </div>

            <div class="mx-5 mb-5">
                <p class="help-header" style="font-weight: 700;">JUSTICE ACCESS CENTRES & FAMILY JUSTICE CENTRES</p>                
                <p> 
                    <a href="https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac"
                        target="_blank">Justice Access Centres
                    </a> and 
                    <a href="https://www2.gov.bc.ca/gov/content?id=2E7DCCDAD5A94D61B777A80AE8639ABD"
                        target="_blank">Family Justice Centres
                    </a>
                    across BC have Family Justice Counsellors and Child Support Officers specially trained to 
                    help families resolve their issues about guardianship, parenting arrangements (time and 
                    responsibilities), contact, and child / spousal support. There is no charge for their services.
                </p>
                <p>
                    Services are available whether you are looking to establish or change existing arrangements; 
                    and may include provision of legal information, and information on court processes and options 
                    for resolution, mediation and referrals to services and resources that are available for your 
                    situation.                    
                </p>
            </div>

            <div class="mx-3 mb-5">
                <div class="m-4 help-header" @click="showFamilyLawIssueResolutionInfo= !showFamilyLawIssueResolutionInfo" style="border-bottom:1px solid; width:30rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I go to resolve a family law issue out of court? 
                    <span v-if="showFamilyLawIssueResolutionInfo" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showFamilyLawIssueResolutionInfo" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div class="ml-4" v-if="showFamilyLawIssueResolutionInfo">
                    <p>
                        There are formal dispute resolution processes such as mediation, parenting coordination 
                        and collaborative family law to help people reach agreement on family law issues.
                    </p>
                    <p>
                        Agreement can also be reached through informal dispute resolution, such as negotiation between lawyers.
                    </p>
                    <p>
                        The following services are available to help people reach an agreement:
                    </p>
                    <p>Free Government Service:
                        <ul>
                            <li>
                                <a  href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/who-can-help/family-justice-counsellors"
                                    target="_blank">Family Justice Counsellors
                                </a>
                            </li>
                        </ul>
                    </p>
                    <p>Other Services:
                        <ul>
                            <li>
                                <a  href="https://mylawbc.com/"
                                    target="_blank">MyLawBC
                                </a>
                            </li>
                            <li>
                                <a  href="https://www.mediatebc.com/find-a-mediator?RosterTypeId=2"
                                    target="_blank">Mediators
                                </a>
                            </li>
                            <li>
                                <a  href="https://adrbc.com/"
                                    target="_blank">Arbitrators
                                </a>
                            </li>
                            <li>
                                <a  href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/who-can-help/lawyers/collaborative-family-law"
                                    target="_blank">Collaborative family lawyers
                                </a>
                            </li>
                            <li>
                                <a  href="https://www.accessprobono.ca/our-programs/lawyer-referral-service"
                                    target="_blank">Lawyers
                                </a>
                            </li>
                        </ul>
                    </p>

                </div>
            </div>

            <div class="mx-3 mb-5">
                <div class="m-4 help-header" @click="showHelpFillingForms = !showHelpFillingForms" style="border-bottom:1px solid; width:23rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get help filling out my forms? 
                    <span v-if="showHelpFillingForms" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showHelpFillingForms" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div class="ml-4" v-if="showHelpFillingForms">
                    <p>
                        You can complete forms online using this service. 
                    </p>
                    <p>
                        Registry staff and staff at any
                        <a href="https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac"
                        target="_blank">Justice Access Centres
                    </a> and 
                    <a href="https://www2.gov.bc.ca/gov/content?id=2E7DCCDAD5A94D61B777A80AE8639ABD"
                        target="_blank">Family Justice Centres
                    </a>                         
                        can help answer questions about the forms but they cannot help complete your forms 
                        or give advice about legal problems.
                    </p>
                    <p>
                        If you need help filling in the forms and do not have a lawyer, you will need legal assistance. 
                    </p>

                </div>
            </div>

            <div class="mx-3 mb-5">
                <div class="m-4 help-header" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                    <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                </div>
                <div class="ml-4" v-if="showLegalAssistance">
                    <p>
                        Understanding the law and making sure you ask for the right order is important. 
                        If you ask for the wrong order or do not know how the law applies to your situation, 
                        it can be harder to resolve your case. Getting advice from a lawyer can help.
                    </p>
                    <p>
                        <b>Lawyers:</b> To find a lawyer or to have a free consultation with a 
                        lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">
                        Lawyer Referral Service</a> at 1-800-663-1919
                    </p>
                    <p>
                        <b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> 
                        To find out if you qualify for free legal advice or representation, contact 
                        <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> 
                        at <span style='display:inline-block'>1-866-577-2525.</span>
                    </p>
                    <p>
                        <b>Legal Services and Resources:</b> 
                        Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at 
                        <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> 
                        to find other free and low-cost legal services in your community
                    </p>
                    <p>
                        If you want legal help for only part of your case you can look for a lawyer that offers 
                        “unbundled” services. The
                        <a href='https://sites.google.com/view/bfur/' target="_blank">BC Family Law Unbundling Roster (HelpMap)</a>
                        is a list of legal professionals near you who offer unbundled services. Many also offer 
                        their services remotely, through telephone, web conferencing or other tools.
                    </p>
                </div>
            </div>

            <div class="mx-5 mb-5">
                <p class="text-dark" style="font-weight: 700;">Other Support Resources</p>
                <p>
                    The BC Government website has a page that
                    <a href="https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/who-can-help"
                        target="_blank">lists resources
                    </a>
                    available to help you and your children adjust to separation, and deal with issues 
                    such as how to collect child support and how to handle debt.
                </p>                
                <p>
                    The Provincial Court of BC website provides information and resources including 
                    the 
                    <a href="https://www.provincialcourt.bc.ca/downloads/family/Standard%20Wording%20of%20Family%20Law%20Orders%202021.pdf"
                        target="_blank">Family Law Picklist</a>, 
                    <a href="https://www.provincialcourt.bc.ca/types-of-cases/family-matters"
                        target="_blank">Resources for Family Cases
                    </a>,
                    <a href="https://www.provincialcourt.bc.ca/about-the-court/practice-directions"
                        target="_blank">Practice Directions and Notices to the Profession and the Public
                    </a>, and 
                    <a href="https://www.provincialcourt.bc.ca/judgments-decisions"
                        target="_blank"> Judgments and Decisions
                    </a>.
                </p>
                <p>
                    Website: 
                    <a href="https://www.provincialcourt.bc.ca/"
                        target="_blank">www.provincialcourt.bc.ca/ 
                    </a>                                       
                </p>
                <p>
                    You can also visit the 
                    <a href="http://www.justiceeducation.ca/"
                        target="_blank">Justice Education Society 
                    </a>
                     for online legal information.                                       
                </p>
                <p>
                    Amici Curiae Friendship Society (AC) provides legal assistance to individuals who 
                    require help drafting or filling out legal forms. Visit their website for more 
                    information:
                    <a href="https://www.legalformsbc.ca/about-acfs.html#/"
                        target="_blank">www.legalformsbc.ca/about-acfs.html#/ 
                    </a>                                       
                </p>

            </div>

            <div class="mx-5 mb-4">
                <p class="help-header" style="font-weight: 700;">WHO DO I CONTACT FOR TECHNICAL ASSISTANCE WITH THIS SERVICE?</p>
                
                
                <p>
                    CSO Support - 
                    <a 
                        href="mailto:Courts.CSO@gov.bc.ca"
                        target="_blank">Courts.CSO@gov.bc.ca
                    </a>                    
                </p>
                <p>
                    Hours of Operation: 8:00 am to 4:30 pm Pacific Time - Monday to Friday except Statutory Holidays.
                </p>
            </div>            

            <template v-slot:modal-footer>
                <b-button variant="primary" @click="getHelp = false">Close</b-button>
            </template>

            <template v-slot:modal-header-close>
                <b-button
                    variant="primary"
                    class="closeButton"
                    @click="getHelp = false"
                    >&times;
                </b-button>
            </template>
            
        </b-modal>

        <b-modal size="xl" v-model="tips" header-class="text-white bg-primary">

            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Navigation Tips</h1>
            </template>           

            <b-card no-body border-variant="white" class="m-3">
                <navigation-tips></navigation-tips>                
            </b-card>

            <template v-slot:modal-footer>
                <b-button variant="primary" @click="tips = false">Close</b-button>
            </template>

            <template v-slot:modal-header-close>
                <b-button
                    variant="primary"
                    class="closeButton"
                    @click="tips = false"
                    >&times;
                </b-button>
            </template>
            
        </b-modal>

    </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SessionManager } from "@/components/utils/utils";
import NavigationTips from "./NavigationTips.vue";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import moment from "moment-timezone";

import { namespace } from "vuex-class";   
import "@/store/modules/common";
const commonState = namespace("Common");

@Component({
    components: {
        NavigationTips,
        LegalAssistanceFaq
    }
})
export default class NavigationTopbar extends Vue {

    @commonState.State
    public userHasStatisticsAccess!: boolean;

    error = "";
    getHelp = false;
    tips = false;
    showLegalAssistance = false;
    showFamilyLawIssueResolutionInfo = false;
    showHelpFillingForms = false;

    mounted() {
        this.getHelp = false;
        this.tips = false;
        this.showLegalAssistance = false;
        this.showFamilyLawIssueResolutionInfo = false;
        this.showHelpFillingForms = false;
    }

    public viewStats() {
        this.$router.push({name: "statistics" })
    }

    get userName() {

        return this.$store.state.Application.userName;
    }

    public logout(isQuickExit) {

        const emptyApplicationRoutes = ["/", "/status", "/serviceLocator"];

        if (emptyApplicationRoutes.indexOf(this.$route.fullPath) == -1) {

            const lastUpdated = moment().format();
            this.$store.commit("Application/setLastUpdated", lastUpdated);
            const application = this.$store.state.Application;
            application.type = Vue.filter("translateTypes")(
                this.$store.state.Application.types
            );

            const applicationId = application.id;
            const header = {
                responseType: "json",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            this.$http.put("/app/" + applicationId + "/", application, header).then(
                res => {
                    this.error = "";
                },
                err => {
                    console.error(err);
                    this.error = err;
                }
            );
        }
        Vue.nextTick().then(() => {

            if (isQuickExit) {
                window.open("http://www.google.ca");
                SessionManager.logoutAndRedirect(this.$store);
            } else SessionManager.logout(this.$store);
        });

    }

    public viewStatus() {

        this.$router.push({ name: "applicant-status" });
    }
}
</script>

<style>
.btn-transparent {
  background-color: transparent !important;
  border-color: #ccc !important;
}
</style>

<style scoped lang="scss">
@import "../styles/common";
    .app-exit + .navbar {
        padding-right: 170px;
    }
    .navbar-brand:not(.logo) {
        flex: 1 1 auto;
    }
    .navbar-extra {
        display: inline-block;
        flex: 1 1 auto;
        text-align: right;
    }
    .navbar .navbar-extra {
        display: inline-block;
        flex: 1 1 auto;
        text-align: right;
    }
    .app-exit,
    .navbar {
        .btn-primary {
            border-color: #ccc;
        }
    }
    #app-exit {
        padding: 8px 15px;
        position: absolute;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 100;
        .btn {
                border-radius: 10rem;
                font-size: 110%;
                padding: 0.5em 1em;
        }
    }
    #app-profile {
        color: $gov-white;
    }

    .help-header {
        color: #036;
    }

    .closeButton {
        background-color: transparent !important;
        color: white;
        border: white;
        font-weight: 700;
        font-size: 2rem;
        padding-top: 0;
        margin-top: 0;
    }
</style>