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
                        <div style="float: left; width: 50%; padding-left:24px"> Registry location: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            result.applicationLocation }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding-left:20px;"> Court file number: </div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{
                            existingFileNumber ?
                            existingFileNumber : '&nbsp;' }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
                        <div style="float: left; width: 50%; padding-left:6px;"> Last Name of parties:<br/><i style="color:#ababab; padding-left:30px;">Party 1/ party 2 </i></div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ '&nbsp;' }} </div>
                    </div>
                    <div style="width: 100%; display: inline-block;">
           
                        <div style="float: left; width: 50%; padding-left:14px;"> Document number:<br/><i style="color:#ababab">For registry use only </i></div>
                        <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;">{{ '&nbsp;' }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt; margin-top: 1rem;" textwidth="12rem"
                beforetext="<b>I,</b>" hint="Full name"  hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" :italicHint="true" :text="yourInfo.name | getFullName"
                hintindent="40px" />
            <grey-box style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="6rem" beforetext=" ,"
                hint="Occupation" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" :italicHint="false" :text="yourInfo.occupation" hintindent="40px" />
            <grey-box style="text-indent:2px; font-size: 9pt;" textwidth="10rem" beforetext="of"
                hint="Address of person, City, Province" hintFontSize="hintFontSize" hintTextColor="hintTextColor" hintmargintop="4px" :italicHint="false" :text="address" aftertext=" ," />
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
        <div style="display:block; padding-left:12px;">
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
                    <grey-box style="display:inline-block; font-size: 9pt; margin-top: 1rem;"
                        textwidth="30rem" :beforetext="'<b>EXHIBIT &ldquo;</b>' + exhibit.exhibitName + '&rdquo; :'"
                        hint="" :italicHint="false" :text="exhibit.fileName" />
                </div>
            </div>
        </div>


        <!-- <3> -->
        <div style="padding-top: 12px;">
            <div style="display:inline; font-size: 9pt;">
                <b>3.  </b> The party served was identified to me in this manner:
            </div>

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

            <div style="display:block;">
                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3" style="text-indent: 5px;"
                    :check="idMethod == 'other' ? 'yes' : ''" text="Other<i>(specify):</i>" />
                    <div style="padding-left:8rem; margin-top:-1.5rem">
                        <grey-box v-if="idMethod == 'other'"  style="margin-top:10px; text-indent:0rem;"
                            textwidth="30rem" :text="idMethodComment">
                        </grey-box>
                        <grey-box v-else style="margin-top:10px; text-indent:0rem;" textwidth="30rem"></grey-box>
                    </div>                
            </div>


        </div>
        <!-- <SWEAR > -->
    
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

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBox,
        FormFooterSignature
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
