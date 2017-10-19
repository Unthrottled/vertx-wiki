import {Component, EventEmitter, Input, Output} from "@angular/core";
import "./hex.htm";

@Component({
    selector: 'hex',
    templateUrl: './templates/hex.htm'
})
export class HexComponent {
    @Output()
    private onClick = new EventEmitter();

    private _width: number;

    @Input()
    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    private _height: number;

    @Input()
    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    private _name: String;

    @Input()
    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    private _value: any;

    @Input()
    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    clicked(name: string): void {
        this.onClick.emit(name);
    }
}
