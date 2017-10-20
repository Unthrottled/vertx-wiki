/**
 * Created by alex on 9/17/17.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";

import "./hex-row.htm";
import {HexRowInput} from "./Hex-Row.input";
import {Pair} from "./Pair.model";
@Component({
  selector: 'hex-row',
  template: require('./hex-row.htm')
})
export class HexRowComponent {
  private _keyValues: Pair<String, any>[] = [];
  private _config: HexRowInput;

  private static goldenRatio: number = 0.576923077;

  private _hexWidth: number = 104;
  private _hexHeight: number = HexRowComponent.goldenRatio * this._hexWidth;
  @Output()
  private onClick = new EventEmitter();

  constructor() {
  }


  @Input()
  get keyValues(): Pair<String, any>[] {
    return this._keyValues;
  }

  set keyValues(value: Pair<String, any>[]) {
    this._keyValues = value;
  }

  @Input()
  get config(): HexRowInput {
    return this._config;
  }

  get needsOffset(): boolean {
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

  hexClicked(name: string): void {
    this.onClick.emit(name);
  }
}
