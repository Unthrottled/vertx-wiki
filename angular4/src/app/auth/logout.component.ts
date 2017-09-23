/**
 * Created by alex on 9/15/17.
 */
import { Component, OnInit }        from '@angular/core';
import { Router} from '@angular/router';
import { AuthService }      from './auth.service';
import './logout.template.htm'

@Component({
  selector: 'logout-butt',
  templateUrl: 'templates/logout.template.htm'
})
export class LogoutComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {

  }

  ngOnInit(): void {

  }

  logout() {
    let self = this;
    this.authService.logout()
      .then(success=> self.router.navigate(['/login']));
  }

  get isLoggedIn() : boolean {
    return this.authService.isLoggedIn;
  }
}
