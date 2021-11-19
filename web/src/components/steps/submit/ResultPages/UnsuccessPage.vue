<template>
    <b-card 
        style="width:60rem; padding:0 5rem; margin:0 auto; border:1px solid; border-radius:10px;" 
        bg-variant="white" 
        class="mt-4 mb-3">

            <h2 class="mt-4 text-center text-danger">PROBLEM</h2>
            <p>
                Your documents were not submitted as there was a problem during the submission process. 
                Please try your submission again. 
            </p>

            <p>
                If you continue to experience an issue, please contact CSO Online Support at
                <a href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca</a> 
                for assistance.  Please include the following details in your email:
            </p>
            <ul style="margin-top:-.75rem">
                <li>Approximate date and time of the error</li>
                <li>Any error messages that appeared</li>
                <li>Type of document(s) you were submitting</li>
            </ul>

            <p>
                <b>
                    I am under a deadline and need to submit my documents right away?
                </b>
            </p>
            <ul style="margin-top:-.75rem">
                <li>
                    If you are under a deadline and need to submit your documents as soon as possible, 
                    please select another option for submission of the documents under the Filing Options.
                </li>
            </ul>
                   
            <b-row style="margin-top:4rem;">
                <b-button style="width:12rem; margin-left:1rem;" 
                    v-on:click="viewStatus()" 
                    variant="primary">
                        Back to the Application Page
                </b-button>
                <b-button 
                    style="width:12rem; margin-left:auto;margin-right:1rem;" 
                    v-on:click="resubmitApplication()" 
                    variant="warning" 
                    :disabled="disableResumeApplication">
                        Retry Submission
                </b-button>
            </b-row>
    </b-card>  
</template>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";

import {MigrateStore} from '@/components/status/MigrateStore';
import {RestoreCommonStep} from '@/components/status/RestoreCommonStep';

import {GetFilingLocations} from '@/components/status/GetFilingLocations'

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component
export default class UnsuccessPage extends Vue {

    @Prop({required: true})
    packageInfo!: any;

    @applicationState.Action
    public checkAllCompleted! :() => void

    disableResumeApplication = true;

    mounted(){
        this.disableResumeApplication = true;
        this.getApplicationEfilingStatus()
    }

    public viewStatus() {
        this.$router.push({ name: "applicant-status" });
    }
    
    public resubmitApplication() {
        if(this.packageInfo.fileNumber)
            this.resumeApplication(this.packageInfo.fileNumber)
    }    

    public async resumeApplication(applicationId) { 

        await GetFilingLocations();
        
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data   
            const applicationType = (applicationData.type?.length>0)? Vue.filter('typesToFullnames')(applicationData.type.split(',')):[];
           
            const storeMigrationFn = new MigrateStore()           
            const currentApplication = storeMigrationFn.migrate(applicationData, applicationType, Vue.filter('get-current-version')())

            const comStepFn = new RestoreCommonStep()
            comStepFn.restore(currentApplication)
           
            this.checkAllCompleted();
           
            this.$router.push({name: "flapp-surveys" }) 

        }, err => {
            console.log(err)        
        });
    } 
    
    public getApplicationEfilingStatus() {
   
        this.$http.get('/app-list/')
        .then((response) => {
            
            for (const appJson of response.data) {
                const lastFiled = appJson.last_filed
                const id = appJson.id;
                if(this.packageInfo.fileNumber == id && !lastFiled){
                    this.disableResumeApplication = false;
                    break;
                }
            }
                   
        },(err) => {
               console.log(err)    
        });
    }


}
</script>