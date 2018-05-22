import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralDataService } from '../general-data.service';
import * as html2pdf from 'html2pdf.js';

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
  public jsonObject: any;
  public data: any;

  public downloadPDF(){
    return xepOnline.Formatter.Format('template', {render: 'download', processPseudoElem: true});
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: GeneralDataService,
  ) { }

  ngOnInit() {
    window.html2pdf = html2pdf;

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
      if(data.ExistingCourt && data.ExistingCourt=="item1")
      { data.ExistingCourt = "Vancouver Robson Square"}
      else if(data.ExistingCourt && data.ExistingCourt=="item2"){
        data.ExistingCourt = "Victoria Law Court"
      }
      else{
        data.ExistingCourt = "etc"
      }
      this.data = data;
      this.resultJson = JSON.stringify(data);
      this.printUrl = this.dataService.getApiUrl('survey-print/' + this.cacheName);
    }
  }

  printPdf() {
    var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    var opt2 = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf(document.getElementsByClassName("printme")[1], opt);
    html2pdf(document.getElementsByClassName("mrgn-tp-lg")[0], opt2);
  }
}
