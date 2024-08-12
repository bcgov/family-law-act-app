<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width:75%;">
                <div style="margin-top: 0.3rem;" />
                <div style="background: #626262; color: white; font-size: 13pt; height:65px">
                    <b style="font-size: 26pt;">Schedule 2 |</b>
                    <b style="position: relative; top:-10px">Application for Order Respecting</b> <br/>
                    <b style="margin-left:210px; position: relative; top:-25px">Guardianship of a Child</b>
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word; margin: 1rem 0.5rem 0.5rem 1rem; background: #d6d6d6">
                    <div style="display: inline-block;">
                        Complete this schedule only if you are applying for a priority parenting matter order for
                        guardianship of a child under section 51 [order respecting guardianship] of the Family Law Act
                        because the order is needed to transfer a child from the care of the Director or to prevent the 
                        removal of a child under the Child, Family and Community Service Act
                    </div>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top:5px">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        Anyone who wants to become 
                        a guardian can apply, 
                        including a parent who is not 
                        a guardian or anyone else 
                        (even if they are not related to 
                        the child) [s. 51 Family Law 
                        Act]. Only a guardian may 
                        have parental responsibilities 
                        and parenting time with 
                        respect to a child [s. 40].
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 1-->
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px; width:75%;">
                <div style="margin-top: 0.3rem;" />
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 1 | Indigenous ancestry of child(ren)</b>
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: flex;">
                        <b>1.</b> 
                        <div style="padding-left: 1rem; display: inline;">
                            Is the child or children <b>Indigenous</b>?
                        </div>
                    </div>
                </div>
                <div style="margin-left:3.75rem;">
                    <check-box style="text-indent: -16px;" :check="(scheduleInfo.isFirstNations == 'yes')?'yes':''" text="<b>Yes</b> &#10132; go to next question"/> 
                    <check-box style="text-indent: -16px;" :check="(scheduleInfo.isFirstNations == 'no')?'yes':''" text="<b>No</b> &#10132; skip ahead to <b>Part 2</b>"/> 
                    <check-box style="text-indent: -16px;" :check="(scheduleInfo.isFirstNations == 'unknown')?'yes':''" text="<b>Unknown</b> &#10132; skip ahead to <b>Part 2</b>"/> 
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: flex;">
                        <b>2.</b> 
                        <div style="padding-left: 1rem; display: inline;">
                            <i>Complete this question only if a child is Indigenous.
                            If not, you may leave this question blank.</i> <br/>
                            Please select the option below that best describes the <b>child(ren)’s Indigenous ancestry:</b>
                        </div>
                    </div>
                    <check-box style="margin:0 0 0 2.75rem; display: block; text-indent: -16px;"  :check="scheduleInfo.ancestryType.includes('First Nation')?'yes':''" text="First Nation"/>
                    <check-box style="margin:0 0 0 2.75rem; display: block; text-indent: -16px;"  :check="scheduleInfo.ancestryType.includes('Nisg̲a’a')?'yes':''" text="Nisga'a"/>
                    <check-box style="margin:0 0 0 2.75rem; display: block; text-indent: -16px;"  :check="scheduleInfo.ancestryType.includes('Treaty First Nation')?'yes':''" 
                        text="Treaty First Nation 
                        <ul>
                            <li>Tsawwassen First Nation</li>
                            <li>Maa-nulth First Nations:</li>
                            <ul>
                                <li>Huu-ay-aht First Nations</li>
                                <li>Ka:’yu:’k’t’h’/Che:k’tles7et’h’ First Nations</li>
                                <li>Toquaht Nation</li>
                                <li>Uchucklesaht Tribe</li>
                                <li>Yuułuʔiłʔatḥ Government</li>
                            </ul>
                            <li>Tla’amin Nation</li>
                        </ul> "/>
                    <check-box style="margin:0 0 0 2.75rem; display: block; text-indent: -16px;" :check="scheduleInfo.ancestryType.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                        text=" the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                    <check-box style="margin:0 0 0 2.75rem; display: block; text-indent: -16px;" :check="scheduleInfo.ancestryType.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                        text=" the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/> 
                    
                        <div style="border-style: dashed; border-color: black; margin-top: 10px;padding:0.5rem; background: #d6d6d6;">
                            <b>IMPORTANT NOTE ABOUT A NISGA’A OR TREATY FIRST NATION CHILD:</b>
                            <div style="margin:0.5rem; font-size:9pt;">
                                <p>
                                    If the child is a Nisga’a or Treaty First Nation child, you must serve the Nisga'a Lisims 
                                    Government or the Treaty First Nation to which the child belongs with notice of this application 
                                    as described in section 208 or 209 of the Family Law Act. <br />
                                    To serve them notice, they must receive a copy of this application.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        A guardian’s parental 
                        responsibilities include 
                        making decisions respecting 
                        the child’s cultural, linguistic, 
                        religious and spiritual 
                        upbringing and heritage, 
                        including, if the child is an 
                        Indigenous child, the child’s 
                        Indigenous identity [s. 41 
                        <i>Family Law Act</i>]. 
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top: 300px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about 
                        how to complete a record 
                        check, including where to find 
                        the forms, see the guidebook. 
                    </p>
                </div>
            </div>
        </div>

        <!-- Part 2-->
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row; gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="margin-top: 0.3rem;" />
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b>Part 2 | Guardianship affidavit and supporting documents</b>
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem; background: #d6d6d6;">
                    A party applying to be appointed as a guardian of a child must provide the court with evidence 
                    using the Guardianship Affidavit in Form 5 respecting the best interests of the child [s. 51 <i>Family Law Act</i> and Rule 26].
                    <br/>
                    If a child is 12 years of age or older, the court must not appoint a person other than a parent as 
                    the child’s guardian without the child’s written approval, unless satisfied it is in the child’s best interests [s. 51 <i>Family Law Act</i>]
                </div>
                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                    <b>3. &nbsp;</b>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="scheduleInfo.understandFileForm5?'yes':''" />
                    <div style="margin-top: -16px; padding-left:35px;">
                        I understand that I am required to <b>file a Guardianship Affidavit</b> in Form 5 as
                        described in Rule 26 before the court can make a final order about guardianship
                    </div>
                </div>
                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                    <b>4. &nbsp;</b>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="scheduleInfo.understandFileForm5?'yes':''" />
                    <div style="margin-top: -16px; padding-left:35px">
                        I have <b>initiated or completed a criminal record check</b> as required for theGuardianship Affidavit. 
                    </div>
                </div>
                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 1rem;">
                    <b>5.</b> <i>Select only one of the options below</i>&nbsp;
                    <br/>
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px; margin: 0rem 0.5rem 0.5rem 1rem;"
                        :check="scheduleInfo.filingRequiredDocs?'yes':''" />
                    <div style="margin-top: -16px; padding-left:35px">
                        I am <b>filing the following required documents</b> along with this application:
                        <ul>
                            <li>
                                a Consent for Child Protection Record Check in Form 5 under the Family Law Act Regulation
                            </li>
                            <li>
                                a request, in the form provided by the registry, to search the protection order registry
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="text-indent: 0px; margin: 0rem 0.5rem 0.5rem 2rem;">
                    <check-box inline="inline" boxMargin="0" style="display: inline; text-indent: -16px;"
                        :check="!scheduleInfo.filingRequiredDocs?'yes':''" />
                    <div style="margin-top: -16px; padding-left: 25px">
                        I am <b>not able to file the required documents</b> with this application.
                        I am filing an Application for Case Management Order Without Notice or Attendance
                        in Form 11 requesting to waive or modify the requirement that the documents be
                        filed with this application. I understand I will still be required to file the documents at
                        a later date.
                    </div>
                </div>
            </div>
            <div style="width: 20% ">
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
                    <p>
                        <b-icon-info-circle-fill />
                        <br />
                        To complete Form 5, you are 
                        required to attach the results 
                        from various record checks as 
                        exhibits. 
                        The record checks must be 
                        initiated at the time of filing 
                        this application. 
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top: 10px">
                    <p>
                        <b-icon-book />
                        <br />
                        For more information about 
                        how to complete a record 
                        check, including where to find 
                        the forms, see the guidebook
                    </p>
                </div>
                <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt; margin-top: 100px">
                    <p>
                        <b-icon-file-earmark-text />
                        <br />
                        You must file a consent and 
                        request for record check or an 
                        Application for Case 
                        Management Order Without 
                        Notice or Attendance Form 11.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule2DataInfoType } from '@/types/Application/PriorityParentingMatter/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule2 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;
    scheduleInfo = {} as schedule2DataInfoType;     
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){
        this.scheduleInfo = this.getSchedule2Info();        
    }

    public getSchedule2Info() {

        let schedule2Info = {} as schedule2DataInfoType; 
        schedule2Info.ancestryType = [];
        schedule2Info.understandFileForm5 = true;

        if (this.result?.ppmIndigenousAncestryOfChildSurvey){
            const ancestryData = this.result?.ppmIndigenousAncestryOfChildSurvey;
            schedule2Info.isFirstNations = ancestryData.indigenousChild
            if (schedule2Info.isFirstNations == 'yes'){
                schedule2Info.ancestryType = ancestryData.indigenousAncestry;
                if (schedule2Info.ancestryType.includes('Nisg̲a’a') || schedule2Info.ancestryType.includes('Treaty First Nation')){
                    schedule2Info.understandFirstNationsService = ancestryData.ServeAcknowledgement && ancestryData.ServeAcknowledgement == "I acknowledge";
                }
            }            
        }

        if (this.result?.ppmAdditionalDocumentsSurvey){
            const ppmAdditionalDocData = this.result.ppmAdditionalDocumentsSurvey;
            schedule2Info.initiatedCriminalCheck = ppmAdditionalDocData.criminalChecked == 'y';
            schedule2Info.filingRequiredDocs = ppmAdditionalDocData.isFilingAdditionalDocs == 'y';
            if (ppmAdditionalDocData.isFilingAdditionalDocs == 'n' && ppmAdditionalDocData.unableFileForms){

                schedule2Info.fileRequest = !ppmAdditionalDocData.unableFileForms.includes("Completed  <a class='mr-1' href='https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa914.pdf?forcedownload=true' target='_blank' > Request for protection order registry search </a> form");
                schedule2Info.fileConsent = !ppmAdditionalDocData.unableFileForms.includes("Completed  <a class='mr-1' href='https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/supreme-family/s-51-consent-child-protection-record-check.pdf?forcedownload=true' target='_blank' > Consent for Child Protection Record Check Form 5 </a> <i> Family Law Act Regulation </i>");

            } else if (ppmAdditionalDocData.isFilingAdditionalDocs == 'y'){

                schedule2Info.fileRequest = true;
                schedule2Info.fileConsent = true;
            }

            schedule2Info.filingRequiredDocs = ppmAdditionalDocData.isFilingAdditionalDocs == 'y' || 
                                               (ppmAdditionalDocData.isFilingAdditionalDocs == 'n' && 
                                               (schedule2Info.fileConsent || schedule2Info.fileRequest))
        }
      
        return schedule2Info;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>