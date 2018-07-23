import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GeneralDataService {
  private onUserInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userInfo: any = null;

  constructor(
    private http: Http,
    private platformLocation: PlatformLocation
  ) { }

  getBaseHref() : string {
    return this.platformLocation.getBaseHrefFromDOM() || '/';
  }

  getApiUrl(action: string) : string {
    return this.getBaseHref() + 'api/' + action;
  }

  loadJson(url: string, params?: any, headers?: any, relative?: boolean) : Promise<any> {
    if(! url)
      return Promise.reject('Cache name not defined');
    if(relative)
      url = this.getBaseHref() + url;
    return this.http.get(url, { params, headers, withCredentials: true })
      .map((x) => x.json())
      .toPromise()
      .catch((error: any) => {
        return Promise.reject(error.message || error);
      });
  }

  loadUserInfo(demo_login?: string) {
    let headers = null;
    if(demo_login !== undefined) {
      headers = new Headers({'X-DEMO-LOGIN': demo_login});
    }
    let url = this.getApiUrl('user-info');
    return this.loadJson(url, { t: new Date().getTime() }, headers)
      .then((result) => {
        this.returnUserInfo(result);
        return result;
      })
      .catch((error) => {
        this.returnUserInfo(null);
        return Promise.reject(error);
      });
  }

  logout() {
    if(this.userInfo && this.userInfo.demo_user) {
      // clear demo login cookie
      this.loadUserInfo('').then(() => {
        window.location.replace(this.getBaseHref());
      });
    } else {
      // redirect to siteminder logout URL
      // ...
    }
  }

  returnUserInfo(result) {
    console.log('user info:', result);
    this.userInfo = result;
    this.onUserInfo.next(result);
  }

  subscribeUserInfo(callb) {
    return this.onUserInfo.subscribe(callb);
  }

  requireLogin(no_terms?) {
    if(this.userInfo && this.userInfo.user_id && (no_terms || this.userInfo.accepted_terms_at)) {
      return Promise.resolve(this.userInfo);
    }
    return this.loadUserInfo().then((result) => {
        if(result && result.user_id) return result;
        return Promise.reject('Not logged in');
      });
  }

  acceptTerms() {
    let url = this.getApiUrl('accept-terms');
    return this.http.post(url, null, { withCredentials: true })
      .map((x) => x.json())
      .toPromise()
      .then((result) => this.loadUserInfo());
  }

  clearSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    if(useLocal) {
      let localKey = 'survey-' + name;
      window.localStorage.removeItem(localKey);
    }
    return this.saveSurveyCache(name, null, key);
  }

  loadSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    return this.loadJson(url, { t: new Date().getTime() })
      .then((result) => this.returnSurveyCache(name, result, null, useLocal))
      .catch((err) => this.returnSurveyCache(name, null, err, useLocal));
  }

  returnSurveyCache(name, result, err, useLocal?: boolean) {
    if((! result || ! result.key) && useLocal) {
      let localKey = 'survey-' + name;
      let cached = window.localStorage.getItem(localKey);
      if(cached) {
        cached = JSON.parse(cached);
        result = {'uid': null, 'local': true, 'key': null, 'result': cached};
      }
    }
    return result;
  }

  saveSurveyCache(name: string, data: object, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    let headers = new Headers({"Content-Type": "application/json"});
    let postData = data === null ? '' : JSON.stringify(data);
    let savedLocal = false;
    if(useLocal && postData) {
      let localKey = 'survey-' + name;
      window.localStorage.setItem(localKey, postData);
      savedLocal = true;
    }
    return this.http.post(url, postData, { headers, withCredentials: true })
      .map((result) => {
        let json = result.json();
        if(json && json.key) json.result = data;
        return json;
      })
      .toPromise()
      .catch((error: any) => {
        if(savedLocal) {
          return Promise.resolve({'uid': null, 'local': true, 'key': null, 'status': 'ok', 'result': data});
        }
        return Promise.reject(error.message || error);
      });
  }

}
