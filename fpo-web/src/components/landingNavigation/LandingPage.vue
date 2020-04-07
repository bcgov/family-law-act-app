<template>
<div class="background fill-body" id="LandingPage">
  <b-container class="container home-content">
    <div class="row">
      <div class="col-md-12">
        <h1>Apply for a Provincial Court Family Law Act (FLA) Order</h1>
        <div class="intro">
          <p>This service will help you fill out forms needed to apply for or respond to applications for family court orders:</p>
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
            <div style="padding: 0rem 4rem 0rem 20rem">How it Works?</div>
            <div class="row how-works-section">
              <div class="col-md-6" style="padding: 0rem 1rem 0rem 2rem">
                <p>1. Answers Questions</p>
                <p>Our free and secure online questionnaire will save your work so you can proceed at your own pace.</p>
              </div>
              <div class="col-md-6" style="padding: 0rem 1rem 0rem 2rem">
                <p>2. Print Your Forms</p>
                <p>Once you're done with the questions, you'll print your papers and file at your local court registry. That's it!</p>
              </div>
            </div>
          </div>

          <div class="row custom-align-survey-button">
            <div class="col-md-12">
              <a class="btn btn-success btn-lg survey-button" @click="navigate('new')">
                <strong>New User</strong> - Let’s get started
              </a>
            </div>
          </div>
         
          <div class="row custom-align-login-button">
            <div class="col-md-12">
              <a class="btn btn-default btn-md login-button" @click="navigate('returning')">
                <strong>Returning User?</strong>
                <br/>Log in with BCeID
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {};
  },
  methods: {
    navigate(userType) {
      this.$store.dispatch('setUserType', userType)
      this.$router.push({name: "login"})
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";

.background {
  width: 100%;
  background-image: url('../../assets/landing.jpg');
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
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.login-button {
  color: $gov-white !important;
  margin-top: 1rem;
  &:hover,
  &:focus {
    color: $gov-white;
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
