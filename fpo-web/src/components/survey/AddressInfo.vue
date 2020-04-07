<template>
  <div class="survey-address">
    <div class="row survey-address-line" v-if="selOptions.length">
      <div class="col-sm-6 form-inline">
        <label class="survey-sublabel">Copy from:</label>
        <select class="form-control ml-2" ref="copyFrom">
          <option value="">(Select Address)</option>
          <option
            v-for="opt in selOptions"
            :key="opt.value"
            :value="opt.value"
            >{{ opt.label }}</option
          >
        </select>
      </div>
    </div>
    <div class="row survey-address-line">
      <div class="col-sm-12">
        <input
          class="form-control"
          placeholder="Street address, for example: 800 Hornby St."
          :id="question.inputId"
          v-model="pendingValue['street']"
          @change="updateValue"
        />
      </div>
    </div>
    <div class="row survey-address-line">
      <div class="col-sm-6">
        <label class="survey-sublabel" :for="question.inputId + '-city'"
          >City / Town</label
        >
        <input
          class="form-control"
          :id="question.inputId + '-city'"
          v-model="pendingValue['city']"
          @change="updateValue"
        />
      </div>
      <div class="col-sm-6">
        <label class="survey-sublabel" :for="question.inputId + '-state'"
          >Province / State / Region</label
        >
        <select
          class="form-control"
          v-model="pendingValue['state']"
          :id="question.inputId + '-state'"
          @change="updateValue"
        >
          <option value="">(Select)</option>
          <option
            v-for="prov of provinceOptions"
            :key="prov.value"
            :value="prov.value"
            >{{ prov.text }}</option
          >
        </select>
      </div>
    </div>
    <div class="row survey-address-line pb-1">
      <div class="col-sm-6">
        <label class="survey-sublabel" :for="question.inputId + '-country'"
          >Country</label
        >
        <select
          class="form-control"
          v-model="pendingValue['country']"
          :id="question.inputId + '-country'"
          @change="updateValue"
        >
          <option value="">(Select)</option>
          <option
            v-for="coun of countryOptions"
            :key="coun.value"
            :value="coun.value"
            >{{ coun.text }}</option
          >
        </select>
      </div>
      <div class="col-sm-6">
        <label class="survey-sublabel" :for="question.inputId + '-postcode'"
          >Postal Code</label
        >
        <input
          class="form-control"
          :id="question.inputId + '-postcode'"
          v-model="pendingValue['postcode']"
          @change="updateValue"
        />
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
      provinceOptions: [
        {
          value: "AB",
          text: "Alberta"
        },
        {
          value: "BC",
          text: "British Columbia"
        },
        {
          value: "MB",
          text: "Manitoba"
        },
        {
          value: "NB",
          text: "New Brunswick"
        },
        {
          value: "NF",
          text: "Newfoundland and Labrador"
        },
        {
          value: "NT",
          text: "Northwest Territories"
        },
        {
          value: "NS",
          text: "Nova Scotia"
        },
        {
          value: "NU",
          text: "Nunavut"
        },
        {
          value: "ON",
          text: "Ontario"
        },
        {
          value: "PE",
          text: "Prince Edward Island"
        },
        {
          value: "QC",
          text: "Quebec"
        },
        {
          value: "SK",
          text: "Saskatchewan"
        },
        {
          value: "YT",
          text: "Yukon"
        }
      ],
      countryOptions: [
        {
          value: "CAN",
          text: "Canada"
        },
        {
          value: "USA",
          text: "USA"
        }
      ],
      selOptions: [],
      pendingValue: this.loadValue(this.question.value),
      value: this.question.value
    };
  },
  methods: {
    prevAddrOptions() {
      const q = this.question;
      const skipName = q.name;
      const survey = q.survey;
      const addrs = [];
      const seen = {};
      let otherQVal;
      for (const page of survey.pages) {
        for (const otherQ of page.questions) {
          if (
            otherQ.getType() === "address" &&
            otherQ.name !== skipName &&
            (otherQVal = otherQ.value)
          ) {
            const parts = [
              otherQVal.street,
              otherQVal.city,
              otherQVal.state,
              otherQVal.country,
              otherQVal.postcode
            ];
            const lbl = parts
              .map(p => p.trim())
              .filter(p => p)
              .join(", ");
            if (lbl && !seen[lbl]) {
              seen[lbl] = 1;
              addrs.push({
                name: otherQ.name,
                label: lbl, // otherQ.referLabel,
                value: Object.assign({}, otherQ.value)
              });
            }
          }
        }
      }
      addrs.sort((a, b) => a.label.localeCompare(b.label));
      return addrs;
    },
    updateValue(_evt) {
      const value = Object.assign({}, this.pendingValue);
      for (let k in value) {
        if (value[k] !== undefined && value[k].length) {
          this.question.value = value;
          return;
        }
      }
      this.question.value = null;
    },
    loadValue(val) {
      val = val || {};
      const pending = {
        street: val.street || "",
        city: val.city || "",
        state: val.state || "BC",
        country: val.country || "CAN",
        postcode: val.postcode || ""
      };
      return pending;
    }
  },
  mounted() {
    const q = this.question;
    q.valueChangedCallback = () => {
      const pending = this.loadValue(q.value);
      this.pendingValue = pending;
      this.value = q.value;
      this.selOptions = this.prevAddrOptions();
    };
    this.selOptions = this.prevAddrOptions();
  }
};
</script>
