/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Permissions} from "../../auth/Permissions.component";
import {PagesService} from "../Pages.service";
import {PageFull} from "../models/Page.full.model";

@Injectable()
export class ArchiveResolve implements Resolve<PageFull> {
    constructor(private permissons: Permissions, private pagesService: PagesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageFull> {
        return this.permissons.canView
            .flatMap(canView => {
                if (canView) {
                    return this.pagesService.fetchArchivedPage(route.params["name"]);
                } else {
                    return Observable.empty();
                }
            });
    }

}
