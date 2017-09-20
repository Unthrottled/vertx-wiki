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
 * Created by alex on 9/17/17.
 */
var core_1 = require("@angular/core");
require("./edit.htm");
var EditComponent = (function () {
    function EditComponent() {
        this.enabledEmitter = new core_1.EventEmitter();
        this.contentEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(EditComponent.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
            this.enabledEmitter.emit(this._enabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
            this.contentEmitter.emit(this._content);
        },
        enumerable: true,
        configurable: true
    });
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "enabledEmitter", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "contentEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], EditComponent.prototype, "enabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], EditComponent.prototype, "content", null);
EditComponent = __decorate([
    core_1.Component({
        selector: 'edit-page',
        templateUrl: './templates/edit.htm'
    }),
    __metadata("design:paramtypes", [])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=Edit.component.js.map