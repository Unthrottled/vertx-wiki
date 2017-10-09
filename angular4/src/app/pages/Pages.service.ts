/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PageMin} from "./Page.min.model";
import {BackendService} from "../util/backend.service";
import {PagePayload} from "./PagePayload.model";
import {PageFull} from "./Page.full.model";
import {FullPagePayload} from "./PageFullPayload.model";
import {StatusPayload} from "./StatusPayload.model";

@Injectable()
export class PagesService {

  constructor(private backendService: BackendService) {

  }

  fetchAllMinPages(pageNumber: number): Observable<PageMin[]> {
    return this.backendService.fetchAllPages(pageNumber)
      .map((payload: PagePayload) => payload.pages);
  }

  fetchPage(pageName: String): Observable<PageFull> {
    return this.backendService.fetchPage(pageName)
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

  freshPage(): Observable<PageFull> {
    return Observable.of(new PageFull(
      {
        markdown: "# A new page\n" +
        "\n" +
        "Feel-free to write in Markdown!\n",
      }))
  }
}
