/**
 * Created by alex on 9/15/17.
 */
import {Component} from "@angular/core";
import "./base.component.htm";
import {UserPrincipal} from "./auth/UserPrincipal.model";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'base-view',
  templateUrl: './templates/base.component.htm'
})
export class BaseComponent {

  constructor(private userPrince: UserPrincipal, private authService: AuthService){

  }

  get userName(): String {
    return this.userPrince.username;
  }

  get canDelete(): Observable<boolean> {
    return this.authService.canDelete();
  }

  get canUpdate(): Observable<boolean> {
    return this.authService.canUpdate();
  }

  get canCreate(): Observable<boolean> {
    return this.authService.canCreate();
  }

  get cantDelete(): Observable<boolean> {
    return this.authService.cantDelete();
  }

  get cantUpdate(): Observable<boolean> {
    return this.authService.cantUpdate();
  }

  get cantCreate(): Observable<boolean> {
    return this.authService.cantCreate();
  }
}
