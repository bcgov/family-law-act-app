<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-enf">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:11pt;"><b>Application About Enforcement</b></div>                
                <div style="font-size:9pt;"><b>FORM 29</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rules 135 and 136</div>
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
        <section>
            <underline-form style="margin-left:0.1rem;text-indent:2px;display:inline-block; font-size: 9pt;" textwidth="20rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <underline-form style="display:inline;text-indent:2px; font-size: 9pt;" textwidth="9rem" beforetext=". My date of birth is" hint="(mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
            <div style="text-indent:1px;display:inline; font-size: 9pt;">.</div>
            <div style="text-indent:0; margin-top:7px; font-size: 9pt;">My contact information and address for service of court documents are:</div>
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

<!-- <2> -->
        <section> 
            <div style="display:inline; margin:0.25rem 0 0 0.35rem;font-size: 9pt;" >
                <i>Select whichever option is correct</i>
            </div>
            <div style="margin:0rem 0 0 1.0rem;font-size: 9pt;" >
                <check-box  :check="form29Info.otherPartyNotice?'yes':''" text="This application is about enforcement under Rule 135. I understand I must give notice of this application to each other party. To
                    give notice, they must be served with the application and supporting documents at least 7 days before the date set for the court
                    appearance unless the court allows the application to be made without notice or with less than 7 days' notice."/>
                <check-box  :check="form29Info.foreignNotice?'yes':''" text="This application is to set aside the registration of a foreign support order under the <i>Interjurisdictional Support Orders Act.</i> I
                    understand I must give notice of this application to the designated authority. To give notice, the designated authority must be
                    served with the application and supporting documents by registered mail at least 30 days before the application is to be heard
                    by the court." />
            </div>
        </section>
        

<!-- <3> -->
        <div class="print-block" style="margin-top:1rem;">
            <section> 
                <div style="display:inline; font-size: 9pt;">
                    <underline-form 
                        style="text-indent:2px;display:inline-block;" 
                        textwidth="19rem" 
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
                    <div style="text-indent:5px;display:inline;"> .</div>
                    <div style="text-indent:1px; margin-top:0.25rem;"> Their contact information, as I know it, is:</div>
                    <table class="compactfullsize">
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
                            <td colspan="2">Email: <div class="answer">{{firstOtherParty.contactInfo?firstOtherParty.contactInfo.email:''}}</div> </td>
                            <td>Telephone: <div class="answer">{{firstOtherParty.contactInfo?firstOtherParty.contactInfo.phone:''}}</div> </td>
                        </tr>
                    </table>
                </div>
                <div style="text-indent:5px; margin:0"><i>Additional party (Complete only if applicable.)</i></div>
                        
                <div v-if="additionalOtherParties.length>0" style="font-size: 9pt;">

                    <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    
                        <table class="compactfullsize">
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
                                <td colspan="2">Email: <div class="answer">{{otherParty.contactInfo?otherParty.contactInfo.email:''}}</div> </td>
                                <td>Telephone: <div class="answer">{{otherParty.contactInfo?otherParty.contactInfo.phone:''}}</div> </td>
                            </tr>
                        </table>                    
                    </div>
                </div>
                <div v-else>

                    <div style="display:inline; font-size: 9pt;">
                    
                        <table class="compactfullsize">
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

        <!-- <For registery> -->
        <div class="print-block">
            <div style="margin:0 0 0 1rem; font-size: 9pt;"><i>For registry use only</i></div>
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-weight:bold; font-size: 9pt; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="21rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="(date)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="(time)" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin:0.5rem 0 0 1rem; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>

        <div class="print-block mt-5"></div>

        <div style="text-align:left;"><b>ABOUT THE ORDER</b></div>


<!-- <4> -->
            <section>
            <div style="margin:0 0 0 0.5rem;display:inline; font-size: 9pt;">I am applying for an order:</div>

            <div style="margin:0 0 0 1rem;font-size: 9pt;" >
                <i>Select all options that apply</i>
                <div  style="margin:0.0rem 0 0 0rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" :check="form29Info.orderList.includes('writtenAgreementOrder')?'yes':''" text="to enforce the order or filed written agreement made on"/>               
                    <underline-form class="marginleft0p25vue" style="text-indent:0px;margin-left:-0.5rem; display:inline-block;" textwidth="10rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form29Info.writtenAgreementOrderDate"/>
                </div>

                <div  style="margin:0.2rem 0 0 0rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" :check="form29Info.orderList.includes('determination')?'yes':''" text="to enforce, change or set aside the filed determination of a parenting coordinator dated"/>               
                    <underline-form class="marginleft0p25vue" style="text-indent:0px;margin-left:-0.5rem;display:inline-block;" textwidth="7rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form29Info.determinationDate"/>
                </div>

                <div  style="margin:0.2rem 0 0 0rem;">
                    <check-box  :check="form29Info.orderList.includes('expenses')?'yes':''" text="to have reasonable and necessarily incurred expenses set under the following sections of the <i>Family Law Act</i>:"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section61')?'yes':''" text="section 61 <i>[denial of parenting time or contact]</i>"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section63')?'yes':''" text="section 63 <i>[failure to exercise parenting time or contact]</i>"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section212')?'yes':''" text="section 212 <i>[orders respecting disclosure]</i>"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section213')?'yes':''" text="section 213 <i>[enforcing orders respecting disclosure]</i>"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section228')?'yes':''" text="section 228 <i>[enforcing orders respecting conduct]</i>"/>
                    <check-box style="margin:0 0 0 1.75rem;" :check="form29Info.expenseList.includes('section230')?'yes':''" text="section 230 <i>[enforcing orders generally]</i>"/>                
                </div>

                <div style="margin:0.5rem 0 0 0rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline;" :check="form29Info.orderList.includes('arrears')?'yes':''" text="to determine whether arrears are owing under the support order or agreement dated"/>               
                    <underline-form class="marginleft0p25vue" style="text-indent:0px; margin-left:-0.5rem; display:inline;" textwidth="8rem" beforetext="" hint="(mmm/dd/yyyy)" :text="form29Info.arrearsDate"/>
                    <div style="text-indent:10px;display:inline-block;">make under the <i>Family Law Act</i>, and if so, the amount of arrears (unpaid support)</div>
                </div>
                <div  style="margin:0.2rem 0 0 0rem;">
                    <check-box  :check="form29Info.orderList.includes('foreignSupport')?'yes':''" text="to set aside the registration of a foreign order under section 19(3) of the <i>Interjurisdictional Support Orders Act</i>"/>
                </div>
                
            </div>                  
        </section>


<!-- <5> -->
        <div class="print-block" style="margin:2rem 0;">
            <section>         
                <check-box inline="inline" boxMargin="0" style="display:inline;margin:0 0 0 0.35rem;font-size: 9pt;" :check="form29Info.attachRequiredDocuments?'yes':''" text="I am attaching a copy of the order, written agreement or determination this application is about."/>                      
            </section>
        </div>   


<!-- <6> --> 
        <div class="print-block">            
            <section>               
                <div style="display:inline; margin-left:0.25rem;font-size: 9pt;">
                    The details of the order I am applying for are as follows:                   
                </div>               
                <div>
                    <i style="margin:0 0 0 0.1rem;text-indent:0; display: block;font-size: 9pt;">
                        Tell the court and the other party the specifics of the order you are applying for. Include how you want to see the order or
                        agreement enforced or the remedy you are applying for.
                    </i>
                    <div v-if="form29Info.orderdesc" 
                        class="answerbox">{{form29Info.orderdesc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </div>            
            </section>
        </div>   


<!-- <7> --> 
        <div class="print-block">            
            <section>
                <div style="display:inline; margin-left:0.1rem;font-size: 9pt;">
                    The facts on which this application is based are as follows:
                </div>
                <i style="text-indent:0; margin:0 0 0 0rem; display: block;font-size: 9pt;">
                   Provide the facts you want the court to consider. Include how the other party has failed to follow the order or agreement,
                    if applicable, and why the court should make the order you are applying for.
                </i>                
                <div v-if="form29Info.facts" 
                    class="answerbox">{{form29Info.facts}}</div>
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

import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import CheckBoxII from "./components/CheckBoxII.vue";
import OrderedCheckBox from "./components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { form29InformationDataInfoType, enfrcOtherPartyDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { requiredDocumentsInfoType } from '@/types/Common';
import { getYourInformationResults } from '@/components/utils/PopulateForms/PopulateYourInformation';

@Component({
    components:{
        UnderlineForm,
        CheckBox, 
        CheckBoxII,
        OrderedCheckBox        
    }
})

export default class Form29Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.State
    public requiredDocuments!: requiredDocumentsInfoType;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form29Info = {} as form29InformationDataInfoType;
    
    existingFileNumber = ''; 

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
   
    public extractInfo(){
               
        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }        
        
        this.yourInfo = this.getYourInfo();
        this.form29Info = this.getForm29Info();
        this.getLocationInfo()
    } 
    
    public getLocationInfo(){                
        const locationData = this.result.filingLocationSurvey;           
        this.existingFileNumber = locationData?.ExistingFileNumber? locationData.ExistingFileNumber:'';        
    }   

    public getYourInfo(){           

        if(this.result?.yourInformationSurvey){
            return getYourInformationResults(this.result?.yourInformationSurvey); 
        } 
        else
            return {} as yourInformationInfoDataInfoType
    }

    public getOtherPartyInfo(){

        let OpInformation: enfrcOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                let otherParty = {} as enfrcOtherPartyDataInfoType;               

                if (party.knowDob == 'y' &&  party.dob)
                    otherParty.dob = party.dob

                if (party.name)
                    otherParty.name = party.name;
                
                if (party.address)
                    otherParty.address = party.address;
                
                if (party.contactInfo)
                    otherParty.contactInfo = party.contactInfo;

                if (party.lawyer)
                    otherParty.lawyer = party.lawyer
                
                OpInformation.push(otherParty)
            }
        } 

        return OpInformation
    }  
    
    public getForm29Info() {

        let form29Information = {} as form29InformationDataInfoType;
        form29Information.orderList = [];
        form29Information.expenseList = [];
        form29Information.arrearsDate = '';
        form29Information.foreignNotice = false;
        form29Information.otherPartyNotice = false;
        form29Information.attachRequiredDocuments = false;

        if (this.result?.enfrcQuestionnaireSurvey) {
            const enfrcQuest = this.result.enfrcQuestionnaireSurvey;
            if (enfrcQuest.includes('parentingCoordinatorDetermination')){

                form29Information.orderList.push('determination')
                if (this.result.enforceChangeSetAsideDeterminationSurvey){
                    form29Information.determinationDate = Vue.filter('beautify-date')(this.result.enforceChangeSetAsideDeterminationSurvey.existingDate);
                }    

            }

            if (enfrcQuest.includes('writtenAgreementOrder') && this.result.enforceAgreementOrOrderSurvey) {
                form29Information.orderList.push('writtenAgreementOrder');
                form29Information.writtenAgreementOrderDate = Vue.filter('beautify-date')(this.result.enforceAgreementOrOrderSurvey.existingDate);
            }

            if (enfrcQuest.includes('arrears') && this.result.detrermineArrearsSurvey){                
                form29Information.orderList.push('arrears');
                form29Information.arrearsDate = Vue.filter('beautify-date')(this.result.detrermineArrearsSurvey.existingDate);
            }

            if (enfrcQuest.includes('expenses') && this.result?.determineAnAmountOwingForExpensesSurvey?.amountOwingActionType){
                form29Information.orderList.push('expenses');                
                form29Information.expenseList = this.result.determineAnAmountOwingForExpensesSurvey.amountOwingActionType;
            }

            if (enfrcQuest.includes('foreignSupport') || this.requiredDocuments?.agreementEnfrc?.required?.length>0){
                form29Information.attachRequiredDocuments = true;
            }
            
            if (enfrcQuest.includes('foreignSupport')){
                form29Information.orderList.push('foreignSupport');              
            }

            if(enfrcQuest.includes('foreignSupport') && enfrcQuest.length==1){
                form29Information.otherPartyNotice = false;
                form29Information.foreignNotice = true;
            }else if(this.result?.otherPartyCommonConfirmationSurvey?.confirmation == "Confirmed")
            {
                form29Information.otherPartyNotice = true;
            }         
        }

        if (this.result.aboutTheOrderEnforcementSurvey) {

            const abtOrdrEnfrc = this.result.aboutTheOrderEnforcementSurvey;
            
            form29Information.facts = abtOrdrEnfrc.applicationFacts;            
            form29Information.orderdesc = abtOrdrEnfrc.orderDescription;
        } 
       
        return form29Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>