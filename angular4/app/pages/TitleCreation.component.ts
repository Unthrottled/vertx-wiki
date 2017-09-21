/**
 * Created by alex on 9/20/17.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import "./titleCreation.htm";
@Component({
  selector: 'title-creation',
  templateUrl: './templates/titleCreation.htm'
})
export class TitleCreationComponent {
  private _content: string;
  private _valid: boolean = false;

  @Output()
  private validChange = new EventEmitter();

  constructor() {
  }

  set content(value: string) {
    this._content = value;
  }

  @Input()
  get content(): string {
    return this._content;
  }

  validate(title: String): void {

  }

  get valid(): boolean {
    return this._valid;
  }


  set valid(value: boolean) {
    this._valid = value;
    this.validChange.emit(this._valid);
  }
}
