/**
 * Created by alex on 9/17/17.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
@Component({
  selector: 'wiki-page',
  templateUrl: './templates/page.htm'
})
export class PageComponent implements OnInit {
 private title: string;
 private content: string;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: { title: string,  content: string}) => {
      this.title = data.title;
      this.content = data.content;
    });
  }
}
