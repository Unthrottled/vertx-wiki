"use strict";
/**
 * Created by alex on 9/17/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var StatusPayload = /** @class */ (function () {
    function StatusPayload(payload) {
        this._succeded = false;
        this._succeded = payload.success;
    }
    Object.defineProperty(StatusPayload.prototype, "succeded", {
        get: function () {
            return this._succeded;
        },
        enumerable: true,
        configurable: true
    });
    return StatusPayload;
}());
exports.StatusPayload = StatusPayload;
//# sourceMappingURL=StatusPayload.model.js.map