/**
 * Created by alex on 9/17/17.
 */
import {Component, Input} from "@angular/core";
import "./edit.htm";
@Component({
  selector: 'edit-page',
  templateUrl: './templates/edit.htm'
})
export class EditComponent {
  private _enabled: boolean;
  private title: string;
  private content: string;

  constructor() {
  }

  @Input()
  get enabled(): boolean {
    return this._enabled;
  }
}
