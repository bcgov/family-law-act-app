<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Notice of Address Change</b></div>
                <div style="font-size:12pt;"><b>Form 46</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 175</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 30%; float:right;">
                <b-table
                    :items="[{ name: 'REGISTRY LOCATION:', value: result.applicationLocation }, { name: 'COURT FILE NUMBER:', value: existingFileNumber }]"
                    :fields="[{ key: 'name', tdClass: 'border-dark text-center align-middle' }, { key: 'value', tdClass: 'border-dark text-center align-middle' }]"
                    small bordered thead-class="d-none">
                    <template v-slot:cell(name)="data">
                        <div style="font-size:6pt; margin:.1rem 0;">{{ data.value }}</div>
                    </template>
                    <template v-slot:cell(value)="data">
                        <div style="font-size:7pt !important; color:#000;">{{ data.value }}</div>
                    </template>
                </b-table>
            </div>
        </div>

        <div style="font-size: 11pt;">
            This Notice of Address Change provides notice to the court and each party that a party’s 
            address has changed as set out in this document.
        </div>

        <div>
            <div style="width: 80%; float: left; margin-right: 10px;">
                <!-- <Part 1> -->
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 1 | Party information and notice</b>
                </div>

                <!-- 1 -->
                <section style="text-indent: 8px;">
                    <div style="display: inline-block; font-size: 11pt;">
                        <b>My full name</b> is
                    </div>
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="17rem"
                        beforetext="" hint="Full name of party" :italicHint="false" :text="yourInfo.name | getFullName" />
                </section>

                <div style="margin-top: 1rem;"></div>
                
                <!-- <2> -->
                <section style="text-indent: 8px;">
                    <div style="display: inline-block; font-size: 11pt;">
                        The <b>other party's full name</b> is
                    </div>
                    <div style="margin-top: 1rem;"></div>
                    <div v-for="otherParty in result.otherPartySurvey.otherPartyNamesDynamicPanel">
                        <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt; margin-bottom: 1rem;" textwidth="17rem"
                            beforetext="" hint="Full name of party/parties" :italicHint="false" :text="otherParty.name | getFullName" />
                        
                    </div>
                </section>

                <div style="margin-top: 1rem;"></div>

                <!-- 3 -->
                <section style="text-indent: 8px;">
                    <check-box inline="inline" boxMargin="0" style="margin-left: 16px;display: inline; text-indent: -16px;"
                        :check="acknowledge ? 'yes' : ''"
                        text="I understand <b>I need to serve each party</b> with a filed copy of this notice." />
                </section>

                <div style="margin-top: 1rem;"></div>

                <!-- <Part 2> -->
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 | Contact information and address for service</b>
                </div>

                <div style="margin-top: 1rem;"></div>
                    
                <!-- 4 -->
                <section style="text-indent: 8px;">
                    <p style="display: inline;">
                        I am notifying the court and the other party/parties that <b>my contact information and
                    address for service of court documents are changed to:</b>
                    </p>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt;">
                        <tr style="border:1px solid #414142">
                            <td colspan="3">Address: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.street }} </div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td>City: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px">Province: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.state }}</div>
                            </td>
                            <td >Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td >Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>

                    </table>

                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt;">
                        <tr style="border:1px solid #414142; margin-top: 1rem;">
                            <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" >Lawyer (if applicable): </td>
                        </tr>
                    </table>
                </section>

                <div style="margin-top: 1rem;"></div>
                
                <!-- 5 -->
                <section style="text-indent: 8px;">
                    <underline-form style="display:inline-block; font-size: 11pt;" textwidth="17rem"
                        beforetext="The change is current as of" hint="Date (mmm/dd/yyyy)" :italicHint="false"
                        :text="dateOfAddressChange | beautify-date" />
                </section>
            </div>
            <div style="float: right;width: 18%; margin-top: 190px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If your address for service changes, you must file a Notice of Address Change and serve a copy on each other party as soon as possible [Rule 175].
                </p>
            </div>
        </div>
        <div style="margin-top: 1rem;"></div>
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
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';

@Component({
    components: {
        UnderlineForm,
        CheckBox
    }
})

export default class Form46Layout extends Vue {

    @Prop({ required: true })
    result!: any;

    @applicationState.State
    public applicantName!: nameInfoType;

    dataReady = false;

    yourInfo = {} as yourInformationInfoDataInfoType;

    existingFileNumber = '';
    dateOfAddressChange = '';
    otherPartyNames: string[] = [];
    acknowledge = false;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {
        this.yourInfo = this.getYourInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        if (this.result.otherPartySurvey.otherPartyNamesDynamicPanel?.length > 0) {
            this.otherPartyNames = this.result.otherPartySurvey.otherPartyNamesDynamicPanel
                ?.map((namePanel) => `${namePanel?.name?.first ?? ''} ${namePanel?.name?.last ?? ''}`);
        }
        this.acknowledge = this.result.addressChangeNoticeSurvey?.acknowledgement?.length > 0;
    }

    public getYourInfo() {

        if (this.result?.addressChangeSurvey) {
            this.dateOfAddressChange = this.result?.addressChangeSurvey?.ChangeOfAddressDate
            return getYourInformationResults(this.result?.addressChangeSurvey);
        } else {
            return {} as yourInformationInfoDataInfoType;
        }

    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">
.container {
    display: inline;
    position: relative;
    padding: 0px;
    margin: 0px;

}

/* Create a custom checkbox */
.container .checkmark {
    display: inline;
    position: absolute;
    border: 1px solid #000 !important;
    padding: 1rem;
    top: 0;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: #eee;
}
</style>