<template>
    <div v-if="dataReady">  
        
<!-- <Page 8> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 7 – REPLY TO AN APPLICATION ABOUT APPOINTING A GUARDIAN OF A CHILD OR CHILDREN</b></div>
            <div style="text-align:center;"><b>This is Schedule 7 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to be
                    appointed as a guardian of a child or children. The order they applied for about guardianship of a child can be
                    found in Schedule 7 of their Application About a Family Law Matter.                    
                </i>
            </div>

<!-- <1> -->
            <section class="resetquestion">
                <div style="display:inline; margin:0 0 3rem 0.35rem;">
                    I do not believe it is in the best interests of the child(ren) for the other party to become a guardian of the
                    child(ren) because:
                </div> 
                <i>Select all options that apply and explain why</i>
                <check-box 
                    style="margin-left: 1rem;" 
                    :check="guardInfo.opNotGuardian?'yes':''" 
                    text="the other party is not able to be a guardian because:"/>
                <div v-if="guardInfo.opNotGuardian && guardInfo.opNotGuardianDesc" 
                    class="answerbox">{{guardInfo.opNotGuardianDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <check-box 
                    style="margin-left: 1rem;" 
                    :check="guardInfo.opNotSuitable?'yes':''" 
                    text="the other party is not suitable to be a guardian because:"/>
                <div v-if="guardInfo.opNotSuitable && guardInfo.opNotSuitableDesc" 
                    class="answerbox">{{guardInfo.opNotSuitableDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>

                <check-box  
                    style="margin-left: 1rem;"
                    :check="guardInfo.other?'yes':''" 
                    text="other reason(s) <i>(specify)</i>:"/>
                <div v-if="guardInfo.other && guardInfo.otherDesc" 
                    class="answerbox">{{guardInfo.otherDesc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
                
            </section> 
        </div> 

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";

import { schedule7DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule7 extends Vue {

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

    public extractInfo(){
        if (this.selectedSchedules?.includes('schedule7') || this.selectedSchedules?.includes('schedule8')){
            this.guardInfo = this.getGuardianshipOfChildInfo(this.selectedSchedules.includes('schedule7'), this.selectedSchedules.includes('schedule8'));
        }        
    }

    public getGuardianshipOfChildInfo(guardian:boolean, cancel: boolean){
        let guardianshipInfo = {} as schedule7DataInfoType;

        guardianshipInfo = {
            opNotGuardian: false,
            opNotGuardianDesc: '',
            opNotSuitable: false,
            opNotSuitableDesc: '',
            other: false,
            otherDesc: ''
        }
        
        return guardianshipInfo;
    }  

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 

