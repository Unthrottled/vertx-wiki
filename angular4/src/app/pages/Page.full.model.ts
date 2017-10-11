/**
 * Created by alex on 9/17/17.
 */
import {LastModified} from "./LastModfied.model";

export class PageFull {
  private _id: string;
  private _name: string;
  private _markdown: string;
  private _html: string;
  private _lastModified: LastModified;

  constructor(pageFull: any) {
    this._id = pageFull.id;
    this._name = pageFull.name;
    this._markdown = pageFull.markdown;
    this._html = pageFull.html;
    this._lastModified = new LastModified(pageFull.lastModified);
  }


  get lastModified(): LastModified {
    return this._lastModified;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }


  get markdown(): string {
    return this._markdown;
  }

  get html(): string {
    return this._html;
  }
}
