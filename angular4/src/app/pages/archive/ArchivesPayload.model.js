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
var StatusPayload_model_1 = require("../models/StatusPayload.model");
var ArchivePageMin_1 = require("./ArchivePageMin");
/**
 * Created by alex on 9/17/17.
 */
var ArchivesPayload = /** @class */ (function (_super) {
    __extends(ArchivesPayload, _super);
    function ArchivesPayload(payload) {
        var _this = _super.call(this, payload) || this;
        _this._pages = [];
        _this._pages = payload.pages.map(function (pageMin) { return new ArchivePageMin_1.ArchivePageMin(pageMin); });
        _this._metadata = payload.metaData;
        return _this;
    }
    Object.defineProperty(ArchivesPayload.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArchivesPayload.prototype, "metadata", {
        get: function () {
            return this._metadata;
        },
        set: function (value) {
            this._metadata = value;
        },
        enumerable: true,
        configurable: true
    });
    return ArchivesPayload;
}(StatusPayload_model_1.StatusPayload));
exports.ArchivesPayload = ArchivesPayload;
//# sourceMappingURL=ArchivesPayload.model.js.map