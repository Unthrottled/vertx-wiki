import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MarkdownModule} from "angular2-markdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
import {Permissions} from "./auth/Permissions.component";
import {PagesResolve} from "./pages/pages-resolve.service";
import {PagesService} from "./pages/Pages.service";
import {BackendService} from "./util/backend.service";
import {PageResolve} from "./pages/page-resolve.service";
import {EditComponent} from "./pages/Edit.component";
import {SimpleNotificationsModule} from "angular2-notifications";
import {EditPageComponent} from "./pages/EditPage.component";
import {NewPageResolve} from "./pages/new-page-resolve.service";
import {TitleCreationComponent} from "./pages/TitleCreation.component";
import {CreatePageComponent} from "./pages/CreatePage.component";
import {TitleValidationService} from "./pages/TitleValidation.service";
import {DeletionComponent} from "./pages/deletion.component";
import {CreateComponent} from "./pages/create.button.component";
import {HexRowComponent} from "./pages/hex/hex-row.component";
import {HexListComponent} from "./pages/hex/HexList.component";
import {HexComponent} from "./pages/hex/HexComponent";
import {SearchComponent} from "./pages/search/Search.component";
import {RegisterComponent} from "./auth/register.component";
import {NewUserValidationService} from "./pages/NewUserValidation.service";
import {NewUserCreationComponent} from "./pages/NewUserCreation.component";
import {AboutComponent} from "./pages/about/about.component";
import {PaginatorComponent} from "./pages/paginator/Pagination.component";

const appRoutes = [
  {path: '', redirectTo: 'pages/1', pathMatch: 'full'},
  {path: 'pages/:pageNumber', component: BaseComponent, canActivate: [AuthGuard], resolve: {pages: PagesResolve}},
  {path: 'page/:name', component: EditPageComponent, canActivate: [AuthGuard], resolve: {pages: PageResolve}},
  {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard], resolve: {pages: NewPageResolve}},
  {path: 'butt', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent}
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UiSwitchModule,
    MarkdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
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
    RegisterComponent,
    LogoutComponent,
    PagesComponent,
    EditPageComponent,
    TitleCreationComponent,
    NewUserCreationComponent,
    CreatePageComponent,
    DeletionComponent,
    CreateComponent,
    HexRowComponent,
    HexListComponent,
    HexComponent,
    PaginatorComponent,
    SearchComponent,
    AboutComponent,
    EditComponent
  ],
  bootstrap: [AppComponent],
  providers: [HostService,
    SessionService,
    MessageService,
    WindowRef,
    AuthService,
    AuthGuard,
    UserPrincipal,
    Permissions,
    PagesResolve,
    PageResolve,
    PagesService,
    NewPageResolve,
    TitleValidationService,
    NewUserValidationService,
    BackendService,]
})
export class AppModule {
}
