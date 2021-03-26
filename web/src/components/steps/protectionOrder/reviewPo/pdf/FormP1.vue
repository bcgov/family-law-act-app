<template>
<div>    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>



    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import UnderlineForm from "./components/UnderlineForm.vue"
import CheckBox from "./components/CheckBox.vue"
import moment from 'moment';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class FormP1 extends Vue {    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    check = ""//"&#10003"
    check2= "&#10003"

    applicantList = []
    deceased={fullName:"Rest In Peace", first:"Rest", middle:"In",last:"Peace", address:"0-123 st, Victoria, BC, Canada V0i 8i8"}
    serviceContact={address:"0-123 st, Victoria, BC, Canada V0i 8i8", phone:"+1 123 456 7890", fax:"+1 123 456 7890", email:"ABC@yahoo.ca"}
    
    mounted(){
        //this.getRepGrantResultData()
        this.changeApplicantList()
    }
    multipleApplicant=false
    public changeApplicantList(){
        this.applicantList=[]
        if(this.multipleApplicant){
            this.applicantList.push(
                {fullName:"Its first Son",first:"Its", middle:"first",last:"Son", address:"Victoria, BC, Canada", notIndividual:"", individual:"yes", sameMail:"", differentMail:"yes", differentAddress:"New York, USA", occupation:"worker", city:"Victoria", state:"BC", country:"Canada", section130:"(b)" },
                {fullName:"Its first Daughter",first:"Its", middle:"first",last:"Daughter", address:"Victoria, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", occupation:"work", city:"Seattle", state:"WA", country:"USA", section130:"(a)"  },
                {fullName:"Its second Son",first:"Its", middle:"second",last:"Son", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", lawyer:"Its good lawyer", occupation:"working" , city:"Seattle", state:"WA", country:"USA", section130:"(c)" },
                {fullName:"Its second Daughter",first:"Its", middle:"second",last:"Daughter", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", occupation:"worker" , city:"Vancouver", state:"BC", country:"Canada", section130:"(d)" }, 
                {fullName:"Its third Son",first:"Its", middle:"third",last:"Son", address:"Victoria, BC, Canada", notIndividual:"", individual:"yes", sameMail:"", differentMail:"yes", differentAddress:"New York, USA", occupation:"work", city:"Seattle", state:"WA", country:"USA" , section130:"(d)" },
                {fullName:"Its third Daughter",first:"Its", middle:"third",last:"Daughter", address:"Victoria, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", occupation:"worker", city:"Victoria", state:"BC", country:"Canada", section130:"(e)"  },
                {fullName:"Its fourth Son",first:"Its", middle:"fourth",last:"Son", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", lawyer:"Its good lawyer", occupation:"work" , city:"Victoria", state:"BC", country:"Canada", section130:"(f)" },
                {fullName:"Its fourth Daughter",first:"Its", middle:"fourth",last:"Daughter", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", occupation:"working", city:"Seattle", state:"WA", country:"USA" , section130:"(f)" }, 
                {fullName:"Its fifth Son",first:"Its", middle:"fifth",last:"Son", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"", differentMail:"yes", differentAddress:"New York, USA", occupation:"worker", city:"Seattle", state:"WA", country:"USA" , section130:"(f)" },
                {fullName:"Its fifth Daughter",first:"Its", middle:"fifth",last:"Daughter", address:"Vancouver, BC, Canada", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", occupation:"work", city:"Victoria", state:"BC", country:"Canada", section130:"(a)"  },
            )
        }else{
            this.applicantList.push(
                {fullName:"Its first Son",first:"Its", middle:"first",last:"Son", address:"Victoria, BC, Canada", notIndividual:"", individual:"yes", sameMail:"", differentMail:"yes", differentAddress:"New York, USA", occupation:"work", city:"Victoria", state:"BC", country:"Canada", section130:"(a)"    },
            )
        }
    }

    public getSignatureMargin(){

        let margin = Number(10/this.applicantList.length);
        if(margin<1.0) margin = 1;
        return margin+'rem'
    }

    public getAllApplicants(len: number){
        let result="";
        for(const name of this.applicantList)
            result += name.fullName+', ';
        result = result.slice(0,-2);
        if(result.length>len)
            result = result.slice(0,len) +"..."
        return result
    }

    // public onPrint() {
        
    //     const el= document.getElementById("print");
    //     console.log(el)
    //     const applicationId = this.$store.state.Application.id;
    //     const bottomLeftText = `"Generated by “Apply to Represent Someone Who Died” on `+moment().format("MMMM D, YYYY")+`.";`;
    //     const bottomRightText = `"P5"`
    //     const url = '/survey-print/'+applicationId+'/?name=representation-grant'
    //     const body = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );
    //     const options = {
    //         responseType: "blob",
    //         headers: {
    //         "Content-Type": "application/json",
    //         }
    //     }  
    //     console.log(body)
    //     this.$http.post(url,body, options)
    //     .then(res => {
    //         const blob = res.data;
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         document.body.appendChild(link);
    //         link.download = "FormP5.pdf";
    //         link.click();
    //         setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
    //     },err => {
    //         console.error(err);
        
    //     });
    // }

 
    // public getRepGrantResultData() {  
        
    //     let result = this.$store.state.Application.steps[0].result; 
    //     for(let i=1;i<9; i++){
    //         const stepResults = this.$store.state.Application.steps[i].result
    //         for(const stepResult in stepResults){
    //             //console.log(stepResults[stepResult])
    //             //console.log(stepResults[stepResult].data)
    //             result[stepResult]=stepResults[stepResult].data; 
    //         }
    //     }
    //     const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
    //     Object.assign(result, result, protectedPartyName);
        
    //     const applicationLocation = this.$store.state.Application.applicationLocation;
    //     const userLocation = this.$store.state.Common.userLocation;
    //     //console.log(applicationLocation)
    //     //console.log(userLocation)
    //     if(applicationLocation)
    //         Object.assign(result, result,{applicationLocation: applicationLocation}); 
    //     else
    //         Object.assign(result, result,{applicationLocation: userLocation});
    //     console.log(result)
    //     return result;
    // }

}
</script>
<style scoped>

    .table >>> th.border-dark{border:1px solid #000;}
    .table >>> td.border-dark{border:1px solid #000;}

    section{counter-increment: question-counter;float:left; text-indent: -20px;text-align: justify;text-justify: inter-word;margin: 1.0rem 0.5rem 0.5rem 0rem;}
 
    section:before {
        font-weight: bolder;        
        content:counter(question-counter) ".";
    }

    dsection:after{
        float:none;white-space: pre;
    }
    
    section.resetquestion{counter-reset: question-counter;}

    
    ol.resetcounter{
        list-style: none;
        counter-reset: bracket-counter;
    }
    ol li.bracketnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: bracket-counter;
    }
    ol li.bracketnumber:before {
        content:"(" counter(bracket-counter) ") ";
        font-weight: bold;
    }

    ol.resetlist {
        list-style: none;
        counter-reset: list-counter;
    }
    ol li.listnumber{
        text-indent: -25px;
        text-align: justify; 
        text-justify: inter-word;
        margin:1rem 0;
        counter-increment: list-counter;
    }
    ol li.listnumber:before {
        content:counter(list-counter) ". ";
        font-weight: bold;
    } 

    .containe {
        padding: 0 !important; 
        margin-right: 0 !important;
        margin-left: 0 !important;
        width: 100% !important;
        max-width: 500px !important;
        min-width: 680px !important;        
        font-size: .65em !important;
        font-family: BCSans;
    }

    .container {
        padding: 40px !important; 
        margin-right: auto !important;
        margin-left: auto !important;
        width: 100% !important;
        max-width: 760px !important;
        min-width: 760px !important;   
        font-size: 10pt !important;
        font-family: BCSans;
        color: #313132 !important;
    }
        

    

</style>