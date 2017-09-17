/**
 * Created by alex on 6/7/17.
 */
import {Component, NgZone, OnInit} from '@angular/core';
import './switch.component.htm';
import {Http} from '@angular/http';
import {SessionService} from '../session/session.service';
import {HostService} from '../session/host.service';
import {UserPrincipal} from "../auth/UserPrincipal.model";
import {Permissions} from "../auth/Permissions.component";
import {Observable} from  'rxjs/Observable'


@Component({
    selector: 'dead-mans-switch',
    templateUrl: `./templates/switch.component.htm`,
    styleUrls: []
})
export class SwitchComponent implements OnInit {
    liveness: Boolean = true;

  constructor(private token:UserPrincipal) {
  }

  get enabled(): Observable<boolean>{
    return Permissions.canActivate(this.token, 'update')
      .map(canDo => !canDo);
  }

    ngOnInit(): void {

    }

    change(value: any): void {

    }
}
