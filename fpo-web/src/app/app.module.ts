import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchBoxDirective } from './search-box/search-box.directive';
import { GeneralDataService } from 'app/general-data.service';
import { AdminModule } from 'app/admin/admin.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HomeComponent } from './home/home.component';

import { SurveyComponent } from './survey/survey.component';
import { SurveyPrimaryComponent } from './survey/primary.component';
import { SurveyTestComponent } from './survey/test.component';
//import { SurveyEditorComponent } from './survey/survey.editor.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxDirective,
    HomeComponent,
    BreadcrumbComponent,
    SurveyComponent,
    SurveyPrimaryComponent,
    SurveyTestComponent,
    //SurveyEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule,
    AdminModule,
  ],
  providers: [GeneralDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
