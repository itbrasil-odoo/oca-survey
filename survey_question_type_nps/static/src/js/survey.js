/* Copyright 2018 ACSONE SA/NV
License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*/
odoo.define("survey_question_type_nps", function (require) {
    "use strict";
    var SurveyFormWidget = require("survey.form");
    SurveyFormWidget.include({
        events: _.extend({}, SurveyFormWidget.prototype.events, {
            "click .rate > label": "_onClickNPSLabel",
        }),
        _onClickNPSLabel: function (event) {
            if (this.readonly) {
                return;
            }
            var target = event.target;
            var label_items = $(target).parent().find("label");
            var value = label_items.length - $(target).index();
            label_items.removeClass("checked");
            $(target).addClass("checked");
            $(target).parent().find("input").val(value);
        },
        _prepareSubmitValues: function (formData, params) {
            this._super.apply(this, arguments);
            this.$("[data-question-type]").each(function () {
                switch ($(this).data("questionType")) {
                    case "nps_rate":
                        params[this.name] = this.value;
                        break;
                }
            });
        },
    });
});
