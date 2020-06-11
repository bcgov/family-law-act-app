<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <h1>What are you asking for (Orders)?</h1>
        <p>Please select each option you want to ask the court for an order about. You will be asked to give more details later.</p>
        <div>
          <b-form-group>
            <b-form-checkbox-group
              v-model="selected"
              v-on:change="onChange($event)"
              name="orders"
              stacked
            >
              <div class="checkbox-border">
                <b-form-checkbox value="protectionOrder">
                  Protection from family violence
                  <p>
                    When a family member makes another family member feel unsafe, this is called ‘family violence’.
                    A protection order is the order made by a court to help protect one family member from another family member.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="familyLawMatter">
                  Family law matter
                  <p>
                    Family law matters include: parenting arrangements('parental responsibilities' and 'parenting time'), 'child support', 'contact with a child',
                    'guardianship of a child' and 'spousal support'.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="caseMgmt">
                  Case management
                  <p>
                    Case management includes administrative or procedural things that need to be done in a court case (usually by a specific time or in a specific way).
                    Sometimes you need to get a case management order from the court to allow you to do something, or to make someone else do something so that you can continue the court case.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="priotityParenting">
                  Extraordinary parenting matter
                  <p>
                    'Extraordinary parenting matters' are decisions about a child or children that require the agreement of each of the child's guardians or an order from the court and it is
                    priority to get the order before any family law matter order(s). There is a limited list of priority parenting matters. You can ask for other parenting matter orders you may need
                    under family law matters.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="childReloc">
                  Relocation of a child
                  <p>
                    If you have a written agreement or order about parenting arrangements for a child and the other guardian is relocating with a child, you can apply to the court
                    to prohibit the relocation. If you do not have a written agreement or order about parenting arrangements you may need an order about a family law matter or priority
                    parenting matter depending on your circumstances to prevent changes to a child's residence.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="agreementEnfrc">
                  Enforcement of agreements and court orders
                  <p>If you have a written agreement or court order that the other party is not following, you can ask the court to enforce it.</p>
                </b-form-checkbox>
              </div>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    </div>
  </page-base>
</template>

<script>
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "getting-started",
  components: {
    PageBase
  },
  data() {
    return {
      selected: []
    };
  },
  created() {
    if (this.step.result.selectedForms) {
      this.selected = this.step.result.selectedForms;
    }
  },
  methods: {
    onChange: function(event) {
      this.setSteps(event);
    },
    setSteps(event) {
      if (event !== undefined) {
        this.toggleCommonSteps(event.includes("protectionOrder"));
        this.toggleSteps(2, event.includes("protectionOrder"));
        this.toggleSteps(3, event.includes("familyLawMatter"));
        this.toggleSteps(4, event.includes("caseMgmt"));
        this.toggleSteps(5, event.includes("priotityParenting"));
        this.toggleSteps(6, event.includes("childReloc"));
        this.toggleSteps(7, event.includes("agreementEnfrc"));
      }
    },
    toggleSteps(stepId, activeIndicator) {
      if (stepId == 2) {
        this.$store.dispatch("application/setPageActive", {
          currentStep: 0,
          currentPage: 1,
          active: activeIndicator
        });
      } else {
        this.$store.dispatch("application/setStepActive", {
          currentStep: stepId,
          active: activeIndicator
        });
      }
    },
    toggleCommonSteps(activeIndicator) {
      const steps = [1, 8];
      for(let i=0; i<steps.length; i++) {
        this.$store.dispatch("application/setStepActive", {
        currentStep: steps[i],
        active: activeIndicator
      });
      this.$store.dispatch("application/setPageActive", {
        currentStep: steps[i],
        currentPage: 0,
        active: activeIndicator
      });
      }
    },
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
      data: { selectedForms: this.selected }
    });
  }
};
</script>

<style lang="scss">
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}

input {
  padding-left: 20px;
}
</style>
