import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'survey-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.scss']
})
export class SurveyPrimaryComponent implements OnInit {

  public cacheName: string;
  public showSidebar: boolean = true;
  public survey: any;
  public complete: Function;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let routeData = this.route.snapshot.data;
    this.survey = routeData.survey;
    this.cacheName = routeData.cache_name;
    if('show_sidebar' in routeData)
      this.showSidebar = routeData.show_sidebar;
    this.complete = (data) => this.onComplete(data);
  }

  onComplete(data) {
    if(this.route.snapshot.url[0].path === 'qualify') {
      let ok = (data.ExistingPOR === 'n') ? 'qualified' : 'unqualified';
      this.router.navigate(['result', ok]);
    }
  }

}
