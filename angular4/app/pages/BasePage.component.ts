/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
import {PagesService} from "./Pages.service";
import {Resetable} from "../objects/Resetable";
import {Saveable} from "../objects/Saveable";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class BasePageComponent implements OnInit, Resetable, Saveable {
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

  constructor(private router: ActivatedRoute, private pagesService: PagesService, private notificationService: NotificationsService) {
  }

  save(): Observable<boolean> {
    let self = this;
    let returnGuy = this.pagesService
      .savePage(this.pageFull.name, this.pageFull.markdown);
    returnGuy.subscribe((success: boolean) => {
      if (success) {
        this.notificationService.success('Page Saved!', ':)', {
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        })
      } else {
        self.failure()
      }
    }, (error: any) => self.failure());
    return returnGuy

  }

  private failure() {
    this.notificationService.error('Page NOT Saved!', ':( Try again.', {
      timeOut: 3000,
      showProgressBar: true,
      clickToClose: true
    })
  }

  reset(): void {
    let self = this;
    this.pagesService
      .fetchPage(self.pageFull.name)
      .subscribe((pageFull: PageFull) => self.load(pageFull));
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: { pages: PageFull }) => {
      this.load(data.pages);
    });
  }

  private load(page: PageFull) {
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
