/**
 * Created by alex on 9/20/17.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from '@angular/router';
import "./titleCreation.htm";
@Component({
  selector: 'title-creation',
  templateUrl: './templates/titleCreation.htm'
})
export class TitleCreationComponent {
  private _content: string;
  private _valid: boolean = false;

  @Output()
  private contentChange = new EventEmitter();

  constructor(private router: Router) {
  }

  set content(value: string) {
    this._content = value;
    this.contentChange.emit(this._content);
  }

  @Input()
  get content(): string {
    return this._content;
  }

  validate(title: String) : void {

  }


  get valid(): boolean {
    return this._valid;
  }
}
