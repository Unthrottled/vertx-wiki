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
    private static goldenRatio: number = 0.576923077;
    @Output()
    private onClick = new EventEmitter();

    constructor() {
    }

    private _keyValues: Pair<String, any>[] = [];

    @Input()
    get keyValues(): Pair<String, any>[] {
        return this._keyValues;
    }

    set keyValues(value: Pair<String, any>[]) {
        this._keyValues = value;
    }

    private _config: HexRowInput;

    @Input()
    get config(): HexRowInput {
        return this._config;
    }

    set config(value: HexRowInput) {
        this._config = value;
    }

    private _hexWidth: number = 104;

    private _hexHeight: number = HexRowComponent.goldenRatio * this._hexWidth;

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

    get needsOffset(): boolean {
        return this.config ? !this.config.even : false;
    }

    hexClicked(name: string): void {
        this.onClick.emit(name);
    }
}
