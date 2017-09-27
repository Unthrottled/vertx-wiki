/**
 * Created by alex on 9/17/17.
 */
import {Component, Input} from "@angular/core";

import "./hex-row.htm";
import {PageMin} from "../Page.min.model";
import {HexRowInput} from "./Hex-Row.input";
@Component({
  selector: 'hex-list',
  templateUrl: './templates/hex-row.htm'
})
export class HexRowComponent {
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
}
