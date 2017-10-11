"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LastModfied = (function () {
    function LastModfied(response) {
        this._userName = response.userName;
        this._timeStamp = new Date(response.timeStamp);
    }
    Object.defineProperty(LastModfied.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LastModfied.prototype, "timeStamp", {
        get: function () {
            return this._timeStamp;
        },
        enumerable: true,
        configurable: true
    });
    return LastModfied;
}());
exports.LastModfied = LastModfied;
//# sourceMappingURL=LastModfied.model.js.map