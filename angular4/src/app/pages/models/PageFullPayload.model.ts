import {PageFull} from "./Page.full.model";
import {StatusPayload} from "./StatusPayload.model";

/**
 * Created by alex on 9/17/17.
 */


export class FullPagePayload extends StatusPayload {
    constructor(payload: any) {
        super(payload);
        this._page = new PageFull(payload);
    }

    private _page: PageFull;

    get page(): PageFull {
        return this._page;
    }
}
