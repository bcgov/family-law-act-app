<template>
    <b-card v-if="mountedData" style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
        <h2 class="mt-4">{{headerText}}</h2>
        <div> {{message}}
        </div>

        <b-row class="custom-row">
            <b-col class="navigation-button-left">
                <b-button v-on:click="viewStatus()" variant="primary">View Status</b-button>
            </b-col>
            <b-col class="navigation-button-right">
                <b-button v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
            </b-col>
        </b-row>

    </b-card>  
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator"
import moment from 'moment-timezone';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import { SessionManager } from "@/components/utils/utils";

@Component
export default class ResultPage extends Vue {

    result= "";
    message= "";
    headerText = "";
    error = ""; 
    mountedData = false;

    @applicationState.State
    public id!: string;

    @applicationState.Action
    public UpdatePackageNumber!: (newPackageNumber) => void

    @applicationState.Action
    public UpdateEFilingHubLink!: (newEFilingHubLink) => void

    @applicationState.Action
    public UpdateLastFiled!: (newLastFiled) => void
  
    public viewStatus() {
        this.$router.push({ name: "applicant-status" });
    }
    
    public exitApplication() {
        window.open('http://www.google.ca');
        SessionManager.logoutAndRedirect(this.$store);
    }
    
    mounted(){
        this.mountedData = false;
        this.error = "";

        this.result = this.$route.params.result;
        // TODO: based on the information provided by eFiling Hub, add conditional message texts
        if (this.result == "success"){
            this.message = "Your Application has been submitted successfully."
            this.headerText = "Success";
            //TODO: update application with package-number and eFilinkHubLink
            const lastFiled = moment().format();
            this.UpdateLastFiled(lastFiled);
            const packageNumber = "";
            this.UpdatePackageNumber(packageNumber);
            const eFilingHubLink = "";
            this.UpdateEFilingHubLink(eFilingHubLink);
            this.saveApplication();

        } else if (this.result == "error") {
            this.message = "An error occured while submitting your application, ...."
            this.headerText = "Failed"
        } else if (this.result == "cancel") {
            this.message = "Submission of your application has been canceled."
        }
        
        this.mountedData = true;
    }

    public saveApplication() {
         
        const application = this.$store.state.Application;      

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put("/app/"+ this.id + "/", application, header)
        .then(res => {
            this.mountedData = true;
            this.error = "";
        }, err => {
            console.error(err);
            this.error = err;
        }); 
    }

};
</script>

<style scoped lang="scss">
    @import "src/styles/common";

    .custom-row {
    margin-top: 6rem;
    }
    .navigation-button-left,
    .navigation-button-right {
    display: inline-block;
    }
    .navigation-button-left {
    margin-right: 6em;
    }

</style>
