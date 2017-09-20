/**
 * Created by alex on 6/7/17.
 */
import {Component, OnInit, Input, EventEmitter} from "@angular/core";
import "./switch.component.htm";
import {UserPrincipal} from "../auth/UserPrincipal.model";
import {Permissions} from "../auth/Permissions.component";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'dead-mans-switch',
  templateUrl: `./templates/switch.component.htm`,
  styleUrls: []
})
export class SwitchComponent implements OnInit {
  private _liveness: Boolean = false;
  private livenessChange = new EventEmitter();

  constructor(private token: UserPrincipal) {
  }

  get enabled(): Observable<boolean> {
    return Permissions.canActivate(this.token, 'update')
      .map(canDo => !canDo);
  }

  ngOnInit(): void {

  }

  change(value: any): void {

  }


  @Input()
  get liveness(): Boolean {
    return this._liveness;
  }

  set liveness(value: Boolean) {
    this._liveness = value;
    this.livenessChange.emit(this._liveness);
  }
}
