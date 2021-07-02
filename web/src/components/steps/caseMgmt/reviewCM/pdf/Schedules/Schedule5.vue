<template>
    <div v-if="dataReady">
<!-- <Page 6> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 5 – RECOGNIZING AN EXTRAPROVINCIAL ORDER OTHER THAN A SUPPORT ORDER</b></div>
            <div style="text-align:center;"><b>This is Schedule 5 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for recognition of an extraprovincial order other than a support order.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion">                
                <underline-form style="text-indent:3px; display:inline-block;" textwidth="13rem" beforetext="I am applying for recognition of an extraprovincial order made on" hint="mmm/dd/yyyy" :italicHint="false" text=""/>
                <underline-form style="display:inline;margin-left:0.5rem; text-indent:1px;" textwidth="22rem" beforetext=" at " hint="court location, city, province" :italicHint="false" text="800 hornby st, Vancouver, BC"/>
                <div style="line-height:2rem; text-indent:5px; display:inline;"> about parenting arrangements, contact with a child, guardianship, or an order that is similar in nature</div>                
            </section>

<!-- <2> -->
            <section>
                <div style="display:inline; margin-left:0.15rem">
                    A certified copy of the order is attached
                </div>                
            </section>

<!-- <3> -->
            <section>
                <div style="display:inline; margin-left:0.15rem">
                    The contact information, as I know it, for the other party is:
                </div>

                <div v-for="(otherParty,inx) in otherParties" :key="inx" :style="inx==0?'display:inline;':'text-indent:-5px;margin-top:1rem;'">
                  
                    <table class="fullsize">
                        <tr style="border:1px solid #313132">
                            <td>Full name of party: <div class="answer"></div> </td>
                            <td style="padding-left:50px"></td>
                            <td>Date of birth: <div class="answer"></div> </td>
                        </tr>                    
                        <tr style="border:1px solid #313132" >                        
                            <td colspan="3">Lawyer (if applicable): </td>
                        </tr>
                        <tr style="border:1px solid #313132">          
                            <td colspan="3">Address: <div class="answer">  </div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td  >City: <div class="answer"></div> </td>
                        <td style="padding-left:50px">Province: <div class="answer"></div> </td>
                            <td>Postal Code: <div class="answer"></div> </td>
                        </tr>
                        <tr style="border:1px solid #313132">
                            <td>Email: <div class="answer"></div> </td>
                            <td style="padding-left:50px"></td>
                            <td>Telephone: <div class="answer"></div> </td>
                        </tr>
                    </table> 
                </div>

            </section>
 
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "./components/UnderlineForm.vue";
import CheckBox from "./components/CheckBox.vue";
import { schedule5DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

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
    otherParties = [{},{}]

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

        // console.log(this.result)

        // if (this.result.contactWithChildSurvey){
        //     newChildContactInfo.guardian = this.result.contactWithChildSurvey.parentGuardianApplicant == 'y';
        // }

        // if (this.result.aboutContactWithChildOrderSurvey){
        //     const contactChoices = this.result.aboutContactWithChildOrderSurvey.contactTypeChoices?this.result.aboutContactWithChildOrderSurvey.contactTypeChoices:[];
        //     newChildContactInfo.abt = {
        //         conChList: this.result.aboutContactWithChildOrderSurvey.childrenRequireContactChoices,
        //         conType: {
        //             inPerson: contactChoices.includes('In person'),
        //             tel: contactChoices.includes('Telephone communication'),
        //             video: contactChoices.includes('Video communication'),
        //             written:contactChoices.includes('Written communication'),
        //             other: contactChoices.includes('other')
        //         },
        //         inPrsn: (contactChoices.includes('In person'))? this.result.aboutContactWithChildOrderSurvey.inPersonDetails:'',
        //         otherComm: (contactChoices.includes('other'))? this.result.aboutContactWithChildOrderSurvey.contactTypeChoicesComment:'',
        //         cond: (this.result.aboutContactWithChildOrderSurvey.placeConditions == 'y')? this.result.aboutContactWithChildOrderSurvey.conditionsDescription:'',
        //         lastCont: (this.result.aboutContactWithChildOrderSurvey.lastContactDate)?Vue.filter('beautify-date')(this.result.aboutContactWithChildOrderSurvey.lastContactDate):''
        //     }
        // }

        // if (this.result.contactWithChildBestInterestsOfChildSurvey){
        //     newChildContactInfo.bstIntrst = this.result.contactWithChildBestInterestsOfChildSurvey.newChildBestInterestDescription;
        // }

        return newChildContactInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 