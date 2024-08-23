<template>
<!----------------------------------------------------------------  <CHANGE PO>   -------------------------------------------------------->  
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />

        <div style="background: #626262; color: white; font-size: 13pt; width: 78%;">
            <div style="display: flex; flex-direction: row;">
                <div style="width: 50%;">
                    <span style="font-size: 30pt;"><b>Schedule 2 |</b></span>
                </div>
                <div style="width: 50%;">
                    <span style="vertical-align: middle;"><b>Change Existing<br/> Protection Order</b></span>
                </div>
            </div>
        </div>

        <div style="margin-top: 1rem;"></div>

        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div class="fla-col-left-80 fla-light-grey" style="border-style: none; border-color: black; width: 98%; background-color: #dedede;">
                    Complete this schedule only if you have an existing protection order that you are applying to change.<br/>
                    An application to change an existing protection order must be made before the expiry of the order
                    that is the subject of the application [s. 187 <i>Family Law Act</i>].
                </div>
            </div>
            <div style="width: 20%;margin-top:-30px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        A person can make a subsequent application for a protection order after an
                        existing order has expired [s. 187 <i>Family Law Act</i>].
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top: 0.3rem;"></div>

<!-- <Part 1> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="1" title="Existing protection order"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

        <div style="margin-top: 0.1rem;"></div>
    
<!-- <1/2/3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">1.</b>
                    <check-box inline="inline" shift="0" shiftmark="0" boxMargin="0" checkbox="" style="display:inline; margin-left:0.5rem;" :check="true?'yes':''" text=""/>
                    <grey-box-form marginTop="-22px" style="text-indent:0px;display:inline-block;" textwidth="8rem" beforetext="There is a <b>protection order made on</b>" hint="(dd/mmm/yyyy)" hintindent="2rem" :text="aboutOrder.dateOfPO | beautify-date"/>
                        that I am <br/><div style="padding-left: 50px;">applying to change <b>(see attached copy of order)</b></div>
                </div>
                <div>
                    <b style="padding-right:3px">2.</b> <b>I am</b> the<br/>
                    <div style="padding-left: 15px;"><i>Select all options that apply</i></div>                
                    <check-box shift="38" shiftmark="0" margin-left="50px" :check="aboutOrder.kindOfParty.includes('protectedParty')?'yes':''" text="Protected party"/>
                    <check-box shift="38" shiftmark="0" margin-left="50px" :check="aboutOrder.kindOfParty.includes('parentGuardian')?'yes':''" text="Parent or guardian of a protected party"/>
                    <check-box shift="38" shiftmark="0" margin-left="50px" :check="aboutOrder.kindOfParty.includes('restrainedParty')?'yes':''" text="Person who the protection order is against"/>
                </div>
                <div>
                    <b style="padding-right:3px">3.</b> <i>Select only one of the options below and complete the requested information</i>
                    <check-box shift="38" shiftmark="0" margin-left="50px" :check="aboutOrder.inCourtForPO == 'y' ?'yes':''" text="I was <b>in court</b> when the protection order was made"/>
                    <check-box shift="38" shiftmark="0" margin-left="50px" :check="aboutOrder.inCourtForPO == 'n' ?'yes':''" text="I was <b>not in court</b> when the protection order was made because:"/>                
                    <div style="margin-left:1rem;">
                        <i>Explain why you were not in court when the protection order was made</i>
                    </div>
                    <div class="answerbox" style="margin-left: 16px; width: 96%; background-color: #dedede;"> {{aboutOrder.whyNotInCourt ? aboutOrder.whyNotInCourt : '&nbsp;'}}</div>
                </div>
            </div>
            <div style="width: 20%;margin-top:-30px;">
                <NoteBox>
                    <b-icon-paperclip />
                    <br />
                    <p>
                        You must attach a copy of the existing protection order to this application for filing.
                    </p>
                </NoteBox>
            </div>
        </div>  

        <div style="margin-top:1rem;"></div>

<!-- <Part 2> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="2" title="About the protection order"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <4> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">4.</b>
                    <div style="text-indent: 2px; display:inline-block;">I am applying for the existing protection order to be <b>changed as follows</b>:</div>
                    <div class="answerbox" style="margin-left: 16px; width: 96%; background-color: #dedede;"> {{aboutOrder.whatChangesNeeded ? aboutOrder.whatChangesNeeded : '&nbsp;'}}</div>
                </div>
            </div>
            <div style="width: 20%;margin-top:-20px;">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <br />
                    <p>
                        The court can shorten or extend the expiration date of a protection order or change any term in it.
                    </p>
                </NoteBox>
            </div>
        </div>  

<!-- <Part 3> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <FormPart :part="3" title="The facts"></FormPart>
            </div>
            <div style="width: 20%;margin-top:30px;">
            </div>
        </div>  

<!-- <5> -->
        <div style="display: flex; flex-direction: row;">
            <div style="width: 80%; padding-right: 4px;">
                <div>
                    <b style="padding-right:3px">5.</b>
                    The <b>facts</b> on which this application is based <b>are as follows</b>:
                    <i style="display:block; margin:0.25rem 0 0 1rem;">Explain why the order needs to be changed and the facts you want the court to consider</i>
                    <div class="answerbox" style="margin-left: 16px; width: 96%; background-color: #dedede;"> {{aboutOrder.whyChangesNeeded ? aboutOrder.whyChangesNeeded : '&nbsp;'}}</div>
                </div>
            </div>
            <div style="width: 20%;margin-top:-20px;">
            </div>
        </div>  

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import GreyBoxForm  from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import FormHeader from '@/components/utils/PopulateForms/components/FormHeader.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import { schedule2AboutOrderInfoType } from '@/types/Application/ProtectionOrder/PDF';

@Component({
    components:{
        UnderlineForm,
        GreyBoxForm,
        CheckBox,
        FormHeader,
        FormPart,
        NoteBox
    }
})
export default class Schedule2 extends Vue {

    @Prop({required:true})
    result!: any;

    aboutOrder = {} as schedule2AboutOrderInfoType;

    dataReady = false;

    mounted(){
        this.dataReady = false;
        this.getAboutOrder();
        this.dataReady = true;
    }
    
    public getAboutOrder(){  

        this.aboutOrder = {dateOfPO:'', inCourtForPO:'', whyNotInCourt:'', kindOfParty:[], whatChangesNeeded:'', whyChangesNeeded:''};
        
        if(this.result?.aboutSurvey){
            const about = this.result.aboutSurvey;
            this.aboutOrder.dateOfPO =  about.dateOfPO;
            this.aboutOrder.inCourtForPO = about.inCourtForPO;
            this.aboutOrder.whyNotInCourt = about.inCourtForPO == 'n'? about.whyNotInCourt:'';
            this.aboutOrder.kindOfParty = about.kindofPartyIbPO? about.kindofPartyIbPO:[];
            this.aboutOrder.whatChangesNeeded = about.whatChangesNeeded;
            this.aboutOrder.whyChangesNeeded = about.whyChangesNeeded;
        }       
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 