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
/**
 * Created by alex on 9/15/17.
 */
var core_1 = require("@angular/core");
require("./base.component.htm");
var UserPrincipal_model_1 = require("../../auth/UserPrincipal.model");
var auth_service_1 = require("../../auth/auth.service");
var router_1 = require("@angular/router");
var BaseComponent = (function () {
    function BaseComponent(userPrince, authService, activatedRoute) {
        this.userPrince = userPrince;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
    }
    Object.defineProperty(BaseComponent.prototype, "userName", {
        get: function () {
            return this.userPrince.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "canDelete", {
        get: function () {
            return this.authService.canDelete();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "canUpdate", {
        get: function () {
            return this.authService.canUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "canCreate", {
        get: function () {
            return this.authService.canCreate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "cantDelete", {
        get: function () {
            return this.authService.cantDelete();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "cantUpdate", {
        get: function () {
            return this.authService.cantUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "cantCreate", {
        get: function () {
            return this.authService.cantCreate();
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) { return _this.pageNumber = params['pageNumber']; });
    };
    BaseComponent.prototype.firstPage = function () {
        return this.pageNumber.localeCompare("1") == 0;
    };
    return BaseComponent;
}());
BaseComponent = __decorate([
    core_1.Component({
        selector: 'base-view',
        template: require('./base.component.htm')
    }),
    __metadata("design:paramtypes", [UserPrincipal_model_1.UserPrincipal, auth_service_1.AuthService, router_1.ActivatedRoute])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map