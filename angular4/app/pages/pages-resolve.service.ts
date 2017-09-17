/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable } from 'rxjs/Observable';
import {Permissions} from "../auth/Permissions.component";
import {PageMin} from "./Page.min.model";

@Injectable()
export class PagesResolve implements Resolve<PageMin[]> {
  constructor(private permissons: Permissions){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageMin[]> {
    return this.permissons.canView
      .flatMap(canView => {
        if(canView){
          return Observable.of([new PageMin({id: 1, name: "oshitwaddup?"})])
        } else {
          return Observable.of([]);
        }
      });
  }

}
