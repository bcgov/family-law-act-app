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
  // restrict to browser cache - not database
  private browserOnly: boolean = true;

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

  getBrowserUser() {
    let userKey = 'temp-user';
    let sessionUser = sessionStorage.getItem(userKey);
    let user = null;
    try {
      user = sessionUser ? JSON.parse(sessionUser) : null;
    } catch(e) {
    }
    if(! user) {
      user = {
        accepted_terms_at: null, // "2018-09-14T05:46:24.165233Z",
        demo_user: true,
        surveys: [],
        user_id: userKey,
      };
      sessionStorage.setItem(userKey, JSON.stringify(user));
    }
    return user;
  }

  updateBrowserUser(params?: any) {
    let user = this.getBrowserUser();
    if(params)
      Object.assign(user, params);
    sessionStorage.setItem('temp-user', JSON.stringify(user));
  }

  clearSession() {
    sessionStorage.clear();
  }

  quickExit() {
    let div = document.createElement('div');
    div.style.background = '#fff';
    div.style.position = 'absolute';
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.right = '0px';
    div.style.bottom = '0px';
    div.style.zIndex = '999999';
    document.body.appendChild(div);
    this.clearSession();
    document.title = '';
    location.replace('https://www.google.com');
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
    if(this.browserOnly) {
      return new Promise(resolve => {
        try {
          let user = this.getBrowserUser();
          this.returnUserInfo(user);
          resolve(user);
        } catch(e) {
          console.error(e);
        }
      });
    } else {
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
          console.log("Error loading user information:", error);
          this.returnUserInfo(null);
          return Promise.reject(error);
        });
    }
  }

  logout() {
    if(this.browserOnly) {
      this.clearSession();
      window.location.replace(this.getBaseHref());
    }
    else if(this.userInfo && this.userInfo.demo_user) {
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
    if(this.browserOnly) {
      this.updateBrowserUser({accepted_terms_at: (new Date()).toString()});
      return this.loadUserInfo();
    } else {
      let url = this.getApiUrl('accept-terms');
      return this.http.post(url, null, { withCredentials: true })
        .map((x) => x.json())
        .toPromise()
        .then((result) => this.loadUserInfo());
    }
  }

  clearSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    let localKey = 'survey-' + name;
    if(this.browserOnly) {
      return new Promise(resolve => {
        if(key)
          sessionStorage.removeItem(localKey + '-key');
        let index = this.getLocalSurveyCache(name, 'index', true);
        index = index ? index.result.filter(x => x.key !== key) : [];
        sessionStorage.setItem(localKey + '-index', JSON.stringify(index));
        resolve(null);
      });
    }
    if(useLocal) {
      localStorage.removeItem(localKey);
    }
    return this.saveSurveyCache(name, null, key);
  }

  loadSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    if(this.browserOnly) {
      return this.loadUserInfo().then(info => {
        if(! info.accepted_terms_at && key !== 'index') {
          return {accept_terms: true};
        }
        return this.getLocalSurveyCache(name, key, true);
      });
    }
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    return this.loadJson(url, { t: new Date().getTime() })
      .then((result) => this.returnSurveyCache(name, key, result, null, useLocal))
      .catch((err) => this.returnSurveyCache(name, key, null, err, useLocal));
  }

  getLocalSurveyCache(name, key, session?) {
    let localKey = 'survey-' + name;
    let cached;
    if(session) {
      if(key === 'clear') {
        cached = sessionStorage.removeItem(localKey + '-latest');
        return;
      }
      if(! key)
        key = sessionStorage.getItem(localKey + '-latest');
      else if(key !== 'index')
        sessionStorage.setItem(localKey + '-latest', key);
      if(key)
        cached = sessionStorage.getItem(localKey + '-' + key);
    } else {
      cached = localStorage.getItem(localKey);
    }
    let result = null;
    if(cached) {
      cached = JSON.parse(cached);
      if(cached) {
        result = {'uid': null, 'local': true, 'key': key, 'result': cached};
      }
    }
    return result;
  }

  saveLocalSurveyCache(name, data, key, session?) {
    let localKey = 'survey-' + name;
    if(session) {
      if(! key)
        key = '' + Math.random();
      sessionStorage.setItem(localKey + '-' + key, JSON.stringify(data));
      let index = this.getLocalSurveyCache(name, 'index', true);
      index = index ? index.result.filter(x => x.key !== key) : [];
      let idxCopy = Object.assign({}, data);
      delete idxCopy['data'];
      idxCopy['key'] = key;
      index.push(idxCopy);
      sessionStorage.setItem(localKey + '-index', JSON.stringify(index));
      sessionStorage.setItem(localKey + '-latest', key);
      return key;
    } else {
      localStorage.setItem(localKey, JSON.stringify(data));
    }
  }

  returnSurveyCache(name, key, result, err, useLocal?: boolean) {
    if((! result || ! result.key) && useLocal) {
      result = this.getLocalSurveyCache(name, key);
    }
    return result;
  }

  saveSurveyCache(name: string, data: object, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    if(this.browserOnly) {
      key = this.saveLocalSurveyCache(name, data, key, true);
      return Promise.resolve({'uid': null, 'local': true, 'key': key, 'status': 'ok', 'result': data});
    }
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    let headers = new Headers({"Content-Type": "application/json"});
    let postData = data === null ? '' : JSON.stringify(data);
    let savedLocal = false;
    if(useLocal && postData) {
      this.saveLocalSurveyCache(name, data, key);
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
