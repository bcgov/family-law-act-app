<template>
    <div v-if="dataReady">
<!-- <Page 6> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 5 – RECOGNIZING AN EXTRAPROVINCIAL ORDER OTHER THAN A SUPPORT ORDER</b></div>
            <div style="text-align:center;"><b>This is Schedule 5 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for recognition of an extraprovincial order other than a support order.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion">                
                <underline-form style="text-indent:3px; display:inline-block;" textwidth="13rem" beforetext="I am applying for recognition of an extraprovincial order made on" hint="mmm/dd/yyyy" :italicHint="false" :text="outsideBCinfo.orderDate"/>
                <underline-form style="display:inline;margin-left:0.5rem; text-indent:1px;" textwidth="22rem" beforetext=" at " hint="court location, city, province" :italicHint="false" :text="outsideBCinfo.orderPlace"/>
                <div style="line-height:2rem; text-indent:5px; display:inline;"> about parenting arrangements, contact with a child, guardianship, or an order that is similar in nature</div>                
            </section>

<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.15rem">
                    A certified copy of the order is attached
                </div>                
            </section>

<!-- <3> -->
            <section>
                <div style="display:inline; margin-left:0.15rem">
                    The contact information, as I know it, for the other party is:
                </div>

                <div v-for="(otherParty,inx) in otherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                  
                    <table class="fullsize">
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Full name of party: <div class="answer">{{otherParty.name}}</div> </td>
                            <td>Date of birth: <div class="answer">{{otherParty.dob}}</div> </td>
                        </tr>                    
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">Lawyer (if applicable): <div class="answer">{{otherParty.lawyer}}</div></td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer">{{otherParty.address.street}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{otherParty.address.city}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{otherParty.address.state}}</div> </td>
                            <td>Postal Code: <div class="answer">{{otherParty.address.postcode}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td colspan="2">Email: <div class="answer">{{otherParty.contact.email}}</div> </td>                            
                            <td>Telephone: <div class="answer">{{otherParty.contact.phone}}</div> </td>
                        </tr>
                    </table> 
                </div>

            </section>
 
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule5DataInfoType, schedule5outsideBcInfoType } from '@/types/Application/CaseManagement/PDF';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule5 extends Vue {

    @Prop({required:true})
    result!: any;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    dataReady = false;
       
    otherParties: schedule5DataInfoType[]= []
    outsideBCinfo = {} as schedule5outsideBcInfoType;

    mounted(){
        this.dataReady = false;   
        this.outsideBCinfo = this.getOtherPartyContactInfo();       
        this.dataReady = true;        
    }   

    public getOtherPartyContactInfo(){
        const emptyParty = {
            name:'',
            lawyer:'',
            dob: '',
            address:{city: "",country: "",postcode: "",state: "", street: ""},
            contact:{email: "", phone:''}
        } as schedule5DataInfoType;

        this.otherParties = []

        let otherpartySurvey = []
        if(this.result?.contactInformationOtherPartySurvey?.otherPartyInfo && this.$store.state.Application.steps[this.stPgNo.CM._StepNo].pages[this.stPgNo.CM.ContactInformationOtherParty].active){
            otherpartySurvey = this.result.contactInformationOtherPartySurvey.otherPartyInfo
        }
        else if(this.result?.otherPartyCommonSurvey?.otherPartyCommonData)
        {
            otherpartySurvey = this.result.otherPartyCommonSurvey.otherPartyCommonData
        }
        else {
            this.otherParties.push(emptyParty, emptyParty)
        }

        for(const chgSurvey of otherpartySurvey){
            let otherPartyContactInfo = {} as schedule5DataInfoType;
            otherPartyContactInfo.name = Vue.filter('getFullName')(chgSurvey.name);
            otherPartyContactInfo.address = chgSurvey.address? chgSurvey.address:emptyParty.address;
            otherPartyContactInfo.contact = chgSurvey.contactInfo? chgSurvey.contactInfo: emptyParty.contact; 
            otherPartyContactInfo.lawyer = chgSurvey.lawyer
            otherPartyContactInfo.dob = Vue.filter('beautify-date')(chgSurvey.dob)

            this.otherParties.push(otherPartyContactInfo)
        }            
        

        let outsideBcInfo = {} as schedule5outsideBcInfoType;              
        if(this.result?.recognizingAnOrderFromOutsideBcSurvey){
            const chgSurvey = this.result.recognizingAnOrderFromOutsideBcSurvey;
            outsideBcInfo.orderDate = Vue.filter('beautify-date-blank')(chgSurvey.dateOfOrder)
            outsideBcInfo.orderPlace = chgSurvey.orderPlace
        }
        return outsideBcInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 