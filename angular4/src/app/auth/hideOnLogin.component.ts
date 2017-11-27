/**
 * Created by alex on 9/15/17.
 */
import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import "./logoutHider.template.htm";

@Component({
    selector: 'login-hider',
    template: require('./loginHider.template.htm')
})
export class LoginHiderComponent {
    constructor(public authService: AuthService) {

    }

    get hideLogin(): boolean {
        return this.authService.isLoggedIn;
    }
}
