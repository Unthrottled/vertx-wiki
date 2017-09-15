/**
 * Created by alex on 9/15/17.
 */
import { Component, OnInit }        from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService }      from './auth.service';
import {User} from "./user.model";
import './login.template.htm'

@Component({
  templateUrl: 'templates/login.template.htm'
})
export class LoginComponent implements OnInit {
  message: string;
  model: any = {};
  constructor(public authService: AuthService, public router: Router) {

  }

  getUser(): User {
    return new User(this.model.username, this.model.password);
  }

  login() {

    this.authService.login(this.getUser()).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  logout() {
    this.authService.logout();
  }
}
