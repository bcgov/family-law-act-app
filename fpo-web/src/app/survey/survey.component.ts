import { Component, Input } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
    selector: 'survey',
    template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`,
})
export class SurveyComponent  {
    @Input() json: any;
    @Input() onComplete: Function;

    ngOnInit() {
        let surveyModel = new Survey.ReactSurveyModel(this.json);
        Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
        Survey.Survey.cssType = "bootstrap";
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });
        surveyModel.onComplete.add((sender, options) => {
          if(this.onComplete) this.onComplete(sender.data)
        });
    }
}
