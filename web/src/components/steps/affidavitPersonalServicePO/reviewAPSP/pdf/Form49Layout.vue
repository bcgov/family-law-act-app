<template>
    <div v-if="dataReady">

        <!-- <Page 1> -->
        <!-- <HEADER> -->

        <FormHeader :headerTableData="[
            {value: result.applicationLocation}, 
            {value: existingFileNumber}, 
            {value: 'otherPartyNames'}, 
            {value: ''}]"
            formName="Affidavit of Personal Service of Protection Order"
            formNumber="FORM 49"
            formRuleNumber="Rules 183"
            ruleFontSize="10pt"
        ></FormHeader>

        <div style="margin-bottom: 1em;"></div>

        <div>
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="22rem"
                beforetext="<b>I,</b>" hint="Full name"  hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" :italicHint="true" :text="yourInfo.name | getFullName"
                hintindent="130px" />
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="15rem" beforetext=" ,"
                hint="Occupation" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" :italicHint="false" :text="yourInfo.occupation" hintindent="40px" />
                <div style="margin: 1.5rem 0;">          
                <grey-box style="text-indent:2px; font-size: 9pt;" textwidth="37.5rem" beforetext="of"
                hint="Address of person, City, Province" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" hintindent="150px" :italicHint="false" :text="address" aftertext=" ," /> 
            </div>

        </div>

        <div style="display:block; font-size: 11pt; margin-top: 2rem; font-weight: 700;">
            SWEAR OR AFFIRM THAT:
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <1> -->

        <p><b> 1. I personally served</b></p>
        <grey-box style="text-indent:14px;display:inline-block; font-size: 9pt; " textwidth="40rem" beforetext=""
            hint="Full name of the person served (copy their name from the document you served them)" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" hintindent="2px" :italicHint="false"
            :text="servedPersonName" />

        <div style="margin: 0.5rem 0 2rem 2rem;">
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" textwidth="18rem"
                beforetext="<b>on</b>" hint="Date the documents were served (dd/mmm/yyyy)" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" hintindent="2px" :italicHint="false"
                :text="serviceDate" />
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;margin-top: 1rem;" textwidth="12rem"
                beforetext="<b>at</b>" hint="Time the documents were served" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" hintindent="2px" :italicHint="false" :text="serviceTime"
                aftertext="<b> a.m./p.m.</b>" />
        </div>
        <div style="margin: 0.5rem 0 2rem 2rem;">
            <grey-box style="text-indent:2px;font-size: 9pt;" textwidth="38rem" beforetext="<b>at</b>"
                hint="Street address or location where service took place, city, province" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" hintindent="2px"  :italicHint="false"
                :text="serviceAddress" />
        </div>
        <div style="display:block; padding-left:10px;">
            <b>with a copy of the attached protection order</b> made under Part 9 of the <i>Family Law Act,</i> marked as Exhibit
            “A”.
        </div>

        <!-- <2> -->
        <div style="padding-top: 12px;">
            <p><b>2.  </b>I<b> also personally served them with</b> a copy of the following document(s): <br>
                <i style="display:block; padding-left:15px; color:#ababab"> Indicate each additional document served by marking it with
                an exhibit letter, listing it below, and attaching a copy to the affidavit.</i>
            </p>

            <div v-if="exhibitList.length > 0" style="margin: 0 0 0 1rem;">
                <div v-for="exhibit, inx in exhibitList" :key="inx">
                    <grey-box style="display:inline-block; font-size: 9pt; margin-top: 0.5rem;"
                        textwidth="30rem" :beforetext="'<b>EXHIBIT &ldquo;</b>' + exhibit.exhibitName + '&rdquo; :'"
                        hint="" :italicHint="false" :text="exhibit.fileName" />
                </div>
            </div>
        </div>


        <!-- <3> -->
        <div style="display:inline; font-size: 12pt;">
            <b>3.  </b> The party served was identified to me in this manner:
        </div>
        <div style="padding-top: 12px; margin-left: 10px;">
            <div style="display:block; font-style: italic; color:#ababab">
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

            <div style="page-break-after: always"></div>

            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                    :check="idMethod == 'other' ? 'yes' : ''" text="Other<i style='color:#ababab'>(specify):</i>" />
                    <div style="padding-left:8rem; margin-top:-1.5rem">
                        <grey-box v-if="idMethod == 'other'"  style="margin-top:10px; text-indent:0rem;"
                            textwidth="30rem" :text="idMethodComment" hint="" beforetext="">
                        </grey-box>
                        <grey-box v-else style="margin-top:10px; text-indent:0rem;" textwidth="30rem" text="" hint="" beforetext=""></grey-box>
                    </div>                
            </div>
        </div>
        <!-- <SWEAR > -->

        <div style="margin-top: 2em;"></div>
    
        <FormFooterSignature></FormFooterSignature>

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
import FormFooterSignature from '@/components/utils/PopulateForms/components/FormFooterSignature.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBox,
        FormFooterSignature,
        FormHeader
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

    hintFontSize = "8pt"
    hintTextColor = "#333"

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
