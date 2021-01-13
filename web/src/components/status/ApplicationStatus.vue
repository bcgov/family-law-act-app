<template>
  <div id="status">
    <b-container class="container home-content">
      <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
      <div class="row">
        <div class="col-12">
          <h1>Previous Applications</h1>
          <hr class="bg-light" style="height: 2px;"/>

          <b-card no-body border-variant="white" bg-variant="white" v-if="!previousApplications.length">
                <span class="text-muted ml-4 mb-5">No previous applications.</span>
          </b-card>

          <b-card v-else no-body border-variant="light" bg-variant="white">
            <b-table  :items="previousApplications"
                      :fields="previousApplicationFields"
                      class="mx-4"
                      sort-by="lastUpdated"
                      :sort-desc="true"
                      borderless
                      striped
                      small 
                      responsive="sm"
                      >
                  <template v-slot:cell(edit)="row">
                    <b-button size="sm" variant="transparent" class="my-0 py-0"
                              @click="removeApplication(row.item, row.index)"
                              v-b-tooltip.hover
                                        title="Remove Application">
                              <b-icon-trash-fill font-scale="1.25" variant="danger"></b-icon-trash-fill>                    
                    </b-button>
                    <b-button size="sm" variant="transparent" class="my-0 py-0"
                              @click="resumeApplication(row.item.id)"
                              v-b-tooltip.hover
                                        title="Resume Application">
                              <b-icon-pencil-square font-scale="1.25" variant="primary"></b-icon-pencil-square>                    
                    </b-button>
                  </template>
                  <template v-slot:cell(app_type)="row">                  
                      <span>{{row.item.app_type}}</span>
                  </template>
                  <template v-slot:cell(lastUpdated)="row">                  
                      <span>{{ row.item.lastUpdatedDate | beautify-date-weekday}}</span>
                  </template>
            </b-table>
          </b-card>
          <div class="row">
            <div hidden class="col-md-5">
              <a
                class="btn btn-success btn-lg register-button"
                @click="navigate('new')"
              >Respond to Documents served on me</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <a
                class="btn btn-success btn-lg register-button"
                @click="beginApplication()"
              >Begin NEW Application</a>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div class="row">
            <div class="col-md-5">
              <a class="terms" @click="openTerms()">
                <u>Terms and Conditions</u>
              </a>
            </div>
          </div>
        </div>
      </div>
    </b-container>

    <b-modal v-model="confirmDelete" id="bv-modal-confirm-delete" header-class="bg-warning text-light">
            <b-row v-if="deleteError" id="DeleteError" class="h4 mx-2">
                <b-badge class="mx-1 mt-2"
                    style="width: 20rem;"
                    v-b-tooltip.hover
                    :title="deleteErrorMsgDesc"
                    variant="danger"> {{deleteErrorMsg}}
                    <b-icon class="ml-3"
                        icon = x-square-fill
                        @click="deleteError = false"
                /></b-badge>                    
      </b-row>            
      <template v-slot:modal-title>
          <h2 v-if="allowDeletion" class="mb-0 text-light">Confirm Delete Application</h2>
          <h2 v-else class="mb-0 text-light">Deletion Not Permitted</h2>                   
      </template>
      <h4 v-if="allowDeletion" >Are you sure you want to delete your <b>"{{applicationToDelete.app_type}}"</b> application?</h4>
      <h4 v-else >The deletion of the <b>"{{applicationToDelete.app_type}}"</b> application is not permitted.</h4>
      <template v-slot:modal-footer>
          <b-button v-if="allowDeletion" variant="danger" @click="confirmRemoveApplication()">Confirm</b-button>
          <b-button variant="primary" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</b-button>
      </template>            
      <template v-slot:modal-header-close>                 
          <b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-confirm-delete')"
          >&times;</b-button>
      </template>
    </b-modal> 

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";  
import * as surveyEnv from "@/components/survey-glossary.ts";
import store from "@/store";
import moment from 'moment-timezone';
import {applicationInfoType} from "@/types/Application"

@Component
export default class ApplicationStatus extends Vue {

    previousApplications = []
    previousApplicationFields = [
        { key: 'app_type', label: 'Application Type', sortable:true, tdClass: 'border-top'},
        { key: 'lastUpdated', label: 'Last Updated', sortable:true, tdClass: 'border-top'},
        { key: 'edit', thClass: 'd-none', sortable:false, tdClass: 'border-top'}
    ]
    confirmDelete = false;
    currentApplication = {} as applicationInfoType;
    applicationToDelete = {}
    indexToDelete = -1 
    applicationId = ''
    error = ''
    deleteErrorMsg = ''
    deleteErrorMsgDesc = ''
    deleteError = false
    allowDeletion = true   

    mounted() {
        this.loadApplications();
    }

    public openTerms() {
    this.$router.push({name: "terms"})
    }

    public loadApplications () {
    //TODO: when extending to use throughout the province, the timezone should be changed accordingly
        this.$http.get('/app-list/')
        .then((response) => {
            for (const appJson of response.data) {
                const app = {lastUpdated:0, lastUpdatedDate:'', id:0, app_type:''};
                app.lastUpdated = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").diff('2000-01-01','minutes'):0;
                app.lastUpdatedDate = appJson.last_updated?moment(appJson.last_updated).tz("America/Vancouver").format():'';
                app.id = appJson.id;
                app.app_type = appJson.app_type;
                this.previousApplications.push(app);
            }
            //console.log(this.previousApplications)       
        },(err) => {            
            //console.log(err)
            this.error = err;        
        });
    }

    public beginApplication() {   

        this.$store.commit("Application/init");
        const userId = store.state.Common.userId;
        store.commit("Application/setUserId", userId);

        const lastUpdated = moment().format();
        this.$store.commit("Application/setLastUpdated", lastUpdated);

        const userType = store.state.Application.userType;      
        store.commit("Application/setUserType", userType);

        const application = store.state.Application;
        
        //console.log(application)
        const url = "/app/";
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.post(url, application,header)
        .then(res => {
            this.applicationId = res.data.app_id;  
            store.commit("Application/setApplicationId", this.applicationId);
            this.error = "";
            this.$router.push({name: "flapp-surveys" }) 
        }, err => {
            console.error(err);
            this.error = err;
        });
    }

        // navigate() {
        
        // },
    public resumeApplication(applicationId) {      
    
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {
            const applicationData = response.data

            //console.log(applicationData)
            
            this.currentApplication.id = applicationId;
            this.currentApplication.allCompleted = applicationData.allCompleted;
            this.currentApplication.applicantName = applicationData.applicantName;
            this.currentApplication.currentStep = applicationData.currentStep;
            this.currentApplication.lastUpdate = applicationData.lastUpdated;
            this.currentApplication.lastPrinted = applicationData.lastPrinted;
            this.currentApplication.respondentName = applicationData.respondentName;
            this.currentApplication.protectedPartyName = applicationData.protectedPartyName;
            this.currentApplication.protectedChildName = applicationData.protectedChildName;
            this.currentApplication.applicationLocation = applicationData.applicationLocation;
            
            this.currentApplication.type = applicationData.type;
            this.currentApplication.userId = applicationData.user;
            this.currentApplication.userName = applicationData.userName;
            this.currentApplication.userType = applicationData.userType;        
            this.currentApplication.steps = applicationData.steps;
            this.$store.commit("Application/setCurrentApplication", this.currentApplication);
            this.$store.commit("Common/setExistingApplication", true);      

            this.$router.push({name: "flapp-surveys" })        
        }, err => {
            //console.log(err)
            this.error = err;        
        });
    }   

    public removeApplication(application, index) {
        this.deleteErrorMsg = '';
        this.deleteErrorMsgDesc = '';
        this.deleteError = false;
        //console.log(application)
        this.applicationToDelete = application;
        this.indexToDelete = index;
        this.determineIsDeletionAllowed();         
    }

    public determineIsDeletionAllowed() {
        // TODO: confirm the checks to put in place in order to determine if the application can be deleted: open modal to confirm deletion      
        this.allowDeletion = true;
        this.confirmDelete=true;  

    }

    public confirmRemoveApplication() {
        this.$http.delete('/app/'+ this.applicationToDelete['id'] + '/')
        .then((response) => {
            //console.log(response.data)
            
            var indexToDelete = this.previousApplications.findIndex((app) =>{if(app.id == this.applicationToDelete['id'])return true});
            if(indexToDelete>=0)this.previousApplications.splice(indexToDelete, 1);  
            
        },err => {
            const errMsg = err.response.data.error;
                    //console.log(err.response)
            this.deleteErrorMsg = errMsg.slice(0,60) + (errMsg.length>60?' ...':'');
            this.deleteErrorMsgDesc = errMsg;
            this.deleteError = true;            
        });
        this.confirmDelete=false;  
    }


    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
  padding-bottom: 20px;
  padding-top: 2rem;
  max-width: 950px;
  color: black;
}
hr.section {
  border: 0.5px solid $gov-mid-blue;
  margin-bottom: 1.5rem;
}
.section-heading {
  color: $gov-mid-blue;
  font-weight: 500;
  padding: 0rem 2rem 0rem 2rem;
}
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 0.5rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.loginInfo-section {
  margin-top: 2.5rem;
}
.register-button {
  color: $gov-white !important;
  border: 2px solid rgba($gov-mid-blue, 0.3);
  margin-top: 2.5rem;
  width: 100%;
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.wrapper {
  position: relative;
  padding-left: 8rem;
  width: 30px;
  height: 200px;
  margin: 10px;
}

.application-button {
  margin-right: 2rem;
}

.terms{
  color: $gov-mid-blue;
}
</style>
