<template>
  <page-base>
    <div class="home-content">
      <div class="row">
        <div class="col-md-12">
          <h1>Submit Your Application Forms</h1>
          <p>
            Submit the forms electronically.
          </p>
          <div class="submitSection">
            <div class="submitAlign">
              <center>
                <a
                  href="printFPO"
                  v-on:click.prevent="onSubmit()"
                  class="btn btn-success btn-lg"
                >
                  <span class="fa fa-print btn-icon-left"></span>
                  Submit Your Application
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
  name: "efile-application",
  data() {
    return {};
  },

  components: {
    PageBase
  },
  methods: {
    getFPOResultData: function() {
      console.log(this.$store.getters["application/getNavigation"][1].result)
      return this.$store.getters["application/getNavigation"][1].result;
    },
    onSubmit: function() {
      // axios
      //   .post(
      //     "http://localhost:8081/form?name=application-about-a-protection-order",
      //     this.getFPOResultData(),
      //     {
      //       responseType: "blob",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/pdf"
      //       }
      //     }
      //   )
      //   .then(res => {
      //     const blob = res.data;
      //     const link = document.createElement("a");
      //     link.href = URL.createObjectURL(blob);
      //     document.body.appendChild(link);
      //     link.download = "fpo.pdf";
      //     link.click();
      //     setTimeout(() => URL.revokeObjectURL(link.href), 1000);
          this.submitApplicationForm()
        // })
        // .catch(err => {
        //   console.error(err);
        // });
    },
    submitApplicationForm: function() {
      var bodyFormData = new FormData();
      bodyFormData.append('files', "C:/Users/mars_/Downloads/fpo.pdf");

      axios
        .post(
          "http://fla-nginx-proxy-qzaydf-dev.pathfinder.gov.bc.ca/api/submission/documents",
          bodyFormData,
          {
            responseType: "json",
            headers: {
              Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjVDg3bHVwcmhwYmdwNHQtZ3ZIM0U1RHBfNUJEYms1cGtVVHo3Z3ZVUTZZIn0.eyJleHAiOjE1OTg0ODE0NjMsImlhdCI6MTU5ODQ4MTE2MywianRpIjoiNjY5ZGJmYjktNjMyMC00ZGNlLWFiMzMtZGQ0MjExZTk4ZWNkIiwiaXNzIjoiaHR0cHM6Ly9zc28tZGV2LnBhdGhmaW5kZXIuZ292LmJjLmNhL2F1dGgvcmVhbG1zL3F4NjhvYTVjIiwiYXVkIjpbImVmaWxpbmctYXBpIiwiYWNjb3VudCJdLCJzdWIiOiJiZWZlNjM1OS1iNDFmLTQ5NjktYTcyZi01ZGJjYjkzZDlhODgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmbGEiLCJzZXNzaW9uX3N0YXRlIjoiMGJlNzczYTItMzZhOS00MTBkLTgyNWUtMmFlYTg1ZTMwYjA2IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZWZpbGluZy1hcGkiOnsicm9sZXMiOlsiZWZpbGluZy1jbGllbnQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImNzby1zZXJ2aWNlLXR5cGUtY29kZSI6IkRDRkwiLCJjbGllbnRIb3N0IjoiNTAuOTIuMTE5LjI3IiwiY2xpZW50SWQiOiJmbGEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNzby1hcHBsaWNhdGlvbi1jb2RlIjoiRkxBIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWZsYSIsImNsaWVudEFkZHJlc3MiOiI1MC45Mi4xMTkuMjciLCJlbWFpbCI6InNlcnZpY2UtYWNjb3VudC1mbGFAcGxhY2Vob2xkZXIub3JnIn0.RFQNciMI-_RZv8T5HglZiZil4mksWoNGBzVOabT02PY9zFEJGSuSgY4fc17HfPUaqiVr9ritaMC01h8BYHzIeZj-iCg5M0CUXi9QO8lfOYyYPRXXowjOVfKQtWem58z3NQ4RSpfZa5NAaIfQVGByina89hSICZJj-oL2vZxPiVEw3hvJgadBCsh8v9bwsK2LiTEHr8mL_WQPj-loM-xrYxIr6R4CPi1ACDf1JCIwIt8C3Zo9dmEPJZ-_iJS37FsVa9bmf9caRJVTDtDI6c-nhOJ2N-akQ5q64hgAXZJ8t-AD4Esiz0-K78F9XYeY3vTlKlS1wieKa1i_LolLg-AV_w",
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-Transaction-Id": "ca09e538-d34e-11ea-87d0-0242ac130003",
              "X-User-Id": "54546456"
            }
          }
        )
        .then(res => {
          console.log(res)          
        })
        .catch(err => {
          console.error(err);
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
.submitSection {
  border: 2px solid rgba($gov-pale-grey, 0.7);
  border-radius: 18px;
  width: 100%;
}
.submitAlign {
  padding: 20px;
}
</style>
