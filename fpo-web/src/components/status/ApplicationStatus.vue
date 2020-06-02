<template>
  <div id="status">
    <b-container class="container home-content">
      <div class="row">
        <div class="col-12">
          <h1>Previous Applications</h1>
          <div v-if="inProgressApplications.length >0">
            <div v-for="application in inProgressApplications" :key="application">
              <div class="row">
                <div class="col-8">
                  <p>{{application}}</p>
                </div>
                <div class="col-4">
                  <button type="button" class="btn btn-primary application-button">Resume</button>
                  <button type="button" class="btn btn-primary application-button">Remove</button>
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
  </div>
</template>

<script>
export default {
  name: "application-status",
  data() {
    return {
      inProgressApplications: [],
    };
  },
  methods: {
    openTerms() {
      this.$router.push({name: "terms"})
    },
    beginApplication() {
      this.$router.push({name: "flapp-surveys" })
    },
    navigate() {
      
    }
  },
  created() {
    // To be fetched from db
    this.inProgressApplications.push(
      "sample saved-1",
      "sample saved-2"
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
