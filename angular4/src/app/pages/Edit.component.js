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
var router_1 = require("@angular/router");
require("./edit.htm");
var EditComponent = (function () {
    function EditComponent(router) {
        this.router = router;
        this.contentChange = new core_1.EventEmitter();
        this.onReset = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.options = {
            hideDelete: false
        };
    }
    Object.defineProperty(EditComponent.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditComponent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
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
            this.contentChange.emit(this._content);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    EditComponent.prototype.save = function () {
        this.onSave.emit(true);
    };
    EditComponent.prototype.reset = function () {
        this.onReset.emit(true);
    };
    EditComponent.prototype.deleted = function () {
        this.onDelete.emit(true);
    };
    return EditComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "contentChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "onReset", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditComponent.prototype, "onDelete", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], EditComponent.prototype, "enabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], EditComponent.prototype, "id", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], EditComponent.prototype, "content", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EditComponent.prototype, "options", null);
EditComponent = __decorate([
    core_1.Component({
        selector: 'edit-page',
        template: require('./edit.htm')
    }),
    __metadata("design:paramtypes", [router_1.Router])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=Edit.component.js.map