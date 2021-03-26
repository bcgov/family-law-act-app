<template>
<div>
    <b-button @click="onPrint()"> Save </b-button>
    <b-card id="print" style="border:1px solid; border-radius:5px;padding:2rem" bg-variant="white" class="mt-4 mb-3">

        <div style="text-align:center;">
            <div style="margin:5rem 0 0 -1.3rem;font-weight: 300;font-size:20px;">FORM P1 (RULE 25-2 (3) )</div>
            <div style="margin:1rem 0 0 -1.3rem;font-weight: 600;font-size:24px;"><i>IN THE SUPREME COURT OF BRITISH COLUMBIA</i></div>                    
            <div style="margin:1rem 0 5rem -1.3rem;font-weight: 600;font-size:26px;">NOTICE OF PROPOSED APPLICATION IN RELATION TO ESTATE</div>            
        </div>

        <div style="margin:0 0 1rem 0rem;font-weight: 600;font-size:18px;"> TAKE NOTICE THAT:</div>
        
        <underline-form textwidth="41rem" beforetext="The applicant(s)" hint="Full Name of Applicant(s)" text="first last"/>
        <div style="display:inline-block; text-indent: 5px;"> propose(s) to apply, in the</div>
        <underline-form class="mt-3" textwidth="20rem" beforetext="" hint="Court Location" text="Victoria court of appeal"/>
        <underline-form style="text-indent: 5px;" class="mt-3" textwidth="32rem" beforetext="court registry, for" hint="Application Type" text="Victoria court of appeal"/>
        <underline-form style="text-indent: 5px;" class="mt-3" textwidth="26rem" beforetext="in relation to the estate of the deceased described below who died on" hint="Deceased’s Date of Death (dd mmm yyyy)" text="20 Apr 2020"/>
          
        <div style="margin:2rem 0 1rem 0rem;"> Full legal name of deceased:</div>
        <underline-form class="mt-0" textwidth="20rem" beforetext="" hint="First" :text="deceased.first"/>
        <underline-form class="mt-0" textwidth="20rem" beforetext="" hint="Middle" :text="deceased.middle"/>
        <underline-form class="mt-0" textwidth="20rem" beforetext="" hint="Last" :text="deceased.last"/>

        <div style="margin:2rem 0 1rem 0rem;"> Last residential address of the deceased:</div>
        <underline-form class="mt-0" textwidth="61rem" beforetext="" hint="Street Number or Post Office Box, City/Town, Province, Country and Postal Code" :text="deceased.address"/>
        
        <div class="mt-5"><i>[Check whichever one of the immediately following 2 boxes is correct and provide any required information.]</i></div>

        <div class="mt-2">              
            <check-box style="display:inline-block;" :check="check2" text=""/> 
            <underline-form style="text-indent: 15px;" class="mt-0" textwidth="20rem" beforetext="This application relates to the will of the deceased dated" hint="Will Date (dd mmm yyyy)" text="20 Apr 2010"/>
            <div style="display:inline-block; text-indent: 5px;"> , a copy of which will</div>
            <div style="text-indent: 30px;"> is provided with this notice.</div>
        </div>

        <div class="mt-3">
            <check-box style="display:inline-block;" :check="check2" text="This application does not relate to a will."/>              
        </div>

        <div class="new-page"> </div>

        <div style="margin:4rem 0 1rem 0rem;font-weight: 600;font-size:18px;">AND TAKE NOTICE THAT:</div>
        
        <ol class="resetcounter" >
            <li class="bracketnumber">
                Before obtaining the foregoing grant or resealing, the applicant may be granted an authorization to obtain
                estate information or an authorization to obtain resealing information, as the case may be, in relation to that
                grant or resealing for the purposes of obtaining financial information in relation to the grant or resealing.
            </li>
            <li class="bracketnumber">
                You have a right to oppose, by filing a notice of dispute in accordance with Rule 25-10 (1),
                <ol style="text-indent:2px; list-style-type:lower-alpha">
                    <li>if the intended application is for an estate grant, the granting of either or both of an authorization to obtain estate information and the estate grant, or</li>
                    <li>if the intended application is for a resealing, the granting of either or both of an authorization to obtain resealing information and the resealing.</li>
                </ol>
            </li>
            <li class="bracketnumber">
                You may or may not be entitled to claim against the estate for relief, including a claim under
                <ol style="text-indent:2px; list-style-type:lower-alpha">
                    <li>the Family Law Act, or</li>
                    <li>Division 6 of Part 4 of the Wills, Estates and Succession Act.</li>
                </ol>
            </li>
            <li class="bracketnumber">
                If you choose to take a step referred to in paragraph (2) or (3), you must do so within the time limited by any relevant rule of court or other enactment.
            </li>
            <li class="bracketnumber">
                You may consult with your own lawyer concerning your interest in, or rights against, the estate.
            </li>
            <li class="bracketnumber">
                After the applicant has filed a submission for estate grant or submission for resealing, you may
                apply for an order requiring the applicant to provide security unless the applicant is the Public Guardian and
                Trustee. Filing a notice of dispute will prevent a grant from being issued before you are able to apply for the
                order requiring security.
            </li>
            <li class="bracketnumber">
                An authorization to obtain estate information, an authorization to obtain resealing information or a grant may
                issue to the applicant, or a foreign grant may be resealed, on any date that is at least 21 days after the date
                on which this notice is delivered to you or on any earlier date ordered by the court.
            </li>
            <li class="bracketnumber">
                If an authorization to obtain estate information issues to the applicant, the applicant may apply for a grant
                without further notice. If an authorization to obtain resealing information issues to the
                applicant, the applicant may apply for the resealing of the foreign grant without further notice to you.
            </li>
            <li class="bracketnumber">
                If a grant issues to the applicant, the applicant must provide, if there is a will, to the beneficiaries or, if there
                is no will, to intestate successors of the deceased an accounting as to how the estate was administered and
                how the estate assets were distributed, and if a foreign grant is resealed as a result of the application,
                the intended applicant must provide, if there is a will, to the beneficiaries or, if there is no will, to intestate
                successors of the deceased, an accounting as to how the estate comprising the assets to which the
                resealed grant applies was administered and how those assets were distributed.
            </li>
        </ol>
        
        <div style="margin:2rem 0 0rem 0rem;font-weight: 600;font-size:18px;">INFORMATION ABOUT EACH APPLICANT</div>
      
        <div v-for="(name,i) in applicantList" :key="i">
            <underline-form class="mt-5" textwidth="19rem" beforetext="Name:" hint="First" :text="name.first"/>
            <underline-form class="mt-0" textwidth="19rem" beforetext="" hint="Middle" :text="name.middle"/>
            <underline-form class="mt-0" textwidth="19rem" beforetext="" hint="Last" :text="name.last"/>
            
            <underline-form class="my-3" textwidth="53rem" beforetext="Mailing address:" hint="Street Number or Post Office Box, City/Town, Province, Country and Postal Code" :text="name.address"/>
            
            <check-box :check="name.notIndividual" text="This applicant is not an individual"/>
            <check-box :check="name.individual" text="This applicant is an individual and ordinarily lives"/>
            
            <check-box shift="25" shiftmark="0" :check="name.sameMail" text="at the mailing address noted above"/>
            <check-box style="display:inline-block;" shift="25" shiftmark="0" :check="name.differentMail" text=""/>
            <underline-form style="text-indent: 26px;" class="mt-0" textwidth="30rem" beforetext="in the following city and country:" hint="City and Country" :text="name.differentAddress"/>
            <div v-if="i<1" class="new-page"> </div>
        </div>

        <div style="margin:2rem 0 0rem 0rem;font-weight: 600;font-size:18px;">ADDRESS FOR SERVICE OF APPLICANT(S)</div>
        <underline-form class="mt-4" textwidth="47rem" beforetext="Street address for service" hint="Street Number, City/Town, Province, Country and Postal Code" :text="serviceContact.address"/>
        <underline-form class="mt-3" textwidth="44.5rem" beforetext="Fax number for service (if any)" hint="Fax Number (+1 AreaCode XXX-XXXX )" :text="serviceContact.fax"/>
        <underline-form class="mt-3" textwidth="43rem" beforetext="E-mail address for service (if any)" hint="E-mail" :text="serviceContact.email"/>
        <underline-form class="mt-3 mb-5" textwidth="50.5rem" beforetext="Telephone number" hint="Phone Number (+1 AreaCode XXX-XXXX )" :text="serviceContact.phone"/>

        <div class="mt-5 row" v-for="(name,i) in applicantList" :key="i">
            <div class="col-4">                
                <underline-form textwidth="16rem" beforetext="Date" hint="Date (dd mmm yyyy)" text="20 Apr 2020"/>
            </div>
            <div class="col-8">
                <underline-form textwidth="39rem" beforetext="" hint="" text=""/>
                <div style="display:inline-block;text-indent:10px;">Signature of</div>
                <check-box style="display:inline-block;" shift="10" :check="name.lawyer?'':'yes'" text=""/> 
                <underline-form  style="display:inline-block;margin-left:2.5rem;" textwidth="20rem" beforetext="applicant" hint="full name" :text="name.lawyer? '':name.first +' '+ name.middle+' '+name.last"/>
                <div>
                    <check-box style="display:inline-block;" shift="118" :check="name.lawyer?'yes':''" text=""/> 
                    <underline-form  style="display:inline-block;margin-left:9rem;" textwidth="20rem" beforetext="lawyer for applicant" hint="lawyer's full name" :text="name.lawyer"/>
                </div>
            </div>
        </div>

<!--         
        <section>
            I believe the other party owns a weapon that is not a gun or explosive
            <div style="display:inline-block; text-indent: 3px;">              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;         
                    font-size: 1.0em;">
                    <div style="transform:translate(-3px,-6px);" v-html="check"/>
                </span>      
                <span class="ml-4 mr-2">Yes</span>
            </div>
            <div style="display:inline-block; text-indent: 3px;">              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;         
                    font-size: 1.0em;">
                    <div style="transform:translate(-3px,-6px);" v-html="check2"/>
                </span>      
                <span class="ml-4 mr-2">No</span>
            </div>
        </section>

        <section>
            The person I want protection from, or who had made an application for protection from me, is the other party. An application is usually made with notice to the other party. To give notice, they must be served with the application and supporting documents before the date set for the court appearance. An Application About a Protection Order can also be made without notice to the other party.     
    
        <div style="text-indent:0px;">
            <div style="font-style:italic">
            Select only one of the options below:
            </div>        
            <div>              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;         
                    font-size: 1.0em;">
                    <div style="transform:translate(0px,-6px);" v-html="check"/>
                </span>      
                <span class="ml-4">I am applying with notice to the other party1.</span>
            </div>
            <div>              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;           
                    font-size: 1.0em;">
                    <div style="transform:translate(0px,-6px);" v-html="check2"/>
                </span>      
                <span class="ml-4">I am applying with notice to the other party897569.</span>
            </div> 
            <div>              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;           
                    font-size: 1.0em;">
                    <div style="transform:translate(0px,-6px);" v-html="check2"/>
                </span>      
                <span class="ml-4">I am applying with notice to the other party897569.</span>
            </div>
            <div>              
                <span style="position: absolute;
                    border: 2px solid #000!important;
                    width: 1em; transform:translate(0px,4px);           
                    height: 1em;           
                    font-size: 1.0em;">
                    <div style="transform:translate(0px,-6px);" v-html="check2"/>
                </span>      
                <span style="display:inline-block">
                    <div style="display:inline-block; margin:0 0.5rem 0 1.5rem;"> Other (<i>specify</i>) </div>
                    <div style="display:inline-block">
                        <div style="position: absolute; margin-top:-22px; font-size: 16px;">First Middle Last</div> 
                        <div :style="{borderBottom: '0.7px solid #000', minWidth: '15rem'}"></div>            
                        <div style="position: absolute; margin-top:-1px; font-size: 9px;">full name of party</div>
                    </div>
                </span>
            </div>
        </div>

        <div style="margin-top:2rem;">
            <b-table :fields="[{key:'key',thClass:'border-dark', tdClass:'border-dark'},{key:'label',thClass:'border-dark', tdClass:'border-dark'},{key:'DOB',thClass:'border-dark', tdClass:'border-dark'}]" :items="[{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020},{key:'h','label':3,'DOB':2020}]"  small>
            </b-table>
        </div>
    </section>

    <section>
        Complete only if applicable. You may leave this section blank.abcdefghigh
    </section>
    

    <section>
        Complete only if applicable. You may leave this section blank.
    </section> -->

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

    applicantList = [
       {first:"his", middle:"first",last:"son", address:"0-123 st, Victoria, BC, Canada V0i 8i8", notIndividual:"", individual:"yes", sameMail:"", differentMail:"yes", differentAddress:"New York, USA" },
    //    {first:"his", middle:"first",last:"daughter", address:"0-123 st, Victoria, BC, Canada V0i 8i8", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"" },
    //    {first:"his", middle:"second",last:"son", address:"0000 st, Vancouver, BC, Canada V0v 0v0", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"", lawyer:"his good lawyer" },
    //    {first:"his", middle:"second",last:"daughter", address:"0000 st, Vancouver, BC, Canada V0v 0v0", notIndividual:"", individual:"yes", sameMail:"yes", differentMail:"", differentAddress:"" } 
    ]
    deceased={first:"Rest", middle:"In",last:"Peace", address:"0-123 st, Victoria, BC, Canada V0i 8i8"}
    serviceContact={address:"0-123 st, Victoria, BC, Canada V0i 8i8", phone:"+1 123 456 7890", fax:"+1 123 456 7890", email:"ABC@yahoo.ca"}

    mounted(){

    }

    public onPrint() {

        console.log("print") 
        const el= document.getElementById("print");

        console.log(el)
        const applicationId = this.$store.state.Application.id;

        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order'

        const body = [`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <link rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" >
                        <meta charset="UTF-8">
                        <title>Application About a Protection Order</title>`+
                        `<style>`+
                            `@page {
                                size: 12.5in 16.17in;
                                margin: .7in 0.7in 0.9in 0.7in;
                                @bottom-left {
                                    content:`+ `"SCCRPF  02/2021 \a         Form P1";`+
                                    `white-space: pre;
                                    font-size: 6pt;
                                }
                                @bottom-right {
                                    content:"page " counter(page);
                                    font-size: 8pt;
                                }
                            }`+
                            `@media print{
                                .new-page{
                                    page-break-before: always;
                                    position: relative; top: 8em;
                                }
                            }`+
                            `td.border-dark {border: 1px solid black;}`+
                            `th.border-dark {border: 1px solid black;}`+
                            `section{ counter-increment: question-counter; text-indent: -20px; text-align: justify; text-justify: inter-word; margin: 1.0rem 0.5rem 0.5rem 0rem;}`+ 
                            `section:before {font-weight: bolder; content:counter(question-counter) ".";}`+
                            `section.resetquestion{counter-reset: question-counter;}`+
                            `ol.resetcounter{list-style: none;counter-reset: bracket-counter;}`+
                            `ol li.bracketnumber{text-indent: -35px;text-align: justify;text-justify: inter-word;margin:1rem 0;counter-increment: bracket-counter;}`+
                            `ol li.bracketnumber:before {content:"(" counter(bracket-counter) ") ";font-weight: bold;}`+
                        `</style>
                        </head>
                        <body>`+el.innerHTML+
                        `</body>\n</html>`]
                        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  
        console.log(body)
        this.$http.post(url,body, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "fpo.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            
        },err => {
            console.error(err);
        
        });
    }

 
    public getRepGrantResultData() {  
        
        let result = this.$store.state.Application.steps[0].result; 
        for(let i=1;i<9; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                //console.log(stepResults[stepResult])
                //console.log(stepResults[stepResult].data)
                result[stepResult]=stepResults[stepResult].data; 
            }
        }
        const protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
        Object.assign(result, result, protectedPartyName);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        console.log(result)
        return result;
    }

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

    .new-page{
        counter-increment: page;
        margin: 1rem -3.1rem;
        border-top: 3px dashed rgb(14, 13, 13)!important;
        border-bottom: 3px dashed rgb(15, 15, 15)!important;
        width: 1100px;
    }
    .new-page:before{        
        content:"-------------------------------------------------------------------------------------------------- Next Page --------------------------------------------------------------------------------------------------";
    }
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

</style>
