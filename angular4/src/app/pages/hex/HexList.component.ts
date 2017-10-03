/**
 * Created by alex on 9/17/17.
 */
import {Component, ElementRef, EventEmitter, Input, NgZone, Output} from "@angular/core";

import "./hex-list.htm";
import {PageMin} from "../Page.min.model";
import {HexRowInput} from "./Hex-Row.input";
import {HexRowModel} from "./HexRow.model";
@Component({
  selector: 'hex-list',
  templateUrl: './templates/hex-list.htm'
})
export class HexListComponent {
  private _hexRows: HexRowModel[];
  private _pages: PageMin[] = [];
  private _config: HexRowInput;
  @Output()
  private onClick = new EventEmitter();

  constructor(private disElement: ElementRef, private ngZone: NgZone) {
    let self = this;
    window.onresize = (e) => {
      self.ngZone.run(() => {
        self.layoutRows();
      })
    }
  }

  ngAfterViewInit(): void {
    this.layoutRows();
  }

  private layoutRows() {
    this.hexRows = [];
    let hexsPerEvenRow = this.getHexsPerEvenRow();
    let hexsPerOddRow = this.getHexesPerOddRow();
    let start = 0, end = hexsPerEvenRow;
    let odd = false;
    let hexs = this.pages.length;
    while (hexs >= 0) {
      if (odd = !odd) {
        this.hexRows.push(new HexRowModel(this.pages.slice(start, end), {
          even: false
        }));
        start = end;
        end += hexsPerOddRow;
        hexs -= hexsPerOddRow;
      } else {
        this.hexRows.push(new HexRowModel(this.pages.slice(start, end), {
          even: true
        }));
        start = end;
        end += hexsPerEvenRow;
        hexs -= hexsPerEvenRow;
      }
    }
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
    return this.getHexesPerOddRow() - 1;
  }

  private getHexesPerOddRow(): number {
    return Math.floor(this.getParentWidth() / this.getHexWidth());
  }

  private getParentWidth(): number {
    return this.disElement.nativeElement.parentNode.offsetWidth;
  }

  private getHexWidth(): number {
    return 104 + this.getSpacing();
  }

  private getSpacing() {
    return 5;
  }

  hexClicked(name: string): void {
    this.onClick.emit(name);
  }
}
