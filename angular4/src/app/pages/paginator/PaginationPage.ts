/**
 * Created by alex on 10/8/17.
 */


export class PaginationPage {

  constructor(private _pageId: number) {

  }


  get pageId(): number {
    return this._pageId;
  }
}
