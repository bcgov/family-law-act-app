<template>
    <div v-if="dataReady">

<!-- <Page 7> --> 
<!-- <Header> -->
        <div>
             <div class="new-page" />
             <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 11" scheduleTitle="Existing written agreement"></ScheduleHeader>
                    <div style="margin-bottom: 1rem;"></div>
                    <NoteBox>
                        <p>
                            Complete this schedule only if you have an existing written agreement about the companion animal and you need a new court order made to set aside or replace the written agreement.
                        </p>
                    </NoteBox>
                    </div>    
                </div>
                <div style="margin-top:1rem;"></div>
<!-- <1> -->
    <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="flex: 1">
            <FormPart :part="1" title="Written agreement"></FormPart>
            <section class="resetquestion">
                <div style="display:block;">
                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                        style="text-indent: 5px;" :check="true?'yes':''" text="I have a written agreementabout property division in respect of a companion animal made on (date)" />
                        <GreyBoxForm style="margin-left:2rem; text-indent:0px;" textwidth="10rem" beforetext="" aftertext=" that I want to repeal or replace (see attached copy ofagreement)."  hint="(mmm/dd/yyyy)" hintindent="30px" :text="exCompInfo.agreementDate"/>
                </div>
               
               
            </section>
            <section>
                I believe the agreement about property division in respect of a companion animal should be set aside or replaced because:
                <div>
            <GreyBoxForm v-if="exCompInfo.reason" style="margin-top:10px; text-indent:0rem"
                textwidth="35rem" :text="exCompInfo.reason">
            </GreyBoxForm>
            <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>     
                </div>
                              
            </section>
            <div class="print-block">
                <section>
                        I am applying for the existing agreement to be:
                                       
                    
                    <div style="margin:0 0 2rem 1.5rem;">
                        <i>Select only one option</i>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exCompInfo.setAside?'yes':''" text="set aside" />
                        </div>
                        <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exCompInfo.replace?'yes':''" text="replaced with an order --> <i>Complete Part 4</i>" />
                        </div>
     
                    </div>
                </section>
            </div>
            </div>
            <div style="width: 20%;">
                <div style="padding-top:30px;">
                    <NoteBox>
                        <b-icon-paperclip />
                        <p>
                            You must attach a copy of the agreement to this application for filing.
                        </p>
                    </NoteBox>
                </div>  
                <div style="padding-top:30px; padding-bottom:30px">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            As set out in s. 93 of the Family Law Act, the court must set aside or replace with an order, all or part of an agreement about property division if the court is satisfied one or more specified circumstances existed when the parties entered into the agreement, or the agreement is significantly unfair.
                        </p>
                    </NoteBox>
                </div>    
            </div>
        </div>

        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="1" title="Orderabout property division in respect of a companion animal "></FormPart>
                <div style="margin-bottom: 1rem;"></div>
                    <NoteBox>
                        <p>
                            Complete this part only if you are asking to replace the existing agreement.
                        </p>
                    </NoteBox>
                    <div class="print-block">
                        <div>                         
                             <b>4.</b> I am applying for the agreement about a companion animal to be <b>replaced with an order</b> as follows: <br>
                             <i>List the details of the order you want the court to make</i>
                             <GreyBoxForm  v-if="exCompInfo.replace && exCompInfo.agreementReplacementDetails"  style="margin-top:10px; text-indent:0rem"
                             textwidth="35rem" :text="exCompInfo.agreementReplacementDetails">
                         </GreyBoxForm>
                         <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm> 
                           
                        </div> 
                    </div>
                </div>
                <div style="width: 20%;">
                    <div style="padding-top:30px;">
                        <NoteBox>
                            <b-icon-info-circle-fill />
                            <p>
                                Under section 97 of the Family Law Act, the court may only make an order for ownership and possession of a comp
                            </p>
                        </NoteBox>
                    </div> 
                </div>
            </div>

           


           

        </div>           

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule12DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
import { companionAnimalExistingAgreementDataInfoType } from '@/types/Application/FamilyLawMatter/CompanionAnimal';
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

export default class Schedule12 extends Vue {

    @Prop({required:true})
    result!: any; 
   
    dataReady = false;
    exCompInfo = {} as schedule12DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;        
    }    

    public extractInfo(){ 
        this.exCompInfo = this.getExCompanionAnimalInfo(); 
    }

    public getExCompanionAnimalInfo(){
       
        let exCompInfo = {} as schedule12DataInfoType;

        exCompInfo = {
            agreementDate: '',
            reason: '',
            replace: false,
            agreementReplacementDetails: '',
            setAside: false
        }

        if (this.result.companionAnimalExistingAgreementSurvey){
            const exCompData: companionAnimalExistingAgreementDataInfoType = this.result.companionAnimalExistingAgreementSurvey;
            
            exCompInfo.agreementDate = Vue.filter('beautify-date')(exCompData.agreementDate);
            exCompInfo.reason = exCompData.setAsideReason;
            exCompInfo.replace = exCompData.existingAgreementDecision == 'Replaced';
            exCompInfo.setAside = exCompData.existingAgreementDecision == 'SetAside';
            if (exCompInfo.replace){
                exCompInfo.agreementReplacementDetails = exCompData.agreementReplacement?exCompData.agreementReplacement:'';
            }
        }

       return exCompInfo;
   } 

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 