import * as showdown from "showdown";
import { addQuestionTypes } from "@/components/question-types.ts";

export function setGlossaryMarkdown(survey) {

    var markdownConverter = new showdown.Converter({
        noHeaderId: true
    });

    survey.onTextMarkdown.add((sender, options) => {
        let str = markdownConverter.makeHtml(options.text);
        let showMissingTerms = true;

        let m = str.match(/^<p>(.*)<\/p>$/);
        str = str.substring(3);
        if (m) {
            str = m[1];
        }
        // // convert <code> into glossary tags: TODO
        str = str.replace(/<code>(.*?)<\/code>/g, (wholeMatch, m1) => {
            // if (this.hasTerm(m1)) {
            //   //       // note: m1 is already html format
            //   return (
            //     '<a href="#" class="glossary-link" data-glossary="' +
            //     m1 +
            //     '">' +
            //     m1 +
            //     "</a>"
            //   );
            // }
            if (showMissingTerms) {
                return "<code>" + m1 + "</code>";
            }
            return m1;
        });
        options.html = str;
    });
}

function getTerm(term, formatted) {
    term = ("" + term).toLowerCase();
    let content = this.terms[term];
    if (formatted) content = this.formatHtml(content);
    return content;
}

function hasTerm(term) {
    return this.getTerm(term) !== undefined;
}

function formatHtml(content) {
    if (content !== undefined) {
        content = this.markdownConverter.makeHtml(content);
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