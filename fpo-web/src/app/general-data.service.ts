import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GeneralDataService {

  constructor(
    private http: Http,
    private platformLocation: PlatformLocation
  ) { }

  getBaseHref() {
    return this.platformLocation.getBaseHrefFromDOM() || '/';
  }

  getApiUrl(action: string) {
    return this.getBaseHref() + 'api/' + action;
  }

  clearSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(useLocal) {
      let localKey = 'survey-' + name;
      window.localStorage.removeItem(localKey);
    }
  }

  loadSurveyCache(name: string, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    return this.http.get(url, { params: { t: new Date().getTime() } })
      .map((x) => x.json())
      .toPromise()
      .then((result) => {
        if(! result.key && useLocal) {
          let localKey = 'survey-' + name;
          let cached = window.localStorage.getItem(localKey);
          if(cached) {
            cached = JSON.parse(cached);
            return {'uid': null, 'local': true, 'key': null, 'result': cached};
          }
        }
        return result;
      })
      .catch((error: any) => {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
      });
  }

  saveSurveyCache(name: string, data: object, key?: string, useLocal?: boolean) {
    if(! name)
      return Promise.reject('Cache name not defined');
    let url = this.getApiUrl('survey-cache/' + encodeURIComponent(name));
    if(key) url += '/' + encodeURIComponent(key);
    let headers = new Headers({"Content-Type": "application/json"});
    let postData = JSON.stringify(data);
    if(useLocal) {
      let localKey = 'survey-' + name;
      window.localStorage.setItem(localKey, postData);
    }
    return this.http.post(url, postData, {headers})
      .map((x) => x.json())
      .toPromise()
      .catch((error: any) => {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
      });
  }

}
