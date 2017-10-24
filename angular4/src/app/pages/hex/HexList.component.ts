/**
 * Created by alex on 9/17/17.
 */
import {Component, ElementRef, EventEmitter, Input, NgZone, Output} from "@angular/core";

import "./hex-list.htm";
import {HexRowInput} from "./Hex-Row.input";
import {HexRowModel} from "./HexRow.model";
import {Pair} from "./Pair.model";

@Component({
    selector: 'hex-list',
    template: require('./hex-list.htm')
})
export class HexListComponent {
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

    private _hexRows: HexRowModel[];

    get hexRows(): HexRowModel[] {
        return this._hexRows;
    }

    set hexRows(value: HexRowModel[]) {
        this._hexRows = value;
    }

    private _keyValues: Pair<String, any>[] = [];

    @Input()
    get keyValues(): Pair<String, any>[] {
        return this._keyValues;
    }

    set keyValues(value: Pair<String, any>[]) {
        this._keyValues = value;
        this.layoutRows();
    }

    private _config: HexRowInput;

    @Input()
    get config(): HexRowInput {
        return this._config;
    }

    set config(value: HexRowInput) {
        this._config = value;
    }

    ngAfterViewInit(): void {
        this.layoutRows();
    }

    hexClicked(name: string): void {
        this.onClick.emit(name);
    }

    private layoutRows() {
        this.hexRows = [];
        let hexsPerEvenRow = this.getHexsPerEvenRow();
        let hexsPerOddRow = this.getHexesPerOddRow();
        let start = 0, end = hexsPerEvenRow;
        let odd = false;
        let hexs = this.keyValues.length;
        while (hexs >= 0) {
            if (odd = !odd) {
                this.hexRows.push(new HexRowModel(this.keyValues.slice(start, end), {
                    even: false
                }));
                start = end;
                end += hexsPerOddRow;
                hexs -= hexsPerOddRow;
            } else {
                this.hexRows.push(new HexRowModel(this.keyValues.slice(start, end), {
                    even: true
                }));
                start = end;
                end += hexsPerEvenRow;
                hexs -= hexsPerEvenRow;
            }
        }
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
}
