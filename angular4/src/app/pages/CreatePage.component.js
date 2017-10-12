"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
require("./create.page.htm");
var Pages_service_1 = require("./Pages.service");
var angular2_notifications_1 = require("angular2-notifications");
var Observable_1 = require("rxjs/Observable");
var BasePage_component_1 = require("./BasePage.component");
var CreatePageComponent = (function (_super) {
    __extends(CreatePageComponent, _super);
    function CreatePageComponent(router, pagesService, notificationService, actualRouter) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.pagesService = pagesService;
        _this.notificationService = notificationService;
        _this.actualRouter = actualRouter;
        _this.editMode = true;
        return _this;
    }
    CreatePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.load(data.pages);
        });
    };
    CreatePageComponent.prototype.save = function () {
        var self = this;
        if (self.validTitle) {
            var returnGuy = this.pagesService
                .createPage(this.title, this.content);
            returnGuy.subscribe(function (success) {
                if (success) {
                    self.actualRouter.navigate(['/page/' + self.title]);
                }
                else {
                    self.failure();
                }
            }, function (error) { return self.failure(); });
            return;
        }
        else {
            self.failure();
            return Observable_1.Observable.of(false);
        }
    };
    CreatePageComponent.prototype.failure = function () {
        this.notificationService.error('Page NOT Saved!', ':( Try again.', {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        });
    };
    CreatePageComponent.prototype.reset = function () {
        this.actualRouter.navigate(['/']);
    };
    Object.defineProperty(CreatePageComponent.prototype, "validTitle", {
        get: function () {
            return this._validTitle;
        },
        set: function (value) {
            this._validTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    CreatePageComponent.prototype.titleValidationChange = function (delta) {
        this.validTitle = delta;
    };
    CreatePageComponent.prototype.titleChange = function (delta) {
        this.title = delta;
    };
    return CreatePageComponent;
}(BasePage_component_1.BasePageComponent));
CreatePageComponent = __decorate([
    core_1.Component({
        selector: 'new-page',
        templateUrl: './templates/create.page.htm'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, Pages_service_1.PagesService, angular2_notifications_1.NotificationsService, router_1.Router])
], CreatePageComponent);
exports.CreatePageComponent = CreatePageComponent;
//# sourceMappingURL=CreatePage.component.js.map