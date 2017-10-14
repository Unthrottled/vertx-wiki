/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BackendService} from "../util/backend.service";
import {ExistsPayload} from "./ExistsPayload.model";

@Injectable()
export class NewUserValidationService {

  constructor(private backendService: BackendService) {

  }

  isValid(pageName: String): Observable<boolean> {
    return pageName.length < 1 ? Observable.from(false) :
      this.backendService
      .userExists(pageName)
      .map((statusPayload: ExistsPayload) => !statusPayload.exists);
  }

}
