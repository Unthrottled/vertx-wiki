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
require("./hex-row.htm");
var HexRowComponent = (function () {
    function HexRowComponent() {
        this._pages = [];
    }
    Object.defineProperty(HexRowComponent.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        set: function (value) {
            this._pages = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexRowComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    return HexRowComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], HexRowComponent.prototype, "pages", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HexRowComponent.prototype, "config", null);
HexRowComponent = __decorate([
    core_1.Component({
        selector: 'hex-row',
        templateUrl: './templates/hex-list.htm'
    }),
    __metadata("design:paramtypes", [])
], HexRowComponent);
exports.HexRowComponent = HexRowComponent;
//# sourceMappingURL=hex-row.component.js.map