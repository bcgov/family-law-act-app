<template>
    <div v-if="dataReady" style="padding: 2rem; border-color: grey;"> 
               
        <img 
            class="img-fluid d-md-block"
            style="margin-bottom:1rem; margin-left: 12rem; width: 12rem;"
            v-bind:src="bcLogo"            
            alt=""/>
        <img 
            class="img-fluid d-md-block"
            style="margin-left: auto; margin-right: auto; width: 10rem;"
            src="../../../../public/images/bclogo.png"            
            alt=""/>  
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div style="font-size:1.75rem; font-weight:700; display: block; margin-left: auto; margin-right: auto; text-align: center;">
            INSTRUCTIONS FOR FILING A REPLY
        </div>
        <div 
            v-if="earlyResolution" 
            style="margin-bottom:1rem; font-size:1.25rem; font-weight:700; display: block; margin-left: auto; margin-right: auto; text-align: center;"
            >{{locationInfo.name}} PROVINCIAL COURT</div>
        <div 
            v-else
            style="margin-bottom:1rem; font-size:1.25rem; font-weight:700; display: block; margin-left: auto; margin-right: auto; text-align: center;"
            >{{locationInfo.name}}</div>

        <div>
            <p>
                You have been served with court documents.  A former partner, 
                spouse or party has named you as the parent or other party in 
                this matter and is asking the BC Provincial Court to make an 
                order (or Orders) as listed on the attached Application About 
                a Family Law Matter. 
            </p>
            <p>
                If you choose to reply to the attached application, you must 
                file your reply using a <b>Reply to an Application About a Family 
                Law Matter (Form 6)</b> within 30 days after you have been served, 
                or the case may go ahead without you.  This means that the other 
                party may get a court order without your involvement and then 
                enforce the order against you.  If you do not reply, you will 
                not be entitled to receive notice of any part of the case, 
                including any conference, court appearance, hearing or trial 
                and orders may be made against you without your knowledge. 
            </p>
        </div>

<!-- <Step 1> -->
        <div>              
            
            <p style="font-weight: 700;">
                STEP 1.  OBTAIN THE “REPLY TO AN APPLICATION ABOUT A FAMILY LAW MATTER” (FORM 6)
            </p>
            <p>
                To obtain the Reply to an Application About a Family Law Matter (Form 6) 
                and the Financial Statement (Form 4), if required, you can:
                <ul>                    
                    <li>
                        Download the form(s) from the BC Government Court Forms website to complete and print for filing:                           
                        <a
                            href="https://www2.gov.bc.ca/courtforms/prov-family"
                            target="_blank">https://www2.gov.bc.ca/courtforms/prov-family
                        </a>
                    </li>
                    <li>
                        Email the registry at {{locationInfo.email}} and request the link to the BC Government Court Forms website;
                    </li>
                    <li>
                        Attend at the {{locationInfo.name}}, {{locationInfo.address}} to obtain a paper copy to complete by hand; or
                    </li>
                    <li>
                        Contact the Justice Access Centre toll-free number at 1-800-747-3963 to obtain information in your area.
                    </li>
                </ul>
            </p>            
        </div>

<!-- <Step 2> -->
        <div class="my-2">
            <p style="font-weight: 700;">
                STEP 2.  TO FILE YOUR REPLY                            
            </p>   
           
            <div class="my-2">
                You must file your reply within 30 days after you have been served.  If you do not file a reply, 
                a court hearing can be scheduled, and a Judge may make an Order without knowing your situation.
            </div>

            <div v-if="earlyResolution" class="new-page" />

            <img
                v-if="earlyResolution" 
                class="img-fluid d-md-block"
                style="margin-bottom:1rem; margin-left: 12rem; width: 12rem;"
                v-bind:src="bcLogo"            
                alt=""/>

            <div v-if="earlyResolution" class="my-2">
                To file your reply to a family law matter in an early resolution 
                registry, you must meet and participate in the following early 
                resolution requirements:
                <ul class="my-2" style="font-weight: 700;">
                    <li>Participated in Needs Assessment</li>
                    <li>Completed Parenting Education Course</li>
                    <li>Participated in at least one Consensual Dispute Resolution session</li> 
                </ul>
            </div>

            <div v-if="earlyResolution" class="my-2">
                The early resolution requirements are not required if you were previously 
                exempt by the needs assessor or the Court.   
            </div>

            <div v-if="earlyResolution" class="my-2">
                If you still need to complete one or more of these processes in order to 
                meet your early resolution requirements, contact the Justice Access Centre 
                identified on the Notice to Resolve a Family Law Matter to find out more 
                about meeting the early resolution requirements.
            </div>
            
            <div class="my-2">
                If the application about the family law matter is about child support or spousal support, 
                you <b>must</b> file a financial statement (Form 4) with your reply.
            </div>
            
        </div>

        <div v-if="!earlyResolution" class="new-page" />

        <img
            v-if="!earlyResolution" 
            class="img-fluid d-md-block"
            style="margin-bottom:1rem; margin-left: 12rem; width: 12rem;"
            v-bind:src="bcLogo"            
            alt=""/>

<!-- <Step 3> -->
        <div class="my-4">
            <p style="font-weight: 700;">
                STEP 3: SUBMIT YOUR COMPLETED FORM(S) 
            </p>             
            <ul>
                <li><b>Form 6</b> - Reply to an Application About a Family Law Matter, and </li>
                <li><b>Form 4</b> - Financial Statement (if applicable)</li>             
            </ul>

            <p>to: <b>{{locationInfo.name}}</b></p> 
             
            <p class="ml-4" style="font-weight: 700;">
                {{locationInfo.address}}
            </p>

            <p style="font-weight: 700;">Email:
                {{locationInfo.email}}
            </p>

        </div>

        <div class="my-2">
            If you have any questions, contact information for the various locations 
            can be found 
            <a 
                href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/courthouse-locations?keyword=courthouse&keyword=locations"
                target="_blank">here
            </a> 
            or call the Justice Access Centre toll-free number at 1-800-747-3963.
        </div>

    </div>
    
</template>

<script lang="ts">
import { locationsInfoType } from '@/types/Common';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {bclogo} from '@/filters/bcLogo';


@Component
export default class FamilyLawMatterInstructions extends Vue {

    @Prop({required: true})
    locationInfo!: locationsInfoType;

    @Prop({required: true})
    earlyResolution!: boolean;

    bcLogo;
    dataReady = false;

    mounted(){        
        this.dataReady = false;
        this.bcLogo = bclogo;
        this.dataReady = true;
    }

}
</script>