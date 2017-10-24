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
require("./page.htm");
var Pages_service_1 = require("./Pages.service");
var angular2_notifications_1 = require("angular2-notifications");
var BasePage_component_1 = require("./BasePage.component");
var EditPageComponent = (function (_super) {
    __extends(EditPageComponent, _super);
    function EditPageComponent(router, pagesService, notificationService, actualRouter) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.pagesService = pagesService;
        _this.notificationService = notificationService;
        _this.actualRouter = actualRouter;
        _this.editOptions = {
            hideDelete: false
        };
        return _this;
    }
    EditPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.load(data.pages);
        });
    };
    EditPageComponent.prototype.deleteMe = function () {
        var self = this;
        var returnGuy = this.pagesService
            .deletePage(this.page.name);
        returnGuy.subscribe(function (success) {
            if (success) {
                self.actualRouter.navigate(['/']);
            }
            else {
                self.failure();
            }
        }, function (error) { return self.failure(); });
        return returnGuy;
    };
    EditPageComponent.prototype.save = function () {
        var _this = this;
        var self = this;
        var returnGuy = this.pagesService
            .savePage(this.page.name, self.content);
        returnGuy.subscribe(function (success) {
            if (success) {
                _this.notificationService.success('Page Saved!', ':)', {
                    timeOut: 3000,
                    showProgressBar: true,
                    clickToClose: true
                });
                self.reset();
            }
            else {
                self.failure();
            }
        }, function (error) { return self.failure(); });
        return returnGuy;
    };
    EditPageComponent.prototype.reset = function () {
        var self = this;
        this.pagesService
            .fetchPage(self.page.name)
            .flatMap(function (pageFull) { return self.load(pageFull); })
            .subscribe(function (result) { return self.notificationService.success("Page Reloaded!", "Things might have changed!", {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        }); }, function (error) { return self.notificationService.error("Unable to Reset!", "Try again, or not, it may no work :/", {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        }); });
    };
    EditPageComponent.prototype.failure = function () {
        this.notificationService.error('Page NOT Saved!', ':( Try again.', {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        });
    };
    return EditPageComponent;
}(BasePage_component_1.BasePageComponent));
EditPageComponent = __decorate([
    core_1.Component({
        selector: 'wiki-page',
        template: require('./page.htm')
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, Pages_service_1.PagesService, angular2_notifications_1.NotificationsService, router_1.Router])
], EditPageComponent);
exports.EditPageComponent = EditPageComponent;
//# sourceMappingURL=EditPage.component.js.map