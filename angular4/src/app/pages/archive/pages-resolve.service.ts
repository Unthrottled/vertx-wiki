/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Permissions} from "../../auth/Permissions.component";
import {PagesService} from "../Pages.service";
import {ArchivesPayload} from "./ArchivesPayload.model";

@Injectable()
export class PagesResolve implements Resolve<ArchivesPayload> {
  constructor(private permissons: Permissions, private pagesService: PagesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArchivesPayload> {
    return this.permissons.canView
      .flatMap(canView => {
        if (canView) {
          return this.pagesService.fetchAllArchivedPages(parseInt(route.params['pageNumber']));
        } else {
          return Observable.empty();
        }
      });
  }

}
