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
require("./app.component.htm");
var router_1 = require("@angular/router");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.versionNumber = "v1.1.4";
        this.loadEnd = new ReplaySubject_1.ReplaySubject(1);
        this.loadStart = new ReplaySubject_1.ReplaySubject(1);
        this.loading = new BehaviorSubject_1.BehaviorSubject(false);
        router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function () {
            _this.stopLoading();
        });
        router.events
            .filter(function (event) { return event instanceof router_1.NavigationStart; })
            .subscribe(function () {
            _this.startLoading();
        });
    }
    Object.defineProperty(AppComponent.prototype, "notLoading", {
        get: function () {
            return this.loading.map(function (b) { return !b; });
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.stopLoading = function () {
        this.loading.next(false);
        this.loadEnd.next(true);
    };
    AppComponent.prototype.startLoading = function () {
        this.loading.next(true);
        this.loadStart.next(true);
    };
    AppComponent.prototype.searchActivated = function () {
        this.startLoading();
    };
    AppComponent.prototype.searchFailed = function () {
        this.stopLoading();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular-application',
            template: require('./app.component.htm')
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map