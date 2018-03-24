import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { ResultComponent } from 'app/result/result.component';
import { SurveyPrimaryComponent } from 'app/survey/primary.component';
import { SurveyTestComponent } from 'app/survey/test.component';
import { SurveyResolver }   from 'app/survey/survey-resolver.service';
import { SurveyEditorComponent } from 'app/survey/editor.component';

const routes: Routes = [
  {
    path: '',
    //children: []
    component: HomeComponent
  },
  {
    path: 'qualify',
    component: SurveyPrimaryComponent,
    resolve: {
      survey: SurveyResolver,
    },
    data: {
      breadcrumb: 'Prequalification Survey',
      survey_path: 'assets/survey-qualify.json',
    }
  },
  {
    path: 'prv',
    redirectTo: 'prv/survey'
  },
  {
    path: 'prv/survey',
    component: SurveyPrimaryComponent,
    resolve: {
      survey: SurveyResolver,
    },
    data: {
      breadcrumb: 'Provincial Family Test',
      cache_name: 'primary',
      survey_path: 'assets/survey-primary.json',
    }
  },
  {
    path: 'result/:state',
    component: ResultComponent,
    data: {
      breadcrumb: 'Survey Results'
    }
  },
  {
    path: 'prv/survey-test',
    component: SurveyTestComponent,
    data: {
      breadcrumb: 'Survey Test'
    }
  },
  { path: 'survey-editor',
    redirectTo: 'prv/survey-editor'
  },
  {
    path: 'prv/survey-editor',
    component: SurveyEditorComponent,
    resolve: {
      survey: SurveyResolver,
    },
    data: {
      breadcrumb: 'Survey Editor',
      cache_name: 'editor',
      survey_path: 'assets/survey-primary.json'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SurveyResolver]
})
export class AppRoutingModule { }
