import {PageMin} from "./Page.min.model";
import {StatusPayload} from "./StatusPayload.model";
import {PageMetaData} from "./metadata.model";
/**
 * Created by alex on 9/17/17.
 */


export class PagePayload extends StatusPayload {
  private _pages: PageMin[] = [];
  private _metadata: PageMetaData;

  constructor(payload: any) {
    super(payload);
    this._pages = payload.pages.map((pageMin: any) => new PageMin(pageMin));
    this._metadata = payload.metaData;
  }

  get pages(): PageMin[] {
    return this._pages;
  }


  get metadata(): PageMetaData {
    return this._metadata;
  }

  set metadata(value: PageMetaData) {
    this._metadata = value;
  }
}
