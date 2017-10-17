/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./archive.list.htm";
import {PageMetaData} from "../metadata.model";
import {ArchivePageMin} from "./ArchivePageMin";
import {ArchivesPayload} from "./ArchivesPayload.model";

@Component({
    selector: 'pages-list',
    templateUrl: './templates/archive.list.htm'
})
export class ArchivesComponent implements OnInit {
    pages: ArchivePageMin[] = [];
    metaData: PageMetaData;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { pages: ArchivesPayload }) => {
            this.pages = data.pages.pages;
            this.metaData = data.pages.metadata;
        });
    }

    reRoute(pageArchive: ArchivePageMin): void {
        this.router.navigate(['/archive/' + pageArchive.id]);
    }

    reRouteMain(pageArchive: ArchivePageMin): void {
        this.router.navigate(['/archive/' + pageArchive.id]);
    }

    hasPages(): boolean {
        return this.pages.length > 0;
    }
}
