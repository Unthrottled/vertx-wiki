/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PageMin} from "./Page.min.model";
import {BackendService} from "../util/backend.service";
import {PagePayload} from "./PagePayload.model";
import {PageFull} from "./Page.full.model";
import {FullPagePayload} from "./PageFullPayload.model";
import {StatusPayload} from "./StatusPayload.model";
import {ExistsPayload} from "./ExistsPayload.model";

@Injectable()
export class TitleValidationService {

  constructor(private backendService: BackendService) {

  }

  isValid(pageName: String, pageContent: String): Observable<boolean> {
    return this.backendService.pageExists(pageName)
      .map((statusPayload: ExistsPayload)=>statusPayload.exists);
}

}
