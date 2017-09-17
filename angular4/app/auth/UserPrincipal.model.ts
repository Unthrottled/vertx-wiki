/**
 * Created by alex on 9/16/17.
 */

export class UserPrincipal {
  private _canView: boolean;
  private _canDelete: boolean;
  private _canCreate: boolean;
  private _canUpdate: boolean;
  private _token: String;


  constructor(principal: any) {
    this._canView = principal.principal.canView;
    this._canCreate = principal.principal.canCreate;
    this._canUpdate = principal.principal.canUpdate;
    this._canDelete = principal.principal.canDelete;
    this._token = principal.token;
  }

  get canView(): boolean {
    return this._canView;
  }

  get canCreate(): boolean {
    return this._canCreate;
  }

  get canDelete(): boolean {
    return this._canDelete;
  }

  get canUpdate(): boolean {
    return this._canUpdate;
  }

  get token(): String {
    return this._token
  }

}
