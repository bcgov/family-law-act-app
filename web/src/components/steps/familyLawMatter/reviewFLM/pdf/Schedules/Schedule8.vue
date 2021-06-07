<template>
    <div v-if="dataReady">         
<!-- <Page 9> --> 
<!-- <Header> -->
        <div v-if="selectedSchedules.includes('schedule8')">
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 8 – CANCELLING GUARDIANSHIP OF A CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 8 to the Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>Complete this schedule only if you are making an application to cancel the guardianship of a child or children identified in section 11 of this application.</i>
            </div>

            
            <div style="margin-top:1rem;"><b>Order about guardianship</b></div>
<!-- <1> -->
            <section class="resetquestion">                
                <check-box inline="inline" boxMargin="0" style="margin:0 0 0 0.5rem; display:inline;" :check="true?'yes':''" text="I am applying for the following person(s) to no longer be the guardian(s) of the child or children:"/>
                <b-table
                    :items="guardInfo.abtCancel.cancelDetails"
                    :fields="childrenGuardianshipFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:8pt;color:#000">{{data.value}}</div>                                           
                        </template>
                </b-table>                         
            </section> 
           

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.35rem">I am: </div>
                <div style="margin:0 0 0 1.35rem;">                    
                    <check-box style="" :check="guardInfo.abtCancel.cancelDetails[0].relationship == 'Guardian'?'yes':''" text="a guardian of the child(ren)"/>
                    <check-box style="" :check="guardInfo.abtCancel.cancelDetails[0].relationship != 'Guardian'?'yes':''" text="applying to be appointed as a guardian of the child(ren)"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Indigenous ancestry of child</b></div>
                <i>These questions will help the court make a decision about guardianship of a child.</i>
<!-- <3> -->
                <section>
                    <div style="display:inline; margin-left:0.35rem">Is the child or children Indigenous? </div>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.indigenous?'yes':''" text="Yes"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.nonIndigenous?'yes':''" text="No"/>
                    <check-box inline="inline" boxMargin="0" shift="10" style="display:inline;margin-left:0rem;" :check="guardInfo.unKnownAncestry?'yes':''" text="Unknown"/>
                    <div style="margin:0 0 0 1.35rem;">
                        <i style="margin:0 0 0 -0.25rem;" >If yes, please select the option(s) below that best describe(s) the child(ren)’s Indigenous ancestry</i>
                        <check-box style="" :check="guardInfo.ancestry.firstNation?'yes':''" text="First Nation"/>
                        <check-box style="" :check="guardInfo.ancestry.nisga?'yes':''" text="Nisg̲a’a"/>
                        <check-box style="" :check="guardInfo.ancestry.treatyFirstNation?'yes':''" text="Treaty First Nation"/>
                        <check-box style="" :check="guardInfo.ancestry.under12?'yes':''" text="the child is under 12 years of age and has a biological parent who is of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                        <check-box style="" :check="guardInfo.ancestry.over12?'yes':''" text="the child is 12 years of age or older, of Indigenous ancestry, including Métis and Inuit, and self-identifies as Indigenous"/>
                    </div>
                </section>
            </div>

            <div style="margin-top:1rem;"></div>
<!-- <4> -->
            <section>
                <i style="display:inline; margin:0 0 0 0.5rem;">Complete the following statement only if the child is a Nisg̲a’a child or a Treaty First Nation child</i>
                <div style="margin:0 0 0 1.35rem;">
                    <check-box style="" :check="guardInfo.ancestry.acknowledge?'yes':''" text="I acknowledge that I must serve the Nisg̲a’a Lisims Government or the Treaty First Nation to which the child belongs with notice of this application as described in section 208 or 209 of the <i>Family Law Act</i>"/>
                </div>
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Best interests of child</b></div>
<!-- <5> -->
                <section>
                    <div style="display:inline; margin:0 0 3rem 0.35rem;">I believe it is in the child(ren)’s best interests to cancel the guardianship of the person(s) listed in paragraph 1 because:</div>
                    <div v-if="guardInfo.abtCancel.bestInterest.length > 0" 
                            class="answerbox">{{guardInfo.abtCancel.bestInterest}}</div>
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
import { schedule7DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Form3 extends Vue {

    @Prop({required:true})
    result!: any;
    
    @Prop({required:true})
    selectedSchedules!: string[];
   
    dataReady = false;
    guardInfo = {} as schedule7DataInfoType;    
   
    mounted(){
        this.dataReady = false;       
        this.extractInfo();       
        this.dataReady = true;      
    }   
    
    childrenGuardianshipFields = [
        {key:"guardianName",  label:"Full name of guardian",                                tdClass:"border-dark align-middle text-center", thClass:"border-dark align-middle text-center", thStyle:"width:30%;"},
        {key:"childName",     label:"Name of child(ren)",                                   tdClass:"border-dark align-middle text-center", thClass:"border-dark align-middle text-center", thStyle:"width:30%;"},
        {key:"guardianSince", label:"They have been a guardian of the child(ren) since:",   tdClass:"border-dark align-middle text-center", thClass:"border-dark align-middle text-center", thStyle:"width:25%;"},
    ]

    public extractInfo(){   

        if (this.selectedSchedules.includes('schedule7') || this.selectedSchedules.includes('schedule8')){
            this.guardInfo = this.getGuardianshipOfChildInfo(this.selectedSchedules.includes('schedule7'), this.selectedSchedules.includes('schedule8'));
        }
    }   

    public getGuardianshipOfChildInfo(guardian:boolean, cancel: boolean){
        let guardianshipInfo = {} as schedule7DataInfoType;
        // console.log(this.result)

        if (guardian){
            guardianshipInfo.abtGuardian = {
                children: []
            }
            if (this.result.GuardianOfChildSurvey){
                guardianshipInfo.abtGuardian = {
                    children:this.result.GuardianOfChildSurvey.childrenList?this.result.GuardianOfChildSurvey.childrenList:[]  
                }            
            }
        }

        if (cancel) {
            guardianshipInfo.abtCancel = {
                bestInterest: '',
                cancelDetails: [
                    {
                        guardianName: '', 
                        childName: '',
                        guardianSince: '',
                        relationship: ''
                    }
                ]
            }

            if (this.result.GuardianOfChildBestInterestOfChildSurvey){
                const bestInterestInfo = this.result.GuardianOfChildBestInterestOfChildSurvey;
                guardianshipInfo.abtCancel.bestInterest = (bestInterestInfo && bestInterestInfo.cancelGuradianChildBestInterest)?bestInterestInfo.cancelGuradianChildBestInterest:''
            }
            if (this.result.GuardianOfChildSurvey && this.result.GuardianOfChildSurvey.cancelGuardianDetails){
                if (this.result.GuardianOfChildSurvey.cancelGuardianDetails.length > 0){
                    guardianshipInfo.abtCancel.cancelDetails = [];
                }
                for (const detail of this.result.GuardianOfChildSurvey.cancelGuardianDetails){
                    guardianshipInfo.abtCancel.cancelDetails.push({
                        guardianName: detail.nameOther, 
                        childName: detail.name,
                        guardianSince: Vue.filter('beautify-date')(detail.date),
                        relationship: detail.relationship
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
                guardianshipInfo.ancestry = {
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
        return guardianshipInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 
