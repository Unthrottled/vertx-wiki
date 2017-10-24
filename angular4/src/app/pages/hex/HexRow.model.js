"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/27/17.
 */
var HexRowModel = (function () {
    function HexRowModel(keyValues, hexRowInput) {
        this._keyValues = [];
        this._keyValues = keyValues;
        this._hexRowInput = hexRowInput;
    }
    Object.defineProperty(HexRowModel.prototype, "keyValues", {
        get: function () {
            return this._keyValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexRowModel.prototype, "hexRowInput", {
        get: function () {
            return this._hexRowInput;
        },
        enumerable: true,
        configurable: true
    });
    return HexRowModel;
}());
exports.HexRowModel = HexRowModel;
//# sourceMappingURL=HexRow.model.js.map