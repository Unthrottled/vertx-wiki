/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BackendService} from "../util/backend.service";
import {PagePayload} from "./PagePayload.model";
import {PageFull} from "./Page.full.model";
import {FullPagePayload} from "./PageFullPayload.model";
import {StatusPayload} from "./StatusPayload.model";
import {Page} from "./Page.model";
import {ArchivesPayload} from "./archive/ArchivesPayload.model";

@Injectable()
export class PagesService {

    constructor(private backendService: BackendService) {

    }

    fetchAllMinPages(pageNumber: number): Observable<PagePayload> {
        return this.backendService.fetchAllPages(pageNumber);
    }

    fetchAllArchivedPages(pageNumber: number): Observable<ArchivesPayload> {
        return this.backendService.fetchAllArchives(pageNumber);
    }

    fetchPage(pageName: String): Observable<PageFull> {
        return this.backendService.fetchPage(pageName)
            .map((pagePayload: FullPagePayload) => pagePayload.page);
    }

    fetchArchivedPage(pageId: String): Observable<PageFull> {
        return this.backendService.fetchArchivedPage(pageId)
            .map((pagePayload: FullPagePayload) => pagePayload.page);
    }

    savePage(pageName: String, pageContent: String): Observable<boolean> {
        return this.backendService.updatePage(pageName, pageContent)
            .map((statusPayload: StatusPayload) => statusPayload.succeded);
    }

    createPage(pageName: String, pageContent: String): Observable<boolean> {
        return this.backendService.createPage(pageName, pageContent)
            .map((statusPayload: StatusPayload) => statusPayload.succeded);
    }

    deletePage(pageName: String): Observable<boolean> {
        return this.backendService.deletePage(pageName)
            .map((statusPayload: StatusPayload) => statusPayload.succeded);
    }

    restorePage(pageId: String): Observable<boolean> {
        return this.backendService.restoreArchive(pageId)
            .map((statusPayload: StatusPayload) => statusPayload.succeded);
    }

    freshPage(): Observable<Page> {
        return Observable.of(new Page(
            {
                markdown: "# A new page\n" +
                "\n" +
                "Feel-free to write in Markdown!\n",
            }))
    }
}
