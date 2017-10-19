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
var UserPrincipal_model_1 = require("./auth/UserPrincipal.model");
var BaseComponent = (function () {
    function BaseComponent(userPrince) {
        this.userPrince = userPrince;
    }
    Object.defineProperty(BaseComponent.prototype, "userName", {
        get: function () {
            return this.userPrince.username;
        },
        enumerable: true,
        configurable: true
    });
    return BaseComponent;
}());
BaseComponent = __decorate([
    core_1.Component({
        selector: 'base-view',
        templateUrl: './templates/base.component.htm'
    }),
    __metadata("design:paramtypes", [UserPrincipal_model_1.UserPrincipal])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map