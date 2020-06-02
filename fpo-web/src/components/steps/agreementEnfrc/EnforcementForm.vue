<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12">
        <h1>Enforcement og agreements and court orders</h1>
        <h4>
          You need to complete an Application for Enforcement in Form P if you need an order for enforcement of an order, agreement or determination of a parenting 
          coordinator made under the Family Law Act.
        </h4>
        <p>Sometimes parents or guardians don¿t follow written agreements, court orders or a determination of a parenting coordinator. 
          If this happens, you can make an application to the court to enforce the agreement, order or determination, and that the court impose consequences on the 
          person who isn¿t following the agreement, order or determination.</p>
        
        <p>In most cases, it is up to each person to let the court know that they believe the other party is not following the agreement, order or determination. 
          You may want to talk to a lawyer to help you understand, if the other person is not following the agreement, order or determination, what consequences you can 
          ask the court to order, and if there might be another way to solve the problem.</p>
        <p>
          This service does not currently support the completion of these forms. Please click on the link above to access a fillable PDF document which can then be printed
          and filed at the court registry.
        </p>
      </div>
    </div>
  </page-base>
</template>

<script>
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "enforcement-form",
  components: {
    PageBase
  },

  data() {
    return {};
  },
  created() {
  },
  methods: {
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },
    onNext() {
      this.$store.dispatch("application/gotoNextStepPage");
    },
    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step
  },
  beforeDestroy() {
    this.$store.dispatch("application/updateStepResultData", {
      step: this.step,
      data: { enforcementSurvey: null }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
