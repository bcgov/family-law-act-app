<template>
  <div id="status">
    <b-container class="container home-content">
      <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
      <div class="row">
        <div class="col-12">
          <h1>Previous Applications</h1>
          <div v-if="inProgressApplications.length >0">
            <div v-for="application in inProgressApplications" :key="application.id">
              <div class="row">
                <div class="col-8">
                  <p>{{application}}</p>
                </div>
                <div class="col-4">
                  <button type="button" class="btn btn-primary application-button" @click="resumeApplication(application.id)">Resume</button>
                  <button type="button" class="btn btn-primary application-button" @click="removeApplication(application)">Remove</button>
                </div>
              </div>
              <hr class="section" />
            </div>
          </div>
          <div v-else>
            <p>No applications to display</p>
          </div>
          <div class="row">
            <div class="col-md-5">
              <a
                class="btn btn-success btn-lg register-button"
                @click="navigate('new')"
              >Respond to Documents served on me</a>
            </div>
          </div>
          <!-- <br> -->
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
                    <p>Are you sure you want to delete your <b>{{currentApplication.type}}</b> application?</p>
            </template>
            <button type="button" class="btn btn-danger application-button" @click="confirmRemoveApplication()">Delete</button>         
            <button type="button" class="btn btn-primary application-button" @click="$bvModal.hide('bv-modal-confirm-delete')">Cancel</button>
    </b-modal> 
  </div>
</template>

<script>
import GlobalStore from "@/store";
const store = GlobalStore.getInstance();

export default {
  name: "application-status",
  data() {
    return {
      inProgressApplications: [],
      confirmDelete: false,
      currentApplication: {},
      applicationId: '',
      error: ''
    };
  },
  mounted() {

  },
  methods: {
    openTerms() {
      this.$router.push({name: "terms"})
    },
    beginApplication() {      
      this.$store.dispatch("application/init");
      const application = store.getters["application/getApplication"];
      
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
      // add application Id to store
      this.$store.dispatch("application/setApplicationId", applicationId);
      // navigate to application last step, load application data to view
      // TODO: add GET call to store application information inside json
      // const json = require("/home/marzieh/Desktop/test_state.json");
      // console.log(json)
      // this.$store.dispatch("application/setCurrentApplication", json);
      this.$store.dispatch("common/setExistingApplication", true);      

      this.$router.push({name: "flapp-surveys" })
    },
    removeApplication(application) {
      
      this.currentApplication = application;
      // perform relevant checks (TBD) and if the application can be deleted: open modal to confirm deletion
      this.confirmDelete=true;      
    },
    confirmRemoveApplication() {
      
      // perform DELETE request to delete currentApplication.id
            
    }

  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    // To be fetched from db
    this.inProgressApplications.push(
      {id: 0, type:"sample saved-1"},
      {id: 1, type:"sample saved-2"}
    );
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
