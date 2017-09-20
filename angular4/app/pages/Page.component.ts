/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class PageComponent implements OnInit {
 private _title: string;
 private _content: string;
 private _editMode: boolean = false;
 private _htmlContent: string;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: {pages: PageFull}) => {
      this._title = '{'+data.pages.name+'}';
      this._htmlContent = data.pages.html;
      this._content = data.pages.markdown;
    });
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
    console.log("diarrhea");
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
    console.log("shit");
    this._htmlContent = value;
  }
}
