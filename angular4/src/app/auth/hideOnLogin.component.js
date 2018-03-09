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
var auth_service_1 = require("./auth.service");
require("./loginHider.template.htm");
var LoginHiderComponent = /** @class */ (function () {
    function LoginHiderComponent(authService) {
        this.authService = authService;
    }
    Object.defineProperty(LoginHiderComponent.prototype, "hideLogin", {
        get: function () {
            return this.authService.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    LoginHiderComponent = __decorate([
        core_1.Component({
            selector: 'login-hider',
            template: require('./loginHider.template.htm')
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], LoginHiderComponent);
    return LoginHiderComponent;
}());
exports.LoginHiderComponent = LoginHiderComponent;
//# sourceMappingURL=hideOnLogin.component.js.map