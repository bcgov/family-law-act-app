<template>
    <div v-if="dataReady">
        <!-- <Page 6> -->
        <!-- <Header> -->
        <div>
            <div class="new-page"></div>
            <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
                <div style="flex:1;  margin-right: 10px;">
                    <div style="margin-top: 1rem;"></div>
                    <div style="background: #626262; color: white; font-size: 12pt;">
                        <b>Schedule 5 | Recognizing an Extraprovincial Order
                            other than a support order</b>
                    </div>
                    <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                        <span style="margin-left:105px;margin-top:-40px;"><b>under the rules</b></span>
                    </div>
                    <div
                        style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                        <p>
                            Complete this schedule only if you have an order from another province or territory in Canada
                            for parenting arrangements, contact with a child, guardianship or similar that you would like
                            recognized in British Columbia so that it may be treated as if it were an order made in British
                            Columbia.

                        </p>
                    </div>

                    <!-- <Part 1> -->
                    <div>
                        <div style="margin-top: 1rem;"></div>
                        <div style="background: #626262; color: white; font-size: 11pt;">
                            <b>Part 1 | About the order</b>
                        </div>
                        <div style="margin-top: 1rem;"></div>
                        <div class="resetquestion">
                            <GreyBoxForm style="text-indent:3px; display:inline-block;" textwidth="13rem"
                                beforetext="<b>1.</b> I am applying for <b>recognition of an extraprovincial order</b> made on "
                                hint="Date (dd/mmm/yyyy)" :italicHint="false" :text="outsideBCinfo.orderDate" />
                            <GreyBoxForm style="display:inline;margin-left:0.5rem; text-indent:1px;" textwidth="22rem"
                                beforetext=" at " hint="court location, city, province" :italicHint="false"
                                :text="outsideBCinfo.orderPlace" />
                            <div style="line-height:2rem; text-indent:5px; display:inline;"> about parenting arrangements,
                                contact with a child, guardianship, or an order that is similar in nature.</div>
                        </div>
                        <div style="margin-top: 1rem;"></div>
                        <div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" text="<b>A certified copy of the order is attached</b>" />
                            </div>

                        </div>
                    </div>

                    <!-- <Part 2> -->
                    <div>
                        <div style="margin-top: 1rem;"></div>
                        <div style="background: #626262; color: white; font-size: 11pt;">
                            <b>Part 2 | Other party’s contact information
                            </b>
                        </div>

                        <div>
                            <div style="display:inline; margin-left:0.15rem">
                                The <b>contact information for the other party,</b> as I know it, is:
                            </div>

                            <div v-for="(otherParty, inx) in otherParties" :key="inx"
                                :style="inx == 0 ? 'display:inline;' : 'text-indent:-5px;margin-top:1rem;'">

                                <table class="fullsize">
                                    <tr style="border:1px solid #313132">
                                        <td colspan="3">Address: <div class="answer">{{ otherParty.address.street }}</div>
                                        </td>
                                    </tr>
                                    <tr style="border:1px solid #313132">
                                        <td>City: <div class="answer">{{ otherParty.address.city }}</div>
                                        </td>
                                        <td style="padding-left:50px">Province: <div class="answer">{{
                                            otherParty.address.state }}
                                            </div>
                                        </td>
                                        <td>Postal Code: <div class="answer">{{ otherParty.address.postcode }}</div>
                                        </td>
                                    </tr>
                                    <tr style="border:1px solid #313132">
                                        <td colspan="2">Email: <div class="answer">{{ otherParty.contact.email }}</div>
                                        </td>
                                        <td>Telephone: <div class="answer">{{ otherParty.contact.phone }}</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <div style="width: 20% ">
                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                        <p>
                            <b-icon-book />
                            <br />
                            For more information about how to register a support order from another province or territory in
                            Canada for enforcement in BC, see the guidebook.
                        </p>
                    </div>
                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                        <p>
                            <b-icon-paperclip />
                            <br />
                            You must attach a certified copy of the order to your application for filing. A certified copy
                            is a copy of the original order from the other court that has been endorsed using a stamp or
                            certificate by the court to say it is a true copy of the original. Contact the original court
                            location to get a certified copy.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule5DataInfoType, schedule5outsideBcInfoType } from '@/types/Application/CaseManagement/PDF';

import { namespace } from "vuex-class";
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
const applicationState = namespace("Application");

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBoxForm
    }
})
export default class Schedule5 extends Vue {

    @Prop({ required: true })
    result!: any;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;

    otherParties: schedule5DataInfoType[] = [];
    outsideBCinfo = {} as schedule5outsideBcInfoType;

    mounted() {
        this.dataReady = false;
        this.outsideBCinfo = this.getOtherPartyContactInfo();
        this.dataReady = true;
    }

    public getOtherPartyContactInfo() {
        const emptyParty = {
            name: '',
            lawyer: '',
            dob: '',
            address: { city: "", country: "", postcode: "", state: "", street: "" },
            contact: { email: "", phone: '' }
        } as schedule5DataInfoType;

        this.otherParties = []

        let otherpartySurvey = []
        if (this.result?.contactInformationOtherPartySurvey?.otherPartyInfo && this.$store.state.Application.steps[this.stPgNo.CM._StepNo].pages[this.stPgNo.CM.ContactInformationOtherParty].active) {
            otherpartySurvey = this.result.contactInformationOtherPartySurvey.otherPartyInfo
        }
        else if (this.result?.otherPartyCommonSurvey) {
            otherpartySurvey = this.result.otherPartyCommonSurvey
        }
        else {
            this.otherParties.push(emptyParty, emptyParty)
        }

        for (const chgSurvey of otherpartySurvey) {
            let otherPartyContactInfo = {} as schedule5DataInfoType;
            otherPartyContactInfo.name = Vue.filter('getFullName')(chgSurvey.name);
            otherPartyContactInfo.address = chgSurvey.address ? chgSurvey.address : emptyParty.address;
            otherPartyContactInfo.contact = chgSurvey.contactInfo ? chgSurvey.contactInfo : emptyParty.contact;
            otherPartyContactInfo.lawyer = chgSurvey.lawyer
            otherPartyContactInfo.dob = Vue.filter('beautify-date')(chgSurvey.dob)

            this.otherParties.push(otherPartyContactInfo)
        }


        let outsideBcInfo = {} as schedule5outsideBcInfoType;
        if (this.result?.recognizingAnOrderFromOutsideBcSurvey) {
            const chgSurvey = this.result.recognizingAnOrderFromOutsideBcSurvey;
            outsideBcInfo.orderDate = Vue.filter('beautify-date-blank')(chgSurvey.dateOfOrder)
            outsideBcInfo.orderPlace = chgSurvey.orderPlace
        }
        return outsideBcInfo;
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss"></style> 