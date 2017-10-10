/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PageMin} from "./Page.min.model";
import "./pages.list.htm";
import {PagePayload} from "./PagePayload.model";
import {PageMetaData} from "./metadata.model";
@Component({
  selector: 'pages-list',
  templateUrl: './templates/pages.list.htm'
})
export class PagesComponent implements OnInit {
  pages: PageMin[] = [];
  metaData: PageMetaData;

  constructor(private router: ActivatedRoute, private realRouter: Router) {
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: { pages: PagePayload }) => {
      this.pages = data.pages.pages;
      this.metaData = data.pages.metadata;
    });
  }

  reRoute(pageName: string): void {
    this.realRouter.navigate(['/page/' + pageName]);
  }

  reRouteMain(pageNumber: number): void {
    this.realRouter.navigate(['/pages/' + pageNumber]);
  }
}
