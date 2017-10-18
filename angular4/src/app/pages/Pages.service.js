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
var Observable_1 = require("rxjs/Observable");
var backend_service_1 = require("../util/backend.service");
var Page_model_1 = require("./Page.model");
var PagesService = (function () {
    function PagesService(backendService) {
        this.backendService = backendService;
    }
    PagesService.prototype.fetchAllMinPages = function (pageNumber) {
        return this.backendService.fetchAllPages(pageNumber);
    };
    PagesService.prototype.fetchAllArchivedPages = function (pageNumber) {
        return this.backendService.fetchAllArchives(pageNumber);
    };
    PagesService.prototype.fetchPage = function (pageName) {
        return this.backendService.fetchPage(pageName)
            .map(function (pagePayload) { return pagePayload.page; });
    };
    PagesService.prototype.fetchArchivedPage = function (pageId) {
        return this.backendService.fetchArchivedPage(pageId)
            .map(function (pagePayload) { return pagePayload.page; });
    };
    PagesService.prototype.savePage = function (pageName, pageContent) {
        return this.backendService.updatePage(pageName, pageContent)
            .map(function (statusPayload) { return statusPayload.succeded; });
    };
    PagesService.prototype.createPage = function (pageName, pageContent) {
        return this.backendService.createPage(pageName, pageContent)
            .map(function (statusPayload) { return statusPayload.succeded; });
    };
    PagesService.prototype.deletePage = function (pageName) {
        return this.backendService.deletePage(pageName)
            .map(function (statusPayload) { return statusPayload.succeded; });
    };
    PagesService.prototype.restorePage = function (pageId) {
        return this.backendService.deletePage(pageId)
            .map(function (statusPayload) { return statusPayload.succeded; });
    };
    PagesService.prototype.freshPage = function () {
        return Observable_1.Observable.of(new Page_model_1.Page({
            markdown: "# A new page\n" +
                "\n" +
                "Feel-free to write in Markdown!\n",
        }));
    };
    return PagesService;
}());
PagesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [backend_service_1.BackendService])
], PagesService);
exports.PagesService = PagesService;
//# sourceMappingURL=Pages.service.js.map