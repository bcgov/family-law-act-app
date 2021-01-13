<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <div class="row">
            <div class="col-md-12 order-heading">
                <h1>Family law matter</h1>
                <h4>In the Surrey and Victoria registries, if you need the Provincial Court’s help resolving a <tooltip title="family law matter" index="0"/>, you need to complete a 
                <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa710.pdf?forcedownload=true">Notice to Resolve a Family Law Matter Form A</a>
                and complete the early resolution process before you can make an application for a court order.
                <br/><br/>After you have met the early resolution requirements, you need to complete an <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa712.pdf?forcedownload=true">Application About a Family Law Matter Form C</a>
                if you need an order about any unresolved family law matter.</h4>
                <p>Use this form if you need:</p>
                <ul>
                    <li>a new order about a family law matter, if you have never had an order or agreement about the family law matter</li>
                    <li>to change or cancel all or part of an existing provincial court final order about a family law matter</li>
                    <li>to set aside or replace all or part of an agreement about a family law matter</li>
                </ul>
                <p>Family law matters include: </p>
                <ul>
                    <li>Parenting arrangements including <tooltip :index="0" title='parental responsibilities'/> and <tooltip index="0" title='parenting time'/></li>
                    <li>Child support</li>
                    <li>Contact with a child</li>
                    <li>Guardianship of a child</li>
                    <li>Spousal support</li>
                </ul>
                <p>
                This service does not currently support the completion of these forms. Please click on the link above to access a fillable PDF document which can then be printed and filed at the court registry.
                </p>
            </div>
        </div>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";
import Tooltip from "../get-started/Tooltip.vue"
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase,
        Tooltip
    }
})

export default class FamilyForm extends Vue {
    
    @Prop({required: true})
    step!: Step;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    public onPrev() {
        //this.$store.dispatch("application/gotoPrevStepPage");
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {        
        //this.$store.dispatch("application/gotoNextStepPage");
        this.UpdateGotoNextStepPage()        
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }

  
    beforeDestroy() {
        this.$store.commit("Application/updateStepResultData", {
            step: this.step,
            data: { familyMatterSurvey: null }
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
