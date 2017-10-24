"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array && function (d, b) {
            d.__proto__ = b;
        }) ||
        function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * Created by alex on 9/17/17.
 */
var LastModfied_model_1 = require("./LastModfied.model");
var Page_model_1 = require("./Page.model");
var PageFull = (function (_super) {
    __extends(PageFull, _super);

    function PageFull(pageFull) {
        var _this = _super.call(this, pageFull) || this;
        _this._lastModified = new LastModfied_model_1.LastModified(pageFull.lastModified);
        return _this;
    }

    Object.defineProperty(PageFull.prototype, "lastModified", {
        get: function () {
            return this._lastModified;
        },
        enumerable: true,
        configurable: true
    });
    return PageFull;
}(Page_model_1.Page));
exports.PageFull = PageFull;
//# sourceMappingURL=Page.full.model.js.map