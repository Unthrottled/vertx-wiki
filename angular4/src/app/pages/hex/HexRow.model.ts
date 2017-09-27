import {PageMin} from "../Page.min.model";
import {HexRowInput} from "./Hex-Row.input";
/**
 * Created by alex on 9/27/17.
 */


export class HexRowModel {
  private _pages: PageMin[] = [];
  private _hexRowInput: HexRowInput;


  constructor(pages: PageMin[], hexRowInput: HexRowInput) {
    this._pages = pages;
    this._hexRowInput = hexRowInput;
  }


  get pages(): PageMin[] {
    return this._pages;
  }

  get hexRowInput(): HexRowInput {
    return this._hexRowInput;
  }
}
