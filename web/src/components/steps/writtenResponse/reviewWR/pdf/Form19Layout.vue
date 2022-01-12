<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div class="form-header-wr">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Written Response to Application</b></div>

                <div style="margin:0.25rem 0 0.5rem 0;font-size: 9pt;" >
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a case management order')?'yes':''" text="for case management order"/>
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a protection order')?'yes':''" text="about a protection order" />
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('a priority parenting matter')?'yes':''" text="about a priority parenting matter"/>

                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('prohibiting relocation of a child')?'yes':''" text="about prohibiting relocation of a child"/>
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('an order under the Family Maintenance Enforcement Act')?'yes':''" text="for order under the Family Maintenance Enforcement Act" />
                    <check-box shiftmark="1" boxMargin="0" shift="10" :check="wrInfo.caseList.includes('enforcement')?'yes':''" text="about enforcement"/>
                    
                </div>                
                
                <div style="font-size:9pt;"><b>FORM 19</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rules 86, 137 and 142.1</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:existingFileNumber}]"
                    :fields="[{key:'name',tdClass:'border-dark text-center align-middle'},{key:'value',tdClass:'border-dark text-center align-middle'}]"
                    small
                    bordered
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="font-size:6pt; margin:.1rem 0;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:cell(value)="data">
                            <div style="font-size:7pt !important; color:#000;">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div> 
        
<!-- <1> -->
        <section style="margin-top: 2rem;">
            <underline-form style="text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px; font-size: 9pt;" textwidth="9rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:1px;display:inline; font-size: 9pt;"> . My contact information and address for service of court documents are:</div>
            <table class="compactfullsize" style="margin-top:0 !important; font-size: 9pt;">
                <tr style="border:1px solid #414142" >
                    <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
                    <td v-else  colspan="3">Lawyer (if applicable): </td>
                </tr>
                <tr style="border:1px solid #414142">          
                    <td colspan="3">Address: <div class="answer">{{yourInfo.address.street}} </div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td  >City: <div class="answer">{{yourInfo.address.city}}</div> </td>
                <td style="padding-left:50px">Province: <div class="answer">{{yourInfo.address.state}}</div> </td>
                    <td>Postal Code: <div class="answer">{{yourInfo.address.postcode}}</div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td colspan="2">Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                    <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>

        <div style="margin-top: 1.5rem;"></div> 

<!-- <2> -->
        <section>
            <check-box
                inline="inline"
                boxMargin="0rem" 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I understand to reply to the application I must attend court on the date and time for the court appearance "/>

            <div style="margin:0 0 0 1.9rem; text-indent:0; display:block; font-size: 9pt;" >
                referred to in the application and I may file and serve this written response on each other
                party before that date.
            </div>

        </section>
        

<!-- <3> -->
        <div class="print-block">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    I have been given notice of the application about <i>{{wrInfo.applicationsList}}</i> made by 
                    <i>{{wrInfo.otherPartiesList}}</i> and I am completing this written response to reply to the application.
                    
                    <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                    
                </div>
               
                
            </section>
        </div>

<!-- <4> -->

        <div class="print-block">
            <section >  
                <div v-if="otherPartyInfo.length>1" style="font-size: 9pt; margin-left:0.2rem; display:inline;">The other parties are</div>
                <div v-else style="font-size: 9pt; margin-left:0.2rem; display:inline">The other party is</div>
                <div v-for="otherparty,inx in otherPartyInfo" :key="inx" style="font-size: 9pt; display:inline;">
                    <underline-form 
                        style="margin-top:0.5rem; text-indent:2px;display:inline-block;" 
                        textwidth="15.9rem" 
                        :beforetext="inx>0? ',' : '' " 
                        hint="full name of the other party/parties" 
                        :italicHint="false" 
                        :text="otherparty.name | getFullName"/> 
                </div>                
            </section>
        </div> 

        <div style="margin-top: 1.5rem;"></div>            

        <div class="print-block mt-2">            
<!-- <5> -->
            <section>
                <div style="display:inline; margin:0 0 0 0.25rem; font-style: italic;">Complete this section as applicable. You may leave a portion blank.</div>
                <div style="margin-left:1rem;">                    
                    
                    <check-box  
                        :check="wrInfo.agreed?'yes':''" 
                        style="font-size: 9pt;"
                        text="I agree to the following order(s):"/> 
                    <i style="margin-left:0.75rem; font-size: 9pt;">Provide details</i>
                    <div v-if="wrInfo.agreed && wrInfo.agreeDetails" 
                        class="answerbox">{{wrInfo.agreeDetails}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                    
                    <check-box  
                        :check="wrInfo.disagree?'yes':''" 
                        style="font-size: 9pt;"
                        text="I do not agree with the following order(s):"/> 
                    <i style="margin-left:0.75rem; font-size: 9pt;">Provide details of what you do not agree with and explain why you do not agree</i>
                    <div v-if="wrInfo.disagree && wrInfo.disagreeDetails" 
                        class="answerbox">{{wrInfo.disagreeDetails}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>          
                            
                </div>
            </section>
        </div>

<!-- <6> -->

        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.1rem;font-size: 9pt; font-style: italic;">
                    Complete only if applicable. You may leave this section blank.
                </div>
                <div style="text-indent:0; display:block; margin-left:0.1rem;font-size: 9pt;">
                    Instead, I am asking for the order(s) about this matter to be made as follows:
                </div>
                <div style="text-indent:0; margin:0 0 0 0rem; display: block;font-size: 9pt; font-style: italic;">
                    Write the order(s) or change(s) to the order that you want the court to make instead of what the other party
                    has asked for. If you want an order about a different matter, including a family law matter, you must file
                    your own application.
                </div>
                
                <div v-if="wrInfo.orderDetails" 
                    class="answerbox">{{wrInfo.orderDetails}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            
            </section>
        </div> 

<!-- <7> -->

        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">
                    The facts on which this written response is based are as follows:  
                </div>
                 <div style="text-indent:0; margin:0 0 0 0rem; display: block;font-size: 9pt; font-style: italic;">
                    Provide the facts you want the court to consider when they are making a decision about the application. If
                    you are asking for a different order to be made, you should tell the court why it should be made instead of
                    the order the other party has asked for.
                </div>            
                
                <div v-if="wrInfo.orderFacts" 
                    class="answerbox">{{wrInfo.orderFacts}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            
            </section>
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
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { getWrittenResponseApplications } from '@/components/utils/ReplyPathways';

import { form19DataInfoType, writtenResponseOtherPartyDataInfoType } from '@/types/Application/WrittenResponse/PDF';
import { aboutWrittenResponseOrderSurveyDataInfoType, agreeDisagreeSurveyDataInfoType, wrReplyingToApplicationSurveyDataInfoType } from '@/types/Application/WrittenResponse';

@Component({
    components:{
        UnderlineForm,
        CheckBox        
    }
})

export default class Form19Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.State
    public types!: string[];
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;  
   
    yourInfo = {} as yourInformationInfoDataInfoType;
    wrInfo = {} as form19DataInfoType;
    
    existingFileNumber = '';
    filingLocationReason = '';  
    
    applicationLists: string[] = [];
    otherParties: string[] = [];
    otherPartyInfo = [];
    

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
        this.yourInfo = this.getYourInfo();
        this.otherPartyInfo = this.getOtherPartyInfo();
        this.wrInfo = this.getWrInfo();
        this.existingFileNumber = getLocationInfo(this.result.filingLocationSurvey);
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: writtenResponseOtherPartyDataInfoType[] = [];        

        if (this.result?.otherPartyCommonSurvey?.length > 0){
            
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                let otherParty = {} as writtenResponseOtherPartyDataInfoType;

                if (party.name)
                    otherParty.name = party.name;
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }
    
    public getWrInfo() {

        let wrInformation = {} as form19DataInfoType;

        wrInformation.caseList = getWrittenResponseApplications(this.types);
       

        wrInformation.applicationsList = (wrInformation.caseList)?wrInformation.caseList.join(' and '):'';

        wrInformation.otherPartiesList = '';

        if (this.result.wrReplyingToApplicationSurvey) {
            const wrReplyingToApplicationData: wrReplyingToApplicationSurveyDataInfoType = this.result.wrReplyingToApplicationSurvey;
            const applicants = [];

            for (const applicant of wrReplyingToApplicationData.partiesMakingApplication){

                if (applicant == "other"){
                    if (wrReplyingToApplicationData.partiesMakingApplicationComment){
                        applicants.push(wrReplyingToApplicationData.partiesMakingApplicationComment)
                    }
                } else {
                    applicants.push(applicant)

                }
            }
            
            wrInformation.otherPartiesList = applicants.join(', ');
        }

        wrInformation.orderFacts = '';
        wrInformation.orderDetails = '';
        

        if (this.result.aboutWrittenResponseOrderSurvey) {
            const aboutWrOrderData: aboutWrittenResponseOrderSurveyDataInfoType = this.result.aboutWrittenResponseOrderSurvey;
            if (aboutWrOrderData.requiredChanges == 'y'){
                wrInformation.orderDetails = aboutWrOrderData.orderDescription;
                wrInformation.orderFacts = aboutWrOrderData.applicationFacts;
            }
        }

        wrInformation.agreed = false;
        wrInformation.disagree = false;
        wrInformation.agreeDetails = '';
        wrInformation.disagreeDetails = '';

        if (this.result.agreeDisagreeSurvey) {
            const agreeDisagreeData: agreeDisagreeSurveyDataInfoType = this.result.agreeDisagreeSurvey;
            wrInformation.agreed = agreeDisagreeData.agreeDisagree.includes('agree');
            wrInformation.disagree = agreeDisagreeData.agreeDisagree.includes('disagree');

            if (wrInformation.agreed){
                wrInformation.agreeDetails = agreeDisagreeData.agreeDetails;
            }
            if (wrInformation.disagree){
                wrInformation.disagreeDetails = agreeDisagreeData.disAgreeDetails;
            }
        }

       
        return wrInformation;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>