<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div v-if="returningUser">
          <h1 >I need help with the following family law issues:</h1>          
          <p>Select all that apply.</p>
        </div>
        <div v-else>          
          <h1 >What are you asking for (Orders)?</h1>
          <p>Please select each option you want to ask the court for an order about. You will be asked to give more details later.</p>
        </div>
        <div>
          <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
            <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
            <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
            <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
          </div>
          <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
            Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service'>Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php'>Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525</p>, or contact the <a href='https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F'>Justice Access Centre</a><br/><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap'>Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap'>www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
          </div>
        </div>
        <div>
          <b-form-group>
            <b-form-checkbox-group
              v-model="selected"
              v-on:change="onChange($event)"
              name="orders"
              stacked
            >
              <!-- <div class="checkbox-border" >
                <b-form-checkbox value="protectionOrder" >
                  <div class="checkbox-choices">Protection from family violence</div>
                  <p> -->
              <div class="checkbox-border">
                <b-form-checkbox value="protectionOrder"><div class="checkbox-choices">Protection from family violence</div>
                  <p v-if="returningUser">
                    Applying for a protection order, to change an existing protection order or to terminate
                     an existing protection made under Part 9 of the Family Law Act.
                  </p>
                  <p v-else>
                    When a family member makes another family member feel unsafe, this is called <tooltip title="family violence" index="0" />.
                    A protection order is the order made by a court to help protect one family member from another family member.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="familyLawMatter">  
                  <span v-if="returningUser"><div class="checkbox-choices">Family Law Matters including parenting arrangements, child support, contact with a 
                    child, guardianship of a child and spousal support under the <i>Family Law Act.</i></div>
                    <p>
                      Applying for, or replying to, an application for a new order, to change an order, or to cancel an order about
                       a Family Law Matter.
                    </p>
                  </span>
                  <span v-else><div class="checkbox-choices">Family law matter</div>
                    <p>
                      Family law matters include: parenting arrangements(<tooltip title="parental responsibilities" :index="0"/> and <tooltip title="parenting time" :index="0"/>), <tooltip title="child support" :index="0"/>, <tooltip title="contact with a child" :index="0"/>, 
                      <tooltip title="guardianship of a child" index="0"/> and <tooltip title="spousal support" index="0" />.
                    </p>
                  </span>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="caseMgmt">
                  <div class="checkbox-choices">Case management</div>
                  <p>
                    Case management includes administrative or procedural things that need to be done in a court case (usually by a specific time or in a specific way).
                    Sometimes you need to get a case management order from the court to allow you to do something, or to make someone else do something so that you can continue the court case.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="priotityParenting">
                  <div class="checkbox-choices">Priority parenting matter</div>
                  <p>
                    <tooltip title="Priority parenting matters" :index="0"/> are decisions about a child or children that require the agreement of each of the child's guardians or an order from the court and it is
                    priority to get the order before any family law matter order(s). There is a limited list of priority parenting matters. You can ask for other parenting matter orders you may need
                    under family law matters.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="childReloc">
                  <div class="checkbox-choices">Relocation of a child</div>
                  <p>
                    If you have a written agreement or order about parenting arrangements for a child and the other guardian is relocating with a child, you can apply to the court
                    to prohibit the relocation. If you do not have a written agreement or order about parenting arrangements you may need an order about a family law matter or priority
                    parenting matter depending on your circumstances to prevent changes to a child's residence.
                  </p>
                </b-form-checkbox>
              </div>

              <div class="checkbox-border">
                <b-form-checkbox value="agreementEnfrc">
                  <div class="checkbox-choices">Enforcement of agreements and court orders</div>
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
import GlobalStore from "@/store";

import Tooltip from "./Tooltip.vue"

export default {
  name: "getting-started",
  components: {
    PageBase,
    Tooltip
  },
  data() {
    return {
      selected: [],
      returningUser: false,
      showLegalAssistance: false
    };
  },
  created() {
    // get the user type and if existing user with existing cases, show different
    const store = GlobalStore.getInstance();
    this.returningUser = (store.getters["application/getUserType"] == 'returning');
    if (this.step.result.selectedForms) {
      this.selected = this.step.result.selectedForms;
    }
  },
  methods: {
    onChange: function(event) {
      this.setSteps(event);
    },
    setSteps(event) {
      console.log("GETTING STARTED")
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
    step: Step | Object
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
.checkbox-choices{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
}

input {
  padding-left: 20px;
}
</style>
