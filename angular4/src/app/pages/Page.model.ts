/**
 * Created by alex on 9/17/17.
 */

export class Page {
  private _id: string;
  private _name: string;
  private _markdown: string;
  private _html: string;

  constructor(pageFull: any) {
    this._id = pageFull.id;
    this._name = pageFull.name;
    this._markdown = pageFull.markdown;
    this._html = pageFull.html;
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
