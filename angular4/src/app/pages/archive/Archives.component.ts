/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./archive.list.htm";
import {PageMetaData} from "../metadata.model";
import {ArchivesPayload} from "./ArchivesPayload.model";
import {Pair} from "../hex/Pair.model";

@Component({
    selector: 'pages-list-archive',
    template: require('./archive.list.htm')
})
export class ArchivesComponent implements OnInit {
    pages: Pair<String, String>[] = [];
    metaData: PageMetaData;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { pages: ArchivesPayload }) => {
            this.pages = data.pages.pages.map(pageMin => new Pair<String, String>(pageMin.name, pageMin.id));
            this.metaData = data.pages.metadata;
        });
    }

    reRoute(pageArchiveId: String): void {
        this.router.navigate(['/archive/' + pageArchiveId]);
    }

    reRouteMain(pageNumber: Number): void {
        this.router.navigate(['/archives/' + pageNumber]);
    }

    hasPages(): boolean {
        return this.pages.length > 0;
    }
}
