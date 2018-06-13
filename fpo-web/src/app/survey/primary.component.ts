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
            data.listOfPeopleWithPO = data.ApplicantName;
            data.contactTypeString = new String();
            data.ArrangeMethodString = new String();
            data.listOfChildrenWithoutPOString = new String();
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
            if (data.listOfChildrenWithPO != undefined){
                data.listOfPeopleWithPO = data.listOfPeopleWithPO +", " +data.listOfChildrenWithPO;
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
                        data.contactTypeString = data.contactTypeString + " and " + contactType;
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
