"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LastModified = /** @class */ (function () {
    function LastModified(response) {
        this._userName = response.userName;
        this._timeStamp = new Date(response.timeStamp);
    }
    Object.defineProperty(LastModified.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LastModified.prototype, "timeStamp", {
        get: function () {
            return this._timeStamp;
        },
        enumerable: true,
        configurable: true
    });
    return LastModified;
}());
exports.LastModified = LastModified;
//# sourceMappingURL=LastModfied.model.js.map