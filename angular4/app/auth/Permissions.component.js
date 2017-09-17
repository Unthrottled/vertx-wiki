"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
/**
 * Created by alex on 9/17/17.
 */
var Permissions = (function () {
    function Permissions() {
    }
    Permissions.canActivate = function (userToken, path) {
        return Observable_1.Observable.of(Permissions.findPermisson(path, userToken));
    };
    Permissions.findPermisson = function (path, userToken) {
        switch (path) {
            case 'delete':
                return userToken.canDelete;
            case 'create':
                return userToken.canCreate;
            case 'update':
                return userToken.canUpdate;
            default:
                return userToken.canView;
        }
    };
    return Permissions;
}());
exports.Permissions = Permissions;
//# sourceMappingURL=Permissions.component.js.map