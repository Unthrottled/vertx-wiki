/**
 * Created by alex on 9/17/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import "./paginator.htm";
import {PaginationPage} from "./PaginationPage";

@Component({
    selector: 'paginator',
    template: require('./paginator.htm')
})
export class PaginatorComponent implements OnInit {
    @Output()
    onPageChanged = new EventEmitter<number>();

    constructor() {
    }

    private _currentPageNumber: number = 1;

    @Input()
    get currentPageNumber(): number {
        return this._currentPageNumber;
    }

    set currentPageNumber(value: number) {
        this._currentPageNumber = value;
        this.recalculate();
    }

    private _totalItems: number;

    @Input()
    get totalItems(): number {
        return this._totalItems;
    }

    set totalItems(value: number) {
        this._totalItems = value;
    }

    private _itemsPerPage: number;

    @Input()
    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    set itemsPerPage(value: number) {
        this._itemsPerPage = value;
    }

    private _currentPage: PaginationPage;

    get currentPage(): PaginationPage {
        return this._currentPage;
    }

    set currentPage(value: PaginationPage) {
        this._currentPage = value;
    }

    private _maxPagesDisplayed: number = 9;

    get maxPagesDisplayed(): number {
        return this._maxPagesDisplayed;
    }

    set maxPagesDisplayed(value: number) {
        this._maxPagesDisplayed = value;
    }

    private _nextPage: PaginationPage;

    get nextPage(): PaginationPage {
        return this._nextPage;
    }

    set nextPage(value: PaginationPage) {
        this._nextPage = value;
    }

    private _previousPage: PaginationPage;

    get previousPage(): PaginationPage {
        return this._previousPage;
    }

    set previousPage(value: PaginationPage) {
        this._previousPage = value;
    }

    private _pages: PaginationPage[] = [];

    get pages(): PaginationPage[] {
        return this._pages;
    }

    private _endPage: PaginationPage;

    get endPage(): PaginationPage {
        return this._endPage;
    }

    set endPage(value: PaginationPage) {
        this._endPage = value;
    }

    private _firstPage: PaginationPage = new PaginationPage(1);

    get firstPage(): PaginationPage {
        return this._firstPage;
    }

    setCurrent(page: PaginationPage): void {
        this.onPageChanged.emit(page.pageId);
    }

    ngOnInit(): void {
        this.recalculate();
    }

    private recalculate() {
        this._pages = [];
        let totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        let pagesToShow = this.maxPagesDisplayed - 1;
        let halfPagesToShow = Math.ceil(pagesToShow / 2);
        let pagesBehindCurrent = this.currentPageNumber <= halfPagesToShow ?
            1 : this.currentPageNumber - halfPagesToShow;
        let pagesAhead = this.currentPageNumber + (pagesToShow - (this.currentPageNumber - pagesBehindCurrent));
        let pagesAheadCurrent = pagesAhead > totalPages ? totalPages : pagesAhead;
        this.currentPage = new PaginationPage(this.currentPageNumber);
        for (let i = pagesBehindCurrent; i <= pagesAheadCurrent; i++) {
            this._pages.push(new PaginationPage(i));
        }

        this.previousPage = this.currentPageNumber === 1 ?
            this.currentPage : new PaginationPage(this.currentPageNumber - 1);
        let currentPagePlusOne = this.currentPageNumber + 1;
        this.nextPage = currentPagePlusOne > totalPages ?
            this.currentPage : new PaginationPage(currentPagePlusOne);
        this.endPage = new PaginationPage(totalPages);
    }
}
