/**
 * Created by alex on 9/17/17.
 */


export class StatusPayload {
  private _succeded: boolean = false;

  constructor(payload: any) {
    this._succeded = payload.success;
  }

  get succeded(): boolean {
    return this._succeded;
  }
}
