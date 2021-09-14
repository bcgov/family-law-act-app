import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';
import * as _ from 'underscore';

export function getYourInformationResults(applicantInfo) {

    let yourInformation = {} as yourInformationInfoDataInfoType;       

    const noLawyerAddressCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress;
    const noLawyerContactCondition = applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact;          
    
    yourInformation = {
        dob: applicantInfo.ApplicantDOB? applicantInfo.ApplicantDOB:'',
        name: applicantInfo.ApplicantName? applicantInfo.ApplicantName:'',
        lawyer: applicantInfo.Lawyer == 'y',
        lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
        address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:((noLawyerAddressCondition)?applicantInfo.ApplicantAddress:''),
        contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:((noLawyerContactCondition)?applicantInfo.ApplicantContact:''),

        occupation: applicantInfo.ApplicantOccupation? applicantInfo.ApplicantOccupation : '',
        lawyerFiling: false,
        lawyerStatement: {lawyerName: '', clientName: ''}
    } 
        
    return yourInformation;       
}