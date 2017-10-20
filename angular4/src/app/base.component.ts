/**
 * Created by alex on 9/15/17.
 */
import {Component, OnInit} from "@angular/core";
import "./base.component.htm";
import {UserPrincipal} from "./auth/UserPrincipal.model";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'base-view',
    template: require('./base.component.htm')
})
export class BaseComponent implements OnInit {
    private pageNumber: string;

    constructor(private userPrince: UserPrincipal, private authService: AuthService, private activatedRoute: ActivatedRoute) {

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

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => this.pageNumber = params['pageNumber']);
    }

    firstPage(): boolean {
        return this.pageNumber.localeCompare("1") == 0;
    }
}
