"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/15/17.
 */
var User = (function () {
    function User(usrNm, pswd) {
        this.usrNm = usrNm;
        this.pswd = pswd;
        this._username = usrNm;
        this._password = pswd;
    }
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this._username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map