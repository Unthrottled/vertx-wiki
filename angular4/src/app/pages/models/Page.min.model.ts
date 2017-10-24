/**
 * Created by alex on 9/17/17.
 */

export class PageMin {
    constructor(pageMin: any) {
        this._name = pageMin
    }

    private _name: string;

    get name(): string {
        return this._name;
    }
}
