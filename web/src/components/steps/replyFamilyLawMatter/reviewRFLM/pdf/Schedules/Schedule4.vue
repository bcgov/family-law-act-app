<template>
    <div v-if="dataReady">

<!-- <Page 5> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 4 – REPLY TO AN APPLICATION ABOUT CHILD SUPPORT – EXISTING</b></div>
            <div style="text-align:center;"><b>This is Schedule 4 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to change or
                    cancel an existing final order about child support, or to set aside or replace all or part of an existing agreement
                    about child support. The order they applied for about child support can be found in Schedule 4 of their
                    Application About a Family Law Matter.                    
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem"><i>Select only one of the options below</i></div>
                
                <div style="margin-left:1rem;">                   
                    <check-box  
                        :check="exChSupInfo.agreeCircumstanceChanges?'yes':''" 
                        text="I agree that circumstances have changed since the final order about child support was made"/>
                    <check-box 
                        :check="exChSupInfo.disAgreeCircumstanceChanges?'yes':''" 
                        text="There has been no change in circumstances since the final order about child support was made"/>
                    <check-box style="width:120%;" 
                        :check="exChSupInfo.agreeSetAside?'yes':''" 
                        text="I agree the agreement about child support should be set aside or replaced"/>
                    <check-box style="width:120%;" 
                        :check="exChSupInfo.section150?'yes':''" 
                        text="I believe the agreement about child support was made on consideration of section 150 of the <i>Family Law Act</i>"/>                    
                </div>
            </section>

            <div class="print-block">               
<!-- <2> -->
                <section>                                          
                    <div 
                        style="display:inline; margin:0 0 -0.25rem 0;">
                        I do not agree with the requested order about the existing final order or agreement about child support
                        because:
                    </div>                    
                    <div v-if="exChSupInfo.disagreeReason" 
                        class="answerbox">{{exChSupInfo.disagreeReason}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>                    
                </section>
            </div>            

            <div class="print-block">               
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">Select only one of the options below</i>
                    
                    <div style="margin-left: 1rem;">
                        <check-box 
                            :check="exChSupInfo.continue?'yes':''" 
                            text="I am applying for the existing final order or agreement about child support to continue to be in place"/>
                        <check-box 
                            :check="exChSupInfo.change?'yes':''" 
                            text="I am applying to change or replace the existing final order or agreement about child support as follows:"/>
                        <div v-if="exChSupInfo.change && exChSupInfo.changeExpl" 
                             class="answerbox">{{exChSupInfo.changeExpl}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>                      
                    </div>
                </section>
            </div>           

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Calculations</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">
                        Select only one of the options below
                    </i>
                    
                    <div style="margin-left: 1rem;">
                        <check-box 
                            :check="exChSupInfo.calc.attaching?'yes':''" 
                            text="I am attaching calculations showing how much child support I believe should be paid according to the
                                child support guidelines"/>
                        <check-box 
                            :check="!exChSupInfo.calc.attaching?'yes':''" 
                            text="I am not attaching calculations because:"/>
                        <div v-if="!exChSupInfo.calc.attaching && exChSupInfo.calc.reason" 
                             class="answerbox">{{exChSupInfo.calc.reason}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>                      
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Unpaid child support</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.35rem">
                        Select only one of the options below
                    </i>
                    
                    <div style="margin-left: 1rem;">
                        <check-box 
                            :check="exChSupInfo.unpaidDetails.agreeAmount?'yes':''" 
                            text="I agree that the amount of unpaid child support (arrears) in the application is correct"/>
                        <check-box 
                            :check="!exChSupInfo.unpaidDetails.agreeAmount?'yes':''" 
                            text="The amount of unpaid child support (arrears) in the application is not correct."/>
                        <underline-form 
                            style="margin-left:0.5rem; text-indent:0px;" 
                            textwidth="9rem" 
                            beforetext="As of " 
                            hint="mmm/dd/yyyy" :text="exChSupInfo.unpaidDetails.crntDate"/>
                        <underline-form 
                            style="margin-left:0.1rem; text-indent:0px;" 
                            textwidth="8rem" 
                            beforetext=", the amount of unpaid child support (arrears) was $" 
                            hint="" 
                            :text="exChSupInfo.unpaidDetails.unpaidAmnt"/>
                                         
                    </div>
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>IMPORTANT NOTE:</b></div>
                <div 
                    style="margin-top:0rem; font-size:9.7pt; text-align:justify;">
                    <b>
                        If this family law case includes an application to change or replace an order or agreement for 
                        child support, you must provide financial information with your application or reply to this 
                        application by completing and filing a Financial Statement in Form 4.
                    </b>
                </div>
                <div style="margin-top:1rem;text-align:justify;">
                    If you do not give your complete, true, and up-to-date financial information when needed, the court can:
                    <ul>
                        <li>order that the income information be provided</li>
                        <li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>
                        <li>require a party to give security</li>
                        <li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>
                        <li>make any other order the court considers appropriate</li>                    
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import moment from 'moment';
import { schedule4DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import {replyExistingChildSupportDataInfoType, rflmCalculatingChildSupportDataInfoType, rflmUnpaidChildSupportDataInfoType, disagreeExistingChildSupportDataInfoType} from "@/types/Application/ReplyFamilyLawMatter/ChildSupport"

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule4 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;   
    exChSupInfo = {} as schedule4DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){         
        this.exChSupInfo = this.getExistingChildSupportInfo();
    }

    public getExistingChildSupportInfo(){

        let existingChildSupportInfo = {} as schedule4DataInfoType;
        
        

        if (this.result.replyExistingChildSupportSurvey && this.result.rflmUnpaidChildSupportSurvey 
                && this.result.rflmCalculatingChildSupportSurvey && this.result.disagreeExistingChildSupportSurvey){

            const replyExistingChildSupportInfo: replyExistingChildSupportDataInfoType = this.result.replyExistingChildSupportSurvey;
            if (replyExistingChildSupportInfo.existingType == 'finalOrder'){
                existingChildSupportInfo.agreeCircumstanceChanges = replyExistingChildSupportInfo.agreeFinalOrder == 'y';
                existingChildSupportInfo.disAgreeCircumstanceChanges = replyExistingChildSupportInfo.agreeFinalOrder == 'n';
                existingChildSupportInfo.section150 = false;
                existingChildSupportInfo.agreeSetAside = false;

            } else if (replyExistingChildSupportInfo.existingType == 'agreement'){
                existingChildSupportInfo.section150 = replyExistingChildSupportInfo.agreeAgreement == 'y';
                existingChildSupportInfo.agreeSetAside = replyExistingChildSupportInfo.agreeAgreement == 'n';
                existingChildSupportInfo.agreeCircumstanceChanges = false;
                existingChildSupportInfo.disAgreeCircumstanceChanges = false;
            }

            const rflmUnpaidChildSupportInfo: rflmUnpaidChildSupportDataInfoType = this.result.rflmUnpaidChildSupportSurvey;

            existingChildSupportInfo.unpaidDetails = {
                agreeAmount: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'y',
                crntDate: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'n'? Vue.filter('beautify-date')(rflmUnpaidChildSupportInfo.calculationDate):'',
                unpaidAmnt: rflmUnpaidChildSupportInfo.agreeChildSupportAmount == 'n'?rflmUnpaidChildSupportInfo.unPaidAmount:''

            }           
            const calculationInfo: rflmCalculatingChildSupportDataInfoType = this.result.rflmCalculatingChildSupportSurvey;
                    
            existingChildSupportInfo.calc = {                
                attaching: calculationInfo.attachingCalculations == 'y',
                reason: calculationInfo.attachingCalculations == 'n'?calculationInfo.notAttachingCalculationsReason:''
            } 

            const disagreeExistingChildSupportInfo: disagreeExistingChildSupportDataInfoType = this.result.disagreeExistingChildSupportSurvey;

            existingChildSupportInfo.disagreeReason = disagreeExistingChildSupportInfo.disagreeReason;
            existingChildSupportInfo.continue = disagreeExistingChildSupportInfo.requestedOrder == 'noChange';
            existingChildSupportInfo.change = disagreeExistingChildSupportInfo.requestedOrder == 'diffChange';
            existingChildSupportInfo.changeExpl = disagreeExistingChildSupportInfo.requestedOrder == 'diffChange'?disagreeExistingChildSupportInfo.requestedChangeDescription:'';  
            
          
        } else {
            const calculationsInfo = {
                attaching: false,
                reason: ''
            }
            const childSupportUnpaid = {
                agreeAmount: false,
                crntDate: '',
                unpaidAmnt: ''
            }
            existingChildSupportInfo = {
            
                agreeCircumstanceChanges: false,
                disAgreeCircumstanceChanges: false,
                agreeSetAside: false,
                section150: false,
                disagreeReason: '',
                continue: false,  
                change: false,
                changeExpl: '',     
                calc: calculationsInfo,
                unpaidDetails: childSupportUnpaid
            }    

        }
        
                

        return existingChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>