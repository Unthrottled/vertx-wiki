/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
import {PagesService} from "./Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "./BasePage.component";
@Component({
  selector: 'new-page',
  templateUrl: './templates/page.htm'
})
export class CreatePageComponent extends BasePageComponent {
  constructor(protected router: ActivatedRoute, private pagesService: PagesService, private notificationService: NotificationsService) {
    super(router);

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
}
