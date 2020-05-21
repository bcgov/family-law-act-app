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
                <button type="submit" class="btn btn-success btn-lg">
                  <span class="fa fa-print btn-icon-left"></span> Print Your
                      Application
                </button>
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

export default {
  name: "print-application",
  data() {
    return {};
  },

  components: {
    PageBase
  },
  methods: {},
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
