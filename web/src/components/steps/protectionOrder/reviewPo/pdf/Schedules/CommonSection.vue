<template>
    <div v-if="dataReady">
<!-- <Page 1> -->
<!-- <HEADER> -->
        <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt;"><b>Application About a Protection Order</b></div>
                <div style="font-size:12pt;"><b>FORM 12 </b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rules 67, 68 and 172</div>
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Court file number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ existingFileNumber ? existingFileNumber : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;"> Document number: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;"> {{ '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px; opacity: 0.3;"> For registry use only </div>
                </div>
            </div>
        </div>

        <!-- <Page 1> -->
<!-- <NOTICE SECTION> -->
        <div style="font-size: 10pt; width: 80%;">
            This Application About a Protection Order sets out the details of an order about a protection
            order that a person is applying for.<br/>
            A protection order made under the <i>Family Law Act</i> is a court order to protect a family
            member from another family member if there is a risk of family violence.
        </div>

        <div class="fla-col-left-80 fla-medium-grey" style="border: 1px dashed black; width: 80%">
            <b>Please read before completing this form:</b>
            <ul>
                <li>You must complete the main application and any applicable schedule for your
                    application identified in Part 2 of the main application.</li>
                <li>For guidance filling in this form, please read the guidebook. The guide is available
                    online at <a href="https://www.gov.bc.ca/court-forms">www.gov.bc.ca/court-forms</a> or from your local court registry.</li>
            </ul>
        </div>

        <div style="float: right;width: 18%; margin-top: -230px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
            <p>
                <b-icon-book />
                <div style="font-size: 9px">For more information about what family violence includes or who is a family member, see the guidebook.</div>
            </p>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <1> -->
    <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
            <b>Part 1 | Party information</b>
        </div>

        <section style="width: 80%; line-height: 28px;">
            <grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="<b>My full name</b> is (full name of party):" :italicHint="false" :text="yourInfo.name | getFullName"/>
            <div style="margin-top: 0.1rem;"></div>
            <grey-box-form marginTop="-22px" style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="My <b>date of birth</b> is (dd/mmm/yyyy):" :italicHint="false" :text="yourInfo.dob | beautify-date"/>
        </section>

        <section style="width: 80%; line-height: 28px;">
            <div v-for="(otherParty,inx) in otherPartyInfo" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                The person <b>I want protection from</b>, or <b>who made an application for protection from me</b>, is the other party.
                <div style="margin-top: 0.1rem;"></div>
                <grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="The <b>other party's full name</b> is:" :italicHint="false" :text="otherParty.name | getFullName"/>
                <div style="margin-top: 0.1rem;"></div>
                <grey-box-form marginTop="-22px" style="display:inline;text-indent:2px;" textwidth="7rem" beforetext="Their <b>date of birth</b> is:" hintindent="0.6rem" hint="(dd/mmm/yyyy) or (unknown)" :italicHint="false" :text="otherParty.dob | beautify-date"/>
            </div>
        </section>

        <div style="float: right;width: 18%; margin-top: -190px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
            <p>
                <b-icon-info-circle-fill />
                <div style="font-size: 9px">A protection order may be made on application by a family member claiming to be an at-risk family member or by
                a person on behalf of an atrisk family member [s. 183 <i>Family Law Act</i>].</div>
            </p>
        </div>

<!-- <2> -->
    <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
        <b>Part 2 | What are you asking for in this application</b>
    </div>

    <section style="width: 80%">
        I am <b>applying for the following order</b>:<br/>
        <i>Select only one of the options below and complete the required schedule</i>
        <br/>
        <check-box  :check="orderType == 'needPO'?'yes':''" text="<b>Protection order</b> ➜ <i>Complete <b>Schedule 1</b></i>"/>
        <check-box  :check="orderType == 'changePO'?'yes':''" text="<b>Order to change an existing protection order</b> ➜ <i>Complete <b>Schedule 2</b></i>"/>
        <check-box  :check="orderType == 'terminatePO'?'yes':''" text="<b>Order to terminate and existing protection order</b> ➜ <i>Complete <b>Schedule 3</b></i>"/>
    </section>

<!-- <PART 3> -->
    <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
        <b>Part 3 | Notice of the application</b>
    </div>

    <div style="float: right;width: 18%; margin-top: -25px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
        <p>
            <b-icon-book />
            <div style="font-size: 9px">For more information about serving court documents, see the guidebook.</div>
        </p>
    </div>

    <div style="margin-top: 1rem;"></div>

    <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 80%">
        An application is usually made with notice to the other party. To give notice, the other party must
        be served with the application and supporting documents at least 7 days before the date set for
        the court appearance.<br/>
        An application about a protection order can also be made without notice to the other party [s. 186
        <i>Family Law Act</i>].
    </div>

    <section style="width: 80%">
        <i>Select only one of the options below</i>
        <br/>
        <check-box  :check="urgency.PORNoNotice == 'n'?'yes':''" text="I am applying <b>with notice</b> to the other party"/>
        <check-box v-if="urgency.PORNoNotice == 'y'"  :check="urgency.PORNoNotice == 'y'?'yes':''" :text="'I want to apply <b>without notice</b> to the other party because:<br><i style=\'font-size:11.5px;\' > Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i><br/><div style=\'color:#000;background-color:#d6d6d6;font-size:10pt;line-height:1rem;\'>'+urgency.PORWhyNoNotice+'</div>'"/>
        <check-box v-else  :check="urgency.PORNoNotice == 'y'?'yes':''" :text="'I want to apply <b>without notice</b> to the other party because:<br><i style=\'font-size:11.5px;\' > Tell the court why the application or your situation is urgent and what you believe will happen if the other party is served with the application and given a chance to attend court so that you can both be heard at the same time.</i>'"/>
    </section>

    <div class="fla-col-left-80 fla-light-grey" style="border: 1px dashed black; width: 80%">
        <b>NOTE TO PARTY:</b><br/>
        You may make your application without notice to the other party, but the judge will decide if it
        will be heard without notice, if notice must be given, or if the notice period should be shortened.
    </div>

    <div style="float: right;width: 18%; margin-top: -240px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
        <p>
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">To apply without notice, you must satisfy the court that there is a real risk of danger or serious consequence if
            notice were required.</div>
        </p>
    </div>

    <div style="margin-top: 1rem;"></div>

    <!-- <PART 4> -->
    <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
        <b>Part 4 | About your court appearance</b>
    </div>

    <div style="float: right;width: 18%; margin-top: -140px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
        <p>
            <b-icon-book />
            <div style="font-size: 9px">For more information about applying with or without notice, see the guidebook.</div>
        </p>
    </div>

    <div>
        <i>For registry or judicial case manager use only</i>
    </div>

    <div class="fla-col-left-80" style="border: 1px solid black; line-height: 28px; width: 80%;">
            <b>The application, which requires a court appearance, will be heard by the court on</b><grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;" textwidth="10rem" hintindent="3rem" beforetext="" hint="date (mmm/dd/yyyy)" text=""/>
            <grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;" textwidth="10rem" beforetext="<b>at</b>" hint="time" text=""/>
            <div style="text-indent:5px;display:inline;"><b> a.m./p.m.</b></div>

            <div style="margin-top: 1rem;"></div>

            <div style="line-height: 16px; display: inline-block; width:38%; vertical-align: top; padding-left: 18px;">
                <check-box :check="''" text="In person at "/><br/>
                <check-box :check="''" text="by another method of attendance, as specified"/>
            </div>
            <div style="display: inline-block; width:58%">
                <grey-box-form marginTop="-22px" style="text-indent:2px;display:inline-block;margin:0 0 0.5rem 0; line-height: 28px;" textwidth="19.5rem" beforetext="" hint="court location" text=""/>
                <div style="line-height: 14px; border: 1px solid black;">
                    <b>Do not attend the courthouse in person</b>. The registry will send within 24 hours before the hearing
                        date noted above the link to connect by MS Teams, including a dial-in conferencing number to be used by
                        any party that is unable to use MS Teams or has problems with their video connection. If you have not
                        provided your email address or telephone number to the registry on your Notice of Address Change
                        (Form 46), you must contact the registry to obtain the MS Teams conference information.
                </div>
            </div>
    </div>

    <div style="margin-top: 1rem;"></div>

    <div class="fla-col-left-80 fla-light-grey" style="border: 1px dashed black; width: 80%">
        <b>NOTE TO THE OTHER PARTY:</b><br/>
        <b>If you do not attend</b> court on the date and time scheduled for the court appearance, the court
        may make an order in your absence.<br/>
        You may also choose to <b>file a written response</b> in reply to the application in Form 19 Written
        Response to Application.
    </div>

    <div style="float: right;width: 18%; margin-top: -280px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
        <p>
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">The registry or judicial case manager will work with you to schedule a date for the court
                appearance and will fill in the actual date and method of attendance on the form. Be prepared to talk about your
                availability if there are options for dates.</div>
        </p>
    </div>

    <div style="margin-top: 1rem;"></div>

    <!-- <5> -->
        <div style="background: #626262; color: white; font-size: 13pt; width: 80%;">
        <b>Part 5 | Address for service</b>
    </div>

    <section style="width: 80%">
        My <b>address for service</b> of court documents and contact information is:<br/>
        <i>You must provide an address for service and contact number, but it does not have to be<br/>
        your own if you don’t want</i>
        <br/>
        <table style="margin:1rem 0 1rem 0; width: 96%">
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
            <tr style="border:1px solid #414142" >
                <td v-if="yourInfo.lawyer" colspan="3">Lawyer (if applicable): <div class="answer"> {{yourInfo.lawyerName | getFullName}}</div></td>
                <td v-else  colspan="3">Lawyer (if applicable): </td>
            </tr>
        </table>
    </section>

    <div style="float: right;width: 18%; margin-top: -250px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 11px;">
        <p>
            <b-icon-info-circle-fill />
            <div style="font-size: 9px">For more information about how this information will be used and who will have
                access to it, see the guidebook.</div>
        </p>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm  from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import {getYourInformationResults} from "@/components/utils/PopulateForms/PopulateCommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { addressInfoType, contactInfoType } from '@/types/Application/CommonInformation';
import { urgencyInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components:{
       UnderlineForm,
       GreyBoxForm,
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
                lawyer = ''

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
            } else if (orderType == 'changePO' || orderType == 'terminatePO'){
                if(result.aboutSurvey?.ExistingFileNumber){
                    this.existingFileNumber = result.aboutSurvey.ExistingFileNumber;
                } else {
                    this.existingFileNumber = '';
                }
            }
        }      
    }
    
    public getYourInfo(){

        if(this.result?.yourinformationPOSurvey){
            return getYourInformationResults(this.result.yourinformationPOSurvey);
        }
        else
            return {} as yourInformationInfoDataInfoType;
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 