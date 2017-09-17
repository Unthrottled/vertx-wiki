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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var host_service_1 = require("../session/host.service");
var UserPrincipal_model_1 = require("./UserPrincipal.model");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var AuthService = (function () {
    function AuthService(http, hostService) {
        this.http = http;
        this.hostService = hostService;
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (user) {
        if (!this.currentPrincipal) {
            var self_1 = this;
            return this.http.post(this.hostService.fetchUrl() + 'api/token', user)
                .map(function (response) {
                return response && response.json ?
                    response.json() : '';
            })
                .map(function (json) { return new UserPrincipal_model_1.UserPrincipal(json); })
                .flatMap(function (prince) {
                self_1.currentPrincipal = new ReplaySubject_1.ReplaySubject(1);
                self_1.currentPrincipal.next(prince);
                self_1.isLoggedIn = true;
                return self_1.currentPrincipal;
            });
        }
        else {
            return this.currentPrincipal;
        }
    };
    AuthService.prototype.logout = function () {
        this.isLoggedIn = false;
        this.currentPrincipal = null;
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, host_service_1.HostService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map