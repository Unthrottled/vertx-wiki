import {PageMin} from "../models/Page.min.model";

export class ArchivePageMin extends PageMin {

    constructor(pageMin: any) {
        super(pageMin.name);
        this._id = pageMin._id;
    }

    private _id: String;

    get id(): String {
        return this._id;
    }
}