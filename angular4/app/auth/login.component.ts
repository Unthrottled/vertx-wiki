/**
 * Created by alex on 9/15/17.
 */
import { Component, OnInit }        from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService }      from './auth.service';
import {User} from "./user.model";
import './login.template.htm'
import {Subscriber} from "rxjs/Subscriber";
import {UserPrincipal} from "./UserPrincipal.model";

@Component({
  selector: 'login-form-guy',
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
    this.authService.login(this.getUser())
      .subscribe(Subscriber.create((prince: UserPrincipal)=>{
          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          this.router.navigate(['/'], navigationExtras);
      }, ()=> console.log("OHHHH SHIIIITTTTTTTT")));
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  logout() {
    this.authService.logout();
  }
}
