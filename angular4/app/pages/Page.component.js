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
var router_1 = require("@angular/router");
require("./page.htm");
var PageComponent = (function () {
    function PageComponent(router) {
        this.router = router;
    }
    PageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.title = data.title;
            _this.content = data.content;
        });
    };
    return PageComponent;
}());
PageComponent = __decorate([
    core_1.Component({
        selector: 'wiki-page',
        templateUrl: './templates/page.htm'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], PageComponent);
exports.PageComponent = PageComponent;
//# sourceMappingURL=Page.component.js.map