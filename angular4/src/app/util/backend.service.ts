/**
 * Created by alex on 9/17/17.
 */


import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserPrincipal} from "../auth/UserPrincipal.model";

import {HostService} from "../session/host.service";
import {PagePayload} from "../pages/PagePayload.model";
import {FullPagePayload} from "../pages/PageFullPayload.model";
import {StatusPayload} from "../pages/StatusPayload.model";
import {ExistsPayload} from "../pages/ExistsPayload.model";

@Injectable()
export class BackendService {

  constructor(private http: Http,
              private userToken: UserPrincipal,
              private hostService: HostService) {

  }

  fetchAllPages(): Observable<PagePayload> {
    return this.httpGet("api/pages")
      .map((response: Response) => new PagePayload(response.json()));
  }

  fetchPage(pageName: String): Observable<FullPagePayload> {
    return this.httpGet("api/pages/" + pageName)
      .map((response: Response) => new FullPagePayload(response.json()));
  }

  deletePage(pageName: String): Observable<StatusPayload> {
    return this.httpDelete("api/page/" + pageName)
      .map((response: Response) => new StatusPayload(response.json()));
  }

  pageExists(pageName: String): Observable<ExistsPayload> {
    return this.httpGet("api/exists/" + pageName)
      .map((response: Response) => new ExistsPayload(response.json()));
  }

  updatePage(pageName: String, pageBody: String): Observable<StatusPayload> {
    return this.httpPut("api/pages",
      {"name": pageName, "markdown": pageBody})
      .map((response: Response) => new StatusPayload(response.json()));
  }

  createPage(pageName: String, pageBody: String): Observable<StatusPayload> {
    return this.httpPost("api/pages",
      {"name": pageName, "markdown": pageBody})
      .map((response: Response) => new StatusPayload(response.json()));
  }

  private httpGet(s: string): Observable<Response> {
    return this.http.get(this.hostService.fetchUrl() + s, this.getRequestOptions());
  }

  private httpPut(s: string, body: any): Observable<Response> {
    return this.http.put(this.hostService.fetchUrl() + s, body, this.getRequestOptions());
  }

  private httpDelete(s: string): Observable<Response> {
    return this.http.delete(this.hostService.fetchUrl() + s, this.getRequestOptions());
  }

  private httpPost(s: string, body: any): Observable<Response> {
    return this.http.post(this.hostService.fetchUrl() + s, body, this.getRequestOptions());
  }

  private getRequestOptions(): RequestOptionsArgs {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + this.userToken.token);
    let returnVal: RequestOptionsArgs = {headers: headers};
    return returnVal;
  }
}
