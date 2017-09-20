"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var angular2_markdown_1 = require("angular2-markdown");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var message_component_1 = require("./messages/message.component");
var switch_component_1 = require("./switch/switch.component");
var host_service_1 = require("./session/host.service");
var session_service_1 = require("./session/session.service");
var message_service_1 = require("./messages/message.service");
var window_1 = require("./util/window");
var auth_service_1 = require("./auth/auth.service");
var auth_guard_1 = require("./auth/auth.guard");
var login_component_1 = require("./auth/login.component");
var base_component_1 = require("./base.component");
var logout_component_1 = require("./auth/logout.component");
var UserPrincipal_model_1 = require("./auth/UserPrincipal.model");
var Pages_component_1 = require("./pages/Pages.component");
var Permissions_component_1 = require("./auth/Permissions.component");
var pages_resolve_service_1 = require("./pages/pages-resolve.service");
var Pages_service_1 = require("./pages/Pages.service");
var backend_service_1 = require("./util/backend.service");
var Page_component_1 = require("./pages/Page.component");
var page_resolve_service_1 = require("./pages/page-resolve.service");
var Edit_component_1 = require("./pages/Edit.component");
var angular2_notifications_lite_1 = require("angular2-notifications-lite");
var appRoutes = [
    { path: '', component: base_component_1.BaseComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { pages: pages_resolve_service_1.PagesResolve } },
    { path: 'page/:name', component: Page_component_1.PageComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { pages: page_resolve_service_1.PageResolve } },
    { path: 'butt', component: message_component_1.MessageComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular2_ui_switch_1.UiSwitchModule,
            angular2_markdown_1.MarkdownModule.forRoot(),
            angular2_notifications_lite_1.SimpleNotificationsModule.forRoot(),
            router_1.RouterModule.forRoot(appRoutes)
        ],
        exports: [
            router_1.RouterModule
        ],
        declarations: [
            app_component_1.AppComponent,
            message_component_1.MessageComponent,
            switch_component_1.SwitchComponent,
            base_component_1.BaseComponent,
            login_component_1.LoginComponent,
            logout_component_1.LogoutComponent,
            Pages_component_1.PagesComponent,
            Page_component_1.PageComponent,
            Edit_component_1.EditComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [host_service_1.HostService,
            session_service_1.SessionService,
            message_service_1.MessageService,
            window_1.WindowRef,
            auth_service_1.AuthService,
            auth_guard_1.AuthGuard,
            UserPrincipal_model_1.UserPrincipal,
            Permissions_component_1.Permissions,
            pages_resolve_service_1.PagesResolve,
            page_resolve_service_1.PageResolve,
            Pages_service_1.PagesService,
            backend_service_1.BackendService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map