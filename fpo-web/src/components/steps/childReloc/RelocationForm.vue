<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12">
        <h1>Relocation of a child</h1>
        <h4>
          You need to complete an Application for Order Prohibiting the Relocation of a Child in Form O if you need an order prohibiting the relocation of a child under s. 69 
          of the Family Law Act.
        </h4>
        <p>Section 69 of the Family Law Act applies if:</p>
        <ul>
          <li>a guardian wants to change the location of their residence or a child's residence that can reasonably be expected to have a significant impact on the child's 
            relationship with another guardian or person having a significant role in the child's life; and</li>
          <li>there is an existing written agreement or court order about parenting arrangements for the child.</li>
        </ul>
        <p>If you were not given written notice of relocation, you can still make an application using this form. 
          You will need to be prepared to tell the court how you know the other guardian is planning to relocate.</p>
        <p>
         An application prohibiting the relocation of a child under s. 69 of the Family Law Act must be filed within 30 days after receiving written notice that the 
         guardian plans to relocate the child [s. 68 of the Family Law Act].
        </p>
        <p>
          This service does not currently support the completion of these forms.  Please click on the link above to access a fillable PDF document which can then be printed 
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
  name: "relocation-form",
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
      data: { childRelocationSurvey: null }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
