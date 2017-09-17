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
var appRoutes = [
    { path: '', component: base_component_1.BaseComponent, canActivate: [auth_guard_1.AuthGuard] },
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
            logout_component_1.LogoutComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [host_service_1.HostService, session_service_1.SessionService, message_service_1.MessageService, window_1.WindowRef, auth_service_1.AuthService, auth_guard_1.AuthGuard]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map