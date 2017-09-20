/**
 * Created by alex on 9/17/17.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import "./edit.htm";
@Component({
  selector: 'edit-page',
  templateUrl: './templates/edit.htm'
})
export class EditComponent {
  private _enabled: boolean;
  private _content: string;
  @Output()
  private enabledEmitter = new EventEmitter();
  @Output()
  private contentEmitter = new EventEmitter();

  constructor() {
  }

  @Input()
  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
    this.enabledEmitter.emit(this._enabled);
  }

  set content(value: string) {
    this._content = value;
    this.contentEmitter.emit(this._content);
  }

  @Input()
  get content(): string {
    return this._content;
  }
}
