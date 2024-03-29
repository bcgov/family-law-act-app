import { yourInformationInfoDataInfoType } from '@/types/Application/CommonInformation/Pdf';

export function getYourInformationResults(applicantInfo) {

    let yourInformation = {} as yourInformationInfoDataInfoType;       

    const noLawyerAddressCondition = (applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantAddress)?applicantInfo.ApplicantAddress:'';
    const noLawyerContactCondition = (applicantInfo.Lawyer == 'n' && applicantInfo.ApplicantContact)?applicantInfo.ApplicantContact:'';          
    
    yourInformation = {
        dob: applicantInfo.ApplicantDOB? applicantInfo.ApplicantDOB:'',
        name: applicantInfo.ApplicantName? applicantInfo.ApplicantName:'',
        lawyer: applicantInfo.Lawyer == 'y',
        lawyerName: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerName)?applicantInfo.LawyerName:'',
        address: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerAddress)?applicantInfo.LawyerAddress:noLawyerAddressCondition,
        contact: (applicantInfo.Lawyer == 'y' && applicantInfo.LawyerContact)?applicantInfo.LawyerContact:noLawyerContactCondition,
        occupation: applicantInfo.ApplicantOccupation? applicantInfo.ApplicantOccupation : '',
        lawyerFiling: applicantInfo?.LawyerFillingOut == "y"? true: false,
        lawyerStatement: {
            lawyerName: applicantInfo?.lawyerStatement?.lawyerName? applicantInfo.lawyerStatement.lawyerName:'', 
            clientName: applicantInfo?.lawyerStatement?.clientName? applicantInfo.lawyerStatement.clientName:''
        }
    } 
        
    return yourInformation;       
}

export function getLocationInfo(locationData){
    return locationData?.ExistingFileNumber  && locationData?.ExistingFamilyCase =='y'? locationData.ExistingFileNumber:'';        
}