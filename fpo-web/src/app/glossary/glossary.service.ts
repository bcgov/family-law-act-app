import { Injectable }  from '@angular/core';
import * as showdown from 'showdown';
import { GeneralDataService } from '../general-data.service';

@Injectable()
export class GlossaryService {
  terms = {}
  markdownConverter: any;
  loaded: any;

  constructor(
    private dataService: GeneralDataService
  ) {
    this.loaded = this.dataService.loadJson('assets/glossary.json', null, null, true)
      .then((data: any) => {
        this.terms = {};
        for(let k in data) {
          for(let term of k.split('/')) {
            this.terms[term.trim().toLowerCase()] = data[k];
          }
        }
      });
    this.markdownConverter = new showdown.Converter({
      noHeaderId: true
    });
  }

  onLoaded(callback: Function) {
    this.loaded.then((result) => {
      callback(this);
      return result;
    }).catch((err) => {
      callback(this);
      return err;
    });
  }

  getTerm(term: string, formatted?: boolean) {
    term = (''+term).toLowerCase();
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
      /* let m = content.match(/^<p>(.*)<\/p>$/m);
      if(m) {
        content = m[1];
      }*/
      // open all links in new tab
      content = content.replace(/<a ([^>]+)/g, function(a) { return a + ' target="_blank"'; });
    }
    return content;
  }

  getAllTerms() {
    return Object.assign({}, this.terms);
  }

  registerTargets(container?: HTMLElement) {
    window.requestAnimationFrame(() => {
      this.doRegisterTargets(container);
    });
    // extra check for slower-rendering browser
    window.setTimeout(() => {
      this.doRegisterTargets(container);
    }, 2000);
  }

  doRegisterTargets(container?: HTMLElement) {
    if(! container) container = document.body;
    let targets = container.querySelectorAll('[data-glossary]');
    for(let idx = 0; idx < targets.length; idx++) {
      let elt = targets[idx];
      let reg = elt.getAttribute('data-glossary-reg');
      if(! reg) {
        elt.setAttribute('data-glossary-reg', '1');
        let term = elt.getAttribute('data-glossary');
        let content = this.getTerm(term, true);
        if(content && window['addTooltip']) {
          window['addTooltip'](elt, content, {extClass: 'glossary-popup'});
        }
      }
    }
  }
}
