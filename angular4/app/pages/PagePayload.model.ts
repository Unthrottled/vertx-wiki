import {PageMin} from "./Page.min.model";
/**
 * Created by alex on 9/17/17.
 */


export class PagePayload {
  private _pages: PageMin[] = [];
  private _succeded: boolean = false;
  constructor(payload: any){
    this._succeded = payload.success;
    this._pages = payload.pages.map(pageMin=> new PageMin(pageMin));
  }


  get pages(): PageMin[] {
    return this._pages;
  }

  get succeded(): boolean {
    return this._succeded;
  }
}
