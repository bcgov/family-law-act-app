<template>
    <step-base v-bind:step="step">    
        <financial-statement                v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.FinancialStatement" />
        <income-information                 v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.IncomeInformation" />
        <changes-income-fs                  v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ChangesIncomeFS" />
        <income-summary-fs                  v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.IncomeSummaryFS" />
        <disclosure-information-fs          v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.DisclosureInformationFS" />
        <expenses-fs                        v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ExpensesFS" />
        <debts-fs                           v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.DebtsFS" />
        <assets-fs                          v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.AssetsFS" />
        <real-estate-fs                     v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.RealEstateFS" />
        <cars-boats-vehicles-fs             v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.CarsBoatsVehiclesFS" />
        <cash-assets-fs                     v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.CarsBoatsVehiclesFS" />
        <investments-fs                     v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.InvestmentsFS" />
        <loans-credits-fs                   v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.LoansCreditsFS" />
        <other-assets-fs                    v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.OtherAssetsFS" />
        <disposition-assets-fs              v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.DispositionAssetsFS" />
        <income-other-person-household-fs   v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.IncomeOtherPersonHouseholdFS" />
        <contribution-toward-expenses-fs    v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ContributionTowardExpensesFS" />
        <undue-hardship-fs                  v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.UndueHardshipFS" />
        <unusually-high-expenses-fs         v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.UnusuallyHighExpensesFS" />
        <legal-duty-dependent-child-fs      v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.LegalDutyDependentChildFS" />
        <legal-duty-another-person-fs       v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.LegalDutyAnotherPersonFS" />
        <other-circumstances-fs             v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.OtherCircumstancesFS" />
        <affidavit-fs                       v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.AffidavitFS" />        
        <about-affiant-fs                   v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.AboutAffiantFs" />
        <filing-fs                          v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.FilingFS" />
        <electronic-filing-statement-fs     v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ElectronicFilingStatementFS" />
        <review-your-answers-fs             v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ReviewYourAnswersFS"/>
        <preview-forms-fs                   v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.PreviewFormsFS"/>
        <preview-forms-fs-efsp              v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.PreviewFormsFsEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import FinancialStatement from "./FinancialStatement.vue";
import IncomeInformation from "./IncomeInformation.vue";
import ChangesIncomeFs from "./ChangesIncomeFS.vue";
import IncomeSummaryFs from "./IncomeSummaryFS.vue";
import DisclosureInformationFs from "./DisclosureInformationFS.vue";
import ExpensesFs from "./ExpensesFS.vue";
import DebtsFs from "./debtsFSComponent/DebtsFS.vue";
import AssetsFs from "./AssetsFS.vue";
import RealEstateFs from "./realEstateFSComponent/RealEstateFS.vue";
import CarsBoatsVehiclesFs from "./carsBoatsVehiclesFSComponent/CarsBoatsVehiclesFS.vue";
import CashAssetsFs from "./cashAssetsFSComponent/CashAssetsFS.vue";
import InvestmentsFs from "./investmentsFSComponent/InvestmentsFS.vue";
import LoansCreditsFs from "./loansCreditsFSComponent/LoansCreditsFS.vue";
import OtherAssetsFs from "./otherAssetsFSComponent/OtherAssetsFS.vue";
import DispositionAssetsFs from "./DispositionAssetsFS.vue";
import IncomeOtherPersonHouseholdFs from "./incomeOtherPersonHouseholdFSComponent/IncomeOtherPersonHouseholdFS.vue";
import ContributionTowardExpensesFs from "./ContributionTowardExpensesFS.vue";
import UndueHardshipFs from "./undueHardshipFSComponent/UndueHardshipFS.vue";
import UnusuallyHighExpensesFs from "./UnusuallyHighExpensesFS.vue";
import LegalDutyDependentChildFs from "./legalDutyDependentChildFSComponent/LegalDutyDependentChildFS.vue";
import LegalDutyAnotherPersonFs from "./legalDutyAnotherPersonFSComponent/LegalDutyAnotherPersonFS.vue";
import OtherCircumstancesFs from "./OtherCircumstancesFS.vue";
import AffidavitFs from "./AffidavitFS.vue";
import AboutAffiantFs from "./AboutAffiantFS.vue";
import FilingFs from "./FilingFS.vue";
import ElectronicFilingStatementFs from "./ElectronicFilingStatementFS.vue";
import ReviewYourAnswersFs from "./reviewFS/ReviewYourAnswersFS.vue";
import PreviewFormsFs from "./reviewFS/PreviewFormsFS.vue";
import PreviewFormsFsEfsp from "./reviewFS/PreviewFormsFsEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        FinancialStatement,
        IncomeInformation,        
        ChangesIncomeFs,
        IncomeSummaryFs,
        DisclosureInformationFs,
        ExpensesFs,
        DebtsFs,
        AssetsFs,
        RealEstateFs,
        CarsBoatsVehiclesFs,
        CashAssetsFs,
        InvestmentsFs,
        LoansCreditsFs,
        OtherAssetsFs,
        DispositionAssetsFs,
        IncomeOtherPersonHouseholdFs,
        ContributionTowardExpensesFs,
        UndueHardshipFs,
        UnusuallyHighExpensesFs,
        LegalDutyDependentChildFs,
        LegalDutyAnotherPersonFs,
        OtherCircumstancesFs,
        AffidavitFs,
        AboutAffiantFs,       
        FilingFs,
        ElectronicFilingStatementFs,
        ReviewYourAnswersFs,
        PreviewFormsFs,
        PreviewFormsFsEfsp
    }
})
export default class FinancialStatementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
