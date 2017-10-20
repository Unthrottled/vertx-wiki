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
require("./paginator.htm");
var PaginationPage_1 = require("./PaginationPage");
var PaginatorComponent = (function () {
    function PaginatorComponent() {
        this.onPageChanged = new core_1.EventEmitter();
        this._currentPageNumber = 1;
        this._maxPagesDisplayed = 9;
        this._pages = [];
        this._firstPage = new PaginationPage_1.PaginationPage(1);
    }
    Object.defineProperty(PaginatorComponent.prototype, "currentPageNumber", {
        get: function () {
            return this._currentPageNumber;
        },
        set: function (value) {
            this._currentPageNumber = value;
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (value) {
            this._totalItems = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (value) {
            this._itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "nextPage", {
        get: function () {
            return this._nextPage;
        },
        set: function (value) {
            this._nextPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "previousPage", {
        get: function () {
            return this._previousPage;
        },
        set: function (value) {
            this._previousPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "maxPagesDisplayed", {
        get: function () {
            return this._maxPagesDisplayed;
        },
        set: function (value) {
            this._maxPagesDisplayed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (value) {
            this._currentPage = value;
        },
        enumerable: true,
        configurable: true
    });
    PaginatorComponent.prototype.setCurrent = function (page) {
        this.onPageChanged.emit(page.pageId);
    };
    Object.defineProperty(PaginatorComponent.prototype, "firstPage", {
        get: function () {
            return this._firstPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "endPage", {
        get: function () {
            return this._endPage;
        },
        set: function (value) {
            this._endPage = value;
        },
        enumerable: true,
        configurable: true
    });
    PaginatorComponent.prototype.ngOnInit = function () {
        this.recalculate();
    };
    PaginatorComponent.prototype.recalculate = function () {
        this._pages = [];
        var totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        var pagesToShow = this.maxPagesDisplayed - 1;
        var halfPagesToShow = Math.ceil(pagesToShow / 2);
        var pagesBehindCurrent = this.currentPageNumber <= halfPagesToShow ?
            1 : this.currentPageNumber - halfPagesToShow;
        var pagesAhead = this.currentPageNumber + (pagesToShow - (this.currentPageNumber - pagesBehindCurrent));
        var pagesAheadCurrent = pagesAhead > totalPages ? totalPages : pagesAhead;
        this.currentPage = new PaginationPage_1.PaginationPage(this.currentPageNumber);
        for (var i = pagesBehindCurrent; i <= pagesAheadCurrent; i++) {
            this._pages.push(new PaginationPage_1.PaginationPage(i));
        }
        this.previousPage = this.currentPageNumber === 1 ?
            this.currentPage : new PaginationPage_1.PaginationPage(this.currentPageNumber - 1);
        var currentPagePlusOne = this.currentPageNumber + 1;
        this.nextPage = currentPagePlusOne > totalPages ?
            this.currentPage : new PaginationPage_1.PaginationPage(currentPagePlusOne);
        this.endPage = new PaginationPage_1.PaginationPage(totalPages);
    };
    return PaginatorComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginatorComponent.prototype, "onPageChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginatorComponent.prototype, "currentPageNumber", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginatorComponent.prototype, "totalItems", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginatorComponent.prototype, "itemsPerPage", null);
PaginatorComponent = __decorate([
    core_1.Component({
        selector: 'paginator',
        template: require('./paginator.htm')
    }),
    __metadata("design:paramtypes", [])
], PaginatorComponent);
exports.PaginatorComponent = PaginatorComponent;
//# sourceMappingURL=Pagination.component.js.map