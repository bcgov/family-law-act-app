<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-one-header">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Notice to Resolve a Family Law Matter</b></div>               
                <div style="font-size:9pt;"><b>FORM 1</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rule 10</div>
            </div>
            <div style="float:right;">
                <b-table
                    :items="[{name:'REGISTRY LOCATION:', value:result.applicationLocation},{name:'COURT FILE NUMBER:', value: existingFileNumber}]"
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
            <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:5px;display:inline;"> . My contact information is:</div>
            <table class="fullsize" style="margin-top:0.5 !important">
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
<!-- <2> -->
        <section class="mt-1">
            <div style="display:inline; margin-left:0.25rem">I would like help with the following family law matter(s):</div>
            <div style="margin-left:1rem;">
                <i>Select all options that apply</i>               
                <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('parentingArrangements')?'yes':''" text="parenting arrangements, including parental responsibilities and parenting time"/>                
                <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('childSupport')?'yes':''" text="child support"/> 
                <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('contactWithChild')?'yes':''" text="contact with a child"/>
                <check-box style="line-height:1.15rem;" :check="selectedPathways.includes('guardianOfChild')?'yes':''" text="appointing a guardian of a child"/>
                <check-box style="line-height:1.15rem;margin-bottom:0.25rem;" :check="selectedPathways.includes('spousalSupport')?'yes':''" text="spousal support"/>
                <check-box style="line-height:1.15rem;margin-bottom:0.25rem;" :check="selectedPathways.includes('companionAnimal')?'yes':''" text="property division in respect of a companion animal"/>
            </div>
        </section>

<!-- <3> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem;display:inline;" 
                :check="true?'yes':''" 
                text="I understand the following people must be given notice of my application:"/>
            <ul style="margin:0 0 0 1.5rem;">
                <li style="text-indent:0.25rem;">all parents and current guardians of each child who is the subject of the family law matter</li>
                <li style="text-indent:0.25rem;">my spouse, if I am applying for spousal support or property division in respect of a companion animal</li>
                <li style="text-indent:0.25rem;">each other adult who the application about a family law matter is about</li>
            </ul>
            <p style="margin:0.05rem 0 0rem 2.1rem; text-indent:0;">They are the other party/parties in this case.</p>                
        </section>

<!-- <4> -->
        <div class="print-block">
            <section> 
                <div style="display:inline;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="14.5rem" 
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
                    <table class="fullsize">
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">
                                Lawyer (if applicable): 
                                <div class="answer">
                                    {{firstOtherParty.lawyer}}
                                </div>
                            </td>
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
                            <td colspan="2">Email: <div class="answer">{{firstOtherParty.contact?firstOtherParty.contact.email:''}}</div> </td>
                            <td>Telephone: <div class="answer">{{firstOtherParty.contact?firstOtherParty.contact.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
                <div style="text-indent:5px;display:inline;"><i>Additional party (Complete only if applicable. You may leave this section blank.)</i></div>
                        
                <div v-if="additionalOtherParties.length>0">

                    <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    
                        <table class="fullsize">
                            <tr style="border:1px solid #313132">
                                <td colspan="2">Full name: <div class="answer">{{otherParty.name | getFullName}}</div> </td>                                
                                <td>Date of birth: <div class="answer">{{otherParty.dob | beautify-date}}</div> </td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">Contact information</td>
                            </tr>
                            <tr style="border:1px solid #313132" >                        
                                <td colspan="3">
                                    Lawyer (if applicable): 
                                    <div class="answer">
                                        {{otherParty.lawyer}}
                                    </div>
                                </td>
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
                                <td colspan="2">Email: <div class="answer">{{otherParty.contact?otherParty.contact.email:''}}</div> </td>
                                <td>Telephone: <div class="answer">{{otherParty.contact?otherParty.contact.phone:''}}</div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
                <div v-else>

                    <div style="display:inline;">
                    
                        <table class="fullsize">
                            <tr style="border:1px solid #313132">
                                <td colspan="2">Full name: <div class="answer"></div> </td>
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
                                <td colspan="2">Email: <div class="answer"></div> </td>
                                <td>Telephone: <div class="answer"></div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
            </section>
        </div> 

<!-- <5> -->
        <div class="print-block">
            <div style="margin-top:1rem;"><b>Identification of child(ren)</b></div>
            <section>
                <div style="display:inline; margin-left:0.25rem; "><i>Select only one of the options below and complete the required information:</i></div>          
                <div style="margin:0.25rem 0 0 1rem;font-size: 9.51pt;" >                    
                    <check-box marginLeft="1.5rem"  :check="!childRelatedType?'yes':''" text="My family law matter is not about a child or children"/>
                    <check-box marginLeft="1.5rem"  :check="childRelatedType?'yes':''" text="My family law matter is about the following child or children:"/>
                </div>
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
                            Child's date of birth <br/><i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                </b-table> 
            </section>
        </div>

        <div class="print-block mt-0">
            <div style="margin-top:1rem;"><b>Filing location</b></div>            
<!-- <6> -->
            <section>
                <div style="display:inline; margin:0 0 0 0.25rem">I am filing this form in the court registry:</div>
                <div style="margin-left:1rem;">
                    <i>Select only one of the options below</i>
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location where my existing case with the same party/parties is filed')?'yes':''" 
                        text="where my existing case with the same party/parties is located"/> 
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location closest to where the child lives, because my case involves a child-related issue')?'yes':''" 
                        text="closest to where the child lives most of the time, because my case involves a child-related issue"/>          
                    <check-box  
                        :check="(filingLocationReason == 'It is the court location closest to where I live because my case does not involve a child-related issue')?'yes':''" 
                        text="closest to where I live because my case does not involve a child-related issue"/>
                    <check-box  
                        :check="(filingLocationReason == 'The court made an order that allows me to')?'yes':''" 
                        text="permitted by court order"/>                    
                </div>
            </section>
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>Existing written agreements or court orders</b></div>
<!-- <7> -->
            <section>
                <div style="display:inline; margin-left:0.25rem">
                    There is an existing written agreement or court order about parenting arrangements, 
                    child support, contact with a child, guardianship of a child, spousal support, and/or 
                    property division in respect of a companion animal. 
                </div>          
                <div style="margin-left:1rem">
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingFlm?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingFlm?'yes':''" text="No"/>                    
                </div>
            </section>
        </div>

 <!-- <8> -->
        <section> 
            <div style="display:inline; margin-left:0.25rem">
                There is an existing court order, agreement or plan protecting one of the parties, the 
                child(ren), or restraining contact between the parties, including a protection order, 
                an order, agreement or plan involving child protection services, a peace bond, restraining 
                order, bail condition or other criminal order.
            </div>            
            <div style="margin-left:1rem">
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="existingOrders.existingPO?'yes':''" text="Yes"/>
                <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;" :check="!existingOrders.existingPO?'yes':''" text="No"/>                
            </div>
        </section> 

        <div class="print-block" style="border:1px solid #414142; padding: 1rem; margin-top: 2rem;" >
                <div style="margin-top:0rem;"><b>NOTE TO THE PARTIES:</b></div>
                <div style="margin-top:0rem; font-size:9pt; text-align:justify;">
                    This Notice to Resolve a Family Law Matter has been filed with the Provincial 
                    Court of British Columbia.
                    Before proceeding any further with your case, each party is required to meet 
                    the early resolution requirements described in the rules. If you do not resolve 
                    all family law matters during the early resolution process, either party can apply 
                    to the Provincial Court for a court order. If you do not participate in the 
                    early resolution process, the other party will be allowed to proceed to the 
                    Provincial Court to ask for a court order. A party must have met the early 
                    resolution requirements before they will be allowed to file an Application About a
                    Family Law Matter or Reply to an Application About a Family Law Matter in the case. 
                </div>                
        </div>

        <div class="print-block mt-2 ml-4">
            <b style="margin-left:0.25rem">WHAT YOU MUST DO</b>
            <div style="margin-left:1rem; margin-top:0.5rem;">
                
                <ordered-check-box :order="1" text="<b>Contact</b> Family Justice Services Division to <b>schedule</b> your individual <b>needs assessment</b>." style="display:inline-block;" :check="false?'yes':''"/>            
                <div style="margin-left:3rem; margin-top:0.75rem;">
                    If you have already participated in some or all of the early resolution requirements within the last year,
                    Family Justice Services Division will confirm you have met the early resolution requirements and prepare
                    the required documents for the court.
                </div>

                <div style="margin:0.75rem 0 0.5rem 3rem;">
                    <b>NOTE:</b> You may be contacted by a needs assessor if someone else has filed a Notice to Resolve a Family
                    Law Matter and named you as the other party in that document.
                </div>

                <ordered-check-box :order="2"  :check="false?'yes':''" text="<b>Participate in a needs assessment</b>"/>
                <div style="margin-left:3rem;margin-bottom:0.5rem">
                    A needs assessment is a one-on-one meeting with a needs assessor who is a neutral person trained
                    to help people understand this process and other ways that are available to resolve their family law
                    matter and other issues. A needs assessor can provide some legal information, make referrals to
                    supports, including legal advice, and help identify the next steps that are right for you.
                </div>
                
                <ordered-check-box :order="3"  :check="false?'yes':''" 
                text="<b>Complete a parenting education course</b>, unless you are exempt for one of the reasons identified in Rule 17."/>
                <div style="margin-left:3rem;margin-bottom:0.5rem">
                    Your needs assessor will provide you with more information on the parenting education course right
                    for you and how to complete it.
                </div>

                <ordered-check-box :order="4"  :check="false?'yes':''" 
                text="<b>Participate in consensual dispute resolution</b>, unless your needs assessor determines that it is not appropriate."/>
                <div style="margin-left:3rem;margin-bottom:0.25rem">
                    Your needs assessor will provide you with more information on what consensual dispute resolution
                    is, whether it is right for you, and the process for participating in it.
                </div>
            </div>
        </div>

        <div class="print-block">
                <div style="margin-top:1rem;"><b>NOTE TO THE PARTIES:</b></div>
                <div 
                    style="margin-top:0.5rem; font-size:9.7pt; text-align:justify;">
                    <div style="margin-bottom:2rem">
                        <b>If you require a time sensitive order on a family law matter</b>
                        you may be able to postpone participation in one or more of the early resolution requirements until after you have received 
                        your time sensitive order. Please speak to Family Justice Services Division or the court registry if this situation applies to you.
                    </div>
                    <b>Reminder:</b>
                    <div>
                        If you do not resolve all family law matters during the early resolution requirements, either party can file an
                        application in the Provincial Court to request a court order.
                    </div>
                    <div style="margin-top:1rem;">
                        If you do not participate in the early resolution requirements, the other party will be allowed to proceed to the
                        Provincial Court to ask for a court order. A party must have met the requirements for early resolution before
                        they will be allowed to file an Application About a Family Law Matter or Reply to an Application About a Family
                        Law Matter in the case.
                    </div>
                </div>                
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
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { childrenInfoSurveyInfoType, yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { childDetailsDataInfoType } from '@/types/Application/FamilyLawMatter';
import { existingOrdersInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        OrderedCheckBox        
    }
})
export default class Form1Layout extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    selectedPathways!: string[];
    
    @applicationState.State
    public applicantName!: nameInfoType;  

    dataReady = false;   

    otherPartyInfo=[];
    additionalOtherParties = [];
    firstOtherParty = {} as any;
    yourInfo = {} as yourInformationInfoDataInfoType;
    childrenInfo: childrenInfoSurveyInfoType[] = []; 
    applicantList = [];
    childRelatedType = false;
    filingLocationReason = '';  
    existingOrders = {} as existingOrdersInfoType;
    existingFileNumber = '';
    
    childrenFields=[
        {key:"fullName", label:"Child's full name",                   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"dob",      label:"Child's date of birth (mmm/dd/yyyy)", tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:15%;"}
    ]
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();     
        this.dataReady = true;
    } 

    public extractInfo(){        
        
        if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'y') {
            this.filingLocationReason = 'It is the court location where my existing case with the same party/parties is filed';
        } else if (this.result.filingLocationSurvey?.ExistingFamilyCase == 'n' && this.result.filingLocationSurvey?.filingLocationReason){
            this.filingLocationReason = this.result.filingLocationSurvey.filingLocationReason;
        }

        this.existingOrders = {existingFlm: false, existingPO: false}

        this.existingOrders.existingFlm = this.result.flmBackgroundSurvey?.ExistingOrdersFLM == 'y';
        this.existingOrders.existingPO =  this.result.flmBackgroundSurvey?.existingPOOrders == 'y';

        this.existingFileNumber = this.result.filingLocationSurvey?.ExistingFileNumber? this.result.filingLocationSurvey.ExistingFileNumber : ''

        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }   
        this.childrenInfo = this.getChildrenInfo();     
        this.yourInfo = this.getYourInfo();
    }   
    
    public getChildrenInfo(){
        
        const selectedPathways = this.result?.flmQuestionnaireSurvey?this.result?.flmQuestionnaireSurvey:[];
        
        if (selectedPathways.includes("parentingArrangements") || 
                selectedPathways.includes("childSupport") ||
                selectedPathways.includes("contactWithChild") ||
                selectedPathways.includes("guardianOfChild")){
            this.childRelatedType = true;
        } else {
            this.childRelatedType = false;
        }

        const childrenInfo: childrenInfoSurveyInfoType[] = [];
        let childInfo = {} as childrenInfoSurveyInfoType;
        const childData: childDetailsDataInfoType[] = this.result?.childrenInfoSurvey? this.result.childrenInfoSurvey: [];
        
        if(this.childRelatedType){
            for (const child of childData){            
                childInfo = {fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''};
                childInfo.fullName = Vue.filter('getFullName')(child.name);
                childInfo.dob = Vue.filter('beautify-date')(child.dob);            
                childrenInfo.push(childInfo)
            }        
        }
        else
            childrenInfo.push({fullName: '', dob:'', myRelationship: '', otherPartyRelationship: '', currentSituation: ''});
          

        return childrenInfo;
    }

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
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

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];  
 
            for(const party of this.result.otherPartyCommonSurvey){
                const otherParty = {            
                    dob: '',
                    name: {'first': '','middle': '', 'last': ''},
                    address: '',
                    contactInfo: '',
                    lawyer:''
                }                

                if (party['knowDob'] == 'y' &&  party['dob'])
                    otherParty.dob = party['dob']

                if (party['name'])
                    otherParty.name = party['name']
                
                if (party['address'])
                    otherParty.address = party['address']
                
                if (party['contactInfo'])
                    otherParty.contactInfo = party['contactInfo']
                
                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }    
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>