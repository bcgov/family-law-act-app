<template>
    <!----------------------------------------------------------------  <CHANGE PO>   -------------------------------------------------------->
    <!-- <Page 2> -->
    <!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <ScheduleHeader scheduleNumber="Schedule 2" scheduleTitle="Change an Existing Protection Order" scheduleDescription=""></ScheduleHeader>
            </div>
            <div style="width: 20%;"></div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
            Complete this schedule only if you have an existing protection order that you are applying to change.<br />
            An application to change an existing protection order must be made before the expiry of the order
            that is the subject of the application [s. 187 <i>Family Law Act</i>].
        </div>

        <div style="margin-top: 1rem;"></div>

        <div
            style="float: right;width: 18%; margin-top: -130px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
            <p>
                <b-icon-info-circle-fill />
            <div style="font-size: 9px">A person can make a subsequent application for a protection order after an
                existing order has expired [s. 187 <i>Family Law Act</i>].</div>
            </p>
        </div>

        <!-- <PART 1> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 1 | Existing protection order</b>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <1> -->
        <section class="resetquestion">
            <check-box inline="inline" boxMargin="0" checkbox="" style="display:inline; margin-left:0.5rem;"
                :check="true ? 'yes' : ''" text="" />
            <grey-box-form marginTop="-22px" style="text-indent:0px;display:inline-block;" textwidth="8rem"
                beforetext="There is a <b>protection order made on</b>" hint="(dd/mmm/yyyy)"
                :text="aboutOrder.dateOfPO | beautify-date" />
            that I am applying to change <b>(see attached copy of order)</b>
        </section>

        <div style="margin-top:1rem;"></div>
        <!-- <2> -->
        <section>
            <b>I am</b> the:
            <div style="margin:0.25rem 0 0 1rem;">
                <i>Select all options that apply</i>
                <check-box :check="aboutOrder.kindOfParty.includes('protectedParty') ? 'yes' : ''" text="Protected party" />
                <check-box :check="aboutOrder.kindOfParty.includes('parentGuardian') ? 'yes' : ''"
                    text="Parent or guardian of a protected party" />
                <check-box :check="aboutOrder.kindOfParty.includes('restrainedParty') ? 'yes' : ''"
                    text="Person who the protection order is against" />
            </div>
        </section>

        <div style="margin-top:1rem;"></div>

        <div
            style="float: right;width: 18%; margin-top: -130px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
            <p>
                <b-icon-info-circle-fill />
            <div style="font-size: 9px">The court can shorten or extend the expiration date of a protection order or
                change
                any term in it.</div>
            </p>
        </div>

        <!-- <3> -->
        <section>
            <i style="margin-left:.25rem;">Select only one of the options below and complete the requested
                information</i>
            <div style="margin:0rem 0 0 1rem;">
                <check-box :check="aboutOrder.inCourtForPO == 'y' ? 'yes' : ''"
                    text="I was <b>in court</b> when the protection order was made" />
                <check-box :check="aboutOrder.inCourtForPO == 'n' ? 'yes' : ''"
                    text="I was <b>not in court</b> when the protection order was made because:" />
            </div>
            <div style="margin-left:1rem;">
                <i>Explain why you were not in court when the protection order was made</i>
            </div>
            <div class="answerbox" style="width: 98%;"> {{ aboutOrder.whyNotInCourt ? aboutOrder.whyNotInCourt :
                '&nbsp;'}}</div>
        </section>

        <div style="margin-top:1rem;"></div>

        <div
            style="float: right;width: 18%; margin-top: -130px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
            <p>
                <b-icon-paperclip />
            <div style="font-size: 9px">You must attach a copy of the existing protection order to this application for
                filing.</div>
            </p>
        </div>

        <!-- <PART 2> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 2 | About the protection order</b>
        </div>

        <div style="margin-top: 1rem;"></div>

        <!-- <4> -->
        <section>
            I am applying for the existing protection order to be changed as follows:
            <div class="answerbox" style="width: 98%;"> {{ aboutOrder.whatChangesNeeded ? aboutOrder.whatChangesNeeded :
                '&nbsp;'}}</div>
        </section>

        <div style="margin-top:2rem;"><b>YOUR STORY</b></div>

        <!-- <5> -->
        <section>
            The facts on which this application is based are as follows:
            <i style="display:block; margin:0.25rem 0 0 1rem;">Explain why the order needs to be changed and the facts
                you want the court to consider</i>
            <div class="answerbox" style="width: 98%;"> {{ aboutOrder.whyChangesNeeded ? aboutOrder.whyChangesNeeded :
                '&nbsp;'}}</div>
        </section>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import { schedule2AboutOrderInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components: {
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        ScheduleHeader
    }
})
export default class Schedule2 extends Vue {

    @Prop({ required: true })
    result!: any;

    aboutOrder = {} as schedule2AboutOrderInfoType;

    dataReady = false;

    mounted() {
        this.dataReady = false;
        this.getAboutOrder();
        this.dataReady = true;
    }

    public getAboutOrder() {

        this.aboutOrder = { dateOfPO: '', inCourtForPO: '', whyNotInCourt: '', kindOfParty: [], whatChangesNeeded: '', whyChangesNeeded: '' };

        if (this.result?.aboutSurvey) {
            const about = this.result.aboutSurvey;
            this.aboutOrder.dateOfPO = about.dateOfPO;
            this.aboutOrder.inCourtForPO = about.inCourtForPO;
            this.aboutOrder.whyNotInCourt = about.inCourtForPO == 'n' ? about.whyNotInCourt : '';
            this.aboutOrder.kindOfParty = about.kindofPartyIbPO ? about.kindofPartyIbPO : [];
            this.aboutOrder.whatChangesNeeded = about.whatChangesNeeded;
            this.aboutOrder.whyChangesNeeded = about.whyChangesNeeded;
        }
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss"></style>