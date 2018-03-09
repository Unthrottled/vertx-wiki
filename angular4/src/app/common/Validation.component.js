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
 * Created by alex on 9/20/17.
 */
var core_1 = require("@angular/core");
require("./validation-field.htm");
var ValidationComponent = /** @class */ (function () {
    function ValidationComponent(zone) {
        this.zone = zone;
        this.onValidate = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this._validTitle = false;
        this._hideContent = false;
    }
    Object.defineProperty(ValidationComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
            this.onChange.emit(this._content);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationComponent.prototype, "validTitle", {
        get: function () {
            return this._validTitle;
        },
        set: function (value) {
            this._validTitle = value;
            this.onValidate.emit(this._validTitle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationComponent.prototype, "hideContent", {
        get: function () {
            return this._hideContent;
        },
        set: function (value) {
            this._hideContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationComponent.prototype, "placeHolder", {
        get: function () {
            return this._placeHolder;
        },
        set: function (value) {
            this._placeHolder = value;
        },
        enumerable: true,
        configurable: true
    });
    ValidationComponent.prototype.validate = function (title) {
        var self = this;
        this.validateContent(title)
            .subscribe(function (valid) { return self.zone.run(function () { return self.validTitle = valid; }); }, function (error) { return console.warn('OOHHHHH SHIT ' + error); });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ValidationComponent.prototype, "onValidate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ValidationComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ValidationComponent.prototype, "content", null);
    return ValidationComponent;
}());
exports.ValidationComponent = ValidationComponent;
//# sourceMappingURL=Validation.component.js.map