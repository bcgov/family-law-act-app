<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 10" scheduleTitle="Property division in respect of a companion anima" scheduleDescription="No existing final order or written agreement"></ScheduleHeader>
                    <div style="margin-bottom: 1rem;"></div>
                    <NoteBox>
                        <p>
                            Complete this schedule only if you need a court order about property division in respect of a companion animal and you do not have an existing final court order or written agreement about property division in respect of the companion animal.
                        </p>
                    </NoteBox>
                    </div>    
                </div>

           
                <div style="margin-top:1rem;"></div>
<!-- <1> -->
    <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
        <div style="flex: 1">
            <FormPart :part="1" title="Order about property division in respect of a companion animal"></FormPart>
           
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">
                    I am applying for a <b>property division order for sole ownership and 
                    possession of the companion animal(s)</b> as follows:<br>
                </div>
             
                <b-table
                    :items="compInfo.compAnimalInfo"
                    :fields="compAnimalFields"
                    class="mt-2"
                    small
                    bordered>                    
                        <template v-slot:cell()="data">
                            <div style="font-size:11pt;color:#000">{{data.value}}</div>                                           
                        </template>
                        <template v-slot:head(animalOwnership)>
                            To [party] <i style="font-size:6pt; font-weight:normal;">Select only one option for each animal</i>                            
                        </template>
                        <template v-slot:cell(animalOwnership)="data">      
                            <check-box checkbox="" inline="block" boxMargin="0" shift="5" shiftmark="0" style="display:block;margin-left:0rem;" :check="data.value == 'Myself'?'yes':''" text="Myself"/>
                            <check-box checkbox="" inline="block" boxMargin="0" shift="5" shiftmark="0" style="display:block;margin-left:0rem;" :check="data.value != 'Myself'?'yes':''" text="Other party"/>
                        </template>
                </b-table>
            </section>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Under section 97 of the Family Law Act, the court may only make an order for ownership and possession of a companion animal by one spouse.
                    </p>
                </NoteBox>
            </div>      
        </div>
        </div>
          

            
                
<!-- <2> -->
 
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
            <div style="flex: 1">
                <FormPart :part="2" title="The facts"></FormPart>
               
                
                <section>
                    The <b>facts</b> on which this application is based are as follows:                    
                    <div style="font-style: italic;margin-left:1rem;">
                        Provide the facts you want the court to consider and why the court should make the order you are applying for. 
                    </div>
                   
                    <div> 
                        <GreyBoxForm  v-if="compInfo.compAnimalFacts"  style="margin-top:10px; text-indent:0rem"
                        textwidth="35rem" :text="compInfo.compAnimalFacts">
                    </GreyBoxForm>
                    <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>
                    </div>
                </section>
            </div>
            <div style="width: 20%;">
                <div style="padding-top:30px">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            In determining whether to make an order respecting a companion animal, the court must consider the following factors set out in section 97 (4.1) of the Family Law Act:
                            
                        </p>
                        <div >
                            <ul>
                                <li>the circumstances in whichthe companion animal wasacquired</li>
                                <li>the extent to which eachspouse cared for thecompanion animal</li>
                                <li>any history of familyviolence</li>
                                <li>the risk of family violence</li>
                                <li>a spouse’s cruelty, or threatof cruelty, toward an animal</li>
                                <li>the relationship that a childhas with the companion animal</li>
                                <li>the willingness and ability ofeach spouse to care for thebasic needs of thecompanion animal</li>
                                <li>any other circumstances thecourt considers relevant</li>
                            </ul>
                        </div>
                        
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
import { schedule11DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
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
export default class Schedule11 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;   
    compInfo = {} as schedule11DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }
    
    compAnimalFields = [
        {key:"animalName",      label:"Name of companion animal",       tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"},
        {key:"animalType",      label:"Type of animal",                 tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:30%;"},
        {key:"animalOwnership", label:"",                               tdClass:"border-dark text-center align-middle", thClass:"border-dark text-center align-middle", thStyle:"font-size:8pt; width:35%;"}
    ]   

    public extractInfo(){
        this.compInfo = this.getCompanionAnimalInfo();
    }

    public getCompanionAnimalInfo(){
       
        let newCompInfo = {} as schedule11DataInfoType;

        newCompInfo = {
            compAnimalInfo: [],
            compAnimalFacts: ''
        }

        if (this.result.propertyDivisionCompanionAnimalSurvey){
            newCompInfo.compAnimalInfo = this.result.propertyDivisionCompanionAnimalSurvey;
        }

        if (this.result.companionAnimalFactsSurvey?.animalFacts){
            newCompInfo.compAnimalFacts = this.result.companionAnimalFactsSurvey?.animalFacts;
        }       

        return newCompInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>