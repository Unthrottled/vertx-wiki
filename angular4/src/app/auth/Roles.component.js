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
require("./roles.template.htm");
var RolesComponent = (function () {
    function RolesComponent() {
        this.permission = new core_1.EventEmitter();
        this.roleMap = {
            "admin": "view create delete update".split(' '),
            "editor": "view create delete update".split(' '),
            "writer": "view create".split(' '),
            "reader": "view".split(' '),
        };
        this.roles = ["admin", "editor", "writer", "reader"];
        this.model = {
            options: 'reader'
        };
    }
    RolesComponent.prototype.ngOnInit = function () {
        this.permission.emit(this.permissions);
    };
    Object.defineProperty(RolesComponent.prototype, "permissions", {
        get: function () {
            return this.roleMap[this.model.options];
        },
        enumerable: true,
        configurable: true
    });
    RolesComponent.prototype.setRole = function (role) {
        this.model.options = role;
        this.ngOnInit();
    };
    return RolesComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RolesComponent.prototype, "permission", void 0);
RolesComponent = __decorate([
    core_1.Component({
        selector: 'roles-input',
        templateUrl: 'templates/roles.template.htm'
    })
], RolesComponent);
exports.RolesComponent = RolesComponent;
//# sourceMappingURL=Roles.component.js.map