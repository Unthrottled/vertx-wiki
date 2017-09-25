/**
 * Created by alex on 9/15/17.
 */
import {Component, OnInit} from "@angular/core";
import {Permissions} from "../auth/Permissions.component";
import {UserPrincipal} from "../auth/UserPrincipal.model";
import './create.button.template.htm'
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'create-butt',
  templateUrl: 'templates/create.button.template.htm'
})
export class CreateComponent implements OnInit {
  constructor(public userToken: UserPrincipal) {

  }

  ngOnInit(): void {

  }

  get cantCreate(): Observable<boolean> {
    return Permissions.canActivate(this.userToken, 'create')
      .map((canCreate: boolean)=>!canCreate);
  }
}
