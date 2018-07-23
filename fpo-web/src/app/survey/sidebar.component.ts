import { Component, Injector, Input } from '@angular/core';
import { SurveyComponent } from './survey.component';
import { SurveyModel } from 'survey-angular';

@Component({
  selector: 'survey-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SurveySidebarComponent  {
  title: string;
  links: any[];
  private survey: SurveyComponent;

  constructor(private injector : Injector) {
    // survey will be passed by the injector when instantiated by InsertComponent
    this.survey = <SurveyComponent>this.injector.get('survey');
    this.survey.onPageUpdate.subscribe(survey => {
      this.updateContent(survey);
    });
  }

  updateContent(model : SurveyModel) {
    if(model) {
      this.title = 'Survey Steps'; // model.title;
      let links = [];
      model.visiblePages.forEach( (page, idx) => {
        links.push({
          disabled: false,
          index: idx,
          title: page.title || page.name,
          current: idx === model.currentPageNo});
      });
      this.links = links;
    }
  }

  changePage(pageNo: number) {
    this.survey.changePage(pageNo);
  }

  activateLink(link: any) {
    if(link && ! link.disabled) {
      this.changePage(link.index);
    }
  }

  keyDown(event, link) {
    // allow space or enter to activate page
    if(event && (event.keyCode === 13 || event.keyCode === 32))
      this.activateLink(link);
  }

}

