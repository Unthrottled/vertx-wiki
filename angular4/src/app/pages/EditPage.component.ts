/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./page.htm";
import {PageFull} from "./Page.full.model";
import {PagesService} from "./Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "./BasePage.component";
import {Deleteable} from "../objects/Deleteable";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class EditPageComponent extends BasePageComponent implements Deleteable {
  constructor(protected router: ActivatedRoute, private pagesService: PagesService, private notificationService: NotificationsService, private actualRouter: Router) {
    super(router);
    this.editOptions = {
      hideDelete: false
    };
  }

  deleteMe(): Observable<boolean> {
    let self = this;
    let returnGuy = this.pagesService
      .deletePage(this.pageFull.name);
    returnGuy.subscribe((success: boolean) => {
      if (success) {
        self.actualRouter.navigate(['/']);
      } else {
        self.failure()
      }
    }, (error: any) => self.failure());
    return returnGuy
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
      .flatMap((pageFull: PageFull) => self.load(pageFull))
      .subscribe((result: boolean)=> self.notificationService.success("Page Reloaded!", "Things might have changed!", {
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        }),
        (error: any)=>self.notificationService.error("Unable to Reset!", "Try again, or not, it may no work :/",{
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        }));
  }
}
