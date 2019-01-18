import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralDataService } from '../general-data.service';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class UserStatusComponent implements OnInit, OnDestroy {
  public error: string;
  public loading = true;
  private _preAccept = false;
  private _surveyIndex = [];
  public status: any;
  private statusSub = null;

  constructor(
    private dataService: GeneralDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.statusSub = this.dataService.subscribeUserInfo(this.updateInfo.bind(this));
    this.finishLogin(this.dataService.requireLogin(true));
  }

  updateInfo(status) {
    this.status = status;
  }

  ngOnDestroy() {
    if(this.statusSub) this.statusSub.unsubscribe();
  }

  get acceptedTerms(): boolean {
    return this.status && this.status.accepted_terms_at;
  }

  get loggedIn(): boolean {
    return this.status && this.status.user_id;
  }

  get preAccept(): boolean {
    return this._preAccept;
  }

  setPreAccept(val) {
    this._preAccept = val;
  }

  acceptTerms() {
    this.dataService.acceptTerms();
  }

  finishLogin(request) {
      return request
        .then((result) => { this.loading = false; this.loadSurveyIndex(); })
        .catch((err) => { this.loading = false; this.loadSurveyIndex(); });
  }

  get surveyIndex() {
    let index = [];
    if(this._surveyIndex) {
      for(let entry of this._surveyIndex) {
        if(entry.time) index.push(entry);
      }
      index.sort((a,b) => (b.time - a.time));
    }
    return index;
  }

  loadSurveyIndex() {
    return this.dataService.loadSurveyCache('primary', 'index', false)
      .then((result) => { this._surveyIndex = result.result || []; })
      .catch((err) => { this._surveyIndex = []; });
  }

  beginSurvey() {
    // clear most-recent survey cache
    return this.dataService.loadSurveyCache('primary', 'clear', false)
      .then((result) => { this.router.navigate(['prv/survey']); })
      .catch((err) => { this.router.navigate(['prv/survey']); });
  }

  resumeSurvey(key) {
    return this.dataService.loadSurveyCache('primary', key, false)
      .then((result) => { this.router.navigate(['prv/survey']); });
  }

  showPrintSurvey(key) {
    return this.dataService.loadSurveyCache('primary', key, false)
      .then((result) => { this.router.navigate(['prv/survey'], {fragment: 'print'}); });
  }

  removeSurvey(key) {
    return this.dataService.clearSurveyCache('primary', key)
      .then((result) => { this.loadSurveyIndex(); });
  }

  logout() {
    this.dataService.logout();
  }

  performLogin(demo_login?: string) {
    this.loading = true;
    this.finishLogin(this.dataService.loadUserInfo(demo_login));
  }

}
