<template>
  <page-base>
    <div class="home-content">
      <div class="row">
        <div class="col-md-12">
          <h1>Print Your Application Forms</h1>
          <p>Print the forms and file at your local court registry.</p>
          <div class="printSection">
            <div class="printAlign">
              <center>
                <a href="printFPO" v-on:click.prevent="onDownload()" class="btn btn-success btn-lg">
                  <span class="fa fa-print btn-icon-left"></span> Print Your
                      Application
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
import { Page } from 'survey-vue';

export default {
  name: "print-application",
  data() {
    return {};
  },

  components: {
    PageBase
  },
  methods: {
    getFPOResultData: function() {
      return this.$store.getters["application/getNavigation"][1].result;
    },
    onDownload: function() {
      //axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      //axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
      //axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
      axios
        .post('http://localhost:8081/form?name=application-about-a-protection-order', {
        //.post('http://localhost:8083/pdf?filename=fpo.pdf', {
          //responseType: 'blob',
          data: this.getFPOResultData(),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
          }
        })
        .then(res => {

          // let binaryString = res.data;

          // let binaryLen = binaryString.length;

          // let bytes = new Uint8Array(binaryLen);

          // for (let i = 0; i < binaryLen; i++) {
          //   let ascii = binaryString.charCodeAt(i);
          //   bytes[i] = ascii;
          // }

          // console.log("bytes array = " + bytes);

          const blob = new Blob([res.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.download = "fpo.pdf";
          link.click();
          sleep(2000);
          URL.revokeObjectURL(link.href);

          // open PDf in a new window
          // const fileURL = URL.createObjectURL(blob);
          // window.open(fileURL);
        })
        .catch(err => {
          console.log("error = " + err.response);
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
  width: 100%
}
.printAlign {
  padding: 20px;
}
</style>
