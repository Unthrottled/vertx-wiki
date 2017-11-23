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
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var switch_component_1 = require("./switch/switch.component");
var window_1 = require("./util/window");
var auth_service_1 = require("./auth/auth.service");
var auth_guard_1 = require("./auth/auth.guard");
var login_component_1 = require("./auth/login.component");
var base_component_1 = require("./pages/base/base.component");
var logout_component_1 = require("./auth/logout.component");
var UserPrincipal_model_1 = require("./auth/UserPrincipal.model");
var Pages_component_1 = require("./pages/Pages.component");
var Permissions_component_1 = require("./auth/Permissions.component");
var pages_resolve_service_1 = require("./pages/services/pages-resolve.service");
var Pages_service_1 = require("./pages/services/Pages.service");
var backend_service_1 = require("./util/backend.service");
var page_resolve_service_1 = require("./pages/services/page-resolve.service");
var Edit_component_1 = require("./pages/edit/Edit.component");
var angular2_notifications_1 = require("angular2-notifications");
var EditPage_component_1 = require("./pages/edit/EditPage.component");
var new_page_resolve_service_1 = require("./pages/services/new-page-resolve.service");
var TitleCreation_component_1 = require("./pages/edit/TitleCreation.component");
var CreatePage_component_1 = require("./pages/create/CreatePage.component");
var TitleValidation_service_1 = require("./pages/edit/TitleValidation.service");
var deletion_component_1 = require("./pages/archive/deletion.component");
var create_button_component_1 = require("./pages/create/create.button.component");
var hex_row_component_1 = require("./pages/hex/hex-row.component");
var HexList_component_1 = require("./pages/hex/HexList.component");
var HexComponent_1 = require("./pages/hex/HexComponent");
var Search_component_1 = require("./pages/search/Search.component");
var register_component_1 = require("./auth/user/register.component");
var NewUserValidation_service_1 = require("./auth/user/NewUserValidation.service");
var NewUserCreation_component_1 = require("./auth/user/NewUserCreation.component");
var about_component_1 = require("./pages/about/about.component");
var Pagination_component_1 = require("./pages/paginator/Pagination.component");
var Roles_component_1 = require("./auth/Roles.component");
var UserAdjustment_component_1 = require("./auth/user/UserAdjustment.component");
var hideOnLogout_component_1 = require("./auth/hideOnLogout.component");
var ArchivePage_component_1 = require("./pages/archive/ArchivePage.component");
var Archives_component_1 = require("./pages/archive/Archives.component");
var archives_resolve_service_1 = require("./pages/archive/archives-resolve.service");
var archive_resolve_service_1 = require("./pages/archive/archive-resolve.service");
var appRoutes = [
    { path: '', redirectTo: 'pages/1', pathMatch: 'full' },
    { path: 'pages/:pageNumber', component: base_component_1.BaseComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { pages: pages_resolve_service_1.PagesResolve } },
    {
        path: 'archives/:pageNumber',
        component: Archives_component_1.ArchivesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        resolve: { pages: archives_resolve_service_1.ArchivesResolve }
    },
    { path: 'page/:name', component: EditPage_component_1.EditPageComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { pages: page_resolve_service_1.PageResolve } },
    {
        path: 'archive/:name',
        component: ArchivePage_component_1.ArchivePageComponent,
        canActivate: [auth_guard_1.AuthGuard],
        resolve: { pages: archive_resolve_service_1.ArchiveResolve }
    },
    { path: 'create', component: CreatePage_component_1.CreatePageComponent, canActivate: [auth_guard_1.AuthGuard], resolve: { pages: new_page_resolve_service_1.NewPageResolve } },
    { path: 'user/adjustment', component: UserAdjustment_component_1.UserAdjustmentComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'about', component: about_component_1.AboutComponent }
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
            angular2_notifications_1.SimpleNotificationsModule.forRoot(),
            animations_1.BrowserAnimationsModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        exports: [
            router_1.RouterModule
        ],
        declarations: [
            app_component_1.AppComponent,
            switch_component_1.SwitchComponent,
            base_component_1.BaseComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            logout_component_1.LogoutComponent,
            Pages_component_1.PagesComponent,
            EditPage_component_1.EditPageComponent,
            TitleCreation_component_1.TitleCreationComponent,
            NewUserCreation_component_1.NewUserCreationComponent,
            CreatePage_component_1.CreatePageComponent,
            deletion_component_1.DeletionComponent,
            create_button_component_1.CreateComponent,
            hex_row_component_1.HexRowComponent,
            HexList_component_1.HexListComponent,
            HexComponent_1.HexComponent,
            Pagination_component_1.PaginatorComponent,
            Search_component_1.SearchComponent,
            Roles_component_1.RolesComponent,
            hideOnLogout_component_1.LogoutHiderComponent,
            UserAdjustment_component_1.UserAdjustmentComponent,
            ArchivePage_component_1.ArchivePageComponent,
            Archives_component_1.ArchivesComponent,
            about_component_1.AboutComponent,
            Edit_component_1.EditComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            window_1.WindowRef,
            auth_service_1.AuthService,
            auth_guard_1.AuthGuard,
            UserPrincipal_model_1.UserPrincipal,
            Permissions_component_1.Permissions,
            pages_resolve_service_1.PagesResolve,
            page_resolve_service_1.PageResolve,
            Pages_service_1.PagesService,
            new_page_resolve_service_1.NewPageResolve,
            archives_resolve_service_1.ArchivesResolve,
            archive_resolve_service_1.ArchiveResolve,
            TitleValidation_service_1.TitleValidationService,
            NewUserValidation_service_1.NewUserValidationService,
            backend_service_1.BackendService,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map