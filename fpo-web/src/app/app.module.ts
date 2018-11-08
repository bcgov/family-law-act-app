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
import { GlossaryService } from './glossary/glossary.service';
import { GlossaryEditorComponent } from './glossary/editor.component';
import { InsertComponent } from './insert/insert.component';
import { InsertService } from './insert/insert.service';
import { StaticComponent } from './static/static.component';
import { HomeComponent } from './home/home.component';
import { TermsContentComponent } from './home/terms-content.component';
import { TermsViewComponent } from './home/terms.component';
import { UserStatusComponent } from './home/status.component';
import { UserStatusResolver } from './home/status-resolver.service';

import { SurveyComponent } from './survey/survey.component';
import { SurveyPrimaryComponent } from './survey/primary.component';
import { SurveyEditorComponent } from './survey/editor.component';
import { SurveySidebarComponent } from './survey/sidebar.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxDirective,
    HomeComponent,
    ResultComponent,
    BreadcrumbComponent,
    GlossaryEditorComponent,
    InsertComponent,
    SurveyComponent,
    SurveyPrimaryComponent,
    SurveyEditorComponent,
    SurveySidebarComponent,
    StaticComponent,
    TermsContentComponent,
    TermsViewComponent,
    UserStatusComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule,
    AdminModule,
  ],
  providers: [GeneralDataService, GlossaryService, InsertService, UserStatusResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
