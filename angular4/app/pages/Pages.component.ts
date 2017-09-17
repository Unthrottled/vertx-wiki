/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {PageMin} from "./Page.min.model";
import './pages.list.htm';
@Component({
  selector: 'pages-list',
  templateUrl: './templates/pages.list.htm'
})
export class PagesComponent {
  pages: PageMin[] = [new PageMin({id: 1, name: "butt"})]
}
