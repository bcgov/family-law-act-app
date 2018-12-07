
function fixCheckboxes(Survey) {
  var widget = {
    name: 'fixchecks',
    isFit: function(question) {
      var t = question.getType();
      return t === 'radiogroup' || t === 'checkbox' || t === 'matrix' || t === 'boolean';
    },
    isDefaultRender: true,
    afterRender: function(question, el) { // if(1) return;
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
        let label = undefined;
        for(let child of outer.children) {
          if(child.tagName.toLowerCase() === 'span') {
            if(child.className.indexOf('circle') < 0 && child.className.indexOf('check') < 0
             && child.className.indexOf('checkbox-material') < 0) {
              label = child;
              break;
            }
          }
        }
        if(question.getType() !== 'boolean' && label)
          label = label.children[0];
        let wrap = contain;
        if(wrap.tagName.toLowerCase() !== 'div') {
          wrap = document.createElement('div');
          if(question.getType() !== 'boolean')
            wrap.className = newInput.type;
          contain.insertBefore(wrap, outer);
          wrap.appendChild(outer);
        }
        wrap.insertBefore(newInput, outer);
        let newLabel = document.createElement('label');
        newLabel.setAttribute('for', newInput.id);
        if(label) {
          label.style.marginLeft = '0.3em';
          newLabel.appendChild(label);
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


function initHelpText(Survey) {
  var widget = {
    name: "helptext",
    title: "Expanding FAQ",
    iconName: "icon-panel",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "helptext";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("helptext", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("helptext", [
        {
          name: "body:text",
        }
      ]);
    },
    htmlTemplate: "<div></div>",
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
      icon.className = 'heading-icon fa fa-question-circle';
      let title = document.createElement('span');
      title.className = 'title-text';

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
      outer.appendChild(body);
      el.appendChild(outer);

      let updateContent = () => {
        let titleContent = question.fullTitle;
        title.innerHTML = titleContent;

        let bodyContent = question.body || '';
        let bodyHtml = question.getMarkdownHtml(bodyContent);
        if(bodyHtml !== null)
          body.innerHTML = question.getProcessedHtml(bodyHtml);
        else
          body.innerText = question.getProcessedHtml(bodyContent);
      }
      question.titleChangedCallback = updateContent;
      updateContent();

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


function initInfoText(Survey) {
  var widget = {
    name: "infotext",
    title: "Message Text",
    iconName: "icon-panel",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "infotext";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("infotext", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("infotext", [
        {
          name: "body:text",
        },
        {
          name: "messageStyle",
          'default': "info",
          choices: [
            "info",
            "error"
          ]
        }
      ]);
    },
    htmlTemplate: "<div></div>",
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let outer = document.createElement('div');
      let outerCls = 'panel panel-default survey-infotext expanded';
      if(question.messageStyle === 'error')
        outerCls += ' error';
      outer.className = outerCls;
      let header = document.createElement('div');
      header.className = 'panel-heading';
      let lbl = document.createElement('label');
      lbl.className = 'panel-title';

      let icon = document.createElement('span');
      if(question.messageStyle === 'error')
        icon.className = 'heading-icon fa fa-ban';
      else
        icon.className = 'heading-icon fa fa-info-circle';
      let title = document.createElement('span');
      title.className = 'title-text';
      lbl.appendChild(icon);
      lbl.appendChild(title);
      header.appendChild(lbl);
      outer.appendChild(header);

      let body = null;
      if(question.body) {
        body = document.createElement('div');
        body.className = 'panel-body';
        outer.appendChild(body);
      }

      if(question.isRequired && ! question.value) {
        let acceptRow = document.createElement('div');
        acceptRow.className = 'row accept-row';
        let cell = document.createElement('div');
        cell.className = 'col-sm-12'
        let acceptBtn = document.createElement('button');
        acceptBtn.className = 'btn btn-primary';
        let acceptLbl = document.createElement('span');
        acceptLbl.appendChild(document.createTextNode('Continue'));
        acceptBtn.appendChild(acceptLbl);
        acceptBtn.addEventListener('click', () => {
          question.value = 1;
          acceptRow.style.display = 'none';
        });
        cell.appendChild(acceptBtn);
        acceptRow.appendChild(cell);
        outer.appendChild(acceptRow);
      }

      el.appendChild(outer);

      let updateContent = () => {
        let titleContent = question.fullTitle;
        title.innerHTML = titleContent;

        if(body) {
          let bodyContent = question.body || '';
          let bodyHtml = question.getMarkdownHtml(bodyContent);
          if(bodyHtml !== null)
            body.innerHTML = question.getProcessedHtml(bodyHtml);
          else
            body.innerText = question.getProcessedHtml(bodyContent);
        }
      }
      question.titleChangedCallback = updateContent;
      updateContent();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}


function initYesNo(Survey) {
  var widget = {
    name: "yesno",
    title: "Yes/No",
    iconName: "icon-radiogroup",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "yesno";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("yesno", [], null, "empty");
    },
    htmlTemplate: "<div></div>",
    makeButton: function(question, opt) {
      let chk = document.createElement('input');
      chk.type = 'radio';
      chk.name = question.name;
      chk.value = opt.value;
      chk.checked = (question.value === opt.value);
      chk.onclick = function() {
        if((<HTMLInputElement>this).checked)
          question.value = opt.value;
      }
      opt.input = chk;
      let outer = document.createElement('label');
      outer.className = 'survey-yesno';
      outer.appendChild(chk);
      let div = document.createElement('span');
      div.className = 'survey-yesno-button';
      div.appendChild(document.createTextNode(opt.label));
      div.tabIndex = 0;
      div.setAttribute('role', 'button');
      if(opt.value === 'y')
        div.id = question.inputId; // allow auto focus
      div.onkeypress = function(evt) {
        if(evt.keyCode == 32) {
          chk.checked = true;
          question.value = opt.value;
          evt.preventDefault();
        }
      }
      outer.appendChild(div);
      opt.button = outer;
      return outer;
    },
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let choices = [
        {label: 'Yes', value: 'y', button: null, input: null},
        {label: 'No', value: 'n', button: null, input: null}
      ];
      for(let opt of choices) {
        let btn = this.makeButton(question, opt);
        el.appendChild(opt.button);
      }
      question.valueChangedCallback = function() {
        for(let opt of choices) {
          if(opt.value === question.value) opt.input.checked = true;
        }
      };
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}


function initAddressBlock(Survey) {
  var widget = {
    name: "address",
    title: "Postal Address",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "address";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("address", [
        {
          name: "referLabel:text",
        }
      ], null, "empty");
    },
    htmlTemplate: "<div></div>",
    provinceOptions: function() {
      return [
        {
         "value": "AB",
         "text": "Alberta"
        },
        {
         "value": "BC",
         "text": "British Columbia"
        },
        {
         "value": "MB",
         "text": "Manitoba"
        },
        {
         "value": "NB",
         "text": "New Brunswick"
        },
        {
         "value": "NF",
         "text": "Newfoundland and Labrador"
        },
        {
         "value": "NT",
         "text": "Northwest Territories"
        },
        {
         "value": "NS",
         "text": "Nova Scotia"
        },
        {
         "value": "NU",
         "text": "Nunavut"
        },
        {
         "value": "ON",
         "text": "Ontario"
        },
        {
         "value": "PE",
         "text": "Prince Edward Island"
        },
        {
         "value": "QC",
         "text": "Quebec"
        },
        {
         "value": "SK",
         "text": "Saskatchewan"
        },
        {
         "value": "YT",
         "text": "Yukon"
        }
      ];
    },
    countryOptions: function() {
      return [
        {
         "value": "CAN",
         "text": "Canada"
        },
        {
          "value": "USA",
          "text": "USA"
        }
      ];
    },
    prevAddrOptions: function(question) {
      let skipName = question.name;
      let survey = question.survey;
      let addrs = [];
      let seen = {};
      let otherQVal;
      for(let page of survey.pages) {
        for(let otherQ of page.questions) {
          if(otherQ.getType() === 'address' && otherQ.name !== skipName && (otherQVal = otherQ.value)) {
            let parts = [
              otherQVal.street,
              otherQVal.city,
              otherQVal.state,
              otherQVal.country,
              otherQVal.postcode,
            ];
            let lbl = parts.map(p => p.trim()).filter(p => p).join(', ');
            if(lbl && ! seen[lbl]) {
              seen[lbl] = 1;
              addrs.push({
                name: otherQ.name,
                label: lbl, // otherQ.referLabel,
                value: Object.assign({}, otherQ.value)
              });
            }
          }
        }
      }
      addrs.sort((a,b) => a.label.localeCompare(b.label));
      return addrs;
    },
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let outer = document.createElement('div');
      let outerCls = 'survey-address';
      let label;
      let row;
      let cell;
      outer.className = outerCls;

      let selOpts = this.prevAddrOptions(question);
      if(selOpts.length) {
        row = document.createElement('div');
        row.className = 'row survey-address-line';

        cell = document.createElement('div');
        cell.className = 'col-sm-6 form-inline';
        label = document.createElement('label');
        // FIXME - set label.for to province ID
        label.className = 'survey-sublabel';
        label.appendChild(document.createTextNode('Copy from: \u00a0 '));
        cell.appendChild(label);
        let selAddr = document.createElement('select');
        selAddr.className = 'form-control';
        var opt = document.createElement('option');
        opt.text = '(Select Address)';
        opt.value = '';
        selAddr.appendChild(opt);
        for(var selIdx in selOpts) {
          var selVal = selOpts[selIdx];
          var opt = document.createElement('option');
          opt.text = selVal.label;
          opt.value = selIdx;
          selAddr.appendChild(opt);
        }
        selAddr.onchange = function() {
          var selIdx = (<HTMLInputElement>this).value;
          if(selIdx.length) {
            var selAddr = selOpts[selIdx].value;
            question.value = selAddr;
          }
        }
        cell.appendChild(selAddr);
        row.appendChild(cell);
        outer.appendChild(row);
      }

      row = document.createElement('div');
      row.className = 'row survey-address-line';
      cell = document.createElement('div');
      cell.className = 'col-sm-12';
      row.appendChild(cell);
      let addr1 = document.createElement('input');
      addr1.className = 'form-control';
      addr1.placeholder = 'Street address, for example: 800 Hornby St.';
      addr1.id = question.inputId; // allow auto focus
      cell.appendChild(addr1);
      outer.appendChild(row);

      /*row = document.createElement('div');
      row.className = 'row survey-address-line';
      cell = document.createElement('div');
      cell.className = 'col-sm-12';
      row.appendChild(cell);
      let addr2 = document.createElement('input');
      addr2.className = 'form-control';
      addr2.placeholder = 'Second address line, if needed';
      cell.appendChild(addr2);
      outer.appendChild(row);*/

      row = document.createElement('div');
      row.className = 'row survey-address-line';

      cell = document.createElement('div');
      cell.className = 'col-sm-6';
      label = document.createElement('label');
      // FIXME - set label.for to city ID
      label.className = 'survey-sublabel';
      label.appendChild(document.createTextNode('City / Town'));
      cell.appendChild(label);
      let city = document.createElement('input');
      city.className = 'form-control';
      cell.appendChild(city);
      row.appendChild(cell);

      cell = document.createElement('div');
      cell.className = 'col-sm-6';
      label = document.createElement('label');
      // FIXME - set label.for to province ID
      label.className = 'survey-sublabel';
      label.appendChild(document.createTextNode('Province / State / Region'));
      cell.appendChild(label);
      let state = document.createElement('select');
      state.className = 'form-control';
      let stateOpts = this.provinceOptions();
      for(var province of stateOpts) {
        var opt = document.createElement('option');
        opt.text = province.text;
        opt.value = province.value;
        state.appendChild(opt);
      }
      cell.appendChild(state);
      row.appendChild(cell);

      outer.appendChild(row);

      row = document.createElement('div');
      row.className = 'row survey-address-line';

      cell = document.createElement('div');
      cell.className = 'col-sm-6';
      label = document.createElement('label');
      // FIXME - set label.for to province ID
      label.className = 'survey-sublabel';
      label.appendChild(document.createTextNode('Country'));
      cell.appendChild(label);
      let country = document.createElement('select');
      country.className = 'form-control';
      let countryOpts = this.countryOptions();
      for(var cval of countryOpts) {
        var opt = document.createElement('option');
        opt.text = cval.text;
        opt.value = cval.value;
        country.appendChild(opt);
      }
      cell.appendChild(country);
      row.appendChild(cell);

      cell = document.createElement('div');
      cell.className = 'col-sm-6';
      label = document.createElement('label');
      // FIXME - set label.for to postal code ID
      label.className = 'survey-sublabel';
      label.appendChild(document.createTextNode('Postal Code'));
      cell.appendChild(label);
      let postCode = document.createElement('input');
      postCode.className = 'form-control';
      cell.appendChild(postCode);
      row.appendChild(cell);

      outer.appendChild(row);

      el.appendChild(outer);

      function updateValue(evt) {
        let value = {
          'street': addr1.value,
          //'line2': addr2.value,
          'city': city.value,
          'state': state.value,
          'country': country.value,
          'postcode': postCode.value,
        }
        for(let k in value) {
          if(value[k] !== undefined && value[k].length) {
            question.value = value;
            return;
          }
        }
        question.value = null;
      }
      addr1.addEventListener('change', updateValue);
      //addr2.addEventListener('change', updateValue);
      city.addEventListener('change', updateValue);
      state.addEventListener('change', updateValue);
      country.addEventListener('change', updateValue);
      postCode.addEventListener('change', updateValue);

      question.valueChangedCallback = () => {
        let val = question.value || {};
        addr1.value = val.street || '';
        city.value = val.city || '';
        state.value = val.state || 'BC';
        country.value = val.country || 'CAN';
        postCode.value = val.postcode || '';
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}


function initNameBlock(Survey) {
  var widget = {
    name: "personname",
    title: "Person Name",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "personname";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("personname", [
        {
          name: "defaultSubstitution:text",
        }
      ], null, "empty");
    },
    getDisplayValue: function(question) {
      let name = question.value;
      if(name)
        return [name.first, name.middle, name.last].map(p => p.trim()).filter(p => p).join(' ');
      return question.defaultSubstitution;
    },
    htmlTemplate: "<div></div>",
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let outer = document.createElement('div');
      let outerCls = 'survey-personname';
      let label;
      let row;
      let cell;
      let input;
      let acceptLbl;
      let acceptRow;
      let acceptBtn;
      let cancelBtn;
      outer.className = outerCls;

      row = document.createElement('div');
      row.className = 'row';

      let fields = [
        {name: 'first', label: 'First Name', input: null},
        {name: 'middle', label: 'Middle Name(s)', input: null},
        {name: 'last', label: 'Last Name', input: null},
      ];
      let curVal : any;
      let checkAccept = function() {
        let visib = false;
        let qVal = question.value || {};
        if(curVal) {
          for(let field of fields) {
            if(qVal[field.name] !== curVal[field.name]) {
              visib = true;
              break;
            }
          }
        }
        acceptRow.style.display = visib ? 'block' : 'none';
        acceptLbl.innerText = question.value ? 'Update Name' : 'Continue';
      }
      let focused = false;
      let acceptTimeout = null;
      let acceptValue = function(evt) {
        question.value = curVal;
      }
      let updated = false;
      let updateValue = function(evt) {
        if(acceptTimeout) {
          clearTimeout(acceptTimeout);
          acceptTimeout = null;
        }
        let empty = true;
        curVal = {};
        for(let field of fields) {
          curVal[field.name] = field.input.value.trim();
          if(curVal[field.name].length)
            empty = false;
        }
        if(empty) curVal = null;
        checkAccept();
        if(question.value)
          updated = true;
      }
      let updateFocus = function(evt) {
        focused = evt.type == 'focus';
        if(acceptTimeout) {
          clearTimeout(acceptTimeout);
          acceptTimeout = null;
        }
        if(! focused && updated) {
          acceptTimeout = setTimeout(acceptValue, 1000);
        }
      }

      for(let field of fields) {
        cell = document.createElement('div');
        cell.className = 'col-sm-4';
        label = document.createElement('label');
        label.className = 'survey-sublabel';
        label.appendChild(document.createTextNode(field.label));
        cell.appendChild(label);
        input = document.createElement('input');
        input.className = 'form-control';
        if(field.name === 'first')
          input.id = question.inputId; // allow auto focus
        input.addEventListener('change', updateValue);
        input.addEventListener('input', updateValue);
        input.addEventListener('focus', updateFocus);
        input.addEventListener('blur', updateFocus);
        field.input = input;
        cell.appendChild(input);
        row.appendChild(cell);
      }

      outer.appendChild(row);

      acceptRow = document.createElement('div');
      acceptRow.style.display = 'none';
      acceptRow.className = 'row accept-row';
      cell = document.createElement('div');
      cell.className = 'col-sm-12'
      /*cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-default';
      cancelBtn.appendChild(document.createTextNode('Cancel'));
      cell.appendChild(cancelBtn);
      cell.appendChild(document.createTextNode(' '));
      cancelBtn.onclick = function() {
        question.valueChangedCallback();
        updateValue();
      }*/
      acceptBtn = document.createElement('button');
      acceptBtn.className = 'btn btn-primary';
      acceptLbl = document.createElement('span');
      acceptBtn.appendChild(acceptLbl);
      acceptBtn.addEventListener('click', acceptValue);
      cell.appendChild(acceptBtn);
      acceptRow.appendChild(cell);
      outer.appendChild(acceptRow);

      el.appendChild(outer);

      question.valueChangedCallback = () => {
        let val = question.value || {};
        for(let field of fields) {
          field.input.value = val[field.name] || '';
        }
        checkAccept();
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}


function initContactInfoBlock(Survey) {
  var widget = {
    name: "contactinfo",
    title: "Contact Info",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.getType() === "contactinfo";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("contactinfo", [
        {
          name: "emailLabel:text",
        },
        {
          name: "faxLabel:text",
        },
        {
          name: "phoneLabel:text",
        },
      ], null, "empty");
    },
    htmlTemplate: "<div></div>",
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let outer = document.createElement('div');
      let outerCls = 'survey-contactinfo';
      let label;
      let row;
      let cell;
      let input;
      outer.className = outerCls;

      row = document.createElement('div');
      row.className = 'row';

      let fields = [
        {name: 'phone', label: 'Phone', input: null},
        {name: 'email', label: 'Email', input: null},
        {name: 'fax', label: 'Fax', input: null},
      ];
      let updateValue = function() {
        let parts = {};
        for(let field of fields) {
          parts[field.name] = field.input.value.trim();
        }
        question.value = parts;
      }

      for(let field of fields) {
        let altLbl = field.name.toLowerCase() + 'Label';
        cell = document.createElement('div');
        cell.className = 'col-sm-4';
        label = document.createElement('label');
        label.className = 'survey-sublabel';
        label.appendChild(document.createTextNode(question[altLbl] || field.label));
        cell.appendChild(label);
        input = document.createElement('input');
        input.className = 'form-control';
        if(field.name === 'phone')
          input.id = question.inputId; // allow auto focus
        input.addEventListener('change', updateValue);
        field.input = input;
        cell.appendChild(input);
        row.appendChild(cell);
      }

      outer.appendChild(row);
      el.appendChild(outer);

      question.valueChangedCallback = () => {
        for(let field of fields) {
          field.input.value = question.value && question.value[field.name] || '';
        }
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}


function initCustomDate(Survey) {
  var widget = {
    name: "date",
    title: "Date Input",
    iconName: "icon-date",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question) {
      return question.inputType === "date";
    },
    activatedByChanged: function(activatedBy) {
    },
    htmlTemplate: "<div class=\"form-inline date-select\"></div>",
    monthOptions: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    afterRender: function(question, el) {
      while(el.childNodes.length)
        el.removeChild(el.childNodes[0]);

      let yearVal = '';
      let monthVal = '';
      let dayVal = '';

      let yearSel = document.createElement('select');
      let monthSel = document.createElement('select');
      let daySel = document.createElement('select');
      let updateDay = function() {
        while(daySel.childNodes.length > 1)
          daySel.removeChild(daySel.childNodes[1]);
        if(yearVal && monthVal) {
          let lastDay = (new Date(parseInt(yearVal, 10), parseInt(monthVal, 10), 0)).getDate();
          for(let day = 1; day <= lastDay; day++) {
            var opt = document.createElement('option');
            opt.text = ''+day;
            opt.value = ''+day;
            daySel.appendChild(opt);
          }
          if(dayVal && parseInt(dayVal, 10) > lastDay) {
            dayVal = '';
          }
        } else {
          dayVal = '';
        }
        daySel.value = dayVal;
      }
      let updateValue = function(evt?) {
        updateDay();
        if(yearVal && monthVal && dayVal) {
          let dt = '' + yearVal + '-';
          dt += (monthVal.length < 2 ? '0' : '') + monthVal;
          dt += '-' + (dayVal.length < 2 ? '0' : '') + dayVal;
          question.value = dt;
        } else {
          question.value = null;
        }
      }

      yearSel.className = 'form-control date-select-year';
      yearSel.id = question.inputId; // allow auto focus
      var opt = document.createElement('option');
      opt.text = '(Year)';
      opt.value = '';
      yearSel.appendChild(opt);
      let curYear = (new Date()).getFullYear();
      for(let yr = curYear; yr >= 1900; yr--) {
        var opt = document.createElement('option');
        opt.text = ''+yr;
        opt.value = ''+yr;
        yearSel.appendChild(opt);
      }
      yearSel.onchange = function() {
        yearVal = (<HTMLSelectElement>this).value;
        updateValue();
        monthSel.focus();
      }
      el.appendChild(yearSel);

      monthSel.className = 'form-control date-select-month';
      var opt = document.createElement('option');
      opt.text = '(Month)';
      opt.value = '';
      monthSel.appendChild(opt);
      for(let mo = 1; mo <= 12; mo ++) {
        var opt = document.createElement('option');
        opt.text = this.monthOptions[mo-1];
        opt.value = ''+mo;
        monthSel.appendChild(opt);
      }
      monthSel.onchange = function() {
        monthVal = (<HTMLSelectElement>this).value;
        updateValue();
        daySel.focus();
      }
      el.appendChild(document.createTextNode(' '));
      el.appendChild(monthSel);

      daySel.className = 'form-control date-select-day';
      var opt = document.createElement('option');
      opt.text = '(Day)';
      opt.value = '';
      daySel.appendChild(opt);
      daySel.onchange = function() {
        dayVal = (<HTMLSelectElement>this).value;
        updateValue();
      }
      el.appendChild(document.createTextNode(' '));
      el.appendChild(daySel);

      let loadValue = function() {
        if(question.value) {
          let dt = new Date(question.value + ' 00:00:00');
          if(dt) {
            yearVal = ''+dt.getFullYear();
            monthVal = ''+(dt.getMonth() + 1);
            dayVal = ''+dt.getDate();
          }
        }
        yearSel.value = yearVal;
        monthSel.value = monthVal;
        updateDay();
      };
      loadValue();
      question.valueChangedCallback = loadValue;
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "property");
}


export function addQuestionTypes(Survey) {
  //fixCheckboxes(Survey);
  initYesNo(Survey);
  initInfoText(Survey);
  initHelpText(Survey);
  initNameBlock(Survey);
  initAddressBlock(Survey);
  initContactInfoBlock(Survey);
  initCustomDate(Survey);
}

export function addToolboxOptions(editor) {
  editor.toolbox.addItem(
    {
      name: "yesno",
      title: "Yes/No Choice",
      category: "Custom",
      isCopied: true,
      iconName: "icon-radiogroup",
      json: {
        type: "yesno"
      }
    }
  );
  editor.toolbox.addItem(
    {
      name: "helptext",
      title: "Expanding FAQ",
      category: "Custom",
      isCopied: true,
      iconName: "icon-panel",
      json: {
        type: "helptext",
        titleLocation: "hidden"
      }
    }
  );
  editor.toolbox.addItem(
    {
      name: "infotext",
      title: "Message Text",
      category: "Custom",
      isCopied: true,
      iconName: "icon-panel",
      json: {
        type: "infotext",
        titleLocation: "hidden"
      }
    }
  );
  editor.toolbox.addItem(
    {
      name: "personname",
      title: "Name Input",
      category: "Custom",
      isCopied: true,
      iconName: "icon-multipletext",
      json: {
        type: "personname"
      }
    }
  );
  editor.toolbox.addItem(
    {
      name: "address",
      title: "Postal Address",
      category: "Custom",
      isCopied: true,
      iconName: "icon-multipletext",
      json: {
        type: "address"
      }
    }
  );
  editor.toolbox.addItem(
    {
      name: "contactinfo",
      title: "Contact Information",
      category: "Custom",
      isCopied: true,
      iconName: "icon-multipletext",
      json: {
        type: "contactinfo"
      }
    }
  );
}

