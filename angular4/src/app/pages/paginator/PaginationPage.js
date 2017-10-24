/**
 * Created by alex on 10/8/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaginationPage = (function () {
    function PaginationPage(_pageId) {
        this._pageId = _pageId;
    }
    Object.defineProperty(PaginationPage.prototype, "pageId", {
        get: function () {
            return this._pageId;
        },
        enumerable: true,
        configurable: true
    });
    PaginationPage.prototype.equals = function (otherPage) {
        return this._pageId === otherPage.pageId;
    };
    return PaginationPage;
}());
exports.PaginationPage = PaginationPage;
//# sourceMappingURL=PaginationPage.js.map