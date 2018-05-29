import { Component, Input } from '@angular/core';
import * as showdown from 'showdown';
import { GlossaryService } from '../glossary/glossary.service';

@Component({
  selector: 'glossary-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class GlossaryEditorComponent  {
  private _jsonData: any;
  private _ready = false;
  private _terms = [];
  public error: string;
  public loading = true;
  private markdownConverter: any;
  private updateIndex;
  private updateTimer;
  private updateValue;

  constructor(
    private glossaryService: GlossaryService
  ) {}

  ngOnInit() {
    this.glossaryService.onLoaded(() => {
      this.termsJson = this.glossaryService.getAllTerms();
      this._ready = true;
    });
  }

  get termsJson() {
    let json = {};
    for(let item of this.terms) {
      json[item.term] = item.value;
    }
    return json;
  }

  get jsonPretty() {
    return JSON.stringify(this.termsJson, null, 4);
  }

  @Input('termsJson')
  set termsJson(value) {
    this._jsonData = value;
    this._terms = [];
    let terms = [];
    let tval;
    for(let term in this._jsonData) {
      if(! term) continue;
      tval = this._jsonData[term];
      terms.push({
        term: term,
        value: tval,
        html: this.glossaryService.formatHtml(tval),
      })
    }
    terms.sort((a, b) => a.term.localeCompare(b.term))
    for(let t = 0; t < terms.length; t++) {
      terms[t].index = t;
    }
    this._terms = terms;
  }

  get terms() {
    return this._terms;
  }

  updateTerm(evt, index, changed) {
    if(this.updateIndex === index)
      clearTimeout(this.updateTimer);
    this.updateIndex = index;
    this.updateValue = evt.target.value;
    if(changed) {
      this.terms[this.updateIndex].value = this.updateValue;
      this.updateHtml();
    } else {
      this.updateTimer = setTimeout(this.updateHtml.bind(this), 150);
    }
  }

  updateHtml() {
    this.terms[this.updateIndex].html = this.glossaryService.formatHtml(this.updateValue);
  }

}

