/**
 * Created by alex on 6/7/17.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import {UserPrincipal} from "../auth/UserPrincipal.model";
import {Permissions} from "../auth/Permissions.component";
import {Observable} from "rxjs/Observable";
import "./deletion.component.htm";


@Component({
  selector: 'deletion-component',
  template: `./templates/deletion.component.htm`,
  styleUrls: []
})
export class DeletionComponent {
  @Output()
  private onClick = new EventEmitter();

  constructor(private token: UserPrincipal) {
  }

  get cantDelete(): Observable<boolean> {
    return Permissions.canActivate(this.token, 'delete')
      .map(canDo => !canDo);
  }

  clickyClick(value: any): void {
    this.onClick.emit(value);
  }
}
