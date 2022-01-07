<template>
    <div v-if="dataReady">

<!-- <Page 5> --> 
<!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="text-align:center;"><b>SCHEDULE 4 – ACCESS TO INFORMATION SECTION 242</b></div>
            <div style="text-align:center;"><b>This is Schedule 4 to the Application for Case Management Order Without Notice or Attendance</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>This schedule must be completed only if you are applying for access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act.</i>
            </div>

<!-- <1> -->
            <section class="resetquestion"> 
                <div style="display:inline; margin-left:0.15rem">
                    The details of the order I am applying for are as follows:
                </div>
                    
                <div style="text-indent:0; margin-left:0rem">
                    <i>
                        Tell the court the specifics of the order you are applying for                        
                    </i>
                </div>
                
                <div v-if="accessInfo.orderDetail" 
                class="answerbox">{{accessInfo.orderDetail}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
                            
            </section>

<!-- <2> -->
            <section> 
                <div style="display:inline; margin-left:0.15rem">
                    The facts on which this application is based are as follows:
                </div>
                    
                <div style="text-indent:0; margin-left:0rem">
                    <i>
                        Provide the facts you want the court to consider
                    </i>
                </div>
                
                <div v-if="accessInfo.applicationFacts" 
                class="answerbox">{{accessInfo.applicationFacts}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
                            
            </section>
      
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule4DataInfoType } from '@/types/Application/CaseManagement/PDF';

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
    accessInfo = {} as schedule4DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){         
        this.accessInfo = this.getAccessToInformation();
    }

    public getAccessToInformation(){
        let accessToInformation = {} as schedule4DataInfoType;
              
        if(this.result?.requiringAccessToInformationSurvey){
            const chgSurvey = this.result.requiringAccessToInformationSurvey;
            accessToInformation.officerSearch = chgSurvey.officerSearch
            accessToInformation.orderDetail = chgSurvey.officerSearch == 'y'? chgSurvey.orderDetail : ''
            accessToInformation.applicationFacts = chgSurvey.officerSearch == 'y'? chgSurvey.applicationFacts : ''
        }
    

        return accessToInformation;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>