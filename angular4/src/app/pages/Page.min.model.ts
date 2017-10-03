/**
 * Created by alex on 9/17/17.
 */

export class PageMin {
  private _id: string;
  private _name: string;

  constructor(pageMin: any) {
    this._id = pageMin.id;
    this._name = pageMin.name;
  }


  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
