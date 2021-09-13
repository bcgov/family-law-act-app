<template>
    <div v-if="dataReady">
<!-- <Page 1> -->
<!-- <HEADER> -->
        <div class="form-header-po"> 
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">               
                <div class="margintopminus" style="font-size:11pt;"><b>Application About a Protection Order</b></div>
                <div style="font-size:9pt;"><b>FORM 12</b></div>
                <div style="font-size:8pt;">Provincial Court Family Rules</div>
                <div style="font-size:8pt;">Rules 67, 68 and 172</div>
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
                            <div style="font-size:8pt; color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div>
        </div>

<!-- <1> -->
        <section>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="My name is" hint="full name of party" :italicHint="false" :text="yourInfo.name | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". My date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
                <div style="text-indent:5px;display:inline; line-height:1.5rem;"> . My contact information and address for service of court documents by the other party and the court are:</div>
                <table class="fullsize" style="margin-top:0.2rem !important;">
                    <tr style="border:1px solid #414142" >
                        <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
                        <td v-else  colspan="3">Lawyer (if applicable): </td>
                    </tr>
                    <tr style="border:1px solid #414142" >          
                        <td colspan="3">Address: <div class="answer"> {{serviceAddress.street}} </div> </td>
                    </tr>
                    <tr style="border:1px solid #414142" >
                        <td>City: <div class="answer">{{serviceAddress.city}}</div> </td>
                        <td>Province: <div class="answer">{{serviceAddress.state}}</div> </td>
                        <td>Postal Code: <div class="answer">{{serviceAddress.postcode}}</div> </td>
                    </tr>
                    <tr style="border:1px solid #414142" >
                        <td>Email: <div class="answer">{{serviceContact.email}}</div> </td>
                        <td></td>
                        <td>Telephone: <div class="answer">{{serviceContact.phone}}</div> </td>
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
                <check-box  :check="urgency.PORNoNotice == 'n'?'yes':''" text="I am applying with notice to the other party"/>
                <check-box v-if="urgency.PORNoNotice == 'y'"  :check="urgency.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i style=\'font-size:11.5px;\' > Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i><br/><div style=\'color:#000;font-size:10pt;line-height:1rem;\'>'+urgency.PORWhyNoNotice+'</div>'"/>
                <check-box v-else  :check="urgency.PORNoNotice == 'y'?'yes':''" :text="'I want to apply without notice to the other party because:<br><i style=\'font-size:11.5px;\' > Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i>'"/>
            </div>
        </section>

<!-- <3> -->
        <section> 
            <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="14.5rem" beforetext="The other party's name is" hint="full name of the other party" :italicHint="false" :text="otherParty.name | getFullName"/>
                <underline-form style="display:inline;text-indent:2px;" textwidth="7rem" beforetext=". Their date of birth is" hint="date of birth (mmm/dd/yyyy)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
                <div style="text-indent:5px;display:inline; line-height:1.5rem;"> . Their contact information, as I know it, is:</div>
                <table class="fullsize" style="margin-top:0.2rem !important;">
                    <tr style="border:1px solid #313132">
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
        </section>

<!-- <4> -->
        <section>  
            I am applying for the following order:           
            <div style="margin:0.25rem 0 0 1rem;" >
                <i>Select only one of the options below and complete the required schedule</i>
                <check-box  :check="orderType == 'needPO'?'yes':''" text="Protection order <i>[Complete and attach Schedule 1]</i>"/>
                <check-box  :check="orderType == 'changePO'?'yes':''" text="Order to change an existing protection order <i>[Complete and attach Schedule 2]</i>"/>
                <check-box  :check="orderType == 'terminatePO'?'yes':''" text="Order to terminate and existing protection order <i>[Complete and attach Schedule 3]</i>"/>
            </div>
        </section>

<!-- <For registery> -->
        <div class="print-block">
            <div style="margin:0.5rem 0 0 1rem;"><i>For registry use only</i></div>
            <div style="margin-left:1rem; width:96.37%; border:1px solid; font-weight:bold; padding:0.5rem;font-family:BCSans">
                <underline-form style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0;" textwidth="20.5rem" beforetext="<b>This application will be made to the court at</b>" hint="(court registry, street address, city)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>on</b>" hint="date (mmm/dd/yyyy)" text=""/>
                <underline-form style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
                <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>
            </div>
            <div style="margin:0.5rem 0 0 1rem;; font-family:BCSans; font-size:9pt;"><b>NOTICE TO THE OTHER PARTY: If you do not attend court on the date and time scheduled for the court appearance, the court may make an order in your absence.</b></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { addressInfoType, contactInfoType } from '@/types/Application/CommonInformation';
import { urgencyInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components:{
       UnderlineForm,
       CheckBox
    }
})
export default class CommonSection extends Vue {

    @Prop({required:true})
    result!: any;    

    otherPartyInfo=[]; 
    yourInfo = {} as yourInformationInfoDataInfoType;
    urgency = {} as urgencyInfoType;

    serviceAddress = {} as addressInfoType;
    serviceContact = {} as contactInfoType;

    existingFileNumber = '';
    orderType = '';   
    dataReady = false; 

    mounted(){
        this.dataReady = false;
        this.getServiceInfo();
        this.getOtherPartyInfo();
        this.getExistingFileNumber(this.result);
        this.yourInfo = this.getYourInfo() 
        this.orderType = this.getOrderType(); 
        this.urgency = this.getUrgencyInfo();
        this.dataReady = true;
    }

    public getOrderType(){
        let orderType = ''
        if(this.result?.poQuestionnaireSurvey?.orderType) 
            orderType =this.result?.poQuestionnaireSurvey?.orderType
        
        return orderType
    }
    
    public getUrgencyInfo(){
        
        let urgencyInfo = {PORNoNotice:'', PORWhyNoNotice:''}
        
        if(this.result?.urgencySurvey){
            urgencyInfo.PORNoNotice = this.result.urgencySurvey.PORNoNotice
            urgencyInfo.PORWhyNoNotice = this.result.urgencySurvey.PORWhyNoNotice
        }
           
        return urgencyInfo;
    }

    public getServiceInfo(){
        if(this.result?.yourinformationPOSurvey?.Lawyer == 'y'){
            this.serviceAddress = this.result.yourinformationPOSurvey.LawyerAddress
            this.serviceContact = this.result.yourinformationPOSurvey.LawyerContact
        }else if(this.result?.yourinformationPOSurvey){
            this.serviceAddress = this.result.yourinformationPOSurvey.ApplicantAddress
            this.serviceContact = this.result.yourinformationPOSurvey.ApplicantContact
        }
    }

    public getOtherPartyInfo(){
        
        let info = [] 
        let dob = ''
        let name = ''
        let address = ''
        let contactInfo = ''
        let lawyer = ''

        if(this.result?.poQuestionnaireSurvey?.orderType == 'needPO'){            

            if(this.result.protectionFromWhomSurvey?.RespondentDOBExact == 'y' &&   this.result.protectionFromWhomSurvey?.RespondentDOB)
                dob = this.result.protectionFromWhomSurvey.RespondentDOB
            
            if(this.result.protectionFromWhomSurvey?.RespondentName)
                name = this.result.protectionFromWhomSurvey.RespondentName
            
            if(this.result.protectionFromWhomSurvey?.RespondentAddress)
                address = this.result.protectionFromWhomSurvey.RespondentAddress
            
            if(this.result.protectionFromWhomSurvey?.RespondentContact)
                contactInfo = this.result.protectionFromWhomSurvey.RespondentContact
                
            info = [{'name':name, 'dob': dob , 'address': address ,'contact': contactInfo, 'lawyer':''}]
        }
        else if(this.result.poQuestionnaireSurvey?.orderType == 'changePO' || this.result.poQuestionnaireSurvey?.orderType == 'terminatePO'){    
            for(const party of this.result.otherPartySurvey){
                dob = ''
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

                if (party['lawyer'])
                    lawyer = party['lawyer']
                
                info.push({'name':name, 'dob': dob , 'address': address ,'contact': contactInfo, 'lawyer':lawyer})
            }
        }
        else
            info = [{'name':{'first': '','middle': '', 'last': ''}, 'address': '' ,'contact': '', 'lawyer':''}]

        this.otherPartyInfo = info
    }

    public getExistingFileNumber(result){
        if (result.poQuestionnaireSurvey?.orderType){
            const orderType = result.poQuestionnaireSurvey.orderType;
            if (orderType == 'needPO'){
                if(result.poFilingLocationSurvey?.ExistingFamilyCase == 'y' && result.poFilingLocationSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.poFilingLocationSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            } else if (orderType == 'changePO'){
                if(result.aboutSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.aboutSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            } else if (orderType == 'terminatePO'){
                if (result.aboutSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.aboutSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            }
        }      
    }
    
    public getYourInfo(){

        let yourInformation = {} as yourInformationInfoDataInfoType;       

        if(this.result?.yourinformationPOSurvey){

            const applicantInfo = this.result.yourinformationPOSurvey;
            const noLawyerAddressCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress;
            const noLawyerContactCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact;  
            
            yourInformation = {
                dob: applicantInfo.ApplicantDOB? applicantInfo.ApplicantDOB:'',
                name: applicantInfo.ApplicantName? applicantInfo.ApplicantName:'',
                lawyer: applicantInfo.Lawyer == 'y',
                lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
                address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((noLawyerAddressCondition)?applicantInfo.ApplicantAddress:''),
                contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((noLawyerContactCondition)?applicantInfo.ApplicantContact:''),

                lawyerFiling: false,
                lawyerStatement: {lawyerName: '', clientName: ''}
            }                     
        }
        return yourInformation;
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 