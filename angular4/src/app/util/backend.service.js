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
var PageFullPayload_model_1 = require("../pages/PageFullPayload.model");
var StatusPayload_model_1 = require("../pages/StatusPayload.model");
var ExistsPayload_model_1 = require("../pages/ExistsPayload.model");
var BackendService = (function () {
    function BackendService(http, userToken, hostService) {
        this.http = http;
        this.userToken = userToken;
        this.hostService = hostService;
    }
    BackendService.prototype.fetchAllPages = function () {
        return this.httpGet("api/pages")
            .map(function (response) { return new PagePayload_model_1.PagePayload(response.json()); });
    };
    BackendService.prototype.fetchPage = function (pageName) {
        return this.httpGet("api/pages/" + pageName)
            .map(function (response) { return new PageFullPayload_model_1.FullPagePayload(response.json()); });
    };
    BackendService.prototype.deletePage = function (pageName) {
        return this.httpDelete("api/page/" + pageName)
            .map(function (response) { return new StatusPayload_model_1.StatusPayload(response.json()); });
    };
    BackendService.prototype.pageExists = function (pageName) {
        return this.httpGet("api/exists/" + pageName)
            .map(function (response) { return new ExistsPayload_model_1.ExistsPayload(response.json()); });
    };
    BackendService.prototype.userExists = function (userName) {
        return this.httpGet("user/exists/" + userName)
            .map(function (response) { return new ExistsPayload_model_1.ExistsPayload(response.json()); });
    };
    BackendService.prototype.updatePage = function (pageName, pageBody) {
        return this.httpPut("api/pages", { "name": pageName, "markdown": pageBody })
            .map(function (response) { return new StatusPayload_model_1.StatusPayload(response.json()); });
    };
    BackendService.prototype.createPage = function (pageName, pageBody) {
        return this.httpPost("api/pages", { "name": pageName, "markdown": pageBody })
            .map(function (response) { return new StatusPayload_model_1.StatusPayload(response.json()); });
    };
    BackendService.prototype.httpGet = function (s) {
        return this.http.get(this.hostService.fetchUrl() + s, this.getRequestOptions());
    };
    BackendService.prototype.httpPut = function (s, body) {
        return this.http.put(this.hostService.fetchUrl() + s, body, this.getRequestOptions());
    };
    BackendService.prototype.httpDelete = function (s) {
        return this.http.delete(this.hostService.fetchUrl() + s, this.getRequestOptions());
    };
    BackendService.prototype.httpPost = function (s, body) {
        return this.http.post(this.hostService.fetchUrl() + s, body, this.getRequestOptions());
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