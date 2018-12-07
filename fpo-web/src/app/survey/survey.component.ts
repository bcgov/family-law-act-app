import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Survey from 'survey-angular';
import * as showdown from 'showdown';
import { GeneralDataService } from '../general-data.service';
import { GlossaryService } from '../glossary/glossary.service';
import { InsertService } from '../insert/insert.service';
import { addQuestionTypes } from './question-types';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent  {
  private _jsonData: any;
  private _ready = false;
  @Input() cacheName: string;
  @Input() onComplete: Function;
  @Input() showSidebar = true;
  @Input() surveyPath: string;
  public cacheLoadTime: any;
  public cacheKey: string;
  public surveyCompleted = false;
  public surveyModel: Survey.SurveyModel;
  public onPageUpdate: BehaviorSubject<Survey.SurveyModel> = new BehaviorSubject<Survey.SurveyModel>(null);
  public error: string;
  public loading = true;
  private useMarkdown = true;
  private useLocalCache = false;
  private disableCache = false;
  private markdownConverter: any;
  private showMissingTerms = true;
  private prevPageIndex = null;

  constructor(
    private dataService: GeneralDataService,
    private insertService: InsertService,
    private glossaryService: GlossaryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.initSurvey();
    this.glossaryService.onLoaded(() => this.loadSurvey(true));
    if(this.showSidebar) {
      this.insertService.updateInsert('sidebar-left',
        {type: 'survey-sidebar', inputs: {survey: this}});
    }
  }

  initSurvey() {
    addQuestionTypes(Survey);
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description small";
    Survey.defaultBootstrapCss.panel.title = "sv_p_title";
    Survey.defaultBootstrapCss.panel.container = "sv_p_container";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.row = "sv_row";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
  }

  get surveyJson() {
    return this._jsonData;
  }

  @Input('surveyJson')
  set surveyJson(value) {
    this._jsonData = value;
    this.loadSurvey();
  }

  loadSurvey(ready?) {
    if(ready) this._ready = ready;
    if(this._jsonData) {
      this.loading = false;
      if(this._ready && ! this.surveyModel) {
        this.renderSurvey();
      }
    } else if(this.surveyPath) {
      this.dataService.loadJson(this.surveyPath).then((data) => {
        this.surveyJson = data;
      }); // .catch( (err) => ...)
    }
    // else this.error = 'Missing survey definition';
  }

  renderSurvey() {
    let surveyModel = new Survey.Model(this._jsonData);
    surveyModel.commentPrefix = 'Comment';
    surveyModel.showQuestionNumbers = 'off';
    surveyModel.showNavigationButtons = false;

    // Create showdown markdown converter
    if(this.useMarkdown) {
      this.markdownConverter = new showdown.Converter({
        noHeaderId: true
      });
      surveyModel.onTextMarkdown.add((survey, options) => {
        let str = this.markdownConverter.makeHtml(options.text);
        // remove root paragraph <p></p>
        let m = str.match(/^<p>(.*)<\/p>$/);
        if(m) {
          str = m[1];
        }
        // convert <code> into glossary tags
        str = str.replace(/<code>(.*?)<\/code>/g,
          (wholeMatch, m1) => {
            if(this.glossaryService.hasTerm(m1)) {
              // note: m1 is already html format
              return '<a href="#" class="glossary-link" data-glossary="' + m1 + '">' + m1 + '</a>';
            }
            if(this.showMissingTerms) {
              return '<code>' + m1 + '</code>';
            }
            return m1;
          });
        options.html = str;
      });
    }

    surveyModel.onComplete.add((sender, options) => {
      this.surveyCompleted = true;
      if(! this.disableCache)
        this.saveCache();
      if(this.onComplete) this.onComplete(sender.data)
    });
    surveyModel.onCurrentPageChanged.add((sender, options) => {
      this.onPageUpdate.next(sender);
      if(! this.disableCache && this.prevPageIndex !== sender.currentPageNo) {
        this.saveCache();
      }
      this.prevPageIndex = sender.currentPageNo;
    });
    surveyModel.onPageVisibleChanged.add((sender, options) => {
      this.onPageUpdate.next(sender);
    });
    surveyModel.onAfterRenderQuestion.add((sender, options) => {
      this.glossaryService.registerTargets(options.htmlElement);
    });

    this.surveyModel = surveyModel;
    Survey.SurveyNG.render('surveyElement', { model: surveyModel });

    // update sidebar
    this.onPageUpdate.next(surveyModel);

    // fetch previous survey results
    if(! this.disableCache) this.loadCache();
  }

  get isLoaded(): boolean {
    return !! this.surveyModel;
  }

  get isFirstPage(): boolean {
    return this.surveyModel ? this.surveyModel.isFirstPage : false;
  }

  get isLastPage(): boolean {
    return this.surveyModel ? this.surveyModel.isLastPage : false;
  }

  changePage(pageNo: number) {
    this.surveyModel.currentPageNo = pageNo;
  }

  prevPage() {
    this.surveyModel.prevPage();
  }

  nextPage() {
    this.surveyModel.nextPage();
  }

  complete() {
    this.surveyModel.completeLastPage();
  }

  resetCache() {
    if(this.surveyModel) {
      this.prevPageIndex = 0;
      this.surveyCompleted = false;
      this.surveyModel.data = {};
      this.surveyModel.currentPageNo = 0;
    }
    this.dataService.clearSurveyCache(this.cacheName, this.cacheKey, this.useLocalCache);
    this.cacheLoadTime = null;
    this.cacheKey = null;
  }

  loadCache() {
    this.dataService.loadSurveyCache(this.cacheName, this.cacheKey, this.useLocalCache)
      .then(this.doneLoadCache.bind(this));
  }

  doneLoadCache(response) {
    if(response && response.accept_terms) {
      this._router.navigate(['/prv/status']);
    }
    else if(response && response.result) {
      let cache = response.result;
      if(cache.data) {
        this.prevPageIndex = cache.page || 0;
        this.surveyModel.currentPageNo = this.prevPageIndex;
        this.surveyModel.data = cache.data;
        this.cacheLoadTime = cache.time;
        this.surveyCompleted = cache.completed || false;
        this.cacheKey = response.key;
      }
    }
  }

  saveCache() {
    let cache = {
      'time': new Date().getTime(),
      'data': this.surveyModel.data,
      'page': this.surveyModel.currentPageNo,
      'completed': this.surveyCompleted,
    };
    this.dataService.saveSurveyCache(this.cacheName, cache, this.cacheKey, this.useLocalCache)
      .then(this.doneSaveCache.bind(this))
      .catch((err) => this.doneSaveCache(null, err));
  }

  doneSaveCache(response, err?) {console.log(response);
    if(response && response.status === 'ok' && response.result) {
      this.cacheLoadTime = response.result.time;
      this.cacheKey = response.key;
    }
  }

  logout() {
    this.dataService.logout();
  }

}

