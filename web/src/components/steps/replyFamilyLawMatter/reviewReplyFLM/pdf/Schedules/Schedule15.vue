<template>
    <div v-if="dataReady">
<!-- <Page 6> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 5 – CONTACT WITH A CHILD – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 5 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are <div class="uline">not a guardian</div> of the child or children and you are making a new application about contact with the child or children identified in section 12 of this application.</i>
                <i style="display:block">Contact with a child is the time a child spends with a person who is not their guardian. </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">                
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.5rem" :check="true?'yes':''" text="I am not a guardian of the child(ren)"/>                
            </section>

           <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I am applying for an order for contact with the following child(ren) identified in section 12 of this application:</div>
                
                <div style="margin:0 0 1rem 1rem;">
                    <i>List the name of each child you want to have contact with</i>
                    <ul style="margin-left:-1rem" v-if="result.aboutContactWithChildOrderSurvey">
                        <li v-for="(child,inx) of chContInfo.abt.conChList" :key="inx"><span class="answer mx-3">{{child}}</span></li>
                    </ul>
                </div>
            </section>
 
            <div class="print-block">
                <div style="margin-top:0rem;"><b>About the order</b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">I am applying for contact with the child(ren) as follows:</div>                   
                    <div style="margin:0 3rem 1rem 1rem;">
                        <i>Select all options that apply and complete the required information</i>
                        <check-box  :check="chContInfo.abt.conType.inPerson?'yes':''" text="in person:"/>
                        <i class='marginleft1vue' style="margin:0 0 -0.25rem 1.75rem;">Provide specific dates or events requested, or dates and times that would be most suitable</i>
                        <div v-if="chContInfo.abt.conType.inPerson" 
                            class="answerbox">{{chContInfo.abt.inPrsn}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                        <check-box style="margin:0rem 0 0 0" :check="chContInfo.abt.conType.tel?'yes':''" text="telephone communication"/>
                        <check-box  :check="chContInfo.abt.conType.video?'yes':''" text="video communication"/>
                        <check-box  :check="chContInfo.abt.conType.written?'yes':''" text="written communication"/>
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="chContInfo.abt.conType.other?'yes':''" text="other method of communication <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" :text="chContInfo.abt.otherComm"/>            
                    </div>
                    <div style="margin:0 3rem 1rem 1rem;">
                        <i>Complete only if applicable. You may leave this section blank.</i>
                        <div>I am willing to have the following conditions placed on my contact with the child(ren):</div>
                        <div v-if="result.aboutContactWithChildOrderSurvey && result.aboutContactWithChildOrderSurvey.placeConditions == 'y'" 
                            class="answerbox">{{chContInfo.abt.cond}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section> 
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <4> -->
            <section>
                <underline-form style="margin-left:0.5rem; text-indent:0px;" textwidth="9rem" beforetext="I last had contact with the child(ren) on or around " hint="mmm/dd/yyyy" :text="chContInfo.abt.lastCont"/>
            </section>

            <div class="print-block">
                <div style="margin-top:2rem;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact I am applying for is in the child(ren)’s best interests because:</div>
                    <div v-if="chContInfo.bstIntrst.length > 0" 
                        class="answerbox">{{chContInfo.bstIntrst}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule5DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule15 extends Vue {

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