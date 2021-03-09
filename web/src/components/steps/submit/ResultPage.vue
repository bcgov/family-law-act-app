<template>
    <b-card v-if="mountedData" style="width:50rem; margin:0 auto; border:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
        <h2 :class="'mt-4 text-center '+headerColor">{{headerText}}</h2>
        <div class="text-center">{{message}}</div>
        <div v-if="packageNumber" class="text-center"> Your package number is 
            <b class="text-success"> {{packageNumber}} </b> . </div>

        <b-row class="mt-5">
            <b-button style="margin-left:1rem;" v-on:click="viewStatus()" variant="primary">View Status</b-button>
            <b-button style="margin-left:auto;margin-right:1rem;" v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
        </b-row>

    </b-card>  
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator"
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import { SessionManager } from "@/components/utils/utils";

@Component
export default class ResultPage extends Vue {

    packageNumber = "";
    message= "";
    headerText = "";
    headerColor= "";
    error = ""; 
    mountedData = false;
        
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

    console.log(this.$route)

        const result = this.$route.params.result;
        const ApplicationId = this.$route.params.id;        
        
        if (result == "success"){
            this.message = "Your Application has been submitted successfully."
            this.headerText = "Success";
            this.headerColor="text-success";
            
            const packageRef = this.$route.query.packageRef
            //console.log(packageRef)
            const packageUrl = atob(String(packageRef))
            //console.log(packageUrl)
            this.packageNumber = packageUrl.substring(packageUrl.lastIndexOf('/')+1)
            //console.log(packageNumber)
            this.saveApplication(ApplicationId, this.packageNumber, packageUrl);

        } else if (result == "error") {
            const packageMessage = String(this.$route.query.message)
            //console.log(packageRef)
            this.message = packageMessage? packageMessage: "An error occured while submitting your application, ...."
            this.headerText = "Failed";
            this.headerColor="text-danger";
        } else if (result == "cancel") {
            this.message = "Submission of your application has been canceled."
            this.headerText = "Canceled";
            this.headerColor="text-secondary";
        }
        
        this.mountedData = true;
    }

    public saveApplication(id, packagenumber, packageurl) {
        
        const data = {
            packageNumber: packagenumber,
            packageUrl: packageurl 
        } 

        const url = "/efiling/"+id+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put(url, data, header)
        .then(res => {                            
            this.error = "";
        }, err => {
            console.error(err);
            this.error = err;
        });    
    }

};
</script>
