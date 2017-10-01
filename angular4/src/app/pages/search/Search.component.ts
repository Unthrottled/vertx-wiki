/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import "./search.htm";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {TitleValidationService} from "../TitleValidation.service";
import {Permissions} from "../../auth/Permissions.component";
import {UserPrincipal} from "../../auth/UserPrincipal.model";
@Component({
  selector: 'page-search',
  templateUrl: './templates/search.htm'
})
export class SearchComponent {
  private _model: any = {};

  constructor(private pagesService: TitleValidationService, private notificationService: NotificationsService, private actualRouter: Router, private userToken: UserPrincipal) {
  }

  search(searchedTitle: string) {
    let self = this;
    this.cantSearch
      .map((cantCreate: boolean) => !cantCreate)
      .subscribe((canCreate: boolean) => {
        if (searchedTitle) {
          this.pagesService.isValid(searchedTitle)
            .map((doesNotExist: boolean) => !doesNotExist)
            .subscribe((success: boolean) => {
              if (success) {
                self.actualRouter.navigate(['/page/' + searchedTitle]);
              } else {
                self.failure()
              }
            }, (error: any) => self.failure());
        }
      });
  }

  private failure() {
    this.notificationService.warn('Page not found!', 'Create one, maybe?', {
      timeOut: 3000,
      showProgressBar: true,
      clickToClose: true
    })
  }


  get model(): any {
    return this._model;
  }

  set model(value: any) {
    this._model = value;
  }

  get cantSearch(): Observable<boolean> {
    return Permissions.canActivate(this.userToken, 'view')
      .map((canCreate: boolean) => !canCreate);
  }
}
