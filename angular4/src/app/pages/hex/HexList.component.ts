/**
 * Created by alex on 9/17/17.
 */
import {Component, Input, OnInit} from "@angular/core";

import "./hex-list.htm";
import {PageMin} from "../Page.min.model";
import {HexRowInput} from "./Hex-Row.input";
import {HexRowModel} from "./HexRow.model";
@Component({
  selector: 'hex-list',
  templateUrl: './templates/hex-list.htm'
})
export class HexListComponent implements OnInit {
  private _hexRows: HexRowModel[] = [];

  ngOnInit(): void {
    let hexsPerEvenRow = this.getHexsPerEvenRow();
    let hexsPerOddRow = this.getHexsPerEvenRow();
    let rowCount = this.getRowCount();
    let start = 0, end = hexsPerEvenRow;
    for (let i = 1; i <= rowCount; i++) {
      if (i % 2 === 0) {
        this.hexRows.push(new HexRowModel(this.pages.slice(start, end + 1), {
          even: true
        }));
        start = end;
        end += hexsPerEvenRow;
      } else {
        this.hexRows.push(new HexRowModel(this.pages.slice(start, end + 1), {
          even: false
        }));
        end += hexsPerOddRow;
      }
    }
  }

  private getRowCount(): number {
    return 3;
  }

  private _pages: PageMin[] = [];
  private _config: HexRowInput;

  constructor() {
  }


  @Input()
  get pages(): PageMin[] {
    return this._pages;
  }

  set pages(value: PageMin[]) {
    this._pages = value;
  }

  @Input()
  get config(): HexRowInput {
    return this._config;
  }

  set config(value: HexRowInput) {
    this._config = value;
  }


  get hexRows(): HexRowModel[] {
    return this._hexRows;
  }


  set hexRows(value: HexRowModel[]) {
    this._hexRows = value;
  }

  private getHexsPerEvenRow(): number {
    return 9;
  }

  private getHexesPerOddRow(): number {
    return 8;
  }
}
