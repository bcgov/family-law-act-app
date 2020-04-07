<template>
  <div class="survey-yesno-outer">
    <template v-for="opt of choices">
      <label class="survey-yesno" :key="opt.value">
        <input
          type="radio"
          :name="question.name + '_' + question.id"
          :value="opt.value"
          :checked="value == opt.value"
          @click="checkValue(opt.value, $event.target.checked)"
        />
        <span
          class="survey-yesno-button"
          tabindex="0"
          role="button"
          :id="opt.value === 'y' ? question.inputId : null"
          @keydown.space.prevent="setValue(opt.value)"
          >{{ opt.label }}</span
        >
      </label>
    </template>
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
      choices: [
        { label: "Yes", value: "y", button: null, input: null },
        { label: "No", value: "n", button: null, input: null }
      ],
      titleHtml: null,
      value: this.question.value
    };
  },
  methods: {
    checkValue(val, flag) {
      if (flag) this.setValue(val);
    },
    setValue(val) {
      this.question.value = val;
    },
    toggle() {
      this.question.value = this.question.value === "y" ? "n" : "y";
    }
  },
  mounted() {
    const q = this.question;
    q.valueChangedCallback = () => {
      this.value = q.value;
    };
  }
};
</script>
