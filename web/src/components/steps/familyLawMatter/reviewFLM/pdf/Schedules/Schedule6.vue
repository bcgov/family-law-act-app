<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 6" scheduleTitle="Contact with a child" scheduleDescription="Existing final order or written agreement"></ScheduleHeader>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox>
                        <p>
                            Complete this schedule only if you have an existing final order or written agreement about contact with a child and you need a new court order made to change, suspend or cancel the final order, or to set aside or replace the written agreement.
                        </p>
                    </NoteBox>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Final order or agreement"></FormPart>

                    <section>
                        Select only one of the options below and complete the requested information
                        <br>

                        <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="result.contactWithChildOrderSurvey.existingType == 'ExistingOrder'?'yes':''" text="I have a final court order about contact with a child made"/>
                        <GreyBoxForm style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="on (date)" aftertext="that I want to change or cancel (see attached copyof order).  Complete Part 2" hint="mmm/dd/yyyy" :text="result.contactWithChildOrderSurvey.existingType == 'ExistingOrder' ? exChContInfo.date: ''"/>
                        
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin-left:0.35rem;" :check="result.contactWithChildOrderSurvey.existingType == 'ExistingAgreement'?'yes':''" text="I have a written agreement about contact with a child made"/>
                        <GreyBoxForm style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="on (date)" aftertext="that I want to change or cancel (see attached copyof order).  Complete Part 2" hint="mmm/dd/yyyy" :text="result.contactWithChildOrderSurvey.existingType == 'ExistingAgreement' ? exChContInfo.date : ''"/>
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
                    <FormPart :part="2" title="Final order" subtitle="Complete this part only if you have a final order"></FormPart>

                    <div class="print-block">
                        <div>
                            <div><b>2.</b> Since the final order was made, the needs or circumstances have changed as follows: </div>                    
                            <div v-if="exChContInfo.order && exChContInfo.abtExOrdr.change" 
                                class="answerbox">{{exChContInfo.abtExOrdr.change}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
                        </div>
                        
                        <div>
                            <div><b>3.</b> I am applying for the final order to be:</div>
                            <i style="display:inline; margin-left:0.35rem">Select only one option</i>
                            
                            <div style="margin:0 0 2rem 3.25rem;">
                                <check-box  :check="exChContInfo.order && exChContInfo.abtExOrdr.ordrdiff == 'changeOrder'?'yes':''" text="changed - Complete Part 4"/>
                                <check-box  :check="exChContInfo.order && exChContInfo.abtExOrdr.ordrdiff == 'suspendedOrder'?'yes':''" text="suspended - Skip ahead to Part 5"/>
                                <check-box  :check="exChContInfo.order && exChContInfo.abtExOrdr.ordrdiff == 'cancelOrder'?'yes':''" text="cancelled - Skip ahead to Part 5"/>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court can only change, suspend or cancel a final order if there has been a change in the needs or circumstances of the child since the original order was made, including a change in the circumstances of another person such as a parent [s. 60 Family Law Act].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <3> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Agreement" subtitle="Complete this part only if you have an existing agreement"></FormPart>
                    
                    <div class="print-block">       
                        <div>
                            <div>
                                <b>4.</b> I believe the agreement about contact with a child is not in the best interests of thechild(ren) because:
                                <div v-if="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.change" 
                                    class="answerbox">{{exChContInfo.abtExAgrmnt.change}}</div>
                                <div v-else style="margin-bottom:3rem;"></div>
                            </div>
                            <div>
                                <div>
                                    <b>5.</b> Select only one option
                                    <br>
                                    I am applying for the existing agreement to be:
                                </div>
                                <check-box  :check="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.agrmntdiff == 'setAsideAgreement'?'yes':''" text="set aside"/>
                                <check-box  :check="(!exChContInfo.order) && exChContInfo.abtExAgrmnt.agrmntdiff == 'replacedAgreement'?'yes':''" text="replaced"/>                        
                            </div>
                        </div>
                    </div>

                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court must set aside or replace with an order, all or part of an agreement about contact with a child if the court is satisfied that the agreement is not in the best interests of the child [s. 58 Family Law Act].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <4> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="4" title="About the new order" subtitle="Complete this part only if you are asking to change orreplace the existing order or agreement"></FormPart>

                    <div class="print-block"> 
                        <div>
                            <b>6.</b> I am applying to change or replace the existing final order or agreement about contactwith a child as follows:
                            <br>
                            <i style="display:inline; margin-left:0.35rem">Select all options that apply and complete the required information</i>
                            <div style="margin:0 3rem 1rem 1rem;">                                
                                <!-- <check-box  :check="exChContInfo.abt.conType.noContact?'yes':''" text="no contact of any type"/> -->
                                <check-box  :check="exChContInfo.abt.conType.inPerson?'yes':''" text="In person: "/>
                                <i class="marginleft1vue" style="margin:0 0 0 1.75rem;">Provide specific dates or events requested, or dates and times that would be most suitable</i>
                                <div v-if="exChContInfo.abt.conType.inPerson" 
                                    class="answerbox">{{exChContInfo.abt.inPrsn}}</div>
                                <div v-else style="margin-bottom:1rem;"></div>
                                <check-box style="margin:1rem 0 0 0" :check="exChContInfo.abt.conType.tel?'yes':''" text="Telephone communication"/>
                                <check-box  :check="exChContInfo.abt.conType.video?'yes':''" text="Video communication"/>
                                <check-box  :check="exChContInfo.abt.conType.written?'yes':''" text="Written communication"/>
                                <check-box class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="exChContInfo.abt.conType.other?'yes':''" text="Other method of communication <i>(specify):</i>"/>
                                <underline-form style="text-indent:1px;display:inline-block;" textwidth="19rem" beforetext="" hint="" :text="exChContInfo.abt.otherComm"/>            
                            </div>
                            
                        </div> 

                        <div style="margin:0 3rem 2rem 1rem;">
                            <b>7.</b> 
                            <i>Complete if applicable. You may leave this question blank.</i>
                            <div>I am applying for additional terms about contactwith a child as follows:
                                <br>
                                <i>List the details of the terms you are asking for</i>
                            </div>
                            <div v-if="result.aboutContactWithChildOrderSurvey && result.aboutContactWithChildOrderSurvey.placeConditions == 'y'" 
                                class="answerbox">{{exChContInfo.abt.cond}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
                        </div>
                    </div> 

                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court may make an order about contact with a child, including describing the terms and form of contact [s. 59 Family Law Act].
                        </p>
                    </NoteBox>

                    <div style="margin-top: 1rem;"></div>

                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court may make an order to require the parties to transfer the child under the supervision of, or require contact with the child to be supervised by, another person [s. 59 Family Law Act].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

            <!-- <5> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="5" title="Best interests of the child" ></FormPart>

                    <div class="print-block">
                        <section>
                            <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe the order about contact with a child that I am applying for is in the best interests of the child(ren) because:
                                <br>
                                <i>List your reasons:</i>
                            </div>
                            
                            <div v-if="exChContInfo.bstIntrst.length > 0" 
                                    class="answerbox">{{exChContInfo.bstIntrst}}</div>
                            <div v-else style="margin-bottom:3rem;"></div>
                        </section>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-paperclip />
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the Family Law Act.
                        </p>
                        <p>
                            The parties and the court must consider the best interests of a child when making a decision about contact with a child. 
                        </p>
                        <p>
                            For more information, see the guidebook. 
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <div style="margin-top: 1rem;"></div>

        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule6DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        GreyBoxForm,
        ScheduleHeader,
        FormPart,
        NoteBox
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
        } else {
            existingChildContactInfo.abt = {
                conChList: [],
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