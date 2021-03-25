<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1 >I need help with the following family law matter:</h1>
        </div>        
        <div>
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525</p>, or contact the <a href='https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F' target="_blank">Justice Access Centre</a><br/><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
            </div>
        </div>
        <div>
            <b-form-group>
                <b-form-radio-group
                v-model="selectedForm"
                v-on:change="onChange($event)"
                name="orders"
                stacked
                >                
                <div class="checkbox-border">
                    <b-form-radio value="parentingArrangements"><div class="checkbox-choices">Parenting arrangements</div>
                    <p>
                        how each guardian will parent their child, including each guardian’s <tooltip title="parental responsibilities" :index="0"/> 
                        for decision making about a child and the <tooltip title="parenting time" :index="0"/> each guardian spends with a child. 
                        Parental responsibilities may be shared or exercised separately. The only thing you can consider in making your parenting
                         arrangements is what is in the best interests of the child.
                    </p>
                    
                    </b-form-radio>
                </div>

                <div class="checkbox-border">
                    <b-form-radio value="childSupport"><div class="checkbox-choices">Child Support</div>
                        <p>
                        the amount of money a parent or guardian pays to another parent or guardian to help care for the child. A child 
                        has the right to be supported by both parents, whether the parents ever lived together, or the parent has ever 
                        lived with the child.
                        </p>
                    </b-form-radio>
                </div>

                <div class="checkbox-border">
                    <b-form-radio value="contactWithChild"><div class="checkbox-choices">Contact with a child</div>
                        <p>
                            time a child spends with someone who is not their guardian. This person could include a parent who is not a 
                            guardian to a child, or other people, like grandparents, elders, aunts and uncles, or a family friend.  
                        </p>
                    </b-form-radio>
                </div>

                <div class="checkbox-border">
                    <b-form-radio value="guardianOfChild"><div class="checkbox-choices">Guardian of a child</div>
                    <p>
                        who is responsible for a child. Only guardians have parental responsibilities and parenting time with a child. 
                        An agreement or order about parenting arrangements can say a child’s guardians share parental responsibilities 
                        or parenting time. Or it can say one guardian is responsible for more of the parenting decisions and has more 
                        of the parenting time with the child.
                    </p>
                    </b-form-radio>
                </div>

                <div class="checkbox-border">
                    <b-form-radio value="spousalSupport"><div class="checkbox-choices">Spousal Support</div>
                        <p>
                            money that one spouse pays to another spouse for their financial support after separation. A person is not 
                            entitled to spousal support in every case. 
                        </p>
                    </b-form-radio>
                </div>
                </b-form-radio-group>
            </b-form-group>
        </div>
      </div>
    </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class FlmSubPathSelection extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
  
    selectedForm = '';
    //returningUser = false
    showLegalAssistance = false
    // preparationInfo = false
    currentStep=0;
    currentPage=0;

    created() {  
        console.log(this.step)      
        if (this.step.result && this.step.result['selectedForm']) {
            this.selectedForm = this.step.result['selectedForm'];
        }
    }

    mounted(){
        const progress = this.selectedForm.length==0? 50 : 100;
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }
  
    public onChange(selectedForm) {        
        this.setSteps(selectedForm);
    }

    public setSteps(selectedForm) {
        console.log(selectedForm)
        if (selectedForm.length > 0) {  
            this.togglePages([1], true);          
            // this.togglePages([2], selectedForm == "parentingArrangements");
            // this.togglePages([2], selectedForm == "childSupport");
            // this.togglePages([2], selectedForm == "contactWithChild");
            // this.togglePages([2], selectedForm == "guardianOfChild");
            // this.togglePages([2], selectedForm == "spousalSupport");
        }
    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public toggleSteps(stepId, activeIndicator) {       
        this.$store.commit("Application/setStepActive", {
            currentStep: stepId,
            active: activeIndicator
        });
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage();
    }

    public onNext() {
        this.UpdateGotoNextStepPage();       
    }   
  
    beforeDestroy() {
        const progress = this.selectedForm.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedForm: this.selectedForm}})
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
