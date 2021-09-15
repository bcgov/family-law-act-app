<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 6 – CONTACT ORDER OR WRITTEN AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 6 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making a new application for child support and/or special and extraordinary expenses for the child or children identified in section 11 of this application.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">I am:</div>
                <div style="margin-left:1rem;">
                    <check-box  :check="!exChContInfo.guardian?'yes':''" text="a person allowed to have contact with the child(ren) according to a court order or written agreement"/>
                    <check-box style="width:120%;" :check="exChContInfo.guardian?'yes':''" text="a guardian of the child(ren)"/>                    
                </div>                
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about contact made on"/>
                <underline-form style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" hint="mmm/dd/yyyy" :text="exChContInfo.date"/>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="exChContInfo.order?'yes':''" text="I am applying for the existing final order about contact with a child or children to be:"/>                    
                    </div>
                    <div style="margin:0 0 2rem 3.25rem;">
                        <check-box  :check="exChContInfo.order && exChContInfo.abtExOrdr.ordrdiff == 'changeOrder'?'yes':''" text="changed"/>
                        <check-box  :check="exChContInfo.order && exChContInfo.abtExOrdr.ordrdiff == 'cancelOrder'?'yes':''" text="cancelled"/>
                        <div>Since the order was made, needs or circumstances have changed as follows:</div>                    
                        <div v-if="exChContInfo.order && exChContInfo.abtExOrdr.change" 
                            class="answerbox">{{exChContInfo.abtExOrdr.change}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1.5rem;">
                        <check-box style="margin:0 0 0 0rem;" :check="(!exChContInfo.order)?'yes':''" text="I am applying for all or part of the existing agreement about contact with a child or children to be:"/>                    
                    </div>
                    <div style="margin:0 0 2rem 3.25rem;">
                        <check-box  :check="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.agrmntdiff == 'setAsideAgreement'?'yes':''" text="set aside"/>
                        <check-box  :check="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.agrmntdiff == 'replacedAgreement'?'yes':''" text="replaced"/>
                        <div>I believe the agreement is not in the best interests of the child(ren) because:</div>                    
                        <div v-if="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.change" 
                            class="answerbox">{{exChContInfo.abtExAgrmnt.change}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>


            <div class="print-block">
                <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Complete only if you are applying to change or replace an existing final order or agreement about contact with a child or children. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">I am applying to change or replace the existing final order or agreement about contact as follows:</div>
                    <i class="marginleftplus" >Select all options that apply</i>
                    <div style="margin:0 3rem 1rem 1rem;">
                        
                        <check-box  :check="exChContInfo.abt.conType.noContact?'yes':''" text="no contact of any type"/>
                        <check-box  :check="exChContInfo.abt.conType.inPerson?'yes':''" text="in person: "/>
                        <i class="marginleft1vue" style="margin:0 0 0 1.75rem;">Provide specific dates or events requested, or dates and times that would be most suitable</i>
                        <div v-if="exChContInfo.abt.conType.inPerson" 
                            class="answerbox">{{exChContInfo.abt.inPrsn}}</div>
                        <div v-else style="margin-bottom:1rem;"></div>
                        <check-box style="margin:1rem 0 0 0" :check="exChContInfo.abt.conType.tel?'yes':''" text="telephone communication"/>
                        <check-box  :check="exChContInfo.abt.conType.video?'yes':''" text="video communication"/>
                        <check-box  :check="exChContInfo.abt.conType.written?'yes':''" text="written communication"/>
                        <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChContInfo.abt.conType.other?'yes':''" text="other method of communication <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" :text="exChContInfo.abt.otherComm"/>            
                    </div>
                    <div style="margin:0 3rem 2rem 1rem;">
                        <i>Complete only if applicable. You may leave this section blank.</i>
                        <div>I am applying to have the following conditions placed on the contact with the child(ren):</div>
                        <div v-if="result.aboutContactWithChildOrderSurvey && result.aboutContactWithChildOrderSurvey.placeConditions == 'y'" 
                            class="answerbox">{{exChContInfo.abt.cond}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section> 
            </div> 

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <6> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact I am applying for is in the child(ren)’s best interests because:</div>
                    <div v-if="exChContInfo.bstIntrst.length > 0" 
                            class="answerbox">{{exChContInfo.bstIntrst}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>
        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule6DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule6 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    exChContInfo = {} as schedule6DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.exChContInfo = this.getExistingChildContactInfo(); 
    }

    public getExistingChildContactInfo(){

        let existingChildContactInfo = {} as schedule6DataInfoType;

        if (this.result.contactWithChildOrderSurvey){
            existingChildContactInfo.guardian = this.result.contactWithChildOrderSurvey.roleType != 'allowedContact';
            if (this.result.contactWithChildOrderSurvey.existingType == "ExistingOrder"){
                existingChildContactInfo.date = Vue.filter('beautify-date')(this.result.contactWithChildOrderSurvey.orderDate);
                existingChildContactInfo.order = true;
                existingChildContactInfo.abtExOrdr = {
                    change: this.result.contactWithChildOrderSurvey.changesSinceOrder,
                    ordrdiff: this.result.contactWithChildOrderSurvey.orderDifferenceType                    
                }
                existingChildContactInfo.abtExAgrmnt = {
                    change: '',
                    agrmntdiff: ''
                }
            } else if (this.result.contactWithChildOrderSurvey.existingType == "ExistingAgreement") {
                existingChildContactInfo.order = false;
                existingChildContactInfo.date = Vue.filter('beautify-date')(this.result.contactWithChildOrderSurvey.agreementDate);                
                existingChildContactInfo.abtExAgrmnt = {                    
                    change: this.result.contactWithChildOrderSurvey.changesSinceAgreement,
                    agrmntdiff: this.result.contactWithChildOrderSurvey.agreementDifferenceType                   
                }
                existingChildContactInfo.abtExOrdr = {
                    change: '',
                    ordrdiff: ''
                }
            }            
        }

        if (this.result.aboutContactWithChildOrderSurvey){
            const contactChoices = this.result.aboutContactWithChildOrderSurvey.contactTypeChoices?this.result.aboutContactWithChildOrderSurvey.contactTypeChoices:[];
            const changeOrReplaceCondition = ((this.result.contactWithChildOrderSurvey?.existingType =='ExistingOrder'     && this.result.contactWithChildOrderSurvey?.orderDifferenceType == 'changeOrder') ||
                                             ( this.result.contactWithChildOrderSurvey?.existingType =='ExistingAgreement' && this.result.contactWithChildOrderSurvey?.agreementDifferenceType == 'replacedAgreement'));
            const inPersonCondition = (contactChoices.includes('In person'))? this.result.aboutContactWithChildOrderSurvey.inPersonDetails:'';                                
            const otherContactCommentCondition = (contactChoices.includes('other'))? this.result.aboutContactWithChildOrderSurvey.contactTypeChoicesComment:'';   
            const placeConditionsStatement = (this.result.aboutContactWithChildOrderSurvey?.placeConditions == 'y')? this.result.aboutContactWithChildOrderSurvey.conditionsDescription:'';
            existingChildContactInfo.abt = {
                conChList: this.result.aboutContactWithChildOrderSurvey.childrenRequireContactChoices,
                conType: changeOrReplaceCondition?
                {
                    noContact: contactChoices.includes('No contact of any type'),
                    inPerson: contactChoices.includes('In person'),
                    tel: contactChoices.includes('Telephone communication'),
                    video: contactChoices.includes('Video communication'),
                    written:contactChoices.includes('Written communication'),
                    other: contactChoices.includes('other')
                }:{
                    noContact: false,
                    inPerson: false,
                    tel: false,
                    video: false,
                    written:false,
                    other: false
                },
                inPrsn: changeOrReplaceCondition? inPersonCondition:'',
                otherComm: changeOrReplaceCondition? otherContactCommentCondition:'',
                cond: changeOrReplaceCondition? placeConditionsStatement:''
            }
        }

        if (this.result.contactWithChildBestInterestsOfChildSurvey){
            existingChildContactInfo.bstIntrst = this.result.contactWithChildBestInterestsOfChildSurvey.existingChildBestInterestDescription;
        }

        return existingChildContactInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 