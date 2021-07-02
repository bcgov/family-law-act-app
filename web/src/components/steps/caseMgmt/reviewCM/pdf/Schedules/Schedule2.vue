<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 2 – WAIVING OR MODIFYING ANY REQUIREMENT RELATED TO SERVICE OR GIVING NOTICE,</b></div>
            <div style="text-align:center;"><b> INCLUDING ALLOWING AN ALTERNATIVE METHOD OF SERVICE</b></div>
            <div style="text-align:center;"><b> This is Schedule 2 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for an order to waive or modify any requirement related to service or giving notice, including allowing an alternative method for the service of a document.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.15rem">
                    I am applying for an order to:
                </div>
                    
                <div>
                    <i style="margin-left:1.0rem">Select all applicable options and complete the required part(s)</i>
                </div>

                <div style="margin-left:1.0rem;">
                    <check-box style="" :check="true?'yes':''" text="waive or modify a requirement related to service or giving notice <i>(complete Part 1 of this schedule)</i>"/>
                    <check-box style="" :check="true?'yes':''" text="allow service of a document using an alternative method <i>(complete Part 2 of this schedule)</i>"/>
                </div>
            </section>

<!-- <PART 1> -->
            <div class="print-block">
                <div style="margin-top:1rem;"><b>PART 1 – WAIVE OR MODIFY A REQUIREMENT RELATED TO SERVICE OR GIVING NOTICE</b></div>
                <div style="text-align:justify;">
                    <i>Complete this part only if you are applying for an order to waive or modify a requirement related to service or giving notice.</i>
                </div>
                <div style="text-align:justify;margin-bottom:1rem;">
                    <i >
                        Judges normally hear from all parties before making decisions. Where there is urgency or risk of harm for example,
                        the court could hear from only one party. If obtaining an order from the court is time sensitive, the court may allow
                        less than the required amount of notice. The court may also allow more than the required amount of notice if there
                        are special circumstances that would require more time to prepare to attend court.
                    </i>
                </div>
<!-- <1> -->
                <section class="resetquestion"> 
                    <div style="display:inline; margin-left:0.15rem">
                        I am applying to the court to waive or modify the requirement for service or giving notice to a person under
                        the rules of the following document(s):
                    </div>
                        
                    <div>
                        <i style="margin-left:1.0rem">Select all options that apply</i>
                    </div>

                    <div style="margin-left:1.0rem;">
                        <check-box style="" :check="true?'yes':''" text="Application About Priority Parenting Matter"/>
                        <check-box style="" :check="true?'yes':''" text="Application About a Family Law Matter"/>
                        <check-box style="" :check="true?'yes':''" text="Subpoena"/>
                        <check-box style="" :check="true?'yes':''" text="Order"/>
                        <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="true?'yes':''" text="Other <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" text=""/>                     
                    </div>
                </section>
            </div>


            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The details of the order I am applying for are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Tell the court the specifics of the order you are applying for, including if you want the court to waive (cancel)
                            the requirement for service or giving notice and what the requirement for service or giving notice should be
                            changed to
                        </i>
                    </div>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b></b></div>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The facts on which this application is based are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Provide the facts you want the court to consider, including:                            
                        </i>
                    </div>
                    <ul style="text-indent:0;font-style:italic">
                        <li>why the other party should not be served or given notice of the application or other document before you attend court or why the service or notice requirement should be modified (changed)</li>
                        <li>why the application or your situation is urgent or what special circumstances exist</li>
                        <li>if applicable, what you believe will happen if the other party is served or given notice of your application or other document and a chance to attend court so that you can both be heard at the same time</li>
                    </ul>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

<!-- <PART 2> -->
            <div class="print-block">
                <div style="margin-top:1rem;"><b>PART 2 – ALLOW SERVICE OF A DOCUMENT USING AN ALTERNATIVE METHOD</b></div>
                
                <div style="text-align:justify;margin-bottom:1rem;">
                    <i >
                        Complete this part only if you are applying for an order to allow service of a document using an alternative method.
                        Service of a document must be done according to the rules unless the court makes an order allowing another
                        method to be used.
                    </i>
                </div>
<!-- <1> -->
                <section class="resetquestion"> 
                    <underline-form style="text-indent:2px;display:inline-block;" textwidth="16rem" beforetext="I need to serve" hint="name of person who must be served" :italicHint="false" text=""/>
                                         <div style="display:inline; margin-left:0.15rem">
                         with the following document(s):
                    </div>
                        
                    <div>
                        <i style="margin-left:1.0rem">List each document you need an order from the court to serve using an alternative method</i>
                    </div>

                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </section>
           
<!-- <2> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        I am applying for an order to be allowed to serve the document(s) in the following manner:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Tell the court the specifics of how you believe the documents should be served so that they come to the
                            attention of the person indicated above. Include the name of any other person, mailing address, email or
                            other information that would be required to serve the documents.                            
                        </i>
                    </div>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>

 <!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.15rem">
                        The facts on which this application is based are as follows:
                    </div>
                        
                    <div style="text-indent:0; margin-left:0rem">
                        <i>
                            Provide the facts you want the court to consider. Include the following:
                        </i>
                    </div>
                    <ul style="text-indent:0;font-style:italic">
                        <li>efforts to try to serve the other party</li>
                        <li>efforts to locate the other party</li>
                        <li>why you believe the method of service you outlined above will bring the documents to the attention of the party to be served</li>
                    </ul>
                    
                    <div v-if="false" 
                    class="answerbox"></div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import { schedule2DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

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
    exParentArrInfo = {} as schedule2DataInfoType; 
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){        
        this.exParentArrInfo = this.getExistingParentingArrangementsInfo();
    }

    public getExistingParentingArrangementsInfo(){
        let existingParentingArrangements = {} as schedule2DataInfoType;

        const generalCondition = (( this.result.aboutParentingArrangementsSurvey && 
                                    this.result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' &&                                    
                                    this.result.aboutParentingArrangementsSurvey.orderDifferenceType == 'changeOrder')
                                 || 
                                  ( this.result.aboutParentingArrangementsSurvey && 
                                    this.result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement'&& 
                                    this.result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'replacedAgreement'))

        
        
        if( this.result.aboutParentingArrangementsSurvey && this.result.aboutParentingArrangementsSurvey.existingType == 'ExistingOrder' ){
            existingParentingArrangements.type = 'ExistingOrder'
            existingParentingArrangements.existingDate = this.result.aboutParentingArrangementsSurvey.orderDate
            existingParentingArrangements.changesSince = this.result.aboutParentingArrangementsSurvey.changesSinceOrder
            if(this.result.aboutParentingArrangementsSurvey.orderDifferenceType == 'changeOrder'){
                existingParentingArrangements.subType = 'changeOrder'                
            } else if(this.result.aboutParentingArrangementsSurvey.orderDifferenceType == 'cancelOrder'){
                existingParentingArrangements.subType = 'cancelOrder'
            }
        }
        
        if( this.result.aboutParentingArrangementsSurvey && this.result.aboutParentingArrangementsSurvey.existingType == 'ExistingAgreement' ){
            existingParentingArrangements.type = 'ExistingAgreement'
            existingParentingArrangements.existingDate = this.result.aboutParentingArrangementsSurvey.agreementDate
            existingParentingArrangements.changesSince = this.result.aboutParentingArrangementsSurvey.changesSinceAgreement
            if(this.result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'replacedAgreement'){
                existingParentingArrangements.subType = 'replacedAgreement'                
            } else if(this.result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'setAsideAgreement'){
                existingParentingArrangements.subType = 'setAsideAgreement'
            }
        }        
        
        if (generalCondition && this.result.parentingArrangementChangesSurvey && 
            this.result.parentingArrangementChangesSurvey.orderChangeList &&  
            this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentalResponsibilities")){
                existingParentingArrangements.parentResp = {
                    applying: true,
                    desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription:''
                }

        } else {
            existingParentingArrangements.parentResp = {
                applying: false,
                desc: ''
            }
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey && 
            this.result.parentingArrangementChangesSurvey.orderChangeList &&  
            this.result.parentingArrangementChangesSurvey.orderChangeList.includes("parentingTime")){
                existingParentingArrangements.parentTime = {
                    applying: true,
                    desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeDescription:''
                }

        } else {
            existingParentingArrangements.parentTime = {
                applying: false,
                desc: ''
            }
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey && 
            this.result.parentingArrangementChangesSurvey.orderChangeList &&  
            this.result.parentingArrangementChangesSurvey.orderChangeList.includes("conditionsOnParentingTime")){
                existingParentingArrangements.parentCond = {
                    applying: true,
                    desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
                }

        } else {
            existingParentingArrangements.parentCond = {
                applying: false,
                desc: ''
            }           
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey && 
            this.result.parentingArrangementChangesSurvey.orderChangeList &&  
            this.result.parentingArrangementChangesSurvey.orderChangeList.includes("otherTermsAboutParentingArrangements")){
                existingParentingArrangements.parentalArr = {
                    applying: true,
                    desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription:''
                }
        } else {
            existingParentingArrangements.parentalArr = {
                    applying: false,
                    desc: ''
                }
        }         
        
        if (this.result.bestInterestsOfChildSurvey 
            && this.result.bestInterestsOfChildSurvey.existingParentingArrangementsChildBestInterestDescription){
                existingParentingArrangements.childBestInterest = this.result.bestInterestsOfChildSurvey.existingParentingArrangementsChildBestInterestDescription;
        } else {            
            existingParentingArrangements.childBestInterest = '';
        }
        
        return existingParentingArrangements;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>