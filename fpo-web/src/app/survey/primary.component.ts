import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralDataService } from '../general-data.service';

declare var window: any;

@Component({
    selector: 'survey-primary',
    templateUrl: './primary.component.html',
    styleUrls: ['./primary.component.scss']
})
export class SurveyPrimaryComponent implements OnInit {


    public cacheName: string;
    public showSidebar: boolean = true;
    public printUrl: string;
    public resultJson: any;
    public surveyPath: string;
    public surveyJson: any;
    public complete: Function;
    public data: any;
    public jsonObject: any;




    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: GeneralDataService,
    ) { }

    ngOnInit() {
        let routeData = this.route.snapshot.data;
        this.surveyPath = routeData.survey_path;
        this.surveyJson = routeData.survey;
        this.cacheName = routeData.cache_name;
        if('show_sidebar' in routeData)
            this.showSidebar = routeData.show_sidebar;
        this.complete = (data) => this.onComplete(data);
    }

    onComplete(data) {
        let path = this.route.snapshot.url[0].path;
        if(path === 'qualify') {
            let ok = (data.ExistingPOR === 'n') ? 'qualified' : 'unqualified';
            this.router.navigate(['result', ok]);
        }
        else if(this.cacheName) {

            //add additional data starts here
            data.listOfChildrenArray = [];
            data.listOfChildrenWithPOArray = [];
            data.listOfChildrenWithoutPOArray = [];
            data.listOfChildrenString = new String();
            data.listOfChildrenWithPO = new String();
            data.listOfPeopleString = data.ApplicantName;
            data.listOfPeopleArray = [];
            data.listOfPeopleWithPOArray = [];
            data.listOfPeopleWithPOString = new String();
            data.contactTypeString = new String();
            data.ArrangeMethodString = new String();
            data.listOfChildrenWithoutPOString = new String();

            data.listOfBothGuardianArray = [];
            data.listOfBothGuardianString = new String();
            data.listOfApplicantGuardianArray = [];
            data.listOfApplicantGuardianString = new String();
            data.listOfRespondentGuardianArray = [];
            data.listOfRespondentGuardianString = new String();

            data.listOfApplicantResponsibleArray = [];
            data.listOfApplicantResponsibleString = new String();
            data.listOfRespondentResponsibleArray = [];
            data.listOfRespondentResponsibleString = new String();
            data.listOfBothResponsibleArray = [];
            data.listOfBothResponsibleString = new String();
            data.listOfNoResponsibleArray = [];
            data.listOfNoResponsibleString = new String();
            data.listOfAdultChildrenArray = [];
            data.listOfAdultChildrenString = new String();

            data.listOfEqualPtimeArray = [];
            data.listOfEqualPtimeString = new String();
            data.listOfApplicantMainGuardianArray = [];
            data.listOfApplicantMainGuardianString = new String();
            data.listOfRespondentMainGuardianArray = [];
            data.listOfRespondentMainGuardianString = new String();


            data.listOfChildrenTimeApplicantArray = [];
            data.listOfChildrenTimeApplicantString = new String();
            data.listOfChildrenTimeRespondentArray = [];
            data.listOfChildrenTimeRespondentString = new String();
            data.listOfChildrenTimeNoneArray = [];
            data.listOfChildrenTimeNoneString = new String();

            data.PORAffidavit = new String();
            data.PORAffidavitArray = [];

            data.childError = [];
            data.RespondentNoGoPlacesString = new String();
            console.log("Variable with "+ data.RespondentNoGoPlacesComment);
            console.log("Variable type of ApplicantDOB "+ typeof data.ApplicantDOB);
            console.log("Variable ApplicantDOB is "+ data.ApplicantDOB);
            let newDate = new Date(data.ApplicantDOB);
            data.applicantDate = newDate;
            var dd = newDate.getDate();
            var month = newDate.toLocaleString("en-us", {month: "short"});
            // var month = newDate.toLocaleString("en-us", {month: "short"});
            var yyyy = newDate.getFullYear();
            data.ApplicantDOBDateCompStr = month+"/"+dd+"/"+yyyy;

            let respondentNewDate = new Date(data.RespondentDOB);
            var dd = respondentNewDate.getDate() +1;
            var month = respondentNewDate.toLocaleString("en-us", {month: "short"});
            var yyyy = respondentNewDate.getFullYear();
            data.RespondentDOBDateCompStr = month+"/"+dd+"/"+yyyy;

            let porNewDate = new Date(data.RespondentPORNewTime);
            var dd = porNewDate.getDate() +1;
            var month = porNewDate.toLocaleString("en-us", {month: "short"});
            var yyyy = porNewDate.getFullYear();
            data.PorNewDateCompStr = month+"/"+dd+"/"+yyyy;

            if(data.ListOfChildren !== undefined){
                for (let child of data.ListOfChildren){

                    let childDOBNewDate = new Date(child.ChildDOB);
                    var dd = childDOBNewDate.getDate() +1;
                    var month = childDOBNewDate.toLocaleString("en-us", {month: "short"});
                    var yyyy = childDOBNewDate.getFullYear();
                    console.log("child.childBOD is" + child.ChildDOB);
                    child.ChildDOB = month+"/"+dd+"/"+yyyy;
                    console.log("after conversion of child.childBOD is" + child.ChildDOB);
                    // child.ChildDOB = JSON.stringify(month+"/"+dd+"/"+yyyy);

                    var childFullName = child["ChildName"].first +" "+ child["ChildName"].middle +" "+ child["ChildName"].last;



                    data.listOfChildrenArray.push(childFullName);
                    if (child["ChildNeedsProtection"] == "y"){

                        data.listOfChildrenWithPOArray.push(childFullName);

                        // data.listOfChildrenWithPO.concat
                    }
                    else {
                        data.listOfChildrenWithoutPOArray.push(childFullName);
                    }
                    // data.listOfChildren.push(child["ChildName"]);
                }
            }

            if(data.ListOfChildren !== undefined){
                for (let child of data.ListOfChildren){
                    var childFullName = child["ChildName"].first +" "+ child["ChildName"].middle +" "+ child["ChildName"].last;
                    if (child["ChildIsMinor"] == "y"){
                        if (child["ChildApplicantGuardian"] == "y" && child["ChildRespondentGuardian"] == "y"){
                            data.listOfBothGuardianArray.push(childFullName);
                        }
                        else if (child["ChildApplicantGuardian"] == "y" && child["ChildRespondentGuardian"] == "n"){
                            data.listOfApplicantGuardianArray.push(childFullName);
                        }
                        else if (child["ChildApplicantGuardian"] == "n" && child["ChildRespondentGuardian"] == "y") {
                            data.listOfRespondentGuardianArray.push(childFullName);
                        }
                        else{
                            data.childError.push("mChildNoGuardian");
                        }
                        if (child["ChildApplicantPDecisions"] == "y" && child["ChildRespondentPDecisions"] == "y"){
                            data.listOfBothResponsibleArray.push(childFullName);
                        }
                        else if (child["ChildApplicantPDecisions"] == "y" && child["ChildRespondentPDecisions"] == "n"){
                            data.listOfApplicantResponsibleArray.push(childFullName);
                        }
                        else if (child["ChildApplicantPDecisions"] == "n" && child["ChildRespondentPDecisions"] == "y") {
                            data.listOfRespondentResponsibleArray.push(childFullName);
                        }
                        else{
                            data.listOfNoResponsibleArray.push(childFullName);
                        }

                        if (child["ChildEqualPTime"] == "y"){
                            data.listOfEqualPtimeArray.push(childFullName);
                        }
                        else if (child["ChildEqualPTime"] == "n" && child["ChildMainGuardians"] == "applicant"){
                            data.listOfApplicantMainGuardianArray.push(childFullName);
                        }
                        else if (child["ChildEqualPTime"] == "n" && child["ChildMainGuardians"] == "respondent") {
                            data.listOfRespondentMainGuardianArray.push(childFullName);
                        }

                        if (child["ChildApplicantPTime"] == "y" && child["ChildRespondentPTime"] == "n"){
                            data.listOfChildrenTimeApplicantArray.push(childFullName);
                        }
                        else if (child["ChildApplicantPTime"] == "n" && child["ChildRespondentPTime"] == "y") {
                            data.listOfChildrenTimeRespondentArray.push(childFullName);
                        }
                        else if (child["ChildApplicantPTime"] == "n" && child["ChildRespondentPTime"] == "n") {
                            data.listOfChildrenTimeNoneArray.push(childFullName);
                        }

                        if (child["ChildIsMinor"] == "n"){
                            data.listOfAdultChildrenArray.push(childFullName);
                        }

                    }
                    else if (child["ChildIsMinor"] == "n"){
                        data.childError.push("mChildNoMainGuardian");
                    }
                }
            }

            if (data.listOfBothGuardianArray !== undefined)
                data.listOfBothGuardianString = data.listOfBothGuardianArray.slice(0, data.listOfBothGuardianArray.length-1).join(", ")
                    + " and " + data.listOfBothGuardianArray[data.listOfBothGuardianArray.length-1];

            if (data.listOfApplicantGuardianArray !== undefined)
                data.listOfApplicantGuardianString = data.listOfApplicantGuardianArray.slice(0, data.listOfApplicantGuardianArray.length-1).join(", ")
                    + " and " + data.listOfApplicantGuardianArray[data.listOfApplicantGuardianArray.length-1];

            if (data.listOfRespondentGuardianArray !== undefined)
                data.listOfRespondentGuardianString = data.listOfRespondentGuardianArray.slice(0, data.listOfRespondentGuardianArray.length-1).join(", ")
                    + " and " + data.listOfRespondentGuardianArray[data.listOfRespondentGuardianArray.length-1];

            if (data.listOfBothResponsibleArray !== undefined)
                data.listOfBothResponsibleString = data.listOfBothResponsibleArray.slice(0, data.listOfBothResponsibleArray.length-1).join(", ")
                    + " and " + data.listOfBothResponsibleArray[data.listOfBothResponsibleArray.length-1];

            if (data.listOfApplicantResponsibleArray !== undefined)
                data.listOfApplicantResponsibleString = data.listOfApplicantResponsibleArray.slice(0, data.listOfApplicantResponsibleArray.length-1).join(", ")
                    + " and " + data.listOfApplicantResponsibleArray[data.listOfApplicantResponsibleArray.length-1];

            if (data.listOfRespondentResponsibleArray !== undefined)
                data.listOfRespondentResponsibleString = data.listOfRespondentResponsibleArray.slice(0, data.listOfRespondentResponsibleArray.length-1).join(", ")
                    + " and " + data.listOfRespondentResponsibleArray[data.listOfRespondentResponsibleArray.length-1];

            if (data.listOfNoResponsibleArray !== undefined)
                data.listOfNoResponsibleString = data.listOfNoResponsibleArray.slice(0, data.listOfNoResponsibleArray.length-1).join(", ")
                    + " and " + data.listOfNoResponsibleArray[data.listOfNoResponsibleArray.length-1];

            if (data.listOfAdultChildrenArray !== undefined)
                data.listOfAdultChildrenString = data.listOfAdultChildrenArray.slice(0, data.listOfAdultChildrenArray.length-1).join(", ")
                    + " and " + data.listOfAdultChildrenArray[data.listOfAdultChildrenArray.length-1];
            //Child parenting time list
            if (data.listOfEqualPtimeArray !== undefined)
                data.listOfEqualPtimeString = data.listOfEqualPtimeArray.slice(0, data.listOfEqualPtimeArray.length-1).join(", ")
                    + " or " + data.listOfEqualPtimeArray[data.listOfEqualPtimeArray.length-1];

            if (data.listOfApplicantMainGuardianArray !== undefined)
                data.listOfApplicantMainGuardianString = data.listOfApplicantMainGuardianArray.slice(0, data.listOfApplicantMainGuardianArray.length-1).join(", ")
                    + " or " + data.listOfApplicantMainGuardianArray[data.listOfApplicantMainGuardianArray.length-1];

            if (data.listOfRespondentMainGuardianArray !== undefined)
                data.listOfRespondentMainGuardianString = data.listOfRespondentMainGuardianArray.slice(0, data.listOfRespondentMainGuardianArray.length-1).join(", ")
                    + " or " + data.listOfRespondentMainGuardianArray[data.listOfRespondentMainGuardianArray.length-1];

            if (data.listOfChildrenTimeApplicantArray !== undefined)
                data.listOfChildrenTimeApplicantString = data.listOfChildrenTimeApplicantArray.slice(0, data.listOfChildrenTimeApplicantArray.length-1).join(", ")
                    + " or " + data.listOfChildrenTimeApplicantArray[data.listOfChildrenTimeApplicantArray.length-1];

            if (data.listOfChildrenTimeRespondentArray !== undefined)
                data.listOfChildrenTimeRespondentString = data.listOfChildrenTimeRespondentArray.slice(0, data.listOfChildrenTimeRespondentArray.length-1).join(", ")
                    + " or " + data.listOfChildrenTimeRespondentArray[data.listOfChildrenTimeRespondentArray.length-1];

            if (data.listOfChildrenTimeNoneArray !== undefined)
                data.listOfChildrenTimeNoneString = data.listOfChildrenTimeNoneArray.slice(0, data.listOfChildrenTimeNoneArray.length-1).join(", ")
                    + " or " + data.listOfChildrenTimeNoneArray[data.listOfChildrenTimeNoneArray.length-1];

            if (data.listOfChildrenArray !== undefined)
                data.listOfChildrenString = data.listOfChildrenArray.slice(0, data.listOfChildrenArray.length-1).join(", ")
                    + " or " + data.listOfChildrenArray[data.listOfChildrenArray.length-1];

            if (data.listOfChildrenWithPOArray !== undefined)
                data.listOfChildrenWithPO = data.listOfChildrenWithPOArray.slice(0, data.listOfChildrenWithPOArray.length-1).join(", ")
                    + " or " + data.listOfChildrenWithPOArray[data.listOfChildrenWithPOArray.length-1];


            if(data.listOfChildrenWithoutPOArray !== undefined)
                data.listOfChildrenWithoutPOString = data.listOfChildrenWithoutPOArray.slice(0, data.listOfChildrenWithoutPOArray.length-1).join(", ")
                    + " or " + data.listOfChildrenWithoutPOArray[data.listOfChildrenWithoutPOArray.length-1];


            if (data.ApplicantNeedsProtection == "y"){
                data.listOfPeopleWithPOString = data.ApplicantName;
                // console.log("ApplicantNeedsProtection is "+ data.ApplicantNeedsProtection);
                // console.log("listOfPeopleWithPOString is "+ data.listOfPeopleWithPOString);
                // console.log("ApplicantName is "+ data.ApplicantName);
            }
            if (data.ApplicantNeedsProtection == "y" && data.listOfChildrenWithPO != undefined){
                data.listOfPeopleWithPOString = data.listOfPeopleWithPOString +", " +data.listOfChildrenWithPO;
                console.log("data.ApplicantNeedsProtection is " + data.ApplicantNeedsProtection);
                console.log("ApplicantNeedsProtection is "+ data.ApplicantNeedsProtection);
                console.log("listOfPeopleWithPOString is "+ data.listOfPeopleWithPOString);
                console.log("ApplicantName is "+ data.ApplicantName);
            }
            else if (data.ApplicantNeedsProtection == "n" && data.listOfChildrenWithPO != undefined){
                data.listOfPeopleWithPOString = data.listOfChildrenWithPO.substr(0, 3);
                console.log("data.ApplicantNeedsProtection is " + data.ApplicantNeedsProtection);
                console.log("ApplicantNeedsProtection is "+ data.ApplicantNeedsProtection);
                console.log("listOfPeopleWithPOString is "+ data.listOfPeopleWithPOString);
                console.log("ApplicantName is "+ data.ApplicantName);
            }
            if (data.listOfChildren != undefined){
                data.listOfPeopleString = data.listOfPeopleString +", " +data.listOfChildrenString;
            }

            console.log("appended child is " + data.listOfChildrenWithPOArray);
            console.log("appended children in string is " + data.listOfChildrenWithPO);
            console.log("people who need po are " + data.listOfPeopleWithPO);
            console.log("RespondentApplicantContactType are " + data.RespondentApplicantContactType);
            console.log("RespondentApplicantArrangeMethods are " + data.RespondentApplicantArrangeMethods);

            if (data.RespondentApplicantContactType !== undefined)
                data.contactTypeString = data.RespondentApplicantContactType.slice(0, data.RespondentApplicantContactType.length-1).join(", ")
                    + " or " + data.RespondentApplicantContactType[data.RespondentApplicantContactType.length-1];

            if (data.RespondentApplicantArrangeMethods !== undefined)
                data.ArrangeMethodString = data.RespondentApplicantArrangeMethods.slice(0, data.RespondentApplicantArrangeMethods.length-1).join(", ")
                    + " and " + data.RespondentApplicantArrangeMethods[data.RespondentApplicantArrangeMethods.length-1];

            if (data.RespondentNoGoPlaces !== undefined){
                for (let RespondentNoGoPlace of data.RespondentNoGoPlaces){
                    if (RespondentNoGoPlace == data.RespondentNoGoPlaces[0]){
                        data.RespondentNoGoPlacesString = data.RespondentNoGoPlacesString + RespondentNoGoPlace;
                    }
                    else if (RespondentNoGoPlace == data.RespondentNoGoPlaces[data.RespondentNoGoPlaces.length-1]){
                        data.RespondentNoGoPlacesString = data.RespondentNoGoPlacesString + " or " + RespondentNoGoPlace;
                    }
                    else {
                        data.RespondentNoGoPlacesString = data.RespondentNoGoPlacesString + ", " + RespondentNoGoPlace;
                    }
                }
            }

            console.log("RespondentApplicantArrangeMethods are " + data.RespondentApplicantArrangeMethods);
            //add additional data ends here

            // Concate all strings to PORAffidavit
            data.PORAffidavit = "<strong>Relationship History </strong> <br/>" + data.PORRelationshipHistory + "<br/><br/><strong>Family Violence Incidents </strong> <br/>"
                + data.PORWhatHappened;
            if(data.PORSpeedup == "y" && data.PORNoNotice == "n"){
                data.PORAffidavit += "<br/><br/><strong>Reasons for shortening the time to reply </strong> <br/>" + data.PORWhyASAP;
            }
            else if(data.PORNoNotice == "y"){
                data.PORAffidavit += "<br/> <br/> <strong>Reasons for the application to be heard without notice to the other party </strong> <br/>" + data.PORWhyNoNotice;
            }

            // slice PORAffidavit to each paragraph
            data.PORAffidavit = data.PORAffidavit.replace(/\n/g, '<br/>');
            var PORAffidavitSplit = data.PORAffidavit.split('<br/>');
            console.log("POR Message: " + data.PORAffidavit);
            console.log("POR Length: " + data.PORAffidavit.length);

            // First page
            var i : number = 1;
            data.PORAffidavit = PORAffidavitSplit[0] + "<br/>";
            var len : number = 120;
            for(; i < PORAffidavitSplit.length; i++){

                len += (PORAffidavitSplit[i].length + 120);
                if(len < 5000){
                    data.PORAffidavit += PORAffidavitSplit[i] + "<br/>";
                }else{
                    break;
                }
            }

            // Other pages
            var j : number = 0;
            var sub_length : number = 0;
            while(i < PORAffidavitSplit.length){
                sub_length += (PORAffidavitSplit[i].length + 120);
                if(sub_length < 7100){
                    // Last page should have more space for signature
                    if(i == (PORAffidavitSplit.length - 1)){
                        if(sub_length > 5100){
                            j++;
                        }
                    }
                    if(data.PORAffidavitArray[j] !== undefined){
                        data.PORAffidavitArray[j] += PORAffidavitSplit[i] + "<br/>";
                    }
                    else{
                        data.PORAffidavitArray[j] = PORAffidavitSplit[i] + "<br/>";
                    }
                    i++;
                }else{
                    sub_length = 0;
                    j++;
                }
            }
            this.data = data;

            this.resultJson = JSON.stringify(data);

            console.log("resultJson is: " + this.resultJson);

            this.resultJson = JSON.stringify(data);
            this.jsonObject = JSON.parse(this.resultJson);

            this.printUrl = this.dataService.getApiUrl('survey-print/' + this.cacheName);
        }
    }
}
