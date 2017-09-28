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
var HexRowComponent = HexRowComponent_1 = (function () {
    function HexRowComponent() {
        this._pages = [];
        this._hexWidth = 104;
        this._hexHeight = HexRowComponent_1.goldenRatio * this._hexWidth;
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
    Object.defineProperty(HexRowComponent.prototype, "needsOffset", {
        get: function () {
            return this.config ? !this.config.even : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexRowComponent.prototype, "hexHeight", {
        get: function () {
            return this._hexHeight;
        },
        set: function (value) {
            this._hexHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexRowComponent.prototype, "hexWidth", {
        get: function () {
            return this._hexWidth;
        },
        set: function (value) {
            this._hexWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    return HexRowComponent;
}());
HexRowComponent.goldenRatio = 0.576923077;
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
HexRowComponent = HexRowComponent_1 = __decorate([
    core_1.Component({
        selector: 'hex-row',
        templateUrl: './templates/hex-row.htm'
    }),
    __metadata("design:paramtypes", [])
], HexRowComponent);
exports.HexRowComponent = HexRowComponent;
var HexRowComponent_1;
//# sourceMappingURL=hex-row.component.js.map