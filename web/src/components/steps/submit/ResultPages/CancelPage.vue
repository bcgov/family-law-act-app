<template>
    <b-card 
        style="width:60rem; padding:0 5rem; margin:0 auto; border:1px solid; border-radius:10px;" 
        bg-variant="white" 
        class="mt-4 mb-3">

            <h2 class="mt-4 text-center text-secondary">Canceled</h2>
            <div class="text-center font-weight-bold">Submission of your application has been canceled.</div>
        
            <b-row style="margin-top:5rem;">
                <b-button style="width:12rem; margin-left:1rem;" v-on:click="viewStatus()" variant="primary">Back to the Application Page</b-button>
                <b-button style="width:12rem; margin-left:auto;margin-right:1rem;" v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
            </b-row>

    </b-card>  
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

import { SessionManager } from "@/components/utils/utils";

@Component
export default class CancelPage extends Vue {

    public viewStatus() {
        this.$router.push({ name: "applicant-status" });
    }
    
    public exitApplication() {
        window.open('http://www.google.ca');
        SessionManager.logoutAndRedirect(this.$store);
    }
}
</script>