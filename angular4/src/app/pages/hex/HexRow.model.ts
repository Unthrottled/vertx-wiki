import {HexRowInput} from "./Hex-Row.input";
import {Pair} from "./Pair.model";

/**
 * Created by alex on 9/27/17.
 */


export class HexRowModel {
    constructor(keyValues: Pair<String, any>[], hexRowInput: HexRowInput) {
        this._keyValues = keyValues;
        this._hexRowInput = hexRowInput;
    }

    private _keyValues: Pair<String, any>[] = [];

    get keyValues(): Pair<String, any>[] {
        return this._keyValues;
    }

    private _hexRowInput: HexRowInput;

    get hexRowInput(): HexRowInput {
        return this._hexRowInput;
    }
}
