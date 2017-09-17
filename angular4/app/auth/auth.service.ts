import {Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "./user.model";
import {HostService} from "../session/host.service";
import {UserPrincipal} from "./UserPrincipal.model";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class AuthService {
  isLoggedIn = false;
  private currentPrincipal = new ReplaySubject<UserPrincipal>(1);

  constructor(private http: Http, private hostService: HostService) {

  }

  login(user: User): Observable<UserPrincipal> {
    return this.http.post(this.hostService.fetchUrl() + '/api/token', user)
      .map((response: Response) => {
        return response && response.json ?
          response.json() : ''
      })
      .map(json => new UserPrincipal(json))
      .flatMap((prince: UserPrincipal) => {
        this.currentPrincipal.next(prince);
        return this.currentPrincipal;
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentPrincipal = new ReplaySubject<UserPrincipal>();
  }
}
