<template>
<div v-if="dataReady">    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div class="mb-2">
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>APPLICATION ABOUT A PROTECTION ORDER</b></div>
                <div style="font-size:10pt;"><b>FORM K</b></div>
                <div>Provincial Court (Family) Rules</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.protectionWhomSurvey.ExistingCourt?result.protectionWhomSurvey.ExistingCourt:result.applicationLocation},{name:'COURT FILE NUMBER:', value:result.protectionWhomSurvey.ExistingFileNumber}]"
                    small
                    bordered
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="font-size:6pt; margin:.1rem 0;">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:cell(value)="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div>

<!-- <1> -->
        <section>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="result.yourInformationSurvey.ApplicantName | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="result.yourInformationSurvey.ApplicantDOB | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents by the other party and the court are:</div>
                <table class="fullsize">
                    <tr style="border:1px solid #414142" >
                        <td v-if="result.yourInformationSurvey.Lawyer=='y'" colspan="3">Lawyer (if applicable): <div class="answer"> {{result.yourInformationSurvey.Lawyer | getFullName}}</div></td>
                        <td v-else  colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td colspan="3">Address: <div class="answer"> {{result.yourInformationSurvey.ApplicantAddress.street}} </div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td  >City: <div class="answer">{{result.yourInformationSurvey.ApplicantAddress.city}}</div> </td>
                    <td style="padding-left:50px">Province: <div class="answer">{{result.yourInformationSurvey.ApplicantAddress.state}}</div> </td>
                        <td>Postal Code: <div class="answer">{{result.yourInformationSurvey.ApplicantAddress.postcode}}</div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td>Email: <div class="answer">{{result.yourInformationSurvey.ApplicantContact.email}}</div> </td>
                        <td style="padding-left:50px"></td>
                        <td>Telephone: <div class="answer">{{result.yourInformationSurvey.ApplicantContact.phone}}</div> </td>
                    </tr>
                </table>
        </section>

<!-- <2> -->
        <section>
            The person I want protection from, or who had made an application for protection from me, is the other party. An application is
            usually made with notice to the other party. To give notice, they must be served with the application and supporting documents
            before the date set for the court appearance. An Application About a Protection Order can also be made without notice to the
            other party.
            <div style="margin:0.25rem 0 0 2rem;" >
                <i>Select only one of the options below</i>
                <check-box style="" :check="result.urgencySurvey.PORNoNotice == 'n'?'yes':''" text="I am applying with notice to the other party"/>
                <check-box v-if="result.urgencySurvey.PORNoNotice == 'y'" style="" :check="result.urgencySurvey.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i> Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i><br/><div style=\'color:#000;font-size:11pt;\'>'+result.urgencySurvey.PORWhyNoNotice+'</div>'"/>
                <check-box v-else style="" :check="result.urgencySurvey.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i> Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i>'"/>
            </div>
        </section>

<!-- <3> -->
        <section> 
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party's name is" hint="full name of the other party" :italicHint="false" :text="result.protectionWhomSurvey.RespondentName | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". Their date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="result.protectionWhomSurvey.RespondentDOB | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                <table class="fullsize">
                    <tr style="border:1px solid #414142" >
                        <td v-if="result.yourInformationSurvey.Lawyer=='y'" colspan="3">Lawyer (if applicable): <div class="answer"> {{result.protectionWhomSurvey.RespondentLawyer | getFullName}}</div></td>
                        <td v-else  colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr style="border:1px solid #414142">          
                        <td colspan="3">Address: <div class="answer"> {{result.protectionWhomSurvey.RespondentAddress.street}} </div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td  >City: <div class="answer">{{result.protectionWhomSurvey.RespondentAddress.city}}</div> </td>
                    <td style="padding-left:50px">Province: <div class="answer">{{result.protectionWhomSurvey.RespondentAddress.state}}</div> </td>
                        <td>Postal Code: <div class="answer">{{result.protectionWhomSurvey.RespondentAddress.postcode}}</div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td>Email: <div class="answer">{{result.protectionWhomSurvey.RespondentContact.email}}</div> </td>
                        <td style="padding-left:50px"></td>
                        <td>Telephone: <div class="answer">{{result.protectionWhomSurvey.RespondentContact.phone}}</div> </td>
                    </tr>
                </table>
        </section>

<!-- <4> -->
        <section>  
            I am applying for the following order:           
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select only one of the options below and complete the required schedule</i>
                <check-box style="" :check="result.selectedPOOrder.orderType == 'needPO'?'yes':''" text="Protection order <i>[Complete and attach Schedule 1]</i>"/>
                <check-box style="" :check="result.urgencySurvey.PORNoNotice == 'changePO'?'yes':''" text="Order to change an existing protection order <i>[Complete and attach Schedule 2]</i>"/>
                <check-box style="" :check="result.urgencySurvey.PORNoNotice == 'terminatePO'?'yes':''" text="Order to terminate and existing protection order <i>[Complete and attach Schedule 3]</i>"/>
            </div>
        </section>

<!-- <For registery> -->
        <div style="width:99%; border:1px solid; text-weight:bold; padding:0.5rem;">
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
            <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
        </div>







        <div class="new-page" />
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="result.selectedPOOrder.orderType == 'needPO'">
        <div style="text-align:center;"><b> SCHEDULE 1 – AFFIDAVIT FOR PROTECTION ORDER</b></div>
        <div style="text-align:center;"><b> This is Schedule 1 to the Application about a Protection Order</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>This schedule must be completed if you are applying for a protection order. A judge can make decisions based only on the
            information presented by the parties as evidence. Evidence must be relevant to the issue. Please complete the following
            affidavit to help you explain to the court why you need a protection order and what it should include. In some cases, if you have
            provided evidence in this affidavit, a judge may not need you to provide additional information in court. 
            </i>
        </div>

        <div>
            <underline-form style="display:inline-block;" textwidth="13rem" beforetext="I," hint="full name of party" :text="result.yourInformationSurvey.ApplicantName | getFullName"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="6rem" beforetext="," hint="occupation" :text="result.yourInformationSurvey.ApplicantOccupation"/>
            <underline-form style="text-indent:1px;display:inline-block;" textwidth="20rem" beforetext="of" hint="address of party, city, province" :text="result.yourInformationSurvey.ApplicantAddress | getFullAddress"/>
            <div style="text-indent:1px;display:inline;"> ,</div>
        </div>

        <div class="mt-2">
            SWEAR OR AFFIRM THAT:
        </div>
<!-- <1> -->
        <section class="resetquestion">  
            I am making this affidavit in support of an application for a protection order.
        </section>

<!-- <2> -->
        <section>  
            I am applying for a protection order for the following person(s) to be protected:           
            <div style="margin:0.25rem 0 0 2rem;" >
                <i>Select and complete only those options that apply to your situation. You may select more than one.</i>
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y'?'yes':''" text="me"/>
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y' && result.protectionWhomSurvey.childPO == 'y'?'yes':''" text=" the following child(ren) I am parent or guardian to:<br><i>Complete only if applicable. You may leave this section blank</i>"/>                
            </div>

            <b-table
                :items="childrenItem"
                :fields="childrenFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
            </b-table> 

            <div style="margin:0.25rem 0 0 2rem;" >
                <check-box style="" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'y' && result.protectionWhomSurvey.anotherAdultSharingResi == 'y'?'yes':''" text="The following adult(s) sharing the residence with the other protected person(s):<br><i>Complete only if the adult family member sharing the residence with another protected person needs to also be protected. You may leave this section blank.</i>"/>               
            </div>

            <b-table
                :items="sharingAdultItem"
                :fields="sharingAdultFields"
                class="mt-2"
                small
                bordered>                    
                    <template v-slot:cell()="data">
                        <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                    </template>
            </b-table>

            <div  style="margin:0.25rem 0 0 2rem;">
                <check-box style="display:inline;" :check="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n' && result.protectionWhomSurvey.anotherAdultPO == 'y'?'yes':''" text=" Other <i>(specify):</i>"/>               
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="20rem" beforetext="" hint="full name of other person to be protected" :text="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'?(result.protectionWhomSurvey.anotherAdultName | getFullName):''"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="11rem" beforetext="," hint="date of birth of other person (mmm/dd/yyyy)" :text="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'?(result.protectionWhomSurvey.anotherAdultDOB | beautify-date):'' "/>
                <div style="text-indent:-18px;display:block;margin-top:0.5rem;"> Explain why you are applying for the other person:</div>
                <div v-if="result.protectionWhomSurvey.ApplicantNeedsProtection == 'n'" class="answer"> {{result.protectionWhomSurvey.anotherAdultReasonForPO}}</div>
            </div>

            <div style="text-indent:0px;margin:1rem 0;">
                <b>
                    The person(s) identified in the section above is/are referred to as the protected party/parties. The other party is the
                    person they need protection from.
                </b>
            </div>
        </section>

    




        <div class="new-page" />
<!-- <Page 3> --> 
<!-- <Header> -->
        <div style=""><b> ABOUT THE PROTECTION ORDER</b></div>
<!-- <3> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> I do not want the other party to be able to attend at, enter or be found at the following places:</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('Home')?'yes':''" text="Residence"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('School')?'yes':''" text="School"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('Workplace')?'yes':''" text="Place of Employment"/>
                <check-box style="" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('ChildCareFacility')?'yes':''" text="Child care facility"/>
                <check-box style="display:inline;margin-left:-1.05rem;" :check="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="result.noGoSurvey.RespondentNoGo == 'y' && result.noGoSurvey.RespondentNoGoPlaces.includes('other')?result.noGoSurvey.RespondentNoGoPlacesComment:'' "/>
            </div>
        </section>

<!-- <4> -->
        <section>  
            <i style="margin-left:.25rem;">Complete only if applicable. You may leave this section blank.</i>
            <div style="margin-left:1rem;"> The protected party may need to communicate with the other party for the following reason(s):</div>
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select all options that apply</i>                
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication.includes('Consensual dispute resolution')?'yes':''" text="Consensual dispute resolution"/>
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication.includes('Parenting arrangements')?'yes':''" text="Parenting arrangements"/>
                <check-box style="" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication.includes('Ongoing court action')?'yes':''" text="Ongoing court action"/>
                <check-box style="display:inline;margin-left:-1.05rem;" :check="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication.includes('other')?'yes':''" text="Other <i>(specify):</i>"/>
                <underline-form style="text-indent:1px;display:inline-block;" textwidth="30rem" beforetext="" hint="" :text="result.noContactSurvey && result.noContactSurvey.needCommunication == 'y' && result.noContactSurvey.reasonForCommunication.includes('other')?result.noContactSurvey.reasonForCommunicationComment:'' "/>
            </div>
        </section>

<!-- <5> -->
        <section>
            I have concerns the other party would cause harm with or threaten to use guns, explosives or another kind of firearm
            <check-box style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearms == 'y'?'yes':''" text="Yes"/>
            <check-box style="display:inline;" shift="10" :check="result.weaponsSurvey.RespondentFirearms == 'n'?'yes':''" text="No"/>
            <i style="display:block; margin-left:1rem;">If yes, explain the reason(s) for your concerns</i>
        </section>

    </div>

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class FormP1 extends Vue {    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    check = ""//"&#10003"
    check2= "&#10003"

    result;
    dataReady = false;

    applicantList = []
    deceased={fullName:"Rest In Peace", first:"Rest", middle:"In",last:"Peace", address:"0-123 st, Victoria, BC, Canada V0i 8i8"}
    serviceContact={address:"0-123 st, Victoria, BC, Canada V0i 8i8", phone:"+1 123 456 7890", fax:"+1 123 456 7890", email:"ABC@yahoo.ca"}
    
    mounted(){
        this.dataReady = false;
        this.result = this.getRepGrantResultData()
        this.extractInfo();       
        this.dataReady = true;
    }

    childrenItem = [{name:'', dob:'', relation:'',living:''}];
    childrenFields=[
        {key:"name", label:"Child's full legal name",tdClass:"text-center", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob", label:"Child's date of birth (mmm/dd/yyyy)",tdClass:"text-center", thClass:"text-center", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Other party's relationship to the child",tdClass:"text-center", thClass:"text-center", thStyle:"font-size:8pt; width:22%;"},
        {key:"living", label:"Child is currently living with",tdClass:"text-center", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:25%;"},
    ]

    sharingAdultItem = [{name:'', dob:'', relation:''}]
    sharingAdultFields = [
        {key:"name", label:"Full name",tdClass:"text-center", thClass:"text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob", label:"Date of birth (mmm/dd/yyyy)",tdClass:"text-center", thClass:"text-center", thStyle:"font-size:8pt; width:17%;"},
        {key:"relation", label:"Relationship to other protected person(s)",tdClass:"text-center", thClass:"text-center", thStyle:"font-size:8pt; width:20%;"},
    ]

    public extractInfo(){
        if(this.result.protectionWhomSurvey && this.result.protectionWhomSurvey.ApplicantNeedsProtection== "y"){
            if(this.result.protectionWhomSurvey.childPO=='y'){
                this.childrenItem = [];
                for(const child of this.result.protectionWhomSurvey.allchildren){
                    this.childrenItem.push({
                        name:Vue.filter('getFullName')(child.childName), 
                        dob:Vue.filter('beautify-date')(child.childDOB), 
                        relation:child.childRelationship,
                        living:child.childLivingWith
                    })
                }
            }
            if(this.result.protectionWhomSurvey.anotherAdultSharingResi=='y'){
                this.sharingAdultItem = [];
                for(const sharingAdult of this.result.protectionWhomSurvey.allAnotherAdultsSharingResi){
                    this.sharingAdultItem.push({
                        name:Vue.filter('getFullName')(sharingAdult.anotherAdultSharingResiName), 
                        dob:Vue.filter('beautify-date')(sharingAdult.anotheradultSharingResiDOB), 
                        relation:sharingAdult.anotherAdultSharingResiRelation
                    })
                }
            }
        }

    }

    // public onPrint() {
        
    //     const el= document.getElementById("print");
    //     console.log(el)
    //     const applicationId = this.$store.state.Application.id;
    //     const bottomLeftText = `"Generated by “Apply to Represent Someone Who Died” on `+moment().format("MMMM D, YYYY")+`.";`;
    //     const bottomRightText = `"P5"`
    //     const url = '/survey-print/'+applicationId+'/?name=representation-grant'
    //     const body = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );
    //     const options = {
    //         responseType: "blob",
    //         headers: {
    //         "Content-Type": "application/json",
    //         }
    //     }  
    //     console.log(body)
    //     this.$http.post(url,body, options)
    //     .then(res => {
    //         const blob = res.data;
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         document.body.appendChild(link);
    //         link.download = "FormP5.pdf";
    //         link.click();
    //         setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
    //     },err => {
    //         console.error(err);
        
    //     });
    // }

 
    public getRepGrantResultData() {  
        
        let result = this.$store.state.Application.steps[0].result; 
        for(let i=1;i<9; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                //console.log(stepResults[stepResult])
                //console.log(stepResults[stepResult].data)
                result[stepResult]=stepResults[stepResult].data; 
            }
        }
    //     const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
    //     Object.assign(result, result, protectedPartyName);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        console.log(result)

        return result;

    //Vue.filter('getFullName')(yourInformationSurvey.ApplicantName)
    }

}
</script>
<style scoped>

    .table >>> th{border:1px solid #000;}
    .table >>> td{border:1px solid #000;}
    .table >>> tr{height:1.5rem;}

    table.fullsize {table-layout: fixed; width: 100%; margin-top:1rem;}
    table.fullsize >>> tr{border:1px solid #313132;}
    table.fullsize >>> td{padding:0 0 0 .5rem; color: #313132;}

    .answer{color: #000; display:inline; font-size:11pt;}
    .new-page{margin-top:7rem;}

    section{
        counter-increment: question-counter;
        float:left; 
        text-indent: -17px;
        text-align: justify;
        text-justify: inter-word;
        margin: 0.5rem 0.5rem 0.5rem 1rem;}
 
    section:before {
        font-weight: bolder;        
        content:counter(question-counter) ".";
    }

    section:after{
        float:none; white-space: pre;
    }
    
    section.resetquestion{counter-reset: question-counter;}

    
    ol.resetcounter{
        list-style: none;
        counter-reset: bracket-counter;
    }
    ol li.bracketnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: bracket-counter;
    }
    ol li.bracketnumber:before {
        content:"(" counter(bracket-counter) ") ";
        font-weight: bold;
    }

    ol.resetlist {
        list-style: none;
        counter-reset: list-counter;
    }
    ol li.listnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: list-counter;
    }
    ol li.listnumber:before {
        content:counter(list-counter) ". ";
        font-weight: bold;
    }

    .container {
        padding: 40px !important; 
        margin-right: auto !important;
        margin-left: auto !important;
        width: 100% !important;
        max-width: 760px !important;
        min-width: 760px !important;   
        font-size: 10pt !important;
        font-family: BCSans;
        color: #313132 !important;
    }
        

    

</style>