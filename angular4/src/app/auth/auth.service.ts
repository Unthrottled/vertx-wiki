import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "./user.model";
import {HostService} from "../session/host.service";
import {UserPrincipal} from "./UserPrincipal.model";
import {NewUser} from "./NewUser.model";

@Injectable()
export class AuthService {
  private _isLoggedIn = false;

  constructor(private http: Http, private hostService: HostService, private userToken: UserPrincipal) {

  }

  login(user: User): Observable<boolean> {
    let self = this;
    return this.http.post(this.hostService.fetchUrl() + 'api/token', user)
      .map((response: Response) => {
        return response && response.json ?
          response.json() : ''
      })
      .map(json => {
        self.userToken.newUserPrincipal(json);
        return self.userToken;
      })
      .map((prince: UserPrincipal) => {
        self.isLoggedIn = true;
        return self.isLoggedIn;
      });
  }

  createPrincipal(user: NewUser): Observable<boolean> {
    let self = this;
    return this.http.post(this.hostService.fetchUrl() + 'user/create', user)
      .map((response: Response) => {
        return response && response.json ?
          response.json() : ''
      })
      .map(json => {
        return true;
      });
  }

  logout(): Promise<boolean> {
    this.isLoggedIn = false;
    return new Promise((res) => res(true))
  }

  set isLoggedIn(val: boolean) {
    this._isLoggedIn = val;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
