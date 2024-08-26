<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
    <FormHeader :headerTableData="headerTableData" formName="Request to File a Determination of Parenting Coordinator" formNumber="Form 27" formRuleNumber="Rule 133"></FormHeader>
        
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Request to File a Determination of Parenting Coordinator provides information about a
                    determination of a parenting coordinator that a person is filing under the <i>Family Law Act</i> in
                    the Provincial Court. A determination of a parenting coordinator that is filed in Provincial
                    Court is enforceable under the Act as if it were an order of the Provincial Court. 
                </div>
            </div>
            <div style="width: 20%; margin-top: 64px;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 1> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="About the parties"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="margin-top: 0.1rem;"></div>

<!-- <1> -->
    <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">1.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;"><b>My full name </b>is</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="55%" 
                    beforetext="" 
                    hint="Full name of party"
                    hintindent="23%"
                    :italicHint="false" :text="yourInfo.name | getFullName"/>
                <div style="margin-top: 0.8rem;"></div>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">My <b>date of birth</b> is:</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="42.8%" 
                    beforetext="" 
                    hint="(dd/mmm/yyyy)" 
                    hintindent="15%"
                    :italicHint="false" :text="yourInfo.dob | beautify-date"/>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">2.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">The <b>other party who is the subjest of this determination</b> is:</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="300px" 
                    beforetext="" 
                    hint="Full name of party"
                    hintindent="100px"
                    :italicHint="false" :text="firstOtherParty.name | getFullName"/>
                <div style="margin-top: 0.8rem;"></div>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">Their <b>date of birth</b> (dd/mmm/yyyy) is:</div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="300px" 
                    beforetext="" 
                    hint="(dd/mmm/yyyy)" 
                    hintindent="100px"
                    :italicHint="false" :text="firstOtherParty.dob | beautify-date"/>
                <div style="margin-top: 0.8rem;"></div>
                <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="additionalOtherParties.length>0?'yes':''" text="There is an additional party."/>
                <br>
                <div v-for="(otherParty,inx) in additionalOtherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                    <table>
                        <tr>
                            <td style="text-align: right; padding: 6px; width: 330px;">
                                <div style="display: inline-block; font-size: 11pt; align-content: right;">
                                    The <b>additional party's full name</b> is:
                                </div>
                            </td>
                            <td style="padding: 6px; width: 230px;">
                                <grey-box-form style="text-indent:4px;display:inline; font-size: 9pt;" textwidth="210px"
                                    beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="otherParty.name | getFullName" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right; padding: 6px; width: 330px;">
                                <div style="display: inline-block; font-size: 11pt; align-content: right;">
                                    Their <b>date of birth</b> (dd/mmm/yyyy) is:
                                </div>
                            </td>
                            <td style="padding: 6px; width: 230px;">
                                <grey-box-form style="text-indent:4px;display:inline; font-size: 9pt;" textwidth="210px"
                                    beforetext="" hint="" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="otherParty.dob | beautify-date" />
                            </td>
                        </tr>
                    </table>    
                </div>
            </div>
            <div style="width: 20%;margin-top:-42px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        A person can apply under Rule 135 to enforce, change, or set aside a filed determination of a parenting
                        coordinator using the Application About Enforcement Form 29. The determination must first be
                        filed with the court. 
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

<!-- <Part 2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Request to file determination of parenting coordinator"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="margin-top: 0.1rem;"></div>

<!-- 3/4 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">3.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">I <b>request to file a copy of the determination</b> by a parenting coordinator referred to in
                    section 18 <i>[determinations by parenting coordinators]</i> of the <i>Family Law Act</i> dated<br/></div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="25%" 
                    beforetext="" 
                    hint="(dd/mmm/yyyy)"
                    hintindent="10%"
                    :italicHint="false" :text="yourInfo.dob | beautify-date"/>
                <div style="display:inline; margin-left: 195px;">, between the above parties, in the Provincial Court.</div>
                <div style="margin-top: 0.8rem;"></div>
                <b style="padding-right:3px">4.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">The parenting coordinator made the determination under:<br/>
                    <i>Select only one of the options below and complete the required information</i><br/></div>
                <div style="margin-top: 0.8rem;"></div>
                <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="form27Info.type == 'writtenAgreement'?'yes':''" text="An <b>agreement</b> made on "/>
                <grey-box-form style="text-indent:4px;display:inline-block;" textwidth="290px"
                    beforetext="" hint="Date (dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="form27Info.agreementDate" />
                <div style="margin-top: 0.8rem;"></div>
                <grey-box-form style="text-indent:4px;display:inline-block;" textwidth="290px"
                    beforetext="<b>between</b>" hint="(Parties to the agreement)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="form27Info.partiesToAgreement" />
                    <b>Which is filed in the<br/><div style="text-indent:8px"> Provincial Court.</div></b>
                <br/>
                <check-box inline="inline" :shiftmark="0" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="form27Info.type == 'courtOrder'?'yes':''" text="A <b>court order</b> made on "/>
                <grey-box-form style="text-indent:4px;display:inline-block;" textwidth="290px"
                    beforetext="" hint="Date (dd/mmm/yyyy)" :italicHint="false" textBackgroundColor="#dedede" hintMargin="152px" :text="form27Info.orderDate" />
            </div>
            <div style="width: 20%;margin-top:-42px;">
                <NoteBox>
                    <b-icon-book />
                    <br />
                    <p>
                        You must file a copy of the determination of a parenting coordinator along with this form. 
                    </p>
                </NoteBox>
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        A parenting coordinator may assist only if there is a parenting coordination agreement or order in place
                        [s. 15 <i>Family Law Act</i>]. If you had a written agreement to use a parenting coordinator, the agreement
                        must also be filed with the court using the Request to file an Agreement Form 26.
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>

<!-- <Part 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="Address for service"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="margin-top: 0.1rem;"></div>

<!-- 5 -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <b style="padding-right:3px">5.</b>
                <div style="display:inline; margin:0 0 0 0.25rem; line-height: 15px;">My <b>address for service</b> of court documents and 
                    contact information is:<br/> <i>You must provide an address for service and contact number, but it does not have to 
                    be your own if you don’t want to</i><br/></div>
                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 2px; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:2px solid #fff">
                        <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                            Address: 
                            <div class="answer" style="background-color: #d6d6d6;">
                                {{ yourInfo.address.street }} 
                            </div>
                        </td>
                    </tr>
                    <tr style="border:2px solid #fff">
                        <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.city }}</div>
                        </td>
                        <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.state }}</div>
                        </td>
                        <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.address.postcode }}</div>
                        </td>
                    </tr>
                </table>

                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 2px; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:2px solid #fff">
                        <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.email }}</div>
                        </td>
                        <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ yourInfo.contact.phone }}</div>
                        </td>
                    </tr>
                </table>

                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 2px; font-size: 9pt; background-color: #dedede;">
                    <tr style="border:1px solid #fff;">
                        <td v-if="yourInfo.lawyer" colspan="3" style="border:2px solid #fff; padding: 4px;">Lawyer’s name and firm name (if applicable): 
                            <div class="answer" style="background-color: #d6d6d6;">
                                {{ yourInfo.lawyerName | getFullName}}
                            </div>
                        </td>
                        <td v-else colspan="3" style="border:2px solid #fff; padding: 4px;" >Lawyer’s name and firm name (if applicable): </td>
                    </tr>
                </table>
            </div>
            <div style="width: 20%;margin-top:-42px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        This information will be available to the other party and the court. 
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.8rem;"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm from "@/components/utils/PopulateForms/components/GreyBoxForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import OrderedCheckBox from "@/components/utils/PopulateForms/components/OrderedCheckBox.vue";
import { nameInfoType, otherPartyInfoType } from "@/types/Application/CommonInformation";
import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import { enfrcOtherPartyDataInfoType, form27InformationDataInfoType } from '@/types/Application/AgreementEnforcement/PDF';
import { enforceChangeSetAsideDeterminationSurveyDataInfoType } from '@/types/Application/AgreementEnforcement';
import { getYourInformationResults, getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        CourtStamp,
        FormHeader,
        FormPart,
        NoteBox,
        GreyBoxForm,
        OrderedCheckBox        
    }
})

export default class Form27Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType; 

    dataReady = false;   
    
    otherPartyInfo: enfrcOtherPartyDataInfoType[] = [];
    additionalOtherParties: enfrcOtherPartyDataInfoType[] = [];
    firstOtherParty = {} as enfrcOtherPartyDataInfoType;
    yourInfo = {} as yourInformationInfoDataInfoType;
    form27Info = {} as form27InformationDataInfoType;
    
    existingFileNumber = ''; 

    headerTableData = [];

    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;

        this.headerTableData = [
            {
                name:'REGISTRY LOCATION:', 
                value: this.result.applicationLocation
            },
            {
                name:'COURT FILE NUMBER:', 
                value: this.existingFileNumber
            },
            null,
            {
                name:'Document number:',
                value: ''
            }
        ];

    }
   
    public extractInfo(){
               
        this.otherPartyInfo=this.getOtherPartyInfo()        
        this.firstOtherParty = this.otherPartyInfo[0];
        if (this.otherPartyInfo?.length > 1) {
            this.otherPartyInfo.splice(0,1)
            this.additionalOtherParties = this.otherPartyInfo;
        }        
        
        this.yourInfo = this.getYourInfo();
        this.form27Info = this.getForm27Info();
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

        let OpInformation: enfrcOtherPartyDataInfoType[] = [];        

        if (this.result.otherPartyCommonSurvey?.length > 0){
            OpInformation = [];
            const otherPartyData: otherPartyInfoType[] =  this.result.otherPartyCommonSurvey;
           
            for(const party of otherPartyData){ 
                const otherParty = {} as enfrcOtherPartyDataInfoType;               

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
    
    public getForm27Info() {

        let form27Information = {} as form27InformationDataInfoType;

        function splitNames(names: string): string[]{
            const splitNamesList = names.split(',').map(item => {
                return item.trim();
            });
            return splitNamesList.filter(item=>{return(item)})
        }

        if (this.result?.enforceChangeSetAsideDeterminationSurvey) {  

            const enfrcChngdDet: enforceChangeSetAsideDeterminationSurveyDataInfoType = this.result.enforceChangeSetAsideDeterminationSurvey;         
            form27Information.existingDate = (enfrcChngdDet.filedOrder == 'n')?Vue.filter('beautify-date')(enfrcChngdDet.existingDate):'';
            form27Information.type = (enfrcChngdDet.filedOrder == 'n')?enfrcChngdDet.appointedDetermination.selected:'';
            form27Information.filed = enfrcChngdDet.filedOrder == 'n';
            form27Information.agreementDate = (form27Information.type == 'writtenAgreement')? Vue.filter('beautify-date')(enfrcChngdDet.appointedDetermination.writtenAgreementDate):'';
            form27Information.orderDate = (form27Information.type == 'courtOrder')? Vue.filter('beautify-date')(enfrcChngdDet.appointedDetermination.courtOrderDate):'';       
            form27Information.partiesToAgreement = (enfrcChngdDet.agreementParties && enfrcChngdDet.filedOrder == 'n' && form27Information.type == 'writtenAgreement')? splitNames(enfrcChngdDet.agreementParties) : [' ']
        }
  
        return form27Information;
    }
 
}

</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>