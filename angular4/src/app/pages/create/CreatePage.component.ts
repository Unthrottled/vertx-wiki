/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./create.page.htm";
import {PagesService} from "../services/Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "../BasePage.component";
import {Page} from "../models/Page.model";

@Component({
    selector: 'new-page',
    template: require('./create.page.htm')
})
export class CreatePageComponent extends BasePageComponent {
    constructor(protected router: ActivatedRoute, private pagesService: PagesService, private notificationService: NotificationsService, private actualRouter: Router) {
        super(router);
        this.editMode = true;
    }

    private _validTitle: boolean;

    get validTitle(): boolean {
        return this._validTitle;
    }

    set validTitle(value: boolean) {
        this._validTitle = value;
    }

    ngOnInit() {
        this.router.data.subscribe((data: { pages: Page }) => {
            this.load(data.pages);
        });
    }

    save(): Observable<boolean> {
        let self = this;
        if (self.validTitle) {
            let returnGuy = this.pagesService
                .createPage(this.title, this.content);
            returnGuy.subscribe((success: boolean) => {
                if (success) {
                    self.actualRouter.navigate(['/page/' + self.title]);
                } else {
                    self.failure()
                }
            }, (error: any) => self.failure());
            return
        } else {
            self.failure();
            return Observable.of(false);
        }
    }

    reset(): void {
        this.actualRouter.navigate(['/']);
    }

    titleValidationChange(delta: boolean): void {
        this.validTitle = delta;
    }

    titleChange(delta: string): void {
        this.title = delta;
    }

    private failure() {
        this.notificationService.error('Page NOT Saved!', ':( Try again.', {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        })
    }
}
