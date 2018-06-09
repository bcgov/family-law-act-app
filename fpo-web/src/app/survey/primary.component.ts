import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralDataService } from '../general-data.service';

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
<<<<<<< HEAD
  public data: any;
=======
  public jsonObject: any;

  public downloadPDF(){
    return xepOnline.Formatter.Format('template', {render: 'download', processPseudoElem: true});
  }
>>>>>>> 07724362a415cf78bc985f8312a1fd4b45010306

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
<<<<<<< HEAD

        //add additional data starts here
        data.listOfChildrenArray = [];
        data.listOfChildrenWithPOArray = [];
        data.listOfChildrenWithoutPOArray = [];
        data.listOfChildren = new String();
        data.listOfChildrenWithPO = new String();
        data.listOfPeopleWithPO = data.ApplicantName;
        data.contactTypeString = new String();
        data.ArrangeMethodString = new String();
        data.listOfChildrenWithoutPOString = new String();
        for (let child of data.ListOfChildren){
            console.log("Child is "+child["ChildName"]);
            if (child["ChildNeedsProtection"] == "y"){

                data.listOfChildrenWithPOArray.push(child["ChildName"]);

                // data.listOfChildrenWithPO.concat
            }
            else {
                data.listOfChildrenWithoutPOArray.push(child["ChildName"]);
            }
            // data.listOfChildren.push(child["ChildName"]);
        }
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
        if (data.listOfChildrenWithPO != null){
            data.listOfPeopleWithPO = data.listOfPeopleWithPO +", " +data.listOfChildrenWithPO;
        }
        if (data.listOfChildren != null){
            data.listOfPeople = data.listOfPeople +", " +data.listOfChildren;
        }

        console.log("appended child is " + data.listOfChildrenWithPOArray);
        console.log("appended children in string is " + data.listOfChildrenWithPO);
        console.log("people who need po are " + data.listOfPeopleWithPO);
        for (let contactType of data.RespondentApplicantContactType){
            if (contactType = data.RespondentApplicantContactType[0]){
                data.contactTypeString = data.contactTypeString + contactType;
            }
            else if (contactType = data.RespondentApplicantContactType[data.RespondentApplicantContactType.length-1]){
                data.contactTypeString = data.contactTypeString + " and " + contactType;
            }
            else {
                data.contactTypeString = data.contactTypeString + ", " + contactType;
            }
        }
        for (let ArrangeMethod of data.RespondentApplicantArrangeMethods){
            if (ArrangeMethod = data.RespondentApplicantContactType[0]){
                data.ArrangeMethodString = data.ArrangeMethodString + ArrangeMethod;
            }
            else if (ArrangeMethod = data.RespondentApplicantArrangeMethods[data.RespondentApplicantArrangeMethods.length-1]){
                data.ArrangeMethodString = data.ArrangeMethodString + " and " + ArrangeMethod;
            }
            else {
                data.ArrangeMethodString = data.ArrangeMethodString + ", " + ArrangeMethod;
            }
        }
        //add additional data ends here
        this.data = data;

        this.resultJson = JSON.stringify(data);
        console.log("resultJson is" + this.resultJson);
=======
      this.resultJson = JSON.stringify(data);
      this.jsonObject = JSON.parse(this.resultJson);
>>>>>>> 07724362a415cf78bc985f8312a1fd4b45010306
      this.printUrl = this.dataService.getApiUrl('survey-print/' + this.cacheName);
    }
  }

}
