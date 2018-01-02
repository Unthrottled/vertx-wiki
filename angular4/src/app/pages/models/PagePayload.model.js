"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Page_min_model_1 = require("./Page.min.model");
var StatusPayload_model_1 = require("./StatusPayload.model");
/**
 * Created by alex on 9/17/17.
 */
var PagePayload = /** @class */ (function (_super) {
    __extends(PagePayload, _super);
    function PagePayload(payload) {
        var _this = _super.call(this, payload) || this;
        _this._pages = [];
        _this._pages = payload.pages.map(function (pageMin) { return new Page_min_model_1.PageMin(pageMin); });
        _this._metadata = payload.metaData;
        return _this;
    }
    Object.defineProperty(PagePayload.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagePayload.prototype, "metadata", {
        get: function () {
            return this._metadata;
        },
        set: function (value) {
            this._metadata = value;
        },
        enumerable: true,
        configurable: true
    });
    return PagePayload;
}(StatusPayload_model_1.StatusPayload));
exports.PagePayload = PagePayload;
//# sourceMappingURL=PagePayload.model.js.map