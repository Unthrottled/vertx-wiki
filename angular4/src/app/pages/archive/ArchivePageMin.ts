
import {PageMin} from "../Page.min.model";

export class ArchivePageMin extends PageMin {

    private _id: String;
    constructor(pageMin: any) {
        super(pageMin.name);
        this._id = pageMin._id;
    }


    get id(): String {
        return this._id;
    }
}