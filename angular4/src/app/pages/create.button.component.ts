/**
 * Created by alex on 9/15/17.
 */
import {Component, OnInit} from "@angular/core";
import {Permissions} from "../auth/Permissions.component";
import {UserPrincipal} from "../auth/UserPrincipal.model";
import "./create.button.template.htm";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'create-butt',
    template: require('./create.button.template.htm')
})
export class CreateComponent implements OnInit {
    constructor(public authService: AuthService) {

    }

    get cantCreate(): Observable<boolean> {
        return this.authService.canCreate()
            .map((canCreate: boolean) => !canCreate);
    }

    ngOnInit(): void {

    }
}
