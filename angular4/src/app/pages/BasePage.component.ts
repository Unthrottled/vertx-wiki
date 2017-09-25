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
import {EditOptions} from "./EditOptions.model";


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
  protected _editOptions: EditOptions = {
    hideDelete: true
  };

  constructor(protected router: ActivatedRoute) {
  }

  abstract save(): Observable<boolean>;
  abstract reset(): void;

  ngOnInit(): void {
    this.router.data.subscribe((data: { pages: PageFull }) => {
      this.load(data.pages);
    });
  }

  protected load(page: PageFull) : Observable<boolean>{
    this.title = page.name;
    this.htmlContent = page.html;
    this.content = page.markdown;
    this.pageFull = page;
    return Observable.of(true);
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

  get editOptions(): EditOptions {
    return this._editOptions;
  }

  set editOptions(value: EditOptions) {
    this._editOptions = value;
  }
}
