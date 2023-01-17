<template>
  <div
    class="panel panel-default"
    :class="{
      error: question.messageStyle === 'error' || question.messageStyle === 'redinfo',
      'survey-infotext': question.messageStyle !== 'inline',
      'survey-inlinetext': question.messageStyle === 'inline'
    }"
  >
    <div class="panel-heading">
    </div>
    <div class="panel-body" v-if="bodyHtml" v-html="bodyHtml"></div>
    <div class="row accept-row" v-if="question.isRequired && !value">
      <div class="col-sm-12">
        <button class="btn btn-primary" type="button" @click="toggle">
          <span>Continue</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from "survey-vue";

export default {
  props: {
    question: Question
  },
  data() {
    return {
      bodyHtml: null,
      titleHtml: null,
      value: this.question.value
    };
  },
  methods: {
    setValue(val) {
      this.question.value = val;
    },
    toggle() {
      this.question.value = !this.question.value;
    },
    updateContent() {
      const q = this.question;
      this.titleHtml = q.fullTitle;
      const bodyContent = q.body || "";
      const bodyHtml = q.getMarkdownHtml(bodyContent);
      if (bodyHtml !== null) {
        this.bodyHtml = q.getProcessedHtml(bodyHtml);
      } else {
        this.bodyHtml = q.getProcessedHtml(bodyContent);
      }
    }
  },
  mounted() {
    const q = this.question;
    q.titleChangedCallback = () => {
      this.updateContent();
    };
    q.valueChangedCallback = () => {
      this.value = q.value;
    };
    this.updateContent();
  }
}
</script>
