<template>
    <div v-if="dataReady"> 
        
<!-- <Page 4> --> 
<!--Header: Begin-->
<div >
    <div class="new-page"></div>
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 12pt;">
                    <b>Schedule 3 | Waiving or modifying any other requirement</b>
            </div>
            <div style="background: #626262; color: white; font-size: 12pt;margin-top:-10px;">
                    <span style="margin-left:105px;margin-top:-40px;"><b>under the rules</b></span>
            </div>
            <div style="text-align:justify;width:100%; margin-top: 10px;background: #d6d6d6;line-height: 14px;font-size:9pt;">
                <p>
                    Complete this schedule only if you are applying to waive or modify any other requirement under 
the rules, including a time limit set by an order or direction, even after the time limit has expired.
                </p>
        </div>
        </div>  
    </div> 
<!--Header: End-->
<!-- <1> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="background: #626262; color: white; font-size: 10.5pt;padding:2px;width: 80%; float: left; margin-right: 10px;">
                    <b>Part 1 |  Requirement I need to waive or modify </b>
            </div>
            <div style="margin-top: 1rem;"></div>
            <div style="display: inline-block; font-size: 11pt;width: 80%; margin-right: 10px;margin-top:10px;margin-left:20px;">
                <b>1.</b><span style="margin-left:22px;">I am applying for an order to <b> waive or modify the  </b></span>
                <span style="margin-left:35px;"><b>following requirement</b>(s) under the rules:</span>
            </div>  
            <div style="font-size: 10pt;margin-left:50px;" >                    
                    
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Filing at a court registry other than the court registry required by Rule 7')?'yes':''" text="Filing at a court registry other than the court registry required by Rule 7"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Attending a needs assessment')?'yes':''" text="Attending a needs assessment"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Completing a parenting education program')?'yes':''" text="Completing a parenting education program"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Participating in consensual dispute resolution')?'yes':''" text="Participating in consensual dispute resolution"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Filing a completed financial statement with my application or reply')?'yes':''" text="Filing a completed financial statement Form 4 with my application, reply or counter application"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Filing the required documents for an application about guardianship of a child')?'yes':''" text="Filing the required documents for an application about guardianship of a child"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Time to file a reply, including permission to file a reply after the time to reply has passed')?'yes':''" text="Time to file a reply, including permission to file a reply after the time to reply has passed"/>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Time to provide/exchange document(s)')?'yes':''" text="Time to provide/exchange document(s)"/>

                    <check-box marginLeft="1.65rem" style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')?'yes':''" text="Time limit set by an order or direction made"/>
                    
                <table style="margin-left:30px;">
                <tr>
                <td><div style="margin-top:-20px;padding-right:5px;">on</div></td>
                <td><div style="width:200px;background-color: #dedede;padding:2px;font-size: 11pt;min-height:25px;margin-bottom:10px;">{{ modReqInfo.dateOfOrder | beautify-date-mid }}</div> <div><div style="margin-left:15px;text-align: center;font-size:7pt;margin-top:-12px;">Date (dd/mmm/yyyy)</div></div></td>
                <td><div style="padding-left:0px;margin-top:-20px;margin-left:10px;">by</div> </td>
                <td><div style="width:200px;background-color: #dedede;padding:2px;font-size: 11pt;margin-left:5px;min-height:25px;margin-bottom:10px;">{{ modReqInfo.judgeName }}</div> <div><div style="margin-left:10px;text-align:center;font-size:7pt;margin-top:-12px;">Name of judge or family justice manager</div> </div></td>
                </tr>
                </table>
                <!-- <div style="margin-left:35px;margin-top:0px;">                  
                
                <span style="margin-left:5px;min-width: 90px;display: inline-block;border-bottom: 3px solid grey;border-width:1.2px;background-color:#dedede;border-color:black;text-align:center;"></span>
                
                <span style="margin-left:5px;min-width: 200px;display: inline-block;border-bottom: 3px solid grey;border-width:1.2px;background-color:#dedede;border-color:black;text-align:left;">{{ modReqInfo.judgeName |truncate-word-after(30)}}</span> 
                <div style="margin-top:-2px;font-size:6pt;">                
                <span style="margin-left:25px;min-width:90px;text-align: center;display: inline-block;">Date (dd/mmm/yyyy)</span>
                
                </div> 
                <div v-if="modReqInfo.judgeName.length >= 30" style="margin-top:3px;margin-left:0px;min-width: 200px;display: inline-block;border-bottom: 3px solid grey;border-width:1.2px;background-color:#dedede;border-color:black;text-align:left;">{{modReqInfo.judgeName|truncate-word-before(30)}}</div>    

                </div>  -->
                
                    <div style="margin-top:0.2rem"></div>
                    <span>
                    <check-box style="text-indent: -17px;width: 80%; margin-right: 10px;margin-left:20px;" :check="modReqInfo.appliedRequirementsList.includes('other')?'yes':''" text=""/>
                    <div style="margin-top:-20px;margin-left:20px;">
                        <span style="margin-left:9px;">Other <span style="color:#747474;font-style:italic">(specify)</span>:</span>
                        <div v-if="modReqInfo.appliedRequirementsListComment" style="margin-top:-25px;margin-left:105px;min-width: 200px;min-height:25px;background-color: #dedede;padding:2px;">{{ modReqInfo.appliedRequirementsListComment |truncate-word-after(55)}}</div>
                        <div v-if="modReqInfo.appliedRequirementsListComment && modReqInfo.appliedRequirementsListComment.length >=  55" style="margin-top:3px;margin-left:10px;min-width: 200px;display: inline-block;background-color:#dedede;padding:2px;">{{modReqInfo.appliedRequirementsListComment|truncate-word-before(55)}}</div>    
                    </div>  
                    </span>
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    A requirement under the rules is any time the rules say you “must” do something.
                </p>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-book />
                    <br />
                    For more information about the requirements under the rules you may need to waive or modify, including if you need an urgent court order, see the guidebook.
                </p>
        </div>
    </div>  
<!-- <1> : END-->
<!--<2> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 2 | About the order</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>2. </b></span><span style="margin-left:12px;">The <b>details of the order</b> I am applying for are as follows:</span>
                <br/>
                <span style="margin-left:28px;font-size: 11pt;text-indent:47px;">
                    <span style="color:#747474;font-style:italic">Include if you are asking to waive or modify the requirement. If you are </span>
                </span>
                <span style="margin-left:28px;font-size: 11pt;text-indent:47px;">
                    <span style="color:#747474;font-style:italic">applying to modify the requirement, you need to include how you want the </span>
                </span>
                <span style="margin-left:28px;font-size: 11pt;text-indent:47px;">
                    <span style="color:#747474;font-style:italic">requirement changed. </span>
                </span>
                <div v-if="modReqInfo.orderDetail" style="min-height:150px;background-color: #dedede;padding:2px;font-size: 11pt;margin-left:25px;">{{modReqInfo.orderDetail}}</div>
                <div v-else style="background-color: #dedede;padding:2px;font-size: 11pt;margin-left:25px;min-height:150px;margin-bottom:10px;"></div> 

            </div>
        </div>  
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    If a requirement is waived, it means it no longer applies. You don’t need to complete it at any time.
                    <br/>
                    If a requirement is modified, you still need to meet the requirement, but it has been changed. A modified requirement could include changing when a document can be filed or when a step under the rules must be taken.
                </p>
        </div>      
    </div>
<!--<2> : END-->
<!--<3> : BEGIN-->
    <div >
        <div style="width: 80%; float: left; margin-right: 10px;">
            <div style="margin-top: 1rem;"></div>
            <div style="background: #626262; color: white; font-size: 11pt;">
                    <b>Part 3 | The facts</b>
            </div>
            <div style="text-align: justify;text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;font-size: 11pt;">
                <span style="font-size: 11pt;"><b>3. </b></span><span style="margin-left:12px;">The <b>facts</b> on which this application is based <b>are as follows:</b></span>
                <br/>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic">Explain why you are making the application and why the order you</span>
                </div>
                <div style="margin-left:25px;font-size: 11pt;text-indent:5px;">
                    <span style="color:#747474;font-style:italic">are requesting should be made</span>
                </div>
                
                <div v-if="modReqInfo.applicationFacts" style="background-color: #dedede;padding:2px;font-size: 11pt;margin-left:25px;min-height:230px;">
                    {{modReqInfo.applicationFacts}}
                </div>
                <div v-else style="background-color: #dedede;padding:2px;font-size: 11pt;margin-left:25px;min-height:150px;margin-bottom:10px;"></div> 
                
            </div>
        </div>
        <div style="float: right;width: 18%; margin-top: 20px;background: #d6d6d6;color: #747474;padding: 4px;line-height: 14px;font-size:9pt;">
                <p>
                    <b-icon-info-circle-fill />
                    <br />
                    You may wish to include:
                    <div style="margin-left:-25px;margin-top:-15px;">
                    <ul>
                    <li>if you can complete the requirement later, and when;</li>
                    <li>if this application is being made because you need an urgent order, what the urgent application is about and who is involved; and</li>
                    <li>how the order being made will benefit the case proceeding.</li>
                    </ul>
                    </div>                    
                </p>
        </div>
        
    </div>
<!--<3> : END-->

   
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';  
import "@/store/modules/application";

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule3DataInfoType } from '@/types/Application/CaseManagement/PDF';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})
export default class Schedule3 extends Vue {

    @Prop({required:true})
    result!: any;
   
    dataReady = false;   
    modReqInfo = {} as schedule3DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

   
    public extractInfo(){
        this.modReqInfo = this.getWaiveModifyAnyOtherRequirementsInfo();
    }

    public getWaiveModifyAnyOtherRequirementsInfo(){
        
        let waiveModifyAnyOtherRequirementsInfo = {} as schedule3DataInfoType;
        
        if(this.result?.changingOrCancellingAnyOtherRequirementSurvey){

            const chgSurvey = this.result.changingOrCancellingAnyOtherRequirementSurvey;
                
            waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList = chgSurvey.appliedRequirementsList? chgSurvey.appliedRequirementsList: [];
            waiveModifyAnyOtherRequirementsInfo.appliedRequirementsListComment = chgSurvey.appliedRequirementsListComment? chgSurvey.appliedRequirementsListComment: '';
            waiveModifyAnyOtherRequirementsInfo.orderDetail = chgSurvey.orderDetail? chgSurvey.orderDetail: '';            
            waiveModifyAnyOtherRequirementsInfo.applicationFacts = chgSurvey.applicationFacts ? chgSurvey.applicationFacts:'';
            waiveModifyAnyOtherRequirementsInfo.dateOfOrder = waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')? Vue.filter('beautify-date-blank')(chgSurvey.dateOfOrder):'' 
            waiveModifyAnyOtherRequirementsInfo.judgeName = waiveModifyAnyOtherRequirementsInfo.appliedRequirementsList.includes('Time limit set by an order or direction of a judge')? chgSurvey.judgeName: ''
        }

        return waiveModifyAnyOtherRequirementsInfo
    } 

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>