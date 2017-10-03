/**
 * Created by alex on 9/17/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var PageFull = (function () {
  function PageFull(pageMin) {
    this._id = pageMin.id;
    this._name = pageMin.name;
    this._markdown = pageMin.markdown;
    this._html = pageMin.html;
  }

  Object.defineProperty(PageFull.prototype, "id", {
    get: function () {
      return this._id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(PageFull.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(PageFull.prototype, "markdown", {
    get: function () {
      return this._markdown;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(PageFull.prototype, "html", {
    get: function () {
      return this._html;
    },
    enumerable: true,
    configurable: true
  });
  return PageFull;
}());
exports.PageFull = PageFull;
//# sourceMappingURL=Page.full.model.js.map
