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
 * Created by alex on 6/7/17.
 */
var core_1 = require("@angular/core");
require("./switch.component.htm");
var UserPrincipal_model_1 = require("../auth/UserPrincipal.model");
var Permissions_component_1 = require("../auth/Permissions.component");
var SwitchComponent = (function () {
    function SwitchComponent(token) {
        this.token = token;
        this.liveness = true;
    }
    Object.defineProperty(SwitchComponent.prototype, "enabled", {
        get: function () {
            return Permissions_component_1.Permissions.canActivate(this.token, 'update')
                .map(function (canDo) { return !canDo; });
        },
        enumerable: true,
        configurable: true
    });
    SwitchComponent.prototype.ngOnInit = function () {
    };
    SwitchComponent.prototype.change = function (value) {
    };
    return SwitchComponent;
}());
SwitchComponent = __decorate([
    core_1.Component({
        selector: 'dead-mans-switch',
        templateUrl: "./templates/switch.component.htm",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [UserPrincipal_model_1.UserPrincipal])
], SwitchComponent);
exports.SwitchComponent = SwitchComponent;
//# sourceMappingURL=switch.component.js.map