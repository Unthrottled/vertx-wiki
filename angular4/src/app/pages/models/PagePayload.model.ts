import {PageMin} from "./Page.min.model";
import {StatusPayload} from "./StatusPayload.model";
import {PageMetaData} from "./metadata.model";

/**
 * Created by alex on 9/17/17.
 */


export class PagePayload extends StatusPayload {
    constructor(payload: any) {
        super(payload);
        this._pages = payload.pages.map((pageMin: any) => new PageMin(pageMin));
        this._metadata = payload.metaData;
    }

    private _pages: PageMin[] = [];

    get pages(): PageMin[] {
        return this._pages;
    }

    private _metadata: PageMetaData;

    get metadata(): PageMetaData {
        return this._metadata;
    }

    set metadata(value: PageMetaData) {
        this._metadata = value;
    }
}
