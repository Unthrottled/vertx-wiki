import {Component, EventEmitter, Input, Output} from "@angular/core";
import './hex.htm';
@Component({
  selector: 'hex',
  templateUrl: './templates/hex.htm'
})
export class HexComponent {
  private _width: number;
  private _height: number;
  private _name: number;
  @Output()
  private onClick = new EventEmitter();

  @Input()
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  @Input()
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  @Input()
  get name(): number {
    return this._name;
  }

  set name(value: number) {
    this._name = value;
  }

  clicked(name: string): void{
    this.onClick.emit(name);
  }
}
