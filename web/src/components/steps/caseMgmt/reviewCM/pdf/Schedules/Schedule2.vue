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
                    <check-box  :check="modReqInfo.isWaiveOrModify?'yes':''" text="waive or modify a requirement related to service or giving notice <i>(complete Part 1 of this schedule)</i>"/>
                    <check-box  :check="modReqInfo.isAltMethodService?'yes':''" text="allow service of a document using an alternative method <i>(complete Part 2 of this schedule)</i>"/>
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
                        <check-box  :check="modReqInfo.waiveChangeRequirementList.includes('Application About Priority Parenting Matter')?'yes':''" text="Application About Priority Parenting Matter"/>
                        <check-box  :check="modReqInfo.waiveChangeRequirementList.includes('Application About a Family Law Matter')?'yes':''" text="Application About a Family Law Matter"/>
                        <check-box  :check="modReqInfo.waiveChangeRequirementList.includes('Subpoena')?'yes':''" text="Subpoena"/>
                        <check-box  :check="modReqInfo.waiveChangeRequirementList.includes('Order')?'yes':''" text="Order"/>
                        <check-box marginLeft="1.65rem" class="marginleft" checkbox="" inline="inline" boxMargin="0" style="display:inline;" :check="modReqInfo.waiveChangeRequirementList.includes('other')?'yes':''" text="other <i>(specify):</i>"/>
                        <underline-form style="text-indent:1px;display:inline-block;" textwidth="33rem" beforetext="" hint="" :text="modReqInfo.waiveChangeRequirementComment|truncate-word-after(70)"/>                     
                        <div class="answer">{{modReqInfo.waiveChangeRequirementComment|truncate-word-before(70)}}</div>
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
                    
                    <div v-if="modReqInfo.orderChangesDetail" 
                    class="answerbox">{{modReqInfo.orderChangesDetail}}</div>
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
                    
                    <div v-if="modReqInfo.applicationFacts" 
                    class="answerbox">{{modReqInfo.applicationFacts}}</div>
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
                    <div style="display:inline; margin:0 0.3rem">I need to serve</div>
                    <div v-for="name,inx in modReqInfo.nameOfPersonToBeServed" :key="inx" style="display:inline;">
                        <underline-form v-if="name"  style="text-transform:capitalize;margin-bottom:0.5rem;text-indent:2px;" textwidth="16.5rem" :beforetext="inx==0?'':',' " hint="name of person who must be served" :italicHint="false" :text="name"/>
                    </div>
                    <div style="display:inline; margin-left:0.15rem">
                         with the following document(s):
                    </div>
                        
                    <div>
                        <i style="margin-left:1.0rem">List each document you need an order from the court to serve using an alternative method</i>
                    </div>

                    <div v-if="modReqInfo.altMethodDocList" 
                    class="answerbox" v-html="modReqInfo.altMethodDocList" >{{modReqInfo.altMethodDocList}}</div>
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
                    
                    <div v-if="modReqInfo.altMethodServingDetails" 
                    class="answerbox">{{modReqInfo.altMethodServingDetails}}</div>
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
                    
                    <div v-if="modReqInfo.altMethodApplicationFacts" 
                    class="answerbox">{{modReqInfo.altMethodApplicationFacts}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                             
                </section>
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule2DataInfoType } from '@/types/Application/CaseManagement/PDF';

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
    modReqInfo = {} as schedule2DataInfoType; 
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){        
        this.modReqInfo = this.getWaiveModifyRequirementsInfo();
    }

    public getWaiveModifyRequirementsInfo(){
        let waiveModifyRequirementsInfo = {} as schedule2DataInfoType;
        
        if(this.result?.changingOrCancellingAServiceOrNoticeSurvey){
            const chgSurvey = this.result.changingOrCancellingAServiceOrNoticeSurvey;
            const namesOfNeedToBeServedCondition = chgSurvey.namesOfNeedToBeServed? chgSurvey.namesOfNeedToBeServed?.split(/[;,]+/).map(item => {return item.trim();}):[]

            waiveModifyRequirementsInfo.isWaiveOrModify =  (chgSurvey.changeOrCancelRequirementForService =='y');
            waiveModifyRequirementsInfo.isAltMethodService = (chgSurvey.anotherMethodOfService == 'y');
            
            waiveModifyRequirementsInfo.orderChangesDetail = waiveModifyRequirementsInfo.isWaiveOrModify? chgSurvey.orderChangesDetail: '';            
            waiveModifyRequirementsInfo.waiveChangeRequirementList = waiveModifyRequirementsInfo.isWaiveOrModify? chgSurvey.documentList: [];
            waiveModifyRequirementsInfo.waiveChangeRequirementComment = waiveModifyRequirementsInfo.isWaiveOrModify? chgSurvey.documentListComment:'';
            waiveModifyRequirementsInfo.applicationFacts = waiveModifyRequirementsInfo.isWaiveOrModify? chgSurvey.applicationFacts:'';

            waiveModifyRequirementsInfo.nameOfPersonToBeServed = waiveModifyRequirementsInfo.isAltMethodService?namesOfNeedToBeServedCondition:[];
            waiveModifyRequirementsInfo.altMethodApplicationFacts = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.applicationFactsAltMethod:'';
            waiveModifyRequirementsInfo.altMethodServingDetails = waiveModifyRequirementsInfo.isAltMethodService? chgSurvey.altMethodServingDetails:''
            
            let altMetList = chgSurvey.documentListForAltMethod;
            if(altMetList){
                altMetList = altMetList.replace(/\n/g,'<br>');
                altMetList = altMetList.replace(/;/g, '<br>');
                altMetList = altMetList.replace(/,/g, '<br>');
            }
            waiveModifyRequirementsInfo.altMethodDocList  = waiveModifyRequirementsInfo.isAltMethodService? altMetList:'';
            
        }
        
        
        return waiveModifyRequirementsInfo;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>