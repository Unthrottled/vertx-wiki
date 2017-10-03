"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
      ({__proto__: []} instanceof Array && function (d, b) {
        d.__proto__ = b;
      }) ||
      function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
Object.defineProperty(exports, "__esModule", {value: true});
var Page_full_model_1 = require("./Page.full.model");
var StatusPayload_model_1 = require("./StatusPayload.model");
/**
 * Created by alex on 9/17/17.
 */
var FullPagePayload = (function (_super) {
  __extends(FullPagePayload, _super);
  function FullPagePayload(payload) {
    var _this = _super.call(this, payload) || this;
    _this._page = new Page_full_model_1.PageFull(payload);
    return _this;
  }

  Object.defineProperty(FullPagePayload.prototype, "page", {
    get: function () {
      return this._page;
    },
    enumerable: true,
    configurable: true
  });
  return FullPagePayload;
}(StatusPayload_model_1.StatusPayload));
exports.FullPagePayload = FullPagePayload;
//# sourceMappingURL=PageFullPayload.model.js.map
