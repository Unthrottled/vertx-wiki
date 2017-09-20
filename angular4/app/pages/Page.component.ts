/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
import {PagesService} from "./Pages.service";
import {Resetable} from "../objects/Resetable";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class PageComponent implements OnInit, Resetable {
 private _title: string;
  private _content: string;
  private _editMode: boolean = false;
  private _htmlContent: string;
  constructor(private router: ActivatedRoute, private pagesService: PagesService) {
  }

  reset(): void {
    let self = this;
    this.pagesService
      .fetchPage(self.title)
      .subscribe((pageFull: PageFull)=>self.load(pageFull));
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: {pages: PageFull}) => {
      this.load(data.pages);
    });
  }

  private load(page: PageFull) {
    this.title = page.name;
    this.htmlContent = page.html;
    this.content = page.markdown;
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
  }

  get htmlContent(): string {
    return this._htmlContent;
  }

  set htmlContent(value: string) {
    this._htmlContent = value;
  }
}
