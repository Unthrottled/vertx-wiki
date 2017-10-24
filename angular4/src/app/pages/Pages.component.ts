/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PageMin} from "./models/Page.min.model";
import "./pages.list.htm";
import {PagePayload} from "./models/PagePayload.model";
import {PageMetaData} from "./models/metadata.model";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs/Observable";
import {Pair} from "./hex/Pair.model";

@Component({
    selector: 'pages-list',
    template: require('./pages.list.htm')
})
export class PagesComponent implements OnInit {
    pages: Pair<String, String>[] = [];
    metaData: PageMetaData;

    constructor(private router: ActivatedRoute, private realRouter: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.router.data.subscribe((data: { pages: PagePayload }) => {
            this.pages = data.pages.pages.map(pageMin => new Pair<String, String>(pageMin.name, pageMin.name));
            this.metaData = data.pages.metadata;
        });
    }

    reRoute(pageName: string): void {
        this.realRouter.navigate(['/page/' + pageName]);
    }

    reRouteMain(pageNumber: number): void {
        this.realRouter.navigate(['/pages/' + pageNumber]);
    }

    hasPages(): boolean {
        return this.pages.length > 0;
    }

    canCreate(): Observable<boolean> {
        return this.authService.canCreate();
    }
}
