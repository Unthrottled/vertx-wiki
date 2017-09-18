/**
 * Created by alex on 9/17/17.
 */


import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserPrincipal} from "../auth/UserPrincipal.model";

import {HostService} from "../session/host.service";
import {PagePayload} from "../pages/PagePayload.model";

@Injectable()
export class BackendService {

  constructor(private http: Http,
              private userToken: UserPrincipal,
              private hostService: HostService) {

  }

  fetchAllPages(): Observable<PagePayload> {

    return this.http.get(this.hostService.fetchUrl() + "api/pages", this.getRequestOptions())
      .map((response: Response) => new PagePayload(response.json()));
  }

  private getRequestOptions(): RequestOptionsArgs {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + this.userToken.token);
    let returnVal : RequestOptionsArgs = {headers: headers};
    return returnVal;
  }
}
