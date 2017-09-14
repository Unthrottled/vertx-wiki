import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {UiSwitchModule} from 'angular2-ui-switch';
import {MessageComponent} from './messages/message.component';
import {SwitchComponent} from './switch/switch.component';
import {HostService} from './session/host.service';
import {SessionService} from './session/session.service';
import {MessageService} from './messages/message.service';
import {WindowRef} from './util/window';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UiSwitchModule
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        SwitchComponent
    ],
    bootstrap: [AppComponent],
    providers: [HostService, SessionService, MessageService, WindowRef]
})
export class AppModule {
}
