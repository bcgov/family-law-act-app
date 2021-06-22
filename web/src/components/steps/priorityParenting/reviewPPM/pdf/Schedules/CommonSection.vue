<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-ppm">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Application About</b></div>
                <div style="font-size:11pt;"><b>Priority Parenting Matter</b></div>
                <div style="font-size:9pt;"><b>FORM 15</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rule 76</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value:''}]"
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
        <section>
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
                    <td>Email: <div class="answer">{{yourInfo.contact.email}}</div> </td>
                    <td style="padding-left:50px"></td>
                    <td>Telephone: <div class="answer">{{yourInfo.contact.phone}}</div> </td>
                </tr>
            </table>
        </section>    

<!-- <2> -->
        <section>
            <check-box
                inline="inline"
                boxMargin="0rem" 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I understand I must give notice of this application to all parents and guardians of the child(ren) this
                    application "/>

            <div style="margin:0 0 0 1.9rem; text-indent:0; display:block; font-size: 9pt;" >
                is about. They are the other party/parties. To give notice, they must be served with the
                application and supporting documents at least 7 days before the date set for the court appearance
                unless the court allows the application to be made without notice or with less than 7 days’ notice.
            </div>

            <div style="margin:0.25rem 0 0 3rem;font-size: 9pt;" >
                <i>Select only one of the options below</i>
                <check-box style="" :check="true?'yes':''" text="I am giving at least 7 days’ notice to the other party"/>
                <check-box style="" :check="true?'yes':''" text="I am also filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement for notice of this application" />
                <check-box style="" :check="true?'yes':''" text="I am also filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to modify the requirement for at least 7 days’ notice to the other party"/>
                <check-box style="" :check="true?'yes':''" text="I have a court order that allows the application to be made without notice or with less than 7 days’ notice"/>
            </div>
        </section>
        

<!-- <3> -->
        <div class="print-block">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="14rem" 
                        beforetext="The other party is" 
                        hint="full name of the other party" 
                        :italicHint="false" 
                        :text="firstOtherParty.name | getFullName"/>
                    <underline-form 
                        style="display:inline;text-indent:2px;" 
                        textwidth="7rem" 
                        beforetext=". Their date of birth is" 
                        hint="date of birth (mmm/dd/yyyy)" 
                        :italicHint="false" 
                        :text="firstOtherParty.dob | beautify-date"/>
                    <div style="text-indent:5px;display:inline;"> . Their contact information, as I know it, is:</div>
                    <table class="compactfullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">Lawyer (if applicable): </td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer"> {{firstOtherParty.address?firstOtherParty.address.street:''}} </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.city:''}}</div> </td>
                        <td style="padding-left:50px">Province: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.state:''}}</div> </td>
                            <td>Postal Code: <div class="answer">{{firstOtherParty.address?firstOtherParty.address.postcode:''}}</div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td>Email: <div class="answer">{{firstOtherParty.contact?firstOtherParty.contact.email:''}}</div> </td>
                            <td style="padding-left:50px"></td>
                            <td>Telephone: <div class="answer">{{firstOtherParty.contact?firstOtherParty.contact.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
                <div style="text-indent:5px; margin:0"><i>Additional party (Complete only if applicable. You may leave this section blank.)</i></div>
                        
                <div v-if="additionalOtherParties.length>0" style="font-size: 9pt;">

                    <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    
                        <table class="compactfullsize">
                            <tr style="border:1px solid #313132">
                                <td>Full name: <div class="answer">{{otherParty.name | getFullName}}</div> </td>
                                <td style="padding-left:50px"></td>
                                <td>Date of birth: <div class="answer">{{otherParty.dob | beautify-date}}</div> </td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Contact information</td>
                            </tr>
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
                </div>
                <div v-else>

                    <div style="display:inline; font-size: 9pt;">
                    
                        <table class="compactfullsize">
                            <tr style="border:1px solid #313132">
                                <td>Full name: <div class="answer"></div> </td>
                                <td style="padding-left:50px"></td>
                                <td>Date of birth: <div class="answer"></div> </td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Contact information</td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Lawyer (if applicable): </td>
                            </tr>
                            <tr style="border:1px solid #313132">          
                                <td colspan="3">Address: <div class="answer"> </div> </td>
                            </tr>
                            <tr style="border:1px solid #313132">
                                <td  >City: <div class="answer"></div> </td>
                            <td style="padding-left:50px">Province: <div class="answer"></div> </td>
                                <td>Postal Code: <div class="answer"></div> </td>
                            </tr>
                            <tr style="border:1px solid #313132">
                                <td>Email: <div class="answer"></div> </td>
                                <td style="padding-left:50px"></td>
                                <td>Telephone: <div class="answer"></div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
            </section>
        </div> 

        <!-- <For registery> -->
        <div class="print-block">
            <div style="margin-top:0rem; font-size: 9pt;"><i>For registry use only</i></div>
            <div style="width:99%; border:1px solid; text-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin-top:0.5rem; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>

        <div class="print-block mt-5"></div>

        <div style="text-align:left;"><b>ABOUT THE PRIORITY PARENTING MATTER</b></div>


<!-- <4> -->
            <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;" 
                :check="true?'yes':''" 
                text="I am applying for an order about the following priority parenting matter(s):"/>

            <div style="margin:0.25rem 0 0 3rem;font-size: 9pt;" >
                <i>Select all options that apply</i>
                <check-box style="" :check="true?'yes':''" text="giving, refusing or withdrawing consent, by a guardian, to medical, dental, or other health-related treatments for a child, because delay will result in risk to the child’s health"/>
                <check-box style="" :check="true?'yes':''" text="applying, by a guardian, for a passport, licence, permit, benefit, privilege or other thing for a child, because delay will result in risk of harm to the child’s physical, psychological or emotional safety, security or well-being"/>
                <check-box style="" :check="true?'yes':''" text="applying, by a guardian, for travel with a child or participation by a child in an activity because consent to the travel or activity is required and is alleged to have been wrongfully denied"/>
                <check-box style="" :check="true?'yes':''" text="relating to change in location of a child’s residence, or a guardian’s plan to change the location of a child’s residence because no written agreement or order respecting parenting arrangements applies in respect of the child, and the change of residence can reasonably be expected to have a significant impact on the child’s relationship with another guardian"/>
                <check-box style="" :check="true?'yes':''" text="relating to the removal of a child under section 64 of the Family Law Act"/>
                <check-box style="" :check="true?'yes':''" text="determining matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act"/>
                <check-box style="" :check="true?'yes':''" text="relating to the alleged wrongful removal of a child under section 77(2) of the Family Law Act"/>
                <check-box style="" :check="true?'yes':''" text="relating to the return of a child alleged to have been wrongfully removed or retained under the Convention on the Civil Aspects of International Child Abduction signed at the Hague on October 25, 1980"/>
            </div>                  
        </section>


<!-- <5> -->
        <div class="print-block">
            <section>
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt; ">This application is about the following child(ren):</div>          
                
                <b-table
                    :items="childrenInfo"
                    :fields="childrenFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                </b-table> 
            </section>
        </div>   


<!-- <6> --> 
        <div class="print-block">            
            <section>               
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">There is an existing written agreement or court order about the child(ren) concerning parenting arrangements, child support, contact with a child, or guardianship:
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="ppmInfo.ExistingCase?'yes':''"  text="Yes"/>                        
                    <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="!ppmInfo.ExistingCase?'yes':''" text="No"/> 
                </div>               
                <div><i style="margin:0 0 0 1rem; display: block;font-size: 9pt;">If yes, attach a copy of the agreement(s) and/or order(s) to your application</i></div>            
            </section>
        </div>   


<!-- <7> --> 
        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.1rem;font-size: 9pt;">
                    I know the following information about any court proceeding that is pending or that has been initiated
                    about parenting arrangements, contact with a child or guardianship of a child who is the subject of this
                    application:
                </div>
                <i style="text-indent:0; margin:0 0 0 0rem; display: block;font-size: 9pt;">If there is no pending or ongoing court proceeding, that you know of, in this court or another court or
                jurisdiction, you may leave this section blank</i>
                
                <div v-if="ppmInfo.existingProceeding && ppmInfo.proceedingInfo" 
                    class="answerbox">{{ppmInfo.proceedingInfo}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            
            </section>
        </div> 


<!-- <8> -->      
        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">
                    The details of the order I am applying for are as follows:
                </div>
                <i style="margin:0 0 0 1rem; display: block;font-size: 9pt;">Tell the court and the other party the details of the order you are asking for</i>
                
                <div v-if="ppmInfo.orderdesc" 
                    class="answerbox">{{ppmInfo.orderdesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            
            </section>
        </div> 


<!-- <9> -->
        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">
                    The facts on which this application is based are as follows:  
                </div>
                <i style="text-indent:0; margin:0 0 0 0rem; display: block;font-size: 9pt;">Provide the facts you want the court to consider. Include why you need the court to make the order and how
                your situation is a priority parenting matter.</i>             
                
                <div v-if="ppmInfo.facts" 
                    class="answerbox">{{ppmInfo.facts}}</div>
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
import CheckBoxII from "./components/CheckBoxII.vue"
import OrderedCheckBox from "./components/OrderedCheckBox.vue"
import { nameInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType, childrenInfoSurveyInfoType } from '@/types/Application/CommonInformation/Pdf';
import { priorityParentingInformationDataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   

    otherPartyInfo=[];
    additionalOtherParties = [];
    firstOtherParty = {} as any;
    yourInfo = {} as yourInformationInfoDataInfoType;
    ppmInfo = {} as priorityParentingInformationDataInfoType;

    childrenInfo = [{fullName:'', dob:'', myRelationship:'', otherPartyRelationship:''}];    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    childrenFields=[
        {key:"fullName",               label:"Child's full name",                tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",                    label:"Child's date of birth (mmm/dd/yyyy)",    tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},
        {key:"myRelationship",         label:"My relationship to the child",           tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"},        
        {key:"otherPartyRelationship", label:"The other party's relationship to the child",tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:21%;"}
    ]   

    public extractInfo(){
        console.log(this.result)     
        
        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this,this.otherPartyInfo.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }

        if (this.result.ppmChildrenInfoSurvey && this.result.ppmChildrenInfoSurvey.length > 0){          
            this.childrenInfo = this.getChildrenInfo();
        }
        
        this.yourInfo = this.getYourInfo();
        this.ppmInfo = this.getPpmInfo();
    }   
    
    public getChildrenInfo(){

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData = this.result.ppmChildrenInfoSurvey;
       
        for (const child of childData){            
            childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
            childInfo.fullName = Vue.filter('getFullName')(child.name);
            childInfo.dob = Vue.filter('beautify-date')(child.dob);
            childInfo.myRelationship = child.relation;
            childInfo.otherPartyRelationship = child.opRelation;
            childrenInfo.push(childInfo)
        }        

        return childrenInfo;
    }

    public getYourInfo(){

        let yourInformation = {} as yourInformationInfoDataInfoType;
        if(this.result.yourInformationSurvey){

            const applicantInfo = this.result.yourInformationSurvey;            
            yourInformation = {
                dob: applicantInfo.ApplicantDOB?applicantInfo.ApplicantDOB:'',
                name: applicantInfo.ApplicantName?applicantInfo.ApplicantName:'',
                lawyer: applicantInfo.Lawyer == 'y',
                lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
                address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress)?applicantInfo.ApplicantAddress:''),
                contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact)?applicantInfo.ApplicantContact:''),
                lawyerFiling: false,
                lawyerStatement: {lawyerName: '', clientName: ''}
            }                     
        }
        return yourInformation;
    }

    public getOtherPartyInfo(){

        let OpInformation = [
            {            
                dob: 'unknown',
                name: {'first': '','middle': '', 'last': ''},
                address: '',
                contactInfo: ''
            }               
        ];        

        if (this.result.otherPartyCommonSurvey && this.result.otherPartyCommonSurvey.length > 0){
            OpInformation = []; 
           
            for(const party of this.result.otherPartyCommonSurvey){ 
                let otherParty = {            
                    dob: '',
                    name: {'first': '','middle': '', 'last': ''},
                    address: '',
                    contactInfo: ''
                }                

                if (party['knowDob'] == 'y' &&  party['dob'])
                    otherParty.dob = party['dob']

                if (party['name'])
                    otherParty.name = party['name']
                
                if (party['address'])
                    otherParty.address = party['address']
                
                if (party['contactInfo'])
                    otherParty.contactInfo = party['contactInfo']
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getPpmInfo(){

        let ppmInformation = {} as priorityParentingInformationDataInfoType;

        if (this.result.ppmBackgroundSurvey) {
            ppmInformation.ExistingCase = (this.result.ppmBackgroundSurvey.ExistingOrdersFLM == 'y');
            ppmInformation.existingProceeding = (this.result.ppmBackgroundSurvey.existingCourtProceeding == 'y');
            ppmInformation.proceedingInfo = (this.result.ppmBackgroundSurvey.existingCourtProceeding == 'y' && 
                                                this.result.ppmBackgroundSurvey.existingCourtProceedingDetails)? this.result.ppmBackgroundSurvey.existingCourtProceedingDetails:'';
        }

        if (this.result.aboutPriorityParentingMatterOrderSurvey) {
            ppmInformation.facts = this.result.aboutPriorityParentingMatterOrderSurvey.applicationFacts;
            ppmInformation.orderdesc = this.result.aboutPriorityParentingMatterOrderSurvey.orderDescription;
        }





        return ppmInformation;
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>