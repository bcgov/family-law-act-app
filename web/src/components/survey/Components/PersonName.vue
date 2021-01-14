<template>
  <div class="survey-personname">
    <div class="row">
      <div class="col-sm-4" v-for="field of fields" :key="field.name">
        <label class="survey-sublabel" :for="field.id">{{ field.label }}</label>
        <input
          class="form-control"
          :id="field.id"
          v-model="pendingValue[field.name]"
        />
        <p v-if="field.desc" class="survey-desc small">{{ field.desc }}</p>
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
      fields: this.makeFields(),
      pendingValue: Object.assign({}, this.question.value),
      value: this.question.value
    };
  },
  watch: {
    pendingValue: {
      handler(val) {
        const curVal = this.question.value || {};
        let updVal = {};
        let empty = true;
        let changed = false;
        for (const field of this.fields) {
          const v = (updVal[field.name] = (val[field.name] || "").trim());
          if (v.length) empty = false;
          if ((curVal[field.name] || "") !== v) changed = true;
        }
        if (changed) this.question.value = empty ? null : updVal;
      },
      deep: true
    }
  },
  methods: {
    makeFields() {
      const q = this.question;
      const fields = [
        {
          name: "first",
          label: q.labelFirstName || "First Name",
          id: q.inputId,
          desc: q.descFirstName
        },
        {
          name: "middle",
          label: q.labelMiddleName || "Middle Name(s)",
          id: q.inputId + "-middle",
          desc: q.descMiddleName
        },
        {
          name: "last",
          label: q.labelLastName || "Last Name",
          id: q.inputId + "-last",
          desc: q.descLastName
        }
      ];
      return fields;
    }
  },
  mounted() {
    const q = this.question;
    q.valueChangedCallback = () => {
      this.pendingValue = Object.assign({}, q.value);
      this.value = q.value;
    };
  }
};
</script>
