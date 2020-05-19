<template>
  <div>
    <slot>Provide page content here</slot>
    <div v-if="!hideNavButtons" class="survey-nav">
      <div v-if="hasPrevStepPage()" class="survey-nav-left">
        <button v-on:click="onPrev()" class="btn btn-primary btn-lg">
          <span class="fa fa-chevron-left btn-icon-left"></span> Previous
        </button>
      </div>
      <div v-if="hasNextStepPage()" class="survey-nav-right">
        <button v-on:click="onNext()" class="btn btn-primary btn-lg" v-bind:class="{disabled: isDisableNext()}" 
          data-toggle="tooltip" data-placement="top" v-bind:title="disableNextText">
          Next <span class="fa fa-chevron-right btn-icon-right"></span> 
        </button>
      </div>
      <!-- <div v-if="canComplete()" class="survey-nav-right">
        <button v-on:click="onComplete()" class="btn btn-success btn-lg">
          <span class="fa fa-check-circle btn-icon-left"></span> Complete
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Page } from "../../models/page";

export default {
  name: "PageBase",
  data() {
    return {
    };
  },
  props: {
    hideNavButtons: Boolean,
    disableNext: Boolean,
    disableNextText: String
  },
  methods: {
    onPrev: function(event) {
      if (this.$listeners && this.$listeners.onPrev) {
        this.$emit('onPrev');
      } else {
        console.log("PageBase.onPrev default action.");
        this.$store.dispatch("application/gotoPrevStepPage");
      }
    },
    onNext: function(event) {
      if (!this.isDisableNext()) {
        if (this.$listeners && this.$listeners.onNext) {  
            this.$emit('onNext');
        } else {
          console.log("PageBase.onNext default action.");
          this.$store.dispatch("application/gotoNextStepPage");
        }
      }
    },
    onComplete: function(event) {
      if (this.$listeners && this.$listeners.onComplete) {  
        this.$emit('onComplete');
      } else {
        console.log("PageBase.onComplete default action.");
        this.$store.dispatch("application/setAllCompleted", true);
      }
    },
    hasPrevStepPage: function() {
      return this.$store.getters["application/getPrevStepPage"] != null;
    },
    hasNextStepPage: function() {
      return this.$store.getters["application/getNextStepPage"] != null;
    },
    canComplete: function() {
      return this.$store.getters["application/getNextStepPage"] == null;
    },
    isDisableNext: function() {
      return this.disableNext;
    }
  },
};
</script>

<style scoped lang="scss">
.btn {
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
