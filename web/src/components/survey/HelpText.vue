<template>
  <div
    class="panel panel-default survey-expander"
    :class="{
      'survey-helptext': question.messageStyle === 'box',
      'survey-inlinetext': question.messageStyle !== 'box',
      expanded: value
    }"
  >
    <div class="panel-heading">
      <label class="panel-title" tabindex="0" @keydown.space.prevent="toggle">
        <input
          type="checkbox"
          :checked="value"
          @click="setValue($event.target.checked)"
        />
        <span class="heading-icon fa fa-question-circle"></span>
        <span class="title-text" v-html="titleHtml"></span>
        <span
          class="heading-expand fa"
          :class="value ? 'fa-chevron-up' : 'fa-chevron-down'"
        ></span>
      </label>
    </div>
    <div class="panel-body" v-html="bodyHtml"></div>
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
        // FIXME should use v-text not v-html for this one?
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
};
</script>

<style type="css" scoped>
.panel-title {
  user-select: none;
}
.panel-title > input {
  visibility: hidden;
  width: 0px;
}
</style>
