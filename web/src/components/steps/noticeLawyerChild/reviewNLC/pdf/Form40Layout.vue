<template>
    <div v-if="dataReady">

<!-- <Page 1> -->
<!-- <HEADER> -->
        <div  class="form-header-reloc">
            <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
            <div style="float:left; display: inline-block;">
                <div style="font-size:13pt;"><b>Notice of Lawyer for Child</b></div>               
                <div style="font-size:10pt;"><b>FORM 40</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 162</div>
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
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="17rem" 
                beforetext="I" 
                hint="(full name of lawyer)" 
                :italicHint="false" :text="lawyerInformation.lawyerName | getFullName"/>

            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="19rem" 
                beforetext=", of" 
                hint="(firm name, if applicable)" 
                :italicHint="false" :text="lawyerInformation.firmName"/>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                am the lawyer for the following children:
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
                    Child’s Date of Birth <br><span style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</span>                            
                </template>                       
            </b-table>

        </section>
           
        <div style="margin-top: 1rem;"></div>  

<!-- <2> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                I will be representing the child(ren) identified in section 1 on the following issue(s):
            </div> 

            <div style="margin-top: 0.5rem;"></div>

            <i>Select all options that apply</i>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Parenting Arrangements')?'yes':''" text="parenting arrangements"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Child support')?'yes':''" text="child support"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Contact with a child')?'yes':''" text="contact with a child"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Guardianship of a child')?'yes':''" text="guardianship of a child"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Protection order')?'yes':''" text="protection order"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Priority Parenting Matter')?'yes':''" text="priority parenting matter"/>
            </div>
            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;"
                    :check="listOfIssues.includes('Relocation')?'yes':''" text="relocation"/>
            </div>

            <div class="marginleft2p5vue" style="margin:0.25rem 0 0 1.5rem;">
                <check-box 
                    class="marginleft" 
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0" 
                    style="display:inline;" 
                    :check="listOfIssues.includes('other')?'yes':''" 
                    text="other <i>(specify)</i>:"/>
                <underline-form 
                    style="text-indent:1px;display:inline-block;" 
                    textwidth="32rem" 
                    beforetext="" 
                    hint="" 
                    :text="otherIssue"/>            
            </div>
        </section>
            
        <div style="margin-top: 1rem;"></div>
<!-- <3> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                My contact information and address for service of court documents are:
            </div> 

            <div style="margin-top: 1rem;"></div>
            

            <table class="compactfullsize" style="font-size: 9pt;">
                <tr style="border:1px solid #414142" >
                    <td colspan="3">Firm name (if applicable): <div class="answer"> {{lawyerInformation.firmName}}</div></td>
                </tr>
                <tr style="border:1px solid #414142">          
                    <td colspan="3">Address: <div class="answer">{{lawyerInformation.address.street}} </div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td  >City: <div class="answer">{{lawyerInformation.address.city}}</div> </td>
                <td style="padding-left:50px">Province: <div class="answer">{{lawyerInformation.address.state}}</div> </td>
                    <td>Postal Code: <div class="answer">{{lawyerInformation.address.postcode}}</div> </td>
                </tr>
                <tr style="border:1px solid #313132">
                    <td colspan="2">Email: <div class="answer">{{lawyerInformation.contact.email}}</div> </td>
                    <td>Telephone: <div class="answer">{{lawyerInformation.contact.phone}}</div> </td>
                </tr>
            </table>
            
        </section>
        <div style="margin-top: 1rem;"></div> 
<!-- <4> -->
        <section>
            <div style="text-indent:5px;display:inline; font-size: 9pt;"> 
                The parties to this case are:
            </div> 
            <underline-form 
                style="text-indent:2px;display:inline-block; font-size: 9pt;" 
                textwidth="17rem" 
                beforetext="" 
                hint="(full name of each other party)" 
                :italicHint="false" :text="firstOtherParty"/>
            <underline-form 
                v-for="otherParty,inx in otherPartiesList" :key="inx"
                style="text-indent:2px;display:block; font-size: 9pt; margin-top: 1rem; margin-left: 9.75rem;" 
                textwidth="17rem" 
                beforetext="" 
                hint="(full name of each other party)" 
                :italicHint="false" :text="otherParty"/>
        </section>

        <div style="margin-top: 1rem;"></div>  

<!-- <5> -->
        <section>
            <check-box 
                inline="inline" 
                boxMargin="0" 
                style="margin:0 0 0 0.5rem; display:inline; font-size: 9pt;" 
                :check="acknowledgeService?'yes':''" 
                text="I understand I need to serve each party with a filed copy of this notice."/>                                            
        </section>

        <div class="print-block">
            <div style="margin-top:0rem;"><b>NOTE TO THE PARTIES:</b>
                You are required to serve the lawyer for the child(ren) with copies 
                of any court documents, including any application and supporting 
                documents, as you would the other party, unless otherwise ordered 
                by the court. 
            </div>                
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>NOTE TO THE REGISTRY:</b>
                The lawyer for the child(ren) is to be given notice of all court 
                appearances and access to the court file, including copies of any 
                filed document(s), as if they were a party, unless otherwise 
                ordered by the court. 
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
import { addressInfoType, contactInfoType, nameInfoType } from "@/types/Application/CommonInformation";
import { getLocationInfo } from '@/components/utils/PopulateForms/PopulateCommonInformation';
import { lawyerInformationInfoDataInfoType, noticeLawyerChildDataInfoType, childInformationNlcInfoDataInfoType } from '@/types/Application/LawyerChild';

@Component({
    components:{
        UnderlineForm,
        CheckBox       
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
   
    mounted(){
        this.dataReady = false;
        //console.log(this.result)
        this.extractInfo();
        this.dataReady = true;        
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