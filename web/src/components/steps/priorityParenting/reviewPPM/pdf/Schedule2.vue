<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />
        <div style="margin-top: 1rem;" />
        <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
            <div style="flex:1; margin-right: 10px;">
                <div style="margin-top: 0.3rem;" />
                <div style="background: #626262; color: white; font-size: 13pt;">
                    <b style="font-size: 26pt;">Schedule 2 |</b>
                    <b>Application for Order Respecting Guardianship of a Child</b>
                </div>
                <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                    <div style="display: inline-block;">
                        Complete this schedule only if you are applying for a priority parenting matter order for
                        guardianship of a child under section 51 [order respecting guardianship] of the Family Law Act
                        because the order is needed to transfer a child from the care of the Director or to prevent the 
                        removal of a child under the Child, Family and Community Service Act
                    </div>


                    <!-- <b-table :items="childrenInfo" :fields="childrenFields" class="mt-2" small bordered>
                        <template v-slot:cell()="data">
                            <div style="height:1rem; font-size:8pt;color:#000">{{ data.value }}</div>
                        </template>
                        <template v-slot:head(dob)>
                            Child's date of birth <i style="font-size:6pt; font-weight:normal;">(mmm/dd/yyyy)</i>
                        </template>
                    </b-table> -->
                </div>
            </div>
            <div style="width: 20% ">
            <div style="background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px; font-size:7pt;">
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

    <!-- Part 2-->
    <div style="margin-top: 1rem;" />
    <div style="display:flex; flex-direction:row gap:6px; font-size:9pt">
        <div style="flex:1; margin-right: 10px;">
            <div style="margin-top: 0.3rem;" />
            <div style="background: #626262; color: white; font-size: 13pt;">
                <b>Part 1 | Indigenous ancestry of child(ren)</b>
            </div>
            <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                <div style="display: inline-block;">
                    <b>1.</b> Is the child or children <b>Indigenous</b>?
                </div>
            </div>
            <div style="margin-left:3rem; text-indent: -16px;">
                <check-box :check="(scheduleInfo.isFirstNations == 'yes')?'yes':''" text="<b>Yes</b> &#10132; go to next question"/> 
                <check-box :check="(scheduleInfo.isFirstNations == 'no')?'yes':''" text="<b>No</b> &#10132; skip ahead to <b>Part 4</b>"/> 
                <check-box :check="(scheduleInfo.isFirstNations == 'unknown')?'yes':''" text="<b>Unknown</b> &#10132; skip ahead to <b>Part 4</b>"/> 
            </div>
            <div style="text-indent: -0px; text-align: justify;text-justify: inter-word;  margin: 1rem 0.5rem 0.5rem 1rem;">
                <div style="display: inline-block;">
                    <b>2.</b> <i>Complete this question only if a child is Indigenous.
                    If not, you may leave this question blank.</i> <br/>
                    Please select the option below that best describes the <b>child(ren)’s Indigenous ancestry:</b>
                </div>
                <check-box style="margin:0 0 0 2rem; display: block;"  :check="scheduleInfo.ancestryType.includes('First Nation')?'yes':''" text="First Nation"/>
                <check-box style="margin:0 0 0 2rem; display: block;"  :check="scheduleInfo.ancestryType.includes('Nisg̲a’a')?'yes':''" text="Nisga'a"/>
                <check-box style="margin:0 0 0 2rem; display: block;"  :check="scheduleInfo.ancestryType.includes('Treaty First Nation')?'yes':''" 
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
                <check-box style="margin:0 0 0 2rem; display: block;"  :check="scheduleInfo.ancestryType.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                    text=" the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                <check-box style="margin:0 0 0 2rem; display: block;"  :check="scheduleInfo.ancestryType.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                    text=" the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/> 
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
                    Family Law Act]. 
                </p>
            </div>
        </div>
    </div>
        <!-- <div style="text-align:center;"><b> SCHEDULE 2 – APPLICATION FOR ORDER RESPECTING GUARDIANSHIP OF A CHILD</b></div>
        <div style="text-align:center;"><b> This is Schedule 2 to the Application About a Priority Parenting Matter</b></div>

        <div style="margin:1rem 0; text-align:justify">            
            This schedule must be completed only if you are applying for a priority parenting matter order respecting
            guardianship under section 51 [order respecting guardianship] of the Family Law Act because the order is
            needed to transfer a child from the care of the Director or to prevent the removal of a child under the Child,
            Family and Community Service Act.
        </div> -->

<!-- <1> --> 
        
        <!-- <div style="text-align:justify; font-weight: bold;">
            Indigenous ancestry of child(ren)
        </div> 
        <div style="text-align:justify;">                
            <i>These questions will help the court make a decision about guardianship of a child.</i>
        </div>         
        <section>               
            <div style="display:inline; margin-left:0.25rem;">Is the child or children Indigenous?
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'yes')?'yes':''"  text="Yes"/>                        
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'no')?'yes':''" text="No"/> 
                <check-box inline="inline" boxMargin="0" style="display:inline;" shift="10" :check="(scheduleInfo.isFirstNations == 'unknown')?'yes':''" text="Unknown"/> 
            </div>               
            <div style="margin:0 0 0 1rem; display: block;"><i>If yes,</i> please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</div>            
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('First Nation')?'yes':''" text="First Nation"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('Nisg̲a’a')?'yes':''" text="Nisga'a"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('Treaty First Nation')?'yes':''" text="Treaty First Nation"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
            <check-box style="margin:0 0 0 1rem; display: block;"  :check="scheduleInfo.ancestryType.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous')?'yes':''" 
                text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/> 
        </section>

        <div style="margin-top: 1rem;"></div>  -->

<!-- <2> -->
        <!-- <div class="print-block">
            <section>
                <i style="display:inline; margin:0 0 0 0.5rem;">Complete the following statement only if the child is a Nisg̲a’a child or a Treaty First Nation child</i>
                <div style="margin:0 0 0 1.35rem;">
                    <check-box 
                        :check="scheduleInfo.understandFirstNationsService?'yes':''" 
                        text="I acknowledge that I must serve the Nisg̲a’a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/>
                </div>
            </section>
        </div>

        <div style="margin-top: 1rem;"></div> -->

<!-- <3> -->
        <!-- <div class="print-block">
            <section>
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0 0 0.5rem;display:inline;" 
                    :check="scheduleInfo.understandFileForm5?'yes':''" 
                    text="I understand that I am required to file a Guardianship Affidavit in Form 5 as described in Rule 26"/>
                <div style="margin:0 0 0 2rem; display:inline;">before the court can make a final order about guardianship</div>
            </section>
        </div>

        <div style="margin-top: 1rem;"></div> -->

<!-- <4> -->

        <!-- <div class="print-block">           

            <section>
                <check-box 
                    inline="inline" 
                    boxMargin="0" 
                    style="margin:0 0 0 0.5rem;display:inline;" 
                    :check="scheduleInfo.initiatedCriminalCheck?'yes':''" 
                    text="I have initiated or completed a criminal record check as required for the Guardianship Affidavit in"/>
                <div style="margin:0 0 0 2rem; display:inline;">Form 5</div>
            </section>
        </div>        

        <div style="margin-top: 1rem;"></div> -->

<!-- <5> -->
        <!-- <div class="print-block"> 
            <section>
                <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>                
                <div style="margin:0 0 0 1rem;">                     
                    <check-box  :check="scheduleInfo.filingRequiredDocs?'yes':''" text="I am filing the following required documents along with this application"/>
                </div>
                <div style="margin:0 0 0 3rem;">
                   <check-box  :check="scheduleInfo.fileConsent?'yes':''" text="a Consent for Child Protection Record Check in Form 5 under the <i>Family Law Act Regulation</i>"/>
                   <check-box  :check="scheduleInfo.fileRequest?'yes':''" text="a request, in the form provided by the registry, to search the protection order registry"/>
                </div>
                <div style="margin:0.5rem 0 0 1rem;">                     
                    <check-box  :check="!scheduleInfo.filingRequiredDocs?'yes':''" text="I am not able to complete the required documents at this time. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive the requirement that this application be filed with the additional documents."/>
                </div>
            </section>
        </div> -->
  
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