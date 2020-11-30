<template>
  <b-container class="container home-content" id="result-page">
    <div class="results">
      {{message}}
      <b-row class="custom-row">
        <b-col class="navigation-button-left">
        <b-button
          v-on:click="viewStatus()"
          variant="primary"
          >View Status</b-button
        >
        </b-col>
        <b-col class="navigation-button-right">
          <b-button
            v-on:click="exitApplication()"
            variant="secondary"
            >Exit Application</b-button
          >
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { SessionManager } from '../utils/utils';
export default {
  name: "ResultPage",
  data() {      
    return {
        result: "",
        message: ""      
    };
  },
  methods: {
    viewStatus() {
      this.$router.push({ name: "applicant-status" });
    },
    exitApplication() {
      SessionManager.logoutAndRedirect(this.$store, this.$http);
    }
  },
  mounted() {
      this.result = this.$route.params.result;
      // TODO: based on the information provided by eFiling Hub, add conditional message texts
      if (this.result == "success"){
          this.message = "Your Application has been submitted successfully."
      } else if (this.result == "error") {
          this.message = "An error occured while submitting your application, ...."
      } else if (this.result == "cancel") {
          this.message = "Submission of your application has been canceled."
      }  
  },
  computed: {}
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
.results {
  font-size: 24px;
  line-height: 1.6;
  margin: 4rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.custom-row {
  margin-top: 6rem;
}
.navigation-button-left,
.navigation-button-right {
  display: inline-block;
}
.navigation-button-left {
  margin-right: 6em;
}
</style>
