<template>
    <div v-if="dataReady">

<!-- <Page 1> -->          

        <div style="display:block;font-weight: 700; margin-top: 1rem;"> 
            Part 4 – Income of Other Persons in Household
        </div>

        <div style="text-indent:0px;display:block; font-size: 9pt; font-style: italic;"> 
            Complete this part only if you or the other party has made a claim for undue 
            hardship in a child support claim. Complete all sections that apply to your 
            circumstances. You may leave a section blank.
        </div>

    <!-- <1> --> 
        <section>            
            <check-box 
                checkbox="" 
                inline="inline" 
                boxMargin="0" 
                style="display:inline; margin-left: 1rem;" 
                :check="liveAlone?'yes':''" 
                text="I live alone."/>
            
        </section>

    <!-- <2> --> 
        <section>            
            <div style="display:inline;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="!liveAlone?'yes':''" 
                    text="I am living with"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="21rem" 
                    beforetext="" 
                    hint="(full name of person I am married to or cohabitating with)" 
                    :text="!liveAlone?partnerName:''"/>

                <div style="text-indent:1px;display:inline-block;">  
                    They have an annual income
                </div>
                <underline-form 
                    style="text-indent:1px;margin-top: 0.75rem;" 
                    textwidth="5rem" 
                    beforetext=" of $" 
                    hint="" 
                    :text="!liveAlone?partnerAnnualIncome:''"/>
                <div style="text-indent:1px;display:inline-block;">  
                    .
                </div>
            </div>  
        </section>
    <!-- <3> --> 
        <section>
           
            <check-box
                checkbox="" 
                inline="inline" 
                boxMargin="0"
                style="display:inline; margin-left: 1rem;" 
                :check="!liveAlone && adultDetails.length>0?'yes':''" 
                text="I/we live with the following other adult(s):"/>         
            <table class="fullsize">                
               
                <tr style="border:1px solid #414142; font-weight: 700;" >
                    <td style="border:1px solid #414142;" colspan="12">Full name of adult</td>
                    <td style="border:1px solid #414142;" colspan="3">Annual income</td>
                </tr>

                <tr v-if="adultDetails.length == 0" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer" style="visibility:hidden;">yyy</div> 
                    </td>
                    <td style="border:1px solid #414142;" colspan="3">
                        <div class="answer"></div>                     
                    </td>
                </tr>

                <tr v-for="(adult,inx) in adultDetails" :key="inx" style="border:1px solid #414142;" >
                    <td style="border:1px solid #414142;" colspan="12">
                        <div class="answer">{{adult.name}}</div> 
                    </td>
                    <td style="border:1px solid #414142;" colspan="3">
                        <div class="answer">{{adult.income}}</div>                     
                    </td>
                </tr>
            </table>
        </section> 
        
        <!-- <4> --> 
        <section>            
            <div style="display:inline;">
                <check-box
                    checkbox="" 
                    inline="inline" 
                    boxMargin="0"
                    style="display:inline; margin-left: 1rem;" 
                    :check="numberOfChildren>0?'yes':''" 
                    text="I/we have"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="8rem" 
                    beforetext="" 
                    hint="[number of children]" 
                    :text="numberOfChildren>0?numberOfChildren:''"/>
                <div style="display:inline;text-indent:1px;"> 
                    child(ren) who live(s) in the home.
                </div> 
            </div>  
        </section>

        <!-- <5> --> 
        <section>            
            <div style="display:inline;">                
                <underline-form 
                    style="text-indent:10px;display:inline;" 
                    textwidth="5rem" 
                    beforetext="My spouse/partner or other adult(s) residing in the home contributes about $" 
                    hint="" 
                    :text="(liveWithAdult && contributionAmount>0)?contributionAmount:''"/>
                <underline-form 
                    style="text-indent:1px;display:inline;" 
                    textwidth="19rem" 
                    beforetext="per" 
                    hint="(frequency of contribution(s))" 
                    :text="(liveWithAdult && contributionAmount>0)?contributionFreq:''"/>
            </div> 
            <div style="display:inline;text-indent:1px;"> 
                towards the household expenses.
            </div> 
        </section>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { nameInfoType } from "@/types/Application/CommonInformation";

@Component({
    components:{
        UnderlineForm,
        CheckBox       
    }
})
export default class Form4Layout extends Vue {

    @Prop({required:true})
    result!: any;    
    
    @applicationState.State
    public applicantName!: nameInfoType;    

    dataReady = false; 
    liveAlone = false;
    numberOfChildren = 0;
    liveWithAdult = false;

    contributionAmount = 0;  
    contributionFreq = '';
    ContributionFreqDesc = '';
    partnerName = '';
    partnerAnnualIncome = 0;
    adultDetails = [];    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;        
    }   

    public extractInfo(){        
        this.liveAlone = false;
        this.numberOfChildren = 0;
        this.liveWithAdult = false; 
        this.partnerName = '';
        this.partnerAnnualIncome = 0;
        this.adultDetails = [];
        this.contributionAmount = 0;  
        this.contributionFreq = '';       
        
        this.liveAlone = this.result?.incomeOtherPersonHouseholdLiveAlone && 
                            this.result.incomeOtherPersonHouseholdLiveAlone == "Yes";
        if(!this.liveAlone){

            this.liveWithAdult =  this.result?.incomeOtherPersonHouseholdLiveWithAdult && 
                            this.result.incomeOtherPersonHouseholdLiveWithAdult == "Yes";

            this.numberOfChildren = this.result?.incomeOtherPersonHouseholdNumberOfChildren?this.result.incomeOtherPersonHouseholdNumberOfChildren:0; 

            if(this.liveWithAdult){

                if(this.result?.incomeOtherPersonHouseholdFSSurvey){

                    for(const otherAdultInfo of this.result.incomeOtherPersonHouseholdFSSurvey){

                        let adultInfo = {
                            name: otherAdultInfo.adultFullName?otherAdultInfo.adultFullName:'', 
                            income: otherAdultInfo.adultAnnualIncome?Number(otherAdultInfo.adultAnnualIncome):0
                        }
                        
                        if(otherAdultInfo.married == "y"){
                            this.partnerName = adultInfo.name;
                            this.partnerAnnualIncome = adultInfo.income;
                        } else {
                            this.adultDetails.push(adultInfo);
                        }
                                   
                    }
                }
            }
        }

        if(this.liveWithAdult)
            this.getContributionInfo();
                    
    }
    
    public getContributionInfo(){           

        if(this.result?.contributionTowardExpensesFSSurvey){  

            const contributionInfo = this.result.contributionTowardExpensesFSSurvey

            this.contributionAmount = contributionInfo.otherAdultContribution?contributionInfo.otherAdultContribution:0;  
            this.contributionFreq = contributionInfo.contributionFrequency?contributionInfo.contributionFrequency:'';
            if(contributionInfo.contributionFrequency == "other"){
                this.contributionFreq = contributionInfo.contributionFrequencyComment?contributionInfo.contributionFrequencyComment:'';
            } else {
                this.contributionFreq = contributionInfo.contributionFrequency;
            }
        }               
    }

 
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

   
</style>
