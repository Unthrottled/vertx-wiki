"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * Created by alex on 9/17/17.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("./pages.list.htm");
var PagesComponent = (function () {
  function PagesComponent(router, realRouter) {
    this.router = router;
    this.realRouter = realRouter;
    this.pages = [];
  }

  PagesComponent.prototype.ngOnInit = function () {
    var _this = this;
    this.router.data.subscribe(function (data) {
      _this.pages = data.pages;
    });
  };
  PagesComponent.prototype.reRoute = function (pageName) {
    this.realRouter.navigate(['/page/' + pageName]);
  };
  return PagesComponent;
}());
PagesComponent = __decorate([
  core_1.Component({
    selector: 'pages-list',
    templateUrl: './templates/pages.list.htm'
  }),
  __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
], PagesComponent);
exports.PagesComponent = PagesComponent;
//# sourceMappingURL=Pages.component.js.map
