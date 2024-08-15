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
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px; text-align: right;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px; text-align: right;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
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
                    <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt;" textwidth="376px"
                        beforetext="" hint="Full name of party" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="yourInfo.name | getFullName" />
                </section>

                <div style="margin-top: 1rem;"></div>
                
                <!-- <2> -->
                <section style="text-indent: 8px;">
                    <div style="display: inline-block;">
                        The <b>other party's full name</b> is
                    </div>
                    <div style="display: inline-block" v-if="result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel.length == 1">
                        <underline-form style="text-indent:4px; display:inline-block; font-size: 9pt; margin-bottom: 1rem;" textwidth="285px" beforetext="" hint="Full name of party/parties" :italicHint="false" textBackgroundColor="#dedede" hintMargin="95px" :text="result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel[0].name | getFullName" />
                    </div>
                    <div style="margin-top: 1rem;" v-if="result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel.length > 1"></div>
                    <div v-if="result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel.length > 1" v-for="otherParty in result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel">
                        <underline-form style="text-indent:4px;display:inline-block; font-size: 9pt; margin-bottom: 1rem;" textwidth="504px" beforetext="" hint="Full name of party/parties" :italicHint="false" textBackgroundColor="#dedede" hintMargin="200px" :text="otherParty.name | getFullName" />
                    </div>
                </section>

                <div style="margin-top: 1rem;"></div>

                <!-- 3 -->
                <section style="text-indent: 8px;">
                    <check-box inline="inline" boxMargin="0" style="margin-left: 4px; display: inline; text-indent: -16px;" :check="acknowledge ? 'yes' : ''"
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
                    <div style="display: inline; font-size: 10pt;">
                        I am notifying the court and the other party/parties that <b>my contact information and
                    address for service of court documents are changed to:</b>
                    </div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.postcode }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>

                    <div style="margin-top: 1rem;"></div>
                
                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 12px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:1px solid #fff;">
                            <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer (if applicable): 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ yourInfo.lawyerName | getFullName}}
                                </div>
                            </td>
                            <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer (if applicable): </td>
                        </tr>
                    </table>
                </section>

                <div style="margin-top: 1rem;"></div>
                
                <!-- 5 -->
                <section style="text-indent: 8px;">
                    <underline-form style="display:inline-block; font-size: 11pt;" textwidth="290px"
                        beforetext="The change is current as of" hint="Date (dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="102px"
                        :text="dateOfAddressChange | beautify-date-mid" />
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
        if (this.result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel?.length > 0) {
            this.otherPartyNames = this.result.addressChangeOtherPartySurvey.otherPartyNamesDynamicPanel
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