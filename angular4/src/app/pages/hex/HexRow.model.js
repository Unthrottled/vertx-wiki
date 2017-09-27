"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/27/17.
 */
var HexRowModel = (function () {
    function HexRowModel(pages, hexRowInput) {
        this._pages = [];
        this._pages = pages;
        this._hexRowInput = hexRowInput;
    }
    Object.defineProperty(HexRowModel.prototype, "pages", {
        get: function () {
            return this._pages;
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