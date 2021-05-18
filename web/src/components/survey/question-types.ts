import Vue from "vue";

import AddressInfo from "./components/AddressInfo.vue";
import ContactInfo from "./components/ContactInfo.vue";
import CustomDate from "./components/CustomDate.vue";
import HelpText from "./components/HelpText.vue";
import InfoText from "./components/InfoText.vue";
import PersonName from "./components/PersonName.vue";
import YesNo from "./components/YesNo.vue";

import InfoTextTitle from "./components/InfoTextTitle.vue";
import TextBeforeInputNumber from "./components/TextBeforeInputNumber.vue";
import MultipleTextInput from "./components/MultipleTextInput.vue"
import AdvancedRadioGroup from "./components/AdvancedRadioGroup.vue"
import MultipleCommentCheckbox from "./components/MultipleCommentCheckbox.vue"
import CustomButton from "./components/CustomButton.vue"

function fixCheckboxes(Survey: any) {
  const widget = {
    name: "fixchecks",
    isFit: function(question: any) {
      const t = question.getType();
      return (
        t === "radiogroup" ||
        t === "checkbox" ||
        t === "matrix" ||
        t === "boolean"
      );
    },
    isDefaultRender: true,
    afterRender: function(question: any, el: any) {
      // if(1) return;
      const elts = el.getElementsByTagName("input");
      for (let idx = 0; idx < elts.length; idx++) {
        const input = elts[idx];
        if (input.type !== "radio" && input.type !== "checkbox") continue;
        const newInput = document.createElement("input");
        for (const k of input.getAttributeNames()) {
          newInput.setAttribute(k, input.getAttribute(k));
        }
        if (!newInput.id) {
          newInput.id = (newInput.name || question.name) + "-" + idx;
        }
        newInput.checked = input.checked;
        const outer = input.parentNode;
        const contain = outer.parentNode;
        let label = undefined;
        for (const child of outer.children) {
          if (child.tagName.toLowerCase() === "span") {
            if (
              child.className.indexOf("circle") < 0 &&
              child.className.indexOf("check") < 0 &&
              child.className.indexOf("checkbox-material") < 0
            ) {
              label = child;
              break;
            }
          }
        }
        if (question.getType() !== "boolean" && label)
          label = label.children[0];
        let wrap = contain;
        if (wrap.tagName.toLowerCase() !== "div") {
          wrap = document.createElement("div");
          if (question.getType() !== "boolean") wrap.className = newInput.type;
          contain.insertBefore(wrap, outer);
          wrap.appendChild(outer);
        }
        wrap.insertBefore(newInput, outer);
        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", newInput.id);
        if (label) {
          label.style.marginLeft = "0.3em";
          newLabel.appendChild(label);
        }
        wrap.insertBefore(newLabel, outer);
        wrap.removeChild(outer);

        newInput.addEventListener("click", event => {
          const target = <HTMLInputElement>event.target;
          if (question.getType() === "matrix") {
            if (target.checked) {
              question.generatedVisibleRows.forEach(function(
                row: any,
                index: any,
                rows: any
              ) {
                if (row.fullName === target.name) {
                  row.value = target.value;
                }
              });
            }
          } else if (question.getType() === "checkbox") {
            const oldValue = question.value || [];
            const index = oldValue.indexOf(target.value);
            if (index >= 0) {
              if (!target.checked) {
                oldValue.splice(index, 1);
                question.value = oldValue;
              }
            } else if (target.checked) {
              question.value = oldValue.concat([target.value]);
            }
          } else if (target.checked) {
            question.value = target.value;
          }
        });
      }

      question.valueChangedCallback = function() {
        if (question.getType() !== "matrix") {
          let values = question.value || [];
          if (!Array.isArray(values)) {
            values = [values];
          }
          const inputElts = el.getElementsByTagName("input");
          for (let i = 0; i < inputElts.length; i++) {
            inputElts[i].checked = values.indexOf(inputElts[i].value) >= 0;
          }
        } else {
          question.generatedVisibleRows.forEach(function(
            row: any,
            index: any,
            rows: any
          ) {
            if (row.value) {
              const inputElts = el.getElementsByTagName("input");
              for (let i = 0; i < inputElts.length; i++) {
                if (
                  inputElts[i].name === row.fullName &&
                  inputElts[i].value === row.value
                ) {
                  inputElts[i].checked = true;
                }
              }
            }
          });
        }
      };
    },
    willUnmount: function(question: any, el: any) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initHelpText(Survey: any) {
  const widget = {
    name: "HelpText",
    title: "Expanding FAQ",
    iconName: "icon-panel",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "helptext";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("helptext", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("helptext", [
        {
          name: "body:text"
        }
      ]);
    }
  };

  Vue.component("HelpText", HelpText);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initInfoText(Survey: any) {
  const widget = {
    name: "InfoText",
    title: "Message Text",
    iconName: "icon-panel",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "infotext";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("infotext", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("infotext", [
        {
          name: "body:text"
        },
        {
          name: "messageStyle",
          default: "info",
          choices: ["info", "inline", "error","redinfo"]
        }
      ]);
    }
  };

  Vue.component("InfoText", InfoText);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initYesNo(Survey: any) {
  const widget = {
    name: "YesNo",
    title: "Yes/No",
    iconName: "icon-radiogroup",
    isDefaultRender: true,
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "yesno";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("yesno", [], null, "empty");
    }
  };

  Vue.component("YesNo", YesNo);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initAddressBlock(Survey: any) {
  const widget = {
    name: "AddressInfo",
    title: "Postal Address",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "address";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass(
        "address",
        [
          {
            name: "referLabel:text"
          }
        ],
        null,
        "empty"
      );
    }
  };

  Vue.component("AddressInfo", AddressInfo);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initPersonName(Survey: any) {
  const widget = {
    name: "PersonName",
    title: "Person Name",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "personname";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass(
        "personname",
        [
          {
            name: "defaultSubstitution:text"
          },
          {
            name: "labelFirstName:text"
          },
          {
            name: "labelMiddleName:text"
          },
          {
            name: "labelLastName:text"
          },
          {
            name: "descFirstName:text"
          },
          {
            name: "descMiddleName:text"
          },
          {
            name: "descLastName:text"
          }
        ],
        null,
        "empty"
      );
    },
    getDisplayValue: function(question: any) {
      const name = question.value;
      if (name)
        return [name.first, name.middle, name.last]
          .map(p => p.trim())
          .filter(p => p)
          .join(" ");
      return question.defaultSubstitution;
    }
  };

  Vue.component("PersonName", PersonName);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initContactInfoBlock(Survey: any) {
  const widget = {
    name: "ContactInfo",
    title: "Contact Info",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "contactinfo";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass(
        "contactinfo",
        [
          {
            name: "labelEmail:text"
          },
          {
            name: "labelFax:text"
          },
          {
            name: "labelPhone:text"
          }
        ],
        null,
        "empty"
      );
    }
  };

  Vue.component("ContactInfo", ContactInfo);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initCustomDate(Survey: any) {
  const widget = {
    name: "CustomDate",
    title: "Date Input",
    iconName: "icon-date",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.inputType === "date";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addProperties("text", [
        {
          name: "dateYearsAhead:number",
          default: 0
        },
        {
          name: "dateYearsBehind:number",
          default: 100
        }
      ]);
    }
  };

  Vue.component("CustomDate", CustomDate);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "property");
}
//_______________________________________________________________________________________
//_______________________________________ NEW CUSTOM ____________________________________
//_______________________________________________________________________________________

function initInfoTextTitle(Survey: any) {
  const widget = {
    name: "InfoTextTitle",
    title: "Message Text",
    iconName: "icon-panel",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "infotexttitle";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("infotexttitle", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("infotexttitle", [
        {
          name: "body:text"
        },
        {
          name: "messageStyle",
          default: "info",
          choices: ["info", "inline", "error","redinfo"]
        }
      ]);
    }
  };

  Vue.component("InfoTextTitle", InfoTextTitle);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initTextBeforeInputNumber(Survey: any) {
  const widget = {
    name: "TextBeforeInputNumber",
    title: "Text Before Input Number",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "textbeforeinputnumber";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("textbeforeinputnumber",[],null,"empty");    
      Survey.JsonObject.metaData.addProperties("textbeforeinputnumber", [
        {
          name: "textClass:text"
        },
        {
          name: "bodyText:text"
        },
        {
          name: "inputWidth:text"
        }
      ]);
    },
  };

  Vue.component("TextBeforeInputNumber", TextBeforeInputNumber);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initMultipleTextInput(Survey: any) {
  const widget = {
    name: "MultipleTextInput",
    title: "Multiple Text Input",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "multipletextinput";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("multipletextinput",[],null,"empty");    
      Survey.JsonObject.metaData.addProperties("multipletextinput", [        
        {
          name: "textClass:text"
        },
        {
          name: "inputNames:text"
        },
        {
          name: "inputTypes:text"
        },
        {
          name: "inputWidths:text"
        },
        {
          name: "textBeforeInputs:text"
        }
      ]);
    },
  };

  Vue.component("MultipleTextInput", MultipleTextInput);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initAdvancedRadioGroup(Survey: any) {
  const widget = {
    name: "AdvancedRadioGroup",
    title: "Advanced Radio Group",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "advancedradiogroup";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("advancedradiogroup",[],null,"empty");    
      Survey.JsonObject.metaData.addProperties("advancedradiogroup", [        
        {
          name: "textClass:text"
        },
        {
          name: "inputNames:text"
        },
        {
          name: "inputTypes:text"
        },
        {
          name: "inputWidths:text"
        },
        {
          name: "radioOutputValues:text"
        },
        {
          name: "textBeforeInputs:text"
        },
        {
          name: "radioTextMargins:text"
        },
        {
          name: "radioMargins:text"
        },
        {
          name: "hasOther:boolean"
        },
        {
          name: "otherText:text"
        },
      ]);
    },
  };

  Vue.component("AdvancedRadioGroup", AdvancedRadioGroup);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initMultipleCommentCheckbox(Survey: any) {
  const widget = {
    name: "MultipleCommentCheckbox",
    title: "Multiple Comment Checkbox",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "multiplecommentcheckbox";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("multiplecommentcheckbox",[],null,"empty");    
      Survey.JsonObject.metaData.addProperties("multiplecommentcheckbox", [        
        {
          name: "choices:[]"
        }
      ]);
    },
  };

  Vue.component("MultipleCommentCheckbox", MultipleCommentCheckbox);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

function initCustomButton(Survey: any) {
  const widget = {
    name: "CustomButton",
    title: "Custom Button",
    iconName: "icon-multipletext",
    widgetIsLoaded: function() {
      return true;
    },
    isFit: function(question: any) {
      return question.getType() === "custombutton";
    },
    activatedByChanged: function(activatedBy: any) {
      Survey.JsonObject.metaData.addClass("custombutton",[],null,"empty");    
      Survey.JsonObject.metaData.addProperties("custombutton", [        
        {
          name: "textClass:text"
        },
        {
          name: "buttonText:text"
        }
      ]);
    },
  };

  Vue.component("CustomButton", CustomButton);
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}
//__________________________________________________________________________________________________
// Returns 'y' or 'n', or 'u' for undefined and 'e' for error
function isChild(params: any) {
  if (!params && !params.length) return "u";
  const DOB = params[0];
  const MinorOrAdult = params[1];
  let dobReturn;
  let maReturn;
  const minYears = 19;

  if (DOB) {
    const now = new Date();
    const cmp = new Date(DOB);
    if (isNaN(cmp.getTime())) {
      dobReturn = "e";
    } else {
      dobReturn = "y";
      const yearDiff = now.getFullYear() - cmp.getFullYear();
      if (yearDiff > minYears) dobReturn = "n";
      else if (yearDiff === minYears) {
        if (cmp.getMonth() < now.getMonth()) dobReturn = "n";
        else if (
          cmp.getMonth() === now.getMonth() &&
          cmp.getDate() < now.getDate()
        )
          dobReturn = "n";
      }
    }
  }

  if (MinorOrAdult) {
    maReturn = MinorOrAdult === "Minor" ? "y" : "n";
  }

  if (!dobReturn && !maReturn) return "n";
  else if (dobReturn && !maReturn) return dobReturn;
  else if (!dobReturn && maReturn) return maReturn;
  else if (dobReturn === maReturn) return dobReturn;
  else return "e";
}

export function addQuestionTypes(Survey: any) {
  // fixCheckboxes(Survey);
  initYesNo(Survey);
  initInfoText(Survey);  
  initHelpText(Survey);
  initPersonName(Survey);
  initAddressBlock(Survey);
  initContactInfoBlock(Survey);
  initCustomDate(Survey);
  
  initInfoTextTitle(Survey);
  initTextBeforeInputNumber(Survey);
  initMultipleTextInput(Survey);
  initAdvancedRadioGroup(Survey);
  initMultipleCommentCheckbox(Survey);
  initCustomButton(Survey);

  Survey.FunctionFactory.Instance.register("isChild", isChild);
}

export function addToolboxOptions(editor: any) {
  editor.toolbox.addItem({
    name: "yesno",
    title: "Yes/No Choice",
    category: "Custom",
    isCopied: true,
    iconName: "icon-radiogroup",
    json: {
      type: "yesno"
    }
  });
  editor.toolbox.addItem({
    name: "helptext",
    title: "Expanding FAQ",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "helptext",
      titleLocation: "hidden"
    }
  });
  editor.toolbox.addItem({
    name: "infotext",
    title: "Message Text",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "infotext",
      titleLocation: "hidden"
    }
  });  
  editor.toolbox.addItem({
    name: "personname",
    title: "Name Input",
    category: "Custom",
    isCopied: true,
    iconName: "icon-multipletext",
    json: {
      type: "personname"
    }
  });
  editor.toolbox.addItem({
    name: "address",
    title: "Postal Address",
    category: "Custom",
    isCopied: true,
    iconName: "icon-multipletext",
    json: {
      type: "address"
    }
  });
  editor.toolbox.addItem({
    name: "contactinfo",
    title: "Contact Information",
    category: "Custom",
    isCopied: true,
    iconName: "icon-multipletext",
    json: {
      type: "contactinfo"
    }
  });

  editor.toolbox.addItem({
    name: "infotexttitle",
    title: "Message Text",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "infotexttitle",
      titleLocation: "hidden"
    }
  });

  editor.toolbox.addItem({
    name: "textbeforeinputnumber",
    title: "Text Before Input Number",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "textbeforeinputnumber",
      titleLocation: "hidden"
    }
  });

  editor.toolbox.addItem({
    name: "multipletextinput",
    title: "Multiple Text Input",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "multipletextinput",
      titleLocation: "hidden"
    }
  });

  editor.toolbox.addItem({
    name: "advancedradiogroup",
    title: "Advanced Radio Group",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "advancedradiogroup",
      titleLocation: "hidden"
    }
  });

  editor.toolbox.addItem({
    name: "multiplecommentcheckbox",
    title: "Multiple Comment Checkbox",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "multiplecommentcheckbox",
      titleLocation: "hidden"
    }
  });

  editor.toolbox.addItem({
    name: "custombutton",
    title: "Custom Button",
    category: "Custom",
    isCopied: true,
    iconName: "icon-panel",
    json: {
      type: "custombutton",
      titleLocation: "hidden"
    }
  });

}
