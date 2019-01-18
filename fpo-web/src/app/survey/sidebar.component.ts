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
  protected mode: string = 'edit';

  constructor(private injector: Injector) {
    // survey will be passed by the injector when instantiated by InsertComponent
    this.survey = <SurveyComponent>this.injector.get('survey');
    this.survey.onPageUpdate.subscribe(survey => {
      this.updateContent(survey, this.survey.surveyCompleted, this.survey.surveyMode);
    });
  }

  updateContent(model: SurveyModel, complete: boolean, mode: string) {
    if(model) {
      this.title = 'Application Steps'; // model.title;
      let links = [];
      model.visiblePages.forEach( (page, idx) => {
        links.push({
          disabled: false,
          index: idx,
          textIndex: '' + (idx + 1),
          title: page.title || page.name,
          current: mode === 'edit' && idx === model.currentPageNo});
      });
      links.push({
          disabled: ! complete,
          index: links.length,
          textIndex: '' + (links.length + 1),
          title: "Print Application Forms",
          current: mode === 'print',
          special: 'print',
          separate: true});
      this.links = links;
      this.mode = mode;
    }
  }

  changePage(pageNo: number) {
    this.survey.changePage(pageNo);
  }

  activateLink(link: any) {
    if(link && ! link.disabled) {
      if(link.special)
        this.survey.changeMode(link.special);
      else
        this.changePage(link.index);
    }
  }

  keyDown(event, link) {
    // allow space or enter to activate page
    if(event && (event.keyCode === 13 || event.keyCode === 32))
      this.activateLink(link);
  }

}
