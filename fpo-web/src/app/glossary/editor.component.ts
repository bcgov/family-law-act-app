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
  public newTermName = '';
  public newTermValue = '';
  public newTermHtml = '';

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
    for(let item of this._terms) {
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
    this.terms = terms;
  }

  get terms() {
    return this._terms.slice();
  }

  set terms(value) {
    let terms = value ? value.slice() : [];
    terms.sort((a, b) => a.term.localeCompare(b.term))
    for(let t = 0; t < terms.length; t++) {
      terms[t].index = t;
    }
    this._terms = terms;
  }

  updateTermName(evt, index) {
    let val = evt.target.value;
    if(index === null)
      this.newTermName = val;
    else if(this._terms[index])
      this._terms[index].term = val;
  }

  updateTermValue(evt, index, changed?: boolean) {
    if(this.updateIndex === index)
      clearTimeout(this.updateTimer);
    this.updateIndex = index;
    this.updateValue = evt.target.value;
    if(index === null)
      this.newTermValue = this.updateValue;
    if(changed) {
      this._terms[this.updateIndex].value = this.updateValue;
      this.updateHtml();
    } else {
      this.updateTimer = setTimeout(this.updateHtml.bind(this), 150);
    }
  }

  removeTerm(evt, index) {
    let upd = this.terms;
    upd.splice(index, 1);
    this.terms = upd;
    evt.preventDefault();
  }

  addTerm(evt) {
    let upd = this.terms;
    upd.push({
      term: this.newTermName,
      value: this.newTermValue,
      html: this.newTermHtml,
    });
    this.terms = upd;
    this.newTermName = '';
    this.newTermValue = '';
    this.newTermHtml = '';
    evt.preventDefault();
  }

  updateHtml() {
    let result = this.glossaryService.formatHtml(this.updateValue);
    if(this.updateIndex === null)
      this.newTermHtml = result;
    else if(this._terms[this.updateIndex])
      this._terms[this.updateIndex].html = result;
  }

}

