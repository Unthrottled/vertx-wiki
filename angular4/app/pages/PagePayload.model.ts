import {PageMin} from "./Page.min.model";
import {StatusPayload} from "./StatusPayload.model";
/**
 * Created by alex on 9/17/17.
 */


export class PagePayload extends StatusPayload {
  private _pages: PageMin[] = [];
  constructor(payload: any){
    super(payload);
    this._pages = payload.pages.map((pageMin: any)=> new PageMin(pageMin));
  }

  get pages(): PageMin[] {
    return this._pages;
  }

}
