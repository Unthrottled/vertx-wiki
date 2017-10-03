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
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var user_model_1 = require("./user.model");
require("./register.template.htm");
var Subscriber_1 = require("rxjs/Subscriber");
var UserPrincipal_model_1 = require("./UserPrincipal.model");
var NewUser_model_1 = require("./NewUser.model");
var RegisterComponent = (function () {
    function RegisterComponent(authService, router, prince) {
        this.authService = authService;
        this.router = router;
        this.prince = prince;
        this.model = {
            permissions: {
                view: true
            }
        };
    }
    RegisterComponent.prototype.getUser = function () {
        return new user_model_1.User(this.model.username, this.model.password);
    };
    Object.defineProperty(RegisterComponent.prototype, "permissions", {
        get: function () {
            var _this = this;
            return Object.keys(this.model.permissions)
                .filter(function (key) { return _this.model.permissions[key]; })
                .map(function (key) { return key.toLowerCase(); });
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.getNewUser = function () {
        return new NewUser_model_1.NewUser(this.model.username, this.model.password, this.permissions);
    };
    RegisterComponent.prototype.login = function () {
        var _this = this;
        var self = this;
        this.authService.createPrincipal(this.getNewUser())
            .subscribe(Subscriber_1.Subscriber.create(function (succeded) {
            console.log(succeded);
            if (succeded) {
                self.authService.login(self.getUser())
                    .subscribe(Subscriber_1.Subscriber.create(function (succeded) {
                    if (succeded) {
                        // Set our navigation extras object
                        // that passes on our global query params and fragment
                        var navigationExtras = {
                            queryParamsHandling: 'preserve',
                            preserveFragment: true
                        };
                        _this.router.navigate(['/'], navigationExtras);
                    }
                }, function (e) { return console.log("OHHHH SHIIIITTTTTTTT" + e); }));
            }
            else {
            }
        }, function (error) {
        }));
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.authService.logout();
    };
    RegisterComponent.prototype.logout = function () {
        this.authService.logout();
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-form-guy',
        templateUrl: 'templates/register.template.htm'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, UserPrincipal_model_1.UserPrincipal])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map