/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import "./search.htm";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {TitleValidationService} from "../TitleValidation.service";
@Component({
  selector: 'page-search',
  templateUrl: './templates/search.htm'
})
export class SearchComponent {
  private _model: any = {};

  constructor(private pagesService: TitleValidationService, private notificationService: NotificationsService, private actualRouter: Router) {
  }

  search(searchedTitle: string): Observable<boolean> {
    let self = this;
    if (searchedTitle) {
      let returnGuy = this.pagesService.isValid(searchedTitle)
        .map((doesNotExist: boolean)=> !doesNotExist);
      returnGuy.subscribe((success: boolean) => {
        if (success) {
          self.actualRouter.navigate(['/page/' + searchedTitle]);
        } else {
          self.failure()
        }
      }, (error: any) => self.failure());
      return returnGuy;
    } else {
      self.failure();
      return Observable.of(false);
    }
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
}
