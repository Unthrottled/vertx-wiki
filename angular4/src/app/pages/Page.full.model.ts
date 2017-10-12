/**
 * Created by alex on 9/17/17.
 */
import {LastModified} from "./LastModfied.model";
import {Page} from "./Page.model";

export class PageFull extends Page {
  private _lastModified: LastModified;

  constructor(pageFull: any) {
    super(pageFull);
    this._lastModified = new LastModified(pageFull.lastModified);
  }


  get lastModified(): LastModified {
    return this._lastModified;
  }
}
