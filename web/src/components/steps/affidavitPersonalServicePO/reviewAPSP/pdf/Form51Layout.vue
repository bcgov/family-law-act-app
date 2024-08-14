<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->
        <div class="form-header-reloc">
            <div style="height: 100px;">
                <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
                <div style="float:left; width:33%">
                    <div style="font-size:13pt;"><b>Electronic Filing Statement</b></div>
                    <div style="font-size:10pt;"><b>FORM 51</b></div>
                    <div>Provincial Court Family Rules</div>
                    <div>Rule 193</div>
                </div>
                <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                    <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
                </div>

                <div style="width: 35%; float:right; font-size: 8pt;">
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding-left: 24px; padding-top: 6px;"> Registry location: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            result.applicationLocation }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding-left: 20px;"> Court file number: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            existingFileNumber ?
                            existingFileNumber : '&nbsp;' }} </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="font-size:9pt">
            <p>
                This Electronic Filing Statement advises the court that the document that is being filed electronically
                shows an original
                signature of the person identified and that the electronic version appears to be a true copy of the original
                paper version.

            </p>
            <div style="border-style: dashed; border-color: black; padding:0.5rem; background: #909090;">
                <b>Please read before completing the form:</b>
                <ul>
                    <li>
                        This form is required only if you are electronically filing an affidavit or other signed document
                        for evidentiary purposes [Rule 193].
                    </li>
                    <li>
                        You must keep the original paper version of the document until the earliest of
                    </li>
                </ul>
                <div style="padding-left: 42px; margin-top: -16px;">
                    <span>i.the date the proceeding, including any appeals, is completed</span> <br>
                    <span>ii.the date the appeal period has expired, if no appeal is filed </span> <br>
                    <span> iii.the date on which a judge orders the paper version be filed</span>
                </div>
            </div>
        </div>
        <!-- <1> -->
        <div style="margin-top: 1rem;"></div>
        <div style="background: #626262; color: white; font-size: 11pt;">
            <b>Electronic Filing Statement</b>
        </div>
        <section>

            <div style="text-indent:5px;display:inline; font-size: 9pt; color:#ababab">
                <i> Select the applicable option and complete the required information</i>
            </div>
            <div class="marginleft2p5vue" style="margin:1rem 0 0 1.5rem;">
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;"
                    :check="isLawyer ? 'yes' : ''" text="I," />
                <grey-box style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="10rem" beforetext=""
                    hint="Full name of lawyer" hintTextColor="hintTextColor" hintindent="40px" :text="isLawyer ? lawyerName : ''" />
                <grey-box style="text-indent:2px;display:inline-block;" textwidth="20rem"
                    beforetext=",am the lawyer for" hint="Full name of party/parties" hintTextColor="hintTextColor" :italicHint="false"
                    :text="isLawyer ? parties : ''" />
            </div>

            <div class="marginleft2p5vue" style="margin:1rem 0 0 1.5rem;">
                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;"
                    :check="!isLawyer ? 'yes' : ''" text="I, " />
                <grey-box style="text-indent:0;margin-left:.25rem;display:inline-block;" textwidth="15rem" beforetext=""
                    hint="Full name of party" hintTextColor="hintTextColor" :text="!isLawyer ? applicant : ''" />
                <div style="display:inline-block;margin-left:1.25rem;">, am not represented by a lawyer</div>
            </div>
        </section>

        <div style="margin-top: 1rem;"></div>

        <!-- <2> -->
        <section>
            <grey-box style="margin-top:0.5rem; text-indent:2px;display:inline-block;" textwidth="32.5rem"
                beforetext="The other party is" hintTextColor="hintTextColor" hint="Full name of the other party/parties" :italicHint="false"
                :text="otherParties" />
        </section>

        <div style="margin-top: 1rem;"></div>
        <!-- <3> -->

        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;">
                I advise as follows:
            </div>
            <div style="margin:0.25rem 0 0 1.5rem;">

                <grey-box style="text-indent:2px;margin-left:0rem;display:inline-block;" textwidth="20rem" beforetext="The" hintTextColor="hintTextColor"
                    hint="Name and identifying description of document" :text="documents" />
                <div style="display:block;margin:0.5rem 0.25rem;">
                    is being submitted for filing electronically <i style="color:#ababab">(add if applicable)</i>
                    on behalf of
                </div>

                <grey-box style="text-indent:2px;margin: 0.5rem 0 0 -1rem;display:inline-block; font-size: 9pt;"
                    textwidth="20rem" beforetext="" hint="Full name of party/parties" hintTextColor="hintTextColor" :italicHint="false"
                    :text="isLawyer ? parties : ''" />
            </div>

        </section>

        <div style="margin-left: 1.5rem; display:inline-block; font-size: 9pt; margin-top: 1rem;">
            The original paper version of the document being submitted for filing electronically
            appears to bear an original signature of the person identified as the signatory and
            I have no reason to believe that the signature on the document is not the signature
            of the identified signatory.
        </div>

        <div style="margin-left: 1.5rem; display:inline-block; font-size: 9pt; margin-top: 1rem;">
            The version of the document that is being submitted for filing electronically appears
            to be a true copy of the original paper version of the document and I have no reason
            to believe that it is not a true copy of the original paper version.
        </div>


        <div
            style="margin:2rem 0 0 1rem; width:96.37%; font-weight:bold; font-size: 16pt; padding:0.5rem;font-family:BCSans">
            <UnderlineForm style="text-indent:2px;display:inline-block;margin:0 5rem 0.5rem 0;" textwidth="12rem" beforetext=""
                hint="Date (dd/mmm/yyyy)" hintTextColor="hintTextColor" text="" hintindent="40px"/> 
            <UnderlineForm style="text-indent:2px;display:inline-block; " textwidth="20rem" beforetext="" hint="Signature" hintTextColor="hintTextColor"
                text=""/>

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { electronicFilingStatementDataInfoType } from '@/types/Application/Affidavit';
import GreyBox from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBox
    }
})

export default class Form51Layout extends Vue {

    @Prop({ required: true })
    result!: any;

    @applicationState.State
    public applicantName!: nameInfoType;

    dataReady = false;

    isLawyer = false;
    lawyerName = '';
    parties = '';
    otherParties = '';
    applicant = '';
    documents = '';

    existingFileNumber = '';

    hintFontSize = "8pt"
    hintTextColor = "#333"

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {
        console.log(this.result)
        this.getDocumentInfo();
        this.getFilingInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
    }

    public getFilingInfo() {

        this.isLawyer = false;
        this.lawyerName = '';
        this.parties = '';
        this.otherParties = '';
        this.applicant = '';

        if (this.result?.electronicFilingStatementApspSurvey) {

            let electronicFilingStatement = {} as electronicFilingStatementDataInfoType;

            electronicFilingStatement = this.result.electronicFilingStatementApspSurvey;

            this.isLawyer = electronicFilingStatement.Lawyer == 'y';

            if (this.isLawyer) {

                this.lawyerName = electronicFilingStatement.ApplicantName ? Vue.filter('getFullName')(electronicFilingStatement.ApplicantName) : '';
                const partiesList = [];
                for (const party of electronicFilingStatement.PartyInfoEfsp) {
                    partiesList.push(Vue.filter('getFullName')(party.name))
                }
                this.parties = partiesList.join(', ')
            } else {
                this.applicant = electronicFilingStatement.ApplicantName ? Vue.filter('getFullName')(electronicFilingStatement.ApplicantName) : '';
            }

            const otherPartiesList = [];
            for (const otherParty of electronicFilingStatement.OtherPartyInfoEfsp) {
                otherPartiesList.push(Vue.filter('getFullName')(otherParty.name))
            }
            this.otherParties = otherPartiesList.join(', ')

        }
    }

    public getDocumentInfo() {

        this.documents = '';

        if (this.result?.apspEfsDocuments?.length > 0) {
            const documentName = this.result.apspEfsDocuments[0].documentName;
            const applicant = Vue.filter('getFullName')(this.result.apspEfsDocuments[0].efsApplicantName);
            this.documents = documentName + ' of ' + applicant;
        }

    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss"></style>