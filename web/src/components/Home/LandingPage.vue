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
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SessionManager } from "@/components/utils/utils";

@Component
export default class LandingPage extends Vue {
    
    isLoggedIn= false
    pageReady = false
      
      async mounted() {
        this.pageReady = false;
        await SessionManager.getUserInfo(this.$store);
        if(this.$store.state.Common.userId !== ""){
            this.isLoggedIn = true
            this.determineUserType()
        }else{
            this.isLoggedIn = false;
            this.pageReady = true;
        } 
    }
  
    public navigate(userType) {

        this.$store.commit("Application/setUserType", userType);          
        if (userType === "new") {
              this.$router.push({ name: "service-locator" });
        } else if (userType === "returning") {
              this.$router.push({ name: "applicant-status" });
        }  
    }
    
    public determineUserType () {
      
        this.$http.get('/app-list/')
        .then((response) => {
            if(response.data.length>0) {
                this.navigate("returning");
            }else{
                this.navigate("new");
            }        
        
        },(err) => console.log(err));
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
