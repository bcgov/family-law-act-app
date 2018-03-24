import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as SurveyKO from 'survey-knockout';
import * as SurveyEditor from 'surveyjs-editor';
import { addQuestionTypes, addToolboxOptions } from './question-types';
import { GeneralDataService } from '../general-data.service';

@Component({
  selector: 'survey-editor',
  templateUrl: './editor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../../node_modules/surveyjs-editor/surveyeditor.css',
    './editor.component.scss'
  ]
})
export class SurveyEditorComponent  {
  @Input() jsonData: any;
  @Input() cacheName: string;
  @Input() onComplete: Function;

  public cacheKey: string;
  public cacheLoadTime: any;
  public editor: SurveyEditor.SurveyEditor;
  private useLocalCache = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: GeneralDataService
  ) {}

  ngOnInit() {

    if(! this.jsonData) {
      this.jsonData = this.route.snapshot.data.survey;
    }
    if(! this.cacheName) {
      this.cacheName = this.route.snapshot.data.cache_name;
    }

    addQuestionTypes(SurveyKO);

    var editorOptions = {
      // showTestSurveyTab: false
    };
    this.editor = new SurveyEditor.SurveyEditor('editorElement', editorOptions);
    this.editor.isAutoSave = true;
    this.editor.saveSurveyFunc = (saveNo, callback) => {
      this.saveCache(callback);
    };
    addToolboxOptions(this.editor);
    this.initSurveyData();

    this.loadCache();
  }

  initSurveyData() {
    if(this.jsonData) {
      this.editor.text = JSON.stringify(this.jsonData, null, 2);
    }
  }

  resetCache() {
    this.dataService.clearSurveyCache(this.cacheName, this.cacheKey, this.useLocalCache);
    this.cacheLoadTime = null;
    this.cacheKey = null;
    this.initSurveyData();
  }

  loadCache() {
    this.dataService.loadSurveyCache(this.cacheName, this.cacheKey, this.useLocalCache)
      .then(this.doneLoadCache.bind(this));
  }

  doneLoadCache(response) {
    console.log('loaded cache', response);
    if(response && response.result) {
      let cache = response.result;
      if(cache.data) {
        this.cacheLoadTime = cache.time;
        this.editor.text = JSON.stringify(cache.data);
      }
    }
  }

  saveCache(saveNo?, callback?) {
    let survey = JSON.parse(this.editor.text);
    console.log('saving survey', survey);
    let cache = {
      'time': new Date().getTime(),
      'data': survey,
    };
    this.dataService.saveSurveyCache(this.cacheName, cache, this.cacheKey, this.useLocalCache)
      .then(
        (result) => this.doneSaveCache(result, null, saveNo, callback),
        (err) => this.doneSaveCache(null, err, saveNo, callback));
  }

  doneSaveCache(response, err, saveNo?, callback?) {
    console.log('saved cache', response);
    // save cache key to local cache?
    !!callback && callback(saveNo, ! err);
  }

}

