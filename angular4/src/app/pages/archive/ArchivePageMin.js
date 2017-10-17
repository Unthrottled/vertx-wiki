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
var Page_min_model_1 = require("../Page.min.model");
var ArchivePageMin = (function (_super) {
    __extends(ArchivePageMin, _super);
    function ArchivePageMin(pageMin) {
        var _this = _super.call(this, pageMin.name) || this;
        _this._id = pageMin.id;
        return _this;
    }
    Object.defineProperty(ArchivePageMin.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return ArchivePageMin;
}(Page_min_model_1.PageMin));
exports.ArchivePageMin = ArchivePageMin;
//# sourceMappingURL=ArchivePageMin.js.map