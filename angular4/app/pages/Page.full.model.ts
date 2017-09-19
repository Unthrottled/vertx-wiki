/**
 * Created by alex on 9/17/17.
 */

export class PageFull {
  private _id: string;
  private _name: string;
  private _markdown: string;
  private _html: string;

  constructor(pageMin: any){
    this._id = pageMin.id;
    this._name = pageMin.name;
    this._markdown = pageMin.markdown;
    this._html = pageMin.html;
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
