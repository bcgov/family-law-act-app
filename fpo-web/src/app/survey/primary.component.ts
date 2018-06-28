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

            data.childError = [];

            // if(data.RespondentNoGoPlaces-Comment !== undefined){
            // data.RespondentNoGoPlacesComment = this.jsonObject['data.RespondentNoGoPlaces-Comment'];
            // }
            data.RespondentNoGoPlacesString = new String();
            console.log("Variable with "+ data.RespondentNoGoPlacesComment);
            // console.log("printing with []" + data['RespondentNoGoPlaces-Comment']);
            if(data.ListOfChildren !== undefined){
                for (let child of data.ListOfChildren){
                    console.log("Child is "+child["ChildName"]);
                    data.listOfChildrenArray.push(child["ChildName"]);
                    if (child["ChildNeedsProtection"] == "y"){

                        data.listOfChildrenWithPOArray.push(child["ChildName"]);

                        // data.listOfChildrenWithPO.concat
                    }
                    else {
                        data.listOfChildrenWithoutPOArray.push(child["ChildName"]);
                    }
                    // data.listOfChildren.push(child["ChildName"]);
                }
            }







            if(data.ListOfChildren !== undefined){
                for (let child of data.ListOfChildren){
                    if (child["ChildIsMinor"] == "y"){
                        if (child["ChildApplicantGuardian"] == "y" && child["ChildRespondentGuardian"] == "y"){
                            data.listOfBothGuardianArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantGuardian"] == "y" && child["ChildRespondentGuardian"] == "n"){
                            data.listOfApplicantGuardianArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantGuardian"] == "n" && child["ChildRespondentGuardian"] == "y") {
                            data.listOfRespondentGuardianArray.push(child["ChildName"]);
                        }
                        else{
                            data.childError.push("mChildNoGuardian");
                        }
                        if (child["ChildApplicantPDecisions"] == "y" && child["ChildRespondentPDecisions"] == "y"){
                            data.listOfBothResponsibleArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantPDecisions"] == "y" && child["ChildRespondentPDecisions"] == "n"){
                            data.listOfApplicantResponsibleArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantPDecisions"] == "n" && child["ChildRespondentPDecisions"] == "y") {
                            data.listOfRespondentResponsibleArray.push(child["ChildName"]);
                        }
                        else{
                            data.listOfNoResponsibleArray.push(child["ChildName"]);
                        }

                        if (child["ChildEqualPTime"] == "y"){
                            data.listOfEqualPtimeArray.push(child["ChildName"]);
                        }
                        else if (child["ChildEqualPTime"] == "n" && child["ChildMainGuardians"] == "applicant"){
                            data.listOfApplicantMainGuardianArray.push(child["ChildName"]);
                        }
                        else if (child["ChildEqualPTime"] == "n" && child["ChildMainGuardians"] == "respondent") {
                            data.listOfRespondentMainGuardianArray.push(child["ChildName"]);
                        }

                        if (child["ChildApplicantPTime"] == "y" && child["ChildRespondentPTime"] == "n"){
                            data.listOfChildrenTimeApplicantArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantPTime"] == "n" && child["ChildRespondentPTime"] == "y") {
                            data.listOfChildrenTimeRespondentArray.push(child["ChildName"]);
                        }
                        else if (child["ChildApplicantPTime"] == "n" && child["ChildRespondentPTime"] == "n") {
                            data.listOfChildrenTimeNoneArray.push(child["ChildName"]);
                        }

                        if (child["ChildIsMinor"] == "n"){
                            data.listOfAdultChildrenArray.push(child["ChildName"]);
                        }

                    }
                    else if (child["ChildIsMinor"] == "n"){
                        data.childError.push("mChildNoMainGuardian");
                    }
                }
            }
            if (data.listOfBothGuardianArray !== undefined){
                for (let child of data.listOfBothGuardianArray){

                    if(child == data.listOfBothGuardianArray[data.listOfBothGuardianArray.length-1]){

                        data.listOfBothGuardianString = data.listOfBothGuardianString + " and "+child;
                    }
                    else if(child == data.listOfBothGuardianArray[0]){
                        data.listOfBothGuardianString = data.listOfBothGuardianString + child;
                    }
                    else{
                        data.listOfBothGuardianString = data.listOfBothGuardianString + ", " + child;
                    }
                }
            }
            if (data.listOfApplicantGuardianArray !== undefined){
                for (let child of data.listOfApplicantGuardianArray){

                    if(child == data.listOfApplicantGuardianArray[data.listOfApplicantGuardianArray.length-1]){

                        data.listOfApplicantGuardianString = data.listOfApplicantGuardianString + " and "+child;
                    }
                    else if(child == data.listOfApplicantGuardianArray[0]){
                        data.listOfApplicantGuardianString = data.listOfApplicantGuardianString + child;
                    }
                    else{
                        data.listOfApplicantGuardianString = data.listOfApplicantGuardianString + ", " + child;
                    }
                }
            }
            if (data.listOfRespondentGuardianArray !== undefined){
                for (let child of data.listOfRespondentGuardianArray){

                    if(child == data.listOfRespondentGuardianArray[data.listOfRespondentGuardianArray.length-1]){

                        data.listOfRespondentGuardianString = data.listOfRespondentGuardianString + " and "+child;
                    }
                    else if(child == data.listOfRespondentGuardianArray[0]){
                        data.listOfRespondentGuardianString = data.listOfRespondentGuardianString + child;
                    }
                    else{
                        data.listOfRespondentGuardianString = data.listOfRespondentGuardianString + ", " + child;
                    }
                }
            }






            if (data.listOfBothResponsibleArray !== undefined){
                for (let child of data.listOfBothResponsibleArray){

                    if(child == data.listOfBothResponsibleArray[data.listOfBothResponsibleArray.length-1]){

                        data.listOfBothResponsibleString = data.listOfBothResponsibleString + " and "+child;
                    }
                    else if(child == data.listOfBothResponsibleArray[0]){
                        data.listOfBothResponsibleString = data.listOfBothResponsibleString + child;
                    }
                    else{
                        data.listOfBothResponsibleString = data.listOfBothResponsibleString + ", " + child;
                    }
                }
            }
            if (data.listOfApplicantResponsibleArray !== undefined){
                for (let child of data.listOfApplicantResponsibleArray){

                    if(child == data.listOfApplicantResponsibleArray[data.listOfApplicantResponsibleArray.length-1]){

                        data.listOfApplicantResponsibleString = data.listOfApplicantResponsibleString + " and "+child;
                    }
                    else if(child == data.listOfApplicantResponsibleArray[0]){
                        data.listOfApplicantResponsibleString = data.listOfApplicantResponsibleString + child;
                    }
                    else{
                        data.listOfApplicantResponsibleString = data.listOfApplicantResponsibleString + ", " + child;
                    }
                }
            }
            if (data.listOfRespondentResponsibleArray !== undefined){
                for (let child of data.listOfRespondentResponsibleArray){

                    if(child == data.listOfRespondentResponsibleArray[data.listOfRespondentResponsibleArray.length-1]){

                        data.listOfRespondentResponsibleString = data.listOfRespondentResponsibleString + " and "+child;
                    }
                    else if(child == data.listOfRespondentResponsibleArray[0]){
                        data.listOfRespondentResponsibleString = data.listOfRespondentResponsibleString + child;
                    }
                    else{
                        data.listOfRespondentResponsibleString = data.listOfRespondentResponsibleString + ", " + child;
                    }
                }
            }
            if (data.listOfNoResponsibleArray !== undefined){
                for (let child of data.listOfNoResponsibleArray){

                    if(child == data.listOfNoResponsibleArray[data.listOfNoResponsibleArray.length-1]){

                        data.listOfNoResponsibleString = data.listOfNoResponsibleString + " and "+child;
                    }
                    else if(child == data.listOfNoResponsibleArray[0]){
                        data.listOfNoResponsibleString = data.listOfNoResponsibleString + child;
                    }
                    else{
                        data.listOfNoResponsibleString = data.listOfNoResponsibleString + ", " + child;
                    }
                }
            }
            if (data.listOfAdultChildrenArray !== undefined){
                for (let child of data.listOfAdultChildrenArray){
                    if(child == data.listOfAdultChildrenArray[data.listOfAdultChildrenArray.length-1]){

                        data.listOfAdultChildrenString = data.listOfAdultChildrenString + " and "+child;
                    }
                    else if(child == data.listOfAdultChildrenArray[0]){
                        data.listOfAdultChildrenString = data.listOfAdultChildrenString + child;
                    }
                    else{
                        data.listOfAdultChildrenString = data.listOfAdultChildrenString + ", " + child;
                    }
                }
            }

            //Child parenting time list
            if (data.listOfEqualPtimeArray !== undefined){
                for (let child of data.listOfEqualPtimeArray){
                    if(child == data.listOfEqualPtimeArray[data.listOfEqualPtimeArray.length-1]){

                        data.listOfEqualPtimeString = data.listOfEqualPtimeString + " or "+child;
                    }
                    else if(child == data.listOfEqualPtimeArray[0]){
                        data.listOfEqualPtimeString = data.listOfEqualPtimeString + child;
                    }
                    else{
                        data.listOfEqualPtimeString = data.listOfEqualPtimeString + ", " + child;
                    }
                }
            }
            if (data.listOfApplicantMainGuardianArray !== undefined){
                for (let child of data.listOfApplicantMainGuardianArray){
                    if(child == data.listOfApplicantMainGuardianArray[data.listOfApplicantMainGuardianArray.length-1]){

                        data.listOfApplicantMainGuardianString = data.listOfApplicantMainGuardianString + " or "+child;
                    }
                    else if(child == data.listOfApplicantMainGuardianArray[0]){
                        data.listOfApplicantMainGuardianString = data.listOfApplicantMainGuardianString + child;
                    }
                    else{
                        data.listOfApplicantMainGuardianString = data.listOfApplicantMainGuardianString + ", " + child;
                    }
                }
            }
            if (data.listOfRespondentMainGuardianArray !== undefined){
                for (let child of data.listOfRespondentMainGuardianArray){
                    if(child == data.listOfRespondentMainGuardianArray[data.listOfRespondentMainGuardianArray.length-1]){

                        data.listOfRespondentMainGuardianString = data.listOfRespondentMainGuardianString + " or "+child;
                    }
                    else if(child == data.listOfRespondentMainGuardianArray[0]){
                        data.listOfRespondentMainGuardianString = data.listOfRespondentMainGuardianString + child;
                    }
                    else{
                        data.listOfRespondentMainGuardianString = data.listOfRespondentMainGuardianString + ", " + child;
                    }
                }
            }


            if (data.listOfChildrenTimeApplicantArray !== undefined){
                for (let child of data.listOfChildrenTimeApplicantArray){
                    if(child == data.listOfChildrenTimeApplicantArray[data.listOfChildrenTimeApplicantArray.length-1]){

                        data.listOfChildrenTimeApplicantString = data.listOfChildrenTimeApplicantString + " or "+child;
                    }
                    else if(child == data.listOfChildrenTimeApplicantArray[0]){
                        data.listOfChildrenTimeApplicantString = data.listOfChildrenTimeApplicantString + child;
                    }
                    else{
                        data.listOfChildrenTimeApplicantString = data.listOfChildrenTimeApplicantString + ", " + child;
                    }
                }
            }
            if (data.listOfChildrenTimeRespondentArray !== undefined){
                for (let child of data.listOfChildrenTimeRespondentArray){
                    if(child == data.listOfChildrenTimeRespondentArray[data.listOfChildrenTimeRespondentArray.length-1]){

                        data.listOfChildrenTimeRespondentString = data.listOfChildrenTimeRespondentString + " or "+child;
                    }
                    else if(child == data.listOfChildrenTimeRespondentArray[0]){
                        data.listOfChildrenTimeRespondentString = data.listOfChildrenTimeRespondentString + child;
                    }
                    else{
                        data.listOfChildrenTimeRespondentString = data.listOfChildrenTimeRespondentString + ", " + child;
                    }
                }
            }
            if (data.listOfChildrenTimeNoneArray !== undefined){
                for (let child of data.listOfChildrenTimeNoneArray){
                    if(child == data.listOfChildrenTimeNoneArray[data.listOfChildrenTimeNoneArray.length-1]){

                        data.listOfChildrenTimeNoneString = data.listOfChildrenTimeNoneString + " or "+child;
                    }
                    else if(child == data.listOfChildrenTimeNoneArray[0]){
                        data.listOfChildrenTimeNoneString = data.listOfChildrenTimeNoneString + child;
                    }
                    else{
                        data.listOfChildrenTimeNoneString = data.listOfChildrenTimeNoneString + ", " + child;
                    }
                }
            }








            if (data.listOfChildrenArray !== undefined){
                for (let child of data.listOfChildrenArray){

                    if(child == data.listOfChildrenArray[data.listOfChildrenArray.length-1]){

                        data.listOfChildrenString = data.listOfChildrenString + " or "+child;
                    }
                    else if(child == data.listOfChildrenArray[0]){
                        data.listOfChildrenString = data.listOfChildrenString + child;
                    }
                    else{
                        data.listOfChildrenString = data.listOfChildrenString + ", " + child;
                    }
                }
            }
            if (data.listOfChildrenWithPOArray !== undefined){
                for (let childWithPO of data.listOfChildrenWithPOArray){
                    console.log("child name before if is " + childWithPO);
                    if(childWithPO == data.listOfChildrenWithPOArray[data.listOfChildrenWithPOArray.length-1]){
                        console.log("last child name is " + childWithPO);
                        data.listOfChildrenWithPO = data.listOfChildrenWithPO + " or "+childWithPO;
                    }
                    else if(childWithPO == data.listOfChildrenWithPOArray[0]){
                        data.listOfChildrenWithPO = data.listOfChildrenWithPO + childWithPO;
                    }
                    else{
                        data.listOfChildrenWithPO = data.listOfChildrenWithPO + ", " + childWithPO;
                    }
                }
            }
            if(data.listOfChildrenWithoutPOArray !== undefined){
                for (let childWithoutPO of data.listOfChildrenWithoutPOArray){
                    console.log("child name before if is " + childWithoutPO);
                    if(childWithoutPO == data.listOfChildrenWithoutPOArray[data.listOfChildrenWithoutPOArray.length-1]){
                        console.log("last child name is " + childWithoutPO);
                        data.listOfChildrenWithoutPOString = data.listOfChildrenWithoutPO + " or "+childWithoutPO;
                    }
                    else if(childWithoutPO == data.listOfChildrenWithoutPOArray[0]){
                        data.listOfChildrenWithoutPOString = data.listOfChildrenWithoutPO + childWithoutPO;
                    }
                    else{
                        data.listOfChildrenWithoutPOString = data.listOfChildrenWithoutPO + ", " + childWithoutPO;
                    }
                }
            }
            if (data.ApplicantNeedsProtection == "y"){
                data.listOfPeopleWithPOString = data.ApplicantName;
                console.log("ApplicantNeedsProtection is "+ data.ApplicantNeedsProtection);
                console.log("listOfPeopleWithPOString is "+ data.listOfPeopleWithPOString);
                console.log("ApplicantName is "+ data.ApplicantName);

            }
            if (data.ApplicantNeedsProtection == "y" && data.listOfChildrenWithPO != undefined){
                data.listOfPeopleWithPOString = data.listOfPeopleWithPOString +", " +data.listOfChildrenWithPO;
            }
            else if (data.ApplicantNeedsProtection == "n" && data.listOfChildrenWithPO != undefined){
                data.listOfPeopleWithPOString = data.listOfChildrenWithPO;
            }
            if (data.listOfChildren != undefined){
                data.listOfPeopleString = data.listOfPeopleString +", " +data.listOfChildrenString;
            }

            console.log("appended child is " + data.listOfChildrenWithPOArray);
            console.log("appended children in string is " + data.listOfChildrenWithPO);
            console.log("people who need po are " + data.listOfPeopleWithPO);
            console.log("RespondentApplicantContactType are " + data.RespondentApplicantContactType);
            console.log("RespondentApplicantArrangeMethods are " + data.RespondentApplicantArrangeMethods);

            if (data.RespondentApplicantContactType !== undefined){
                for (let contactType of data.RespondentApplicantContactType){
                    if (contactType == data.RespondentApplicantContactType[0]){
                        data.contactTypeString = data.contactTypeString + contactType;
                    }
                    else if (contactType == data.RespondentApplicantContactType[data.RespondentApplicantContactType.length-1]){
                        data.contactTypeString = data.contactTypeString + " or " + contactType;
                    }
                    else {
                        data.contactTypeString = data.contactTypeString + ", " + contactType;
                    }
                }
            }
            if (data.RespondentApplicantArrangeMethods !== undefined){
                for (let ArrangeMethod of data.RespondentApplicantArrangeMethods){
                    if (ArrangeMethod == data.RespondentApplicantArrangeMethods[0]){
                        data.ArrangeMethodString = data.ArrangeMethodString + ArrangeMethod;
                    }
                    else if (ArrangeMethod == data.RespondentApplicantArrangeMethods[data.RespondentApplicantArrangeMethods.length-1]){
                        data.ArrangeMethodString = data.ArrangeMethodString + " and " + ArrangeMethod;
                    }
                    else {
                        data.ArrangeMethodString = data.ArrangeMethodString + ", " + ArrangeMethod;
                    }
                }
            }
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
            this.data = data;

            this.resultJson = JSON.stringify(data);
            console.log("resultJson is" + this.resultJson);

            this.resultJson = JSON.stringify(data);
            this.jsonObject = JSON.parse(this.resultJson);

            this.printUrl = this.dataService.getApiUrl('survey-print/' + this.cacheName);
        }
    }
}
