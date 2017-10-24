import {StatusPayload} from "../models/StatusPayload.model";
import {PageMetaData} from "../models/metadata.model";
import {ArchivePageMin} from "./ArchivePageMin";

/**
 * Created by alex on 9/17/17.
 */


export class ArchivesPayload extends StatusPayload {
    constructor(payload: any) {
        super(payload);
        this._pages = payload.pages.map((pageMin: any) => new ArchivePageMin(pageMin));
        this._metadata = payload.metaData;
    }

    private _pages: ArchivePageMin[] = [];

    get pages(): ArchivePageMin[] {
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
