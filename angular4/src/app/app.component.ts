import {Component} from "@angular/core";
import "./app.component.htm";
import {NavigationEnd, Router} from "@angular/router";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {
    loadEnd: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    constructor(private router: Router){
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(end=>{
                this.loadEnd.next(true);
            })
    }
}
