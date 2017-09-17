/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PageMin} from "./Page.min.model";
import "./pages.list.htm";
@Component({
  selector: 'pages-list',
  templateUrl: './templates/pages.list.htm'
})
export class PagesComponent implements OnInit {
  pages: PageMin[] = [];

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: { pages: PageMin[] }) => {
      this.pages = data.pages;
    });
  }
}
