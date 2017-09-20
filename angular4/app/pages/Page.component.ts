/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class PageComponent implements OnInit {
 private title: string;
 private content: string;
 private editMode: boolean = false;
 private markdown: string;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: {pages: PageFull}) => {
      this.title = '{'+data.pages.name+'}';
      this.content = data.pages.html;
      this.markdown = data.pages.markdown;
    });
  }
}
