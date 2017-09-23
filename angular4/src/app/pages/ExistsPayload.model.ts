import {PageMin} from "./Page.min.model";
import {StatusPayload} from "./StatusPayload.model";
/**
 * Created by alex on 9/17/17.
 */


export class ExistsPayload extends StatusPayload {
  private _exists: boolean = false;
  constructor(payload: any){
    super(payload);
    this._exists = payload.exists;
  }

  get exists(): boolean {
    return this._exists;
  }

}
