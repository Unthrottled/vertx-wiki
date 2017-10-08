/**
 * Created by alex on 9/17/17.
 */

export class PageMin {
  private _name: string;

  constructor(pageMin: any) {
    this._name = pageMin
  }

  get name(): string {
    return this._name;
  }
}
