/**
 * Created by alex on 9/17/17.
 */
import {Component, Input} from "@angular/core";

import "./hex-row.htm";
import {PageMin} from "../Page.min.model";
@Component({
  selector: 'hex-row',
  templateUrl: './templates/hex-row.htm'
})
export class HexRowComponent {
  private _pages: PageMin[] = [];

  constructor() {
  }


  @Input
  get pages(): PageMin[] {
    return this._pages;
  }

  set pages(value: PageMin[]) {
    this._pages = value;
  }
}
