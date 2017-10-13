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
require("./create.button.template.htm");
var auth_service_1 = require("../auth/auth.service");
var CreateComponent = (function () {
    function CreateComponent(authService) {
        this.authService = authService;
    }
    CreateComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(CreateComponent.prototype, "cantCreate", {
        get: function () {
            return this.authService.canCreate()
                .map(function (canCreate) { return !canCreate; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateComponent.prototype, "hideButton", {
        get: function () {
            return !this.authService.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    return CreateComponent;
}());
CreateComponent = __decorate([
    core_1.Component({
        selector: 'create-butt',
        templateUrl: 'templates/create.button.template.htm'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], CreateComponent);
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=create.button.component.js.map