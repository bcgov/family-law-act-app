<template>
  <page-base>
    <div class="home-content">
    <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
      <div class="row">
        <div class="col-md-12">
          <h1>Submit Your Application Forms</h1>
          <p>You can submit your application through our online service or in person</p>
          <b-card border-variant="light" bg-variant="white" class="mt-3 mb-3">
            <h2>In Person</h2>
            <p>
              Print the forms and file at your local court registry.
            </p>
            <div class="submitSection">
              <div class="submitAlign">
                <center>
                  <a                  
                    v-on:click.prevent="onDownload()"
                    class="btn btn-success btn-lg"
                  >
                    <span class="fa fa-print btn-icon-left"></span>
                    Print Your Application
                  </a>
                </center>
              </div>
            </div>
          </b-card>
          <b-card border-variant="light" bg-variant="white" class="mt-8 mb-3">
            <h2>Online</h2>
            <p>
              Submit the forms electronically. Please add supporting documents to the application. 
            </p>
            
            <b-row>
              <b-col>
                <b-form-group label="Supporting Document:" label-for="supportingDocument">   
                  <b-form-file
                    id="supportingDocument"
                    size="sm"
                    v-model="supportingFile"
                    :state = "selectedSupportingDocumentState?null:false">                    
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here...">
                  </b-form-file>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Document Type:" label-for="documentType"> 
                  <b-form-select
                    id="documentType"
                    v-model="fileType"
                    size="sm"
                    :state = "selectedDocumentTypeState?null:false">
                    <b-form-select-option v-for="docType in fileTypes" :value="docType.value" :key="docType.value">{{docType.text}}</b-form-select-option>  
                  </b-form-select>
                </b-form-group> 
              </b-col>
              <b-col cols="2">
                <b-form-group>
                  <div class="mt-4">
                    <a v-on:click.prevent="addDocument()" class="btn btn-primary btn-md">
                      <span class="fa fa-plus-square"></span>                        
                    </a>
                  </div>
                </b-form-group> 
              </b-col>
            </b-row>

            <b-card border-variant="light" bg-variant="white">
                <h3 class="font-weight-normal"> Supporting Documents</h3>
                <hr class="bg-light" style="height: 2px;"/> 
            </b-card>

            <b-card no-body v-if="!supportingDocuments.length">
                <span class="text-muted ml-4 mb-5">No supporting documents.</span>
            </b-card>

            <b-card v-else no-body border-variant="light" bg-variant="white">
              <b-table  :items="supportingDocuments"
                        :fields="supportingDocumentFields"
                        class="mx-4"
                        borderless
                        striped
                        small 
                        responsive="sm"
                        >
                    <template v-slot:cell(edit)="row">
                      <b-button size="sm" variant="transparent" @click="removeDocument(row.index)">
                        <b-icon-trash-fill font-scale="1.75" variant="danger"></b-icon-trash-fill>                    
                      </b-button>
                    </template>
                    <template v-slot:cell(fileName)="row">                  
                        <span>{{row.item.fileName}}</span>
                    </template>
                    <template v-slot:cell(fileType)="row">                  
                        <span>{{row.item.documentType}}</span>
                    </template>
              </b-table>
            </b-card>

            <b-card border-variant="light" bg-variant="white">
              <div class="submitSection">
                <div class="submitAlign">
                  <center>
                    <a                 
                      v-on:click.prevent="onSubmit()"
                      class="btn btn-success btn-lg"
                    >
                      <span class="fa fa-share-square btn-icon-left"></span>
                      Submit Your Application
                    </a>
                  </center>
                </div>
              </div>
            </b-card> 
          </b-card>
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
  name: "submit-application",
  data() {
    return {
      error: "",
      submissionId: "",
      generateUrlPayload: {},
      supportingFile: null,
      selectedDocumentTypeState: true,
      selectedSupportingDocumentState: true,
      fileType: "",
      fileTypes: [],
      supportingDocumentFields: [
          { key: 'fileName', label: 'File Name'},
          { key: 'fileType', label: 'File Type'},
          { key: 'edit', thClass: 'd-none'}
      ],
      supportingDocuments: [],     
    };
  },
  mounted() {
    const documentTypesJson = require("@/assets/documentTypes.json");
    this.fileTypes = documentTypesJson;
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
          "/survey-print/?name=application-about-a-protection-order",
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
    },
    onSubmit: function() {
      //TODO: get the pdf through new API,


      var bodyFormData = new FormData();
      bodyFormData.append('files', "~/Downloads/fpo.pdf");
      //TODO: add the new api to call submit documents
      this.$http
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
          this.submissionId = res.submissionId;
          this.generateUrl();

        })
        .catch(err => {
          console.error(err);
          this.error = "Sorry, we were unable to submit your form at this time, please try again later.";        
        });
    },
    generateUrl: function() {
      
      this.generateUrlPayload = this.getGenerateUrlPayload();
      //TODO: use new api to generate url
      var eFilingUrl = "";
      // use a new api to:
      //1. add efiling hub access information to the application table
      //2. add the date of submission to the application table
      // redirect user to the generated url
      location.replace(eFilingUrl);
      
    },
    getGenerateUrlPayload: function() {
      //TODO: add the payload elements
      this.generateUrlPayload = {}
    },
    removeDocument: function(index) {
      this.supportingDocuments.splice(index, 1);
    },
    addDocument: function() {
      this.selectedSupportingDocumentState = this.supportingFile? true:false;
      this.selectedDocumentTypeState = this.fileType.length>0? true: false;

      if (this.supportingFile && this.fileType.length>0) {
        const newFile = {
          "fileName": this.supportingFile.name,
          "file": this.supportingFile,
          "documentType": this.fileType
        }
        this.supportingDocuments.push(newFile);
        this.supportingFile = null;
        this.fileType = "";
      }
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
.card {
        border: white;
}
</style>
