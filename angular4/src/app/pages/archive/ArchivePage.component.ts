/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./archived-page.htm";
import {PageFull} from "../Page.full.model";
import {PagesService} from "../Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "../BasePage.component";
@Component({
  selector: 'wiki-page-archive',
  templateUrl: './templates/archived-page.htm'
})
export class ArchivePageComponent extends BasePageComponent {
  constructor(protected router: ActivatedRoute,
              private pagesService: PagesService,
              private notificationService: NotificationsService,
              private actualRouter: Router) {
    super(router);
    this.editOptions = {
      hideDelete: false
    };
  }

  ngOnInit(){
    this.router.data.subscribe((data: { pages: PageFull }) => {
      this.load(data.pages);
    });
  }

  save(): Observable<boolean> {
    let self = this;
    let returnGuy = this.pagesService
      .savePage(this.page.name, self.content);
    returnGuy.subscribe((success: boolean) => {
      if (success) {
        this.notificationService.success('Page R-R-Restored!', ':)', {
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        });
        self.reset();
      } else {
        self.failure()
      }
    }, (error: any) => self.failure());
    return returnGuy

  }

  private failure() {
    this.notificationService.error('Page NOT Restored!', ':( Try again.', {
      timeOut: 3000,
      showProgressBar: true,
      clickToClose: true
    })
  }

  reset(): void {}
}
