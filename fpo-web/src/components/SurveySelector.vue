<template>
  <div id="surveyselector" class="app-main">
    <b-container>
      <SurveyComponent
        v-for="(survey, index) in $store.getters.surveyArray"
        v-show="index === $store.getters.surveyIndex"
        v-bind:key="index"
        v-bind:surveyIndex="index"
        v-bind:pageIndex="survey.pageIndex"
      />
    </b-container>
  </div>
</template>

<script>
import SurveyComponent from "./SurveyComponent.vue";

export default {
  name: "SurveySelector",
  data() {
    return {};
  },
  created() {},
  components: {
    SurveyComponent
  },
  methods: {},
  props: {},
  computed: {}
};
</script>
