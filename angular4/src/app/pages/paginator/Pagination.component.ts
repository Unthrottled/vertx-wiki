/**
 * Created by alex on 9/17/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import "./paginator.html";
import {PaginationPage} from "./PaginationPage";
@Component({
  selector: 'paginator',
  templateUrl: './templates/paginator.html'
})
export class PaginatorComponent implements OnInit {
  @Output()
  onPageChanged = new EventEmitter<number>();
  private _currentPageNumber: number = 1;

  private _totalItems: number;
  private _itemsPerPage: number = 100;
  private _currentPage: PaginationPage;
  private _maxPagesDisplayed: number = 8;


  private _nextPage: PaginationPage;
  private _previousPage: PaginationPage;
  private _pages: PaginationPage[] = [];

  constructor() {
  }

  @Input()
  get currentPageNumber(): number {
    return this._currentPageNumber;
  }

  set currentPageNumber(value: number) {
    this._currentPageNumber = value;
  }

  @Input()
  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(value: number) {
    this._totalItems = value;
  }

  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }

  get nextPage(): PaginationPage {
    return this._nextPage;
  }

  set nextPage(value: PaginationPage) {
    this._nextPage = value;
  }

  get previousPage(): PaginationPage {
    return this._previousPage;
  }

  set previousPage(value: PaginationPage) {
    this._previousPage = value;
  }

  get pages(): PaginationPage[] {
    return this._pages;
  }

  get maxPagesDisplayed(): number {
    return this._maxPagesDisplayed;
  }

  set maxPagesDisplayed(value: number) {
    this._maxPagesDisplayed = value;
  }

  get currentPage(): PaginationPage {
    return this._currentPage;
  }

  set currentPage(value: PaginationPage) {
    this._currentPage = value;
  }

  setCurrent(page: PaginationPage):void{
    this.onPageChanged.emit(page.pageId);
  }

  ngOnInit(): void {
    let totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    let pagesToShow = this.maxPagesDisplayed - 1;
    let halfPagesToShow = Math.ceil(pagesToShow / 2);
    let pagesBehindCurrent = this.currentPageNumber < halfPagesToShow ?
      1 : this.currentPageNumber - halfPagesToShow;
    let pagesAhead = this.currentPageNumber + halfPagesToShow;
    let pagesAheadCurrent = pagesAhead > totalPages ? totalPages : pagesAhead;
    this.currentPage = new PaginationPage(this.currentPageNumber);
    for (let i = pagesBehindCurrent; i <= pagesAheadCurrent; i++) {
      this._pages.push(new PaginationPage(i));
    }

    this.previousPage = this.currentPageNumber === 1 ?
      this.currentPage : new PaginationPage(this.currentPageNumber - 1);
    let currentPagePlusOne = this.currentPageNumber + 1;
    this.nextPage = currentPagePlusOne === totalPages ?
      this.currentPage : new PaginationPage(currentPagePlusOne);

  }
}
