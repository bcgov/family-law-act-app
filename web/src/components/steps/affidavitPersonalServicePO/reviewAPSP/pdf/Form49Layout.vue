<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->
        <div class="form-header-reloc">
            <div style="height: 100px;">
                <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
                <div style="float:left; width:33%">
                    <div style="font-size:12pt;"><b>Affidavit of Personal Service</b></div>
                    <div style="font-size:12pt;"><b>of Protection Order</b></div>
                    <div style="font-size:10pt;"><b>FORM 49</b></div>
                    <div>Provincial Court Family Rules</div>
                    <div>Rules 183</div>
                </div>
                <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                    <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
                </div>
                <div style="width: 35%; float:right; font-size: 8pt;">
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            result.applicationLocation }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            existingFileNumber ?
                            existingFileNumber : '&nbsp;' }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding: 2px;"> Last name of parties: <div
                                style="font-size: 6pt; padding-left:56px;">Part 1/ Part 2</div>
                        </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ '&nbsp;' }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding: 2px;"> Document number: <div
                                style="font-size: 6pt; padding-left:16px;">For registry use only</div>
                        </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ '&nbsp;' }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" textwidth="10rem"
                beforetext="<b>I,</b>" hint="Full name" :italicHint="true" :text="yourInfo.name | getFullName"
                hintindent="40px" />
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="8rem" beforetext=","
                hint="Occupation" :italicHint="false" :text="yourInfo.occupation" hintindent="40px" />
            <grey-box style="text-indent:2px;font-size: 9pt;" textwidth="10rem" beforetext="of"
                hint="Address of person, City, Province" :italicHint="false" :text="address" aftertext=" ," />
        </div>

        <div style="text-indent:5px;display:block; font-size: 11pt; margin-top: 2rem; font-weight: 700;">
            SWEAR OR AFFIRM THAT:
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <1> -->

        <p><b> 1. I personally served</b></p>
        <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="40rem" beforetext=""
            hint="Full name of the person served (copy their name from the document you served them)" :italicHint="false"
            :text="servedPersonName" />

        <div style="margin: 0.5rem 0 2rem 1rem;">
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" textwidth="20rem"
                beforetext="<b>on</b>" hint="Date the documents were served (dd/mmm/yyyy) " :italicHint="false"
                :text="serviceDate" />
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" textwidth="14rem"
                beforetext="<b>at</b>" hint="Time the documents were served" :italicHint="false" :text="serviceTime"
                aftertext="<b> a.m./p.m.</b>" />
        </div>
        <div style="margin: 0.5rem 0 2rem 1rem;">
            <grey-box style="text-indent:2px;font-size: 9pt;" textwidth="38rem" beforetext="<b>at</b>"
                hint="(address or location where service took place, city, province)" :italicHint="false"
                :text="serviceAddress" />
        </div>
        <div style="display:block; margin: 0.5rem 0 0 0">
            <b>with a copy of the attached protection order</b> made under Part 9 of the Family Law Act, marked as Exhibit
            “A”
        </div>



        <!-- <2> -->
        <div style="padding-top: 12px;">
            <p><b>2. </b>I<b> also personally served them with</b>a copy of the following document(s) </p>
            <div style="display:block; font-style: italic; margin: 0 0 0 1rem;">
                Indicate each additional document served by marking it with
                an exhibit letter, listing it below, and attaching a copy to the affidavit.
            </div>

            <div v-if="exhibitList.length > 0" style="margin:0.5rem 0 0 1rem;">
                <div v-for="exhibit, inx in exhibitList" :key="inx">
                    <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;"
                        textwidth="30rem" :beforetext="'<b>EXHIBIT </b>' + exhibit.exhibitName + ':'"
                        hint="(name of document)" :italicHint="false" :text="exhibit.fileName" />
                </div>
            </div>
        </div>




        <!-- <3> -->
        <div style="padding-top: 12px;">
            <div style="display:inline; font-size: 9pt;">
                <b>3. </b> The party served was identified to me in this manner:
            </div>

            <div style="display:block; font-style: italic; margin: 0 0 0 1rem;">
                Select only one of the options below
            </div>

            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                    :check="idMethod == 'I know the person' ? 'yes' : ''" text="I know the person" />
            </div>

            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                    :check="idMethod == 'The person served admitted to being this person' ? 'yes' : ''"
                    text="the person served admitted to being this person" />
            </div>

            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                    :check="idMethod == 'other' ? 'yes' : ''" text="Other (specify):" />

                <div v-if="idMethod == 'other'" class="answerbox">{{ idMethodComment }}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </div>


        </div>
        <div class="print-block">

            <!-- <SWEAR > -->

            <div style="margin:1rem 0 0 0">
                <p>Sworn or affirmed before me</p>
                <grey-box marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="12rem"
                    beforetext="at" hint="City" aftertext=", British Columbia" />
            </div>
            <div style="margin:1rem 0 0 0">
                <grey-box marginTop="-22px" style="margin-top:0.2rem; text-indent:3px;display:inline;" textwidth="11.75rem"
                    beforetext="on" hint="Date" text="" />
            </div>

            <div style="margin:2rem 0 0 0">
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block;"></div>
                <div style="height:3rem; width:20rem;border:1px solid #313132; display:inline-block; margin-left:2rem;">
                </div>
            </div>
            <div>
                <div style="width:20rem; display:inline-block; font-size:9pt">A Commissioner for taking affidavits in
                    British Columbia</div>
                <div style="width:20rem; display:inline-block; font-size:9pt; margin-left: 2rem;">Signature</div>
            </div>
            <div style="margin:.5rem 0 0 0">
                <grey-box marginTop="-22px" style="margin-top:0.2rem; text-indent:2px;display:inline;" textwidth="20rem"
                    beforetext="" hint="print name or affix stamp of commissioner" text="" />
            </div>
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
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getLocationInfo, getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { aboutAffiantApspDataInfoType, aboutServiceApspDataInfoType } from '@/types/Application/AffidavitPersonalServicePO';
import GreyBox from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBox
    }
})
export default class Form49Layout extends Vue {

    @Prop({ required: true })
    result!: any;

    @applicationState.State
    public applicantName!: nameInfoType;

    dataReady = false;
    existingFileNumber = '';

    yourInfo = {} as yourInformationInfoDataInfoType;
    address = '';
    servedPersonName = '';
    serviceDate = '';
    serviceTime = '';
    serviceAddress = '';
    exhibitList = [];

    idMethod = '';
    idMethodComment = '';

    mounted() {
        this.dataReady = false;
        console.log(this.result)
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {
        this.getAffiantInfo();
        this.getServiceInfo();
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
    }

    public getAffiantInfo() {

        this.yourInfo = {} as yourInformationInfoDataInfoType;
        this.address = '';

        if (this.result?.aboutAffiantApspSurvey) {

            let aboutAffiant = {} as aboutAffiantApspDataInfoType;
            aboutAffiant = this.result.aboutAffiantApspSurvey;

            this.yourInfo = getYourInformationResults(aboutAffiant);
            const addressInfo = aboutAffiant.ApplicantAddress;

            const addressText = addressInfo.street + ', '
                + addressInfo.city + ', '
                + addressInfo.state + ', '
                + addressInfo.country + ', '
                + addressInfo.postcode;

            this.address = aboutAffiant.inCareOf?.length > 0 ? ('Care of ' + addressText) : addressText;
        }

    }

    public getServiceInfo() {

        this.servedPersonName = '';
        this.serviceDate = '';
        this.serviceTime = '';
        this.serviceAddress = '';
        this.exhibitList = [];

        this.idMethod = '';
        this.idMethodComment = '';

        if (this.result?.aboutServiceApspSurvey) {

            const serviceData: aboutServiceApspDataInfoType = this.result.aboutServiceApspSurvey;

            this.servedPersonName = serviceData.ServedPersonName ? Vue.filter('getFullName')(serviceData.ServedPersonName) : '';

            if (serviceData.dateTimeServed) {
                this.serviceDate = Vue.filter('beautify-date')(serviceData.dateTimeServed);
                this.serviceTime = Vue.filter('convert-date-time24to12')(serviceData.dateTimeServed);
            }

            if (serviceData.locationServed) {

                const addressInfo = serviceData.locationServed
                const addressText = addressInfo.street + ', '
                    + addressInfo.city + ', '
                    + addressInfo.state + ', '
                    + addressInfo.country + ', '
                    + addressInfo.postcode;
                this.serviceAddress = addressText;
            }

            this.exhibitList = serviceData.documentListApsp ? serviceData.documentListApsp : [];

            this.idMethod = serviceData.idMethod ? serviceData.idMethod : '';
            this.idMethodComment = (this.idMethod == 'other' && serviceData.idMethodComment) ? serviceData.idMethodComment : '';

        }

    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss"></style>
