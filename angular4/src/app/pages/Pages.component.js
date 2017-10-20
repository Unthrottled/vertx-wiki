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
require("./pages.list.htm");
var auth_service_1 = require("../auth/auth.service");
var Pair_model_1 = require("./hex/Pair.model");
var PagesComponent = (function () {
    function PagesComponent(router, realRouter, authService) {
        this.router = router;
        this.realRouter = realRouter;
        this.authService = authService;
        this.pages = [];
    }
    PagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.pages = data.pages.pages.map(function (pageMin) { return new Pair_model_1.Pair(pageMin.name, pageMin.name); });
            _this.metaData = data.pages.metadata;
        });
    };
    PagesComponent.prototype.reRoute = function (pageName) {
        this.realRouter.navigate(['/page/' + pageName]);
    };
    PagesComponent.prototype.reRouteMain = function (pageNumber) {
        this.realRouter.navigate(['/pages/' + pageNumber]);
    };
    PagesComponent.prototype.hasPages = function () {
        return this.pages.length > 0;
    };
    PagesComponent.prototype.canCreate = function () {
        return this.authService.canCreate();
    };
    return PagesComponent;
}());
PagesComponent = __decorate([
    core_1.Component({
        selector: 'pages-list',
        template: require('./pages.list.htm')
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService])
], PagesComponent);
exports.PagesComponent = PagesComponent;
//# sourceMappingURL=Pages.component.js.map