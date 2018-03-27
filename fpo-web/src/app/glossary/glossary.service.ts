import { Injectable }  from '@angular/core';
import * as showdown from 'showdown';
import { GeneralDataService } from '../general-data.service';

@Injectable()
export class GlossaryService {
  terms = {}
  markdownConverter: any;

  constructor(
    private dataService: GeneralDataService
  ) {
    this.dataService.loadJson('assets/glossary.json', null, true)
      .then((data) => { this.terms = data; });
    this.markdownConverter = new showdown.Converter({
      noHeaderId: true
    });
  }

  getTerm(term: string, formatted?: boolean) {
    let content = this.terms[term];
    if(formatted) content = this.formatHtml(content);
    return content;
  }

  hasTerm(term: string): boolean {
    return this.getTerm(term) !== undefined;
  }

  formatHtml(content) {
    if(content !== undefined) {
      content = this.markdownConverter.makeHtml(content);
      // remove root paragraph <p></p>
      let m = content.match(/^<p>(.*)<\/p>$/m);
      if(m) {
        content = m[1];
      }
    }
    return content;
  }

  registerTargets(container?: HTMLElement) {
    if(! container) container = document.body;
    let targets = container.querySelectorAll('[data-glossary]');
    for(let idx = 0; idx < targets.length; idx++) {
      let elt = targets[idx];
      let reg = elt.getAttribute('data-glossary-reg');
      if(! reg) {
        elt.setAttribute('data-glossary-reg', '1');
        let term = elt.getAttribute('data-glossary');
        let content = this.getTerm(term, true);
        if(content) {
          window['addTooltip'](elt, content, {extClass: 'glossary'});
        }
      }
    }
  }
}
