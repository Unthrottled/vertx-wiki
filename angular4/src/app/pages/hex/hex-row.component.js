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
var HexRowComponent = /** @class */ (function () {
    function HexRowComponent() {
        this.onClick = new core_1.EventEmitter();
        this._keyValues = [];
        this._hexWidth = 104;
        this._hexHeight = HexRowComponent_1.goldenRatio * this._hexWidth;
    }
    HexRowComponent_1 = HexRowComponent;
    Object.defineProperty(HexRowComponent.prototype, "keyValues", {
        get: function () {
            return this._keyValues;
        },
        set: function (value) {
            this._keyValues = value;
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
    Object.defineProperty(HexRowComponent.prototype, "needsOffset", {
        get: function () {
            return this.config ? !this.config.even : false;
        },
        enumerable: true,
        configurable: true
    });
    HexRowComponent.prototype.hexClicked = function (name) {
        this.onClick.emit(name);
    };
    HexRowComponent.goldenRatio = 0.576923077;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HexRowComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], HexRowComponent.prototype, "keyValues", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HexRowComponent.prototype, "config", null);
    HexRowComponent = HexRowComponent_1 = __decorate([
        core_1.Component({
            selector: 'hex-row',
            template: require('./hex-row.htm')
        }),
        __metadata("design:paramtypes", [])
    ], HexRowComponent);
    return HexRowComponent;
    var HexRowComponent_1;
}());
exports.HexRowComponent = HexRowComponent;
//# sourceMappingURL=hex-row.component.js.map