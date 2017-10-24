/**
 * Created by alex on 6/7/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import "./switch.component.htm";
import {UserPrincipal} from "../auth/UserPrincipal.model";
import {Permissions} from "../auth/Permissions.component";
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'dead-mans-switch',
    template: require('./switch.component.htm'),
    styleUrls: []
})
export class SwitchComponent implements OnInit {
    @Output()
    private livenessChange = new EventEmitter();

    constructor(private token: UserPrincipal) {
    }

    private _liveness: Boolean = false;

    @Input()
    get liveness(): Boolean {
        return this._liveness;
    }

    set liveness(value: Boolean) {
        this._liveness = value;
        this.livenessChange.emit(this._liveness);
    }

    get enabled(): Observable<boolean> {
        return Permissions.canActivate(this.token, 'update')
            .map(canDo => !canDo);
    }

    ngOnInit(): void {

    }

    change(value: any): void {

    }
}
