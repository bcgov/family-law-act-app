<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>
                SCHEDULE 11 – PROPERTY DIVISION IN RESPECT OF A COMPANION ANIMAL – NEW
            </b></div>
            <div style="text-align:center;"><b>
                This is Schedule 11 to the Application About a Family Law Matter
            </b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    Complete this schedule only if you are or were a spouse of the other party 
                    and you are making an application for a new property division order about 
                    a companion animal.
                </i>
            </div>
            <div style="margin-top:1rem;"><b>About the order</b></div>
<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.25rem">
                    I am applying for a property division order for sole ownership and 
                    possession of the companion animal(s) as follows:<br>
                    <i>
                        Note: Under section 97 of the Family Law Act, the court may only make an order for 
                        ownership and possession of a companion animal <b>by one spouse.</b>
                    </i>
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

            <div class="print-block">
                
<!-- <2> -->
                <section>

                    The facts on which this application is based are as follows:

                    <i style="display:block; margin-left:0.85rem">
                        In determining whether to make an order respecting a companion animal, the court 
                        must consider the following factors set out in section 97 (4.1) of the Family Law Act:
                        <ul>
                            <li><span class="mx-3">the circumstances in which the companion animal was acquired</span></li>
                            <li><span class="mx-3">the extent to which each spouse cared for the companion animal</span></li>
                            <li><span class="mx-3">any history of family violence</span></li>
                            <li><span class="mx-3">the risk of family violence</span></li>
                            <li><span class="mx-3">a spouse’s cruelty, or threat of cruelty, toward an animal</span></li>
                            <li><span class="mx-3">the relationship that a child has with the companion animal</span></li>
                            <li><span class="mx-3">the willingness and ability of each spouse to care for the basic needs of the companion animal</span></li>
                            <li><span class="mx-3">any other circumstances the court considers relevant</span></li>
                        </ul>
                        Provide the facts you want the court to consider and why the court should make the order you are applying for. 
                    </i>
                    <div>
                        
                        <div v-if="compInfo.compAnimalFacts" 
                            class="answerbox">{{compInfo.compAnimalFacts}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule11DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
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