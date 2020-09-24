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
                      borderless
                      striped
                      small 
                      responsive="sm"
                      >
                  <template v-slot:cell(edit)="row">
                    <b-button size="sm" variant="transparent" @click="removeApplication(row.item, row.index)">
                      <b-icon-trash-fill font-scale="1.75" variant="danger"></b-icon-trash-fill>                    
                    </b-button>
                    <b-button size="sm" variant="transparent" @click="resumeApplication(row.item.id)">
                      <b-icon-forward font-scale="1" variant="primary"></b-icon-forward>
                      <b-icon-file-earmark-text font-scale="1.5" variant="primary"></b-icon-file-earmark-text>                    
                    </b-button>
                  </template>
                  <template v-slot:cell(app_type)="row">                  
                      <span>{{row.item.app_type}}</span>
                  </template>
                  <template v-slot:cell(last_updated)="row">                  
                      <span>{{ row.item.last_updated | beautify-date}}</span>
                  </template>
            </b-table>
          </b-card>
          <div class="row">
            <div class="col-md-5">
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

    <b-modal v-model="confirmDelete" id="bv-modal-confirm-delete" hide-footer>
            <template v-slot:modal-title>
                    <h2 class="mb-0">Confirm Delete Application</h2>
                    <p>Are you sure you want to delete your <b>"{{applicationToDelete.app_type}}"</b> application?</p>
            </template>
            <button type="button" class="btn btn-danger application-button" @click="confirmRemoveApplication()">Delete</button>         
            <button type="button" class="btn btn-primary application-button" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</button>
    </b-modal> 
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts";
import GlobalStore from "@/store";
const store = GlobalStore.getInstance();

export default {
  name: "application-status",
  data() {
    return {
      previousApplications: [],
      previousApplicationFields: [
          { key: 'app_type', label: 'Application Type'},
          { key: 'last_updated', label: 'Last Updated'},
          { key: 'edit', thClass: 'd-none'}
      ],
      confirmDelete: false,
      currentApplication: {},
      applicationToDelete: {},
      indexToDelete: -1, 
      applicationId: '',
      error: ''
    };
  },
  mounted() {
    this.loadApplications();
  },
  methods: {
    openTerms() {
      this.$router.push({name: "terms"})
    },
    loadApplications () {
      
      this.$http.get('/app-list/')
      .then((response) => {
        this.previousApplications = response.data;        
      }).catch((err) => {
        //TODO: determine workflow
        console.log(err)
        this.error = err;        
      });

    },
    beginApplication() {   

      this.$store.dispatch("application/init");
      const application = store.getters["application/getApplication"];
      console.log(application)
      this.$http.post(
        "/app/",
        application,
        {
          responseType: "json",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      .then(res => {
        this.applicationId = res.data.app_id;  
        store.dispatch("application/setApplicationId", this.applicationId);
        this.error = "";
        this.$router.push({name: "flapp-surveys" }) 
      })
      .catch(err => {
        console.error(err);
        this.error = err;
      });
    },

    navigate() {
      
    },

    resumeApplication(applicationId) {      
      
      this.$http.get('/app/'+ applicationId)
      .then((response) => {
        const applicationData = response.data

        this.currentApplication.id = applicationId;
        this.currentApplication.allCompleted = applicationData.all_completed;
        this.currentApplication.applicantName = applicationData.applicant_name;
        this.currentApplication.currentStep = applicationData.current_step;
        this.currentApplication.lastUpdate = applicationData.last_updated;
        this.currentApplication.lastPrinted = applicationData.last_printed;
        this.currentApplication.respondentName = applicationData.respondent_name;
        
        this.currentApplication.type = applicationData.app_type;
        this.currentApplication.userId = applicationData.user;
        this.currentApplication.userName = applicationData.user_name;
        this.currentApplication.userType = applicationData.user_type;
        this.currentApplication.steps = applicationData.steps;
        this.$store.dispatch("application/setCurrentApplication", this.currentApplication);
        this.$store.dispatch("common/setExistingApplication", true);      

        this.$router.push({name: "flapp-surveys" })        
      }).catch((err) => {
        //TODO: determine workflow
        console.log(err)
        this.error = err;        
      });
    },

    removeApplication(application, index) {
      console.log(application)
      this.applicationToDelete = application;
      this.indexToDelete = index;
      // TODO: confirm the checks to put in place in order to determine if the application can be deleted: open modal to confirm deletion
      this.confirmDelete=true;
      this.previousApplications      
    },
    confirmRemoveApplication() {
      this.$http.delete('/app/'+ this.applicationToDelete.id)
      .then((response) => {
        console.log(response.data)
        
      }).catch((err) => {
        //TODO: determine workflow
        console.log(err)
        this.error = err;        
      });
      this.confirmDelete=false;
      this.previousApplications.splice(this.indexToDelete, 1);      
    }

  },
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
