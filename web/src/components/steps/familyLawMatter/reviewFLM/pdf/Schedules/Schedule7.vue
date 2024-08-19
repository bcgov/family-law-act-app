<template>
    <div v-if="dataReady" style="font-size: 11.5pt;">  
        
<!-- <Page 8> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 7" scheduleTitle="Guardianship of a child" scheduleDescription="Appointing a guardian or terminating guardianship"></ScheduleHeader>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="noteBoxFontSize">
                        <p>
                            Complete this schedule only if you need a court order to appoint a new guardian for a child or to cancel an existing guardian’s guardianship of a child.
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="noteBoxFontSize" style="border: 2px dashed #333;">
                        <p><b>Please read before completing this schedule:</b></p>
                        <p>
                            Anyone who wants to become a guardian can apply, including a parent who is not a guardian or anyone else (even if they are not related to the child) [s. 51 Family Law Act]. Only a guardian may have parental responsibilities and parenting time with respect to a child [s. 40].
                        </p>
                        <p>
                            The Family Law Act provides that while a child’s parents are living together and after the child’s parents separate, each parent will continue to be the child’s guardian and will have parental responsibilities with respect to the child [ss. 39 and 40]. This does not mean that parents must have equal responsibility for a child. 
                        </p>
                        <p>
                            An agreement or order about parenting arrangements can give parental responsibilities to one or more guardians only, each guardian acting separately, or all guardians acting  together [s.40]. You  can use Schedule 1 or Schedule 2 to apply for an order about parenting arrangements.
                        </p>
                        <p>
                            In some cases, it may not be appropriate for a parent or guardian to remain a guardian. An agreement or order can provide that a parent is  not the child’s guardian [s.39]
                        </p>
                    </NoteBox>
                </div>
                <div style="width: 20%;">
                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-book />
                        <p>
                            Usually, a child’s parent is also the child’s guardian, but not always. For more information about who is a guardian, see the guidebook.
                        </p>
                    </NoteBox>
                </div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Order about guardianship"></FormPart>

                    <section>
                        Select each option that applies 
                        <div>
                            <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.becomeGuardian?'yes':''" text="I am applying to be appointed as a guardian of the child(ren)"/>
                        </div>
                        <div>
                            <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem;display:inline;" :check="!guardInfo.becomeGuardian?'yes':''" text="I am applying for the following person(s) to no longer be the guardian of the child(ren):"/>
                        </div>
                        <i>Complete the information requested below. Specify the child only if the information does not apply to each child this application is about.</i>
                        <div style="margin: 0 0 1rem 3.5rem;">
                            <i>List the name of each child you want to be appointed as a guardian of</i>
                            <ul v-if="guardInfo.becomeGuardian && guardInfo.abtGuardian && guardInfo.abtGuardian.children">
                                <li v-for="(child,inx) of guardInfo.abtGuardian.children" :key="inx"><span class="mx-3">{{child}}</span></li>
                            </ul>                     
                        </div>                
                    </section>

                </div>
                <div style="width: 20%;">
                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-info-circle-fill />
                        <p>
                            The court may appoint a person as a child’s guardian or terminate a person’s guardianship of a child [s. 51 Family Law Act].
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-info-circle-fill />
                        <p>
                            You may state “since birth” in the middle column instead of putting the specific date, if applicable [s. 51 Family Law Act].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <2> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Best interests of the child"></FormPart>

                    <div>
                        <b>2. </b> I believe the order about guardianship of a child that I am applying for is in the best interests of the child(ren) because:
                        <br>
                        <i>List your reasons</i>
                    </div>
                    
                    <div style="background-color: #eee; min-height: 80px; padding: 8px;">

                        <span v-if="result.guardianOfChildSurvey.applicationType.includes('becomeGuardian')">
                            <b>Please explain why you believe it is in the child's best interests to appoint you as a guardian.</b>
                            <br>
                            {{result.guardianOfChildBestInterestsOfChildSurvey.appointGuradianChildBestInterest}}
                            <br>
                            <br>
                        </span>
                        
                        <span v-if="guardInfo.abtCancel && guardInfo.abtCancel.bestInterest">
                            <b>Please explain why you believe it is in the child’s best interests to cancel the guardianship of the other party.</b>
                            <br>
                            {{guardInfo.abtCancel.bestInterest}}
                        </span>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-info-circle-fill />
                        <p>
                            If a child is 12 or older, the court must not appoint a person other than a parent as the child’s guardian without the child’s written approval, unless satisfied it is in the child’s best interests [s. 51 Family Law Act].
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-book />
                        <p>To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the Family Law Act.</p>
                        <p>The parties and the court must consider the best interests of a child when making a decision about guardianship of a child.For more information, see the guidebook.</p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <3> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Indigenous ancestry of child(ren)"></FormPart>

                    <div class="print-block">
                       <div>
                            <div>
                                <b>3. </b> Is the child or children Indigenous?
                            </div>
                            <div>
                                <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:1rem;" :check="guardInfo.indigenous?'yes':''" text="Yes - go to next question"/>
                            </div>
                            <div>
                                <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:1rem;" :check="guardInfo.nonIndigenous?'yes':''" text="No - Skip ahead to Part 4"/>
                            </div>
                            <div>
                                <check-box inline="inline" boxMargin="0" shiftmark="0" style="display:inline;margin-left:1rem;" :check="guardInfo.unKnownAncestry?'yes':''" text="Unknown - Skip ahead to Part 4"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <b>4. </b> Complete this question only if a child is Indigenous.
                                <br>
                                <i>If not, you may leave this question blank</i>
                                <br>
                                <b>Please select the option below that best describes the child(ren)’s Indigenous ancestry:</b>
                            </div>
                            <div style="margin:0 0 0 1.35rem;">
                                <check-box boxMargin="0" shiftmark="0" :check="guardInfo.ancestry.firstNation?'yes':''" text="First Nation"/>
                                <check-box boxMargin="0" shiftmark="0" :check="guardInfo.ancestry.nisga?'yes':''" text="Nisg̲a’a"/>
                                <check-box boxMargin="0" shiftmark="0" :check="guardInfo.ancestry.treatyFirstNation?'yes':''" text="Treaty First Nation, including"/>
                                <ul>
                                    <li>Tsawwassen First Nation</li>
                                    <li>Maa-nulth First Nations:
                                        <ul>
                                            <li>Huu-ay-aht First Nations</li>
                                            <li>Ka:’yu:’k’t’h’/Che:k’tles7et’h’ First Nations</li>
                                            <li>Toquaht Nation</li>
                                            <li>Uchucklesaht Tribe</li>
                                            <li>Yuułuʔiłʔatḥ Government</li>
                                        </ul>
                                    </li>
                                    <li>Tla’amin Nation</li>
                                </ul>
                                <check-box boxMargin="0" shiftmark="0" :check="guardInfo.ancestry.under12?'yes':''" text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                                <check-box boxMargin="0" shiftmark="0" :check="guardInfo.ancestry.over12?'yes':''" text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                            </div>
                        </div>
                    </div>
            
                    <div style="margin-top:1rem;"></div>
        
                    <NoteBox :fontSize="noteBoxFontSize" style="border: 2px dashed #333;">
                        <p>
                            <b>IMPORTANT NOTE ABOUT A NISGA’A OR TREATY FIRST NATION CHILD:</b>
                            <br>
                            If the child is  a Nis  ga’a or Treaty First Nation child, you must serve the Nisga'a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the Family Law Act.
                            <br>
                            To serve them notice, they must receive a copy of this application.
                        </p>
                    </NoteBox>

                </div>
                <div style="width: 20%;">
                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-info-circle-fill />
                        <p>
                            A guardian’s parental responsibilities include making decisions respecting the child’s cultural, linguistic, religious and spiritual upbringing and heritage, including, if the child is an Indigenous child, the child’s Indigenous identity [s. 41 Family Law Act].
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-book />
                        <p>
                            For more information about serving Nisga'a Lisims Government or the Treaty First Nation to which the child belongs, see the guidebook.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <4> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="4" title="Guardianship affidavit and supporting documents" subtitle="Complete this part only if you are applying to be appointed as a guardian"></FormPart>

                    <NoteBox :fontSize="noteBoxFontSize">
                        <p>
                            A party applying to be appointed as a guardian of a child must provide the court with evidence using the Guardianship Affidavit in Form 5 respecting the best interests of the child [s. 51 Family Law Act and Rule 26]. 
                        </p>
                    </NoteBox>
                    
                    <div class="print-block">
                        
                        <div>
                            <b>5. </b>
                            <check-box inline="inline" textDisplay="inline" boxMargin="0" shiftmark="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.becomeGuardian?'yes':''" text="I understand that I am required to file a Guardianship Affidavit in Form 5 as described in Rule 26"/>
                            <div style="margin:0 0 0 2rem;">before the court can make a final order about guardianship</div>
                        </div>
                    </div>

                    <div style="margin-top:1rem;"></div>
                    <div>
                        <b>6. </b>
                        <check-box inline="inline" textDisplay="inline" boxMargin="0" shiftmark="0" style="margin:0 0 0 0.5rem;display:inline;" :check="guardInfo.criminalCheck?'yes':''" text="I have initiated or completed a criminal record check as required for the Guardianship Affidavit in"/>
                        <div style="margin:0 0 0 2rem;">Form 5</div>
                    </div>

                    <div style="margin-top:1rem;"></div>
                    <div>
                        <b>7. </b>
                        <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>                
                        <div style="margin:0 0 0 1rem;">                     
                            <check-box boxMargin="0" shiftmark="0" :check="guardInfo.applyForCaseManagement=='n'?'yes':''" text="I am filing the following required documents along with this application"/>
                        </div>
                        <div style="margin:0 0 0 3rem;">
                            <ul>
                                <li>
                                    a Consent for Child Protection Record Check in Form 5 under the Family Law Act Regulation
                                </li>
                                <li>
                                    a request, in the form provided by the registry, to search the protection order registry
                                </li>
                            </ul>
                        
                        </div>
                        <div style="margin:0.5rem 0 0 1rem;">                     
                            <check-box boxMargin="0" shiftmark="0" :check="guardInfo.applyForCaseManagement=='y'?'yes':''" text="I am not able to file the required documents with this application. I am filing an Application for Case Management Order Without Notice or Attendance in Form 11 requesting to waive or modify the requirement that the documents be filed with this application. I understand I will still be required to file the documents at a later date."/>
                        </div>
                    </div>

                </div>
                <div style="width: 20%;">
                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-info-circle-fill />
                        <p>
                            To complete Form 5, you are required to attach the results from various record checks as exhibits. 
                            <br>
                            The record checks must be initiated at the time of filing this application.
                        </p>
                    </NoteBox :fontSize="sideNoteBoxFontSize">

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-book />
                        <p>
                            For more information about how to complete a record check, including where to find the forms, see the guidebook.
                        </p>
                    </NoteBox>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox :fontSize="sideNoteBoxFontSize">
                        <b-icon-book />
                        <p>
                            You must file a consent and request for record check or an Application for Case Management Order Without Notice or Attendance Form 11
                        </p>
                    </NoteBox>
                </div>        
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

import { schedule7DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
         GreyBoxForm,
         ScheduleHeader,
         NoteBox,
         FormPart
    }
})

export default class Schedule7 extends Vue {

    @Prop({required:true})
    result!: any;
    
    @Prop({required:true})
    selectedSchedules!: string[]; 
   
    dataReady = false; 
    guardInfo = {} as schedule7DataInfoType;    
     
    childrenGuardianshipFields = [
        {key:"guardianName",  label:"Full name of guardian",                                tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"childName",     label:"Name of child(ren)",                                   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:30%;"},
        {key:"guardianSince", label:"They have been a guardian of the child(ren) since:",   tdClass:"border-dark align-middle", thClass:"border-dark align-middle text-center align-middle", thStyle:"width:25%;"},
    ]

    noteBoxFontSize = '10.5pt';
    sideNoteBoxFontSize = '9pt';

    mounted(){
        this.dataReady = false;       
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){
        if (this.selectedSchedules?.includes('schedule7') || this.selectedSchedules?.includes('schedule8')){
            this.guardInfo = this.getGuardianshipOfChildInfo(this.selectedSchedules.includes('schedule7'), this.selectedSchedules.includes('schedule8'));
        }        
    }

    public getGuardianshipOfChildInfo(guardian:boolean, cancel: boolean){
        let guardianshipInfo = {} as schedule7DataInfoType;

        if (guardian){
            guardianshipInfo.abtGuardian = {
                children: []
            }
            if (this.result.guardianOfChildSurvey){
                guardianshipInfo.abtGuardian.children = this.result.guardianOfChildSurvey.childrenList? this.result.guardianOfChildSurvey.childrenList:[];               
            }
        }

        if (cancel) {
            guardianshipInfo.abtCancel = {
                bestInterest: '',
                cancelDetails: [
                    {
                        guardianName: '', 
                        childName: '',
                        guardianSince: ''
                    }
                ]
            }

            if (this.result.guardianOfChildBestInterestsOfChildSurvey){
                const bestInterestInfo = this.result.guardianOfChildBestInterestsOfChildSurvey;
                guardianshipInfo.abtCancel.bestInterest = bestInterestInfo?.cancelGuradianChildBestInterest? bestInterestInfo.cancelGuradianChildBestInterest:''
            }
            if (this.result.guardianOfChildSurvey?.cancelGuardianDetails){
                if (this.result.guardianOfChildSurvey.cancelGuardianDetails?.length > 0){
                    guardianshipInfo.abtCancel.cancelDetails = [];
                }
                for (const detail of this.result.guardianOfChildSurvey.cancelGuardianDetails){
                    guardianshipInfo.abtCancel.cancelDetails.push({
                        guardianName: detail.nameOther, 
                        childName: detail.name,
                        guardianSince: Vue.filter('beautify-date')(detail.date)
                    })
                }                
            }
        }

        if (this.result.indigenousAncestryOfChildSurvey){
            const ancestryInfo = this.result.indigenousAncestryOfChildSurvey;
            if (ancestryInfo.indigenousChild == 'yes' && ancestryInfo.indigenousAncestry){
                guardianshipInfo.indigenous = true;
                guardianshipInfo.nonIndigenous = false;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry ={
                    firstNation: ancestryInfo.indigenousAncestry.includes('First Nation'),
                    nisga: ancestryInfo.indigenousAncestry.includes('Nisg̲a’a'),
                    treatyFirstNation: ancestryInfo.indigenousAncestry.includes('Treaty First Nation'),
                    under12: ancestryInfo.indigenousAncestry.includes('the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    over12: ancestryInfo.indigenousAncestry.includes('the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous'),
                    acknowledge: (ancestryInfo.indigenousAncestry.includes('Nisg̲a’a') || ancestryInfo.indigenousAncestry.includes('Treaty First Nation'))? (ancestryInfo.ServeAcknowledgement == 'I acknowledge'):false
                }
            } else if (ancestryInfo.indigenousChild == 'no'){
                guardianshipInfo.indigenous = false;
                guardianshipInfo.nonIndigenous = true;
                guardianshipInfo.unKnownAncestry = false;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } else {
                guardianshipInfo.indigenous = false;
                guardianshipInfo.nonIndigenous = false;
                guardianshipInfo.unKnownAncestry = true;
                guardianshipInfo.ancestry = {
                    firstNation: false,
                    nisga: false,
                    treatyFirstNation: false,
                    under12: false,
                    over12: false,
                    acknowledge: false                    
                };
            } 
        }

        if(this.result.guardianOfChildSurvey?.applicationType?.includes('becomeGuardian')){
            guardianshipInfo.becomeGuardian = true;
        }else 
            guardianshipInfo.becomeGuardian = false;

        if(this.result.flmAdditionalDocumentsSurvey?.criminalChecked =='y' ){
            guardianshipInfo.criminalCheck = true;
        }else {
            guardianshipInfo.criminalCheck = false;
        }

        let form5unable = false;

        if(this.result.flmAdditionalDocumentsSurvey?.unableFileForms){
            for(const form of this.result.flmAdditionalDocumentsSurvey.unableFileForms){
                if(form.includes("Form 5")||form.includes("registry search")){
                    form5unable = true;
                }
            }   
        }

        if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='y' ){
            guardianshipInfo.applyForCaseManagement = 'n'
        }else if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && form5unable){
            guardianshipInfo.applyForCaseManagement = 'y'
        }else if(this.result.flmAdditionalDocumentsSurvey?.isFilingAdditionalDocs=='n' && !form5unable){
            guardianshipInfo.applyForCaseManagement = 'n'
        }else{
            guardianshipInfo.applyForCaseManagement = ''
        }
        return guardianshipInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 

