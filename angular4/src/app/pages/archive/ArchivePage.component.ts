/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./archived-page.htm";
import {PageFull} from "../models/Page.full.model";
import {PagesService} from "../services/Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "../BasePage.component";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'wiki-page-archive',
    template: require('./archived-page.htm')
})
export class ArchivePageComponent extends BasePageComponent {
    constructor(protected router: ActivatedRoute,
                private pagesService: PagesService,
                private notificationService: NotificationsService,
                private authService: AuthService,
                private actualRouter: Router) {
        super(router);
        this.editOptions = {
            hideDelete: false
        };
    }


    ngOnInit() {
        this.router.data.subscribe((data: { pages: PageFull }) => {
            this.load(data.pages);
        });
    }

    save(): Observable<boolean> {
        let self = this;
        let returnGuy = this.pagesService
            .restorePage(this.page.id);
        returnGuy.subscribe((success: boolean) => {
            if (success) {
                self.actualRouter.navigate(
                    ['page/' + this.page.name]
                )
            } else {
                self.failure('): try again.')
            }
        }, (error: any) => {
            if (error.status == 500) {//TODO: SHOULD REALLY BE A 400 BAD REQUEST
                self.failure('Page already exists!')
            } else {
                self.failure('): try again.')
            }
        });
        return returnGuy

    }

    reset(): void {
    }

    canCreate(): Observable<boolean> {
        return this.authService.canCreate()
    }

    private failure(message: string) {
        this.notificationService.error('Page NOT Restored!', message || ':( Try again.', {
            timeOut: 5000,
            showProgressBar: true,
            clickToClose: true
        })
    }
}
