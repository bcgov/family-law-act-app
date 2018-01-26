import { Component, Input } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
    selector: 'survey',
    template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`,
})
export class SurveyComponent  {
    @Input() json: any;
    @Input() onComplete: Function;

    ngOnInit() {
        let surveyModel = new Survey.ReactSurveyModel(this.json);
        Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
        Survey.defaultBootstrapCss.question.title = "sv_q_title";
        Survey.defaultBootstrapCss.panel.title = "sv_p_title";
        Survey.defaultBootstrapCss.panel.description = "sv_p_description";
        Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
        Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
        Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not added?
        Survey.Survey.cssType = "bootstrap";
        surveyModel.onComplete.add((sender, options) => {
          if(this.onComplete) this.onComplete(sender.data)
        });
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });
        window['survey'] = surveyModel;
    }
}


function fixCheckboxes(Survey) {
  var widget = {
    name: "fixchecks",
    isFit: function(question) {
      var t = question.getType();
      return t === "radiogroup" || t === "checkbox" || t === "matrix";
    },
    isDefaultRender: true,
    afterRender: function(question, el) {
      let elts = el.getElementsByTagName('input');
      for(let idx = 0; idx < elts.length; idx++) {
        let input = elts[idx];
        if(input.type !== 'radio' && input.type !== 'checkbox')
          continue;
        let newInput = document.createElement('input');
        for(let k of input.getAttributeNames()) {
          newInput.setAttribute(k, input.getAttribute(k));
        }
        if(! newInput.id) {
          newInput.id = (newInput.name || question.name) + '-' + idx;
        }
        newInput.checked = input.checked;
        let outer = input.parentNode;
        let contain = outer.parentNode;
        let label = outer.getElementsByClassName('form-check-label')[0];
        let wrap = contain;
        if(wrap.tagName.toLowerCase() !== 'div') {
          wrap = document.createElement('div');
          wrap.className = newInput.type;
          contain.insertBefore(wrap, outer);
          wrap.appendChild(outer);
        }
        wrap.insertBefore(newInput, outer);
        let newLabel = document.createElement('label');
        newLabel.setAttribute('for', newInput.id);
        if(label && label.children.length) {
          label.children[0].style.marginLeft = '0.3em';
          newLabel.appendChild(label.children[0]);
        }
        wrap.insertBefore(newLabel, outer);
        wrap.removeChild(outer);

        newInput.addEventListener('click', (event) => {
          let target = (<HTMLInputElement>event.target);
          if (question.getType() === "matrix") {
            if(target.checked) {
              question.generatedVisibleRows.forEach(function(row, index, rows) {
                if (row.fullName === target.name) {
                  row.value = target.value;
                }
              });
            }
          } else if (question.getType() === "checkbox") {
            let oldValue = question.value || [];
            let index = oldValue.indexOf(target.value);
            if (index >= 0) {
              if(! target.checked) {
                oldValue.splice(index, 1);
                question.value = oldValue;
              }
            } else if(target.checked) {
              question.value = oldValue.concat([target.value]);
            }
          } else if(target.checked) {
            question.value = target.value;
          }
        });
      }

      question.valueChangedCallback = function() {
        if(question.getType() !== "matrix") {
          let values = question.value || [];
          if(! Array.isArray(values)) {
            values = [values];
          }
          let elts = el.getElementsByTagName('input');
          for(let i = 0; i < elts.length; i++) {
            elts[i].checked = values.indexOf(elts[i].value) >= 0;
          }
        } else {
          question.generatedVisibleRows.forEach(function(row, index, rows) {
            if(row.value) {
              let elts = el.getElementsByTagName('input');
              for(let i = 0; i < elts.length; i++) {
                if(elts[i].name === row.fullName && elts[i].value === row.value) {
                  elts[i].checked = true;
                }
              }
            }
          });
        }
      };

    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

fixCheckboxes(Survey);


function initHelpText(Survey) {
  var widget = {
    name: "helptext",
    isFit: function(question) {
      return question.getType() === "boolean";
    },
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let outer = document.createElement('div');
      let outerCls = 'panel panel-default survey-helptext';
      outer.className = outerCls;
      let header = document.createElement('div');
      header.className = 'panel-heading';
      let lbl = document.createElement('label');
      lbl.className = 'panel-title';
      let chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = !! question.value;
      chk.style.visibility = 'hidden';
      chk.style.width = '0px';
      chk.addEventListener('click', (event) => {
        let target = (<HTMLInputElement>event.target);
        question.value = target.checked;
      });
      let icon = document.createElement('span');
      icon.className = 'heading-icon fa fa-info-circle';
      let title = document.createElement('span');
      title.className = 'title-text';
      title.appendChild(document.createTextNode(question.title));
      let expander = document.createElement('span');
      expander.className = 'heading-expand fa fa-chevron-down';
      lbl.appendChild(chk);
      lbl.appendChild(icon);
      lbl.appendChild(title);
      lbl.appendChild(expander);
      header.appendChild(lbl);
      outer.appendChild(header);
      let body = document.createElement('div');
      body.className = 'panel-body';
      body.appendChild(document.createTextNode(question.label));
      outer.appendChild(body);
      el.appendChild(outer);

      question.valueChangedCallback = function() {
        outer.className = outerCls + (question.value ? ' expanded' : '');
        expander.className = 'heading-expand ' + (question.value ? 'fa fa-chevron-up' : 'fa fa-chevron-down');
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

initHelpText(Survey);


