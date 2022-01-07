import store from '@/store';
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"


export function getOrderTypeCM(form: string, toggle = false, toggleNext = false) {
    const stPgNo: stepsAndPagesNumberInfoType = store.state.Application.stPgNo;   
    const p = stPgNo.CM
    const orders = {
        'changeServiceRequirement':{turquoise: true,  pages:[p.WithoutNoticeOrAttendance, p.ChangingOrCancellingAServiceOrNotice],                              text:'Changing or cancelling the requirement for service or notice to a person, including allowing another method for the service of a document'},
        'changeRequirement':       {turquoise: true,  pages:[p.WithoutNoticeOrAttendance, p.ChangingOrCancellingAnyOtherRequirement],                           text:'Changing or cancelling `any other requirement` under the rules, including a time limit'},
        'remoteAttendance':        {turquoise: true,  pages:[p.WithoutNoticeOrAttendance, p.AttendanceUsingElectronicCommunication],                            text:'Attending at a court appearance using another method of attendance, including in-person, by telephone, video or other electronic means'},
        'adjourningAppearance':    {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Adjourning a court appearance'},
        'fileTransfer':            {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Transferring a court file to another registry'},
        'settingTime':             {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Setting a specified time to file and exchange information or evidence, including a financial statement in Form 4'},
        'nonPartyDisclosure':      {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Disclosing of information by a person who is not a party'},
        'rule112':                 {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'About the conduct of a party or management of a case, including pre-trial and trial process and evidence disclosure set out in Rule 112(1)'},
        'orderOfAbsenceChange':    {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Changing, suspending or cancelling an `order made in my absence`'},
        'section211':              {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Relating to a report under section 211, including requiring a person who prepared a report to attend trial as a witness'},
        'fileAccess':              {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Management of a court record, file or document including access to a court file'},
        'fileCorrection':          {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Correcting or changing a filed document, including correcting a name or date of birth'},
        'orderSettlement':         {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Settling or correcting the terms of an order'},
        'section204':              {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Adding or removing a party to a case, including leave to intervene under section 204 (2) of the Family Law Act'},
        'lawyerAppointment':       {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Respecting the appointment of a lawyer to represent the interests of a child or a party'},
        'otherProvinceOrder':      {turquoise: true,  pages:[p.WithoutNoticeOrAttendance, p.RecognizingAnOrderFromOutsideBc, p.ContactInformationOtherParty],   text:'Recognizing an order from outside British Columbia (other than a support order)'},
        'subpoenaCancelation':     {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Cancelling a subpoena'},
        'section33':               {turquoise: false, pages:[p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder],                                              text:'Requiring that a parentage test be taken under section 33 of the Family Law Act'},
        'section242':              {turquoise: true,  pages:[p.WithoutNoticeOrAttendance, p.RequiringAccessToInformation],                                      text:'Requiring access to information in accordance with section 242 of the Family Law Act'}
    }

    if(form){
        const order = orders[form]
        if(order && toggle)
            if(form == 'otherProvinceOrder'){
                const types = store.state.Application.types
                const cmOnly = (types?.length == 1 && types?.includes("Case Management"));
                togglePages([order.pages[2]], toggleNext && cmOnly )
                togglePages([order.pages[1]], toggleNext )
                togglePages([order.pages[0]], true)
            }
            else if(order.turquoise){               
                togglePages(order.pages, toggleNext )
                togglePages(order.pages.splice(0,1), true)                
            }
            else
                togglePages(order.pages, true)
        

        return order   
    }
    else 
        return orders

}


function togglePages(pageArr, activeIndicator) { 

    const stPgNo: stepsAndPagesNumberInfoType = store.state.Application.stPgNo;
    
    for (const inx in pageArr) { 
        store.commit("Application/setPageActive", {
            currentStep: stPgNo.CM._StepNo,
            currentPage: pageArr[inx],
            active: activeIndicator
        });
    }
}