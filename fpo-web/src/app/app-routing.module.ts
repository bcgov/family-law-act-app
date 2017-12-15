import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { SurveyPrimaryComponent } from 'app/survey/primary.component';
import { SurveyTestComponent } from 'app/survey/test.component';
import { SurveyResolver }   from 'app/survey/survey-resolver.service';

const routes: Routes = [
  {
    path: '',
    //children: []
    component: HomeComponent
  },
  {
    path: 'survey',
    component: SurveyPrimaryComponent,
    resolve: {
      survey: SurveyResolver,
    },
    data: {
      breadcrumb: 'Survey',
      survey_path: 'assets/survey-primary.json',
    }
  },
  {
    path: 'survey-test',
    component: SurveyTestComponent,
    data: {
      breadcrumb: 'Survey Test'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SurveyResolver]
})
export class AppRoutingModule { }
