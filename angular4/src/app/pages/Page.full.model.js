"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/17/17.
 */
var LastModfied_model_1 = require("./LastModfied.model");
var PageFull = (function () {
    function PageFull(pageFull) {
        this._id = pageFull.id;
        this._name = pageFull.name;
        this._markdown = pageFull.markdown;
        this._html = pageFull.html;
        this._lastModified = new LastModfied_model_1.LastModified(pageFull.lastModified);
    }
    Object.defineProperty(PageFull.prototype, "lastModified", {
        get: function () {
            return this._lastModified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageFull.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageFull.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageFull.prototype, "markdown", {
        get: function () {
            return this._markdown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageFull.prototype, "html", {
        get: function () {
            return this._html;
        },
        enumerable: true,
        configurable: true
    });
    return PageFull;
}());
exports.PageFull = PageFull;
//# sourceMappingURL=Page.full.model.js.map