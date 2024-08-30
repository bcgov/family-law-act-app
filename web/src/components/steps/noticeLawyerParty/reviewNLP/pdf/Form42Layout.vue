<template>
    <div v-if="dataReady" style="font-size:10pt;">

<!-- <Page 1> -->
<!-- <HEADER> : BEGIN -->
    <div style="height: 160px;">
            <div style="float:left; width: 33%;">
                <div style="font-size: 14pt !important;"><b>Notice of Lawyer for Party</b></div>
                <div style="font-size:12pt !important;"><b>Form 42</b></div>
                <div>Provincial Court Family Rules</div>
                <div>Rule 163</div> 
            </div>
            <div style="float: left; width: 30%; border:1px solid #414142; height: 100pt; opacity: 0.3;">
                <p style="display: block;margin-top: 85pt;margin-left: 40pt;">COURT STAMP</p>
            </div>
            <div style="width: 35%; float:right; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Registry location: </div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height:15px;"> {{ result.applicationLocation }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 50%; padding: 2px;text-align:right;padding-right:5px;"> Court file number:</div>
                    <div style="float: left; background-color: #d6d6d6; width: 50%; padding: 2px;line-height:15px;"> {{ existingFileNumber }} </div>
                </div>
            </div>
        </div>    
        <div style="width: 80%;float: left; padding:0.3rem;margin-top:-15px;">
            This Notice of Lawyer for Party provides notice to the court and each party that a party is
            represented by a lawyer as set out in this document.
        </div>
        <div style="border-style: dashed; border-color: black; width: 80%;float: left; padding:0.3rem; background: #909090;width: 80%;">
        <b>Please read before completing this form:</b>
        <ul style="margin-left:-4px;">
            <li><div style="margin-left:9px;">You do not have to complete a Notice of Lawyer for Party if a lawyer starts
                    representing a party at the time of filing an application or reply and the lawyer’s
                    contact information and address for service of documents is provided on the
                    application or reply [Rule 163].
                </div>
            </li>
            <li><div style="margin-left:9px;">This notice may be filed at any time during a case.
            </div>
            </li>            
        </ul>
    </div>
<!-- <HEADER> : END -->
<!-- <1A> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.5rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 1 | Party Information</b>
            </div>
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>1.</b><span style="margin-left:12px;">The <b>parties to this case</b> are:</span>
                    </div>
                    <div style="margin-left:30px;background-color: #dedede;padding:5px;min-height:10px;display:block">         
                            <span style="display:block;margin-left:1rem" >{{otherParties}}</span>
                    </div>
                    <div style="margin-left:30px;padding:5px;min-height:2px;display:block;text-align:center;">         
                            <span style="display:block;margin-left:1rem;font-size:6pt;margin-top:-8px;" >Full name of each party</span>
                    </div>
                    

            </div>            
        </div>
        <div style="width: 18%;float: right; margin-top: 10px;">
                <NoteBox style="color:#414142"> 
                    <b-icon-info-circle-fill />
                    <br />
                    This notice must be filed and served on each other party [Rule 163]. 
                </NoteBox>
            </div>
    </div>
<!-- <1A> : END-->
<!-- <1B> : BEGIN-->   
    <div>
        <div style="width: 80%; float: left;margin: 0rem 0.5rem 0.5rem 1rem;margin-top:-10px;" >
            <div> 
                        <b>2. </b>
                        <!-- <check-box inline="inline"  boxMargin="0" shiftmark="0" :check="''" text="    or "/> -->
                        
                        <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:2px;" :check="acknowledgeService?'yes':''" text=""/>
                            <div style="margin-top:-20px;">
                            <div style="margin-left:45px;">I understand <b> need to serve each party </b>with a filed copy of this notice.</div>
                            </div>
            </div>
        </div>
    </div>
<!-- <1B> : END-->
<!-- <2A> : BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 0.5rem;"></div>
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;">
                    <b>Part 2 | Lawyer for partys</b>
            </div>
            <div style="text-indent: -0px;margin: 0.5rem 0.5rem 0.5rem 1rem;">
                
                    <div style="display: inline-block;">
                        <b>3.</b><span style="margin-left:12px;"><b>I</b> </span>
                    </div>
                    <!-- <underline-form style="text-indent:4px;display:inline-block;" textwidth="200px"
                        beforetext="" hint="Full name of lawyer" :italicHint="false" textBackgroundColor="#dedede" hintMargin="52px" :text="lawyerInformation.lawyerName | getFullName" />
                         -->
                         <table>
                        <tr>
                        <td>
                            <div style="width:250px;display:block;word-break: break-all;">
                    <div style="margin-left:35px;margin-top:-20px;background-color: #dedede;padding:5px;min-height:10px;line-height:14px;">         
                            <span style="margin-left:1rem" >{{lawyerInformation.lawyerName | getFullName}}</span>
                    </div>
                    <div style="width:250px;display:flex;text-align:center;margin-left:65px;margin-top:-10px;padding:5px;min-height:10px;">         
                            <span style="margin-left:1rem;font-size:7pt" >Full name of lawyer</span>
                    </div>
                    </div>
                    </td>
                    <td> <div style="margin-top:-25px;margin-left:5px;">, of ,</div></td>
                    <td >
                    <div style="width:230px;display:block;word-break: break-all;">
                    <div style="margin-left:3px;margin-top:-20px;background-color: #dedede;padding:5px;min-height:10px;line-height:14px;">         
                            <span style="margin-left:1rem" >{{lawyerInformation.firmName}}</span>
                    </div>
                    <div style="width:220px;display:flex;text-align:center;margin-left:55px;margin-top:-10px;padding:5px;min-height:10px;">         
                            <span style="margin-left:1rem;font-size:7pt" >Firm name, if applicable</span>
                    </div>
                    </div>
                        </td>
                        </tr>
                         </table>
                    
                    
                    <div style="margin-top:0px;">                        
                        <div style="margin-top:6px;margin-left:22px;"><b>am the lawyer for the following party/parties:</b></div>   
                    <div style="font-style:italic;margin-left:22px;"><span style="color:#626262;font-style:italic;">Provide the full name of each party the lawyer is representing</span></div>  
                    <div style="margin-left:22px;background-color: #dedede;padding:5px;min-height:10px;display:block">         
                            <span style="display:block;margin-left:1rem" >{{OtherPartyInfoNlp.length>0 ? OtherPartyInfoNlp[0]: ''}}</span>
                    </div>
                    </div>
            </div>             
        </div>
        <div style="width: 18%;float: right; margin-top: 50px;">
                <NoteBox style="color:#414142"> 
                    <b-icon-info-circle-fill />
                    <br />
                    A lawyer may represent a party for all issues in a case or for unbundled services or limited representation.
                    Unbundled services or limited representation means that a lawyer provides legal services for only certain parts of a 
                    case based on what you agree to.
                </NoteBox>
            </div>
    </div>
<!-- <2A> : END-->
<!-- <2B> :  BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>4.</b><span style="margin-left:12px;">I will be <b>representing the party/parties</b> identified in question 3 <b>as follows</b>:</span>
                    </div>
                    <div style="font-style:italic;margin-left:22px;"><span style="color:#626262;font-style:italic;">Select all options that apply</span></div>  

                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="allIssues?'yes':''" text='on all issues until further notice to the court'/>             
                    </div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('specifiedIssues')?'yes':''" text='on only the following specified issue(s) until further notice to the court:'/>             
                    </div>
            </div>            
        </div>        
    </div>
<!-- <2B> :  END-->
<!-- <2B> :  BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">            
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0rem 0.5rem 0.5rem 1rem;">                     
                     
                    <div v-if="specifiedIssuesComment" style="background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-left:60px;">
                    {{specifiedIssuesComment}}
                    </div>
                    <div v-else style="background-color: #dedede;padding:10px;margin-left:25px;min-height:70px;margin-bottom:0rem;margin-left:60px;"></div> 
            </div>            
        </div>        
    </div>
<!-- <2B> :  END-->
<!-- <2C> :  BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">            
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0rem 0.5rem 0.5rem 1rem;">                     
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('courtDocumentsPreparation')?'yes':''" text='preparation of the following court documents for filing and/or filing of the court documents:'/>             
                    </div> 
                    <div style="font-style:italic;margin-left:62px;">List any applicable court document(s)</div>    
                    <div v-if="courtDocumentsPreparationComment" style="background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-left:60px;">
                    {{courtDocumentsPreparationComment}}
                    </div>
                    <div v-else style="background-color: #dedede;padding:10px;margin-left:25px;min-height:70px;margin-bottom:0rem;margin-left:60px;"></div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('familyManagementConference')?'yes':''" text='at the family management conference'/>             
                    </div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('familySettlementConference')?'yes':''" text='at the family settlement conference'/>             
                    </div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('trial')?'yes':''" text='at trial (including any scheduled trial preparation conference)'/>             
                    </div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('applicationAbout')?'yes':''" text='on the application about <span style="color:#626262;font-style:italic;">(specify)</span>:'/>             
                    </div>  
                    <!-- <div v-if="applicationAboutComment" style="background-color: #dedede;padding:10px;margin-left:25px;min-height:70px;margin-left:60px;">
                    {{applicationAboutComment}}
                    </div> -->
                    <span v-if="applicationAboutComment" >
                    <div v-if="applicationAboutComment.length >30" style="background-color: #dedede;text-align:left;vertical-align:middle !important;min-width:200px;padding:2px;margin-top:-20px;height:25px;margin-left:272px;">
                    {{applicationAboutComment | truncate-word-after(30)}}
                    </div>
                    <div style="margin-top:3px;background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-left:60px;">
                    {{applicationAboutComment | truncate-word-before(30)}}
                    </div>
                    </span> 
                    <div v-else style="background-color: #dedede;padding:5px;margin-left:25px;min-height:50px;margin-bottom:0rem;margin-left:60px;"></div> 
                    <div>
                    <div style="margin-top: 0.3rem;"></div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('other')?'yes':''" text='other <span style="color:#626262;font-style:italic;">(specify)</span>:'/>             
                    </div>  
                    <span v-if="otherComment" >
                    <div v-if="otherComment.length >50" style="background-color: #dedede;text-align:left;vertical-align:middle !important;min-width:240px;padding:2px;margin-top:-20px;height:25px;margin-left:160px;">
                    {{otherComment | truncate-word-after(50)}}
                    </div>
                    <div style="margin-top:3px;background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-left:60px;">
                    {{otherComment | truncate-word-before(50)}}
                    </div>
                    </span>                    
                    <div v-else style="background-color: #dedede;padding:5px;margin-left:25px;min-height:70px;margin-bottom:0rem;margin-left:60px;"></div> 
            </div>            
        </div>        
    </div>
<!-- <2C> :  END-->
<!-- <2C> :  BEGIN-->
    <div>
        <div style="width: 80%; float: left; margin-right: 10px;">            
            <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0rem 0.5rem 0.5rem 1rem;">                     
                <div style="text-indent: -0px;text-align: justify;text-justify: inter-word; margin: 0.1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        <b>5.</b><span style="margin-left:12px;"><span style="color:#626262;font-style:italic;">Select the option that applies and complete any required information</span></span>
                    </div>
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="allIssues?'yes':''" text='There are <b>no changes to the contact information or address for service</b> of court documents on file'/>             
                    </div> 
                    <div>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:50px;" :check="listOfIssues.includes('specifiedIssues')?'yes':''" text='The <b>contact information and address for service of court documents</b> are:'/>             
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
            </div>  
            </div>            
        </div>        
    </div>
<!-- <2C> :  END-->
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
import { lawyerInformationInfoDataInfoType, noticeLawyerPartyDataInfoType } from '@/types/Application/LawyerParty';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox ,
        NoteBox      
    }
})

export default class Form42Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false;     

    existingFileNumber = '';
    acknowledgeService = false; 
    lawyerInformation = {} as lawyerInformationInfoDataInfoType; 
    OtherPartyInfoNlp = [];
    otherParties = '';
    allIssues = false;
    addressChanged = false;
    listOfIssues = [];    
    otherComment = '';    
    applicationAboutComment = '';
    courtDocumentsPreparationComment = '';
    specifiedIssuesComment = '';
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }
   
    public extractInfo(){        
        this.existingFileNumber = getLocationInfo(this.result.otherFormsFilingLocationSurvey);
        this.acknowledgeService = this.result.otherPartyNLPConfirmationSurvey?.confirmation == 'Confirmed';
        this.getNoticeLawyerPartyInfo();  
    } 

    public getNoticeLawyerPartyInfo(){  
        
        this.lawyerInformation = {} as lawyerInformationInfoDataInfoType;  
        this.otherParties = '';  
        
        this.allIssues = false;
        this.addressChanged = false;
        this.listOfIssues = [];   
        this.otherComment = '';    
        this.applicationAboutComment = '';
        this.courtDocumentsPreparationComment = '';
        this.specifiedIssuesComment = '';

        if(this.result?.noticeLawyerPartySurvey){

            let noticeLawyerParty = {} as noticeLawyerPartyDataInfoType;
            noticeLawyerParty = this.result.noticeLawyerPartySurvey; 

            this.getLawyerInformationResults(noticeLawyerParty);

            const otherParties = [];
            for (const otherParty of noticeLawyerParty.OtherPartyInfoNlp){
                otherParties.push(Vue.filter('getFullName')(otherParty.name))
            }      
            this.OtherPartyInfoNlp = otherParties;
            this.otherParties = otherParties.join(', ')     
            
            this.allIssues = noticeLawyerParty.RepresentingOnAllIssues == 'y';

            if (!this.allIssues){

                this.listOfIssues = noticeLawyerParty.IssuesList?.checked?noticeLawyerParty.IssuesList.checked:[];
                if (this.listOfIssues.includes("other")){
                    this.otherComment = noticeLawyerParty.IssuesList?.otherComment?noticeLawyerParty.IssuesList.otherComment:'';
                }      
                
                if (this.listOfIssues.includes("specifiedIssues")){
                    this.specifiedIssuesComment = noticeLawyerParty.IssuesList?.specifiedIssuesComment?noticeLawyerParty.IssuesList.specifiedIssuesComment:'';
                }  

                if (this.listOfIssues.includes("courtDocumentsPreparation")){
                    this.courtDocumentsPreparationComment = noticeLawyerParty.IssuesList?.courtDocumentsPreparationComment?noticeLawyerParty.IssuesList.courtDocumentsPreparationComment:'';
                }  

                if (this.listOfIssues.includes("applicationAbout")){
                    this.applicationAboutComment = noticeLawyerParty.IssuesList?.applicationAboutComment?noticeLawyerParty.IssuesList.applicationAboutComment:'';
                }  
            }
            
        }             
    }

    public getLawyerInformationResults(noticeLawyerParty: noticeLawyerPartyDataInfoType) {  
        
        if (noticeLawyerParty.AddressChanges && noticeLawyerParty.AddressChanges.includes('true')){
            this.addressChanged = false;
            this.lawyerInformation = {
                firmName: noticeLawyerParty.FirmName?noticeLawyerParty.FirmName:'',
                lawyerName: noticeLawyerParty.ApplicantName?noticeLawyerParty.ApplicantName:{} as nameInfoType,
                address: {} as addressInfoType,
                contact: {} as contactInfoType
            }
        } else {
            this.addressChanged = true;
            this.lawyerInformation = {
                firmName: noticeLawyerParty.FirmName?noticeLawyerParty.FirmName:'',
                lawyerName: noticeLawyerParty.ApplicantName?noticeLawyerParty.ApplicantName:{} as nameInfoType,
                address: noticeLawyerParty.LawyerAddressNlp?noticeLawyerParty.LawyerAddressNlp:{} as addressInfoType,
                contact: noticeLawyerParty.LawyerContact?noticeLawyerParty.LawyerContact:{} as contactInfoType
            }
        }

              
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>