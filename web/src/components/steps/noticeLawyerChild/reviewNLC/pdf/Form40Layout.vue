<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <FormHeader :headerTableData="headerTableData" formName="Notice of Lawyer for Child" formNumber="FORM 40" formRuleNumber="Rule 162"></FormHeader>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    This Notice of Lawyer for Child provides notice to the court and each party that a child who is
                    the subject of the family law case is being represented by a lawyer as set out in this
                    document.
                </div>
                <div style="flex: 1; border: 2px dotted #000; background: #ededed; margin-right: 4px">
                    <p><b>NOTE TO THE PARTIES:</b></p>
                    You are required to serve the lawyer for the child(ren) with copies of any court documents,
                    including any application and supporting documents, as you would the other party, unless
                    otherwise ordered by the court.
                </div>
            </div>
            <div style="width: 20%;">
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Party information"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">1.</b>
                    <div style="display:inline; margin:0 0 0 0.25rem; line-height: 30px;">The <b>parties to this case</b> are:</div>
                    <div style="margin-left:2rem;"></div>
                    <grey-box-form 
                        style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                        textwidth="70.5%" 
                        beforetext="" 
                        :italicHint="false" :text="firstOtherParty"/>
                    <grey-box-form 
                        v-for="otherParty,inx in otherPartiesList" :key="inx"
                        style="text-indent:2px;display:block; font-size: 9pt; margin-top: 1rem; line-height: 30px;" 
                        textwidth="70.5%" 
                        beforetext="" 
                        hint="Full name of each party" 
                        hintindent="28%"
                        :italicHint="false" :text="otherParty"/>
                    <br/>
                    <b>2.</b>
                    <check-box 
                        inline="inline" 
                        boxMargin="0" 
                        shift="5"
                        shiftmark="0"
                        beforetext=""
                        style="margin:0 0 0 0.5rem; display:inline; font-size: 10pt;" 
                        :check="acknowledgeService?'yes':''" 
                        text="I understand <b>I need to serve each party</b> with a filed copy of this notice."/>                                            
                </div>
            </div>
            <div style="width: 20%;margin-top: -10px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        The lawyer for a child must file and serve this notice on each other party when the
                        lawyer starts representing the child [Rule 162]. 
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 1rem;"></div>

<!-- <Part 2> -->
<!-- <3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="Lawyer for child"></FormPart>
                <b style="padding-right:3px">3.</b>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block;; line-height: 30px;" 
                    textwidth="17rem" 
                    beforetext="I" 
                    hint="Full name of lawyer" 
                    :italicHint="false" :text="lawyerInformation.lawyerName | getFullName"/>
                <div style="text-indent:5px;display:inline;">, of, </div>
                <div style="margin-top: 0.7rem;"></div>
                <grey-box-form 
                    style="text-indent:2px;display:inline-block; font-size: 9pt; line-height: 30px;" 
                    textwidth="19rem" 
                    beforetext="" 
                    hint="Firm name, if applicable" 
                    :italicHint="false" :text="lawyerInformation.firmName"/>
                <div style="text-indent:5px;display:inline;"> 
                    <b>am the lawyer for the following children</b>:
                </div> 
                <b-table
                    :items="childDetails"
                    :fields="childTableFields"
                    class="mt-4"
                    small
                    bordered>                    
                    <template v-slot:cell()="data">
                        <div style="font-size:11pt;color:#000">{{data.value}}</div>                                           
                    </template>
                    <template v-slot:head(dob)>
                        Child’s Date of Birth <br><span style="font-size:6pt; font-weight:normal;">(dd/mmm/yyyy)</span>                            
                    </template>                       
                </b-table>
<!-- <4> -->
                <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                    <b>4. </b>I will be <b>representing the child(ren)</b> identified in question 3 <b>on the following issue(s)</b>:
                </div> 

                <div style="margin-top: 0.5rem;"></div>

                <i>Select all options that apply</i>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Parenting Arrangements')?'yes':''" text="parenting arrangements"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Child support')?'yes':''" text="child support"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Contact with a child')?'yes':''" text="contact with a child"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Guardianship of a child')?'yes':''" text="guardianship of a child"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Protection order')?'yes':''" text="protection order"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Priority Parenting Matter')?'yes':''" text="priority parenting matter"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;"
                        :check="listOfIssues.includes('Relocation')?'yes':''" text="relocation"/>
                </div>
                <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                    <check-box class="marginleft" checkbox="" shift="5" shiftmark="0" inline="inline" boxMargin="0" style="display:inline;" 
                        :check="listOfIssues.includes('other')?'yes':''" 
                        text="other <i>(specify)</i>:"/>
                    <div style="margin-top: 0.5rem;"></div>
                    <div style="margin-left: 28px;" class="answerbox">{{otherIssue ? otherIssue : '&nbsp;'}}</div>
                </div>
<!-- <5> -->
                <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                    <b>5. </b>My <b>contact information and address for service</b> of court documents are:
                </div> 

                <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 42px; width:90%; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td colspan="3" style="border: 2px solid #fff; padding: 4px;">
                                Address: 
                                <div class="answer" style="background-color: #d6d6d6;">
                                    {{ lawyerInformation.address.street }} 
                                </div>
                            </td>
                        </tr>
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">City: <div class="answer" style="background-color: #d6d6d6;">{{ lawyerInformation.address.city }}</div>
                            </td>
                            <td style="padding-left:50px; border:2px solid #fff; padding: 4px;">Province: <div class="answer" style="background-color: #d6d6d6;">{{ lawyerInformation.address.state }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Postal Code: <div class="answer" style="background-color: #d6d6d6;">{{ lawyerInformation.address.postcode }}</div>
                            </td>
                        </tr>
                    </table>

                    <table class="compactfullsize" style="margin-top:0.5 !important; margin-left: 42px; width:90%; font-size: 9pt; background-color: #dedede;">
                        <tr style="border:2px solid #fff">
                            <td style="border:2px solid #fff; padding: 4px;">Email: <div class="answer" style="background-color: #d6d6d6;">{{ lawyerInformation.contact.email }}</div>
                            </td>
                            <td style="border:2px solid #fff; padding: 4px;">Telephone: <div class="answer" style="background-color: #d6d6d6;">{{ lawyerInformation.contact.phone }}</div>
                            </td>
                        </tr>
                    </table>
                <div class="print-block">
                    <div style="margin-top:1rem;"><b>NOTE TO THE REGISTRY:</b>
                        The lawyer for the child(ren) is to be given notice of all court 
                        appearances and access to the court file, including copies of any 
                        filed document(s), as if they were a party, unless otherwise 
                        ordered by the court. 
                    </div>                
                </div>
                <div style="margin-top: 1rem;"></div>
            </div>
            <div style="width: 20%;margin-top: -10px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        A lawyer for a child may start representing a child at any time during a case [Rule 162]
                        and may represent the child on any or all issues before the court.<br />
                        Permission of the court is not required to begin representing the interests of a child;
                        however, an order may be required if a lawyer needs to be appointed under s. 203 of
                        the Family Law Act or if an order is needed to address fees and disbursements.
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 1rem;"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { addressInfoType, contactInfoType, nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { lawyerInformationInfoDataInfoType, noticeLawyerChildDataInfoType, childInformationNlcInfoDataInfoType } from '@/types/Application/LawyerChild';
import CourtStamp from '@/components/utils/PopulateForms/components/CourtStamp.vue';
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        CourtStamp,
        FormHeader,
        FormPart,
        NoteBox,
        GreyBoxForm
    }
})
export default class Form40Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;
    existingFileNumber = '';
    acknowledgeService = false;
   
    lawyerInformation = {} as lawyerInformationInfoDataInfoType;  
    childDetails: childInformationNlcInfoDataInfoType[] = [{name: '', dob: ''}];    
   
    listOfIssues = [];    
    otherIssue = '';
    firstOtherParty = '';
    otherPartiesList = [];    

    childTableFields = [
        {key:"name",  label:"Child’s full name",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:55%;"},
        {key:"dob",   label:"Child’s Date of Birth",   tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"}
    ];
 
    headerTableData = [];

    mounted(){
        this.dataReady = false;
        //console.log(this.result)
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
            }
        ];
   }
   
    public extractInfo(){
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLCConfirmationSurvey?.confirmation == 'Confirmed';
        this.getNoticeLawyerChildInfo();  
    } 

    public getNoticeLawyerChildInfo(){  
        
        this.lawyerInformation = {} as lawyerInformationInfoDataInfoType;          
        this.firstOtherParty = '';
        this.otherPartiesList = []; 
        this.childDetails = [{name: '', dob: ''}];
        this.listOfIssues = [];  
        this.otherIssue = ''; 

        if(this.result?.noticeLawyerChildSurvey){

            let noticeLawyerChild = {} as noticeLawyerChildDataInfoType;
            noticeLawyerChild = this.result.noticeLawyerChildSurvey;    

            this.getLawyerInformationResults(noticeLawyerChild);

            const otherParties = [];
            for (const otherParty of noticeLawyerChild.OtherPartyInfoNlc){
                otherParties.push(Vue.filter('getFullName')(otherParty.name))
            }           

            this.firstOtherParty = otherParties[0];
            this.otherPartiesList = otherParties.length>1?otherParties.slice(1):[];

            const childrenInfo = [];

            for (const child of noticeLawyerChild.ChildInfoNlc){
                const childInfo = {} as childInformationNlcInfoDataInfoType;
                childInfo.dob = child.dateOfBirth?Vue.filter('beautify-date')(child.dateOfBirth):'';
                childInfo.name = child.name?Vue.filter('getFullName')(child.name):'';
                childrenInfo.push(childInfo);
            }

            if (childrenInfo.length>0){
                this.childDetails = childrenInfo;
            }

            this.listOfIssues = noticeLawyerChild.IssuesList?noticeLawyerChild.IssuesList:[];
            if (this.listOfIssues.includes("other")){
                this.otherIssue = noticeLawyerChild.IssuesListComment?noticeLawyerChild.IssuesListComment:'';
            }            
        }             
    }

    public getLawyerInformationResults(noticeLawyerChild: noticeLawyerChildDataInfoType) {               

        this.lawyerInformation = {
            firmName: noticeLawyerChild.FirmName?noticeLawyerChild.FirmName:'',
            lawyerName: noticeLawyerChild.ApplicantName?noticeLawyerChild.ApplicantName:{} as nameInfoType,
            address: noticeLawyerChild.LawyerAddressNlc?noticeLawyerChild.LawyerAddressNlc:{} as addressInfoType,
            contact: noticeLawyerChild.LawyerContact?noticeLawyerChild.LawyerContact:{} as contactInfoType
        }          
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>