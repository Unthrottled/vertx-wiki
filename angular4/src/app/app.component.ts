import {Component} from "@angular/core";
import "./app.component.htm";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {
    loadEnd: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get notLoading(): Observable<boolean> {
        return this.loading.map(b=>!b);
    }

    constructor(private router: Router){
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(()=>{
                this.loadEnd.next(true);
                this.loading.next(false);

            });

        router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(()=>{
                 this.loading.next(true);
            });
    }
}
