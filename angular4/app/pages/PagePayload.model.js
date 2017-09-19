"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page_min_model_1 = require("./Page.min.model");
/**
 * Created by alex on 9/17/17.
 */
var PagePayload = (function () {
    function PagePayload(payload) {
        this._pages = [];
        this._succeded = false;
        this._succeded = payload.success;
        this._pages = payload.pages.map(function (pageMin) { return new Page_min_model_1.PageMin(pageMin); });
    }
    Object.defineProperty(PagePayload.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagePayload.prototype, "succeded", {
        get: function () {
            return this._succeded;
        },
        enumerable: true,
        configurable: true
    });
    return PagePayload;
}());
exports.PagePayload = PagePayload;
//# sourceMappingURL=PagePayload.model.js.map