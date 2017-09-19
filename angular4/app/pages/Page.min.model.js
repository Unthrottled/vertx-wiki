/**
 * Created by alex on 9/17/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageMin = (function () {
    function PageMin(pageMin) {
        this._id = pageMin.id;
        this._name = pageMin.name;
    }
    Object.defineProperty(PageMin.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageMin.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return PageMin;
}());
exports.PageMin = PageMin;
//# sourceMappingURL=Page.min.model.js.map