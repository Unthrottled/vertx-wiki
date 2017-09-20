"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page_full_model_1 = require("./Page.full.model");
/**
 * Created by alex on 9/17/17.
 */
var FullPagePayload = (function () {
    function FullPagePayload(payload) {
        this._succeded = false;
        this._succeded = payload.success;
        this._page = new Page_full_model_1.PageFull(payload);
    }
    Object.defineProperty(FullPagePayload.prototype, "page", {
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullPagePayload.prototype, "succeded", {
        get: function () {
            return this._succeded;
        },
        enumerable: true,
        configurable: true
    });
    return FullPagePayload;
}());
exports.FullPagePayload = FullPagePayload;
//# sourceMappingURL=PageFullPayload.model.js.map