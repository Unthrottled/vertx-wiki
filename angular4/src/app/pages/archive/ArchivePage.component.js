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
require("./archived-page.htm");
var Pages_service_1 = require("../Pages.service");
var angular2_notifications_1 = require("angular2-notifications");
var BasePage_component_1 = require("../BasePage.component");
var auth_service_1 = require("../../auth/auth.service");
var ArchivePageComponent = (function (_super) {
    __extends(ArchivePageComponent, _super);

    function ArchivePageComponent(router, pagesService, notificationService, authService, actualRouter) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.pagesService = pagesService;
        _this.notificationService = notificationService;
        _this.authService = authService;
        _this.actualRouter = actualRouter;
        _this.editOptions = {
            hideDelete: false
        };
        return _this;
    }

    ArchivePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.load(data.pages);
        });
    };
    ArchivePageComponent.prototype.save = function () {
        var _this = this;
        var self = this;
        var returnGuy = this.pagesService
            .restorePage(this.page.id);
        returnGuy.subscribe(function (success) {
            if (success) {
                self.actualRouter.navigate(['page/' + _this.page.name]);
            }
            else {
                self.failure('): try again.');
            }
        }, function (error) {
            if (error.status == 500) {
                self.failure('Page already exists!');
            }
            else {
                self.failure('): try again.');
            }
        });
        return returnGuy;
    };
    ArchivePageComponent.prototype.reset = function () {
    };
    ArchivePageComponent.prototype.canCreate = function () {
        return this.authService.canCreate();
    };
    ArchivePageComponent.prototype.failure = function (message) {
        this.notificationService.error('Page NOT Restored!', message || ':( Try again.', {
            timeOut: 5000,
            showProgressBar: true,
            clickToClose: true
        });
    };
    return ArchivePageComponent;
}(BasePage_component_1.BasePageComponent));
ArchivePageComponent = __decorate([
    core_1.Component({
        selector: 'wiki-page-archive',
        template: require('./archived-page.htm')
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        Pages_service_1.PagesService,
        angular2_notifications_1.NotificationsService,
        auth_service_1.AuthService,
        router_1.Router])
], ArchivePageComponent);
exports.ArchivePageComponent = ArchivePageComponent;
//# sourceMappingURL=ArchivePage.component.js.map