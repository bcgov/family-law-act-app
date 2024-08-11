<template>
    <div v-if="dataReady">
<!-- <Page 6> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 5" scheduleTitle="Contact with a child" scheduleDescription="No existing final order or written agreement" style="text-align: center"></ScheduleHeader>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox style="font-size:9pt">
                        <p>
                            Complete this schedule only if you need a court order about contact with a child and you do not have an existing final court order or written agreement about contact with a child.
                        </p>
                    </NoteBox>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Relationship to the child"></FormPart>

                    <NoteBox style="font-size:9pt">
                        <p>Children often have important relationships with people other than their parents/guardians. These include grandparents, elders, relatives, and others close to the child. Usually,these relationships are supported by the parents or guardians</p>
                        <p>If an agreement is not possible, the person who believes they should have contact with the child can apply for a court order. </p>
                    </NoteBox>
                    
                    <section>
                        <i>Please confirm the following statement if true</i>
                        <br>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :check="true?'yes':''" text="I am <b>not a guardian</b> of the child(ren)"/> 
                    </section>
                    
                    <section>
                        <GreyBoxForm style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="The last contact with the child(ren) was on or around" hint="Date(mmm/dd/yyyy)" hintindent="30px" :text="chContInfo.abt.lastCont"/>
                    </section>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-paperclip />
                        <p>
                            You must attach a copy of the order or agreement to this application for filing.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <2> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Order about contact with a child"></FormPart>

                    <div class="print-block">
                        
                        <section class="no-counter">
                            <div style="display:inline; margin-left:0.35rem"><b>3.</b> I am applying for an order for the child(ren) to have <b>contact with a person <u>who is not their guardian</u></b> as follows:</div>                   
                            <div style="margin:0 3rem 1rem 1rem;">
                                <i>Select all options that apply and complete the required information</i>
                                <check-box  :check="chContInfo.abt.conType.inPerson?'yes':''" text="<b>In person</b>: <i>(specify)</i>"/>
                                <i class='marginleft1vue' style="margin:0 0 -0.25rem 1.75rem;">Provide details including specific dates or events requested, or dates and times that would be most suitable</i>
                                <div v-if="chContInfo.abt.conType.inPerson" 
                                    class="answerbox">{{chContInfo.abt.inPrsn}}</div>
                                <div v-else style="margin-bottom:3rem;"></div>
                                <check-box style="margin:0rem 0 0 0" :check="chContInfo.abt.conType.tel?'yes':''" text="Telephone communication"/>
                                <check-box  :check="chContInfo.abt.conType.video?'yes':''" text="Video communication"/>
                                <check-box  :check="chContInfo.abt.conType.written?'yes':''" text="Written communication"/>
                                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chContInfo.abt.conType.other?'yes':''" text="Other method of communication <i>(specify):</i>"/>
                                <GreyBoxForm style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" :text="chContInfo.abt.otherComm"/>            
                            </div>
                            <div style="margin:0 3rem 1rem 1rem;">
                                <b>4.</b> <i>Complete if applicable. You may leave this question blank.</i>
                                <div>
                                    <p>
                                        I am applying for <b>additional terms about contact</b> with a child as follows:
                                        <br>
                                        <i>List the details of the terms you are asking for</i></p>
                                </div>
                                <div v-if="result.aboutContactWithChildOrderSurvey && result.aboutContactWithChildOrderSurvey.placeConditions == 'y'" 
                                    class="answerbox">{{chContInfo.abt.cond}}</div>
                                <div v-else style="margin-bottom:3rem;"></div>
                            </div>
                        </section> 
                    </div>
        
                </div>
                <div style="width: 20%;">
                     <NoteBox style="margin-top:100px">
                        <b-icon-info-circle-fill />
                        <p>
                            The court may make an order about contact with a child, including describing the terms and form of contact [s. 59 <i>Family Law Act</i>].
                        </p>
                     </NoteBox>

                     <div style="margin-top: 4px;"></div>

                     <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court may make an order to require the parties to transfer the child under the supervision of, or require contact with the child to be supervised by, another person [s. <i>59 Family Law Act</i>].
                        </p>
                     </NoteBox>
                </div>
            </div>

            <div style="margin-top: 1rem;"></div>


            <!-- <3> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Best interests of the child"></FormPart>

                    <div class="print-block">
                        <div style="margin:0 3rem 1rem 1rem;">
                            <b>5.</b>
                            <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact with a child that I am applying for is in the <b>best interests of the child(ren)</b> because:
                                <br>
                                <i>
                                    List your reasons
                                </i>
                            </div>
                            <div v-if="chContInfo.bstIntrst.length > 0" 
                                class="answerbox">{{chContInfo.bstIntrst}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-book />
                        <p>To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. <i>37 of the Family Law Act.</i>
                            <br>
                            The parties and the court must consider the best interests of a child when making a decision about contact with a child.
                            <br>
                            For more information, see the guidebook.
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
import { schedule5DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        GreyBoxForm,
        NoteBox,
        FormPart,
        ScheduleHeader
    }
})
export default class Schedule5 extends Vue {

    @Prop({required:true})
    result!: any;
    
    dataReady = false;
    chContInfo = {} as schedule5DataInfoType;   
   
    mounted(){
        this.dataReady = false;   
        this.extractInfo();       
        this.dataReady = true;        
    }

    public extractInfo(){ 
        this.chContInfo = this.getNewChildContactInfo();
    }   

    public getNewChildContactInfo(){

        let newChildContactInfo = {} as schedule5DataInfoType;

        if (this.result.contactWithChildSurvey){
            newChildContactInfo.guardian = this.result.contactWithChildSurvey.parentGuardianApplicant == 'y';
        }

        if (this.result.aboutContactWithChildOrderSurvey){
            const contactChoices = this.result.aboutContactWithChildOrderSurvey.contactTypeChoices?this.result.aboutContactWithChildOrderSurvey.contactTypeChoices:[];
            newChildContactInfo.abt = {
                conChList: this.result.aboutContactWithChildOrderSurvey.childrenRequireContactChoices,
                conType: {
                    inPerson: contactChoices.includes('In person'),
                    tel: contactChoices.includes('Telephone communication'),
                    video: contactChoices.includes('Video communication'),
                    written:contactChoices.includes('Written communication'),
                    other: contactChoices.includes('other')
                },
                inPrsn: (contactChoices.includes('In person'))? this.result.aboutContactWithChildOrderSurvey.inPersonDetails:'',
                otherComm: (contactChoices.includes('other'))? this.result.aboutContactWithChildOrderSurvey.contactTypeChoicesComment:'',
                cond: (this.result.aboutContactWithChildOrderSurvey.placeConditions == 'y')? this.result.aboutContactWithChildOrderSurvey.conditionsDescription:'',
                lastCont: (this.result.aboutContactWithChildOrderSurvey.lastContactDate)? Vue.filter('beautify-date')(this.result.aboutContactWithChildOrderSurvey.lastContactDate):''
            }
        }

        if (this.result.contactWithChildBestInterestsOfChildSurvey){
            newChildContactInfo.bstIntrst = this.result.contactWithChildBestInterestsOfChildSurvey.newChildBestInterestDescription;
        }

        return newChildContactInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 