/**
 * Created by alex on 9/17/17.
 */

export class Page {
    constructor(pageFull: any) {
        this._id = pageFull._id;
        this._name = pageFull.name;
        this._markdown = pageFull.markdown;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    private _markdown: string;

    get markdown(): string {
        return this._markdown;
    }
}
