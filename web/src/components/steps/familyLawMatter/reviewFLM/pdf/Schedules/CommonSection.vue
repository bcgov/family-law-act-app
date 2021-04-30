<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Application About a Family Law Matter</b></div>
                <div style="font-size:10pt;"><b>FORM 3</b></div>
                <div>Provincial Court Family Rules (Rule 24)</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:''}]"
                    :fields="[{key:'name',tdClass:'border-dark'},{key:'value',tdClass:'border-dark'}]"
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

        <div class="text-justify">
            <p class="mb-0">This Application About a Family Law Matter has been filed in Provincial Court. It provides notice to each party, and the court, of the family law matters to be resolved with the help of the court and may include</p>
            <ul style="margin-left:-1rem;">
                <li>an application for a new order about a family law matter to be made by the court,</li>
                <li>an application to change or cancel all or part of an existing final order about a family law matter, or</li>
                <li>an application to set aside or replace all or part of an existing agreement about a family law matter.</li>
            </ul>
            <p>If you choose to reply, you or your lawyer must file a completed Reply to an Application About a Family Law Matter in Form 6 within 30 days after the date you were served with the application.</p>
            <p>To file your reply, you may be required to file a Financial Statement if this application is about child support and/or spousal support. In an early resolution registry, you must also have met the early resolution requirements, as applicable.</p>
            <b>If you do not file a Reply to an Application About a Family Law Matter within the 30 day period referred to above, you will not be entitled to receive notice of any part of the case, including any conference, hearing or trial, and orders may be made in your absence.</b>
        </div>


        <div style="margin-top:1rem;"><b>Information about the parties</b></div>
<!-- <1> -->
        <section>
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInformationSurvey.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInformationSurvey.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline;"> . My contact information and address for service of court documents are:</div>
            <table class="fullsize">
                <tr style="border:1px solid #414142" >
                    <td v-if="yourInformationSurvey.Lawyer=='y'" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInformationSurvey.Lawyer | getFullName}}</div></td>
                    <td v-else  colspan="3">Lawyer (if applicable): </td>
                </tr>
                <tr style="border:1px solid #414142">          
                    <td colspan="3">Address: <div class="answer">{{yourInformationSurvey.address.street}} </div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td  >City: <div class="answer">{{yourInformationSurvey.address.city}}</div> </td>
                <td style="padding-left:50px">Province: <div class="answer">{{yourInformationSurvey.address.state}}</div> </td>
                    <td>Postal Code: <div class="answer">{{yourInformationSurvey.address.postcode}}</div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td>Email: <div class="answer">{{yourInformationSurvey.contact.email}}</div> </td>
                    <td style="padding-left:50px"></td>
                    <td>Telephone: <div class="answer">{{yourInformationSurvey.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>
<!-- <2> -->
        <section>
            <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="true?'yes':''" text="I understand the following people must be given notice of my application:"/>
            <ul style="margin:0 0 0 1.5rem;">
                <li style="text-indent:0.25rem;">all parents and current guardians of each child who is the subject of the family law matter</li>
                <li style="text-indent:0.25rem;">my spouse, if I am applying for spousal support</li>
                <li style="text-indent:0.25rem;">each other adult who the application about a family law matter is about</li>
            </ul>
            <p style="margin:0.5rem 0 0 2.35rem; text-indent:0;">They are the other party/parties in this case. To give notice, they must each be served with a copy of this document and any supporting documents.</p>                
        </section>

<!-- <3> -->
        <section> 
            <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party is" hint="full name of the other party" :italicHint="false" :text="otherParty.name | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". Their date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                <table class="fullsize">
                    <tr style="border:1px solid #313132" >                        
                        <td colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr style="border:1px solid #313132">          
                        <td colspan="3">Address: <div class="answer"> {{otherParty.address?otherParty.address.street:''}} </div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td  >City: <div class="answer">{{otherParty.address?otherParty.address.city:''}}</div> </td>
                    <td style="padding-left:50px">Province: <div class="answer">{{otherParty.address?otherParty.address.state:''}}</div> </td>
                        <td>Postal Code: <div class="answer">{{otherParty.address?otherParty.address.postcode:''}}</div> </td>
                    </tr>
                    <tr style="border:1px solid #313132">
                        <td>Email: <div class="answer">{{otherParty.contact?otherParty.contact.email:''}}</div> </td>
                        <td style="padding-left:50px"></td>
                        <td>Telephone: <div class="answer">{{otherParty.contact?otherParty.contact.phone:''}}</div> </td>
                    </tr>
                </table>
            </div>
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Lawyer’s statement</b></div>
<!-- <4> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">Complete this section only if you are a lawyer for the party. You may leave this section blank.</div>
                <div>
                    <check-box  inline="inline" boxMargin="0" style="margin:0 0 0 1rem;display:inline" :check="true?'yes':''" text=""/>
                    <underline-form style="text-indent:0px;display:inline;" textwidth="15.5rem" beforetext="I, " hint="full name of lawyer" text=""/>
                    <underline-form style="text-indent:2px;display:inline;" textwidth="16.25rem" beforetext=", the lawyer for" hint="full name of party" text=""/>
                    <div style="display:inline;">, acknowledge that I have complied with the requirements of section 8 of the <i>Family Law Act</i>. </div>
                </div>           
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Initial requirements</b></div>
<!-- <5> -->
            <section> 
                I am filing my application in:
                <check-box style="margin:0 0 0 1rem;" :check="true?'yes':''" text="an early resolution registry and I have met the following requirements:<br/><i>The requirements have been met if you completed or participated in, or if you were granted an exemption from completing or participating in, the following: Select all options that apply.</i>"/>
                <div style="margin:0 0 0 2.75rem;">
                    <check-box style="" :check="true?'yes':''" text="needs assessment"/>
                    <check-box style="" :check="true?'yes':''" text="parenting education program"/>
                    <check-box style="" :check="true?'yes':''" text="consensual dispute resolution"/>
                </div>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="a family justice registry and I understand I will be required to participate in a needs assessment and complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="a parenting education program registry and I understand I will be required to complete a parenting education program, unless exempt, before a family management conference can be scheduled"/>
                <check-box style="margin:0.25rem 0 0 1rem;" :check="true?'yes':''" text="none of the above "/>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Make an application</b></div>
<!-- <6> -->
            <section>
                <b style="margin-left:0.25rem">I am applying for a court order about the following family law matter(s):</b>
                <div style="margin-left:1rem;">
                    <i>Select all options that apply, complete and attach the required schedule(s)</i>
                    <div style="margin-top:0.25rem;"><b>Parenting arrangements</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule1')?'yes':''" text="parenting arrangements – new <i>[complete and attach Schedule 1]</i> <br/>	including parental responsibilities and parenting time"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule2')?'yes':''" text="parenting arrangements order/agreement – existing <i>[complete and attach Schedule 2]</i><br/> including parental responsibilities and parenting time"/>
                
                    <div style="margin-top:0.25rem;"><b>Child support</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule3')?'yes':''" text="child support – new <i>[complete and attach Schedule 3]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule4')?'yes':''" text="child support order/agreement – existing <i>[complete and attach Schedule 4]</i>"/>
                    
                    <div style="margin-top:0.25rem;"><b>Contact with a child</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule5')?'yes':''" text="contact with a child – new <i>[complete and attach Schedule 5]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule6')?'yes':''" text="contact order/agreement – existing <i>[complete and attach Schedule 6]</i>"/>

                    <div style="margin-top:0.25rem;"><b>Guardianship of a child</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule7')?'yes':''" text="appointing a guardian of a child <i>[complete and attach Schedule 7]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule8')?'yes':''" text="cancelling guardianship of a child <i>[complete and attach Schedule 8]</i>"/>

                    <div style="margin-top:0.25rem;"><b>Spousal support</b></div>
                    <check-box style="" :check="selectedSchedules.includes('schedule9')?'yes':''" text="spousal support – new <i>[complete and attach Schedule 9]</i>"/>
                    <check-box style="" :check="selectedSchedules.includes('schedule10')?'yes':''" text="spousal support order/agreement – existing <i>[complete and attach Schedule 10]</i>"/>

                </div>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Existing written agreements or court orders</b></div>
<!-- <7> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">There is an existing written agreement or court order about parenting arrangements, child support, contact with a child, guardianship of a child, and/or spousal support </div>          
                <div style="margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>
                    <i style="display:block">If yes, attach a copy of the order(s) to your application</i>
                </div>
            </section>
        </div>

 <!-- <8> -->
        <section> 
            <div style="display:inline; margin-left:0.25rem">There is an existing court order protecting one of the parties, the child(ren), or restraining contact between the parties, including a protection order, child protection or supervision order, peace bond, restraining order, bail condition and other criminal order</div>            
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>
                <i style="display:block">If yes, attach a copy of the order(s) to your application</i>
            </div>
        </section>  

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Relationship between the parties</b></div>
<!-- <9> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">The parties are: </div>          
                <i style="display:block;margin-left:1rem" >{{relationshipBetweenParties.description}}</i>
            </section>
        </div>

<!-- <10> -->
        <section>
            <div style="display:inline; margin-left:0.25rem">I am or have been spouses, or live or have lived together in a marriage-like relationship, with the other party </div>          
            <div>
                <i style="display:inline;margin-left:1rem" >Specify which other party if there is more than one: </i>
                <underline-form style="text-indent:2px;display:inline;" textwidth="21.9rem" beforetext="" hint="name of other party" text=""/>
            </div>
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="relationshipBetweenParties.spouses?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!relationshipBetweenParties.spouses?'yes':''" text="No"/>
                <i style="display:block">If yes, please complete all options below that apply to the parties</i>
                
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="8rem" beforetext="Date on which the parties began to live together in a marriage-like relationship:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.startDate"/>
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of marriage:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.marriageDate"/>
                <underline-form style="margin-left:0.5rem; text-indent:0rem;display:block" textwidth="13rem" beforetext="Date of separation:" hint="(mmm/dd/yyyy)" :text="relationshipBetweenParties.separationDate"/>    
                <i style="margin-left:1.5rem;display:block">Note:  Spouses may be separated despite continuing to live in the same residence [Family Law Act s.3(4)]</i>
            </div>
        </section>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
<!-- <11> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Select only one of the options below and complete the required information</i>          
                <div style="margin-left:1.5rem">
                    <check-box style="" :check="!aboutChildren?'yes':''" text="My application does not ask for any order(s) about a child or children <i>(skip section 12)</i>"/>
                    <check-box style="" :check="aboutChildren?'yes':''" text="My application is asking for an order(s) about the following child or children:"/>
                </div>
                <b-table
                    :items="childrenInfo"
                    :fields="childrenFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                </b-table> 
            </section>
        </div>

<!-- <12> -->
        <section>
            <div style="margin:0 0 0 .5rem;display:inline;">
                <check-box inline="inline" boxMargin="0" style="display:inline;" :check="childBestInterestAcknowledmentCheck?'yes':''" text=""/>
                <div class="marginleft1vue" style="display:inline-block;">I understand that I must consider the child(ren)’s best interests with respect to each order I am </div>
                <div style="margin:0 0 0 1.75rem;display:inline-block;">asking the court to make about the child.</div>
            </div>
        </section>
       
        <div class="print-block">
            <div style="margin-top:1rem;"><b>About us</b></div>
<!-- <13> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">You may choose to complete this section or leave this section blank</i>
                <div style="margin-left:.5rem; text-indent:0rem;">I would like to share the following information with the court about the cultural, linguistic, religious and spiritual upbringing and heritage of my family, including, if the child is an Indigenous child, the child’s Indigenous identity:</div>
                <div style="margin-left:.5rem; text-indent:0rem;"></div>
                <div v-if="result.flmBackgroundSurvey.likeToAddCulturalExplanation == 'y'" class="answerbox">{{culturalInfo}}</div>
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

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';
import { nameInfoType } from '@/types/Application';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedSchedules!: string[];
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    // result;
    dataReady = false;
    aboutChildren = false;

    otherPartyInfo=[];
    yourInformationSurvey;

    applicantList = []

    
    existingOrders = {}
    relationshipBetweenParties = {}
    childrenInfo = []
    childBestInterestAcknowledmentCheck = false;
    culturalInfo = '';
    parentArrInfo = {}
    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    childrenFields=[
        {key:"fullName",       label:"Child's full legal name",                tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",        label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship", label:"My relationship to the child",           tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship",   label:"Other party's relationship to the child",tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"},
        {key:"currentSituation",     label:"Child is currently living with",         tdClass:"border-dark text-center", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:16%;"},
    ]   

    public extractInfo(){      

        // this.selectedSchedules = this.getSchedulesInfo();
        this.existingOrders = this.getExistingOrdersInfo();
        this.relationshipBetweenParties = this.getRelationshipBetweenPartiesInfo();
        if (this.result.childData && this.result.childData.length > 0){
            this.aboutChildren = true;
            this.childrenInfo = this.getChildrenInfo();
            this.childBestInterestAcknowledmentCheck = this.result.childBestInterestAcknowledgement;            
        } else {
            this.aboutChildren = false;
            this.childrenInfo = [];
            this.childBestInterestAcknowledmentCheck = false;
        }

        if (this.result.flmBackgroundSurvey.culturalExplain) {
            this.culturalInfo = this.result.flmBackgroundSurvey.culturalExplain;
        }       
        
        this.otherPartyInfo=this.getOtherPartyInfo()
        this.yourInformationSurvey = this.getYourInfo()       

    }

    public getRelationshipBetweenPartiesInfo(){

        let relationshipInfo = {description: '', spouses:false, startDate: '', marriageDate: '', separationDate: ''};
        relationshipInfo.description = this.result.flmBackgroundSurvey.howPartiesRelated;
        relationshipInfo.spouses = this.result.flmBackgroundSurvey.werePOPartiesMarried == 'y';
        if (relationshipInfo.spouses){
            relationshipInfo.startDate = this.result.flmBackgroundSurvey.liveTogetherPODate;
            relationshipInfo.marriageDate = this.result.flmBackgroundSurvey.dateOfMarriagePO;
            relationshipInfo.separationDate = this.result.flmBackgroundSurvey.separationDate;
        }
        return relationshipInfo;
    }

    public getChildrenInfo(){

        const childrenInfo = [];
        let childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
        const childData = this.result.childData;
       
        for (const child of childData){            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childInfo.currentSituation = child.currentLiving;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getExistingOrdersInfo(){
        let existing = {existingFlm: false, existingPO: false}

        existing.existingFlm = this.result.flmBackgroundSurvey.ExistingOrders == 'y';
        existing.existingPO = this.result.flmBackgroundSurvey.existingPOOrders == 'y';

        return existing;
    }

    public getYourInfo(){
        let dob = ''
        let name = ''
        let address = {street:'', city: '', country: '', postcode: '', state: ''}
        let contact = {email:'',fax:'',phone:''}
        let Lawyer = 'n'

        if(this.result.yourInformationSurvey){
            if(this.result.yourInformationSurvey.ApplicantName)
                name=this.result.yourInformationSurvey.ApplicantName
            
            if(this.result.yourInformationSurvey.ApplicantDOB)
                dob=this.result.yourInformationSurvey.ApplicantDOB

            if(this.result.yourInformationSurvey.ApplicantAddress)
                address=this.result.yourInformationSurvey.ApplicantAddress
            
            if(this.result.yourInformationSurvey.ApplicantContact)
                contact=this.result.yourInformationSurvey.ApplicantContact

            if(this.result.yourInformationSurvey.Lawyer)
                Lawyer=this.result.yourInformationSurvey.Lawyer            
        }
        return {'name':name, 'dob':dob, 'address': address ,'contact': contact, 'Lawyer':Lawyer}
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = 'unknown'
        let name = ''
        let address = ''
        let contactInfo = ''

        if (this.result.otherPartyCommonSurvey){
            console.log()    
            for(const party of this.result.otherPartyCommonSurvey){
                dob = 'unknown'
                name = ''
                address = ''
                contactInfo = ''

                if (party['knowDob'] == 'y' &&  party['dob'])
                    dob = party['dob']

                if (party['name'])
                    name = party['name']
                
                if (party['address'])
                    address = party['address']
                
                if (party['contactInfo'])
                    contactInfo = party['contactInfo']
                
                info.push({'name':name, 'DOB': dob , 'address': address ,'contact': contactInfo})
            }
        } else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': ''}]

        return info
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>