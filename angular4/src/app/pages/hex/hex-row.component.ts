/**
 * Created by alex on 9/17/17.
 */
import {Component, Input} from "@angular/core";

import "./hex-row.htm";
import {PageMin} from "../Page.min.model";
import {HexRowInput} from "./Hex-Row.input";
@Component({
  selector: 'hex-row',
  templateUrl: './templates/hex-row.htm'
})
export class HexRowComponent {
  private _pages: PageMin[] = [];
  private _config: HexRowInput;

  private static goldenRatio: number = 0.576923077;

  private _hexWidth: number = 104;
  private _hexHeight: number = HexRowComponent.goldenRatio * this._hexWidth;

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

  get needsOffset(): boolean{
    return this.config ? !this.config.even : false;
  }

  set config(value: HexRowInput) {
    this._config = value;
  }


  get hexHeight(): number {
    return this._hexHeight;
  }

  set hexHeight(value: number) {
    this._hexHeight = value;
  }

  get hexWidth(): number {
    return this._hexWidth;
  }

  set hexWidth(value: number) {
    this._hexWidth = value;
  }
}
