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
require("./titleCreation.htm");
var TitleValidation_service_1 = require("./TitleValidation.service");
var TitleCreationComponent = (function () {
    function TitleCreationComponent(titleValidationService, zone) {
        this.titleValidationService = titleValidationService;
        this.zone = zone;
        this._validTitle = false;
        this.onValidate = new core_1.EventEmitter();
    }
    Object.defineProperty(TitleCreationComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    TitleCreationComponent.prototype.validate = function (title) {
        var self = this;
        this.titleValidationService
            .isValid(title)
            .subscribe(function (valid) { return self.zone.run(function () { return self.validTitle = valid; }); }, function (error) { return console.warn('OOHHHHH SHIT ' + error); });
    };
    Object.defineProperty(TitleCreationComponent.prototype, "validTitle", {
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
    return TitleCreationComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TitleCreationComponent.prototype, "onValidate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TitleCreationComponent.prototype, "content", null);
TitleCreationComponent = __decorate([
    core_1.Component({
        selector: 'title-creation',
        templateUrl: './templates/titleCreation.htm'
    }),
    __metadata("design:paramtypes", [TitleValidation_service_1.TitleValidationService, core_1.NgZone])
], TitleCreationComponent);
exports.TitleCreationComponent = TitleCreationComponent;
//# sourceMappingURL=TitleCreation.component.js.map