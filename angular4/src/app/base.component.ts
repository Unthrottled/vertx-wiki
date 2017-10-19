/**
 * Created by alex on 9/15/17.
 */
import {Component} from "@angular/core";
import "./base.component.htm";
import {UserPrincipal} from "./auth/UserPrincipal.model";

@Component({
  selector: 'base-view',
  templateUrl: './templates/base.component.htm'
})
export class BaseComponent {

  constructor(private userPrince: UserPrincipal){

  }

  get userName(): String {
    return this.userPrince.username;
  }

}
