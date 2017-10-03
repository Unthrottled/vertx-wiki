/**
 * Created by alex on 9/20/17.
 */
import {Observable} from "rxjs/Observable";

export interface Deleteable {
  deleteMe(): Observable<boolean>;
}
