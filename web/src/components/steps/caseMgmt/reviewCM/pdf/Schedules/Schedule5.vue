<template>
    <div v-if="dataReady">
        <!-- <Page 6> -->
        <!--Header : BEGIN-->
        <div >
    <div class="new-page"></div>
        <div style="width:80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 12pt;">
                <b>Schedule 5 | Recognizing an Extraprovincial Order
                    </b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:105px;margin-top:-40px;"><b>other than a support order</b></span>
            </div> 
            
            <div style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    Complete this schedule only if you have an order from another province or territory in Canada
                            for parenting arrangements, contact with a child, guardianship or similar that you would like
                            recognized in British Columbia so that it may be treated as if it were an order made in British
                            Columbia.

                </p>
        </div>
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about how to register a support order from another province
                    or territory in Canada for enforcement in BC, see the guidebook.  
                </p>
        </div>
    </div> 
        <!--Header : END-->
        <!-- <1> : BEGIN-->
            <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                <b>Part 1 | About the order</b>
            </div>
            <div style=" display:inline;margin-left:15px;">
                                <span style="font-size: 11pt;"><b>1. </b></span>
                                I am applying for <b>recognition of an extraprovincial order</b> made on
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;">
                <table style="margin-left:30px;">
                            <tr>
                            <td><div style="text-align:center;width:120px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:25px;margin-bottom:10px;">{{ outsideBCinfo.orderDate | beautify-date-mid}}</div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Date (dd/mmm/yyyy)</div></div></td>
                            <td><div style="margin-top:-15px;padding-right:5px;padding-left:5px;">at</div></td>
                            <td><div style="text-align:center;width:180px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:25px;margin-bottom:10px;">{{ outsideBCinfo.orderPlace }}</div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Court Location</div></div></td>
                            <td><div style="text-align:center;width:80px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:27px;margin-bottom:10px;"></div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">City</div></div></td>
                            <td><div style="text-align:center;width:100px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:27px;margin-bottom:10px;"></div> <div><div style="margin-left:0px;text-align: center;font-size:7pt;margin-top:-12px;">Province/Territory</div></div></td>
                            </tr>
                </table>    
                <div style="margin-left:30px;margin-top:5px;">
                                about parenting arrangements,
                                contact with a child, guardianship, or an order that is similar in nature.
                </div> 
                <div style="margin-left:25px;margin-top:15px;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" text="<b>A certified copy of the order is attached</b>" />
                </div>                            
            </div>            
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-paperclip />
                    <br />
                    You must attach a certified copy of the order to your application for filing.
                    A certified copy is a copy of the original order from the other court that has been endorsed using a stamp or
                    certificate by the court to say it is a true copy of the original. Contact the original court location to get a certified copy. 
                </p>
        </div>               
    </div> 
        <!-- <1> : END-->
        <!-- <2> : BEGIN-->
            <div >
                
        <div style="width: 80%; float: left; margin-right: 10px;margin-top:15px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                <b>Part 2 | Other party’s contact information</b>
            </div>
            <div style=" display:inline;margin-left:15px;">
                                <span style="font-size: 11pt;"><b>2. </b></span>
                                The <b>contact information for the other party,</b> as I know it, is:
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word;margin-left:15px;">
                <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left:15px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ otherParties[0].address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ otherParties[0].address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ otherParties[0].address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ otherParties[0].address.postcode }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="width:98%;margin-top:0.5 !important; margin-left: 15px; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ otherParties[0].contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ otherParties[0].contact.phone }}</div>
                            </td>
                        </tr>
                    </table>                           
            </div>            
        </div>  
                      
    </div> 
        <!-- <2> : END-->
        
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