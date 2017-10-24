import {StatusPayload} from "./StatusPayload.model";

/**
 * Created by alex on 9/17/17.
 */


export class ExistsPayload extends StatusPayload {
    constructor(payload: any) {
        super(payload);
        this._exists = payload.exists;
    }

    private _exists: boolean = false;

    get exists(): boolean {
        return this._exists;
    }

}
