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
var StatusPayload_model_1 = require("./StatusPayload.model");
/**
 * Created by alex on 9/17/17.
 */
var ExistsPayload = /** @class */ (function (_super) {
    __extends(ExistsPayload, _super);
    function ExistsPayload(payload) {
        var _this = _super.call(this, payload) || this;
        _this._exists = false;
        _this._exists = payload.exists;
        return _this;
    }
    Object.defineProperty(ExistsPayload.prototype, "exists", {
        get: function () {
            return this._exists;
        },
        enumerable: true,
        configurable: true
    });
    return ExistsPayload;
}(StatusPayload_model_1.StatusPayload));
exports.ExistsPayload = ExistsPayload;
//# sourceMappingURL=ExistsPayload.model.js.map