import { Component, Input } from '@angular/core';
import * as Survey from 'survey-angular';
import { addQuestionTypes } from './question-types';

@Component({
  selector: 'survey',
  template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`,
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent  {
  @Input() jsonData: any;
  @Input() onComplete: Function;

  ngOnInit() {
    addQuestionTypes(Survey);

    let surveyModel = new Survey.Model(this.jsonData);
    surveyModel.showQuestionNumbers = 'off';
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description small";
    Survey.defaultBootstrapCss.panel.title = "sv_p_title";
    Survey.defaultBootstrapCss.panel.container = "sv_p_container";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.row = "sv_row";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
    surveyModel.onComplete.add((sender, options) => {
      if(this.onComplete) this.onComplete(sender.data)
    });
    Survey.SurveyNG.render('surveyElement', { model: surveyModel });
  }
}

