<template>
    <div v-if="dataReady">
<!-- <Page 6> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 5 – REPLY TO AN APPLICATION ABOUT CONTACT WITH A CHILD – NEW</b></div>
            <div style="text-align:center;"><b>This is Schedule 5 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i style="display:block">
                    This schedule must be completed only if you are disagreeing with a new application by the other party about
                    contact with a child or children. The order they applied for about contact can be found in Schedule 5 of their
                    Application About a Family Law Matter.
                </i>
            </div>           
 
                        
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.35rem">
                    I do not agree that the other party should have contact with the child(ren) as requested.
                    Instead, I ask that the other party’s contact with the child(ren) be as follows:
                </div>                   
                <div style="margin:0 3rem 1rem 1rem;">
                    <i>Select all options that apply and complete the required information</i>
                    <check-box  :check="chContInfo.abt.conType.noContact?'yes':''" text="no contact of any type"/>
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
                    <div>I am asking to have the following conditions placed on the contact with the child(ren):</div>
                    <div v-if="chContInfo.abt.cond" 
                        class="answerbox">{{chContInfo.abt.cond}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </div>
            </section> 
            
            <div class="print-block">
                <div style="margin-top:2rem;"><b>Best interests of child</b></div>
<!-- <2> -->
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
import { schedule5DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
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
        console.log(this.result)
        this.chContInfo = this.getNewChildContactInfo();
    }   

    public getNewChildContactInfo(){

        let newChildContactInfo = {} as schedule5DataInfoType;  
        
        newChildContactInfo.abt = {
            conType: {
                noContact: false,
                inPerson: false,
                tel: false,
                video: false,
                written:false,
                other: false
            },
            inPrsn: '',
            otherComm: '',
            cond: ''            
        };
        newChildContactInfo.bstIntrst = '';

        if (this.result.disagreeContactWithChildSurvey){
            const disagreeInfo = this.result.disagreeContactWithChildSurvey;
            const contactChoices = disagreeInfo.contactTypeChoices?disagreeInfo.contactTypeChoices:[];
            newChildContactInfo.abt = {
                conType: {
                    noContact: contactChoices.includes('No contact of any type'),
                    inPerson: contactChoices.includes('In person'),
                    tel: contactChoices.includes('Telephone communication'),
                    video: contactChoices.includes('Video communication'),
                    written:contactChoices.includes('Written communication'),
                    other: contactChoices.includes('other')
                },
                inPrsn: (contactChoices.includes('In person'))? disagreeInfo.inPersonDetails:'',
                otherComm: (contactChoices.includes('other'))? disagreeInfo.contactTypeChoicesComment:'',
                cond: (disagreeInfo.placeConditions == 'y')? disagreeInfo.conditionsDescription:''                
            }
            newChildContactInfo.bstIntrst = disagreeInfo.childBestInterestReason?disagreeInfo.childBestInterestReason:'';
        }        

        return newChildContactInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 