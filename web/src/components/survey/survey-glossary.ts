import * as showdown from "showdown";
import { addQuestionTypes } from "./question-types";
const util = require('./js/util');
const glossaryJson = require('./glossary.json')

const terms = {};
var markdownConverter = new showdown.Converter({
  noHeaderId: true
});

export function loadGlossary() {
  const glossary = glossaryJson
  for (let k in glossary) {
    for (let term of k.split('/')) {
      terms[term.trim().toLowerCase()] = glossary[k];
    }
  }
  markdownConverter = new showdown.Converter({
    noHeaderId: true
  });
}

export function setGlossaryMarkdown(survey) {

  survey.onTextMarkdown.add((sender, options) => {
    let str = markdownConverter.makeHtml(options.text);
    let showMissingTerms = true;

    let m = str.match(/^<p>(.*)<\/p>$/);
    str = str.substring(3);
    if (m) {
      str = m[1];
    }
    
    str = str.replace(/<code>(.*?)<\/code>/g, (wholeMatch, m1) => {
      if (hasTerm(m1)) {
        // note: m1 is already html format

        return ('<b class="glossary-link">' + m1 + '<div class="tooltip" ><div class="tooltiptext">' + getTerm(m1, true) + '</div></div></b>')
      }
      if (showMissingTerms) {
        return "<code>" + m1 + "</code>";
      }
      return m1;
    });
    options.html = str;
  });
   
}

function getTerm(term, formatted?) {
  term = ("" + term).toLowerCase();
  let content = terms[term];
  if (formatted) content = formatHtml(content);
  return content;
}

function hasTerm(term) {
  return getTerm(term) !== undefined;
}

function formatHtml(content) {
  if (content !== undefined) {
    content = markdownConverter.makeHtml(content);
    content = content.replace(/<a ([^>]+)/g, function (a) {
      return a + ' target="_blank"';
    });
  }
  return content;
}

export function setCss(Survey) {
  addQuestionTypes(Survey);
  Survey.defaultBootstrapCss.page.root = "sv_page";
  Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
  Survey.defaultBootstrapCss.page.description = "sv_page_description";
  Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
  Survey.defaultBootstrapCss.page.title = "sv_page_title";
  Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
  Survey.defaultBootstrapCss.question.title = "sv_q_title";
  Survey.defaultBootstrapCss.question.description = "sv_q_description";
  Survey.defaultBootstrapCss.panel.description = "sv_p_description";
  Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-primary";
  Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-primary";
  Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic";
  Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
  Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
  Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
  Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
  Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
  Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
  Survey.StylesManager.applyTheme("bootstrap");
}

function registerTargets(container?: HTMLElement) {
  window.requestAnimationFrame(() => {
    doRegisterTargets(container);
  });
  // extra check for slower-rendering browser
  window.setTimeout(() => {
    doRegisterTargets(container);
  }, 2000);
}

function doRegisterTargets(container?: HTMLElement) {
  if (!container) container = document.body;
  let targets = container.querySelectorAll('[data-glossary]');
  for (const idx in targets) {
    let elt = targets[idx];
    let reg = elt.getAttribute('data-glossary-reg');
    if (!reg) {
      elt.setAttribute('data-glossary-reg', '1');
      let term = elt.getAttribute('data-glossary');
      let content = getTerm(term, true);
      if (content && window['addTooltip']) {
        window['addTooltip'](elt, content, { extClass: 'glossary-popup' });
      }
    }
  }
}