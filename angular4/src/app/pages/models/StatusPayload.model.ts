/**
 * Created by alex on 9/17/17.
 */


export class StatusPayload {
    constructor(payload: any) {
        this._succeded = payload.success;
    }

    private _succeded: boolean = false;

    get succeded(): boolean {
        return this._succeded;
    }
}
