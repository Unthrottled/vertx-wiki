/**
 * Created by alex on 9/17/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var Page = (function () {
    function Page(pageFull) {
        this._id = pageFull._id;
        this._name = pageFull.name;
        this._markdown = pageFull.markdown;
    }

    Object.defineProperty(Page.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "markdown", {
        get: function () {
            return this._markdown;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=Page.model.js.map