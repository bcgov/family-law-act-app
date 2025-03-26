<template>
    <div v-if="dataReady">

        <!-- <Page 5> -->
        <!-- <Header> -->
        <div>
            <div class="new-page"></div>
            <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
                <div style="flex:1;  margin-right: 10px;">
                    <div style="margin-top: 1rem;"></div>
                    <div style="background: #626262; color: white; font-size: 12pt;">
                        <b>Schedule 4 | Access to Information
                            Section 242 <i>Family Law Act</i></b>
                    </div>
                    
                    <div
                        style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                        <p>
                            Complete this schedule only if you are a search officer applying for access to information in
                            accordance with section 242 <i>[orders respecting searchable information]</i> of the <i>Family
                                Law
                                Act.</i>

                        </p>
                    </div>
                    <div>
                        <!-- <Part 1> -->
                        <div style="margin-top: 1rem;"></div>
                        <div style="background: #626262; color: white; font-size: 11pt;">
                            <b>Part 1 | About the order</b>
                        </div>
                        <div style="margin-top: 5px;">
                            <div style="display:inline; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                                <span style="font-size: 11pt;"><b>1. </b></span>The <b>details of the order</b> I am applying for are as follows:
                            </div>
                            <div v-if="accessInfo.orderDetail" style="min-height:150px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:34px;">{{accessInfo.orderDetail}}</div>
                            <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:34px;min-height:150px;margin-bottom:10px;"></div> 
                        </div>
                    </div>

                    <!-- <Part 2> -->
                    <div>
                        <div style="margin-top: 1rem;"></div>
                        <div style="background: #626262; color: white; font-size: 11pt;">
                            <b>Part 2 The Facts</b>
                        </div>
                        <div style="margin-top: 5px;">
                            <div style=" display:inline; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                                <span style="font-size: 11pt;"><b>2. </b></span>
                                The <b>facts</b> on which this application is based <b>are as follows:</b>
                            </div>
                            <div v-if="accessInfo.applicationFacts" style="min-height:150px;background-color: #dedede;padding:10px;font-size: 11pt;margin-left:34px;">{{accessInfo.applicationFacts}}</div>
                            <div v-else style="background-color: #dedede;padding:10px;font-size: 11pt;margin-left:34px;min-height:150px;margin-bottom:10px;"></div> 
                       
                        </div>
                    </div>
                </div>

                <div style="width: 20% ">
                    <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; margin-top:24px">
                        <p>
                            <b-icon-info-circle-fill />
                            <br />
                            A search officer is a person appointed under section 236 of the <i>Family Law Act.</i> A search officer can make an application under section 242 of the <i>Family Law Act</i> if a person has refused or not adequately complied with a request under section 239 of the Act.
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
import { schedule4DataInfoType } from '@/types/Application/CaseManagement/PDF';
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";

@Component({
    components: {
        UnderlineForm,
        CheckBox,
        GreyBoxForm
    }
})

export default class Schedule4 extends Vue {

    @Prop({ required: true })
    result!: any;

    dataReady = false;
    accessInfo = {} as schedule4DataInfoType;

    mounted() {
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo() {
        this.accessInfo = this.getAccessToInformation();
    }

    public getAccessToInformation() {
        let accessToInformation = {} as schedule4DataInfoType;

        if (this.result?.requiringAccessToInformationSurvey) {
            const chgSurvey = this.result.requiringAccessToInformationSurvey;
            accessToInformation.officerSearch = chgSurvey.officerSearch
            accessToInformation.orderDetail = chgSurvey.officerSearch == 'y' ? chgSurvey.orderDetail : ''
            accessToInformation.applicationFacts = chgSurvey.officerSearch == 'y' ? chgSurvey.applicationFacts : ''
        }


        return accessToInformation;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss"></style>