/**
 * Created by alex on 9/17/17.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import "./paginator.html";
import {PaginationPage} from "./PaginationPage";
@Component({
  selector: 'paginator',
  templateUrl: './templates/paginator.html'
})
export class PaginatorComponent {
  @Output()
  onPageChanged = new EventEmitter<PaginationPage>();

  private _currentPage: PaginationPage;
  private _totalPages: number;
  private _itemsPerPage: number = 100;


  constructor() {
  }


  @Input()
  get currentPage(): PaginationPage {
    return this._currentPage;
  }

  set currentPage(value: PaginationPage) {
    this._currentPage = value;
  }

  @Input()
  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }
}
