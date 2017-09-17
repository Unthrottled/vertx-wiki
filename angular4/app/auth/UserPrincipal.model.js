/**
 * Created by alex on 9/16/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserPrincipal = (function () {
    function UserPrincipal(principal) {
        this._canView = principal.principal.canView;
        this._canCreate = principal.principal.canCreate;
        this._canUpdate = principal.principal.canUpdate;
        this._canDelete = principal.principal.canDelete;
        this._token = principal.token;
    }
    Object.defineProperty(UserPrincipal.prototype, "canView", {
        get: function () {
            return this._canView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPrincipal.prototype, "canCreate", {
        get: function () {
            return this._canCreate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPrincipal.prototype, "canDelete", {
        get: function () {
            return this._canDelete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPrincipal.prototype, "canUpdate", {
        get: function () {
            return this._canUpdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPrincipal.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    return UserPrincipal;
}());
exports.UserPrincipal = UserPrincipal;
//# sourceMappingURL=UserPrincipal.model.js.map