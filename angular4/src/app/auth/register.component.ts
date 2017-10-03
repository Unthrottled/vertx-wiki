/**
 * Created by alex on 9/15/17.
 */
import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import "./register.template.htm";
import {Subscriber} from "rxjs/Subscriber";
import {UserPrincipal} from "./UserPrincipal.model";
import {NewUser} from "./NewUser.model";

@Component({
  selector: 'register-form-guy',
  templateUrl: 'templates/register.template.htm'
})
export class RegisterComponent implements OnInit {
  message: string;
  model: any = {
    permissions : {
      view: true
    }
  };

  constructor(public authService: AuthService, public router: Router, private prince: UserPrincipal) {

  }

  getUser(): User {
    return new User(this.model.username, this.model.password);
  }

  get permissions(): string[]{
    return Object.keys(this.model.permissions)
      .filter((key: string)=> this.model.permissions[key])
      .map((key: string)=> key.toLowerCase());
  }

  getNewUser(): NewUser {
    return new NewUser(this.model.username, this.model.password, this.permissions);
  }

  login() {
    let self = this;
    this.authService.createPrincipal(this.getNewUser())
      .subscribe(Subscriber.create((succeded: boolean) => {
        if(succeded){
          self.authService.login(self.getUser())
            .subscribe(Subscriber.create((succeded: boolean) => {
              if (succeded) {
                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                  queryParamsHandling: 'preserve',
                  preserveFragment: true
                };

                this.router.navigate(['/'], navigationExtras);
              }
            }, (e) => console.log("OHHHH SHIIIITTTTTTTT" + e)));
        } else {

        }
      }, (error: any)=> {

      }));
}

  ngOnInit(): void {
    this.authService.logout();
  }

  logout() {
    this.authService.logout();
  }
}
