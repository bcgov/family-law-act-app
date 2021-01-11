<template>
  <div v-if="pageReady" class="background fill-body" id="landing-page">
    <b-container class="container home-content">
      <div class="row">
        <div class="col-md-12">
          <h1>Apply for a Provincial Court Family Law Act (FLA) Order</h1>
          <div class="intro">
            <p>
              This service will help you fill out the forms needed to apply for family court orders:
            </p>
            <div class="row">
              <div class="col-md-6">
                <ul>
                  <li>Protection Orders</li>
                  <li>Parenting Arrangements</li>
                  <li>Child Support</li>
                  <li>Contact with a child</li>
                  <li>Guardianship</li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul>
                  <li>Spousal Support</li>
                  <li>Case Management</li>
                  <li>Priority Parenting Matters</li>
                  <li>Relocation of a child</li>
                  <li>Enforcement</li>
                </ul>
              </div>
            </div>

            <div class="info-section">
              <div class="row justify-content-center">
                <p>How it Works?</p>
              </div>
              <div class="row how-works-section">
                <div class="col-md-6" style="padding: 0rem 1rem 0rem 2rem;">
                  <p>1. Answer Questions</p>
                  <p>
                    Our free and secure online questionnaire will save your work
                    so you can proceed at your own pace.
                  </p>
                </div>
                <div class="col-md-6" style="padding: 0rem 1rem 0rem 2rem;">
                  <p>2. Print Your Forms OR Submit Your Application electronically</p>
                  <p>
                    Once you're done with the questions, you'll print your
                    papers and file at your local court registry. 
                    OR
                    Submit them through our eFiling system.
                    That's it!
                  </p>
                </div>
              </div>
            </div>

            <div class="info-section mt-3" style="background: #f6e4e6; border-color: #e6d0c9; color: #5a5555;">
              <div class="row justify-content-center text-warning">
                <p class="bg-primary py-0 px-2 mt-2 " style="border-radius: 10px; font-size: 20px;">SAFETY CHECK</p>
              </div>
              <div style="font-size: 18px;" class="mx-3 mb-1">If you think someone is monitoring your devices 
                and you are concerned about your safety, visit this website from a computer, tablet, or 
                smartphone that isn't monitored. Exit from this website and delete it from your browser 
                history. For more information about creating a safety plan for using the internet and email,
                 <a class="text-info" @click="safetyInst = true;">click here</a>.
              </div>
            </div>

            <div v-if="!isLoggedIn">
              <div class="row justify-content-center">
                  <a class="btn btn-success btn-lg survey-button" @click="navigate('new')">
                    <strong>New User</strong> - Let’s get started
                  </a>
              </div>

              <div class="row justify-content-center">
                <a
                  class="btn btn-default btn-md login-button"
                  @click="navigate('returning')"
                >
                  <div>
                    <strong>Returning User?</strong>
                    <br />Log in with BCeID
                  </div>
                </a>
              </div>
            </div>
            <!-- <div v-else class="row justify-content-center">
              <a @click="navigate('returning')"  class="btn btn-default btn-md login-button">
                     <strong>View Applications</strong>
              </a>
            </div> -->
          </div>
        </div>
      </div>
    </b-container>

    <b-modal size="xl" v-model="safetyInst" header-class="bg-white">
      <template v-slot:modal-title>
          <h1 class="mb-0 text-primary">Safety Plan Instructions</h1> 
      </template>
      <div class="m-3">
      <p>If you are in immediate danger, please call 911 immediately.</p>
      <p>A "safety plan" is a term used to describe a plan of actions that can help protect you.</p>
      <p>Creating a safety plan for using the internet and email is important. <b>A computer can be 
        monitored and there are ways for other people to find out what sites you have visited on the internet and to access your email.</b>
      </p>
      <p>Here are some safety tips for using the internet or email:</p>
      <ul>
        <li><b>Use a safer computer/device.</b> If you think someone is monitoring your online activity, try using a 
        computer, tablet or device they don't have access to, for example a computer, tablet or device of a trusted 
        friend, at work, a library, school or an internet café.
        </li>
        <li><b>Change passwords and usernames and/or set up new accounts.</b> Consider creating brand new accounts, 
        such as a new email address. Also consider using a non-identifying username and unique passwords that can't
         easily be guessed.
        </li>
        <li><b>Clear internet browsing history.</b> Clearing your browsing history or using in-browser privacy settings,
         for example "private browsing" or "incognito mode" when you are accessing the internet may help to increase your safety.
        </li>

      </ul>
      <p>
      <a href="https://www2.gov.bc.ca/gov/content?id=18AD0E75BD1C4B0AB99F9C806C734190" target="_blank">VictimLinkBC</a>  can help
      you with a personal safety plan, including safer ways to use technology.
      </p>
      <p>
      <a href="https://www2.gov.bc.ca/gov/content?id=18AD0E75BD1C4B0AB99F9C806C734190" target="_blank">VictimLinkBC</a> 
      is a confidential, multilingual telephone service available 
      24 hours a day, 7 days a week. Victim service workers can provide crisis support, information and referrals to supports 
      including safety planning, victim services, transition
       houses and counselling services. Even with a protection order in place, it is a good idea to have a personal safety plan.
      </p>
      <p>
      Call: 1-800-563-0808 | TTY: 604-875-0885 | Text: 604-863-6381 | Email: <a href='mailto:VictimLinkBC@bc211.ca'>VictimLinkBC@bc211.ca</a>
      </p>
      </div>           
      <template v-slot:modal-footer>
          <b-button variant="primary" @click="safetyInst=false">Close</b-button>
      </template>            
      <template v-slot:modal-header-close>                 
          <b-button variant="outline-dark" class="closeButton" @click="safetyInst=false">&times;</b-button>
      </template>
    </b-modal>
    



  </div>
</template>

<script>
import { SessionManager } from "@/components/utils/utils";
import axios from "axios";
export default {
  name: "LandingPage",
  async mounted() {
    this.pageReady = false;
    this.safetyInst = false;
    await SessionManager.getUserInfo(this.$store);
    if(this.$store.getters["common/getUserId"] !== ""){
      this.isLoggedIn = true
      this.determineUserType()
    }else{
      this.isLoggedIn = false;
      this.pageReady = true;
    } 
  },
  data() {
    return {
      isLoggedIn: false,
      pageReady: false,
      safetyInst: false
    };
  },
  // computed: {
  //   isLoggedIn() {
  //     return this.$store.getters["common/getUserId"] !== "";
  //   }
  // },
  methods: {
    navigate(userType) {
      this.$store.dispatch("application/setUserType", userType).then(() => {
          
        if (userType === "new") {
          this.$router.push({ name: "service-locator" });
        } else if (userType === "returning") {
          this.$router.push({ name: "applicant-status" });
        }
         
      });  
    },
    determineUserType () {
      
      this.$http.get('/app-list/')
      .then((response) => {
        if(response.data.length>0) {
          this.navigate("returning");
        }else{
          this.navigate("new");
        }        
      }).catch((err) => {
        console.log(err)        
      });

    },
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";

.background {
  // background-image: url("../../assets/landing-2.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.home-content {
  padding-bottom: 20px;
  padding-top: 2rem;
  max-width: 950px;
  color: black;
}
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 0.5rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.how-works-section {
  font-size: 18px;
  p {
    margin: 0 0 0 0;
  }
}
.info-section {
  border: 2px solid rgba($gov-pale-grey, 0.3);
  border-radius: 18px;
  background-color: rgba($gov-mid-blue, 0.6);
  margin-top: 0.5rem;
  color: $gov-white;
}
.survey-button {
  color: black;
  border: 2px solid rgba($gov-pale-grey, 0.3);
  margin-top: 2.5rem;
  &:hover,
  &:focus {
    color: rgb(247, 214, 126);
  }
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.login-button {
  //color: $gov-white !important;
  color: black;
  margin-top: 1rem;
  border: 2px solid rgb(231, 231, 231);
  &:hover,
  &:focus {
    color: blue;
  }
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.custom-align-survey-button {
  padding: 0rem 4rem 0rem 17rem;
}
.custom-align-login-button {
  padding: 0rem 4rem 0rem 20rem;
}
</style>
