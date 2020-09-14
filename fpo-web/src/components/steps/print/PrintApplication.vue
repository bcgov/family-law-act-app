<template>
  <page-base>
    <div class="home-content">
    <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
      <div class="row">
        <div class="col-md-12">
          <h1>Print Your Application Forms</h1>
          <p>
            Print the forms and file at your local court registry.
          </p>
          <div class="printSection">
            <div class="printAlign">
              <center>
                <a
                  href="printFPO"
                  v-on:click.prevent="onDownload()"
                  class="btn btn-success btn-lg"
                >
                  <span class="fa fa-print btn-icon-left"></span>
                  Print Your Application
                </a>
              </center>
            </div>
          </div>
        
        
        
        
        </div>
      </div>
    </div>
  </page-base>
</template>

<script>
import { Step } from "@/models/step";
import PageBase from "../PageBase.vue";
import axios from "axios";
import { Page } from "survey-vue";

export default {
  name: "print-application",
  data() {
    return {
      error: ""
    };
  },

  components: {
    PageBase
  },
  methods: {
    getFPOResultData: function() {
      return this.$store.getters["application/getNavigation"][1].result;
    },
    saveApplication: function () {
      const application = this.$store.getters["application/getApplication"]
      if (application.id.length > 0) {
        const applicationId = application.id;
        this.$store.dispatch("common/updateApplication", {applicationId, application});
      }
    },
    onDownload: function() {
      this.saveApplication();
      this.$http
        .post(
          "/api/v1/survey-print/?name=application-about-a-protection-order",
          this.getFPOResultData(),
          {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
        .then(res => {
          const blob = res.data;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.download = "fpo.pdf";
          link.click();
          setTimeout(() => URL.revokeObjectURL(link.href), 1000);
          //TODO: set the lastPrinted value
          this.error = "";
        })
        .catch(err => {
          console.error(err);
          this.error = "Sorry, we were unable to print your form at this time, please try again later.";
        });
    }
  },
  props: {
    step: Step
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
.printSection {
  border: 2px solid rgba($gov-pale-grey, 0.7);
  border-radius: 18px;
  width: 100%;
}
.printAlign {
  padding: 20px;
}
</style>
