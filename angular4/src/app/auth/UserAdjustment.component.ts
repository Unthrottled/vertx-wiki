/**
 * Created by alex on 9/15/17.
 */
import {Component} from "@angular/core";
import "./userAdjustment.template.htm";
import {Subscriber} from "rxjs/Subscriber";
import {NotificationsService} from "angular2-notifications/dist";
import {BackendService} from "../util/backend.service";
import {StatusPayload} from "../pages/StatusPayload.model";

@Component({
    selector: 'user-adjustment-guy',
    templateUrl: 'templates/userAdjustment.template.htm'
})
export class UserAdjustmentComponent {
    message: string;
    permissions: string[] = [];
    private _validName: boolean;

    constructor(private backendService: BackendService, private notifService: NotificationsService) {

    }

    login() {
        let self = this;
        this.backendService.updateUser(this.permissions)
            .map((response: StatusPayload) => response.succeded)
            .subscribe(Subscriber.create((succeded: boolean) => {
                self.notifService.success("User Permissions Updated!",
                    "Good Job!", {
                        timeOut: 3000,
                        clickToDismiss: true
                    });
            }, (error: any) => {
                this.failure();
            }));
    }

    private failure() {
        this.notifService.error("Unable to update user!", "Please try again, or not.", {timeOut: 3000})
    }

}
