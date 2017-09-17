import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {HttpModule} from "@angular/http";
import {UiSwitchModule} from "angular2-ui-switch";
import {MessageComponent} from "./messages/message.component";
import {SwitchComponent} from "./switch/switch.component";
import {HostService} from "./session/host.service";
import {SessionService} from "./session/session.service";
import {MessageService} from "./messages/message.service";
import {WindowRef} from "./util/window";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login.component";
import {BaseComponent} from "./base.component";
import {LogoutComponent} from "./auth/logout.component";
import {UserPrincipal} from "./auth/UserPrincipal.model";
import {PagesComponent} from "./pages/Pages.component";

const appRoutes = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard]},
  {path: 'butt', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UiSwitchModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AppComponent,
    MessageComponent,
    SwitchComponent,
    BaseComponent,
    LoginComponent,
    LogoutComponent,
    PagesComponent
  ],
  bootstrap: [AppComponent],
  providers: [HostService,
    SessionService,
    MessageService,
    WindowRef,
    AuthService,
    AuthGuard,
    UserPrincipal]
})
export class AppModule {
}
