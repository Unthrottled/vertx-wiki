/**
 * Created by alex on 9/17/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var UserPrincipal_model_1 = require("../auth/UserPrincipal.model");
var host_service_1 = require("../session/host.service");
var PagePayload_model_1 = require("../pages/PagePayload.model");
var BackendService = (function () {
    function BackendService(http, userToken, hostService) {
        this.http = http;
        this.userToken = userToken;
        this.hostService = hostService;
    }
    BackendService.prototype.fetchAllPages = function () {
        return this.http.get(this.hostService.fetchUrl() + "api/pages", this.getRequestOptions())
            .map(function (response) { return new PagePayload_model_1.PagePayload(response.json()); });
    };
    BackendService.prototype.getRequestOptions = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.userToken.token);
        var returnVal = { headers: headers };
        return returnVal;
    };
    return BackendService;
}());
BackendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        UserPrincipal_model_1.UserPrincipal,
        host_service_1.HostService])
], BackendService);
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map