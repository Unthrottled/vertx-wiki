import {PageFull} from "./Page.full.model";
/**
 * Created by alex on 9/17/17.
 */


export class FullPagePayload {
  private _page: PageFull;
  private _succeded: boolean = false;

  constructor(payload: any) {
    this._succeded = payload.success;
    this._page = new PageFull(payload);
  }


  get page(): PageFull {
    return this._page;
  }

  get succeded(): boolean {
    return this._succeded;
  }
}
