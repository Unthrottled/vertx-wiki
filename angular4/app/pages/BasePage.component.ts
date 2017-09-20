/**
 * Created by alex on 9/17/17.
 */
import {Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
import {Resetable} from "../objects/Resetable";
import {Saveable} from "../objects/Saveable";
import {Observable} from 'rxjs/Observable';


export abstract class BasePageComponent implements OnInit, Resetable, Saveable {
  get pageFull(): PageFull {
    return this._pageFull;
  }

  set pageFull(value: PageFull) {
    this._pageFull = value;
  }

  private _title: string;
  private _content: string;
  private _editMode: boolean = false;
  private _htmlContent: string;
  private _pageFull: PageFull;

  constructor(protected router: ActivatedRoute) {
  }

  abstract save(): Observable<boolean>;
  abstract reset(): void;

  ngOnInit(): void {
    this.router.data.subscribe((data: { pages: PageFull }) => {
      this.load(data.pages);
    });
  }

  protected load(page: PageFull) {
    this.title = page.name;
    this.htmlContent = page.html;
    this.content = page.markdown;
    this.pageFull = page;
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

  @Input()
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
