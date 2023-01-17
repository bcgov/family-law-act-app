<template>
    <div style="padding: 1.75rem; margin:-3rem; border: solid; font-size:10pt;"> 
               
        
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div style="font-size:1rem; font-weight:700; display: block; margin:0 auto 0 auto; text-align: center;text-decoration: underline;">
            PARENTING AFTER SEPARATION (PAS) PROGRAM
        </div>  

        <div style="margin-top: 1rem;">
            <p>
                The Parenting After Separation (PAS) program was designed for parents and other 
                family members (such as grandparents or guardians) who are dealing with separation 
                issues. Its purpose is to help people make informed choices about family separation 
                that take into account the best interests of children. 
            </p>
           
            <div style="margin:0;">
                The PAS program provides information on:
            </div>
            <ul>                    
                <li>the process of separation</li>
                <li>the impact of separation on children of various ages</li>
                <li>strategies to help families adjust to change</li>
                <li>how to speak to children about separation</li>
                <li>effective ways to communicate to reduce conflict</li>
                <li>how to keep children out of the middle of conflict</li>
                <li>options for resolving family disputes, including mediation, counselling and the court process</li>
                <li>general information about the child support guidelines</li>
                <li>resources in the community for parents and children</li>
            </ul>
            
        </div>

        <div>              
            
            <p style="font-weight: 700;">
                While the PAS program provides information, it does not offer legal advice.
            </p>
            <p>
                In 17 registries, the court rules require that you complete the PAS program before 
                you go to Provincial Court to obtain or change an order for child support, 
                guardianship, parenting arrangements or contact with a child.                
            </p>
            <p>
                <b>In-person PAS:</b> You may attend a three hour in-person PAS program in: <b>Abbotsford, Kelowna,
                Nanaimo, New Westminster, Port Coquitlam, Surrey, Vancouver (Robson Square),</b> or <b>Victoria</b>. <u>You
                must register in advance</u> for this free program. You cannot attend the same session as the other party
                to your court application. For more information, contact your local court registry, Family
                Justice/Justice Access Centre or go to <u>www.gov.bc.ca/parenting-after-separation</u>. After completing
                PAS you will receive a Certificate of Attendance that can be filed with the court registry.                
            </p> 

            <p>
                <div style="margin:0;">
                    <b>Online PAS:</b> Alternatively, you may also complete the free online PAS program. Here’s how to register
                    and complete online PAS:
                </div>
                <ol>
                    <li>
                        Type <u style="font-weight: 700;">www.familieschange.ca</u> in your web browser’s address bar
                    </li>
                    <li>
                        Choose British Columbia
                    </li>
                    <li>
                        Click on <b>Parenting After Separation</b> and select your language
                    </li>
                    <li>
                        Complete the <b>registration (you <u>must</u> register to receive a Certificate)</b>
                    </li>
                    <li>
                        Complete the course, pass the final exam and fill in the feedback form
                    </li>
                    <li>
                        Receive your online PAS Certificate of Attendance (print, save and/or download it)
                    </li>
                    <li>
                        You can also choose to receive your Certificate of Attendance by regular mail
                    </li>
                    <li>
                        Bring the Certificate to the court registry to file
                    </li>
                </ol>                
            </p> 
            <div>
                <div class="row">
                    <div class="col-9 mr-0 pr-0">
                        <p class="mt-1">
                            <b>Questions?</b> Contact your local court registry or Family Justice/Justice Access
                            Centre. Call Enquiry BC toll free at 1-800-663-7867 and ask to be connected.
                        </p>
                    </div>
                    <div class="col">
                        <img 
                            style="display:block; width:9rem;"
                            :src="image"
                        />                                                
                    </div>                    
                </div>
            </div>           
        </div> 
    </div>
    
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import {image} from '../../../../public/images/ministryJusticeLogo'

@Component
export default class ParentingAfterSeparation extends Vue {
image = image
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>